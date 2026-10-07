"use client";

import { useEffect, useState } from "react";

// My big gold wall clock, from a photo of it, on the wall above my desk:
// a brushed gold rim catching the light at its top left, a white face, tall
// thin numbers at 12, 3, 6 and 9, long thin lines for the other hours and
// small ticks round the edge, and thin black hands. It tells my time, in
// New York, wherever whoever's looking is; hovering it says so. The hands
// only appear once the page knows the time, so the server's clock never
// shows, and the second hand ticks on the second. With reduced motion the
// second hand is left off.
//
// Drawn about its middle, 104 across, in the room's units.
const ZONE = "America/New_York";
const CITY = "New York";
const R = 50; // the rim's outside
const FACE = 45;

// The numbers, as thin strokes in a 4.4 by 10 box, tall like the clock's
const DIGITS: Record<string, string> = {
  "1": "M1 1.2L2.2 0V10",
  "2": "M0 2.2Q0 0 2.2 0Q4.4 0 4.4 2.4Q4.4 4.2 0 10H4.4",
  "3": "M0 0H4.4L1.6 4.2Q4.4 4.2 4.4 7Q4.4 10 2.2 10Q0 10 0 8.4",
  "6": "M3.8 0.4Q2 0.6 0.6 3.6Q0 5 0 7Q0 10 2.2 10Q4.4 10 4.4 7.2Q4.4 4.8 2.2 4.8Q0 4.8 0 7",
  "9": "M0.6 9.6Q2.4 9.4 3.8 6.4Q4.4 5 4.4 3Q4.4 0 2.2 0Q0 0 0 2.8Q0 5.2 2.2 5.2Q4.4 5.2 4.4 3",
};
const NUMBERS: [string, number, number][] = [
  ["12", 0, -33],
  ["3", 33, 0],
  ["6", 0, 33],
  ["9", -33, 0],
];

// Where a point a turn (0 to 1, from 12) and a length out is
const at = (turn: number, length: number) => {
  const a = turn * 2 * Math.PI;
  return [Math.sin(a) * length, -Math.cos(a) * length] as const;
};
const f = (n: number) => n.toFixed(2);

// The time in New York: its hours, minutes and seconds
function myTime(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONE,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { h: part("hour"), m: part("minute"), s: part("second") };
}

export default function WallClock({
  box,
}: {
  /** Where it hangs on the wall, as percentages of the drawing. */
  box: { left: string; top: string; width: string; height: string };
}) {
  const [now, setNow] = useState<Date | null>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const tick = () => setNow(new Date());
    tick();
    // On the second, so the hand moves when the clock does
    let interval = 0;
    const first = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 1000);
    }, 1000 - new Date().getMilliseconds());
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  const time = now && myTime(now);
  const said = now
    ? now.toLocaleTimeString("en-US", {
        timeZone: ZONE,
        hour: "numeric",
        minute: "2-digit",
      })
    : null;
  const label = said
    ? `My clock, on my time in ${CITY}: ${said}`
    : `My clock, on my time in ${CITY}`;

  const hand = (turn: number, length: number, width: number, tail = 0) => {
    const [x1, y1] = at(turn, length);
    const [x0, y0] = at(turn + 0.5, tail);
    return (
      <path
        d={`M${f(x0)} ${f(y0)}L${f(x1)} ${f(y1)}`}
        strokeWidth={width}
        strokeLinecap="round"
        className="stroke-room-clock-wall-ink"
      />
    );
  };

  return (
    <div role="img" aria-label={label} className="absolute" style={box}>
      <svg
        viewBox="-52 -52 104 104"
        aria-hidden="true"
        className="block h-full w-full"
      >
        {/* The gold rim: its light at the top left, its shade at the bottom
            right, and its inside edge */}
        <circle r={R} className="fill-room-gold" />
        <path
          d={`M${f(at(0.6, R - 1.6)[0])} ${f(at(0.6, R - 1.6)[1])}A${R - 1.6} ${R - 1.6} 0 0 1 ${f(at(0.98, R - 1.6)[0])} ${f(at(0.98, R - 1.6)[1])}`}
          fill="none"
          strokeWidth={2.6}
          strokeLinecap="round"
          className="stroke-room-gold-light/80"
        />
        <path
          d={`M${f(at(0.1, R - 1.6)[0])} ${f(at(0.1, R - 1.6)[1])}A${R - 1.6} ${R - 1.6} 0 0 1 ${f(at(0.48, R - 1.6)[0])} ${f(at(0.48, R - 1.6)[1])}`}
          fill="none"
          strokeWidth={2.6}
          strokeLinecap="round"
          className="stroke-room-gold-dark/70"
        />
        <circle
          r={FACE + 0.6}
          fill="none"
          strokeWidth={1}
          className="stroke-room-gold-dark"
        />

        {/* The white face, its ticks round the edge, the long lines for the
            hours, and the numbers */}
        <circle r={FACE} className="fill-room-clock-wall-face" />
        <path
          d={Array.from({ length: 60 }, (_, i) => {
            const [x0, y0] = at(i / 60, 41.2);
            const [x1, y1] = at(i / 60, 43.4);
            return `M${f(x0)} ${f(y0)}L${f(x1)} ${f(y1)}`;
          }).join("")}
          strokeWidth={0.45}
          className="stroke-room-clock-wall-ink/70"
        />
        <path
          d={[1, 2, 4, 5, 7, 8, 10, 11]
            .map((h) => {
              const [x0, y0] = at(h / 12, 21);
              const [x1, y1] = at(h / 12, 38.5);
              return `M${f(x0)} ${f(y0)}L${f(x1)} ${f(y1)}`;
            })
            .join("")}
          strokeWidth={0.55}
          className="stroke-room-clock-wall-ink"
        />
        {NUMBERS.map(([n, x, y]) => {
          const width = n.length * 4.4 + (n.length - 1) * 1.6;
          return (
            <g key={n} transform={`translate(${f(x - width / 2)} ${f(y - 5)})`}>
              {[...n].map((d, i) => (
                <path
                  key={i}
                  d={DIGITS[d]}
                  transform={`translate(${i * 6} 0)`}
                  fill="none"
                  strokeWidth={0.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-room-clock-wall-ink"
                />
              ))}
            </g>
          );
        })}

        {/* The hands, once it knows the time */}
        {time && (
          <g>
            {hand((time.h % 12) / 12 + time.m / 720, 22, 1.7)}
            {hand(time.m / 60 + time.s / 3600, 34, 1.2)}
            {!still && hand(time.s / 60, 38, 0.5, 7)}
            <circle r={1.9} className="fill-room-clock-wall-ink" />
          </g>
        )}
      </svg>
    </div>
  );
}
