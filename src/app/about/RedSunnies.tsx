"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { focusRing } from "@/components/site/links";

// My red sunnies, clipped to the strap in my closet (Closet.tsx). Click
// them to put them on: they come off the strap and the whole page goes red,
// as if you're looking through them. Click the empty clip, or press
// Escape, to take them off. With reduced motion the red comes and goes
// without fading.
//
// Drawn about (0, 0), 44 wide and 26 tall, in the closet's units.
export default function RedSunnies({
  box,
}: {
  /** Where they hang in the closet, as percentages of its drawing. */
  box: { left: string; top: string; width: string; height: string };
}) {
  const [on, setOn] = useState(false);
  const [page, setPage] = useState<HTMLElement | null>(null);

  useEffect(() => setPage(document.body), []);
  useEffect(() => {
    if (!on) return;
    const off = (e: KeyboardEvent) => e.key === "Escape" && setOn(false);
    window.addEventListener("keydown", off);
    return () => window.removeEventListener("keydown", off);
  }, [on]);

  const lens = "M3 -4Q10 -6 19 -8.5Q21.5 -3 17.5 3.5Q11 7.5 5 4.5Q2 0.5 3 -4Z";
  return (
    <>
      <button
        type="button"
        aria-pressed={on}
        aria-label="Wear my red sunnies"
        title={on ? "Take off my red sunnies" : "Put on my red sunnies"}
        onClick={() => setOn((was) => !was)}
        className={`group absolute ${focusRing}`}
        style={box}
      >
        <svg
          viewBox="-22 -13 44 26"
          aria-hidden="true"
          className="block h-full w-full overflow-visible"
        >
          {/* The clip on the strap, left behind when they're on */}
          <rect
            x={-3}
            y={-6}
            width={6}
            height={3}
            rx={1}
            className="fill-room-sunnies-tortoise/40"
          />
          <g
            className={`transition duration-300 ease-switch motion-reduce:transition-none ${
              on
                ? "translate-y-2 opacity-0"
                : "group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
            }`}
          >
            {/* The arms, folded behind */}
            <path
              d="M-18 -5H18"
              strokeWidth={1.4}
              className="stroke-room-sunnies-red"
            />
            {[-1, 1].map((s) => (
              <g key={s} transform={`scale(${s} 1)`}>
                <path d={lens} className="fill-room-sunnies-red" />
                <path
                  d={lens}
                  transform="translate(11 -0.8) scale(0.74) translate(-11 0.8)"
                  className="fill-room-sunnies-red-lens"
                />
                {/* The light on the lens */}
                <path
                  d="M8 -2.5L12 -4"
                  strokeWidth={1}
                  strokeLinecap="round"
                  className="stroke-room-frost/70"
                />
              </g>
            ))}
            <path
              d="M-5 -3Q0 -6 5 -3"
              fill="none"
              strokeWidth={1.8}
              className="stroke-room-sunnies-red"
            />
          </g>
        </svg>
      </button>
      {page &&
        createPortal(
          <div
            aria-hidden="true"
            className={`pointer-events-none fixed inset-0 z-50 bg-room-sunnies-tint/50 mix-blend-multiply transition-opacity duration-500 motion-reduce:transition-none ${
              on ? "opacity-100" : "opacity-0"
            }`}
          />,
          page,
        )}
    </>
  );
}
