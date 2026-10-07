import { CASE_STUDIES } from "@/data/caseStudies";

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
