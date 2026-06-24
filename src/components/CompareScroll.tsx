"use client";

import { useRef, useState, type Ref } from "react";
import Image from "next/image";
import { geistMono } from "../../public/fonts/fonts";

type Img = { src: string; w: number; h: number };

function Pane({
  paneRef,
  label,
  accent,
  img,
  onScroll,
}: {
  paneRef: Ref<HTMLDivElement>;
  label: string;
  accent?: boolean;
  img: Img;
  onScroll: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-navy-1">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span
          className={`${geistMono.className} ml-2 text-xs uppercase tracking-wider ${
            accent ? "text-white" : "text-white/40"
          }`}
        >
          {label}
        </span>
      </div>
      <div
        ref={paneRef}
        onScroll={onScroll}
        className="h-[440px] overflow-y-auto md:h-[600px]"
      >
        <Image
          src={img.src}
          alt={`${label} screenshot`}
          width={img.w}
          height={img.h}
          unoptimized
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

// Side-by-side before/after screenshots whose scroll positions stay in sync.
// When `afterDark` is supplied, a Light/Dark toggle swaps the "after" pane.
export default function CompareScroll({
  before,
  beforeDark = null,
  afterLight,
  afterDark = null,
}: {
  before: Img;
  beforeDark?: Img | null;
  afterLight: Img;
  afterDark?: Img | null;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const lock = useRef(false);

  const hasToggle = Boolean(afterDark || beforeDark);
  const beforeShown = mode === "dark" && beforeDark ? beforeDark : before;
  const after = mode === "dark" && afterDark ? afterDark : afterLight;

  // Mirror scroll by ratio so panes of slightly different heights stay aligned.
  const sync = (from: HTMLDivElement | null, to: HTMLDivElement | null) => {
    if (!from || !to || lock.current) return;
    lock.current = true;
    const denom = from.scrollHeight - from.clientHeight || 1;
    const ratio = from.scrollTop / denom;
    to.scrollTop = ratio * (to.scrollHeight - to.clientHeight);
    requestAnimationFrame(() => {
      lock.current = false;
    });
  };

  return (
    <div>
      {hasToggle && (
        <div
          className={`${geistMono.className} mb-5 inline-flex rounded-full border border-white/15 bg-navy-2 p-1 text-xs`}
        >
          {(["light", "dark"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`rounded-full px-4 py-1.5 font-medium capitalize transition-colors ${
                mode === m
                  ? "bg-white text-navy-1"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {m} mode
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Pane
          paneRef={leftRef}
          label={beforeDark ? `Before · ${mode}` : "Before"}
          img={beforeShown}
          onScroll={() => sync(leftRef.current, rightRef.current)}
        />
        <Pane
          paneRef={rightRef}
          label={afterDark ? `After · ${mode}` : "After"}
          accent
          img={after}
          onScroll={() => sync(rightRef.current, leftRef.current)}
        />
      </div>
    </div>
  );
}
