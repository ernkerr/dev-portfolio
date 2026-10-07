import { GROUPS } from "@/app/fun/quests";
import type { Status } from "@/app/fun/SideQuests";
import { EMAIL, SOCIALS } from "@/components/site/links";
import { EXPERIENCE } from "@/data/experience";
import { PAGES } from "./pages";

// Everything ErinLLM knows about me, written as me. It only says what's
// here or on the page someone is reading, so every line has to be true.
// My design resume (October 2026) leads: Who I am, Resume and Skills use
// its words. Experience, Fun and the page list come from the same data the
// site shows; projects are summaries of the case studies, and when someone
// asks about one from another page, it reads the case study itself
// (readPages.ts), so editing a case study is enough. Things I tell it
// that aren't anywhere else go in FROM_ME.
//
// Never in here: where I live or work, where I'm from, my age, when I
// graduated, my phone or personal email (it gives hello@ instead).
//
// Left out on purpose:
// Group Sing Along's "~155 active users" and its Engineering side's
// database, Hearts as my "third" app, anything inside an OrderSync
// [bracket], numbers only in OrderSync's A and B drafts, and the resume's
// "MVP in one week" for Group Sing Along (its case study says about 2
// weeks) until the two agree.

const ABOUT = `## Who I am

- I'm Erin Kerr, a product designer and design technologist who researches, designs and builds. On this site I put it as "a designer who engineers".
- I take products from wireframes to shipped code. I prototype in Figma and in React, TypeScript and Claude Code.
- Before design, I spent over two years at SRI International running 500+ interview sessions with teens and parents for two NIH-funded studies, earning the trust it takes for people to talk openly about substance use and trauma. I use those same interviewing skills to learn what users need before I design for them.
- I'm looking for product design, UI/UX and design engineering roles (more under "If you're hiring").
- I built this site myself. A designer told me my old portfolio read like an engineer's, so I redesigned it to lead with design (see Portfolio Redesign).
- Email: ${EMAIL}. ${SOCIALS.filter((s) => !s.href.startsWith("mailto:"))
  .map((s) => `${s.label}: ${s.href}`)
  .join(". ")}. My creator portfolio is https://erin-codes.com.`;

// Anything else I want ErinLLM to know, one line each, written as me.
// Links here are ones it can share.
const FROM_ME = `## In my own words

- I DJ. I'm djdalmane on SoundCloud: https://soundcloud.com/djdalmane
- The aquarium (/fun/aquarium) has no limit on how many fish the tank holds. If it ever gets too many fish, then I'm in trouble.`;

const EXPERIENCE_LIST = `## Experience

${EXPERIENCE.map((e) => `- ${e.year}, ${e.company}: ${e.did}`).join("\n")}

For anything not here or in "Resume", people should email me.`;

// From my design resume (October 2026), in its words. The college radio
// line is from my LinkedIn profile.
const RESUME = `## Resume

Cyber Goose, Founder & Product Designer/Engineer, July 2024 to now
- Designed and built Carpoolio, a cross-platform ride coordination app, owning every user flow, onboarding screen and interaction from wireframes and prototypes through App Store launch to an early-stage acquisition.
- Maintained a 5-star App Store rating through usability testing, user feedback loops and rapid design iteration, including a user-requested feature that converted a 4-star review to 5 stars.
- Designed and built GroupSingAlong, a real-time synchronized-lyrics web app; observed users in person at live events and designed a song-request flow for singers and hosts.

OrderSync, Design Engineer (contract), 2025 to now
- Audited and redesigned the marketing site around a token-based design system: a color palette, design tokens, reusable components and page templates, with automatic light and dark themes.
- Carried the same tokens, palette and components into the user-facing product pages, giving marketing and product one consistent visual language.
- Built an AI agent that extracts order data from incoming emails, plus the ingestion pipeline, data models and parser services behind it.

Wispr AI, Junior Software Developer, neurotech hardware R&D, February to July 2024
- Ran user interviews with study participants and internal researchers to define user needs and requirements for a participant waitlist tool serving both groups.
- Designed and built the tool, then refined it through usability testing, contributing to a 10x increase in experimental data collection throughput.
- Built full-stack internal tools for brain-computer interface R&D alongside senior engineers, working in tight code review loops.
- Supported software-driven experiments, turning participant feedback into hardware-software interface improvements that reduced data artifacts by over 5%.

SRI International, Research Associate, promoted to Senior Project Manager, neuroscience research, October 2021 to February 2024
- Conducted 500+ structured and semi-structured interview sessions with adolescents, young adults and parents for NCANDA and ABCD, two NIH-funded longitudinal studies of adolescent brain development, including structured clinical and substance-use interviews.
- Built trust with participants and families, enabling candid, accurate responses on sensitive topics such as substance use, mental health and adverse life experiences.
- Raised visit completion rates 20% through protocol coordination; managed multi-site study operations whose data supports 100+ publications.

Education: B.S. Psychology, magna cum laude, Boise State University. In college I was also music director at University Pulse, the student radio station, and hosted The Underground, a weekly show about new music and local bands.`;

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

