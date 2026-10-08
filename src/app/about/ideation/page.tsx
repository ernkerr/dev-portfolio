import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { List, P } from "@/components/site/prose";
import Room, { SHELVES, Versions, WindowAndCloset } from "../Room";

// How the room on my About page came together: every bookshelf as I
// designed them, side by side, numbered, then each thing on them, version
// by version. The About page shows the room as it is (FinalRoom).
export const metadata: Metadata = {
  title: "Ideation",
  description:
    "How the room on Erin Kerr's About page came together: every version of each thing in it, side by side.",
  alternates: { canonical: "/about/ideation" },
};

export default function IdeationPage() {
  return (
    <SiteShell>
      {/* How I worked, in the About page's note's style: the title, then
          what I did, in the order I did it */}
      <div className="pt-10 md:pt-16">
        <h1 className="font-serif text-subhead text-site-ink">Ideation</h1>
        <div className="mt-2 space-y-4">
          <P>
            I designed the room the way I&apos;d design a product: start from
            the real thing, explore side by side, then narrow down.
          </P>
          <List>
            <li>
              <span className="font-medium text-site-ink">
                References first.
              </span>{" "}
              Everything starts from photos of my real things. When a drawing
              didn&apos;t look like mine, like my mouse or my Ember mug, I went
              back to photos of the real one.
            </li>
            <li>
              <span className="font-medium text-site-ink">
                Versions side by side.
              </span>{" "}
              Each thing got numbered versions, a bookshelf each, so I could
              compare them at a glance and pick and mix. Big changes went on the
              next bookshelf, small ones changed the one I was on, and nothing
              got deleted, so I can look back.
            </li>
            <li>
              <span className="font-medium text-site-ink">
                One visual language.
              </span>{" "}
              The first lamp, flat and straight on, set the style. Realer tries,
              like a frosted shade, a room in perspective and a hand-drawn
              doodle, didn&apos;t fit, so everything follows that lamp.
            </li>
            <li>
              <span className="font-medium text-site-ink">
                Take out what&apos;s busy.
              </span>{" "}
              When something made the room busier, not better, I took it out.
            </li>
            <li>
              <span className="font-medium text-site-ink">
                Make it respond.
              </span>{" "}
              What you can click lifts a little, every light is on one switch
              that turns the page dark, and the clothes, plants and disco ball
              sway as you brush past, or swipe past on a phone.
            </li>
          </List>
          <P>
            Point at or tap a version&apos;s number below to see what changed.
          </P>
        </div>
      </div>
      {/* One row of shelves that scrolls sideways on its own, so the page
          never does and the header always spans it. The strip runs the full
          width of the window, padded back to the page's edges, so a lit
          lamp's glow only stops at the window's sides and under the header.
          It's as far under the note as the About page's room is. */}
      <div className="mx-[calc(50%-50vw)] overflow-x-auto px-[calc(50vw-50%)] pt-12 md:pt-16">
        <div className="flex w-max gap-x-10">
          {SHELVES.map(
            ({
              version,
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
                <figcaption className="mt-3 font-mono text-label text-site-muted">
                  {String(version).padStart(2, "0")}
                </figcaption>
              </figure>
            ),
          )}
          {/* Past the shelves: the window, the desk under it and my
              closet, as they are */}
          <figure className="shrink-0">
            <WindowAndCloset />
          </figure>
        </div>
      </div>
      {/* Under them, each thing on the bookshelf, version by version */}
      <div className="mt-section">
        <Versions />
      </div>
    </SiteShell>
  );
}
