"use client";

import { useEffect, useRef } from "react";

// Something in the room that swishes when the pointer brushes it: the
// clothes in my closet (Closet.tsx), the disco balls on their strings and
// the plants' leaves (Room.tsx). It swings like a pendulum about (`x`,
// `y`), in its parent's units: pushed the way the pointer moves, harder
// the faster it moves, then easing back and forth a little less each time
// until it's still. Brushed however fast, or scrolled past a still
// pointer: each move of the pointer, and each scroll of the page under
// it, is a line, and one that crosses it pushes it. It's a spring worked
// out each frame, only while it's moving, and it only listens while it's
// on screen; with reduced motion it keeps still.
//
// How it moves, by `feel`:
// - cloth: a slow swing, its hem trailing behind like fabric, pushed more
//   the further the pointer moves across it
// - ball: a disco ball swinging on its whole string, lighter
// - plant: any plant's leaves, all alike, lighter and springing back
// A ball or a plant is pushed by how fast the pointer goes past, once a
// pass, so a small leaf moves as much as a big one.
const FEEL = {
  cloth: { spring: 8, damping: 1.1, max: 18, push: 0.2, drag: true },
  ball: { spring: 10, damping: 1.6, max: 14, push: 0.03, drag: false },
  plant: { spring: 18, damping: 2.4, max: 16, push: 0.03, drag: false },
};
const PASS = 150; // ms before a ball or plant can be pushed again
const DRAG = { spring: 40, damping: 7, lag: 0.22, max: 4 }; // the hem trailing

// Everything that swishes hears the pointer and scrolling through one pair
// of listeners, while any of it is on screen
type Sweep = (x: number, y: number, t: number) => void;
const sweeps = new Set<Sweep>();
let pointer: { x: number; y: number } | null = null;
const onMove = (e: PointerEvent) => {
  if (e.pointerType === "touch") return;
  pointer = { x: e.clientX, y: e.clientY };
  sweeps.forEach((sweep) => sweep(e.clientX, e.clientY, e.timeStamp));
};
const onScroll = (e: Event) => {
  const p = pointer;
  if (p) sweeps.forEach((sweep) => sweep(p.x, p.y, e.timeStamp));
};
function listen(sweep: Sweep) {
  if (!sweeps.size) {
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });
  }
  sweeps.add(sweep);
  return () => {
    sweeps.delete(sweep);
    if (sweeps.size) return;
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("scroll", onScroll, { capture: true });
  };
}

// Whether the line from a to b passes through a box, a little grown
function crosses(
  [x0, y0]: [number, number],
  [x1, y1]: [number, number],
  { x, y, width, height }: DOMRect,
  pad: number,
) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  let from = 0;
  let to = 1;
  const edges: [number, number][] = [
    [-dx, x0 - (x - pad)],
    [dx, x + width + pad - x0],
    [-dy, y0 - (y - pad)],
    [dy, y + height + pad - y0],
  ];
  for (const [p, q] of edges) {
    if (p === 0) {
      if (q < 0) return false;
      continue;
    }
    const r = q / p;
    if (p < 0) {
      if (r > to) return false;
      from = Math.max(from, r);
    } else {
      if (r < from) return false;
      to = Math.min(to, r);
    }
  }
  return true;
}

export default function Swish({
  x,
  y,
  feel = "cloth",
  children,
}: {
  x: number;
  y: number;
  feel?: keyof typeof FEEL;
  children: React.ReactNode;
}) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const g = ref.current;
    const parent = g?.parentNode;
    if (!g || !(parent instanceof SVGGraphicsElement)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = FEEL[feel];
    let angle = 0;
    let spin = 0; // degrees a second
    let drag = 0;
    let dragSpin = 0;
    let frame = 0;
    let last = 0;
    let was: { at: [number, number]; t: number } | null = null;
    let pushed = -Infinity;

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      spin += (-f.spring * angle - f.damping * spin) * dt;
      angle += spin * dt;
      if (f.drag) {
        const trail = Math.max(-DRAG.max, Math.min(DRAG.max, spin * DRAG.lag));
        dragSpin +=
          (DRAG.spring * (trail - drag) - DRAG.damping * dragSpin) * dt;
        drag += dragSpin * dt;
      }
      if (
        Math.abs(angle) < 0.02 &&
        Math.abs(spin) < 0.05 &&
        Math.abs(drag) < 0.02
      ) {
        angle = spin = drag = dragSpin = 0;
        frame = 0;
        g.removeAttribute("transform");
        return;
      }
      g.setAttribute(
        "transform",
        `translate(${x} ${y}) rotate(${angle.toFixed(3)})${f.drag ? ` skewX(${drag.toFixed(3)})` : ""} translate(${-x} ${-y})`,
      );
      frame = requestAnimationFrame(step);
    };

    const sweep: Sweep = (cx, cy, t) => {
      const m = parent.getScreenCTM();
      if (!m) return;
      const p = new DOMPoint(cx, cy).matrixTransform(m.inverse());
      const at: [number, number] = [p.x, p.y];
      const before = was;
      was = { at, t };
      if (!before || t - before.t > 150 || reduce.matches) return;
      if (!crosses(before.at, at, g.getBBox(), 2)) return;
      // Pushed right, it swings right: a turn anticlockwise
      const moved = (at[0] - before.at[0]) * Math.hypot(m.a, m.b);
      const speed = Math.abs(moved) / Math.max((t - before.t) / 1000, 0.001);
      if (f.drag) spin -= moved * f.push * Math.min(1, 0.3 + speed / 900);
      else {
        if (t - pushed < PASS) return;
        pushed = t;
        spin -= Math.sign(moved) * speed * f.push;
      }
      spin = Math.max(-f.max, Math.min(f.max, spin));
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    };

    let stop = () => {};
    const observer = new IntersectionObserver(([entry]) => {
      stop();
      was = null;
      stop = entry.isIntersecting ? listen(sweep) : () => {};
    });
    observer.observe(g);
    return () => {
      observer.disconnect();
      stop();
      cancelAnimationFrame(frame);
      g.removeAttribute("transform");
    };
  }, [x, y, feel]);

  return <g ref={ref}>{children}</g>;
}
