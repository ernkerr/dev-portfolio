import Image from "next/image";
import type { ReactNode } from "react";
import Shine from "@/components/Shine";
import { mono } from "@/components/site/links";
import {
  Caption,
  Figure,
  inlineLink,
  label,
  TipLabel,
} from "@/components/site/prose";

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

/* ---------- After launch ---------- */

type FunnelStep = {
  label: string;
  count: number;
  note?: string;
  tip: string;
};

// PostHog, June 26 (its first recorded event) to October 8, 2026, with
// OrderSync's own team filtered out. Small numbers, so each bar shows its
// count. Bars are one ink, scaled to the group's first step.
const DROP_OFF: { name: string; steps: FunnelStep[] }[] = [
  {
    name: "From the homepage to a booking",
    steps: [
      {
        label: "Started on the homepage",
        count: 52,
        tip: "People whose first page was the homepage.",
      },
      {
        label: "Clicked Book a Call",
        count: 4,
        note: "4 of 52",
        tip: "Of those 52, people who then clicked any Book a Call button.",
      },
      {
        label: "Opened the booking window",
        count: 3,
        note: "3 of 4",
        tip: "Of those 4, people who then opened the window to pick a time.",
      },
    ],
  },
  {
    name: "How far down the homepage",
    steps: [
      {
        label: "Went on to another page",
        count: 45,
        tip: "Homepage visits that went on to another page. Scroll depth can only be measured for these.",
      },
      {
        label: "Reached the bottom third",
        count: 12,
        note: "12 of 45",
        tip: "Of those 45, visits that scrolled past two thirds of the page, where the FAQ and the closing call to action are.",
      },
    ],
  },
];

