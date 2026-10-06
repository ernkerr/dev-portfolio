import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import CaseStudyArticle, {
  type CaseStudySection,
} from "@/components/site/CaseStudyArticle";
import { SideProvider } from "@/components/site/SideContext";
import SiteShell from "@/components/site/SiteShell";
import Tile, { type TileItem } from "@/components/site/Tile";
import { EMAIL, focusRing } from "@/components/site/links";
import {
  Code,
  Columns,
  Facts,
  InProgress,
  Lead,
  List,
  P,
  Table,
  inlineLink,
  label,
} from "@/components/site/prose";
import { isEngineerSide } from "@/components/site/side";
import SideDemo from "./SideDemo";

// The 2026 edition's design tokens (tailwind.config.ts) and components,
// rendered so they can be checked on both sides. The rules for using them are
// in CLAUDE.md at the repo root.

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Colors, type, spacing and components of erinkerr.me, rendered from the site's own code.",
  robots: { index: false, follow: false },
};

/* ---------- Color ---------- */

const COLORS = [
  {
    token: "site-paper",
    swatch: "bg-site-paper",
    designer: "#FAFCFD",
    engineer: "#0F172A",
    usage:
      "Page background. The header sits on it at 90% with a backdrop blur.",
  },
  {
    token: "site-ink",
    swatch: "bg-site-ink",
    designer: "#0F172A",
    engineer: "#FAFCFD",
    usage:
      "Headlines, names and bold lead-ins. Body copy is ink at 80%, column text at 75%.",
  },
  {
    token: "site-muted",
    swatch: "bg-site-muted",
    designer: "#66727F",
    engineer: "#A7B1BD",
    usage: "Labels, tile meta, dates, captions and inactive nav.",
  },
  {
    token: "site-line",
    swatch: "bg-site-line",
    designer: "#E3E8EE",
    engineer: "#3D4A5C",
    usage: "1px hairlines around tiles and figures and between rows.",
  },
  {
    token: "site-blue",
    swatch: "bg-site-blue",
    designer: "#001AFF",
    engineer: "#A5B1FF",
    usage:
      "The signature blue, shared with Cyber Goose. Active nav, Get in touch, hover and focus. One or two per screen.",
  },
];

