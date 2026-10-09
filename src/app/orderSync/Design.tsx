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
  Figure,
  H3,
  InProgress,
  inlineLink,
  label,
  Lead,
  P,
  Stats,
  Table,
  Wide,
} from "@/components/site/prose";
import { BuildNote } from "@/components/site/appStudy";
import {
  BusinessCard,
  CardDirections,
  ChromeRules,
  DropOff,
  Directions,
  HeaderCompare,
  UserFlow,
  VisualDirection,
  WireframeRounds,
  FlowPlanLink,
  Personas,
  SHOTS,
  ShineDemo,
  Shots,
} from "./figures";
import BeforeHero, { BeforeFindings } from "./BeforeHero";
import CompetitorLandscape from "./CompetitorLandscape";
import LiveHero from "./LiveHero";
import { ErrorsCard, NewFaqs } from "./ShippedPieces";
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

// A method's key finding in a few words, so its value reads before the
// evidence under it.
function KeyFinding({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-measure">
      <p className={label}>Key finding</p>
      <p className="mt-2 font-serif text-subhead text-site-ink">{children}</p>
    </div>
  );
}

// A research finding, then the piece of the shipped page it changed.
function ResearchFinding({
  title,
  text,
  children,
}: {
  title: string;
  text: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="max-w-measure">
        <p className="font-serif text-column-title text-site-ink">{title}</p>
        <p className="mt-2 text-body-sm text-site-ink/75">{text}</p>
      </div>
      {children}
    </div>
  );
}

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
        so every page, from the homepage to the billing screen, is visually
        consistent.
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
      <H3>Heuristic evaluation</H3>
      <P>
        I ran a heuristic evaluation of the old homepage and found 5 problems,
        each tied to a usability principle.
      </P>
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
      <P>
        To answer this, I used 5 methods: a{" "}
        <a href="#interview" className={inlineLink}>
          stakeholder interview
        </a>
        ,{" "}
        <a href="#secondary" className={inlineLink}>
          secondary research
        </a>
        ,{" "}
        <a href="#personas" className={inlineLink}>
          proto-personas
        </a>
        , a{" "}
        <a href="#journey-map" className={inlineLink}>
          user journey map
        </a>{" "}
        and a{" "}
        <a href="#competitors" className={inlineLink}>
          competitive analysis
        </a>
        .
      </P>

      <H3 id="interview">Stakeholder interview</H3>
      <KeyFinding>Clean and expected, with nothing too innovative.</KeyFinding>
      <P>
        I started with James, OrderSync’s founder, and we talked about who the
        site was for. His buyers are business people who don’t want the wheel
        reinvented, so he wanted the site to feel clean and expected, with
        nothing too innovative.
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

      <hr className="mt-16 border-site-line" />
      <H3 id="secondary">Secondary research and reviews</H3>
      <P>
        Published data and competitors’ reviews showed what buyers worry about,
        and 2 of those worries changed the homepage.
      </P>
      <ResearchFinding
        title="Mistakes cost suppliers real money."
        text={
          <>
            <Source href="https://www.supplychaindive.com/news/walmart-on-time-in-full-87-suppliers/550083/">
              Walmart fines suppliers 3%
            </Source>{" "}
            of the cost of goods on every case that arrives late or incomplete.
            So the third card became “Catch Errors Before They Cost You.”
          </>
        }
      >
        <ErrorsCard />
      </ResearchFinding>
      <ResearchFinding
        title="Setups that run for months are the worry."
        text="Reviews of SPS Commerce and TrueCommerce describe setups quoted in weeks that ran for months, so the FAQ now answers how long it takes to go live. The redesign added 2 more questions with it, on IT and on SPS Commerce."
      >
        <NewFaqs />
      </ResearchFinding>
    </>
  ),
  personas: (
    <>
      <hr className="mt-16 border-site-line" />
      <H3 id="personas">Proto-personas</H3>
      <KeyFinding>
        3 buyers, 3 triggers: a retailer’s EDI rules, too much typing, and a
        system they’ve outgrown.
      </KeyFinding>
      <P>
        I had no buyers to interview, so I mined what buyers had already
        written: competitors’ reviews and customer stories. 3 personas kept
        coming up.
      </P>
      <Wide>
        <Personas caption="Proto-personas, built from reviews and customer stories rather than interviews. Every quote is word for word." />
      </Wide>

      <hr className="mt-16 border-site-line" />
      <H3 id="journey-map">User journey map</H3>
      <KeyFinding>
        Every path starts with stress, so each page has to reassure them and
        make the next step easy.
      </KeyFinding>
      <P>
        2 paths for each persona, from what sets them off to a booked call, or
        to staying in touch. Pick a persona and a path to switch the map.
      </P>
      <Wide>
        <UserJourney caption="Made for this case study from the May research and the pages that shipped. Feelings at the start come from the research; the later ones are what each page is designed to make them feel." />
      </Wide>
    </>
  ),
  competitors: (
    <>
      <hr className="mt-16 border-site-line" />
      <H3 id="competitors">Competitive analysis</H3>
      <KeyFinding>
        Competitors all asked for a demo, and almost none showed the product.
      </KeyFinding>
      <Columns
        items={[
          {
            title: "Everyone asked for a demo.",
            text: "All 7 with a readable button asked for a demo or a meeting. OrderSync’s says Book a Call: 30 minutes with James.",
          },
          {
            title: "Headlines said what they do.",
            text: "5 of 9 said what they do with orders. OrderSync’s already did: “One System for All Your Orders.”",
          },
          {
            title: "Almost nobody showed the product.",
            text: "Only Conexiom did. OrderSync’s hero now shows every format going into the ERP.",
          },
        ]}
      />
      <CompetitorLandscape />
    </>
  ),
  wireframes: (
    <>
      <H3 id="ia">Information architecture</H3>
      <P>
        Alongside the wireframes, I mapped every page on the site: the
        homepage’s 10 sections, 11 free tools, the blog, the EDI guides, about
        110 SEO pages and the app.
      </P>
      <Wide>
        <Figure
          src={`${PROCESS}/site-map.webp`}
          alt="My site map: ordersync.io branching into the landing page and its 10 sections, Free Tools with 11 tools and an index, the Blog, EDI Guides, Programmatic SEO pages and the App. Below it, the conversion flow from search to the landing page, then to Book a Call or the newsletter."
          width={1280}
          height={1337}
          caption="My site map. 389 indexed pages, with the landing page as the redesign’s scope."
        />
      </Wide>

      <H3 id="wireframes">Wireframes</H3>
      <P>
        I wireframed the homepage 3 times. Most sections kept their copy because
        it already brought in search traffic, so each round changed only a few,
        and some of those changes didn’t make it to the final site.
      </P>
      <Wide>
        <WireframeRounds caption="Only the sections that changed. The third wireframe kept the second’s layout and added the research behind each section in the margin. Faded means it didn’t ship." />
      </Wide>
    </>
  ),
  visual: (
    <>
      <H3>Visual direction</H3>
      <P>
        The logo started as a full chrome wordmark, and we simplified it to just
        the O. For the site, the question was how much chrome to bring onto the
        page. I collected chrome I liked, and left out the directions that went
        too far, because they didn’t match who we were selling to.
      </P>
      <Wide>
        <VisualDirection />
      </Wide>

      <H3 id="directions">Design directions</H3>
      <P>
        After the wireframes, I built 2 directions in code: everything on
        near-black, or light with chrome on a few accents. In between, I wrote
        the rule I kept for the rest of the project: “Chrome is an accent, not a
        personality.” The light direction followed it.
      </P>
      <Directions caption="The 2 directions I built." />
      <ChromeRules />
      <P>
        Later, the near-black became the navy already in OrderSync’s code,
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
            text: "The logo was already chrome, but James wanted the site clean and expected, with nothing too innovative. So: beyond the logo, chrome on one button and a silver glint on key words.",
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
        bottom of the homepage, and give the EDI Inspector a clearer path to a
        call, since 3.4 times as many visits start there as on the homepage. The
        tracking needs a fix too: PostHog has 8 finished bookings since June 26,
        but 6 of them came from visits with no page view, so they can’t be
        traced back to a page.
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
    headline:
      "Make booking a call the obvious next step, and measure every step to it.",
    content: E.goal,
  },
  {
    id: "research",
    title: "Research",
    headline:
      "Who buys OrderSync, and what do they need to see before they book a call?",
    content: (
      <>
        {E.research}
        {E.personas}
        {E.competitors}
      </>
    ),
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
    headline: "4 principles, from the research and from James.",
    content: E.principles,
  },
  {
    id: "system",
    title: "System",
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
