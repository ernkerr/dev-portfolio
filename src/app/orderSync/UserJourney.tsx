"use client";

import { useState, type ReactNode } from "react";
import { focusRing, mono } from "@/components/site/links";
import { Caption, label } from "@/components/site/prose";

// Each persona's journeys, made for this case study from the May 18 research
// (DESIGN.md's personas and segments, their "Searches for" lists, Key
// insight 1's "panic + overwhelm", the review emotions) and the questions in
// the May user flow (sitemap-flow.html). There was no journey map in May.
// Feelings at the trigger come from that research; the later ones are what
// each page is designed to do, not measured. "The page" is what shipped on
// OrderSync's main branch: the homepage, /edi-compliance/[retailer] (with
// its EDI Inspector and Book My Intro Call), /tools/po-extractor, /compare,
// the SPS Commerce alternatives post, the blog and the newsletter.

type Stage = {
  name: string;
  where: string;
  doing: string;
  thinking: string;
  feeling: string;
  /** 0 is the lowest point of the curve, 1 the highest. */
  level: number;
  page?: string;
};

type Journey = { persona: number; path: number; name: string; stages: Stage[] };

const PERSONA_NAMES: Record<number, string> = {
  1: "Forced into EDI",
  2: "Drowning in manual orders",
  3: "Outgrown legacy EDI",
};

const BOOK: Stage = {
  name: "Book",
  where: "Book a Call",
  doing: "Picks a time for a 30-minute call with James.",
  thinking: "It’s 30 minutes, with no commitment.",
  feeling: "Ready",
  level: 0.92,
  page: "Book a Call in the header of every page",
};

const RETAILER_EMAIL: Stage = {
  name: "Trigger",
  where: "A retailer’s email",
  doing: "A big retailer, like Walmart, sends its EDI requirements.",
  thinking: "This reads like a foreign language.",
  feeling: "Panic",
  level: 0.12,
};

const INBOX: Stage = {
  name: "Trigger",
  where: "The order inbox",
  doing: "Reps fall further behind typing orders into the ERP.",
  thinking: "There has to be a better way.",
  feeling: "Overwhelmed",
  level: 0.08,
};

const SLOW_ONBOARDING: Stage = {
  name: "Trigger",
  where: "A new trading partner",
  doing: "Adding one more partner to their EDI takes weeks again.",
  thinking: "We’ve outgrown this.",
  feeling: "Frustrated",
  level: 0.15,
};

