import Image from "next/image";
import type { ReactNode } from "react";
import { focusRing } from "./links";

// Building blocks for a case study's text, in the 2026 edition's type: body
// copy a step softer than ink with bold lead-ins in full ink, serif subheads
// and numbers, and mono labels. Text keeps to a reading measure (40rem, about
// 75 characters); figures and tables use the full column. They sit inside a
// CaseStudyArticle section.

const strongInk = "[&_strong]:font-medium [&_strong]:text-site-ink";
const body = `text-body text-site-ink/80 ${strongInk}`;
const measure = "max-w-measure";

export const label = "font-mono text-label uppercase text-site-muted";
// A label on a project's brand color: muted gray drops under 4.5:1 on the
// pastel fields, so these use ink.
export const labelOnBrand = "font-mono text-label uppercase text-site-ink/75";

/** A link inside running text, as on About. */
export const inlineLink = `text-site-ink underline decoration-site-line underline-offset-4 transition-colors hover:text-site-blue hover:decoration-site-blue ${focusRing}`;

export function P({ children }: { children: ReactNode }) {
  return <p className={`${body} ${measure}`}>{children}</p>;
}

/** The opening paragraph, a size up from body copy. */
export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className={`${measure} text-lead-sm text-site-ink md:text-lead`}>
      {children}
    </p>
  );
}

/**
 * A figure that runs past the case-study column into the empty space on its
 * right, for things that need room: a board, a map, cards across. The
 * column sits centered in a 1fr | 56rem | 1fr grid with 2rem gaps inside
 * the page's 1.5rem gutters, so wide is half the page's inner width plus
 * half the column, less 1rem to stay clear of a scrollbar. Below 1328px the
 * section list squeezes the side columns, so it stays column width there.
 */
export function Wide({ children }: { children: ReactNode }) {
  return (
    <div className="min-[1328px]:w-[calc((min(100vw,1600px)+53rem)/2-1rem)]">
      {children}
    </div>
  );
}

/** An H3; pass `id` to link to it (it clears the sticky header). */
export function H3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className="mt-10 scroll-mt-24 font-serif text-subhead text-site-ink"
    >
      {children}
    </h3>
  );
}