/** Where homepage visitors drop off, as plain bars with their counts. */
export function DropOff({ caption }: { caption?: ReactNode }) {
  return (
    <figure className="flex flex-col gap-8">
      {DROP_OFF.map((group) => {
        const top = group.steps[0].count;
        return (
          <div key={group.name}>
            <p className={`${label} border-b border-site-line pb-2`}>
              {group.name}
            </p>
            <ol className="mt-4 flex flex-col gap-4">
              {group.steps.map((step) => (
                <li
                  key={step.label}
                  className="grid gap-x-6 gap-y-2 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]"
                >
                  <span className={`relative ${label}`}>
                    <TipLabel id={`drop-${step.label}`} tip={step.tip}>
                      {step.label}
                    </TipLabel>
                  </span>
                  <span className="flex items-center gap-3 border-l border-site-line">
                    <span
                      aria-hidden="true"
                      className="h-5 bg-site-ink/80"
                      style={{ width: `${(step.count / top) * 100}%` }}
                    />
                    <span className="shrink-0 text-body-sm text-site-ink">
                      {step.note ?? step.count}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        );
      })}
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/* ---------- Business cards ---------- */

// James’s business cards, from Erin’s exports. His surname, phone, email and
// the QR code are blurred for privacy until she sends versions with generic
// details. All 1050 × 600.
const CARDS = `${IMG}/cards`;

// Pages 1 and 2 of her export (Front.png and 2.png).
const CARD_FINAL = [
  {
    name: "final-front-navy",
    alt: "The front of the card: OrderSync at the top left, the chrome O in the middle and “Zero Errors. Zero Manual Entry.” at the bottom right, in white on navy.",
  },
  {
    name: "final-back",
    alt: "The back of the card: James and a blurred surname in a large serif, Founder, a blurred phone number and www.ordersync.io. A vertical BOOK NOW label sits beside a blurred QR code at the bottom left, and a small chrome arrow cursor at the top right.",
  },
];

// The front's other versions, in export order (Back.png, 4, 5 and 9).
const CARD_ITERATIONS = [
  {
    name: "iter-white",
    alt: "The same front with OrderSync set a little higher and further left.",
  },
  {
    name: "iter-swapped",
    alt: "Navy card with the chrome O in the middle, “Zero Manual Entry. Zero Errors.” at the top left and OrderSync at the bottom right.",
  },
  {
    name: "iter-gray",
    alt: "The front's layout with OrderSync and the tagline in gray.",
  },
  {
    name: "iter-sans",
    alt: "Navy card with the chrome O in the middle and “Zero Manual Entry. Zero Errors.” below it in a gray sans serif.",
  },
];

const CARD_DIRECTIONS = [
  {
    name: "dir-scale",
    alt: "Navy card with the chrome O on the left, and OrderSync with “Scale Your Orders, Not Your Workload.” on the right.",
  },
  {
    name: "dir-name-left",
    alt: "Navy card with the chrome O and “Scale Your Orders, Not Your Workload.” on the left, and OrderSync, James, Founder and blurred contact details on the right.",
  },
  {
    name: "dir-wordmark-scale",
    alt: "Navy card with a thick 3D chrome OrderSync wordmark and “Scale Your Orders, Not Your Workload.” below it.",
  },
  {
    name: "dir-wordmark-name",
    alt: "Navy card with a flatter chrome OrderSync wordmark and JAMES with a blurred surname below it.",
  },
  {
    name: "dir-o-name",
    alt: "Navy card with the chrome O in the middle and James with a blurred surname below it.",
  },
  {
    name: "dir-name-o-right",
    alt: "Navy card with JAMES and a blurred surname on the left and the chrome O on the right.",
  },
  {
    name: "dir-o-only",
    alt: "Navy card with only the chrome O in the middle.",
  },
  {
    name: "dir-light-o",
    alt: "Pale gray card with a large chrome O, OrderSync spaced out below it, and JAMES with a blurred surname on the right.",
  },
  {
    name: "dir-typewriter",
    alt: "Pale gray card with James, a blurred surname and phone number, then OrderSync, centered in a typewriter face.",
  },
  {
    name: "dir-embossed",
    alt: "Pale gray paper with the OrderSync wordmark embossed in silver, and JAMES with a blurred surname and a signature line at the bottom left.",
  },
  {
    name: "dir-cursors",
    alt: "Pale gray card with the chrome O between a chrome arrow and a chrome cursor.",
  },
];

function Card({ name, alt }: { name: string; alt: string }) {
  return (
    <Image
      src={`${CARDS}/${name}.webp`}
      alt={alt}
      width={1050}
      height={600}
      sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"
      className="h-auto w-full border border-site-line"
    />
  );
}

/** The card James uses, both sides. */
export function BusinessCard({ caption }: { caption?: ReactNode }) {
  return (
    <figure>
      <div className="grid gap-6 sm:grid-cols-2">
        {CARD_FINAL.map((c) => (
          <Card key={c.name} {...c} />
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/** The other versions of the card's front, 4 across. */
export function CardIterations({ caption }: { caption?: ReactNode }) {
  return (
    <figure>
      <p className={`${label} mb-3`}>Iterations of the front</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {CARD_ITERATIONS.map((c) => (
          <Card key={c.name} {...c} />
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/** Every card direction Erin didn't take, 3 across. */
export function CardDirections({ caption }: { caption?: ReactNode }) {
  return (
    <figure>
      <p className={`${label} mb-3`}>Directions I didn’t take</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {CARD_DIRECTIONS.map((c) => (
          <Card key={c.name} {...c} />
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/* ---------- Mood board ---------- */

type Pin = {
  name: string;
  alt: string;
  width: number;
  height: number;
  /** Where a square crop keeps the subject, if not the middle. */
  focus?: "right";
};

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
    focus: "right",
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

// Single pins cropped out of Erin's OrderSync board on Pinterest (her
// screenshots from April 1, 2026), and the Founder Haiku poster (March 24):
// the chrome-everywhere looks she left out.
const LEFT_OUT: Pin[] = [
  {
    name: "pin-touching-tomorrow",
    alt: "A futuristic robotics site: “Touching tomorrow, today” over a row of phones, on pale gray.",
    width: 318,
    height: 440,
  },
  {
    name: "pin-raftel",
    alt: "The Raftel studio’s R, a thick chrome letter pressed into brushed metal.",
    width: 318,
    height: 385,
  },
  {
    name: "pin-studio",
    alt: "A design studio’s site with “Studio” in huge chrome script.",
    width: 318,
    height: 318,
  },
  {
    name: "pin-programmer",
    alt: "A poster spelling PROGRAMMER in chrome letters.",
    width: 318,
    height: 452,
  },
  {
    name: "pin-jewelry",
    alt: "A jewelry site with a melting glass blob in the middle of a gray page.",
    width: 318,
    height: 230,
  },
  {
    name: "founder-haiku",
    alt: "A dark poster, Founder Haiku · March 2026: ORDERS FLOW THROUGH CODE PIPELINE GROWS in tall condensed type fading from white to gray, with a purple stripe down the left edge.",
    width: 645,
    height: 900,
  },
];

// The chrome-as-an-accent references she kept: a button, a cursor, a send
// button, an arrow and 2 cards.
const KEPT = [
  "chrome-pill",
  "chrome-send",
  "chrome-cursor",
  "chrome-arrow",
  "foil-card",
  "embossed-card",
];

/** A reference, cropped to a square tile so the board lines up. */
function Tile({ pin }: { pin: Pin }) {
  return (
    <div className="aspect-square overflow-hidden border border-site-line bg-white">
      <Image
        src={`${IMG}/mood/${pin.name}.webp`}
        alt={pin.alt}
        width={pin.width}
        height={pin.height}
        sizes="(min-width: 1328px) 11rem, (min-width: 768px) 16vw, 33vw"
        className={`h-full w-full object-cover ${
          pin.focus === "right" ? "object-right" : ""
        }`}
      />
    </div>
  );
}

/**
 * The visual direction: the logo exploration that ended at the O, then a
 * row of the chrome kept as an accent and a row of the chrome-everywhere
 * looks left out.
 */
export function VisualDirection() {
  const rows = [
    {
      label: "Kept: chrome as an accent",
      pins: KEPT.map((n) => CHROME.find((p) => p.name === n)!),
    },
    { label: "Left out: chrome as the whole look", pins: LEFT_OUT },
  ];
  return (
    <figure className="flex flex-col gap-10">
      <div>
        <p className={label}>Logo exploration</p>
        {/* Cropped to the same 3:2 box so the wordmarks line up; each sits
            in the middle of a lot of empty space. */}
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[...LOGOS, FINAL_MARK].map((pin) => (
            <div key={pin.name}>
              <div className="aspect-[3/2] overflow-hidden border border-site-line bg-white">
                <Image
                  src={`${IMG}/mood/${pin.name}.webp`}
                  alt={pin.alt}
                  width={pin.width}
                  height={pin.height}
                  sizes="(min-width: 768px) 14rem, 50vw"
                  className={`h-full w-full ${
                    pin === FINAL_MARK ? "object-contain p-4" : "object-cover"
                  }`}
                />
              </div>
              {pin === FINAL_MARK && (
                <p className={`${label} mt-3`}>The final mark</p>
              )}
            </div>
          ))}
        </div>
      </div>
      {rows.map((row) => (
        <div key={row.label}>
          <p className={label}>{row.label}</p>
          <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-6">
            {row.pins.map((pin) => (
              <Tile key={pin.name} pin={pin} />
            ))}
          </div>
        </div>
      ))}
      <Caption>
        The logo renders are AI-generated, from February 2026. The references
        are from my OrderSync board on Pinterest and other saves, February to
        May 2026.
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
          label: "A. Dark, all chrome",
          alt: "Direction 1: the homepage on near-black, with “One System for All Your Orders” in white fading to chrome gray, a white Book a free intro call pill and a gray Try Free Tools button.",
        },
        {
          src: `${PROCESS}/direction-light.webp`,
          label: "B. Light, chrome as an accent (chosen)",
          alt: "Direction 2: a white page with the same headline in black fading to chrome gray, a chrome Book a free intro call pill, and a black panel showing PDF, email, EDI and CSV flowing into OrderSync and then an ERP.",
        },
      ]}
      caption={caption}
    />
  );
}

/** The chrome rules from the May 18 design-system sheet. */
export function ChromeRules() {
  return (
    <Figure
      src={`${PROCESS}/chrome-rules.webp`}
      alt="From the design-system sheet, Chrome / Metal Accents: “Chrome is an accent, not a personality. Used for: stat numbers, key headline words, card top-edge highlights, badges, dividers. Never for backgrounds or large surfaces.” Below it, stat numbers, the words All Your Orders and 3 pills in chrome gray."
      width={1936}
      height={1120}
      caption="From the design-system sheet I made."
    />
  );
}

// The 3 buyer personas in DESIGN.md, "from competitor customer data", May 18.
// Titles, company and trigger are DESIGN.md's; each quote is checked word
// for word in docs/ordersync-research/stat-check.md. "On the page" says where
// the page speaks to them.
const PERSONAS = [
  {
    name: "Forced into EDI",
    who: "CEO, president or VP of operations at a consumer goods or food brand",
    trigger: "A big retailer, like Walmart or Target, requires EDI.",
    quote:
      "They said it would be 6-8 weeks. It’s been 9 months. And we’re not done",
    source:
      "Jennifer N., CEO, in a 1-star Capterra review of SPS Commerce, 2022",
    page: "FAQs: “How long does it take to go live?” and “How is this different from SPS Commerce?”",
  },
  {
    name: "Drowning in manual orders",
    who: "Director of customer service or CSR supervisor at a manufacturer or distributor",
    trigger:
      "Reps worn out by typing, more errors, and talk of hiring just for data entry.",
    quote:
      "CSRs were constantly struggling with the push and pull of rushing to key in a new order, and then dealing with customer inquiries about existing ones.",
    source: "Darlene Bardin, Genpak, in a Conexiom customer story, 2022",
    page: "The closing call to action: “Still Typing Orders Into Your ERP?”",
  },
  {
    name: "Outgrown legacy EDI",
    who: "CTO, VP of operations or EDI lead at a brand growing into retail",
    trigger: "Slow onboarding, outages and legacy systems they can’t see into.",
    quote:
      "Sub-par integrations, unresponsive customer service, heinous billing practices",
    source: "Jessica K., VP, in a 2-star Capterra review of SPS Commerce, 2021",
    page: "The headline, “One System for All Your Orders,” and the diagram of every format going into the ERP.",
  },
];

/** The 3 proto-personas as cards: who, trigger, their words, the page. */
export function Personas({ caption }: { caption?: ReactNode }) {
  return (
    <figure>
      {/* Subgrid lines up the cards' headers and sections across a row. */}
      <ul className="grid gap-x-6 gap-y-6 md:grid-cols-3 md:grid-rows-[auto_auto] md:gap-y-0">
        {PERSONAS.map((p, i) => (
          <li
            key={p.name}
            className="flex flex-col border border-site-line md:row-span-2 md:grid md:grid-rows-subgrid"
          >
            <div className="border-b border-site-line p-5">
              <p className={label}>Persona {i + 1}</p>
              <p className="mt-2 font-serif text-column-title text-site-ink">
                {p.name}
              </p>
              <p className="mt-1 text-body-sm text-site-ink/75">{p.who}</p>
            </div>
            <dl className="flex flex-1 flex-col gap-4 p-5">
              <div>
                <dt className={label}>Trigger</dt>
                <dd className="mt-1 text-body-sm text-site-ink/80">
                  {p.trigger}
                </dd>
              </div>
              <div>
                <dt className={label}>In their words</dt>
                <dd className="mt-1">
                  <p className="font-serif text-body text-site-ink">
                    “{p.quote}”
                  </p>
                  <p className="mt-1 text-caption text-site-muted">
                    {p.source}
                  </p>
                </dd>
              </div>
              <div className="mt-auto border-t border-site-line pt-4">
                <dt className={label}>On the page</dt>
                <dd className="mt-1 text-body-sm text-site-ink/80">{p.page}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

type Tracked = { event: string; state: "live" | "add" | "need" };

// The user flow and measurement plan from sitemap-flow.html, May 18, 2026
// ("Landing Page User Flow & Engagement Measurement"): each homepage stop,
// the question a visitor asks there and the events to track. Its estimated drop-off rates are left out; they weren't sourced.
const JOURNEY: {
  when: string;
  /** The visitor's question, or the plan's own name for a stop without one. */
  asks: string;
  quoted?: false;
  answer: string;
  track: Tracked[];
}[] = [
  {
    when: "0–3 sec",
    asks: "Does this solve my problem?",
    answer: "Hero: one headline, 2 buttons",
    track: [
      { event: "book_demo_click", state: "live" },
      { event: "section_viewed", state: "add" },
    ],
  },
  {
    when: "3–10 sec",
    asks: "Who else uses this?",
    answer: "Customer logos",
    track: [{ event: "section_viewed", state: "add" }],
  },
  {
    when: "10–30 sec",
    asks: "How does it work?",
    answer: "Every format flowing into the ERP",
    track: [{ event: "flow_node_clicked", state: "add" }],
  },
  {
    when: "30–60 sec",
    asks: "Will it fit my workflow?",
    answer: "3 feature cards, proof points and a testimonial",
    track: [{ event: "section_viewed", state: "add" }],
  },
  {
    when: "60+ sec",
    asks: "Can I try before committing?",
    answer: "3 free tools",
    track: [{ event: "free_tool_clicked", state: "add" }],
  },
  {
    when: "Decision",
    asks: "Decision point",
    quoted: false,
    answer:
      "“Still Typing Orders Into Your ERP?” and Book a Call, 30 minutes with James",
    track: [
      { event: "calendar_page_view", state: "need" },
      { event: "booking_complete", state: "need" },
    ],
  },
  {
    when: "Then",
    asks: "Objection handling",
    quoted: false,
    answer: "7 FAQs, 3 of them new: go-live time, IT and SPS",
    track: [{ event: "faq_opened", state: "add" }],
  },
];

const TRACK_TEXT = {
  live: "Tracked",
  add: "Add in the build",
  need: "Gap: not tracked",
};

function TrackDot({ state }: { state: Tracked["state"] }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 shrink-0 rounded-full border ${
        state === "live"
          ? "border-site-ink bg-site-ink"
          : state === "need"
            ? "border-site-blue bg-site-blue"
            : "border-site-muted"
      }`}
    />
  );
}

/**
 * The May 18 user flow, rebuilt live: a lane for what the visitor asks,
 * what the page answers with and what gets tracked, stop by stop.
 */
export function UserFlow({ caption }: { caption?: ReactNode }) {
  const lanes = ["Visitor asks", "Page answers", "Track"];
  return (
    <figure>
      <div className="border-t border-site-line md:grid md:grid-cols-[6.5rem_repeat(7,minmax(0,1fr))]">
        {/* Lane names, on the left from 768px. */}
        <div className="hidden md:contents">
          <span />
          {JOURNEY.map((s) => (
            <p
              key={s.when}
              className={`${label} border-l border-site-line px-3 py-3`}
            >
              {s.when}
            </p>
          ))}
          {lanes.map((lane, i) => (
            <div key={lane} className="contents">
              <p className={`${label} border-t border-site-line py-3`}>
                {lane}
              </p>
              {JOURNEY.map((s) => (
                <div
                  key={s.when}
                  className="border-l border-t border-site-line px-3 py-3"
                >
                  {i === 0 && <Asks stop={s} />}
                  {i === 1 && (
                    <p className="text-caption text-site-ink/80">{s.answer}</p>
                  )}
                  {i === 2 && <TrackList items={s.track} />}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Stop by stop on a phone. */}
        <ol className="flex flex-col md:hidden">
          {JOURNEY.map((s) => (
            <li key={s.when} className="border-b border-site-line py-4">
              <p className={label}>{s.when}</p>
              <div className="mt-2">
                <Asks stop={s} />
              </div>
              <p className="mt-1 text-body-sm text-site-ink/80">{s.answer}</p>
              <div className="mt-3">
                <TrackList items={s.track} />
              </div>
            </li>
          ))}
        </ol>
      </div>
      <p className={`${label} mt-4 flex flex-wrap gap-x-6 gap-y-2`}>
        {(["live", "add", "need"] as const).map((state) => (
          <span key={state} className="inline-flex items-center gap-2">
            <TrackDot state={state} />
            {TRACK_TEXT[state]}
          </span>
        ))}
      </p>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

function Asks({ stop }: { stop: (typeof JOURNEY)[number] }) {
  return stop.quoted === false ? (
    <p className="text-caption text-site-muted">{stop.asks}</p>
  ) : (
    <p className="font-serif text-body-sm text-site-ink">“{stop.asks}”</p>
  );
}

function TrackList({ items }: { items: Tracked[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((t) => (
        <li
          key={t.event}
          className="flex items-center gap-2 font-mono text-caption text-site-ink/75"
        >
          <TrackDot state={t.state} />
          <span className="min-w-0">
            {/* Wrap only after an underscore. */}
            {t.event.split("_").map((part, i) => (
              <span key={i}>
                {i > 0 && (
                  <>
                    _<wbr />
                  </>
                )}
                {part}
              </span>
            ))}
            <span className="sr-only">, {TRACK_TEXT[t.state]}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Link to the full May 18 plan, as Erin made it. */
export function FlowPlanLink() {
  return (
    <a
      href={`${PROCESS}/user-flow-measurement.webp`}
      target="_blank"
      rel="noopener noreferrer"
      className={inlineLink}
    >
      Open the original plan
    </a>
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
