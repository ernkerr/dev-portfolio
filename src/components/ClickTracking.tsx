"use client";

import { useEffect } from "react";

// Counts every click on a link or button in Google Analytics (the gtag in
// src/app/layout.tsx) as one event, ui_click. It sends what was clicked
// (link_text) and, for links, where it goes (link_url). GA already has report
// dimensions for both, "Link text" and "Link URL", and adds the page itself.
// Nothing anyone types is sent. To give something a shorter name in the
// reports, add data-track="Name" to it.

type Gtag = (command: "event", name: string, params?: object) => void;

const clickable = "a, button, [role='button'], [data-track]";

function nameOf(el: HTMLElement) {
  const text =
    el.dataset.track ?? el.getAttribute("aria-label") ?? el.textContent ?? "";
  return text.replace(/\s+/g, " ").trim().slice(0, 100);
}

export function ClickTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      const el = (event.target as Element | null)?.closest<HTMLElement>(
        clickable,
      );
      if (!gtag || !el) return;

      const params: Record<string, string> = {
        link_text: nameOf(el) || el.tagName.toLowerCase(),
      };
      if (el instanceof HTMLAnchorElement && el.href) params.link_url = el.href;
      gtag("event", "ui_click", params);
    }

    // Capture, so a click still counts when a handler stops it spreading.
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
