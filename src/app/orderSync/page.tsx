"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import NavBar from "@/components/NavBar";
import Shine from "@/components/Shine";
import { PolkaDots } from "@/components/ui/PolkaDots";
import CompareScroll from "@/components/CompareScroll";
import { geistSans, geistMono } from "../../../public/fonts/fonts";

/* ---------- small local helpers ---------- */

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px 120px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span
      className={`${geistMono.className} inline-block rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/60`}
    >
      {children}
    </span>
  );
}

/* ---------- data ---------- */

const META = ["Design system", "Marketing site", "Light + dark", "Visitor → booked call"];

const GLANCE = [
  { k: "Role", v: "Designer & developer (end to end)" },
  { k: "Stack", v: "Next.js · Tailwind · CVA · MDX" },
  { k: "Scope", v: "Homepage, landing pages & supporting pages" },
  { k: "Focus", v: "Cohesion · conversion · maintainability" },
];

const PROBLEMS = [
  {
    t: 'Many names for "dark"',
    d: "black, --navy, dark.DEFAULT, and --navy-bg used interchangeably across the codebase.",
  },
  {
    t: "Competing accent families",
    d: "Blue, purple, and cyan applied as shapes, links, and buttons with no rule for which went where.",
  },
  {
    t: "Effect debt",
    d: "Glows, floating orbs, glassmorphism, and animated gradients layered onto sections that didn't need them.",
  },
  {
    t: "One-off components",
    d: "Callouts, FAQ blocks, and CTA bands rebuilt by hand page by page — one change meant editing dozens of files.",
  },
];

const TOKENS = [
  { name: "navy-1", hex: "#0E172B", cls: "bg-navy-1" },
  { name: "navy-2", hex: "#151F34", cls: "bg-navy-2" },
  { name: "navy-3", hex: "#1C274C", cls: "bg-navy-3" },
  { name: "navy-4", hex: "#0F172A", cls: "bg-navy-4" },
  { name: "navy-5", hex: "navy-3 / 30%", cls: "bg-navy-3/30" },
  { name: "white", hex: "#FFFFFF", cls: "bg-white" },
];

const STEPS = [
  { n: "01", t: "Read sitemap", d: "Load every public URL from sitemap.xml." },
  {
    n: "02",
    t: "Scan the DOM",
    d: "Flag off-system styling against a library of violation patterns.",
  },
  {
    n: "03",
    t: "Screenshot light + dark",
    d: "Capture full-page shots in both color modes.",
  },
  {
    n: "04",
    t: "Pixel-diff",
    d: "Compare each page to a stored baseline and surface what changed.",
  },
];

const SHIPPED = [
  "Homepage rebuilt as the reference implementation for the system.",
  "Core landing pages rebuilt on a shared template.",
  "Tool, guide, comparison, and pSEO pages migrated onto the tokens.",
  "Navigation restructured with a scroll-aware header and one clear CTA.",
  "Shared conversion surfaces, instrumented end to end with PostHog.",
];

const OUTCOMES = [
  {
    t: "Single source of truth",
    d: "Color references resolve through a small set of tokens — a palette change is one edit.",
  },
  {
    t: "Zero design debt",
    d: "No off-palette colors or one-off components remain, verified by the audit pipeline.",
  },
  {
    t: "One system, whole site",
    d: "Every page inherits correct light and dark styling automatically.",
  },
  {
    t: "A measurable funnel",
    d: "Every CTA is instrumented, so the visitor-to-booked-call goal can actually be read.",
  },
];

const NEXT = [
  "Wire a live data feed into the homepage counters.",
  "Run the audit pipeline in CI so one off-system color fails the build.",
  "A/B test hero headline variants now that the funnel is instrumented.",
];

const STACK_CHIPS = [
  "Next.js 15",
  "Tailwind CSS",
  "CVA",
  "Contentlayer / MDX",
  "Framer Motion",
  "PostHog",
  "Vercel",
];

const HOME_COMPARE = {
  before: { src: "/images/orderSync/before-home.png", w: 2880, h: 14918 },
  beforeDark: { src: "/images/orderSync/before-home-dark.png", w: 2880, h: 14566 },
  afterLight: { src: "/images/orderSync/after-home.png", w: 2880, h: 14856 },
  afterDark: { src: "/images/orderSync/after-home-dark.png", w: 2880, h: 14856 },
};

const PAGE_PAIRS = [
  {
    title: "Landing page · AI order automation",
    before: { src: "/images/orderSync/before-landing.png", w: 2880, h: 10534 },
    afterLight: { src: "/images/orderSync/after-landing.png", w: 2880, h: 10620 },
  },
  {
    title: "Free tool · EDI inspector",
    before: { src: "/images/orderSync/before-tool.png", w: 2880, h: 7000 },
    afterLight: { src: "/images/orderSync/after-tool.png", w: 2880, h: 7008 },
  },
] as const;

