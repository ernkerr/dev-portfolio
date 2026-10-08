"use client";

import { useChat } from "@ai-sdk/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type DragEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { EMAIL, focusRing } from "@/components/site/links";
import { inlineLink, label } from "@/components/site/prose";
import { splitAnswer, type Source } from "@/lib/erinllm/answer";
import { pageAt } from "@/lib/erinllm/pages";
import {
  MAX,
  type Anchors,
  type Attached,
  type ErinMessage,
  type ErrorCode,
} from "@/lib/erinllm/types";
import Answer from "./Answer";
import { canDrop, readDrop } from "./drop";
import { currentSide, pageName } from "./pageContext";
import { clearAttached, getChat, openErinLLM, save, useErinLLM } from "./store";
import { track, type AskSource } from "./track";

// ErinLLM's panel: a sheet down the right side under the header (the whole
// screen on phones). It doesn't block the page, so people can keep reading
// and drag things from it into the chat. The conversation lives in store.ts.

const SUGGESTIONS = [
  "What’s your background in design and engineering?",
  "Tell me about yourself",
  "What do you do for fun?",
];

// On a case study, first: what reviewers ask about a project
const projectQuestions = (name: string) => [
  `What was your role on ${name}?`,
  "What shipped, and what’s still a concept?",
  `What would you change about ${name} now?`,
];

const JOB_QUESTION = "How would I fit this role?";
// Longer than this, pasted text is attached instead of typed
const LONG_PASTE = 400;
const LOOKS_LIKE_A_JOB =
  /responsibilit|requirements|qualifications|about the role|what you.ll do|we.re looking for|years of experience/i;

const ERRORS: Record<ErrorCode, string> = {
  rate_limited: `That’s a lot of questions at once. Try again in a few minutes, or email me at ${EMAIL}.`,
  busy: `I’m busy, try again in a minute, or email me at ${EMAIL}.`,
  not_set_up: `erinLLM isn’t set up yet. Email me at ${EMAIL}.`,
  error: `Something went wrong. Try again, or email me at ${EMAIL}.`,
};

const codeOf = (error: Error): ErrorCode =>
  error.message in ERRORS
    ? (error.message as ErrorCode)
    : (error as { statusCode?: number }).statusCode === 429
      ? "rate_limited"
      : "error";

const textOf = (message: ErinMessage) =>
  message.parts.map((p) => (p.type === "text" ? p.text : "")).join("");

