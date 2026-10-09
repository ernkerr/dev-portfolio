"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Caption, inlineLink, label } from "@/components/site/prose";
import { useFit } from "./LiveHero";

// OrderSync's homepage on May 17, 2026, the day before the redesign started,
// rebuilt from its code (Header, Home/Hero and Home/Marquee at fbb18a4 on
// ordersync-static's main branch) so it runs live: the floating orbs, the
// pulsing button and the logo strip. The nav really said Pages: the Tools
// menu's button printed header.pages. Colors, sizes and animations are
// OrderSync's, not this site's tokens; the type is Geist, not Satoshi and
// Inter. BeforeFindings then pulls each piece out at full size, under the
// finding it shows.

const LOGO = "/images/orderSync/metallic-logo.png";
const STAGE_W = 1440;
const INK = "text-[#0E172B]";
const BODY = "text-[#64748B]";

const LOGOS = [
  { name: "bristol-farms", w: 142 },
  { name: "erewhon", w: 641 },
  { name: "jimbos", w: 505 },
  { name: "lassens", w: 375 },
  { name: "lazy-acres", w: 158 },
  { name: "mothers-market", w: 352 },
  { name: "whole-foods", w: 140 },
];

// OrderSync's own keyframes and classes from its globals.css, renamed so
// they can't collide with this site's.
const CSS = `
@keyframes os-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-20px) } }
@keyframes os-pulse-glow {
  0%,100% { box-shadow: 0 0 20px rgba(147,51,234,.4) }
  50% { box-shadow: 0 0 35px rgba(147,51,234,.6), 0 0 60px rgba(6,182,212,.3) }
}
@keyframes os-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
.os-orb { position: absolute; border-radius: 50%; filter: blur(60px); opacity: .5; pointer-events: none }
.os-float { animation: os-float 6s ease-in-out infinite }
.os-float-delayed { animation: os-float 6s ease-in-out 2s infinite }
.os-float-slow { animation: os-float 8s ease-in-out infinite }
.os-pulse { animation: os-pulse-glow 2s ease-in-out infinite }
.os-marquee { animation: os-marquee 30s linear infinite; will-change: transform }
.os-gradient-text {
  background: linear-gradient(135deg, #9333ea 0%, #06b6d4 100%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
@media (prefers-reduced-motion: reduce) {
  .os-float, .os-float-delayed, .os-float-slow, .os-pulse, .os-marquee { animation: none }
}
`;

/** OrderSync's styles, once per page. */
function OrderSyncCss() {
  return <style>{CSS}</style>;
}

/* ---------- The whole first screen, live ---------- */

