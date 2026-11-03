import type { Metadata } from "next";
import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Design from "./Design";
import Engineering from "./Engineering";

export const metadata: Metadata = {
  title: "Gin Score Tracker",
  description:
    "How Erin Kerr designed Gin Score Tracker, an App Store app for scoring Gin Rummy, and moved its paywall after a 1-star review.",
  alternates: { canonical: "/ginScoreTracker" },
};

// Once a day the live numbers are counted from App Store Connect, which takes
// about 10 seconds. Vercel's default limit is 10, so that visit (or Google's
// crawl) got a 504 and the count was never cached.
export const maxDuration = 60;

export default async function GinScoreTracker({
  searchParams,
}: {
  searchParams: Promise<{ side?: string }>;
}) {
  const { side } = await searchParams;
  return (
    <CaseStudy
      project="Gin Score Tracker"
      engineerFirst={isEngineerSide(side)}
      design={<Design />}
      engineering={<Engineering />}
    />
  );
}
