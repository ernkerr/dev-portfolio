// Ten portfolios from people hired into their first design or design
// engineering job, researched October 2026. Facts come from
// career-ops/data/portfolio-landscape/2026-10-02.md, where every row has its
// sources. Each clip was recorded from the version of the site closest to the
// hire. The "suggests" lines are hypotheses for the redesign, not decisions,
// and are drafts for Erin to rewrite in her own words. The full analysis is in
// career-ops/data/portfolio-landscape/analysis.md.

export type LandscapeEntry = {
  slug: string;
  name: string;
  /** The portfolio as it is today. */
  href: string;
  track: "Product designer" | "Design engineer";
  switcher?: boolean;
  hired: string;
  path: string;
  leadsWith: string;
  projects: string;
  caseStudies: string;
  /** What the clip shows. */
  look: string;
  /** What the evidence suggests for the redesign, as a hypothesis to test. */
  suggests: string;
  /** Where the clip was recorded from. */
  source: { text: string; href: string };
};

export const LANDSCAPE: LandscapeEntry[] = [
  {
    slug: "sara-mirowitz",
    name: "Sara Mirowitz",
    href: "https://saramirowitz.com/",
    track: "Product designer",
    switcher: true,
    hired: "UX Designer at Voiceitt, 2020",
    path: "Special-ed teacher, then a design bootcamp. She was the only designer at a startup building speech recognition for people with speech disabilities.",
    leadsWith:
      "“I’m a User Experience Designer who creates inclusive experiences for users of all abilities.”",
    projects: "4 case studies and no side projects",
    caseStudies: "1,800 to 2,300 words each",
    look: "Kadima, her bootcamp capstone: an app that helps people with motor disabilities find accessible routes in Jerusalem.",
    suggests:
      "Her old field shaped her capstone, and the capstone matched her employer. It points to testing a case study that draws on my research background, aimed at health tech, instead of only mentioning that background.",
    source: {
      text: "Captured from the Wayback Machine, January 2022. Her 2020 homepage’s styles weren’t archived, so this shows the case study.",
      href: "https://web.archive.org/web/20220119010125/http://saramirowitz.com/kadima/",
    },
  },
  {
    slug: "caitlin-brisson",
    name: "Caitlin Brisson",
    href: "https://www.caitlinbrisson.com/",
    track: "Product designer",
    switcher: true,
    hired: "Product Designer at Gusto, 2018",
    path: "Marine biologist and STEM teacher. She was Gusto’s first product design intern, and they hired her full time.",
    leadsWith:
      "“I’m a product designer who loves diving beneath the surface of others’ worlds to take apart and build purposeful products.”",
    projects: "4 case studies and 1 visual project",
    caseStudies: "2,600 to 3,400 words each, the longest in the set",
    look: "Her homepage, then a sped-up scroll through her Project Decibel case study.",
    suggests:
      "1 sentence on the homepage, and the depth in case studies that ran past 2,500 words. It points to a short homepage and fewer, deeper case studies. My 2025 ones ran about 700 to 850 words.",
    source: {
      text: "Captured from the Wayback Machine, January 2019, before any Gusto work was added.",
      href: "https://web.archive.org/web/20190118235857/http://www.caitlinbrisson.com/",
    },
  },
  {
    slug: "janelle-academia",
    name: "Janelle Academia",
    href: "https://www.janelleacademia.com/",
    track: "Product designer",
    switcher: true,
    hired: "Product Designer at Carry, 2021",
    path: "Marketing and events, then a design bootcamp. Carry was an early-stage app startup.",
    leadsWith:
      "“UX Designer creating with intention and strategy,” then a “Prove it” button",
    projects: "4 case studies: 1 real client and 3 concepts",
    caseStudies: "1,200 to 1,500 words each",
    look: "House of Discipline, her one real client project: a website and brand for a martial arts studio.",
    suggests:
      "3 concepts and 1 real client were enough, and the real project went first. Everyone in the set who had real work led with it, which points to opening my Work page with shipped work.",
    source: {
      text: "Captured from her live site. The 2022 archive lost its images, and this case study is from before her hire.",
      href: "https://www.janelleacademia.com/houseofdiscipline",
    },
  },
  {
    slug: "amy-lima",
    name: "Amy Lima",
    href: "https://amylimabean.com/",
    track: "Product designer",
    switcher: true,
    hired: "Apprentice Product Designer at Pinterest, 2021",
    path: "Music and events producer, then a design bootcamp. She was the program’s first design apprentice.",
    leadsWith:
      "“Hey, you. I’m Amy Lima.” and a line about humanizing tech, with a playlist link",
    projects: "4 case studies, plus a Play page for visual work",
    caseStudies: "1,700 to 2,300 words each",
    look: "Her homepage and 4 case studies, starting with a Clubhouse redesign she wrote while everyone was talking about Clubhouse.",
    suggests:
      "Case studies on Work and visual experiments on Play. Across the set, side projects either got their own page or stayed off the site, which points to giving mine a separate place.",
    source: {
      text: "Captured from the Wayback Machine, April 2021.",
      href: "https://web.archive.org/web/20210414073255/https://www.amylima.design/",
    },
  },
  {
    slug: "olivia-gibson",
    name: "Olivia Gibson",
    href: "https://ogdesignz.framer.website/",
    track: "Product designer",
    switcher: true,
    hired: "UX/UI Designer at CareDial, 2024",
    path: "BSc and MSc in psychology, then a design bootcamp. CareDial is a small UK care marketplace.",
    leadsWith:
      "“Greetings connoisseurs of design and patrons of research excellence.”",
    projects: "3 case studies, a writing sample and testimonials",
    caseStudies: "500 to 1,300 words each",
    look: "Her greeting, then her psychology background, which sits right below the fold.",
    suggests:
      "Her background is the closest to mine, and she put psychology just below the fold. It’s 1 of 3 placements worth testing, along with About only or a case study that draws on it.",
    source: {
      text: "Captured from her live site, which doesn’t show any CareDial work yet.",
      href: "https://ogdesignz.framer.website/",
    },
  },
  {
    slug: "miggy-fajardo",
    name: "Miggy Fajardo",
    href: "https://miggyfajardo.com/",
    track: "Product designer",
    hired: "Product Designer at Discord, 2025",
    path: "Industrial design graduate and Dropbox product design intern.",
    leadsWith:
      "“A digital product designer focused on crafting beautiful and intuitive products that foster meaningful experiences.”",
    projects: "5 case studies, 1 of them locked, plus a Play page",
    caseStudies: "600 to 2,100 words, with up to 10 videos each",
    look: "His homepage, then his Dropbox emoji reactions case study, sped up.",
    suggests:
      "Video carried his interaction design, and interaction and flows is 19% of portfolio asks in the job posts. It points to short clips of my apps in use instead of only screenshots.",
    source: {
      text: "Captured from the Wayback Machine, late 2025.",
      href: "https://web.archive.org/web/20251202144745/https://miggyfajardo.com/",
    },
  },
  {
    slug: "leo-fu",
    name: "Leo Fu",
    href: "https://leofu.ca/",
    track: "Product designer",
    hired: "Designer at Corgi, now leading design",
    path: "Design student, previously at Snap. Corgi is a Y Combinator startup.",
    leadsWith: "“Leo is a product designer who is biased towards action.”",
    projects: "4 case studies",
    caseStudies:
      "Not measured. The pages weren’t archived, and today they’re behind a passcode.",
    look: "His 1-line intro, then “The receipts,” quotes from designers at Wealthsimple and 1Password.",
    suggests:
      "Quotes from people he worked with did the vouching. 4 of the 10 used someone else’s voice, which points to testing App Store reviews or a client quote inside my case studies.",
    source: {
      text: "Captured from the Wayback Machine, January 2026.",
      href: "https://web.archive.org/web/20260107121738/https://leofu.ca/",
    },
  },
  {
    slug: "mitul-shah",
    name: "Mitul Shah",
    href: "https://mitul.ca/",
    track: "Design engineer",
    switcher: true,
    hired: "UX Developer at Composer, 2021",
    path: "Self-taught, after a year as a product analyst. Composer was a seed-stage fintech.",
    leadsWith:
      "A note that he was looking for his next role, as an associate product manager or product analyst",
    projects: "No case studies. 3 project cards and a photography section",
    caseStudies: "1 paragraph per project",
    look: "His job-hunting intro, then Paprback, with 300+ signups, 1,200+ visitors, 600+ upvotes and 8 Reddit awards in 1 paragraph.",
    suggests:
      "No case studies, just shipped projects with real numbers, and that was enough for a design engineer role. It points to letting the engineering side of my site rest on Carpoolio’s rating and Group Sing Along’s users instead of long write-ups.",
    source: {
      text: "Captured from the Wayback Machine, May 2021.",
      href: "https://web.archive.org/web/20210510034154/https://mitul.ca/",
    },
  },
  {
    slug: "mary-jiang",
    name: "Mary Jiang",
    href: "https://www.merry.design/",
    track: "Design engineer",
    hired: "Design Engineer at Hume AI, 2023",
    path: "Computer science graduate with a psychology minor, then a batch at Recurse Center.",
    leadsWith:
      "“Hey, it’s Mary! I’m prototyping digital environments inspired by play + sharing learnings along the way.”",
    projects: "No case studies. 7 experiments and 4 process notes",
    caseStudies: "Notes run 670 to 890 words",
    look: "Her intro, a stack of small experiments, and her notes.",
    suggests:
      "Working demos plus notes on how she made them. 7 of the 10 published writing beyond their case studies, which points to treating my build-in-public posts on @erin.codes as evidence that I can explain my work.",
    source: {
      text: "Captured from her live site, which looks the same as it did in 2023.",
      href: "https://www.merry.design/",
    },
  },
  {
    slug: "joyce-jiang",
    name: "Joyce Jiang",
    href: "https://joyceis.online/",
    track: "Design engineer",
    hired:
      "Product Designer at Viam, 2024, then Design Engineer at Mainframe, 2025",
    path: "Cognitive science and HCI graduate who taught herself to code. Viam hired her after her internship there.",
    leadsWith:
      "Just “Joyce Jiang, Design Engineer,” then a dated feed of posts",
    projects: "About 14 short posts, split into product design and engineering",
    caseStudies: "16 to 104 words per post",
    look: "Her feed, from top to bottom.",
    suggests:
      "She named the role in her first line and split the feed for design and engineering readers. It points to 1 clear role in my headline, with a separate route for the second audience.",
    source: {
      text: "Captured from the Wayback Machine, January 2025.",
      href: "https://web.archive.org/web/20250131165450/https://joyceis.online/",
    },
  },
];
