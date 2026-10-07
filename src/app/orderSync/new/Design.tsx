import Image from "next/image";
import type { ReactNode } from "react";
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
  Quote,
  Table,
} from "@/components/site/prose";
import { BuildNote } from "@/components/site/appStudy";
import {
  AnnotatedWireframe,
  ChromeRules,
  Directions,
  HeaderCompare,
  LandscapeShots,
  MoodBoard,
  ProcessTracker,
  SHOTS,
  ShineDemo,
  Shots,
  UserFlow,
  WireframeRounds,
} from "./figures";
import LiveHero from "./LiveHero";

// The research is Erin's own, written before any visual design: DESIGN.md,
// the 3 wireframes and target-audience-segments.html, committed to the
// ordersync-static repo in bfe0798 on May 18, 2026 at 2:03 PM Pacific. Her
// screenshots of the tracker and wireframes, from 1:03 PM Pacific that day,
// are in ~/Desktop/projects/Current/ordersync/wireframes. Decisions after
// that are dated in that repo's DECISIONS.md. What shipped is checked
// against dictionary/en.json on OrderSync's main branch. The earlier drafts
// with 4 versions per section are in commit 8d9f127. Every outside number is
// checked in docs/ordersync-research/stat-check.md.

const PROCESS = "/images/orderSync/process";

// Published research, opened in a new tab. Sources and caveats are in the
// research notes: docs/ordersync-research/audience-research.md.
function Source({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={inlineLink}
    >
      {children}
    </a>
  );
}

