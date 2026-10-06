import Image from "next/image";
import { Caption, label } from "@/components/site/prose";

// Erin's sharpie sketches from before she started building, each next to
// the screen it became. The game screen is today's; the score screen is the
// New Score screen as it shipped in 1.0 (rebuilt from the code).

const IMG = "/images/ginScoreTracker/study";

const PAIRS = [
  {
    sketch: {
      src: `${IMG}/sketches/sketch-game-scan.webp`,
      alt: "Sharpie sketch of the game screen: Back, the opponent’s name and Settings across the top, 2 players with their initials, names and scores, a Knock: 1 button, a Rounds list with Score, Score and Edit on each row, and a big Add Score button.",
      height: 1254,
    },
    screen: {
      src: `${IMG}/now-scoreboard.webp`,
      alt: "The game screen today: You 87 and James 49 under a crown, a Knock: 7 button, and 6 rounds with blue icons for Gin, an undercut and Big Gin.",
      label: "Today",
    },
  },
  {
    sketch: {
      src: `${IMG}/sketches/sketch-score-scan.webp`,
      alt: "Sharpie sketch of the score screen: Winner with You and Opp buttons, a Score field, 3 Bonus buttons, a Total Score field, and Cancel and Save.",
      height: 1146,
    },
    screen: {
      src: `${IMG}/v1-modal.webp`,
      alt: "The styled New Score screen: blue and black buttons with hard black shadows, Gin selected, Bonus: +25 and a total of 34.",
      label: "1.0, June 2025",
    },
  },
];

export default function Sketches() {
  return (
    <figure>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
        {PAIRS.map(({ sketch, screen }) => (
          <div key={sketch.src} className="grid grid-cols-2 items-center gap-4">
            <div>
              <Image
                src={sketch.src}
                alt={sketch.alt}
                width={900}
                height={sketch.height}
                sizes="(min-width: 640px) 14rem, 45vw"
                className="h-auto w-full border border-site-line"
              />
              <p className={`mt-3 text-center ${label}`}>Sketch</p>
            </div>
            <div>
              <Image
                src={screen.src}
                alt={screen.alt}
                width={780}
                height={1688}
                sizes="(min-width: 640px) 14rem, 45vw"
                className="h-auto w-full rounded-phone-screen shadow-float ring-1 ring-black/5"
              />
              <p className={`mt-3 text-center ${label}`}>{screen.label}</p>
            </div>
          </div>
        ))}
      </div>
      <Caption>
        My sharpie sketches from before I started building, next to the screens
        they became.
      </Caption>
    </figure>
  );
}
