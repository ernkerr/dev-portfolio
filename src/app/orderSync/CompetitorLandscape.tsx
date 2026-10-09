"use client";

import Image from "next/image";
import { useState } from "react";
import { focusRing, mono } from "@/components/site/links";
import { Caption, label } from "@/components/site/prose";

// 3 competitors' homepages as they were in May 2026 (Wayback Machine, see
// docs/ordersync-research/landscape.json), stacked, with highlighted parts
// whose notes show on hover, keyboard focus or a tap. Boxes are percentages of
// each 1440 × 900 screenshot, measured by eye from the image. The counts in
// the notes are from docs/ordersync-research/landscape.md.

const IMG = "/images/orderSync/landscape";

type Box = { x: number; y: number; w: number; h: number };
type Note = { label: string; note: string };
type Competitor = {
  name: string;
  file: string;
  /** What the screenshot shows, for screen readers. */
  alt: string;
  notes: Note[];
  boxes: Box[];
};

const COMPETITORS: Competitor[] = [
  {
    name: "TrueCommerce",
    file: "truecommerce",
    alt: "TrueCommerce’s homepage: a navy-to-blue band with large swoosh shapes, “Your Supply Chain: Integrated. Automated. Built to Scale.” and an amber Book a Demo button.",
    notes: [
      {
        label: "A headline about the supply chain",
        note: "It says what TrueCommerce is in general, not what it does with orders. 5 of 9 competitors’ headlines did.",
      },
      {
        label: "Book a Demo",
        note: "The main button books a demo. All 7 competitors whose button could be read asked for a demo or a meeting.",
      },
      {
        label: "Shapes, not the product",
        note: "Abstract swooshes fill the hero. Only 1 of 5 heroes showed the product.",
      },
    ],
    boxes: [
      { x: 5.2, y: 29.5, w: 57, h: 21 },
      { x: 5.2, y: 63.3, w: 13.8, h: 6.4 },
      { x: 62.5, y: 17.8, w: 37.5, h: 60 },
    ],
  },
  {
    name: "Workist",
    file: "workist",
    alt: "Workist’s homepage: dark navy with hexagon line art, “Automate order entry – from inbox to ERP within seconds”, a mint Book a meeting button and a row of customer logos.",
    notes: [
      {
        label: "A headline that says what it does",
        note: "Automating order entry, from the inbox to the ERP, in plain words. 5 of 9 competitors’ headlines said what they do with orders.",
      },
      {
        label: "Book a meeting",
        note: "A meeting rather than a demo, but the same ask: talk to someone first.",
      },
      {
        label: "Customer logos",
        note: "Logos right under the hero, the same job OrderSync’s logo strip does.",
      },
    ],
    boxes: [
      { x: 22.6, y: 19.5, w: 54.8, h: 17 },
      { x: 43.6, y: 51.8, w: 12.6, h: 6.4 },
      { x: 0.5, y: 70, w: 99, h: 15.6 },
    ],
  },
  {
    name: "Conexiom",
    file: "conexiom",
    alt: "Conexiom’s homepage: a light gray panel with “Process every order accurately, in seconds.”, an orange Request demo button, and a product card correcting an order line to WIDGET-A, 150 EA and 2,450.00 USD.",
    notes: [
      {
        label: "A headline that says what it does",
        note: "Processing every order accurately, in seconds: what it does with orders, in a few words.",
      },
      {
        label: "Request demo",
        note: "Another demo request, like every competitor whose button could be read.",
      },
      {
        label: "The product, in the hero",
        note: "An order’s lines being checked and corrected. Conexiom was the only 1 of 5 heroes to show the product, and OrderSync’s now does too.",
      },
    ],
    boxes: [
      { x: 9.6, y: 36.3, w: 39.6, h: 22.4 },
      { x: 9.6, y: 72.5, w: 12, h: 7.2 },
      { x: 58.8, y: 20.2, w: 31.6, h: 66.8 },
    ],
  },
];

/**
 * Where a box's note sits, inside the screenshot so it never runs off a
 * phone: under the box, inside a tall box near its top, or above a box low
 * on the page. It starts at the box's left edge unless that would push it
 * past the right.
 */
function notePlace(b: Box) {
  const width = "min(18rem, 100%)";
  const left = `clamp(0%, ${b.x}%, calc(100% - ${width}))`;
  if (b.y + b.h <= 70) return { width, left, top: `calc(${b.y + b.h}% + 8px)` };
  if (b.h > 40) return { width, left, top: `calc(${b.y}% + 8px)` };
  return { width, left, bottom: `calc(${100 - b.y}% + 8px)` };
}

/** One homepage with its boxes; a box's note shows on hover, focus or tap. */
function AnnotatedHomepage({ c }: { c: Competitor }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      <p className={`${label} mb-3`}>{c.name}</p>
      <div className="relative border border-site-line">
        <Image
          src={`${IMG}/${c.file}.webp`}
          alt={c.alt}
          width={1440}
          height={900}
          sizes="(min-width: 1024px) 896px, 100vw"
          className="block h-auto w-full"
        />
        {c.boxes.map((b, i) => (
          <button
            key={i}
            type="button"
            aria-expanded={open === i}
            aria-label={`${i + 1}. ${c.notes[i].label}`}
            onMouseEnter={() => setOpen(i)}
            onMouseLeave={() => setOpen(null)}
            onFocus={() => setOpen(i)}
            onBlur={() => setOpen(null)}
            onClick={() => setOpen(open === i ? null : i)}
            className={`absolute border-2 transition-colors ${
              open === i
                ? "border-site-blue bg-site-blue/15"
                : "border-site-blue/70 bg-site-blue/5"
            } ${focusRing}`}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
            }}
          >
            <span
              aria-hidden="true"
              className={`${mono} absolute -left-3.5 -top-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-site-blue text-label font-medium text-white shadow`}
            >
              {i + 1}
            </span>
          </button>
        ))}
        {open !== null && (
          <div
            role="tooltip"
            className="pointer-events-none absolute z-10 bg-site-ink p-4 text-site-paper shadow-float"
            style={notePlace(c.boxes[open])}
          >
            <p className={`${mono} text-label uppercase text-site-paper/70`}>
              {open + 1}. {c.notes[open].label}
            </p>
            <p className="mt-1 text-body-sm">{c.notes[open].note}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * The 3 homepages one after another, each with its parts called out. Hover a
 * box to read its note.
 */
export default function CompetitorLandscape() {
  return (
    <figure className="flex flex-col gap-10">
      {COMPETITORS.map((c) => (
        <AnnotatedHomepage key={c.name} c={c} />
      ))}
      <Caption>
        Homepages from the Wayback Machine: TrueCommerce on May 12, Workist on
        May 10 and Conexiom on May 14, 2026. Hover a box to read its note.
      </Caption>
    </figure>
  );
}
