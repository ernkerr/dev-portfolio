"use client";

import { useEffect, useRef, useState } from "react";
import { focusRing } from "@/components/site/links";
import { useKeepOnScreen } from "./keepOnScreen";

// My Ember mug on my desk (drawn in deskArt.tsx), as a button. Pointed at
// (or, on a touch screen, opened), it says what I think of it. Clicked, it
// asks you to guess what's in it, and tells you: it's almost always
// coffee, except after 4pm until 7am, my time in New York, when it's tea.
// Escape or a click away closes it.
const ZONE = "America/New_York";
const DRINKS = ["Black coffee", "Latte", "Matcha", "Tea"] as const;

// What's in it now: coffee from 7am until 4pm in New York, tea otherwise
function inMyCup() {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ZONE,
      hour: "numeric",
      hourCycle: "h23",
    }).format(new Date()),
  );
  return hour >= 7 && hour < 16 ? "Black coffee" : "Tea";
}

export default function EmberMug({
  box,
}: {
  /** Where the mug is, as percentages of the drawing. */
  box: { left: string; top: string; width: string; height: string };
}) {
  const [open, setOpen] = useState(false);
  const [guess, setGuess] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string>("Black coffee");
  const root = useRef<HTMLDivElement>(null);
  const popover = useRef<HTMLDivElement>(null);
  useKeepOnScreen(popover, open);

  // Open: Escape or a click anywhere else closes it
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (e.target instanceof Node && !root.current?.contains(e.target))
        setOpen(false);
    };
    const escape = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    window.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", away);
      window.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div ref={root} className="group absolute" style={box}>
      <button
        type="button"
        aria-expanded={open}
        aria-label="My Ember mug: guess what's in it"
        onClick={() => {
          setAnswer(inMyCup());
          setGuess(null);
          setOpen((was) => !was);
        }}
        className={`block h-full w-full ${focusRing}`}
      />

      {/* What I think of it, while it's pointed at */}
      {!open && (
        <p
          role="tooltip"
          className="pointer-events-none absolute bottom-full right-0 mb-2 w-max max-w-60 border border-site-line bg-site-paper px-3 py-2 text-caption text-site-ink opacity-0 shadow-float ring-1 ring-black/5 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none"
        >
          I don&apos;t know what I&apos;d do without my Ember mug (not
          sponsored)
        </p>
      )}

      {/* Guess what's in it */}
      {open && (
        <div
          ref={popover}
          role="dialog"
          aria-label="Guess what's in my cup"
          className="absolute bottom-full right-0 z-20 mb-2 w-64 border border-site-line bg-site-paper p-4 shadow-float ring-1 ring-black/5"
        >
          {/* On a touch screen, which can't point at it first, what I
              think of it comes first */}
          <p className="mb-2 hidden text-caption text-site-muted [@media(hover:none)]:block">
            I don&apos;t know what I&apos;d do without my Ember mug (not
            sponsored)
          </p>
          <p className="text-caption text-site-ink">
            Guess what&apos;s in my cup.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {DRINKS.map((drink) => (
              <button
                key={drink}
                type="button"
                aria-pressed={guess === drink}
                onClick={() => setGuess(drink)}
                className={`border px-2.5 py-1.5 font-mono text-label uppercase transition-colors hover:border-site-blue hover:text-site-blue motion-reduce:transition-none ${focusRing} ${
                  guess === drink
                    ? "border-site-blue text-site-blue"
                    : "border-site-line text-site-ink"
                }`}
              >
                {drink}
              </button>
            ))}
          </div>
          {guess && (
            <p className="mt-3 text-caption text-site-muted" aria-live="polite">
              {guess === answer
                ? `You got it: ${answer.toLowerCase()}.`
                : `Not right now. It's ${answer.toLowerCase()}.`}{" "}
              It&apos;s almost always coffee, except after 4pm until 7am.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
