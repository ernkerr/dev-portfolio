"use client";

import Image from "next/image";
import { useState } from "react";
import { focusRing, mono } from "@/components/site/links";
import { Caption } from "@/components/site/prose";

// 3 competitors' homepages as they were in May 2026 (Wayback Machine, see
// docs/ordersync-research/landscape.json), with highlighted parts and their
// notes listed underneath, all visible. Hovering or focusing a note lights up
// its box, and hovering a box lights up its note. Boxes are percentages of
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
 * Pick a competitor: its homepage with the parts called out, and every note
 * listed under it. Hovering either side lights up the pair.
 */
export default function CompetitorLandscape() {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const active = COMPETITORS[index];

  return (
    <figure>
      <div
        role="group"
        aria-label="Competitor"
        className="mb-4 flex flex-wrap gap-2"
      >
        {COMPETITORS.map((c, i) => (
          <button
            key={c.name}
            type="button"
            aria-pressed={i === index}
            onClick={() => {
              setIndex(i);
              setHover(null);
            }}
            className={`${mono} border px-3 py-1 text-label uppercase transition-colors ${
              i === index
                ? "border-site-ink bg-site-ink text-site-paper"
                : "border-site-line text-site-ink hover:border-site-ink"
            } ${focusRing}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="relative border border-site-line">
        <Image
          key={active.file}
          src={`${IMG}/${active.file}.webp`}
          alt={active.alt}
          width={1440}
          height={900}
          sizes="(min-width: 1024px) 896px, 100vw"
          className="block h-auto w-full"
        />
        {active.boxes.map((b, i) => (
          <div
            key={i}
            aria-hidden="true"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className={`absolute border-2 transition-colors ${
              hover === i
                ? "border-site-blue bg-site-blue/15"
                : hover === null
                  ? "border-site-blue/70 bg-site-blue/5"
                  : "border-site-blue/30 bg-transparent"
            }`}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
            }}
          >
            <span
              className={`${mono} absolute -left-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-site-blue text-label text-white`}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </div>

      <ol className="mt-4 flex flex-col">
        {active.notes.map((n, i) => (
          <li
            key={n.label}
            tabIndex={0}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className={`flex gap-4 border-b border-site-line py-3 transition-colors ${
              hover === i ? "bg-site-blue/5" : ""
            } ${focusRing}`}
          >
            <span
              aria-hidden="true"
              className={`${mono} mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-site-blue text-label text-white`}
            >
              {i + 1}
            </span>
            <div>
              <p className="font-serif text-column-title text-site-ink">
                {n.label}
              </p>
              <p className="mt-1 text-body-sm text-site-ink/75">{n.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <Caption>
        Homepages from the Wayback Machine: Workist on May 10, TrueCommerce on
        May 12 and Conexiom on May 14, 2026. Hover a note or a box to match them
        up.
      </Caption>
    </figure>
  );
}
