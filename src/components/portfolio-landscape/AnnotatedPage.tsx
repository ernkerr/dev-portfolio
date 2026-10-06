"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { focusRing, mono } from "@/components/site/links";

// A screenshot of someone's portfolio with numbered highlights. Each
// highlight opens a note on why that part was called out. The screenshot
// scrolls inside its frame, its own links open the real pages (highlight
// boxes let clicks through to them), and the arrows under the frame step
// through the notes in order. Boxes are
// percentages of the image, measured by
// career-ops/data/portfolio-landscape/annotate.mjs at desktop and phone
// widths, so the frame picks whichever capture matches its own width.

type Box = { x: number; y: number; w: number; h: number };
type Link = Box & { href: string; text: string };
export type Capture = {
  src: string;
  width: number;
  height: number;
  spots: (Box | null)[];
  links?: Link[];
};
export type Annotation = {
  notes: { label: string; note: string }[];
  desktop: Capture;
  mobile: Capture;
};

// Below this frame width the desktop capture's text gets too small to read.
export const MOBILE_BELOW = 520;

export const frameClass =
  "relative aspect-[3/4] overflow-hidden border border-site-line bg-site-line/40 sm:aspect-[16/10]";

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
    const bottom =
      Math.max(
        ((spot.y + spot.h) / 100) * contentHeight,
        note.offsetTop + note.offsetHeight,
      ) + 16;
    const view = frame.clientHeight;
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

  // Steps to the next highlight that exists in this capture.
  function step(direction: 1 | -1) {
    setOpen((current) => {
      let i = current === null ? (direction === 1 ? -1 : count) : current;
      for (let tries = 0; tries < count; tries++) {
        i = (i + direction + count) % count;
        if (capture.spots[i]) return i;
      }
      return null;
    });
  }

  const active = open === null ? null : capture.spots[open];
  // Notes for highlights in the bottom fifth of the page open above them.
  const above = active ? active.y + active.h > 80 : false;
  const place = (b: Box) => ({
    left: `${b.x}%`,
    top: `${b.y}%`,
    width: `${b.w}%`,
    height: `${b.h}%`,
  });

  return (
    <>
      <div className={frameClass}>
        <div
          ref={frameRef}
          className="absolute inset-0 overflow-y-auto overscroll-contain"
          style={{ touchAction: "pan-y" }}
        >
          <div
            ref={contentRef}
            className="relative"
            // Their links and the number badges handle their own clicks.
            // Anywhere else, a click inside a highlight opens its note and a
            // click outside every highlight closes the open one.
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a, button, [role=dialog]")) return;
              const r = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - r.left) / r.width) * 100;
              const y = ((e.clientY - r.top) / r.height) * 100;
              let hit: number | null = null;
              capture.spots.forEach((b, i) => {
                if (b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) hit = i;
              });
              setOpen((current) => (hit === null || hit === current ? null : hit));
            }}
          >
            <Image
              src={capture.src}
              width={capture.width}
              height={capture.height}
              sizes="(min-width: 1024px) 720px, 86vw"
              alt={`Screenshot of ${name}’s portfolio with ${count} numbered highlights.`}
              className="block h-auto w-full"
            />

            {/* Their own links, laid over the screenshot. The heading below
                links to the site for keyboard and screen reader users. */}
            {capture.links?.map((link, i) => (
              <a
                key={`l${i}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-label={`${link.text || "Link"} on ${name}’s site, opens in a new tab`}
                className="absolute rounded-sm transition-colors hover:bg-site-ink/10 hover:outline hover:outline-1 hover:outline-site-ink/40"
                style={place(link)}
              />
            ))}

            {capture.spots.map((spot, i) =>
              spot ? (
                <div
                  key={i}
                  className={`pointer-events-none absolute z-10 border-2 transition-colors ${
                    open === i
                      ? "border-site-blue bg-site-blue/15"
                      : "border-site-blue/70 bg-site-blue/5"
                  }`}
                  style={place(spot)}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                    aria-controls={open === i ? "annotated-note" : undefined}
                    aria-label={`Note ${i + 1} of ${count}: ${data.notes[i].label}`}
                    className={`${mono} pointer-events-auto absolute -left-3.5 -top-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-site-blue text-[12px] font-medium text-white shadow transition-transform hover:scale-110 ${focusRing}`}
                  >
                    {i + 1}
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
                className="absolute z-20 w-[min(300px,92%)] rounded-md bg-site-ink p-4 pr-10 text-site-paper shadow-lg"
                style={{
                  left: `clamp(4%, ${active.x}%, calc(96% - min(300px, 92%)))`,
                  ...(above
                    ? { bottom: `calc(${100 - active.y}% + 10px)` }
                    : { top: `calc(${active.y + active.h}% + 10px)` }),
                }}
              >
                <p
                  className={`${mono} text-[11px] uppercase tracking-[0.08em] text-site-paper/70`}
                >
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
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[15px] text-site-ink">{name}</p>
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-site-line p-0.5 text-site-ink">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous note"
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:text-site-blue ${focusRing}`}
          >
            <LuChevronLeft aria-hidden />
          </button>
          <span
            className={`${mono} min-w-[4.5rem] text-center text-[12px] text-site-muted`}
            aria-live="polite"
          >
            {open === null ? `${count} notes` : `Note ${open + 1} of ${count}`}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next note"
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:text-site-blue ${focusRing}`}
          >
            <LuChevronRight aria-hidden />
          </button>
        </div>
      </div>
    </>
  );
}
