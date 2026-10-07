import { GROUPS } from "@/app/fun/quests";
import type { Status } from "@/app/fun/SideQuests";
import { EMAIL, SOCIALS } from "@/components/site/links";
import { EXPERIENCE } from "@/data/experience";
import { PAGES } from "./pages";

// Everything ErinLLM knows about me, written as me. It only says what's
// here or on the page someone is reading, so every line has to be true.
// Experience, Fun and the page list come from the same data the site shows;
// the rest is drafted from the case studies. Things I tell it that aren't
// on the site go in FROM_ME.
//
// Left out on purpose until they're sourced (docs/case-studies-review.md):
// Carpoolio's "4.9★" and "first sketch to acquisition", Group Sing Along's
// "~155 active users" and its Engineering side's database, Hearts as my
// "third" app, anything inside an OrderSync [bracket], and numbers that are
// only in OrderSync's A and B drafts.

const ABOUT = `## Who I am

- I'm Erin Kerr, a designer who engineers: a product and UI/UX designer who also builds what I design. I design and ship web apps, mobile apps and developer tools.
- I'm applying for product and UI/UX design roles, and for jobs in New York.
- I built this site myself. A designer told me my old portfolio read like an engineer's, so I redesigned it to lead with design (see Portfolio Redesign).
- Email: ${EMAIL}. ${SOCIALS.filter((s) => !s.href.startsWith("mailto:"))
  .map((s) => `${s.label}: ${s.href}`)
  .join(". ")}. My creator portfolio is https://erin-codes.com.`;

// Anything else I want ErinLLM to know, one line each, written as me.
// Links here are ones it can share.
const FROM_ME = `## In my own words

- I DJ. I'm djdalmane on SoundCloud: https://soundcloud.com/djdalmane`;

const EXPERIENCE_LIST = `## Experience

${EXPERIENCE.map((e) => `- ${e.year}, ${e.company}: ${e.did}`).join("\n")}

That's all this site says about my past roles. For titles, dates or anything else, people should email me.`;

const PROCESS = `## How I work

- I start with research. For my portfolio I studied 265 UI/UX and adjacent job posts from 98 companies and 10 portfolios of new design hires. For Gin Score Tracker I went through the App Store (at least 84 apps let you play Gin, but only 5 kept score for a game at a real table) and asked people how they score on paper. For OrderSync I worked from 4 buyer segments.
- I write the problem down before I build, usually as a "How might..." question.
- I sketch on paper first (a sharpie and a blank page for Gin), then prototype in code, so people test the real thing.
- I test with real people and change what doesn't work. After Gin launched, 4 of the 5 people I asked said the buttons needed to be bigger, so every main button became full width and 64px tall.
- I listen to reviews. A 1-star review of Gin said "I can't actually finish a game", so I moved the paywall to after the win, and the reviewer updated their review.
- I turn designs into small design systems so every page stays consistent: OrderSync's site, my score-tracker apps and this site all run on one.
- I check my own claims. I checked every claim on my OrderSync case study against the project and cut 3.
- I design in Figma and FigJam and build with Next.js, React, Tailwind CSS, TypeScript, React Native and Expo.`;

