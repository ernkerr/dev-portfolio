"use client";

import Image from "next/image";
import { SideLink, useEngineerSide } from "./SideContext";
import { focusRing } from "./links";

// Thumbnails follow one rule: a brand-colored field with a single thing on
// it (an app icon, a logo, or one real UI component). No page screenshots.
export type TileArt =
  /** Illustration that fills the frame. */
  | { kind: "cover"; src: string; alt: string; position?: string }
  /** One icon, logo or UI component centered on the background. */
  | {
      kind: "float";
      src: string;
      alt: string;
      /** Intrinsic width / height of the image. */
      ratio: number;
      /** Tailwind width class relative to the frame, e.g. "w-[30%]". */
      width: string;
      /** Tailwind radius class; app icons use "rounded-app-icon". */
      radius?: string;
      shadow?: boolean;
    }
  /** Hand-built composition (see thumbs.tsx). Sized in cqw so it scales. */
  | { kind: "custom"; alt: string; node: React.ReactNode };

export type TileItem = {
  href: string;
  title: string;
  /** Short uppercase labels, joined with bullets under the art. */
  meta: string[];
  art: TileArt;
  /** Tailwind aspect class for the art frame, e.g. "aspect-[4/3]". */
  aspect: string;
  /** CSS background for the frame: a brand color or gradient. */
  bg?: string;
  /** What the tile shows instead on the engineering side, if it differs. */
  engineer?: Pick<TileItem, "title" | "art">;
};

const zoom =
  "transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none";

// Tile images load lazily, even in the first row. Marking one priority (or
// even eager) makes React preload it in an HTTP Link header, and Chrome reads
// that header's srcset wrong and downloads the 3840px fallback on top of the
// right size. A lazy image on screen still loads at once.
function Art({ art, sizes }: { art: TileArt; sizes: string }) {
  if (art.kind === "cover") {
    return (
      <Image
        src={art.src}
        alt={art.alt}
        fill
        sizes={sizes}
        className={`object-cover ${zoom}`}
        style={{ objectPosition: art.position ?? "center" }}
      />
    );
  }

  if (art.kind === "custom") {
    return (
      <div
        role="img"
        aria-label={art.alt}
        className={`absolute inset-0 ${zoom}`}
      >
        {art.node}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`relative overflow-hidden ${art.width} ${art.radius ?? ""} ${
          art.shadow ? "shadow-float ring-1 ring-black/5" : ""
        } ${zoom}`}
        style={{ aspectRatio: art.ratio }}
      >
        <Image
          src={art.src}
          alt={art.alt}
          fill
          sizes="(min-width: 768px) 30vw, 60vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function Tile({
  item,
  sizes,
  stacked = false,
}: {
  item: TileItem;
  sizes: string;
  /** Ignored: tiles always load lazily (see Art). Still accepted so pages
   *  that pass it keep compiling. */
  priority?: boolean;
  /** Put the meta line under the title instead of beside it (narrow grids). */
  stacked?: boolean;
}) {
  const engineer = useEngineerSide();
  const { href, title, meta, art, aspect, bg } =
    engineer && item.engineer ? { ...item, ...item.engineer } : item;
  const external = /^https?:/.test(href);

  return (
    <SideLink
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group block ${focusRing}`}
    >
      <div
        className={`relative overflow-hidden border border-site-line [container-type:inline-size] ${aspect}`}
        style={bg ? { background: bg } : undefined}
      >
        <Art art={art} sizes={sizes} />
      </div>
      <div
        className={`mt-3 flex gap-x-4 gap-y-1 ${
          stacked ? "flex-col" : "flex-wrap items-baseline justify-between"
        }`}
      >
        <h3
          className={
            "font-serif text-tile-title text-site-ink transition-colors group-hover:text-site-blue"
          }
        >
          {title}
        </h3>
        <p className="font-mono text-label uppercase text-site-muted">
          {meta.join(" • ")}
        </p>
      </div>
    </SideLink>
  );
}