// The new version in parts, so the drafts page at /orderSync can offer each
// one as version E of its matching section. SECTIONS below puts them back
// together in this page's own order.
export const E = {
  overview: (
    <>
      <Lead>
        OrderSync reads purchase orders in any format, from EDI to PDFs to plain
        email, and puts them straight into a company’s ERP. I redesigned its
        marketing site and built the design system behind it, so every page,
        from the homepage to the billing screen, looks like the same company.
      </Lead>
      <P>
        Its buyers run food distributors and industrial suppliers. The site has
        one job: get them to book an intro call.
      </P>
      <Facts
        items={[
          {
            label: "Role",
            value: "Design engineer (contract)",
          },
          { label: "Timeline", value: "May 18 to June 19, 2026" },
          {
            label: "Team",
            value: "Me, with James, OrderSync’s founder",
          },
        ]}
      />
    </>
  ),
  problem: (
    <>
      <P>
        The old homepage looked like a lot of AI startups. Its buyers type
        orders for a living, and many had already been burned by order software.
      </P>
      <Shots
        items={[SHOTS.oldHero]}
        caption="The homepage before the redesign."
      />
      <Columns
        items={[
          {
            title: "It looked like hype",
            text: "Purple-to-cyan gradients and glowing orbs, for buyers who’d heard big promises before.",
          },
          {
            title: "2 buttons competing",
            text: "In the header, Sign In was the filled black button, and Get Started was a plain link.",
          },
          {
            title: "1 navy, 4 names",
            text: "3 shades of the brand navy lived in the code under 4 names, one of them black.",
          },
        ]}
      />
    </>
  ),
  goal: (
    <>
      <div className="border-t border-site-line pt-5">
        <p className={label}>How I’ll know I’ve succeeded</p>
        <p className="mt-3 max-w-measure font-serif text-column-title text-site-ink">
          The share of visitors who book a call goes up, tracked from the page
          view to the completed booking.
        </p>
      </div>
      <UserFlow />
    </>
  ),
  research: (
    <>
      <P>
        I ran the project in 5 phases. On May 18, before any visual design, I
        finished the research: who buys tools like this, what they complain
        about, and who else they could buy from.
      </P>
      <ProcessTracker caption="My process tracker on May 18, 2026, rebuilt from my screenshot of it." />

      <H3>Talking with James</H3>
      <P>
        I started with James, OrderSync’s founder, who spent years in supply
        chain operations before he started it. We talked about who the site was
        for. His buyers are business people expecting nothing fancy, because
        they don’t want the wheel reinvented. He didn’t want the site to be too
        futuristic either. He wanted it clean and simple.
      </P>
      <figure>
        <Image
          src={`${PROCESS}/james-reference.webp`}
          alt="The reference James shared: ElevenLabs’ Sound Effects page, a white app with a plain sidebar, a row of image tiles and a simple list of sounds with play buttons."
          width={1800}
          height={1195}
          sizes="(min-width: 1024px) 896px, 100vw"
          className="h-auto w-full border border-site-line"
        />
        <Caption>
          The reference James shared on April 6, 2026: ElevenLabs’ Sound Effects
          page.
        </Caption>
      </figure>

      <H3>Who buys</H3>
      <P>
        Buyers complain out loud in reviews, so I read competitors’ Capterra
        reviews and customer stories and sorted the people in them into 4
        groups.
      </P>
      <Columns
        count={2}
        items={[
          {
            title: "Drowning in data entry",
            text: "An ops manager at a distributor whose reps type orders into the ERP all day.",
          },
          {
            title: "First big retailer, first EDI panic",
            text: "A CEO who just landed Walmart and got EDI requirements that read like a foreign language.",
          },
          {
            title: "Two systems, one frustrated team",
            text: "An EDI manager with EDI for the big retailers and a manual process for everything else.",
          },
          {
            title: "The industrial volume problem",
            text: "A procurement director whose 200-line orders stop a job site over one wrong part number.",
          },
        ]}
      />

      <H3>Buyers arrive already decided</H3>
      <P>
        In{" "}
        <Source href="https://go.trustradius.com/rs/827-FOI-687/images/2024%20B2B%20Buying%20Disconnect%20Year%20of%20the%20Brand%20Crisis.pdf">
          TrustRadius’s 2024 survey
        </Source>{" "}
        of 2,164 software and hardware buyers, 78% of those with a shortlist
        already knew the products on it, and 71% bought their first choice. So
        the page has to confirm they’re in the right place and make the call
        easy to book. Book a Call got its own button in the header, and Sign In
        became a plain link.
      </P>
      <HeaderCompare caption="The header before and after." />

      <H3>They’d been burned before</H3>
      <Quote>
        They said it would be 6-8 weeks. It’s been 9 months. And we’re not done
      </Quote>
      <P>
        That’s the title of a 1-star Capterra review of SPS Commerce, the
        incumbent in EDI, from a company’s CEO in 2022. Reviews of SPS and
        TrueCommerce described surprise charges and setups that ran long. So I
        added 3 FAQs in buyers’ words: “How long does it take to go live?”, “Do
        I need an IT team to set this up?” and “How is this different from SPS
        Commerce?”
      </P>

      <H3>Errors cost them real money</H3>
      <P>
        <Source href="https://www.supplychaindive.com/news/walmart-on-time-in-full-87-suppliers/550083/">
          Walmart charges suppliers 3%
        </Source>{" "}
        of the cost of goods on cases that miss its on-time, in-full standard.
        OrderSync’s customers already sold to retailers, so the homepage’s third
        card went from pitching price to “Catch Errors Before They Cost You.”
      </P>

      <H3>Landscape</H3>
      <P>
        I mapped 7 competitors, from SPS Commerce to AI startups. Here’s what
        their homepages, and those of 5 other order-entry tools, looked like in
        May 2026.
      </P>
      <LandscapeShots caption="First screens from the Wayback Machine, May 2026. The other 7 sites didn’t archive cleanly, so they only count below where their text could be read." />
      <Table
        head={["What competitors did", "How many", "What OrderSync does now"]}
        rows={[
          [
            "Main button books a demo or meeting",
            "7 of 7, and 6 say “demo”",
            "Book a Call, a 30-minute call with James",
          ],
          [
            "Headline says what it does with orders",
            "5 of 9",
            "“One System for All Your Orders”",
          ],
          [
            "Headline says AI",
            "4 of 9",
            "AI only in the line under the headline",
          ],
          [
            "Hero shows the product",
            "1 of 5",
            "A diagram of every format going into the ERP",
          ],
          ["Blue or navy is the main color", "4 of 5", "Navy"],
          ["Glowing orbs or blurred light behind the hero", "1 of 5", "None"],
          ["A free tool in the hero", "0 of 10", "Try Free Tools"],
        ]}
      />
      <P>
        The category was plain: literal headlines, a button to book a meeting,
        and mostly blue. OrderSync’s orbs and gradient text stood out for the
        wrong reason. So the redesign looks like what buyers expect, and stands
        out with 2 things almost nobody else had: the product in the hero, and a
        free tool to try first. SPS Commerce and Orderful only handled EDI, so
        the hero shows every format going into one system.
      </P>

      <H3>What research says about buyers like these</H3>
      <Columns
        items={[
          {
            title: "Simple and typical looks best",
            text: (
              <>
                In a{" "}
                <Source href="https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/">
                  Google study
                </Source>{" "}
                of real company homepages, simple sites that looked typical
                rated best, in as little as 17 milliseconds. Unusual designs
                lost even when they were simple, so the far-out directions went.
              </>
            ),
          },
          {
            title: "A bad purchase is personal",
            text: (
              <>
                In a{" "}
                <Source href="https://betaisthenewnormal.com/wp-content/uploads/2018/09/CEB_Google_promotion-emotion-whitepaper-full_beta_2018.pdf">
                  CEB and Google survey
                </Source>{" "}
                of 3,000 B2B buyers, buyers feared losing time, credibility or
                their job over a bad purchase, and favored brands that lowered
                that risk.
              </>
            ),
          },
          {
            title: "“AI” alone can lower trust",
            text: (
              <>
                In{" "}
                <Source href="https://news.wsu.edu/press-release/2024/07/30/using-the-term-artificial-intelligence-in-product-descriptions-reduces-purchase-intentions/">
                  6 experiments
                </Source>{" "}
                with over 1,000 US adults, “artificial intelligence” in a
                product description made people less likely to buy, most of all
                for risky purchases.
              </>
            ),
          },
        ]}
      />
      <P>
        None of these studied distributors, so they back James’s read on his
        buyers, and only OrderSync’s booking numbers can prove it.
      </P>
    </>
  ),
  wireframes: (
    <>
      <P>
        I wireframed the homepage 3 times. Version 1 had 6 free tools, a “Stop
        Paying for Complexity” card and 3 calls to action. Version 2 traded the
        price card for “Catch Errors Before They Cost You,” added 3 FAQs from
        buyers’ objections, and changed the closing line from “Ready to Simplify
        Order Processing?” to “Still Typing Orders Into Your ERP?” In version 3,
        I wrote the research behind each section in the margin.
      </P>
      <WireframeRounds caption="Wireframes v1 to v3, May 18, 2026. Open one to read it." />
      <AnnotatedWireframe />
    </>
  ),
  visual: (
    <>
      <H3>Mood board</H3>
      <P>
        The logo started as a full chrome wordmark, and we simplified it to just
        the O. For the site, the question was how much chrome to bring onto the
        page. I collected chrome I liked, and left out the directions that went
        too far, because they didn’t match who we were selling to.
      </P>
      <MoodBoard />

      <H3>2 directions, then a rule</H3>
      <P>
        Later that day I built 2 directions in code: everything on near-black,
        or light with chrome on a few accents. In between, I wrote the rule I
        kept for the rest of the project: “Chrome is an accent, not a
        personality.” The light direction followed it.
      </P>
      <Directions caption="The 2 directions I built on May 18, 2026." />
      <ChromeRules />
      <P>
        On May 29 the near-black became the navy already in OrderSync’s code,
        #0E172B, with 1 name instead of 4.
      </P>
    </>
  ),
  summary: (
    <>
      <H3>What I took from the research</H3>
      <Columns
        count={2}
        items={[
          {
            title: "Book a Call, always",
            text: "Buyers arrive decided, so it’s in the header on every page.",
          },
          {
            title: "Answer the SPS question",
            text: "The FAQ covers setup time, IT and how OrderSync is different.",
          },
          {
            title: "Errors over price",
            text: "Chargebacks cost suppliers real money, so the third card is about errors.",
          },
          {
            title: "In their words",
            text: "“Still Typing Orders Into Your ERP?”",
          },
          {
            title: "Every format, one place",
            text: "Some competitors only handled EDI, so the hero shows every format.",
          },
          {
            title: "Nothing fancy",
            text: "No background orbs or purple gradient text, in a layout buyers already know.",
          },
        ]}
      />
    </>
  ),
  palette: (
    <>
      <H3>Navy for the voice, chrome for the action</H3>
      <P>
        Navy carries the headings in light mode and becomes the page in dark
        mode. Chrome shows up twice: on the Book a Call pill in the header, and
        as a silver glint that sweeps once across each headline’s key words.
      </P>
      <ShineDemo caption="Live, from OrderSync’s code: the glint plays once when it scrolls into view, and hovering the gray words replays it. Set in Geist here, not OrderSync’s Satoshi." />
    </>
  ),
  rollout: (
    <>
      <P>
        The redesign shipped on June 19, 2026, as 8 pull requests touching 237
        files, from the homepage to sign-in and billing.
      </P>
    </>
  ),
  finalDesigns: (
    <>
      <Shots
        items={[
          { ...SHOTS.oldHero, label: "Before" },
          { ...SHOTS.heroLight, label: "After" },
        ]}
      />
      <Shots
        items={[SHOTS.heroDark]}
        caption="Dark mode, where the navy becomes the page."
      />
      <InProgress title="Bookings">
        The visitor-to-booking rate before and after June 19, from PostHog. Real
        numbers only.
      </InProgress>
      <InProgress title="What didn’t ship">
        The proof stats and the testimonial from wireframe v3 aren’t on the
        homepage, and it still shows 5 free tools, not 3. Add a line on why, or
        leave it out.
      </InProgress>
    </>
  ),
  lessons: (
    <>
      <P>
        The research did the most work on the words. It told me what buyers
        worried about and in what order, and the look followed from who was
        reading: business people who don’t want the wheel reinvented.
      </P>
      <P>
        Next time I’d talk to buyers myself. Reviews told me what went wrong
        with other vendors, but not how someone reads our page.
      </P>
    </>
  ),
  system: (
    <>
      <BuildNote href="/orderSync">
        Next.js and Tailwind, with color tokens that flip for dark mode, 4
        shared components, and a script that screenshots every page to check it
        against the system.
      </BuildNote>
    </>
  ),
};

