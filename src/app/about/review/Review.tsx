"use client";

import { useEffect, useState } from "react";
import { focusRing } from "@/components/site/links";

// The review list: the photos waiting for me, to approve or delete, and the
// ones shown, to take down. It asks for the review key the first time and
// keeps it in this browser.
const KEY = "about-camera-review";

type Photo = { id: string; src: string; at: number; waiting: boolean };

const label = "font-mono text-label uppercase";
const action = `${label} text-site-ink transition-colors hover:text-site-blue disabled:text-site-muted ${focusRing}`;

function savedKey() {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

export default function Review() {
  const [key, setKey] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);

  const call = (method: string, query = "", review = key ?? "") =>
    fetch(`/api/camera?review${query}`, {
      method,
      cache: "no-store",
      headers: { "x-camera-review": review },
    });

  const load = async (review: string) => {
    const res = await call("GET", "", review).catch(() => null);
    const data = await res?.json().catch(() => null);
    if (!res?.ok) {
      setPhotos(null);
      setError(data?.error ?? "The photos didn't load.");
      return false;
    }
    setError(null);
    setPhotos(data.photos);
    return true;
  };

  // With the key this browser kept, if it has one (locally, none's needed)
  useEffect(() => {
    const kept = savedKey();
    setKey(kept);
    load(kept);
    // load only reads its argument
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await load(draft)) {
      setKey(draft);
      try {
        localStorage.setItem(KEY, draft);
      } catch {}
    }
  };

  const approve = async (photo: Photo) => {
    setBusy(photo.id);
    const res = await call("PATCH", `&id=${photo.id}`).catch(() => null);
    const data = await res?.json().catch(() => null);
    setBusy(null);
    if (!res?.ok) return setError(data?.error ?? "That didn't approve.");
    setPhotos((all) =>
      (all ?? []).map((p) => (p.id === photo.id ? data.photo : p)),
    );
  };

  const remove = async (photo: Photo) => {
    if (confirm !== photo.id) return setConfirm(photo.id);
    setBusy(photo.id);
    const res = await call("DELETE", `&id=${photo.id}`).catch(() => null);
    setBusy(null);
    setConfirm(null);
    if (!res?.ok) return setError("That didn't delete.");
    setPhotos((all) => (all ?? []).filter((p) => p.id !== photo.id));
  };

  if (key === null) return null;

  if (photos === null)
    return (
      <form onSubmit={unlock} className="max-w-measure">
        <label htmlFor="review-key" className={`${label} text-site-muted`}>
          Review key
        </label>
        <div className="mt-3 flex gap-3">
          <input
            id="review-key"
            type="password"
            autoComplete="current-password"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className={`min-w-0 flex-1 border border-site-line bg-site-paper px-3 py-2 text-body text-site-ink ${focusRing}`}
          />
          <button
            type="submit"
            className={`border border-site-line px-4 py-2 ${action}`}
          >
            Unlock
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-3 text-caption text-site-muted">
            {error}
          </p>
        )}
      </form>
    );

  const waiting = photos.filter((p) => p.waiting);
  const shown = photos.filter((p) => !p.waiting);
  const date = (ms: number) =>
    new Date(ms).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const list = (items: Photo[], title: string, empty: string) => (
    <section aria-label={title} className="mt-10 first:mt-0">
      <h2 className={`${label} text-site-muted`}>
        {title} ({items.length})
      </h2>
      {items.length ? (
        <ul className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((photo) => (
            <li key={photo.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={`A photo left ${date(photo.at)}`}
                className="aspect-photo w-full border border-site-line bg-site-line object-cover"
              />
              <p className="mt-3 font-mono text-date text-site-muted">
                {date(photo.at)}
              </p>
              <div className="mt-3 flex gap-6">
                {photo.waiting && (
                  <button
                    type="button"
                    disabled={busy === photo.id}
                    onClick={() => approve(photo)}
                    className={action}
                  >
                    Approve
                  </button>
                )}
                <button
                  type="button"
                  disabled={busy === photo.id}
                  onClick={() => remove(photo)}
                  className={action}
                >
                  {confirm === photo.id
                    ? "Delete it?"
                    : photo.waiting
                      ? "Delete"
                      : "Take down"}
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
      {list(waiting, "Waiting", "Nothing's waiting.")}
      {list(shown, "Shown", "No one's photos are shown yet.")}
    </div>
  );
}
