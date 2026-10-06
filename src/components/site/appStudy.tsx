import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Caption, inlineLink, label } from "./prose";

// Figures for the app case studies (Carpoolio, Group Sing Along, Gin and
// Hearts). Like the home tiles, app art sits on the project's own brand color
// with one thing on it: real screens or a real component, never a whole page
// shot on white. Everything else stays square and hairlined.

/** A project's brand-colored field with one thing centered on it. */
export function BrandField({
  bg,
  aspect = "aspect-[16/10]",
  className = "",
  children,
}: {
  /** CSS background: the project's brand color. */
  bg: string;
  /** Tailwind aspect class for the field. */
  aspect?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${aspect} ${className}`}
      style={{ background: bg }}
    >
      {children}
    </div>
  );
}

export type Screen = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Short label under the screen, e.g. "Round 1" or "2024". */
  label?: string;
};

/**
 * App screens side by side on the brand field. Phones get a phone's rounded
 * screen corners (rounded-phone-screen) so they read as screens, not cards.
 */
export function Screens({
  bg,
  screens,
  caption,
  aspect,
}: {
  bg: string;
  screens: Screen[];
  caption?: ReactNode;
  aspect?: string;
}) {
  // Wider fields for more screens, so each one stays a readable size.
  const field =
    aspect ??
    (screens.length >= 3
      ? "aspect-[4/5] sm:aspect-[16/10]"
      : "aspect-[4/5] sm:aspect-[16/11]");
  return (
    <figure>
      <BrandField bg={bg} aspect={field}>
        <div className="flex h-[84%] items-center justify-center gap-[4%] px-[6%]">
          {screens.map((s) => (
            <div key={s.src} className="flex h-full flex-col items-center">
              <Image
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                sizes="(min-width: 1024px) 300px, 33vw"
                className="h-full w-auto rounded-phone-screen shadow-float ring-1 ring-black/5"
              />
            </div>
          ))}
        </div>
      </BrandField>
      {screens.some((s) => s.label) && (
        <div
          className="mt-3 grid gap-[4%] px-[6%]"
          style={{
            gridTemplateColumns: `repeat(${screens.length}, minmax(0, 1fr))`,
          }}
        >
          {screens.map((s) => (
            <p key={s.src} className={`${label} text-center`}>
              {s.label}
            </p>
          ))}
        </div>
      )}
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/** A real App Store review or user quote, in the reviewer's own words. */
export function Review({
  quote,
  who,
  stars,
}: {
  quote: ReactNode;
  /** Who said it and where, e.g. "App Store review, March 2025". */
  who: string;
  /** Star rating out of 5, if it's a review. */
  stars?: number;
}) {
  return (
    <figure className="max-w-measure border-l border-site-line pl-5">
      {stars !== undefined && (
        <p
          className="mb-2 text-body-sm tracking-[0.15em] text-site-ink"
          aria-label={`${stars} out of 5 stars`}
        >
          {"★".repeat(stars)}
          <span className="text-site-line">{"★".repeat(5 - stars)}</span>
        </p>
      )}
      <blockquote className="font-serif text-column-title text-site-ink">
        “{quote}”
      </blockquote>
      <figcaption className="mt-2 text-caption text-site-muted">
        {who}
      </figcaption>
    </figure>
  );
}

/**
 * A short note on how the project was built, pointing to the engineering
 * write-up. The engineering supports the design story; it doesn't lead it.
 */
export function BuildNote({
  href,
  children,
}: {
  /** The case study's own URL; the note links to its engineering side. */
  href: string;
  children: ReactNode;
}) {
  return (
    <div className="max-w-measure border-t border-site-line pt-5">
      <p className={label}>How I built it</p>
      <p className="mt-3 text-body-sm text-site-ink/75">
        {children}{" "}
        <Link href={`${href}?side=engineer`} className={inlineLink}>
          The engineering side
        </Link>{" "}
        has the details.
      </p>
    </div>
  );
}
