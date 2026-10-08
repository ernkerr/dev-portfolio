"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { focusRing } from "@/components/site/links";
import { inlineLink } from "@/components/site/prose";

// My wall calendar, like the one on my wall: a white page on a wire
// spiral, the month's name big in a muted color, the year down its right
// side, and the month's days in a grid. It shows this month, on my time
// in New York, today circled. Click it and it comes up big: pick any
// weekday ahead, then a time (in New York, and in your own time if it's
// different), and Google Calendar opens with a half-hour invite to meet me
// filled in, me as its guest. Save it and Google emails me the invite;
// when I say yes, it's on my calendar (and Google adds a Meet link if your
// account does that). Or just email me. Escape, Close or a click outside
// puts it back. It fills in once the page knows the date, so it never
// shows the month it was built in. Lifts on hover, like the camera; with
// reduced motion nothing lifts or fades.
//
// The page is drawn 300 by 420, its spiral and hanger above that.
const ZONE = "America/New_York";
// Where the invites and emails go: my Google Calendar's address
const EMAIL = "erin@cybergoose.org";
const W = 300;
const H = 420;
const GRID = { x: 18, top: 136, w: 264, bottom: 404 };
const NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// Each month's name in the next of the calendar's colors, in order
const COLORS = [
  { fill: "fill-room-calendar-sage", ring: "stroke-room-calendar-sage" },
  { fill: "fill-room-calendar-rose", ring: "stroke-room-calendar-rose" },
  { fill: "fill-room-calendar-sky", ring: "stroke-room-calendar-sky" },
  { fill: "fill-room-calendar-clay", ring: "stroke-room-calendar-clay" },
];

type Today = { y: number; m: number; d: number };

// The times I can meet, in New York: on the hour, half an hour each
const SLOTS = [10, 11, 12, 13, 14, 15, 16];
const pad = (n: number) => String(n).padStart(2, "0");

// How far New York is from UTC at a moment, in minutes
function offset(at: Date) {
  const name =
    new Intl.DateTimeFormat("en-US", {
      timeZone: ZONE,
      timeZoneName: "longOffset",
    })
      .formatToParts(at)
      .find((p) => p.type === "timeZoneName")?.value ?? "";
  const m = name.match(/GMT([+-])(\d{2}):?(\d{2})?/);
  return m ? (m[1] === "-" ? -1 : 1) * (+m[2] * 60 + +(m[3] ?? 0)) : -300;
}

// A time on a day in New York, for showing it in your own time
function inNewYork(y: number, m: number, d: number, h: number) {
  const guess = Date.UTC(y, m, d, h);
  return new Date(guess - offset(new Date(guess)) * 60 * 1000);
}

// Google Calendar, a half-hour invite to meet me at that time filled in
function invite(y: number, m: number, d: number, h: number) {
  const at = (min: number) =>
    `${y}${pad(m + 1)}${pad(d)}T${pad(h)}${pad(min)}00`;
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: "Meet with Erin Kerr",
    dates: `${at(0)}/${at(30)}`,
    ctz: ZONE,
    add: EMAIL,
    details: "Requested from the calendar on erinkerr.me.",
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

// Today's date in New York
function today(): Today {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date());
  const part = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { y: part("year"), m: part("month") - 1, d: part("day") };
}

