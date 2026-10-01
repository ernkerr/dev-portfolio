// The homepage and every case study show one side of Erin's work: design or
// engineering. ?side=engineer in the URL picks the engineering side, so a link
// can open a page on either side.
export const isEngineerSide = (side: string | string[] | undefined) =>
  side === "engineer";

/** Carries the engineering side over to an internal link. */
export function withSide(href: string, engineer: boolean) {
  return engineer && href.startsWith("/") ? `${href}?side=engineer` : href;
}
