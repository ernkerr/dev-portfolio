"use client";

import { useEffect, useId, useRef } from "react";
import { focusRing } from "@/components/site/links";
import { useLights } from "./LampSwitch";
import { LAVA } from "./lavaShape";

// My lava lamp, for lava lamps 1 to 5: on the board below the DJ deck,
// beside the camera, straight on, traced from a photo of it off. Its
// parts are straight cones meeting at sharp edges, as on the real one. It's
// one of the room's lights, so it shares their switch (useLights): click it
// and every light comes on and the page goes dark, and whenever they're on
// it glows.
//
// 1: slim, the liquid pale in clear glass, its wax lying flat and, lit,
//    drifting up and down in blobs.
// 2: the same, wider and taller, nearly up to the board above, and lit,
//    its glow reaching further.
// 3: 2, its glass sitting down in a bigger metal base, its wax like the
//    real thing's (see Wax).
// 4: 3, its glass meeting the base exactly, clear, its wax cream and, lit,
//    amber, its glow amber, softer and further reaching.
// 5: 4, right of the camera.
//
// Drawn in its own units (LAVA), its foot's middle on the board at 0, 0,
// in the real one's proportions: the foot the bottom quarter, the collar a
// fifth, the globe over a third and the cap the rest.

// Lava lamp 1's glass, narrowest under the cap, widest just above the
// collar, its bottom corners cut in to the collar's rim
const GLOBE = "M-4 -60L-7.4 -35.4L-7 -33.6H7L7.4 -35.4L4 -60Z";
// Lava lamps 3 and 4's, its sides running straight down into the collar
const GLOBE_2 = "M-4 -60L-7.3 -35V-33.6H7.3V-35L4 -60Z";

// Lava lamp 1's wax, three blobs, each drifting at its own pace
const BLOBS = [
  { cx: -2.2, cy: -36.5, rx: 2.8, ry: 2.3, drift: "animate-lava-a" },
  {
    cx: 2.6,
    cy: -37.5,
    rx: 2.1,
    ry: 1.8,
    drift: "animate-lava-b [animation-delay:-6s]",
  },
  {
    cx: 0.4,
    cy: -35.5,
    rx: 3.8,
    ry: 1.6,
    drift: "animate-lava-c [animation-delay:-11s]",
  },
];

/* ---------- Lava lamps 3 and 4's wax ---------- */

// Off, the wax is a lump settled at the bottom, wavy on top. On, it warms
// and swells, and blobs bulge up out of it, pinch off and rise slowly,
// stretching as they go; at the top they wait, then sink back and melt
// into the lump again, over and over, each at its own pace. Turned off,
// the ones up in the liquid sink back down and the lump settles. A goo
// filter (a blur, then a hard edge) melts the blobs into the lump and each
// other wherever they meet. In the lamp's units, before it's widened.
// Lava lamp 4's is cream, and amber lit.
const LUMP =
  "M-7.8 -33.2V-36.6C-6.4 -38.3 -5.2 -36 -3.6 -37.3C-2 -38.8 -0.7 -36.5 1 -37.6C2.6 -38.9 4 -36.4 5.5 -37.4C6.5 -38.1 7.2 -37.4 7.8 -37V-33.2Z";
const BOTTOM = -33.6; // where the lump swells up from
const REST = -35.6; // a blob's middle, sunk in the lump
const TOP = -55; // and risen to the top
const DROPS = [
  { x: -2.6, r: 2.3, rise: 7, fall: 8.5, first: 0.6 },
  { x: 2.5, r: 1.9, rise: 8.5, fall: 7.5, first: 2.6 },
  { x: 0.3, r: 2.8, rise: 9.5, fall: 10, first: 4.8 },
  { x: -1, r: 1.5, rise: 6, fall: 7, first: 7.2 },
];
type Drop = {
  y: number; // 0 sunk in the lump, 1 at the top
  leg: "rest" | "rise" | "top" | "fall";
  wait: number; // seconds left resting or at the top
};

