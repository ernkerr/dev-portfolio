"use client";

import { useSide } from "./SideContext";
import SideSwitch from "./SideSwitch";

// Homepage headline plus the big designer/engineer switch under it. The
// switch moves the italic between "designer" and "engineers", inverts the
// page and flips the project tiles to their engineering side.
export default function HeroHeadline() {
  const { engineer, setEngineer } = useSide();

  return (
    <>
      <h1 className="max-w-[600px] font-serif text-display-sm md:text-display">
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

      <SideSwitch
        engineer={engineer}
        onFlip={setEngineer}
        className="relative mt-8 block h-14 w-28 md:mt-10 md:h-20 md:w-40 lg:h-24 lg:w-48"
      />
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
