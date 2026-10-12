import type { Metadata } from "next";
import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Design from "./Design";
import Engineering from "./Engineering";

export const metadata: Metadata = {
  title: "Fred",
  description:
    "How Erin Kerr designed and built Fred, an AI agent that hunts apartments in New York, in one day: research on 8,205 renter reviews, a window for a mark, and a Next.js app on a Mastra agent with 25 tools.",
  alternates: { canonical: "/fred" },
};

export default async function Fred({
  searchParams,
}: {
  searchParams: Promise<{ side?: string }>;
}) {
  const { side } = await searchParams;
  return (
    <CaseStudy
      project="Fred"
      engineerFirst={isEngineerSide(side)}
      design={<Design />}
      engineering={<Engineering />}
    />
  );
}
