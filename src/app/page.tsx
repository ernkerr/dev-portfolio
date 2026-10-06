import { headers } from "next/headers";
import { redirect } from "next/navigation";
import HeroHeadline from "@/components/site/HeroHeadline";
import { SideProvider } from "@/components/site/SideContext";
import SiteShell from "@/components/site/SiteShell";
import Tile, { type TileItem } from "@/components/site/Tile";
import {
  CarpoolioMark,
  GinMark,
  OrderSyncFlow,
  OrderSyncTokens,
  PortfolioBefore,
} from "@/components/site/thumbs";
import { EMAIL, focusRing, mono } from "@/components/site/links";
import { isEngineerSide } from "@/components/site/side";

// Experience beside the headline. The last column says what Erin did there,
// not her title; every line has to trace back to her resume.
const EXPERIENCE = [
  { year: "2025", company: "OrderSync", did: "Shipped a design system and an AI order agent" },
  { year: "2024", company: "Cyber Goose", did: "Founded a studio shipping apps and client sites" },
  { year: "2024", company: "Wispr AI", did: "Built tools for brain-computer interface R&D" },
  { year: "2021", company: "SRI International", did: "Ran 500+ research interviews for NIH studies" },
];

// The work in order: first here is first on phones, and from 768px it reads
// left to right in rows of two. Every tile is 4:3, so the rows line up.
const WORK: TileItem[] = [
  {
    href: "/portfolioRedesign",
    title: "Turning a developer portfolio into a design portfolio",
    meta: ["Portfolio Redesign", "2026"],
    // The one tile that shows a page: the old site is what this study is
    // about. Its own light mode here, its dark mode on the engineer side.
    art: {
      kind: "custom",
      alt: "The 2025 homepage in light mode: an electric-blue bento grid on pale gray with Designer & Full Stack Developer, a portrait, project links, the last song played and a commit graph.",
      node: <PortfolioBefore mode="light" />,
    },
    aspect: "aspect-[4/3]",
    engineer: {
      title: "Turning a developer portfolio into a design portfolio",
      art: {
        kind: "custom",
        alt: "The 2025 homepage in dark mode: an electric-blue bento grid on navy with Designer & Full Stack Developer, a portrait, project links, the last song played and a commit graph.",
        node: <PortfolioBefore mode="dark" />,
      },
    },
  },
  {
    href: "/orderSync",
    title: "One design system for a scattered marketing site",
    meta: ["OrderSync", "Contract 2025"],
    art: {
      kind: "custom",
      alt: "OrderSync color tokens: four navy swatches with their hex values, above the site's two button styles.",
      node: <OrderSyncTokens />,
    },
    aspect: "aspect-[4/3]",
    bg: "#E6EBF2",
    // Same client, other side of the work: the order agent.
    engineer: {
      title: "An AI agent that turns order emails into clean data",
      art: {
        kind: "custom",
        alt: "Order flow: Email into the OrderSync agent, out to the ERP.",
        node: <OrderSyncFlow />,
      },
    },
  },
  {
    href: "/ginScoreTracker",
    title: "Gin Rummy scores, round by round",
    meta: ["Gin Score Tracker", "App Store"],
    art: {
      kind: "custom",
      alt: "Gin Score Tracker, with a martini glass for Gin, above two of the app's buttons: Mobile app and iPhone and iPad.",
      node: <GinMark />,
    },
    aspect: "aspect-[4/3]",
  },
  {
    href: "/groupSingAlong",
    title: "Lyrics everyone in the room sees in real time",
    meta: ["Group Sing Along", "~155 active users"],
    art: {
      kind: "float",
      src: "/images/home/thumbs/gsa-card.png",
      alt: "Group Sing Along lyrics card: Family Sing-Along, 12 members, Bohemian Rhapsody with the current line in bold.",
      ratio: 1146 / 1400,
      width: "w-[36%]",
      radius: "rounded-[1.4cqw]",
      shadow: true,
    },
    aspect: "aspect-[4/3]",
    bg: "#E4DDFB",
  },
  {
    href: "/carpoolio",
    title: "Group travel app, from first sketch to acquisition",
    meta: ["Carpoolio", "4.9★ App Store"],
    art: {
      kind: "custom",
      alt: "The Carpoolio logo on a blurred aurora of blues and greens.",
      node: <CarpoolioMark />,
    },
    aspect: "aspect-[4/3]",
  },
  {
    href: "/heartsScoreTracker",
    title: "Hearts scoring for the whole table",
    meta: ["Hearts Score Tracker", "App Store"],
    art: {
      kind: "float",
      src: "/images/heartsScoreTracker/icon2.png",
      alt: "Hearts Score Tracker app icon: a crowned jester beside the word HEARTS.",
      ratio: 1,
      width: "w-[30%]",
      radius: "rounded-[22%]",
      shadow: true,
    },
    aspect: "aspect-[4/3]",
    bg: "#F4C6B8",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ side?: string }>;
}) {
  const headersList = await headers();
  const hostHeader =
    headersList.get("x-forwarded-host") ?? headersList.get("host");
  const host = hostHeader?.toLowerCase().split(":")[0];

  if (host === "scheduler.erinkerr.me") {
    redirect("/scheduler");
  }

  if (host === "sceduler.erinkerr.me") {
    redirect("https://scheduler.erinkerr.me/scheduler");
  }

  const sizes = "(min-width: 768px) 50vw, 100vw";
  const { side } = await searchParams;

  return (
    <SideProvider engineerFirst={isEngineerSide(side)}>
      <SiteShell>
        <section className="grid gap-10 pb-12 pt-16 md:pt-28 lg:grid-cols-2 lg:gap-6 lg:pt-40">
          <div>
            <HeroHeadline />
            <a
              href={`mailto:${EMAIL}`}
              className={`${mono} mt-6 inline-block text-[13px] uppercase tracking-[0.04em] text-site-blue underline-offset-4 hover:underline md:hidden ${focusRing}`}
            >
              <span aria-hidden="true">✦ </span>Get in touch
            </a>
          </div>

          <dl className="self-start text-[15px]">
            {EXPERIENCE.map((e) => (
              <div
                key={e.company}
                className="grid grid-cols-[4.5rem_1fr] gap-x-4 py-1.5 sm:grid-cols-[5.5rem_1fr_1.7fr]"
              >
                <dt className={`${mono} pt-[2px] text-[13px] text-site-muted`}>
                  {e.year}
                </dt>
                <dd>{e.company}</dd>
                <dd className="col-start-2 text-site-muted sm:col-start-auto">
                  {e.did}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="work-heading">
          <h2 id="work-heading" className="sr-only">
            Selected work
          </h2>
          <ul className="grid gap-10 md:grid-cols-2 md:gap-x-6">
            {WORK.map((item, i) => (
              <li key={item.href}>
                <Tile item={item} sizes={sizes} priority={i < 2} />
              </li>
            ))}
          </ul>
        </section>
      </SiteShell>
    </SideProvider>
  );
}
