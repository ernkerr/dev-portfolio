"use client";

import { useState } from "react";
import AnnotatedPage, {
  type Annotation,
} from "@/components/portfolio-landscape/AnnotatedPage";
import { focusRing, mono } from "@/components/site/links";
import { Caption } from "@/components/site/prose";

// 3 competitors' homepages as they were in May 2026 (Wayback Machine, see
// docs/ordersync-research/landscape.json), with numbered highlights in the
// same viewer as the portfolio redesign's landscape. Boxes are percentages
// of each 1440 × 900 screenshot, measured by eye from the image. The counts
// in the notes are from docs/ordersync-research/landscape.md.

const IMG = "/images/orderSync/landscape";

type Competitor = { name: string; data: Annotation };

function capture(file: string, spots: Annotation["desktop"]["spots"]) {
  const c = { src: `${IMG}/${file}.webp`, width: 1440, height: 900, spots };
  return { desktop: c, mobile: c };
}

const COMPETITORS: Competitor[] = [
  {
    name: "TrueCommerce",
    data: {
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
      ...capture("truecommerce", [
        { x: 5.2, y: 29.5, w: 57, h: 21 },
        { x: 5.2, y: 63.3, w: 13.8, h: 6.4 },
        { x: 62.5, y: 17.8, w: 37.5, h: 60 },
      ]),
    },
  },
  {
    name: "Workist",
    data: {
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
      ...capture("workist", [
        { x: 22.6, y: 19.5, w: 54.8, h: 17 },
        { x: 43.6, y: 51.8, w: 12.6, h: 6.4 },
        { x: 0.5, y: 70, w: 99, h: 15.6 },
      ]),
    },
  },
  {
    name: "Conexiom",
    data: {
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
      ...capture("conexiom", [
        { x: 9.6, y: 36.3, w: 39.6, h: 22.4 },
        { x: 9.6, y: 72.5, w: 12, h: 7.2 },
        { x: 58.8, y: 20.2, w: 31.6, h: 66.8 },
      ]),
    },
  },
];

/** Pick a competitor; its homepage shows with numbered notes on it. */
export default function CompetitorLandscape() {
  const [index, setIndex] = useState(0);
  const active = COMPETITORS[index];
  return (
    <figure>
      <div role="group" aria-label="Competitor" className="mb-4 flex flex-wrap gap-2">
        {COMPETITORS.map((c, i) => (
          <button
            key={c.name}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
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
      {/* A fresh viewer per competitor, so no note stays open across them. */}
      <AnnotatedPage
        key={active.name}
        data={active.data}
        name={active.name}
        kind="homepage"
      />
      <Caption>
        Homepages from the Wayback Machine: Workist on May 10, TrueCommerce on
        May 12 and Conexiom on May 14, 2026. Click a number to read its note.
      </Caption>
    </figure>
  );
}
