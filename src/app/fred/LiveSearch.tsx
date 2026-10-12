"use client";

import { useEffect, useRef, useState } from "react";
import { LuCheck, LuChevronDown, LuX } from "react-icons/lu";
import { focusRing } from "@/components/site/links";
import { label } from "@/components/site/prose";

// Fred's search card (fred-and-ginger, web/components/shell/search-card.tsx,
// October 2026), rebuilt from its code so reviewers can watch a search: three
// numbered steps, a count of the listings checked, and a skyline whose
// windows light up as Fred looks. Colors, sizes and type are Fred's own (its
// globals.css), not the portfolio's. The real card follows Fred's tools as
// they stream in; here the search runs on a timer. The three places are from
// the live demo's inbox on October 12, 2026; the counts are examples.

const STEPS = ["Searching listings", "Reviewing matches", "Picking the best"];
const DETAILS = [
  "Williamsburg, Greenpoint, East Village · under $4,500 · 1+ bed",
  "Comparing 38 matches",
  "Writing up 3 places",
];
const CHECKED = 1214;
// What floats over the skyline in each step: the search, then listings from
// the results, then what Fred is reading.
const LABELS = [
  ["Williamsburg", "Greenpoint", "East Village", "under $4,500", "1+ bed"],
  [
    "1 bd · $3,350 · Greenpoint",
    "2 bd · $3,900 · Greenpoint",
    "1 bd · $4,750 · East Village",
    "1 bd · $4,195 · East Village",
  ],
  ["Reading the full listing page", "1 bd · $3,350 · Greenpoint"],
];
// When each step starts and the search ends, in ms.
const TIMELINE = [0, 4200, 7200, 9400];

type Place = {
  title: string;
  facts: string;
  fit: string;
  over?: boolean;
  tile: "brick" | "stone" | "glass";
};

const PLACES: Place[] = [
  {
    title: "$3,350 · Greenpoint",
    facts: "1 bed, 1 bath · $950 under the area’s usual",
    fit: "Strong fit",
    tile: "brick",
  },
  {
    title: "$3,900 · Greenpoint",
    facts: "2 bed, 1 bath · 4 min to the G at Greenpoint Av",
    fit: "Strong fit",
    tile: "stone",
  },
  {
    title: "$4,750 · East Village",
    facts: "1 bed, 1 bath · 9 min to the F · Washer/dryer in unit",
    fit: "Over budget with fees",
    over: true,
    tile: "glass",
  },
];

