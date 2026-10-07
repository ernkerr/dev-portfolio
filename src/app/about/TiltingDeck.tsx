"use client";

import { createContext, useEffect, useRef, useState } from "react";
import DraggableCord from "./DraggableCord";

type Pt = [number, number];

/** A photo the deck's drawn from, in its pixels: the body's left and right
 * ends, the line its base sits on, and its big headphone jack. */
export type DeckPhoto = { body: [number, number]; base: number; jack: Pt };
/** Where the deck sits, in the room's viewBox units: the middle of its
 * base, how wide it is and the line it sits on. */
export type DeckSpot = { center: number; width: number; floor: number };

// The Opus Quad to plug the headphones into, for DJ 4, with the headphone
// cord in front of it. It lies flat on the board, seen straight on. Drag
// the cord's plug to its headphone jack (it pulses while the cord's held)
// and it plugs in: the deck comes out to the middle of the bookcase, twice
// as big, tilting up as it comes so its top turns into view, and turns
// on, like a pulled book turning to show its cover. The plug goes with
// the jack. Pull the plug out, click anywhere outside it, or press Escape,
// and it switches off and goes back flat.
// Room draws the deck straight on, tilted, and tilted and lit, in each
// photo's own pixels, and passes them in. Anything drawn on the tilted
// deck can tell it's on (plugged in) from DeckOn.
const DURATION = 0.7; // seconds, out or back
const MARGIN = 16; // pixels kept clear at the window's sides, fitting it in
const FLAT = 0.35; // how squashed the tilted drawing starts, as if flat

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (x: number) => 1 - (1 - x) ** 5; // like ease-switch
const easeInOut = (x: number) =>
  x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2;
export const DeckOn = createContext(false);

const smooth = (from: number, to: number, x: number) => {
  const e = Math.min(1, Math.max(0, (x - from) / (to - from)));
  return e * e * (3 - 2 * e);
};

// A photo's drawing put on a spot, squashed down onto its base by
// `squash`: its transform, and where its jack lands.
function place(photo: DeckPhoto, spot: DeckSpot, squash = 1) {
  const [l, r] = photo.body;
  const s = spot.width / (r - l);
  const x = spot.center - spot.width / 2 - l * s;
  const y = spot.floor - photo.base * s * squash;
  const jack: Pt = [x + photo.jack[0] * s, y + photo.jack[1] * s * squash];
  return { transform: `translate(${x} ${y}) scale(${s} ${s * squash})`, jack };
}

