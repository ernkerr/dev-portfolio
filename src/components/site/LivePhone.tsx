"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// iPhone status bar and home indicator sizes, in points.
const STATUS_BAR = 54;

/**
 * A live, rebuilt app screen in a phone's shape. The screen is laid out at a
 * real phone width (390px by default) and scaled to fit its column, so every
 * size inside can match the product's own code exactly.
 *
 * With `device`, the screen sits in a whole phone: a black body with side
 * buttons, the Dynamic Island, a status bar and the home indicator, so the
 * demo reads as a phone you can use, not a screenshot. The app's content
 * then starts below the status bar.
 */
export default function LivePhone({
  view = { w: 390, h: 760 },
  screen = "#ffffff",
  className = "",
  device = false,
  statusBar = "dark",
  children,
}: {
  /** The screen's layout size in CSS pixels before scaling. */
  view?: { w: number; h: number };
  /** CSS background of the screen. */
  screen?: string;
  /** Classes for the scaled screen, e.g. the product's font. */
  className?: string;
  /** Draw the whole phone around the screen. */
  device?: boolean;
  /** Status bar text color: dark on light apps, light on dark ones. */
  statusBar?: "dark" | "light";
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

  const screenEl = (
    <div
      ref={box}
      className={`relative w-full overflow-hidden rounded-phone-screen ${
        device ? "" : "shadow-float ring-1 ring-black/5"
      }`}
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
        {device ? (
          <>
            <StatusBar tone={statusBar} />
            <div className="relative" style={{ height: view.h - STATUS_BAR }}>
              {children}
            </div>
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-2 left-1/2 z-20 h-[5px] w-[134px] -translate-x-1/2 rounded-full ${
                statusBar === "light" ? "bg-white/80" : "bg-black/85"
              }`}
            />
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );

  if (!device) return screenEl;

  // Side buttons sit just outside the body: action button and volume on the
  // left, power on the right.
  const side = "absolute w-[1.4%] bg-device-button";
  return (
    <div className="relative px-[1.4%]">
      <span
        aria-hidden="true"
        className={`${side} left-0 top-[17%] h-[4%] rounded-l-sm`}
      />
      <span
        aria-hidden="true"
        className={`${side} left-0 top-[24%] h-[7.5%] rounded-l-sm`}
      />
      <span
        aria-hidden="true"
        className={`${side} left-0 top-[33%] h-[7.5%] rounded-l-sm`}
      />
      <span
        aria-hidden="true"
        className={`${side} right-0 top-[27%] h-[11%] rounded-r-sm`}
      />
      <div className="rounded-phone-screen bg-device-body p-[3.2%] shadow-float ring-1 ring-device-edge">
        {screenEl}
      </div>
    </div>
  );
}

/** 9:41, the Dynamic Island, and signal, Wi-Fi and battery. */
function StatusBar({ tone }: { tone: "dark" | "light" }) {
  const color = tone === "light" ? "#ffffff" : "#000000";
  return (
    <div
      aria-hidden="true"
      className="relative flex items-center justify-between px-8 pt-[18px]"
      style={{
        height: STATUS_BAR,
        color,
        fontFamily:
          'system-ui, -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <span className="w-[54px] text-center text-[17px] font-semibold leading-none">
        9:41
      </span>
      <span className="absolute left-1/2 top-[11px] h-[37px] w-[126px] -translate-x-1/2 rounded-full bg-device-body" />
      <span className="flex items-center gap-[6px]">
        <svg width="18" height="12" viewBox="0 0 18 12" fill={color}>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={color}>
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.2 10.2 0 0 0 8 .4C5.2.4 2.7 1.5.8 3.3L2 4.6a8.4 8.4 0 0 1 6-2.4Z" />
          <path d="M8 5.6c1.4 0 2.6.5 3.6 1.4l1.2-1.3A7 7 0 0 0 8 3.8c-1.8 0-3.5.7-4.8 1.9L4.4 7A5.2 5.2 0 0 1 8 5.6Z" />
          <path d="M8 9a1.9 1.9 0 0 1 1.3.5L8 11 6.7 9.5A1.9 1.9 0 0 1 8 9Z" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="12"
            rx="3.5"
            stroke={color}
            opacity="0.4"
          />
          <rect x="2" y="2" width="20" height="9" rx="2" fill={color} />
          <path d="M25 4.5v4a2 2 0 0 0 0-4Z" fill={color} opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}
