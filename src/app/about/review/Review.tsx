"use client";

import { useEffect, useState } from "react";
import { focusRing } from "@/components/site/links";
import SignOut from "@/app/review/SignOut";

// The review list: the photos waiting for me, to approve or delete, and the
// ones shown, to take down. The page is only for me once I've signed in at
// /review (src/lib/reviewSession.ts); if that's run out, it sends me back.

type Photo = { id: string; src: string; at: number; waiting: boolean };

const label = "font-mono text-label uppercase";
const action = `${label} text-site-ink transition-colors hover:text-site-blue disabled:text-site-muted ${focusRing}`;

export default function Review() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);

  const call = (method: string, query = "") =>
    fetch(`/api/camera?review${query}`, { method, cache: "no-store" });

  // Signed out (it lasts 7 days): back to /review, then here again
  const signedOut = (res: Response | null) => {
    if (res?.status !== 401) return false;
    location.assign("/review?next=/about/review");
    return true;
  };

  useEffect(() => {
    (async () => {
      const res = await call("GET").catch(() => null);
      if (signedOut(res)) return;
      const data = await res?.json().catch(() => null);
      if (!res?.ok) return setError(data?.error ?? "The photos didn't load.");
      setPhotos(data.photos);
    })();
  }, []);

  const approve = async (photo: Photo) => {
    setBusy(photo.id);
    const res = await call("PATCH", `&id=${photo.id}`).catch(() => null);
    const data = await res?.json().catch(() => null);
    setBusy(null);
    if (signedOut(res)) return;
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
    if (signedOut(res)) return;
    if (!res?.ok) return setError("That didn't delete.");
    setPhotos((all) => (all ?? []).filter((p) => p.id !== photo.id));
  };

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
      {photos && (
        <>
          {list(
            photos.filter((p) => p.waiting),
            "Waiting",
            "Nothing's waiting.",
          )}
          {list(
            photos.filter((p) => !p.waiting),
            "Shown",
            "No one's photos are shown yet.",
          )}
        </>
      )}
      <div className="mt-12">
        <SignOut />
      </div>
    </div>
  );
}
