import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import Room, { SHELVES } from "./Room";

export const metadata: Metadata = {
  title: "About",
  description:
    "Erin Kerr is a product and UI/UX designer who engineers. Before design: 500+ research interviews at SRI International and brain-computer interface tools at Wispr AI.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <h1 className="sr-only">About</h1>
      {/* One row. Where it's too wide for the screen the page scrolls
          sideways, which leaves a lit lamp's glow free to spill. The
          footer's mt-section matches the space above. */}
      <div className="flex gap-x-10 pt-section">
        {SHELVES.map(({ version, lamp, plant }) => (
          <figure key={version} className="shrink-0">
            <Room lamp={version} plant={plant?.version} />
            <figcaption className="mt-3 font-mono text-label uppercase text-site-muted">
              <p>
                {String(version).padStart(2, "0")}. {lamp}
              </p>
              {plant && <p className="mt-1">{plant.label}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
    </SiteShell>
  );
}
