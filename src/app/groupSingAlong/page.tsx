import type { Metadata } from "next";
import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Engineering from "./Engineering";

export const metadata: Metadata = {
  title: "Group Sing Along",
  description:
    "How Erin Kerr designed Group Sing Along: one host picks a song and every phone in the room opens its lyrics, with no account or download.",
  alternates: { canonical: "/groupSingAlong" },
};

export default async function GroupSingAlong({
  searchParams,
}: {
  searchParams: Promise<{ side?: string }>;
}) {
  const { side } = await searchParams;
  return (
    <CaseStudy
      project="Group Sing Along"
      engineerFirst={isEngineerSide(side)}
      // The design side is coming soon; its draft stays in Design.tsx.
      engineering={<Engineering />}
    />
  );
}
