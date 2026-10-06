import type { Metadata } from "next";
import CaseStudy from "@/components/site/CaseStudy";
import { isEngineerSide } from "@/components/site/side";
import Design from "./Design";
import Engineering from "./Engineering";

export const metadata: Metadata = {
  title: "Carpoolio",
  description:
    "How Erin Kerr designed Carpoolio, a group travel app where each car's seats are the sign-up sheet, from a coded prototype to the App Store.",
  alternates: { canonical: "/carpoolio" },
};

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
      design={<Design />}
      engineering={<Engineering />}
    />
  );
}
