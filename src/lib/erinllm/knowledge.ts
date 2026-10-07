import { GROUPS } from "@/app/fun/quests";
import type { Status } from "@/app/fun/SideQuests";
import { EMAIL, SOCIALS } from "@/components/site/links";
import { EXPERIENCE } from "@/data/experience";
import { PAGES } from "./pages";

// Everything ErinLLM knows about me, written as me. It only says what's
// here or on the page someone is reading, so every line has to be true.
// My design resume (October 2026) leads: Who I am, Resume and Skills use
// its words. Experience, Fun and the page list come from the same data the
// site shows; projects are drafted from the case studies. Things I tell it
// that aren't anywhere else go in FROM_ME.
//
// Left out on purpose: my phone and personal email (it gives hello@ instead),
// Group Sing Along's "~155 active users" and its Engineering side's
// database, Hearts as my "third" app, anything inside an OrderSync
// [bracket], numbers only in OrderSync's A and B drafts, and the resume's
// "MVP in one week" for Group Sing Along (its case study says about 2
// weeks) until the two agree.

const ABOUT = `## Who I am

- I'm Erin Kerr, a product designer and design technologist who researches, designs and builds. On this site I put it as "a designer who engineers".
- I take products from wireframes to shipped code. I prototype in Figma and in React, TypeScript and Claude Code.
- Before design, I spent over two years at SRI International running 500+ interview sessions with teens and parents for two NIH-funded studies, earning the trust it takes for people to talk openly about substance use and trauma. I use those same interviewing skills to learn what users need before I design for them.
- I'm based in New York, NY, and I'm applying for product and UI/UX design roles.
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

For anything not here or in "Resume", people should email me.`;

// From my design resume (October 2026), in its words. The college radio
// line is from my LinkedIn profile.
const RESUME = `## Resume

Cyber Goose, Founder & Product Designer/Engineer, remote, July 2024 to now
- Designed and built Carpoolio, a cross-platform ride coordination app, owning every user flow, onboarding screen and interaction from wireframes and prototypes through App Store launch to an early-stage acquisition.
- Maintained a 5-star App Store rating through usability testing, user feedback loops and rapid design iteration, including a user-requested feature that converted a 4-star review to 5 stars.
- Designed and built GroupSingAlong, a real-time synchronized-lyrics web app; observed users in person at live events and designed a song-request flow for singers and hosts.

OrderSync, Design Engineer (contract), remote, 2025 to now
- Audited and redesigned the marketing site around a token-based design system: a color palette, design tokens, reusable components and page templates, with automatic light and dark themes.
- Carried the same tokens, palette and components into the user-facing product pages, giving marketing and product one consistent visual language.
- Built an AI agent that extracts order data from incoming emails, plus the ingestion pipeline, data models and parser services behind it.

Wispr AI, Junior Software Developer, neurotech hardware R&D, San Francisco, February to July 2024
- Ran user interviews with study participants and internal researchers to define user needs and requirements for a participant waitlist tool serving both groups.
- Designed and built the tool, then refined it through usability testing, contributing to a 10x increase in experimental data collection throughput.
- Built full-stack internal tools for brain-computer interface R&D alongside senior engineers, working in tight code review loops.
- Supported software-driven experiments, turning participant feedback into hardware-software interface improvements that reduced data artifacts by over 5%.

SRI International, Research Associate, promoted to Senior Project Manager, neuroscience research, Menlo Park, October 2021 to February 2024
- Conducted 500+ structured and semi-structured interview sessions with adolescents, young adults and parents for NCANDA and ABCD, two NIH-funded longitudinal studies of adolescent brain development, including structured clinical and substance-use interviews.
- Built trust with participants and families, enabling candid, accurate responses on sensitive topics such as substance use, mental health and adverse life experiences.
- Raised visit completion rates 20% through protocol coordination; managed multi-site study operations whose data supports 100+ publications.

Education: B.S. Psychology, magna cum laude, Boise State University. In college I was also music director at University Pulse, Boise State's student radio, and hosted The Underground, a weekly show about new music and Boise bands.`;

const SKILLS = `## Skills

- Design: user flows, wireframing, high-fidelity prototyping, UI and visual design, interaction design and motion, mobile app design, responsive web design, brand identity, design-to-code
- Design systems: design tokens, color palettes, component libraries, page templates, light and dark theming
- Design tools: Figma, Claude Code, Webflow, Wix, Canva, Adobe Creative Cloud
- Research: user interviews, usability testing, contextual inquiry, requirements gathering, research synthesis
- Development: TypeScript, JavaScript, Python, React, React Native, Next.js, Node.js, Swift, PostgreSQL, Supabase, Laravel/PHP, AWS, Cloudflare, Microsoft Azure, Docker, Git
- AI building: LLM APIs, custom AI agents and skills, MCP servers, AI prototyping
- AI tools: Claude Code, Cursor, GitHub Copilot, Warp, Figma Make, v0, Lovable, Midjourney, Higgsfield, ElevenLabs

When someone asks about skills, lead with design and research; engineering supports them.`;

const PROCESS = `## How I work

- I start with research. For my portfolio I studied 265 UI/UX and adjacent job posts from 98 companies and 10 portfolios of new design hires. For Gin Score Tracker I went through the App Store (at least 84 apps let you play Gin, but only 5 kept score for a game at a real table) and asked people how they score on paper. For OrderSync I worked from 4 buyer segments.
- I write the problem down before I build, usually as a "How might..." question.
- I sketch on paper first (a sharpie and a blank page for Gin), then prototype in code, so people test the real thing.
- I test with real people and change what doesn't work. After Gin launched, 4 of the 5 people I asked said the buttons needed to be bigger, so every main button became full width and 64px tall.
- I listen to reviews. A 1-star review of Gin said "I can't actually finish a game", so I moved the paywall to after the win, and the reviewer updated their review.
- I turn designs into small design systems so every page stays consistent: OrderSync's site, my score-tracker apps and this site all run on one.
- I check my own claims. I checked every claim on my OrderSync case study against the project and cut 3.
- I design in Figma and FigJam, prototype in Figma and in code, and build with Next.js, React, Tailwind CSS, TypeScript, React Native and Expo.`;

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
- erinLLM (you) is an AI that answers from this site's content.`;

const PAGE_LIST = `## Pages on the site

${PAGES.map((p) => `- ${p.name}: ${p.path}`).join("\n")}`;

export const KNOWLEDGE = [
  ABOUT,
  FROM_ME,
  EXPERIENCE_LIST,
  RESUME,
  SKILLS,
  PROCESS,
  PROJECTS,
  FUN,
  ABOUT_PAGE,
  SITE,
  PAGE_LIST,
].join("\n\n");
