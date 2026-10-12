import SiteShell from "@/components/site/SiteShell";
import CaseStudyArticle, {
  type CaseStudySection,
} from "@/components/site/CaseStudyArticle";
import {
  Columns,
  Facts,
  Figure,
  H3,
  inlineLink,
  label,
  Lead,
  List,
  P,
  Stats,
  Table,
  Wide,
} from "@/components/site/prose";
import { BuildNote, Screens } from "@/components/site/appStudy";
import {
  Complaints,
  Directions,
  MarkDemo,
  MemoryNotes,
  NiceToHaves,
  Swatch,
  Thinking,
} from "./figures";
import LiveSearch from "./LiveSearch";

// Every claim traces back to the fred-and-ginger repo (Erin's commits on
// October 11, 2026, and web/), the research and direction pages from that
// morning, and the live demo. Screens were taken from the live demo
// (/demo, a fresh guest) on October 12, 2026, with listing photos blurred
// because they belong to the listing sites. The live pieces are rebuilt from
// Fred's code with example data.

const IMG = "/images/fred";
const DEMO = "https://fredandginger.jamesjuliusdarby.com/demo";

const desktop = { width: 2880, height: 1800 };
const phone = { width: 1170, height: 2532 };

const SECTIONS: CaseStudySection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <Lead>
          Fred is an apartment-hunting agent for New York. You tell Fred what
          you want, and it searches the listing sites for you, checks each
          building against city data and keeps likely scams out of your inbox.
        </Lead>
        <P>
          James Darby and I built it in one day at the AI Engineer NYC
          hackathon. I did the research, the product design and the web app,
          and James built the backend and Fred himself. It’s live, and{" "}
          <a
            href={DEMO}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            you can try the demo
          </a>{" "}
          without an account.
        </P>
        <Facts
          items={[
            { label: "Role", value: "Research, product design and frontend" },
            { label: "Team", value: "Me and James Darby" },
            { label: "Timeline", value: "1 day, October 11, 2026" },
            {
              label: "Built with",
              value: "Next.js, Tailwind CSS, Vercel AI SDK, MapLibre",
            },
          ]}
        />
        <Figure
          src={`${IMG}/inbox.jpg`}
          {...desktop}
          alt="Fred’s web app: a sidebar with New places, Saved, Passed, Tours, Profile and Application packet, the chat with Fred in the middle, and an inbox of places on the right, each with a price, neighborhood, one line of facts and a fit word like Strong fit or Over budget with fees."
          caption="Fred in three panes: where you are, your chat with Fred, and the places Fred found. Listing photos are blurred because they belong to the listing sites."
        />
      </>
    ),
  },
  {
    id: "problem",
    title: "Problem",
    headline:
      "How might an AI agent find you an apartment without becoming one more thing you can’t trust?",
    content: (
      <>
        <P>
          James and I are apartment hunting in New York right now, and it’s
          really a full-time job. Zillow, Apartments.com and Zumper all
          launched AI chat search in the last two years, so another chatbot
          wasn’t the answer. Jack &amp; Jill, an AI agent for job hunting, turns
          a search into a conversation with an agent and an inbox of matches,
          and I wanted that for renting.
        </P>
        <P>A New York apartment hunt has 4 problems a design has to handle:</P>
        <Columns
          count={2}
          items={[
            {
              title: "Every site is its own hunt",
              text: "Each one has its own alerts, and the same apartment shows up on several of them.",
            },
            {
              title: "The real cost is hidden",
              text: "You find out about the broker fee and the monthly fees after you’ve fallen for a place.",
            },
            {
              title: "The building is a mystery",
              text: "Violations, heat complaints and bedbugs are public records, but few renters look them up before a tour.",
            },
            {
              title: "Scams look like deals",
              text: "A place well under the area’s usual rent is either a great find or someone asking for a deposit before you see it.",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "goal",
    title: "Goal",
    headline:
      "Build something James and I would trust with our own hunt, in one day.",
    content: (
      <div className="border-t border-site-line pt-5">
        <p className={label}>What it had to do</p>
        <p className="mt-3 max-w-measure font-serif text-subhead text-site-ink">
          Only put places in the inbox that fit what we asked for, and back
          every number with the listing or city data.
        </p>
      </div>
    ),
  },
  {
    id: "research",
    title: "Research",
    headline: "Renters didn’t need it faster. They needed to trust it.",
    content: (
      <>
        <P>
          Before drawing anything I pulled 8,205 App Store reviews from 31
          rental, roommate and touring apps and sorted the 1 and 2 star ones by
          what went wrong. I expected speed to top the list, since good
          apartments here go in days, and it barely showed up.
        </P>
        <Complaints />
        <Stats
          items={[
            {
              label: "Slow alerts",
              value: "0.5%",
              tip: "The share of the 4,190 one and two star reviews that complain about alerts arriving too slowly.",
            },
            {
              label: "Scams",
              value: "12%",
              tip: "The share of the 4,190 one and two star reviews about scams or fake listings. It rises to 15% in the last two years.",
            },
            {
              label: "AI reviews",
              value: "56 of 72",
              tip: "Reviews from 2026 that mention AI and gave the app 1 or 2 stars.",
            },
          ]}
        />
        <Columns
          count={2}
          items={[
            {
              title: "Scams and ignored criteria were the real pain.",
              text: "Scams were 12% of bad reviews, and search that ignores what you asked for was another 11%. The usual scam is an out-of-state “landlord” who wants a deposit by Zelle before anyone sees the place.",
            },
            {
              title: "AI was a liability.",
              text: "56 of the 72 reviews from 2026 that mention AI gave 1 or 2 stars. People hated AI that was pushy and hard to turn off, and praised AI that kept an eye out for them quietly.",
            },
            {
              title: "Speed wasn’t the complaint. Wrong alerts were.",
              text: "Slow alerts were 0.5% of bad reviews. Renters complained about alerts that ignored their criteria or pointed to places that were already gone.",
            },
            {
              title: "Renters asked for proof.",
              text: "Their feature requests included building and landlord reviews, verification, a way to hide a whole building and comparing saved places side by side.",
            },
          ]}
        />
        <H3>What it meant for the design</H3>
        <P>
          So the brief changed. Fred had to earn trust and stick to your
          criteria, and do it quietly, instead of racing to be first or
          chatting at you. I wrote that down as 4 rules.
        </P>
        <Columns
          count={4}
          items={[
            {
              title: "Quiet by default",
              text: "Fred’s thinking is one line, and it speaks up when something matches.",
            },
            {
              title: "Your criteria are rules",
              text: "A dealbreaker stays a dealbreaker, and places that clearly miss one never reach your inbox.",
            },
            {
              title: "Every number comes from the data",
              text: "When a listing doesn’t say, Fred says Unknown and why, instead of guessing.",
            },
            {
              title: "Nothing goes out without you",
              text: "Fred drafts the email to a leasing office, and it only sends after you approve it.",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "ideation",
    title: "Ideation",
    headline: "Is Fred a character?",
    content: (
      <>
        <P>
          I mocked up three directions before building anything, and each one
          answered that question differently.
        </P>
        <Wide>
          <Directions />
        </Wide>
        <P>
          None of them felt right on its own. The layout I kept coming back to
          was Jack &amp; Jill’s: a sidebar, a chat and an inbox of matches on a
          quiet near-white page with black buttons. So I built Fred in that
          shape and brought back the best part of each direction. I didn’t
          borrow their line-drawn faces, colors or typeface, so Fred needed a
          mark of its own.
        </P>
      </>
    ),
  },
  {
    id: "decisions",
    title: "Design decisions",
    headline: "Quiet, precise and honest about what it doesn’t know.",
    content: (
      <>
        <H3>A window instead of a face</H3>
        <P>
          Fred’s mark is a portrait window, a box with a cross drawn in a
          1.25px line. While Fred works, the four panes light up yellow one at
          a time, and they go dark when it’s done. Yellow has no other job in
          the app, so when you see it, Fred is on it.
        </P>
        <MarkDemo />

        <H3>Thinking in one line, not a log</H3>
        <P>
          My first version showed Fred’s work as a card with a checklist, and
          it was way too much to read while you wait. Now it’s one line. While
          Fred works it says what it’s doing next to the lit mark, and when
          it’s done it folds into a short summary you can open. When Fred asks
          you something, the answers come as buttons you can tap.
        </P>
        <Wide>
          <Thinking />
        </Wide>
        <P>
          When Fred searches, the reply gets a card like Jack &amp; Jill’s job
          search, with numbered steps and a skyline. I drew Fred’s skyline from
          the mark, so its windows light up yellow as Fred looks and the areas
          and listings it’s checking float over the city. When it’s done the
          lights hold where they were, and the places Fred picked show up
          underneath, ready to save or pass without leaving the chat. That’s
          the card at the top of this page, rebuilt from its code.
        </P>

        <H3>An inbox that reads like answers</H3>
        <List>
          <li>
            Each place is its price and neighborhood, one line of facts and a
            fit word, grouped by the day Fred found it.
          </li>
          <li>
            Fit is always a word and never a percentage: Strong fit, Good fit,
            or the reason it’s a stretch, like Over budget with fees or Broker
            fee.
          </li>
          <li>
            You can sort by newest, price, best fit or neighborhood, or switch
            to the map, where every place is a price pill. The map frames your
            places once, so saving or passing one leaves it where you put it.
          </li>
          <li>
            You can drag the seams between the panes to give the chat more
            room, and the mic turns your voice into text with Whisper, right in
            the browser.
          </li>
        </List>
        <Figure
          src={`${IMG}/map.jpg`}
          {...desktop}
          alt="The map view: places shown as black price pills over a light map of Manhattan and Brooklyn, with a legend for new, seen and over budget."
          caption="The map, on free OpenFreeMap tiles that switch with light and dark mode."
        />

        <H3>The facts first, and Unknown when the listing doesn’t say</H3>
        <P>
          I picked a modal over a side pane so a listing gets your full
          attention, and each one still has its own link, so you can text it
          to a roommate and the back button closes it. The arrows and arrow
          keys step through your inbox, and the places on either side load in
          the background, so the next one opens right away.
        </P>
        <Figure
          src={`${IMG}/listing.jpg`}
          {...desktop}
          alt="A listing open in a modal: a large photo with thumbnails, the price and beds, the address, a Strong fit label, Pass and Save at the top, and arrows to step to the next place at the bottom."
          caption="Pass and Save sit at the top, and the arrows and Ask Fred about this place sit at the bottom."
        />
        <Figure
          src={`${IMG}/listing-facts.jpg`}
          {...desktop}
          alt="Lower in the same listing: four fact boxes for monthly cost, move-in, availability and broker fee, a Why this one list, a Worth knowing list, a mini map, and a building score of 99 out of 100 from NYC Open Data."
          caption="Under the photos: the four facts, Fred’s take, the mini map and the building report."
        />
        <List>
          <li>
            The four facts are the monthly cost with required fees, what you’d
            pay to move in, when it’s available and the broker fee. If the
            listing doesn’t say, the box says Unknown and why.
          </li>
          <li>
            “Why this one” and “Worth knowing” come from Fred, like “Not clear
            who pays the broker: ask”.
          </li>
          <li>
            The mini map zooms with its buttons, a double-click or a pinch,
            and leaves the scroll wheel and arrow keys to the modal so it never
            traps you.
          </li>
          <li>
            Each building gets a score from NYC Open Data, built from open
            violations, heat complaints, pests and 311 noise.
          </li>
          <li>
            Passing asks what put you off, so Fred learns from it, and Undo is
            right there.
          </li>
        </List>
        <Figure
          src={`${IMG}/building.jpg`}
          {...desktop}
          alt="A different listing: a strong fit with no broker fee and laundry in unit, whose building scores 76 out of 100 with 5 open class C violations and bedbugs in one unit."
          caption="A strong fit on paper, with 5 open class C violations and bedbugs on file. Fred shows you both, and you decide."
        />

        <H3>Dealbreakers are rules, and nuance lives in Fred’s memory</H3>
        <P>
          Search that ignores what you asked for was 11% of the bad reviews,
          almost as many as scams, so the Profile page makes the difference
          between must and nice clear. Hard limits like area, budget, bedrooms
          and pets are dealbreakers. A nice-to-have is one tap from important
          and two taps from a dealbreaker, and Fred sees the difference.
        </P>
        <div className="grid items-start gap-6 md:grid-cols-2">
          <NiceToHaves />
          <MemoryNotes />
        </div>
        <P>
          Under the search, What Fred remembers lists the notes Fred keeps from
          your chats, grouped into needs, likes, dislikes, timing and about
          you. You can fix or forget any of them, and notes Fred worked out on
          its own are marked as Fred’s guess.
        </P>
        <P>
          I tried adding “ideally 2 baths, at least 1” to the form as two
          controls, and the page got worse, so I took it back out. That kind
          of nuance is easier to say in a sentence, so it lives in Fred’s
          memory.
        </P>
        <Figure
          src={`${IMG}/profile.jpg`}
          {...desktop}
          alt="The Profile page: your photo and name, then What you’re looking for with neighborhoods, budget, bedrooms, bathrooms, pets, a move-by date, a no broker fee checkbox and nice-to-have chips, then What Fred remembers."
          caption="Profile for a brand new demo guest, before Fred has any notes."
        />
      </>
    ),
  },
  {
    id: "system",
    title: "System",
    headline: "One set of tokens for light, dark and phones.",
    content: (
      <>
        <P>
          Every color is a token with a light and a dark value, named the way
          shadcn names them so components pick them up for free. The map tiles
          and controls switch with your system too. On a phone the chat sits on
          top, the inbox below it, and a listing opens full screen.
        </P>
        <Table
          head={["Token", "Light", "Dark", "Used for"]}
          rows={[
            ["Background", <Swatch key="l" hex="#FFFFFF" />, <Swatch key="d" hex="#121211" />, "The inbox, cards and the modal"],
            ["Sidebar", <Swatch key="l" hex="#F5F5F2" />, <Swatch key="d" hex="#1A1A18" />, "A step warmer than the inbox"],
            ["Foreground", <Swatch key="l" hex="#141413" />, <Swatch key="d" hex="#EDEDEA" />, "Text, the send button, unread dots and the mark"],
            ["Highlight", <Swatch key="l" hex="#FFDD55" />, <Swatch key="d" hex="#F2CF45" />, "Lit panes and skyline windows, only while Fred works"],
            ["Success", <Swatch key="l" hex="#2E9E5B" />, <Swatch key="d" hex="#4CC27E" />, "Strong fit, Good fit and a healthy building"],
            ["Warning", <Swatch key="l" hex="#B86E14" />, <Swatch key="d" hex="#F0A050" />, "Over budget with fees, broker fees and building flags"],
          ]}
        />
        <Figure
          src={`${IMG}/dark-listing.jpg`}
          {...desktop}
          alt="A listing in dark mode, with dark map tiles and the map’s zoom buttons themed to match."
          caption="Dark mode. The map’s zoom buttons and credits follow the theme too."
        />
        <Screens
          bg="#F5F5F2"
          screens={[
            { src: `${IMG}/phone-inbox.jpg`, ...phone, label: "Inbox", alt: "Fred on a phone: the chat box at the top and the inbox of places below." },
            { src: `${IMG}/phone-listing.jpg`, ...phone, label: "Listing", alt: "A listing open full screen on a phone, with photos, price, address and the four facts." },
            { src: `${IMG}/phone-facts.jpg`, ...phone, label: "Facts and map", alt: "Lower in the listing on a phone: Why this one, Worth knowing, the mini map and the building score." },
            { src: `${IMG}/phone-map.jpg`, ...phone, label: "Map", alt: "The map view on a phone, with price pills." },
          ]}
        />
      </>
    ),
  },
  {
    id: "results",
    title: "Results",
    headline: "Live, with a demo anyone can try.",
    content: (
      <>
        <P>
          Fred runs on our own domain, and{" "}
          <a
            href={DEMO}
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            the demo
          </a>{" "}
          signs you in as a fresh guest with an example search, so you can try
          the real app, real listings and the real Fred without an account.
        </P>
        <Stats
          items={[
            { label: "Built in", value: "1 day" },
            {
              label: "My commits",
              value: "37",
              tip: "My commits to the Fred repo on October 11, 2026, not counting merges.",
            },
            {
              label: "Demo inbox",
              value: "195",
              tip: "Places in a new demo guest’s inbox on October 12, 2026, for 1 bed or more under $4,500 in Williamsburg, Greenpoint and the East Village.",
            },
          ]}
        />
        <BuildNote href="/fred">
          Next.js on Cloudflare, the Vercel AI SDK for the streaming chat and
          MapLibre for the maps, talking to James’s Mastra agent through one
          typed contract.
        </BuildNote>
      </>
    ),
  },
  {
    id: "reflection",
    title: "Reflection",
    content: (
      <>
        <P>
          Reading reviews before designing changed what I built. I almost made
          Fred fast and chatty, and renters care much more about trust and a
          search that sticks to what they asked for.
        </P>
        <P>What I’d do next:</P>
        <List>
          <li>
            Give a new person a first conversation. Right now the chat starts
            as one line of example text, which leaves a lot of empty column.
          </li>
          <li>Design alerts properly. Email works today, and texts would reach people faster.</li>
          <li>Compare saved places side by side, which renters asked for in the reviews.</li>
          <li>Put it in front of renters who aren’t us.</li>
        </List>
      </>
    ),
  },
];

export default function Design() {
  return (
    <SiteShell>
      <CaseStudyArticle
        hero={<LiveSearch />}
        label="Fred • 2026"
        title="An AI agent that hunts apartments in New York"
        sections={SECTIONS}
      />
    </SiteShell>
  );
}
