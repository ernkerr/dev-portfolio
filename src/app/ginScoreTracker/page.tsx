import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Engineering from "./Engineering";

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
      engineering={<Engineering />}
    />
  );
}
