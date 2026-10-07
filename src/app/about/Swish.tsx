"use client";

import { useState } from "react";

// Something hanging in my closet (Closet.tsx), swishing on its hanger when
// the pointer brushes it: it swings away from the side the pointer came
// in from, back and forth a little less each time, and settles. It turns
// about the top of what it holds, the hanger's hook. A swing finishes
// before another can start; with reduced motion it hangs still.
export default function Swish({ children }: { children: React.ReactNode }) {
  // Which way it was pushed: 1 to the right, -1 to the left
  const [push, setPush] = useState<0 | 1 | -1>(0);

  return (
    <g
      onMouseEnter={(e) => {
        if (push) return;
        const box = e.currentTarget.getBoundingClientRect();
        setPush(e.clientX < box.left + box.width / 2 ? 1 : -1);
      }}
      onAnimationEnd={(e) => e.target === e.currentTarget && setPush(0)}
      className={`origin-top [transform-box:fill-box] motion-reduce:animate-none ${push ? "animate-swish" : ""}`}
      style={{ "--swish": push } as React.CSSProperties}
    >
      {children}
    </g>
  );
}
