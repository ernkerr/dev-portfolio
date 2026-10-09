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
  Stats,
  Table,
} from "@/components/site/prose";
import { BuildNote } from "@/components/site/appStudy";
import {
  AnnotatedWireframe,
  BusinessCard,
  CardDirections,
  ChromeRules,
  DropOff,
  Directions,
  HeaderCompare,
  UserFlow,
  FlowPlanLink,
  LandscapeShots,
  MoodBoard,
  Personas,
  ProcessMap,
  SHOTS,
  ShineDemo,
  Shots,
  WireframeRounds,
} from "./figures";
import BeforeHero, { BeforeFindings } from "./BeforeHero";
import LiveHero from "./LiveHero";
import UserJourney from "./UserJourney";

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

// The case study in parts, so the drafts page at /orderSync/drafts can offer
// each one as version E of its matching section. SECTIONS below puts them
// together in this page's own order, with the principles and the system.
export const E = {
  overview: (
    <>
      <Lead>
        OrderSync reads purchase orders in any format, from EDI to PDFs to plain
        email, and puts them straight into a company’s ERP.
      </Lead>
      <Lead>
        I redesigned its marketing site and built the design system behind it,
        so every page, from the homepage to the billing screen, looks like the
        same company.
      </Lead>
      <Stats
        items={[
          {
            label: "Pull requests",
            value: "8",
            tip: "The redesign shipped on June 19, 2026, as 8 pull requests.",
          },
          {
            label: "Files changed",
            value: "237",
            tip: "Files the 8 pull requests touched, from the homepage to sign-in and billing.",
          },
          {
            label: "Gradients",
            value: "155 → 6",
            tip: "Gradient classes in the site’s code, just before and just after the redesign merged on June 19, 2026.",
          },
          {
            label: "Color references",
            value: "450 → 3",
            tip: "Places in the code that set a brand color. They now point to 3 navy values instead of loose hex codes under 4 names.",
          },
        ]}
      />
      <Facts
        items={[
          { label: "Role", value: "Design engineer (contract)" },
          { label: "Timeline", value: "May 18 to June 19, 2026" },
          {
            label: "Scope",
            value: "Marketing site, design system, business cards",
          },
        ]}
      />
    </>
  ),
  problem: (
    <>
      <P>
        OrderSync’s buyers already know their problem: orders arrive in every
        format, and someone types each one into the ERP. The homepage’s job was
        to confirm OrderSync fixes it, and make the call easy to book.
      </P>
      <P>
        Here it is the day before the redesign started, rebuilt live from its
        code.
      </P>
      <BeforeHero caption="Live, from OrderSync’s code on May 17, 2026. Set in Geist here, not OrderSync’s Satoshi." />
      <BeforeFindings />
    </>
  ),
  goal: (
    <>
      <p className={label}>Success metrics</p>
      <Columns
        items={[
          {
            title: "Primary metric",
            text: "Visitor-to-booking conversion rate. Every design decision serves it.",
          },
          {
            title: "Measured end to end",
            text: "Page views, clicks on each call to action, visits to the calendar and finished bookings.",
          },
          {
            title: "No target yet",
            text: "Finished bookings weren’t tracked, so there was no rate to set a target against.",
          },
        ]}
      />
      <H3 id="journey">User flow and measurement plan</H3>
      <P>
        I mapped the path down the homepage: the question a visitor has at each
        section, the section that answers it, and what to track there. It
        flagged the biggest gap: clicks on Book a Call were tracked, but not
        whether anyone finished booking.
      </P>
      <UserFlow
        caption={
          <>
            Rebuilt from my user flow and measurement plan, May 18, 2026.{" "}
            <FlowPlanLink />
          </>
        }
      />
    </>
  ),
  research: (
    <>
      <ProcessMap caption="What each phase produced. The research and wireframes were committed at 2:03 PM on May 18, 2026, and the first visual design file is from 2:51 PM that day." />

      <H3 id="interview">Stakeholder interview</H3>
      <P>
        I started with James, OrderSync’s founder, and we talked about who the
        site was for. His buyers are business people expecting nothing fancy,
        because they don’t want the wheel reinvented. He didn’t want the site to
        be too futuristic either. He wanted it clean and simple.
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

      <hr className="mt-10 border-site-line" />
      <H3 id="personas">Proto-personas</H3>
      <P>
        I had no buyers to interview, so I mined what buyers had already
        written: competitors’ reviews and customer stories. 3 personas kept
        coming up.
      </P>
      <Personas caption="Proto-personas, built from reviews and customer stories rather than interviews. Every quote is word for word." />

      <H3 id="journey-map">User journey map</H3>
      <P>
        Persona 1’s happy path, from the retailer’s email to a booked call, and
        where the page meets them at each stage.
      </P>
      <UserJourney caption="Made for this case study from the May research. The first 3 feelings come from that research; Reassured and Ready are what the page is designed to do." />

      <hr className="mt-10 border-site-line" />
      <H3>Secondary research</H3>
      <Columns
        count={2}
        items={[
          {
            title: "Buyers come to confirm, not to be convinced.",
            text: (
              <>
                In{" "}
                <Source href="https://go.trustradius.com/rs/827-FOI-687/images/2024%20B2B%20Buying%20Disconnect%20Year%20of%20the%20Brand%20Crisis.pdf">
                  TrustRadius’s 2024 survey
                </Source>{" "}
                of 2,164 buyers, 78% of those with a shortlist already knew the
                products on it, and 71% bought their first choice. So Book a
                Call goes in the header of every page.
              </>
            ),
          },
          {
            title: "The barrier is inertia, not doubt.",
            text: (
              <>
                In{" "}
                <Source href="https://parseur.com/blog/manual-data-entry-report">
                  Parseur’s 2025 survey
                </Source>{" "}
                of 500 U.S. workers, 46% had never used automation, and 27% said
                the decision wasn’t theirs to make. So the free tools stay, as a
                way to try it first.
              </>
            ),
          },
          {
            title: "Mistakes cost suppliers real money.",
            text: (
              <>
                <Source href="https://www.supplychaindive.com/news/walmart-on-time-in-full-87-suppliers/550083/">
                  Walmart charges suppliers 3%
                </Source>{" "}
                of the cost of goods on cases that miss its on-time, in-full
                standard. So the third card became “Catch Errors Before They
                Cost You.”
              </>
            ),
          },
          {
            title: "Setups that run for months are the worry.",
            text: "Reviews of SPS Commerce and TrueCommerce describe setups that ran long. So the FAQ answers “How long does it take to go live?”",
          },
        ]}
      />

      <hr className="mt-10 border-site-line" />
      <H3 id="competitors">Competitive analysis</H3>
      <P>
        In May I compared how 7 competitors positioned themselves, from SPS
        Commerce, the incumbent in EDI, to AI startups like Canals.ai. SPS
        Commerce and Orderful only handled EDI, which left OrderSync something
        to own: every format in one system. For this case study, I went back to
        their homepages as they were that month.
      </P>
      <LandscapeShots caption="First screens from the Wayback Machine, May 2026. The other 7 sites didn’t archive cleanly, so they only count below where their text could be read." />
      <H3>What the competitors showed</H3>
      <Columns
        count={2}
        items={[
          {
            title: "Everyone asked for a demo.",
            text: "All 7 with a readable button asked for a demo or a meeting, and 6 said “demo.” OrderSync’s says Book a Call: 30 minutes with James.",
          },
          {
            title: "Most were blue or navy.",
            text: "4 of 5 used blue or navy as the main color, and none had gradient text. The redesign moved OrderSync to navy.",
          },
          {
            title: "Headlines said what they do.",
            text: "5 of 9 said what the product does with orders, and 4 of 9 said AI. OrderSync’s already did: “One System for All Your Orders.”",
          },
          {
            title: "Almost nobody showed the product.",
            text: "Only Conexiom put its product in the hero. OrderSync’s now shows every format going into the ERP.",
          },
        ]}
      />
    </>
  ),
  wireframes: (
    <>
      <H3 id="wireframes">Low-fidelity wireframes</H3>
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

      <H3 id="directions">2 directions, then a rule</H3>
      <P>
        The same day as the wireframes, I built 2 directions in code: everything
        on near-black, or light with chrome on a few accents. In between, I
        wrote the rule I kept for the rest of the project: “Chrome is an accent,
        not a personality.” The light direction followed it.
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
  principles: (
    <>
      <Columns
        count={2}
        items={[
          {
            title: "Look like what buyers already know",
            text: (
              <>
                James’s buyers don’t want the wheel reinvented. So: a familiar
                layout, a literal headline, navy and white. Research backs this:
                in{" "}
                <Source href="https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/">
                  Google’s study of company homepages
                </Source>
                , simple, typical sites made the best first impression, and most
                competitors used blue or navy.
              </>
            ),
          },
          {
            title: "One clear next step",
            text: "71% of buyers bought their first choice, which makes the page’s job to confirm. So: Book a Call in the header on every page, and Sign In, for returning customers, as a plain link.",
          },
          {
            title: "Answer the worry before the call",
            text: (
              <>
                Reviews of the big EDI vendors described setups that ran for
                months. So: an FAQ on go-live time, next to ones on IT and SPS
                Commerce. Research on B2B buying explains why: in a{" "}
                <Source href="https://betaisthenewnormal.com/wp-content/uploads/2018/09/CEB_Google_promotion-emotion-whitepaper-full_beta_2018.pdf">
                  CEB and Google survey of 3,000 buyers
                </Source>
                , they feared losing time, credibility or their job over a bad
                purchase.
              </>
            ),
          },
          {
            title: "Chrome is an accent",
            text: "The logo was already chrome, but James wanted it clean and not futuristic. So: beyond the logo, chrome on one button and a silver glint on key words.",
          },
        ]}
      />
      <HeaderCompare caption="The header before and after: Get Started became Book a Call, a button of its own, and Sign In became a plain link." />
      <H3>The research behind each decision</H3>
      <Table
        head={["Decision", "Research behind it"]}
        rows={[
          [
            "A plain headline, with the line under it saying what OrderSync does",
            <>
              <Source href="https://www.nngroup.com/articles/homepage-design-principles/">
                NN/g’s homepage guidelines
              </Source>
              : say plainly what the company does, in users’ words. In{" "}
              <Source href="https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/">
                Nielsen’s tests
              </Source>
              , objective copy beat promotional copy.
            </>,
          ],
          [
            "One filled button, Book a Call, and Sign In as a plain link",
            <>
              NN/g on{" "}
              <Source href="https://www.nngroup.com/articles/utility-navigation/">
                utility navigation
              </Source>
              : sign-in is a secondary action that can be played down if it
              stays top right. NN/g’s homepage guidelines add that emphasizing
              everything leaves nothing prominent.
            </>,
          ],
          [
            "Book a Call as the only chrome button",
            <>
              The{" "}
              <Source href="https://lawsofux.com/von-restorff-effect/">
                Von Restorff effect
              </Source>
              : the one item that looks different is the one people remember, as
              long as the emphasis is used sparingly.
            </>,
          ],
          [
            "An FAQ on setup time, IT and SPS before the call",
            <>
              NN/g on{" "}
              <Source href="https://www.nngroup.com/articles/faqs-deliver-value/">
                FAQs
              </Source>
              : prospects judge a vendor by whether its FAQ lets them set their
              concerns aside before spending money.
            </>,
          ],
          [
            "Free tools as a second path",
            <>
              NN/g’s{" "}
              <Source href="https://www.nngroup.com/articles/b2b-usability/">
                B2B research
              </Source>
              : buyers resist handing over contact details, so a vendor has to
              earn credibility first.
            </>,
          ],
          [
            "No gradients, orbs or glass, in a calm, typical layout",
            <>
              <Source href="https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/">
                Google’s study
              </Source>
              : simple, typical company sites made the best first impression, in
              as little as 17 milliseconds.
            </>,
          ],
          [
            "Copy in buyers’ words",
            <>
              Nielsen’s{" "}
              <Source href="https://www.nngroup.com/articles/ten-usability-heuristics/">
                heuristic #2
              </Source>
              : use the user’s language, not the company’s.
            </>,
          ],
          [
            "One system for every page",
            <>
              Nielsen’s heuristic #4,{" "}
              <Source href="https://www.nngroup.com/articles/consistency-and-standards/">
                consistency and standards
              </Source>
              : a consistent site is predictable and easier to learn.
            </>,
          ],
        ]}
      />
      <P>
        One place the research pushes back: in{" "}
        <Source href="https://www.nngroup.com/articles/b2b-usability/">
          NN/g’s B2B study
        </Source>
        , buyers ranked pricing first of 28 kinds of information. OrderSync’s
        pricing fluctuates based on lots of factors, so they need to book a
        call.
      </P>
      <P>
        None of these studied distributors or ops managers, so they explain why
        the choices should work, and only OrderSync’s booking numbers can show
        that they did.
      </P>
    </>
  ),
  systemFacts: (
    <>
      <P>
        The brand’s navy lived in the code under 4 names, so every tweak meant
        hunting through hex codes and names. I turned the look into a small
        system: 5 navies, 9 color roles that flip on their own in dark mode, and
        4 shared components, a button, a section, a heading and a label.
      </P>
      <Stats
        items={[
          {
            label: "Color references",
            value: "450 → 3",
            tip: "Places in the code that set a brand color. They now point to 3 navy values instead of loose hex codes under 4 names.",
          },
          {
            label: "Gradients",
            value: "155 → 6",
            tip: "Gradient classes in the site’s code, just before and just after the redesign merged on June 19, 2026.",
          },
          {
            label: "Color roles used",
            value: "2,480",
            tip: "Times the code used a named color role, like surface or content, instead of a raw color, the day the redesign shipped.",
          },
          {
            label: "Files with one FAQ",
            value: "26",
            tip: "Files that now use the same FAQ component instead of their own.",
          },
        ]}
      />
      <P>
        To keep it that way, I wrote a script that visits every page in the
        sitemap, screenshots it in light and dark, flags any color outside the
        system, and compares each screenshot with the last approved one.
      </P>
    </>
  ),
  cards: (
    <>
      <H3>Beyond the site: business cards</H3>
      <P>
        The same system went onto James’s business cards: navy and white, with
        chrome on one small thing. One side is just his name, number and the
        company, typed out. The other has a QR code to book a call, the site’s
        one action.
      </P>
      <BusinessCard caption="The card we went with, both sides. His surname, number and the QR code are blurred for privacy." />
      <Table
        head={["Decision", "Research behind it"]}
        rows={[
          [
            "The site’s navy and chrome rule on the card",
            <>
              NN/g on{" "}
              <Source href="https://www.nngroup.com/articles/omnichannel-consistency/">
                consistency across channels
              </Source>
              : a consistent look makes a company seem organized and earns
              trust.
            </>,
          ],
          [
            "A labeled QR code to book a call, with the web address beside it",
            <>
              NN/g’s{" "}
              <Source href="https://www.nngroup.com/articles/qr-code-guidelines/">
                QR code guidelines
              </Source>
              : say what scanning does, since unlabeled codes aren’t trusted. In
              a{" "}
              <Source href="https://surveyinsights.org/?p=20208">
                2025 national survey
              </Source>
              , 38% typed the web address instead of scanning.
            </>,
          ],
          [
            "Chrome on one small arrow",
            <>
              The{" "}
              <Source href="https://lawsofux.com/von-restorff-effect/">
                Von Restorff effect
              </Source>
              : one item stands out only when nothing near it looks the same.
            </>,
          ],
          [
            "On the navy side, name largest, then title, then contact, with room around them",
            <>
              NN/g on{" "}
              <Source href="https://www.nngroup.com/articles/visual-hierarchy-ux-definition/">
                visual hierarchy
              </Source>
              : make the most important thing biggest, use no more than 3 sizes,
              and leave space around it.
            </>,
          ],
          [
            "No “Zero Errors” tagline",
            <>
              The FTC requires{" "}
              <Source href="https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation">
                evidence for factual claims
              </Source>
              , and in{" "}
              <Source href="https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/">
                Nielsen’s tests
              </Source>
              , cutting promotional language made a site easier to use, because
              readers stopped questioning the claims.
            </>,
          ],
        ]}
      />
      <CardDirections caption="Including the logo explorations. Contact details are blurred for privacy." />
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
      <H3>After launch</H3>
      <P>
        PostHog started recording on June 26, a week after launch, so these
        numbers show how the new site performs rather than a before and after.
      </P>
      <DropOff caption="From PostHog, June 26 to October 8, 2026, not counting OrderSync’s own team. Hover a step to see what it counts." />
      <P>
        People who start on the homepage click Book a Call at more than twice
        the rate of the site as a whole: 4 of 52, against 11 of 349. And 3 of
        the 4 who click go on to open the booking window, so the step from
        button to booking works.
      </P>
      <P>
        Next: move the FAQ’s answers higher, since 12 of 45 visits reach the
        bottom of the homepage, and track finished bookings, as the May plan
        called for.
      </P>
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
        with other vendors, but not how someone reads our page. And I’d set up
        tracking before launch, so there’s a before to compare with.
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
      "How might we help buyers confirm OrderSync fits, and make booking a call the easy next step?",
    content: E.problem,
  },
  {
    id: "goal",
    title: "Goal",
    headline: "Make booking a call the obvious next step, and measure every step to it.",
    content: E.goal,
  },
  {
    id: "research",
    title: "Research",
    headline:
      "Proto-personas and a 7-competitor analysis: buyers come to confirm, not to be convinced.",
    content: E.research,
  },
  {
    id: "principles",
    title: "Design principles",
    headline: "4 principles, from the research and from James.",
    content: E.principles,
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
    id: "system",
    title: "The system",
    headline: "One set of colors and parts for every page.",
    content: (
      <>
        {E.systemFacts}
        {E.palette}
        {E.cards}
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
