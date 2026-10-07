import type { Metadata } from "next";
import Link from "next/link";
import { inlineLink } from "@/components/site/prose";
import SiteShell from "@/components/site/SiteShell";
import { reviewOpen, safeNext } from "@/lib/reviewSession";
import { signedIn as isSignedIn } from "./guard";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

// Where I sign in to my review pages (src/lib/reviewSession.ts). It's not
// linked anywhere and search engines skip it.
export const metadata: Metadata = {
  title: "Review",
  robots: { index: false, follow: false },
};

const PAGES = [
  { href: "/about/review", name: "Photos left on my camera" },
  { href: "/erinllm/review", name: "What people asked erinLLM" },
  { href: "/fun/aquarium/review", name: "Fish in my aquarium" },
];

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const open = reviewOpen();
  const signedIn = await isSignedIn();

  return (
    <SiteShell>
      <section className="max-w-measure pb-12 pt-16 md:pt-20">
        <h1 className="font-serif text-display-sm md:text-display">Review</h1>
        {signedIn ? (
          <>
            <ul className="mt-6 space-y-3 text-body">
              {PAGES.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className={inlineLink}>
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
            {open ? (
              <p className="mt-10 text-caption text-site-muted">
                There&apos;s no password set while developing, so these are
                open. On the live site they take REVIEW_KEY.
              </p>
            ) : (
              <div className="mt-10">
                <SignOut />
              </div>
            )}
          </>
        ) : (
          <div className="mt-6">
            <SignIn next={safeNext(next)} />
          </div>
        )}
      </section>
    </SiteShell>
  );
}