const JOURNEYS: Journey[] = [
  {
    persona: 1,
    path: 1,
    name: "The homepage to a call",
    stages: [
      RETAILER_EMAIL,
      {
        name: "Search",
        where: "Google or AI search",
        doing: "Searches “Walmart EDI requirements” and “SPS Commerce alternative.”",
        thinking: "Is there a simpler path?",
        feeling: "Overwhelmed",
        level: 0.05,
        page: "A page on each big retailer’s EDI rules, and one on SPS Commerce alternatives",
      },
      {
        name: "Land",
        where: "The homepage",
        doing: "Reads the headline and the diagram under it.",
        thinking: "Does this solve my problem?",
        feeling: "Wary",
        level: 0.38,
        page: "“One System for All Your Orders,” with every format flowing into the ERP",
      },
      {
        name: "Evaluate",
        where: "Logos and the FAQ",
        doing: "Checks who else uses it and how long setup takes.",
        thinking: "How long does it take to go live?",
        feeling: "Reassured",
        level: 0.7,
        page: "Customer logos, and FAQs on go-live time, IT and SPS Commerce",
      },
      BOOK,
    ],
  },
  {
    persona: 1,
    path: 2,
    name: "A retailer’s EDI page",
    stages: [
      RETAILER_EMAIL,
      {
        name: "Search",
        where: "Google or AI search",
        doing: "Searches “Walmart EDI requirements.”",
        thinking: "Is there a simpler path?",
        feeling: "Overwhelmed",
        level: 0.05,
        page: "A page on each big retailer’s EDI rules",
      },
      {
        name: "Land",
        where: "Walmart’s EDI page",
        doing: "Reads what Walmart requires.",
        thinking: "Does this solve my problem?",
        feeling: "Wary",
        level: 0.35,
        page: "The retailer’s requirements, on a page of their own",
      },
      {
        name: "Try",
        where: "The EDI Inspector",
        doing: "Checks an EDI file in the free EDI Inspector.",
        thinking: "Can I try before committing?",
        feeling: "Reassured",
        level: 0.65,
        page: "The EDI Inspector, free, linked from the retailer page",
      },
      {
        ...BOOK,
        where: "Book My Intro Call",
        page: "Book My Intro Call at the bottom of every retailer page",
      },
    ],
  },
  {
    persona: 2,
    path: 1,
    name: "The homepage to a call",
    stages: [
      INBOX,
      {
        name: "Search",
        where: "Google",
        doing: "Searches “order entry automation.”",
        thinking: "Can software do this without a new hire?",
        feeling: "Hopeful",
        level: 0.22,
      },
      {
        name: "Land",
        where: "The homepage",
        doing: "Reads the headline and the first card.",
        thinking: "Does this solve my problem?",
        feeling: "Wary",
        level: 0.4,
        page: "“Eliminate Manual Data Entry,” the first card",
      },
      {
        name: "Evaluate",
        where: "Lower on the page",
        doing: "Reaches the call to action near the bottom.",
        thinking: "Will it fit my workflow?",
        feeling: "Reassured",
        level: 0.7,
        page: "“Still Typing Orders Into Your ERP?” with a Book a Call button",
      },
      BOOK,
    ],
  },
  {
    persona: 2,
    path: 2,
    name: "A free tool first",
    stages: [
      INBOX,
      {
        name: "Search",
        where: "Google",
        doing: "Searches “purchase order processing software.”",
        thinking: "Can software do this without a new hire?",
        feeling: "Hopeful",
        level: 0.22,
      },
      {
        name: "Land",
        where: "The homepage",
        doing: "Clicks Try Free Tools instead of booking.",
        thinking: "Can I try before committing?",
        feeling: "Wary",
        level: 0.4,
        page: "Try Free Tools, next to the booking button in the hero",
      },
      {
        name: "Try",
        where: "The PO Extractor",
        doing: "Runs one of their own POs through the free PO Extractor.",
        thinking: "Will it fit my workflow?",
        feeling: "Reassured",
        level: 0.7,
        page: "The PO Extractor, free",
      },
      {
        ...BOOK,
        doing: "Comes back and books a 30-minute call with James.",
        page: "Book a Call in the header, on the tools too",
      },
    ],
  },
  {
    persona: 3,
    path: 1,
    name: "A comparison to a call",
    stages: [
      SLOW_ONBOARDING,
      {
        name: "Search",
        where: "Google or AI search",
        doing: "Searches “SPS Commerce alternative.”",
        thinking: "Is there an alternative to SPS?",
        feeling: "Wary",
        level: 0.25,
        page: "A post on SPS Commerce alternatives",
      },
      {
        name: "Compare",
        where: "The comparisons",
        doing: "Reads how OrderSync compares with SPS Commerce.",
        thinking: "How is this different from SPS?",
        feeling: "Curious",
        level: 0.45,
        page: "Side-by-side comparisons on /compare",
      },
      {
        name: "Evaluate",
        where: "The homepage FAQ",
        doing: "Checks setup time and who has to do it.",
        thinking: "Do I need an IT team to set this up?",
        feeling: "Reassured",
        level: 0.7,
        page: "FAQs on go-live time, IT and SPS Commerce",
      },
      BOOK,
    ],
  },
  {
    persona: 3,
    path: 2,
    name: "Not buying yet",
    stages: [
      SLOW_ONBOARDING,
      {
        name: "Search",
        where: "Google",
        doing: "Searches “process orders from any format.”",
        thinking: "Is there one system for all of it?",
        feeling: "Wary",
        level: 0.25,
      },
      {
        name: "Land",
        where: "The homepage",
        doing: "Reads the headline and the diagram under it.",
        thinking: "Does this solve my problem?",
        feeling: "Curious",
        level: 0.45,
        page: "“One System for All Your Orders,” with every format flowing into the ERP",
      },
      {
        name: "Read",
        where: "The blog",
        doing: "Reads a few posts instead of booking.",
        thinking: "I’m not ready to talk to anyone yet.",
        feeling: "Interested",
        level: 0.55,
        page: "The 3 latest posts, on the homepage",
      },
      {
        name: "Stay in touch",
        where: "The newsletter",
        doing: "Signs up for the newsletter.",
        thinking: "Keep me posted.",
        feeling: "Interested",
        level: 0.6,
        page: "A newsletter sign-up at the bottom of the homepage",
      },
    ],
  },
];

const LANES = ["Doing", "Thinking", "Feeling", "The page"] as const;
const PERSONAS = [1, 2, 3];

