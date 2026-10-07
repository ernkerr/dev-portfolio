import Image from "next/image";
import type { ReactNode } from "react";
import Shine from "@/components/Shine";
import { focusRing, mono } from "@/components/site/links";
import { Caption, Figure, inlineLink, label } from "@/components/site/prose";

// Figures for the OrderSync design write-up. The process images are from the
// files Erin made on May 18, 2026 in the ordersync-static repo
// (design-preview.html, design-preview-v2.html, design-system.html and the 3
// wireframes), screenshotted as they are. The mood board is from her inspo
// folder, ~/Desktop/projects/Current/ordersync/inspo.

const IMG = "/images/orderSync";

/* ---------- Screenshots of the site ---------- */

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
};

type Shot = { src: string; alt: string; label?: string };

/** First-screen screenshots (2880 × 1800), 2 across. */
export function Shots({
  items,
  caption,
}: {
  items: Shot[];
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
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((s) => (
          <div key={s.src}>
            {s.label && <p className={`${label} mb-3`}>{s.label}</p>}
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

/** The header's right side, before and after, at the same scale. */
export function HeaderCompare({ caption }: { caption?: ReactNode }) {
  return (
    <figure>
      <div className="flex flex-col gap-6">
        <div>
          <p className={`${label} mb-3`}>Before</p>
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
          <p className={`${label} mb-3`}>After</p>
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

/* ---------- Landscape ---------- */

// Competitors' homepages as they were in May 2026, from the Wayback Machine
// (snapshot times in docs/ordersync-research/landscape.json), 1440 × 900.
const LANDSCAPE = [
  {
    name: "conexiom",
    label: "Conexiom • May 14",
    alt: "Conexiom: a light gray panel with “Process every order accurately, in seconds.”, an orange Request demo button, and a product card correcting an order line to WIDGET-A, 150 EA and 2,450.00 USD.",
  },
  {
    name: "workist",
    label: "Workist • May 10",
    alt: "Workist: dark navy with hexagon line art and a teal glow, “Automate order entry – from inbox to ERP within seconds”, a mint Book a meeting button and a row of customer logos.",
  },
  {
    name: "truecommerce",
    label: "TrueCommerce • May 12",
    alt: "TrueCommerce: a navy-to-blue band with large swoosh shapes, “Your Supply Chain: Integrated. Automated. Built to Scale.” and an amber Book a Demo button.",
  },
  {
    name: "endeavor",
    label: "Endeavor AI • May 17",
    alt: "Endeavor AI: a photo of a red crane against a blue sky, “The #1 AI Platform for Supply Chain” in white serif type, and an email field with a red Book a demo button.",
  },
  {
    name: "comena",
    label: "Comena • May 14 (German site)",
    alt: "Comena: a blurred dark blue background with soft light, “Weniger Tippen, mehr Verkaufen. Automatisierte Auftragserfassung” (Less typing, more selling. Automated order entry) and a white Demo buchen (Book a demo) button.",
  },
];

/** OrderSync's old first screen beside 5 competitors', 2 across. */
export function LandscapeShots({ caption }: { caption?: ReactNode }) {
  const shots = [
    {
      src: SHOTS.oldHero.src,
      alt: SHOTS.oldHero.alt,
      label: "OrderSync, before",
      width: 2880,
      height: 1800,
    },
    ...LANDSCAPE.map((s) => ({
      src: `${IMG}/landscape/${s.name}.webp`,
      alt: s.alt,
      label: s.label,
      width: 1440,
      height: 900,
    })),
  ];
  return (
    <figure>
      <div className="grid gap-6 sm:grid-cols-2">
        {shots.map((s) => (
          <div key={s.src}>
            <p className={`${label} mb-3`}>{s.label}</p>
            <Image
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
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

/* ---------- Mood board ---------- */

type Pin = { name: string; alt: string; width: number; height: number };

// Chrome wordmark renders from February 25, 2026 (AI-generated; 2 carry
// Gemini's sparkle), then the mark OrderSync kept: just the O.
const LOGOS: Pin[] = [
  {
    name: "logo-black",
    alt: "The OrderSync wordmark as thick 3D chrome letters on black, with the O drawn as a rounded square ring.",
    width: 900,
    height: 900,
  },
  {
    name: "logo-white",
    alt: "The same 3D chrome wordmark on white, its letters tilted and overlapping.",
    width: 900,
    height: 900,
  },
  {
    name: "logo-angled",
    alt: "The wordmark in thin raised chrome on gray paper, seen at an angle.",
    width: 900,
    height: 900,
  },
  {
    name: "logo-flat",
    alt: "A flatter chrome version: the rounded square O as a separate mark beside OrderSync in chrome letters, on white.",
    width: 900,
    height: 600,
  },
];

const FINAL_MARK: Pin = {
  name: "brand-icon",
  alt: "The mark OrderSync kept: just the O, a rounded square ring in polished chrome.",
  width: 900,
  height: 900,
};

const CHROME: Pin[] = [
  {
    name: "chrome-pill",
    alt: "A glossy chrome pill button labeled Chromatic Button, made in Figma, on a light gray grid.",
    width: 900,
    height: 507,
  },
  {
    name: "chrome-cursor",
    alt: "A 3D mouse pointer in polished chrome.",
    width: 615,
    height: 615,
  },
  {
    name: "foil-card",
    alt: "A dark red business card with the name Maya in raised silver foil script.",
    width: 900,
    height: 713,
  },
  {
    name: "chrome-send",
    alt: "A comment field with a chrome Send button at its right end.",
    width: 900,
    height: 372,
  },
  {
    name: "chrome-arrow",
    alt: "A 3D arrow in brushed metal on black.",
    width: 600,
    height: 600,
  },
  {
    name: "embossed-card",
    alt: "A lime green card with the LUXA logo pressed into it, standing in a marble holder.",
    width: 874,
    height: 618,
  },
  {
    name: "chrome-user",
    alt: "A person icon in polished chrome.",
    width: 735,
    height: 677,
  },
  {
    name: "embossed-letter",
    alt: "The letter R embossed into a sheet of brushed gray metal.",
    width: 432,
    height: 410,
  },
  {
    name: "chrome-plane",
    alt: "A paper-plane pointer in polished chrome.",
    width: 736,
    height: 736,
  },
];

// Saved on Erin's OrderSync Pinterest board (screenshots from April 1, 2026),
// the Founder Haiku poster (March 24) and a type experiment she saved on
// May 18: the directions she left out.
const NOT_TAKEN: Pin[] = [
  {
    name: "pinterest-1",
    alt: "Erin’s OrderSync board on Pinterest: a futuristic robotics site that says “Touching tomorrow, today,” the Raftel studio’s chrome R, a design studio site with “Studio” in chrome script, silver perfume packaging, and lettering pressed into gray metal.",
    width: 700,
    height: 1330,
  },
  {
    name: "pinterest-2",
    alt: "More of Erin’s OrderSync board on Pinterest: a jewelry site with a glass blob, a poster spelling PROGRAMMER in chrome letters, an orange Ctrl key under “Everything is under,” a glass paper plane and a chrome cursor.",
    width: 700,
    height: 1241,
  },
  {
    name: "founder-haiku",
    alt: "A dark poster, Founder Haiku · March 2026: ORDERS FLOW THROUGH CODE PIPELINE GROWS in tall condensed type fading from white to gray, with a purple stripe down the left edge.",
    width: 645,
    height: 900,
  },
  {
    name: "type-experiment",
    alt: "A type experiment: a regular g plus a pixel g equals a g made of rounded blobs.",
    width: 527,
    height: 229,
  },
];

function PinImage({ pin }: { pin: Pin }) {
  return (
    <Image
      src={`${IMG}/mood/${pin.name}.webp`}
      alt={pin.alt}
      width={pin.width}
      height={pin.height}
      sizes="(min-width: 768px) 18rem, 50vw"
      className="mb-3 h-auto w-full break-inside-avoid border border-site-line"
    />
  );
}

/**
 * The chrome Erin collected from February to May 2026, next to the chrome
 * OrderSync's brand already had, then the directions she didn't take.
 */
export function MoodBoard() {
  return (
    <figure className="flex flex-col gap-10">
      <div>
        <p className={label}>Logo directions</p>
        {/* Cropped to the same 3:2 box so the wordmarks line up; each sits
            in the middle of a lot of empty space. */}
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {[...LOGOS, FINAL_MARK].map((pin) => (
            <div key={pin.name}>
              <div className="aspect-[3/2] overflow-hidden border border-site-line bg-white">
                <Image
                  src={`${IMG}/mood/${pin.name}.webp`}
                  alt={pin.alt}
                  width={pin.width}
                  height={pin.height}
                  sizes="(min-width: 768px) 18rem, 50vw"
                  className={`h-full w-full ${
                    pin === FINAL_MARK ? "object-contain p-4" : "object-cover"
                  }`}
                />
              </div>
              {pin === FINAL_MARK && (
                <p className={`${label} mt-3`}>Where we landed</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className={label}>Chrome I pulled from</p>
        <div className="mt-3 columns-2 gap-3 md:columns-3">
          {CHROME.map((pin) => (
            <PinImage key={pin.name} pin={pin} />
          ))}
        </div>
      </div>
      <div>
        <p className={label}>Too far out for this audience</p>
        <div className="mt-3 columns-2 gap-3 md:columns-3">
          {NOT_TAKEN.map((pin) => (
            <PinImage key={pin.name} pin={pin} />
          ))}
        </div>
      </div>
      <Caption>
        The logo renders are AI-generated, from February 2026. The rest I
        collected between February and May 2026, including the OrderSync
        board I made on Pinterest.
      </Caption>
    </figure>
  );
}

/* ---------- Process files from May 18 ---------- */

const PROCESS = `${IMG}/process`;

/** The 2 directions Erin built on May 18, first screen of each. */
export function Directions({ caption }: { caption?: ReactNode }) {
  return (
    <Shots
      items={[
        {
          src: `${PROCESS}/direction-dark.webp`,
          label: "1. All dark, all chrome",
          alt: "Direction 1: the homepage on near-black, with “One System for All Your Orders” in white fading to chrome gray, a white Book a free intro call pill and a gray Try Free Tools button.",
        },
        {
          src: `${PROCESS}/direction-light.webp`,
          label: "2. Light, with chrome accents",
          alt: "Direction 2: a white page with the same headline in black fading to chrome gray, a chrome Book a free intro call pill, and a black panel showing PDF, email, EDI and CSV flowing into OrderSync and then an ERP.",
        },
      ]}
      caption={caption}
    />
  );
}

const ROUNDS = [
  { file: "wireframe", name: "v1", height: 4701 },
  { file: "wireframe-v2", name: "v2", height: 4258 },
  { file: "wireframe-v3", name: "v3", height: 3514 },
];

/**
 * The 3 wireframe rounds side by side at the same scale, so the page
 * visibly gets shorter.
 */
export function WireframeRounds({ caption }: { caption?: ReactNode }) {
  return (
    <figure>
      <div className="grid grid-cols-3 items-start gap-3 sm:gap-6">
        {ROUNDS.map((r) => (
          <a
            key={r.file}
            href={`${PROCESS}/${r.file}.webp`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block ${focusRing}`}
          >
            <p className={`${label} mb-3 group-hover:text-site-blue`}>
              {r.name}
            </p>
            <Image
              src={`${PROCESS}/${r.file}.webp`}
              alt={`Wireframe ${r.name} of the homepage, full length. Open it to read it.`}
              width={1280}
              height={r.height}
              sizes="(min-width: 1024px) 18rem, 33vw"
              className="h-auto w-full border border-site-line"
            />
          </a>
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/** The top of wireframe v3, with its research notes in the margin. */
export function AnnotatedWireframe() {
  return (
    <figure>
      <Figure
        src={`${PROCESS}/wireframe-v3.webp`}
        alt="Wireframe v3 of the homepage with a yellow margin of research notes. Next to the header: “TrustRadius: 86% of buyers shortlist products they already know. If they’re here, they’re ready.” Next to the hero: “75% of POs still arrive via email or fax.” Next to the feature cards: SPS Commerce pricing and its 6 to 8 week quote that took 9 months, and chargeback costs."
        width={1280}
        height={3514}
        crop={1640}
      />
      <Caption>
        Wireframe v3, May 18, 2026, with the note behind each section in the
        margin. A few numbers in these notes didn’t hold up when I rechecked
        them, so the copy on this page uses the corrected ones.{" "}
        <a
          href={`${PROCESS}/wireframe-v3.webp`}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          Open the whole page
        </a>
      </Caption>
    </figure>
  );
}

/** The chrome rules from the May 18 design-system sheet. */
export function ChromeRules() {
  return (
    <Figure
      src={`${PROCESS}/chrome-rules.webp`}
      alt="From the May 18 design-system sheet, Chrome / Metal Accents: “Chrome is an accent, not a personality. Used for: stat numbers, key headline words, card top-edge highlights, badges, dividers. Never for backgrounds or large surfaces.” Below it, stat numbers, the words All Your Orders and 3 pills in chrome gray."
      width={1936}
      height={1120}
      caption="From the design-system sheet I made on May 18, 2026."
    />
  );
}

type Step = { name: string; state: "done" | "doing" | "todo" };

// Erin's process tracker (design-process.html), as her screenshot of it
// showed it on May 18, 2026, before any visual design.
const PHASES: { name: string; steps: Step[] }[] = [
  {
    name: "Discover",
    steps: [
      { name: "Problem definition and core challenge", state: "done" },
      { name: "Market research", state: "done" },
      { name: "Competitor analysis", state: "done" },
      { name: "Target audience", state: "done" },
      { name: "User research", state: "done" },
    ],
  },
  {
    name: "Define",
    steps: [
      { name: "Landing page requirements", state: "done" },
      { name: "User journey map", state: "done" },
      { name: "Information architecture", state: "done" },
    ],
  },
  {
    name: "Ideate",
    steps: [
      { name: "Low-fidelity wireframe", state: "done" },
      { name: "CTA strategy", state: "done" },
      { name: "Content structure", state: "doing" },
    ],
  },
  {
    name: "Design",
    steps: [
      { name: "Visual system", state: "todo" },
      { name: "High-fidelity mockups", state: "todo" },
    ],
  },
  {
    name: "Test",
    steps: [
      { name: "Build", state: "todo" },
      { name: "QA and ship", state: "todo" },
    ],
  },
];

const STATE_TEXT = {
  done: "done",
  doing: "in progress",
  todo: "not started",
} as const;

/** The process tracker, rebuilt live from Erin's May 18 screenshot. */
export function ProcessTracker({ caption }: { caption?: ReactNode }) {
  return (
    <figure>
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {PHASES.map((phase) => (
          <div key={phase.name}>
            <p className={`${label} border-b border-site-line pb-2`}>
              {phase.name}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {phase.steps.map((step) => (
                <li
                  key={step.name}
                  className={`flex items-baseline gap-3 text-body-sm ${
                    step.state === "done" ? "text-site-muted" : "text-site-ink"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block h-3 w-3 shrink-0 translate-y-px border ${
                      step.state === "done"
                        ? "border-site-ink bg-site-ink"
                        : step.state === "doing"
                          ? "border-site-ink"
                          : "border-site-line"
                    }`}
                  />
                  <span>
                    {step.name}
                    <span className="sr-only">, {STATE_TEXT[step.state]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/** The top of the May 18 user flow and measurement plan. */
export function UserFlow() {
  return (
    <figure>
      <Figure
        src={`${PROCESS}/user-flow-measurement.webp`}
        alt="The user flow and measurement plan from May 18. Each homepage section is paired with the question a visitor asks at that moment: 0 to 3 seconds, “Does this solve my problem?” at the hero; 3 to 10 seconds, “Who else uses this?” at the customer logos; 10 to 30 seconds, “How does it work?” at the diagram. Beside each section are the events to track, marked live or to add."
        width={1050}
        height={2490}
        crop={920}
      />
      <Caption>
        My user flow and measurement plan, May 18, 2026: the question a visitor
        asks at each point on the page, and what to track there. It flagged
        that bookings weren’t tracked past the calendar link.{" "}
        <a
          href={`${PROCESS}/user-flow-measurement.webp`}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          Open the whole plan
        </a>
      </Caption>
    </figure>
  );
}

/* ---------- Live ---------- */

/**
 * OrderSync's own Shine sweep, ported into this site. Set in Geist here;
 * OrderSync sets it in Satoshi. Sizes and the slate are OrderSync's, not
 * this site's tokens.
 */
export function ShineDemo({ caption }: { caption?: ReactNode }) {
  return (
    <figure>
      <div className="flex min-h-56 flex-col justify-center border border-site-line bg-white px-6 py-10">
        <p
          className={`${mono} text-[12px] uppercase tracking-[0.06em] text-[#64748B]`}
        >
          Silver glint
        </p>
        <p className="mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.03em] text-navy-1 md:text-[40px]">
          One System for
          <br />
          <Shine>All Your Orders</Shine>
        </p>
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}
