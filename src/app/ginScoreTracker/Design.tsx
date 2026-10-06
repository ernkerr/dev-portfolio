import SiteShell from "@/components/site/SiteShell";
import CaseStudyArticle, {
  type CaseStudySection,
} from "@/components/site/CaseStudyArticle";
import {
  Columns,
  Facts,
  H3,
  InProgress,
  inlineLink,
  Lead,
  P,
} from "@/components/site/prose";
import { BuildNote, Review, Screens } from "@/components/site/appStudy";
import LiveBoard from "./LiveBoard";

// Every claim traces back to the gin-score-tracker repo (commits named in
// the research notes), the live App Store listing and its reviews (fetched
// October 2026), and Erin's own words on her old project page. Screens were
// rebuilt from the code at each commit with sample players and scores.
// Research notes: scratchpad research/scoretrackers/gin.md.

const IMG = "/images/ginScoreTracker/study";
const phone = { width: 780, height: 1688 };

const SECTIONS: CaseStudySection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <Lead>
          Gin Score Tracker keeps score for 2-player Gin Rummy: who won each
          hand, the bonuses, and the running total to 100. It was born out of my
          love for playing Gin with family and the need for a better way to keep
          track of our scoring.
        </Lead>
        <P>
          It was my first fully shipped mobile app. It’s been on the{" "}
          <a
            href="https://apps.apple.com/us/app/gin-score-tracker/id6746460027"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            App Store
          </a>{" "}
          since June 2, 2025, and it later became the starting point for Hearts
          and the rest of my score trackers.
        </P>
        <Facts
          items={[
            { label: "Role", value: "Design and build, solo" },
            { label: "Timeline", value: "May 2025 to June 2026" },
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
      "How might paper-and-pen Gin scoring work on a phone for every age?",
    content: (
      <>
        <P>
          We kept score with paper and pen, which makes it hard to look back at
          past games. An app had to work for non-technical players too,
          including older family members and friends who play Gin.
        </P>
        <Columns
          items={[
            {
              title: "1 winner per hand",
              text: "Only the player who wins a hand scores it, so the app should ask who won before it asks for points.",
            },
            {
              title: "Bonuses on top",
              text: "Going Gin adds 25, Big Gin 31 and an undercut 25, so the total isn’t just the number on the cards.",
            },
            {
              title: "House rules",
              text: "Tables play to different targets and bonus values, and a rule change shouldn’t rewrite old games.",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "design",
    title: "Design",
    headline: "Who won, then how much.",
    content: (
      <>
        <H3>The scoring model came before the look</H3>
        <P>
          My first working version, on May 13, 2025, had 2 number boxes per
          round, one for each player. That matched paper but not the game: only
          1 player scores a hand. Two days later, entering a hand became a New
          Score screen that goes in the game’s order: pick the winner, type the
          points, tap a bonus, and see the total. The next day I gave it a look.
        </P>
        <Screens
          screens={[
            {
              src: `${IMG}/first-working.webp`,
              alt: "The first working version: a plain screen titled Game vs James with 2 score boxes, You Score and James Score, above an Add Round button.",
              ...phone,
              label: "May 13, 2025",
            },
            {
              src: `${IMG}/pre-style-modal.webp`,
              alt: "The New Score screen before styling: Winner buttons, a score field, Gin, Big Gin and Undercut, Bonus: +25 and a Total Score.",
              ...phone,
              label: "May 15",
            },
            {
              src: `${IMG}/v1-modal.webp`,
              alt: "The styled New Score screen: blue and black buttons with hard black shadows, Gin selected, Bonus: +25 and a total of 34.",
              ...phone,
              label: "June 2025",
            },
          ]}
          caption="Entering a hand, from the first working version to 1.0. Rebuilt from the code at each commit with sample scores."
        />

        <H3>Neo-brutalism</H3>
        <P>
          Visually, I leaned into a neo-brutalist UI: bold colors, thick
          borders, raw geometry, and a deliberately “unpolished” aesthetic that
          feels both nostalgic and modern. Every button and field has a 2px
          black border and a hard black shadow, the main buttons are 1 bright
          blue, and titles are set in Space Mono. The icon, a jester and the
          word GIN on black, set the look for every score tracker after it.
        </P>

        <H3>Rules per opponent, frozen per game</H3>
        <P>
          Bonus values and the target score are settings, and each game keeps
          the rules it started with, so changing a default later doesn’t rewrite
          old games. In February 2026 I added game options to change the rules
          mid-game; if you change a bonus, the app asks whether to update the
          rounds already played.
        </P>
        <Screens
          screens={[
            {
              src: `${IMG}/now-scoreboard.webp`,
              alt: "The game screen today: You 87 and James 49 under a crown, a Knock: 7 button, and 6 rounds with blue icons for Gin, an undercut and Big Gin.",
              ...phone,
              label: "Game",
            },
            {
              src: `${IMG}/now-options.webp`,
              alt: "The Game Options screen: target score and the Gin, Big Gin and Undercut values, with a Delete Game button.",
              ...phone,
              label: "Game options",
            },
          ]}
          caption="The game screen and its options today. Rebuilt from the code with sample scores."
        />
        <Review
          stars={5}
          quote="Love the little icons for gin or an undercut and that you can change the rules for each opponent since I know people who play different versions of the game."
          who="App Store review, July 2025"
        />
      </>
    ),
  },
  {
    id: "iteration",
    title: "Iteration",
    headline: "A 1-star review found the paywall in the wrong place.",
    content: (
      <>
        <Review
          stars={1}
          quote="This sucks, I can’t actually finish a game, guess I have to delete it."
          who="“Can only play up to 100 points???”, App Store review, May 2026"
        />
        <P>
          Free games went up to 100 points. In version 1.0 the app checked that
          limit when you saved a hand, and opened the paywall instead of saving
          any hand that took a total past 100. The hand that ends a game usually
          does, so most free games couldn’t be finished.
        </P>
        <P>
          The fix moved the paywall to after the win. Scoring is never blocked
          now: you finish the game, see who won, and then get the choice to keep
          playing past 100 with Premium. I made editing and deleting games free
          in the same update, which another reviewer had asked for. Version
          1.0.5 shipped on June 17, 2026, and I replied to the review: “The free
          game is meant to play all the way through so you can try the app
          before buying, and it wasn’t doing that for you.”
        </P>
        <P>
          Try both. Each game is 1 good hand from 100: tap Add Score, pick You,
          choose Gin and save.
        </P>
        <div className="mx-auto grid max-w-64 gap-10 sm:max-w-xl sm:grid-cols-2 sm:gap-8">
          <LiveBoard version="1.0" label="Version 1.0" />
          <LiveBoard version="now" label="Since 1.0.5" />
        </div>
        <Review
          stars={5}
          quote="Thanks for adding the delete function!! Love this tracker. Works great on planes and trains!"
          who="App Store review, edited June 2026, after it first asked for delete"
        />
      </>
    ),
  },
  {
    id: "results",
    title: "Results",
    content: (
      <>
        <P>
          6 versions on the App Store since June 2025, rated 5.0 from 5 ratings
          as of October 2026. It’s free to play, with 1 opponent and games to
          100; Premium unlocks more opponents and games and higher targets.
        </P>
        <Review
          stars={5}
          quote="Got a love a simple, clean app with no ads popping up in your face every 5 seconds. Love how easy this app is to use."
          who="App Store review, June 2026"
        />
        <InProgress title="Numbers">
          Add downloads or Premium conversions from App Store Connect if you
          want them public. The repo has no analytics, so they can only come
          from there.
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
          I learned how to scope a project tightly, prioritize user experience,
          and ship before it’s “perfect.” Choosing a small but meaningful idea
          that solved a real need, in this case for friends and family, made
          development faster and more focused.
        </P>
        <InProgress title="Before a reviewer asks">
          A suggested line, if it’s true for you: “The review taught me that
          where a paywall sits is a design decision. The limit was fine; the
          moment it showed up was wrong.” Also: text scaling (Dynamic Type) has
          been off since July 2025 and dark mode since May 2025. Add why, or
          turn them back on. Also decide how to credit AI help: commits since
          June 2026, including the paywall fix, were co-written with Claude
          Code.
        </InProgress>
        <BuildNote href="/ginScoreTracker">
          React Native and Expo with NativeWind. Games live on the phone, with
          no account and no internet needed.
        </BuildNote>
      </>
    ),
  },
];

export default function Design() {
  return (
    <SiteShell>
      <CaseStudyArticle
        hero={
          <div className="mx-auto max-w-64">
            <LiveBoard version="now" label="Tap Add Score" />
          </div>
        }
        label="Gin Score Tracker • 2025–2026"
        title="Gin Rummy scores, round by round"
        sections={SECTIONS}
      />
    </SiteShell>
  );
}
