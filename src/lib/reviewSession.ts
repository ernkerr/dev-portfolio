// Signing me in to my review pages (/about/review for the camera's photos,
// /erinllm/review for what people ask ErinLLM). I sign in once at /review
// with the password in REVIEW_KEY; that sets a cookie for 7 days. Scripts
// on the page can't read the cookie (httpOnly), and other sites can't send
// it (SameSite=Strict).
//
// The cookie holds when it expires, signed with the password itself, so it
// can't be forged, and changing the password signs everyone out. The review
// pages check it on the server (src/app/review/guard.ts), and so do their
// APIs (reviewing() in src/lib/serverStore.ts).

export const REVIEW_COOKIE = "review_session";
const DAYS = 7;

// CAMERA_REVIEW_KEY was its first name; either works
export const reviewKey = () =>
  process.env.REVIEW_KEY || process.env.CAMERA_REVIEW_KEY || "";

// While developing without a password, the review pages are open
export const reviewOpen = () =>
  !reviewKey() && process.env.NODE_ENV !== "production";

const encoder = new TextEncoder();

async function sign(message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(reviewKey()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message),
  );
  return Array.from(new Uint8Array(signature), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}

// Compares in the same time whatever the strings, so timing gives nothing away
function same(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function newSession() {
  const expires = Date.now() + DAYS * 86_400_000;
  return {
    value: `${expires}.${await sign(`review:${expires}`)}`,
    maxAge: DAYS * 86_400,
  };
}

export async function validSession(value: string | undefined) {
  if (!reviewKey() || !value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || !(Number(expires) > Date.now())) return false;
  return same(signature, await sign(`review:${expires}`));
}

// The session cookie on a plain Request (API routes)
export const sessionOf = (request: Request) =>
  request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${REVIEW_COOKIE}=`))
    ?.slice(REVIEW_COOKIE.length + 1);

// Where to go after signing in: one of my pages, never another site
export const safeNext = (next: string | null | undefined) =>
  next && next.startsWith("/") && !next.startsWith("//") ? next : "/review";