// In my own words from the case studies. The stories are the real ones;
// it should tell these, not make new ones up.
const THINKING = `## How I think about design

- The "grandpa test": if my grandpa can understand it, anyone can. (Gin Score Tracker's goal)
- Design for the people who aren't in charge. (What Group Sing Along taught me: the people who join late and don't hold the phone)
- Scope tightly, put the user experience first, and ship before it's "perfect." (What Gin Score Tracker taught me)
- A portfolio is a product that's never finished. (Portfolio Redesign)

## Things that went wrong, and what I changed

- Gin Score Tracker: the free game stopped people before they could finish it. A 1-star review said "This sucks, I can't actually finish a game, guess I have to delete it." In June 2026 I moved the paywall to after the win, so scoring is never blocked, made editing and deleting games free, and replied to the review. The reviewer updated it.
- Gin Score Tracker: in testing, people were adding the bonus twice, so the bonus now shows in blue with the total under it. After launch, 4 of the 5 people I asked said the buttons were too small, so every main button became full width and 64px tall.
- Group Sing Along: people who joined mid-song had to wait for the next one. Now a new phone asks the host's phone for the current song. Group codes started at 5 letters; on January 12, 2025 I cut them to 4 and made them work in any case. I also renamed the "conductor" to the "host."
- Carpoolio: my first editor in October 2024 was 1 glowing card. I split it into 2 columns, then on November 11 took creating a trip out of the editor entirely, into one question per screen. That step-by-step flow felt guided, but people were dropping off at step 2, and I held on to it longer than I should have because I'd put work into it. Then I cut it down to one screen with smart defaults and inline validation, and many more people finished making a trip. The lesson: friction you add "for clarity" is still friction, so now I throw out my own work faster when the data says to. Looking back, I'd have built a simpler web app first; Carpoolio was a lot for a first full-stack app.
- Hearts Score Tracker: my first draft's win screen said "YOU WINS!" I fixed it the same day, and the version that shipped the next day had each player as a row you tap.
- Portfolio Redesign: I threw out my first direction (a separate /design page) and started over from a blank page.
- OrderSync case study: I checked every claim against the project and cut 3, including "zero design debt," because my own audit tool found 22 off-palette colors.`;

