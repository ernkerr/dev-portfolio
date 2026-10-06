import Image from "next/image";
import SiteShell from "@/components/site/SiteShell";
import CaseStudyArticle, {
  type CaseStudySection,
} from "@/components/site/CaseStudyArticle";
import {
  Caption,
  Columns,
  Facts,
  H3,
  InProgress,
  inlineLink,
  Lead,
  P,
  label,
} from "@/components/site/prose";
import { BrandField, BuildNote, Screens } from "@/components/site/appStudy";
import LiveTable from "./LiveTable";

// Every claim traces back to the hearts repo, the score-tracker-boilerplate
// and sibling repos (commits in the research notes), the live App Store
// listings (fetched October 2026) and Erin's own words on her old project
// page. Screens were rebuilt from the code at each commit with a sample
// table. Research notes: scratchpad research/scoretrackers/hearts.md and
// family.md.

const IMG = "/images/heartsScoreTracker/study";
const BG = "#F4C6B8";
const phone = { width: 780, height: 1688 };

const ICONS = [
  {
    src: "icon-gin",
    name: "Gin",
    alt: "Gin Score Tracker icon: a jester and the word GIN on black.",
  },
  {
    src: "icon-hearts",
    name: "Hearts",
    alt: "Hearts Score Tracker icon: 3 fanned cards with an ace of hearts on black.",
  },
  {
    src: "icon-spades",
    name: "Spades",
    alt: "Spades Score Tracker icon: a spade on black.",
  },
  {
    src: "icon-canasta",
    name: "Canasta",
    alt: "Canasta Score Tracker icon: a crown with a club on black.",
  },
];

