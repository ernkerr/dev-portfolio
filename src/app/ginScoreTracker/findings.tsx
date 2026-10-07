import Image from "next/image";
import type { ReactNode } from "react";
import { Caption } from "@/components/site/prose";

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

/** Review cards, 2 across on wider screens. */
export function ReviewShots({
  shots,
  caption,
}: {
  shots: ReviewShot[];
  caption?: ReactNode;
}) {
  return (
    <figure>
      <div className="grid items-start gap-6 md:grid-cols-2">
        {shots.map((shot) => (
          <ReviewImage key={shot.name} shot={shot} />
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/** A close-up from one of my screens, with a caption. */
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
        className="h-auto w-full max-w-sm border border-site-line"
      />
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}
