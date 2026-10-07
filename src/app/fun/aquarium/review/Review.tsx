"use client";

import { useEffect, useState } from "react";
import { focusRing } from "@/components/site/links";
import SignOut from "@/app/review/SignOut";
import type { Fish } from "@/lib/aquarium";

// The fish waiting for me, to let in or remove, and the ones swimming for
// everyone, to take out. Signed out (it lasts 7 days), it sends me back to
// /review.

const label = "font-mono text-label uppercase";
const action = `${label} text-site-ink transition-colors hover:text-site-blue disabled:text-site-muted ${focusRing}`;

export default function Review() {
  const [fish, setFish] = useState<Fish[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);

  const call = (method: string, query = "") =>
    fetch(`/api/aquarium?review${query}`, { method, cache: "no-store" });

  const signedOut = (res: Response | null) => {
    if (res?.status !== 401) return false;
    location.assign("/review?next=/fun/aquarium/review");
    return true;
  };

  useEffect(() => {
    (async () => {
      const res = await call("GET").catch(() => null);
      if (signedOut(res)) return;
      const data = await res?.json().catch(() => null);
      if (!res?.ok) return setError(data?.error ?? "The fish didn't load.");
      setFish(data.fish);
    })();
  }, []);

  const letIn = async (f: Fish) => {
    setBusy(f.id);
    const res = await call("PATCH", `&id=${encodeURIComponent(f.id)}`).catch(() => null);
    const data = await res?.json().catch(() => null);
    setBusy(null);
    if (signedOut(res)) return;
    if (!res?.ok) return setError(data?.error ?? "That didn't let it in.");
    setFish((all) => (all ?? []).map((x) => (x.id === f.id ? data.fish : x)));
  };

  const remove = async (f: Fish) => {
    if (confirm !== f.id) return setConfirm(f.id);
    setBusy(f.id);
    const res = await call("DELETE", `&id=${encodeURIComponent(f.id)}`).catch(() => null);
    setBusy(null);
    setConfirm(null);
    if (signedOut(res)) return;
    if (!res?.ok) return setError("That didn't remove it.");
    setFish((all) => (all ?? []).filter((x) => x.id !== f.id));
  };

  const date = (ms: number) =>
    new Date(ms).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const list = (items: Fish[], title: string, empty: string) => (
    <section aria-label={title} className="mt-10 first:mt-0">
      <h2 className={`${label} text-site-muted`}>
        {title} ({items.length})
      </h2>
      {items.length ? (
        <ul className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((f) => (
            <li key={f.id}>
              <div className="flex aspect-photo items-center justify-center border border-site-line bg-tank-water p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={`${f.name}, drawn ${date(f.at)}`} className="max-h-full max-w-full" />
              </div>
              <p className="mt-3 text-body-sm text-site-ink">{f.name}</p>
              <p className="font-mono text-date text-site-muted">{date(f.at)}</p>
              <div className="mt-3 flex gap-6">
                {f.waiting && (
                  <button type="button" disabled={busy === f.id} onClick={() => letIn(f)} className={action}>
                    Let in
                  </button>
                )}
                <button type="button" disabled={busy === f.id} onClick={() => remove(f)} className={action}>
                  {confirm === f.id ? "Remove it?" : f.waiting ? "Remove" : "Take out"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-body-sm text-site-muted">{empty}</p>
      )}
    </section>
  );

  return (
    <div>
      {error && (
        <p role="alert" className="mb-6 text-caption text-site-muted">
          {error}
        </p>
      )}
      {fish && (
        <>
          {list(fish.filter((f) => f.waiting), "Waiting", "Nothing's waiting.")}
          {list(fish.filter((f) => !f.waiting), "Swimming", "No fish yet.")}
        </>
      )}
      <div className="mt-12">
        <SignOut />
      </div>
    </div>
  );
}
