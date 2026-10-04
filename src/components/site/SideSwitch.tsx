"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { LuCodeXml, LuPenTool } from "react-icons/lu";
import { focusRing } from "./links";

// Crisp ease-out shared by the knob and its symbols.
const motion = "duration-300 ease-switch motion-reduce:transition-none";

const glyph = `absolute inset-0 m-auto h-[45%] w-[45%] transition ${motion}`;

// The designer/engineer switch. Flipping it hands the new side to onFlip
// inside a view transition, so whatever the page swaps, along with the
// inverted palette (see [data-side] in globals.css), grows out of the knob in
// a circle. It also mirrors the side into the URL (?side=engineer) so the
// current view can be shared. className sets size and position; the track
// must be twice as wide as it is tall.
export default function SideSwitch({
  engineer,
  onFlip,
  className,
}: {
  engineer: boolean;
  onFlip: (engineer: boolean) => void;
  className: string;
}) {
  // The knob answers the click straight away; the page follows a frame or
  // two later, once the view transition has captured the old side.
  const [knob, setKnob] = useState(engineer);
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
      onFlip(next);
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
      flushSync(() => onFlip(next)),
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
    <button
      ref={trackRef}
      type="button"
      role="switch"
      aria-checked={knob}
      aria-label="Engineer mode"
      data-side={engineer ? "engineer" : "designer"}
      onClick={flip}
      className={`rounded-full bg-site-ink ${focusRing} ${className}`}
    >
      {/* The knob is 80% of the track's height, inset 10%, so on a 2:1
          track it always travels 125% of its own width. It carries the
          side's symbol, a pen nib for design and </> for code, and they roll
          past each other as it moves. */}
      <span
        className={`absolute left-[5%] top-[10%] aspect-square h-[80%] rounded-full bg-site-paper shadow-knob transition-transform ${motion} ${
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
  );
}
