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
      <section className="pb-8 pt-12 md:pt-16">
        <h1 className="font-serif text-display-sm md:text-display">Aquarium</h1>
        <p className="mt-6 max-w-measure text-lead-sm text-site-ink/80 md:text-lead">
          Draw a fish, give it a name and drop it in. It swims here with
          everyone else&apos;s.
        </p>
      </section>
      <Aquarium />
    </SiteShell>
  );
}
