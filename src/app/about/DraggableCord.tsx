"use client";

import { useEffect, useRef } from "react";

type Pt = [number, number];

// The hanging part of a headphone cord as a little rope simulation, for
// headphones 5. At rest it hangs in a soft, lazy bow and sways gently from
// the board's edge. Hovering gives it a small jiggle. It can be grabbed
// anywhere and pulled any way the cord reaches, even past the shelf: it
// stays fixed at the edge and the rest trails behind. Let go, it falls,
// sweeps down in a slow swing from the edge and settles back into its
// bow. It bends like a cable, in smooth curves rather than sharp corners.
// With reduced motion it keeps still at rest and settles without swinging.
// Given a jack, its plug plugs in when it comes close: the end stays there,
// following the jack if it moves, and the cord hangs between, until the
// plug is grabbed and pulled out, or the cord is pulled hard enough away
// from the jack to yank it out. With `magnet`, plugging in and out is
// easier: held within a quarter of its length of the jack, the plug is
// pulled in, and grabbing anywhere on its last quarter, or pulling the
// cord nearly taut, pulls it out.
//
// The rope is a row of points a fixed distance apart (Verlet integration
// with distance constraints), pulled toward their resting places. All in
// the room's viewBox units and seconds.
const POINTS = 48;
const STEP = 1 / 60;
const GRAVITY = 380;
const ITERATIONS = 32;
const BOW = 0.12; // how much it bows at rest, in radians at its ends
const SWAY = (2.5 * Math.PI) / 180; // the idle sway, each way
const SWAY_PERIOD = 6.5;
const SHAPE = 0.03; // how strongly it holds its resting shape
const LOOSE = 0.001; // the same, while held and as it swings
const SWING = 2; // seconds after letting go it just swings under gravity
const SETTLE = 2.5; // then seconds to ease back into its bow
const DRAG = 0.985; // how much of its speed it keeps each step, swinging
const SETTLED_DRAG = 0.9; // the same once settled, so it glides to a stop
const CALM_FROM = 1; // seconds after letting go it starts slowing more
const CALM = 2; // and over how long, so its last swings die away smoothly
const MAX_SPEED = 4; // a safety cap on how far any point moves in a step
const BEND = 0.2; // how much it resists bending, like a real cable
const BEND_PASSES = 4; // more passes spread a bend over more of the cord
const LEAVE = 3; // points below the edge that follow it leaving downward
const NUDGE = 0.4; // how hard a hover jiggles it
const REACH = 14; // how far a hover jiggles along the cord
const SNAP = 8; // how close the plug has to come to a jack to plug in
const PLUG_GRIP = 8; // points from the end that count as grabbing the plug
const PLUG_SPOT = 12; // the reach of the spot round the plug to grab it by
const YANK = 10; // how much further than it reaches a pull yanks the plug out
const SEAT = 0.15; // seconds the plug takes to slide into the jack

const f = (v: number) => v.toFixed(2);

// The cord at rest: from the anchor, `length` long, bowing a little to the
// right and back.
function restShape(anchor: Pt, length: number): Pt[] {
  const len = length / (POINTS - 1);
  const pts: Pt[] = [[anchor[0], anchor[1]]];
  for (let i = 0; i < POINTS - 1; i++) {
    const a =
      Math.PI / 2 - BOW * Math.cos((Math.PI * (i + 0.5)) / (POINTS - 1));
    pts.push([pts[i][0] + Math.cos(a) * len, pts[i][1] + Math.sin(a) * len]);
  }
  return pts;
}