function Page({
  now,
  picked,
  onPick,
}: {
  now: Today | null;
  /** The day picked, if any. */
  picked?: number | null;
  /** Given, upcoming weekdays can be picked. */
  onPick?: (day: number) => void;
}) {
  const pick = !!onPick;
  const coils = Array.from({ length: 30 }, (_, i) => 16 + i * 9.2).filter(
    (x) => x < 136 || x > 160,
  );
  let grid = null;
  if (now) {
    const first = new Date(now.y, now.m, 1).getDay();
    const days = new Date(now.y, now.m + 1, 0).getDate();
    const rows = Math.ceil((first + days) / 7);
    const cw = GRID.w / 7;
    const rh = (GRID.bottom - GRID.top) / rows;
    const color = COLORS[now.m % COLORS.length];
    grid = (
      <g>
        <text
          x={22}
          y={98}
          fontSize={68}
          letterSpacing={-1.5}
          className={`font-sans font-bold ${color.fill}`}
        >
          {NAMES[now.m].slice(0, 3).toUpperCase()}
        </text>
        <text
          transform="translate(270 26) rotate(90)"
          fontSize={15}
          letterSpacing={1.5}
          className={`font-sans font-medium ${color.fill}`}
        >
          {now.y}
        </text>
        {DAYS.map((day, i) => (
          <text
            key={day}
            x={GRID.x + cw * (i + 0.5)}
            y={GRID.top - 6}
            fontSize={7.5}
            textAnchor="middle"
            letterSpacing={0.6}
            className="fill-room-calendar-ink font-sans"
          >
            {day}
          </text>
        ))}
        <path
          d={[
            ...Array.from(
              { length: rows + 1 },
              (_, r) =>
                `M${GRID.x} ${(GRID.top + r * rh).toFixed(1)}H${GRID.x + GRID.w}`,
            ),
            ...Array.from(
              { length: 8 },
              (_, c) =>
                `M${(GRID.x + c * cw).toFixed(1)} ${GRID.top}V${GRID.bottom}`,
            ),
          ].join("")}
          strokeWidth={0.8}
          className="stroke-room-calendar-line"
        />
        {Array.from({ length: days }, (_, k) => {
          const day = k + 1;
          const cell = first + k;
          const x = GRID.x + (cell % 7) * cw;
          const y = GRID.top + Math.floor(cell / 7) * rh;
          const weekday = cell % 7;
          const isToday = day === now.d;
          const ahead = day > now.d && weekday > 0 && weekday < 6;
          const number = (
            <>
              {isToday && (
                <circle
                  cx={x + 9}
                  cy={y + 9}
                  r={7}
                  fill="none"
                  strokeWidth={1.6}
                  className={color.ring}
                />
              )}
              <text
                x={x + 9}
                y={y + 12}
                fontSize={9}
                textAnchor="middle"
                className={`font-sans ${
                  isToday
                    ? "fill-room-calendar-ink font-bold"
                    : ahead || !pick
                      ? "fill-room-calendar-ink"
                      : "fill-room-calendar-ink/40"
                } ${pick && ahead ? "group-hover:fill-site-blue group-focus-visible:fill-site-blue" : ""} ${picked === day ? "!fill-site-blue" : ""}`}
              >
                {String(day).padStart(2, "0")}
              </text>
            </>
          );
          if (!(pick && ahead)) return <g key={day}>{number}</g>;
          const said = new Date(now.y, now.m, day).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          });
          const on = picked === day;
          return (
            <g
              key={day}
              role="button"
              tabIndex={0}
              aria-label={said}
              aria-pressed={on}
              onClick={() => onPick?.(day)}
              onKeyDown={(e) => {
                if (e.key !== "Enter" && e.key !== " ") return;
                e.preventDefault();
                onPick?.(day);
              }}
              className="group cursor-pointer outline-none"
            >
              <rect
                x={x + 0.5}
                y={y + 0.5}
                width={cw - 1}
                height={rh - 1}
                strokeWidth={1.5}
                className={`stroke-transparent transition-colors group-hover:fill-site-blue/10 group-focus-visible:stroke-site-blue motion-reduce:transition-none ${on ? "fill-site-blue/10" : "fill-transparent"}`}
              />
              {number}
            </g>
          );
        })}
      </g>
    );
  }
  return (
    <>
      {/* The page, the wire hanger at its middle, and the spiral */}
      <rect
        x={0.5}
        y={14}
        width={W - 1}
        height={H - 14.5}
        strokeWidth={1}
        className="fill-room-calendar-page stroke-room-calendar-edge"
      />
      <path
        d="M139 13Q150 -2 161 13"
        fill="none"
        strokeWidth={1.6}
        strokeLinecap="round"
        className="stroke-room-calendar-wire"
      />
      <path
        d={coils
          .map((x) => `M${x.toFixed(1)} 22V10a2.2 2.2 0 0 1 4.4 0V22`)
          .join("")}
        fill="none"
        strokeWidth={1.2}
        strokeLinecap="round"
        className="stroke-room-calendar-wire"
      />
      {grid}
    </>
  );
}

