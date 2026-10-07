"use client";

import { useEffect, useRef } from "react";

// Something hanging in my closet (Closet.tsx), swishing on its hanger when
// the pointer brushes it. It swings like a pendulum from where its hook
// sits on the rod, (`x`, `y`): pushed the way the pointer moves, harder
// the faster it moves, then easing back and forth a little less each time
// until it hangs still. The cloth trails the swing, its hem dragging
// behind, so it moves like fabric rather than a board. It's a spring
// worked out each frame, only while it's moving; with reduced motion it
// hangs still.

const SWING = { spring: 8, damping: 1.1, max: 18 }; // its swing, in degrees
const DRAG = { spring: 40, damping: 7, lag: 0.22, max: 4 }; // the hem trailing
const PUSH = 0.2; // degrees a second of swing per pixel brushed past it

export default function Swish({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
}) {
  const ref = useRef<SVGGElement>(null);
  const motion = useRef({
    angle: 0,
    spin: 0, // degrees a second
    drag: 0,
    dragSpin: 0,
    frame: 0,
    last: 0,
    pointer: null as { x: number; t: number } | null,
  });

  useEffect(() => {
    const m = motion.current;
    return () => cancelAnimationFrame(m.frame);
  }, []);

  const step = (now: number) => {
    const m = motion.current;
    const dt = Math.min((now - m.last) / 1000, 1 / 30);
    m.last = now;
    m.spin += (-SWING.spring * m.angle - SWING.damping * m.spin) * dt;
    m.angle += m.spin * dt;
    const trail = Math.max(-DRAG.max, Math.min(DRAG.max, m.spin * DRAG.lag));
    m.dragSpin +=
      (DRAG.spring * (trail - m.drag) - DRAG.damping * m.dragSpin) * dt;
    m.drag += m.dragSpin * dt;

    const g = ref.current;
    const still =
      Math.abs(m.angle) < 0.02 &&
      Math.abs(m.spin) < 0.05 &&
      Math.abs(m.drag) < 0.02;
    if (!g || still) {
      Object.assign(m, { angle: 0, spin: 0, drag: 0, dragSpin: 0, frame: 0 });
      g?.removeAttribute("transform");
      return;
    }
    g.setAttribute(
      "transform",
      `translate(${x} ${y}) rotate(${m.angle.toFixed(3)}) skewX(${m.drag.toFixed(3)}) translate(${-x} ${-y})`,
    );
    m.frame = requestAnimationFrame(step);
  };

  const brush = (e: React.PointerEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const m = motion.current;
    const was = m.pointer;
    m.pointer = { x: e.clientX, t: e.timeStamp };
    if (!was || e.timeStamp - was.t > 120) return;
    // Pushed right, its hem swings right: a turn anticlockwise
    const moved = e.clientX - was.x;
    const speed =
      Math.abs(moved) / Math.max((e.timeStamp - was.t) / 1000, 0.001);
    m.spin -= moved * PUSH * Math.min(1, 0.3 + speed / 900);
    m.spin = Math.max(-SWING.max, Math.min(SWING.max, m.spin));
    if (!m.frame) {
      m.last = performance.now();
      m.frame = requestAnimationFrame(step);
    }
  };

  return (
    <g
      ref={ref}
      onPointerMove={brush}
      onPointerLeave={() => (motion.current.pointer = null)}
    >
      {children}
    </g>
  );
}
