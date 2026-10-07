import { pageAt } from "./pages";

// Every answer ends with two lines the panel turns into links and buttons
// instead of showing as text (the prompt asks for them, prompt.ts):
//
//   Sources: /ginScoreTracker#research, /about
//   Follow-ups: What was your role? | What would you change?
//
// Sources only count when they're pages on the site (pages.ts), so the
// model can't link anywhere made up. This runs in the panel and on the
// server, which keeps answers without these lines for the review page.

export type Source = { href: string; label: string };

const SOURCES = /^[\s*_>-]*sources?[\s*_]*:[\s*_]*/i;
const FOLLOW_UPS = /^[\s*_>-]*follow[\s-]?ups?[\s*_]*:[\s*_]*/i;

// "ideas-to-test" -> "Ideas to test"
const sectionName = (id: string) => {
  const words = id.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

function readSources(rest: string): Source[] {
  const sources: Source[] = [];
  for (const [path] of rest.matchAll(
    /\/[A-Za-z0-9\-/]*(?:#[A-Za-z0-9\-_]+)?/g,
  )) {
    const [pathname, section] = path.split("#");
    const page = pageAt(pathname);
    if (!page || sources.some((s) => s.href === path)) continue;
    sources.push({
      href: path,
      label: section ? `${page.name} · ${sectionName(section)}` : page.name,
    });
  }
  return sources.slice(0, 3);
}

const readFollowUps = (rest: string) =>
  rest
    .split("|")
    .map((q) => q.replace(/^[\s"“*_]+|[\s"”*_]+$/g, ""))
    .filter((q) => q.length > 2 && q.length <= 140)
    .slice(0, 3);

export function splitAnswer(text: string) {
  const lines = text.split("\n");
  const body: string[] = [];
  let sources: Source[] = [];
  let followUps: string[] = [];
  lines.forEach((line, i) => {
    if (SOURCES.test(line)) sources = readSources(line.replace(SOURCES, ""));
    else if (FOLLOW_UPS.test(line))
      followUps = readFollowUps(line.replace(FOLLOW_UPS, ""));
    // The start of one of those lines, still arriving while the answer
    // streams in
    else if (
      i === lines.length - 1 &&
      /^(s|so|sou|sour|sourc|source|f|fo|fol|foll|follo|follow|follow-|follow-u|follow-up)$/i.test(
        line.trim(),
      )
    )
      return;
    else body.push(line);
  });
  return { body: body.join("\n").trim(), sources, followUps };
}
