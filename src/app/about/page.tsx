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
      {/* One row of shelves that scrolls sideways on its own, so the page
          never does and the header always spans it. The strip runs the full
          width of the window, padded back to the page's edges, so a lit
          lamp's glow only stops at the window's sides and under the header.
          The footer's mt-section matches the space above. */}
      <div className="mx-[calc(50%-50vw)] overflow-x-auto px-[calc(50vw-50%)] pt-section">
        <div className="flex w-max gap-x-10">
          {SHELVES.map(
            ({
              version,
              lamp,
              plant,
              books,
              basket,
              headphones,
              dj,
              camera,
            }) => (
              <figure key={version} className="shrink-0">
                <Room
                  lamp={version}
                  plant={plant?.version}
                  books={books?.version}
                  basket={basket?.version}
                  headphones={headphones?.version}
                  dj={dj?.version}
                  camera={camera?.version}
                />
                <figcaption className="mt-3 font-mono text-label uppercase text-site-muted">
                  <p>
                    {String(version).padStart(2, "0")}. {lamp}
                  </p>
                  {plant && <p className="mt-1">{plant.label}</p>}
                  {books && <p className="mt-1">{books.label}</p>}
                  {basket && <p className="mt-1">{basket.label}</p>}
                  {headphones && <p className="mt-1">{headphones.label}</p>}
                  {dj && <p className="mt-1">{dj.label}</p>}
                  {camera && <p className="mt-1">{camera.label}</p>}
                </figcaption>
              </figure>
            ),
          )}
        </div>
      </div>
    </SiteShell>
  );
}
