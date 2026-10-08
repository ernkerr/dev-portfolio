import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import Room, { SHELVES, WindowAndCloset } from "../Room";

// How the room on my About page came together: every version of each
// thing in it, side by side, as I designed them, with what changed under
// each bookshelf. The About page shows the room as it is (FinalRoom).
export const metadata: Metadata = {
  title: "Ideation",
  description:
    "How the room on Erin Kerr's About page came together: every version of each thing in it, side by side.",
  alternates: { canonical: "/about/ideation" },
};

export default function IdeationPage() {
  return (
    <SiteShell>
      <h1 className="sr-only">Ideation</h1>
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
              lava,
              cuttings,
              clock,
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
                  lava={lava?.version}
                  cuttings={cuttings?.version}
                  clock={clock?.version}
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
                  {lava && <p className="mt-1">{lava.label}</p>}
                  {cuttings && <p className="mt-1">{cuttings.label}</p>}
                  {clock && <p className="mt-1">{clock.label}</p>}
                </figcaption>
              </figure>
            ),
          )}
          {/* Past the shelves: the window, the desk under it and my
              closet, as they are */}
          <figure className="shrink-0">
            <WindowAndCloset />
            <figcaption className="mt-3 font-mono text-label uppercase text-site-muted">
              <p>Window</p>
              <p className="mt-1">Desk</p>
              <p className="mt-1">Closet</p>
              <p className="mt-1">Paper lantern</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </SiteShell>
  );
}