function Wax({ on, id, amber }: { on: boolean; id: string; amber: boolean }) {
  const drops = useRef<(SVGEllipseElement | null)[]>([]);
  const lump = useRef<SVGPathElement>(null);
  const state = useRef<Drop[]>(
    DROPS.map(({ first }) => ({ y: 0, leg: "rest", wait: first })),
  );
  const heat = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const draw = () => {
      state.current.forEach((d, i) => {
        const { x, r } = DROPS[i];
        const e = d.y * d.y * (3 - 2 * d.y);
        // Rising ones stretch tall, sinking ones squash
        const s = d.leg === "rise" ? 1.18 : d.leg === "fall" ? 0.9 : 1;
        const el = drops.current[i];
        el?.setAttribute("cx", (x * (1 - 0.45 * e)).toFixed(2));
        el?.setAttribute("cy", (REST + (TOP - REST) * e).toFixed(2));
        el?.setAttribute("rx", (r / s).toFixed(2));
        el?.setAttribute("ry", (r * s).toFixed(2));
      });
      // The lump swells as it warms, up from the bottom
      const k = 1 + 0.3 * heat.current;
      lump.current?.setAttribute(
        "transform",
        `translate(0 ${BOTTOM}) scale(1 ${k.toFixed(3)}) translate(0 ${-BOTTOM})`,
      );
    };

    // Reduced motion: lit, two blobs held up in the liquid; off, all down
    if (reduce.matches) {
      heat.current = on ? 1 : 0;
      state.current.forEach((d, i) => {
        d.y = on && i < 2 ? 0.45 + i * 0.35 : 0;
        d.leg = "rest";
      });
      draw();
      return;
    }

    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      const t = now / 1000;
      const dt = last ? Math.min(0.05, t - last) : 0;
      last = t;
      heat.current += ((on ? 1 : 0) - heat.current) * Math.min(1, dt * 0.7);
      let moving = Math.abs(heat.current - (on ? 1 : 0)) > 0.005;
      state.current.forEach((d, i) => {
        const { rise, fall } = DROPS[i];
        if (d.leg === "rest") {
          if (on) {
            d.wait -= dt;
            if (d.wait <= 0) d.leg = "rise";
          }
        } else if (d.leg === "rise") {
          if (!on) d.leg = "fall";
          else {
            d.y = Math.min(1, d.y + dt / rise);
            if (d.y >= 1) {
              d.leg = "top";
              d.wait = 0.8 + (i % 3) * 0.6;
            }
          }
        } else if (d.leg === "top") {
          d.wait -= dt;
          if (d.wait <= 0 || !on) d.leg = "fall";
        } else {
          // Cooling, they sink a little faster
          d.y = Math.max(0, d.y - (dt / fall) * (on ? 1 : 1.5));
          if (d.y <= 0) {
            d.leg = "rest";
            d.wait = 1.2 + ((i * 1.7) % 3);
          }
        }
        if (d.leg !== "rest") moving = true;
      });
      draw();
      frame = on || moving ? requestAnimationFrame(tick) : 0;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [on]);

  return (
    <g
      filter={`url(#${id}-goo)`}
      className={`transition-colors duration-1000 motion-reduce:transition-none ${
        amber
          ? on
            ? "fill-room-lava-amber"
            : "fill-room-lava-cream"
          : on
            ? "fill-room-lava-lit-wax"
            : "fill-room-lava-wax"
      }`}
    >
      <path ref={lump} d={LUMP} />
      {DROPS.map(({ x, r }, i) => (
        <ellipse
          key={x}
          ref={(el) => {
            drops.current[i] = el;
          }}
          cx={x}
          cy={REST}
          rx={r}
          ry={r}
        />
      ))}
    </g>
  );
}

/* ---------- The lamp ---------- */

