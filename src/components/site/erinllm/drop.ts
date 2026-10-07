"use client";

import { pageAt } from "@/lib/erinllm/pages";
import { MAX, type Attached } from "@/lib/erinllm/types";
import { pageName } from "./pageContext";

// What someone dragged onto ErinLLM, as something to ask about. It reads
// the browser's own drag data, so links (like the Work tiles), images and
// selected text all drag in without any extra markup.

// Whether a drag carries anything ErinLLM can read
export const canDrop = (data: DataTransfer) =>
  data.types.includes("text/uri-list") || data.types.includes("text/plain");

const firstLine = (text: string | null | undefined) =>
  (text ?? "")
    .trim()
    .split(/\s*\n\s*/)[0]
    .slice(0, 120);

export function readDrop(data: DataTransfer): Attached | null {
  const uri = data
    .getData("text/uri-list")
    .split(/\r?\n/)
    .find((line) => line && !line.startsWith("#"))
    ?.trim();
  const plain = data.getData("text/plain").trim();
  const html = data.getData("text/html");
  const doc = html ? new DOMParser().parseFromString(html, "text/html") : null;
  const anchor = doc?.querySelector("a[href]");
  const img = doc?.querySelector("img");

  // Selected text: a quote
  if (!uri) {
    if (!plain) return null;
    return {
      kind: "quote",
      label: `Dragged from ${pageName()}`,
      text: plain.slice(0, MAX.quote),
      href: location.pathname,
    };
  }

  let url: URL;
  try {
    url = new URL(uri, location.href);
  } catch {
    return null;
  }

  // An image on its own (not one inside a link): its alt text says what it is
  const imgSrc = img?.getAttribute("src");
  if (
    img &&
    !anchor &&
    imgSrc &&
    new URL(imgSrc, location.href).href === url.href
  )
    return {
      kind: "image",
      label: `Image: ${img.getAttribute("alt")?.trim() || "untitled"}`,
      href: location.pathname,
    };

  // A link to one of my pages, by its name
  if (url.origin === location.origin) {
    const page = pageAt(url.pathname);
    if (page)
      return {
        kind: "page",
        label: page.project ? `${page.name} (project)` : page.name,
        href: url.pathname,
      };
  }

  // Any other link, by its text
  const name = firstLine(anchor?.textContent) || firstLine(plain);
  return {
    kind: "link",
    label: name && name !== url.href ? name : url.hostname + url.pathname,
    href: url.origin === location.origin ? url.pathname : url.href,
  };
}