// A smooth line through the points.
function pathThrough(pts: Pt[]) {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i];
    const [nx, ny] = pts[i + 1];
    d += `Q${f(x)} ${f(y)} ${f((x + nx) / 2)} ${f((y + ny) / 2)}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return `${d}L${f(lx)} ${f(ly)}`;
}

// The plug at the end, pointing on along the last stretch of cord.
function plugTransform(pts: Pt[]) {
  const [x, y] = pts[pts.length - 1];
  const [px, py] = pts[pts.length - 2];
  const angle = (Math.atan2(y - py, x - px) * 180) / Math.PI - 90;
  return `translate(${f(x)} ${f(y)}) rotate(${f(angle)})`;
}

export default function DraggableCord({
  anchor,
  length,
  jack,
  magnet = false,
  onPlugChange,
  onHoldChange,
}: {
  /** Where it hangs from: the front edge of the board. */
  anchor: Pt;
  /** How long it is, from the anchor to the plug. */
  length: number;
  /** A jack its plug can plug into, or where it is now, if it moves. */
  jack?: Pt | (() => Pt);
  /** Plug in and out more easily (see above). */
  magnet?: boolean;
  onPlugChange?: (plugged: boolean) => void;
  onHoldChange?: (held: boolean) => void;
}) {
  const rest = restShape(anchor, length);
  const groupRef = useRef<SVGGElement>(null);
  const cordRef = useRef<SVGPathElement>(null);
  const hitRef = useRef<SVGPathElement>(null);
  const plugRef = useRef<SVGGElement>(null);
  const tipRef = useRef<SVGGElement>(null);
  const spotRef = useRef<SVGCircleElement>(null);
  // The latest callbacks, so the simulation needn't restart when they change.
  const report = useRef({ onPlugChange, onHoldChange, jack });
  report.current = { onPlugChange, onHoldChange, jack };
  const controls = useRef<{
    grab: (p: Pt, plug?: boolean) => void;
    move: (p: Pt) => void;
    release: () => void;
    jiggle: (p: Pt) => void;
  } | null>(null);
  const [ax, ay] = anchor;

  useEffect(() => {
    const n = POINTS;
    const len = length / (n - 1);
    const rest = restShape([ax, ay], length);
    const pos = rest.map(([x, y]): Pt => [x, y]);
    const prev = rest.map(([x, y]): Pt => [x, y]);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let mode: "rest" | "held" | "falling" = "rest";
    let held = -1;
    let target: Pt = [0, 0];
    let releasedAt = 0;
    let plugged = false;
    // Pulled out, the plug has to leave the jack before it can go back in.
    let clear = true;
    // Plugging in, where the plug slides in from, and when
    let seat: { from: Pt; at: number } | null = null;
    // How close plugs it in, how near the end a grab pulls it out, and
    // how far from the jack a pull on the cord yanks it out
    const snap = magnet ? length / 4 : SNAP;
    const grip = magnet ? Math.round(n / 4) : PLUG_GRIP;
    const yanked = (dist: number, reach: number) =>
      magnet ? dist > reach * 0.9 : dist > reach + YANK;
    const hasJack = report.current.jack !== undefined;
    const jackNow = (): Pt => {
      const { jack } = report.current;
      return typeof jack === "function" ? jack() : (jack ?? [NaN, NaN]);
    };
    // The anchor, the held point and a plugged-in plug don't move.
    const fixed = (i: number) =>
      i === 0 || (mode === "held" && i === held) || (plugged && i === n - 1);
    const setPlugged = (on: boolean) => {
      plugged = on;
      tipRef.current?.setAttribute("opacity", on ? "0" : "1");
      report.current.onPlugChange?.(on);
    };

    const step = (t: number) => {
      const [jx, jy] = jackNow();
      const angle = reduce.matches
        ? 0
        : SWAY * Math.sin((2 * Math.PI * t) / SWAY_PERIOD);
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const since = t - releasedAt;
      // Let go, it swings down under gravity like a pendulum from the
      // edge, then, as the swinging dies away, eases back into its bow,
      // slowing more and more so it glides to a stop. Gravity stays on
      // throughout, so its shape doesn't shift as it settles.
      const smooth = (from: number, over: number) => {
        const e = Math.min(1, Math.max(0, since - from) / over);
        return e * e * (3 - 2 * e);
      };
      const ease = smooth(SWING, SETTLE);
      const calm = smooth(CALM_FROM, CALM);
      const k = plugged
        ? 0
        : mode === "held"
          ? LOOSE
          : mode === "falling"
            ? LOOSE + (SHAPE - LOOSE) * ease
            : SHAPE;
      const g = GRAVITY;
      const damp = reduce.matches
        ? 0.8
        : mode === "held"
          ? DRAG
          : mode === "falling"
            ? DRAG + (SETTLED_DRAG - DRAG) * calm
            : SETTLED_DRAG;
      for (let i = 1; i < n; i++) {
        const rx = rest[i][0] - ax;
        const ry = rest[i][1] - ay;
        const tx = ax + rx * c - ry * s;
        const ty = ay + rx * s + ry * c;
        const [x, y] = pos[i];
        let vx = (x - prev[i][0]) * damp;
        let vy = (y - prev[i][1]) * damp;
        const speed = Math.hypot(vx, vy);
        if (speed > MAX_SPEED) {
          vx *= MAX_SPEED / speed;
          vy *= MAX_SPEED / speed;
        }
        prev[i] = [x, y];
        pos[i] = [
          x + vx + (tx - x) * k,
          y + vy + (ty - y) * k + g * STEP * STEP,
        ];
      }
      if (mode === "held") pos[held] = [target[0], target[1]];
      if (plugged) {
        const e = seat ? Math.min(1, (t - seat.at) / SEAT) : 1;
        const k = e * e * (3 - 2 * e);
        pos[n - 1] = seat
          ? [
              seat.from[0] + (jx - seat.from[0]) * k,
              seat.from[1] + (jy - seat.from[1]) * k,
            ]
          : [jx, jy];
        if (e >= 1) seat = null;
      }
      // It leaves the board's edge heading down, as it comes over it, so a
      // pull bends it in a curve below the edge rather than at it.
      for (let i = 1; i <= LEAVE; i++) {
        const w = 0.3 / i;
        pos[i][0] += (ax - pos[i][0]) * w;
        pos[i][1] += (ay + i * len - pos[i][1]) * w;
      }
      for (let pass = 0; pass < ITERATIONS; pass++) {
        // Stiffness: each point eases toward the middle of its neighbors,
        // so it bends in smooth curves, not sharp corners, even where it's
        // held. Lengths are put right after.
        if (pass < BEND_PASSES) {
          for (let i = 1; i < n - 1; i++) {
            if (fixed(i)) continue;
            pos[i][0] +=
              ((pos[i - 1][0] + pos[i + 1][0]) / 2 - pos[i][0]) * BEND;
            pos[i][1] +=
              ((pos[i - 1][1] + pos[i + 1][1]) / 2 - pos[i][1]) * BEND;
          }
        }
        for (let i = 0; i < n - 1; i++) {
          const a = pos[i];
          const b = pos[i + 1];
          const dx = b[0] - a[0];
          const dy = b[1] - a[1];
          const dist = Math.hypot(dx, dy) || 1e-6;
          const diff = (dist - len) / dist;
          const aFixed = fixed(i);
          const bFixed = fixed(i + 1);
          if (aFixed && bFixed) continue;
          const wa = aFixed ? 0 : bFixed ? 1 : 0.5;
          const wb = 1 - wa;
          a[0] += dx * diff * wa;
          a[1] += dy * diff * wa;
          b[0] -= dx * diff * wb;
          b[1] -= dy * diff * wb;
        }
      }
      // Close enough to the jack, the plug slides in (with a magnet, only
      // while the cord's held), and if it was the plug being held, it's
      // let go.
      const toJack = Math.hypot(pos[n - 1][0] - jx, pos[n - 1][1] - jy);
      if (toJack > 2 * snap) clear = true;
      if (
        hasJack &&
        !plugged &&
        clear &&
        toJack < snap &&
        (!magnet || mode === "held")
      ) {
        setPlugged(true);
        seat = { from: [pos[n - 1][0], pos[n - 1][1]], at: t };
        if (mode === "held" && held >= n - grip) {
          mode = "falling";
          releasedAt = t;
          report.current.onHoldChange?.(false);
        }
      }
      if (mode === "falling" && since > SWING + SETTLE + 1) mode = "rest";
    };

    const draw = () => {
      const d = pathThrough(pos);
      cordRef.current?.setAttribute("d", d);
      hitRef.current?.setAttribute("d", d);
      plugRef.current?.setAttribute("transform", plugTransform(pos));
      spotRef.current?.setAttribute("cx", f(pos[n - 1][0]));
      spotRef.current?.setAttribute("cy", f(pos[n - 1][1]));
    };

    // As far as the cord reaches from the edge, in any direction, and
    // while it's plugged in, from the jack too.
    const within = ([x, y]: Pt, [cx, cy]: Pt, reach: number): Pt => {
      const dist = Math.hypot(x - cx, y - cy);
      if (dist <= reach) return [x, y];
      return [cx + ((x - cx) * reach) / dist, cy + ((y - cy) * reach) / dist];
    };
    const clamp = (p: Pt): Pt => {
      const fromEdge = len * held * 0.9; // a little slack for the bend at the edge
      let q = within(p, [ax, ay], fromEdge);
      if (!plugged) return q;
      const jack = jackNow();
      for (let i = 0; i < 3; i++) {
        q = within(q, jack, len * (n - 1 - held) * 0.95);
        q = within(q, [ax, ay], fromEdge);
      }
      return q;
    };

    controls.current = {
      grab: (p, plug = false) => {
        // The point nearest the pointer, or the plug, grabbed by its spot
        let best = plug ? n - 1 : 2;
        for (let i = 2; i < n && !plug; i++) {
          const d = Math.hypot(pos[i][0] - p[0], pos[i][1] - p[1]);
          if (d < Math.hypot(pos[best][0] - p[0], pos[best][1] - p[1]))
            best = i;
        }
        // Grabbing the plug while it's plugged in pulls it out.
        if (plugged && best >= n - grip) {
          setPlugged(false);
          clear = false;
          seat = null;
          best = n - 1;
        }
        held = best;
        mode = "held";
        target = clamp(p);
        report.current.onHoldChange?.(true);
      },
      move: (p) => {
        if (mode !== "held") return;
        // Pulled hard enough away from the jack, the plug comes out.
        const [jx, jy] = jackNow();
        const reach = len * (n - 1 - held);
        if (plugged && yanked(Math.hypot(p[0] - jx, p[1] - jy), reach)) {
          setPlugged(false);
          clear = false;
          seat = null;
        }
        target = clamp(p);
      },
      release: () => {
        if (mode !== "held") return;
        mode = "falling";
        releasedAt = performance.now() / 1000;
        report.current.onHoldChange?.(false);
      },
      jiggle: (p) => {
        if (mode !== "rest" || reduce.matches) return;
        for (let i = 2; i < n; i++) {
          const d = Math.hypot(pos[i][0] - p[0], pos[i][1] - p[1]);
          if (d < REACH) prev[i][0] = pos[i][0] - NUDGE * (1 - d / REACH);
        }
      },
    };

    // Run only while it's on screen; a fixed step keeps it steady.
    let frame = 0;
    let last = 0;
    let carry = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const t = now / 1000;
      carry = Math.min(carry + (last ? t - last : 0), 0.1);
      last = t;
      while (carry >= STEP) {
        step(t);
        carry -= STEP;
      }
      draw();
    };
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      last = 0;
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
    });
    if (groupRef.current) observer.observe(groupRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      controls.current = null;
    };
  }, [ax, ay, length, magnet]);

  // From the pointer to the room's viewBox units.
  const toRoom = (e: React.PointerEvent): Pt | null => {
    const svg = groupRef.current?.ownerSVGElement;
    const m = svg?.getScreenCTM();
    if (!m) return null;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return [p.x, p.y];
  };

  // Grabbing the cord, or the plug by the spot round it
  const grip = (plug: boolean) => ({
    className: "cursor-grab touch-none active:cursor-grabbing",
    onPointerEnter: (e: React.PointerEvent) => {
      const p = toRoom(e);
      if (p) controls.current?.jiggle(p);
    },
    onPointerDown: (e: React.PointerEvent<SVGElement>) => {
      const p = toRoom(e);
      if (!p) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      controls.current?.grab(p, plug);
    },
    onPointerMove: (e: React.PointerEvent) => {
      const p = toRoom(e);
      if (p) controls.current?.move(p);
    },
    onPointerUp: () => controls.current?.release(),
    onPointerCancel: () => controls.current?.release(),
  });
  const end = rest[rest.length - 1];

  return (
    <g ref={groupRef}>
      <path
        ref={cordRef}
        d={pathThrough(rest)}
        fill="none"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-room-headphones-matte"
      />
      <g ref={plugRef} transform={plugTransform(rest)}>
        <rect
          x={-1}
          y={-1}
          width={2}
          height={4}
          rx={0.8}
          className="fill-room-headphones-matte"
        />
        <g ref={tipRef}>
          <rect
            x={-0.55}
            y={3}
            width={1.1}
            height={3.6}
            rx={0.4}
            className="fill-room-mirror"
          />
          <path
            d="M-0.55 4.2h1.1M-0.55 5.3h1.1"
            strokeWidth={0.25}
            className="stroke-room-headphones-slider"
          />
        </g>
      </g>
      {/* A wide, invisible band along the cord to grab it by */}
      <path
        ref={hitRef}
        d={pathThrough(rest)}
        fill="none"
        stroke="transparent"
        strokeWidth={7}
        strokeLinecap="round"
        pointerEvents="stroke"
        {...grip(false)}
      />
      <circle
        ref={spotRef}
        cx={end[0]}
        cy={end[1]}
        r={PLUG_SPOT}
        fill="transparent"
        pointerEvents="all"
        {...grip(true)}
      />
    </g>
  );
}