// My answers to what recruiters ask, rewritten with me (October 2026).
// Pay, start date and work authorization are exactly what I want said.
const HIRING = `## If you're hiring

- What I'm looking for: I'm open to product design, UI/UX and design engineering roles, at a startup or a bigger team, remote, hybrid or in-office. What I want most is a team: bigger, more complex products than I can build on my own, and room to keep growing as a designer and an engineer.
- Why I'm looking: I just wrapped up a contract, and after 2 years of designing and shipping on my own, I want to build something bigger with other people.
- When I can start: about 2 weeks after an offer, so I can close out my current projects.
- Work authorization: I'm authorized to work in the US and don't need sponsorship.
- Pay: Happy to discuss for the role.
- Location: I'm flexible: remote, hybrid or in-office. I don't share where I live here.

## Why design

- I went from neuro, to neurotech, to tech. My background is psychology and neuroscience, and so much of design is applied psychology: how people notice, decide and trust.
- After 2 years of building web and mobile apps end to end, the part I kept coming back to was the design: watching people use what I made, hearing what didn't work, and changing it until it did. I see my job as giving users a voice in the product.
- I care about the details most engineers skip: motion, type, and how a screen feels to use.

## Why I'd be a good hire

- I design and build, so what I design is what ships. I've taken products from wireframes to the App Store on my own, including Carpoolio, which was acquired.
- I start with people. Before design I ran 500+ research interviews for NIH-funded studies, on things people don't easily talk about, and I bring that to every user interview.
- I can explain technical things to people who aren't technical. I run @erin.codes, a coding community on Instagram with nearly 18K followers, where posts start from questions people already have, like why Netflix goes black when you share your screen.
- I use AI tools every day as a partner, not a replacement for thinking. I'd rather be the architect than the bricklayer.
- Low ego, high ownership: I'd rather throw out my own work than ship something I don't believe in.
- If someone points out I have fewer years than a role asks for: I've spent over 2 years designing and shipping my own products at Cyber Goose, including one that was acquired. A lot of what these roles describe is what I've already been doing on my own.

## Strengths and weaknesses

- Strength: determination. When something's off, like data dropping or a review saying the app is broken, I keep digging until I find the real cause and fix it (see the Wispr headset story).
- Weakness: delegating. I'm used to owning a product end to end, so I'm practicing handing work off earlier, and handing off the interesting parts, not just the leftovers.

## How I work, in more detail

- Process: I start with the people: research, interviews, watching them work. With their OK, I record interviews so I never ask the same question twice. Then I write the problem down as one statement, sketch flows on paper or a whiteboard, and only open Figma once the structure is clear. I prototype interactions before I commit to them, and I treat the build as one more round of design: what felt right in Figma often needs changing once it's interactive.
- Design systems: tokens first (color, spacing, type, radius, motion), then primitives built from them (buttons, inputs), then patterns built from those (forms, lists, navigation). Tokens are letters, primitives are words, patterns are sentences: if the letters are wrong, every word is misspelled. On an existing product I start with an audit: screenshot every button, input and color, find where Figma and code have drifted apart, and ask about anything unclear. I'd rather live with 3 slightly different cards for a month than ship the wrong abstraction.
- Feedback: I separate the what from the why. If someone says "make this button red," I ask what problem they're solving; it's usually hierarchy or urgency, and there's often a better fix. And if I'm wrong, I want to know fast.
- Motion: it helps when it confirms an action, shows where something came from or went, smooths a layout shift or covers a wait. It hurts when it's decoration, gets in the way of the next step, plays every time on a screen people visit 10 times a day, or ignores reduced-motion settings.
- Designing for AI, where the output isn't predictable: design for transparency, with honest loading states, a sense of how confident the system is, and clear diffs so people can see what changed.
- Figma and code: Figma is the source of truth for how things look, code for how they behave. Token names match exactly in both, and component props in Figma mirror the props in code, so designers and engineers speak the same language. Before I build a design, I ask about the states that often get skipped: hover, empty, loading, error and small screens. Before I ship, I check it on a phone, with only a keyboard, with reduced motion on and at 200% zoom.
- Pushing back: I build it as designed when it's a deliberate choice I just don't love. I push back when it breaks accessibility, breaks the system or creates upkeep the designer might not see, and I ask it as a question first: is this on purpose?
- Working with others: I want designers and engineers together early, while ideas are still open, not at handoff. When I'm the one building, my job is for the designer's intent to show up in production exactly as they imagined it.
- Prioritizing: user impact first, then effort. I keep a running list and re-rank it every week. Running my own studio taught me that fixing what's broken is worth more than the most-loved new feature.
- Big, messy problems: I break them into smaller pieces, decide what has to happen first, and ask for help when I need it.
- AI tools: I learned to code as AI tools arrived, so I use Claude Code and Cursor every day. I know where they're strong and where they miss, and I use them to learn and move faster, not to think for me.
- In 5 years: I want to be someone a team relies on for design, owning bigger parts of the product, mentoring others, and leading when I'm ready.

## Stories

- Why Group Sing Along exists: my family loves to sing together, but their songbooks were out of date, and the older generation had a hard time googling lyrics to keep up.
- Group Sing Along, being wrong about users: I assumed people in the same room would just tell the host what song they wanted. I was wrong: requests became the most-asked-for feature, so I designed a request flow where singers tap Request and the host gets 1 list to accept from.
- Wispr, finding the real cause: while we collected brain-computer interface data, recordings were dropping about 5% of the time. Others thought it was certain participants; I wasn't satisfied with that, and traced it to one headset. A literal duct tape fix stopped the drops. I presented it to the company, and the hardware team made a part that did the duct tape's job.
- SRI, leading peers: after my manager, and then their replacement, left, I took on running a study and was asked to delegate to my peers. Some pushed back ("who made you the boss?"). I asked my manager for a title change to match the new responsibilities, and I changed how I delegated: I handed off the interesting work too, not just the small tasks. Morale got better, and I ran the study well.
- OrderSync, learning fast: the backend was PHP/Laravel, which was new to me. I leaned on the principles I already knew from TypeScript, and within a couple of weeks I was contributing to the Laravel backend alongside the TypeScript services.
- @erin.codes: I started it when I was learning to code, and now I'm the one teaching. My first series, Catch the Syntax, was errors from my own work. What works best is starting from a question people already have and letting the technical part sneak in.

## Tools and apps I think have great taste

- The best tools are the ones you forget about, because they're that easy to use.
- 1Password: it works everywhere, so you never think about it. Present when you need it, invisible when you don't.
- Partiful: it makes software feel like an event instead of a form. The interactions, the copy and the motion all pull toward joy without giving up usability. I pitched Carpoolio as "Partiful for road trips" because that was the bar.
- Arc: separate spaces and profiles for work, learning, building and personal admin. It respects that those are different modes.`;

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

