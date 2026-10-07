"use client";

import { useEffect, useId, useState } from "react";

// A window, for window 1, on the wall beside the bookshelf, looking out
// on wherever whoever's looking is, as it is right now (/api/window):
// their city's skyline under the sky for their time of day (night, sunrise,
// day or sunset), the sun or moon on its way across, stars on a clear
// night, lit windows after dark, and the weather: clouds drifting by, rain,
// snow, fog or a storm's lightning. Hovering it says where, the time and
// the weather. The weather's fetched again every 15 minutes and the sky
// moves on every minute. Until it knows, it shows a plain sky; with
// reduced motion nothing drifts or falls.
//
// Drawn in its own units: a two-over-two window 160 wide and 236 tall,
// its sill along the bottom.
type Outside = {
  city: string;
  sunrise: number;
  sunset: number;
  weather: number;
  clouds: number;
  celsius: number;
};
type Phase = "night" | "dawn" | "day" | "dusk";

const W = 160;
const H = 236;
const PANE = { x: 9, y: 9, w: 142, h: 212 }; // the view, behind the glass
const RAIL = PANE.y + PANE.h / 2; // the middle of the rail between the sashes
const TWILIGHT = 40 * 60 * 1000; // sunrise and sunset each side, in ms
const DAY = 24 * 60 * 60 * 1000;

// The same every time, like a seeded random; rounded, so the server and
// the browser, whose Math.sin can differ in its last digits, draw the
// same city
const jitter = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
};

// What kind of weather a WMO weather code is, and what to call it
const kind = (code: number) =>
  code >= 95
    ? "storm"
    : (code >= 71 && code <= 77) || code === 85 || code === 86
      ? "snow"
      : (code >= 51 && code <= 67) || (code >= 80 && code <= 82)
        ? "rain"
        : code === 45 || code === 48
          ? "fog"
          : "clear";
const WORDS: Record<number, string> = {
  0: "clear",
  1: "mostly clear",
  2: "partly cloudy",
  3: "overcast",
  45: "foggy",
  48: "foggy",
  51: "drizzling",
  53: "drizzling",
  55: "drizzling",
  56: "freezing drizzle",
  57: "freezing drizzle",
  61: "raining",
  63: "raining",
  65: "pouring",
  66: "freezing rain",
  67: "freezing rain",
  71: "snowing",
  73: "snowing",
  75: "snowing hard",
  77: "snowing",
  80: "showers",
  81: "showers",
  82: "pouring",
  85: "snow showers",
  86: "snow showers",
  95: "thunderstorms",
  96: "thunderstorms",
  99: "thunderstorms",
};

const phaseAt = (now: number, o: Outside): Phase =>
  Math.abs(now - o.sunrise) <= TWILIGHT
    ? "dawn"
    : Math.abs(now - o.sunset) <= TWILIGHT
      ? "dusk"
      : now > o.sunrise && now < o.sunset
        ? "day"
        : "night";

