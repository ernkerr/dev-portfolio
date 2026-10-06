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
  label,
  Lead,
  P,
} from "@/components/site/prose";
import { BuildNote, Review, Screens } from "@/components/site/appStudy";
import { PhoneAndReview, ReviewShots } from "./findings";
import LiveBoard from "./LiveBoard";
import Sketches from "./Sketches";

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
              title: "One winner",
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
    id: "goal",
    title: "Goal",
    headline: "Everyone in my family should be able to use it.",
    content: (
      <div className="border-t border-site-line pt-5">
        <p className={label}>How I’ll know I’ve succeeded</p>
        <p className="mt-3 max-w-measure font-serif text-column-title text-site-ink">
          The “grandpa test,” as I call it: if my grandpa can understand it,
          anyone can.
        </p>
      </div>
    ),
  },
  {
    id: "research",
    title: "Research",
    content: (
      <>
        <P>I started with how users were already keeping score, on paper.</P>
        <InProgress title="Our paper sheets">
          What our paper sheets showed: how we laid out the columns, totals and
          bonuses, and what was hard to look back at.
        </InProgress>
        <figure>
          <div className="flex aspect-[4/3] max-w-measure items-center justify-center border border-dashed border-site-muted/50 text-caption text-site-muted">
            Photo of our paper scorecard
          </div>
          <Caption>
            Our paper scorecards set the mental model: a column for each player,
            a row for each hand, and a running total. The app keeps that
            structure.
          </Caption>
        </figure>

        <P>
          Then I went to where users were already looking for a solution, the
          App Store. I found every app that keeps score for Gin played with real
          cards.
        </P>
        <P>
          In the reviews of other apps, I found things users wanted, like the
          ability to use other house rules, so I added that to my design to
          allow flexibility for other play styles.
        </P>

        <H3>Players wanted their own rules</H3>
        <P>
          Reviews kept asking for a different target score or different bonus
          values. Gin Rummy Score Tracker’s developer replied in January 2023
          that both were coming, and they never shipped.
        </P>
        <ReviewShots
          shots={[
            {
              name: "grst-house-rules",
              alt: "A 5-star App Store review of Gin Rummy Score Tracker titled Great start, from January 2, 2023, asking for customizations for their house rules: an option to change the target points (sometimes they play to 200 instead of 100) and a double points bonus. The developer replied that they were planning to add options for the target points and the value of bonuses.",
              height: 558,
            },
            {
              name: "grst-250",
              alt: "A 2-star App Store review of Gin Rummy Score Tracker titled Not happy, from January 1, 2024: “It’s a beautifully designed app with no customization. We like to play til 250, this declares winner after 100, and you can’t change it.”",
              height: 362,
            },
            {
              name: "ginsc-undercut",
              alt: "A 2-star App Store review of GinSC titled Ok but, from March 20, 2010: “Would have got 5 stars IF you could customise the points systems used. I play with 10pt bonus for undercut. This means I can't use this app propperly”",
              height: 288,
            },
          ]}
          caption="Reviews of Gin Rummy Score Tracker from 2023 and 2024, and of GinSC from 2010."
        />

        <H3>Most of them hadn’t changed in years</H3>
        <P>
          At least 84 apps on the App Store let you play Gin on your phone, but
          only 5 kept score for a game at a real table. 3 of those 5 hadn’t been
          updated in over 18 months. GinSC’s last update was in November 2022,
          and by 2025 it crashed as soon as it opened. I set my app apart by
          providing a free trial game instead of asking for payment up front,
          which I learned from the one that crashed.
        </P>
        <PhoneAndReview
          phone={{
            name: "ginsc",
            alt: "GinSC: 2 green player columns of scores with Knocker and Undercut notes, and a list to pick the hand: Big Gin, Gin, or 1 to 8.",
            height: 1298,
          }}
          review={{
            name: "ginsc-crash",
            alt: "A 1-star App Store review of GinSC titled Crashes on launch, from May 24, 2025: “Looked hopeful, paid and app won’t open on iPhone. Launches and then closes immediately. Could not find support option on web page”",
            height: 254,
          }}
        />

        <H3>The free ones were built for something else</H3>
        <P>
          Game ScoreKeeper+ adds up whatever you type, for any game. Ginscorer
          Pro is a grid for 2 to 4 players playing for money. Rummy Score Sheet
          is for a different Rummy, and most of its reviews were about ads.
        </P>
        <Screens
          screens={[
            {
              src: `${IMG}/landscape/game-scorekeeper.webp`,
              alt: "Game ScoreKeeper+: a plain list of 4 players and their scores, each with a plus button, and Add Player and Reset buttons.",
              width: 600,
              height: 1300,
              label: "Game ScoreKeeper+",
            },
            {
              src: `${IMG}/landscape/ginscorer-pro.webp`,
              alt: "Ginscorer Pro: a dark Game Score grid with 6 team columns and a Melds column, above Score, Games and Main Menu buttons.",
              width: 600,
              height: 1304,
              label: "Ginscorer Pro",
            },
            {
              src: `${IMG}/landscape/rummy-score-sheet.webp`,
              alt: "Rummy Score Sheet: a red Scoring Sheet with a blue panel where each of 4 players gets a score box and D, M, F and R buttons, with Close and Add Scores.",
              width: 600,
              height: 1299,
              label: "Rummy Score Sheet",
            },
          ]}
        />

        <H3>The closest one already asked who won first</H3>
        <P>
          I found Gin Rummy Score Tracker to be the easiest to use, not just for
          me but for other users I asked as well. When taking score with pen and
          paper, 5 of the 5 people I asked counted the cards first, then added
          the bonus after. This app mimicked this behavior by first asking for
          the winner, then the points, then the bonus. But it cost $2.99 up
          front, its rules were fixed, and it hadn’t been updated since May
          2023.
        </P>
        <Screens
          screens={[
            {
              src: `${IMG}/landscape/gin-rummy-score-tracker-tall.webp`,
              alt: "Gin Rummy Score Tracker: a sheet with Winner (You or Kate), a Score of 13, Bonus with Big Gin selected, a Total of 44 Points and Save Round 4.",
              width: 600,
              height: 1300,
              label: "Gin Rummy Score Tracker",
            },
            {
              src: `${IMG}/v1-modal.webp`,
              alt: "Gin Score Tracker’s New Score screen in 1.0: blue and black buttons with hard black shadows, Gin selected, Bonus: +25 and a total of 34.",
              ...phone,
              label: "Mine, 1.0",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "ideation",
    title: "Ideation",
    headline: "Who won, then how much.",
    content: (
      <>
        <P>
          Before writing any code, I took a sharpie and a blank page and
          sketched the 2 screens I’d use most: the game and entering a score.
        </P>
        <Sketches />
        <H3>From sketch to code</H3>
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
      </>
    ),
  },
  {
    id: "testing",
    title: "Prototyping & testing",
    content: (
      <>
        <H3>Testing with family</H3>
        <InProgress title="Before launch">
          Who tested the early builds, what you saw or heard, and what you
          changed because of it.
        </InProgress>
        <H3>A 1-star review found the paywall in the wrong place</H3>
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
    id: "decisions",
    title: "Design decisions",
    content: (
      <>
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
