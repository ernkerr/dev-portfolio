import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Engineering from "./Engineering";

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
      engineering={<Engineering />}
    />
  );
}
