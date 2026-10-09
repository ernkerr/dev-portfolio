"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Shine from "@/components/Shine";
import { focusRing, mono } from "@/components/site/links";
import { Caption, label } from "@/components/site/prose";

// OrderSync's homepage hero as it shipped in June 2026, rebuilt from its code
// (src/components/Header, Home/Hero and Home/DocumentFlowDiagram on
// ordersync-static's main branch) so it runs live here: the glint, the
// flowing diagram, hovers and dark mode. It's a rebuild, not an embed, so
// portfolio visitors never count as OrderSync traffic. The colors and sizes
// are OrderSync's, not this site's tokens, and the type is Geist here, not
// Satoshi. Links don't go anywhere.

const LOGO = "/images/orderSync/metallic-logo.png";

// OrderSync lays the page out at 1440px; the stage is scaled to the column.
const STAGE_W = 1440;
const HEADER_H = 64;
const HERO_H = 700;
const STAGE_H = HEADER_H + HERO_H;

/** Scale a fixed-size stage to the width of its box. */
export function useFit(width: number) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(el.getBoundingClientRect().width / width);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return { box, scale };
}

export default function LiveHero({ caption }: { caption?: ReactNode }) {
  const [dark, setDark] = useState(true);
  const { box, scale } = useFit(STAGE_W);

  return (
    <figure>
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className={label}>Live, from OrderSync’s code</p>
        <button
          type="button"
          aria-pressed={dark}
          onClick={() => setDark((d) => !d)}
          className={`${mono} border border-site-line px-3 py-1 text-label uppercase text-site-ink transition-colors hover:border-site-ink ${focusRing}`}
        >
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
      <div
        ref={box}
        className="relative overflow-hidden border border-site-line"
        style={{ height: STAGE_H * scale }}
      >
        <div
          aria-hidden="true"
          className={`absolute left-0 top-0 origin-top-left ${dark ? "dark" : ""}`}
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
            opacity: scale ? 1 : 0,
          }}
        >
          <div className="h-full bg-white text-[#0E172B] transition-colors duration-300 dark:bg-[#151F34] dark:text-white">
            <Header onTheme={() => setDark((d) => !d)} />
            <Hero />
          </div>
        </div>
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

function Header({ onTheme }: { onTheme: () => void }) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-[#E5E7EB] px-8 dark:border-[#374151]">
      <div className="flex items-center gap-2.5">
        <Image src={LOGO} alt="" width={30} height={30} />
        <span className="text-[20px] font-bold tracking-[-0.4px]">
          OrderSync
        </span>
      </div>
      <nav className="flex gap-9 text-[15px] font-medium">
        {["Features", "Free Tools", "Resources", "Book a Call"].map((item) => (
          <span key={item} className="cursor-default hover:opacity-70">
            {item}
          </span>
        ))}
      </nav>
      <div className="flex items-center gap-4 text-[15px]">
        <SearchIcon />
        <span
          onClick={onTheme}
          className="cursor-pointer hover:opacity-70"
          title="Switch light and dark"
        >
          <MoonIcon />
        </span>
        <span className="cursor-default text-[#64748B] hover:opacity-70 dark:text-[#D1D5DB]">
          Sign In
        </span>
        {/* The chrome pill, with OrderSync's own classes. */}
        <span className="ml-1 inline-flex h-10 cursor-default items-center rounded-full border border-gray-300 bg-gradient-to-b from-white to-gray-100 px-5 text-[14px] font-semibold text-[#0E172B] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_6px_rgba(0,0,0,0.1)] dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-900 dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_3px_rgba(0,0,0,0.3)]">
          Book a Call
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative grid h-[700px] grid-cols-2">
      <div className="flex flex-col justify-center pl-8 pr-12">
        <p className="mb-5 text-[72px] font-bold leading-[1.08] tracking-[-1.6px]">
          One System for
          <br />
          <Shine className="font-bold">All Your Orders</Shine>
        </p>
        <p className="mb-10 max-w-[580px] text-[20px] tracking-[-0.2px] text-[#64748B] dark:text-[#9CA3AF]">
          Our AI agent reads, validates, and syncs orders from any source to
          your ERP.
        </p>
        <div className="flex gap-4">
          <span className="inline-flex cursor-default items-center rounded-full bg-[#0E172B] px-8 py-3.5 font-medium text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-[#0E172B] dark:hover:bg-gray-200">
            Book My Free Intro Call
          </span>
          <span className="inline-flex cursor-default items-center gap-3 rounded-full border border-gray-200 px-8 py-3.5 font-medium transition-all duration-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            <BoltIcon />
            Try Free Tools
          </span>
        </div>
      </div>
      <div className="relative">
        <FlowDiagram />
      </div>
    </div>
  );
}

/* ---------- The document flow diagram ---------- */

// OrderSync's coordinate frame: 600 × 500, padded to a 720 × 600 stage that
// the wires and cards share, scaled together into the panel.
const frameW = 600;
const frameH = 500;
const nodeW = 140;
const nodeH = 56;
const centerNodeW = 150;
const centerNodeH = 110;
const inputs = [
  { label: "PDF", Icon: PDFIcon, y: 40 },
  { label: "Email", Icon: EmailIcon, y: 150 },
  { label: "EDI", Icon: EDIIcon, y: 260 },
  { label: "CSV", Icon: CSVIcon, y: 370 },
];
const inputRight = nodeW;
const busX = 200;
const centerLeft = (frameW - centerNodeW) / 2 + 25;
const centerTop = (frameH - centerNodeH) / 2;
const centerCy = centerTop + centerNodeH / 2;
const centerRight = centerLeft + centerNodeW;
const erpLeft = frameW - nodeW;
const erpTop = (frameH - centerNodeH) / 2;
const erpCy = erpTop + centerNodeH / 2;
const stroke = "#a855f7";
const padX = 60;
const padY = 50;
const stageW = frameW + padX * 2;
const stageH = frameH + padY * 2;
const sx = (x: number) => x + padX;
const sy = (y: number) => y + padY;
const pathFor = (yIn: number) =>
  `M ${inputRight} ${yIn + nodeH / 2} L ${busX} ${yIn + nodeH / 2} L ${busX} ${centerCy} L ${centerLeft} ${centerCy}`;