// The conversation as plain text, to paste into an email or a doc
function transcript(messages: ErinMessage[]) {
  const site = location.origin;
  const link = (s: Source) => `${s.label} (${site}${s.href})`;
  // Markdown to plain text: [Carpoolio](/carpoolio) -> Carpoolio (https://…)
  const plain = (text: string) =>
    text
      .replace(/\[([^\]]+)\]\((\/[^)]*)\)/g, `$1 (${site}$2)`)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
      .replace(/\*\*([^*]+)\*\*/g, "$1");
  const turns = messages.map((m) => {
    if (m.role === "user") {
      const about = m.metadata?.attached;
      return [about ? `You, about ${about.label}:` : "You:", textOf(m)].join(
        " ",
      );
    }
    const { body, sources } = splitAnswer(textOf(m), m.metadata?.anchors);
    return [
      `erinLLM: ${plain(body)}`,
      sources.length ? `Sources: ${sources.map(link).join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  });
  return [
    `A conversation with erinLLM, the AI on Erin Kerr's portfolio (${site}). It can get things wrong; Erin is at ${EMAIL}.`,
    ...turns,
  ].join("\n\n");
}

const quiet = `font-mono text-label uppercase text-site-muted transition-colors hover:text-site-blue ${focusRing}`;
const submit = `shrink-0 border border-site-line px-4 py-2 font-mono text-label uppercase text-site-ink transition-colors hover:text-site-blue disabled:text-site-muted disabled:hover:text-site-muted ${focusRing}`;

// Questions to tap: the suggestions, a case study's questions, and the
// follow-ups after an answer
function Questions({
  items,
  onAsk,
}: {
  items: string[];
  onAsk: (question: string) => void;
}) {
  return (
    <ul className="border-t border-site-line">
      {items.map((q) => (
        <li key={q} className="border-b border-site-line">
          <button
            type="button"
            onClick={() => onAsk(q)}
            className={`flex w-full gap-3 py-3 text-left text-body-sm text-site-ink/80 transition-colors hover:text-site-blue ${focusRing}`}
          >
            <span aria-hidden="true">→</span>
            {q}
          </button>
        </li>
      ))}
    </ul>
  );
}

function AttachedQuote({ attached }: { attached: Attached }) {
  return (
    <div className="mt-2 border-l border-site-line pl-3">
      <p className="text-caption text-site-muted">{attached.label}</p>
      {attached.text && (
        <p className="line-clamp-3 text-caption text-site-ink/75">
          “{attached.text}”
        </p>
      )}
    </div>
  );
}

// One of ErinLLM's answers: the text, where it came from, and (for the
// newest one) what to ask next
function AnswerTurn({
  text,
  anchors,
  latest,
  onFollow,
  onAsk,
}: {
  text: string;
  anchors?: Anchors;
  latest: boolean;
  onFollow: () => void;
  onAsk: (question: string) => void;
}) {
  const { body, sources, followUps } = splitAnswer(text, anchors);
  return (
    <>
      <div className="mt-2 text-body-sm text-site-ink/80 [&_strong]:font-medium [&_strong]:text-site-ink">
        {body ? (
          <Answer text={body} onFollow={onFollow} anchors={anchors} />
        ) : (
          <p className="text-site-muted">Thinking…</p>
        )}
      </div>
      {sources.length > 0 && (
        <p className="mt-3 text-caption text-site-muted">
          {sources.length > 1 ? "Sources: " : "Source: "}
          {sources.map((source, i) => (
            <span key={source.href}>
              {i > 0 && " · "}
              <Link
                href={source.href}
                onClick={onFollow}
                className={inlineLink}
              >
                {source.label}
              </Link>
            </span>
          ))}
        </p>
      )}
      {latest && followUps.length > 0 && (
        <div className="mt-4">
          <Questions items={followUps} onAsk={onAsk} />
        </div>
      )}
    </>
  );
}

export default function Panel({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const { open, attached, attachedFrom, focus } = useErinLLM();
  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
    regenerate,
    setMessages,
    clearError,
  } = useChat({ chat: getChat() });
  const busy = status === "submitted" || status === "streaming";
  const pathname = usePathname();

  const [input, setInput] = useState("");
  const [drags, setDrags] = useState(0); // dragenters minus dragleaves
  const [where, setWhere] = useState({
    name: "",
    engineer: false,
    project: false,
  });
  const [announce, setAnnounce] = useState("");
  const [jobMode, setJobMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const box = useRef<HTMLTextAreaElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const stick = useRef(true); // keep the newest message in view
  const focused = useRef(focus);
  const wasBusy = useRef(busy);

  // "Looking at": the page, and the side when it's the engineer's
  useEffect(() => {
    if (open)
      setWhere({
        name: pageName(),
        engineer: currentSide() === "engineer",
        project: Boolean(pageAt(location.pathname)?.project),
      });
  }, [open, pathname, status]);

  // Into the question box whenever ErinLLM is opened or something's attached
  useEffect(() => {
    if (focus === focused.current) return;
    focused.current = focus;
    if (open) box.current?.focus({ preventScroll: true });
  }, [focus, open]);

  // The box grows with the question, up to about 6 lines
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    el.style.height = "auto";
    const height = el.scrollHeight + el.offsetHeight - el.clientHeight;
    el.style.height = `${Math.min(height, 160)}px`;
    el.style.overflowY = height > 160 ? "auto" : "hidden";
  }, [input]);

  useEffect(() => {
    const el = scroller.current;
    if (el && stick.current) el.scrollTop = el.scrollHeight;
  }, [messages, status, error]);

  // Tell screen readers when an answer is done
  useEffect(() => {
    if (wasBusy.current && status === "ready") setAnnounce("erinLLM answered.");
    if (busy) setAnnounce("");
    wasBusy.current = busy;
  }, [busy, status]);

  function ask(text: string, source: AskSource) {
    const question = text.trim().slice(0, MAX.question);
    if (!question || busy) return;
    stick.current = true;
    void sendMessage({
      text: question,
      metadata: attached ? { attached } : undefined,
    });
    track("erinllm_ask", {
      source:
        attached?.kind === "job"
          ? "job"
          : attached
            ? attachedFrom === "drop"
              ? "drop"
              : "selection"
            : source,
    });
    clearAttached();
    setInput("");
    setJobMode(false);
  }

  // A job description, or anything long, goes in as an attachment so it
  // isn't cut off at the question's length
  const onPaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData("text").trim();
    if (!text || (!jobMode && text.length < LONG_PASTE)) return;
    e.preventDefault();
    const job = jobMode || LOOKS_LIKE_A_JOB.test(text);
    openErinLLM(
      job
        ? {
            kind: "job",
            label: "Job description",
            text: text.slice(0, MAX.job),
          }
        : {
            kind: "quote",
            label: "Pasted text",
            text: text.slice(0, MAX.quote),
          },
      "paste",
    );
    if (job && !input.trim()) setInput(JOB_QUESTION);
    setJobMode(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(transcript(messages));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  function startOver() {
    void stop();
    clearError();
    setMessages([]);
    save([]);
    clearAttached();
    setJobMode(false);
    box.current?.focus();
  }

  // After following a link in an answer on a phone, show the page
  const followed = () => {
    if (matchMedia("(max-width: 767px)").matches) onClose();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  const onDragEnter = (e: DragEvent) => {
    if (!canDrop(e.dataTransfer)) return;
    e.preventDefault();
    setDrags((n) => n + 1);
  };
  const onDragOver = (e: DragEvent) => {
    if (!canDrop(e.dataTransfer)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrags(0);
    const dropped = readDrop(e.dataTransfer);
    if (dropped) openErinLLM(dropped, "drop");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input, "typed");
  };

  const last = messages.at(-1);
  const waiting = status === "submitted" && last?.role === "user";
  const code = error ? codeOf(error) : null;

  return (
    <aside
      id={id}
      data-erinllm
      aria-label="erinLLM"
      inert={!open}
      onKeyDown={onKeyDown}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={() => setDrags((n) => Math.max(0, n - 1))}
      onDrop={onDrop}
      // Opening, it's visible at once (so the question box can take focus);
      // closing, it hides only once it has slid away
      className={`fixed bottom-0 right-0 top-header z-50 flex w-full flex-col border-l border-site-line bg-site-paper font-sans text-site-ink shadow-float ring-1 ring-black/5 duration-300 ease-switch motion-reduce:transition-none md:w-chat ${
        open
          ? "visible translate-x-0 transition-transform"
          : "invisible translate-x-full transition-[transform,visibility]"
      }`}
    >
      <div className="flex h-12 shrink-0 items-center justify-between gap-4 border-b border-site-line px-gutter">
        <h2 className={`${label} normal-case`}>erinLLM</h2>
        <div className="flex items-center gap-5">
          {messages.length > 0 && !busy && (
            <button type="button" onClick={copy} className={quiet}>
              {copied ? "Copied" : "Copy"}
            </button>
          )}
          {messages.length > 0 && (
            <button type="button" onClick={startOver} className={quiet}>
              Start over
            </button>
          )}
          <button type="button" onClick={onClose} className={quiet}>
            Close
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={(e) => {
          const el = e.currentTarget;
          stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
        }}
        className="flex-1 overflow-y-auto px-gutter py-6"
      >
        {where.name && (
          <p className={`${label} mb-6`}>
            Looking at: {where.name}
            {where.engineer && " · Engineer side"}
          </p>
        )}

        {messages.length === 0 ? (
          <div>
            <p className="font-serif text-subhead text-site-ink">
              Hey there, I’m erinLLM.
            </p>
            <p className="mt-3 text-body-sm text-site-ink/75">
              Talk to an AI chat bot that answers questions about me.
            </p>
            <p className="mt-3 text-caption text-site-muted">
              I can answer questions about my experience, how I work, my
              projects and what I do for fun, from what’s on this site.
            </p>
            {where.project && (
              <>
                <p className={`${label} mb-3 mt-6`}>About {where.name}</p>
                <Questions
                  items={projectQuestions(where.name)}
                  onAsk={(q) => ask(q, "suggestion")}
                />
              </>
            )}
            {where.project && <p className={`${label} mb-3 mt-6`}>About me</p>}
            <div className={where.project ? "" : "mt-6"}>
              <Questions
                items={SUGGESTIONS}
                onAsk={(q) => ask(q, "suggestion")}
              />
            </div>
            <p className={`${label} mb-3 mt-6`}>Hiring?</p>
            <Questions
              items={["Paste a job description to see how I’d fit"]}
              onAsk={() => {
                setJobMode(true);
                box.current?.focus();
              }}
            />
            <p className="mt-6 text-caption text-site-muted">
              Highlight text or drag something here to ask about it.
            </p>
          </div>
        ) : (
          <ol className="divide-y divide-site-line">
            {messages.map((m) => {
              const text = textOf(m);
              return (
                <li key={m.id} className="py-5 first:pt-0">
                  <p className={label}>
                    {m.role === "user" ? (
                      "You"
                    ) : (
                      <span className="normal-case">erinLLM</span>
                    )}
                  </p>
                  {m.role === "user" ? (
                    <>
                      {m.metadata?.attached && (
                        <AttachedQuote attached={m.metadata.attached} />
                      )}
                      <p className="mt-2 whitespace-pre-wrap text-body-sm text-site-ink">
                        {text}
                      </p>
                    </>
                  ) : (
                    <AnswerTurn
                      text={text}
                      anchors={m.metadata?.anchors}
                      latest={m.id === last?.id && !busy}
                      onFollow={followed}
                      onAsk={(q) => ask(q, "followup")}
                    />
                  )}
                </li>
              );
            })}
            {waiting && (
              <li className="py-5">
                <p className={`${label} normal-case`}>erinLLM</p>
                <p className="mt-2 text-body-sm text-site-muted">Thinking…</p>
              </li>
            )}
          </ol>
        )}

        {code && (
          <div role="alert" className="mt-2 text-caption text-site-muted">
            <p>{ERRORS[code]}</p>
            {code !== "not_set_up" && (
              <button
                type="button"
                onClick={() => {
                  stick.current = true;
                  void regenerate();
                }}
                className={`mt-2 ${quiet}`}
              >
                Try again
              </button>
            )}
          </div>
        )}
        <p aria-live="polite" className="sr-only">
          {announce}
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="shrink-0 border-t border-site-line px-gutter py-4"
      >
        {attached && (
          <div className="mb-3 flex items-start gap-3 border border-site-line px-3 py-2">
            <div className="min-w-0 flex-1">
              <p className={label}>
                {attached.kind === "job" ? "Job description" : "Asking about"}
              </p>
              <p className="mt-1 line-clamp-2 text-caption text-site-ink/80">
                {attached.text ? `“${attached.text}”` : attached.label}
              </p>
            </div>
            <button type="button" onClick={clearAttached} className={quiet}>
              Remove
            </button>
          </div>
        )}
        <div className="flex items-end gap-3">
          <label htmlFor={`${id}-question`} className="sr-only">
            Ask about Erin
          </label>
          <textarea
            id={`${id}-question`}
            ref={box}
            rows={1}
            value={input}
            maxLength={MAX.question}
            placeholder={
              jobMode ? "Paste the job description here" : "Ask about Erin"
            }
            onPaste={onPaste}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                ask(input, "typed");
              }
            }}
            className={`min-w-0 flex-1 resize-none border border-site-line bg-site-paper px-3 py-2 text-body text-site-ink placeholder:text-site-muted ${focusRing}`}
          />
          {busy ? (
            <button
              type="button"
              onClick={() => void stop()}
              className={submit}
            >
              Stop
            </button>
          ) : (
            <button type="submit" disabled={!input.trim()} className={submit}>
              Send
            </button>
          )}
        </div>
        <p className="mt-3 text-caption text-site-muted">
          I’m an AI built from Erin’s site and can get things wrong. Questions
          are saved so she can improve my answers. Don’t share anything private.
        </p>
      </form>

      {drags > 0 && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center border border-site-blue bg-site-paper/90">
          <p className="font-mono text-label uppercase text-site-blue">
            Drop to ask about this
          </p>
        </div>
      )}
    </aside>
  );
}
