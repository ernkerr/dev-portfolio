import type { Metadata } from "next";
import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Design from "./Design";

export const metadata: Metadata = {
  title: "Portfolio Redesign",
  description:
    "How Erin Kerr rebuilt her portfolio to lead with product and UI/UX design: an audit of the 2025 site, research on 265 designer job posts, and a redesign from a blank page.",
  alternates: { canonical: "/portfolioRedesign" },
};

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
