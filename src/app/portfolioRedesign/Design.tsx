import SiteShell from "@/components/site/SiteShell";
import CaseStudyArticle, {
  type CaseStudySection,
} from "@/components/site/CaseStudyArticle";
import {
  Code,
  Columns,
  Facts,
  Figure,
  H3,
  InProgress,
  inlineLink,
  Lead,
  List,
  P,
  label,
} from "@/components/site/prose";
import AffinityMap from "@/components/affinity-map/AffinityMap";
import PortfolioLandscape from "@/components/portfolio-landscape/PortfolioLandscape";
import {
  AsksChart,
  Audit,
  BeforeAfter,
  Compare,
  CutClaims,
  Decision,
  HeadlineSpecimen,
  LinkPreview,
  LiveThumbs,
  MentionCount,
  ProcessSteps,
  Retitled,
  Rewrites,
  Sitemaps,
  SwitchSpecimen,
  Tokens,
  TypeSpecimens,
  Versions,
} from "./figures";

// Drafted in docs/portfolio-redesign-case-study.md. Every claim traces back
// to the site, its commit history or Erin's answers; the research still
// under way sits in InProgress slots until it's done.

const IMG = "/images/portfolioRedesign";

const SECTIONS: CaseStudySection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <Lead>
          I rebuilt my portfolio so it makes the case for the job I’m applying
          for now: product designer. The 2025 site was built while I was
          applying for engineering roles, and it read that way. I audited it,
          studied 265 designer job posts to learn what design teams want a
          portfolio to prove, and redesigned it from a blank page.
        </Lead>
        <Facts
          items={[
            {
              label: "Role",
              value: "Designer, researcher and developer, solo",
            },
            { label: "Timeline", value: "September to October 2026" },
            {
              label: "Tools",
              value: "Figma, FigJam, Next.js, Tailwind CSS",
            },
            {
              label: "Scope",
              value:
                "Homepage, About, a side-projects page, an archive of past editions, and this case study",
            },
          ]}
        />
        <BeforeAfter />
      </>
    ),
  },
  {
    id: "problem",
    title: "Problem",
    headline: "My portfolio was pitching me for a different job.",
    content: (
      <>
        <P>
          A designer told me my portfolio read like an engineer’s. When I walked
          through it the way a design hiring manager would, the evidence was
          everywhere, starting with the first screen.
        </P>
        <Audit />
        <P>
          <strong>The copy was about code.</strong> Across the homepage and
          About page, I mentioned development, coding or software 13 times and
          design twice. About opened with “My path into software development
          wasn’t traditional.”
        </P>
        <MentionCount />
        <P>
          <strong>The visual language was a developer’s.</strong> Pixel display
          type, monospace body text, and one saturated blue on every tile. Every
          tile had the same weight, so nothing stood out as the most important.
        </P>
        <P>
          <strong>The projects page was sorted for engineers.</strong> It
          promised “my growth as a developer,” opened with Git Racer and a
          two-hour ASCII camera, and put my only design case study fourth of 13.
          Every card listed a tech stack.
        </P>
        <Figure
          src={`${IMG}/before-projects.png`}
          alt="The 2025 projects page: a pixel-type “Projects” heading, an intro about growing as a developer, and Git Racer as the first card with React, TypeScript and Hono chips."
          width={1440}
          height={900}
          caption="The 2025 projects page, opening with Git Racer."
        />
        <P>
          <strong>The details people check first were wrong.</strong> Besides
          the location, the link preview introduced me as a software engineer.
        </P>
        <LinkPreview />
      </>
    ),
  },
  {
    id: "goal",
    title: "Goal",
    headline: "Make the case for design without hiding the engineering.",
    content: (
      <>
        <Columns
          items={[
            {
              title: "Lead with design",
              text: "Say “product designer” first, and keep the engineering that sets me apart.",
            },
            {
              title: "Put shipped work first",
              text: "Real, shipped work on the first screen, and make it look like design work.",
            },
            {
              title: "Make every line true",
              text: "Each line should trace back to my resume or to work someone can see.",
            },
          ]}
        />
        <P>
          <strong>How I’ll know it worked:</strong> reviewers reach a design
          case study within their first two minutes, and they name a design
          project when asked what they remember.
        </P>
      </>
    ),
  },
  {
    id: "process",
    title: "Process",
    headline: "Five stages, which overlapped in practice.",
    content: (
      <>
        <ProcessSteps />
        <P>
          I started building on September 20 and pulled the job posts for the
          research on October 1, so the stages ran side by side more than in
          order.
        </P>
      </>
    ),
  },
  {
    id: "research",
    title: "Research",
    headline: "Design teams judge a portfolio on craft and taste, not code.",
    content: (
      <>
        <P>
          I pulled 265 live designer job posts (product, UI/UX, brand and design
          manager roles) from 98 companies, and 182 of them explicitly mention a
          portfolio. I gathered the “show us evidence of…” requirement lines
          too, so the map captures what a portfolio needs to prove, not just the
          “send a link” mentions. I wrote 204 verbatim quotes on sticky notes
          and sorted them until 19 clusters and 5 themes emerged. Pick a role to
          see what posts like it ask for.
        </P>
        <AffinityMap />
        <H3>What the map showed</H3>
        <AsksChart />
        <Columns
          count={2}
          items={[
            {
              title: "A portfolio is judged on craft and taste.",
              text: "Curation was the single biggest portfolio ask. A few pieces with a clear point of view beat a long list of okay work, and my old site was a long list.",
            },
            {
              title:
                "Code is valued in the job, but it isn’t what the portfolio is judged on.",
              text: "88% of posts mention prototyping or code somewhere, but only 2% of portfolio asks do. My engineering is a real advantage, but it should support the design work, not lead.",
            },
            {
              title: "Shipped work outranks concepts.",
              text: "Live, used work came second. I have shipped apps with real ratings and users, and my old site hid that behind tech-stack chips.",
            },
            {
              title: "Posts expect a clear story.",
              text: "92% of posts mention reasoning, rationale or storytelling. Case studies should run problem, exploration, decision, result, which is why this one is structured the way it is.",
            },
          ]}
        />
        <H3>Other portfolios</H3>
        <P>
          I looked at ten portfolios from people hired into their first design
          or design engineering job at startups, mid-size companies and one
          apprenticeship. Seven are product designers, five of them career
          switchers like me, and three are design engineers. I coded all ten on
          the same 20 features, measured 15 of their case studies, and checked
          each pattern against the 139 product and UI/UX posts from the job-post
          research that ask for a portfolio.
        </P>
        <PortfolioLandscape />
        <H3>What the portfolios showed</H3>
        <Columns
          count={2}
          items={[
            {
              title: "Product designers showed three to five case studies.",
              text: "All seven did, and the median was four. Taste and curation is also the top portfolio ask in the job posts.",
            },
            {
              title: "Every case study followed the same shape.",
              text: "A facts block, the problem, research and testing with real people, the design, and what they learned. Most ran 1,000 to 2,300 words with about 20 images. Only one reported shipped results.",
            },
            {
              title: "Real work went first.",
              text: "All three who had client, lab or internship work led with it. Concept projects didn’t hold anyone back, since five of the seven product designers had at least one.",
            },
            {
              title: "Designers named the role, engineers showed the work.",
              text: "Six of seven product designers said “designer” on their first screen. The three design engineers had no case studies and were hired on live projects, small demos and short posts.",
            },
          ]}
        />
        <P>
          The job posts point the same way for junior roles. At entry and mid
          level, asks for a user-centered process rise from 15% to 21% of
          portfolio mentions, and asks for measurable impact fall from 14% to
          8%. Junior designers are judged more on how they work than on numbers
          they moved.
        </P>
        <H3>What it suggests for my design</H3>
        <P>
          None of this is decided yet. These are the ideas I’m taking into
          reviewer sessions, each tied to the evidence above.
        </P>
        <List ordered>
          <li>
            Three to five design case studies on the main path, with real,
            shipped work first and side projects somewhere else.
          </li>
          <li>
            Fewer, deeper case studies in the shape the hires used. My 2025 case
            studies ran about 700 to 850 words, and theirs mostly ran 1,000 to
            2,300.
          </li>
          <li>
            A first line that names the role, then a test of which angle
            reviewers remember: research and the brain, building end to end, or
            AI-native work.
          </li>
          <li>
            A clear place for my psychology and neuroscience background, tested
            three ways: a line on the homepage, About only, or a case study that
            draws on it.
          </li>
          <li>
            Engineering that supports the design work instead of leading it.
            Code is 2% of portfolio asks for design roles, but it was the whole
            case for the design engineers.
          </li>
        </List>
        <P>
          <strong>How I measured.</strong> I looked at each portfolio as it was
          when they were hired, using the Wayback Machine where a site has
          changed since, and counted words with a headless browser. Ten is a
          small sample, and all ten got hired, so this shows what was typical
          and enough, not what caused the hire. Three of the five career
          switchers came from one bootcamp’s success stories. Where an archived
          page lost its styles or images, the recording uses the closest version
          that still renders and says which one.
        </P>
        <H3>Talking to people</H3>
        <InProgress title="Reviewer sessions">
          Each person reviews the old site as if hiring a junior product
          designer with two minutes before their next meeting, thinking out
          loud: what they remember, where they stop, and whether they find a
          design case study.
        </InProgress>
      </>
    ),
  },
  {
    id: "exploration",
    title: "Exploration",
    headline: "I threw out my first direction and started from a blank page.",
    content: (
      <>
        <P>
          <strong>First direction: a design page beside the old site.</strong> I
          added a separate <Code>/design</Code> landing page with four
          case-study cards, a “how I work” section and my tools. It sat beside
          the 2025 site instead of replacing it, so anyone landing on the
          homepage still met “Full Stack Developer” first. I threw it out.
        </P>
        <Figure
          src={`${IMG}/first-direction.png`}
          crop={660}
          alt="The discarded /design page: “A designer who builds what she draws.” in heavy black sans serif with “builds” in blue, above See the work and Get in touch buttons."
          width={1440}
          height={900}
          caption="The /design page as it stood on September 20."
        />
        <P>
          <strong>Starting over, and keeping the old site.</strong> On September
          25 I froze the 2025 site at <Code>/archive/2025</Code>, unchanged,
          with its own copies of every component so future redesigns can’t break
          it. The idea came from Lynn Fisher’s archive, where every edition of
          her site stays online. It let me start from a blank page without
          deleting work I’m proud of, and anyone can compare the two versions.
        </P>
        <Figure
          src={`${IMG}/archive.png`}
          crop={470}
          alt="The archive page: the heading Archive above a grayscale thumbnail of the 2025 homepage, labeled 2025."
          width={1440}
          height={900}
          caption="The archive: every edition, grayscale until you hover it."
        />
        <P>
          <strong>References.</strong>
        </P>
        <List>
          <li>
            <a
              href="https://www.rachelchen.tech"
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              rachelchen.tech
            </a>
            : a mono header, serif headlines, and tiles that are one brand color
            with one real object on them.
          </li>
          <li>
            <a
              href="https://lynnandtonic.com/archive"
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              Lynn Fisher’s archive
            </a>
            : every past edition of a site, kept online.
          </li>
        </List>
        <Sitemaps />
      </>
    ),
  },
  {
    id: "prototyping-and-testing",
    title: "Prototyping & testing",
    headline: "I prototyped in code, so reviewers test the real thing.",
    content: (
      <>
        <P>
          I prototyped in code instead of static mockups. That’s how I work
          fastest, and it means reviewers see real type rendering, the real
          switch and the real mobile layout.
        </P>
        <p className={label}>Versions so far</p>
        <Versions />
        <InProgress title="Testing">
          Reviewers see the old site and then the prototype, with the same
          scenario and the same questions. What testing shows, and what I change
          because of it, goes here.
        </InProgress>
      </>
    ),
  },
  {
    id: "ideas-to-test",
    title: "Ideas to test",
    headline: "Eight ideas in the prototype, and how I’ll test each one.",
    content: (
      <>
        <P>
          None of these are final. Each one is in the prototype so reviewers can
          react to it, and each comes with the evidence behind it and what would
          tell me it works.
        </P>
        <Decision n={1} title="A headline where design is the noun">
          <P>
            <strong>The idea.</strong> The first line makes design my identity
            and engineering how I work: “I’m Erin, a product designer who
            engineers.”
          </P>
          <P>
            <strong>Why.</strong> Six of the seven product designers in the
            landscape said “designer” on their first screen. Code is valued in
            the job posts, but it’s 2% of what they ask a portfolio to show.
          </P>
          <P>
            <strong>How I’ll test it.</strong> Show reviewers two versions of
            the first line and ask what job I’m applying for. The second version
            adds an angle, like research or building end to end, to see which
            one they repeat back.
          </P>
          <HeadlineSpecimen />
        </Decision>
        <Decision n={2} title="A switch for the engineers">
          <P>
            <strong>The idea.</strong> A toggle with a pen nib on one side and{" "}
            <Code>{"</>"}</Code> on the other moves the italics from “designer”
            to “engineers” without shifting the words around them. The side is
            saved in the URL as <Code>?side=engineer</Code>, so one site could
            serve both audiences.
          </P>
          <P>
            <strong>Why.</strong> The two kinds of hires in the landscape were
            judged on different things. The product designers had case studies,
            and the design engineers had shipped code, small demos and short
            posts.
          </P>
          <P>
            <strong>How I’ll test it.</strong> Watch whether design reviewers
            notice the switch and whether it reads as a plus or a distraction,
            then ask an engineer to find the engineering work. The alternatives
            to compare are a separate engineering page and a short note on how
            each project was built.
          </P>
          <SwitchSpecimen />
        </Decision>
        <Decision n={3} title="Curating hard">
          <P>
            <strong>The idea.</strong> Six case studies on Work, and seven side
            projects on a Fun page, “Side quests, small tools, &amp; one app
            Apple rejected.” The widgets are gone.
          </P>
          <P>
            <strong>Why.</strong> Curation is the top portfolio ask in the job
            posts. The research also pushes back on the number: every product
            designer in the landscape showed three to five case studies, so six
            is above that range.
          </P>
          <P>
            <strong>How I’ll test it.</strong> Compare a Work page with four
            case studies against one with six, and track which projects
            reviewers open and which ones they remember.
          </P>
        </Decision>
        <Decision n={4} title="Titles that say what it does">
          <P>
            <strong>The idea.</strong> Each title says what the project does for
            people, and the label under it shows proof, like a rating or active
            users, instead of a tech stack.
          </P>
          <P>
            <strong>Why.</strong> Shipped work is the second-biggest portfolio
            ask. In the landscape, everyone who had real work put it first, and
            Mitul was hired as a design engineer on project cards with real
            numbers.
          </P>
          <P>
            <strong>How I’ll test it.</strong> After two minutes on the site,
            ask reviewers which projects they remember and what they remember
            about them. A title or a proof number coming back means it worked.
          </P>
          <Retitled />
        </Decision>
        <Decision n={5} title="Thumbnails built from the real thing">
          <P>
            <strong>The idea.</strong> Each tile is one brand color with one
            object on it. Where possible, the object is real UI rebuilt in code,
            so it stays sharp and shows the design itself. These three are live
            components, not images.
          </P>
          <P>
            <strong>Why.</strong> Visual craft is almost a quarter of portfolio
            asks, and interaction and flows is 19%. The landscape doesn’t point
            to any one visual style, so this idea rests on the job posts more
            than on other portfolios.
          </P>
          <P>
            <strong>How I’ll test it.</strong> Ask reviewers what each project
            is from its tile alone, before they read the title.
          </P>
          <LiveThumbs />
        </Decision>
        <Decision n={6} title="An experience list that says what I did">
          <P>
            <strong>The idea.</strong> The last column says what I did at each
            place instead of my job title, for example “Ran 500+ research
            interviews for NIH studies.”
          </P>
          <P>
            <strong>Why.</strong> Mitul’s homepage listed what he did at each
            job, and it carried a career switch into a design engineering role.
            It’s one example, so this is a weaker signal than the others.
          </P>
          <P>
            <strong>How I’ll test it.</strong> Ask reviewers what I did before
            design. If they can name the research, the list is doing its job.
          </P>
        </Decision>
        <Decision n={7} title="About, rewritten around design">
          <P>
            <strong>The idea.</strong> About connects my research interviews to
            how I design, instead of opening with my path into software.
          </P>
          <P>
            <strong>Why.</strong> No career switcher in the landscape led with
            their old career. Three showed it on the homepage, two kept it on
            About, and one left it out. Sara got the most from hers by turning
            it into a niche.
          </P>
          <P>
            <strong>How I’ll test it.</strong> Try the psychology and
            neuroscience background in three places: a line on the homepage,
            About only, or a case study that draws on it. Ask reviewers whether
            it reads as a strength or a detour.
          </P>
          <Rewrites />
        </Decision>
        <Decision n={8} title="Every line true">
          <P>
            <strong>The idea.</strong> Every claim traces back to my resume or
            to work someone can see. I checked every claim on my OrderSync case
            study against the project and cut three.
          </P>
          <P>
            <strong>Why.</strong> The job posts ask for proof. Shipped work
            comes up in 27% of portfolio asks and measurable impact in 14%, and
            a claim nobody can check proves nothing.
          </P>
          <P>
            <strong>How I’ll test it.</strong> Ask reviewers which lines they’d
            want proof for, and make sure each of those links to it.
          </P>
          <CutClaims />
        </Decision>

        <H3>Design system</H3>
        <P>
          The prototype so far uses five color tokens and three typefaces, each
          with one job. The main components are SiteShell, SiteHeader, Tile,
          HeroHeadline and SideSwitch.
        </P>
        <Tokens />
        <TypeSpecimens />
        <P>
          <strong>Accessibility so far.</strong>
        </P>
        <List>
          <li>
            The switch is announced as a switch (<Code>{'role="switch"'}</Code>)
            with a label.
          </li>
          <li>Every interactive element has a visible focus ring.</li>
          <li>Motion respects reduced-motion settings.</li>
          <li>Every tile has alt text that describes what’s in it.</li>
        </List>
      </>
    ),
  },
  {
    id: "results",
    title: "Results",
    headline: "The first screen now leads with design work.",
    content: (
      <>
        <Compare />
        <Figure
          src={`${IMG}/after-home-full.png`}
          alt="The full 2026 homepage: the headline and switch, the experience list, then two columns of project tiles."
          width={1440}
          height={2384}
          caption="The 2026 homepage."
        />
        <InProgress title="Session results">
          How many reviewers reach a design case study within two minutes on the
          old site and on the new one, what they remember, and the best quotes.
          Real numbers only.
        </InProgress>
        <InProgress title="After launch">
          Replies from design roles, and which case studies get opened.
        </InProgress>
      </>
    ),
  },
  {
    id: "reflection",
    title: "Reflection",
    // Drafted from the project history for Erin to rewrite in her own words.
    content: (
      <>
        <P>
          Counting changed how I saw the old site. I knew it leaned technical,
          but 13 mentions of code against two of design, and one tile in ten
          about my work, made it concrete enough to act on.
        </P>
        <P>
          The job posts changed what I think engineering is for in a portfolio.
          88% of them mention prototyping or code somewhere, but only 2% of
          portfolio asks do. Building is still how I work, so the switch keeps
          it a click away, but it isn’t the headline anymore.
        </P>
        <P>
          Next time I’d do the research first. I started building on September
          20 and pulled the job posts on October 1. Curation turned out to be
          the top portfolio ask, and knowing that sooner might have saved me the
          design page I threw away.
        </P>
        <P>
          Next: finish the reviewer sessions, write the design side of every
          case study, and fix the link preview, which still calls me a software
          engineer.
        </P>
      </>
    ),
  },
];

export default function Design() {
  return (
    <SiteShell>
      <CaseStudyArticle
        label="Portfolio redesign • 2026"
        title="Redesigning my portfolio for the job I actually want"
        sections={SECTIONS}
      />
    </SiteShell>
  );
}
