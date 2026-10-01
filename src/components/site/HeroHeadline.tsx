"use client";

import { useState } from "react";
import { focusRing, serif } from "./links";

// Homepage headline plus the big designer/engineer switch under it. The
// switch moves the italic between "designer" and "engineers", and mirrors the
// side into the URL (?side=engineer) so the current view can be shared.
export default function HeroHeadline({
  engineerFirst,
}: {
  engineerFirst: boolean;
}) {
  const [engineer, setEngineer] = useState(engineerFirst);

  function flip() {
    const next = !engineer;
    setEngineer(next);
    const url = new URL(window.location.href);
    if (next) url.searchParams.set("side", "engineer");
    else url.searchParams.delete("side");
    window.history.replaceState(null, "", url);
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
        type="button"
        role="switch"
        aria-checked={engineer}
        aria-label="Engineer mode"
        onClick={flip}
        className={`relative mt-8 block h-14 w-28 rounded-full transition-colors duration-300 md:mt-10 md:h-20 md:w-40 lg:h-24 lg:w-48 ${
          engineer ? "bg-site-blue" : "bg-site-ink"
        } ${focusRing}`}
      >
        {/* Track is 2:1 and the knob is 80% of its height, inset 10%, so
            the knob always travels 125% of its own width. */}
        <span
          className={`absolute left-[5%] top-[10%] aspect-square h-[80%] rounded-full bg-white shadow-[0_4px_12px_rgba(15,23,42,0.25)] transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none ${
            engineer ? "translate-x-[125%]" : ""
          }`}
        />
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
