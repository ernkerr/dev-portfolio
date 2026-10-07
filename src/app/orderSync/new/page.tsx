import type { Metadata } from "next";
import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Design from "./Design";
import Engineering from "../Engineering";

// The rewrite in the Gin and portfolio-redesign format, kept beside the
// tabbed drafts at /orderSync so Erin can compare the copy. Once she picks,
// one of them moves to /orderSync and this route goes.
export const metadata: Metadata = {
  title: "OrderSync (new draft)",
  robots: { index: false },
};

export default async function OrderSyncNew({
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
