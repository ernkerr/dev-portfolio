"use client";

import Image from "next/image";
import { useRef, type KeyboardEvent, type ReactNode } from "react";
import Shine from "@/components/Shine";
import { PolkaDots } from "@/components/ui/PolkaDots";
import { focusRing, mono, serif } from "@/components/site/links";
import { Caption, Code, Figure, label } from "@/components/site/prose";

// Pieces for the OrderSync design write-up while it's still a draft. Every
// section carries up to four versions from
// career-ops/output/ordersync-case-study-master.md, with tabs to switch
// between them, so Erin can compare them in the real layout before picking.
// Each section opens on a recommended version. E is the research-led rewrite
// from ./new, split to match these sections.
// ◆ marks suggested reasoning to keep or cut; [brackets] mark fill-ins.

export type V = "A" | "B" | "C" | "D" | "E";

export const VERSIONS: { id: V; name: string; about: string }[] = [
  {
    id: "A",
    name: "Repo numbers",
    about: "Rachel Chen-style structure, heavy on real numbers from the repo.",
  },
  {
    id: "B",
    name: "Design-coded",
    about: "Brand attributes, design principles, and the navy/metal rationale.",
  },
  {
    id: "C",
    name: "Your voice",
    about:
      "Story-first, written to voice-dna.md, engineering kept to about 10%.",
  },
  {
    id: "D",
    name: "Inspired",
    about:
      "Your voice, with patterns from Nicole Roberts (Walmart), Jessica Goldman (Therabody) and Bethany Heck (Tumblr).",
  },
  {
    id: "E",
    name: "Research-led",
    about:
      "Research first, every number checked, with the landscape, mood board, process files and a live hero. In its own order at /orderSync/new.",
  },
];

export type Versions = Partial<Record<V, ReactNode>>;

/** What the page shows: one version everywhere, or each section's pick. */
export type Mode = V | "rec";

/** The version recommended for a section, why, and what it still needs. */
export type Rec = { v: V; why: string; fix?: string };

/** The version a section shows: the one asked for, or its first if missing. */
export function versionFor(versions: Versions, want: V): V {
  if (versions[want] !== undefined) return want;
  return VERSIONS.find((v) => versions[v.id] !== undefined)?.id ?? want;
}

/* ---------- Choosing versions ---------- */

