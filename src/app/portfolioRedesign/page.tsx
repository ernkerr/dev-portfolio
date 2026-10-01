import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Design from "./Design";

export default async function PortfolioRedesign({
  searchParams,
}: {
  searchParams: Promise<{ side?: string }>;
}) {
  const { side } = await searchParams;
  return (
    <CaseStudy
      project="Portfolio Redesign"
      engineerFirst={isEngineerSide(side)}
      design={<Design />}
    />
  );
}
