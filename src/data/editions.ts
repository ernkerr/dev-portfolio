// Every past edition of erinkerr.me, newest first.
// Each edition is a frozen copy of the site under /archive/{year}.
export type Edition = {
  year: string;
  /** Roman numeral version, e.g. "I" */
  version: string;
  href: string;
  thumbnail: string;
  /** Intrinsic thumbnail size */
  width: number;
  height: number;
  alt: string;
  label: string;
};

export const EDITIONS: Edition[] = [
  {
    year: "2025",
    version: "I",
    href: "/archive/2025",
    thumbnail: "/images/archive/2025.jpg",
    width: 1150,
    height: 718,
    alt: "Electric-blue bento grid on a dark background: Designer & Full Stack Developer, a portrait, project tiles, currently listening, and a commit graph.",
    label: "The bento grid",
  },
];
