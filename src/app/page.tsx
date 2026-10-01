import { headers } from "next/headers";
import { redirect } from "next/navigation";
import HeroHeadline from "@/components/site/HeroHeadline";
import { SideProvider } from "@/components/site/SideContext";
import SiteShell from "@/components/site/SiteShell";
import Tile, { type TileItem } from "@/components/site/Tile";
import {
  CarpoolioMark,
  OrderSyncFlow,
  OrderSyncTokens,
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

// Two hand-balanced columns so the grid staggers like a masonry layout: two
// tall tiles on the left against three on the right. On phones the left
// column stacks above the right one.
const LEFT: TileItem[] = [
  {
    href: "/orderSync",
    title: "One design system for a scattered marketing site",
    meta: ["OrderSync", "Contract 2025"],
    art: {
      kind: "custom",
      alt: "OrderSync color tokens: four navy swatches with their hex values, above the site's two button styles.",
      node: <OrderSyncTokens />,
    },
    aspect: "aspect-square",
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
    href: "/carpoolio",
    title: "Group travel app, from first sketch to acquisition",
    meta: ["Carpoolio", "4.9★ App Store"],
    art: {
      kind: "custom",
      alt: "The Carpoolio logo on a blurred aurora of blues and greens.",
      node: <CarpoolioMark />,
    },
    aspect: "aspect-[4/5]",
  },
];

const RIGHT: TileItem[] = [
  {
    href: "/ginScoreTracker",
    title: "Gin Rummy scores, round by round",
    meta: ["Gin Score Tracker", "App Store"],
    art: {
      kind: "float",
      src: "/images/ginScoreTracker/GinLogo.png",
      alt: "Gin Score Tracker app icon: a jester in profile beside the word GIN.",
      ratio: 1,
      width: "w-[30%]",
      radius: "rounded-[22%]",
      shadow: true,
    },
    aspect: "aspect-[4/3]",
    bg: "#E3E69B",
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
    aspect: "aspect-[16/11]",
    bg: "#E4DDFB",
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
          <div className="grid gap-10 md:grid-cols-2 md:gap-6">
            {[LEFT, RIGHT].map((column, c) => (
              <ul key={c} className="flex flex-col gap-10">
                {column.map((item, i) => (
                  <li key={item.href}>
                    <Tile item={item} sizes={sizes} priority={i === 0} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </SiteShell>
    </SideProvider>
  );
}
