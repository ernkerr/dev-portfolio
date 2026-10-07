"use client";

import { useEffect, useState } from "react";
import { focusRing } from "@/components/site/links";
import { MAX } from "@/lib/erinllm/types";
import { pageName } from "./pageContext";
import { openErinLLM } from "./store";
import { track } from "./track";

// Highlight some text on a page and "✦ Ask ErinLLM" appears above it (below
// it on phones, out of the way of the phone's own menu). Clicking it opens
// ErinLLM with the text attached.

type Spot = { x: number; y: number; text: string };

const BUTTON_WIDTH = 160; // about, for keeping it on screen

function selected(): Spot | null {
  const selection = document.getSelection();
  const text = selection?.toString().trim() ?? "";
  if (!selection || selection.isCollapsed || !selection.rangeCount) return null;
  if (text.length < 2 || text.length > 600) return null;

  const node = selection.anchorNode;
  const el = node instanceof Element ? node : node?.parentElement;
  if (
    !el ||
    el.closest("[data-erinllm], header, input, textarea, [contenteditable]")
  )
    return null;
  // Only the page's own content, where there's a main
  if (document.querySelector("main") && !el.closest("main")) return null;

  const range = selection.getRangeAt(selection.rangeCount - 1);
  const rects = range.getClientRects();
  const rect = rects[rects.length - 1] ?? range.getBoundingClientRect();
  if (!rect.width && !rect.height) return null;

  const below = matchMedia("(pointer: coarse)").matches || rect.top < 120;
  return {
    x: Math.min(
      Math.max(8, rect.right - BUTTON_WIDTH / 2),
      innerWidth - BUTTON_WIDTH - 8,
    ),
    y: below ? rect.bottom + 8 : rect.top - 44,
    text,
  };
}

export default function AskSelection() {
  const [spot, setSpot] = useState<Spot | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    let pressing = false;
    const read = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (!pressing) setSpot(selected());
      }, 150);
    };
    const down = (e: PointerEvent) => {
      if (
        !(e.target instanceof Element && e.target.closest("[data-erinllm-ask]"))
      )
        pressing = true;
    };
    const up = () => {
      pressing = false;
      read();
    };
    // On scroll or resize, it follows the selection (or goes with it)
    let frame = 0;
    const moved = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!pressing) setSpot(selected());
      });
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSpot(null);
    };
    document.addEventListener("selectionchange", read);
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);
    document.addEventListener("keyup", read);
    document.addEventListener("keydown", escape);
    window.addEventListener("scroll", moved, true);
    window.addEventListener("resize", moved);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      document.removeEventListener("selectionchange", read);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("keyup", read);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("scroll", moved, true);
      window.removeEventListener("resize", moved);
    };
  }, []);

  if (!spot) return null;

  return (
    <button
      type="button"
      data-erinllm
      data-erinllm-ask
      style={{ left: spot.x, top: spot.y }}
      // Keep the selection while clicking
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        openErinLLM(
          {
            kind: "quote",
            label: `Highlighted on ${pageName()}`,
            text: spot.text.slice(0, MAX.quote),
            href: location.pathname,
          },
          "selection",
        );
        track("erinllm_open");
        document.getSelection()?.removeAllRanges();
        setSpot(null);
      }}
      className={`fixed z-50 border border-site-line bg-site-paper px-3 py-2 font-mono text-label uppercase text-site-ink shadow-float ring-1 ring-black/5 transition-colors hover:text-site-blue ${focusRing}`}
    >
      <span aria-hidden="true">✦ </span>Ask ErinLLM
    </button>
  );
}