export default function TiltingDeck({
  flat,
  tilted,
  lights,
  photos,
  rest,
  out,
  fit = false,
  magnet = false,
  anchor,
  length,
}: {
  /** The deck straight on, off, and seen from above, and its lights. */
  flat: React.ReactNode;
  tilted: React.ReactNode;
  lights?: React.ReactNode;
  photos: { flat: DeckPhoto; tilted: DeckPhoto };
  /** Where it lies on the board, and where it comes out to. */
  rest: DeckSpot;
  out: DeckSpot;
  /** Come out only as big as fits the window, and moved over to stay in it
   * (and near enough for the cord to reach), rather than just to `out`. */
  fit?: boolean;
  /** The cord plugs in and out more easily (see DraggableCord). */
  magnet?: boolean;
  /** Where the cord hangs from, and how long it is. */
  anchor: Pt;
  length: number;
}) {
  const [plugged, setPlugged] = useState(false);
  const [holding, setHolding] = useState(false);
  const rootRef = useRef<SVGGElement>(null);
  // Pulls the cord's plug out (DraggableCord fills it in)
  const unplug = useRef<(() => void) | null>(null);
  const flatRef = useRef<SVGGElement>(null);
  const tiltedRef = useRef<SVGGElement>(null);
  // Where it comes out to this time
  const goal = useRef(out);
  // How far out (z) and how far tilted up (q) it is, 0 to 1, easing from
  // where it was toward `to`.
  const tween = useRef({ from: { z: 0, q: 0 }, to: 0, start: -Infinity });
  const frame = useRef(0);

  const progress = (t: number) => {
    const { from, to, start } = tween.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const x = reduce.matches ? 1 : Math.min(1, (t - start) / DURATION);
    return {
      z: lerp(from.z, to, easeOut(x)),
      q: lerp(from.q, to, easeInOut(x)),
      done: x >= 1,
    };
  };

  // Everything about how it looks at z and q: both drawings, how much the
  // tilted one shows over the flat one, and the jack between them.
  const pose = (z: number, q: number) => {
    const to = goal.current;
    const spot = {
      center: lerp(rest.center, to.center, z),
      width: lerp(rest.width, to.width, z),
      floor: lerp(rest.floor, to.floor, z),
    };
    const a = place(photos.flat, spot);
    const b = place(photos.tilted, spot, lerp(FLAT, 1, q));
    const shown = smooth(0.15, 0.55, q);
    const jack: Pt = [
      lerp(a.jack[0], b.jack[0], shown),
      lerp(a.jack[1], b.jack[1], shown),
    ];
    return { flat: a.transform, tilted: b.transform, shown, jack };
  };

  const jackNow = (): Pt => {
    const { z, q } = progress(performance.now() / 1000);
    return pose(z, q).jack;
  };

  const animate = () => {
    cancelAnimationFrame(frame.current);
    const tick = (now: number) => {
      const { z, q, done } = progress(now / 1000);
      const p = pose(z, q);
      flatRef.current?.setAttribute("transform", p.flat);
      flatRef.current?.setAttribute("opacity", String(1 - p.shown));
      tiltedRef.current?.setAttribute("transform", p.tilted);
      tiltedRef.current?.setAttribute("opacity", String(p.shown));
      if (!done) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // On, a click anywhere outside it, or Escape, turns it off, the same as
  // pulling the plug out
  useEffect(() => {
    if (!plugged) return;
    const outside = (e: PointerEvent) => {
      const root = rootRef.current;
      if (root && e.target instanceof Node && !root.contains(e.target))
        unplug.current?.();
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") unplug.current?.();
    };
    document.addEventListener("pointerdown", outside);
    window.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("keydown", escape);
    };
  }, [plugged]);

  // As big as `out` asks, or as big as fits, all of it in the window and
  // its jack where the cord reaches, as near `out` as it can be.
  const fitOut = (): DeckSpot => {
    const m = rootRef.current?.ownerSVGElement?.getScreenCTM();
    if (!fit || !m) return out;
    const across = document.documentElement.clientWidth;
    const left = (MARGIN - m.e) / m.a;
    const right = (across - MARGIN - m.e) / m.a;
    const reach = length * 0.85;
    const widest = Math.min(out.width, right - left);
    for (let width = widest; width > rest.width; width -= 4) {
      // Where the jack is from the deck's middle, and how far across the
      // cord reaches at its height
      const [jx, jy] = place(photos.tilted, { ...out, center: 0, width }).jack;
      const across2 = reach ** 2 - (jy - anchor[1]) ** 2;
      if (across2 < 0) continue;
      const lo = Math.max(
        left + width / 2,
        anchor[0] - Math.sqrt(across2) - jx,
      );
      const hi = Math.min(
        right - width / 2,
        anchor[0] + Math.sqrt(across2) - jx,
      );
      if (lo <= hi)
        return {
          ...out,
          width,
          center: Math.min(hi, Math.max(lo, out.center)),
        };
    }
    const center = Math.min(
      right - widest / 2,
      Math.max(left + widest / 2, out.center),
    );
    return { ...out, center, width: widest };
  };

  const onPlugChange = (on: boolean) => {
    const t = performance.now() / 1000;
    const { z, q } = progress(t);
    if (on && z === 0) goal.current = fitOut();
    tween.current = { from: { z, q }, to: on ? 1 : 0, start: t };
    setPlugged(on);
    animate();
  };

  // Drawn lying flat; from then on it's moved frame by frame (above).
  const start = pose(0, 0);

  return (
    <g ref={rootRef}>
      <g ref={flatRef} transform={start.flat}>
        {flat}
      </g>
      <g ref={tiltedRef} transform={start.tilted} opacity={0}>
        <DeckOn.Provider value={plugged}>{tilted}</DeckOn.Provider>
        {plugged && lights && (
          <g className="animate-dj-on motion-reduce:animate-none">{lights}</g>
        )}
      </g>
      {holding && !plugged && (
        <circle
          cx={start.jack[0]}
          cy={start.jack[1]}
          r={4}
          fill="none"
          strokeWidth={1}
          className="origin-center animate-ping stroke-room-dj-lit-amber [transform-box:fill-box] motion-reduce:animate-none"
        />
      )}
      <DraggableCord
        anchor={anchor}
        length={length}
        jack={jackNow}
        magnet={magnet}
        onPlugChange={onPlugChange}
        onHoldChange={setHolding}
        unplug={unplug}
      />
    </g>
  );
}