const BUILDING_ERINLLM = `## How I built erinLLM (you)

- Why: recruiters and designers have questions a portfolio doesn't answer up front. Before building more, I looked at about a dozen other people's portfolio chat bots. None let you ask about something on the page just by pointing at it, so that's where I started.
- Where it lives: "✦ erinLLM" in the header. It opens as a panel down the right side (the whole screen on phones) that doesn't cover the page, so you can keep reading and drag things into it, and the conversation follows you from page to page.
- Asking: type a question, tap a suggestion, highlight any text for an "Ask erinLLM" button, or drag a project tile, image, link or text onto it. On a case study it suggests questions about that project, and you can paste a job description to see how I'd fit. You can copy a conversation to share it.
- Answers: it knows what I wrote for it, from my site, case studies and resume, plus the text of the page you're on. Every answer links the pages it came from (only real pages on this site, checked in code) and suggests 2 or 3 follow-ups. When it doesn't know, it says so and gives my email instead of guessing.
- Honesty and privacy: it says it's an AI, never shares where I live or my age, and only talks about me and my work. Questions are saved without anything about who asked, so I can read them on a private page and fill in what it couldn't answer.
- How it's built: Next.js and the Vercel AI SDK, streaming answers from Gemini 3.5 Flash-Lite on Google's free tier, with 2 more free Gemini models to fall back on when it's busy, so it costs nothing to run. Rate limits keep one visitor from using it all up. I designed it and built it with Claude Code.`;

// The parts written as me, for /llms.txt (src/app/llms.txt/route.ts), so an
// AI someone pastes my site into gets the same answers erinLLM gives
export const IN_MY_WORDS = [
  ABOUT,
  RESUME,
  SKILLS,
  HIRING,
  PROCESS,
  THINKING,
].join("\n\n");

const PAGE_LIST = `## Pages on the site

${PAGES.map((p) => `- ${p.name}: ${p.path}`).join("\n")}`;

export const KNOWLEDGE = [
  ABOUT,
  FROM_ME,
  EXPERIENCE_LIST,
  RESUME,
  SKILLS,
  PROCESS,
  THINKING,
  HIRING,
  PROJECTS,
  FUN,
  ABOUT_PAGE,
  SITE,
  BUILDING_ERINLLM,
  PAGE_LIST,
].join("\n\n");
