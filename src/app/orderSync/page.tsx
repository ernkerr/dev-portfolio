import type { Metadata } from "next";
import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Design from "./Design";
import Engineering from "./Engineering";

export const metadata: Metadata = {
  title: "OrderSync",
  description:
    "How Erin Kerr redesigned ordersync.io for skeptical B2B buyers: research first, a calm navy design system, and one clear way to book a call.",
  alternates: { canonical: "/orderSync" },
};

export default async function OrderSync({
  searchParams,
}: {
  searchParams: Promise<{ side?: string }>;
}) {
  const { side } = await searchParams;
  return (
    <CaseStudy
      project="OrderSync"
      engineerFirst={isEngineerSide(side)}
      design={<Design />}
      engineering={<Engineering />}
    />
  );
}
