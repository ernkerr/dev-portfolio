"use client";

import { useEffect, useState } from "react";

// My black and gold clock, drawn into the room straight on: a round black
// case on two little gold legs, white numbers and ticks between them, and
// gold hands that tell the time wherever whoever's looking is, from their
// computer's clock, the second hand ticking. The hands only appear once
// the page knows that time, so the server's own clock never shows. With
// reduced motion the second hand is left off. `minimal` (clock 4) leaves
// off the numbers for a single gold dash at each hour, inside a gold rim.
//
// `x` is its middle, `floor` the board it stands on, `r` the case's radius.
export default function Clock({
  x,
  floor,
  r,
  minimal = false,
}: {
  x: number;
  floor: number;
  r: number;
  minimal?: boolean;
}) {
  const [now, setNow] = useState<Date | null>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const tick = () => setNow(new Date());
    tick();
    // On the second, so the hand moves when the computer's clock does
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

  const legs = r * 0.27; // how far the legs hold it up off the board
  const cy = floor - legs - r;
  const at = (turn: number, length: number) => {
    const a = turn * 2 * Math.PI;
    return [x + Math.sin(a) * length, cy - Math.cos(a) * length] as const;
  };
  const hand = (turn: number, length: number, width: number, tail = 0) => {
    const [x1, y1] = at(turn, length);
    const [x0, y0] = at(turn + 0.5, tail);
    return (
      <path
        d={`M${x0.toFixed(2)} ${y0.toFixed(2)}L${x1.toFixed(2)} ${y1.toFixed(2)}`}
        strokeWidth={width}
        strokeLinecap="round"
        className="stroke-room-gold"
      />
    );
  };

  const seconds = now ? now.getSeconds() : 0;
  const minutes = now ? now.getMinutes() + seconds / 60 : 0;
  const hours = now ? (now.getHours() % 12) + minutes / 60 : 0;

  return (
    <g>
      {/* The gold legs, from its lower sides down to the board */}
      {[-1, 1].map((side) => (
        <path
          key={side}
          d={`M${x + side * r * 0.55} ${cy + r * 0.8}L${x + side * r * 0.6} ${floor}H${x + side * r * 0.72}`}
          fill="none"
          strokeWidth={r * 0.07}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-room-gold"
        />
      ))}

      {/* The case, its rim, and the black face */}
      <circle cx={x} cy={cy} r={r} className="fill-room-clock" />
      <circle
        cx={x}
        cy={cy}
        r={r - r * 0.04}
        fill="none"
        strokeWidth={r * 0.06}
        className={minimal ? "stroke-room-gold" : "stroke-room-clock-rim"}
      />
      <circle cx={x} cy={cy} r={r * 0.88} className="fill-room-clock-face" />

      {/* Clock 4: a single gold dash at each hour */}
      {minimal &&
        Array.from({ length: 12 }, (_, i) => {
          const [t0x, t0y] = at(i / 12, r * 0.66);
          const [t1x, t1y] = at(i / 12, r * 0.8);
          return (
            <path
              key={i}
              d={`M${t0x.toFixed(2)} ${t0y.toFixed(2)}L${t1x.toFixed(2)} ${t1y.toFixed(2)}`}
              strokeWidth={r * 0.05}
              strokeLinecap="round"
              className="stroke-room-gold"
            />
          );
        })}

      {/* The numbers, and a tick between each */}
      {!minimal &&
        Array.from({ length: 12 }, (_, i) => {
          const [nx, ny] = at((i + 1) / 12, r * 0.68);
          const [t0x, t0y] = at((i + 0.5) / 12, r * 0.72);
          const [t1x, t1y] = at((i + 0.5) / 12, r * 0.82);
          return (
            <g key={i}>
              <text
                x={nx}
                y={ny + r * 0.07}
                textAnchor="middle"
                fontSize={r * 0.2}
                className="fill-room-clock-numeral font-sans"
              >
                {i + 1}
              </text>
              <path
                d={`M${t0x.toFixed(2)} ${t0y.toFixed(2)}L${t1x.toFixed(2)} ${t1y.toFixed(2)}`}
                strokeWidth={r * 0.03}
                className="stroke-room-clock-numeral"
              />
            </g>
          );
        })}

      {/* The hands, gold, once it knows the time */}
      {now && (
        <g>
          {hand(hours / 12, r * 0.42, r * 0.08)}
          {hand(minutes / 60, r * 0.66, r * 0.06)}
          {!still && hand(seconds / 60, r * 0.72, r * 0.025, r * 0.16)}
          <circle cx={x} cy={cy} r={r * 0.08} className="fill-room-gold" />
          <circle cx={x} cy={cy} r={r * 0.035} className="fill-room-clock" />
        </g>
      )}
    </g>
  );
}
