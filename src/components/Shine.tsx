"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ShineProps = {
  children: ReactNode;
  className?: string;
};

// Ported from OrderSync. Wraps content with the `shine-on-hover` gradient and
// drives the sweep: plays once when the element enters the viewport, replays on
// mouseenter (only when not already animating), and always runs to completion
// because `data-shine` is removed on `animationend`, not on mouseleave.
const Shine = ({ children, className = "" }: ShineProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let playedOnView = false;
    const start = () => {
      if (el.dataset.shine === "true") return;
      el.dataset.shine = "true";
    };
    const end = () => {
      el.removeAttribute("data-shine");
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !playedOnView) {
          playedOnView = true;
          start();
        }
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    el.addEventListener("mouseenter", start);
    el.addEventListener("animationend", end);

    return () => {
      io.disconnect();
      el.removeEventListener("mouseenter", start);
      el.removeEventListener("animationend", end);
    };
  }, []);

  return (
    <span ref={ref} className={`shine-on-hover ${className}`}>
      {children}
    </span>
  );
};

export default Shine;
