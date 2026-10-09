import Image from "next/image";
import type { ReactNode } from "react";
import Shine from "@/components/Shine";
import { focusRing, mono } from "@/components/site/links";
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
  // Conexiom shows its product; Workist and TrueCommerce show the navy and
  // the demo button most competitors had.
  const shots = [
    ...LANDSCAPE.filter((s) =>
      ["conexiom", "workist", "truecommerce"].includes(s.name),
    ).map((s) => ({
      src: `${IMG}/landscape/${s.name}.webp`,
      alt: s.alt,
      label: s.label,
      width: 1440,
      height: 900,
    })),
  ];
  return (
    <figure>
      <div className="grid gap-6 sm:grid-cols-2 min-[1328px]:grid-cols-3">
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

const CARD_FINAL = [
  {
    name: "final-front",
    alt: "The light side of the card: James, then a blurred surname and phone number, then OrderSync, centered in a typewriter face on pale gray.",
  },
  {
    name: "final-back",
    alt: "The navy side of the card: James and a blurred surname in a large serif, Founder, a blurred phone number and www.ordersync.io. A vertical BOOK NOW label sits beside a blurred QR code at the bottom left, and a small chrome arrow cursor at the top right.",
  },
];

const CARD_DIRECTIONS = [
  {
    name: "dir-zero-top",
    alt: "Navy card with the chrome O mark in the middle, “Zero Manual Entry. Zero Errors.” at the top left and OrderSync at the bottom right.",
  },
  {
    name: "dir-zero-bottom",
    alt: "Navy card with OrderSync at the top left, the chrome O in the middle and “Zero Errors. Zero Manual Entry.” at the bottom right.",
  },
  {
    name: "dir-zero-white",
    alt: "The same layout with the type in white.",
  },
  {
    name: "dir-zero-sans",
    alt: "Navy card with the chrome O in the middle and “Zero Manual Entry. Zero Errors.” below it in a gray sans serif.",
  },
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
        collected between February and May 2026, including the OrderSync board I
        made on Pinterest.
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

// The 3 buyer personas in DESIGN.md, "from competitor customer data", May 18.
// Titles and company are DESIGN.md's; each quote is checked word
// for word in docs/ordersync-research/stat-check.md. "On the page" says where
// the page speaks to them.
const PERSONAS = [
  {
    name: "Forced into EDI",
    who: "CEO of a consumer goods or food brand",
    quote: "They said it would be 6-8 weeks. It’s been 9 months. And we’re not done",
    source: "Jennifer N., CEO, reviewing SPS Commerce on Capterra, 2022",
    page: "FAQs: “How long does it take to go live?” and “How is this different from SPS Commerce?”",
  },
  {
    name: "Drowning in manual orders",
    who: "Customer service director at a manufacturer or distributor",
    quote:
      "CSRs were constantly struggling with the push and pull of rushing to key in a new order, and then dealing with customer inquiries about existing ones.",
    source: "Darlene Bardin, Genpak, in a Conexiom story, 2022",
    page: "The closing call to action: “Still Typing Orders Into Your ERP?”",
  },
  {
    name: "Outgrown legacy EDI",
    who: "CTO or EDI lead at a brand growing into retail",
    quote: "Sub-par integrations, unresponsive customer service, heinous billing practices",
    source: "Jessica K., VP, reviewing SPS Commerce on Capterra, 2021",
    page: "The headline, “One System for All Your Orders,” and the diagram of every format.",
  },
];

/** The 3 proto-personas as cards: who, their words, the page. */
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
    answer: "“Still Typing Orders Into Your ERP?” and Book a Call, 30 minutes with James",
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
