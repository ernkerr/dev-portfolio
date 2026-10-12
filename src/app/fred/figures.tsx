"use client";

import { Archivo, Young_Serif } from "next/font/google";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LuCheck, LuChevronRight, LuPencil, LuX } from "react-icons/lu";
import { focusRing } from "@/components/site/links";
import { Caption, label } from "@/components/site/prose";

// Figures for the Fred case study. The chart and frames are the portfolio's;
// the pieces of Fred inside them (the mark, the thinking line, the chips and
// the memory notes) are rebuilt from Fred's code (fred-and-ginger, web/,
// October 2026) in Fred's own colors, sizes and type, not the portfolio's.
// Fred's palette: ink #141413, muted text #6B6A64, borders #E7E6E1, muted
// fills #F0EFEB, the chat #FBFBF9, the sidebar #F5F5F2, and the yellow
// #FFDD55, which only lights up while Fred works.

const youngSerif = Young_Serif({ weight: "400", subsets: ["latin"], display: "swap" });
const archivo = Archivo({ weight: "800", subsets: ["latin"], display: "swap" });

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Runs `fn` once, the first time `ref` scrolls into view. */
function useOnView(ref: React.RefObject<HTMLElement | null>, fn: () => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          seen.disconnect();
          fn();
        }
      },
      { threshold: 0.5 },
    );
    seen.observe(el);
    return () => seen.disconnect();
    // Once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** A live figure: a label and an optional control above a framed field. */