/**
 * A journey map per persona and path, one at a time. The buttons switch the
 * map; its layout stays the same: stages across, a lane each for doing,
 * thinking, feeling and what the page does.
 */
export default function UserJourney({ caption }: { caption?: ReactNode }) {
  const [index, setIndex] = useState(0);
  const stages = JOURNEYS[index].stages;

  return (
    <figure>
      <div
        role="tablist"
        aria-label="Persona and path"
        className="mb-6 grid gap-x-8 gap-y-4 md:grid-cols-3"
      >
        {PERSONAS.map((n) => (
          <div key={n}>
            <p className={label}>
              Persona {n}: {PERSONA_NAMES[n]}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {JOURNEYS.map((j, i) =>
                j.persona === n ? (
                  <button
                    key={j.path}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-controls="journey-panel"
                    onClick={() => setIndex(i)}
                    className={`${mono} border px-3 py-1 text-label uppercase transition-colors ${
                      i === index
                        ? "border-site-ink bg-site-ink text-site-paper"
                        : "border-site-line text-site-ink hover:border-site-ink"
                    } ${focusRing}`}
                  >
                    Path {j.path}: {j.name}
                  </button>
                ) : null,
              )}
            </div>
          </div>
        ))}
      </div>

      <div id="journey-panel" role="tabpanel">
        {/* From 768px: stages across, a lane per row, and the feeling curve. */}
        <div className="hidden border-t border-site-line md:grid md:grid-cols-[6.5rem_repeat(5,minmax(0,1fr))]">
          <span />
          {stages.map((s, i) => (
            <div key={s.name} className="border-l border-site-line px-3 py-3">
              <p className="font-serif text-column-title text-site-ink">
                {i + 1}. {s.name}
              </p>
              <p className={`${label} mt-1`}>{s.where}</p>
            </div>
          ))}
          {LANES.map((lane) => (
            <div key={lane} className="contents">
              <p className={`${label} border-t border-site-line py-3`}>
                {lane}
              </p>
              {lane === "Feeling" ? (
                <div className="relative col-span-5 h-40 border-l border-t border-site-line">
                  <FeelingCurve stages={stages} />
                </div>
              ) : (
                stages.map((s) => (
                  <div
                    key={s.name}
                    className="border-l border-t border-site-line px-3 py-3"
                  >
                    {lane === "Doing" && (
                      <p className="text-body-sm text-site-ink/80">{s.doing}</p>
                    )}
                    {lane === "Thinking" && (
                      <p className="font-serif text-body text-site-ink">
                        “{s.thinking}”
                      </p>
                    )}
                    {lane === "The page" &&
                      (s.page ? (
                        <p className="text-body-sm text-site-ink/80">{s.page}</p>
                      ) : (
                        <p className="text-body-sm text-site-muted">
                          Before the site
                        </p>
                      ))}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>

        {/* Stage by stage on a phone. */}
        <ol className="flex flex-col border-t border-site-line md:hidden">
          {stages.map((s, i) => (
            <li key={s.name} className="border-b border-site-line py-4">
              <p className="font-serif text-column-title text-site-ink">
                {i + 1}. {s.name}
              </p>
              <p className={`${label} mt-1`}>
                {s.where} • {s.feeling}
              </p>
              <p className="mt-2 text-body-sm text-site-ink/80">{s.doing}</p>
              <p className="mt-2 font-serif text-body text-site-ink">
                “{s.thinking}”
              </p>
              {s.page && (
                <p className="mt-2 text-body-sm text-site-ink/75">
                  <span className={label}>The page </span>
                  {s.page}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>

      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/** The feeling at each stage, as a line across the stage columns. */
function FeelingCurve({ stages }: { stages: Stage[] }) {
  // Points sit in the middle of each column, between 18% and 82% high.
  const pts = stages.map((s, i) => ({
    x: ((i + 0.5) / stages.length) * 100,
    y: 82 - s.level * 64,
    ...s,
  }));
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <polyline
          points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          className="stroke-site-ink/40"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {pts.map((p) => (
        <span
          key={p.name}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full bg-site-ink"
          />
          {/* Low points label above the dot, high ones below, so every
              label stays inside the lane. */}
          <span
            className={`absolute whitespace-nowrap text-body-sm text-site-ink ${
              p.level < 0.5 ? "bottom-4" : "top-4"
            }`}
          >
            {p.feeling}
          </span>
        </span>
      ))}
    </>
  );
}
