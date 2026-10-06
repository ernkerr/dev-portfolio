import Image from "next/image";
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
  Lead,
  P,
  label,
} from "@/components/site/prose";
import { BuildNote, Screens } from "@/components/site/appStudy";
import LiveCar from "./LiveCar";

// Every claim traces back to the carpoolio (web), carpoolio-mobile (iOS) and
// carpoolio-web (share page) repos, Erin's dated screenshots and videos in
// her Carpoolio archive, the App Store Connect history and the signed
// tradename agreement. Research notes: scratchpad research/carpoolio.md.
// Not used on purpose: the landing page's testimonials (no source), its
// AI-generated hero illustration, the stock car drawings, and the buyer's
// name and price. Open questions sit in InProgress slots.

const IMG = "/images/carpoolio/study";
const BG = "#061423";
const phone = { width: 780, height: 1695 };

const SECTIONS: CaseStudySection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <Lead>
          Carpoolio planned the rides for group trips: who’s driving, who’s
          riding with whom, and when each car leaves. I designed and built it,
          first as a web app and then as an iOS app that shipped in July 2025.
        </Lead>
        <P>
          It was the first full-stack app I built and designed. In January 2026
          I sold the Carpoolio name to a company with an app of the same name,
          and took mine off the App Store as part of the sale.
        </P>
        <Facts
          items={[
            { label: "Role", value: "Design and build" },
            { label: "Timeline", value: "October 2024 to August 2025" },
            {
              label: "Platforms",
              value: "Web app, then iOS (App Store, July 2025)",
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
      "How might a group plan who rides with whom without the group chat chaos?",
    content: (
      <>
        <P>
          Planning a trip with multiple cars and passengers can quickly become
          overwhelming, especially when coordination happens through fragmented
          group chats, spreadsheets, or last-minute messages.
        </P>
        <P>
          Carpool apps are built for daily commutes or riding with strangers.
          Carpoolio was for pre-existing groups: people who already know each
          other but need a better way to organize their rides, for a road trip,
          a festival or an out-of-town event. When I pitched it to friends, I
          called it “kind of like Partiful but for trips/festivals/weddings/
          winetasting,” and admitted I was building it for me too: “I hate the
          hassle.”
        </P>
        <P>Everyone in the group needs to know 3 things:</P>
        <Columns
          items={[
            {
              title: "Who’s in which car",
              text: "A list of names doesn’t show who’s riding together or how many seats are left.",
            },
            {
              title: "When and where each car leaves",
              text: "Every car has its own time and pickup spot, and they change.",
            },
            {
              title: "That it’s easy to join",
              text: "The person planning sends a link. Nobody wants to set up anything before they can claim a seat.",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "design",
    title: "Design",
    headline: "Make the car the sign-up sheet.",
    content: (
      <>
        <P>
          The core idea was to draw each car from above and make its seats the
          slots. You see the car, you see who’s in it, and you tap an open seat
          to take it. The first row holds the driver and 1 passenger, and the
          rows behind hold up to 3. A badge on each car counts the open seats
          down to “Full.” The demo at the top is that screen, rebuilt.
        </P>

        <H3>One big form became one question per screen</H3>
        <P>
          In October 2024 my editor was 1 glowing card holding every field.
          About a week later I split it into 2 columns, trip details on the left
          and the car on the right, with + and − buttons to add seats row by
          row. Then on November 11 I took creation out of the editor entirely:
          name your trip, choose a destination, set a date, one question per
          screen. The date step has a “Not sure yet” button, for trips that
          don’t have a weekend yet.
        </P>
        <figure>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                src: "editor-2024-10-29",
                when: "October 29, 2024",
                h: 957,
                alt: "The first editor: one large white-glowing card on a dark blue and teal background, with Untitled Trip, a destination field, a TBD date, Change Background and Change Glow Color, and Preview and Add a Car buttons.",
              },
              {
                src: "editor-2024-11-06",
                when: "November 6, 2024",
                h: 960,
                alt: "The 2-column editor with a green glow: trip details on the left and a blue top-down car on the right with seat rows, Save Car, Invite Link, Preview and Add a Car.",
              },
              {
                src: "wizard-2024-11-11",
                when: "November 11, 2024",
                h: 900,
                alt: "The create flow’s date step: Set a date, a November 2024 calendar, a Not sure yet button, and Back and Continue.",
              },
            ].map((s) => (
              <div key={s.src}>
                <p className={label}>{s.when}</p>
                <Image
                  src={`${IMG}/${s.src}.webp`}
                  alt={s.alt}
                  width={1440}
                  height={s.h}
                  sizes="(min-width: 1024px) 290px, (min-width: 640px) 33vw, 100vw"
                  className="mt-2 h-auto w-full border border-site-line"
                />
              </div>
            ))}
          </div>
          <Caption>
            The web app’s trip editor over 3 weeks, from my own screenshots.
          </Caption>
        </figure>

        <H3>Set the vibe</H3>
        <P>
          A trip should feel like the trip. Hosts pick an animated background
          for it, and on iOS every card, field and button turns to frosted glass
          tinted by that background, so the whole screen changes with it. On the
          web, hosts could also set the glow color of the buttons and cards.
        </P>
        <Screens
          bg={BG}
          dark
          screens={[
            {
              src: `${IMG}/camping.webp`,
              alt: "A Camping Trip to Yosemite Valley on a deep blue background, with glass cards for the map, the date and the cars.",
              ...phone,
              label: "One background",
            },
            {
              src: `${IMG}/camping-alt.webp`,
              alt: "The same Camping Trip on a different background, with every card tinted to match it.",
              ...phone,
              label: "Another",
            },
          ]}
          caption="The same trip on 2 backgrounds. Every card re-tints to match. From my own iPhone screenshots."
        />

        <H3>Before and after styling</H3>
        <P>
          On iOS I built the flows first with stock components, then started
          styling on May 2, 2025. The profile screen shows the jump: from gray
          buttons on white to glass on the trip’s background, with headings in
          Neuropol and body text in Britanica.
        </P>
        <Screens
          bg={BG}
          dark
          screens={[
            {
              src: `${IMG}/profile-before.webp`,
              alt: "The iOS profile screen before styling: a photo, gray Upload, Update and Sign Out buttons on white, and a default tab bar.",
              width: 780,
              height: 1690,
              label: "May 1, 2025",
            },
            {
              src: `${IMG}/profile-after.webp`,
              alt: "The styled iOS profile screen: the same fields as glass on a red patterned background, in white type.",
              ...phone,
              label: "June 2025",
            },
          ]}
          caption="The profile screen, before and after styling. From a screen recording and a screenshot."
        />

        <H3>Who can change what</H3>
        <P>
          A car belongs to whoever adds it, but the seats belong to everyone. In
          July 2025 I made that the rule: anyone on the trip can change who sits
          where, and only the car’s owner can edit the car itself, its time,
          pickup spot and number of seats.
        </P>
        <InProgress title="The why behind the changes">
          Add what prompted each change, if you remember: the wizard, the move
          from a seat slider to 13 tap buttons on the web (March 2025), and
          opening seats to everyone. Any feedback from friends who used it goes
          here too.
        </InProgress>
      </>
    ),
  },
  {
    id: "shipping",
    title: "Shipping",
    headline: "From the web to the App Store.",
    content: (
      <>
        <P>
          The web app was live at carpoolio.co by January 2025 and needed no
          account: making a trip gave you a private link to edit it and a public
          one to share. For iOS I added accounts, so trips could live in a list
          split into Hosting and Invited, and share links open the app or send
          people to the App Store.
        </P>
        <P>
          I submitted version 1.0 on July 7, 2025. It passed review the next day
          and went live on July 9, and I shipped 3 updates through August.
        </P>
        <Screens
          bg={BG}
          dark
          screens={[
            {
              src: `${IMG}/trips-list.webp`,
              alt: "The Trips screen: Hosting and Invited filters above glass cards for Annual Lake Trip, Camping Trip and Vegas Baby.",
              ...phone,
              label: "Trips",
            },
            {
              src: `${IMG}/trip-lake.webp`,
              alt: "The Annual Lake Trip screen: a map of South Lake Tahoe with Directions, the date, Add New Car, and a car card.",
              ...phone,
              label: "Trip",
            },
            {
              src: `${IMG}/car-card-lake.webp`,
              alt: "A car card for Car 1, July 3 at 10:00 AM from San Francisco, with a 4/5 seats left badge over the top-down car.",
              ...phone,
              label: "Car",
            },
          ]}
          caption="The iOS app as it shipped. From my App Store screenshots."
        />
      </>
    ),
  },
  {
    id: "results",
    title: "Results",
    content: (
      <>
        <P>
          Carpoolio went from a coded prototype in October 2024 to the App Store
          in July 2025: 4 iOS releases, with the first approved in about a day.
          In January 2026 another company with an app called Carpoolio bought
          the name from me. I had used it first, with carpoolio.co live since
          January 2025, and as part of the sale I took my app down.
        </P>
        <InProgress title="Ratings and usage">
          The homepage says 4.9★ on the App Store, but I couldn’t find a source:
          add an App Store Connect screenshot of the rating and its count, or
          change the tile. Usage: the app had 23 accounts by December 2025, 2 of
          them yours. Decide whether to say that.
        </InProgress>
      </>
    ),
  },
  {
    id: "reflection",
    title: "Reflection",
    content: (
      <>
        <P>
          Knowing what I know now, I would probably have made a simpler web app
          first, since Carpoolio’s functionality was quite complex for a novice
          developer.
        </P>
        <InProgress title="Suggested lines">
          Keep these only if they match what you saw: “The hardest parts were
          hard to design, not hard to build: what a host owns, what a rider
          owns, and how little someone wants to do before they can claim a
          seat.” And: “The car carried the design. People understood a seat on a
          drawing of a car faster than any label I wrote for it.”
        </InProgress>
        <BuildNote href="/carpoolio">
          React and Express with Postgres on the web; Expo, React Native and
          Supabase on iOS. The car drawings were free top-down illustrations
          that I recolored in code, so any color a host picked kept its shading.
        </BuildNote>
      </>
    ),
  },
];

export default function Design() {
  return (
    <SiteShell>
      <CaseStudyArticle
        hero={<LiveCar />}
        label="Carpoolio • 2024–2025"
        title="A group travel app, from first prototype to the App Store"
        sections={SECTIONS}
      />
    </SiteShell>
  );
}
