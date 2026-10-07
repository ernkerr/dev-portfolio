import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { REVIEW_COOKIE, reviewOpen, validSession } from "@/lib/reviewSession";

// Whether I'm signed in to my review pages (src/lib/reviewSession.ts)
export async function signedIn() {
  return (
    reviewOpen() ||
    (await validSession((await cookies()).get(REVIEW_COOKIE)?.value))
  );
}

// At the top of each review page: anyone not signed in goes to /review to
// sign in, then comes back. It's checked on the server, before the page is
// sent.
export async function requireSignIn(path: string) {
  if (!(await signedIn())) redirect(`/review?next=${encodeURIComponent(path)}`);
}
