import { del, list, put } from "@vercel/blob";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from "ai";
import { after } from "next/server";
import { randomBytes } from "node:crypto";
import { mkdir, readdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { splitAnswer } from "@/lib/erinllm/answer";
import { mayKeep, tooManyQuestions } from "@/lib/erinllm/limits";
import { MODEL, instructions } from "@/lib/erinllm/prompt";
import {
  MAX,
  type Attached,
  type ErinMessage,
  type ErrorCode,
  type Kept,
  type PageContext,
} from "@/lib/erinllm/types";
import { inBlob, inFolder, json, refused, reviewing } from "@/lib/serverStore";

// ErinLLM, the chat in the site header (src/components/site/erinllm).
//
//   POST    a question, with the conversation so far, the page the visitor
//           is on and anything they highlighted or dragged in; streams the
//           answer back
//   GET     ?review: the questions people asked and the answers they got,
//           newest first, for me
//   DELETE  ?review&id= forgets one
//
// Every question and answer is kept so I can see what people ask and fix
// wrong answers in src/lib/erinllm/knowledge.ts. They go to Vercel Blob
// under erinllm/questions/ (or .data/erinllm while developing), without
// anything about who asked. Reviewing takes being signed in at /review,
// like the camera. The review page is /erinllm/review.
//
// Limits are in src/lib/erinllm/limits.ts; the model and its rules are in
// src/lib/erinllm/prompt.ts.

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PREFIX = "erinllm/questions/";
const FOLDER = path.join(process.cwd(), ".data", "erinllm");
const NAME = /^\d{13}-[0-9a-f]{16}\.json$/;
const SHOWN = 200; // the most the review page lists

const fail = (code: ErrorCode, status: number) =>
  new Response(code, {
    status,
    headers: { "Content-Type": "text/plain", "Cache-Control": "no-store" },
  });

// Reading what the panel sends: anything unexpected is dropped or cut short

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.slice(0, max) : "";

const record = (value: unknown) =>
  value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;

function readPage(value: unknown): PageContext | null {
  const v = record(value);
  const where = str(v?.path, 200);
  if (!v || !where.startsWith("/")) return null;
  return {
    path: where,
    title: str(v.title, 200),
    side: v.side === "engineer" ? "engineer" : "designer",
    text: str(v.text, MAX.pageText),
    sections: (Array.isArray(v.sections) ? v.sections : [])
      .slice(0, 30)
      .map((x) => record(x))
      .filter((x) => x && /^[\w-]{1,60}$/.test(String(x.id)))
      .map((x) => ({ id: String(x!.id), title: str(x!.title, 80) })),
  };
}

const KINDS: Attached["kind"][] = ["quote", "page", "image", "link"];

function readAttached(value: unknown): Attached | undefined {
  const v = record(value);
  const kind = v?.kind as Attached["kind"];
  const label = str(v?.label, 200);
  if (!v || !KINDS.includes(kind) || !label) return undefined;
  return {
    kind,
    label,
    text: str(v.text, MAX.quote) || undefined,
    href: str(v.href, 500) || undefined,
  };
}

function readMessages(value: unknown): ErinMessage[] | null {
  if (!Array.isArray(value)) return null;
  const messages: ErinMessage[] = [];
  for (const item of value.slice(-MAX.history)) {
    const m = record(item);
    if (!m || (m.role !== "user" && m.role !== "assistant")) return null;
    const parts = Array.isArray(m.parts) ? m.parts : [];
    const words = parts
      .map((p) => record(p))
      .filter((p) => p?.type === "text" && typeof p.text === "string")
      .map((p) => p!.text as string)
      .join("")
      .slice(0, m.role === "user" ? MAX.question : 4_000);
    if (!words.trim()) continue; // a stopped answer, say
    messages.push({
      id: str(m.id, 100) || randomBytes(8).toString("hex"),
      role: m.role,
      parts: [{ type: "text", text: words }],
      metadata:
        m.role === "user"
          ? { attached: readAttached(record(m.metadata)?.attached) }
          : undefined,
    });
  }
  return messages.at(-1)?.role === "user" ? messages : null;
}

// What the visitor attached goes into their question for the model
const withAttached = (messages: ErinMessage[]) =>
  messages.map((m) => {
    const attached = m.metadata?.attached;
    if (!attached) return m;
    const about = [
      `(I'm asking about this: ${attached.label}${attached.href ? `, ${attached.href}` : ""})`,
      attached.text ? `"""\n${attached.text}\n"""` : "",
      m.parts.map((p) => (p.type === "text" ? p.text : "")).join(""),
    ];
    return {
      ...m,
      parts: [
        { type: "text" as const, text: about.filter(Boolean).join("\n\n") },
      ],
    };
  });

// What the panel shows when the model fails
function errorCode(error: unknown): ErrorCode {
  const seen = new Set<unknown>();
  const queue = [error];
  while (queue.length) {
    const e = record(queue.shift());
    if (!e || seen.has(e)) continue;
    seen.add(e);
    const name = String(e.name ?? "");
    const status = Number(e.statusCode ?? e.status);
    // Over the free tier's limit, or Google is overloaded, for now
    if (status === 429 || status >= 500) return "busy";
    // No key, or a key Google doesn't accept
    const detail = String(e.responseBody ?? e.message ?? "");
    if (
      status === 401 ||
      status === 403 ||
      (status === 400 && /API key/i.test(detail)) ||
      name === "AI_LoadAPIKeyError"
    ) {
      console.error("ErinLLM isn't set up:", detail);
      return "not_set_up";
    }
    queue.push(
      e.cause,
      e.lastError,
      ...(Array.isArray(e.errors) ? e.errors : []),
    );
  }
  return "error";
}

const canKeep = () => inBlob() || inFolder();

async function keep(entry: Omit<Kept, "id">) {
  const id = `${entry.at}-${randomBytes(8).toString("hex")}.json`;
  const body = JSON.stringify(entry);
  if (inBlob()) {
    await put(PREFIX + id, body, {
      access: "public",
      contentType: "application/json",
    });
  } else if (inFolder()) {
    await mkdir(FOLDER, { recursive: true });
    await writeFile(path.join(FOLDER, id), body);
  }
}

async function keptQuestions(): Promise<Kept[]> {
  // Names start with the time, so newest first is a reverse sort
  const found: { id: string; read: () => Promise<string> }[] = [];
  if (inBlob()) {
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
      for (const blob of page.blobs) {
        const id = blob.pathname.slice(PREFIX.length);
        if (NAME.test(id))
          found.push({
            id,
            read: () =>
              fetch(blob.url, { cache: "no-store" }).then((r) => r.text()),
          });
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } else if (inFolder()) {
    const names = await readdir(FOLDER).catch(() => [] as string[]);
    for (const id of names.filter((n) => NAME.test(n)))
      found.push({ id, read: () => readFile(path.join(FOLDER, id), "utf8") });
  }
  found.sort((a, b) => b.id.localeCompare(a.id));
  const read = await Promise.all(
    found.slice(0, SHOWN).map(async ({ id, read }) => {
      try {
        return { ...(JSON.parse(await read()) as Omit<Kept, "id">), id };
      } catch {
        return null;
      }
    }),
  );
  return read.filter((k): k is Kept => k !== null);
}

export async function POST(request: Request) {
  if (await tooManyQuestions(request)) return fail("rate_limited", 429);

  const body = record(await request.json().catch(() => null));
  const messages = readMessages(body?.messages);
  if (!messages) return fail("error", 400);
  const page = readPage(body?.page);

  // The Google AI Studio key: in .env.local, and in Vercel's environment
  // variables for the live site
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) return fail("not_set_up", 503);

  const asked = messages.at(-1)!;
  const result = streamText({
    model: MODEL,
    instructions: instructions(page),
    messages: await convertToModelMessages(withAttached(messages)),
    // Gemini's thinking counts toward this, so it leaves room for both;
    // minimal thinking keeps answers quick
    maxOutputTokens: 2048,
    maxRetries: 2,
    reasoning: "minimal",
    abortSignal: request.signal,
    onFinish: ({ text }) => {
      if (!text.trim() || !canKeep() || !mayKeep()) return;
      after(() =>
        keep({
          at: Date.now(),
          path: page?.path ?? "",
          side: page?.side ?? "designer",
          attached: asked.metadata?.attached,
          question: asked.parts
            .map((p) => (p.type === "text" ? p.text : ""))
            .join(""),
          answer: splitAnswer(text).body,
        }).catch((error) =>
          console.error("ErinLLM couldn't keep a question", error),
        ),
      );
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      sendReasoning: false,
      onError: (error) => {
        const code = errorCode(error);
        if (code === "error") console.error("ErinLLM", error);
        return code;
      },
    }),
  });
}

export async function GET(request: Request) {
  const review = await reviewing(request);
  if (review === "no") return json({ error: "Not found." }, 404);
  if (review !== "yes") return refused(review);
  return json({ questions: await keptQuestions(), canKeep: canKeep() });
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!NAME.test(id)) return json({ error: "Not found." }, 404);
  const review = await reviewing(request);
  if (review === "no") return json({ error: "Not found." }, 404);
  if (review !== "yes") return refused(review);
  if (inBlob()) await del(PREFIX + id);
  else if (inFolder()) await unlink(path.join(FOLDER, id)).catch(() => {});
  return json({ deleted: id });
}