// The city: two rows of buildings, far and near, across the bottom of the
// view, a taller tower with an antenna among the near ones, and a grid of
// windows on the near ones, some lit at night
const TOWER = 6; // which of the near buildings is the tower
const FAR = Array.from({ length: 12 }, (_, i) => ({
  x: PANE.x + i * 12.4 - 2,
  w: 10 + jitter(i) * 6,
  h: 34 + jitter(i + 30) * 40,
}));
const NEAR = Array.from({ length: 10 }, (_, i) => ({
  x: PANE.x + i * 15 - 3,
  w: 11 + jitter(i + 60) * 7,
  h: i === TOWER ? 96 : 22 + jitter(i + 90) * 38,
}));
const LIT = NEAR.flatMap((b, i) =>
  Array.from({ length: Math.floor((b.w - 2) / 3.6) }, (_, c) =>
    Array.from({ length: Math.floor((b.h - 4) / 5) }, (_, r) => ({
      x: b.x + 1.8 + c * 3.6,
      y: PANE.y + PANE.h - b.h + 2.5 + r * 5,
      on: jitter(i * 31 + c * 7 + r * 13) > 0.62,
    })),
  ).flat(),
);
const STARS = Array.from({ length: 30 }, (_, i) => ({
  x: PANE.x + 4 + jitter(i + 200) * (PANE.w - 8),
  y: PANE.y + 4 + jitter(i + 260) * 100,
  r: 0.4 + jitter(i + 320) * 0.5,
}));
const DROPS = Array.from({ length: 50 }, (_, i) => ({
  x: PANE.x + 4 + jitter(i + 400) * (PANE.w + 8),
  y: PANE.y + jitter(i + 450) * 60,
  delay: -jitter(i + 500) * 1.4,
}));
const FLAKES = Array.from({ length: 40 }, (_, i) => ({
  x: PANE.x + 2 + jitter(i + 600) * PANE.w,
  y: PANE.y + jitter(i + 650) * 60,
  r: 0.6 + jitter(i + 700) * 0.6,
  delay: -jitter(i + 750) * 14,
}));

