import type { Metadata } from "next";
import Link from "next/link";
import { inlineLink } from "@/components/site/prose";
import SiteShell from "@/components/site/SiteShell";
import { reviewOpen, safeNext } from "@/lib/reviewSession";
import { signedIn as isSignedIn } from "./guard";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import PhotoReview from "@/app/about/review/Review";
import Questions from "@/app/erinllm/review/Questions";
import FishReview from "@/app/fun/aquarium/review/Review";

// Where I sign in to my review pages (src/lib/reviewSession.ts), and once
// I'm in, all three reviews on one page. Each still has its own page too.
// It's not linked anywhere and search engines skip it.
export const metadata: Metadata = {
  title: "Review",
  robots: { index: false, follow: false },
};

const PAGES = [
  { id: "fish", href: "/fun/aquarium/review", name: "Fish in my aquarium", Review: FishReview },
  { id: "photos", href: "/about/review", name: "Photos left on my camera", Review: PhotoReview },
  { id: "questions", href: "/erinllm/review", name: "What people asked erinLLM", Review: Questions },
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
          <ul className="mt-6 space-y-3 text-body">
            {PAGES.map((page) => (
              <li key={page.href}>
                <a href={`#${page.id}`} className={inlineLink}>
                  {page.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6">
            <SignIn next={safeNext(next)} />
          </div>
        )}
      </section>
      {signedIn && (
        <>
          {PAGES.map(({ id, href, name, Review }) => (
            <section
              key={href}
              id={id}
              aria-label={name}
              className="scroll-mt-24 border-t border-site-line pb-16 pt-12"
            >
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h2 className="font-serif text-display-sm">{name}</h2>
                <Link href={href} className={inlineLink}>
                  Its own page
                </Link>
              </div>
              <Review inline />
            </section>
          ))}
          {open ? (
            <p className="pb-12 text-caption text-site-muted">
              There&apos;s no password set while developing, so these are
              open. On the live site they take REVIEW_KEY.
            </p>
          ) : (
            <div className="pb-12">
              <SignOut />
            </div>
          )}
        </>
      )}
    </SiteShell>
  );
}