export default function LavaLamp({
  version = 1,
  box,
}: {
  version?: 1 | 2 | 3 | 4 | 5;
  /** Where it stands in the room, as percentages of the drawing. */
  box: { left: string; top: string; width: string; height: string };
}) {
  const [on, setOn] = useLights();
  const { width, height, sx, sy } = LAVA[version];
  const bright = version >= 2; // glows further, pools on the board
  const seated = version >= 3; // its glass sits down in the base; real wax
  const clear = version >= 4; // clear glass, amber, meeting the base exactly
  const globe = seated ? GLOBE_2 : GLOBE;
  const id = `lava${useId().replace(/[^\w-]/g, "")}`;
  const lit = `transition-opacity duration-500 motion-reduce:transition-none ${on ? "opacity-100" : "opacity-0"}`;
  // Lava lamp 4's glow: amber, softer, further
  const glow = clear
    ? { r: 84, stops: [0.42, 0.2, 0.07] }
    : bright
      ? { r: 54, stops: [0.85, 0.38, 0.12] }
      : { r: 30, stops: [0.5, 0.16, 0.05] };
  // The base: lava lamp 3's collar and rim wider than its glass, 4's
  // meeting it exactly
  const base = clear
    ? { foot: 7.3, neck: 3.4, collar: 7.3, rim: 7.3 }
    : { foot: 7.6, neck: 3.4, collar: 8, rim: 8.3 };

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label="Lava lamp (dark mode)"
      data-side={on ? "engineer" : "designer"}
      onClick={() => setOn(!on)}
      className={`absolute ${focusRing}`}
      style={box}
    >
      <svg
        viewBox={`${-width / 2} ${-height + 2} ${width} ${height}`}
        aria-hidden="true"
        className="pointer-events-none block h-full w-full overflow-visible"
      >
        <defs>
          <radialGradient
            id={`${id}-glow`}
            className={
              clear ? "text-room-lava-amber" : "text-room-lava-lit-liquid"
            }
          >
            {[0, 0.4, 0.7].map((at, k) => (
              <stop
                key={at}
                offset={at}
                stopColor="currentColor"
                stopOpacity={glow.stops[k]}
              />
            ))}
            <stop offset="1" stopColor="currentColor" stopOpacity={0} />
          </radialGradient>
          <clipPath id={`${id}-globe`}>
            <path d={globe} />
          </clipPath>
          <filter id={`${id}-goo`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={0.9} />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -6" />
          </filter>
        </defs>

        {/* Lit, its glow round the globe, behind it */}
        <circle
          cx={0}
          cy={-46 * sy}
          r={glow.r}
          fill={`url(#${id}-glow)`}
          className={lit}
        />

        <g transform={sx !== 1 || sy !== 1 ? `scale(${sx} ${sy})` : undefined}>
          {/* The foot: silver, flaring straight out to the board, a light
              and a dark stripe where it catches the room */}
          {seated ? (
            <>
              <path
                d={`M${-base.neck} -18.6H${base.neck}L${base.foot} 0H${-base.foot}Z`}
                className="fill-room-lava-chrome"
              />
              <path
                d="M-2.4 -18.2L-5 -0.6"
                strokeWidth={1.1}
                className="stroke-room-lava-chrome-light"
              />
              <path
                d="M1.5 -18.2L3.2 -0.6"
                strokeWidth={0.8}
                className="stroke-room-lava-chrome-dark/60"
              />
            </>
          ) : (
            <>
              <path
                d="M-3.05 -18.6H3.05L6.6 0H-6.6Z"
                className="fill-room-lava-chrome"
              />
              <path
                d="M-2.1 -18.2L-4.4 -0.6"
                strokeWidth={1.1}
                className="stroke-room-lava-chrome-light"
              />
              <path
                d="M1.3 -18.2L2.8 -0.6"
                strokeWidth={0.8}
                className="stroke-room-lava-chrome-dark/60"
              />
            </>
          )}

          {/* The collar, darker, narrowing straight down to the foot, with a
              light stripe and a seam at the foot */}
          <path
            d={
              seated
                ? `M${-base.collar} -33.6H${base.collar}L${base.neck} -18.6H${-base.neck}Z`
                : "M-6.6 -33.1H6.6L3.05 -18.6H-3.05Z"
            }
            className="fill-room-lava-collar"
          />
          <path
            d={seated ? "M-4.6 -33L-2.3 -19" : "M-3.9 -32.6L-2 -19"}
            strokeWidth={1}
            className="stroke-room-lava-collar-light"
          />
          <path
            d={seated ? "M-3.8 -18.6H3.8" : "M-3.4 -18.6H3.4"}
            strokeWidth={0.7}
            className="stroke-room-lava-chrome-dark"
          />

          {/* The globe: the liquid in the glass, pale, or for lava lamp 4
              clear, the glass hardly tinted; lava lamps 1 and 2's wax lying
              flat at the bottom */}
          <path
            d={globe}
            className={
              clear ? "fill-room-glass/15" : "fill-room-lava-liquid/60"
            }
          />
          {!seated && (
            <path
              d="M-7.3 -35.4L-7 -33.6H7L7.3 -35.4L6.9 -37.3H-6.9Z"
              className="fill-room-lava-wax/80"
            />
          )}

          {/* Lit: the liquid glowing and the bulb's light at the bottom;
              lava lamps 1 and 2's blobs drifting in it */}
          <g className={lit}>
            <path
              d={globe}
              className={
                clear
                  ? "fill-room-lava-warm/50"
                  : "fill-room-lava-lit-liquid/90"
              }
            />
            <g clipPath={`url(#${id}-globe)`}>
              <ellipse
                cx={0}
                cy={-33.6}
                rx={7}
                ry={2.2}
                className="fill-room-glow"
              />
              {!seated &&
                BLOBS.map(({ cx, cy, rx, ry, drift }) => (
                  <ellipse
                    key={cx}
                    cx={cx}
                    cy={cy}
                    rx={rx}
                    ry={ry}
                    className={`origin-center fill-room-lava-lit-wax [transform-box:fill-box] motion-reduce:animate-none ${drift}`}
                  />
                ))}
            </g>
          </g>
          {seated && (
            <g clipPath={`url(#${id}-globe)`}>
              <Wax on={on} id={id} amber={clear} />
            </g>
          )}

          {/* The glass's edges, the light down it, and the silver rim where
              it sits in the collar */}
          <path
            d={globe}
            fill="none"
            strokeWidth={0.5}
            className={
              clear ? "stroke-room-glass" : "stroke-room-lava-liquid-edge"
            }
          />
          <path
            d="M-3.4 -58L-5.9 -38.5"
            strokeWidth={0.9}
            className="stroke-room-frost/80"
          />
          <path
            d="M2.6 -58L4.6 -40"
            strokeWidth={0.4}
            className="stroke-room-frost/50"
          />
          {seated ? (
            <>
              <rect
                x={-base.rim}
                y={-34.6}
                width={base.rim * 2}
                height={1.8}
                rx={clear ? 0 : 0.6}
                className="fill-room-lava-chrome"
              />
              <path
                d={`M${-base.rim + 0.5} -34.3H${base.rim - 0.5}`}
                strokeWidth={0.4}
                className="stroke-room-lava-chrome-light"
              />
            </>
          ) : (
            <path
              d="M-7 -33.6H7"
              strokeWidth={1.1}
              className="stroke-room-lava-chrome"
            />
          )}

          {/* The cap: silver, tapering straight up, its dark and light
              stripes */}
          <path
            d="M-4 -60L-2.5 -72H2.5L4 -60Z"
            className="fill-room-lava-chrome"
          />
          <path
            d="M-0.8 -60.2L-0.5 -71.8"
            strokeWidth={1}
            className="stroke-room-lava-chrome-dark"
          />
          <path
            d="M-2.6 -60.5L-1.7 -71.5"
            strokeWidth={0.7}
            className="stroke-room-lava-chrome-light"
          />
          <path
            d="M1.8 -60.5L1.3 -71.5"
            strokeWidth={0.5}
            className="stroke-room-lava-chrome-dark/50"
          />
        </g>
      </svg>
    </button>
  );
}