/* ---------- page ---------- */

export default function OrderSync() {
  return (
    <div className={`${geistSans.className} min-h-screen bg-navy-1 text-white`}>
      <NavBar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-1 px-8 pb-20 pt-10 md:px-16 md:pt-16 lg:px-24">
        <PolkaDots />
        <Reveal className="relative z-10">
          <Eyebrow>Case Study · Design System</Eyebrow>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            OrderSync
            <br />
            <Shine>Design System Redesign</Shine>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            A scattered, effect-heavy marketing site rebuilt into a single
            navy-and-white design system, rolled out across the whole site, and
            kept honest with a custom screenshot-and-token audit pipeline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {META.map((m) => (
              <span
                key={m}
                className={`${geistMono.className} rounded-lg border border-white/10 bg-navy-2 px-3 py-1.5 text-sm text-white/80`}
              >
                {m}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* SEE THE REDESIGN — synced before/after with light/dark toggle */}
      <section className="bg-navy-3/40 px-8 py-16 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>Before &amp; after</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            See the redesign.
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            The same homepage, before and after. Both panes scroll together, and
            the light/dark toggle flips both sites so you can compare them in
            either theme.
          </p>
        </Reveal>
        <Reveal className="mt-8">
          <CompareScroll
            before={HOME_COMPARE.before}
            beforeDark={HOME_COMPARE.beforeDark}
            afterLight={HOME_COMPARE.afterLight}
            afterDark={HOME_COMPARE.afterDark}
          />
        </Reveal>
      </section>

      {/* AT A GLANCE */}
      <section className="bg-navy-2 px-8 py-16 md:px-16 lg:px-24">
        <Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {GLANCE.map((g) => (
              <div key={g.k} className="bg-navy-2 p-6">
                <div
                  className={`${geistMono.className} text-xs uppercase tracking-wider text-white/40`}
                >
                  {g.k}
                </div>
                <div className="mt-2 text-sm text-white/90">{g.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* PROBLEM */}
      <section className="bg-navy-1 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            It worked, but it had grown without a system.
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Years of feature pages, free tools, and programmatic SEO pages had
            each picked up their own styling. For a product that sells precision
            to operations teams, the inconsistency undercut the pitch.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-white/10 bg-navy-2 p-6">
                <h3 className="text-lg font-semibold text-white">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GOAL */}
      <section className="bg-navy-3/40 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>The goal</Eyebrow>
          <p className="mt-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Move more visitors to a booked call.
          </p>
          <p className="mt-6 max-w-2xl text-white/70">
            A trustworthy surface makes the product feel trustworthy. A clear
            hero and one obvious next action remove friction. And a maintainable
            system means future pages stay on-brand instead of adding new drift.
          </p>
        </Reveal>
      </section>

      {/* APPROACH */}
      <section className="bg-navy-1 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>Approach</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
            Four moves, one system.
          </h2>
        </Reveal>

        {/* 1. Palette to tokens + live swatches */}
        <Reveal className="mt-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <div className={`${geistMono.className} text-sm text-accent-to`}>
                01 · Palette → tokens
              </div>
              <h3 className="mt-3 text-xl font-semibold">
                Rebind at the source, not by hand.
              </h3>
              <p className="mt-3 text-white/70">
                Several &quot;dark&quot; names collapsed into a five-shade navy
                scale defined once as CSS variables. Every <code>bg-black</code>{" "}
                and <code>bg-dark</code> reference migrated automatically.
              </p>
              <p className={`${geistMono.className} mt-4 text-sm text-white/50`}>
                Every reference resolves to a small set of source tokens
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {TOKENS.map((t) => (
                <div key={t.name} className="text-center">
                  <div
                    className={`${t.cls} h-20 w-full rounded-xl border border-white/10`}
                  />
                  <div className="mt-2 text-xs font-medium text-white/80">
                    {t.name}
                  </div>
                  <div
                    className={`${geistMono.className} text-[10px] text-white/40`}
                  >
                    {t.hex}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 2. Semantic tokens */}
        <Reveal className="mt-14">
          <div className={`${geistMono.className} text-sm text-accent-to`}>
            02 · Self-flipping semantic tokens
          </div>
          <h3 className="mt-3 text-xl font-semibold">
            Intent, not <code>dark:</code> modifiers everywhere.
          </h3>
          <p className="mt-3 max-w-2xl text-white/70">
            Tokens like <code>surface</code>, <code>content</code>, and{" "}
            <code>line</code> swap their values under a <code>.dark</code> class.
            A heading is <code>text-content</code> — navy in light mode, white in
            dark — without the component knowing which mode it&apos;s in. New
            pages get correct dark mode for free.
          </p>
        </Reveal>

        {/* 3. Primitives + component shelf */}
        <Reveal className="mt-14">
          <div className={`${geistMono.className} text-sm text-accent-to`}>
            03 · Four primitives
          </div>
          <h3 className="mt-3 text-xl font-semibold">
            A new page is an assembly job, not a styling job.
          </h3>
          <p className="mt-3 max-w-2xl text-white/70">
            Almost every page is composed from <code>Section</code>,{" "}
            <code>Heading</code> (visual level decoupled from semantic tag),{" "}
            <code>Button</code>, and <code>Eyebrow</code>.
          </p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-navy-2 p-6">
            <div className="flex flex-wrap items-center gap-4">
              <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-navy-1">
                Book a call
              </button>
              <button className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white">
                See it live
              </button>
              <button className="rounded-full px-5 py-2 text-sm font-semibold text-white/60 hover:text-white">
                Learn more →
              </button>
              <Eyebrow>Eyebrow kicker</Eyebrow>
            </div>
            <div className="mt-6 space-y-1 border-t border-white/10 pt-6">
              <div className="text-3xl font-bold tracking-tight">
                Display heading
              </div>
              <div className="text-2xl font-bold tracking-tight">H1 heading</div>
              <div className="text-xl font-semibold">H2 heading</div>
              <div className="text-base font-semibold text-white/80">
                H3 heading
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4. Strip effects */}
        <Reveal className="mt-14">
          <div className={`${geistMono.className} text-sm text-accent-to`}>
            04 · Strip the effects
          </div>
          <h3 className="mt-3 text-xl font-semibold">
            Keep only the motion that earns its place.
          </h3>
          <p className="mt-3 max-w-2xl text-white/70">
            Out went the glows, orbs, glassmorphism, and animated gradients.
            What stayed earns attention: an animated document-flow diagram, a
            headline shine sweep, and word-by-word reveals. Restraint reads as
            confidence — which is the brand voice.
          </p>
        </Reveal>
      </section>

      {/* ACROSS PAGE TYPES */}
      <section className="bg-navy-3/40 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>Across page types</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            The system holds, page after page.
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            Landing pages and free tools, rebuilt on the same tokens. Each pair
            scrolls together, top to bottom.
          </p>
        </Reveal>
        <div className="mt-10 space-y-12">
          {PAGE_PAIRS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div
                className={`${geistMono.className} text-xs uppercase tracking-wider text-white/50`}
              >
                {p.title}
              </div>
              <div className="mt-3">
                <CompareScroll before={p.before} afterLight={p.afterLight} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AUDIT PIPELINE */}
      <section className="bg-navy-2 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>The part I&apos;m proudest of</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            A design audit that runs itself.
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            A design system is only real if the site actually follows it. So I
            built <code>pnpm design:audit</code> — a pipeline that proves it,
            across the whole site, with one command.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-navy-1 p-6">
                <div
                  className={`${geistMono.className} text-2xl font-bold text-accent-to`}
                >
                  {s.n}
                </div>
                <h3 className="mt-3 font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-white/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SHIPPED */}
      <section className="bg-navy-1 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>What shipped</Eyebrow>
          <ul className="mt-8 max-w-3xl space-y-4">
            {SHIPPED.map((s) => (
              <li key={s} className="flex gap-3 text-white/80">
                <span className="mt-1 text-accent-to">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* OUTCOMES */}
      <section className="bg-navy-3/40 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>Outcomes</Eyebrow>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.t} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-navy-1 p-6">
                <h3 className="font-semibold text-white">{o.t}</h3>
                <p className="mt-2 text-sm text-white/60">{o.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 max-w-3xl text-sm italic text-white/45">
            The redesign&apos;s wins are in consistency and maintainability.
            Conversion impact is tracked in PostHog over time against the
            booked-call goal, so I&apos;ve kept this to what&apos;s verifiable
            rather than quoting a lift I can&apos;t yet stand behind.
          </p>
        </Reveal>
      </section>

      {/* WHAT'S NEXT */}
      <section className="bg-navy-1 px-8 py-20 md:px-16 lg:px-24">
        <Reveal>
          <Eyebrow>What I&apos;d do next</Eyebrow>
          <ul className="mt-8 max-w-2xl space-y-3 text-white/70">
            {NEXT.map((n) => (
              <li key={n} className="flex gap-3">
                <span className="text-white/30">→</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* CTA FOOTER */}
      <section className="relative overflow-hidden bg-navy-4 px-8 py-20 md:px-16 lg:px-24">
        <PolkaDots />
        <Reveal className="relative z-10">
          <div className="flex flex-wrap gap-2">
            {STACK_CHIPS.map((c) => (
              <span
                key={c}
                className={`${geistMono.className} rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70`}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy-1"
            >
              ← Back to projects
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