const PROJECTS = `## Projects

### OrderSync (/orderSync)
Design side: the marketing site and its design system.
- OrderSync is an AI tool that reads purchase orders in any format and puts them straight into a company's ERP. Its site has one job: get buyers to book an intro call.
- I redesigned OrderSync's marketing site, built the design system underneath it, and shipped it to every page, from the homepage to the billing screen, in about a month (May 18 to June 19, 2026). My role was Design Engineer (contract).
- The problem: the site had been built one page at a time. It looked like a lot of AI startups (gradients, glowing orbs), and the brand navy lived under four different names in the code. For buyers who'd already been burned by order software, it didn't read as dependable.
- Research: 4 buyer segments, and a persona, the ops manager drowning in data entry at a food distributor or wholesaler with 50 to 500 people. One insight: 86% of buyers shortlist a product they already know (TrustRadius 2024).
- 3 rounds of wireframes: the free tools went from 6 to 3, and "Get Started" became "Book a Call".
- I tried 3 color directions (all chrome, chrome with emerald, navy with a chrome accent) and chose navy for trust, with chrome only on the Book a Call button and a silver glint on headline keywords.
- The design system: named colors that switch on their own for dark mode, plus 4 building blocks (buttons, sections, headings and section labels). I built it in code myself. One FAQ component is now used in 26 places, and I built a small robot that screenshots every page in light and dark and flags any color that isn't in the system.
Engineering side (/orderSync?side=engineer): the order agent.
- A production AI agent that reads inbound B2B purchase orders in any format a customer sends and turns them into validated, structured orders. It matches products, prices the order and writes it to the system, escalating to a human the moment it isn't sure. I designed and built it end to end.
- Built on Mastra with Claude as the model (Sonnet, falling back to Haiku), TypeScript, Hono, Zod and the Vercel AI SDK, called by a Laravel app. It takes email, EDI, PDF, CSV, Excel and voice orders. Every action is a typed tool with a Zod schema; the model never touches the database directly. It has 12 typed kinds of escalation and a 40-step reasoning budget, and I evaluated 8 extraction engines. I rewrote it from an earlier Python version.
- I kept its numbers to what it does rather than quoting an accuracy figure.

### Portfolio Redesign (/portfolioRedesign)
- September to October 2026. Tools: Figma, FigJam, Next.js, Tailwind CSS. The engineering side is coming soon.
- A designer told me my portfolio read like an engineer's. My audit found I mentioned code 13 times and design 2 times, 1 tile in 10 was about my work, and my only design case study was 4th of 13 projects.
- I studied 265 job posts from 98 companies (182 mention portfolios) and 10 portfolios of new design hires. 92% of posts mention reasoning, rationale or storytelling. 88% mention prototyping or code somewhere, but only 2% of portfolio asks do.
- I threw out my first direction and started from a blank page, froze the old site at /archive/2025 (an idea from Lynn Fisher's archive), and prototyped in code.
- It tests 8 ideas, like the headline "I'm Erin, a designer who engineers." and the designer/engineer switch. The goal: in a first-click test, a design reviewer's first click on the homepage lands on a design case study within 20 seconds. Testing is still in progress.

### Gin Score Tracker (/ginScoreTracker)
- Keeps score for 2-player Gin Rummy: who won each hand, the bonuses and the running total to 100. It came from playing Gin with my family. It was my first fully shipped mobile app, on the App Store for iPhone and iPad since June 2, 2025. I designed and built it solo.
- The goal was the "grandpa test": if my grandpa can understand it, anyone can.
- You pick the winner first, then the points; bonuses are one tap; every round can be fixed with a pencil; there are no ads. The look is neo-brutalist: 2px black borders, hard black shadows, one bright blue and Space Mono titles.
- Moving the paywall to after the win came from a 1-star review; scoring is never blocked now, and in the same June 2026 update I made editing and deleting games free.
- 6 versions on the App Store since June 2025, rated 5.0 from 5 ratings as of October 2026. Built with React Native, Expo and NativeWind; games live on the phone, with no account and no internet needed.
- App Store: https://apps.apple.com/us/app/gin-score-tracker/id6746460027

### Hearts Score Tracker (/heartsScoreTracker)
- Keeps score for a table of 3 to 5 players: every hand, the Queen of Spades, shooting the moon, and who's lowest when someone hits 100. Built on Gin's foundation, it went from first commit to the App Store in 2 days (23 commits in about 23 hours). Rated 5.0 from 2 ratings as of October 2026.
- In January 2026 I pulled its shared parts into a score-tracker base. Spades and Canasta each went from first commit to the App Store in about 10 days on it, and it also became Desk Yoga. Across the family, 4 score trackers are live, with 9 ratings, all 5 stars.
- App Store: https://apps.apple.com/us/app/hearts-score-tracker/id6755978632

### Group Sing Along (/groupSingAlong)
- One person picks a song, and its lyrics open on every phone in the room. Anyone joins with a 4-letter code, with no account and nothing to download. I designed and built it solo for family sing-alongs.
- The first version took about 2 weeks (first commit December 27, 2024), and it's been live at https://groupsingalong.com since January 2025. When a new phone joins, it asks the host's phone for the current song, so late joiners never wait. In December 2025 I built an iOS version, which isn't released.
- Built with Next.js, Tailwind and shadcn/ui, Pusher for the live room, Deezer for search, and Expo for iOS. There's no database: a room lasts as long as its host.

### Carpoolio (/carpoolio)
- Carpoolio planned rides for group trips: who's driving, who rides with whom and when each car leaves. Each car is drawn from above, and its seats are the sign-up sheet. It was the first full-stack app I designed and built, first as a web app (carpoolio.co, live by January 2025) and then for iOS.
- From a coded prototype in October 2024 to the App Store in July 2025: 4 iOS releases, the first approved in about a day.
- In January 2026 I sold the Carpoolio name to a company with an app of the same name, and took mine off the App Store as part of the sale.
- Built with React, Express and Postgres on the web, and Expo, React Native and Supabase on iOS. Looking back, I'd have made a simpler web app first.`;

