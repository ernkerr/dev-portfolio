"use client";

import { useState, type ReactNode } from "react";
import SiteShell from "@/components/site/SiteShell";
import CaseStudyArticle, {
  type CaseStudySection,
} from "@/components/site/CaseStudyArticle";
import {
  Code,
  Columns,
  Facts,
  H3,
  Lead,
  List,
  P,
  Quote,
  Table,
} from "@/components/site/prose";
import {
  Change,
  Chip,
  DraftKey,
  FigureSlot,
  Fill,
  HeaderCompare,
  Headline,
  Materials,
  NameMap,
  Note,
  Pattern,
  Persona,
  SHOTS,
  Shots,
  Slices,
  Subhead,
  Swatches,
  VersionTabs,
  Why,
  versionFor,
  type Mode,
  type Rec,
  type Swatch,
  type V,
  type Versions,
} from "./drafts";
import {
  E,
  HERO as E_HERO,
  LABEL as E_LABEL,
  TITLE as E_TITLE,
} from "../Design";

// Every version of the write-up from
// career-ops/output/ordersync-case-study-master.md, section by section, so
// they can be compared in the real layout. Once Erin picks, the tabs go and
// one version per section stays.

/* ---------- Shared data ---------- */

const NAVY: Record<string, string> = {
  "navy-1": "#0E172B",
  "navy-2": "#151F34",
  "navy-3": "#1C274C",
  "navy-4": "#0F172A",
};

function NavyTable({ roles }: { roles: string[] }) {
  const rows: [string, string, string][] = [
    ["navy-1", "#0E172B", NAVY["navy-1"]],
    ["navy-2", "#151F34", NAVY["navy-2"]],
    ["navy-3", "#1C274C", NAVY["navy-3"]],
    ["navy-4", "#0F172A", NAVY["navy-4"]],
    ["navy-5", "navy-3 at 30%", "rgb(28 39 76 / 0.3)"],
  ];
  return (
    <Table
      head={["Token", "Value", "Role"]}
      rows={rows.map(([token, value, color], i) => [
        <Code key="t">{token}</Code>,
        <span key="v" className="whitespace-nowrap">
          <Chip color={color} />
          {value.startsWith("#") ? <Code>{value}</Code> : value}
        </span>,
        roles[i],
      ])}
    />
  );
}

const SEMANTIC: [string, string, string][] = [
  ["surface", "#FFFFFF", "navy-1"],
  ["surface-muted", "#F9FAFB", "navy-2"],
  ["surface-inverse", "navy-1", "#FFFFFF"],
  ["content", "navy-1", "#FFFFFF"],
  ["content-muted", "#64748B", "#D1D5DB"],
  ["content-subtle", "#9CA3AF", "#9CA3AF"],
  ["content-link", "navy-3", "#E5E7EB"],
  ["content-inverse", "#FFFFFF", "navy-1"],
  ["line", "#E5E7EB", "#374151"],
];

function tokenCell(value: string) {
  return (
    <span className="whitespace-nowrap">
      <Chip color={NAVY[value] ?? value} />
      <Code>{value}</Code>
    </span>
  );
}

function SemanticTokens() {
  return (
    <>
      <Subhead>Semantic tokens (flip automatically in dark mode)</Subhead>
      <Table
        head={["Token", "Light", "Dark"]}
        rows={SEMANTIC.map(([token, light, dark]) => [
          <Code key="t">{token}</Code>,
          tokenCell(light),
          tokenCell(dark),
        ])}
      />
      <Subhead>Decisions worth calling out</Subhead>
      <List>
        <li>
          Raw navies never change between modes. Only semantic tokens flip, so
          nobody hand-writes <Code>dark:</Code> styles.
        </li>
        <li>
          navy-4 is the homepage’s old slate-900, one digit off navy-1. I made
          it a token instead of shifting the homepage by a pixel.
        </li>
        <li>Shadows stay pure black. Navy-tinted shadows looked muddy.</li>
        <li>
          Decorative blue became navy. Blue stayed only where it carries
          meaning, in data visualization.
        </li>
      </List>
    </>
  );
}

function palette(navyUse: string): Swatch[] {
  return [
    { name: "Navy", value: "#0E172B", fill: "#0E172B", use: navyUse },
    {
      name: "Night",
      value: "#151F34",
      fill: "#151F34",
      use: "The dark-mode page",
    },
    {
      name: "Harbor",
      value: "#1C274C",
      fill: "#1C274C",
      use: "Links and secondary headings",
    },
    { name: "Slate", value: "#64748B", fill: "#64748B", use: "Body text" },
    {
      name: "Mist",
      value: "#F9FAFB",
      fill: "#F9FAFB",
      use: "Quiet background bands",
    },
    {
      name: "Steel",
      value: "#9CA3AF to white",
      fill: "linear-gradient(120deg, #9CA3AF 0%, #9CA3AF 35%, #FFFFFF 50%, #9CA3AF 65%, #9CA3AF 100%)",
      use: "The chrome glint",
    },
  ];
}

/* ---------- 1. Title and header ---------- */

const HEADERS: Record<V, { label: string; title: string; content: ReactNode }> =
  {
    A: {
      label: "OrderSync • Shipped June 2026",
      title: "One design system for ordersync.io, from palette to page",
      content: (
        <Facts
          items={[
            {
              label: "Role",
              value:
                "Design Engineer (contract). Research, UX, visual design, design system, front-end build",
            },
            { label: "Timeline", value: "May 18 to June 19, 2026" },
            {
              label: "Team",
              value: (
                <>
                  Me, with James, OrderSync’s founder, who reviewed and merged
                  it
                </>
              ),
            },
            {
              label: "Skills",
              value:
                "Product design, design systems, UX research, front-end engineering",
            },
          ]}
        />
      ),
    },
    B: {
      label: "OrderSync • Shipped June 2026",
      title:
        "Trust in navy, strength in metal: one design system for ordersync.io",
      content: (
        <Facts
          items={[
            {
              label: "Role",
              value:
                "Design Engineer (contract). Research, UX, visual design, design system, front-end build",
            },
            { label: "Timeline", value: "May 18 to June 19, 2026" },
            {
              label: "Team",
              value:
                "Me, with James, OrderSync’s founder, who reviewed and merged it",
            },
            {
              label: "Skills",
              value:
                "Brand and visual design, design systems, UX research, front-end engineering",
            },
          ]}
        />
      ),
    },
    C: {
      label: "Marketing site redesign + design system · Shipped June 2026",
      title:
        "Making an AI ordering tool look like something you’d trust with your orders",
      content: (
        <>
          <Lead>
            I redesigned ordersync.io and built the design system behind it, so
            every page from the homepage to the billing screen now looks like
            the same company.
          </Lead>
          <Facts
            items={[
              {
                label: "Role",
                value: "Design Engineer (contract), design and front-end build",
              },
              { label: "Timeline", value: "May to June 2026, about a month" },
              {
                label: "Team",
                value: (
                  <>
                    Me and James, OrderSync’s founder, who reviewed and merged
                    everything
                  </>
                ),
              },
              {
                label: "Tools",
                value: (
                  <>
                    HTML wireframes, Next.js, Tailwind{" "}
                    <Fill>add Figma if you used it</Fill>
                  </>
                ),
              },
            ]}
          />
        </>
      ),
    },
    D: {
      label: "Marketing site · Brand · Design system · 2026",
      title:
        "Redesigning ordersync.io so skeptical buyers trust it enough to book a call",
      content: (
        <>
          <Pattern>
            Jessica’s outcome-first headline, plus scope in the meta.
          </Pattern>
          <Lead>
            I redesigned OrderSync’s marketing site, built the design system
            underneath it, and shipped it to every page, from the homepage to
            the billing screen, in about a month.
          </Lead>
          <Facts
            items={[
              {
                label: "Role",
                value: (
                  <>
                    Design Engineer (contract),{" "}
                    <Fill>sole designer? confirm</Fill>
                  </>
                ),
              },
              {
                label: "Team",
                value: (
                  <>
                    Me, plus James, OrderSync’s founder, reviewing and merging
                  </>
                ),
              },
              {
                label: "Timeframe",
                value: "About 1 month (May 18 to June 19, 2026)",
              },
              {
                label: "Scope",
                value: "The whole site, sign-in and billing included",
              },
            ]}
          />
        </>
      ),
    },
    E: {
      label: E_LABEL,
      title: E_TITLE,
      content: (
        <P>E opens with OrderSync’s hero, live, at the top of the page.</P>
      ),
    },
  };

