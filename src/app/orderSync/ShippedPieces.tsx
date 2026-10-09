"use client";

import { useState, type ReactNode } from "react";
import Shine from "@/components/Shine";

// Pieces of OrderSync's homepage as it shipped, rebuilt from its code on
// origin/main (Header, Home/Hero, Home/FeaturesWithImage, Home/FAQ and
// Home/CallToAction, copy from dictionary/en.json) to show what a research
// finding or a design decision changed. Colors and
// sizes are OrderSync's (navy-1 #0E172B, content-muted #64748B, line
// #E5E7EB, navy-3 #1C274C), not this site's tokens; the type is Geist here,
// not Satoshi.

/** The third feature card, which the chargeback research added. */
export function ErrorsCard() {
  return (
    <div
      aria-hidden="true"
      className="border border-site-line bg-white p-6 text-[#0E172B] md:p-8"
    >
      <div className="grid items-center gap-8 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-8 lg:grid-cols-2 lg:p-10">
        <div>
          <p className="mb-8 text-[14px] text-[#9CA3AF]">03</p>
          <p className="mb-4 text-[30px] font-bold leading-tight">
            Catch Errors Before
            <br />
            They Cost You
          </p>
          <p className="text-[16px] leading-relaxed text-[#64748B]">
            Catches and fixes common mistakes automatically so orders are
            processed the first time. Validates every line against your catalog
            and partner rules before they hit your ERP.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#E5E7EB] bg-white p-8 text-center lg:p-10">
          <Shine className="block text-[72px] font-bold leading-none">
            5–10x
          </Shine>
          <p className="mt-3 text-[14px] text-[#9CA3AF]">
            faster order processing
          </p>
        </div>
      </div>
    </div>
  );
}

const NEW_FAQS = [
  {
    q: "How long does it take to go live?",
    a: "Most customers are processing live orders within a week. There are no templates to build, so onboarding is mostly connecting your store or ERP and forwarding a few sample orders so OrderSync can learn your partners’ formats.",
  },
  {
    q: "Do I need an IT team to set this up?",
    a: "No. OrderSync is built for ops teams, not engineers. Connect your store or ERP, point your order inbox at OrderSync, and you’re running. No mapping spreadsheets, no developer time.",
  },
  {
    q: "How is this different from SPS Commerce?",
    a: "SPS Commerce is built for big retailers with strict EDI mandates and requires per-trading-partner setup. OrderSync handles EDI, PDF, email, and spreadsheet orders in one place, learns mappings automatically, and is priced for distributors and merchants — not enterprise.",
  },
];

/**
 * The 3 questions the redesign added to the FAQ, live, with the go-live one
 * open. They open and close like OrderSync's.
 */
export function NewFaqs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border border-site-line bg-[#F9FAFB] px-4 py-8 text-[#0E172B] md:px-8">
      <div className="mx-auto flex max-w-[720px] flex-col gap-4">
        {NEW_FAQS.map(({ q, a }, i) => {
          const isOpen = open === i;
          return (
            <div
              key={q}
              className={`overflow-hidden rounded-xl border bg-white transition-colors duration-300 ${
                isOpen ? "border-[#0E172B]/20" : "border-[#E5E7EB]"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-site-blue"
              >
                <span className="pr-4 text-[18px] font-semibold md:text-[20px]">
                  {q}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 motion-reduce:transition-none ${
                    isOpen
                      ? "rotate-180 bg-[#1C274C] text-white"
                      : "bg-[#F9FAFB] text-[#64748B]"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 25" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.43057 8.87618C4.70014 8.56168 5.17361 8.52526 5.48811 8.79483L12 14.3765L18.5119 8.79483C18.8264 8.52526 19.2999 8.56168 19.5695 8.87618C19.839 9.19067 19.8026 9.66415 19.4881 9.93371L12.4881 15.9337C12.2072 16.1745 11.7928 16.1745 11.5119 15.9337L4.51192 9.93371C4.19743 9.66415 4.161 9.19067 4.43057 8.87618Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <p className="border-t border-[#E5E7EB] px-6 py-6 text-[16px] leading-relaxed text-[#64748B]">
                  {a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Pieces for the design decisions ---------- */

/** A white stage for one piece of the shipped page, centered. */
function Stage({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center border border-site-line px-6 py-10 ${
        dark ? "bg-[#0F172A] text-white" : "bg-white text-[#0E172B]"
      }`}
    >
      {children}
    </div>
  );
}

/** The hero's headline and the line under it (Home/Hero on origin/main). */
export function HeadlinePiece() {
  return (
    <Stage>
      <div className="max-w-[560px]">
        <p className="text-[48px] font-bold leading-[1.08] tracking-[-1.2px]">
          One System for
          <br />
          <Shine className="font-bold">All Your Orders</Shine>
        </p>
        <p className="mt-4 text-[18px] tracking-[-0.2px] text-[#64748B]">
          Our AI agent reads, validates, and syncs orders from any source to
          your ERP.
        </p>
      </div>
    </Stage>
  );
}

/** The header's chrome Book a Call pill, with OrderSync's own classes. */
export function ChromePillPiece() {
  return (
    <Stage>
      <span className="inline-flex h-10 items-center rounded-full border border-gray-300 bg-gradient-to-b from-white to-gray-100 px-5 text-[14px] font-semibold text-[#0E172B] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_6px_rgba(0,0,0,0.1)]">
        Book a Call
      </span>
    </Stage>
  );
}

/** The hero's 2 buttons: book a call, or try the free tools first. */
export function HeroButtonsPiece() {
  return (
    <Stage>
      <div className="flex flex-wrap justify-center gap-4">
        <span className="inline-flex items-center rounded-full bg-[#0E172B] px-8 py-3.5 font-medium text-white transition-colors duration-300 hover:bg-gray-800">
          Book My Free Intro Call
        </span>
        <span className="inline-flex items-center gap-3 rounded-full border border-gray-200 px-8 py-3.5 font-medium transition-colors duration-300 hover:bg-gray-50">
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
      </div>
    </Stage>
  );
}

/** The closing call to action (Home/CallToAction on origin/main). */
export function StillTypingPiece() {
  return (
    <Stage dark>
      <div className="max-w-[650px] py-6 text-center">
        <p className="mb-6 text-[40px] font-bold leading-tight tracking-[-1.2px]">
          Still Typing Orders
          <br />
          <Shine>Into Your ERP?</Shine>
        </p>
        <p className="mb-10 text-[18px] text-slate-300">
          30-minute intro call. We’ll show you what automation
          <br />
          looks like for your specific workflow.
        </p>
        <span className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold tracking-[-0.2px] text-slate-900 shadow-[0_0_25px_rgba(255,255,255,0.25)]">
          Book a Call
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
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
        <p className="mt-3 text-[14px] text-slate-400">
          No credit card required. No commitment.
        </p>
      </div>
    </Stage>
  );
}