const centerToErpPath = `M ${centerRight} ${erpCy} L ${erpLeft} ${erpCy}`;

function FlowingDots({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <>
      {[
        { offset: 0, opacity: 1 },
        { offset: 0.8, opacity: 0.7 },
        { offset: 1.6, opacity: 0.5 },
      ].map(({ offset, opacity }) => (
        <circle key={offset} r="4" fill={stroke} opacity="0">
          <set
            attributeName="opacity"
            to={opacity}
            begin={`${delay + offset}s`}
            fill="freeze"
          />
          <animateMotion
            dur="2.4s"
            repeatCount="indefinite"
            path={d}
            begin={`${delay + offset}s`}
          />
        </circle>
      ))}
    </>
  );
}

function FlowDiagram() {
  const reduce = useReducedMotion();
  // The panel is half of the 1440 stage by 700 tall; fit the diagram's
  // stage inside it, as OrderSync does.
  const scale = Math.min(720 / stageW, HERO_H / stageH);
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#0F172A]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(71, 85, 105, 0.4) 1px, transparent 1.5px)",
        backgroundSize: "16px 16px",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: stageW,
          height: stageH,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <svg
          viewBox={`${-padX} ${-padY} ${stageW} ${stageH}`}
          width={stageW}
          height={stageH}
          className="absolute inset-0"
        >
          {[...inputs.map((inp) => pathFor(inp.y)), centerToErpPath].map(
            (d, i) => (
              <g key={d}>
                <path
                  d={d}
                  stroke={stroke}
                  strokeWidth="2"
                  strokeOpacity="0.35"
                  fill="none"
                />
                {!reduce && (
                  <FlowingDots d={d} delay={i < inputs.length ? i * 0.2 : 0} />
                )}
              </g>
            ),
          )}
        </svg>

        {inputs.map(({ label: name, Icon, y }) => (
          <div
            key={name}
            className="absolute"
            style={{ left: sx(0), top: sy(y), width: nodeW, height: nodeH }}
          >
            <div className="relative h-full w-full">
              <div className="absolute -inset-1 rounded-2xl bg-slate-400/15 blur-md" />
              <div className="relative flex h-full w-full items-center gap-3 rounded-xl border border-slate-500/50 bg-gradient-to-br from-slate-800/90 to-slate-900/90 px-4 shadow-lg shadow-slate-500/20">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-600/80 text-white">
                  <Icon />
                </div>
                <span className="text-sm font-semibold text-white">{name}</span>
              </div>
            </div>
          </div>
        ))}

        <div
          className="absolute"
          style={{
            left: sx(centerLeft),
            top: sy(centerTop),
            width: centerNodeW,
            height: centerNodeH,
          }}
        >
          <div className="relative h-full w-full rounded-xl border border-purple-500/50 bg-gradient-to-br from-slate-800/95 to-slate-900/95 shadow-[0_0_40px_rgba(168,85,247,0.3),0_0_20px_rgba(168,85,247,0.35),0_0_8px_rgba(168,85,247,0.4)]">
            <motion.div
              animate={reduce ? undefined : { opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10"
            />
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-1.5">
              <motion.div
                animate={reduce ? undefined : { rotateZ: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative h-12 w-12"
              >
                <Image
                  src={LOGO}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain drop-shadow-lg"
                />
              </motion.div>
              <span className="text-sm font-bold text-white">OrderSync</span>
            </div>
          </div>
        </div>

        <div
          className="absolute"
          style={{
            left: sx(erpLeft),
            top: sy(erpTop),
            width: nodeW,
            height: centerNodeH,
          }}
        >
          <div className="relative h-full w-full rounded-xl border border-slate-500/40 bg-gradient-to-br from-slate-800/90 to-slate-900/90 shadow-[0_0_40px_rgba(148,163,184,0.2)]">
            <div className="flex h-full w-full flex-col items-center justify-center gap-1.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-600/80 text-white">
                <ERPIcon />
              </div>
              <span className="text-sm font-bold text-white">Your ERP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Icons, from OrderSync ---------- */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function PDFIcon() {
  return (
    <svg className="h-5 w-5" {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M10 12H8v5h2a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2z" strokeWidth={1.5} />
      <path d="M16 12h-2v5m0-2.5h1.5" strokeWidth={1.5} />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="h-5 w-5" {...iconProps}>
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

function EDIIcon() {
  return (
    <svg className="h-5 w-5" {...iconProps}>
      <path d="M12 2L2 7l10 5 10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function CSVIcon() {
  return (
    <svg className="h-5 w-5" {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h8M10 13v4M14 13v4" />
    </svg>
  );
}

function ERPIcon() {
  return (
    <svg className="h-7 w-7" {...iconProps}>
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9v.01M9 13v.01M9 17v.01" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="h-5 w-5 opacity-60" {...iconProps}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-5 w-5" {...iconProps}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg className="h-5 w-5" {...iconProps}>
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
