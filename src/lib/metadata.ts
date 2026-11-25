import type { Metadata } from "next";

// The homepage's first screen (src/app/opengraph-image.png and
// twitter-image.png), with the words of opengraph-image.alt.txt.
const PREVIEW = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Erin Kerr’s homepage: “I’m Erin, a designer who engineers.” beside her experience, above the OrderSync and Portfolio Redesign case studies.",
};

/**
 * A page's title, description and canonical, plus a link preview that
 * matches them. Next replaces the layout's `openGraph` and `twitter` objects
 * instead of merging into them, and a page that sets its own loses the
 * layout's preview image, so every page passes the whole set.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** The page's name. The layout's template adds "| Erin Kerr" to the tab. */
  title: string;
  description: string;
  /** The page's path, e.g. "/orderSync". */
  path: string;
}): Metadata {
  const fullTitle = `${title} | Erin Kerr`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: "Erin Kerr",
      locale: "en_US",
      type: "website",
      images: [PREVIEW],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: "/twitter-image.png", alt: PREVIEW.alt }],
    },
  };
}
