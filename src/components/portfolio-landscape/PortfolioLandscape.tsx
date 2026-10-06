"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { LuArrowLeft, LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import { focusRing, mono, serif } from "@/components/site/links";
import { inlineLink, label } from "@/components/site/prose";
import AnnotatedPage, {
  frameClass,
  MOBILE_BELOW,
  type Annotation,
} from "./AnnotatedPage";
import annotationsJson from "./annotations.json";
import { LANDSCAPE } from "./landscape";
import "./portfolio-landscape.css";

// Captures and highlights for each portfolio, measured by
// career-ops/data/portfolio-landscape/annotate.mjs.
const ANNOTATIONS = annotationsJson as Record<string, Annotation>;

const GAP = 16;

// A row of the portfolios from the landscape research. The highlighted one
// shows an annotated screenshot of their portfolio, the rest wait in
// grayscale to its right, and the arrows, arrow keys, a swipe or a
// sideways trackpad swipe move along the row. What each portfolio leads with, its projects, its case-study
// length and what it suggests for my design change below. Like the affinity map, the row
// runs past the text column to the right edge of the page.
export default function PortfolioLandscape() {
  const sectionRef = useRef<HTMLElement>(null);
  const swipeX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState({ card: 0, bleed: 0 });

  const count = LANDSCAPE.length;
  const active = LANDSCAPE[index];

  function go(next: number) {
    setIndex(Math.max(0, Math.min(count - 1, next)));
  }

  // Card width follows the text column, and the gap to the page edge lets
  // the row run past it.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    function measure() {
      const width = section!.clientWidth;
      const bleed =
        document.documentElement.clientWidth -
        section!.getBoundingClientRect().right;
      setSize({
        card: Math.round(width * (width < 640 ? 0.86 : 0.8)),
        bleed: Math.max(0, bleed),
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

  // A sideways two-finger swipe on a trackpad moves one portfolio per
  // gesture. Momentum keeps sending wheel events after the fingers lift, so
  // the next move waits until those stop.
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
        setIndex((i) => Math.max(0, Math.min(count - 1, i + direction)));
      }
    }
    section.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      section.removeEventListener("wheel", onWheel);
      clearTimeout(settle);
    };
  }, [count]);

  const offset = size.card ? index * (size.card + GAP) : 0;
  const narrow = size.card > 0 && size.card < MOBILE_BELOW;

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="10 portfolios from people hired into their first design job"
      style={{ overscrollBehaviorX: "contain" }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(index + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(index - 1);
        }
      }}
    >
      <div
        className="overflow-hidden"
        style={{ marginRight: -size.bleed }}
        onPointerDown={(e) => {
          swipeX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeX.current === null) return;
          const dx = e.clientX - swipeX.current;
          swipeX.current = null;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <ol
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ gap: GAP, transform: `translateX(${-offset}px)` }}
        >
          {LANDSCAPE.map((p, i) => {
            const isActive = i === index;
            const annotation = ANNOTATIONS[p.slug];
            return (
              <li
                key={p.slug}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${p.name}`}
                aria-current={isActive ? "true" : undefined}
                className="shrink-0"
                style={{ width: size.card || "86%" } as CSSProperties}
              >
                {isActive ? (
                  <AnnotatedPage data={annotation} name={p.name} />
                ) : (
                  <>
                    <div className={frameClass}>
                      <button
                        type="button"
                        onClick={() => go(i)}
                        // The arrows move along the row; cards off to the side
                        // stay out of the tab order so focus can't scroll it.
                        tabIndex={-1}
                        aria-label={`Show ${p.name}`}
                        className={`group block h-full w-full ${focusRing}`}
                      >
                        <Preview
                          capture={narrow ? annotation.mobile : annotation.desktop}
                        />
                      </button>
                    </div>
                    <p className="mt-3 text-[15px] text-site-muted">{p.name}</p>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-site-line pt-4">
        <p className={`${mono} text-[13px] text-site-muted`} aria-hidden>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <ArrowButton
            label="Previous portfolio"
            disabled={index === 0}
            onClick={() => go(index - 1)}
          >
            <LuArrowLeft aria-hidden />
          </ArrowButton>
          <ArrowButton
            label="Next portfolio"
            disabled={index === count - 1}
            onClick={() => go(index + 1)}
          >
            <LuArrowRight aria-hidden />
          </ArrowButton>
        </div>
      </div>

      <div key={active.slug} aria-live="polite" className="pl-fade mt-6">
        <p className={label}>
          {active.track}
          {active.switcher ? " · Career switcher" : ""}
        </p>
        <h4 className={`${serif} mt-2 text-[28px] leading-tight text-site-ink`}>
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
            <span className="sr-only">, opens their portfolio</span>
          </a>
        </h4>
        <p className="mt-2 max-w-[40rem] text-[16px] leading-[1.7] text-site-ink/80">
          <span className="font-medium text-site-ink">{active.hired}.</span>{" "}
          {active.path}
        </p>

        <dl className="mt-6 grid gap-x-8 gap-y-5 border-t border-site-line pt-5 md:grid-cols-3">
          {[
            { term: "Leads with", value: active.leadsWith },
            { term: "Projects", value: active.projects },
            { term: "Case studies", value: active.caseStudies },
          ].map((d) => (
            <div key={d.term}>
              <dt className={label}>{d.term}</dt>
              <dd className="mt-1.5 text-[15px] leading-[1.6] text-site-ink">
                {d.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 max-w-[40rem] border-l-2 border-site-blue pl-4">
          <p className={label}>What it suggests for my design</p>
          <p className="mt-1.5 text-[17px] leading-[1.65] text-site-ink">
            {active.suggests}
          </p>
        </div>

        <p className="mt-5 max-w-[40rem] text-[13px] leading-relaxed text-site-muted">
          Select a numbered highlight to see why I called it out.{" "}
          {active.source.text}{" "}
          <a
            href={active.source.href}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            See that version
          </a>
        </p>
      </div>
    </section>
  );
}

// A grayscale preview of a card off to the side, starting at the first
// highlight so it shows part of the site rather than an empty header.
function Preview({ capture }: { capture: Annotation["desktop"] }) {
  const first = capture.spots.find(Boolean);
  const y = first ? Math.max(0, first.y - 2) : 0;
  return (
    <Image
      src={capture.src}
      alt=""
      fill
      sizes="(min-width: 1024px) 720px, 86vw"
      className="object-cover opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      style={{ objectPosition: `50% ${y}%` }}
    />
  );
}

export function ArrowButton({
  label: name,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={name}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-site-line text-site-ink transition-colors hover:border-site-blue hover:text-site-blue disabled:pointer-events-none disabled:opacity-35 ${focusRing}`}
    >
      {children}
    </button>
  );
}
