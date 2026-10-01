import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Engineering from "./Engineering";

export default async function Carpoolio({
  searchParams,
}: {
  searchParams: Promise<{ side?: string }>;
}) {
  const { side } = await searchParams;
  return (
    <CaseStudy
      project="Carpoolio"
      engineerFirst={isEngineerSide(side)}
      engineering={<Engineering />}
    />
  );
}
