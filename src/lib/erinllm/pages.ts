import { GROUPS } from "@/app/fun/quests";
import { CASE_STUDIES } from "@/data/caseStudies";
import type { Anchors } from "./types";

// The pages ErinLLM can link to and recognize when something from them is
// dragged in. Paths match the site's routes.
export type SitePage = { path: string; name: string; project?: boolean };

export const PAGES: SitePage[] = [
  { path: "/", name: "Work" },
  ...CASE_STUDIES.map(({ slug, name }) => ({
    path: `/${slug}`,
    name,
    project: true,
  })),
  { path: "/fun", name: "Fun" },
  { path: "/about", name: "About" },
  { path: "/archive", name: "Archive" },
  { path: "/archive/2025", name: "The 2025 edition of this site" },
  { path: "/design-system", name: "Design system" },
];

export const pageAt = (path: string) => {
  const clean = path.replace(/\/+$/, "") || "/";
  return PAGES.find((p) => p.path.toLowerCase() === clean.toLowerCase());
};

// Other pages on the site an answer can link to: the Fun projects
const OTHER_PATHS = new Set(
  GROUPS.flatMap((g) => g.quests)
    .map((q) => q.href)
    .filter((href): href is string => !!href?.startsWith("/"))
    .map((href) => href.toLowerCase()),
);

// A link in an answer as it should be followed, or null when it isn't a
// page on the site (the answer shows the words without a link). A #section
// stays only when it's one of the page's real sections (anchors, sent with
// the answer); without anchors, only when it looks like one.
export function siteHref(href: string, anchors?: Anchors) {
  const [path, section = ""] = href.split("?")[0].split("#");
  const page = pageAt(path);
  const clean = page?.path ?? (path.replace(/\/+$/, "") || "/");
  if (!page && !OTHER_PATHS.has(clean.toLowerCase())) return null;
  const real = anchors
    ? (anchors[clean] ?? []).includes(section)
    : /^[a-z][a-z0-9-]*$/.test(section);
  return section && real ? `${clean}#${section}` : clean;
}
