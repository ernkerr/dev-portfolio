"use client";

import { useEffect, useId, useRef, useState } from "react";
import { focusRing } from "@/components/site/links";
import { useKeepOnScreen } from "./keepOnScreen";
import { PERRY_VIEW } from "./perryShape";

// Perry, my Bambu A1 3D printer, on the floor of my closet next to my
// Docs, drawn from Bambu's photos: the light gray frame, two columns and a
// bar across the top, the rail carrying the toolhead up and down between
// them, the tube arcing from the toolhead over to the right, the black bed
// on its base, the touchscreen at the front, and a spool of filament
// hanging off the left, empty till you choose a color. Click him to choose
// a print and a color, and he prints it: the toolhead goes back and forth
// across each layer only as far as the print reaches there, the rail rises
// a layer at a time, the print grows on the bed in that color, and his
// screen counts up.
// The print stays on the bed till you print another. With reduced motion
// it's just there, printed. Escape or a click away closes the choices.
//
// Drawn with his base's bottom left corner at 0, 0, in the closet's units,
// in the patch PERRY_VIEW (perryShape.ts).
const BED = -18; // the top of the bed
const CENTER = 46; // the middle of the bed, where prints go
const IDLE = { gantry: -72, head: 70 };
const DURATION = 14; // seconds to print

type Kind = "benchy" | "heart" | "vase" | "star";

// The star's points, standing on its lower two
const STAR = (() => {
  const r = 14;
  const cy = -r * Math.cos(Math.PI / 5);
  return (
    Array.from({ length: 10 }, (_, i) => {
      const a = (i * Math.PI) / 5;
      const d = i % 2 ? r * 0.43 : r;
      return `${i ? "L" : "M"}${(Math.sin(a) * d).toFixed(2)} ${(cy - Math.cos(a) * d).toFixed(2)}`;
    }).join("") + "Z"
  );
})();

// What he can print, standing on the bed about x 0: its outline, how wide
// it is and how tall
const PRINTS: Record<Kind, { name: string; d: string; w: number; h: number }> =
  {
    benchy: {
      name: "Benchy",
      d: "M-16-9L12-7Q16-8 17-11L13 0H-12ZM-9-8V-19H5V-8ZM-7-16.6V-12.6H-3V-16.6ZM-1-16.6V-12.6H3V-16.6ZM-10-20.4H6V-19H-10ZM7-9V-23H11V-9Z",
      w: 33,
      h: 23,
    },
    heart: {
      name: "Heart",
      d: "M0 0C-4-4-16-10-16-18C-16-24-10-27-5-25C-2-24 0-21 0-21C0-21 2-24 5-25C10-27 16-24 16-18C16-10 4-4 0 0Z",
      w: 32,
      h: 26,
    },
    vase: {
      name: "Vase",
      d: "M-6 0C-11-4-12-12-9-18C-7-22-5-25-5-28H5C5-25 7-22 9-18C12-12 11-4 6 0Z",
      w: 24,
      h: 28,
    },
    star: { name: "Star", d: STAR, w: 28, h: 26 },
  };
const KINDS = Object.keys(PRINTS) as Kind[];

// How thick a layer is, and how fast the toolhead moves across one, in the
// closet's units and seconds
const LAYER = 0.4;
const SPEED = 70;

// Where a print is at each layer, from the bed up: its left and right edges
// there, found by testing points across it against its outline, so the
// toolhead only goes as far as the print does
function layers(d: string, w: number, h: number) {
  const ctx = document.createElement("canvas").getContext("2d");
  const shape = new Path2D(d);
  const rows: [number, number][] = [];
  let last: [number, number] = [0, 0];
  for (let k = 0; k * LAYER < h; k++) {
    const y = -(k + 0.5) * LAYER;
    let lo = Infinity;
    let hi = -Infinity;
    for (let x = -w / 2 - 3; x <= w / 2 + 3; x += 0.2) {
      if (ctx?.isPointInPath(shape, x, y, "evenodd")) {
        lo = Math.min(lo, x);
        hi = Math.max(hi, x);
      }
    }
    // A layer with nothing on it keeps the last one's span
    if (lo <= hi) last = [lo, hi];
    rows.push(last);
  }
  return rows;
}

