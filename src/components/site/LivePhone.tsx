"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A live, rebuilt app screen in a phone's shape. The screen is laid out at a
 * real phone width (390px by default) and scaled to fit its column, so every
 * size inside can match the product's own code exactly.
 */
export default function LivePhone({
  view = { w: 390, h: 760 },
  screen = "#ffffff",
  className = "",
  children,
}: {
  /** The phone's layout size in CSS pixels before scaling. */
  view?: { w: number; h: number };
  /** CSS background of the screen. */
  screen?: string;
  /** Classes for the scaled screen, e.g. the product's font. */
  className?: string;
  children: ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / view.w),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [view.w]);

  return (
    <div
      ref={box}
      className="relative w-full overflow-hidden rounded-phone-screen shadow-float ring-1 ring-black/5"
      style={{ aspectRatio: `${view.w} / ${view.h}`, background: screen }}
    >
      <div
        className={`absolute left-0 top-0 origin-top-left ${className}`}
        style={{
          width: view.w,
          height: view.h,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
