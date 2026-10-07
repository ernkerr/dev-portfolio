import { NextResponse } from "next/server";
import { REVIEW_COOKIE, newSession } from "@/lib/reviewSession";
import { checkPassword } from "@/lib/serverStore";

// Signing in to my review pages, at /review (src/lib/reviewSession.ts).
//
//   POST    { password } signs in: sets the session cookie for 7 days
//   DELETE  signs out

export const dynamic = "force-dynamic";

const reply = (body: object, status = 200) =>
  NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password =
    typeof body?.password === "string" ? body.password.slice(0, 200) : "";
  const check = checkPassword(request, password);
  if (check === "unset")
    return reply({ error: "There's no password yet: add REVIEW_KEY." }, 503);
  if (check === "locked")
    return reply(
      { error: "Too many wrong passwords today. Try again tomorrow." },
      429,
    );
  if (check === "wrong")
    return reply({ error: "That password didn't work." }, 401);

  const session = await newSession();
  const response = reply({ signedIn: true });
  response.cookies.set(REVIEW_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: session.maxAge,
  });
  return response;
}

export async function DELETE() {
  const response = reply({ signedIn: false });
  response.cookies.delete(REVIEW_COOKIE);
  return response;
}