export const SECTIONS: CaseStudySection[] = [
  { id: "overview", title: "Overview", content: E.overview },
  {
    id: "problem",
    title: "Problem",
    headline:
      "How might we make skeptical buyers trust OrderSync enough to book a call?",
    content: E.problem,
  },
  {
    id: "goal",
    title: "Goal",
    headline: "More visitors book an intro call.",
    content: E.goal,
  },
  {
    id: "research",
    title: "Research",
    headline: "Who buys this, and what have they been through?",
    content: E.research,
  },
  {
    id: "ideation",
    title: "Ideation",
    headline: "Every section had to earn its spot on the way to Book a Call.",
    content: (
      <>
        {E.wireframes}
        {E.visual}
      </>
    ),
  },
  {
    id: "decisions",
    title: "Design decisions",
    content: (
      <>
        {E.summary}
        {E.palette}
      </>
    ),
  },
  {
    id: "results",
    title: "Results",
    content: (
      <>
        {E.rollout}
        {E.finalDesigns}
      </>
    ),
  },
  {
    id: "reflection",
    title: "Reflection",
    // Drafted for Erin to rewrite in her own words.
    content: (
      <>
        {E.lessons}
        {E.system}
      </>
    ),
  },
];

// OrderSync's homepage hero, live, as the banner above the title.
export const HERO = <LiveHero />;

export const LABEL = "OrderSync • 2026";
export const TITLE =
  "Making an AI ordering tool look like something you’d trust with your orders";

export default function Design() {
  return (
    <SiteShell>
      <CaseStudyArticle
        hero={HERO}
        label={LABEL}
        title={TITLE}
        sections={SECTIONS}
      />
    </SiteShell>
  );
}
