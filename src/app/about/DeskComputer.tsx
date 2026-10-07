"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { focusRing } from "@/components/site/links";
import { CASE_STUDIES } from "@/data/caseStudies";
import { AREA, DeskArt, SCREEN } from "./deskArt";

// What's on my desk (deskArt.tsx), as a button: pointed at, the monitor's
// screen tints, and clicked, the desk zooms in, growing from where it is
// to fill the window, and the monitor shows my case studies, each a link
// to it. Escape, Close or a click outside puts it back. With reduced
// motion it comes up without zooming.
export default function DeskComputer({
  box,
}: {
  /** Where the things on the desk are, as percentages of the drawing. */
  box: { left: string; top: string; width: string; height: string };
}) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [page, setPage] = useState<HTMLElement | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const title = `desk${useId().replace(/[^\w-]/g, "")}`;

  useEffect(() => setPage(document.body), []);

  const shut = () => {
    setShown(false);
    setOpen(false);
    trigger.current?.focus();
  };

  // Open: zoom up from the desk, focus Close, and Escape puts it back
  useEffect(() => {
    if (!open) return;
    const el = frame.current;
    const from = trigger.current?.getBoundingClientRect();
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (el && from && !still) {
      const to = el.getBoundingClientRect();
      el.style.transition = "none";
      el.style.transform = `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width})`;
      el.getBoundingClientRect();
    }
    const raf = requestAnimationFrame(() => {
      if (el) {
        el.style.transition = "";
        el.style.transform = "";
      }
      setShown(true);
    });
    close.current?.focus();
    const escape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setShown(false);
      setOpen(false);
      trigger.current?.focus();
    };
    window.addEventListener("keydown", escape);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", escape);
    };
  }, [open]);

  const viewBox = `${AREA.x} ${AREA.y} ${AREA.w} ${AREA.h}`;
  const fade = `transition-opacity duration-300 ease-switch motion-reduce:transition-none ${shown ? "opacity-100" : "opacity-0"}`;
  // The screen, as percentages of the zoomed-in drawing, just inside its
  // bezel's curve
  const screen = {
    left: `${((SCREEN.x + 1 - AREA.x) / AREA.w) * 100}%`,
    top: `${((SCREEN.y + 2.5 - AREA.y) / AREA.h) * 100}%`,
    width: `${((SCREEN.w - 2) / AREA.w) * 100}%`,
    height: `${((SCREEN.h - 1.5) / AREA.h) * 100}%`,
  };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label="My desk: open it to see my case studies on my computer"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={`group absolute ${focusRing} ${open ? "invisible" : ""}`}
        style={box}
      >
        <svg
          viewBox={viewBox}
          aria-hidden="true"
          className="block h-full w-full overflow-visible"
        >
          <DeskArt />
          <rect
            x={SCREEN.x}
            y={SCREEN.y}
            width={SCREEN.w}
            height={SCREEN.h + 3}
            className="fill-transparent transition-colors group-hover:fill-site-blue/10 group-focus-visible:fill-site-blue/10 motion-reduce:transition-none"
          />
        </svg>
      </button>

      {open &&
        page &&
        createPortal(
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              aria-hidden="true"
              className={`fixed inset-0 bg-site-paper/80 ${fade}`}
            />
            <div
              className="relative flex min-h-full items-center justify-center px-gutter py-10"
              onClick={(e) => e.target === e.currentTarget && shut()}
            >
              <div role="dialog" aria-modal="true" aria-labelledby={title}>
                <div
                  className={`mb-3 flex items-baseline justify-between gap-6 ${fade}`}
                >
                  <h2 id={title} className="text-caption text-site-muted">
                    My desk. Pick a case study on my screen.
                  </h2>
                  <button
                    ref={close}
                    type="button"
                    onClick={shut}
                    className={`font-mono text-label uppercase text-site-muted transition-colors hover:text-site-blue motion-reduce:transition-none ${focusRing}`}
                  >
                    Close
                  </button>
                </div>
                <div
                  ref={frame}
                  className="relative origin-top-left transition-transform duration-500 ease-switch motion-reduce:transition-none"
                  style={{
                    width: `min(64rem, calc(100vw - 3rem), calc(78svh * ${AREA.w} / ${AREA.h}))`,
                  }}
                >
                  <svg
                    viewBox={viewBox}
                    aria-hidden="true"
                    className="block h-auto w-full overflow-visible"
                  >
                    {/* The desk's top under them, then the things on it */}
                    <rect
                      x={AREA.x}
                      y={328}
                      width={AREA.w}
                      height={4}
                      className="fill-room-desk"
                    />
                    <DeskArt tiles={false} />
                  </svg>

                  {/* The screen: my case studies */}
                  <div
                    className="absolute flex flex-col overflow-hidden bg-site-paper p-3 md:p-4"
                    style={screen}
                  >
                    <div className="flex items-baseline justify-between font-mono text-label uppercase text-site-muted">
                      <span className="text-site-ink">Erin Kerr</span>
                      <span>Work</span>
                    </div>
                    <ul className="mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2 md:grid-cols-3">
                      {CASE_STUDIES.map(({ name, slug, title: what }) => (
                        <li key={slug} className="min-h-0">
                          <Link
                            href={`/${slug}`}
                            className={`group flex h-full flex-col justify-between gap-2 overflow-hidden border border-site-line p-2 transition-colors hover:border-site-blue motion-reduce:transition-none md:p-3 ${focusRing}`}
                          >
                            <span className="font-mono text-label uppercase text-site-muted">
                              {name}
                            </span>
                            <span className="font-serif text-caption text-site-ink transition-colors group-hover:text-site-blue motion-reduce:transition-none md:text-tile-title">
                              {what}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          page,
        )}
    </>
  );
}