export default function BeforeHero({ caption }: { caption?: ReactNode }) {
  const { box, scale } = useFit(STAGE_W);
  const stage = useRef<HTMLDivElement>(null);
  const [stageH, setStageH] = useState(0);

  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => setStageH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <figure>
      <OrderSyncCss />
      <div
        ref={box}
        role="img"
        aria-label="OrderSync’s homepage before the redesign: a centered headline, One System for All Your Orders, with All Your Orders in purple-to-cyan gradient text, glowing purple and cyan orbs behind it, a pulsing gradient Book a free intro call button and a Try Free Tools button. The header reads Features, Pages, Blog and Get Started, with a filled black Sign In button. Below, a strip of retailer logos scrolls under Processing orders from."
        className="relative overflow-hidden border border-site-line"
        style={{ height: stageH * scale }}
      >
        <div
          ref={stage}
          aria-hidden="true"
          className={`absolute left-0 top-0 origin-top-left overflow-hidden bg-white ${INK}`}
          style={{
            width: STAGE_W,
            transform: `scale(${scale})`,
            opacity: scale ? 1 : 0,
          }}
        >
          <Header />
          <Hero />
          <Marquee />
        </div>
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

function Header() {
  return (
    <div className="absolute left-0 top-0 z-10 w-full">
      <div className="mx-auto flex max-w-[1170px] items-center justify-between">
        <div className="flex shrink-0 items-center gap-2">
          <Image src={LOGO} alt="" width={32} height={32} />
          <span className="text-[20px] font-bold">OrderSync</span>
        </div>
        <nav className="mx-auto">
          <ul className="flex items-center gap-2.5">
            <li className="py-6">
              <NavLink>Features</NavLink>
            </li>
            <li className="py-6">
              <PagesButton />
            </li>
            <li className="py-6">
              <NavLink>Blog</NavLink>
            </li>
            <li className="py-6">
              <NavLink>Get Started ↗</NavLink>
            </li>
          </ul>
        </nav>
        <HeaderTools />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-[100px] pt-[170px]">
      <Orbs />
      <div className="relative mx-auto w-full max-w-[740px] text-center">
        <p className="mb-5 text-[72px] font-bold leading-[1.08] tracking-[-1.6px]">
          One System for
          <br />
          <GradientWords>All Your Orders</GradientWords>
        </p>
        <p
          className={`mx-auto mb-10 w-full max-w-[580px] text-[20px] leading-[28px] tracking-[-0.2px] ${BODY}`}
        >
          Our AI agent reads, validates, and syncs orders from any source to
          your ERP.
        </p>
        <div className="flex items-center justify-center gap-4">
          <PrimaryCta />
          <GlassCta />
        </div>
      </div>
    </section>
  );
}

function Orbs() {
  return (
    <>
      <div
        className="os-orb os-float"
        style={{
          left: "-8rem",
          top: "5rem",
          width: "24rem",
          height: "24rem",
          background: "radial-gradient(circle, #9333ea 0%, transparent 70%)",
        }}
      />
      <div
        className="os-orb os-float-delayed"
        style={{
          right: "-8rem",
          top: "10rem",
          width: "20rem",
          height: "20rem",
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
        }}
      />
      <div
        className="os-orb os-float-slow"
        style={{
          right: "25%",
          bottom: 0,
          width: "16rem",
          height: "16rem",
          background: "radial-gradient(circle, #9333ea 0%, transparent 70%)",
        }}
      />
    </>
  );
}

/** The logo strip: retailers' logos scrolling under a label. */
function Marquee() {
  const set = (copy: number) =>
    LOGOS.map((l) => (
      <div
        key={`${l.name}-${copy}`}
        className="flex h-10 w-32 shrink-0 items-center justify-center opacity-80 grayscale"
      >
        <Image
          src={`/images/orderSync/marquee/${l.name}.webp`}
          alt=""
          width={l.w}
          height={96}
          className="h-8 w-auto max-w-[120px] object-contain"
        />
      </div>
    ));
  return (
    <section className="relative overflow-hidden border-y border-[#E8E8E8] bg-[#F9FAFB] py-6">
      <div className="flex items-center gap-8">
        <span
          className={`shrink-0 pl-8 text-[16px] font-medium uppercase tracking-wider ${BODY}`}
        >
          Processing orders from
        </span>
        <div className="flex min-w-0 flex-1 items-center overflow-hidden">
          <div className="os-marquee flex shrink-0 items-center gap-12">
            {set(1)}
            {set(2)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- The pieces, as OrderSync styled them ---------- */

function NavLink({ children }: { children: ReactNode }) {
  return (
    <span className="flex rounded-full px-[14px] py-[3px] text-[16px] font-medium">
      {children}
    </span>
  );
}

function Chevron() {
  return (
    <svg width="19" height="18" viewBox="0 0 19 18" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.29314 6.38394C4.49532 6.14807 4.85042 6.12075 5.0863 6.32293L9.97022 10.5092L14.8542 6.32293C15.09 6.12075 15.4451 6.14807 15.6473 6.38394C15.8495 6.61981 15.8222 6.97492 15.5863 7.17709L10.3363 11.6771C10.1256 11.8576 9.8148 11.8576 9.60415 11.6771L4.35415 7.17709C4.11828 6.97492 4.09097 6.61981 4.29314 6.38394Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PagesButton() {
  return (
    <span className="flex items-center gap-1.5 rounded-full px-[14px] py-[3px] text-[16px] font-medium">
      Pages
      <Chevron />
    </span>
  );
}

// The Tools menu's items, from menuData and dictionary/en.json at fbb18a4.
const PAGES_MENU = [
  "EDI Inspector",
  "EDI Translator",
  "PO PDF Extractor",
  "Invoice Extractor",
  "Invoice vs PO Matcher",
  "All Tools →",
];

function HeaderTools() {
  return (
    <div className="flex items-center gap-1">
      <span className="flex h-[38px] w-[38px] items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M21 21l-4.3-4.3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex h-9 w-9 items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {/* bg-primary was #000000 in OrderSync's config. */}
      <span className="ml-2 rounded-full bg-[#000000] px-5 py-2 text-[16px] font-medium text-white">
        Sign In
      </span>
    </div>
  );
}

function GradientWords({ children }: { children: ReactNode }) {
  return (
    <span className="os-gradient-text relative">
      {children}
      <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-[#9333ea] to-[#06b6d4]" />
    </span>
  );
}

function PrimaryCta() {
  return (
    <span className="os-pulse inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#9333ea] to-[#06b6d4] py-3 pl-8 pr-3 font-medium text-white">
      Book a free intro call
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
        <svg width="20" height="20" viewBox="0 0 20 20" className="fill-current">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.5 5.625C7.15482 5.625 6.875 5.34518 6.875 5C6.875 4.65482 7.15482 4.375 7.5 4.375H15C15.3452 4.375 15.625 4.65482 15.625 5V12.5C15.625 12.8452 15.3452 13.125 15 13.125C14.6548 13.125 14.375 12.8452 14.375 12.5V6.50888L5.44194 15.4419C5.19786 15.686 4.80214 15.686 4.55806 15.4419C4.31398 15.1979 4.31398 14.8021 4.55806 14.5581L13.4911 5.625H7.5Z"
          />
        </svg>
      </span>
    </span>
  );
}

/** OrderSync's glass-light button. */
function GlassCta() {
  return (
    <span className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/70 px-8 py-3.5 font-medium backdrop-blur-md">
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      Try Free Tools
    </span>
  );
}

/* ---------- Each finding, with its piece pulled out ---------- */

/** A white stage for a piece of the old page, at full size. */
function Piece({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden border border-site-line bg-white ${INK} ${className}`}
    >
      {children}
    </div>
  );
}

/** Finding 1: the menu named Pages, open, showing the tools inside. */
function PagesMenuPiece() {
  return (
    <Piece className="flex justify-center px-6 pb-96 pt-6">
      <div className="flex items-start gap-2.5">
        <NavLink>Features</NavLink>
        <div className="relative">
          <PagesButton />
          <ul className="absolute left-0 top-full mt-2 flex w-[220px] flex-col gap-1.5 rounded-lg bg-white p-2.5 shadow-[0px_4px_12px_0px_rgba(15,23,42,0.10)]">
            {PAGES_MENU.map((item) => (
              <li
                key={item}
                className="rounded-[5px] px-[18px] py-[11px] text-[16px] text-[#1C274C]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <NavLink>Blog</NavLink>
        <NavLink>Get Started ↗</NavLink>
      </div>
    </Piece>
  );
}

/** Finding 2: the 2 names for the 1 booking calendar. */
function TwoNamesPiece() {
  return (
    <Piece className="grid divide-y divide-site-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
      {[
        { where: "In the header", el: <NavLink>Get Started ↗</NavLink> },
        { where: "In the hero", el: <PrimaryCta /> },
      ].map(({ where, el }) => (
        <div
          key={where}
          className="flex min-h-40 flex-col items-center justify-between gap-5 px-6 py-8"
        >
          <p className={label}>{where}</p>
          {el}
          <p className={`${BODY} text-caption`}>
            Opens the booking calendar
          </p>
        </div>
      ))}
    </Piece>
  );
}

/** Finding 3: the header's right side, where only Sign In was filled. */
function HeaderRightPiece() {
  return (
    <Piece className="flex items-center justify-between gap-6 px-6 py-5">
      <div className="flex items-center gap-2.5">
        <NavLink>Blog</NavLink>
        <NavLink>Get Started ↗</NavLink>
      </div>
      <HeaderTools />
    </Piece>
  );
}

/** Finding 4: each of Krebs's 4 patterns the old hero had, on its own. */
function AiPatternsPiece() {
  const tiles = [
    {
      pattern: "Gradient everything",
      el: (
        <p className="text-[44px] font-bold leading-[1.08] tracking-[-1px]">
          <GradientWords>All Your Orders</GradientWords>
        </p>
      ),
    },
    { pattern: "VibeCode Purple", el: <PrimaryCta /> },
    {
      pattern: "Large colored glows",
      el: (
        <>
          <div
            className="os-orb os-float"
            style={{
              left: "15%",
              top: "-2rem",
              width: "12rem",
              height: "12rem",
              background:
                "radial-gradient(circle, #9333ea 0%, transparent 70%)",
            }}
          />
          <div
            className="os-orb os-float-delayed"
            style={{
              right: "10%",
              top: "1rem",
              width: "10rem",
              height: "10rem",
              background:
                "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            }}
          />
        </>
      ),
    },
    {
      pattern: "Glassmorphism",
      el: (
        <>
          <div
            className="os-orb"
            style={{
              left: "28%",
              top: "1.5rem",
              width: "8rem",
              height: "8rem",
              opacity: 0.9,
              filter: "blur(30px)",
              background:
                "radial-gradient(circle, #9333ea 0%, transparent 70%)",
            }}
          />
          <div
            className="os-orb"
            style={{
              right: "28%",
              top: "2rem",
              width: "7rem",
              height: "7rem",
              opacity: 0.9,
              filter: "blur(30px)",
              background:
                "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            }}
          />
          <span className="relative">
            <GlassCta />
          </span>
        </>
      ),
    },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {tiles.map((t) => (
        <div key={t.pattern}>
          <Piece className="flex h-40 items-center justify-center px-6">
            {t.el}
          </Piece>
          <p className={`${label} mt-2`}>{t.pattern}</p>
        </div>
      ))}
    </div>
  );
}

/** Finding 5: the logo strip, live. */
function MarqueePiece() {
  return (
    <Piece>
      <Marquee />
    </Piece>
  );
}

type Finding = {
  title: string;
  kind: string;
  text: ReactNode;
  Evidence: () => ReactNode;
};

export const FINDINGS: Finding[] = [
  {
    title: "A menu called Pages",
    kind: "Match with the real world",
    text: "The free tools sat in a menu named Pages, which says nothing about what’s inside.",
    Evidence: PagesMenuPiece,
  },
  {
    title: "1 action, 2 names",
    kind: "Consistency and standards",
    text: "Get Started in the header and Book a free intro call in the hero opened the same calendar.",
    Evidence: TwoNamesPiece,
  },
  {
    title: "Sign In outranked booking",
    kind: "Visual hierarchy",
    text: "The header’s only filled button was for people who already had an account.",
    Evidence: HeaderRightPiece,
  },
  {
    // Krebs's patterns, checked against the old code: VibeCode Purple
    // (#9333ea), Gradient everything (headline, underline, button), Large
    // colored glows (the orbs and the button's purple shadow) and
    // Glassmorphism (Try Free Tools' glass-light).
    title: "The look of an AI-built page",
    kind: "Credibility",
    text: (
      <>
        Purple, gradients everywhere, colored glows and a glass button: 4 of
        the patterns on{" "}
        <a
          href="https://www.adriankrebs.ch/blog/design-slop/"
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          Adrian Krebs’s list of AI design patterns
        </a>
        . Of 1,590 Show HN pages he scored in April 2026, 22% had 4 or more.
      </>
    ),
    Evidence: AiPatternsPiece,
  },
  {
    title: "Kept: the logo strip",
    kind: "Social proof",
    text: "Buyers are trusting software with their orders, so proof that others already do goes a long way.",
    Evidence: MarqueePiece,
  },
];

/**
 * The 5 findings, each a numbered heading with its piece of the old page
 * under it. A fragment, so each finding sits in the section's own spacing.
 */
export function BeforeFindings() {
  return (
    <>
      <OrderSyncCss />
      {FINDINGS.map(({ title, kind, text, Evidence }, i) => (
        // Number and title on one line; everything under them lines up with
        // the column's edge, like the piece of the page below.
        <div key={title} className="mt-10 flex flex-col gap-5 md:mt-14">
          <div className="max-w-measure">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center bg-site-ink font-mono text-body-sm text-site-paper"
              >
                {i + 1}
              </span>
              <p className="font-serif text-subhead text-site-ink">{title}</p>
            </div>
            <p className={`${label} mt-3`}>{kind}</p>
            <p className="mt-2 text-body-sm text-site-ink/75">{text}</p>
          </div>
          <Evidence />
        </div>
      ))}
    </>
  );
}
