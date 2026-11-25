import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import SiteShell from "@/components/site/SiteShell";
import Aquarium from "./Aquarium";

export const metadata: Metadata = pageMetadata({
  title: "Aquarium",
  description:
    "Draw a fish, name it and drop it in Erin Kerr's aquarium, where it swims with everyone else's.",
  path: "/fun/aquarium",
});

export default function AquariumPage() {
  return (
    <SiteShell>
      <Aquarium />
    </SiteShell>
  );
}