const spinner =
  "size-[11px] shrink-0 animate-spin rounded-full border-[1.5px] border-[#E7E6E1] border-t-[#141413] motion-reduce:animate-none";

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function LiveSearch() {
  // 0 to 2 is the step Fred is on, 3 is done. It opens finished, so the
  // first frame (and a screenshot of it) shows the whole card.
  const [step, setStep] = useState(3);
  const [count, setCount] = useState(CHECKED);
  const [since, setSince] = useState(0);
  const [now, setNow] = useState(0);
  const [open, setOpen] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const running = step < 3;

  function clear() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function run() {
    clear();
    setOpen(true);
    if (reducedMotion()) {
      setStep(3);
      setCount(CHECKED);
      return;
    }
    const start = Date.now();
    setCount(0);
    TIMELINE.forEach((at, i) =>
      timers.current.push(
        setTimeout(() => {
          setStep(i);
          setSince(Date.now());
        }, at),
      ),
    );
    setSince(start);
    timers.current.push(setTimeout(() => countUp(setCount), 1200));
  }

  // The search runs once when the card comes into view.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          seen.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );
    seen.observe(el);
    return () => {
      seen.disconnect();
      clear();
    };
    // Once, on mount; run and clear only touch refs and setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The seconds on the step that's running.
  useEffect(() => {
    if (!running) return;
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(tick);
  }, [running]);
  const elapsed = running && now > since ? Math.round((now - since) / 1000) : 0;

  return (
    <div ref={box} className="bg-[#F5F5F2] px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto flex max-w-[34rem] flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <p className={label}>Fred’s search card · live</p>
          <button
            type="button"
            onClick={run}
            className={`font-mono text-label uppercase text-site-muted transition-colors hover:text-site-blue ${focusRing}`}
          >
            Replay
          </button>
        </div>

        <p className="max-w-[85%] self-end rounded-2xl border border-[#E7E6E1] bg-white px-3.5 py-2.5 text-[14.5px] text-[#141413]">
          Find me a 1 bed in Williamsburg, Greenpoint or the East Village under
          $4,500
        </p>

        <section
          aria-label="Apartment search"
          className="w-full overflow-hidden rounded-xl border border-[#E7E6E1] bg-white text-[#141413]"
        >
          <header
            className={`flex items-center gap-3 px-4 py-3 ${open ? "border-b border-[#E7E6E1]" : ""}`}
          >
            <h3 className="text-[15px] font-semibold tracking-tight">
              Apartment search
            </h3>
            <span aria-live="polite" className="ml-auto">
              {running ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0EFEB] px-2.5 py-1 text-[13px] font-medium">
                  <span className={spinner} aria-hidden="true" />
                  Searching
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2E9E5B]/10 px-2.5 py-1 text-[13px] font-medium text-[#2E9E5B]">
                  <LuCheck size={13} strokeWidth={2} aria-hidden="true" />
                  Done
                </span>
              )}
            </span>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className={`rounded-md p-1 text-[#6B6A64] hover:bg-[#F0EFEB] hover:text-[#141413] ${focusRing}`}
            >
              <LuChevronDown
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
              <span className="sr-only">
                {open ? "Hide the search" : "Show the search"}
              </span>
            </button>
          </header>

          {open && (
            <>
              <div className="px-4 pb-4 pt-3">
                <div className="flex justify-between text-[12.5px] text-[#6B6A64]">
                  <span>Step</span>
                  <span>Listings checked</span>
                </div>
                <ol className="mt-1 grid">
                  {STEPS.map((name, i) => {
                    const done = i < step;
                    const active = i === step;
                    return (
                      <li
                        key={name}
                        className="flex min-w-0 items-center gap-3 py-1.5"
                      >
                        <span
                          className={`grid size-7 shrink-0 place-items-center rounded-full border text-[12.5px] tabular-nums ${
                            done
                              ? "border-[#141413]/15 text-[#141413]"
                              : "border-[#E7E6E1] text-[#6B6A64]"
                          }`}
                        >
                          {done ? (
                            <LuCheck size={13} strokeWidth={2} aria-label="Done" />
                          ) : (
                            i + 1
                          )}
                        </span>
                        <span
                          className={`shrink-0 text-[14px] ${done || active ? "font-medium" : "text-[#6B6A64]"}`}
                        >
                          {name}
                        </span>
                        {active && (
                          <>
                            <span className={spinner} aria-hidden="true" />
                            <span className="min-w-0 truncate text-[13px] text-[#6B6A64]">
                              {DETAILS[i]}
                              {elapsed >= 2 ? ` · ${elapsed}s` : ""}
                            </span>
                          </>
                        )}
                        {i === 0 && (
                          <span className="ml-auto font-mono text-[13px] tabular-nums">
                            {count.toLocaleString("en-US")}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
                <Skyline labels={running ? LABELS[step] : []} live={running} />
              </div>
              {!running && (
                <ul className="border-t border-[#E7E6E1]">
                  {PLACES.map((p) => (
                    <PlaceRow key={p.title} place={p} />
                  ))}
                </ul>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

/** Counts up to the number of listings checked, easing out, like the app. */
function countUp(set: (n: number) => void) {
  const start = performance.now();
  requestAnimationFrame(function tick(t) {
    const k = Math.min(1, (t - start) / 900);
    set(Math.round(CHECKED * (1 - (1 - k) ** 3)));
    if (k < 1) requestAnimationFrame(tick);
  });
}

function PlaceRow({ place }: { place: Place }) {
  return (
    <li className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 border-t border-[#E7E6E1] px-4 py-2.5 first:border-t-0">
      <BuildingTile kind={place.tile} />
      <div className="min-w-0">
        <p className="truncate text-[14.5px] font-semibold tabular-nums">
          {place.title}
        </p>
        <p className="truncate text-[12.5px] text-[#6B6A64]">{place.facts}</p>
      </div>
      <div className="flex items-center gap-1.5 text-[12.5px]">
        <span
          className={`mr-1 hidden font-medium sm:inline ${place.over ? "text-[#B86E14]" : "text-[#2E9E5B]"}`}
        >
          {place.fit}
        </span>
        <span className="grid size-7 place-items-center rounded-full border border-[#E7E6E1] text-[#6B6A64]">
          <LuCheck size={13} aria-label="Save" />
        </span>
        <span className="grid size-7 place-items-center rounded-full border border-[#E7E6E1] text-[#6B6A64]">
          <LuX size={13} aria-label="Pass" />
        </span>
      </div>
    </li>
  );
}

/** The inbox's little building drawings: brick, stone or glass. */
function BuildingTile({ kind }: { kind: Place["tile"] }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-10 place-items-end overflow-hidden rounded-[9px] bg-[#F0EFEB]"
    >
      {kind === "brick" && (
        <svg width="30" height="34" viewBox="0 0 34 38">
          <rect fill="#A0634A" x="2" y="10" width="30" height="28" rx="1" />
          <g fill="#3A3A36">
            <rect x="6" y="14" width="4" height="6" />
            <rect x="13" y="14" width="4" height="6" />
            <rect x="20" y="14" width="4" height="6" />
            <rect x="6" y="24" width="4" height="6" />
            <rect x="13" y="24" width="4" height="6" />
            <rect x="20" y="24" width="4" height="6" />
          </g>
        </svg>
      )}
      {kind === "stone" && (
        <svg width="30" height="34" viewBox="0 0 34 38">
          <rect fill="#D9CDB4" x="3" y="4" width="28" height="34" rx="1" />
          <g fill="#3A3A36">
            <rect x="7" y="9" width="5" height="5" />
            <rect x="15" y="9" width="5" height="5" />
            <rect x="23" y="9" width="5" height="5" />
            <rect x="7" y="18" width="5" height="5" />
            <rect x="15" y="18" width="5" height="5" />
            <rect x="23" y="18" width="5" height="5" />
            <rect x="14" y="28" width="7" height="10" />
          </g>
        </svg>
      )}
      {kind === "glass" && (
        <svg width="30" height="36" viewBox="0 0 34 40">
          <rect fill="#B4BEC6" x="6" y="2" width="22" height="38" rx="1" />
          <g fill="#3A3A36" opacity=".55">
            <rect x="6" y="9" width="22" height="1.2" />
            <rect x="6" y="16" width="22" height="1.2" />
            <rect x="6" y="23" width="22" height="1.2" />
            <rect x="6" y="30" width="22" height="1.2" />
            <rect x="16.4" y="2" width="1.2" height="38" />
          </g>
        </svg>
      )}
    </span>
  );
}

type City = {
  w: number;
  h: number;
  towers: { x: number; y: number; w: number; h: number }[];
  wins: { x: number; y: number; glow: number }[];
};

// Fred's colors for the skyline: towers in its border gray, unlit windows in
// its muted text at 22%, lit ones in the mark's yellow.
const TOWER = "#E7E6E1";
const UNLIT = "#6B6A64";
const LIT = "#FFDD55";

/**
 * A skyline whose windows light up as Fred looks: the mark's lit panes, as a
 * city. When Fred's done, the lights hold where they were. Ported from the
 * app with its window sizes, fade and rate.
 */
function Skyline({ labels, live }: { labels: string[]; live: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const city = useRef<City | null>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const moving = live && !reducedMotion();
    const W = 3, H = 4, GX = 3, GY = 4, PAD = 4, GAP = 5; // window size, the gaps between them, tower padding, street width
    let raf = 0;
    let last = 0;

    const layout = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (city.current?.w === w && city.current.h === h) return;
      const dpr = window.devicePixelRatio || 1;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const towers: City["towers"] = [];
      const wins: City["wins"] = [];
      const most = Math.floor((h - PAD * 2 + GY) / (H + GY));
      for (let x = GAP; ; ) {
        const cols = 2 + Math.floor(Math.random() * 4);
        const rows = Math.max(3, Math.round(most * (0.35 + Math.random() * 0.65)));
        const tw = PAD * 2 + cols * (W + GX) - GX;
        const th = PAD * 2 + rows * (H + GY) - GY;
        if (x + tw > w - GAP) break;
        towers.push({ x, y: h - th, w: tw, h: th });
        // A still city has some lights on, some brighter than others.
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++)
            wins.push({
              x: x + PAD + c * (W + GX),
              y: h - th + PAD + r * (H + GY),
              glow: Math.random() < 0.12 ? 0.35 + Math.random() * 0.65 : 0,
            });
        x += tw + GAP;
      }
      city.current = { w, h, towers, wins };
    };

    const draw = () => {
      if (!city.current) return;
      const { w, h, towers, wins } = city.current;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = TOWER;
      for (const t of towers) ctx.fillRect(t.x, t.y, t.w, t.h);
      for (const win of wins) {
        ctx.globalAlpha = 0.22;
        ctx.fillStyle = UNLIT;
        ctx.fillRect(win.x, win.y, W, H);
        if (win.glow > 0.02) {
          ctx.globalAlpha = win.glow;
          ctx.fillStyle = LIT;
          ctx.fillRect(win.x, win.y, W, H);
        }
      }
      ctx.globalAlpha = 1;
    };

    // Each frame, lit windows fade (half-life a little over a second) and
    // new ones light up, about 50 a second.
    const frame = (t: number) => {
      const wins = city.current?.wins ?? [];
      const dt = last ? Math.min(t - last, 100) : 16;
      last = t;
      const fade = 0.5 ** (dt / 1200);
      for (const win of wins) win.glow *= fade;
      for (let k = Math.floor(dt / 20 + Math.random()); k > 0 && wins.length; k--)
        wins[Math.floor(Math.random() * wins.length)].glow = 1;
      draw();
      raf = requestAnimationFrame(frame);
    };

    layout();
    if (moving) {
      for (const win of city.current?.wins ?? []) win.glow = 0;
      raf = requestAnimationFrame(frame);
    } else draw();
    const resized = new ResizeObserver(() => {
      layout();
      if (!moving) draw();
    });
    resized.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      resized.disconnect();
    };
  }, [live]);

  // One label at a time, somewhere over the skyline, while Fred works.
  const [chip, setChip] = useState<{ n: number; x: number; y: number } | null>(
    null,
  );
  const key = labels.join("|");
  useEffect(() => {
    if (!labels.length) return setChip(null);
    const next = () =>
      setChip((c) => ({
        n: (c?.n ?? -1) + 1,
        x: 6 + Math.random() * 40,
        y: 12 + Math.random() * 46,
      }));
    const first = setTimeout(next, 300);
    const every = setInterval(next, 1800);
    return () => {
      clearTimeout(first);
      clearInterval(every);
    };
    // The labels change only when the step does.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const text = live && chip && labels.length ? labels[chip.n % labels.length] : null;

  return (
    <div className="relative mt-2.5 h-[92px]">
      <canvas
        ref={canvas}
        aria-hidden="true"
        className="absolute inset-0 block size-full"
      />
      {text && chip && (
        <span
          key={chip.n}
          className="fred-chip absolute whitespace-nowrap rounded-full border border-[#E7E6E1] bg-white px-2 py-0.5 text-[12px] font-medium shadow-sm"
          style={{ left: `${chip.x}%`, top: `${chip.y}%` }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
