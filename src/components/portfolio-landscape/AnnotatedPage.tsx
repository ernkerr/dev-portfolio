"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { focusRing, mono } from "@/components/site/links";

// A screenshot of someone's portfolio with numbered highlights. Each
// highlight opens a note on why that part was called out. The screenshot
// scrolls inside its frame, and the arrows step through the notes in order.
// Boxes are percentages of the image, measured by
// career-ops/data/portfolio-landscape/annotate.mjs at desktop and phone
// widths, so the frame picks whichever capture matches its own width.

type Spot = { x: number; y: number; w: number; h: number } | null;
type Capture = { src: string; width: number; height: number; spots: Spot[] };
export type Annotation = {
  notes: { label: string; note: string }[];
  desktop: Capture;
  mobile: Capture;
};

// Below this frame width the desktop capture's text gets too small to read.
const MOBILE_BELOW = 520;
// Room kept clear at the bottom of the frame for the note arrows.
const CONTROLS = 56;

export default function AnnotatedPage({
  data,
  name,
}: {
  data: Annotation;
  name: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [narrow, setNarrow] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);

  const capture = narrow ? data.mobile : data.desktop;
  const count = data.notes.length;

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => setNarrow(frame.clientWidth < MOBILE_BELOW);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => observer.disconnect();
  }, []);

  // Keep an open note inside the frame: scroll just enough to show the
  // highlight and its note together.
  useEffect(() => {
    const frame = frameRef.current;
    const note = noteRef.current;
    const content = contentRef.current;
    const spot = open === null ? null : capture.spots[open];
    if (!frame || !note || !content || !spot) return;
    const contentHeight = content.offsetHeight;
    const top = Math.min((spot.y / 100) * contentHeight, note.offsetTop) - 16;
    const bottom = Math.max(
      ((spot.y + spot.h) / 100) * contentHeight,
      note.offsetTop + note.offsetHeight,
    ) + 16;
    const view = frame.clientHeight - CONTROLS;
    let target = frame.scrollTop;
    if (bottom - top > view || top < frame.scrollTop) target = top;
    else if (bottom > frame.scrollTop + view) target = bottom - view;
    if (target !== frame.scrollTop) {
      frame.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
    }
  }, [open, capture, reduced]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function step(direction: 1 | -1) {
    setOpen((current) =>
      current === null
        ? direction === 1
          ? 0
          : count - 1
        : (current + direction + count) % count,
    );
  }

  const active = open === null ? null : capture.spots[open];
  // Notes for highlights in the bottom fifth of the page open above them.
  const above = active ? active.y + active.h > 80 : false;

  return (
    <div className="absolute inset-0">
      <div
        ref={frameRef}
        className="absolute inset-0 overflow-y-auto overscroll-contain"
        style={{ touchAction: "pan-y" }}
        onClick={(e) => {
          if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === "IMG") {
            setOpen(null);
          }
        }}
      >
        <div ref={contentRef} className="relative" style={{ marginBottom: CONTROLS }}>
          <Image
            src={capture.src}
            width={capture.width}
            height={capture.height}
            sizes="(min-width: 1024px) 720px, 86vw"
            alt={`Screenshot of ${name}’s portfolio with ${count} numbered highlights.`}
            className="block h-auto w-full"
            priority
          />

          {capture.spots.map((spot, i) =>
            spot ? (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  width: `${spot.w}%`,
                  height: `${spot.h}%`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={open === i ? "annotated-note" : undefined}
                  aria-label={`Note ${i + 1} of ${count}: ${data.notes[i].label}`}
                  className={`absolute inset-0 border-2 transition-colors ${
                    open === i
                      ? "border-site-blue bg-site-blue/15"
                      : "border-site-blue/70 bg-site-blue/5 hover:bg-site-blue/10"
                  } ${focusRing}`}
                >
                  <span
                    aria-hidden
                    className={`${mono} absolute -left-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-site-blue text-[12px] font-medium text-white shadow`}
                  >
                    {i + 1}
                  </span>
                </button>
              </div>
            ) : null,
          )}

          {open !== null && active ? (
            <div
              ref={noteRef}
              id="annotated-note"
              role="dialog"
              aria-label={data.notes[open].label}
              className="absolute z-10 w-[min(300px,92%)] rounded-md bg-site-ink p-4 pr-10 text-site-paper shadow-lg"
              style={{
                left: `clamp(4%, ${active.x}%, calc(96% - min(300px, 92%)))`,
                ...(above
                  ? { bottom: `calc(${100 - active.y}% + 10px)` }
                  : { top: `calc(${active.y + active.h}% + 10px)` }),
              }}
            >
              <p className={`${mono} text-[11px] uppercase tracking-[0.08em] text-site-paper/70`}>
                {open + 1}. {data.notes[open].label}
              </p>
              <p className="mt-1.5 text-[14px] leading-[1.55]">
                {data.notes[open].note}
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close note"
                className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-site-paper/70 hover:text-site-paper ${focusRing}`}
              >
                <LuX aria-hidden />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-20 flex items-end justify-between gap-2">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-site-ink/85 p-1 text-site-paper shadow backdrop-blur">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous note"
            className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 ${focusRing}`}
          >
            <LuChevronLeft aria-hidden />
          </button>
          <span className={`${mono} min-w-[4.5rem] text-center text-[12px]`}>
            {open === null ? `${count} notes` : `${open + 1} of ${count}`}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next note"
            className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 ${focusRing}`}
          >
            <LuChevronRight aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
