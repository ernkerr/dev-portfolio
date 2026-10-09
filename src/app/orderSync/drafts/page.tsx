import type { Metadata } from "next";
import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Design from "./Design";
import Engineering from "../Engineering";

// The earlier drafts, up to 5 versions per section with tabs, kept for
// reference. The finished case study is at /orderSync.
export const metadata: Metadata = {
  title: "OrderSync (drafts)",
  robots: { index: false },
};

export default async function OrderSyncDrafts({
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