function Stage({
  name,
  control,
  bg = "bg-[#F5F5F2]",
  caption,
  children,
}: {
  name: string;
  control?: ReactNode;
  bg?: string;
  caption?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure>
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className={label}>{name}</p>
        {control}
      </div>
      <div className={`border border-site-line ${bg} px-5 py-6 md:px-8 md:py-8`}>
        {children}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

const control = `font-mono text-label uppercase text-site-muted transition-colors hover:text-site-blue ${focusRing}`;

// ---------------------------------------------------------------- the mark

/**
 * Fred's mark: a portrait window, a box with a cross, drawn in a 20 × 26 box
 * with a 1.25 line. While Fred works, its panes light up in turn
 * (.fred-working in globals.css).
 */
export function FredMark({
  working = false,
  className = "",
}: {
  working?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 26"
      aria-hidden="true"
      className={`${working ? "fred-working " : ""}${className}`}
    >
      <rect className="fred-pane" x="2.5" y="2.5" width="6.5" height="9.5" />
      <rect className="fred-pane fred-pane-2" x="11" y="2.5" width="6.5" height="9.5" />
      <rect className="fred-pane fred-pane-3" x="2.5" y="14" width="6.5" height="9.5" />
      <rect className="fred-pane fred-pane-4" x="11" y="14" width="6.5" height="9.5" />
      <rect x="1.5" y="1.5" width="17" height="23" rx="2" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10 1.5v23M1.5 13h17" stroke="currentColor" strokeWidth="1.25" fill="none" />
    </svg>
  );
}

export function MarkDemo() {
  const [working, setWorking] = useState(true);
  return (
    <Stage
      name="The mark · live"
      control={
        <button
          type="button"
          aria-pressed={working}
          onClick={() => setWorking(!working)}
          className={control}
        >
          {working ? "Fred is working" : "Fred is idle"}
        </button>
      }
      caption="The panes light in a circle, top left, top right, bottom right, bottom left, 0.6 seconds apart. In the sidebar the mark sits still next to Fred’s name."
    >
      <div className="grid items-center gap-8 text-[#141413] sm:grid-cols-[auto_1fr] sm:gap-14">
        <FredMark working={working} className="w-24 justify-self-center sm:w-32" />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className={label}>Sidebar · 20 × 26</p>
            <span className="inline-flex items-center gap-2.5 self-start rounded-[10px] border border-[#E7E6E1] bg-white px-3.5 py-2.5 text-[17px] font-semibold tracking-tight">
              <FredMark className="h-[26px] w-5" />
              Fred
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p className={label}>In the chat · 13 × 17</p>
            <LiveLine working={working} text={working ? "Watching for new places…" : "Checked 412 listings · 3 steps"} />
          </div>
        </div>
      </div>
    </Stage>
  );
}

/** Fred's status line in the chat: the small mark and what Fred's doing. */
function LiveLine({ working, text }: { working: boolean; text: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[14px] text-[#6B6A64]">
      <FredMark working={working} className="h-[17px] w-[13px] shrink-0 text-[#141413]" />
      <span className={working ? "fred-shimmer" : undefined}>{text}</span>
    </span>
  );
}

// ---------------------------------------------------------- the thinking

const bubble =
  "max-w-[86%] self-end rounded-2xl border border-[#E7E6E1] bg-white px-3.5 py-2.5 text-[14.5px] text-[#141413]";
const pane =
  "flex min-h-[17rem] flex-col gap-3 rounded-xl border border-[#E7E6E1] bg-[#FBFBF9] p-4 text-[#141413]";

/** The first version's work log next to the one line that shipped. */
export function Thinking() {
  // 0: reading a listing, 1: reading the full page, 2: done. Opens done.
  const [phase, setPhase] = useState(2);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const box = useRef<HTMLDivElement>(null);

  function run() {
    timers.current.forEach(clearTimeout);
    if (reducedMotion()) return setPhase(2);
    setPhase(0);
    timers.current = [
      setTimeout(() => setPhase(1), 1700),
      setTimeout(() => setPhase(2), 3800),
    ];
  }
  useOnView(box, run);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <Stage
      name="Fred’s thinking · before and after"
      control={
        <button type="button" onClick={run} className={control}>
          Replay
        </button>
      }
      caption="Left, the work log from my first version. Right, what shipped: one line while Fred works, folded into a summary when it’s done, and answers to tap."
    >
      <div ref={box} className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className={label}>First version</p>
          <div className={pane}>
            <p className={bubble}>Does 292 Nassau take dogs?</p>
            <div className="flex flex-col gap-2 rounded-[10px] border border-[#E7E6E1] bg-white px-3.5 py-3 text-[13.5px] text-[#6B6A64]">
              <p className="text-[14px] font-semibold text-[#141413]">
                Checked 212 new listings since 7:00 AM
              </p>
              <ul className="flex flex-col gap-1.5">
                {[
                  "Merged 31 duplicates across sites",
                  "Skipped 2 likely scams. Both wanted a Zelle deposit before a showing.",
                  "Checked pet policy and laundry on 14",
                ].map((t) => (
                  <li key={t} className="grid grid-cols-[14px_1fr] items-start gap-2">
                    <LuCheck size={12} strokeWidth={2.5} aria-hidden="true" className="mt-1 text-[#2E9E5B]" />
                    <span>{t}</span>
                  </li>
                ))}
                <li className="grid grid-cols-[14px_1fr] items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-1 size-[11px] animate-spin rounded-full border-[1.5px] border-[#E7E6E1] border-t-[#141413] motion-reduce:animate-none"
                  />
                  <span className="fred-shimmer">Asking 2 landlords about dogs…</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className={label}>What shipped</p>
          <div className={pane} aria-live="polite">
            <p className={bubble}>Does 292 Nassau take dogs?</p>
            {phase < 2 ? (
              <LiveLine
                working
                text={phase === 0 ? "Reading a listing" : "Reading the full listing page"}
              />
            ) : (
              <>
                <span className="inline-flex items-center gap-2 text-[14px] text-[#6B6A64]">
                  <FredMark className="h-[17px] w-[13px] shrink-0 text-[#141413]" />
                  <span className="font-medium text-[#141413]">2 steps</span>
                  <LuChevronRight size={13} aria-hidden="true" />
                </span>
                <p className="text-[15px] leading-relaxed">
                  The listing says pets are case by case, so I’d ask before you
                  tour. Want me to write to the agent?
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Yes, ask them", "Not now"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#E7E6E1] bg-white px-3 py-1.5 text-[13.5px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Stage>
  );
}

// ------------------------------------------------------------ the research

const COMPLAINTS: { name: string; pct: number; key?: boolean }[] = [
  { name: "App bugs, crashes and login", pct: 26 },
  { name: "Scams or fake listings", pct: 12, key: true },
  { name: "Search ignores my criteria", pct: 11, key: true },
  { name: "Paywalls and billing", pct: 10 },
  { name: "Touring and scheduling", pct: 6 },
  { name: "Landlords never respond", pct: 5 },
  { name: "Stale or already rented", pct: 3 },
  { name: "Alerts arrive too slowly", pct: 0.5, key: true },
];

/** What the one and two star reviews were about, as bars to scale. */
export function Complaints() {
  const max = COMPLAINTS[0].pct;
  return (
    <figure>
      <div className="border-t border-site-line pt-5">
        <p className={label}>What 4,190 one and two star reviews were about</p>
        <ul className="mt-5 flex flex-col gap-3">
          {COMPLAINTS.map((c) => (
            <li
              key={c.name}
              className="grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-x-4 gap-y-1.5 text-body-sm sm:grid-cols-[14rem_minmax(0,1fr)_3rem]"
            >
              <span className={c.key ? "text-site-ink" : "text-site-ink/75"}>
                {c.name}
              </span>
              <span className="col-span-2 row-start-2 h-2 bg-site-line/60 sm:col-span-1 sm:row-start-auto">
                <span
                  className={`block h-full ${c.key ? "bg-site-ink" : "bg-site-muted/50"}`}
                  style={{ width: `${(c.pct / max) * 100}%` }}
                />
              </span>
              <span className="text-right font-mono text-date tabular-nums text-site-ink sm:col-start-3 sm:row-start-1">
                {c.pct}%
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Caption>
        The share of 1 and 2 star reviews that mention each problem, from 8,205
        reviews of 31 rental, roommate and touring apps. I tagged them by
        keyword and spot-checked the tags by hand.
      </Caption>
    </figure>
  );
}

// ---------------------------------------------------------- the directions

type Direction = {
  letter: string;
  name: string;
  idea: string;
  voice: string;
  kept: string;
  left: string;
  bg: string;
  fg: string;
  soft: string;
  swatches: string[];
  mark: ReactNode;
  font: string;
};

// The three directions from the first day's mockups, in their own colors.
const DIRECTIONS: Direction[] = [
  {
    letter: "A",
    name: "Doorman",
    idea: "Fred is the doorman who knows every building: a warm character with a serif, deep green and brass.",
    voice: "Morning. One of these is worth getting up early for.",
    kept: "“Why this one” on every listing",
    left: "The serif and brass, and a doorman works for the building, not for you",
    bg: "#F2F4F1",
    fg: "#13221C",
    soft: "#E6EBE5",
    swatches: ["#1F4D3D", "#C59A45", "#E6EBE5"],
    font: youngSerif.className,
    mark: (
      <span
        className={`${youngSerif.className} rounded-[5px] px-2.5 pb-1 pt-1.5 text-[12px] leading-none tracking-[0.16em] text-[#2A1E08]`}
        style={{ background: "linear-gradient(160deg, #E7C978, #C1913A 55%, #A87A2C)" }}
      >
        FRED
      </span>
    ),
  },
  {
    letter: "B",
    name: "Express",
    idea: "Fred talks like a good subway announcement: a clipped voice, signage type and an orange F.",
    voice: "1 strong match. Listed 18 min ago. Tour it tomorrow.",
    kept: "The short, plain voice",
    left: "The orange F, and it sold speed, which renters didn’t ask for",
    bg: "#FFFFFF",
    fg: "#0C0C0D",
    soft: "#F0F0EE",
    swatches: ["#0C0C0D", "#EF5A1F", "#F0F0EE"],
    font: archivo.className,
    mark: (
      <span
        className={`${archivo.className} grid size-[26px] place-items-center rounded-full bg-[#EF5A1F] text-[15px] leading-none text-white`}
      >
        F
      </span>
    ),
  },
  {
    letter: "C",
    name: "Markup",
    idea: "Fred is just a name, and a highlighter marks the fine print for you.",
    voice: "Fred found 1 strong match among 212 new listings.",
    kept: "The restraint, and Geist",
    left: "The highlighter, which got busy fast",
    bg: "#F4F5F7",
    fg: "#14161B",
    soft: "#EBEDF1",
    swatches: ["#14161B", "#FFE14D", "#EBEDF1"],
    font: "font-sans font-semibold tracking-tight",
    mark: (
      <span className="rounded-[2px] bg-[#FFE14D] px-1.5 py-0.5 text-[16px] font-semibold leading-none tracking-tight text-[#14161B]">
        fred
      </span>
    ),
  },
];

export function Directions() {
  return (
    <figure>
      <ul className="grid gap-4 md:grid-cols-3">
        {DIRECTIONS.map((d) => (
          <li
            key={d.name}
            className="flex flex-col gap-4 border border-site-line p-5"
            style={{ background: d.bg, color: d.fg }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-label uppercase opacity-60">
                Direction {d.letter}
              </span>
              <span aria-hidden="true">{d.mark}</span>
            </div>
            <p className={`${d.font} text-[22px] leading-tight ${d.letter === "B" ? "uppercase" : ""}`}>
              {d.name}
            </p>
            <p className="text-body-sm opacity-80">{d.idea}</p>
            <p
              className={`${d.font} px-3.5 py-3 text-[16px] leading-snug`}
              style={{ background: d.soft }}
            >
              {d.voice}
            </p>
            <div className="flex gap-1.5" aria-hidden="true">
              {d.swatches.map((c) => (
                <span
                  key={c}
                  className="size-7 border"
                  style={{ background: c, borderColor: d.soft }}
                />
              ))}
            </div>
            <dl className="mt-auto flex flex-col gap-1.5 border-t pt-3 text-caption" style={{ borderColor: d.soft }}>
              <div>
                <dt className="inline font-medium">Kept: </dt>
                <dd className="inline">{d.kept}</dd>
              </div>
              <div>
                <dt className="inline font-medium">Left: </dt>
                <dd className="inline">{d.left}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <Caption>
        Each direction answered the same question: is Fred a character? The
        listing, numbers and screen were the same in all three, so only the
        system changed.
      </Caption>
    </figure>
  );
}

// -------------------------------------------------------------- the profile

type Weight = "nice" | "important" | "must";
const NEXT: Record<Weight, Weight> = { nice: "important", important: "must", must: "nice" };
const NAME: Record<Weight, string> = { nice: "", important: "important", must: "dealbreaker" };
const TAP: Record<Weight, string> = {
  nice: "Tap to mark it important",
  important: "Tap to make it a dealbreaker",
  must: "Tap to make it nice to have",
};
const WEIGHT_CLASS: Record<Weight, string> = {
  nice: "border-[#E7E6E1] bg-white",
  important: "border-[#141413] bg-white font-medium",
  must: "border-[#141413] bg-[#141413] font-medium text-white",
};

/** Profile's nice-to-haves: tap once for important, twice for a dealbreaker. */
export function NiceToHaves() {
  const [chips, setChips] = useState<{ name: string; weight: Weight }[]>([
    { name: "Washer/dryer in unit", weight: "important" },
    { name: "Lots of natural light", weight: "nice" },
    { name: "Elevator", weight: "must" },
  ]);
  return (
    <Stage name="Nice-to-haves · tap one" bg="bg-white">
      <div className="flex flex-col gap-3 text-[#141413]">
        <p className="text-[13px] text-[#6B6A64]">
          <span className="font-medium text-[#141413]">Nice to have</span> · Tap
          once for important, twice for a dealbreaker
        </p>
        <ul className="flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <li key={c.name}>
              <button
                type="button"
                title={TAP[c.weight]}
                onClick={() =>
                  setChips(chips.map((x, j) => (j === i ? { ...x, weight: NEXT[x.weight] } : x)))
                }
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[13px] transition-colors ${WEIGHT_CLASS[c.weight]} ${focusRing}`}
              >
                {c.name}
                {NAME[c.weight] && <span className="opacity-70"> · {NAME[c.weight]}</span>}
                <LuX size={12} aria-hidden="true" className="opacity-60" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}

const NOTES = [
  { kind: "Needs", text: "Two baths ideally, one is OK" },
  { kind: "Dislikes", text: "Walk-ups above the 3rd floor", guess: true },
  { kind: "Timing", text: "Moving by December 1" },
];

/** What Fred remembers, with example notes. */
export function MemoryNotes() {
  return (
    <Stage name="What Fred remembers · example notes" bg="bg-white">
      <div className="flex flex-col gap-4 text-[#141413]">
        <div>
          <p className="text-[16px] font-semibold tracking-tight">What Fred remembers</p>
          <p className="text-[13px] text-[#6B6A64]">
            Notes Fred keeps from your chats and uses in every search. Fix or
            delete anything that’s wrong.
          </p>
        </div>
        {NOTES.map((n) => (
          <div key={n.text} className="flex flex-col gap-1.5">
            <p className="text-[12.5px] font-semibold text-[#6B6A64]">{n.kind}</p>
            <p className="flex items-center gap-3 rounded-[10px] border border-[#E7E6E1] px-3 py-2 text-[14.5px]">
              <span>
                {n.text}
                {n.guess && <span className="text-[#6B6A64]"> · Fred’s guess</span>}
              </span>
              <span className="ml-auto flex gap-2.5 text-[#6B6A64]" aria-hidden="true">
                <LuPencil size={13} strokeWidth={1.5} />
                <LuX size={13} strokeWidth={1.5} />
              </span>
            </p>
          </div>
        ))}
      </div>
    </Stage>
  );
}

// --------------------------------------------------------------- the tokens

/** A color swatch with its hex value, for the token table. */
export function Swatch({ hex }: { hex: string }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-date">
      <span
        aria-hidden="true"
        className="inline-block size-3.5 border border-site-line"
        style={{ background: hex }}
      />
      {hex}
    </span>
  );
}