export function DraftKey({
  all,
  onPickAll,
}: {
  all: Mode;
  onPickAll: (m: Mode) => void;
}) {
  const options: { id: Mode; text: string; name: string }[] = [
    { id: "rec", text: "Recommended", name: "The recommended version of each section" },
    ...VERSIONS.map((v) => ({
      id: v.id,
      text: v.id,
      name: `Version ${v.id}, ${v.name}`,
    })),
  ];
  return (
    <div className="border border-site-line p-5 md:p-6">
      <p className={label}>Draft: pick a version</p>
      <p className="mt-3 max-w-measure text-body-sm text-site-ink/80">
        Each section opens on the version I recommend, picked with your
        research, and says why under its tabs. The tabs switch just that
        section.
      </p>
      <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {VERSIONS.map((v) => (
          <div key={v.id}>
            <dt className="text-body-sm text-site-ink">
              <span className={mono}>{v.id}</span> · {v.name}
            </dt>
            <dd className="mt-1 text-caption text-site-muted">{v.about}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-site-line pt-5">
        <span className={label}>Show every section in</span>
        <div className="flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={all === o.id}
              aria-label={o.name}
              onClick={() => onPickAll(o.id)}
              className={`${mono} h-9 border px-3 text-nav uppercase transition-colors ${
                all === o.id
                  ? "border-site-ink bg-site-ink text-site-paper"
                  : "border-site-line text-site-ink hover:border-site-ink"
              } ${focusRing}`}
            >
              {o.text}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-5 max-w-measure text-caption text-site-muted">
        <Why /> Suggested reasoning: keep only what matches how you actually
        thought about it. <Fill>Brackets</Fill> mark something to fill in.
      </p>
    </div>
  );
}

/** A section's version tabs and the version being shown. */
export function VersionTabs({
  id,
  title,
  versions,
  want,
  onPick,
  rec,
}: {
  id: string;
  title: string;
  versions: Versions;
  want: V;
  onPick: (v: V) => void;
  /** The version recommended for this section, and why. */
  rec?: Rec;
}) {
  const available = VERSIONS.filter((v) => versions[v.id] !== undefined);
  const missing = VERSIONS.filter((v) => versions[v.id] === undefined);
  const current = versionFor(versions, want);
  const tabs = useRef<Partial<Record<V, HTMLButtonElement | null>>>({});

  // Arrow keys move along the tabs, as in any tab list.
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = available.findIndex((v) => v.id === current);
    const last = available.length - 1;
    const next = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const v = available[next].id;
    onPick(v);
    tabs.current[v]?.focus();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div
          role="tablist"
          aria-label={`${title} versions`}
          onKeyDown={onKeyDown}
          className="flex flex-wrap gap-x-6 gap-y-1 border-b border-site-line"
        >
          {available.map((v) => {
            const selected = v.id === current;
            return (
              <button
                key={v.id}
                ref={(el) => {
                  tabs.current[v.id] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${v.id}`}
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => onPick(v.id)}
                className={`${mono} -mb-px border-b-2 pb-2 pt-1 text-[12px] uppercase tracking-[0.06em] transition-colors ${
                  selected
                    ? "border-site-ink text-site-ink"
                    : "border-transparent text-site-muted hover:text-site-ink"
                } ${focusRing}`}
              >
                {v.id} · {v.name}
                {rec?.v === v.id && " · Recommended"}
              </button>
            );
          })}
        </div>
        {rec && (
          <p className="max-w-measure text-caption text-site-muted">
            <span className="text-site-ink">Recommended: {rec.v}.</span>{" "}
            {rec.why}
            {rec.fix && <> Fix: {rec.fix}</>}
          </p>
        )}
        {missing.length > 0 && (
          <p className="text-[13px] text-site-muted">
            {want !== current && <>No {want} version of this section. </>}
            {missing.length === 1 ? "Version " : "Versions "}
            {missing.map((v) => v.id).join(" and ")}{" "}
            {missing.length === 1 ? "doesn’t" : "don’t"} have one.
          </p>
        )}
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${current}`}
        className="flex flex-col gap-6"
      >
        {versions[current]}
      </div>
    </div>
  );
}

/* ---------- Draft marks ---------- */

/** ◆: suggested reasoning, to keep only if it's true. */
export function Why() {
  return (
    <span
      role="img"
      aria-label="Suggested reasoning:"
      title="Suggested reasoning. Keep it only if it matches how you actually thought about it."
      className="text-[0.8em] text-site-blue"
    >
      ◆
    </span>
  );
}

/** [Brackets]: something still to fill in. */
export function Fill({ children }: { children: ReactNode }) {
  return (
    <span className="bg-site-blue/10 px-1 text-site-blue">[{children}]</span>
  );
}

/** Which case study pattern a version borrows. */
export function Pattern({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[40rem] text-[13px] leading-relaxed text-site-muted">
      <span className={`${mono} mr-2 uppercase tracking-[0.06em]`}>
        Pattern
      </span>
      {children}
    </p>
  );
}

/** An editor's note on the draft, not part of the write-up. */
export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[40rem] border-l-2 border-site-line pl-4 text-[14px] leading-relaxed text-site-muted">
      {children}
    </p>
  );
}

/* ---------- Text ---------- */

/** A version's one-line point, set like a section headline. */
export function Headline({ children }: { children: ReactNode }) {
  return (
    <p
      className={`${serif} max-w-[40rem] text-[30px] leading-[1.12] tracking-[-0.015em] text-site-ink md:text-[40px]`}
    >
      {children}
    </p>
  );
}

/** A small mono heading for a part of a section. */
export function Subhead({ children }: { children: ReactNode }) {
  return <h3 className={`${label} mt-4`}>{children}</h3>;
}

export function Persona({
  name,
  source,
  items,
}: {
  name: string;
  source: string;
  items: { label: string; value: ReactNode }[];
}) {
  return (
    <div className="border border-site-line p-5 md:p-6">
      <p className={label}>{source}</p>
      <p className={`${serif} mt-2 text-[26px] leading-snug text-site-ink`}>
        {name}
      </p>
      <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label}>
            <dt className={label}>{item.label}</dt>
            <dd className="mt-1 text-[15px] leading-[1.6] text-site-ink/80">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** A decision card: what changed, why, and what it did. */
export function Change({
  n,
  title,
  items,
  children,
}: {
  n: number;
  title: string;
  items: { label: string; value: ReactNode }[];
  children?: ReactNode;
}) {
  return (
    <div className="grid gap-4 border-t border-site-line pt-6 md:grid-cols-[12rem_1fr] md:gap-8">
      <div>
        <span className={`${mono} text-[12px] text-site-muted`}>
          Change {n}
        </span>
        <h3 className={`${serif} mt-1 text-[22px] leading-snug text-site-ink`}>
          {title}
        </h3>
      </div>
      <div className="flex min-w-0 flex-col gap-5">
        <dl className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.label}>
              <dt className={label}>{item.label}</dt>
              <dd className="mt-1 max-w-[40rem] text-[16px] leading-[1.7] text-site-ink/80">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
        {children}
      </div>
    </div>
  );
}

/* ---------- Figures ---------- */

/** A figure that isn't made yet: says what goes here. */
export function FigureSlot({
  n,
  children,
  caption,
}: {
  n?: number;
  children: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <figure>
      <div className="flex min-h-36 flex-col justify-center border border-dashed border-site-muted/50 px-5 py-6">
        <p className={`${label} flex items-center gap-2`}>
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-site-blue"
          />
          Figure to add{n ? ` · Fig ${n}` : ""}
        </p>
        <p className="mt-2 max-w-[40rem] text-[15px] leading-[1.65] text-site-ink/75">
          {children}
        </p>
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

const IMG = "/images/orderSync";

// The first screen of each page, cut from the full-page captures (2× scale).
export const SHOTS = {
  heroLight: {
    src: `${IMG}/after-hero.png`,
    alt: "The new OrderSync homepage in light mode: “One System for All Your Orders” in navy and silver gray, a navy Book My Free Intro Call button, and a dark diagram of PDF, email, EDI and CSV flowing through OrderSync into an ERP.",
  },
  heroDark: {
    src: `${IMG}/after-hero-dark.png`,
    alt: "The same homepage in dark mode: white and gray headline on navy, a white Book My Free Intro Call button, and the same diagram.",
  },
  oldHero: {
    src: `${IMG}/before-hero.png`,
    alt: "The old OrderSync homepage: a centered headline with “All Your Orders” in a purple-to-blue gradient, glowing purple and cyan orbs behind it, a gradient Book a free intro call button, and a filled black Sign In button in the header.",
  },
  landing: {
    src: `${IMG}/after-landing-top.png`,
    alt: "A new landing page: “Stop Rekeying. AI Order Automation Handles Your Orders.” in navy and gray, with one navy Book My 15-Min Intro Call button.",
  },
  tool: {
    src: `${IMG}/after-tool-top.png`,
    alt: "The new EDI Inspector page: “Free EDI Inspector,” Inspector and Compare tabs, a green note that data never leaves the browser, and an upload area.",
  },
};

type Shot = { src: string; alt: string };

/** One or more first-screen screenshots, two across. */
export function Shots({
  items,
  caption,
}: {
  items: (Shot & { label?: string })[];
  caption?: ReactNode;
}) {
  if (items.length === 1) {
    const [s] = items;
    return (
      <Figure
        src={s.src}
        alt={s.alt}
        width={2880}
        height={1800}
        caption={caption}
      />
    );
  }
  return (
    <figure>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((s) => (
          <div key={s.src}>
            {s.label && <p className={`${label} mb-2`}>{s.label}</p>}
            <Image
              src={s.src}
              alt={s.alt}
              width={2880}
              height={1800}
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full border border-site-line"
            />
          </div>
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

// The header's right side, before and after, at the same scale.
export function HeaderCompare({ caption }: { caption?: ReactNode }) {
  return (
    <figure>
      <div className="flex flex-col gap-5">
        <div>
          <p className={`${label} mb-2`}>Before</p>
          <Image
            src={`${IMG}/header-before.png`}
            alt="The old header: Features, EDI Inspector, Blog and Get Started, then a filled black Sign In button."
            width={1740}
            height={160}
            sizes="(min-width: 1024px) 800px, 90vw"
            className="h-auto border border-site-line"
            style={{ width: `${(1740 / 1960) * 100}%` }}
          />
        </div>
        <div>
          <p className={`${label} mb-2`}>After</p>
          <Image
            src={`${IMG}/header-after.png`}
            alt="The new header: Features, Free Tools, Resources and Book a Call, then a plain Sign In link and a chrome Book a Call pill."
            width={1960}
            height={106}
            sizes="(min-width: 1024px) 896px, 100vw"
            className="h-auto w-full border border-site-line"
          />
        </div>
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

// The names the brand navies went by in the code, from the drafts.
const OLD_NAMES = [
  { hex: "#0E172B", names: ["black", "--navy", "primary"] },
  { hex: "#151F34", names: ["--navy-bg"] },
  { hex: "#1C274C", names: ["dark"] },
];

export function NameMap() {
  return (
    <figure>
      <ul className="border-b border-site-line">
        {OLD_NAMES.map((row) => (
          <li
            key={row.hex}
            className="grid grid-cols-[minmax(0,1fr)_1.5rem_8rem] items-center gap-x-4 border-t border-site-line py-4 sm:grid-cols-[minmax(0,1fr)_2rem_10rem]"
          >
            <span className="flex flex-wrap gap-2">
              {row.names.map((n) => (
                <span
                  key={n}
                  className="border border-site-line px-2 py-0.5 text-site-ink"
                >
                  <Code>{n}</Code>
                </span>
              ))}
            </span>
            <span aria-hidden="true" className="text-site-muted">
              →
            </span>
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-8 w-8 shrink-0 border border-site-line"
                style={{ background: row.hex }}
              />
              <Code>{row.hex}</Code>
            </span>
          </li>
        ))}
      </ul>
      <Caption>
        The names in the old code, and the three navies they pointed to.
      </Caption>
    </figure>
  );
}

export type Swatch = {
  name: string;
  value: string;
  fill: string;
  use: ReactNode;
};

export function Swatches({ items }: { items: Swatch[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
      {items.map((s) => (
        <li key={s.name}>
          <div
            aria-hidden="true"
            className="h-20 border border-site-line"
            style={{ background: s.fill }}
          />
          <p className={`${serif} mt-3 text-[19px] leading-snug text-site-ink`}>
            {s.name}
          </p>
          <p className={`${mono} text-[12px] text-site-muted`}>{s.value}</p>
          <p className="mt-1 text-[14px] leading-snug text-site-ink/75">
            {s.use}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** A small color chip for a table cell. */
export function Chip({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="mr-2 inline-block h-3.5 w-3.5 border border-site-line align-[-2px]"
      style={{ background: color }}
    />
  );
}

// From the drafts' rollout list: one PR per slice.
const SLICES: [string, number][] = [
  ["Foundation", 22],
  ["Shared chrome", 32],
  ["Homepage and landing", 54],
  ["Site pages", 53],
  ["Blog", 18],
  ["EDI tools", 19],
  ["Admin, sign-in, account and billing", 32],
  ["Audit tooling", 7],
];

export function Slices() {
  const most = Math.max(...SLICES.map(([, files]) => files));
  return (
    <figure>
      <ol className="border-b border-site-line">
        {SLICES.map(([name, files], i) => (
          <li
            key={name}
            className="grid grid-cols-[2rem_minmax(0,1fr)_4.5rem] items-center gap-x-4 border-t border-site-line py-3 sm:grid-cols-[2rem_16rem_minmax(0,1fr)_4.5rem]"
          >
            <span className={`${mono} text-[12px] text-site-muted`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px] leading-snug text-site-ink">
              {name}
            </span>
            <span aria-hidden="true" className="hidden h-2 sm:block">
              <span
                className="block h-full bg-navy-3"
                style={{ width: `${(files / most) * 100}%` }}
              />
            </span>
            <span className={`${mono} text-right text-[13px] text-site-ink/80`}>
              {files} files
            </span>
          </li>
        ))}
      </ol>
      <Caption>
        Eight slices, one PR each: 237 files in all, merged June 19, 2026.
      </Caption>
    </figure>
  );
}

// OrderSync's own Shine sweep and dot grid, ported into this site. Set in
// Geist here; OrderSync sets them in Satoshi.
export function Materials({
  show = "both",
  caption,
}: {
  show?: "both" | "shine" | "dots";
  caption?: ReactNode;
}) {
  const display =
    "text-[32px] font-bold leading-[1.08] tracking-[-0.03em] md:text-[40px]";
  return (
    <figure>
      <div className={`grid gap-4 ${show === "both" ? "sm:grid-cols-2" : ""}`}>
        {show !== "dots" && (
          <div className="flex min-h-56 flex-col justify-center border border-site-line bg-white px-6 py-10">
            <p
              className={`${mono} text-[12px] uppercase tracking-[0.06em] text-[#64748B]`}
            >
              Silver glint
            </p>
            <p className={`${display} mt-3 text-navy-1`}>
              One System for
              <br />
              <Shine>All Your Orders</Shine>
            </p>
          </div>
        )}
        {show !== "shine" && (
          <div className="relative flex min-h-56 flex-col justify-center overflow-hidden bg-navy-1 px-6 py-10">
            <PolkaDots />
            <div className="relative z-10">
              <p
                className={`${mono} text-[12px] uppercase tracking-[0.06em] text-white/60`}
              >
                Dot grid
              </p>
              <p className={`${display} mt-3 text-white`}>
                Still Typing Orders Into Your ERP?
              </p>
            </div>
          </div>
        )}
      </div>
      <Caption>
        {caption ??
          "Live, from OrderSync’s code: the silver sweep plays once when it scrolls into view, and hovering the gray words replays it. Set in Geist here, not Satoshi."}
      </Caption>
    </figure>
  );
}
