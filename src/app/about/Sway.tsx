"use client";

import { useEffect, useRef } from "react";
import { SWAY_PERIOD } from "./DraggableCord";

// Leaves swaying, a tiny bit, side to side, in time with the headphone
// cord's idle sway (DraggableCord): the same slow wave on the page's own
// clock, so they move together. Each `g[data-sway]` inside turns about its
// own origin, `degrees` each way. With reduced motion they keep still, as
// the cord does.
export default function Sway({
  degrees,
  children,
}: {
  degrees: number;
  children: React.ReactNode;
}) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const groups = [...root.querySelectorAll("g[data-sway]")];
    let frame = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const angle =
        degrees * Math.sin((2 * Math.PI * (now / 1000)) / SWAY_PERIOD);
      groups.forEach((g) =>
        g.setAttribute("transform", `rotate(${angle.toFixed(3)})`),
      );
    };
    // Only while it's on screen
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [degrees]);

  return <g ref={ref}>{children}</g>;
}
