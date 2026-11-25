"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LuChevronUp } from "react-icons/lu";
import { focusRing } from "./links";
import { RESUME_CHOICES } from "./resumes";

/** The side the page's switch is on, or null on pages without one. */
const pageSide = () =>
  document.querySelector("[data-side-switch]")?.getAttribute("data-side") ??
  null;

// "Resume" in the footer, next to Contact. It opens a small menu of my three
// resumes upward, since the footer is the bottom of the page, and marks the
// one that matches the side the switch is on. Closes on Escape, a click
// outside or focus leaving it.
export default function ResumeMenu() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<string | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      const menu = button.current?.closest("[data-resume-menu]");
      if (menu && !menu.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      data-resume-menu
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (!open) setSide(pageSide());
          setOpen(!open);
        }}
        className={`inline-flex items-center gap-1 uppercase transition-colors hover:text-site-blue ${
          open ? "text-site-blue" : ""
        } ${focusRing}`}
      >
        Resume
        <LuChevronUp
          aria-hidden
          className={`h-3 w-3 transition-transform duration-300 ease-switch motion-reduce:transition-none ${
            open ? "" : "rotate-180"
          }`}
        />
      </button>

      <ul
        id={panelId}
        hidden={!open}
        className="absolute bottom-full left-0 z-30 mb-3 w-56 border border-site-line bg-site-paper shadow-float ring-1 ring-black/5 md:left-auto md:right-0"
      >
        {RESUME_CHOICES.map(({ side: choiceSide, label, href }) => {
          const current = side !== null && choiceSide === side;
          return (
            <li
              key={href}
              className="border-t border-site-line first:border-t-0"
            >
              <a
                href={href}
                download
                aria-current={current ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3 transition-colors hover:text-site-blue ${
                  current ? "text-site-blue" : "text-site-ink"
                } ${focusRing} focus-visible:outline-offset-0`}
              >
                {label}
                <span className="text-site-muted">PDF</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