const HEADER_VERSIONS: Versions = {
  A: HEADERS.A.content,
  B: HEADERS.B.content,
  C: HEADERS.C.content,
  D: HEADERS.D.content,
  E: HEADERS.E.content,
};

/* ---------- 2 to 13 ---------- */

type Draft = { id: string; title: string; versions: Versions };

const DRAFTS: Draft[] = [
  {
    id: "overview",
    title: "Overview",
    versions: {
      A: (
        <>
          <Headline>
            How might we make ordersync.io feel like one trustworthy product,
            and turn more visitors into booked calls?
          </Headline>
          <P>
            OrderSync reads purchase orders in any format (EDI, PDF, CSV, email)
            and syncs them straight into a company’s ERP. The marketing site is
            measured on one number: visitors who book an intro call. But it had
            grown page by page. The brand navy existed as three hex values under
            four different names, pages leaned on 155 gradient utilities and a
            glow and glassmorphism kit, and every visual tweak meant hunting
            through hex strings.
          </P>
        </>
      ),
      B: (
        <>
          <Lead>
            OrderSync automates purchase orders for distributors and industrial
            suppliers. I audited a site that had grown page by page and defined
            a visual language: navy for trust, metal for strength. Then I
            rebuilt it as a token-based system with four primitives, automatic
            dark mode, and an audit tool that checks every page. It shipped as 8
            PRs across 237 files.
          </Lead>
          <Subhead>Context</Subhead>
          <Headline>
            Built for people who move physical goods, where one typo costs real
            money.
          </Headline>
          <P>
            OrderSync reads purchase orders in any format (EDI, PDF, CSV, email)
            and syncs them into a company’s ERP. Its buyers run food
            distributors, oil and gas suppliers and wholesale operations. A
            single miskeyed part number means a short shipment, a chargeback or
            a stalled job site. The site has one job: turn a visitor into a
            booked intro call.
          </P>
        </>
      ),
      C: (
        <>
          <Headline>
            People who type orders for a living don’t trust AI on sight.
          </Headline>
          <P>
            OrderSync reads purchase orders in any format (EDI, PDF,
            spreadsheets, plain email) and drops them straight into a company’s
            ERP. The people buying it run food distributors and industrial
            suppliers, where one wrong part number means a short shipment or a
            fine from a retailer.
          </P>
          <P>
            And they’ve been burned before. In one review I read, an SPS
            Commerce setup quoted at 6 to 8 weeks took 9 months. So the site had
            one job: look calm and dependable enough that someone books a call.
          </P>
        </>
      ),
      D: (
        <>
          <Pattern>
            Jessica’s four-part summary, plus Nicole’s business need vs. user
            need.
          </Pattern>
          <P>
            <strong>Context.</strong> OrderSync is an AI tool that reads
            purchase orders in any format and puts them straight into a
            company’s ERP. The site has one job: get buyers to book an intro
            call.
          </P>
          <P>
            <strong>Problem.</strong> The site had been built one page at a
            time. <Why /> It looked like a lot of AI startups (gradients,
            glowing orbs), and the brand color lived under four different names
            in the code. For buyers who’d already been burned by order software,
            it didn’t read as dependable.
          </P>
          <P>
            <strong>Solution.</strong> I rebuilt the look around navy for trust
            and chrome for strength, cut the homepage down to what buyers
            actually needed, and turned it into a small design system so every
            page stays consistent.
          </P>
          <P>
            <strong>Impact.</strong> Shipped across the whole site in about a
            month. <Fill>Booking result, if you have it.</Fill>
          </P>
          <Columns
            count={2}
            items={[
              { title: "Business need", text: "More booked intro calls." },
              {
                title: "User need",
                text: "Confidence that this tool won’t turn into another expensive mistake.",
              },
            ]}
          />
        </>
      ),
    },
  },
  {
    id: "solution",
    title: "Solution & outcomes",
    versions: {
      A: (
        <>
          <Headline>
            A navy design system with tokens that flip for dark mode, four
            primitives, and an audit that checks every page.
          </Headline>
          <div className="grid gap-4 md:grid-cols-3">
            <FigureSlot caption="5 navies, 9 semantic tokens, automatic dark mode">
              The palette, plus a light/dark toggle clip.
            </FigureSlot>
            <FigureSlot caption="Four primitives every page is built from">
              The component sheet.
            </FigureSlot>
            <FigureSlot caption="An audit that screenshots every page in light and dark">
              The audit’s contact sheet.
            </FigureSlot>
          </div>
          <Subhead>Outcomes</Subhead>
          <List>
            <li>Shipped June 19, 2026 as 8 PRs touching 237 files</li>
            <li>450 color references now resolve to 3 hex values</li>
            <li>Components used semantic tokens 2,480 times at launch</li>
            <li>Gradient utilities cut from 155 to 6</li>
            <li>One FAQ pattern replaces one-offs across 26 files</li>
            <li>
              <Fill>
                Conversion or booking change since launch, from PostHog, if you
                have it
              </Fill>
            </li>
          </List>
        </>
      ),
      B: (
        <>
          <Pattern>
            B’s “Impact” section, which sat at the end of that version.
          </Pattern>
          <List>
            <li>450 color references now resolve to 3 values</li>
            <li>Semantic tokens were used 2,480 times at launch</li>
            <li>Gradient utilities dropped from 155 to 6</li>
            <li>One FAQ pattern replaced one-offs across 26 files</li>
            <li>Every public page is checked in light and dark</li>
            <li>
              <Fill>
                Bookings or conversion since launch, if you can see them in
                PostHog
              </Fill>
            </li>
          </List>
        </>
      ),
      C: (
        <>
          <Headline>
            A quieter, navy site, with chrome saved for one button.
          </Headline>
          <Shots
            items={[
              { ...SHOTS.heroLight, label: "Light" },
              { ...SHOTS.heroDark, label: "Dark" },
            ]}
            caption="Navy carries the headings in light mode and becomes the page in dark mode."
          />
          <Shots
            items={[SHOTS.landing]}
            caption="A landing page in the same navy and white. Its main button is navy, like the homepage’s, and the chrome Book a Call pill stays in the header."
          />
          <Shots
            items={[SHOTS.tool]}
            caption="This tool page is built from the same parts as the homepage."
          />
          <P>
            Shipped in June 2026 across the whole site, sign-in and billing
            screens included.{" "}
            <Fill>
              Add booking numbers from PostHog if you can see them. If not, keep
              this qualitative.
            </Fill>
          </P>
        </>
      ),
      D: (
        <>
          <Pattern>
            Bethany’s numbered figures with captions that explain, and impact in
            real people’s words.
          </Pattern>
          <Shots
            items={[
              { ...SHOTS.heroLight, label: "Light" },
              { ...SHOTS.heroDark, label: "Dark" },
            ]}
            caption={
              <>
                <strong>Fig 1. Homepage hero, light and dark.</strong> Navy
                holds every headline, so the brand reads the same in either
                mode.
              </>
            }
          />
          <HeaderCompare
            caption={
              <>
                <strong>Fig 2. The header.</strong> Book a Call became a chrome
                pill, the only chrome button on the site. Sign In stepped back
                to a text link so it stops competing.
              </>
            }
          />
          <Shots
            items={[SHOTS.tool]}
            caption={
              <>
                <strong>Fig 3. EDI Inspector, a free tool page.</strong> Built
                from the same parts as the homepage, so it’s obviously the same
                company.
              </>
            }
          />
          <FigureSlot
            n={4}
            caption={
              <>
                <strong>Fig 4. Sign-in.</strong> Even the sign-in screen got the
                system.
              </>
            }
          >
            A screenshot of the sign-in screen.
          </FigureSlot>
          <Subhead>Impact</Subhead>
          <List>
            <li>
              <Fill>Booking change, if you can see it in PostHog</Fill>
            </li>
            <li>
              <Fill>
                One real reaction from James, a customer or the team. A single
                honest quote here does what Tumblr’s user quotes do.
              </Fill>
            </li>
          </List>
        </>
      ),
    },
  },
  {
    id: "problem",
    title: "Problem",
    versions: {
      A: (
        <>
          <Headline>The same navy was hiding under four names.</Headline>
          <P>
            #0E172B was called <Code>black</Code>, <Code>--navy</Code> and{" "}
            <Code>primary</Code>. #151F34 was <Code>--navy-bg</Code>. #1C274C
            was <Code>dark</Code>. Even Tailwind’s <Code>black</Code> token
            wasn’t black. 450 color references depended on those names, so every
            redesign tweak meant searching hex strings, CSS variables and
            Tailwind classes at once.
          </P>
          <NameMap />
        </>
      ),
      B: (
        <>
          <Headline>
            The brand was inconsistent in exactly the place it needed to look
            reliable.
          </Headline>
          <List>
            <li>
              <strong>One navy, four names.</strong> #0E172B was called{" "}
              <Code>black</Code>, <Code>--navy</Code> and <Code>primary</Code>.
              #151F34 was <Code>--navy-bg</Code>. #1C274C was <Code>dark</Code>.
              Even the token named black wasn’t black.
            </li>
            <li>450 color references depended on those names.</li>
            <li>
              <strong>Decoration on top:</strong> 155 gradient utilities, plus a
              glow, orb and glassmorphism kit.
            </li>
          </List>
          <NameMap />
        </>
      ),
      C: (
        <>
          <Headline>
            The site had grown one page at a time, and it showed.
          </Headline>
          <P>
            Every page had been styled on its own. Gradients all over the place,
            with a kit of glowing orbs layered on top. <Why /> It looked like a
            lot of other AI startups, which is a problem when your buyer already
            side-eyes AI.
          </P>
          <P>
            Underneath, the brand navy was living under four different names in
            the code (one of them was literally “black,” and it wasn’t black).
            So every small tweak turned into a scavenger hunt.
          </P>
          <Shots
            items={[SHOTS.oldHero]}
            caption={
              <>
                Before: <Fill>what pulled focus away from the CTA</Fill>.{" "}
                <Fill>circle the gradients and glows</Fill>
              </>
            }
          />
        </>
      ),
      D: (
        <>
          <Pattern>
            Bethany’s diagnosis headline and one real scenario, plus Nicole’s
            “problem to solve” line.
          </Pattern>
          <Headline>
            The problem: the site looked like an AI startup, and its buyers
            don’t trust AI startups <Why />
          </Headline>
          <P>
            Picture the buyer from my research who just landed their first Whole
            Foods account. The retailer sent EDI requirements that read like a
            foreign language, the big vendor quoted thousands just to connect,
            and now they’re Googling “SPS Commerce alternative” at night.
          </P>
          <P>
            They land on ordersync.io and see{" "}
            <Fill>
              what the old homepage showed first: the gradient hero, the glowing
              orbs
            </Fill>
            . Nothing on that screen tells them this company will still be here,
            and still charge the same, a year from now. <Why />
          </P>
          <P>
            Underneath, the code had the same problem in miniature. The brand
            navy lived under four different names (one of them was literally
            “black,” and it wasn’t black).
          </P>
          <P>
            <strong>Problem to solve:</strong> skeptical buyers need to trust
            OrderSync in their first few seconds on the site, and the old design
            gave them reasons to doubt it. <Why />
          </P>
          <Shots
            items={[SHOTS.oldHero]}
            caption={
              <>
                <strong>Fig 5. The old homepage.</strong>{" "}
                <Fill>Circle what pulled focus away from Book a Call.</Fill>
              </>
            }
          />
        </>
      ),
    },
  },
  {
    id: "research",
    title: "Research",
    versions: {
      A: (
        <>
          <Headline>
            Buyers don’t come to discover. They come to confirm.
          </Headline>
          <P>
            78% of B2B buyers with a shortlist put products on it they’d already
            heard of, and 71% bought their first choice (TrustRadius 2024,
            n=2,164). So the landing page isn’t a discovery tool. Its job is to
            confirm a decision and make booking a call easy. Before designing, I
            sized the market, mapped 7 competitors, and mined Capterra reviews
            of the three biggest.
          </P>
          <Subhead>Pain points</Subhead>
          <List ordered>
            <li>
              <strong>Every format needs its own workflow.</strong> EDI from big
              retailers, PDFs from small ones, spreadsheets from portals, and a
              person re-keying all of it. APQC found the worst performers spend
              $21 per order on paper, fax and email, against $6 on digital
              channels (2016).
            </li>
            <li>
              <strong>Incumbents broke trust.</strong> most SPS Commerce reviews
              that mention pricing were negative, and “6 to 8 week”
              implementations ran 9+ months.
            </li>
          </List>
          <P>
            <strong>Key insight:</strong> buyers describe this problem
            emotionally: “can’t cope,” “nightmare,” “a full-time person just for
            data entry.” The copy had to sound like them, not like a spec sheet.
          </P>
          <FigureSlot>
            target-audience-segments.html, with its 4 segments: Drowning in Data
            Entry · First Big Retailer, First EDI Panic · Two Systems, One
            Frustrated Team · The Industrial Volume Problem.
          </FigureSlot>
          <FigureSlot>The competitor table.</FigureSlot>
        </>
      ),
      B: (
        <>
          <Headline>
            The research boiled down to three brand attributes: trustworthy,
            strong and clear.
          </Headline>
          <Columns
            items={[
              {
                title: "Trustworthy",
                text: "Buyers had been burned. most SPS Commerce reviews that mention pricing were negative, “6 to 8 week” implementations ran 9+ months, and reviews were full of billing disputes and services never delivered.",
              },
              {
                title: "Strong",
                text: "These are industrial operations handling hundreds of line items per order. The product has to feel like equipment that won’t break.",
              },
              {
                title: "Clear",
                text: "78% of B2B buyers with a shortlist already knew the products on it (TrustRadius 2024). They arrive to confirm a choice, so the page has to be direct and easy to scan.",
              },
            ]}
          />
          <FigureSlot>
            target-audience-segments.html (four segments) and 2 or 3 pulled
            review quotes.
          </FigureSlot>
        </>
      ),
      C: (
        <>
          <Headline>
            Buyers show up already half-decided, looking for a reason to trust
            us.
          </Headline>
          <P>
            <Fill>
              First-hand moment: I worked the OrderSync booth at Expo West,
              talking to distributors face to face. What did you hear there? One
              sentence on it would be the strongest line in this section.
            </Fill>
          </P>
          <P>
            Then I went where buyers already complain out loud: reviews. I dug
            through Capterra reviews for the three biggest competitors and
            sorted buyers into 4 groups, from the small brand that just landed
            its first Walmart account to the industrial supplier keying in
            200-line orders by hand.
          </P>
          <P>
            Almost every group came back to the same two feelings: overwhelm,
            and a deep distrust around billing. One stat stuck with me too. 78%
            of B2B buyers with a shortlist already knew the products on it
            (TrustRadius 2024). So the site’s real job is reassurance: confirm
            they’re in the right place, and make the call easy to book.
          </P>
          <FigureSlot caption="4 buyer groups. Every one of them was some version of tired and wary.">
            target-audience-segments.html
          </FigureSlot>
        </>
      ),
      D: (
        <>
          <Pattern>
            Jessica’s persona card, Nicole’s numbered insights, and a
            how-might-we.
          </Pattern>
          <H3>Who I was designing for</H3>
          <Persona
            source="From my 4 buyer segments"
            name="The ops manager drowning in data entry"
            items={[
              {
                label: "Who",
                value:
                  "Runs operations at a food distributor or wholesaler with 50 to 500 people, managing 3 to 5 reps who type orders into the ERP all day.",
              },
              {
                label: "Motivation",
                value: "Stop the daily race to catch up on orders.",
              },
              {
                label: "Behavior",
                value:
                  "Searches “order entry automation” and usually has a shortlist in mind before clicking anything.",
              },
              {
                label: "Pain point",
                value:
                  "They’ve thought about hiring another person, but adding $50K of headcount to do more typing feels wrong on thin margins.",
              },
              {
                label: "Design consideration",
                value: (
                  <>
                    <Why /> Show the outcome fast, in their words, and make
                    booking a call feel low-risk.
                  </>
                ),
              },
            ]}
          />
          <P>
            <Fill>
              Expo West: if you heard something at the booth that matches this
              person, put it here. It’s the strongest proof you have.
            </Fill>
          </P>
          <H3>Key insights</H3>
          <Columns
            count={2}
            items={[
              {
                title: "1. Buyers arrive half-decided.",
                text: "78% of buyers with a shortlist already knew the products on it (TrustRadius 2024), so the page has to confirm, fast.",
              },
              {
                title: "2. Trust is the bottleneck.",
                text: "most SPS Commerce reviews that mention pricing were negative, and “6 to 8 weeks” turned into 9 months.",
              },
              {
                title: "3. Errors cost real money.",
                text: "Walmart charges suppliers 3% of the cost of goods on cases that miss its on-time, in-full standard.",
              },
              {
                title: "4. Their words beat ours.",
                text: "Reviews say “can’t cope” and “nightmare,” so the copy should sound like that.",
              },
            ]}
          />
          <Quote>
            How might we make a skeptical ops manager trust OrderSync in their
            first few seconds, and make booking a call feel like the easy next
            step?
          </Quote>
        </>
      ),
    },
  },
  {
    id: "goals",
    title: "Principles & goals",
    versions: {
      B: (
        <>
          <Columns
            items={[
              {
                title: "1. Trust over trend.",
                text: "Nothing that reads as hype. If an effect doesn’t build confidence, it goes.",
              },
              {
                title: "2. Engineered, not decorated.",
                text: "Precise type, strict tokens, and materials that feel manufactured.",
              },
              {
                title: "3. Every color has a job.",
                text: "Navy carries the voice, metal marks the action, and blue only shows data.",
              },
            ]}
          />
          <Note>
            Heads up: by your voice guide, “Engineered, not decorated” and
            “Trust over trend” are the “not X, Y” / “less X, more Y” patterns.
            Rename them if you keep this section.
          </Note>
        </>
      ),
      D: (
        <>
          <Pattern>
            Jessica’s design goals and a hypothesis, in place of principles.
          </Pattern>
          <H3>My design goals</H3>
          <List ordered>
            <li>Make the brand feel dependable at a glance.</li>
            <li>
              Cut the homepage down to what buyers need on the way to booking a
              call.
            </li>
            <li>Put the one action, Book a Call, where nobody can miss it.</li>
            <li>
              Build it so every future page stays on-brand without me in the
              room.
            </li>
          </List>
          <P>
            <strong>Hypothesis</strong> <Why />: if the site looks calm and
            consistent and makes Book a Call the clearest thing on every page,
            more visitors will book.{" "}
            <Fill>Tie this to the booking event you track in PostHog.</Fill>
          </P>
        </>
      ),
    },
  },
  {
    id: "wireframes",
    title: "IA & wireframes",
    versions: {
      A: (
        <>
          <Subhead>Information architecture</Subhead>
          <Headline>
            Every link in the header should be a page Google can index.
          </Headline>
          <List>
            <li>
              Three dropdowns (Features, Free Tools, Resources) instead of flat
              links. Every item is a unique, crawlable URL, with no
              query-parameter links.
            </li>
            <li>
              “Blog” became “Resources,” because it also holds EDI guides and
              provider comparisons.
            </li>
            <li>
              “Get Started” became “Book a Call,” the one action the page is
              measured on. Sign In dropped to a text link so two filled buttons
              don’t compete.
            </li>
            <li>
              Measurement plan: page views (GA4), CTA clicks (PostHog), calendar
              visits, completed bookings, and which section drove each booking.
            </li>
          </List>
          <HeaderCompare caption="The header, before and after." />
          <FigureSlot>
            sitemap-flow.html: the user flow and measurement plan.
          </FigureSlot>
          <Subhead>Wireframes</Subhead>
          <Headline>Three rounds of wireframes, each one tighter.</Headline>
          <List>
            <li>
              <strong>v1:</strong> six free tools, a “Stop Paying for
              Complexity” section, a newsletter block, three CTA touch points.
            </li>
            <li>
              <strong>v2:</strong>
              <ul className="mt-2 list-disc space-y-2 pl-6 marker:text-site-line">
                <li>
                  cut the tools from six to three (EDI Inspector, PO PDF
                  Extractor, Order Cost Calculator)
                </li>
                <li>
                  swapped the pricing section for “Catch Errors Before They Cost
                  You”
                </li>
                <li>changed the proof stats</li>
                <li>
                  rewrote the closing CTA from “Ready to Simplify Order
                  Processing?” to “Still Typing Orders Into Your ERP?”, in the
                  buyer’s own language
                </li>
              </ul>
            </li>
            <li>
              <strong>v3:</strong> annotated every section with the research
              note that justified it.
            </li>
          </List>
          <FigureSlot>
            wireframe.html, wireframe-v2.html and wireframe-v3.html side by
            side, with the changes circled.
          </FigureSlot>
        </>
      ),
      B: (
        <>
          <Headline>Structure first, then three visual directions.</Headline>
          <P>Wireframes, v1 to v3:</P>
          <List>
            <li>free tools cut from six to three</li>
            <li>
              the pricing section swapped for “Catch Errors Before They Cost
              You”
            </li>
            <li>
              the closing CTA rewritten in the buyer’s language as “Still Typing
              Orders Into Your ERP?”
            </li>
            <li>v3 annotated with the research behind every section</li>
          </List>
        </>
      ),
      C: (
        <>
          <Headline>
            Every section had to earn its spot on the way to “Book a Call.”
          </Headline>
          <P>
            I wireframed the homepage 3 times. Version 1 had 6 free tools, a
            pricing pitch, a newsletter signup and 3 separate calls to action,
            and honestly it was a lot.{" "}
            <Fill>Why you cut it down, in your words.</Fill>
          </P>
          <P>
            By version 2 I’d cut the tools down to 3 (EDI Inspector, PO PDF
            Extractor, Order Cost Calculator) and swapped the pricing pitch for
            “Catch Errors Before They Cost You.” <Why /> Errors were the thing
            buyers kept losing sleep over in the reviews, so that’s what I led
            with.
          </P>
          <P>
            I also rewrote the closing line in their words. “Ready to Simplify
            Order Processing?” became “Still Typing Orders Into Your ERP?” which
            is basically the question buyers were already asking themselves in
            reviews.
          </P>
          <P>
            In the header, “Get Started” became “Book a Call,” since that’s the
            one action the whole site is measured on. Sign In shrank to a text
            link so it stops competing for attention.
          </P>
          <FigureSlot caption="Each round lost a section. In v3 I wrote the research note behind every block in the margin.">
            wireframe.html, wireframe-v2.html and wireframe-v3.html side by
            side.
          </FigureSlot>
        </>
      ),
      D: (
        <>
          <Pattern>
            Jessica’s test cards, as decision cards, and Bethany’s numbered
            improvements.
          </Pattern>
          <Change
            n={1}
            title="The header"
            items={[
              {
                label: "What changed",
                value:
                  "Three dropdowns (Features, Free Tools, Resources). “Get Started” became “Book a Call,” and Sign In became a plain text link.",
              },
              {
                label: "Why",
                value:
                  "Book a Call is the one action the site is measured on, and two filled buttons were fighting for it. Every dropdown item is a real page, which helps search too.",
              },
              {
                label: "Result",
                value: (
                  <Fill>
                    clicks from the header to the booking page, if you track
                    them
                  </Fill>
                ),
              },
            ]}
          >
            <HeaderCompare />
          </Change>
          <Change
            n={2}
            title="The homepage story"
            items={[
              {
                label: "What changed",
                value:
                  "3 rounds of wireframes. The free tools went from 6 to 3, the pricing pitch became “Catch Errors Before They Cost You,” and the closing line became “Still Typing Orders Into Your ERP?”",
              },
              {
                label: "Why",
                value: (
                  <>
                    <Why /> Errors and manual typing were the pains buyers wrote
                    about most, so the page leads with them, in their language.
                  </>
                ),
              },
              {
                label: "Result",
                value: <Fill>any engagement data on the new sections</Fill>,
              },
            ]}
          />
          <P>
            <strong>Follow-up:</strong> in v3, I wrote the research note behind
            every block in the margin, so each section on the page traces back
            to something a buyer said.
          </P>
          <FigureSlot
            n={6}
            caption={
              <>
                <strong>Fig 6. Wireframes v1, v2 and v3 side by side.</strong>{" "}
                Each round lost a section.
              </>
            }
          >
            wireframe.html, wireframe-v2.html and wireframe-v3.html side by
            side.
          </FigureSlot>
        </>
      ),
    },
  },
  {
    id: "visual-direction",
    title: "Visual direction",
    versions: {
      A: (
        <>
          <Headline>
            I explored chrome, then chose the navy that was already there.
          </Headline>
          <P>
            My first previews went monochrome “Chrome/Metal” (zinc grays from
            #09090B to #FAFAFA), then added an emerald accent (#34D399), and
            tested three card treatments: chrome sheen, standard, and subtle
            surface. I landed on clean navy and white, Satoshi headings, black
            pill CTAs, and no glow, orbs or glassmorphism. The brand’s darkest
            color, #0E172B, was already in the codebase, just mislabeled.
            Consolidating it was stronger than inventing a new one.{" "}
            <Fill>Add your reasoning in one line.</Fill>
          </P>
          <FigureSlot>
            design-preview.html (Chrome/Metal), design-preview-v2.html (emerald)
            and design-system.html (card treatments), next to the final.
          </FigureSlot>
        </>
      ),
      B: (
        <>
          <Subhead>Visual directions (May 18)</Subhead>
          <List>
            <li>
              <strong>Chrome/Metal:</strong> monochrome zinc, from #09090B to
              #FAFAFA. <Why /> Strong, but cold on its own.
            </li>
            <li>
              <strong>Emerald:</strong> added a #34D399 accent.{" "}
              <Fill>Why it didn’t make it</Fill>
            </li>
            <li>
              <strong>Card studies:</strong> chrome sheen, standard, and subtle
              surface
            </li>
          </List>
          <P>The synthesis: navy as the voice, metal as the accent.</P>
          <Subhead>Color: navy for trust</Subhead>
          <Headline>
            #0E172B is near-black with a blue undertone. It keeps the contrast
            of black and adds the trust of blue.
          </Headline>
          <P>
            Navy is the color of banks, uniforms and enterprise software because
            it reads as stable and competent without shouting. <Why /> Using it
            for every heading and dark surface makes the brand feel established
            at first glance.
          </P>
          <Subhead>Material: metal for strength</Subhead>
          <Headline>
            Metal appears in exactly two places, both where attention matters
            most.
          </Headline>
          <List>
            <li>
              <strong>The chrome CTA.</strong> “Book a Call” is a chrome pill:
              <ul className="my-2 list-disc space-y-1 pl-6 marker:text-site-line">
                <li>a white-to-gray vertical gradient</li>
                <li>an inset white highlight along the top edge</li>
                <li>a soft shadow, and a 1px lift on hover</li>
                <li>brushed zinc in dark mode</li>
              </ul>
              It’s the one object on the page that looks machined and pressable.
            </li>
            <li>
              <strong>The silver Shine.</strong> Key words in hero headlines get
              a 120° sweep from gray #9CA3AF to a white highlight, like light
              catching polished steel. It plays once when the headline scrolls
              into view, replays on hover, and always finishes its pass, so it
              never stutters. It runs on the homepage and across the landing
              pages.
            </li>
          </List>
          <P>
            <Why /> Metal signals strength, precision and durability, which
            speaks directly to buyers who move physical goods. Keeping it to two
            touchpoints makes it a signal, not a theme.
          </P>
          <FigureSlot>
            A close-up of the chrome button in both themes.
          </FigureSlot>
          <Materials
            show="shine"
            caption="Live, from OrderSync’s code: the Shine sweep plays once when it scrolls into view, and hovering the gray words replays it. Set in Geist here, not Satoshi."
          />
        </>
      ),
      C: (
        <>
          <Headline>
            I started with chrome, then found the navy that was already there.
          </Headline>
          <P>
            My first direction was all metal: monochrome grays, chrome cards, a
            sheen on everything. <Why /> It felt strong, which I liked for an
            industrial audience, but cold, like a machine with nobody behind it.
          </P>
          <P>
            I tried an emerald accent next.{" "}
            <Fill>Why it didn’t make it, in one line.</Fill>
          </P>
          <P>
            What finally clicked was a deep navy hiding in the old code. <Why />{" "}
            It’s the blue of a work uniform or a bank statement, the stuff you
            trust to look the same every day. It reads as dependable without
            shouting.
          </P>
          <P>
            So navy became the voice of the site, and chrome got demoted to an
            accent. <Why /> Chrome reads as strength and precision, like the
            stainless steel that fills the warehouses and commercial kitchens
            these buyers spend their days in. It shows up exactly twice: on the
            Book a Call button in the header, and as a silver glint that sweeps
            across key words in each headline, like light catching polished
            metal.
          </P>
          <FigureSlot caption="Three directions. All-chrome looked strong but empty, so chrome shrank down to two moments.">
            design-preview.html (all chrome), design-preview-v2.html (emerald),
            and the final, side by side.
          </FigureSlot>
        </>
      ),
      D: (
        <>
          <Pattern>
            Nicole’s color-strategy comparison: options explored, then the
            winner and why.
          </Pattern>
          <H3>Color strategy: 3 directions</H3>
          <Columns
            items={[
              {
                title: "Direction 1, all chrome",
                text: (
                  <>
                    Monochrome zinc grays (#09090B to #FAFAFA), with a sheen on
                    every card. <Why /> It looked strong, but it felt like a
                    machine with nobody running it.
                  </>
                ),
              },
              {
                title: "Direction 2, chrome + emerald",
                text: (
                  <>
                    Added a #34D399 accent. <Fill>Why it lost.</Fill>
                  </>
                ),
              },
              {
                title: "Direction 3, navy with a chrome accent (chosen)",
                text: "Navy carries the voice. Chrome shows up only on the Book a Call button in the header, plus a silver glint across headline keywords.",
              },
            ]}
          />
          <P>
            <strong>Why navy won:</strong> <Why /> navy is the blue of a work
            uniform or a bank statement. It says “we’ll show up the same every
            day,” which is exactly the promise these buyers had stopped
            believing from other vendors.
          </P>
          <P>
            <strong>Why chrome stayed:</strong> <Why /> chrome is stainless
            steel, the material of every warehouse shelf and commercial kitchen
            these buyers work in. It reads as strength, so I saved it for the
            moment that matters most.
          </P>
          <P>
            <strong>Color application:</strong> body copy sits in slate
            (#64748B) on white so long sections stay comfortable to read. Dark
            mode gets its own navy (#151F34) so the page never goes flat black,
            and shadows stay pure black so they don’t turn muddy.
          </P>
          <FigureSlot
            n={7}
            caption={
              <>
                <strong>Fig 7. The 3 directions side by side.</strong>{" "}
                All-chrome looked strong but empty, so chrome shrank down to two
                moments.
              </>
            }
          >
            design-preview.html (all chrome), design-preview-v2.html (emerald),
            and the final, side by side.
          </FigureSlot>
        </>
      ),
    },
  },
  {
    id: "palette",
    title: "Palette & type",
    versions: {
      A: (
        <>
          <Headline>Five navies, nine semantic tokens, one accent.</Headline>
          <NavyTable
            roles={[
              "Darkest solid, replaces black",
              "Dark-mode page body",
              "Workhorse heading and text color (422 uses)",
              "CTA bands, hero diagram canvas",
              "Marquee tint",
            ]}
          />
          <Note>A’s semantic token table is under The system.</Note>
          <P>
            <strong>Typography:</strong> Satoshi Variable, bold, with tight
            tracking. The display size scales from 36px on mobile to 72px on
            desktop at -1.6px tracking and 1.08 line height. There are four
            visual levels (display, h1, h2, h3), set separately from the HTML
            tag.
          </P>
          <FigureSlot>A type specimen with each level in use.</FigureSlot>
          <Note>
            A also listed a purple-to-cyan accent gradient. It turned out to be
            unused in the shipped site, so it’s dropped.
          </Note>
        </>
      ),
      B: (
        <>
          <NavyTable
            roles={[
              "The voice: headings, dark surfaces, replaces black",
              "Dark-mode page body",
              "Workhorse text color (422 uses)",
              "CTA bands, hero diagram canvas",
              "Marquee tint",
            ]}
          />
          <P>
            Body copy sits in slate #64748B on white for comfortable reading
            contrast.
          </P>
          <Subhead>Type, shape and texture</Subhead>
          <List>
            <li>
              <strong>Type.</strong> I kept Satoshi from the original site
              because its geometric, evenly weighted letterforms already read as
              precise. I tightened display tracking to -1.6px so headlines set
              dense and machined, scaling from 36px on mobile to 72px on desktop
              at 1.08 line height.
            </li>
            <li>
              <strong>Shape.</strong> <Why /> Buttons are full pills, the one
              soft shape in the system, so the action feels approachable against
              a serious palette.
            </li>
            <li>
              <strong>Texture.</strong> Navy bands carry a 1px white dot grid.{" "}
              <Why /> It gives dark sections depth without decoration and reads
              like graph paper: technical and measured.
            </li>
            <li>
              <strong>Removed.</strong> Glow, orbs and glassmorphism. <Why />{" "}
              They’re the visual shorthand of AI hype and worked against “trust
              over trend.” Gradient utilities dropped from 155 to 6.
            </li>
          </List>
          <Materials
            show="dots"
            caption="Live, from OrderSync’s code: a navy band with the dot grid. Set in Geist here, not Satoshi."
          />
          <FigureSlot>A type specimen and the button set.</FigureSlot>
        </>
      ),
      C: (
        <>
          <Pattern>Carpoolio-page format.</Pattern>
          <Subhead>Color palette</Subhead>
          <Note>
            <Why /> The names are suggestions.
          </Note>
          <Swatches items={palette("Headings and dark sections")} />
          <Subhead>Typography</Subhead>
          <List>
            <li>
              <strong>Display:</strong> Satoshi Bold, tight tracking. Sample:
              “Still Typing Orders Into Your ERP?”
            </li>
            <li>
              <strong>Body:</strong> Satoshi Regular
            </li>
          </List>
          <P>
            I kept Satoshi from the old site. Its letters are geometric and
            even, which already felt engineered, so I pulled the spacing in on
            big headlines until they set dense, almost stamped. <Why />
          </P>
        </>
      ),
      D: (
        <>
          <Pattern>
            Your Carpoolio-page format, plus Nicole’s usage notes.
          </Pattern>
          <Subhead>Palette</Subhead>
          <Note>
            <Why /> The names are suggestions.
          </Note>
          <Swatches items={palette("Every headline and dark section")} />
          <Subhead>Type</Subhead>
          <List>
            <li>
              <strong>Display,</strong> Satoshi Bold at -1.6px tracking: “One
              System for All Your Orders”
            </li>
            <li>
              <strong>Section heading,</strong> Satoshi Bold: “Catch Errors
              Before They Cost You”
            </li>
            <li>
              <strong>Body:</strong> Satoshi Regular
            </li>
          </List>
          <Subhead>Materials</Subhead>
          <List>
            <li>
              <strong>Chrome pill:</strong> white-to-gray gradient, a bright
              edge along the top, a 1px lift on hover, brushed zinc in dark mode
            </li>
            <li>
              <strong>Silver glint:</strong> a gray-to-white sweep across key
              words that plays once when the headline scrolls into view
            </li>
            <li>
              <strong>Dot grid:</strong> fine white dots on navy bands, for
              texture without decoration
            </li>
          </List>
          <Materials />
        </>
      ),
    },
  },
  {
    id: "system",
    title: "The system",
    versions: {
      A: (
        <>
          <Subhead>Consolidation</Subhead>
          <Headline>
            One rename migrated 321 usages without touching a component.
          </Headline>
          <P>
            I rebound Tailwind’s <Code>black</Code> to <Code>--navy-1</Code>,
            which updated 321 existing usages automatically, then moved 129{" "}
            <Code>dark</Code> references to <Code>navy-3</Code>. The variables
            are RGB triplets, so opacity modifiers like <Code>navy-3/30</Code>{" "}
            keep working. Now 450 references resolve to 3 values, and a palette
            change is a one-file edit.
          </P>
          <FigureSlot>
            A before/after code snippet of the token definition.
          </FigureSlot>
          <SemanticTokens />
          <Subhead>Components</Subhead>
          <Headline>
            Four building blocks instead of hand-typed classes.
          </Headline>
          <List>
            <li>
              <strong>Button:</strong> 4 variants (primary, secondary, inverse,
              ghost) × 3 sizes. Primary auto-inverts, navy on white in light
              mode and white on navy in dark mode.
            </li>
            <li>
              <strong>Section:</strong> 3 surfaces × 3 spacing steps × 3 widths
              (1440, 1100, 650).
            </li>
            <li>
              <strong>Heading:</strong> the visual level is independent of the
              HTML tag, so SEO heading order never fights the design.
            </li>
            <li>
              <strong>Eyebrow:</strong> a section kicker pill.
            </li>
            <li>
              <strong>PolkaDots:</strong> one dot texture so every navy band
              matches.
            </li>
            <li>
              <strong>FaqAccordion:</strong> one FAQ pattern, now used in 26
              files.
            </li>
          </List>
          <FigureSlot>
            A component sheet with every variant and state.
          </FigureSlot>
        </>
      ),
      B: (
        <>
          <Subhead>Tokens</Subhead>
          <Headline>
            Two layers: raw values that never change, and semantic roles that
            flip for dark mode.
          </Headline>
          <P>
            One rename (pointing Tailwind’s <Code>black</Code> at navy-1)
            migrated 321 usages without touching a component. I moved 129 more
            references to navy-3. Now 450 references resolve to 3 values, and a
            palette change is a one-file edit.
          </P>
          <SemanticTokens />
          <Subhead>Components</Subhead>
          <Headline>
            Four building blocks instead of hand-typed classes.
          </Headline>
          <List>
            <li>
              <strong>Button:</strong> 4 variants × 3 sizes. Primary
              auto-inverts between light and dark.
            </li>
            <li>
              <strong>Section:</strong> 3 surfaces × 3 spacing steps × 3 widths
              (1440, 1100, 650).
            </li>
            <li>
              <strong>Heading:</strong> the visual level is independent of the
              HTML tag, so SEO heading order never fights the design.
            </li>
            <li>
              <strong>Eyebrow:</strong> a section kicker pill.
            </li>
            <li>
              <strong>PolkaDots:</strong> the dot texture, placed identically on
              every navy band.
            </li>
            <li>
              <strong>FaqAccordion:</strong> one FAQ pattern, now used in 26
              files.
            </li>
          </List>
        </>
      ),
      C: (
        <>
          <Headline>
            I wrote the look down once, so every page pulls from the same place.
          </Headline>
          <P>
            I turned the palette, type and spacing into a small design system: a
            handful of named colors that flip on their own for dark mode, plus 4
            building blocks (buttons, sections, headings and section labels)
            that every page is assembled from. Because I built it in code
            myself, it rolled out across the whole site in about a month.
          </P>
          <P>
            Then I built a little robot to keep it honest. <Why /> It visits
            every page, screenshots it in light and dark, and flags any color
            that isn’t in the system. So anyone can add a page later and it’ll
            still look like OrderSync.
          </P>
          <FigureSlot caption="Every page on the site is some arrangement of these parts.">
            One component sheet.
          </FigureSlot>
        </>
      ),
      D: (
        <>
          <Pattern>
            Rachel and Bethany: system work kept short and told in human terms.
          </Pattern>
          <Headline>
            Built so the next page looks right without me in the room <Why />
          </Headline>
          <P>
            Everything above became a small design system: named colors that
            switch on their own for dark mode, plus 4 building blocks (buttons,
            sections, headings and section labels). I built it in code myself,
            which is why it reached every page in about a month, sign-in and
            billing included.
          </P>
          <P>
            One rule kept me honest: the new homepage was the reference, so the
            system had to match it exactly. When the homepage turned out to use
            a slightly different navy, I made that color an official token so
            nothing on the live page moved.
          </P>
          <FigureSlot
            n={8}
            caption={
              <>
                <strong>Fig 8. The component sheet.</strong> Every page on
                ordersync.io is some arrangement of these parts.
              </>
            }
          >
            The component sheet.
          </FigureSlot>
        </>
      ),
    },
  },
  {
    id: "rollout",
    title: "Rollout",
    versions: {
      A: (
        <>
          <Subhead>Rollout</Subhead>
          <Headline>
            Shipped in 8 slices so every PR stayed reviewable.
          </Headline>
          <Slices />
          <P>
            All eight merged on June 19, 2026. The same tokens and components
            now style the user-facing screens too: sign-in, sign-up, password
            reset, account settings, the admin dashboard and billing.
          </P>
          <Subhead>Guardrails</Subhead>
          <Headline>
            Docs tell people the rules. I built a tool that tells you when they
            break.
          </Headline>
          <P>
            <Code>pnpm design:audit</Code> crawls every public page from the
            sitemap, flags off-system colors in the DOM, captures full-page
            screenshots in light and dark, and pixel-diffs them against a
            baseline. A sample mode checks one page per template, plus every
            static page.
          </P>
          <FigureSlot>
            The generated contact sheet, plus one diff example.
          </FigureSlot>
        </>
      ),
      B: (
        <>
          <Headline>Shipped in 8 slices, then guarded by an audit.</Headline>
          <Slices />
          <P>
            All eight merged on June 19, 2026, so the same tokens now style the
            user-facing screens too.
          </P>
          <P>
            To keep the system honest, I built <Code>pnpm design:audit</Code>.
            It crawls every public page from the sitemap, flags off-system
            colors, screenshots each page in light and dark, and pixel-diffs it
            against a baseline. A sample mode checks one page per template, plus
            every static page.
          </P>
          <FigureSlot>The audit contact sheet.</FigureSlot>
        </>
      ),
      C: (
        <Note>C folds this into The system: the “little robot” paragraph.</Note>
      ),
      D: (
        <>
          <Pattern>
            Nicole’s insight-and-action pairs, applied to the rollout.
          </Pattern>
          <H3>What I found while rolling it out</H3>
          <Table
            head={["Insight", "Action"]}
            rows={[
              [
                "5 SEO page templates still leaned on the old gradients.",
                "Moved them onto the system’s flat navy and white surfaces.",
              ],
              [
                "Callout boxes were using colors outside the palette.",
                "Gave them one shared treatment from the system.",
              ],
              [
                "Decorative blue had crept into shared components.",
                "Switched it to navy, and kept blue only in charts, where it carries data.",
              ],
              [
                <>
                  <Why /> FAQs looked different from page to page.
                </>,
                "One FAQ component, now used in 26 places.",
              ],
            ]}
          />
          <P>
            To keep it from drifting again, I built a small robot. It visits
            every page, screenshots it in light and dark, and flags any color
            that isn’t in the system.
          </P>
        </>
      ),
    },
  },
  {
    id: "final-designs",
    title: "Final designs",
    versions: {
      A: (
        <>
          <Headline>
            Clean navy and white, where every color has a job.
          </Headline>
          <Shots
            items={[
              { ...SHOTS.heroLight, label: "Hero, light" },
              { ...SHOTS.heroDark, label: "Hero, dark" },
              { ...SHOTS.landing, label: "Landing page" },
              { ...SHOTS.tool, label: "EDI tool" },
            ]}
          />
          <FigureSlot>Sign-in, next to the rest.</FigureSlot>
        </>
      ),
      D: (
        <>
          <Pattern>
            Nicole’s module-by-module walkthrough of the final design.
          </Pattern>
          <P>
            Walk the homepage top to bottom, with one line on what each section
            does for the buyer.{" "}
            <Fill>Confirm the order against the live site.</Fill>
          </P>
          <List>
            <li>
              <strong>Hero.</strong> “One System for All Your Orders,” with the
              silver glint on key words. Answers “what is this?” in one line.
            </li>
            <li>
              <strong>Trust bar.</strong> Customer logos like Bristol Farms,
              Whole Foods and Erewhon. Answers “does anyone like me use this?”
            </li>
            <li>
              <strong>Document flow.</strong> Any format flowing into the ERP.
              Shows the product working before anyone reads a paragraph.
            </li>
            <li>
              <strong>Free tools.</strong> PO PDF Extractor, Invoice Extractor,
              Invoice vs PO Matcher, EDI Inspector and EDI Translator. A way to
              try it without talking to anyone.
            </li>
            <li>
              <strong>Closing band.</strong> Navy with the dot grid: “Still
              Typing Orders Into Your ERP?” plus a white Book a Call button.
            </li>
            <li>
              <strong>FAQ.</strong> The objections answered, in one consistent
              component.
            </li>
          </List>
        </>
      ),
    },
  },
  {
    id: "reflection",
    title: "Reflection",
    versions: {
      A: (
        <>
          <Subhead>What I learned</Subhead>
          <Columns
            count={2}
            items={[
              {
                title: "Name things truthfully.",
                text: (
                  <>
                    A token called <Code>black</Code> that rendered navy cost
                    more time than any visual decision.
                  </>
                ),
              },
              {
                title: "Systems ship in slices.",
                text: "Zero-pixel refactors first, visible changes second. That’s what kept 237 files reviewable.",
              },
            ]}
          />
        </>
      ),
      B: (
        <Columns
          count={2}
          items={[
            {
              title: "Name things truthfully.",
              text: (
                <>
                  A token called <Code>black</Code> that rendered navy cost more
                  time than any visual decision.
                </>
              ),
            },
            {
              title: "Restraint is a decision.",
              text: "Metal in two places reads as strength. Metal everywhere would have read as a theme.",
            },
          ]}
        />
      ),
      C: (
        <Columns
          count={2}
          items={[
            {
              title: "Name things honestly.",
              text: "A color called “black” that was actually navy cost me more time than any design decision. Good names are a design tool too.",
            },
            {
              title: "Hold back the shiny stuff.",
              text: "Chrome on one button feels strong. Chrome on everything felt like nobody was home.",
            },
          ]}
        />
      ),
      D: (
        <>
          <Pattern>
            Jessica’s short lessons and “what I applied next,” plus Bethany’s
            warmth.
          </Pattern>
          <Columns
            count={2}
            items={[
              {
                title: (
                  <>
                    A brand is a promise you keep on every page. <Why />
                  </>
                ),
                text: "Navy only worked because it showed up the same way everywhere, down to the billing screen.",
              },
              {
                title: "Design for the person Googling at night.",
                text: "Every call got easier once I pictured the ops manager staring at EDI requirements from Whole Foods.",
              },
            ]}
          />
          <P>
            <Fill>
              One line on where you’re bringing this next, the way Jessica
              points to her next project.
            </Fill>
          </P>
        </>
      ),
    },
  },
];

/* ---------- Version E ---------- */

// The research-led rewrite, in the parts that match these sections.
const E_FOR: Record<string, ReactNode> = {
  overview: E.overview,
  solution: E.summary,
  problem: E.problem,
  research: E.research,
  goals: E.goal,
  wireframes: E.wireframes,
  "visual-direction": E.visual,
  palette: E.palette,
  system: E.system,
  rollout: E.rollout,
  "final-designs": E.finalDesigns,
  reflection: E.lessons,
};

/* ---------- Recommended versions ---------- */

// The version of each section to start from, judged against Erin's own
// research (docs: the portfolio-redesign case study's job-post and landscape
// findings) and the stat check in docs/ordersync-research/stat-check.md.
const REC: Record<string, Rec> = {
  title: {
    v: "E",
    why: "C’s title, with the shipped homepage running live above it. Your case-study notes favor live components over screenshots.",
  },
  overview: {
    v: "B",
    why: "Your pick: design-coded language that sums up the whole project, from audit to shipped, and every number in it checks out (8 PRs, 237 files).",
    fix: "“Navy for trust, metal for strength” rests on color psychology, which the research calls weak evidence. “Four primitives” is jargon; “4 shared components” says the same thing. It has no facts block, which E’s overview has.",
  },
  solution: {
    v: "C",
    why: "Shows the shipped site, the 2nd-biggest portfolio ask in your job-post research. E puts its screens in Results instead, and A and B lean on numbers I haven’t verified.",
  },
  problem: {
    v: "E",
    why: "C’s framing, with the blanks filled and every claim checked. A and B lead with code, which is 2% of portfolio asks.",
  },
  research: {
    v: "E",
    why: "The only version with the landscape and published studies, and with your process tracker and James’s words. D has the next best structure, and its numbers are now corrected.",
  },
  goals: {
    v: "E",
    why: "The goal tied to bookings, with your May 18 measurement plan as proof. D’s hypothesis still has a blank.",
  },
  wireframes: {
    v: "E",
    why: "Your real wireframes from May 18, with the research notes in the margin. A is accurate but has empty figure slots.",
  },
  "visual-direction": {
    v: "E",
    why: "Your dated mood board and directions, with James’s words. B, C and D lean on color psychology, which the research calls weak evidence.",
  },
  palette: {
    v: "D",
    why: "Live swatches, type and materials. Visual craft is almost a quarter of portfolio asks, and E only shows the glint.",
    fix: "The swatch names are suggestions.",
  },
  system: {
    v: "D",
    why: "Short and in plain words, since code is 2% of portfolio asks, and the story about the homepage’s navy is true. E only points to the engineering side.",
    fix: "Drop the ◆ headline or confirm it.",
  },
  rollout: {
    v: "B",
    why: "The verified rollout chart, 8 PRs and 237 files, in fewer words than A. E is 1 sentence.",
  },
  "final-designs": {
    v: "E",
    why: "Before and after side by side, which shows what changed. A shows more pages but no before.",
  },
  reflection: {
    v: "E",
    why: "A lesson about process, which your research found junior designers are judged on. C’s “Hold back the shiny stuff” could join it.",
  },
};

/* ---------- Page ---------- */

export default function Design() {
  // Each section opens on its recommended version. Picking a version at the
  // top shows it in every section; a section's own tabs then change just
  // that section.
  const [all, setAll] = useState<Mode>("rec");
  const [picked, setPicked] = useState<Record<string, V>>({});

  function pickAll(m: Mode) {
    setAll(m);
    setPicked({});
  }

  function want(id: string): V {
    if (picked[id]) return picked[id];
    if (all === "rec") return REC[id]?.v ?? "A";
    return all;
  }

  function tabs(id: string, title: string, versions: Versions) {
    return (
      <VersionTabs
        id={id}
        title={title}
        versions={versions}
        want={want(id)}
        onPick={(v) => setPicked((p) => ({ ...p, [id]: v }))}
        rec={REC[id]}
      />
    );
  }

  const headerVersion = versionFor(HEADER_VERSIONS, want("title"));
  const header = HEADERS[headerVersion];

  const sections: CaseStudySection[] = [
    {
      id: "title",
      title: "Header",
      content: (
        <>
          <DraftKey all={all} onPickAll={pickAll} />
          {tabs("title", "Header", HEADER_VERSIONS)}
        </>
      ),
    },
    ...DRAFTS.map((d) => ({
      id: d.id,
      title: d.title,
      content: tabs(d.id, d.title, { ...d.versions, E: E_FOR[d.id] }),
    })),
  ];

  return (
    <SiteShell>
      <CaseStudyArticle
        hero={headerVersion === "E" ? E_HERO : undefined}
        label={header.label}
        title={header.title}
        sections={sections}
      />
    </SiteShell>
  );
}