const SECTIONS: CaseStudySection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <Lead>
          Hearts Score Tracker keeps score for a table of 3 to 5 players: every
          hand, the Queen of Spades, shooting the moon, and who’s lowest when
          someone hits 100.
        </Lead>
        <P>
          I built it on the same foundation as{" "}
          <a href="/ginScoreTracker" className={inlineLink}>
            Gin Score Tracker
          </a>
          , and it was on the{" "}
          <a
            href="https://apps.apple.com/us/app/hearts-score-tracker/id6755978632"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            App Store
          </a>{" "}
          2 days after my first commit. Then its code became the base for the
          rest of my score trackers.
        </P>
        <Facts
          items={[
            { label: "Role", value: "Design and build" },
            { label: "Timeline", value: "November 2025 to August 2026" },
            { label: "Platform", value: "iPhone and iPad" },
          ]}
        />
      </>
    ),
  },
  {
    id: "problem",
    title: "Problem",
    headline:
      "How might a score tracker built for 2 players work for a whole table?",
    content: (
      <>
        <P>
          Hearts Score Tracker was built to solve the same core problem as Gin
          Score Tracker, replacing pen-and-paper scoring, but for a game with
          very different rules and dynamics.
        </P>
        <Columns
          items={[
            {
              title: "Everyone scores every hand",
              text: "Gin has 1 winner per hand. In Hearts, all 3 to 5 players take points every hand.",
            },
            {
              title: "Lowest wins",
              text: "Each heart is 1 point and the Queen of Spades is 13. The game ends when someone reaches 100, and the lowest total wins.",
            },
            {
              title: "Shooting the moon",
              text: "Take every penalty card and the hand flips: you score 0 and everyone else scores 26.",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "design",
    title: "Design",
    headline: "Every player on one screen.",
    content: (
      <>
        <H3>From 1 opponent to a table</H3>
        <P>
          Gin is built around 1 opponent, with your score and theirs. Hearts
          needed a game with any number of players and a score for each of them
          every round, so the scoreboard became a column per player with their
          color, total and a gold crown on the lowest. The plan for the
          conversion suggested starting with 2-player Hearts as the easier
          version. I built 3 to 5 players instead.
        </P>

        <H3>Round entry, redesigned the same day</H3>
        <P>
          My first draft on December 1, 2025 gave every player a big number box,
          with a separate “Shoot the moon?” section underneath that explained
          the rule. Rounds were a stack of cards, and the win screen said “YOU
          WINS!”
        </P>
        <P>
          Later that day, each player was a row you tap. The selected row opens
          a score box and 2 toggles right beside it: ♠ adds the Queen of
          Spades’ 13 points, and ☾ shoots the moon and fills in the whole table,
          0 for the shooter and 26 for everyone else. The rounds became a grid
          with a column per player, and the win became a yellow WINNER card.
          That’s the version that shipped the next day. The demo at the top of
          this page is rebuilt from today’s version of it.
        </P>
        <Screens
          bg={BG}
          screens={[
            {
              src: `${IMG}/draft-round.webp`,
              alt: "The first draft’s New Round screen: a large number box for each of 4 players, with a Shoot the Moon? section below explaining the rule.",
              ...phone,
              label: "First draft",
            },
            {
              src: `${IMG}/v1-moon.webp`,
              alt: "The 1.0 round screen: tappable player rows, the selected one with a score box and spade and moon toggles; the moon is on, so the other 3 players show 26.",
              ...phone,
              label: "Shipped",
            },
          ]}
          caption="Entering a round on December 1, 2025: the first draft and the version that shipped. Rebuilt from the code with a sample table."
        />
        <Screens
          bg={BG}
          screens={[
            {
              src: `${IMG}/draft-winner.webp`,
              alt: "The first draft’s end of game: a green YOU WINS! banner above a list of round cards.",
              ...phone,
              label: "First draft",
            },
            {
              src: `${IMG}/v1-winner.webp`,
              alt: "The shipped end of game: a yellow card with WINNER in a black plate and YOU below it, above the scoreboard grid.",
              ...phone,
              label: "Shipped",
            },
          ]}
          caption="The end of a game, the same day."
        />
        <InProgress title="Why the redesign">
          Add what made you change it so fast: did you play a round with the
          first draft?
        </InProgress>
      </>
    ),
  },
  {
    id: "system",
    title: "System",
    headline: "One app became a family.",
    content: (
      <>
        <P>
          Building Hearts from Gin showed which parts were the game and which
          were the app. In January 2026 I pulled the shared parts out of Hearts
          into a score-tracker base: the screens, storage, purchases and the
          look. Each game shrinks to a small module that says how many people
          play, how a round is scored and who wins, whether that’s the lowest
          total, the highest or an exact number.
        </P>
        <P>
          In June 2026 a game registry made adding a game a matter of writing
          that module and registering it, with no changes to the screens. Spades
          and Canasta each went from first commit to the App Store in about 10
          days. The same base also became Desk Yoga, a stretching app.
        </P>
        <figure>
          <BrandField bg="#111111" aspect="aspect-[16/7]">
            <ul className="flex gap-[6%] px-[8%]">
              {ICONS.map((i) => (
                <li key={i.src} className="flex flex-col items-center gap-3">
                  <Image
                    src={`${IMG}/${i.src}.webp`}
                    alt={i.alt}
                    width={256}
                    height={256}
                    className="w-16 rounded-app-icon ring-1 ring-white/10 sm:w-24"
                  />
                  <span className={`${label} text-white/60`}>{i.name}</span>
                </li>
              ))}
            </ul>
          </BrandField>
          <Caption>
            The 4 score trackers on the App Store. Gin’s icon set the look for
            the rest: a black field with red and cream.
          </Caption>
        </figure>
        <InProgress title="Credit for the system">
          Since June 2026 the family has been built with Claude Code agents
          (every Spades commit, most of Canasta’s). Say what you designed and
          decided, and what the agents built. The 2025 Gin and Hearts work has
          no AI co-authors.
        </InProgress>
      </>
    ),
  },
  {
    id: "results",
    title: "Results",
    content: (
      <>
        <P>
          Hearts went from first commit to the App Store in 2 days, with 23
          commits in about 23 hours. It has had 3 public versions since December
          2025 and is rated 5.0 from 2 ratings as of October 2026. Across the
          family, 4 score trackers are live, with 9 ratings, all 5 stars.
        </P>
        <InProgress title="Numbers">
          Add downloads or Premium conversions from App Store Connect if you
          want them public; the apps have no analytics. The App Store
          description promises streaks and stats the app doesn’t have yet:
          rewrite it or build them.
        </InProgress>
      </>
    ),
  },
  {
    id: "reflection",
    title: "Reflection",
    content: (
      <>
        <P>
          Building Hearts Score Tracker reinforced the value of reusable
          architecture and thoughtful abstraction. Balancing code reuse with
          flexibility meant carefully separating shared components from
          game-specific logic, so the app felt purpose-built rather than reused.
        </P>
        <P>
          It also showed me how small, focused products can compound over time
          when built with maintainability and iteration in mind.
        </P>
        <InProgress title="A next step to consider">
          The design tokens added to the base in January 2026 (spacing, radii,
          type and shadows) aren’t used yet; every style is written inline, so a
          change to the look has to be made in every app. If moving onto the
          tokens is the plan, it’s a good line to end on.
        </InProgress>
        <BuildNote href="/heartsScoreTracker">
          React Native and Expo with NativeWind, on the same base as Gin. Games
          live on the phone, with no account needed.
        </BuildNote>
      </>
    ),
  },
];

export default function Design() {
  return (
    <SiteShell>
      <CaseStudyArticle
        hero={<LiveTable />}
        label="Hearts Score Tracker • 2025–2026"
        title="Hearts scoring for the whole table"
        sections={SECTIONS}
      />
    </SiteShell>
  );
}
