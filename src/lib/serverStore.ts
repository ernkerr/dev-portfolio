import { createHash, timingSafeEqual } from "node:crypto";
import {
  reviewKey,
  reviewOpen,
  sessionOf,
  validSession,
} from "@/lib/reviewSession";

// What the camera (src/app/api/camera) and ErinLLM (src/app/api/erinllm)
// share on the server: where things people leave are kept, and whether it's
// me reviewing them (signed in at /review, src/lib/reviewSession.ts).
//
// Things go to Vercel Blob once a Blob store is connected to the project
// (BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID). Without one, while developing,
// they go to .data/ in the project (ignored by git); in production they
// aren't kept.

export const inBlob = () =>
  Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
export const inFolder = () =>
  !inBlob() && process.env.NODE_ENV !== "production";

export const hash = (text: string) =>
  createHash("sha256").update(text).digest();

// Who's asking, for rate limits. Vercel sets x-real-ip.
export const ipOf = (request: Request) =>
  request.headers.get("x-real-ip") ??
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  "local";

export const today = () => Math.floor(Date.now() / 86_400_000);

// A count per key that starts over each day. It lives in this server
// instance's memory, so it's best effort: Vercel reuses an instance across
// requests, and a quiet site runs on one or two.
export type DailyCounts = Map<string, { day: number; n: number }>;

export const countOf = (counts: DailyCounts, key: string) => {
  const count = counts.get(key);
  return count?.day === today() ? count.n : 0;
};

export const bump = (counts: DailyCounts, key: string) => {
  // Forget earlier days before the map gets big
  if (counts.size > 10_000)
    for (const [k, c] of counts) if (c.day !== today()) counts.delete(k);
  counts.set(key, { day: today(), n: countOf(counts, key) + 1 });
};

// After 10 wrong passwords in a day, an IP can't sign in until tomorrow, so
// the password can't be guessed.
const WRONG_PER_DAY = 10;
const wrong: DailyCounts = new Map();

// Signing in at /review (src/app/api/review)
export const checkPassword = (
  request: Request,
  given: string,
): "yes" | "unset" | "wrong" | "locked" => {
  const key = reviewKey();
  if (!key) return "unset";
  const ip = ipOf(request);
  if (countOf(wrong, ip) >= WRONG_PER_DAY) return "locked";
  if (timingSafeEqual(hash(given), hash(key))) return "yes";
  bump(wrong, ip);
  return "wrong";
};

// Whether this is me, reviewing: with ?review, signed in. Locally, without
// a password set, it needs neither sign-in nor password.
export const reviewing = async (
  request: Request,
): Promise<"yes" | "no" | "unset" | "out"> => {
  if (!new URL(request.url).searchParams.has("review")) return "no";
  if (reviewOpen()) return "yes";
  if (!reviewKey()) return "unset";
  return (await validSession(sessionOf(request))) ? "yes" : "out";
};

export const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

export const refused = (review: "unset" | "out") =>
  json(
    {
      error:
        review === "unset"
          ? "Reviewing isn't set up yet: add REVIEW_KEY."
          : "Sign in again at /review.",
    },
    401,
  );
