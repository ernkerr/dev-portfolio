import { checkRateLimit } from "@vercel/firewall";
import { del, list, put, rename } from "@vercel/blob";
import { Output, generateText, jsonSchema } from "ai";
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";
import { randomBytes } from "node:crypto";
import {
  mkdir,
  readdir,
  readFile,
  rename as move,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import {
  FISH_MAX,
  NAME_MAX,
  looksLikeLink,
  tidyName,
  type Fish,
} from "@/lib/aquarium";
import { MODEL } from "@/lib/erinllm/prompt";
import {
  bump,
  countOf,
  hash,
  inBlob,
  inFolder,
  ipOf,
  json,
  refused,
  reviewing,
  type DailyCounts,
} from "@/lib/serverStore";

// The fish people draw for the aquarium on the Fun page
// (src/app/fun/aquarium). Built like the camera's photos
// (src/app/api/camera): no database, everything about a fish is in its
// file's name.
//
//   GET     the fish swimming for everyone, newest first, plus the asker's
//           own; with ?review, every fish, for me
//   POST    drops one in: { name, image } with the PNG as base64
//   DELETE  ?id= takes one out, for whoever drew it, or me with ?review
//   PATCH   ?id= lets a waiting one in for everyone (?review only)
//
// A new fish swims right away for whoever drew it. It swims for everyone
// once it's checked: names go through a word filter, then Gemini (the same
// free model as ErinLLM) looks at the drawing and the name, and a clean sea
// creature goes straight in. Anything it doubts, or anything dropped while
// Gemini is busy or not set up, waits for me at /fun/aquarium/review.
//
// Files are "<ms>-<owner>-<random>-<name>.png", the owner a hash of a token
// the drawer's browser keeps (x-fish-owner), the name in base64url. They go
// to Vercel Blob under aquarium/waiting/ and aquarium/shown/ (the camera's
// store), or to .data/aquarium while developing.

export const dynamic = "force-dynamic";
export const maxDuration = 30;

type Status = "waiting" | "shown";
const MAX_BYTES = 200_000;
const SHOWN = 300; // the most fish sent to the tank
const FILE = /^(\d{13})-([0-9a-f]{16})-[0-9a-f]{8}-([A-Za-z0-9_-]{1,100})\.png$/;
const TOKEN = /^[\w-]{16,100}$/;

const prefix = (status: Status) => `aquarium/${status}/`;
const folder = (status: Status) =>
  path.join(process.cwd(), ".data", "aquarium", status);

const ownerOf = (token: string) => hash(token).toString("hex").slice(0, 16);
const asker = (request: Request) => {
  const token = request.headers.get("x-fish-owner") ?? "";
  return TOKEN.test(token) ? ownerOf(token) : null;
};

const fish = (
  file: string,
  src: string,
  status: Status,
  owner: string | null,
): Fish | null => {
  const match = FILE.exec(file);
  if (!match) return null;
  return {
    id: file,
    src,
    name: Buffer.from(match[3], "base64url").toString("utf8"),
    at: Number(match[1]),
    mine: match[2] === owner,
    waiting: status === "waiting",
  };
};

async function fishIn(status: Status, owner: string | null) {
  const found: Fish[] = [];
  if (inBlob()) {
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: prefix(status), cursor, limit: 1000 });
      for (const blob of page.blobs) {
        const f = fish(blob.pathname.slice(prefix(status).length), blob.url, status, owner);
        if (f) found.push(f);
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } else if (inFolder()) {
    const files = await readdir(folder(status)).catch(() => [] as string[]);
    for (const file of files) {
      const f = fish(file, `/api/aquarium?file=${file}&status=${status}`, status, owner);
      if (f) found.push(f);
    }
  }
  return found;
}

// ---- Keeping it clean ----

const words = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