const STATUS: Record<Status, string> = {
  live: "live",
  "app-store": "on the App Store",
  github: "on GitHub",
  download: "a download",
  demo: "a demo",
  here: "on this site",
  archive: "archived",
  soon: "coming soon",
  "in-progress": "in progress",
  private: "private",
};

const FUN = `## Fun

The Fun page (/fun) is "My silly little side quests": "Building my own projects is where I fell in love with programming and design. These are the small ones, kept here because they were fun to make."

${GROUPS.map(
  (group) =>
    `### ${group.title}\n${group.quests
      .map(
        (q) =>
          `- ${q.name}${q.year ? ` (${q.year})` : ""}: ${q.what}. ${STATUS[q.status]}${q.href ? `, ${q.href}` : ""}`,
      )
      .join("\n")}`,
).join("\n\n")}

Outside of work, from my About page and projects: I play card games with my family (where Gin Score Tracker came from), we have family sing-alongs, I DJ (my Opus Quad is on my shelf, DJ Pipeline loads new tracks into Serato, and I'm djdalmane on SoundCloud), I read, I take photos, I keep plants, and I have a tea collection.`;

const ABOUT_PAGE = `## The About page (/about)

My About page is an illustration of my room, not a bio. On my old bookshelf: my lamp and its disco ball, my snake plant, books (Thinking, Fast and Slow by Daniel Kahneman, Shantaram, Hyperion, The Divine Comedy, The Pragmatic Programmer, Pride and Prejudice, The Dictionary of Obscure Sorrows and more), a seagrass basket, my Beats headphones, my Opus Quad (plug the headphones in and you can play it), my FinePix camera (visitors can leave a photo or see my favorite shots), a lava lamp, pothos cuttings and a clock. There's a window and my closet: my long leather jacket, my cheetah fur coat, my disco dress, my red sunnies and my oxblood Docs. The clock and window show the visitor's own time, city and weather. Turning on the lamps switches the site to dark mode.`;

const SITE = `## This site

- Work (/) has my case studies, Fun has side projects, About is my room. A switch flips the site between its designer side and its engineer side (add ?side=engineer to a link). Every past edition is kept at /archive.
- The design system: 5 color tokens, Newsreader for headlines, Geist for text and Geist Mono for labels. You can see it at /design-system.
- ErinLLM (you) is an AI that answers from this site's content.`;

const PAGE_LIST = `## Pages on the site

${PAGES.map((p) => `- ${p.name}: ${p.path}`).join("\n")}`;

export const KNOWLEDGE = [
  ABOUT,
  FROM_ME,
  EXPERIENCE_LIST,
  PROCESS,
  PROJECTS,
  FUN,
  ABOUT_PAGE,
  SITE,
  PAGE_LIST,
].join("\n\n");
