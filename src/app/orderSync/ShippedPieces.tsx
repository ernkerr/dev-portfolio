"use client";

import { useState } from "react";
import Shine from "@/components/Shine";

// Pieces of OrderSync's homepage as it shipped, rebuilt from its code on
// origin/main (Home/FeaturesWithImage, Home/CallToAction and Home/FAQ, copy
// from dictionary/en.json) to show what a research finding changed. Colors
// and sizes are OrderSync's (navy-1 #0E172B, content-muted #64748B, line
// #E5E7EB, navy-3 #1C274C, and Tailwind's slate for the closing call to
// action), not this site's tokens; the type is Geist here, not Satoshi.

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

/** The closing call to action, which the buyers' own words rewrote. */
export function ClosingCta() {
  return (
    <div
      aria-hidden="true"
      className="border border-site-line bg-[#0F172A] px-4 py-16 text-center md:py-20"
    >
      <div className="mx-auto max-w-[650px]">
        <p className="mb-6 text-[30px] font-bold leading-tight tracking-[-1.6px] text-white md:text-[35px]">
          Still Typing Orders
          <br />
          <Shine>Into Your ERP?</Shine>
        </p>
        <p className="mb-10 text-[18px] text-[#CBD5E1]">
          30-minute intro call. We’ll show you what automation{" "}
          <br className="hidden sm:block" />
          looks like for your specific workflow.
        </p>
        <span className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold tracking-[-0.2px] text-[#0F172A] shadow-[0_0_25px_rgba(255,255,255,0.25)]">
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
        <p className="mt-3 text-[14px] text-[#94A3B8]">
          No credit card required. No commitment.
        </p>
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
