import type { Metadata } from "next";
import { requireSignIn } from "@/app/review/guard";
import SiteShell from "@/components/site/SiteShell";
import Questions from "./Questions";

// Where I read what people ask ErinLLM (src/app/api/erinllm). It's not
// linked anywhere, search engines skip it, and it's only for me once I've
// signed in at /review (src/app/review/guard.ts).
export const metadata: Metadata = {
  title: "erinLLM questions",
  robots: { index: false, follow: false },
};

export default async function ErinLLMReviewPage() {
  await requireSignIn("/erinllm/review");
  return (
    <SiteShell>
      <section className="max-w-measure pb-12 pt-16 md:pt-20">
        <h1 className="font-serif text-display-sm md:text-display">
          What people asked erinLLM
        </h1>
        <p className="mt-6 text-body text-site-ink/80">
          Every question someone asks erinLLM and the answer it gave, newest
          first, with nothing about who asked. When an answer is wrong, fix what
          it knows in src/lib/erinllm/knowledge.ts.
        </p>
      </section>
      <Questions />
    </SiteShell>
  );
}
