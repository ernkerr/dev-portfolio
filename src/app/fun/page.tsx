import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { FieldNotesMark } from "@/components/site/thumbs";
import { EDITIONS } from "@/data/editions";
import SideQuests, { type QuestGroup } from "./SideQuests";

export const metadata: Metadata = {
  title: "Fun",
  description:
    "Erin Kerr's side quests: minigames, tools, apps, web apps and skills for Claude Code.",
  alternates: { canonical: "/fun" },
};

// Grouped by what each thing is. Years are when each repo was started.
// Anything without a link (in progress, or a private repo) shows dimmed and
// never leaves ASCII.
const GROUPS: QuestGroup[] = [
  {
    title: "Minigames",
    note: "More coming soon.",
    quests: [
      {
        name: "Type a Book",
        what: "Pick a book off the shelf and type it on an old typewriter",
        year: "2026",
        status: "live",
        cta: "Play",
        href: "https://ernkerr.github.io/type-a-book/",
        scene: "typing",
      },
      {
        name: "Steamed Up",
        what: "A mirror after a hot shower. Breathe on it, then wipe it with your finger",
        year: "2026",
        status: "live",
        cta: "Play",
        href: "https://ernkerr.github.io/steamed-up/",
        scene: "mirror",
      },
      {
        name: "Catch",
        what: "Catch things falling from the sky",
        status: "soon",
        scene: "catcher",
      },
      {
        name: "Dinosaur Game",
        what: "A dinosaur runs, and you jump it over the cacti",
        status: "soon",
        scene: "dino",
      },
      {
        name: "Claw Game",
        what: "Steer the claw and grab a prize",
        status: "soon",
        scene: "claw",
      },
      {
        name: "Plant Platformer",
        what: "A Mario-style Game Boy game to download and play on a real Game Boy Color",
        year: "2026",
        status: "soon",
        scene: "gameboy",
      },
      {
        name: "Snow Tycoon",
        what: "A tycoon game for the desktop",
        year: "2025",
        status: "soon",
        art: { glyph: "$" },
      },
    ],
  },
  {
    title: "Tools",
    quests: [
      {
        name: "Claude Pets",
        what: "A desktop pet that shows what Claude Code is doing",
        year: "2026",
        status: "github",
        href: "https://github.com/ernkerr/claude-pets",
        art: {
          src: "/images/fun/claude-pet.png",
          bg: "#F4EFE6",
          width: 0.62,
          ratio: 300 / 160,
        },
      },
      {
        name: "AutoClicker",
        what: "A macOS auto-clicker Apple wouldn’t approve",
        year: "2025",
        status: "download",
        cta: "Download, 2.2 MB",
        href: "/downloads/AutoClicker.zip",
        art: {
          src: "/images/autoClicker/autoclicker-main.png",
          bg: "#F1E7CF",
          width: 0.46,
        },
      },
      {
        name: "Timelapse Timestamps",
        what: "Puts the real clock time on timelapse videos",
        year: "2026",
        status: "github",
        href: "https://github.com/ernkerr/timelapse-timestamps",
        art: { glyph: "12:00" },
      },
      {
        name: "DJ Pipeline",
        what: "Cleans up, tags and loads new tracks into Serato",
        year: "2026",
        status: "private",
        art: { glyph: "DJ" },
      },
      {
        name: "Home Automations",
        what: "A local hub for the smart devices in my house",
        year: "2026",
        status: "private",
        art: { glyph: "home" },
      },
      {
        name: "Price Radar",
        what: "Price and stock alerts you write in plain English",
        year: "2026",
        status: "private",
        art: { glyph: "radar" },
      },
      {
        name: "Revline",
        what: "Self-hosted analytics that ties traffic to revenue",
        year: "2026",
        status: "private",
        art: { glyph: "RV" },
      },
      {
        name: "Brand Manager",
        what: "Drafts replies to brand-deal emails and never sends them",
        year: "2026",
        status: "private",
        art: { glyph: "BM" },
      },
    ],
  },
  {
    title: "Apps",
    quests: [
      {
        name: "Canasta Score Tracker",
        what: "Canasta scoring for the whole table",
        year: "2026",
        status: "app-store",
        href: "https://apps.apple.com/us/app/canasta-score-tracker/id6777750733",
        art: {
          src: "/images/fun/canasta.png",
          bg: "#F4DCD6",
          width: 0.5,
          icon: true,
        },
      },
      {
        name: "Spades Score Tracker",
        what: "Spades bids and scores for the whole table",
        year: "2026",
        status: "app-store",
        href: "https://apps.apple.com/us/app/spades-score-tracker/id6778535752",
        art: {
          src: "/images/fun/spades.png",
          bg: "#E2E2E8",
          width: 0.5,
          icon: true,
        },
      },
      {
        name: "Hearts Score Tracker",
        what: "Hearts scoring for the whole table",
        year: "2025",
        status: "app-store",
        cta: "Case study",
        href: "/heartsScoreTracker",
        art: {
          src: "/images/heartsScoreTracker/icon2.png",
          bg: "#F4C6B8",
          width: 0.5,
          icon: true,
        },
      },
      {
        name: "Desk Yoga",
        what: "Short yoga sessions you can do at your desk",
        year: "2025",
        status: "demo",
        href: "https://ernkerr.github.io/demos/desk-yoga/",
        art: {
          src: "/images/deskYoga/icon.png",
          bg: "#D9E2D0",
          width: 0.5,
          icon: true,
        },
      },
      {
        name: "Farkle Score Tracker",
        what: "Scores for Farkle, the push-your-luck dice game",
        year: "2026",
        status: "in-progress",
        art: {
          src: "/images/fun/farkle.png",
          bg: "#FBF3D0",
          width: 0.5,
          icon: true,
        },
      },
      {
        name: "Watchlisted",
        what: "Track the movies people tell you to watch",
        year: "2026",
        status: "in-progress",
        art: {
          src: "/images/fun/watchlisted.png",
          bg: "#ECECEC",
          width: 0.5,
          icon: true,
        },
      },
      {
        name: "GLP-1 Anchor",
        what: "A private GLP-1 medication tracker with no login",
        year: "2026",
        status: "in-progress",
        art: { glyph: "GLP" },
      },
      {
        name: "Yatzy Score Tracker",
        what: "The Scandinavian Yatzy scorecard",
        year: "2026",
        status: "in-progress",
        art: { glyph: "yatzy" },
      },
      {
        name: "Darts Score Tracker",
        what: "Scores for 501 and friends",
        year: "2026",
        status: "in-progress",
        art: { glyph: "darts" },
      },
      {
        name: "Cribbage Score Tracker",
        what: "Scores for cribbage",
        year: "2026",
        status: "in-progress",
        art: { glyph: "crib" },
      },
      {
        name: "Cornhole Score Tracker",
        what: "Cornhole scores, round by round",
        year: "2026",
        status: "in-progress",
        art: { glyph: "corn" },
      },
    ],
  },
  {
    title: "Web apps",
    quests: [
      {
        name: "Group Sing Along",
        what: "Lyrics everyone in the room sees in real time",
        year: "2024",
        status: "live",
        href: "https://groupsingalong.com",
        art: {
          src: "/images/home/thumbs/gsa-card.png",
          bg: "#E4DDFB",
          width: 0.44,
          ratio: 1146 / 1400,
        },
      },
      {
        name: "Git Racer",
        what: "Race your friends on GitHub contributions",
        year: "2026",
        status: "live",
        href: "https://git-racer.vercel.app",
        art: {
          src: "/images/gitRacer/car-green.png",
          bg: "#06110A",
          width: 0.72,
          ratio: 1536 / 401,
        },
      },
      {
        name: "ASCII Cam",
        what: "Your webcam, rendered in ASCII",
        year: "2026",
        status: "live",
        href: "https://ascii-cam.com/",
        art: {
          src: "/images/home/thumbs/ascii-logo.png",
          bg: "#0A0A0A",
          width: 0.62,
          ratio: 669 / 671,
        },
      },
      {
        name: "MTV Simulator",
        what: "A big 90s TV that only gets music channels",
        year: "2026",
        status: "live",
        href: "https://ernkerr.github.io/mtv-simulator/",
        art: {
          src: "/images/fun/mtv-tv.png",
          bg: "#050506",
          width: 0.9,
          ratio: 4 / 3,
        },
      },
      {
        name: "Field Notes",
        what: "What job posts ask you to prove, in your field’s own words",
        year: "2026",
        status: "live",
        href: "https://fieldnotes.erinkerr.me",
        art: { glyph: "notes", bg: "#EEF2F6" },
        node: <FieldNotesMark />,
      },
      {
        name: "Savory Memories",
        what: "A photo of an old recipe card in, a clean recipe page out",
        year: "2026",
        status: "live",
        href: "https://savorymemories.vercel.app",
        art: { src: "/images/fun/savory-memories.png" },
      },
      {
        name: "Tea Cupboard",
        what: "An inventory for my tea collection",
        year: "2025",
        status: "live",
        href: "https://ernkerr.github.io/TeaCupboard/index.html",
        art: { src: "/images/myTeaCupboard/oolong.jpg" },
      },
      {
        name: "Happiness Generator",
        what: "Feeling down? Click here for a dog",
        year: "2025",
        status: "here",
        cta: "Feeling down? Click here",
        play: "dog",
      },
      {
        name: "Crossposter",
        what: "Post a video once, publish it to TikTok, YouTube Shorts and Bluesky",
        year: "2026",
        status: "in-progress",
        art: { glyph: "XP" },
      },
    ],
  },
  {
    title: "Claude Code skills",
    note: "Free on GitHub.",
    quests: [
      {
        name: "App Store Screenshots",
        what: "Makes on-brand App Store screenshots for an app",
        year: "2026",
        status: "github",
        href: "https://github.com/ernkerr/app-store-screenshots",
        art: { glyph: "AS" },
      },
      {
        name: "App Store Preflight",
        what: "Checks an iOS app for what Apple rejects before you submit it",
        year: "2026",
        status: "github",
        href: "https://github.com/ernkerr/app-store-preflight",
        art: { glyph: "AP" },
      },
      {
        name: "App Store Connect Setup",
        what: "Fills in App Store Connect from the app’s own repo",
        year: "2026",
        status: "github",
        href: "https://github.com/ernkerr/app-store-connect-setup",
        art: { glyph: "AC" },
      },
      {
        name: "Build in Public",
        what: "Turns git commits into build-in-public posts",
        year: "2026",
        status: "github",
        href: "https://github.com/ernkerr/build-in-public",
        art: { glyph: "BIP" },
      },
    ],
  },
  {
    title: "Past editions of this site",
    quests: EDITIONS.map((e) => ({
      name: `${e.year} edition`,
      what: e.label,
      year: e.year,
      status: "archive" as const,
      href: e.href,
      art: { src: e.thumbnail },
    })),
  },
];

export default function FunPage() {
  return (
    <SiteShell>
      <section className="pb-16 pt-16 md:pt-20">
        <h1 className="font-serif text-display-sm md:text-display">
          My silly little side quests
        </h1>
        <p className="mt-6 max-w-measure text-body text-site-ink/75">
          Building my own projects is where I fell in love with programming and
          design. These are the small ones, kept here because they were fun to
          make.
        </p>
      </section>

      <SideQuests groups={GROUPS} />
    </SiteShell>
  );
}
