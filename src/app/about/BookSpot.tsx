"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";

// A book's spot on the shelf (see TurningBook in Room). The book only turns
// in 3D while it's pointed at or focused, and on its way back, so it marks
// itself live (data-live) for that long and Room keeps its 3D and its cover
// behind group-data-[live]. At rest it's a flat spine: a 3D book costs the
// browser several layers, and the Ideation page has over a hundred books,
// which was more than iPhone Safari could hold, so the page kept crashing.
const CLOSING = 700; // ms, longer than a book takes to go back (delay included)

export default function BookSpot(props: HTMLAttributes<HTMLDivElement>) {
  const [live, setLive] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const open = () => {
    window.clearTimeout(timer.current);
    setLive(true);
  };
  // Once it's let go, go flat when it's back, unless it's still pointed at
  // or focused (a phone's tap leaves it hovered), then check again later
  const close = (el: HTMLDivElement) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      if (el.matches(":hover, :focus")) close(el);
      else setLive(false);
    }, CLOSING);
  };

  return (
    <div
      {...props}
      data-live={live || undefined}
      onPointerEnter={open}
      onFocus={open}
      onPointerLeave={(e) => close(e.currentTarget)}
      onBlur={(e) => close(e.currentTarget)}
    />
  );
}
