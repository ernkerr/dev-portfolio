import Image from "next/image";
import type { ReactNode } from "react";
import { Caption, label } from "@/components/site/prose";

// Evidence for the Research findings: real App Store reviews, screenshotted
// from the App Store's review cards with the username hidden. Sources are in
// landscape.ts.

const LANDSCAPE = "/images/ginScoreTracker/study/landscape";

export type ReviewShot = { name: string; alt: string; height: number };

function ReviewImage({ shot }: { shot: ReviewShot }) {
  return (
    <Image
      src={`${LANDSCAPE}/reviews/${shot.name}.webp`}
      alt={shot.alt}
      width={920}
      height={shot.height}
      sizes="(min-width: 768px) 28rem, 100vw"
      className="h-auto w-full"
    />
  );
}

/** Review cards, 2 across on wider screens, or 1 centered. */
export function ReviewShots({
  shots,
  caption,
}: {
  shots: ReviewShot[];
  caption?: ReactNode;
}) {
  return (
    <figure>
      <div
        className={
          shots.length === 1
            ? "mx-auto max-w-md"
            : "grid items-start gap-6 md:grid-cols-2"
        }
      >
        {shots.map((shot) => (
          <ReviewImage key={shot.name} shot={shot} />
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/** A close-up from one of my screens, centered, with a caption. */
export function Detail({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: ReactNode;
}) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="24rem"
        className="mx-auto block h-auto w-full max-w-sm border border-site-line"
      />
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

type Shot = { src: string; alt: string; width: number; height: number };

/**
 * Two crops of the same screen, side by side. Both are 3x iPhone
 * screenshots, so each is drawn at its own share of the widest one to keep
 * them at the same scale.
 */
export function BeforeAfter({
  before,
  after,
  caption,
}: {
  before: Shot;
  after: Shot;
  caption?: ReactNode;
}) {
  const widest = Math.max(before.width, after.width);
  return (
    <figure>
      <div className="grid items-end gap-6 sm:grid-cols-2">
        {(
          [
            ["Before", before],
            ["After", after],
          ] as const
        ).map(([name, shot]) => (
          <div key={name}>
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 640px) 22rem, 100vw"
              className="h-auto"
              style={{ width: `${(shot.width / widest) * 100}%` }}
            />
            <p className={`mt-3 ${label}`}>{name}</p>
          </div>
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}
