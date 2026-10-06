import type { Metadata } from "next";
import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Design from "./Design";
import Engineering from "./Engineering";

export const metadata: Metadata = {
  title: "Hearts Score Tracker",
  description:
    "How Erin Kerr designed Hearts Score Tracker for a whole table of players, shipped it in 2 days on Gin's foundation, and turned it into the base for a family of score-tracker apps.",
  alternates: { canonical: "/heartsScoreTracker" },
};

export default async function HeartsScoreTracker({
  searchParams,
}: {
  searchParams: Promise<{ side?: string }>;
}) {
  const { side } = await searchParams;
  return (
    <CaseStudy
      project="Hearts Score Tracker"
      engineerFirst={isEngineerSide(side)}
      design={<Design />}
      engineering={<Engineering />}
    />
  );
}