function Swatches() {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5">
      {COLORS.map((c) => (
        <li key={c.token}>
          <div
            className={`aspect-square border border-site-line ${c.swatch}`}
          />
          <p className="mt-3 font-mono text-caption text-site-ink">{c.token}</p>
          <p className={`${label} mt-1`}>
            {c.designer} · {c.engineer}
          </p>
          <p className="mt-2 text-caption text-site-muted">{c.usage}</p>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Type ---------- */

const TYPE: { name: string; spec: string; sample: ReactNode }[] = [
  {
    name: "display",
    spec: "font-serif text-display-sm md:text-display · 56 / 1.08",
    sample: (
      <p className="font-serif text-display-sm text-site-ink md:text-display">
        I&apos;m Erin, a <em>designer</em> who engineers.
      </p>
    ),
  },
  {
    name: "section",
    spec: "font-serif text-section-sm md:text-section · 40 / 1.12",
    sample: (
      <p className="max-w-measure font-serif text-section-sm text-site-ink md:text-section">
        My portfolio was pitching me for a different job.
      </p>
    ),
  },
  {
    name: "subhead",
    spec: "font-serif text-subhead · 26 / 1.375 · H3, Quote",
    sample: (
      <p className="font-serif text-subhead text-site-ink">
        What the portfolios showed
      </p>
    ),
  },
  {
    name: "column-title",
    spec: "font-serif text-column-title · 19 / 1.375",
    sample: (
      <p className="font-serif text-column-title text-site-ink">
        Put shipped work first
      </p>
    ),
  },
  {
    name: "tile-title",
    spec: "font-serif text-tile-title · 17 / 1.375",
    sample: (
      <p className="font-serif text-tile-title text-site-ink">
        Portfolio Redesign
      </p>
    ),
  },
  {
    name: "lead",
    spec: "text-lead-sm md:text-lead · Lead",
    sample: (
      <Lead>
        I rebuilt my portfolio so it makes the case for the job I’m applying for
        now: UI/UX designer.
      </Lead>
    ),
  },
  {
    name: "body",
    spec: "text-body text-site-ink/80 · P",
    sample: (
      <P>
        <strong>Bold lead-ins are full ink.</strong> The rest of the paragraph
        is ink at 80%, kept to a 40rem measure of about 75 characters.
      </P>
    ),
  },
  {
    name: "body-sm",
    spec: "text-body-sm text-site-ink/75",
    sample: (
      <p className="text-body-sm text-site-ink/75">
        Shipped work outranks concepts.
      </p>
    ),
  },
  {
    name: "caption",
    spec: "text-caption text-site-muted · Caption",
    sample: (
      <p className="text-caption text-site-muted">
        The 2025 projects page, opening with Git Racer.
      </p>
    ),
  },
  {
    name: "label",
    spec: "font-mono text-label uppercase · label",
    sample: <p className={label}>Carpoolio • 4.9★ App Store</p>,
  },
  {
    name: "nav",
    spec: "font-mono text-nav uppercase",
    sample: (
      <p className="flex gap-8 font-mono text-nav uppercase text-site-muted">
        <span className="text-site-blue">Work</span>
        <span>Fun</span>
        <span>About</span>
      </p>
    ),
  },
  {
    name: "date",
    spec: "font-mono text-date",
    sample: <p className="font-mono text-date text-site-muted">2024</p>,
  },
  {
    name: "code",
    spec: "Code",
    sample: (
      <P>
        Colors come from <Code>bg-site-paper</Code> and{" "}
        <Code>text-site-ink</Code>.
      </P>
    ),
  },
];

function Specimens() {
  return (
    <ul className="flex flex-col">
      {TYPE.map((t) => (
        <li
          key={t.name}
          className="grid gap-3 border-t border-site-line py-6 md:grid-cols-[13rem_1fr] md:gap-8"
        >
          <div>
            <p className="font-mono text-caption text-site-ink">{t.name}</p>
            <p className={`${label} mt-1`}>{t.spec}</p>
          </div>
          <div className="min-w-0">{t.sample}</div>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Space ---------- */

const SPACING = [
  {
    token: "space-3",
    px: 12,
    classes: "mt-3 · gap-3",
    usage: "Tile art to its title; figure to caption.",
  },
  {
    token: "space-6",
    px: 24,
    classes: "px-gutter · gap-6",
    usage:
      "Page gutter at every width; between tile columns; between blocks in a section.",
  },
  {
    token: "space-8",
    px: 32,
    classes: "gap-x-8",
    usage: "Between items in Columns and Facts.",
  },
  {
    token: "space-10",
    px: 40,
    classes: "gap-10 · mt-10",
    usage: "Between tiles in a column; above an H3.",
  },
  {
    token: "space-56",
    px: 224,
    classes: "gap-section-sm",
    usage: "Between case-study sections below 768px.",
  },
  {
    token: "space-96",
    px: 384,
    classes: "gap-section · mt-section",
    usage: "Between sections from 768px up; above the footer.",
  },
];

function SpacingScale() {
  return (
    <ul className="flex flex-col">
      {SPACING.map((s) => (
        <li
          key={s.token}
          className="grid gap-2 border-t border-site-line py-4 md:grid-cols-[13rem_10rem_1fr] md:items-center md:gap-8"
        >
          <div>
            <p className="font-mono text-caption text-site-ink">
              {s.token} · {s.px}px
            </p>
            <p className={`${label} mt-1`}>{s.classes}</p>
          </div>
          <div className="h-2 bg-site-muted" style={{ width: s.px }} />
          <p className="text-caption text-site-muted">{s.usage}</p>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Shapes ---------- */

const SHAPES: {
  name: string;
  detail: string;
  usage: string;
  node: ReactNode;
}[] = [
  {
    name: "Square",
    detail: "No radius · 1px site-line",
    usage: "Tiles, figures, tables and the header.",
    node: <div className="h-16 w-24 border border-site-line bg-site-paper" />,
  },
  {
    name: "Pill",
    detail: "rounded-full",
    usage: "The switch, its knob and the In progress dot.",
    node: (
      <div className="relative h-12 w-24 rounded-full bg-site-ink">
        <span className="absolute left-[5%] top-[10%] aspect-square h-[80%] rounded-full bg-site-paper shadow-knob" />
      </div>
    ),
  },
  {
    name: "App icon",
    detail: "rounded-app-icon · shadow-float",
    usage: "An app icon floated on a tile's colored field.",
    node: (
      <div className="relative aspect-square w-16 overflow-hidden rounded-app-icon shadow-float ring-1 ring-black/5">
        <Image
          src="/images/ginScoreTracker/GinLogo.png"
          alt="Gin Score Tracker app icon."
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
    ),
  },
  {
    name: "Floating switch",
    detail: "shadow-switch",
    usage: "The switch pinned to a case study's corner.",
    node: (
      <div className="h-12 w-24 rounded-full bg-site-ink shadow-switch ring-1 ring-white/15" />
    ),
  },
];

function Shapes() {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
      {SHAPES.map((s) => (
        <li key={s.name}>
          <div className="flex aspect-[4/3] items-center justify-center bg-site-line/40">
            {s.node}
          </div>
          <p className="mt-3 font-mono text-caption text-site-ink">{s.name}</p>
          <p className={`${label} mt-1`}>{s.detail}</p>
          <p className="mt-2 text-caption text-site-muted">{s.usage}</p>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Components ---------- */

// Same item as the home page's Gin Score Tracker tile.
const GIN: TileItem = {
  href: "/ginScoreTracker",
  title: "Gin Rummy scores, round by round",
  meta: ["Gin Score Tracker", "App Store"],
  art: {
    kind: "float",
    src: "/images/ginScoreTracker/GinLogo.png",
    alt: "Gin Score Tracker app icon: a jester in profile beside the word GIN.",
    ratio: 1,
    width: "w-[30%]",
    radius: "rounded-app-icon",
    shadow: true,
  },
  aspect: "aspect-[4/3]",
  bg: "#E3E69B",
};

function Part({
  name,
  source,
  children,
}: {
  name: string;
  source: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-t border-site-line pt-5">
      <div>
        <p className="font-mono text-caption text-site-ink">{name}</p>
        <p className={`${label} mt-1`}>{source}</p>
      </div>
      {children}
    </div>
  );
}

/* ---------- Sections ---------- */

const SECTIONS: CaseStudySection[] = [
  {
    id: "color",
    title: "Color",
    headline: "Paper and ink, with one blue used sparingly.",
    content: (
      <>
        <P>
          Every color is a CSS variable in <Code>globals.css</Code> that
          Tailwind reads as <Code>site-*</Code>. The switch flips all five to
          the engineer side at once: paper and ink trade places, and muted, line
          and blue each have their own engineer value.
        </P>
        <SideDemo />
        <Swatches />
        <Table
          head={["Pair", "Designer side", "Engineer side"]}
          rows={[
            ["Ink on paper", "17.3:1", "17.3:1"],
            ["Muted on paper", "4.8:1", "8.2:1"],
            ["Blue on paper", "7.9:1", "8.8:1"],
          ]}
        />
      </>
    ),
  },
  {
    id: "type",
    title: "Type",
    headline:
      "A serif for what I say, a sans for explaining it, a mono for labels.",
    content: (
      <>
        <Columns
          items={[
            {
              title: "Newsreader",
              text: "Headlines, section headings, quotes and tile titles. Always regular; emphasis is italic.",
            },
            {
              title: "Geist",
              text: "Running text, from lead paragraphs down to captions.",
            },
            {
              title: "Geist Mono",
              text: "Uppercase labels and nav, plus dates and code.",
            },
          ]}
        />
        <Specimens />
      </>
    ),
  },
  {
    id: "space",
    title: "Space and layout",
    headline:
      "One 24px gutter, a 40rem reading measure, and room between sections.",
    content: (
      <>
        <Facts
          items={[
            { label: "Page width", value: "1600px max" },
            { label: "Gutter", value: "24px each side, at every width" },
            { label: "Reading measure", value: "40rem, about 75 characters" },
            { label: "Header", value: "64px tall, sticky" },
          ]}
        />
        <P>
          Case studies sit in a 48rem column (56rem from 1024px) with the
          section list pinned on the left. Spacing uses Tailwind&apos;s scale;
          these are the steps the site actually uses.
        </P>
        <SpacingScale />
      </>
    ),
  },
  {
    id: "shapes",
    title: "Shapes",
    headline: "Square boxes and hairlines. Only the switch is round.",
    content: (
      <>
        <Shapes />
        <P>
          Hierarchy comes from hairlines and type, not shadows. Shadows only go
          on things that float above the page.
        </P>
      </>
    ),
  },
  {
    id: "components",
    title: "Components",
    headline: "The parts every page is built from.",
    content: (
      <>
        <P>
          The header and footer on this page are <Code>SiteShell</Code>, and the
          layout is <Code>CaseStudyArticle</Code>. The Facts, Columns and Table
          above come from <Code>prose.tsx</Code>.
        </P>
        <Part name="Tile" source="components/site/Tile.tsx">
          <div className="max-w-md">
            <Tile item={GIN} sizes="(min-width: 768px) 28rem, 100vw" />
          </div>
          <p className="max-w-measure text-caption text-site-muted">
            A brand-colored field with one thing on it: an app icon, a logo or
            one real UI component. Never a page screenshot.
          </p>
        </Part>
        <Part name="Links" source="prose.tsx inlineLink · SiteHeader.tsx">
          <P>
            Running text links look like{" "}
            <a href="/about" className={inlineLink}>
              this one to About
            </a>
            : ink with a hairline underline that turns blue on hover.
          </P>
          <a
            href={`mailto:${EMAIL}`}
            className={`self-start font-mono text-nav uppercase text-site-blue underline-offset-4 hover:underline ${focusRing}`}
          >
            <span aria-hidden="true">✦ </span>Get in touch
          </a>
        </Part>
        <Part name="In progress" source="prose.tsx InProgress">
          <InProgress title="A new section">
            Says what will go here, so it reads as unfinished on purpose and is
            easy to find before launch.
          </InProgress>
        </Part>
      </>
    ),
  },
  {
    id: "motion",
    title: "Motion and focus",
    headline: "Quick and eased, and off when you ask for less motion.",
    content: (
      <List>
        <li>
          <strong>The switch:</strong> the knob slides and its two icons roll
          past each other over 300ms on{" "}
          <Code>cubic-bezier(0.22, 1, 0.36, 1)</Code>.
        </li>
        <li>
          <strong>Flipping sides:</strong> the new side grows out of the knob as
          a circle over 400ms. Colors swap instantly underneath, so nothing
          fades in late.
        </li>
        <li>
          <strong>Tile hover:</strong> the art zooms to 103% over 500ms and the
          title turns blue.
        </li>
        <li>
          <strong>Focus:</strong> every link and control gets a 2px blue
          outline, 4px out. Tab through this page to see it.
        </li>
        <li>
          <strong>Reduced motion:</strong> all of the above swaps instantly.
        </li>
      </List>
    ),
  },
  {
    id: "voice",
    title: "Voice",
    headline: "First person, plain, and true.",
    content: (
      <List>
        <li>
          Write the way I talk. The home page opens with one sentence: “I’m
          Erin, a designer who engineers.”
        </li>
        <li>
          Keep labels short and literal: Work, Fun, About. Designed + coded by
          Erin.
        </li>
        <li>
          Tile meta is the project, then one real fact, joined with a bullet:
          Carpoolio • 4.9★ App Store.
        </li>
        <li>Every number has to be true. No filler stats.</li>
        <li>No emoji. The one ornament is ✦, before Get in touch.</li>
      </List>
    ),
  },
];

export default async function DesignSystem({
  searchParams,
}: {
  searchParams: Promise<{ side?: string }>;
}) {
  const { side } = await searchParams;

  return (
    <SideProvider engineerFirst={isEngineerSide(side)}>
      <SiteShell>
        <CaseStudyArticle
          label="erinkerr.me · 2026 edition"
          title="Design system"
          sections={SECTIONS}
        />
      </SiteShell>
    </SideProvider>
  );
}