export default function WallCalendar({
  box,
}: {
  /** Where it hangs on the wall, as percentages of the drawing. */
  box: { left: string; top: string; width: string; height: string };
}) {
  const [now, setNow] = useState<Today | null>(null);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [page, setPage] = useState<HTMLElement | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [here, setHere] = useState<string | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const times = useRef<HTMLDivElement>(null);
  const title = `calendar${useId().replace(/[^\w-]/g, "")}`;

  useEffect(() => {
    setPage(document.body);
    setNow(today());
    setHere(Intl.DateTimeFormat().resolvedOptions().timeZone);
    // The month turns over at midnight in New York, checked each minute
    const minute = window.setInterval(() => setNow(today()), 60 * 1000);
    return () => window.clearInterval(minute);
  }, []);

  // Open: fade in, focus Close, and Escape puts it back
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => setShown(true));
    close.current?.focus();
    const escape = (e: KeyboardEvent) => e.key === "Escape" && shut();
    window.addEventListener("keydown", escape);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", escape);
    };
  }, [open]);

  // A day picked on a phone, where its times come under the month, off
  // the bottom of the screen: scroll down to them
  useEffect(() => {
    if (!picked || !window.matchMedia("(max-width: 767px)").matches) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    times.current?.scrollIntoView({
      block: "start",
      behavior: still ? "auto" : "smooth",
    });
  }, [picked]);

  const shut = () => {
    setShown(false);
    setOpen(false);
    setPicked(null);
    trigger.current?.focus();
  };

  const month = now ? `${NAMES[now.m]} ${now.y}` : "";
  const fade = `transition-opacity duration-300 ease-switch motion-reduce:transition-none ${shown ? "opacity-100" : "opacity-0"}`;

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label={`My calendar${month ? `, ${month}` : ""}: open it to request a meeting with me`}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={`absolute transition-transform duration-300 ease-switch hover:-translate-y-0.5 motion-reduce:transition-none ${focusRing}`}
        style={box}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden="true"
          className="block h-full w-full overflow-visible"
        >
          <Page now={now} />
        </svg>
      </button>

      {open &&
        page &&
        createPortal(
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              aria-hidden="true"
              className={`fixed inset-0 bg-site-paper/80 ${fade}`}
            />
            {/* Centered, and scrolling if the screen's too short; a click
                outside the dialog puts it back */}
            <div
              className="relative flex min-h-full items-center justify-center px-gutter py-10"
              onClick={(e) => e.target === e.currentTarget && shut()}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={title}
                className={fade}
              >
                <div className="mb-3 flex items-baseline justify-between gap-6">
                  <h2 id={title} className="text-caption text-site-muted">
                    {picked
                      ? "Pick a time to request a meeting with me."
                      : "Pick a day to request a meeting with me."}
                  </h2>
                  <button
                    ref={close}
                    type="button"
                    onClick={shut}
                    className={`font-mono text-label uppercase text-site-muted transition-colors hover:text-site-blue motion-reduce:transition-none ${focusRing}`}
                  >
                    Close
                  </button>
                </div>
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <svg
                    viewBox={`0 0 ${W} ${H}`}
                    className="block h-auto shrink-0 overflow-visible shadow-float ring-1 ring-black/5"
                    style={{ width: `min(26rem, calc(72svh * ${W} / ${H}))` }}
                    aria-label={month}
                    role="group"
                  >
                    <Page now={now} picked={picked} onPick={setPicked} />
                  </svg>

                  {/* The times that day, beside it (under it on a phone) */}
                  {now && picked && (
                    <div ref={times} className="scroll-mt-10 md:w-64">
                      <p className="text-caption text-site-muted">
                        {new Date(now.y, now.m, picked).toLocaleDateString(
                          "en-US",
                          { weekday: "long", month: "long", day: "numeric" },
                        )}
                        , New York time
                      </p>
                      <ul className="mt-3 flex flex-col gap-2">
                        {SLOTS.map((h) => {
                          const ny = new Date(
                            Date.UTC(2000, 0, 1, h),
                          ).toLocaleTimeString("en-US", {
                            timeZone: "UTC",
                            hour: "numeric",
                            minute: "2-digit",
                          });
                          const yours =
                            here && here !== ZONE
                              ? inNewYork(
                                  now.y,
                                  now.m,
                                  picked,
                                  h,
                                ).toLocaleTimeString([], {
                                  hour: "numeric",
                                  minute: "2-digit",
                                })
                              : null;
                          return (
                            <li key={h}>
                              <a
                                href={invite(now.y, now.m, picked, h)}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${ny}${yours ? ` (${yours} your time)` : ""}: open a Google Calendar invite to meet`}
                                className={`group flex items-baseline justify-between gap-4 border border-site-line bg-site-paper px-3 py-2 transition-colors hover:border-site-blue motion-reduce:transition-none ${focusRing}`}
                              >
                                <span className="font-mono text-label uppercase text-site-ink transition-colors group-hover:text-site-blue motion-reduce:transition-none">
                                  {ny}
                                </span>
                                {yours && (
                                  <span className="text-caption text-site-muted">
                                    {yours} your time
                                  </span>
                                )}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                      <p className="mt-3 text-caption text-site-muted">
                        It opens Google Calendar with an invite to me; save it
                        and I&apos;ll get it. Or{" "}
                        <a
                          href={`mailto:${EMAIL}?subject=${encodeURIComponent("Meeting request")}`}
                          className={inlineLink}
                        >
                          email me
                        </a>
                        .
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>,
          page,
        )}
    </>
  );
}
