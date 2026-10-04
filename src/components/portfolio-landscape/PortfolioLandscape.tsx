"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuPause,
  LuPlay,
} from "react-icons/lu";
import { focusRing, mono, serif } from "@/components/site/links";
import { inlineLink, label } from "@/components/site/prose";
import { LANDSCAPE, poster, video } from "./landscape";
import "./portfolio-landscape.css";

const GAP = 16;

// A row of the portfolios from the landscape research. The highlighted one
// plays a short recording of the part being discussed, the rest wait in
// grayscale to its right, and the arrows, arrow keys or a swipe move along
// the row. What each portfolio leads with, its projects, its case-study
// length and what it suggests for my design change below. Like the affinity map, the row
// runs past the text column to the right edge of the page.
export default function PortfolioLandscape() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const swipeX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState({ card: 0, bleed: 0 });
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);

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

  // Recordings don't play on their own for people who've asked for less motion.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    setPaused(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setPaused(reduced);
    if (reduced) videoRef.current?.pause();
  }, [index, reduced]);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  }

  const offset = size.card ? index * (size.card + GAP) : 0;

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Ten portfolios from people hired into their first design job"
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
            return (
              <li
                key={p.slug}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${p.name}`}
                aria-current={isActive ? "true" : undefined}
                className="shrink-0"
                style={{ width: size.card || "86%" } as CSSProperties}
              >
                <div className="relative aspect-[16/10] overflow-hidden border border-site-line bg-site-line/40">
                  {isActive ? (
                    <>
                      <video
                        key={p.slug}
                        ref={videoRef}
                        src={video(p.slug)}
                        poster={poster(p.slug)}
                        autoPlay={!reduced}
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-label={`Screen recording of ${p.name}’s portfolio. ${p.look}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={
                          paused ? "Play recording" : "Pause recording"
                        }
                        className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-site-ink/80 text-site-paper backdrop-blur transition-colors hover:bg-site-blue ${focusRing}`}
                      >
                        {paused ? (
                          <LuPlay aria-hidden />
                        ) : (
                          <LuPause aria-hidden />
                        )}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => go(i)}
                      // The arrows move along the row; cards off to the side
                      // stay out of the tab order so focus can't scroll it.
                      tabIndex={-1}
                      aria-label={`Show ${p.name}`}
                      className={`group block h-full w-full ${focusRing}`}
                    >
                      <Image
                        src={poster(p.slug)}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 720px, 86vw"
                        className="object-cover opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </button>
                  )}
                </div>
                <p
                  className={`mt-3 text-[15px] transition-colors ${
                    isActive ? "text-site-ink" : "text-site-muted"
                  }`}
                >
                  {p.name}
                </p>
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
          In the recording: {active.look} {active.source.text}{" "}
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

function ArrowButton({
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
