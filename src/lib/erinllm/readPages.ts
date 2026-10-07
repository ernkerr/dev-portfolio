import { CASE_STUDIES } from "@/data/caseStudies";
import { MAX, type ErinMessage, type PageContext, type Side } from "./types";

// When someone asks about a project from another page, ErinLLM reads that
// case study itself, so a new or edited case study never needs a change in
// knowledge.ts. It only reads the site's own case studies (CASE_STUDIES),
// from this same deployment, on the side the visitor is on, at most 2 per
// question.

export type ReadPage = Pick<
  PageContext,
  "path" | "title" | "text" | "sections"
>;

const MAX_PAGES = 2;

// Other names people use for a project, matched as whole words
const ALIASES: Record<string, string[]> = {
  ginScoreTracker: ["gin"],
  heartsScoreTracker: ["hearts"],
  groupSingAlong: ["sing along", "singalong", "sing-along"],
  orderSync: ["order sync"],
  portfolioRedesign: ["redesign"],
};

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const matchers = CASE_STUDIES.map((study) => {
  const names = [study.name, study.slug, ...(ALIASES[study.slug] ?? [])];
  const pattern = names
    .map((n) => escape(n.toLowerCase()).replace(/\s+/g, "\\s*"))
    .join("|");
  return { study, test: new RegExp(`\\b(${pattern})\\b`, "i") };
});

const textOf = (message?: ErinMessage) =>
  [
    message?.metadata?.attached?.label,
    ...(message?.parts ?? []).map((p) => (p.type === "text" ? p.text : "")),
  ]
    .filter(Boolean)
    .join(" ");

// The case studies the latest question is about (or, for a follow-up like
// "what was your role?", the question before it), other than the page
// they're already on
export function asksAbout(messages: ErinMessage[], onPath?: string) {
  const questions = messages.filter((m) => m.role === "user");
  for (const message of [questions.at(-1), questions.at(-2)]) {
    const text = textOf(message);
    const found = matchers
      .filter(
        ({ study, test }) => `/${study.slug}` !== onPath && test.test(text),
      )
      .map(({ study }) => study);
    if (found.length) return found.slice(0, MAX_PAGES);
  }
  return [];
}

// The visible text of a page's <main>, the way the panel reads the page
// someone is on (src/components/site/erinllm/pageContext.ts)
function readHtml(html: string): Pick<ReadPage, "text" | "sections"> | null {
  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1];
  if (!main) return null;
  const sections = [...main.matchAll(/<section id="([\w-]+)"/g)].map(
    ([, id]) => ({
      id,
      title:
        main
          .match(new RegExp(`id="${id}-heading"[^>]*>([^<]+)<`))?.[1]
          ?.trim() ?? id,
    }),
  );
  const text = main
    .replace(/<(script|style|svg|noscript|template)[\s\S]*?<\/\1>/g, " ")
    .replace(
      /<(br|\/p|\/h[1-6]|\/li|\/div|\/section|\/figcaption|\/dt|\/dd|\/tr)[^>]*>/g,
      "\n",
    )
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim()
    .slice(0, MAX.pageText);
  return { text, sections: sections.slice(0, 30) };
}

// Read pages are kept for 10 minutes on the live site; while developing,
// every question reads them fresh
const cache = new Map<string, { at: number; page: ReadPage }>();
const KEEP_FOR = process.env.NODE_ENV === "production" ? 600_000 : 0;

export async function readCaseStudies(
  origin: string,
  studies: { slug: string; name: string }[],
  side: Side,
): Promise<ReadPage[]> {
  const pages = await Promise.all(
    studies.map(async ({ slug, name }) => {
      const path = `/${slug}`;
      const key = `${path}|${side}`;
      const kept = cache.get(key);
      if (kept && Date.now() - kept.at < KEEP_FOR) return kept.page;
      try {
        const url = `${origin}${path}${side === "engineer" ? "?side=engineer" : ""}`;
        const res = await fetch(url, { signal: AbortSignal.timeout(4_000) });
        if (!res.ok) return null;
        const read = readHtml(await res.text());
        if (!read?.text) return null;
        const page = { path, title: name, ...read };
        cache.set(key, { at: Date.now(), page });
        return page;
      } catch {
        return null; // it answers from knowledge.ts instead
      }
    }),
  );
  return pages.filter((p): p is ReadPage => p !== null);
}
