import type { Metadata } from "next";
import { requireSignIn } from "@/app/review/guard";
import SiteShell from "@/components/site/SiteShell";
import Review from "./Review";

// Where I check the fish people drop in the aquarium. Like the camera's
// review page, it's not linked anywhere, search engines skip it, and it's
// only for me once I've signed in at /review.
export const metadata: Metadata = {
  title: "Review fish",
  robots: { index: false, follow: false },
};

export default async function ReviewPage() {
  await requireSignIn("/fun/aquarium/review");
  return (
    <SiteShell>
      <section className="max-w-measure pb-12 pt-16 md:pt-20">
        <h1 className="font-serif text-display-sm md:text-display">
          Fish in my aquarium
        </h1>
        <p className="mt-6 text-body text-site-ink/80">
          Every new fish waits here, swimming only for whoever drew it, until
          I let it in.
        </p>
      </section>
      <Review />
    </SiteShell>
  );
}
