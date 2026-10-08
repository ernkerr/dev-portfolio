"use client";

import { useId, useSyncExternalStore } from "react";
import { focusRing } from "@/components/site/links";

const fade = "transition-opacity duration-500 motion-reduce:transition-none";

// The room's lights are all on or all off together: switching any one
// switches every lamp, and any light added later should read and set this
// same state through useLights.
let lightsOn = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useLights() {
  const on = useSyncExternalStore(
    subscribe,
    () => lightsOn,
    () => false,
  );
  const setOn = (next: boolean) => {
    lightsOn = next;
    listeners.forEach((listener) => listener());
  };
  return [on, setOn] as const;
}

// What a light looks like lit, drawn over it while the lights are on, for
// a light whose lit look has to move with it (in a Swish, say), so can't
// be LampSwitch's `light`
export function WhenLit({ children }: { children: React.ReactNode }) {
  const [on] = useLights();
  return (
    <g className={`${fade} ${on ? "opacity-100" : "opacity-0"}`}>{children}</g>
  );
}

// A lamp that's a light switch. Room draws the room with the lamp off and
// passes it in as children, plus the lamp lit as `light`. Clicking the lamp
// turns the lights on: it shows the light with a glow around it and puts the
// page in dark mode (the same inverted palette as the homepage switch:
// data-side="engineer", see globals.css). Clicking it again turns both back.
export default function LampSwitch({
  viewBox,
  title,
  label = "Lamp (dark mode)",
  glow,
  light,
  hit,
  width = "w-48 md:w-60",
  children,
}: {
  viewBox: string;
  /** The button's name. */
  label?: string;
  /** How wide the drawing is: a bookshelf's width, or its column's. */
  width?: string;
  title: string;
  /** Center and outer radius of the glow, in viewBox units. */
  glow: { x: number; y: number; r: number };
  /** The lamp lit, drawn over the room when it's on (or nothing, if
   * the children draw it, with WhenLit). */
  light?: React.ReactNode;
  /** Where the lamp is, as percentages of the drawing, for the button. */
  hit: { left: number; top: number; width: number; height: number };
  children: React.ReactNode;
}) {
  const [on, setOn] = useLights();
  const lit = `${fade} ${on ? "opacity-100" : "opacity-0"}`;
  // Gradient ids, unique per lamp so several can share a page.
  const id = `lamp${useId().replace(/[^\w-]/g, "")}`;

  return (
    <div className="relative">
      {/* overflow-visible lets the glow spill past the drawing's edges, even
          over other lamps, so the drawing ignores the pointer and leaves
          clicks to the buttons */}
      <svg
        viewBox={viewBox}
        role="img"
        aria-label={title}
        className={`pointer-events-none block h-auto overflow-visible ${width}`}
      >
        <defs>
          {/* Stops take the glow colors through currentColor */}
          <radialGradient id={`${id}-glow`} className="text-room-light">
            <stop offset="0" stopColor="currentColor" stopOpacity={1} />
            <stop offset="0.1" stopColor="currentColor" stopOpacity={0.75} />
            <stop offset="0.25" stopColor="currentColor" stopOpacity={0.42} />
            <stop offset="0.45" stopColor="currentColor" stopOpacity={0.2} />
            <stop offset="0.7" stopColor="currentColor" stopOpacity={0.07} />
            <stop offset="1" stopColor="currentColor" stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`${id}-core`} className="text-room-glow">
            <stop offset="0" stopColor="currentColor" stopOpacity={1} />
            <stop offset="0.35" stopColor="currentColor" stopOpacity={0.6} />
            <stop offset="1" stopColor="currentColor" stopOpacity={0} />
          </radialGradient>
          <radialGradient id={`${id}-spill`} className="text-room-light">
            <stop offset="0" stopColor="currentColor" stopOpacity={0.35} />
            <stop offset="1" stopColor="currentColor" stopOpacity={0} />
          </radialGradient>
        </defs>
        {/* Behind the shelf: a wide warm glow and a hot core */}
        <g className={lit}>
          <circle
            cx={glow.x}
            cy={glow.y}
            r={glow.r}
            fill={`url(#${id}-glow)`}
          />
          <circle
            cx={glow.x}
            cy={glow.y}
            r={glow.r * 0.3}
            fill={`url(#${id}-core)`}
          />
        </g>
        {children}
        {/* In front: light spilling over the shelf, then the lamp lit */}
        <g className={lit}>
          <circle
            cx={glow.x}
            cy={glow.y}
            r={glow.r * 0.4}
            fill={`url(#${id}-spill)`}
          />
          {light}
        </g>
      </svg>
      <button
        type="button"
        aria-pressed={on}
        aria-label={label}
        data-side={on ? "engineer" : "designer"}
        onClick={() => setOn(!on)}
        style={{
          left: `${hit.left}%`,
          top: `${hit.top}%`,
          width: `${hit.width}%`,
          height: `${hit.height}%`,
        }}
        className={`absolute ${focusRing}`}
      />
    </div>
  );
}
