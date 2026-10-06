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
  inlineLink,
  Lead,
  P,
  label,
} from "@/components/site/prose";
import { BuildNote, Screens } from "@/components/site/appStudy";
import LiveRoom from "./LiveRoom";

// Every claim traces back to the sing-along (web) and
// group-sing-along-mobile (iOS) repos: commit dates, code and Erin's own
// problem statement in src/app/marketing/Marketing1.md. Screens marked as
// rebuilt were run from the code at that commit with sample data
// (public-domain songs, a test room). Research notes:
// scratchpad research/groupsingalong.md. Open questions sit in InProgress
// slots for Erin to answer.

const IMG = "/images/groupSingAlong/study";
const BG = "#E4DDFB";

const phone = { width: 780, height: 1688 };

const SECTIONS: CaseStudySection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <Lead>
          Group Sing Along lets one person pick a song and opens its lyrics on
          every phone in the room. I designed and built it for family
          sing-alongs, where not everyone knows the words and there are never
          enough songbooks.
        </Lead>
        <P>
          Anyone can join with a 4-letter code, with no account and nothing to
          download. It’s been live at{" "}
          <a
            href="https://www.groupsingalong.com"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            groupsingalong.com
          </a>{" "}
          since January 2025, and in December 2025 I built an iOS version.
        </P>
        <Facts
          items={[
            { label: "Role", value: "Design and build, solo" },
            { label: "Timeline", value: "December 2024 to January 2026" },
            {
              label: "Platforms",
              value: "Web app (live), iOS app (built, not released)",
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
      "How might a whole room sing the same song without crowding around one phone?",
    content: (
      <>
        <P>
          I wrote the problem down before I built anything: “In large group
          gatherings, like family sing-alongs, not everyone knows the lyrics to
          the songs and physical songbooks are often insufficient in number or
          outdated.” The usual fixes are passing 1 phone around or printing
          lyric sheets.
        </P>
        <P>A sing-along room has 4 things a design has to handle:</P>
        <Columns
          count={2}
          items={[
            {
              title: "Every age",
              text: "Sing-alongs mix every age, so there’s nothing to sign up for or install.",
            },
            {
              title: "One leader",
              text: "Someone has to pick the song, or every phone ends up on a different one.",
            },
            {
              title: "People arrive late",
              text: "Someone who joins halfway through should land on the song that’s already playing.",
            },
            {
              title: "Small screens",
              text: "People are singing, not reading, so each phone needs its own text size.",
            },
          ]}
        />
      </>
    ),
  },
  {
    id: "design",
    title: "Design",
    headline: "One host picks, and every phone follows.",
    content: (
      <>
        <P>
          The person who creates the group is the host. They search for a song,
          tap it, and every phone in the room opens the same lyrics. At first,
          singers only saw the lyrics and their own text size buttons. When a
          new phone joins, it asks the host’s phone for the current song, so
          late joiners never wait for the next one. The demo at the top is the
          January 2025 room, rebuilt from its code.
        </P>

        <H3>Joining: a code, a link or a QR code</H3>
        <P>
          Group codes started at 5 letters. I cut them to 4 on January 12, 2025,
          and later made them work in any case. The host shares from 1 screen
          with 2 ways in: a text with the link, and a QR code for people in the
          same room. In the first version the QR code was big and the message
          button was small. Later that month I made them 2 equal targets.
        </P>
        <Screens
          bg={BG}
          screens={[
            {
              src: `${IMG}/share-2025-01-07.webp`,
              alt: "The first share screen: a large QR code with a small round Message button beside it, and Group Code: WXYZ below.",
              ...phone,
              label: "January 7, 2025",
            },
            {
              src: `${IMG}/share-2025-01-30.webp`,
              alt: "The revised share screen: a large round Message button and a QR code of the same size side by side, labeled Message and Scan QR Code.",
              ...phone,
              label: "January 30, 2025",
            },
          ]}
          caption="The share screen, before and after. Rebuilt from the code at each commit with a test room."
        />

        <H3>The room, 4 versions</H3>
        <P>
          The first room was a plain page; my commit called it “UI option 1.” By
          the end of January it was a card with a violet header, album art and −
          / + text size on every phone. In March 2025 the header started showing
          how many people were in the room, and a row told you whether you were
          the host. I also renamed the “conductor” to the “host” so the word
          matched everywhere.
        </P>
        <Screens
          bg={BG}
          screens={[
            {
              src: `${IMG}/room-2025-01-07.webp`,
              alt: "January 7, 2025: a textured banner title, a plain search box, the song name in one line and lyrics in plain text.",
              ...phone,
              label: "Jan 2025",
            },
            {
              src: `${IMG}/room-2025-01-30.webp`,
              alt: "January 30, 2025: a violet gradient header with a Share button, a search box, album art beside Jingle Bells, and lyrics with − and + buttons.",
              ...phone,
              label: "Late Jan 2025",
            },
            {
              src: `${IMG}/room-2025-03-28.webp`,
              alt: "March 28, 2025: the header shows 5 members, and a row reads Role: Host and Group Code: WXYZ above the search box and lyrics.",
              ...phone,
              label: "Mar 2025",
            },
            {
              src: `${IMG}/room-2026.webp`,
              alt: "2026: the song row and a large View Lyrics button, with Lyrics provided by AZLyrics below it.",
              ...phone,
              label: "2026",
            },
          ]}
          caption="The host’s room at 4 commits, rebuilt from the code with a public-domain song."
        />

        <H3>Song requests</H3>
        <P>
          In December 2025 I let singers ask for songs without taking control.
          They search and tap Request. The host gets 1 list, with repeats merged
          into “Requested 3x,” and taps Accept to play one. A confirmation
          screen replaced the browser alert that used to say a request was sent.
        </P>
        <Screens
          bg={BG}
          screens={[
            {
              src: `${IMG}/requests-host.webp`,
              alt: "The host’s Song Requests list with a count of 2: Auld Lang Syne, and Feliz Navidad marked Requested 3x, each with an Accept button.",
              ...phone,
              label: "Host",
            },
            {
              src: `${IMG}/request-sent.webp`,
              alt: "A singer’s Request Sent! screen with a violet check mark and the song’s title and artist.",
              ...phone,
              label: "Singer",
            },
          ]}
          caption="Requests, from both sides. Rebuilt from the code with sample requests."
        />

        <H3>Lyrics moved off the page</H3>
        <P>
          In January 2026 the lyrics stopped being text in the app. On the web,
          each phone now opens the song’s page on a lyrics site, in a window
          that opens by itself when the host changes songs. On iOS it opens in
          Safari’s Reader view.
        </P>
        <InProgress title="Why the lyrics moved">
          Add the reason: licensing, reliability or something else. Since the
          change, the − / + buttons on the web no longer resize the lyrics.
        </InProgress>
      </>
    ),
  },
  {
    id: "landing-page",
    title: "Landing page",
    headline: "From 2 buttons to a page that explains itself.",
    content: (
      <>
        <P>
          The first landing page was the name and 2 buttons. In March 2025 I
          redesigned it to explain the idea before asking anyone to start a
          group: a serif headline, Create and Join side by side, and a sample
          lyrics card. The card is an illustration; the app shows the whole
          song, not 1 highlighted line.
        </P>
        <figure>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                src: "landing-2025-01-07",
                when: "January 7, 2025",
                alt: "The first landing page: the name Group Sing Along, a microphone icon and 2 stacked violet buttons, Create Group and Join Group.",
              },
              {
                src: "landing-2025-01-30",
                when: "January 30, 2025",
                alt: "The landing page with the headline Make Group Singing Easy and Fun above the same 2 buttons, and a footer with an Install link.",
              },
              {
                src: "landing-2025-03-28",
                when: "March 28, 2025",
                alt: "The redesigned landing page: a serif headline, Create Group and Join Group side by side, and a sample lyrics card on the right.",
              },
            ].map((l) => (
              <div key={l.src}>
                <p className={label}>{l.when}</p>
                <Image
                  src={`${IMG}/${l.src}.webp`}
                  alt={l.alt}
                  width={1440}
                  height={900}
                  sizes="(min-width: 1024px) 290px, (min-width: 640px) 33vw, 100vw"
                  className="mt-2 h-auto w-full border border-site-line"
                />
              </div>
            ))}
          </div>
          <Caption>
            The landing page’s first screen, rebuilt from the code at each
            commit.
          </Caption>
        </figure>
        <InProgress title="Landing page copy">
          The live page still has 3 placeholder testimonials and “Join thousands
          of families.” Swap in real quotes or take them down before linking it
          from here.
        </InProgress>
      </>
    ),
  },
  {
    id: "ios",
    title: "iOS app",
    headline: "Bigger rooms became the paid tier.",
    content: (
      <>
        <P>
          In December 2025 I built an iOS version in Expo that joins the same
          rooms as the web app, so iPhones and browsers can sing together. Free
          rooms hold 3 people. Plus holds 10 for $1.99 a month or $20 a year,
          and Party and a 24-hour Event Pass hold 25. Only the host pays, and
          everyone else joins free.
        </P>
        <P>
          2 details are about real rooms. Text size scales the whole screen from
          0.625× to 2×, not just the lyrics. And when the host’s phone goes to
          the background for a screenshot or a text, the room waits 10 seconds
          before ending, so nobody else loses the song.
        </P>
        <Screens
          bg={BG}
          screens={[
            {
              src: `${IMG}/ios-host-song.webp`,
              alt: "The iOS room: a gradient header with 2 members, Role: Host, a search box, Song Requests, Jingle Bells, and a View Lyrics on Genius button above Share and Leave Group.",
              ...phone,
              label: "Room",
            },
            {
              src: `${IMG}/ios-paywall.webp`,
              alt: "The iOS paywall titled Keep everyone in sync: free groups support up to 3 people, with the Plus plan at $20 a year.",
              ...phone,
              label: "Paywall",
            },
            {
              src: `${IMG}/ios-pricing.webp`,
              alt: "The iOS pricing screen titled Sing together. No confusion., with the Plus plan for up to 10 people.",
              ...phone,
              label: "Pricing",
            },
          ]}
          caption="The iOS app, rendered from its code in a browser, so fonts and spacing differ a little from an iPhone."
        />
        <InProgress title="Release">
          The app is built but not on the App Store. Add whether it went to
          review and what’s next. The web app has had the same 3-person limit
          since December 2025, with no way to upgrade on the web.
        </InProgress>
      </>
    ),
  },
  {
    id: "results",
    title: "Results",
    content: (
      <>
        <P>
          The first version took about 2 weeks: my first commit was December 27,
          2024, and search worked in production on January 6, 2025. It has been
          live ever since, and it became an installable web app in February
          2025.
        </P>
        <InProgress title="Usage">
          Add the number of people who use it, with its source and date (Google
          Analytics or Vercel Analytics), and any real moment you saw it used.
          The homepage says about 155 active users; that number needs a source
          before it stays.
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
          This was the first thing I built for people in the same room. The
          hardest problem was people who joined mid-song and saw nothing until
          the host picked the next one. The fix was a small handshake: a new
          phone says hello, and the host’s phone sends the current song.
        </P>
        <P>
          It also taught me to design for the people who aren’t in charge. Most
          of the room never touches search, so their screen has 1 job: show the
          words big enough to sing.
        </P>
        <BuildNote href="/groupSingAlong">
          Next.js and Tailwind with shadcn/ui on the web, Pusher for the live
          room, Deezer for search, and Expo for iOS. There’s no database: a room
          lasts as long as its host.
        </BuildNote>
      </>
    ),
  },
];

export default function Design() {
  return (
    <SiteShell>
      <CaseStudyArticle
        hero={<LiveRoom />}
        label="Group Sing Along • 2025"
        title="Lyrics everyone in the room sees in real time"
        sections={SECTIONS}
      />
    </SiteShell>
  );
}
