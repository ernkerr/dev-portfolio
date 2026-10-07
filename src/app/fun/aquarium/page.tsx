import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import Aquarium from "./Aquarium";

export const metadata: Metadata = {
  title: "Aquarium",
  description:
    "Draw a fish, name it and drop it in Erin Kerr's aquarium, where it swims with everyone else's.",
  alternates: { canonical: "/fun/aquarium" },
};

export default function AquariumPage() {
  return (
    <SiteShell>
      <Aquarium />
    </SiteShell>
  );
}
