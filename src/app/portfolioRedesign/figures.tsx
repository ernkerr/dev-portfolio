import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LuCodeXml, LuPenTool } from "react-icons/lu";
import { mono, serif } from "@/components/site/links";
import { Caption, inlineLink, label } from "@/components/site/prose";
import {
  CarpoolioMark,
  OrderSyncFlow,
  OrderSyncTokens,
} from "@/components/site/thumbs";

// Figures for the portfolio redesign case study. Wherever it can, a figure is
// the real thing rather than a picture of it: screenshots of the real pages,
// the live thumbnail components, the site's own tokens and type, and dates
// from the commit history.

const IMG = "/images/portfolioRedesign";

/* ---------- Problem ---------- */

// The figure crops the 2025 homepage screenshot (1440 × 900) to the tiles,
// and each marked tile is placed as a percentage of that crop.
const AUDIT_CROP = { x: 100, y: 110, w: 1240, h: 680 };
const box = (x: number, y: number, w: number, h: number) => ({
  left: ((x - AUDIT_CROP.x) / AUDIT_CROP.w) * 100,
  top: ((y - AUDIT_CROP.y) / AUDIT_CROP.h) * 100,
  width: (w / AUDIT_CROP.w) * 100,
  height: (h / AUDIT_CROP.h) * 100,
});

const AUDIT = [
  {
    n: 1,
    box: box(128, 200, 489, 282),
    title: "The type picked a side.",
    text: "“Designer &” is a thin script and “Full Stack Developer” a heavy pixel face, so the headline argued before anyone read it.",
  },
  {
    n: 2,
    box: box(923, 200, 389, 427),
    title: "One tile in ten was about my work.",
    text: "The rest were a photo, my last-played Spotify track, a clock, a GitHub graph, a blog link, a disco-ball mode, a dark-mode toggle and a contact link.",
  },
  {
    n: 3,
    box: box(923, 708, 389, 64),
    title: "The visual language was a developer’s.",
    text: "Pixel display type, monospace body text, and one saturated blue on every tile. A disco-ball button got the same weight as my work, so nothing stood out.",
  },
];

function Pin({ n }: { n: number }) {
  return (
    <span
      className={`${mono} flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-site-ink text-[11px] text-site-paper md:h-7 md:w-7 md:text-[12px]`}
    >
      {n}
    </span>
  );
}

export function Audit() {
  return (
    <figure>
      <div className="relative">
        <div
          className="relative overflow-hidden border border-site-line"
          style={{ aspectRatio: `${AUDIT_CROP.w} / ${AUDIT_CROP.h}` }}
        >
          <Image
            src={`${IMG}/before-home-desktop.png`}
            alt="The 2025 homepage, with three areas marked: the headline, the projects list, and the disco-ball and dark-mode tiles."
            width={1440}
            height={900}
            sizes="(min-width: 1024px) 1040px, 116vw"
            className="absolute h-auto max-w-none"
            style={{
              width: `${(1440 / AUDIT_CROP.w) * 100}%`,
              left: `${(-AUDIT_CROP.x / AUDIT_CROP.w) * 100}%`,
              top: `${(-AUDIT_CROP.y / AUDIT_CROP.h) * 100}%`,
            }}
          />
        </div>
        {AUDIT.map(({ n, box }) => (
          <div
            key={n}
            aria-hidden="true"
            className="absolute rounded-[3px] outline outline-2 outline-offset-2 outline-white"
            style={{
              left: `${box.left}%`,
              top: `${box.top}%`,
              width: `${box.width}%`,
              height: `${box.height}%`,
            }}
          >
            <span className="absolute -left-3 -top-3 shadow-[0_4px_12px_rgba(15,23,42,0.35)] md:-left-3.5 md:-top-3.5">
              <span className="block rounded-full ring-2 ring-white">
                <Pin n={n} />
              </span>
            </span>
          </div>
        ))}
      </div>
      <ol className="mt-6 flex max-w-[40rem] flex-col gap-8 md:gap-10">
        {AUDIT.map(({ n, title, text }) => (
          <li key={n}>
            <FindingHead n={n} title={title} text={text} />
          </li>
        ))}
      </ol>
    </figure>
  );
}