export default function CityWindow({
  box,
}: {
  /** Where it is in the room, as percentages of the drawing. */
  box: { left: string; top: string; width: string; height: string };
}) {
  const [outside, setOutside] = useState<Outside | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const id = `view${useId().replace(/[^\w-]/g, "")}`;

  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const look = () =>
      fetch(`/api/window?tz=${encodeURIComponent(zone)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data: Outside | null) => data && setOutside(data))
        .catch(() => {});
    look();
    setNow(Date.now());
    const minute = window.setInterval(() => setNow(Date.now()), 60 * 1000);
    const weather = window.setInterval(look, 15 * 60 * 1000);
    return () => {
      window.clearInterval(minute);
      window.clearInterval(weather);
    };
  }, []);

  // Until it knows: a plain daytime sky
  const o = outside;
  const t = now ?? 0;
  const phase: Phase = o && now ? phaseAt(t, o) : "day";
  const weather = o ? kind(o.weather) : "clear";
  const gray = !!o && (o.clouds >= 80 || weather !== "clear");
  const dark = phase === "night";
  const sky =
    phase === "night"
      ? gray
        ? ["text-room-sky-gray-night-top", "text-room-sky-gray-night-low"]
        : ["text-room-sky-night-top", "text-room-sky-night-low"]
      : phase === "dawn"
        ? ["text-room-sky-dawn-top", "text-room-sky-dawn-low"]
        : phase === "dusk"
          ? ["text-room-sky-dusk-top", "text-room-sky-dusk-low"]
          : gray
            ? ["text-room-sky-gray-top", "text-room-sky-gray-low"]
            : ["text-room-sky-day-top", "text-room-sky-day-low"];
  // The far buildings, the near ones, and the tower's antenna
  const city =
    phase === "night"
      ? [
          "fill-room-city-night-far",
          "fill-room-city-night",
          "stroke-room-city-night",
        ]
      : phase === "day"
        ? [
            "fill-room-city-day-far",
            "fill-room-city-day",
            "stroke-room-city-day",
          ]
        : [
            "fill-room-city-dusk-far",
            "fill-room-city-dusk",
            "stroke-room-city-dusk",
          ];
  const cloud = gray
    ? dark
      ? "fill-room-sky-cloud-night"
      : "fill-room-sky-cloud-gray"
    : dark
      ? "fill-room-sky-cloud-night"
      : phase === "day"
        ? "fill-room-frost"
        : "fill-room-sky-cloud-dusk";
  const clouds = !o
    ? 1
    : o.clouds < 15
      ? 0
      : o.clouds < 40
        ? 1
        : o.clouds < 65
          ? 2
          : o.clouds < 85
            ? 3
            : 4;

  // The sun across the sky from sunrise to sunset, and the moon across
  // the night, low at either end and highest halfway
  const arc = (from: number, to: number) => {
    const f = Math.min(1, Math.max(0, (t - from) / (to - from)));
    const low = PANE.y + PANE.h - 70; // down behind the city
    const high = PANE.y + 24;
    return {
      x: PANE.x + 14 + f * (PANE.w - 28),
      y: low - Math.sin(Math.PI * f) * (low - high),
    };
  };
  const sun = o && now && phase !== "night" ? arc(o.sunrise, o.sunset) : null;
  const moon =
    o && now && phase === "night"
      ? t > o.sunset
        ? arc(o.sunset, o.sunrise + DAY)
        : arc(o.sunset - DAY, o.sunrise)
      : null;

  // What hovering it says
  const fahrenheit =
    typeof navigator !== "undefined" && /-US$/.test(navigator.language);
  const temp = o
    ? fahrenheit
      ? `${Math.round((o.celsius * 9) / 5 + 32)}°F`
      : `${Math.round(o.celsius)}°C`
    : "";
  const when = now
    ? new Date(now).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";
  const label = o
    ? `My window, looking out on ${o.city}: ${when}, ${
        { night: "night", dawn: "sunrise", day: "daytime", dusk: "sunset" }[
          phase
        ]
      }, ${WORDS[o.weather] ?? "outside"}, ${temp}`
    : "My window";

  const move = "motion-reduce:animate-none";

  return (
    <div role="img" aria-label={label} className="absolute" style={box}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
        className="block h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" className={sky[0]} />
            <stop offset="1" stopColor="currentColor" className={sky[1]} />
          </linearGradient>
          <clipPath id={`${id}-pane`}>
            <rect x={PANE.x} y={PANE.y} width={PANE.w} height={PANE.h} />
          </clipPath>
          <radialGradient id={`${id}-sun`} className="text-room-sky-sun">
            <stop offset="0" stopColor="currentColor" stopOpacity={0.6} />
            <stop offset="1" stopColor="currentColor" stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* The view: sky, stars, sun or moon, clouds, the city, then the
            weather in front */}
        <g clipPath={`url(#${id}-pane)`}>
          <rect
            x={PANE.x}
            y={PANE.y}
            width={PANE.w}
            height={PANE.h}
            fill={`url(#${id}-sky)`}
          />
          {dark &&
            !gray &&
            STARS.map(({ x, y, r }, i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={r}
                className={`animate-twinkle fill-room-frost ${move}`}
                style={{ animationDelay: `${-jitter(i + 900) * 3}s` }}
              />
            ))}
          {sun && (
            <g opacity={gray ? 0.35 : 1}>
              <circle cx={sun.x} cy={sun.y} r={20} fill={`url(#${id}-sun)`} />
              <circle
                cx={sun.x}
                cy={sun.y}
                r={6.5}
                className="fill-room-sky-sun"
              />
            </g>
          )}
          {moon && (
            <g opacity={gray ? 0.45 : 1}>
              <circle
                cx={moon.x}
                cy={moon.y}
                r={5.5}
                className="fill-room-sky-moon"
              />
              <circle
                cx={moon.x + 2.4}
                cy={moon.y - 1.3}
                r={4.7}
                fill={`url(#${id}-sky)`}
              />
            </g>
          )}
          {Array.from({ length: clouds }, (_, i) => (
            <g
              key={i}
              className={`animate-cloud-drift ${move}`}
              style={{
                animationDuration: `${110 + i * 23}s`,
                animationDelay: `${-(i * 37 + 12)}s`,
              }}
            >
              <g
                transform={`translate(0 ${PANE.y + 14 + i * 22}) scale(1.2)`}
                className={cloud}
              >
                <ellipse cx={0} cy={4} rx={14} ry={4.2} />
                <ellipse cx={-5} cy={1.6} rx={6.5} ry={4.6} />
                <ellipse cx={4} cy={0.4} rx={7.5} ry={5.4} />
              </g>
            </g>
          ))}
          {FAR.map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={PANE.y + PANE.h - b.h}
              width={b.w}
              height={b.h}
              className={city[0]}
            />
          ))}
          {NEAR.map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={PANE.y + PANE.h - b.h}
              width={b.w}
              height={b.h}
              className={city[1]}
            />
          ))}
          <path
            d={`M${NEAR[TOWER].x + NEAR[TOWER].w / 2} ${PANE.y + PANE.h - NEAR[TOWER].h}v-12`}
            strokeWidth={0.9}
            className={city[2]}
          />
          {phase !== "day" &&
            LIT.filter((w) => w.on).map(({ x, y }, i) => (
              <rect
                key={i}
                x={x}
                y={y}
                width={1.6}
                height={2.2}
                className={`fill-room-city-lit ${dark ? "" : "opacity-50"}`}
              />
            ))}
          {(weather === "rain" || weather === "storm") &&
            DROPS.map(({ x, y, delay }, i) => (
              <path
                key={i}
                d={`M${x.toFixed(1)} ${y.toFixed(1)}l-1.6 5.5`}
                strokeWidth={0.5}
                strokeLinecap="round"
                className={`animate-rain-fall stroke-room-frost/60 ${move}`}
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          {weather === "snow" &&
            FLAKES.map(({ x, y, r, delay }, i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={r}
                className={`animate-snow-fall fill-room-frost ${move}`}
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          {weather === "fog" &&
            [0, 1, 2].map((i) => (
              <rect
                key={i}
                x={PANE.x - 20}
                y={PANE.y + 104 + i * 30}
                width={PANE.w + 40}
                height={14}
                rx={7}
                className={`animate-fog-drift fill-room-frost/40 ${move}`}
                style={{ animationDelay: `${-i * 8}s` }}
              />
            ))}
          {weather === "storm" && (
            <rect
              x={PANE.x}
              y={PANE.y}
              width={PANE.w}
              height={PANE.h}
              className={`animate-lightning fill-room-frost opacity-0 ${move}`}
            />
          )}
          {/* The glass of both sashes, catching the light */}
          {[PANE.y, RAIL].map((y) => (
            <path
              key={y}
              d={`M${PANE.x} ${y + 34}L${PANE.x + 40} ${y}H${PANE.x + 56}L${PANE.x} ${y + 50}Z`}
              className="fill-room-frost/10"
            />
          ))}
        </g>

        {/* The white frame: its edge, the shade inside it, the bar down
            the middle, the rail where the sashes meet, and the sill */}
        <path
          d={`M0 0H${W}V${H - 6}H0Z M${PANE.x} ${PANE.y}V${PANE.y + PANE.h}H${PANE.x + PANE.w}V${PANE.y}Z`}
          fillRule="evenodd"
          className="fill-room-window-frame"
        />
        <path
          d={`M${PANE.x} ${PANE.y + PANE.h}V${PANE.y}H${PANE.x + PANE.w}`}
          fill="none"
          strokeWidth={0.8}
          className="stroke-room-window-shade"
        />
        <rect
          x={W / 2 - 1.5}
          y={PANE.y}
          width={3}
          height={PANE.h}
          className="fill-room-window-frame"
        />
        <rect
          x={PANE.x}
          y={RAIL - 2.5}
          width={PANE.w}
          height={5}
          className="fill-room-window-frame"
        />
        <path
          d={`M${W / 2 + 1.5} ${PANE.y}V${PANE.y + PANE.h}M${PANE.x} ${RAIL + 2.5}H${PANE.x + PANE.w}`}
          strokeWidth={0.6}
          className="stroke-room-window-shade"
        />
        <rect
          x={-5}
          y={H - 7}
          width={W + 10}
          height={7}
          className="fill-room-window-frame"
        />
        <path
          d={`M-5 ${H - 0.4}H${W + 5}`}
          strokeWidth={0.8}
          className="stroke-room-window-shade"
        />
      </svg>
    </div>
  );
}
