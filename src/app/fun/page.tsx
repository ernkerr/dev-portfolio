import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import Tile, { type TileItem } from "@/components/site/Tile";
import { BloggerMark, FieldNotesMark } from "@/components/site/thumbs";
import { focusRing, mono, serif } from "@/components/site/links";
import { EDITIONS } from "@/data/editions";

export const metadata: Metadata = {
  title: "Fun",
  description:
    "Side projects by Erin Kerr: Field Notes, Git Racer, ASCII Cam, an auto-clicker Apple rejected, and every past version of this site.",
  alternates: { canonical: "/fun" },
};

const SIDE_QUESTS: TileItem[] = [
  {
    href: "https://fieldnotes.erinkerr.me",
    title: "What job posts ask you to prove, in your field’s own words",
    meta: ["Field Notes", "MCP server + site"],
    art: {
      kind: "custom",
      alt: "Four sticky notes, each with a field's most-used word from job posts: Design, craft; Product, roadmap; Engineering, code; Marketing, campaigns.",
      node: <FieldNotesMark />,
    },
    aspect: "aspect-[16/10]",
  },
  {
    href: "/gitRacer",
    title: "GitHub contributions as a competitive sport",
    meta: ["Git Racer", "Web app"],
    art: {
      kind: "float",
      src: "/images/gitRacer/car-green.png",
      alt: "Git Racer's green pixel-art race car.",
      ratio: 1536 / 401,
      width: "w-[72%]",
    },
    aspect: "aspect-[16/10]",
    bg: "radial-gradient(ellipse at 50% 75%, #14532D 0%, #06110A 70%)",
  },
  {
    href: "/asciiCam",
    title: "Your webcam, rendered in ASCII",
    meta: ["ASCII Cam", "Built in ~2 hours"],
    art: {
      kind: "float",
      src: "/images/home/thumbs/ascii-logo.png",
      alt: "ASCII Cam logo: an @ sign drawn in green ASCII characters.",
      ratio: 669 / 671,
      width: "w-[62%]",
    },
    aspect: "aspect-square",
    bg: "#0A0A0A",
  },
  {
    href: "/autoclicker",
    title: "A macOS auto-clicker Apple wouldn’t approve",
    meta: ["AutoClicker", "Rejected by Apple"],
    art: {
      kind: "float",
      src: "/images/autoClicker/autoclicker-main.png",
      alt: "AutoClicker icon: a chunky pixel cursor with sparkles.",
      ratio: 1,
      width: "w-[46%]",
    },
    aspect: "aspect-square",
    bg: "#F1E7CF",
  },
  {
    href: "/deskYoga",
    title: "Short yoga sessions you can do at your desk",
    meta: ["Desk Yoga", "Mobile app"],
    art: {
      kind: "float",
      src: "/images/deskYoga/icon.png",
      alt: "Desk Yoga app icon: a woman sitting cross-legged on a desk chair, hands in prayer.",
      ratio: 1,
      width: "w-[42%]",
      radius: "rounded-[22%]",
      shadow: true,
    },
    aspect: "aspect-square",
    bg: "#D9E2D0",
  },
  {
    href: "/blogger",
    title: "Keyword research in, publish-ready posts out",
    meta: ["Blogger", "AI writing tool"],
    art: {
      kind: "custom",
      alt: "The Blogger logo: a blue lowercase b beside the word blogger.",
      node: <BloggerMark />,
    },
    aspect: "aspect-[16/10]",
  },
  {
    href: "/scheduler",
    title: "A personal planner for Expo West 2026",
    meta: ["Expo West", "Planner"],
    art: {
      kind: "float",
      src: "/images/home/thumbs/expo-card.png",
      alt: "Expo West event card: The Zen Den, 7:00 AM to 6:00 PM at the Hilton, with Details and Add to My Schedule buttons.",
      ratio: 1224 / 522,
      width: "w-[80%]",
      radius: "rounded-[2.6cqw]",
      shadow: true,
    },
    aspect: "aspect-[16/10]",
    bg: "linear-gradient(160deg, #60A5FA 0%, #2563EB 100%)",
  },
  {
    href: "/teaCupboard",
    title: "An inventory for my tea collection",
    meta: ["Tea Cupboard", "Web app"],
    art: {
      kind: "cover",
      src: "/images/myTeaCupboard/oolong.jpg",
      alt: "Tea Cupboard mascot: a cheerful red teacup with a tea leaf, waving.",
    },
    aspect: "aspect-[3/2]",
  },
];

const sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

export default function FunPage() {
  return (
    <SiteShell>
      <section className="max-w-2xl pb-12 pt-16 md:pt-20">
        <h1
          className={`${serif} text-[40px] leading-[1.08] tracking-[-0.02em] md:text-[56px]`}
        >
          Side quests, small tools, &amp; one app Apple rejected.
        </h1>
        <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-site-muted">
          Building my own projects is where I fell in love with programming and
          design. These are the small ones, kept here because they were fun to
          make.
        </p>
      </section>

      <section aria-labelledby="side-quests">
        <h2 id="side-quests" className="sr-only">
          Side projects
        </h2>
        <ul className="gap-6 md:columns-2 lg:columns-3">
          {SIDE_QUESTS.map((item, i) => (
            <li key={item.href} className="mb-10 break-inside-avoid">
              <Tile item={item} sizes={sizes} priority={i < 3} stacked />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="editions" className="mt-24">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2
            id="editions"
            className={`${mono} text-[12px] uppercase tracking-[0.06em] text-site-muted`}
          >
            Past editions of this site
          </h2>
          <Link
            href="/archive"
            className={`${mono} text-[12px] uppercase tracking-[0.06em] text-site-muted transition-colors hover:text-site-blue ${focusRing}`}
          >
            Archive →
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EDITIONS.map((e) => (
            <li key={e.year}>
              <Tile
                item={{
                  href: e.href,
                  title: e.label,
                  meta: [`${e.year} edition`],
                  art: { kind: "cover", src: e.thumbnail, alt: e.alt },
                  aspect: "aspect-[1150/718]",
                }}
                sizes={sizes}
                stacked
              />
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
