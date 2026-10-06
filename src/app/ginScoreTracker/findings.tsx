import Image from "next/image";
import type { ReactNode } from "react";
import { Caption } from "@/components/site/prose";

// Evidence for the Research findings: other apps' screens as they were in May
// 2025 and real App Store reviews, screenshotted from the App Store's review
// cards with the username hidden. Sources are in landscape.ts.

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

/** One app's screen next to a review of it. */
export function PhoneAndReview({
  phone,
  review,
  caption,
}: {
  phone: { name: string; alt: string; height: number };
  review: ReviewShot;
  caption?: ReactNode;
}) {
  return (
    <figure>
      <div className="grid items-center gap-8 sm:grid-cols-[14rem_1fr]">
        <Image
          src={`${LANDSCAPE}/${phone.name}.webp`}
          alt={phone.alt}
          width={600}
          height={phone.height}
          sizes="14rem"
          className="mx-auto h-auto w-full max-w-56 rounded-phone-screen shadow-float ring-1 ring-black/5"
        />
        <ReviewImage shot={review} />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}