// Why a name can't be used, or null if it can.
function nameProblem(name: string) {
  if (!name) return "Give your fish a name.";
  if (looksLikeLink(name)) return "Names can't be links.";
  if (words.hasMatch(name) || words.hasMatch(name.replace(/[\s._-]+/g, "")))
    return "Pick a kinder name.";
  return null;
}

type Verdict = { seaCreature: boolean; clean: boolean; kindName: boolean };
const VERDICT = jsonSchema<Verdict>({
  type: "object",
  properties: {
    seaCreature: {
      type: "boolean",
      description: "The drawing is a fish or another sea creature, however rough",
    },
    clean: {
      type: "boolean",
      description:
        "Nothing rude, sexual, hateful or violent in the drawing, and no words or symbols like that",
    },
    kindName: {
      type: "boolean",
      description: "The name is kind: not rude, hateful, sexual or mocking a real person",
    },
  },
  required: ["seaCreature", "clean", "kindName"],
});

// Gemini's look at a new fish. Null when it can't tell (busy, not set up).
async function check(image: Buffer, name: string) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) return null;
  try {
    const { output } = await generateText({
      model: MODEL,
      output: Output.object({ schema: VERDICT }),
      abortSignal: AbortSignal.timeout(12_000),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Someone drew this for a public aquarium on a personal website, where anyone's fish swims with everyone else's, and named it "${name}". Kids might see it. Check the drawing and the name.`,
            },
            { type: "file", mediaType: "image/png", data: image },
          ],
        },
      ],
    });
    return output;
  } catch {
    return null;
  }
}

// ---- Limits ----
//
// The Firewall rule "aquarium" (10 fish per 10 minutes per IP) counts across
// every server, once it's set up in the project's Firewall settings; until
// then it lets everything through. In this server's memory: 30 fish per IP
// per day, 500 fish in all per day.

const PER_IP = 30;
const PER_DAY = 500;
const dropped: DailyCounts = new Map();

async function tooMany(request: Request) {
  const ip = ipOf(request);
  if (process.env.VERCEL) {
    try {
      const { rateLimited } = await checkRateLimit("aquarium", {
        request,
        rateLimitKey: `fish:${ip}`,
        timeout: 1500,
      });
      if (rateLimited) return true;
    } catch {
      // The Firewall didn't answer; the limits below still hold
    }
  }
  if (countOf(dropped, ip) >= PER_IP || countOf(dropped, "all") >= PER_DAY) return true;
  bump(dropped, ip);
  bump(dropped, "all");
  return false;
}

// A PNG's width and height, from its header.
function pngSize(bytes: Buffer) {
  const png =
    bytes.length > 24 &&
    bytes.readUInt32BE(0) === 0x89504e47 &&
    bytes.readUInt32BE(4) === 0x0d0a1a0a &&
    bytes.toString("ascii", 12, 16) === "IHDR";
  return png ? { w: bytes.readUInt32BE(16), h: bytes.readUInt32BE(20) } : null;
}

// ---- Storage ----

async function save(file: string, bytes: Buffer, status: Status) {
  if (inBlob()) {
    const blob = await put(prefix(status) + file, bytes, {
      access: "public",
      contentType: "image/png",
    });
    return blob.url;
  }
  await mkdir(folder(status), { recursive: true });
  await writeFile(path.join(folder(status), file), bytes);
  return `/api/aquarium?file=${file}&status=${status}`;
}

async function letIn(file: string) {
  if (inBlob()) {
    const blob = await rename(prefix("waiting") + file, prefix("shown") + file, {
      access: "public",
      contentType: "image/png",
    });
    return blob.url;
  }
  await mkdir(folder("shown"), { recursive: true });
  await move(path.join(folder("waiting"), file), path.join(folder("shown"), file));
  return `/api/aquarium?file=${file}&status=shown`;
}

// ---- The API ----

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  // Locally, the drawings themselves
  const file = params.get("file");
  if (file !== null) {
    const status = params.get("status") === "shown" ? "shown" : "waiting";
    if (!inFolder() || !FILE.test(file)) return new Response(null, { status: 404 });
    try {
      const bytes = await readFile(path.join(folder(status), file));
      return new Response(bytes, {
        headers: { "Content-Type": "image/png", "Cache-Control": "no-store" },
      });
    } catch {
      return new Response(null, { status: 404 });
    }
  }

  const review = await reviewing(request);
  if (review !== "yes" && review !== "no") return refused(review);
  const owner = asker(request);
  const [shown, waiting] = await Promise.all([
    fishIn("shown", owner),
    fishIn("waiting", owner),
  ]);
  const newest = (a: Fish, b: Fish) => b.at - a.at;
  const everyone = shown.sort(newest);
  const swimming =
    review === "yes"
      ? [...waiting, ...everyone]
      : [
          ...waiting.filter((f) => f.mine),
          ...everyone.filter((f) => f.mine),
          ...everyone.filter((f) => !f.mine).slice(0, SHOWN),
        ];
  return json({ fish: swimming.sort(newest), canDrop: inBlob() || inFolder() });
}

export async function POST(request: Request) {
  if (!inBlob() && !inFolder())
    return json({ error: "The aquarium isn't set up yet." }, 503);
  const owner = asker(request);
  if (!owner) return json({ error: "Missing who drew it." }, 400);

  const body = await request.json().catch(() => null);
  const name = tidyName(typeof body?.name === "string" ? body.name : "");
  const problem = nameProblem(name);
  if (problem) return json({ error: problem }, 400);
  const image =
    typeof body?.image === "string" ? Buffer.from(body.image, "base64") : null;
  const size = image && pngSize(image);
  if (
    !image ||
    !size ||
    image.length > MAX_BYTES ||
    size.w > FISH_MAX.w ||
    size.h > FISH_MAX.h
  )
    return json({ error: "That drawing can't be saved." }, 400);
  if (await tooMany(request))
    return json({ error: "That's a lot of fish! Try again a little later." }, 429);

  const file = `${Date.now()}-${owner}-${randomBytes(4).toString("hex")}-${Buffer.from(name.slice(0, NAME_MAX)).toString("base64url")}.png`;
  const src = await save(file, image, "waiting");
  const verdict = await check(image, name);
  if (verdict && !verdict.kindName) {
    await remove(file);
    return json({ error: "Pick a kinder name." }, 400);
  }
  if (verdict?.seaCreature && verdict.clean) {
    try {
      return json({ fish: fish(file, await letIn(file), "shown", owner) }, 201);
    } catch {
      // It stays waiting for me
    }
  }
  return json({ fish: fish(file, src, "waiting", owner) }, 201);
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  const match = FILE.exec(id);
  if (!match) return json({ error: "Not found." }, 404);
  const review = await reviewing(request);
  if (review !== "yes" && review !== "no") return refused(review);
  if (review !== "yes" && match[2] !== asker(request))
    return json({ error: "Only whoever drew a fish can take it out." }, 403);
  await remove(id);
  return json({ deleted: id });
}

async function remove(id: string) {
  if (inBlob()) await del([prefix("waiting") + id, prefix("shown") + id]);
  else if (inFolder())
    await Promise.all(
      (["waiting", "shown"] as const).map((s) =>
        unlink(path.join(folder(s), id)).catch(() => {}),
      ),
    );
}

export async function PATCH(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!FILE.test(id)) return json({ error: "Not found." }, 404);
  const review = await reviewing(request);
  if (review !== "yes")
    return review === "no"
      ? json({ error: "Only I can let fish in." }, 403)
      : refused(review);
  if (!inBlob() && !inFolder())
    return json({ error: "The aquarium isn't set up yet." }, 503);
  try {
    return json({ fish: fish(id, await letIn(id), "shown", null) });
  } catch {
    return json({ error: "That fish isn't waiting anymore." }, 404);
  }
}
