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
import { Detail, ReviewShots } from "./findings";
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
          Gin Score Tracker keeps score for 2-player Gin Rummy, including who
          won each hand, the bonuses, and the running total to 100. It was born
          out of my love for playing Gin with family and the need for a better
          way to keep track of our scoring.
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
          The “grandpa test,” as I call it. If my grandpa can understand it,
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
        <P>
          I started with existing behavior, how players already kept score on
          paper.
        </P>
        <InProgress title="Our paper sheets">
          What our paper sheets showed, how we laid out the columns, totals and
          bonuses, and what was hard to look back at.
        </InProgress>
        <figure>
          <div className="flex aspect-[4/3] max-w-measure items-center justify-center border border-dashed border-site-muted/50 text-caption text-site-muted">
            Photo of our paper scorecard
          </div>
          <Caption>
            Paper set the mental model and the structure, with a column for each
            player, a row for each hand, and a running total. The app keeps that
            structure so it feels familiar.
          </Caption>
        </figure>

        <P>
          Then I did a competitive analysis where users were already looking for
          a solution, the App Store. I mapped every app that keeps score for Gin
          played with real cards.
        </P>

        <H3>Most of them hadn’t changed in years</H3>
        <P>
          At least 84 apps on the App Store let you play Gin on your phone, but
          only 5 kept score for a game at a real table. 3 of those 5 hadn’t been
          updated in over 18 months. GinSC’s last update was in November 2022,
          and by 2025 it crashed as soon as it opened. To differentiate, I
          lowered the barrier to entry with a free trial game instead of payment
          up front, a lesson from the paid app that crashed.
        </P>
        <ReviewShots
          shots={[
            {
              name: "ginsc-crash",
              alt: "A 1-star App Store review of GinSC titled Crashes on launch, from May 24, 2025: “Looked hopeful, paid and app won’t open on iPhone. Launches and then closes immediately. Could not find support option on web page”",
              height: 254,
            },
          ]}
          caption="A review of GinSC from May 2025."
        />

        <H3>Players wanted their own rules</H3>
        <P>
          Customization came up again and again in reviews, like a different
          target score or different bonus values. Gin Rummy Score Tracker’s
          developer promised both in January 2023, and they never shipped, so I
          designed for flexibility across play styles.
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
          ]}
          caption="Reviews of Gin Rummy Score Tracker from 2023 and 2024."
        />

        <H3>The free ones were built for something else</H3>
        <P>
          None of the free options fit the use case. Ginscorer Pro is a grid for
          2 to 4 players playing for money, and Rummy Score Sheet is built for a
          different Rummy, with reviews dominated by complaints about ads. So I
          kept mine to 2 players and left out ads.
        </P>
        <Screens
          screens={[
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
          Gin Rummy Score Tracker had the best usability, for me and for the
          other users I asked. Its flow matched their mental model. With pen and
          paper, 5 of the 5 people I asked counted the cards first and added the
          bonus after, and the app asks for the winner, then the points, then
          the bonus. Its pain points were $2.99 up front, fixed rules, and no
          updates since May 2023. I kept that flow and designed around its pain
          points.
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
          sketched the 2 screens I’d use most, the game and entering a score.
        </P>
        <Sketches />
        <H3>From sketch to code</H3>
        <P>
          My first working version had 2 number boxes per round, one for each
          player. That matched paper but not the game, since only 1 player
          scores a hand. In my next iteration, entering a hand became a New
          Score screen that goes in the game’s order. You pick the winner, type
          the points, tap a bonus, and see the total. Then I gave it a look.
        </P>
        <Screens
          screens={[
            {
              src: `${IMG}/first-working.webp`,
              alt: "The first working version: a plain screen titled Game vs James with 2 score boxes, You Score and James Score, above an Add Round button.",
              ...phone,
              label: "First version",
            },
            {
              src: `${IMG}/pre-style-modal.webp`,
              alt: "The New Score screen before styling: Winner buttons, a score field, Gin, Big Gin and Undercut, Bonus: +25 and a Total Score.",
              ...phone,
              label: "Next iteration",
            },
            {
              src: `${IMG}/v1-modal.webp`,
              alt: "The styled New Score screen: blue and black buttons with hard black shadows, Gin selected, Bonus: +25 and a total of 34.",
              ...phone,
              label: "1.0",
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
    headline: "People were adding the bonus twice",
    content: (
      <>
        <P>
          When people tested early builds, I noticed them typing scores that
          already included the bonus, so it got counted twice. So I added the
          bonus in blue under the buttons, with the total underneath, to make
          sure people knew the points were already being added.
        </P>
        <Detail
          src={`${IMG}/bonus-line.webp`}
          alt="The New Score screen with You as the winner, a score of 9 and Gin picked. Under the bonus buttons, Bonus: +25 shows in blue, and the Total Score field shows 34."
          width={780}
          height={1018}
          caption="Pick a bonus and it shows in blue, with the total under it."
        />

        <H3>4 of 5 people wanted bigger buttons</H3>
        <P>
          After launch, 4 of the 5 people I asked said the buttons needed to be
          bigger. So every main button is now full width and 64px tall, and the
          knock dialog got bigger too. Bigger buttons are easier to hit,
          especially for older players.
        </P>
        <Screens
          screens={[
            {
              src: `${IMG}/knock-before.webp`,
              alt: "The Set Knock Value dialog before: a knock value of 7 with small X, Cancel and Save buttons.",
              ...phone,
              label: "Before",
            },
            {
              src: `${IMG}/knock-after.webp`,
              alt: "The Set Knock Value dialog after: the same dialog with bigger X, Cancel and Save buttons.",
              ...phone,
              label: "After",
            },
          ]}
          caption="The knock dialog before and after. Rebuilt from the code with sample scores."
        />

        <H3>A 1-star review found the paywall in the wrong place</H3>
        <Review
          stars={1}
          quote="This sucks, I can’t actually finish a game, guess I have to delete it."
          who="“Can only play up to 100 points???”, App Store review, May 2026"
        />
        <P>
          Free games went up to 100 points. At launch, the app checked that
          limit when you saved a hand, and opened the paywall instead of saving
          any hand that took a total past 100. The hand that ends a game usually
          does, so most free games couldn’t be finished.
        </P>
        <P>
          The fix moved the paywall to after the win. Scoring is never blocked
          now. You finish the game, see who won, and then get the choice to keep
          playing past 100 with Premium. The fix shipped in June, and I replied
          to the review, “The free game is meant to play all the way through so
          you can try the app before buying, and it wasn’t doing that for you.”
        </P>

        <H3>Another review asked for a feature I already had</H3>
        <Review
          stars={5}
          quote="Needs a delete (Del) deletion to delete started but never finished. … Thanks for adding the delete function!! Love this tracker. Works great on planes and trains!"
          who="App Store review, edited June 2026"
        />
        <P>
          Delete was already in the app, but it was hidden in Game Options
          behind the settings gear, and only for Premium. In the same June
          update I made editing and deleting games free, and the reviewer found
          it and updated their review.
        </P>
      </>
    ),
  },
  {
    id: "decisions",
    title: "Design decisions",
    content: (
      <>
        <H3>What I took from the other apps</H3>
        <P>I learned from the other apps what to keep and what to fix.</P>
        <Columns
          count={2}
          items={[
            {
              title: "Winner first",
              text: "The people I asked counted the cards before adding the bonus, and Gin Rummy Score Tracker followed that order, so New Score does too.",
            },
            {
              title: "Bonuses in one tap",
              text: "The general score keepers left the Gin math to players, so Gin, Big Gin and Undercut are one tap each and show as icons in the round history.",
            },
            {
              title: "Free to try",
              text: "GinSC and Gin Rummy Score Tracker charged before you could open them, and GinSC crashed after I paid, so a free game plays all the way through before Premium comes up.",
            },
            {
              title: "2 players, 1 screen per hand",
              text: "Ginscorer Pro was a grid for groups playing for money, so mine is made for 2 players, with 1 screen per hand.",
            },
            {
              title: "No ads",
              text: "Most of Rummy Score Sheet’s reviews were complaints about ads, so Gin Score Tracker has none.",
            },
            {
              title: "Fix any round",
              text: "A Rummy Score Sheet review asked for a way to edit scores, so every round has a pencil to fix it.",
            },
          ]}
        />

        <H3>Neo-brutalism</H3>
        <P>
          Visually, I leaned into a neo-brutalist UI with bold colors, thick
          borders, raw geometry, and a deliberately “unpolished” aesthetic that
          feels both nostalgic and modern. Every button and field has a 2px
          black border and a hard black shadow, the main buttons are 1 bright
          blue, and titles are set in Space Mono. The icon, a jester and the
          word GIN on black, set the look for every score tracker after it.
        </P>

        <H3>Rules per opponent, frozen per game</H3>
        <P>
          Reviews of the other apps kept asking for their own rules, so bonus
          values and the target score are settings, and each game keeps the
          rules it started with, so changing a default later doesn’t rewrite old
          games. In February 2026 I added game options to change the rules
          mid-game. If you change a bonus, the app asks whether to update the
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
          100. Premium unlocks more opponents and games and higher targets.
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
          A suggested line, if it’s true for you, “The review taught me that
          where a paywall sits is a design decision. The limit was fine. The
          moment it showed up was wrong.” Also, text scaling (Dynamic Type) has
          been off since July 2025 and dark mode since May 2025. Add why, or
          turn them back on. Also decide how to credit AI help. Commits since
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
