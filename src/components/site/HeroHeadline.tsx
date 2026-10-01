"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { LuCodeXml, LuPenTool } from "react-icons/lu";
import { focusRing, serif } from "./links";

// Crisp ease-out shared by the knob and its symbols.
const motion =
  "duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

const glyph = `absolute inset-0 m-auto h-[45%] w-[45%] transition ${motion}`;

// Homepage headline plus the big designer/engineer switch under it. The
// switch moves the italic between "designer" and "engineers" and inverts the
// page (see [data-side] in globals.css). It also mirrors the side into the URL
// (?side=engineer) so the current view can be shared.
export default function HeroHeadline({
  engineerFirst,
}: {
  engineerFirst: boolean;
}) {
  // The knob answers the click straight away; the page follows a frame or
  // two later, once the view transition has captured the old side.
  const [knob, setKnob] = useState(engineerFirst);
  const [engineer, setEngineer] = useState(engineerFirst);
  const trackRef = useRef<HTMLButtonElement>(null);
  const flipping = useRef<ViewTransition | null>(null);

  function flip() {
    const next = !knob;
    flushSync(() => setKnob(next));

    const url = new URL(window.location.href);
    if (next) url.searchParams.set("side", "engineer");
    else url.searchParams.delete("side");
    window.history.replaceState(null, "", url);

    if (
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setEngineer(next);
      return;
    }

    // The other side grows out of the spot the knob is heading for, starting
    // at the knob's own size so the first frame already shows it.
    const track = trackRef.current!.getBoundingClientRect();
    const knobRadius = track.height * 0.4;
    const x = next
      ? track.right - track.height / 2
      : track.left + track.height / 2;
    const y = track.top + track.height / 2;
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // Swap colors instantly while flipping (see [data-flipping] in
    // globals.css), so text doesn't fade in late behind the circle.
    const root = document.documentElement;
    root.dataset.flipping = "";
    const transition = document.startViewTransition(() =>
      flushSync(() => setEngineer(next)),
    );
    flipping.current = transition;
    transition.ready.then(
      () =>
        root.animate(
          {
            clipPath: [
              `circle(${knobRadius}px at ${x}px ${y}px)`,
              `circle(${r}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 400,
            easing: "cubic-bezier(0.33, 1, 0.68, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        ),
      // A newer flip skipped this one; nothing to animate.
      () => {},
    );
    transition.finished.finally(() => {
      if (flipping.current === transition) delete root.dataset.flipping;
    });
  }

  return (
    <>
      <h1
        className={`${serif} max-w-[600px] text-[40px] leading-[1.08] tracking-[-0.02em] md:text-[56px]`}
      >
        I&apos;m Erin, a product{" "}
        <Word italic={!engineer} tracking="tracking-[0.034em]">
          designer
        </Word>{" "}
        who{" "}
        <Word italic={engineer} tracking="tracking-[0.03em]">
          engineers
        </Word>
        .
      </h1>

      <button
        ref={trackRef}
        type="button"
        role="switch"
        aria-checked={knob}
        aria-label="Engineer mode"
        data-side={engineer ? "engineer" : "designer"}
        onClick={flip}
        className={`relative mt-8 block h-14 w-28 rounded-full bg-site-ink md:mt-10 md:h-20 md:w-40 lg:h-24 lg:w-48 ${focusRing}`}
      >
        {/* Track is 2:1 and the knob is 80% of its height, inset 10%, so
            the knob always travels 125% of its own width. The knob carries
            the side's symbol, a pen nib for design and </> for code, and
            they roll past each other as it moves. */}
        <span
          className={`absolute left-[5%] top-[10%] aspect-square h-[80%] rounded-full bg-site-paper shadow-[0_4px_12px_rgba(15,23,42,0.25)] transition-transform ${motion} ${
            knob ? "translate-x-[125%]" : ""
          }`}
        >
          <LuPenTool
            aria-hidden="true"
            className={`${glyph} text-site-ink ${
              knob ? "rotate-180 scale-50 opacity-0" : ""
            }`}
          />
          <LuCodeXml
            aria-hidden="true"
            className={`${glyph} text-site-ink ${
              knob ? "" : "-rotate-180 scale-50 opacity-0"
            }`}
          />
        </span>
      </button>
    </>
  );
}

// Keeps the words around it still when the italic moves. The word sits in a
// cell sized by an invisible upright copy (the wider form). Newsreader's
// italic runs about 11% narrower, so each word's tracking spreads that gap
// between its letters until its last letter ends where the upright one does;
// the negative margin drops the extra trailing letter-spacing so the italic
// never widens the cell.
function Word({
  italic,
  tracking,
  children,
}: {
  italic: boolean;
  tracking: string;
  children: string;
}) {
  return (
    <span className="inline-grid">
      <span className="invisible [grid-area:1/1]">{children}</span>
      {italic ? (
        <em className={`mr-[-0.06em] [grid-area:1/1] ${tracking}`}>
          {children}
        </em>
      ) : (
        <span className="[grid-area:1/1]">{children}</span>
      )}
    </span>
  );
}
