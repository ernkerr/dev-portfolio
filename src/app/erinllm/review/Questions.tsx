"use client";

import { useEffect, useState } from "react";
import SignOut from "@/app/review/SignOut";
import Answer from "@/components/site/erinllm/Answer";
import { focusRing } from "@/components/site/links";
import type { Kept } from "@/lib/erinllm/types";

// The questions people asked ErinLLM, newest first, each with the page they
// were on and the answer they got, to delete or to learn from. The page is
// only for me once I've signed in at /review (src/lib/reviewSession.ts); if
// that's run out, it sends me back.

const label = "font-mono text-label uppercase";
const action = `${label} text-site-ink transition-colors hover:text-site-blue disabled:text-site-muted ${focusRing}`;

const date = (ms: number) =>
  new Date(ms).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export default function Questions() {
  const [questions, setQuestions] = useState<Kept[] | null>(null);
  const [canKeep, setCanKeep] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);

  const call = (method: string, query = "") =>
    fetch(`/api/erinllm?review${query}`, { method, cache: "no-store" });

  // Signed out (it lasts 7 days): back to /review, then here again
  const signedOut = (res: Response | null) => {
    if (res?.status !== 401) return false;
    location.assign("/review?next=/erinllm/review");
    return true;
  };

  useEffect(() => {
    (async () => {
      const res = await call("GET").catch(() => null);
      if (signedOut(res)) return;
      const data = await res?.json().catch(() => null);
      if (!res?.ok)
        return setError(data?.error ?? "The questions didn't load.");
      setQuestions(data.questions);
      setCanKeep(data.canKeep);
    })();
  }, []);

  const remove = async (question: Kept) => {
    if (confirm !== question.id) return setConfirm(question.id);
    setBusy(question.id);
    const res = await call("DELETE", `&id=${question.id}`).catch(() => null);
    setBusy(null);
    setConfirm(null);
    if (signedOut(res)) return;
    if (!res?.ok) return setError("That didn't delete.");
    setQuestions((all) => (all ?? []).filter((q) => q.id !== question.id));
  };

  if (questions === null)
    return error ? (
      <p role="alert" className="text-caption text-site-muted">
        {error}
      </p>
    ) : null;

  return (
    <div className="max-w-measure">
      {error && (
        <p role="alert" className="mb-6 text-caption text-site-muted">
          {error}
        </p>
      )}
      {!canKeep && (
        <p className="mb-6 text-caption text-site-muted">
          Questions aren’t being kept yet: connect a Blob store to the project.
        </p>
      )}
      <h2 className={`${label} text-site-muted`}>
        Questions ({questions.length})
      </h2>
      {questions.length ? (
        <ol className="mt-6 divide-y divide-site-line border-y border-site-line">
          {questions.map((q) => (
            <li key={q.id} className="py-6">
              <p className="font-mono text-date text-site-muted">
                {date(q.at)} · {q.path || "unknown page"}
                {q.side === "engineer" && " · engineer side"}
              </p>
              {q.attached && (
                <div className="mt-3 border-l border-site-line pl-3">
                  <p className="text-caption text-site-muted">
                    {q.attached.label}
                  </p>
                  {q.attached.text && (
                    <p className="text-caption text-site-ink/75">
                      “{q.attached.text}”
                    </p>
                  )}
                </div>
              )}
              <p className="mt-3 whitespace-pre-wrap text-body-sm font-medium text-site-ink">
                {q.question}
              </p>
              <div className="mt-3 text-body-sm text-site-ink/80 [&_strong]:font-medium [&_strong]:text-site-ink">
                <Answer text={q.answer} />
              </div>
              <button
                type="button"
                disabled={busy === q.id}
                onClick={() => remove(q)}
                className={`mt-4 ${action}`}
              >
                {confirm === q.id ? "Delete it?" : "Delete"}
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-3 text-body-sm text-site-muted">
          No one’s asked anything yet.
        </p>
      )}
      <div className="mt-12">
        <SignOut />
      </div>
    </div>
  );
}
