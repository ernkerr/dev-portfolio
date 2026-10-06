"use client";

import { useState } from "react";
import DraggableCord from "./DraggableCord";

type Pt = [number, number];

// The Opus Quad to plug the headphones into, for DJ 3, with the headphone
// cord in front of it. Drag the cord's plug to the deck's headphone jack
// (it pulses while the cord's held, to show where) and it plugs in: the
// deck turns on and comes out bigger, like a pulled book, grown about the
// jack so the plug stays in. Pull the plug back out and it shrinks back
// and switches off. Room draws the deck off and on and passes both in.
export default function PlugInDeck({
  deck,
  lights,
  jack,
  anchor,
  length,
}: {
  /** The deck, off. */
  deck: React.ReactNode;
  /** Drawn over it while it's on. */
  lights: React.ReactNode;
  /** Its headphone jack, in the room's viewBox units. */
  jack: Pt;
  /** Where the cord hangs from, and how long it is. */
  anchor: Pt;
  length: number;
}) {
  const [plugged, setPlugged] = useState(false);
  const [holding, setHolding] = useState(false);
  const [jx, jy] = jack;

  return (
    <g>
      <g
        className={`transition-transform duration-700 ease-switch [transform-box:view-box] motion-reduce:transition-none ${plugged ? "scale-150" : "scale-100"}`}
        style={{ transformOrigin: `${jx}px ${jy}px` }}
      >
        {deck}
        {plugged && (
          <g className="animate-dj-on motion-reduce:animate-none">{lights}</g>
        )}
      </g>
      {holding && !plugged && (
        <circle
          cx={jx}
          cy={jy}
          r={4}
          fill="none"
          strokeWidth={1}
          className="origin-center animate-ping stroke-room-dj-lit-amber [transform-box:fill-box] motion-reduce:animate-none"
        />
      )}
      <DraggableCord
        anchor={anchor}
        length={length}
        jack={jack}
        onPlugChange={setPlugged}
        onHoldChange={setHolding}
      />
    </g>
  );
}