const FILAMENTS = [
  { name: "White", fill: "fill-room-printer-white" },
  { name: "Black", fill: "fill-room-printer-black" },
  { name: "Red", fill: "fill-room-printer-red" },
  { name: "Orange", fill: "fill-room-printer-orange" },
  { name: "Yellow", fill: "fill-room-printer-yellow" },
  { name: "Green", fill: "fill-room-printer-green" },
  { name: "Blue", fill: "fill-room-printer-blue" },
  { name: "Purple", fill: "fill-room-printer-purple" },
  { name: "Pink", fill: "fill-room-printer-pink" },
];
const SWATCHES = [
  "bg-room-printer-white",
  "bg-room-printer-black",
  "bg-room-printer-red",
  "bg-room-printer-orange",
  "bg-room-printer-yellow",
  "bg-room-printer-green",
  "bg-room-printer-blue",
  "bg-room-printer-purple",
  "bg-room-printer-pink",
];

// The tube from the top of the toolhead, up over the frame and down the
// right side to the base
const tube = (hx: number, gy: number) =>
  `M${hx.toFixed(2)} ${(gy - 14).toFixed(2)}C${hx.toFixed(2)} ${(gy - 44).toFixed(2)} 118 -132 118 -100V-16`;

export default function Perry({
  box,
}: {
  /** Where he stands in the closet, as percentages of its drawing. */
  box: { left: string; top: string; width: string; height: string };
}) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<Kind>("benchy");
  // No filament on the spool till a color's chosen
  const [color, setColor] = useState<number | null>(null);
  // What's on the bed: nothing yet, or a print in a color, and how far
  const [job, setJob] = useState<{ kind: Kind; color: number } | null>(null);
  const [state, setState] = useState<"idle" | "printing" | "done">("idle");
  const root = useRef<HTMLDivElement>(null);
  const popover = useRef<HTMLDivElement>(null);
  useKeepOnScreen(popover, open);
  const gantry = useRef<SVGGElement>(null);
  const head = useRef<SVGGElement>(null);
  const tubeRef = useRef<SVGPathElement>(null);
  const layer = useRef<SVGRectElement>(null);
  const screen = useRef<SVGTextElement>(null);
  const id = `perry${useId().replace(/[^\w-]/g, "")}`;

  // Choosing: Escape or a click anywhere else closes it
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

  // Printing: move the toolhead and rail and grow the print each frame
  useEffect(() => {
    if (state !== "printing" || !job) return;
    const { d, w, h } = PRINTS[job.kind];
    const pose = (gy: number, hx: number, height: number, label: string) => {
      gantry.current?.setAttribute(
        "transform",
        `translate(0 ${gy.toFixed(2)})`,
      );
      head.current?.setAttribute(
        "transform",
        `translate(${hx.toFixed(2)} ${gy.toFixed(2)})`,
      );
      tubeRef.current?.setAttribute("d", tube(hx, gy));
      layer.current?.setAttribute("y", (-height).toFixed(2));
      layer.current?.setAttribute("height", height.toFixed(2));
      if (screen.current) screen.current.textContent = label;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pose(IDLE.gantry, IDLE.head, h, "Done");
      setState("done");
      return;
    }
    const rows = layers(d, w, h);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      // A frame's time can be a touch before the effect's, so never below 0
      const t = Math.max(0, now - start) / 1000;
      const p = Math.min(1, t / DURATION);
      if (p >= 1) {
        pose(IDLE.gantry, IDLE.head, h, "Done");
        setState("done");
        return;
      }
      const height = p * h;
      // Back and forth across this layer, from its left edge to its right,
      // at a steady speed, so a narrow layer's passes are quicker
      const [lo, hi] = rows[
        Math.max(0, Math.min(rows.length - 1, Math.floor(height / LAYER)))
      ] ?? [0, 0];
      const span = Math.max(0.01, hi - lo);
      const travel = (t * SPEED) % (2 * span);
      const x = lo + (travel < span ? travel : 2 * span - travel);
      pose(BED - height - 8.5, CENTER + x, height, `${Math.floor(p * 100)}%`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [state, job]);

  const print = () => {
    if (color === null) return;
    setJob({ kind, color });
    setState("printing");
    setOpen(false);
  };

  const loaded = job ? job.color : color;
  const spool = loaded === null ? null : FILAMENTS[loaded].fill;
  const shown = job && PRINTS[job.kind];

  return (
    <div ref={root} className="group absolute" style={box}>
      <svg
        viewBox={`${PERRY_VIEW.x} ${PERRY_VIEW.y} ${PERRY_VIEW.w} ${PERRY_VIEW.h}`}
        aria-hidden="true"
        className="pointer-events-none block h-full w-full overflow-visible"
      >
        <defs>
          <clipPath id={`${id}-layers`}>
            <rect ref={layer} x={-30} y={0} width={60} height={0} />
          </clipPath>
        </defs>

        {/* The spool off the left side: empty till a color's chosen, then
            wound with filament in it */}
        <rect
          x={-16}
          y={-84}
          width={22}
          height={2.4}
          className="fill-room-printer-frame-shade"
        />
        {spool ? (
          <circle cx={-16} cy={-82} r={14} className={spool} />
        ) : (
          <circle
            cx={-16}
            cy={-82}
            r={7}
            strokeWidth={0.5}
            className="fill-room-printer-base stroke-room-printer-base-shade"
          />
        )}
        <circle
          cx={-16}
          cy={-82}
          r={14.6}
          fill="none"
          strokeWidth={1.4}
          className="stroke-room-printer-tube/70"
        />
        <circle
          cx={-16}
          cy={-82}
          r={4.2}
          strokeWidth={0.5}
          className="fill-room-printer-base stroke-room-printer-frame-shade"
        />

        {/* The frame: two columns and the bar across the top */}
        {[6, 92].map((x) => (
          <g key={x}>
            <rect
              x={x}
              y={-110}
              width={6}
              height={96}
              className="fill-room-printer-frame"
            />
            <rect
              x={x === 6 ? 11 : 92}
              y={-106}
              width={1}
              height={92}
              className="fill-room-printer-frame-shade"
            />
          </g>
        ))}
        <rect
          x={6}
          y={-112}
          width={92}
          height={6}
          className="fill-room-printer-frame"
        />

        {/* The tube from the toolhead, over and down the right side */}
        <path
          ref={tubeRef}
          d={tube(IDLE.head, IDLE.gantry)}
          fill="none"
          strokeWidth={0.9}
          strokeLinecap="round"
          className="stroke-room-printer-tube"
        />

        {/* The base, the black bed on it, and the touchscreen */}
        <rect
          x={0}
          y={-14}
          width={104}
          height={14}
          rx={3.5}
          strokeWidth={0.6}
          className="fill-room-printer-base stroke-room-printer-base-shade"
        />
        <path
          d="M3-3H101"
          strokeWidth={0.6}
          className="stroke-room-printer-base-shade"
        />
        <rect
          x={12}
          y={BED}
          width={68}
          height={4}
          className="fill-room-printer-bed"
        />
        <rect
          x={82}
          y={-12.4}
          width={17}
          height={8.6}
          rx={1}
          className="fill-room-printer-screen"
        />
        <text
          ref={screen}
          x={90.5}
          y={-6.8}
          fontSize={3.2}
          textAnchor="middle"
          className="fill-room-printer-ui font-mono"
        >
          {state === "done" ? "Done" : "Ready"}
        </text>

        {/* The print growing on the bed, a layer at a time */}
        {shown && job && (
          <g
            transform={`translate(${CENTER} ${BED})`}
            clipPath={`url(#${id}-layers)`}
          >
            <path
              d={shown.d}
              fillRule="evenodd"
              className={FILAMENTS[job.color].fill}
            />
            <path
              d={shown.d}
              fillRule="evenodd"
              fill="none"
              strokeWidth={0.4}
              className="stroke-room-printer-black/20"
            />
          </g>
        )}

        {/* The rail across, with its ends, rising as the print does */}
        <g ref={gantry} transform={`translate(0 ${IDLE.gantry})`}>
          <rect
            x={2}
            y={-2.5}
            width={100}
            height={5}
            strokeWidth={0.4}
            className="fill-room-printer-rail stroke-room-printer-frame-shade"
          />
          <path
            d={Array.from(
              { length: 15 },
              (_, i) => `M${8 + i * 6.4} 0h0.01`,
            ).join("")}
            strokeWidth={1}
            strokeLinecap="round"
            className="stroke-room-printer-frame-shade"
          />
          <rect
            x={-4}
            y={-3}
            width={7}
            height={9}
            className="fill-room-printer-tube"
          />
          <rect
            x={-8}
            y={2}
            width={5}
            height={3}
            className="fill-room-printer-tube"
          />
          <rect
            x={98}
            y={-3.5}
            width={12}
            height={9.5}
            strokeWidth={0.4}
            className="fill-room-printer-rail stroke-room-printer-frame-shade"
          />
          <text
            x={104}
            y={2.6}
            fontSize={3}
            textAnchor="middle"
            className="fill-room-printer-frame-shade font-sans font-medium"
          >
            A1
          </text>
        </g>

        {/* The toolhead: its face with the fan, the nozzle under it */}
        <g ref={head} transform={`translate(${IDLE.head} ${IDLE.gantry})`}>
          <rect
            x={-1.2}
            y={-14}
            width={2.4}
            height={3}
            className="fill-room-printer-tube"
          />
          <rect
            x={-7}
            y={-11}
            width={14}
            height={16}
            rx={1.2}
            strokeWidth={0.4}
            className="fill-room-printer-head stroke-room-printer-frame-shade"
          />
          <circle
            cx={0}
            cy={-3.6}
            r={3.4}
            fill="none"
            strokeWidth={0.6}
            className="stroke-room-printer-frame-shade"
          />
          <circle
            cx={0}
            cy={-3.6}
            r={1.3}
            className="fill-room-printer-frame-shade"
          />
          <path d="M-2 5H2L1 8.5H-1Z" className="fill-room-printer-nozzle" />
        </g>
      </svg>

      {/* Click him to choose */}
      <button
        type="button"
        aria-expanded={open}
        aria-label="Perry, my Bambu A1 3D printer: choose something for him to print"
        onClick={() => setOpen((was) => !was)}
        className={`absolute inset-y-0 ${focusRing}`}
        style={{
          left: `${(-PERRY_VIEW.x / PERRY_VIEW.w) * 100}%`,
          width: `${(110 / PERRY_VIEW.w) * 100}%`,
        }}
      />

      {open && (
        <div
          ref={popover}
          role="dialog"
          aria-label="Choose a print and a color"
          className="absolute bottom-full left-0 z-20 mb-2 w-72 border border-site-line bg-site-paper p-4 shadow-float ring-1 ring-black/5"
        >
          <p className="text-caption text-site-ink">
            Choose a print and a color, and Perry will print it for you.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {KINDS.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
                className={`flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-label uppercase transition-colors hover:border-site-blue hover:text-site-blue motion-reduce:transition-none ${focusRing} ${
                  kind === k
                    ? "border-site-blue text-site-blue"
                    : "border-site-line text-site-ink"
                }`}
              >
                <svg
                  viewBox="-18 -29 36 30"
                  aria-hidden="true"
                  className="h-3 w-3.5"
                >
                  <path
                    d={PRINTS[k].d}
                    fillRule="evenodd"
                    className="fill-current"
                  />
                </svg>
                {PRINTS[k].name}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {FILAMENTS.map(({ name }, i) => (
              <button
                key={name}
                type="button"
                aria-label={name}
                aria-pressed={color === i}
                onClick={() => setColor(i)}
                className={`h-6 w-6 border ${SWATCHES[i]} ${focusRing} ${
                  color === i
                    ? "border-site-blue outline outline-1 outline-site-blue"
                    : "border-site-line"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={print}
            disabled={color === null}
            className={`mt-4 border px-3 py-1.5 font-mono text-label uppercase transition-colors disabled:cursor-not-allowed disabled:border-site-line disabled:text-site-muted motion-reduce:transition-none ${focusRing} border-site-ink text-site-ink enabled:hover:border-site-blue enabled:hover:text-site-blue`}
          >
            {color === null ? "Pick a color" : "Print"}
          </button>
        </div>
      )}
    </div>
  );
}
