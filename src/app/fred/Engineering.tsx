import SiteShell from "@/components/site/SiteShell";
import CaseStudyArticle, {
  type CaseStudySection,
} from "@/components/site/CaseStudyArticle";
import {
  Code,
  Columns,
  Facts,
  H3,
  inlineLink,
  Lead,
  List,
  P,
  Stats,
  Table,
} from "@/components/site/prose";

// The engineering side of Fred, laid out like the OrderSync agent's: what it
// is, the problem, how it works, how it's built, the part I'm proudest of,
// and the numbers. Every claim traces back to the fred-and-ginger repo on
// October 11 and 12, 2026: README.md, cloud/src/agent (Fred and his 25
// tools), cloud/src/ingest.ts (the crawler sources), evals/fred.ts (15
// scripted conversations), cloud/wrangler.jsonc (Claude Sonnet 5.5 at low
// effort) and web/. James built the API, agent and crawlers; I built web/.

const DEMO = "https://fredandginger.jamesjuliusdarby.com/demo";

const SECTIONS: CaseStudySection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <Lead>
          Fred is a tool-using AI agent with a web app around it. You chat
          with it in plain words, and it saves your search, starts crawlers on
          the listing sites, checks every building with the city and writes up
          the places that fit, while the app shows each step as it happens.
        </Lead>
        <P>
          <strong>Why we built it.</strong> James and I built Fred at the AI
          Engineer NYC hackathon on October 11, 2026, because we’re hunting for
          an apartment ourselves and were tired of checking every site and
          alert email by hand. It had to be live by the end of the day, so we
          picked tools that ship fast, run without servers to look after, and
          let two people and their agents work at the same time without
          stepping on each other.
        </P>
        <Facts
          items={[
            {
              label: "Role",
              value: "I built the web app; James built the API, the agent and the crawlers",
            },
            {
              label: "Stack",
              value: "TypeScript · Next.js · Mastra · Claude · Hono · Zod · Cloudflare",
            },
            { label: "Surface", value: "Web app, chat and email alerts" },
            {
              label: "Focus",
              value: "Showing the agent’s work · nothing sent without you",
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
      "Listings are scattered, incomplete and sometimes fake, and an agent has to act on them.",
    content: (
      <Columns
        count={2}
        items={[
          {
            title: "No listing site has an API",
            text: "StreetEasy, Zillow and the rest only show their listings on their own pages, so every source needs its own crawler.",
          },
          {
            title: "Search results leave things out",
            text: "A listing card rarely says the fees, the pet policy or the laundry, which are the things renters ask about first.",
          },
          {
            title: "The costly cases are the quiet ones",
            text: "A broker fee, a building with open violations or a scam deposit is exactly where a confident wrong answer hurts most.",
          },
          {
            title: "Trust needs receipts",
            text: "To believe an agent, you need to see what it checked, where each number came from and what it doesn’t know.",
          },
        ]}
      />
    ),
  },
  {
    id: "how",
    title: "How it works",
    headline: "Chat in, checked places out.",
    content: (
      <>
        <P>
          Four stages, with you in charge of anything that leaves the app.
        </P>
        <Columns
          count={4}
          items={[
            {
              title: "1. You say what you want",
              text: "Fred turns “1 bed under $4,500 in Greenpoint, dog OK” into a saved search: dealbreakers, nice-to-haves with a weight, and notes in its memory.",
            },
            {
              title: "2. Fred checks the sites",
              text: "It starts crawlers on StreetEasy, Zillow, RentHop, Zumper, Compass, Nooklyn, Craigslist and landlords’ own sites for that search. The same apartment on several sites becomes one place.",
            },
            {
              title: "3. It checks each place",
              text: "Code drops places that clearly miss a dealbreaker. Fred reads the full listing page when facts are missing, looks at the photos, and scores the building from NYC Open Data.",
            },
            {
              title: "4. It writes up the ones that fit",
              text: "Fred adds them to your inbox with why it picked each one, emails strong fits if you asked, and drafts messages to landlords that only send after you approve.",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "built",
    title: "How it’s built",
    headline: "A tool-using agent behind one typed contract.",
    content: (
      <>
        <H3>The loop</H3>
        <P>
          Fred is a <Code>Mastra</Code> agent on Claude Sonnet 5.5 at low
          effort, for speed. It works in a loop, calling tools and reading what
          they return, and it only writes its reply once the tools are done, so
          the places it talks about are ones it has actually looked up. The model is one
          setting, so the same agent runs on Gemini too, and 15 scripted
          conversations check what Fred did, not just what it said.
        </P>

        <H3>The hands</H3>
        <P>
          Every action is one of 25 typed tools with a <Code>Zod</Code> schema.
          The model never touches the database. It calls tools that read and
          write the same data the app shows, so whatever Fred changes, you see.
        </P>
        <Table
          head={["Tools", "What Fred can do", "Count"]}
          rows={[
            ["Search", "Read and change your search, search the listings, start the crawlers and check on them", "5"],
            ["Places", "Add places to your inbox, look through it, open a place and update it", "4"],
            ["Research", "Read a listing’s full page, search the web for the landlord and the building, look at the photos", "3"],
            ["Messages and tours", "Draft, send or cancel a message to a landlord, request a tour, list and update tours", "6"],
            ["Alerts", "Set up email alerts, verify the address and send a test", "3"],
            ["Memory", "Keep notes about you, recall earlier chats and update your profile", "3"],
            ["Replies", "Suggest answers you can tap", "1"],
          ]}
        />

        <H3>The wiring, and why</H3>
        <P>
          Everything runs on Cloudflare, so there was no server to set up or
          look after, and the app and the API share one domain.
        </P>
        <Table
          head={["Piece", "What we used", "Why"]}
          rows={[
            ["Web app", "Next.js and Tailwind on a Cloudflare Worker, through OpenNext", "The same host as the API, so a service binding serves both on one domain"],
            ["Chat", "Vercel AI SDK (useChat), streamed over server-sent events", "Each tool call arrives as its own part, so the app can show Fred’s steps live"],
            ["API", "Hono on a Worker, with Zod schemas for every route", "One contract generates the app’s types, so the two sides can’t drift apart"],
            ["Agent", "Mastra with Claude Sonnet 5.5", "A tool loop, memory and evals, with the model as one setting"],
            ["Data", "Cloudflare D1, R2 for photos, Workers AI for chat recall", "Built into the same Worker, with nothing extra to run"],
            ["Listings", "Apify crawlers, started on demand", "No listing site has an API, and on-demand runs search your areas, not all of NYC"],
            ["Buildings", "NYC Open Data, and NYPD complaint data for area safety", "Free and public, with a record for every building"],
            ["Research", "Nimble for the web, Gemini for photos", "Reading a full listing page or a landlord’s reviews when the card leaves it out"],
            ["Maps", "MapLibre with OpenFreeMap tiles", "No key or account, and the tiles have a dark style"],
            ["Errors", "Sentry in the Worker and the app", "Seeing what broke during a one-day build"],
          ]}
        />

        <H3>Two people and a few agents</H3>
        <P>
          We each worked with a few Claude Code agents. They coordinated on a
          shared message board, where they posted contract changes, bugs and
          questions for each other, and the API contract lived in one place
          (<Code>packages/api</Code>) that both sides built from. CI checked
          the Worker, the app and the contract on every push, so a change on
          one side that broke the other failed the checks.
        </P>
      </>
    ),
  },
  {
    id: "proudest",
    title: "The part I’m proudest of",
    headline: "The app shows Fred’s work as it happens.",
    content: (
      <>
        <P>
          My side was the web app, and the hard part was making an agent’s
          work readable while it streams in.
        </P>
        <Columns
          count={2}
          items={[
            {
              title: "Live steps from the stream",
              text: "Each tool call arrives as its own part. I turn it into plain words (“Searching Greenpoint”, then “Searched Greenpoint”), refresh the inbox when a tool that changes it finishes, and fold the steps into one line. Next’s compression was holding the whole stream until the end, so every step showed up at once; turning it off in Next, since Cloudflare compresses at the edge, fixed it.",
            },
            {
              title: "A contract both sides build from",
              text: "The app’s types are generated from the Zod schemas, and CI fails if they’re stale. When I wanted a dealbreaker level, my agent asked James’s agent on the board, the contract changed first, and my Profile change shipped on top of it.",
            },
            {
              title: "Every place has a URL",
              text: "The open listing, the view and the sort live in the URL, so a listing can be shared, a reload keeps your place and the back button closes the modal. The places on either side load in the background, so the arrows feel instant.",
            },
            {
              title: "Maps and voice with no keys",
              text: "MapLibre and OpenFreeMap need no account. Next doesn’t bundle MapLibre’s web worker, so a build step copies it in, and a browser without WebGL2 gets a note instead of a broken page. The mic records in the browser, and Whisper turns it into text right there.",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "challenges",
    title: "Challenges",
    headline: "What broke during the day, and what we did.",
    content: (
      <Columns
        count={2}
        items={[
          {
            title: "The newest Next broke every page",
            text: "Next 16.4 added a file the Cloudflare adapter doesn’t bundle, so every page returned a 500. I pinned 16.3.8 until the adapter catches up.",
          },
          {
            title: "One site blocked every crawler",
            text: "Apartments.com’s bot protection stopped every approach we tried, so it isn’t a source.",
          },
          {
            title: "Search cards leave out the facts",
            text: "Zillow’s results have no fees, pets or descriptions, so its crawler reads each listing page once and keeps it for 14 days, and Fred reads a page itself when it needs to know.",
          },
          {
            title: "The crawlers ran the wrong search",
            text: "We found they’d been running a placeholder search instead of the one in the app. Now Fred starts them on demand, for your own search.",
          },
        ]}
      />
    ),
  },
  {
    id: "numbers",
    title: "By the numbers",
    content: (
      <>
        <Stats
          items={[
            { label: "Tools", value: "25", tip: "The tools Fred can call, in cloud/src/agent." },
            { label: "Evals", value: "15", tip: "Scripted conversations in evals/fred.ts that check what Fred did, not just what it said." },
            { label: "Listing sites", value: "7", tip: "StreetEasy, Zillow, RentHop, Zumper, Compass, Nooklyn and Craigslist, plus big landlords’ own sites." },
            { label: "My commits", value: "37", tip: "My commits to the Fred repo on October 11, 2026, not counting merges." },
          ]}
        />
        <P>
          You can try all of it in{" "}
          <a
            href={DEMO}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            the live demo
          </a>
          , which signs you in as a fresh guest with an example search.
        </P>
      </>
    ),
  },
  {
    id: "next",
    title: "What I’d do next",
    content: (
      <List>
        <li>Read the full listing page on every site, not only Zillow, so fewer facts say Unknown.</li>
        <li>Run the evals in CI and block a deploy when one fails.</li>
        <li>Send alerts by text as well as email.</li>
        <li>Open it to renters beyond the two of us, with real accounts instead of two logins and a demo.</li>
      </List>
    ),
  },
];

export default function Engineering() {
  return (
    <SiteShell>
      <CaseStudyArticle
        label="Fred • Engineering"
        title="From a chat message to an inbox of checked apartments"
        sections={SECTIONS}
      />
    </SiteShell>
  );
}
