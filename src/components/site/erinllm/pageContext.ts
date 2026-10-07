"use client";

import { pageAt } from "@/lib/erinllm/pages";
import { MAX, type PageContext, type Side } from "@/lib/erinllm/types";

// The page the visitor is on, sent with every question so ErinLLM can
// answer about it.

// The engineer side puts data-side="engineer" in the page: the switch on
// home and the case studies, and the lamps on About.
export const currentSide = (): Side =>
  document.querySelector('[data-side="engineer"]') ? "engineer" : "designer";

// The page's name, for "Looking at": the site's name for it, or its title
export const pageName = (path = location.pathname) =>
  pageAt(path)?.name ?? document.title.split(/ [|—–] /)[0].trim();

export function readPage(): PageContext {
  const main = document.querySelector("main");
  // Without a main (the older Engineering sides), everything but ErinLLM
  const text = main
    ? main.innerText
    : Array.from(document.body.children)
        .filter(
          (el): el is HTMLElement =>
            el instanceof HTMLElement &&
            !el.closest("[data-erinllm]") &&
            !["SCRIPT", "STYLE", "NOSCRIPT"].includes(el.tagName),
        )
        .map((el) => el.innerText)
        .join("\n");
  return {
    path: location.pathname,
    title: document.title,
    side: currentSide(),
    text: text
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
      .slice(0, MAX.pageText),
  };
}
