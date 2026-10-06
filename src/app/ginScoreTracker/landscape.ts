// The apps that kept score for Gin on the US App Store before Erin started
// building Gin Score Tracker (first working version May 13, 2025), as they
// were then. Card Game Scoring, the 5th, has no screenshot from then, so it's
// left out. Rummy Score Sheet keeps score for a Rummy with drops, not Gin, so
// it's here to compare but not in the counts. Facts come from
// each app's App Store listing, version history and reviews, and archived
// listings (research notes: scratchpad gin-landscape/notes.md, October 2026).
// Screenshots come from archived App Store pages (GinSC March 2024, Game
// ScoreKeeper+ January 2025, Rummy Score Sheet November 2025, each showing the
// version live in May 2025) or from listings unchanged since then. Gin Rummy
// Score Tracker's was taken on a shorter iPhone, so its gray backdrop is
// extended to match the others. The "took" lines are drafts for Erin to rewrite in her own words. Reviews
// are only the ones from before the launch that asked for something Gin Score
// Tracker went on to do, as screenshots of the App Store's own review cards
// with the reviewer's username hidden. The 2 quoted under "Using the apps"
// are left out.

export type LandscapeApp = {
  slug: string;
  name: string;
  /** The app's App Store page. */
  href: string;
  kind: "Made for Gin" | "Made for Rummy" | "Any game";
  released: string;
  /** What the app is and how it works. */
  summary: string;
  /** Erin's take on it, shown as the caption under its reviews. */
  took: string;
  /** The app's screen in May 2025. */
  shot: { src: string; alt: string; height: number };
  /** Reviews from before June 2, 2025 that asked for something I built. */
  reviews: { src: string; alt: string; height: number }[];
};

const IMG = "/images/ginScoreTracker/study/landscape";

export const APPS: LandscapeApp[] = [
  {
    slug: "ginsc",
    name: "GinSC",
    href: "https://apps.apple.com/us/app/ginsc/id302321759",
    kind: "Made for Gin",
    released: "2009",
    summary:
      "A Gin scorecard by Kevin Bowes. Each player has a column: tap Knock under whoever knocked, then pick the points, Gin or Big Gin. It also tracks who deals next.",
    took: "It crashed as soon as I opened it, and reviews from April and May 2025 say the same. Its reviews still helped: people had been asking for their own rules since 2009.",
    shot: {
      src: `${IMG}/ginsc.webp`,
      alt: "GinSC: 2 green player columns of scores with Knocker and Undercut notes, and a list to pick the hand: Big Gin, Gin, or 1 to 8.",
      height: 1298,
    },
    reviews: [
      {
        src: `${IMG}/reviews/ginsc-more-rules.webp`,
        alt: "A 3-star App Store review titled Ok, from September 4, 2010: “Apps is adequate. Like idea of app. Needs more rules and scoring options...more customizable. App is nearly a year old, so not anticipating any updates. Too bad. Prove me wrong, please.”",
        height: 290,
      },
    ],
  },
  {
    slug: "gin-rummy-score-tracker",
    name: "Gin Rummy Score Tracker",
    href: "https://apps.apple.com/us/app/gin-rummy-score-tracker/id1620676041",
    kind: "Made for Gin",
    released: "2022",
    summary:
      "By Melbourne Tech. A sheet asks for the winner, the score and a bonus, then shows the total. It keeps a history and stats for each opponent.",
    took: "The easiest to use, for me and the people I asked. It asks who won before the points, the same order I landed on. But its rules are fixed: one reviewer plays to 250 and couldn’t.",
    shot: {
      src: `${IMG}/gin-rummy-score-tracker-tall.webp`,
      alt: "Gin Rummy Score Tracker: a sheet with Winner (You or Kate), a Score of 13, Bonus with Big Gin selected, a Total of 44 Points and Save Round 4.",
      height: 1300,
    },
    reviews: [
      {
        src: `${IMG}/reviews/grst-house-rules.webp`,
        alt: "A 5-star App Store review titled Great start, from January 2, 2023, asking for customizations for their house rules: an option to change the target points (sometimes they play to 200 instead of 100) and a double points bonus. The developer replied that they were planning to add options for the target points and the value of bonuses.",
        height: 558,
      },
      {
        src: `${IMG}/reviews/grst-bonuses.webp`,
        alt: "A 5-star App Store review titled Solid Start, Needs a few features, from January 1, 2024: “I'd love to see customizeable bonuses, win bonus, line bonus, and ESPECIALLY the option to mark a round as a draw.”",
        height: 326,
      },
    ],
  },
  {
    slug: "ginscorer-pro",
    name: "Ginscorer Pro",
    href: "https://apps.apple.com/us/app/ginscorer-pro/id6741135345",
    kind: "Made for Gin",
    released: "2025",
    summary:
      "A grid for 2 to 4 players with team columns. You can give points and melds a money value, and it works out who owes whom at the end.",
    took: "Built for groups playing for money. For a 2-player game, the grid was more than we needed.",
    shot: {
      src: `${IMG}/ginscorer-pro.webp`,
      alt: "Ginscorer Pro: a dark Game Score grid with 6 team columns and a Melds column, above Score, Games and Main Menu buttons.",
      height: 1304,
    },
    reviews: [],
  },
  {
    slug: "rummy-score-sheet",
    name: "Rummy Score Sheet",
    href: "https://apps.apple.com/us/app/rummy-score-sheet/id1354834131",
    kind: "Made for Rummy",
    released: "2018",
    summary:
      "A score sheet for Rummy with up to 10 players. You type each player’s points every round, with buttons for a drop, a middle drop or a full score, and it shows ads.",
    took: "Built for a Rummy with drops, not Gin’s knocks and bonuses, so I’d still have done the Gin math myself. Its reviews were mostly about ads.",
    shot: {
      src: `${IMG}/rummy-score-sheet.webp`,
      alt: "Rummy Score Sheet: a red Scoring Sheet with a blue panel where each of 4 players gets a score box and D, M, F and R buttons, with Close and Add Scores.",
      height: 1299,
    },
    reviews: [
      {
        src: `${IMG}/reviews/rss-ads.webp`,
        alt: "A 1-star App Store review titled Score sheet is just ad, from January 25, 2020: “Looking for just a simple score sheet and works good for that but deleting it because it’s just a bunch of ads.”",
        height: 254,
      },
      {
        src: `${IMG}/reviews/rss-edit.webp`,
        alt: "A 4-star App Store review titled Re entry adjustment, from August 21, 2024: “There should be auto option for re entry with +1 score adjustment. There should be provision to edit scores.”",
        height: 254,
      },
    ],
  },
  {
    slug: "game-scorekeeper",
    name: "Game ScoreKeeper+",
    href: "https://apps.apple.com/us/app/game-scorekeeper/id6445895939",
    kind: "Any game",
    released: "2023",
    summary:
      "A counter for card, dice and domino games. You add or subtract points for each player.",
    took: "Quick to start, but it’s only a running total: no bonuses, no rounds to look back at, and no saved games.",
    shot: {
      src: `${IMG}/game-scorekeeper.webp`,
      alt: "Game ScoreKeeper+: a plain list of 4 players and their scores, each with a plus button, and Add Player and Reset buttons.",
      height: 1300,
    },
    reviews: [],
  },
];
