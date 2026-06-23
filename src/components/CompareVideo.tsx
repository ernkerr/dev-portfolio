"use client";

import { useRef, useState, type Ref } from "react";
import { geistMono } from "../../public/fonts/fonts";

function Pane({
  videoRef,
  label,
  accent,
  src,
  onTimeUpdate,
}: {
  videoRef: Ref<HTMLVideoElement>;
  label: string;
  accent?: boolean;
  src: string;
  onTimeUpdate?: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-navy-1">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span
          className={`${geistMono.className} ml-2 text-xs uppercase tracking-wider ${
            accent ? "text-accent-to" : "text-white/40"
          }`}
        >
          {label}
        </span>
      </div>
      <div className="aspect-[16/10] w-full overflow-hidden bg-navy-1">
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          onTimeUpdate={onTimeUpdate}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

// Side-by-side looping scroll-through videos of the old vs new site. Both clips
// are recorded at identical timing so they stay in sync; the after pane acts as
// the clock and nudges the before pane back if it drifts. The light/dark toggle
// swaps both sources (remounting via key restarts them together).
export default function CompareVideo({
  beforeLight,
  beforeDark,
  afterLight,
  afterDark,
}: {
  beforeLight: string;
  beforeDark?: string;
  afterLight: string;
  afterDark?: string;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const beforeRef = useRef<HTMLVideoElement>(null);
  const afterRef = useRef<HTMLVideoElement>(null);

  const hasToggle = Boolean(beforeDark || afterDark);
  const beforeSrc = mode === "dark" && beforeDark ? beforeDark : beforeLight;
  const afterSrc = mode === "dark" && afterDark ? afterDark : afterLight;

  const syncBefore = () => {
    const a = afterRef.current;
    const b = beforeRef.current;
    if (!a || !b) return;
    if (Math.abs(a.currentTime - b.currentTime) > 0.25) {
      b.currentTime = a.currentTime;
    }
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
          key={`before-${mode}`}
          videoRef={beforeRef}
          label={beforeDark ? `Before · ${mode}` : "Before"}
          src={beforeSrc}
        />
        <Pane
          key={`after-${mode}`}
          videoRef={afterRef}
          label={afterDark ? `After · ${mode}` : "After"}
          accent
          src={afterSrc}
          onTimeUpdate={syncBefore}
        />
      </div>
    </div>
  );
}
