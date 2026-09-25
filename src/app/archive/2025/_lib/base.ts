// The 2025 edition is a frozen copy of the site that lives under this prefix.
// Every internal link inside the archive goes through `a()` so visitors stay
// inside /archive/2025/* instead of leaking back to the live site.
export const ARCHIVE_BASE = "/archive/2025";

// Paths that are not part of the archived site and must keep pointing at root.
const KEEP_AT_ROOT = ["/scheduler", "/downloads/", "/api/", "/images/"];

export function a(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (KEEP_AT_ROOT.some((p) => path.startsWith(p))) return path;
  return path === "/" ? ARCHIVE_BASE : `${ARCHIVE_BASE}${path}`;
}
