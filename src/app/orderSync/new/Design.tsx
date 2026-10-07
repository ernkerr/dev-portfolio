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

const SECTIONS: CaseStudySection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <Lead>
          OrderSync reads purchase orders in any format, from EDI to PDFs to
          plain email, and puts them straight into a company’s ERP. I
          redesigned its marketing site and built the design system behind it,
          so every page, from the homepage to the billing screen, looks like
          the same company.
        </Lead>
        <P>
          Its buyers run food distributors and industrial suppliers. The site
          has one job: get them to book an intro call.
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
  },
  {
    id: "problem",
    title: "Problem",
    headline:
      "How might we make skeptical buyers trust OrderSync enough to book a call?",
    content: (
      <>
        <P>
          The old homepage looked like a lot of AI startups, with gradient
          text, glowing orbs and a gradient button. The people buying it type
          orders for a living, and many of them had already been burned by
          order software.
        </P>
        <Shots
          items={[SHOTS.oldHero]}
          caption="The homepage before the redesign."
        />
        <Columns
          items={[
            {
              title: "It looked like hype",
              text: "Purple-to-cyan gradient text and glowing orbs, for buyers who had heard big promises before.",
            },
            {
              title: "2 buttons competing",
              text: "A filled black Sign In sat next to the gradient Book a free intro call, so the one action that mattered had competition.",
            },
            {
              title: "1 navy, 4 names",
              text: "3 shades of the brand navy lived in the code under 4 names, and one of them was black.",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "goal",
    title: "Goal",
    headline: "More visitors book an intro call.",
    content: (
      <>
        <div className="border-t border-site-line pt-5">
          <p className={label}>How I’ll know I’ve succeeded</p>
          <p className="mt-3 max-w-measure font-serif text-column-title text-site-ink">
            The share of visitors who book a call goes up, tracked from the
            page view to the completed booking.
          </p>
        </div>
        <UserFlow />
      </>
    ),
  },
  {
    id: "research",
    title: "Research",
    headline: "Who buys this, and what have they been through?",
    content: (
      <>
        <P>
          I ran the project in 5 phases. By the afternoon of May 18, research
          and structure were checked off, and visual design hadn’t started.
        </P>
        <ProcessTracker caption="My process tracker as it stood on May 18, 2026, rebuilt from my screenshot of it." />

        <H3>Talking with James</H3>
        <P>
          I started with James, OrderSync’s founder, who spent years in supply
          chain operations before he started it. We talked about who the site
          was for. His buyers are business people expecting nothing fancy,
          because they don’t want the wheel reinvented. He didn’t want the
          site to be too futuristic either. He wanted it clean and simple.
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
            The reference James shared on April 6, 2026: ElevenLabs’ Sound
            Effects page.
          </Caption>
        </figure>

        <H3>Who buys</H3>
        <P>
          On May 18, before any visual design, I wrote up who buys tools
          like this, what they complain about and who else they could buy
          from. Buyers already complain out loud in reviews, so I read
          competitors’ Capterra reviews and customer stories and sorted the
          people in them into 4 groups.
        </P>
        <Columns
          count={2}
          items={[
            {
              title: "Drowning in data entry",
              text: "An ops manager at a 50 to 500 person distributor, with 3 to 5 reps typing orders into the ERP all day.",
            },
            {
              title: "First big retailer, first EDI panic",
              text: "A CEO who just landed Walmart or Whole Foods and got sent EDI requirements that read like a foreign language.",
            },
            {
              title: "Two systems, one frustrated team",
              text: "An IT or EDI manager with EDI for the big retailers and a manual process for every other order.",
            },
            {
              title: "The industrial volume problem",
              text: "A procurement director in oil and gas or industrial supply, where one wrong part number on a 200-line order can stop a job site.",
            },
          ]}
        />

        <H3>Buyers arrive already decided</H3>
        <P>
          In{" "}
          <Source href="https://go.trustradius.com/rs/827-FOI-687/images/2024%20B2B%20Buying%20Disconnect%20Year%20of%20the%20Brand%20Crisis.pdf">
            TrustRadius’s 2024 survey
          </Source>{" "}
          of 2,164 people who bought software or hardware, 78% of those who
          made a shortlist put products on it they’d heard of before they
          started looking, and 71% bought their first choice. So the page doesn’t have to teach anyone. It has to confirm they’re
          in the right place and make the call easy to book. Book a Call got
          its own button in the header, and Sign In became a plain link so the
          2 stop competing.
        </P>
        <HeaderCompare caption="The header before and after. Book a Call is the only chrome button on the page." />

        <H3>They’d been burned before</H3>
        <Quote>
          They said it would be 6-8 weeks. It’s been 9 months. And we’re not
          done
        </Quote>
        <P>
          That’s the title of a 1-star Capterra review of SPS Commerce, the
          incumbent in EDI, written by a company’s CEO in 2022. Reviews of SPS
          and TrueCommerce described surprise charges and setups that ran
          long. So I added 3 questions to the FAQ, in buyers’ words:
          “How long does it take to go live?”, “Do I need an IT team to set
          this up?” and “How is this different from SPS Commerce?”
        </P>

        <H3>Errors cost them real money</H3>
        <P>
          Retailers fine suppliers for mistakes.{" "}
          <Source href="https://www.supplychaindive.com/news/walmart-on-time-in-full-87-suppliers/550083/">
            Walmart charges 3%
          </Source>{" "}
          of the cost of goods on cases that miss its on-time, in-full
          standard.
          OrderSync’s customers already sold to retailers, so the homepage’s
          third card stopped pitching price and became “Catch Errors Before
          They Cost You.”
        </P>

        <H3>Competitors</H3>
        <P>
          I mapped 7 competitors, from the incumbent to AI startups.
        </P>
        <Table
          head={["Competitor", "How they pitched it", "Where they fell short"]}
          rows={[
            [
              "SPS Commerce",
              "“The intelligent supply chain network”",
              "Pricing complaints, a setup quoted at 6 to 8 weeks that took 9 months, EDI only",
            ],
            [
              "TrueCommerce",
              "Affordable EDI for the mid-market",
              "Surprise fees, year-long integrations",
            ],
            [
              "Cleo",
              "“Supply chain orchestration”",
              "Pricing for small companies, unclear terms",
            ],
            [
              "Orderful",
              "API-first EDI, 9-day onboarding",
              "EDI only, no PDF or email orders",
            ],
            [
              "Conexiom",
              "AI “Ideal Order Platform”",
              "Pricey, built for enterprise",
            ],
            ["Workist", "AI order automation for SAP", "Europe only"],
            [
              "Canals.ai",
              "AI-native, any format",
              "Early, no public pricing",
            ],
          ]}
        />
        <P>
          SPS Commerce and Orderful only handled EDI, and OrderSync reads
          every format. So I kept the headline, “One System for All Your
          Orders,” and the hero’s diagram shows PDF, email, EDI and CSV going
          into one place.
        </P>

        <H3>Landscape</H3>
        <P>
          I also looked at what buyers would compare OrderSync to: the
          homepages of 12 companies that sell EDI or read incoming orders, as
          they looked in May 2026.
        </P>
        <LandscapeShots caption="First screens from the Wayback Machine, May 2026. SPS Commerce, Orderful, Cleo, Canals, Choco, Y Meadows and Order1 didn’t archive cleanly enough to show, so they only count below where their text could be read." />
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
            ["Glowing orbs or blurred light", "1 of 5", "None"],
            ["A free tool in the hero", "0 of 10", "Try Free Tools"],
          ]}
        />
        <P>
          The category was plain: literal headlines, a button to book a
          meeting, and mostly blue. OrderSync’s old orbs and gradient text
          stood out for the wrong reason. So the redesign looks like what
          buyers expect from these sites, and stands out with 2 things almost
          nobody else had: the product in the hero, and a free tool to try
          first.
        </P>

        <H3>What research says about buyers like these</H3>
        <P>
          James’s read on his buyers lines up with published research on
          first impressions and business buying.
        </P>
        <Columns
          count={2}
          items={[
            {
              title: "Simple and typical looks best",
              text: (
                <>
                  In a{" "}
                  <Source href="https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/">
                    Google study
                  </Source>
                  , people rated real company homepages from industries like
                  energy, chemicals and finance. Simple sites that looked like a
                  typical company site rated best, decided in as little as 17
                  milliseconds. Unusual designs lost even when they were simple,
                  so I dropped the directions that went too far.
                </>
              ),
            },
            {
              title: "The look is the first test",
              text: (
                <>
                  When 2,684 people judged websites for{" "}
                  <Source href="https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility">
                    a Stanford study
                  </Source>
                  , the design’s look came up in 46.1% of their comments, more
                  than anything else. Experts in the field cared more about the
                  information, so the page also has to hold up once they read
                  it.
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
                  of 3,000 B2B buyers, buyers feared losing time, credibility
                  or even their job over a purchase that went wrong, and favored
                  brands that lowered that risk. A site that looks established
                  is one less risk.
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
                  with more than 1,000 US adults, adding “artificial
                  intelligence” to a product description made people less likely
                  to buy, most of all for risky purchases. The headline is about
                  orders, and AI comes up once, in the line under it.
                </>
              ),
            },
          ]}
        />
        <P>
          None of these studied distributors or ops managers, so they support
          the decisions, and only OrderSync’s own booking numbers can prove
          them.
        </P>
      </>
    ),
  },
  {
    id: "ideation",
    title: "Ideation",
    headline: "Every section had to earn its spot on the way to Book a Call.",
    content: (
      <>
        <P>
          By May 18 I’d wireframed the homepage 3 times. Version 1 had 6 free
          tools, a “Stop Paying for Complexity” card and 3 calls to action. In
          version 2 the price card became “Catch Errors Before They Cost
          You,” 3 FAQs came from buyers’ objections, and the closing line went
          from the old site’s “Ready to Simplify Order Processing?” to “Still
          Typing Orders Into Your ERP?”, the question buyers were already
          asking themselves.
        </P>
        <WireframeRounds caption="Wireframes v1, v2 and v3, each with my notes on what changed. Open one to read it." />
        <P>
          In version 3 I wrote the research behind every section in the
          margin, so each block on the page traces back to something buyers
          said or did.
        </P>
        <AnnotatedWireframe />

        <H3>Mood board</H3>
        <P>
          The logo started as a full chrome wordmark, and we simplified it to
          just the O. For the site, the question was how much chrome to bring
          onto the page. I collected chrome I liked, and left out the
          directions that went too far, because they didn’t match who we were
          selling to.
        </P>
        <MoodBoard />

        <H3>2 directions, then a rule</H3>
        <P>
          Later that day I built 2 directions in code. The first put everything
          on near-black. The second went light, with chrome only on a few
          accents.
        </P>
        <Directions caption="The 2 directions I built on May 18, 2026." />
        <P>
          Between the 2, I wrote a design-system sheet with the rule I kept
          for the rest of the project: “Chrome is an accent, not a
          personality.” No gradients on backgrounds, no orbs or glow, and the
          chrome button only for the main call to action. The light direction
          is the one that followed it.
        </P>
        <ChromeRules />
        <P>
          On May 29 I replaced the near-black with the navy already in
          OrderSync’s code, #0E172B, and gave it 1 name instead of 4.
        </P>
      </>
    ),
  },
  {
    id: "decisions",
    title: "Design decisions",
    content: (
      <>
        <H3>What I took from the research</H3>
        <Columns
          count={2}
          items={[
            {
              title: "Book a Call, always",
              text: "71% of buyers bought their first choice, so Book a Call sits in the header on every page, as the only chrome button.",
            },
            {
              title: "Answer the SPS question",
              text: "SPS buyers were burned on price and setup time, so the FAQ answers how long setup takes and how OrderSync is different.",
            },
            {
              title: "Errors over price",
              text: "Chargebacks cost suppliers real money, so the third card is about catching errors before they reach the ERP.",
            },
            {
              title: "In their words",
              text: "“Ready to Simplify Order Processing?” became “Still Typing Orders Into Your ERP?”",
            },
            {
              title: "Every format, one place",
              text: "SPS Commerce and Orderful only handled EDI, so the hero shows every format going into one system.",
            },
            {
              title: "Nothing fancy",
              text: "The gradients, glowing orbs and glass panels are gone. Buyers who don’t want the wheel reinvented get a layout they already know.",
            },
          ]}
        />

        <H3>Navy for the voice, chrome for the action</H3>
        <P>
          Navy carries the headings in light mode and becomes the page in dark
          mode. Chrome shows up in 2 places: the Book a Call button, and a
          silver glint that sweeps across the key words of each headline once,
          like light catching metal.
        </P>
        <ShineDemo caption="Live, from OrderSync’s code: the glint plays once when it scrolls into view, and hovering the gray words replays it. Set in Geist here, not OrderSync’s Satoshi." />
      </>
    ),
  },
  {
    id: "results",
    title: "Results",
    content: (
      <>
        <P>
          The redesign shipped on June 19, 2026, as 8 pull requests touching
          237 files, from the homepage to sign-in and billing.
        </P>
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
          The visitor-to-booking rate before and after June 19, from PostHog,
          if you can see it. Real numbers only.
        </InProgress>
        <InProgress title="What didn’t ship">
          The proof stats and the testimonial from wireframe v3 aren’t on the
          homepage, and it still shows 5 free tools, not 3. Add a line on why,
          or leave it out.
        </InProgress>
      </>
    ),
  },
  {
    id: "reflection",
    title: "Reflection",
    // Drafted for Erin to rewrite in her own words.
    content: (
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
        <BuildNote href="/orderSync">
          Next.js and Tailwind, with color tokens that flip for dark mode, 4
          shared components, and a script that screenshots every page to
          check it against the system.
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
          // The top of the new homepage, cropped like the redesign study's.
          <div
            className="overflow-hidden border border-site-line"
            style={{ aspectRatio: "2880 / 1200" }}
          >
            <Image
              src={SHOTS.heroLight.src}
              alt={SHOTS.heroLight.alt}
              width={2880}
              height={1800}
              priority
              sizes="(min-width: 1600px) 1552px, 100vw"
              className="h-auto w-full"
            />
          </div>
        }
        label="OrderSync • 2026"
        title="Making an AI ordering tool look like something you’d trust with your orders"
        sections={SECTIONS}
      />
    </SiteShell>
  );
}
