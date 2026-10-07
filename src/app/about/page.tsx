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

// The room as it is, as big as fits, and under it the way to every
// version of it I made along the way (/about/ideation).
export default function AboutPage() {
  return (
    <SiteShell>
      <h1 className="sr-only">About</h1>
      <div className="pt-16 md:pt-28">
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