// A finding's number, title and explanation: the three on the homepage
// screenshot and the ones after it share this, so every finding in the
// audit reads at the same level.
function FindingHead({
  n,
  title,
  text,
}: {
  n: number;
  title: string;
  text: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <Pin n={n} />
      <div>
        <p className={`${serif} text-[20px] leading-snug text-site-ink`}>
          {title}
        </p>
        <p className="mt-1.5 text-[15px] leading-[1.6] text-site-ink/75">
          {text}
        </p>
      </div>
    </div>
  );
}

/** An audit finding after the homepage ones, with its evidence below. */
export function Finding({
  n,
  title,
  text,
  children,
}: {
  n: number;
  title: string;
  text: ReactNode;
  children?: ReactNode;
}) {
  // The section's 24px gap plus this margin matches the 32px (40px from md
  // up) between findings 1–3, and the tighter gap inside keeps each finding
  // grouped with its evidence rather than with the next finding.
  return (
    <div className="mt-2 flex flex-col gap-4 md:mt-4">
      <div className="max-w-[40rem]">
        <FindingHead n={n} title={title} text={text} />
      </div>
      {children}
    </div>
  );
}

export function MentionCount() {
  const rows = [
    { term: "Development, coding or software", n: 13 },
    { term: "Design", n: 2 },
  ];
  const max = 13;
  return (
    <figure className="bg-site-line/60 p-5 sm:p-8">
      <div className="mx-auto max-w-[34rem]">
        <figcaption className={label}>
          Mentions on the 2025 homepage and About page
        </figcaption>
        <dl className="mt-4 space-y-3">
          {rows.map((r) => (
            <div
              key={r.term}
              className="grid grid-cols-[9rem_1fr] items-center gap-4 sm:grid-cols-[15rem_1fr]"
            >
              <dt className="text-[15px] leading-snug text-site-ink">
                {r.term}
              </dt>
              <dd className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-2.5 rounded-r-[4px] bg-site-ink"
                  style={{ width: `${(r.n / max) * 82}%` }}
                />
                <span className={`${serif} text-[22px] leading-none`}>
                  {r.n}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </figure>
  );
}

export function LinkPreview() {
  return (
    <figure>
      <div className="bg-site-line/60 p-5 sm:p-8">
        {/* The logo is white on transparent, made for the 2025 site's navy. */}
        <div className="flex max-w-[34rem] overflow-hidden rounded-[6px] border border-site-line bg-site-paper">
          <Image
            src="/ek.png"
            alt=""
            width={225}
            height={225}
            className="h-auto w-20 shrink-0 self-stretch bg-[#10172A] object-contain p-3 sm:w-28"
          />
          <div className="min-w-0 px-4 py-3">
            <p className={`${mono} text-[11px] text-site-muted`}>erinkerr.me</p>
            <p className="mt-1 text-[15px] font-medium leading-snug text-site-ink">
              Erin Kerr — Software Engineer &amp; Developer Content Creator
            </p>
            <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-site-muted">
              Erin Kerr is a self-taught software engineer building in public.
              Explore projects like Git Racer, Carpoolio, and Group Sing Along,
              read the blog, or get in touch.
            </p>
          </div>
        </div>
      </div>
      <Caption>
        What people see when I paste erinkerr.me into an application or a
        message, rebuilt from the site’s own metadata. It introduces me as a
        software engineer before anyone visits.
      </Caption>
    </figure>
  );
}

/* ---------- Process ---------- */

const STEPS = [
  {
    title: "Audit",
    text: "I walked the 2025 site as a hiring manager would and catalogued what it said.",
  },
  {
    title: "Research",
    text: "I studied what design teams ask portfolios to prove and the portfolios of people hired into the roles I want.",
  },
  {
    title: "Explore",
    text: "I tried a first direction, threw it out, and started from a blank page.",
  },
  {
    title: "Prototype and test",
    text: "I built in code, my fastest medium, and put each version in front of reviewers.",
  },
  {
    title: "Ship and measure",
    text: "Launch, then watch which design roles reply and which case studies get opened.",
  },
];

export function ProcessSteps() {
  return (
    <ol className="grid gap-6 md:grid-cols-5 md:gap-5">
      {STEPS.map((s, i) => (
        <li
          key={s.title}
          className="relative border-l border-site-line pl-5 before:absolute before:-left-[4px] before:top-1.5 before:h-[7px] before:w-[7px] before:rounded-full before:bg-site-ink md:border-l-0 md:border-t md:pl-0 md:pt-5 md:before:-top-[4px] md:before:left-0"
        >
          <span className={`${mono} text-[12px] text-site-muted`}>{i + 1}</span>
          <p className={`${serif} mt-1 text-[20px] leading-snug text-site-ink`}>
            {s.title}
          </p>
          <p className="mt-1.5 text-[14px] leading-[1.55] text-site-ink/75">
            {s.text}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Research ---------- */

// From the affinity map with every role and level selected.
const ASKS = [
  { ask: "Taste & quality bar (“curate hard”)", portfolio: 34, post: 91 },
  { ask: "Shipped work", portfolio: 25, post: 83 },
  { ask: "Relevant surfaces", portfolio: 21, post: 77 },
  { ask: "Visual craft", portfolio: 21, post: 72 },
  { ask: "Systems thinking", portfolio: 17, post: 92 },
  { ask: "Prototyping & code", portfolio: 2, post: 88, focus: true },
];

function Key({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-2.5 rounded-full ${className}`}
    />
  );
}

// A dumbbell per row on one 0 to 100% scale: the dark dot is the share of
// portfolio asks, the gray dot the share of whole posts, so the gap between
// them is the story. The table columns carry the exact numbers.
export function AsksChart() {
  return (
    <figure>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-site-ink/75">
        <span className="flex items-start gap-2">
          <Key className="mt-[4px] shrink-0 bg-site-ink" />
          Portfolio ask: share of posts that describe a portfolio and ask for it
          there
        </span>
        <span className="flex items-start gap-2">
          <Key className="mt-[4px] shrink-0 bg-site-muted" />
          Whole post: share of all posts that mention it anywhere
        </span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-[14px] sm:text-[15px]">
          <caption className="sr-only">
            What design job posts ask for, as a share of portfolio asks and of
            whole posts
          </caption>
          <thead>
            <tr className="border-b border-site-line">
              <th
                scope="col"
                className={`${label} py-2 pr-4 text-left align-bottom font-normal`}
              >
                What they ask for
              </th>
              <th scope="col" className="w-[34%] py-2 align-bottom sm:w-[44%]">
                <span className="sr-only">Chart</span>
                <span
                  aria-hidden="true"
                  className={`${mono} relative mx-[6px] block h-4 text-[11px] font-normal text-site-muted`}
                >
                  <span className="absolute left-0">0%</span>
                  <span className="absolute left-1/2 -translate-x-1/2">
                    50%
                  </span>
                  <span className="absolute right-0">100%</span>
                </span>
              </th>
              <th
                scope="col"
                className={`${label} py-2 pl-2 text-right align-bottom font-normal sm:pl-4`}
              >
                Portfolio ask
              </th>
              <th
                scope="col"
                className={`${label} py-2 pl-2 text-right align-bottom font-normal sm:pl-4`}
              >
                Whole post
              </th>
            </tr>
          </thead>
          <tbody>
            {ASKS.map((a) => {
              const lo = Math.min(a.portfolio, a.post);
              const hi = Math.max(a.portfolio, a.post);
              return (
                <tr
                  key={a.ask}
                  className={`border-b border-site-line transition-colors hover:bg-site-line/50 ${
                    a.focus ? "bg-site-line/50" : ""
                  }`}
                >
                  <th
                    scope="row"
                    className={`py-3 pl-2 pr-3 text-left font-normal leading-snug sm:pr-4 ${
                      a.focus ? "font-medium text-site-ink" : "text-site-ink/80"
                    }`}
                  >
                    {a.ask}
                  </th>
                  <td aria-hidden="true" className="py-3">
                    <div className="relative mx-[6px] h-4">
                      {[0, 50, 100].map((g) => (
                        <span
                          key={g}
                          className="absolute inset-y-0 w-px bg-site-line"
                          style={{ left: `${g}%` }}
                        />
                      ))}
                      <span
                        className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-site-muted/40"
                        style={{ left: `${lo}%`, width: `${hi - lo}%` }}
                      />
                      <span
                        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-site-muted ring-2 ring-site-paper"
                        style={{ left: `${a.post}%` }}
                      />
                      <span
                        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-site-ink ring-2 ring-site-paper"
                        style={{ left: `${a.portfolio}%` }}
                      />
                    </div>
                  </td>
                  <td
                    className={`${serif} py-3 pl-2 text-right text-[16px] tabular-nums text-site-ink sm:pl-4 sm:text-[18px]`}
                  >
                    {a.portfolio}%
                  </td>
                  <td
                    className={`${serif} py-3 pl-2 pr-2 text-right text-[16px] tabular-nums text-site-muted sm:pl-4 sm:text-[18px]`}
                  >
                    {a.post}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Caption>
        Prototyping and code shows up in 88% of posts but in only 2% of what
        they ask a portfolio to show.
      </Caption>
    </figure>
  );
}

/* ---------- Exploration ---------- */

const SITEMAPS = [
  {
    year: "2025",
    pages: [
      { name: "Home", note: "Ten tiles, one about my work" },
      { name: "Projects", note: "13 projects, Git Racer first" },
      { name: "Blog" },
      { name: "About" },
      { name: "Contact" },
    ],
  },
  {
    year: "2026",
    pages: [
      { name: "Work", note: "Six case studies" },
      { name: "Fun", note: "Seven side projects" },
      { name: "About" },
      { name: "Archive", note: "Every past edition, unchanged" },
    ],
  },
];

export function Sitemaps() {
  return (
    <figure>
      <div className="grid gap-8 border-t border-site-line pt-5 sm:grid-cols-2">
        {SITEMAPS.map((map) => (
          <div key={map.year}>
            <p className={label}>{map.year}</p>
            <p className={`${mono} mt-3 text-[13px] text-site-ink`}>
              erinkerr.me
            </p>
            <ul className="ml-[5px] mt-2 space-y-3 border-l border-site-line pl-5">
              {map.pages.map((p) => (
                <li
                  key={p.name}
                  className="relative before:absolute before:-left-5 before:top-[13px] before:h-px before:w-3.5 before:bg-site-line"
                >
                  <span
                    className={`${serif} text-[20px] leading-snug text-site-ink`}
                  >
                    {p.name}
                  </span>
                  {p.note && (
                    <span className="block text-[14px] text-site-muted">
                      {p.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Caption>
        The 2025 site put every project, the blog and the widgets on one level.
        The 2026 site splits work from side projects and keeps old editions out
        of the way.
      </Caption>
    </figure>
  );
}

/* ---------- Prototyping ---------- */

// Dates from the commit history.
const VERSIONS: { date: string; text: ReactNode; dropped?: boolean }[] = [
  {
    date: "Sep 20",
    text: "A separate design page beside the old site",
    dropped: true,
  },
  {
    date: "Sep 25",
    text: "A blank homepage, with the 2025 site frozen at /archive/2025",
  },
  {
    date: "Sep 26",
    text: "The archive index, pared back to a heading, a thumbnail and a year",
  },
  { date: "Oct 1", text: "Work, Fun and About pages" },
  { date: "Oct 1", text: "The designer/engineer switch under the headline" },
  { date: "Oct 1", text: "The engineer side, which inverts the whole page" },
  {
    date: "Oct 1",
    text: "Case studies with a design side and an engineering side",
  },
];

export function Versions() {
  return (
    <ol className="max-w-[40rem]">
      {VERSIONS.map((v, i) => (
        <li
          key={i}
          className="grid grid-cols-[4.5rem_1fr] gap-x-4 border-t border-site-line py-3 text-[15px] leading-snug"
        >
          <span className={`${mono} pt-[2px] text-[13px] text-site-muted`}>
            {v.date}
          </span>
          <span className={v.dropped ? "text-site-muted" : "text-site-ink"}>
            {v.dropped ? <s>{v.text}</s> : v.text}
            {v.dropped && " (dropped)"}
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Design decisions ---------- */

/** A numbered decision: number and title on the left, the case on the right. */
export function Decision({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-4 border-t border-site-line pt-6 md:grid-cols-[14rem_1fr] md:gap-8">
      <div>
        <span className={`${mono} text-[12px] text-site-muted`}>
          {String(n).padStart(2, "0")}
        </span>
        <h3 className={`${serif} mt-1 text-[22px] leading-snug text-site-ink`}>
          {title}
        </h3>
      </div>
      <div className="flex min-w-0 flex-col gap-5">{children}</div>
    </div>
  );
}

// The 2025 headline is cropped straight out of the homepage screenshot.
const CROP = { x: 128, y: 370, w: 489, h: 112, iw: 1440, ih: 900 };

export function HeadlineSpecimen() {
  return (
    <figure className="grid gap-4 sm:grid-cols-2">
      <div>
        <p className={label}>2025</p>
        <div
          role="img"
          aria-label="The 2025 headline: “Designer &” in a thin script above “Full Stack Developer” in a heavy pixel typeface."
          className="mt-2 border border-site-line bg-no-repeat"
          style={{
            aspectRatio: `${CROP.w} / ${CROP.h}`,
            backgroundImage: `url(${IMG}/before-home-desktop.png)`,
            backgroundSize: `${(CROP.iw / CROP.w) * 100}% auto`,
            backgroundPosition: `${(CROP.x / (CROP.iw - CROP.w)) * 100}% ${
              (CROP.y / (CROP.ih - CROP.h)) * 100
            }%`,
          }}
        />
      </div>
      <div>
        <p className={label}>2026</p>
        <div
          className="mt-2 flex items-center border border-site-line px-5"
          style={{ aspectRatio: `${CROP.w} / ${CROP.h}` }}
        >
          <p
            className={`${serif} text-[clamp(17px,2.2vw,24px)] leading-tight text-site-ink`}
          >
            I’m Erin, a <em>designer</em> who engineers.
          </p>
        </div>
      </div>
    </figure>
  );
}

function MiniSwitch({ engineer }: { engineer: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-8 w-16 shrink-0 rounded-full bg-site-ink"
    >
      <span
        className={`absolute left-[5%] top-[10%] flex aspect-square h-[80%] items-center justify-center rounded-full bg-site-paper ${
          engineer ? "translate-x-[125%]" : ""
        }`}
      >
        {engineer ? (
          <LuCodeXml className="h-[50%] w-[50%] text-site-ink" />
        ) : (
          <LuPenTool className="h-[50%] w-[50%] text-site-ink" />
        )}
      </span>
    </span>
  );
}

export function SwitchSpecimen() {
  return (
    <figure>
      <ul className="border-b border-site-line">
        {[false, true].map((engineer) => (
          <li
            key={String(engineer)}
            className="flex items-center gap-4 border-t border-site-line py-4"
          >
            <MiniSwitch engineer={engineer} />
            <p
              className={`${serif} text-[20px] leading-snug text-site-ink sm:text-[24px]`}
            >
              a {engineer ? "designer" : <em>designer</em>} who{" "}
              {engineer ? <em>engineers</em> : "engineers"}.
              <span className="sr-only">
                {engineer ? " (engineer side)" : " (designer side)"}
              </span>
            </p>
          </li>
        ))}
      </ul>
      <Caption>
        The two sides of the switch.{" "}
        <Link href="/" className={inlineLink}>
          Try it on the homepage
        </Link>
        .
      </Caption>
    </figure>
  );
}

const RETITLED = [
  {
    before: "Gin Score Tracker",
    title: "Gin Rummy scores, round by round",
    meta: ["Gin Score Tracker", "App Store"],
  },
  {
    before: "Group Sing Along",
    title: "Lyrics everyone in the room sees in real time",
    meta: ["Group Sing Along", "~155 active users"],
  },
  {
    before: "Carpoolio",
    title: "Group travel app, from first sketch to acquisition",
    meta: ["Carpoolio", "4.9★ App Store"],
  },
];

export function Retitled() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[30rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-site-line">
            <th
              scope="col"
              className={`${label} w-[30%] py-2 pr-4 font-normal`}
            >
              2025 tile
            </th>
            <th scope="col" className={`${label} py-2 font-normal`}>
              2026 tile
            </th>
          </tr>
        </thead>
        <tbody>
          {RETITLED.map((r) => (
            <tr key={r.before} className="border-b border-site-line">
              <td
                className={`${mono} py-4 pr-4 align-top text-[13px] text-site-muted`}
              >
                {r.before}
              </td>
              <td className="py-4 align-top">
                <span
                  className={`${serif} block text-[19px] leading-snug text-site-ink`}
                >
                  {r.title}
                </span>
                <span className={`${label} mt-1 block`}>
                  {r.meta.join(" • ")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const THUMBS = [
  {
    node: <OrderSyncTokens />,
    bg: "#E6EBF2",
    text: "OrderSync’s own color tokens and buttons",
  },
  { node: <OrderSyncFlow />, text: "The order agent’s flow, Email to ERP" },
  {
    node: <CarpoolioMark />,
    text: "Carpoolio’s mark on its landing-page colors",
  },
];

export function LiveThumbs() {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {THUMBS.map((t) => (
        <li key={t.text}>
          <div
            role="img"
            aria-label={t.text}
            className="relative aspect-square overflow-hidden border border-site-line [container-type:inline-size]"
            style={t.bg ? { background: t.bg } : undefined}
          >
            {t.node}
          </div>
          <p className="mt-2 text-[13px] leading-snug text-site-muted">
            {t.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

const REWRITES = [
  {
    before: "My path into software development wasn’t traditional.",
    after: "My path into design wasn’t traditional.",
  },
  {
    before: "When I’m not coding I:",
    after: "Outside of design and engineering, I’m:",
  },
];

export function Rewrites() {
  return (
    <ul className="border-b border-site-line">
      {REWRITES.map((r) => (
        <li
          key={r.after}
          className="grid gap-2 border-t border-site-line py-4 sm:grid-cols-2 sm:gap-8"
        >
          <p className="text-[15px] leading-snug text-site-muted">
            <span className="sr-only">2025: </span>
            <s className="decoration-site-muted/60">{r.before}</s>
          </p>
          <p className={`${serif} text-[19px] leading-snug text-site-ink`}>
            <span className="sr-only">2026: </span>
            {r.after}
          </p>
        </li>
      ))}
    </ul>
  );
}

const CUT = [
  {
    claim: "Shared conversion surfaces, instrumented end to end with PostHog",
    why: "The analytics were real, but they weren’t my work.",
  },
  {
    claim: "Zero design debt",
    why: "My own audit tool found 22 off-palette colors.",
  },
  {
    claim: "The audit proves the site follows the system",
    why: "It checks the site. “Proves” claimed more than the tool does.",
  },
];

export function CutClaims() {
  return (
    <ul className="border-b border-site-line">
      {CUT.map((c) => (
        <li key={c.claim} className="border-t border-site-line py-4">
          <p className={`${serif} text-[19px] leading-snug text-site-muted`}>
            <span className="sr-only">Cut: </span>
            <s className="decoration-site-ink/50">{c.claim}</s>
          </p>
          <p className="mt-1 text-[15px] leading-[1.6] text-site-ink/80">
            {c.why}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Design system ---------- */

// The values in globals.css. The second column is the engineer side of the
// switch, where paper and ink trade places.
const TOKENS = [
  { name: "paper", light: "#FAFCFD", dark: "#0F172A", use: "Background" },
  {
    name: "ink",
    light: "#0F172A",
    dark: "#FAFCFD",
    use: "Text",
    contrast: "17.3 / 17.3",
  },
  {
    name: "muted",
    light: "#66727F",
    dark: "#A7B1BD",
    use: "Labels and metadata",
    contrast: "4.8 / 8.2",
  },
  { name: "line", light: "#E3E8EE", dark: "#3D4A5C", use: "Dividers" },
  {
    name: "blue",
    light: "#001AFF",
    dark: "#A5B1FF",
    use: "Links, active nav",
    contrast: "7.9 / 8.8",
  },
];

export function Tokens() {
  return (
    <figure>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {TOKENS.map((t) => (
          <li key={t.name}>
            <div
              aria-hidden="true"
              className="grid h-24 grid-rows-2 border border-site-line"
            >
              <span style={{ background: t.light }} />
              <span style={{ background: t.dark }} />
            </div>
            <p
              className={`${serif} mt-2 text-[19px] leading-none text-site-ink`}
            >
              {t.name}
            </p>
            <p
              className={`${mono} mt-1.5 text-[12px] leading-relaxed text-site-muted`}
            >
              {t.light}
              <br />
              {t.dark}
            </p>
            <p className="mt-1 text-[13px] leading-snug text-site-ink/75">
              {t.use}
              {t.contrast && (
                <>
                  <br />
                  Contrast {t.contrast}
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
      <Caption>
        Each swatch shows the designer side on top and the engineer side below,
        where paper and ink trade places. Contrast is against the background on
        each side, and every text color passes WCAG AA.
      </Caption>
    </figure>
  );
}

const FACES = [
  {
    name: "Newsreader",
    role: "Headlines and project titles",
    sample: "I’m Erin, a designer who engineers.",
    className: `${serif} text-[28px] leading-tight sm:text-[34px]`,
  },
  {
    name: "Geist",
    role: "Body text",
    sample: "My path into design wasn’t traditional.",
    className:
      "font-[family-name:var(--font-geist-sans)] text-[17px] leading-relaxed",
  },
  {
    name: "Geist Mono",
    role: "Navigation, labels and metadata, a small dose of the old site",
    sample: "Work   Fun   About",
    className: `${mono} text-[13px] uppercase tracking-[0.06em]`,
  },
];

export function TypeSpecimens() {
  return (
    <ul className="border-b border-site-line">
      {FACES.map((f) => (
        <li
          key={f.name}
          className="grid gap-2 border-t border-site-line py-5 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-8"
        >
          <div>
            <p className="text-[15px] font-medium text-site-ink">{f.name}</p>
            <p className="text-[13px] leading-snug text-site-muted">{f.role}</p>
          </div>
          <p className={`${f.className} text-site-ink`}>{f.sample}</p>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Results ---------- */

// The 2026 side stays a placeholder until the redesign is tested and final.
export function BeforeAfter() {
  return (
    <figure>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className={label}>2025</p>
          <Image
            src={`${IMG}/before-home-desktop.png`}
            alt="The 2025 homepage: ten blue tiles, the largest reading “Designer & Full Stack Developer”."
            width={1440}
            height={900}
            sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"
            className="mt-2 h-auto w-full border border-site-line"
          />
        </div>
        <div>
          <p className={label}>2026</p>
          <div className="mt-2 flex aspect-[1440/900] flex-col items-center justify-center gap-2 border border-dashed border-site-muted/50 px-6 text-center">
            <p className={`${label} flex items-center gap-2`}>
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-site-blue"
              />
              In progress
            </p>
            <p className="text-body-sm text-site-ink/75">
              The final first screen goes here once testing is done.
            </p>
          </div>
        </div>
      </div>
      <Caption>
        The first screen, before and after. The 2025 site is still online,
        unchanged, at{" "}
        <Link href="/archive/2025" className={inlineLink}>
          /archive/2025
        </Link>
        .
      </Caption>
    </figure>
  );
}

const COMPARE: { what: string; before: ReactNode; after: ReactNode }[] = [
  {
    what: "Headline",
    before: "“Designer & Full Stack Developer”",
    after: (
      <>
        “I’m Erin, a <em>designer</em> who engineers.”
      </>
    ),
  },
  {
    what: "First screen",
    before: "Ten tiles, one about work",
    after: "Headline, experience, then case studies",
  },
  {
    what: "Lead project",
    before: "Git Racer",
    after: "OrderSync design system",
  },
  {
    what: "Card labels",
    before: "Tech stack",
    after: "App Store rating, active users, client",
  },
  {
    what: "Side projects",
    before: "Mixed in with client work",
    after: "Their own page",
  },
  {
    what: "Old site",
    before: "Overwritten",
    after: "Archived at /archive/2025",
  },
];

export function Compare() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[15px]">
        <thead>
          <tr className="border-b border-site-line">
            <td className="py-2" />
            <th scope="col" className={`${label} py-2 pr-4 font-normal`}>
              2025
            </th>
            <th scope="col" className={`${label} py-2 font-normal`}>
              2026
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARE.map((c) => (
            <tr key={c.what} className="border-b border-site-line">
              <th
                scope="row"
                className={`${label} w-[22%] py-4 pr-4 align-top font-normal`}
              >
                {c.what}
              </th>
              <td className="w-[36%] py-4 pr-4 align-top leading-snug text-site-muted">
                {c.before}
              </td>
              <td
                className={`${serif} py-4 align-top text-[18px] leading-snug text-site-ink`}
              >
                {c.after}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
