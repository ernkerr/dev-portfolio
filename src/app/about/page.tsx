import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import { focusRing } from "@/components/site/links";
import { FinalRoom } from "./Room";

export const metadata: Metadata = {
  title: "About",
  description:
    "Erin Kerr is a product and UI/UX designer who engineers. Before design: 500+ research interviews at SRI International and brain-computer interface tools at Wispr AI.",
  alternates: { canonical: "/about" },
};

// A note on what the room's for, then the room as it is, as big as fits,
// and under it the way to every version of it I made along the way
// (/about/ideation).
export default function AboutPage() {
  return (
    <SiteShell>
      <div className="pt-10 md:pt-16">
        <h1 className="font-serif text-subhead text-site-ink">
          Explore and get to know me
        </h1>
        <p className="mt-2 max-w-measure text-body text-site-ink/80">
          Inspired from subletting across NY.
          <br />
          I&apos;m learning how much you can learn from a person by spending
          time in their space.
        </p>
      </div>
      <div className="pt-12 md:pt-16">
        <FinalRoom />
      </div>
      <div className="mt-16">
        <Link
          href="/about/ideation"
          className={`inline-flex border border-site-line px-4 py-2 font-mono text-nav uppercase text-site-ink transition-colors hover:border-site-blue hover:text-site-blue motion-reduce:transition-none ${focusRing}`}
        >
          Ideation
        </Link>
      </div>
    </SiteShell>
  );
}