export function List({
  ordered = false,
  children,
}: {
  ordered?: boolean;
  children: ReactNode;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={`${body} ${measure} space-y-2 pl-6 ${
        ordered
          ? "list-decimal marker:text-site-muted"
          : "list-disc marker:text-site-line"
      }`}
    >
      {children}
    </Tag>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[0.88em]">{children}</code>;
}

/** Short titled points side by side: two, three or four across. */
export function Columns({
  items,
  count = 3,
}: {
  items: { title: ReactNode; text: ReactNode }[];
  count?: 2 | 3 | 4;
}) {
  const cols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[count];
  return (
    <ul className={`grid gap-x-8 gap-y-8 ${cols}`}>
      {items.map((item, i) => (
        <li key={i} className="border-t border-site-line pt-4">
          <p className="font-serif text-column-title text-site-ink">
            {item.title}
          </p>
          <p className={`mt-2 text-body-sm text-site-ink/75 ${strongInk}`}>
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function Figure({
  src,
  alt,
  width,
  height,
  caption,
  crop,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: ReactNode;
  /** Show only the top of the image, this many source pixels tall. */
  crop?: number;
}) {
  return (
    <figure>
      <div
        className="overflow-hidden border border-site-line"
        style={crop ? { aspectRatio: `${width} / ${crop}` } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 896px, 100vw"
          className="h-auto w-full"
        />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className={`${measure} mt-3 text-caption text-site-muted`}>
      {children}
    </figcaption>
  );
}

export function Table({
  head,
  rows,
}: {
  head: ReactNode[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-body-sm leading-normal">
        <thead>
          <tr className="border-b border-site-line">
            {head.map((h, i) => (
              <th
                key={i}
                scope="col"
                className={`${label} py-2 pr-4 align-bottom font-normal`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-site-line">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-3 pr-4 align-top leading-relaxed text-site-ink/80 ${strongInk}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tipId = (name: string) =>
  `tip-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/**
 * A label that says what its number counts: a dotted underline, and the tip on
 * hover or tap. Its parent must be `relative`: the tip spans the parent's
 * width, from 10rem up to 20rem. `id` keeps the tip's id unique on the page.
 */
export function TipLabel({
  children,
  tip,
  id,
}: {
  children: string;
  tip: ReactNode;
  id: string;
}) {
  return (
    <span className="group inline-block">
      <button
        type="button"
        aria-describedby={tipId(id)}
        className={`uppercase underline decoration-dotted underline-offset-4 ${focusRing}`}
      >
        {children}
      </button>
      {/* The padding bridges the gap, so the tip stays open on its way there. */}
      <span
        role="tooltip"
        id={tipId(id)}
        className="invisible absolute left-0 top-full z-10 w-full min-w-40 max-w-xs pt-2 group-focus-within:visible group-hover:visible"
      >
        <span className="block border border-site-line bg-site-paper p-3 font-sans text-caption normal-case tracking-normal text-site-ink/80 shadow-float ring-1 ring-black/5">
          {tip}
        </span>
      </span>
    </span>
  );
}

// One row of facts on wide screens, whatever the count, so a short block
// doesn't leave an empty column.
const FACT_COLUMNS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3",
};

/**
 * Label and value pairs in a row, like the credits at the top of a study. A
 * `tip` says what a value counts: its label gets a dotted underline and shows
 * the tip on hover or tap.
 */
export function Facts({
  items,
}: {
  items: { label: string; value: ReactNode; tip?: ReactNode }[];
}) {
  const columns = FACT_COLUMNS[items.length] ?? FACT_COLUMNS[4];
  return (
    <dl
      className={`grid gap-x-8 gap-y-6 border-t border-site-line pt-5 ${columns}`}
    >
      {items.map((item) => (
        <div key={item.label}>
          <dt className={`relative ${label}`}>
            {item.tip ? (
              <TipLabel id={`fact-${item.label}`} tip={item.tip}>
                {item.label}
              </TipLabel>
            ) : (
              item.label
            )}
          </dt>
          <dd className="mt-2 text-body-sm leading-[1.55] text-site-ink">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// Big numbers are short, so they pair up even on phones.
const STAT_COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

/**
 * A project's headline numbers, set large in serif. A `tip` says what a number
 * counts, on its label, like Facts.
 */
export function Stats({
  items,
}: {
  items: { label: string; value: ReactNode; tip?: ReactNode }[];
}) {
  const columns = STAT_COLUMNS[items.length] ?? STAT_COLUMNS[4];
  return (
    <dl
      className={`grid gap-x-8 gap-y-6 border-t border-site-line pt-5 ${columns}`}
    >
      {items.map((item) => (
        <div key={item.label}>
          <dt className={`relative ${label}`}>
            {item.tip ? (
              <TipLabel id={`stat-${item.label}`} tip={item.tip}>
                {item.label}
              </TipLabel>
            ) : (
              item.label
            )}
          </dt>
          <dd className="mt-2 font-serif text-section-sm text-site-ink md:text-section">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="max-w-measure font-serif text-subhead text-site-ink">
      {children}
    </blockquote>
  );
}

/**
 * A slot for work that is still under way: says what will go here, so it
 * reads as unfinished on purpose and is easy to find before launch.
 */
export function InProgress({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-dashed border-site-muted/50 px-5 py-4">
      <p className={`${label} flex items-center gap-2`}>
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-site-blue"
        />
        In progress: {title}
      </p>
      <p className={`${measure} mt-2 text-body-sm text-site-ink/75`}>
        {children}
      </p>
    </div>
  );
}
