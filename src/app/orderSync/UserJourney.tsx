"use client";

import { useState, type ReactNode } from "react";
import { focusRing, mono } from "@/components/site/links";
import { Caption, label } from "@/components/site/prose";

// Persona 1's journey ("Forced into EDI", DESIGN.md), made for this case
// study from the May 18 research; there was no journey map in May.
// - Trigger and search: DESIGN.md's segment 2 ("reads like a foreign
//   language", "Googling at night trying to find a simpler path", its
//   "Searches for" list) and Key insight 1 ("panic + overwhelm").
// - Wary: reviews of SPS Commerce's long setups (Key insight 5).
// - Land, evaluate and book: the questions in the May user flow
//   (sitemap-flow.html). Reassured and Ready are what the page is designed
//   to do, not measured feelings.
// - Page: what shipped on OrderSync's main branch, including
//   /edi-compliance/[retailer] and the SPS Commerce alternatives post.
// The other paths are the branches in sitemap-flow.html and the May site map.

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

const STAGES: Stage[] = [
  {
    name: "Trigger",
    where: "A retailer’s email",
    doing: "A big retailer, like Walmart, sends its EDI requirements.",
    thinking: "This reads like a foreign language.",
    feeling: "Panic",
    level: 0.12,
  },
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
  {
    name: "Book",
    where: "Book a Call",
    doing: "Picks a time for a 30-minute call with James.",
    thinking: "It’s 30 minutes, with no commitment.",
    feeling: "Ready",
    level: 0.92,
    page: "Book a Call in the header of every page",
  },
];

type Path = { name: string; from: string; steps: string[] };

const OTHER_PATHS: Path[] = [
  {
    name: "Tries a tool first",
    from: "Land",
    steps: ["Try Free Tools", "A free tool, like the EDI Inspector", "Books when ready"],
  },
  {
    name: "Not ready at the first button",
    from: "Evaluate",
    steps: ["Keeps scrolling", "The FAQ", "Book a Call in the header"],
  },
  {
    name: "Lands deeper in the site",
    from: "Search",
    steps: ["A retailer’s EDI page or a comparison", "Book a Call in the header"],
  },
  {
    name: "Researching, not buying yet",
    from: "Land",
    steps: ["The blog", "The newsletter", "Stays in touch"],
  },
  {
    name: "Already a customer",
    from: "Land",
    steps: ["Sign In", "The app"],
  },
  {
    name: "Leaves",
    from: "Any stage",
    steps: ["Exits without booking"],
  },
];

const LANES = ["Doing", "Thinking", "Feeling", "The page"] as const;

/**
 * The happy path for Persona 1, stage by stage, with a feeling curve. A
 * button shows where the other paths branch off it.
 */
export default function UserJourney({ caption }: { caption?: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <figure>
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className={label}>Persona 1, the happy path</p>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="other-paths"
          onClick={() => setOpen((o) => !o)}
          className={`${mono} border border-site-line px-3 py-1 text-label uppercase text-site-ink transition-colors hover:border-site-ink ${focusRing}`}
        >
          {open ? "Hide the other paths" : `Show ${OTHER_PATHS.length} other paths`}
        </button>
      </div>

      {/* From 768px: stages across, a lane per row, and the feeling curve. */}
      <div className="hidden border-t border-site-line md:grid md:grid-cols-[6.5rem_repeat(5,minmax(0,1fr))]">
        <span />
        {STAGES.map((s, i) => (
          <div key={s.name} className="border-l border-site-line px-3 py-3">
            <p className="font-serif text-column-title text-site-ink">
              {i + 1}. {s.name}
            </p>
            <p className={`${label} mt-1`}>{s.where}</p>
          </div>
        ))}
        {LANES.map((lane) => (
          <div key={lane} className="contents">
            <p className={`${label} border-t border-site-line py-3`}>{lane}</p>
            {lane === "Feeling" ? (
              <div className="relative col-span-5 h-40 border-l border-t border-site-line">
                <FeelingCurve />
              </div>
            ) : (
              STAGES.map((s) => (
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
        {STAGES.map((s, i) => (
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

      <div id="other-paths" hidden={!open} className="mt-8">
        <p className={`${label} border-b border-site-line pb-2`}>
          Where visitors branch off
        </p>
        <ul className="flex flex-col">
          {OTHER_PATHS.map((p) => (
            <li
              key={p.name}
              className="grid gap-x-6 gap-y-2 border-b border-site-line py-3 md:grid-cols-[12rem_minmax(0,1fr)]"
            >
              <div>
                <p className="font-serif text-body text-site-ink">{p.name}</p>
                <p className={label}>From {p.from}</p>
              </div>
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
                {p.steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-site-muted">
                        →
                      </span>
                    )}
                    <span className="border border-site-line px-2 py-1 text-caption text-site-ink/80">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>

      {caption && <Caption>{caption}</Caption>}
    </figure>
  );

}

/** The feeling at each stage, as a line across the stage columns. */
function FeelingCurve() {
  // Points sit in the middle of each column, between 18% and 82% high.
  const pts = STAGES.map((s, i) => ({
    x: ((i + 0.5) / STAGES.length) * 100,
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
