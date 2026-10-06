"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import { focusRing } from "@/components/site/links";
import { label } from "@/components/site/prose";
import { ArrowButton } from "@/components/portfolio-landscape/PortfolioLandscape";
import { APPS, type LandscapeApp } from "./landscape";

// The Gin score apps from the landscape research, as a row of phone screens
// like the portfolio landscape in the Portfolio Redesign case study. The
// selected app sits in the middle in color, with its neighbors in grayscale
// on either side, and the arrows, arrow keys, a swipe or a sideways trackpad
// swipe move along the row. It loops: left from the first app is the last.
// What the app does and its reviews change below.

// The row holds 3 copies of the apps, so there's always a neighbor on each
// side. `pos` is a place in that row. Once a move settles, it hops back to
// the same app in the middle copy without animating, so the loop never ends.
const COPIES = 3;
const SETTLE_MS = 550;

function moveBy(pos: number, by: number, count: number) {
  const next = pos + by;
  if (next >= 1 && next <= COPIES * count - 2) return next;
  return (((next % count) + count) % count) + count;
}

export default function AppLandscape() {
  const sectionRef = useRef<HTMLElement>(null);
  const swipeX = useRef<number | null>(null);
  const count = APPS.length;
  const [pos, setPos] = useState(count);
  // Off until the first measure, so the row doesn't slide in on load.
  const [animate, setAnimate] = useState(false);
  const [size, setSize] = useState({ card: 0, gap: 48 });

  const index = ((pos % count) + count) % count;
  const active = APPS[index];

  // Counts from the latest place, so quick repeated presses each move one.
  function step(by: number) {
    setAnimate(true);
    setPos((p) => moveBy(p, by, count));
  }

  function goTo(place: number) {
    setAnimate(true);
    setPos(place);
  }

  // Once a move settles in an outer copy, hop to the middle one.
  useEffect(() => {
    if (pos >= count && pos < 2 * count) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setPos((p) => (((p % count) + count) % count) + count);
    }, SETTLE_MS);
    return () => clearTimeout(t);
  }, [pos, count]);

  // Turn animation back on after the hop has been painted.
  useEffect(() => {
    if (animate) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [animate]);

  // Each phone is at most 14rem wide, like the case study's other screens.
  // On a wide column the selected phone and both neighbors fit whole.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    function measure() {
      const width = section!.clientWidth;
      setSize({
        card: Math.min(224, Math.round(width * 0.58)),
        gap: width < 640 ? 24 : 48,
      });
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // A sideways two-finger swipe on a trackpad moves one app per gesture.
  // Momentum keeps sending wheel events after the fingers lift, so the next
  // move waits until those stop.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let travel = 0;
    let moved = false;
    let settle: ReturnType<typeof setTimeout> | undefined;
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      clearTimeout(settle);
      settle = setTimeout(() => {
        travel = 0;
        moved = false;
      }, 250);
      if (moved) return;
      travel += e.deltaX;
      if (Math.abs(travel) > 60) {
        moved = true;
        const direction = travel > 0 ? 1 : -1;
        setAnimate(true);
        setPos((p) => moveBy(p, direction, count));
      }
    }
    section.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      section.removeEventListener("wheel", onWheel);
      clearTimeout(settle);
    };
  }, [count]);

  // The row starts at the middle of the column and slides left by half a
  // phone plus one step per place, so the selected phone is centered, even
  // before the first measure.
  const card = size.card || 224;
  const offset = -(card / 2) - pos * (card + size.gap);
  // While hopping between copies there's no transition class at all.
  // (transition-none can't switch one off: transition-transform and
  // transition-opacity come after it in Tailwind's CSS and win.)
  const slide = animate
    ? "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
    : "";
  const fade = animate
    ? "transition-opacity duration-500 motion-reduce:transition-none"
    : "";

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Gin score apps on the App Store in May 2025"
      style={{ overscrollBehaviorX: "contain" }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          step(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          step(-1);
        }
      }}
    >
      {/* Room above, below and at the sides keeps the phones' shadows whole,
          and the edges fade so a phone half out of view doesn't end in a
          hard cut. */}
      <div
        className="-mt-6 overflow-hidden pb-10 pt-10"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
        onPointerDown={(e) => {
          swipeX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeX.current === null) return;
          const dx = e.clientX - swipeX.current;
          swipeX.current = null;
          if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
        }}
      >
        <ol
          className={`flex items-start ${slide}`}
          style={{
            gap: size.gap,
            marginLeft: "50%",
            transform: `translateX(${offset}px)`,
          }}
        >
          {Array.from({ length: COPIES * count }, (_, place) => {
            const app = APPS[place % count];
            const isActive = place === pos;
            const far = Math.abs(place - pos) > 1;
            // Only the middle copy is announced as the slides.
            const middle = place >= count && place < 2 * count;
            return (
              <li
                key={place}
                aria-hidden={middle ? undefined : true}
                aria-roledescription={middle ? "slide" : undefined}
                aria-label={
                  middle
                    ? `${(place % count) + 1} of ${count}: ${app.name}`
                    : undefined
                }
                aria-current={isActive ? "true" : undefined}
                className={`shrink-0 ${fade} ${
                  far ? "pointer-events-none opacity-0" : ""
                }`}
                style={{ width: card }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!isActive) goTo(place);
                  }}
                  // The arrows move along the row; phones in the row stay out
                  // of the tab order so focus can't scroll it.
                  tabIndex={-1}
                  aria-label={isActive ? undefined : `Show ${app.name}`}
                  className={`group block w-full ${
                    isActive ? "cursor-default" : ""
                  } ${focusRing}`}
                >
                  <Shot app={app} dim={!isActive} animate={animate} />
                </button>
                <p
                  className={`mt-4 text-center text-body-sm ${
                    isActive
                      ? "font-medium text-site-ink"
                      : "text-site-muted opacity-60"
                  }`}
                >
                  {app.name}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-site-line pt-4">
        <p className="font-mono text-date text-site-muted" aria-hidden>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <ArrowButton
            label="Previous app"
            disabled={false}
            onClick={() => step(-1)}
          >
            <LuArrowLeft aria-hidden />
          </ArrowButton>
          <ArrowButton
            label="Next app"
            disabled={false}
            onClick={() => step(1)}
          >
            <LuArrowRight aria-hidden />
          </ArrowButton>
        </div>
      </div>

      <div key={active.slug} aria-live="polite" className="pl-fade mt-6">
        <p className={label}>
          {active.kind} · Released {active.released}
        </p>
        <h4 className="mt-2 font-serif text-subhead text-site-ink">
          <a
            href={active.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-baseline gap-1.5 ${focusRing}`}
          >
            {active.name}
            <LuArrowUpRight
              aria-hidden
              className="h-5 w-5 self-center text-site-muted transition-colors group-hover:text-site-blue"
            />
            <span className="sr-only">, opens its App Store page</span>
          </a>
        </h4>
        <p className="mt-2 max-w-measure text-body text-site-ink/80">
          {active.summary}
        </p>

        {active.reviews.length > 0 ? (
          <figure className="mt-6 border-t border-site-line pt-5">
            <p className={label}>What reviewers asked for</p>
            <div className="mt-4 grid items-start gap-6 md:grid-cols-2">
              {active.reviews.map((r) => (
                <Image
                  key={r.src}
                  src={r.src}
                  alt={r.alt}
                  width={920}
                  height={r.height}
                  sizes="(min-width: 768px) 28rem, 100vw"
                  className="h-auto w-full"
                />
              ))}
            </div>
            <figcaption className="mt-4 max-w-measure text-body-sm text-site-ink/80">
              {active.took}
            </figcaption>
          </figure>
        ) : (
          <p className="mt-6 max-w-measure border-t border-site-line pt-5 text-body-sm text-site-ink/80">
            {active.took}
          </p>
        )}
      </div>
    </section>
  );
}

/** The app's screen in May 2025. */
function Shot({
  app,
  dim,
  animate,
}: {
  app: LandscapeApp;
  dim: boolean;
  animate: boolean;
}) {
  // The selected phone gets a blue ring; the rest fade back in grayscale
  // until hovered.
  const look = dim
    ? "opacity-25 grayscale ring-1 ring-black/5 group-hover:opacity-100 group-hover:grayscale-0"
    : "ring-2 ring-site-blue ring-offset-4 ring-offset-site-paper";
  const motion = animate
    ? "transition duration-300 motion-reduce:transition-none"
    : "";
  return (
    <Image
      src={app.shot.src}
      alt={dim ? "" : app.shot.alt}
      width={600}
      height={app.shot.height}
      sizes="224px"
      // Every copy loads up front: the loop hops to copies that haven't
      // been on screen yet, and a lazy one would flash blank.
      loading="eager"
      className={`h-auto w-full rounded-phone-screen shadow-float ${motion} ${look}`}
    />
  );
}
