import { focusRing } from "@/components/site/links";
import DraggableCord from "./DraggableCord";
import LampSwitch from "./LampSwitch";
import PlugInDeck from "./PlugInDeck";
import OpusQuadLive from "./OpusQuadLive";
import { overviewBars, waveBands } from "./opusQuadArt";
import TiltingDeck from "./TiltingDeck";
import CameraOnShelf from "./Camera";
import LavaLamp from "./LavaLamp";
import Clock from "./Clock";
import Sway from "./Sway";
import CityWindow from "./CityWindow";
import Closet from "./Closet";
import { LAVA } from "./lavaShape";
import { MY_PHOTOS } from "./cameraPhotos";

// My old room. So far: the bookshelf, seen straight on (black metal posts
// that rise past the top board, five walnut boards), my lamp on the top
// board in five versions to compare (5 is a switch for dark mode), my
// snake plant beside it, books and a basket on the board below, and my
// headphones and DJ controller on the one below that.
// Everything is in viewBox units, so objects added later can be placed
// with the same numbers.

const BOARD = 16; // board thickness
const RAIL = 5; // metal under each board's sides
// The same open space above the top board (up to the tops of the posts),
// between boards, and below the bottom board.
const GAP = 80;
// Top of each board's front edge
const BOARDS = Array.from({ length: 5 }, (_, i) => GAP + i * (BOARD + GAP));
const SHELF = {
  left: 0,
  right: 260,
  top: 0,
  feet: BOARDS[BOARDS.length - 1] + BOARD + GAP,
  post: 7,
};

// Eye level sits at the top of the shelf, centered, so every board shows a
// sliver of its top. The back of the shelf is the front outline pulled
// toward it by DEPTH; 1 would draw the shelf flat.
const VP = { x: (SHELF.left + SHELF.right) / 2, y: SHELF.top };
const DEPTH = 1;

type Pt = [number, number];

function back(x: number, y: number): Pt {
  return [VP.x + (x - VP.x) * DEPTH, VP.y + (y - VP.y) * DEPTH];
}

function points(pts: Pt[]) {
  return pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

// A face from the front plane to the back plane: the segment a–b and its
// projection behind it.
function receding(a: Pt, b: Pt) {
  return points([a, b, back(...b), back(...a)]);
}

function Bookshelf() {
  const { left: L, right: R, top: T, feet: F, post: P } = SHELF;

  return (
    <g>
      {BOARDS.map((y) => (
        <g key={y}>
          {/* Rails under the board's sides, mostly hidden by its top */}
          <polygon
            points={receding([L + P, y + BOARD], [L + P, y + BOARD + RAIL])}
            className="fill-room-metal"
          />
          <polygon
            points={receding([R - P, y + BOARD], [R - P, y + BOARD + RAIL])}
            className="fill-room-metal"
          />
          <polygon
            points={receding([L, y], [R, y])}
            className="fill-room-wood-light"
          />
          <rect
            x={L}
            y={y}
            width={R - L}
            height={BOARD}
            className="fill-room-wood"
          />
        </g>
      ))}

      {/* Front posts */}
      <rect x={L} y={T} width={P} height={F - T} className="fill-room-metal" />
      <rect
        x={R - P}
        y={T}
        width={P}
        height={F - T}
        className="fill-room-metal"
      />
    </g>
  );
}

/* ---------- Disco balls ---------- */

// Deterministic noise in -0.5..0.5, so the mosaic is the same every render.
function jitter(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x) - 0.5;
}

// A circle as a path, so two can be combined with evenodd.
function circle(cx: number, cy: number, r: number) {
  return `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
}

// The first ball: a grid of silver mirror tiles in four tones.
const TILE = 5; // tile pitch
const TILE_TONES = [
  "fill-room-mirror",
  "fill-room-mirror/50",
  "fill-room-mirror/80",
  "fill-room-mirror/30",
];

function GridBall({
  cx,
  cy,
  r,
  id,
}: {
  cx: number;
  cy: number;
  r: number;
  id: string;
}) {
  const n = Math.ceil((2 * r) / TILE) + 1;
  const start = (c: number) => c - (n * TILE) / 2;
  return (
    <g>
      <clipPath id={id}>
        <circle cx={cx} cy={cy} r={r} />
      </clipPath>
      <circle cx={cx} cy={cy} r={r} className="fill-room-metal" />
      <g clipPath={`url(#${id})`}>
        {Array.from({ length: n * n }, (_, k) => {
          const i = Math.floor(k / n);
          const j = k % n;
          return (
            <rect
              key={k}
              x={start(cx) + j * TILE + 0.5}
              y={start(cy) + i * TILE + 0.5}
              width={TILE - 1}
              height={TILE - 1}
              className={TILE_TONES[(i * 3 + j * 2) % TILE_TONES.length]}
            />
          );
        })}
        {/* Shade on the lower right, so it reads round */}
        <circle
          cx={cx + r * 0.4}
          cy={cy + r * 0.4}
          r={r}
          className="fill-room-metal/40"
        />
      </g>
      {/* Glint */}
      <path
        d={`M${cx - 4} ${cy - 9}q0.6 2.4 3 3q-2.4 0.6 -3 3q-0.6 -2.4 -3 -3q2.4 -0.6 3 -3z`}
        className="fill-room-glow"
      />
    </g>
  );
}

// The mosaic ball, like the real one: broken glass, mostly plum, smoky
// brown and bronze, with some silver, wine and lilac.
const MOSAIC_R = 15;
const SHARD_COLORS = [
  "fill-room-disco-plum",
  "fill-room-disco-taupe",
  "fill-room-disco-bronze",
  "fill-room-mirror",
  "fill-room-disco-wine",
  "fill-room-disco-plum",
  "fill-room-disco-lilac",
  "fill-room-disco-taupe",
  "fill-room-disco-bronze",
  "fill-room-disco-plum",
  "fill-room-mirror",
];

// The shards, centered on (0, 0): a jittered grid cut into triangles and
// quads, wrapped onto a sphere so they crowd toward the edge, each pulled in
// a little to leave dark grout between them.
const SHARDS = (() => {
  const r = MOSAIC_R;
  const n = 6;
  const cell = (2 * r) / n;
  const vertex = (i: number, j: number): Pt => [
    -r + j * cell + jitter(i * 31 + j * 7 + 1) * cell * 0.6,
    -r + i * cell + jitter(i * 13 + j * 29 + 5) * cell * 0.6,
  ];
  const sphere = ([x, y]: Pt): Pt => {
    const d = Math.hypot(x, y);
    if (d === 0) return [0, 0];
    const k = (r * Math.sin((Math.min(d / r, 1) * Math.PI) / 2)) / d;
    return [x * k, y * k];
  };
  const shards: { points: string; color: string }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const a = vertex(i, j);
      const b = vertex(i, j + 1);
      const c = vertex(i + 1, j + 1);
      const d = vertex(i + 1, j);
      const seed = i * n + j;
      const cut = jitter(seed * 3 + 2);
      const pieces =
        cut < -0.15
          ? [
              [a, b, c],
              [a, c, d],
            ]
          : cut < 0.2
            ? [
                [a, b, d],
                [b, c, d],
              ]
            : [[a, b, c, d]];
      pieces.forEach((piece, k) => {
        const pts = piece.map(sphere);
        const mx = pts.reduce((sum, [x]) => sum + x, 0) / pts.length;
        const my = pts.reduce((sum, [, y]) => sum + y, 0) / pts.length;
        const color = Math.floor(
          (jitter(seed * 5 + k * 11 + 3) + 0.5) * SHARD_COLORS.length,
        );
        shards.push({
          points: points(
            pts.map(
              ([x, y]): Pt => [mx + (x - mx) * 0.86, my + (y - my) * 0.86],
            ),
          ),
          color: SHARD_COLORS[color],
        });
      });
    }
  }
  return shards;
})();

function MosaicBall({ cx, cy, id }: { cx: number; cy: number; id: string }) {
  const r = MOSAIC_R;
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <clipPath id={id}>
        <circle r={r} />
      </clipPath>
      <circle r={r} className="fill-room-metal" />
      <g clipPath={`url(#${id})`}>
        {SHARDS.map((shard) => (
          <polygon
            key={shard.points}
            points={shard.points}
            className={shard.color}
          />
        ))}
        {/* Shadow on the lower right, so it reads round */}
        <path
          d={circle(0, 0, r) + circle(-r * 0.3, -r * 0.3, r)}
          fillRule="evenodd"
          className="fill-room-metal/50"
        />
      </g>
      {/* Glint */}
      <path
        d="M-4 -9q0.6 2.4 3 3q-2.4 0.6 -3 3q-0.6 -2.4 -3 -3q2.4 -0.6 3 -3z"
        className="fill-room-glow"
      />
    </g>
  );
}

/* ---------- Lamps 1–3: brass stem up the middle ---------- */

// A brass disc base with a collar and a knob, a stem straight up the middle,
// a glass cylinder with the bulb on, and the disco ball hanging on a string
// just right of the stem. The three versions differ in the glass and ball:
// 1. see-through amber glass, small silver-grid ball
// 2. solid amber glass with the inside drawn faintly, bigger grid ball
// 3. clear glass with amber edges and bubble rings, mosaic ball
const STEM_LAMP = { x: 52, floor: BOARDS[0] }; // stem center, its board
const STEM_SHADE = { w: 64, h: 78, bottom: STEM_LAMP.floor - 69, rim: 5 };
const STEM_SHADE_TOP = STEM_SHADE.bottom - STEM_SHADE.h;

// Bubbles in the glass, as fractions of the shade's width and height.
const BUBBLES: [number, number, number][] = [
  [0.12, 0.1, 1.2],
  [0.3, 0.06, 0.8],
  [0.78, 0.12, 1],
  [0.9, 0.3, 1.3],
  [0.08, 0.36, 0.9],
  [0.22, 0.55, 1.3],
  [0.7, 0.5, 0.8],
  [0.86, 0.62, 1.1],
  [0.14, 0.78, 0.8],
  [0.4, 0.86, 1.2],
  [0.62, 0.78, 0.9],
  [0.94, 0.88, 0.8],
];

function StemLamp({ version, id }: { version: 1 | 2 | 3; id: string }) {
  const { x, floor } = STEM_LAMP;
  const { w, h, bottom, rim } = STEM_SHADE;
  const top = STEM_SHADE_TOP;
  const left = x - w / 2;
  const right = x + w / 2;
  const shade = `M${left} ${top}H${right}V${bottom}A${w / 2} ${rim} 0 0 1 ${left} ${bottom}Z`;
  const socket = 18; // socket height inside the top of the shade
  const bulb = { y: top + socket + 9, r: 9 };
  const r = version === 1 ? 12 : 15;
  const ball = { x: x + 9, y: bottom + rim + 8 + r };
  const baseTop = floor - 8;
  const collar = 8;

  const socketRect = (
    <rect
      x={x - 6}
      y={top}
      width={12}
      height={socket}
      className="fill-room-brass"
    />
  );

  return (
    <g>
      {version === 3 && <path d={shade} className="fill-room-glass-amber/25" />}
      {version !== 2 && socketRect}
      <rect
        x={x - 1.5}
        y={top + socket}
        width={3}
        height={baseTop - collar - top - socket}
        className="fill-room-brass"
      />
      <line
        x1={ball.x}
        y1={bottom - 6}
        x2={ball.x}
        y2={ball.y - r}
        strokeWidth={1}
        className="stroke-room-metal"
      />

      {version === 1 && <path d={shade} className="fill-room-glass-amber/80" />}
      {version === 2 && (
        <>
          <path d={shade} className="fill-room-glass-amber" />
          <g className="opacity-40">
            {socketRect}
            <rect
              x={x - 1.5}
              y={top + socket}
              width={3}
              height={h - socket + rim}
              className="fill-room-brass"
            />
            <line
              x1={ball.x}
              y1={bottom - 6}
              x2={ball.x}
              y2={bottom + rim}
              strokeWidth={1}
              className="stroke-room-metal"
            />
          </g>
        </>
      )}

      {version === 3 ? (
        <circle
          cx={x}
          cy={bulb.y}
          r={bulb.r * 1.8}
          className="fill-room-glow/50"
        />
      ) : (
        <circle
          cx={x}
          cy={bulb.y}
          r={bulb.r * 2}
          className="fill-room-glow/40"
        />
      )}
      <circle cx={x} cy={bulb.y} r={bulb.r} className="fill-room-glow" />

      {version === 3 ? (
        <>
          <path
            d={shade}
            fill="none"
            strokeWidth={1.2}
            className="stroke-room-glass-amber"
          />
          <path
            d={`M${left} ${bottom}A${w / 2} ${rim} 0 0 1 ${right} ${bottom}`}
            fill="none"
            strokeWidth={1}
            className="stroke-room-glass-amber/60"
          />
          {BUBBLES.map(([fx, fy, br]) => (
            <circle
              key={`${fx}-${fy}`}
              cx={left + fx * w}
              cy={top + fy * h}
              r={br}
              fill="none"
              strokeWidth={0.6}
              className="stroke-room-glass-amber"
            />
          ))}
        </>
      ) : (
        BUBBLES.map(([fx, fy, br]) => (
          <circle
            key={`${fx}-${fy}`}
            cx={left + fx * w}
            cy={top + fy * h}
            r={br}
            className="fill-room-glow/70"
          />
        ))
      )}

      {/* Base: brass disc, the collar around the stem, and a knob */}
      <rect
        x={x - 31}
        y={baseTop}
        width={62}
        height={8}
        rx={3}
        className="fill-room-brass"
      />
      <rect
        x={x - 27}
        y={baseTop + 1.5}
        width={54}
        height={1.5}
        className="fill-room-glow/50"
      />
      <rect
        x={x - 3.5}
        y={baseTop - collar}
        width={7}
        height={collar}
        className="fill-room-brass"
      />
      <rect
        x={x - 14}
        y={baseTop - 5}
        width={6}
        height={5}
        className="fill-room-brass"
      />

      {version === 3 ? (
        <MosaicBall cx={ball.x} cy={ball.y} id={id} />
      ) : (
        <GridBall cx={ball.x} cy={ball.y} r={r} id={id} />
      )}
    </g>
  );
}

/* ---------- Lamp 4: the arm lamp ---------- */

// Side on, like the real lamp: a brass disc base, a pole that curves over
// into an arm, and a clear glass cylinder hanging from a cap at the end of
// the arm, with a filament bulb inside. The mosaic ball hangs below.
const ARM_LAMP = { x: 38, floor: BOARDS[0] }; // x: the pole; floor: its board
const ARM_BASE = { w: 56, h: 7 };
const POLE = 6; // pole and arm thickness
const BEND = 10; // radius where the pole curves into the arm
const ARM_SHADE = { w: 60, h: 68, rim: 5 };
const ARM_SHADE_X = ARM_LAMP.x + 36; // center of the shade, out along the arm
const ARM_SHADE_BOTTOM = ARM_LAMP.floor - ARM_BASE.h - 54;
const ARM_SHADE_TOP = ARM_SHADE_BOTTOM - ARM_SHADE.h;
const CAP = { w: 22, h: 16 }; // the cap the shade hangs from
const ARM_Y = ARM_SHADE_TOP - CAP.h - 9; // centerline of the arm
const ARM_END = ARM_SHADE_X + 24;
const ARM_LAMP_TOP = ARM_Y - POLE / 2 - 3; // the cap's rod pokes above the arm

function ArmLamp({ id }: { id: string }) {
  const { x, floor } = ARM_LAMP;
  const cx = ARM_SHADE_X;
  const top = ARM_SHADE_TOP;
  const bottom = ARM_SHADE_BOTTOM;
  const left = cx - ARM_SHADE.w / 2;
  const right = cx + ARM_SHADE.w / 2;
  const rx = ARM_SHADE.w / 2;
  const ry = ARM_SHADE.rim;
  const capTop = top - CAP.h + 2;
  const bulb = { y: top + ARM_SHADE.h * 0.45, rx: 6, ry: 8 };
  const ball = { x: cx - 9, y: bottom + ARM_SHADE.rim + 4 + MOSAIC_R };
  const baseTop = floor - ARM_BASE.h;

  return (
    <g>
      {/* Pole, curving over into the arm, and the arm's end cap */}
      <path
        d={`M${x} ${baseTop}V${ARM_Y + BEND}Q${x} ${ARM_Y} ${x + BEND} ${ARM_Y}H${ARM_END}`}
        fill="none"
        strokeWidth={POLE}
        className="stroke-room-brass"
      />
      <rect
        x={ARM_END - 2}
        y={ARM_Y - 4.5}
        width={7}
        height={9}
        rx={1.5}
        className="fill-room-brass"
      />

      {/* Back of the glass: a faint tint and the far side of both rims */}
      <path
        d={`M${left} ${top}A${rx} ${ry} 0 0 1 ${right} ${top}V${bottom}A${rx} ${ry} 0 0 1 ${left} ${bottom}Z`}
        className="fill-room-glass/15"
      />
      <path
        d={`M${left} ${top}A${rx} ${ry} 0 0 1 ${right} ${top}M${left} ${bottom}A${rx} ${ry} 0 0 1 ${right} ${bottom}`}
        fill="none"
        strokeWidth={1}
        className="stroke-room-glass/50"
      />

      {/* Inside: the socket, the bulb with its filament, the disco ball's
          string */}
      <rect
        x={cx - 4}
        y={top}
        width={8}
        height={bulb.y - bulb.ry - top + 2}
        className="fill-room-brass"
      />
      <line
        x1={ball.x}
        y1={top}
        x2={ball.x}
        y2={ball.y - MOSAIC_R}
        strokeWidth={1}
        className="stroke-room-metal"
      />
      <circle cx={cx} cy={bulb.y} r={16} className="fill-room-glow/50" />
      <ellipse
        cx={cx}
        cy={bulb.y}
        rx={bulb.rx}
        ry={bulb.ry}
        className="fill-room-glow"
      />
      <path
        d={`M${cx - 2} ${bulb.y - 6}V${bulb.y + 2}Q${cx} ${bulb.y + 5} ${cx + 2} ${bulb.y + 2}V${bulb.y - 6}`}
        fill="none"
        strokeWidth={1}
        className="stroke-room-brass"
      />

      {/* Front of the glass: its sides and the near side of both rims */}
      <path
        d={`M${left} ${top}V${bottom}A${rx} ${ry} 0 0 0 ${right} ${bottom}V${top}A${rx} ${ry} 0 0 1 ${left} ${top}`}
        fill="none"
        strokeWidth={1.2}
        className="stroke-room-glass"
      />

      {/* The cap on top of the shade, and its rod up through the arm */}
      <rect
        x={cx - 4}
        y={ARM_LAMP_TOP}
        width={8}
        height={capTop - ARM_LAMP_TOP}
        className="fill-room-brass"
      />
      <rect
        x={cx - CAP.w / 2}
        y={capTop}
        width={CAP.w}
        height={CAP.h}
        rx={1.5}
        className="fill-room-brass"
      />

      {/* Base: brass disc, with a collar where the pole meets it */}
      <rect
        x={x - ARM_BASE.w / 2}
        y={baseTop}
        width={ARM_BASE.w}
        height={ARM_BASE.h}
        rx={3}
        className="fill-room-brass"
      />
      <rect
        x={x - ARM_BASE.w / 2 + 4}
        y={baseTop + 1.5}
        width={ARM_BASE.w - 8}
        height={1.5}
        className="fill-room-glow/50"
      />
      <rect
        x={x - 5}
        y={baseTop - 5}
        width={10}
        height={5}
        className="fill-room-brass"
      />

      <MosaicBall cx={ball.x} cy={ball.y} id={id} />
    </g>
  );
}

/* ---------- Lamp 5: lamp 1 as a switch ---------- */

// Lamp 1, drawn as flat as lamp 1, with a round bulb with a little U
// filament, and the mosaic ball on a string that runs up inside the shade to
// the top. The shade is drawn over everything inside it, so the stem, rod
// and bulb show through dimly. Room draws it off: a frosted shade with light
// bubbles and the bulb dark. LampSwitch shows the light on top when it's
// clicked: the bulb on, lamp 1's lit amber shade and bubbles with a halo
// shining through, and a glow around it, with the page in dark mode.
const SWITCH_BULB = {
  x: STEM_LAMP.x,
  y: STEM_SHADE_TOP + STEM_SHADE.h * 0.45,
  r: 8,
};
const SWITCH_SHADE = (() => {
  const { x } = STEM_LAMP;
  const { w, bottom, rim } = STEM_SHADE;
  return `M${x - w / 2} ${STEM_SHADE_TOP}H${x + w / 2}V${bottom}A${w / 2} ${rim} 0 0 1 ${x - w / 2} ${bottom}Z`;
})();

// A gold rod or post, drawn as cartoon metal: a soft light stripe down the
// left and a soft shadow down the right edge.
function GoldBar({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} className="fill-room-gold" />
      <rect
        x={x + w * 0.2}
        y={y}
        width={w * 0.22}
        height={h}
        className="fill-room-gold-light/50"
      />
      <rect
        x={x + w * 0.78}
        y={y}
        width={w * 0.22}
        height={h}
        className="fill-room-gold-dark/40"
      />
    </>
  );
}

// The bulb: a gold rod from the top of the shade, a round bulb, and its
// little U filament. Off, the glass is pale; on, it glows.
function Bulb({ on }: { on: boolean }) {
  const { x, y, r } = SWITCH_BULB;
  return (
    <>
      <GoldBar
        x={x - 4}
        y={STEM_SHADE_TOP}
        w={8}
        h={y - r - STEM_SHADE_TOP + 2}
      />
      <circle
        cx={x}
        cy={y}
        r={r}
        strokeWidth={on ? 0 : 0.8}
        className={on ? "fill-room-glow" : "fill-room-frost stroke-room-glass"}
      />
      <path
        d={`M${x - 2} ${y - 5}V${y + 1}Q${x} ${y + 4} ${x + 2} ${y + 1}V${y - 5}`}
        fill="none"
        strokeWidth={1}
        className="stroke-room-gold-dark"
      />
    </>
  );
}

function SwitchLamp({ id }: { id: string }) {
  const { x, floor } = STEM_LAMP;
  const { w, h, bottom, rim } = STEM_SHADE;
  const top = STEM_SHADE_TOP;
  const left = x - w / 2;
  const ball = { x: x + 9, y: bottom + rim + 8 + MOSAIC_R };
  const baseTop = floor - 8;
  const collar = 8;

  return (
    <g>
      {/* Inside the shade: the stem, the disco ball's string, the bulb */}
      <GoldBar x={x - 1.5} y={top} w={3} h={baseTop - collar - top} />
      <line
        x1={ball.x}
        y1={top}
        x2={ball.x}
        y2={ball.y - MOSAIC_R}
        strokeWidth={1}
        className="stroke-room-metal"
      />
      <Bulb on={false} />

      {/* Frosted shade, flat like lamp 1's, with light bubbles */}
      <path d={SWITCH_SHADE} className="fill-room-mirror/75" />
      {BUBBLES.map(([fx, fy, r]) => (
        <circle
          key={`${fx}-${fy}`}
          cx={left + fx * w}
          cy={top + fy * h}
          r={r}
          className="fill-room-frost"
        />
      ))}

      {/* Base: gold disc, softly lit along the top and shaded along the
          bottom, the collar around the stem, and a knob */}
      <rect
        x={x - 31}
        y={baseTop}
        width={62}
        height={8}
        rx={3}
        className="fill-room-gold"
      />
      <rect
        x={x - 28}
        y={baseTop + 5.5}
        width={56}
        height={2.5}
        rx={1.25}
        className="fill-room-gold-dark/40"
      />
      <rect
        x={x - 27}
        y={baseTop + 1.5}
        width={54}
        height={1.5}
        rx={0.75}
        className="fill-room-gold-light/50"
      />
      <GoldBar x={x - 3.5} y={baseTop - collar} w={7} h={collar} />
      <GoldBar x={x - 14} y={baseTop - 5} w={6} h={5} />

      <MosaicBall cx={ball.x} cy={ball.y} id={id} />
    </g>
  );
}

// Lamp 1 lit, drawn over the frosted lamp when it's on: the bulb on, the
// amber shade over it, and a halo shining through the glass.
function SwitchLampLight() {
  const { w, h } = STEM_SHADE;
  const left = STEM_LAMP.x - w / 2;
  const bulb = SWITCH_BULB;
  return (
    <g>
      <Bulb on />
      <path d={SWITCH_SHADE} className="fill-room-glass-amber/75" />
      <circle
        cx={bulb.x}
        cy={bulb.y}
        r={bulb.r * 2.2}
        className="fill-room-glow/45"
      />
      {BUBBLES.map(([fx, fy, r]) => (
        <circle
          key={`${fx}-${fy}`}
          cx={left + fx * w}
          cy={STEM_SHADE_TOP + fy * h}
          r={r}
          className="fill-room-glow/70"
        />
      ))}
    </g>
  );
}

/* ---------- Snake plant ---------- */

// My snake plant, traced from a photo of it: tall sword leaves in olive
// green with pale zigzag bands, a big banded paddle in front, in a tall
// white pot. It stands on the right of the top board, drawn at the same
// scale to the lamp as in the photo.
//
// Each leaf is in the photo's coordinates (2000 wide): its left edge from
// the base up to the tip, then its right edge back down. Tips cut off by
// the top of the photo are carried on along the leaf. Back to front.
type TracedLeaf = {
  left: Pt[];
  tip: Pt;
  right: Pt[];
  shade: "back" | "mid" | "yellow" | "front";
};
const LEAVES: TracedLeaf[] = [
  // Tall, leaning right
  {
    shade: "back",
    left: [
      [1405, 495],
      [1410, 350],
      [1418, 257],
      [1432, 171],
      [1450, 110],
      [1465, 80],
      [1485, 40],
      [1514, 0],
    ],
    tip: [1540, -25],
    right: [
      [1532, 0],
      [1521, 20],
      [1507, 40],
      [1494, 60],
      [1490, 80],
      [1488, 110],
      [1460, 171],
      [1438, 257],
      [1420, 350],
      [1412, 495],
    ],
  },
  // Beside it, a little shorter
  {
    shade: "back",
    left: [
      [1395, 495],
      [1402, 257],
      [1408, 171],
      [1418, 120],
      [1433, 100],
      [1449, 80],
      [1458, 60],
      [1474, 40],
      [1486, 20],
    ],
    tip: [1492, 8],
    right: [
      [1495, 20],
      [1482, 45],
      [1470, 60],
      [1458, 100],
      [1450, 120],
      [1430, 171],
      [1415, 257],
      [1405, 495],
    ],
  },
  // Tall and nearly straight, in the middle
  {
    shade: "back",
    left: [
      [1378, 495],
      [1378, 350],
      [1380, 250],
      [1381, 160],
      [1384, 120],
      [1388, 80],
      [1396, 40],
      [1404, 0],
    ],
    tip: [1414, -25],
    right: [
      [1419, 0],
      [1416, 40],
      [1411, 80],
      [1408, 120],
      [1406, 160],
      [1405, 250],
      [1402, 350],
      [1398, 495],
    ],
  },
  // Long, leaning far left
  {
    shade: "mid",
    left: [
      [1345, 495],
      [1340, 450],
      [1330, 400],
      [1318, 350],
      [1305, 300],
      [1290, 250],
      [1262, 200],
      [1236, 150],
      [1212, 100],
      [1190, 50],
      [1160, 20],
      [1148, 0],
    ],
    tip: [1130, -30],
    right: [
      [1170, 0],
      [1188, 20],
      [1224, 50],
      [1250, 100],
      [1280, 150],
      [1313, 200],
      [1336, 250],
      [1345, 300],
      [1350, 350],
      [1353, 400],
      [1356, 450],
      [1360, 495],
    ],
  },
  // Thin and yellow-green, along the long left one
  {
    shade: "yellow",
    left: [
      [1338, 495],
      [1322, 400],
      [1296, 300],
      [1278, 250],
      [1250, 200],
      [1225, 150],
      [1200, 100],
      [1186, 80],
    ],
    tip: [1183, 71],
    right: [
      [1192, 80],
      [1210, 100],
      [1236, 150],
      [1262, 200],
      [1290, 250],
      [1306, 300],
      [1332, 400],
      [1346, 495],
    ],
  },
  // Yellow-green, between the long left one and the hooked one
  {
    shade: "yellow",
    left: [
      [1338, 495],
      [1330, 420],
      [1315, 350],
      [1305, 300],
      [1295, 240],
      [1290, 200],
    ],
    tip: [1287, 172],
    right: [
      [1300, 195],
      [1312, 240],
      [1328, 300],
      [1340, 360],
      [1347, 420],
      [1350, 495],
    ],
  },
  // Tall, with a hooked tip
  {
    shade: "mid",
    left: [
      [1352, 495],
      [1350, 350],
      [1347, 250],
      [1348, 160],
      [1346, 140],
      [1338, 100],
      [1335, 70],
      [1327, 45],
    ],
    tip: [1322, 25],
    right: [
      [1343, 48],
      [1352, 60],
      [1362, 80],
      [1366, 100],
      [1373, 120],
      [1378, 140],
      [1380, 250],
      [1376, 350],
      [1370, 495],
    ],
  },
  // Low on the left, its thin tip curling up
  {
    shade: "mid",
    left: [
      [1325, 500],
      [1310, 475],
      [1285, 440],
      [1260, 400],
      [1235, 365],
      [1215, 330],
      [1203, 300],
    ],
    tip: [1197, 270],
    right: [
      [1206, 298],
      [1220, 325],
      [1232, 338],
      [1250, 348],
      [1275, 355],
      [1300, 372],
      [1320, 392],
      [1335, 410],
      [1345, 450],
      [1350, 495],
    ],
  },
  // Short, pointing right
  {
    shade: "mid",
    left: [
      [1395, 480],
      [1415, 410],
      [1432, 375],
      [1450, 355],
      [1467, 340],
    ],
    tip: [1482, 331],
    right: [
      [1478, 352],
      [1468, 378],
      [1455, 400],
      [1440, 425],
      [1425, 450],
      [1410, 475],
      [1402, 497],
    ],
  },
  // The big banded paddle in front
  {
    shade: "front",
    left: [
      [1362, 497],
      [1352, 483],
      [1346, 447],
      [1342, 413],
      [1342, 380],
      [1350, 347],
      [1367, 313],
      [1387, 280],
    ],
    tip: [1406, 255],
    right: [
      [1420, 297],
      [1428, 330],
      [1432, 363],
      [1430, 397],
      [1420, 430],
      [1410, 463],
      [1400, 483],
      [1395, 497],
    ],
  },
];
// Each round of changes to the plant is a new version on the next shelf,
// so the earlier ones stay to look back on:
// 1. traced from the shelf photo, in a guessed plain white pot
// 2. in the real pot, from a photo of it, with the leaves down in the soil
export type PlantVersion = 1 | 2;

// The pot, centered under the leaves with its rim at y 505 and its foot on
// the shelf at y 700. Only a sliver of it shows in the shelf photo; version
// 2's shape comes from a photo of the pot itself, about as wide as it is
// tall.
const PHOTO_POT = { x: 1372, top: 505, floor: 700, w: { 1: 214, 2: 205 } };

const PLANT = { x: 200, floor: BOARDS[0] };
const PLANT_SCALE = 0.21; // the lamp is about 0.21 of its size in the photo

// From the photo's coordinates to the drawing's.
const traced = ([x, y]: Pt): Pt => [
  PLANT.x + (x - PHOTO_POT.x) * PLANT_SCALE,
  PLANT.floor + (y - PHOTO_POT.floor) * PLANT_SCALE,
];

const PLANT_TOP =
  Math.min(
    ...LEAVES.flatMap((leaf) =>
      [leaf.tip, ...leaf.left, ...leaf.right].map((p) => traced(p)[1]),
    ),
  ) - 2;

// A smooth line through traced points that passes through every one of
// them (a Catmull-Rom curve, as cubic Béziers). It continues from wherever
// the path is, which must be the first point.
function smoothThrough(pts: Pt[]) {
  const n = (v: number) => v.toFixed(1);
  const at = (i: number) => pts[Math.max(0, Math.min(pts.length - 1, i))];
  let d = "";
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${n(c1[0])} ${n(c1[1])} ${n(c2[0])} ${n(c2[1])} ${n(p2[0])} ${n(p2[1])}`;
  }
  return d;
}

// Evens out small wobbles in hand-traced points by averaging each with its
// neighbors, keeping the two ends where they are.
function steady(pts: Pt[]): Pt[] {
  return pts.map((p, i) =>
    i === 0 || i === pts.length - 1
      ? p
      : [
          (pts[i - 1][0] + 2 * p[0] + pts[i + 1][0]) / 4,
          (pts[i - 1][1] + 2 * p[1] + pts[i + 1][1]) / 4,
        ],
  );
}

// A leaf's outline: smooth up its left edge to a sharp tip and back down
// its right edge. With intoSoil, its base reaches down into the soil, under
// the front of the pot's rim.
function leafOutline({ left, tip, right }: TracedLeaf, intoSoil: boolean) {
  const soil = traced([0, PHOTO_POT.top])[1] + 1.5;
  const sink = ([x, y]: Pt): Pt => [x, intoSoil ? Math.max(y, soil) : y];
  const up = steady([...left, tip].map(traced));
  const down = steady([tip, ...right].map(traced));
  up[0] = sink(up[0]);
  down[down.length - 1] = sink(down[down.length - 1]);
  const [x0, y0] = up[0];
  return `M${x0.toFixed(1)} ${y0.toFixed(1)}${smoothThrough(up)}${smoothThrough(down)}Z`;
}

const LEAF_FILL = {
  back: "fill-room-plant-dark",
  mid: "fill-room-plant",
  yellow: "fill-room-plant-yellow",
  front: "fill-room-plant",
};
// Pale bands on the green leaves; dark mottling on the yellow ones.
const BAND_STROKE = {
  back: "stroke-room-plant-light/25",
  mid: "stroke-room-plant-light/35",
  yellow: "stroke-room-plant-dark/30",
  front: "stroke-room-plant-light/55",
};

// Soft wavy bands across a leaf, square to its length and clipped to it,
// unevenly spaced and each a little different, like the real markings.
function LeafBands({ leaf, seed }: { leaf: TracedLeaf; seed: number }) {
  const [bx, by] = traced([
    (leaf.left[0][0] + leaf.right[leaf.right.length - 1][0]) / 2,
    (leaf.left[0][1] + leaf.right[leaf.right.length - 1][1]) / 2,
  ]);
  const [tx, ty] = traced(leaf.tip);
  const len = Math.hypot(tx - bx, ty - by);
  const [ux, uy] = [(tx - bx) / len, (ty - by) / len];
  const [nx, ny] = [-uy, ux];
  // A point t along the leaf and s across it.
  const at = (t: number, s: number) =>
    `${(bx + ux * t + nx * s).toFixed(1)} ${(by + uy * t + ny * s).toFixed(1)}`;
  const bands: { t: number; wave: number; width: number }[] = [];
  for (let t = 3, i = 0; t < len - 4; i++) {
    bands.push({
      t,
      wave: 0.6 + (jitter(seed * 97 + i * 13) + 0.5) * 0.9,
      width: 1.2 + (jitter(seed * 31 + i * 7) + 0.5) * 1.1,
    });
    t += 3.6 + (jitter(seed * 53 + i * 11) + 0.5) * 2.4;
  }
  return (
    <g fill="none" strokeLinecap="round" className={BAND_STROKE[leaf.shade]}>
      {bands.map(({ t, wave, width }) => (
        <path
          key={t}
          strokeWidth={width}
          d={`M${at(t, -14)}Q${at(t - wave * 2, -7)} ${at(t, 0)}T${at(t, 14)}`}
        />
      ))}
    </g>
  );
}

function Leaves({ id, intoSoil }: { id: string; intoSoil: boolean }) {
  return (
    <>
      {LEAVES.map((leaf, i) => {
        const d = leafOutline(leaf, intoSoil);
        return (
          <g key={i}>
            <clipPath id={`${id}-${i}`}>
              <path d={d} />
            </clipPath>
            <path d={d} className={LEAF_FILL[leaf.shade]} />
            <g clipPath={`url(#${id}-${i})`}>
              <LeafBands leaf={leaf} seed={i + 1} />
            </g>
          </g>
        );
      })}
    </>
  );
}

function SnakePlant({ id, version }: { id: string; version: PlantVersion }) {
  const { x, floor } = PLANT;
  const w = PHOTO_POT.w[version] * PLANT_SCALE; // rim width
  const top = traced([0, PHOTO_POT.top])[1]; // rim

  if (version === 1) {
    // A plain white pot, a little narrower at the foot, with a rim.
    return (
      <g>
        <Leaves id={id} intoSoil={false} />
        <path
          d={`M${x - w / 2} ${top}H${x + w / 2}L${x + w * 0.44} ${floor}H${x - w * 0.44}Z`}
          className="fill-room-pot-white"
        />
        <rect
          x={x - w / 2 - 1}
          y={top - 1}
          width={w + 2}
          height={4}
          rx={1}
          className="fill-room-pot-white"
        />
        <rect
          x={x - w / 2}
          y={top + 3}
          width={w}
          height={1}
          className="fill-room-pot-white-shade"
        />
        <rect
          x={x - w * 0.44}
          y={floor - 2}
          width={w * 0.88}
          height={2}
          className="fill-room-pot-white-shade"
        />
      </g>
    );
  }

  const h = floor - top;
  const half = w / 2;
  const lip = 3; // the rim's rounded lip
  // Cream ceramic, widest at the flared rim, tapering in a gentle curve to a
  // foot about 60% as wide, with rounded bottom corners.
  const body = `M${x - half * 0.95} ${top + lip}C${x - half * 0.95} ${top + h * 0.45} ${x - half * 0.8} ${top + h * 0.8} ${x - half * 0.63} ${floor - 2}Q${x - half * 0.6} ${floor} ${x - half * 0.5} ${floor}H${x + half * 0.5}Q${x + half * 0.6} ${floor} ${x + half * 0.63} ${floor - 2}C${x + half * 0.8} ${top + h * 0.8} ${x + half * 0.95} ${top + h * 0.45} ${x + half * 0.95} ${top + lip}Z`;
  const rim = `${half} ${lip}`;

  return (
    <g>
      {/* The rim's top and the soil inside it, behind the leaves */}
      <ellipse cx={x} cy={top} rx={half} ry={lip} className="fill-room-pot" />
      <ellipse
        cx={x}
        cy={top + 0.4}
        rx={half - 2.4}
        ry={lip - 1.5}
        className="fill-room-pot-soil"
      />

      <Leaves id={id} intoSoil />

      {/* The pot: body, then the blush stripe and blue-grey foot near the
          bottom, kept inside the body */}
      <clipPath id={`${id}-pot`}>
        <path d={body} />
      </clipPath>
      <path d={body} className="fill-room-pot" />
      <g clipPath={`url(#${id}-pot)`}>
        <rect
          x={x - half}
          y={floor - h * 0.09}
          width={w}
          height={h * 0.03}
          className="fill-room-pot-band"
        />
        <rect
          x={x - half}
          y={floor - h * 0.06}
          width={w}
          height={h * 0.06}
          className="fill-room-pot-foot"
        />
      </g>

      {/* The front of the rim's lip, over the bases of the leaves */}
      <path
        d={`M${x - half} ${top}A${rim} 0 0 0 ${x + half} ${top}V${top + lip - 0.5}A${rim} 0 0 1 ${x - half} ${top + lip - 0.5}Z`}
        className="fill-room-pot"
      />
    </g>
  );
}

/* ---------- Books ---------- */

// Books stand on the second board, like on the real shelf, each drawn as
// its spine, straight on, from photos of my copies. Hovering a book pulls
// it out of the row, one at a time. Versions, like the plant:
// 1. one book to start, Thinking, Fast and Slow, lifting up on hover
// 2. a full shelf, each book coming out toward you and turning to show
//    its front cover
// 3. the same, opening bigger, with the books touching and an open book
//    letting the pointer through, so you can run along the row and open
//    each in turn
// 4. the same books made to look real and read: a faint grain for cloth,
//    leather and paper, faded, scuffed and worn, with light and shade, and
//    opening big enough to read, above the row
// 5. the same as 4, with the spines on the shelf a little dimmer and less
//    colorful, so the row is calmer; a cover still comes out in full color
export type BooksVersion = 1 | 2 | 3 | 4 | 5;

const BOOK_BOARD = BOARDS[1]; // top of the board the books stand on
const BOOK_LIFT = 10; // how far a hovered book comes up out of the row

// Text running down a spine (the way spine titles read), centered across
// x, starting at y and stretched to fill `length`.
function SpineText({
  x,
  y,
  length,
  size,
  className = "fill-room-metal",
  children,
}: {
  x: number;
  y: number;
  length: number;
  size: number;
  className?: string;
  children: string;
}) {
  return (
    <text
      transform={`translate(${x - size * 0.35} ${y}) rotate(90)`}
      fontSize={size}
      textLength={length}
      lengthAdjust="spacingAndGlyphs"
      className={`${className} font-serif`}
    >
      {children}
    </text>
  );
}

// Thinking, Fast and Slow by Daniel Kahneman: a cream paperback spine, the
// title and author in black serif capitals running down it, and between
// them the yellow pencil, point up, with its black band and pink eraser.
const THINKING = { w: 9, h: 50 };

function ThinkingFastAndSlow() {
  const { w, h } = THINKING;
  const pencil = { x: w * 0.46, top: h * 0.38, bottom: h * 0.62, w: 1.5 };
  return (
    <>
      <rect width={w} height={h} rx={0.6} className="fill-room-book-paper" />
      <SpineText x={w * 0.66} y={h * 0.09} length={h * 0.25} size={2}>
        THINKING,
      </SpineText>
      <SpineText x={w * 0.3} y={h * 0.11} length={h * 0.25} size={2}>
        FAST AND SLOW
      </SpineText>

      {/* The pencil: graphite, sharpened wood, yellow body, band, eraser */}
      <path
        d={`M${pencil.x} ${pencil.top}L${pencil.x + pencil.w / 2} ${pencil.top + 2.6}H${pencil.x - pencil.w / 2}Z`}
        className="fill-room-pot"
      />
      <path
        d={`M${pencil.x} ${pencil.top}L${pencil.x + 0.35} ${pencil.top + 0.9}H${pencil.x - 0.35}Z`}
        className="fill-room-metal"
      />
      <rect
        x={pencil.x - pencil.w / 2}
        y={pencil.top + 2.6}
        width={pencil.w}
        height={pencil.bottom - pencil.top - 4.6}
        className="fill-room-book-pencil"
      />
      <rect
        x={pencil.x - pencil.w / 2}
        y={pencil.bottom - 2}
        width={pencil.w}
        height={1}
        className="fill-room-metal"
      />
      <rect
        x={pencil.x - pencil.w / 2}
        y={pencil.bottom - 1}
        width={pencil.w}
        height={1}
        rx={0.4}
        className="fill-room-book-eraser"
      />

      <SpineText x={w * 0.62} y={h * 0.68} length={h * 0.11} size={1.7}>
        DANIEL
      </SpineText>
      <SpineText x={w * 0.36} y={h * 0.68} length={h * 0.16} size={1.7}>
        KAHNEMAN
      </SpineText>
      <rect
        x={w / 2 - 1.2}
        y={h * 0.9}
        width={2.4}
        height={1.6}
        rx={0.3}
        className="fill-room-metal/70"
      />
    </>
  );
}

// A book standing on the board at x, drawn by `children` in a w by h box.
// The hover area stays put (and covers the lifted spot), so a book doesn't
// jitter when the pointer is near its bottom as it rises.
function ShelfBook({
  x,
  w,
  h,
  title,
  children,
}: {
  x: number;
  w: number;
  h: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <g
      transform={`translate(${x} ${BOOK_BOARD - h})`}
      className="group pointer-events-auto"
    >
      <title>{title}</title>
      <rect
        y={-BOOK_LIFT}
        width={w}
        height={h + BOOK_LIFT}
        fill="transparent"
      />
      <g className="origin-bottom transition-transform duration-300 ease-switch [transform-box:fill-box] group-hover:-translate-y-2.5 group-hover:scale-[1.08] motion-reduce:transition-none">
        {children}
      </g>
    </g>
  );
}

// The front cover of Thinking, Fast and Slow, in a 33 by 50 box: cream,
// the title in black serif capitals, the yellow pencil standing in the
// middle, and the author at the foot.
function ThinkingFastAndSlowCover() {
  const pencil = { x: 16.5, top: 18, bottom: 37, w: 2.4 };
  return (
    <>
      <rect width={33} height={50} className="fill-room-book-paper" />
      <text
        x={16.5}
        y={8.5}
        fontSize={3.4}
        textAnchor="middle"
        textLength={20}
        lengthAdjust="spacingAndGlyphs"
        className="fill-room-metal font-serif"
      >
        THINKING,
      </text>
      <text
        x={16.5}
        y={13.4}
        fontSize={3.4}
        textAnchor="middle"
        textLength={27}
        lengthAdjust="spacingAndGlyphs"
        className="fill-room-metal font-serif"
      >
        FAST AND SLOW
      </text>
      <path
        d={`M${pencil.x} ${pencil.top}L${pencil.x + pencil.w / 2} ${pencil.top + 4}H${pencil.x - pencil.w / 2}Z`}
        className="fill-room-pot"
      />
      <path
        d={`M${pencil.x} ${pencil.top}L${pencil.x + 0.55} ${pencil.top + 1.4}H${pencil.x - 0.55}Z`}
        className="fill-room-metal"
      />
      <rect
        x={pencil.x - pencil.w / 2}
        y={pencil.top + 4}
        width={pencil.w}
        height={pencil.bottom - pencil.top - 7}
        className="fill-room-book-pencil"
      />
      <rect
        x={pencil.x - pencil.w / 2}
        y={pencil.bottom - 3}
        width={pencil.w}
        height={1.5}
        className="fill-room-metal"
      />
      <rect
        x={pencil.x - pencil.w / 2}
        y={pencil.bottom - 1.5}
        width={pencil.w}
        height={1.5}
        rx={0.6}
        className="fill-room-book-eraser"
      />
      <text
        x={16.5}
        y={45}
        fontSize={2.4}
        textAnchor="middle"
        textLength={21}
        lengthAdjust="spacingAndGlyphs"
        className="fill-room-metal font-serif"
      >
        DANIEL KAHNEMAN
      </text>
    </>
  );
}

// Books 2 and 3 turn to show their covers. Each is HTML laid over the
// drawing, since turning in 3D needs CSS 3D transforms, which SVG doesn't
// have: a spine facing out with the front cover on its right side, edge on.
// Hovering pulls the book out toward you (bigger, lifted, slid so its cover
// will center where the spine stood), then turns it a quarter so the cover
// faces you. Moving away turns it back first, then slides it home.
type BookSpec = {
  title: string; // for the tooltip
  w: number; // spine width
  h: number; // height
  d: number; // cover width
  spine: React.ReactNode; // drawn in a w by h box, or spineBox
  cover: React.ReactNode; // drawn in a d by h box, or coverBox
  spineBox?: [number, number];
  coverBox?: [number, number];
  material: Material; // what it's bound in, for book 4's finish
  unscratched?: boolean; // an old book left without the finish's scratches
  dark?: boolean; // a dark book: pale grain, and faded without yellowing
};

// How a pulled book comes out: how much bigger and how far its foot comes
// up off the board. Book 2 holds open while the pointer is anywhere on its
// cover; book 3 opens bigger and lets the pointer pass through to the books
// beside and under it.
const PULL = {
  hold: { scale: 1.6, lift: 6 },
  sweep: { scale: 2.2, lift: 6 },
};
// Book 4 opens big enough to read: every cover to this height, whatever
// the book's size, held up above the row so the spines stay in view.
const READ_HEIGHT = 280;
const READ_ABOVE = BOOK_BOARD - (BOARDS[0] + BOARD); // the top of the gap above the books

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

function TurningBook({
  x,
  book,
  sweep = false,
  finish = false,
  read = false,
  dim = false,
}: {
  x: number;
  book: BookSpec;
  sweep?: boolean;
  finish?: boolean;
  read?: boolean;
  dim?: boolean;
}) {
  const { w: t, h, d } = book;
  const { lift } = sweep ? PULL.sweep : PULL.hold;
  const scale = read
    ? READ_HEIGHT / h
    : sweep
      ? PULL.sweep.scale
      : PULL.hold.scale;
  const top = BOOK_BOARD - h;
  const [sw, sh] = book.spineBox ?? [t, h];
  const [cw, ch] = book.coverBox ?? [d, h];
  // The turned cover spans t to t + d across the spine's box; scaled about
  // the spine's center, this slide puts it where the spine stood.
  const slideX = ((-scale * (t + d)) / (2 * t)) * 100;
  // Its foot stays near the board, or, to read, comes up to the top of the
  // gap above the books.
  const slideY = read
    ? (0.5 - READ_ABOVE / h - scale / 2) * 100
    : -((scale - 1) / 2 + lift / h) * 100;
  const box = {
    left: pct(x - VIEW.left, VIEW.width),
    top: pct(top - VIEW.top, VIEW.height),
    width: pct(t, VIEW.width),
    height: pct(h, VIEW.height),
  };
  const faces = (
    <div className="relative h-full w-full transition-transform duration-500 ease-switch [transform-origin:right_center] [transform-style:preserve-3d] group-hover:delay-150 group-hover:[transform:rotateY(-90deg)] group-focus:delay-150 group-focus:[transform:rotateY(-90deg)] motion-reduce:transition-none">
      <svg
        viewBox={`0 0 ${sw} ${sh}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full [backface-visibility:hidden] ${dim ? "[filter:saturate(0.7)_brightness(0.93)]" : ""}`}
      >
        {book.spine}
        {finish && (
          <Finish
            face="spine"
            material={book.material}
            w={sw}
            h={sh}
            seed={bookSeed(book.title)}
            scratched={!book.unscratched}
            dark={book.dark}
          />
        )}
      </svg>
      <svg
        viewBox={`0 0 ${cw} ${ch}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute left-full top-0 h-full [backface-visibility:hidden] [transform-origin:left_center] [transform:rotateY(90deg)]"
        style={{ width: pct(d, t) }}
      >
        {book.cover}
        {finish && (
          <Finish
            face="cover"
            material={book.material}
            w={cw}
            h={ch}
            seed={bookSeed(book.title) + 1}
            scratched={!book.unscratched}
            dark={book.dark}
          />
        )}
      </svg>
    </div>
  );
  const pull = {
    "--pull": `translate(${slideX}%, ${slideY}%) scale(${scale})`,
  } as React.CSSProperties;

  if (read) {
    // Book 4 is laid out at its open size and shrunk onto the shelf, so
    // the browser draws it at the size it opens to and it stays sharp the
    // whole way out (scaling up a book drawn small blurs it until it
    // stops). Its perspective scales with it, so it moves exactly as book
    // 3's does. Otherwise it behaves like book 3 (below).
    const shift = (slide: number) =>
      (((1 - scale) / 2 + slide / 100) / scale) * 100;
    return (
      <div
        tabIndex={0}
        role="img"
        aria-label={book.title}
        title={book.title}
        className={`group absolute z-0 transition-[z-index] duration-700 hover:z-20 hover:duration-0 focus:z-20 focus:duration-0 ${focusRing}`}
        style={{ ...box, perspective: `${700 * scale}px` }}
      >
        <div
          className="pointer-events-none absolute left-0 top-0 origin-top-left transition-transform delay-150 duration-300 ease-switch [transform-style:preserve-3d] [transform:var(--rest)] group-hover:delay-0 group-hover:[transform:var(--pull)] group-focus:delay-0 group-focus:[transform:var(--pull)] motion-reduce:transition-none"
          style={
            {
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
              "--rest": `translate(0%, 0%) scale(${1 / scale})`,
              "--pull": `translate(${shift(slideX)}%, ${shift(slideY)}%) scale(1)`,
            } as React.CSSProperties
          }
        >
          {faces}
        </div>
      </div>
    );
  }

  if (sweep) {
    // Only the spine's spot on the shelf takes the pointer; the book that
    // comes out lets it through. A closing book stays on top until it's
    // back, and the one opening goes over it straight away. Focusing it
    // (Tab, or a tap on a phone) opens it too.
    return (
      <div
        tabIndex={0}
        role="img"
        aria-label={book.title}
        title={book.title}
        className={`group absolute z-0 transition-[z-index] duration-700 [perspective:700px] hover:z-20 hover:duration-0 focus:z-20 focus:duration-0 ${focusRing}`}
        style={box}
      >
        <div
          className="pointer-events-none h-full w-full transition-transform delay-150 duration-300 ease-switch [transform-style:preserve-3d] group-hover:delay-0 group-hover:[transform:var(--pull)] group-focus:delay-0 group-focus:[transform:var(--pull)] motion-reduce:transition-none"
          style={pull}
        >
          {faces}
        </div>
      </div>
    );
  }

  return (
    <div
      title={book.title}
      className="group absolute [perspective:700px] hover:z-10"
      style={box}
    >
      {/* While the book is out, this covers where its cover shows, so the
          pointer can rest anywhere on the cover without it going back */}
      <div
        className="pointer-events-none absolute group-hover:pointer-events-auto"
        style={{
          left: pct(t / 2 - (scale * d) / 2, t),
          width: pct(scale * d, t),
          top: pct(h * (1 - scale) - lift, h),
          height: pct(scale * h, h),
        }}
      />
      <div
        className="h-full w-full transition-transform delay-150 duration-300 ease-switch [transform-style:preserve-3d] group-hover:delay-0 group-hover:[transform:var(--pull)] motion-reduce:transition-none"
        style={pull}
      >
        {faces}
      </div>
    </div>
  );
}

// Book 4's finish, laid over each spine and cover so the books look like
// real ones that have been read: a faint grain for their material, a
// spine faded by the light and rubbed at its ends, softly worn corners and
// edges, a few thin scratches on the old cloth and leather books, softened
// creases on paperbacks, paper gone a little yellow, and shade where a book
// meets the board. Nothing is glossy. The grain is
// three small tiles (public/images/about/book-grain-*.png), since live
// noise filters are slow to draw; they and the gradients are defined once
// (BookFinishDefs) and shared.
type Material = "cloth" | "leather" | "paperback" | "jacket";

const GRAIN: Record<Material, { fill: string; opacity: number }> = {
  cloth: { fill: "url(#book-grain-cloth)", opacity: 0.1 },
  leather: { fill: "url(#book-grain-leather)", opacity: 0.1 },
  paperback: { fill: "url(#book-grain-paper)", opacity: 0.06 },
  jacket: { fill: "url(#book-grain-paper)", opacity: 0.04 },
};

// A number for each book from its title, so its wear is its own and the
// same every time.
function bookSeed(title: string) {
  let n = 0;
  for (const c of title) n = (n * 31 + c.charCodeAt(0)) % 9973;
  return n;
}

function Finish({
  face,
  material,
  w,
  h,
  seed,
  scratched = true,
  dark = false,
}: {
  face: "spine" | "cover";
  material: Material;
  w: number;
  h: number;
  seed: number;
  scratched?: boolean;
  dark?: boolean;
}) {
  const r = face === "spine" ? 0.5 : 0;
  // The old cloth and leather books get a few thin dark scratches, as
  // from ordinary handling, placed and angled by the book's seed.
  const old = scratched && (material === "cloth" || material === "leather");
  const rand = (k: number) => jitter(seed * 13 + k * 7) + 0.5;
  const scratches = old
    ? Array.from({ length: face === "spine" ? 2 : 3 }, (_, i) => ({
        x: w * (0.2 + 0.6 * rand(i * 4)),
        y: h * (0.1 + 0.8 * rand(i * 4 + 1)),
        rx:
          w * (face === "spine" ? 0.28 : 0.12) * (0.7 + 0.6 * rand(i * 4 + 2)),
        ry: h * 0.0025,
        angle: (rand(i * 4 + 3) - 0.5) * (face === "spine" ? 16 : 40),
      }))
    : [];
  const paper = material === "paperback" || material === "jacket";
  return (
    <g pointerEvents="none">
      {/* Dark grain shows on a light book; a dark book gets it pale */}
      <rect
        width={w}
        height={h}
        rx={r}
        fill={
          dark
            ? GRAIN[material].fill.replace(")", "-light)")
            : GRAIN[material].fill
        }
        opacity={GRAIN[material].opacity * (dark ? 2 : 1)}
      />
      {/* Paper gone a little yellow, which would turn a dark book brown */}
      {paper && !dark && (
        <rect width={w} height={h} rx={r} className="fill-room-book-pencil/5" />
      )}
      {/* Faded by the light, most at the top; gently on a dark book */}
      <rect
        width={w}
        height={h}
        rx={r}
        className={dark ? "fill-room-book-paper/5" : "fill-room-book-paper/10"}
      />
      <rect width={w} height={h} rx={r} fill="url(#book-fade)" />
      <rect
        width={w}
        height={h}
        rx={r}
        fill={face === "spine" ? "url(#book-round)" : "url(#book-board)"}
      />

      {face === "spine" && material === "paperback" && (
        // Reading creases down the spine, softened with use
        <g fill="none" strokeLinecap="round">
          {[0.3, 0.56, 0.74].map((f, i) => {
            const x = w * f;
            const d = `M${x} ${h * (0.12 + i * 0.05)}Q${x + w * 0.05} ${h * 0.45} ${x - w * 0.03} ${h * (0.8 - i * 0.04)}`;
            return (
              <path
                key={f}
                d={d}
                strokeWidth={w * 0.025}
                className="stroke-room-book-paper/40"
              />
            );
          })}
        </g>
      )}

      {scratches.map((scratch, i) => (
        <ellipse
          key={i}
          cx={scratch.x}
          cy={scratch.y}
          rx={scratch.rx}
          ry={scratch.ry}
          transform={`rotate(${scratch.angle} ${scratch.x} ${scratch.y})`}
          className="fill-room-metal/30"
        />
      ))}

      {/* Rubbed edges, and on a spine its rubbed head and tail */}
      <rect
        x={0.25}
        y={0.25}
        width={w - 0.5}
        height={h - 0.5}
        rx={r}
        fill="none"
        strokeWidth={face === "spine" ? 0.45 : 0.6}
        className="stroke-room-book-paper/25"
      />
      {face === "spine" && (
        <>
          <rect
            width={w}
            height={h * 0.014}
            className="fill-room-book-paper/30"
          />
          <rect
            y={h * 0.986}
            width={w}
            height={h * 0.014}
            className="fill-room-book-paper/25"
          />
        </>
      )}
      {/* Bumped outer corners on a cover */}
      {face === "cover" && (
        <>
          <circle
            cx={w}
            cy={0}
            r={w * 0.045}
            className="fill-room-book-paper/35"
          />
          <circle
            cx={w}
            cy={h}
            r={w * 0.05}
            className="fill-room-book-paper/35"
          />
        </>
      )}
      <rect width={w} height={h} rx={r} fill="url(#book-ends)" />
    </g>
  );
}

// Shared by every finished book: the grain of each material, and the
// gradients that light them.
// Gradient stops take their colors through currentColor.
function BookFinishDefs() {
  const dark = "text-room-metal";
  const light = "text-room-book-paper";
  return (
    <svg aria-hidden="true" className="absolute h-0 w-0">
      <defs>
        {/* Grain: a small tile of each, repeated, and pale ones for dark
            books */}
        {(
          [
            "cloth",
            "leather",
            "paper",
            "cloth-light",
            "leather-light",
            "paper-light",
          ] as const
        ).map((grain) => (
          <pattern
            key={grain}
            id={`book-grain-${grain}`}
            patternUnits="userSpaceOnUse"
            width={16}
            height={16}
          >
            <image
              href={`/images/about/book-grain-${grain}.png`}
              width={16}
              height={16}
            />
          </pattern>
        ))}
        {/* A rounded spine: dark at both edges, a soft light on its curve */}
        <linearGradient id="book-round">
          <stop
            offset="0"
            stopColor="currentColor"
            stopOpacity={0.28}
            className={dark}
          />
          <stop
            offset="0.12"
            stopColor="currentColor"
            stopOpacity={0.06}
            className={dark}
          />
          <stop
            offset="0.32"
            stopColor="currentColor"
            stopOpacity={0.08}
            className={light}
          />
          <stop
            offset="0.5"
            stopColor="currentColor"
            stopOpacity={0}
            className={light}
          />
          <stop
            offset="0.8"
            stopColor="currentColor"
            stopOpacity={0.06}
            className={dark}
          />
          <stop
            offset="1"
            stopColor="currentColor"
            stopOpacity={0.3}
            className={dark}
          />
        </linearGradient>
        {/* A cover: the hinge groove beside the spine, the board's edge */}
        <linearGradient id="book-board">
          <stop
            offset="0"
            stopColor="currentColor"
            stopOpacity={0.26}
            className={dark}
          />
          <stop
            offset="0.03"
            stopColor="currentColor"
            stopOpacity={0.06}
            className={dark}
          />
          <stop
            offset="0.05"
            stopColor="currentColor"
            stopOpacity={0.08}
            className={light}
          />
          <stop
            offset="0.075"
            stopColor="currentColor"
            stopOpacity={0.12}
            className={dark}
          />
          <stop
            offset="0.12"
            stopColor="currentColor"
            stopOpacity={0}
            className={dark}
          />
          <stop
            offset="0.95"
            stopColor="currentColor"
            stopOpacity={0}
            className={dark}
          />
          <stop
            offset="1"
            stopColor="currentColor"
            stopOpacity={0.16}
            className={dark}
          />
        </linearGradient>
        {/* Faded by years of light, more at the top */}
        <linearGradient id="book-fade" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0"
            stopColor="currentColor"
            stopOpacity={0.16}
            className={light}
          />
          <stop
            offset="0.45"
            stopColor="currentColor"
            stopOpacity={0}
            className={light}
          />
        </linearGradient>
        {/* Shade at the top, and more at the foot on the board */}
        <linearGradient id="book-ends" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0"
            stopColor="currentColor"
            stopOpacity={0.14}
            className={dark}
          />
          <stop
            offset="0.03"
            stopColor="currentColor"
            stopOpacity={0}
            className={dark}
          />
          <stop
            offset="0.93"
            stopColor="currentColor"
            stopOpacity={0}
            className={dark}
          />
          <stop
            offset="1"
            stopColor="currentColor"
            stopOpacity={0.28}
            className={dark}
          />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Thinking, Fast and Slow, its spine and cover drawn in smaller boxes and
// scaled up.
const THINKING_TURNING: BookSpec = {
  title: "Thinking, Fast and Slow by Daniel Kahneman",
  material: "paperback",
  w: 12,
  h: 66,
  d: 44,
  spine: <ThinkingFastAndSlow />,
  spineBox: [9, 50],
  cover: <ThinkingFastAndSlowCover />,
  coverBox: [33, 50],
};

/* The full shelf (books 2 and 3). The second board as it really was, with books
   added at both ends: Shantaram, Love Does and Water for Elephants first,
   then my books in their order on the shelf, then The Power of Kindness,
   The Five People You Meet in Heaven and Hyperion. Spines and covers are
   drawn from photos; the old cloth and leather books, whose covers I don't
   have, get plain covers in their own colors. */

// Text across a spine or cover, centered on x, fitted to `len` if given.
function Across({
  x,
  y,
  size,
  len,
  className = "fill-room-metal",
  children,
}: {
  x: number;
  y: number;
  size: number;
  len?: number;
  className?: string;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      textAnchor="middle"
      textLength={len}
      lengthAdjust={len ? "spacingAndGlyphs" : undefined}
      className={`${className} font-serif`}
    >
      {children}
    </text>
  );
}

// A plain cloth or leather cover in a d by h box: its color, an optional
// gold border, the title lines a third of the way down and the author
// lower down.
function PlainCover({
  d,
  h,
  fill,
  ink,
  title,
  author,
  gilt = false,
}: {
  d: number;
  h: number;
  fill: string;
  ink: string;
  title: string[];
  author: string;
  gilt?: boolean;
}) {
  const size = h * 0.05;
  return (
    <>
      <rect width={d} height={h} className={fill} />
      {gilt && (
        <>
          <rect
            x={2.5}
            y={2.5}
            width={d - 5}
            height={h - 5}
            fill="none"
            strokeWidth={0.5}
            className="stroke-room-gold"
          />
          <rect
            x={4}
            y={4}
            width={d - 8}
            height={h - 8}
            fill="none"
            strokeWidth={0.25}
            className="stroke-room-gold"
          />
        </>
      )}
      {title.map((line, i) => (
        <Across
          key={line}
          x={d / 2}
          y={h * 0.32 + i * size * 1.35}
          size={size}
          len={Math.min(d * 0.72, line.length * size * 0.62)}
          className={ink}
        >
          {line}
        </Across>
      ))}
      <Across
        x={d / 2}
        y={h * 0.78}
        size={size * 0.62}
        len={Math.min(d * 0.7, author.length * size * 0.4)}
        className={ink}
      >
        {author}
      </Across>
    </>
  );
}

// Two thin gold rules across a leather spine at y.
function GoldRules({ y, w }: { y: number; w: number }) {
  return (
    <>
      <rect y={y} width={w} height={0.45} className="fill-room-gold" />
      <rect y={y + 0.9} width={w} height={0.25} className="fill-room-gold" />
    </>
  );
}

const SHANTARAM: BookSpec = {
  title: "Shantaram by Gregory David Roberts",
  material: "jacket",
  w: 18,
  h: 74,
  d: 50,
  spine: (
    <>
      <rect width={18} height={74} className="fill-room-book-teal" />
      <path
        d="M0 22H3V19.5Q4.5 17 6 19.5V22H8V16Q9 13.5 10 16V22H12V19.5Q13.5 17 15 19.5V22H18V63H0Z"
        className="fill-room-book-red"
      />
      <SpineText
        x={9.5}
        y={24}
        length={24}
        size={4.2}
        className="fill-room-gold"
      >
        SHANTARAM
      </SpineText>
      <circle cx={9} cy={50.5} r={1} className="fill-room-gold" />
      <SpineText
        x={9.5}
        y={53}
        length={9}
        size={1.5}
        className="fill-room-gold"
      >
        GREGORY DAVID ROBERTS
      </SpineText>
      <circle cx={9} cy={68.5} r={1.5} className="fill-room-metal/50" />
    </>
  ),
  cover: (
    <>
      <rect width={50} height={74} className="fill-room-book-teal" />
      <path
        d="M0 74V34H4V26H5V34H8V30Q12 23 16 30V34H18V28H19V34H22V27Q25 18 28 27V34H31V30Q34 25 37 30V34H40V26H41V34H50V74Z"
        className="fill-room-book-red"
      />
      <path
        d="M0 66Q12 60 22 66T50 64V74H0Z"
        className="fill-room-book-teal/70"
      />
      <Across x={25} y={6} size={1.6} len={30} className="fill-room-book-paper">
        THE MOST ASTONISHING ADVENTURE
      </Across>
      <Across
        x={25}
        y={8.4}
        size={1.6}
        len={22}
        className="fill-room-book-paper"
      >
        STORY YOU WILL EVER READ
      </Across>
      <Across x={25} y={45} size={5} len={34} className="fill-room-gold">
        SHANTARAM
      </Across>
      <circle cx={25} cy={49.5} r={1.2} className="fill-room-gold" />
      <Across x={25} y={55} size={2.4} len={26} className="fill-room-gold">
        Gregory David Roberts
      </Across>
      <Across x={25} y={58.5} size={1.4} len={20} className="fill-room-gold">
        THE INTERNATIONAL BESTSELLER
      </Across>
    </>
  ),
};

const LOVE_DOES: BookSpec = {
  title: "Love Does by Bob Goff",
  material: "paperback",
  w: 7,
  h: 64,
  d: 42,
  spine: (
    <>
      <rect width={7} height={64} className="fill-room-book-sky" />
      <circle cx={3.5} cy={4} r={1.2} className="fill-room-book-pencil" />
      <circle cx={3.5} cy={7.5} r={1.1} className="fill-room-book-red" />
      <SpineText
        x={3.5}
        y={12}
        length={26}
        size={2.6}
        className="fill-room-book-paper"
      >
        LOVE DOES
      </SpineText>
      <SpineText
        x={3.5}
        y={47}
        length={10}
        size={1.7}
        className="fill-room-book-paper"
      >
        BOB GOFF
      </SpineText>
    </>
  ),
  cover: (
    <>
      <rect width={42} height={64} className="fill-room-book-sky" />
      <path
        d="M30 7Q26 14 28 20T22 32Q18 40 21 48"
        fill="none"
        strokeWidth={0.3}
        className="stroke-room-book-paper/70"
      />
      <circle cx={30} cy={6} r={3.2} className="fill-room-book-pencil" />
      <circle cx={28} cy={19} r={2.4} className="fill-room-book-red" />
      <circle cx={23} cy={31} r={2} className="fill-room-book-red" />
      <circle cx={21} cy={47} r={1.8} className="fill-room-book-teal" />
      <Across x={21} y={30} size={7} len={30} className="fill-room-book-paper">
        LOVE
      </Across>
      <Across x={21} y={39} size={7} len={30} className="fill-room-book-paper">
        DOES
      </Across>
      <Across
        x={21}
        y={44}
        size={1.3}
        len={30}
        className="fill-room-book-paper"
      >
        DISCOVER A SECRETLY INCREDIBLE LIFE
      </Across>
      <Across
        x={21}
        y={46.2}
        size={1.3}
        len={18}
        className="fill-room-book-paper"
      >
        IN AN ORDINARY WORLD
      </Across>
      <Across
        x={21}
        y={58}
        size={2.6}
        len={16}
        className="fill-room-book-paper"
      >
        BOB GOFF
      </Across>
    </>
  ),
};

const WATER_FOR_ELEPHANTS: BookSpec = {
  title: "Water for Elephants by Sara Gruen",
  material: "paperback",
  w: 8,
  h: 64,
  d: 42,
  spine: (
    <>
      <rect width={8} height={64} className="fill-room-metal" />
      <rect width={8} height={7} className="fill-room-book-red" />
      <rect y={40} width={8} height={7} className="fill-room-book-red" />
      <rect y={60} width={8} height={4} className="fill-room-book-red" />
      <SpineText x={4} y={9} length={29} size={2.4} className="fill-room-gold">
        WATER for ELEPHANTS
      </SpineText>
      <SpineText
        x={4}
        y={48.5}
        length={10}
        size={1.7}
        className="fill-room-book-paper"
      >
        SARA GRUEN
      </SpineText>
    </>
  ),
  cover: (
    <>
      <rect width={42} height={64} className="fill-room-book-cream" />
      {/* The curtain parted on a figure in a red sequined coat */}
      <path
        d="M17 7Q21 30 15 56H27Q21 30 25 7Z"
        className="fill-room-metal/80"
      />
      <ellipse cx={21} cy={36} rx={3.6} ry={9} className="fill-room-book-red" />
      {[5, 9, 13, 29, 33, 37].map((x) => (
        <path
          key={x}
          d={`M${x} 7Q${x + 1.5} 30 ${x - 1} 56`}
          fill="none"
          strokeWidth={0.3}
          className="stroke-room-metal/15"
        />
      ))}
      <rect y={54} width={42} height={10} className="fill-room-book-olive" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect
          key={i}
          x={i * 6}
          width={6}
          height={6}
          className={i % 2 ? "fill-room-metal" : "fill-room-book-red"}
        />
      ))}
      <Across x={21} y={4} size={1.6} len={30} className="fill-room-book-paper">
        #1 NEW YORK TIMES BESTSELLER
      </Across>
      <Across x={21} y={20} size={5} len={22} className="fill-room-gold">
        WATER
      </Across>
      <Across x={21} y={24.5} size={2.4} className="fill-room-gold">
        for
      </Across>
      <Across x={21} y={30} size={5} len={32} className="fill-room-gold">
        ELEPHANTS
      </Across>
      <Across x={21} y={60} size={2.6} len={18} className="fill-room-gold">
        SARA GRUEN
      </Across>
    </>
  ),
};

const GILT_EDGED: BookSpec = {
  title: "A gilt-edged book, page edges out",
  material: "leather",
  w: 6.5,
  h: 67,
  d: 44,
  spine: (
    <>
      <rect width={6.5} height={67} rx={0.4} className="fill-room-metal" />
      <rect
        x={1}
        y={0.8}
        width={4.5}
        height={65.4}
        className="fill-room-gold"
      />
      {[1.9, 2.8, 3.7, 4.6].map((x) => (
        <rect
          key={x}
          x={x}
          y={0.8}
          width={0.15}
          height={65.4}
          className="fill-room-gold-dark/40"
        />
      ))}
    </>
  ),
  cover: (
    <>
      <PlainCover
        d={44}
        h={67}
        fill="fill-room-metal"
        ink="fill-room-gold"
        title={[]}
        author=""
        gilt
      />
      <path d="M22 28L26 33.5L22 39L18 33.5Z" className="fill-room-gold" />
    </>
  ),
};

const PSYCHOLOGY: BookSpec = {
  title: "Psychology by William James",
  unscratched: true,
  material: "leather",
  w: 12.5,
  h: 66,
  d: 44,
  spine: (
    <>
      <rect width={12.5} height={66} rx={0.5} className="fill-room-book-rust" />
      <rect
        x={1.5}
        y={13.5}
        width={9.5}
        height={9.5}
        className="fill-room-book-maroon"
      />
      <Across x={6.25} y={17.6} size={1.5} len={8.5} className="fill-room-gold">
        PSYCHOLOGY
      </Across>
      <Across x={6.25} y={21} size={1.3} len={4.5} className="fill-room-gold">
        JAMES
      </Across>
      {[4, 12, 23.5, 34.5, 45.5, 56.5, 63].map((y) => (
        <GoldRules key={y} y={y} w={12.5} />
      ))}
      {[29.5, 40.5, 51.5].map((c) => (
        <g key={c}>
          <path
            d={`M6.25 ${c - 2.4}L7.6 ${c}L6.25 ${c + 2.4}L4.9 ${c}Z`}
            className="fill-room-gold"
          />
          <circle cx={3.6} cy={c} r={0.5} className="fill-room-gold" />
          <circle cx={8.9} cy={c} r={0.5} className="fill-room-gold" />
        </g>
      ))}
    </>
  ),
  cover: (
    <PlainCover
      d={44}
      h={66}
      fill="fill-room-book-rust"
      ink="fill-room-gold"
      title={["PSYCHOLOGY"]}
      author="WILLIAM JAMES"
      gilt
    />
  ),
};

const HARVARD_CLASSICS: BookSpec = {
  title: "The Harvard Classics: Plato, Epictetus, Marcus Aurelius",
  material: "leather",
  w: 11,
  h: 70,
  d: 46,
  spine: (
    <>
      <rect width={11} height={70} rx={0.5} className="fill-room-book-maroon" />
      <rect
        x={2}
        y={3}
        width={7}
        height={5.5}
        fill="none"
        strokeWidth={0.4}
        className="stroke-room-gold"
      />
      <circle cx={5.5} cy={5.75} r={1.3} className="fill-room-gold" />
      <rect
        x={1}
        y={11}
        width={9}
        height={13.5}
        className="fill-room-metal/40"
      />
      {[
        ["PLATO", 13.8],
        ["EPICTETUS", 16.8],
        ["MARCUS", 19.8],
        ["AURELIUS", 22.8],
      ].map(([line, y]) => (
        <Across
          key={line}
          x={5.5}
          y={y as number}
          size={1.3}
          len={Math.min(8, (line as string).length * 0.85)}
          className="fill-room-gold"
        >
          {line as string}
        </Across>
      ))}
      {[28, 44].map((y) => (
        <g key={y}>
          <rect
            x={1.5}
            y={y}
            width={8}
            height={13}
            fill="none"
            strokeWidth={0.4}
            className="stroke-room-gold"
          />
          <path
            d={`M5.5 ${y + 2.5}L8 ${y + 6.5}L5.5 ${y + 10.5}L3 ${y + 6.5}Z`}
            fill="none"
            strokeWidth={0.5}
            className="stroke-room-gold"
          />
        </g>
      ))}
      {[10, 25.5, 42.3, 58.5].map((y) => (
        <GoldRules key={y} y={y} w={11} />
      ))}
      <Across x={5.5} y={62} size={1.2} len={3} className="fill-room-gold">
        THE
      </Across>
      <Across x={5.5} y={64.4} size={1.2} len={7} className="fill-room-gold">
        HARVARD
      </Across>
      <Across x={5.5} y={66.8} size={1.2} len={7.5} className="fill-room-gold">
        CLASSICS
      </Across>
    </>
  ),
  cover: (
    <PlainCover
      d={46}
      h={70}
      fill="fill-room-book-maroon"
      ink="fill-room-gold"
      title={["THE HARVARD", "CLASSICS"]}
      author="PLATO · EPICTETUS · MARCUS AURELIUS"
      gilt
    />
  ),
};

// Pride and Prejudice by Jane Austen, on the Harvard Classics' gilt
// maroon leather spine.
const PRIDE_AND_PREJUDICE: BookSpec = {
  title: "Pride and Prejudice by Jane Austen",
  material: "leather",
  w: 11,
  h: 70,
  d: 46,
  spine: (
    <>
      <rect width={11} height={70} rx={0.5} className="fill-room-book-maroon" />
      <rect
        x={2}
        y={3}
        width={7}
        height={5.5}
        fill="none"
        strokeWidth={0.4}
        className="stroke-room-gold"
      />
      <circle cx={5.5} cy={5.75} r={1.3} className="fill-room-gold" />
      <rect
        x={1}
        y={11}
        width={9}
        height={13.5}
        className="fill-room-metal/40"
      />
      {[
        ["PRIDE", 14.4],
        ["AND", 17.4],
        ["PREJUDICE", 20.4],
      ].map(([line, y]) => (
        <Across
          key={line}
          x={5.5}
          y={y as number}
          size={1.3}
          len={Math.min(8, (line as string).length * 0.85)}
          className="fill-room-gold"
        >
          {line as string}
        </Across>
      ))}
      {[28, 44].map((y) => (
        <g key={y}>
          <rect
            x={1.5}
            y={y}
            width={8}
            height={13}
            fill="none"
            strokeWidth={0.4}
            className="stroke-room-gold"
          />
          <path
            d={`M5.5 ${y + 2.5}L8 ${y + 6.5}L5.5 ${y + 10.5}L3 ${y + 6.5}Z`}
            fill="none"
            strokeWidth={0.5}
            className="stroke-room-gold"
          />
        </g>
      ))}
      {[10, 25.5, 42.3, 58.5].map((y) => (
        <GoldRules key={y} y={y} w={11} />
      ))}
      <Across x={5.5} y={63.2} size={1.2} len={4} className="fill-room-gold">
        JANE
      </Across>
      <Across x={5.5} y={65.8} size={1.2} len={6} className="fill-room-gold">
        AUSTEN
      </Across>
    </>
  ),
  cover: (
    <>
      <PlainCover
        d={46}
        h={70}
        fill="fill-room-book-maroon"
        ink="fill-room-gold"
        title={["PRIDE AND", "PREJUDICE"]}
        author="JANE AUSTEN"
        gilt
      />
      {/* The spine's gilt lozenge, between the title and the author */}
      <path
        d="M23 33L27 39.5L23 46L19 39.5Z"
        fill="none"
        strokeWidth={0.6}
        className="stroke-room-gold"
      />
      <path
        d="M23 36.5L24.8 39.5L23 42.5L21.2 39.5Z"
        className="fill-room-gold"
      />
      <circle cx={16} cy={39.5} r={0.7} className="fill-room-gold" />
      <circle cx={30} cy={39.5} r={0.7} className="fill-room-gold" />
    </>
  ),
};

// One of Ishihara's colored dot plates: a circle of dots, with a 7 picked
// out in orange among the greens.
const ISHIHARA_DOTS = (() => {
  const c = { x: 23, y: 29, r: 14 };
  const inSeven = (x: number, y: number) => {
    if (x >= 16.5 && x <= 29 && y >= 21 && y <= 24.5) return true;
    // The 7's stroke, from its top right corner down to the left.
    const [ax, ay, bx, by] = [28, 24.5, 20.5, 38.5];
    const t = Math.max(
      0,
      Math.min(
        1,
        ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) /
          ((bx - ax) ** 2 + (by - ay) ** 2),
      ),
    );
    return Math.hypot(x - (ax + t * (bx - ax)), y - (ay + t * (by - ay))) < 1.9;
  };
  const dots: { x: number; y: number; r: number; fill: string }[] = [];
  let i = 0;
  for (let y = c.y - c.r; y <= c.y + c.r; y += 2.3) {
    for (let x = c.x - c.r; x <= c.x + c.r; x += 2.3) {
      i++;
      const dx = x + jitter(i * 3) * 1.2;
      const dy = y + jitter(i * 7) * 1.2;
      if (Math.hypot(dx - c.x, dy - c.y) > c.r - 0.8) continue;
      const pick = Math.floor((jitter(i * 11) + 0.5) * 3);
      const fill = inSeven(dx, dy)
        ? [
            "fill-room-book-amber",
            "fill-room-book-red",
            "fill-room-book-amber",
          ][pick]
        : [
            "fill-room-book-olive",
            "fill-room-book-leaf",
            "fill-room-plant-light",
          ][pick];
      dots.push({ x: dx, y: dy, r: 0.75 + (jitter(i * 5) + 0.5) * 0.45, fill });
    }
  }
  return dots;
})();

const ISHIHARA: BookSpec = {
  title: "Ishihara's Tests for Colour Deficiency, Concise Edition",
  material: "cloth",
  w: 6.4,
  h: 66,
  d: 46,
  spine: (
    <>
      <rect width={6.4} height={66} rx={0.4} className="fill-room-book-slate" />
      <rect
        x={0.8}
        y={2}
        width={4.8}
        height={0.3}
        className="fill-room-book-paper/60"
      />
      <rect
        x={0.8}
        y={63.7}
        width={4.8}
        height={0.3}
        className="fill-room-book-paper/60"
      />
      <SpineText
        x={3.4}
        y={4}
        length={44}
        size={1.7}
        className="fill-room-book-paper"
      >
        ISHIHARA&apos;S TESTS FOR COLOUR DEFICIENCY
      </SpineText>
      <SpineText
        x={3.4}
        y={50}
        length={12}
        size={1.5}
        className="fill-room-book-paper"
      >
        Concise Edition
      </SpineText>
    </>
  ),
  cover: (
    <>
      <rect width={46} height={66} className="fill-room-book-slate" />
      <circle cx={23} cy={29} r={14.6} className="fill-room-book-paper/90" />
      {ISHIHARA_DOTS.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} className={dot.fill} />
      ))}
      <Across
        x={23}
        y={53}
        size={1.9}
        len={28}
        className="fill-room-book-paper"
      >
        ISHIHARA&apos;S TESTS FOR
      </Across>
      <Across
        x={23}
        y={56.2}
        size={1.9}
        len={26}
        className="fill-room-book-paper"
      >
        COLOUR DEFICIENCY
      </Across>
      <Across
        x={23}
        y={60.5}
        size={1.3}
        len={14}
        className="fill-room-book-paper/70"
      >
        CONCISE EDITION
      </Across>
    </>
  ),
};

const ASTONISHING_HYPOTHESIS: BookSpec = {
  title: "The Astonishing Hypothesis by Francis Crick",
  material: "cloth",
  w: 13.5,
  h: 76,
  d: 50,
  spine: (
    <>
      <rect
        width={13.5}
        height={76}
        rx={0.5}
        className="fill-room-book-taupe"
      />
      <SpineText
        x={7.5}
        y={4}
        length={32}
        size={3}
        className="fill-room-book-paper"
      >
        The Astonishing Hypothesis
      </SpineText>
      <SpineText
        x={7.5}
        y={42}
        length={18}
        size={2}
        className="fill-room-book-paper"
      >
        FRANCIS CRICK
      </SpineText>
      <circle
        cx={6.75}
        cy={71.5}
        r={1.7}
        fill="none"
        strokeWidth={0.3}
        className="stroke-room-book-paper"
      />
      <circle cx={6.75} cy={71.5} r={0.6} className="fill-room-book-paper" />
    </>
  ),
  cover: (
    <PlainCover
      d={50}
      h={76}
      fill="fill-room-book-taupe"
      ink="fill-room-book-paper"
      title={["THE ASTONISHING", "HYPOTHESIS"]}
      author="FRANCIS CRICK"
    />
  ),
};

const MODERN_ANALYSIS: BookSpec = {
  title: "A Course of Modern Analysis by Whittaker and Watson",
  material: "cloth",
  w: 15,
  h: 73,
  d: 48,
  spine: (
    <>
      <rect width={15} height={73} rx={0.5} className="fill-room-book-slate" />
      {[
        ["MODERN", 15, 1.5, 8],
        ["ANALYSIS", 17.6, 1.5, 9],
        ["WHITTAKER", 23.2, 1.3, 8.5],
        ["AND", 25.5, 1.3, 3],
        ["WATSON", 27.8, 1.3, 6.5],
        ["4th", 35, 1.3, 2.6],
        ["Edition", 37.3, 1.3, 5.5],
        ["CAMBRIDGE", 43.5, 1.3, 9],
      ].map(([line, y, size, len]) => (
        <Across
          key={line as string}
          x={7.5}
          y={y as number}
          size={size as number}
          len={len as number}
          className="fill-room-book-paper/90"
        >
          {line as string}
        </Across>
      ))}
      <rect
        x={4.5}
        y={19.7}
        width={6}
        height={0.2}
        className="fill-room-book-paper/60"
      />
      <circle cx={7.5} cy={31} r={0.4} className="fill-room-book-paper/80" />
    </>
  ),
  cover: (
    <PlainCover
      d={48}
      h={73}
      fill="fill-room-book-slate"
      ink="fill-room-book-paper"
      title={["A COURSE OF", "MODERN ANALYSIS"]}
      author="WHITTAKER & WATSON"
    />
  ),
};

const REFLECTIONS: BookSpec = {
  title: "Reflections on the Human Condition by Eric Hoffer",
  material: "cloth",
  w: 9,
  h: 58,
  d: 38,
  spine: (
    <>
      <rect width={9} height={58} rx={0.5} className="fill-room-book-taupe" />
      <rect
        width={9}
        height={58}
        rx={0.5}
        className="fill-room-book-paper/10"
      />
      <Across x={4.5} y={4} size={1.3} len={4} className="fill-room-book-paper">
        ERIC
      </Across>
      <Across
        x={4.5}
        y={6.3}
        size={1.3}
        len={5.5}
        className="fill-room-book-paper"
      >
        HOFFER
      </Across>
      <SpineText
        x={4.6}
        y={10}
        length={38}
        size={2.2}
        className="fill-room-book-paper"
      >
        Reflections on the Human Condition
      </SpineText>
      <Across
        x={4.5}
        y={53}
        size={1.2}
        len={5}
        className="fill-room-book-paper/80"
      >
        Harper
      </Across>
      <Across
        x={4.5}
        y={55.3}
        size={1.2}
        len={4}
        className="fill-room-book-paper/80"
      >
        &amp; Row
      </Across>
    </>
  ),
  cover: (
    <PlainCover
      d={38}
      h={58}
      fill="fill-room-book-taupe"
      ink="fill-room-book-paper"
      title={["REFLECTIONS ON", "THE HUMAN", "CONDITION"]}
      author="ERIC HOFFER"
    />
  ),
};

const DIVINE_COMEDY: BookSpec = {
  title: "The Divine Comedy by Dante",
  material: "cloth",
  w: 7.3,
  h: 52,
  d: 34,
  spine: (
    <>
      <rect width={7.3} height={52} rx={0.4} className="fill-room-book-olive" />
      {[
        ["THE", 4, 2.6],
        ["DIVINE", 6, 4.6],
        ["COMEDY", 8, 5],
        ["DANTE", 12, 4],
      ].map(([line, y, len]) => (
        <Across
          key={line as string}
          x={3.65}
          y={y as number}
          size={1.1}
          len={len as number}
          className="fill-room-metal/80"
        >
          {line as string}
        </Across>
      ))}
      <rect
        x={1.6}
        y={9.6}
        width={4.1}
        height={0.2}
        className="fill-room-metal/50"
      />
      <Across
        x={3.65}
        y={47.5}
        size={1}
        len={5.6}
        className="fill-room-metal/80"
      >
        EVERYMAN&apos;S
      </Across>
      <Across
        x={3.65}
        y={49.3}
        size={1}
        len={4.6}
        className="fill-room-metal/80"
      >
        LIBRARY
      </Across>
    </>
  ),
  cover: (
    <PlainCover
      d={34}
      h={52}
      fill="fill-room-book-olive"
      ink="fill-room-metal"
      title={["THE DIVINE", "COMEDY"]}
      author="DANTE ALIGHIERI"
    />
  ),
};

const THINKING_ON_SHELF: BookSpec = {
  ...THINKING_TURNING,
  w: 10.9,
  h: 61,
  d: 40,
};

const OBSCURE_SORROWS: BookSpec = {
  title: "The Dictionary of Obscure Sorrows by John Koenig",
  material: "jacket",
  w: 10,
  h: 52,
  d: 35,
  spine: (
    <>
      <rect width={10} height={52} rx={0.4} className="fill-room-metal" />
      <Across x={5} y={4} size={1.3} len={3} className="fill-room-gold">
        THE
      </Across>
      <SpineText
        x={5.4}
        y={6.5}
        length={37}
        size={2.4}
        className="fill-room-gold"
      >
        DICTIONARY of OBSCURE SORROWS
      </SpineText>
      {[
        [2.3, 12],
        [8, 20],
        [2.1, 31],
        [8.2, 38],
      ].map(([x, y]) => (
        <circle key={y} cx={x} cy={y} r={0.35} className="fill-room-gold/70" />
      ))}
      <rect
        x={1.8}
        y={48}
        width={6.4}
        height={2.8}
        fill="none"
        strokeWidth={0.2}
        className="stroke-room-book-paper"
      />
      <Across
        x={5}
        y={50}
        size={1.3}
        len={5.6}
        className="fill-room-book-paper"
      >
        KOENIG
      </Across>
    </>
  ),
  cover: (
    <>
      <rect width={35} height={52} className="fill-room-metal" />
      {[
        [5, 6],
        [29, 9],
        [8, 40],
        [30, 44],
        [17, 4],
        [25, 38],
      ].map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={0.4}
          className="fill-room-gold/70"
        />
      ))}
      <Across x={17.5} y={18} size={2} len={22} className="fill-room-gold">
        THE DICTIONARY OF
      </Across>
      <Across x={17.5} y={24} size={4} len={22} className="fill-room-gold">
        OBSCURE
      </Across>
      <Across x={17.5} y={29.5} size={4} len={22} className="fill-room-gold">
        SORROWS
      </Across>
      <Across
        x={17.5}
        y={46}
        size={1.8}
        len={14}
        className="fill-room-book-paper"
      >
        JOHN KOENIG
      </Across>
    </>
  ),
};

// The Power of Kindness's sprout: a stem and two leaves, at x, y.
function Sprout({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <>
      <rect
        x={x - size * 0.08}
        y={y}
        width={size * 0.16}
        height={size * 1.1}
        className="fill-room-book-leaf"
      />
      <ellipse
        cx={x - size * 0.45}
        cy={y}
        rx={size * 0.5}
        ry={size * 0.26}
        transform={`rotate(-20 ${x - size * 0.45} ${y})`}
        className="fill-room-book-leaf"
      />
      <ellipse
        cx={x + size * 0.45}
        cy={y - size * 0.1}
        rx={size * 0.5}
        ry={size * 0.26}
        transform={`rotate(25 ${x + size * 0.45} ${y - size * 0.1})`}
        className="fill-room-book-leaf"
      />
    </>
  );
}

const POWER_OF_KINDNESS: BookSpec = {
  title: "The Power of Kindness by Piero Ferrucci",
  material: "paperback",
  w: 6,
  h: 64,
  d: 42,
  spine: (
    <>
      <rect width={6} height={64} rx={0.4} className="fill-room-book-paper" />
      <Sprout x={3} y={5} size={2.2} />
      <SpineText
        x={3.1}
        y={11}
        length={30}
        size={2}
        className="fill-room-metal"
      >
        the power of kindness
      </SpineText>
      <SpineText
        x={3.1}
        y={46}
        length={14}
        size={1.5}
        className="fill-room-metal/70"
      >
        PIERO FERRUCCI
      </SpineText>
    </>
  ),
  cover: (
    <>
      <rect width={42} height={64} className="fill-room-book-paper" />
      <circle cx={8} cy={9} r={5.5} className="fill-room-book-leaf" />
      <Across
        x={8}
        y={8.4}
        size={1.6}
        len={5.5}
        className="fill-room-book-paper"
      >
        10TH
      </Across>
      <Across
        x={8}
        y={10.8}
        size={1.1}
        len={8}
        className="fill-room-book-paper"
      >
        ANNIVERSARY
      </Across>
      {[5, 7.5, 13, 15.5].map((y) => (
        <rect
          key={y}
          x={18}
          y={y}
          width={18}
          height={0.6}
          className="fill-room-metal/25"
        />
      ))}
      <Sprout x={21} y={29} size={3.2} />
      <Across x={21} y={38} size={3.2} len={30} className="fill-room-metal">
        the power of kindness
      </Across>
      <rect
        x={6}
        y={39.5}
        width={30}
        height={0.25}
        className="fill-room-metal/40"
      />
      <Across
        x={21}
        y={43.5}
        size={1.3}
        len={24}
        className="fill-room-metal/70"
      >
        The Unexpected Benefits of
      </Across>
      <Across
        x={21}
        y={45.7}
        size={1.3}
        len={26}
        className="fill-room-metal/70"
      >
        Leading a Compassionate Life
      </Across>
      <Across x={21} y={57} size={1.7} len={17} className="fill-room-metal/70">
        PIERO FERRUCCI
      </Across>
    </>
  ),
};

const FIVE_PEOPLE: BookSpec = {
  title: "The Five People You Meet in Heaven by Mitch Albom",
  material: "jacket",
  w: 7,
  h: 62,
  d: 42,
  spine: (
    <>
      <rect width={7} height={62} rx={0.4} className="fill-room-book-maroon" />
      <SpineText
        x={3.7}
        y={4}
        length={36}
        size={2}
        className="fill-room-book-cream"
      >
        the five people you meet in heaven
      </SpineText>
      <rect
        x={1.2}
        y={43}
        width={4.6}
        height={11}
        className="fill-room-book-cream"
      />
      <SpineText
        x={3.7}
        y={44}
        length={9}
        size={1.5}
        className="fill-room-book-maroon"
      >
        Mitch Albom
      </SpineText>
      <rect
        x={2.5}
        y={57}
        width={2}
        height={2.5}
        className="fill-room-book-cream/60"
      />
    </>
  ),
  cover: (
    <>
      <rect width={42} height={62} className="fill-room-book-cream" />
      <rect
        x={1.2}
        y={1.2}
        width={39.6}
        height={59.6}
        fill="none"
        strokeWidth={0.8}
        className="stroke-room-book-maroon"
      />
      <rect
        x={5}
        y={4}
        width={32}
        height={6}
        className="fill-room-book-maroon"
      />
      <Across
        x={21}
        y={8.5}
        size={3.2}
        len={22}
        className="fill-room-book-cream"
      >
        Mitch Albom
      </Across>
      <Across x={21} y={12.8} size={1.1} len={5} className="fill-room-metal/70">
        Author of
      </Across>
      <Across x={21} y={14.8} size={1.6} len={18} className="fill-room-metal">
        Tuesdays with Morrie
      </Across>
      {/* The Ferris wheel */}
      <circle
        cx={21}
        cy={27}
        r={5}
        fill="none"
        strokeWidth={0.3}
        className="stroke-room-metal"
      />
      {[0, 45, 90, 135].map((a) => (
        <line
          key={a}
          x1={21 - 5 * Math.cos((a * Math.PI) / 180)}
          y1={27 - 5 * Math.sin((a * Math.PI) / 180)}
          x2={21 + 5 * Math.cos((a * Math.PI) / 180)}
          y2={27 + 5 * Math.sin((a * Math.PI) / 180)}
          strokeWidth={0.2}
          className="stroke-room-metal"
        />
      ))}
      <path
        d="M18 34L21 27L24 34M17 34H25"
        fill="none"
        strokeWidth={0.3}
        className="stroke-room-metal"
      />
      <Across x={21} y={42} size={3.4} len={26} className="fill-room-book-red">
        the five people
      </Across>
      <Across x={21} y={47} size={3.4} len={32} className="fill-room-book-red">
        you meet in heaven
      </Across>
    </>
  ),
};

const HYPERION: BookSpec = {
  title: "Hyperion by Dan Simmons",
  material: "jacket",
  w: 14,
  h: 74,
  d: 50,
  // The jacket's painting runs onto the spine: pale lavender sky at the
  // top, through cream and soft pink to gold, then the brown ground.
  spine: (
    <>
      <defs>
        <linearGradient id="hyperion-spine" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0"
            stopColor="currentColor"
            stopOpacity={1}
            className="text-room-book-hyperion-lavender"
          />
          <stop
            offset="0.2"
            stopColor="currentColor"
            stopOpacity={1}
            className="text-room-book-hyperion-cream"
          />
          <stop
            offset="0.38"
            stopColor="currentColor"
            stopOpacity={1}
            className="text-room-book-hyperion-pink"
          />
          <stop
            offset="0.52"
            stopColor="currentColor"
            stopOpacity={1}
            className="text-room-book-hyperion-cream"
          />
          <stop
            offset="0.66"
            stopColor="currentColor"
            stopOpacity={1}
            className="text-room-book-hyperion-gold"
          />
          <stop
            offset="0.82"
            stopColor="currentColor"
            stopOpacity={1}
            className="text-room-book-hyperion-ochre"
          />
          <stop
            offset="1"
            stopColor="currentColor"
            stopOpacity={1}
            className="text-room-book-hyperion-umber"
          />
        </linearGradient>
      </defs>
      <rect width={14} height={74} fill="url(#hyperion-spine)" />
      <SpineText
        x={7.4}
        y={5}
        length={30}
        size={4.2}
        className="fill-room-metal"
      >
        HYPERION
      </SpineText>
      <SpineText
        x={7.4}
        y={40}
        length={22}
        size={2.6}
        className="fill-room-metal"
      >
        DAN SIMMONS
      </SpineText>
      <rect
        x={5}
        y={68.8}
        width={2}
        height={2.4}
        className="fill-room-book-red"
      />
      <rect
        x={7}
        y={68.8}
        width={2}
        height={2.4}
        className="fill-room-book-sky"
      />
    </>
  ),
  // The real jacket, from a photo of it.
  cover: (
    <image
      href="/images/about/books/hyperion.jpg"
      width={50}
      height={74}
      preserveAspectRatio="xMidYMid slice"
    />
  ),
};

// The full shelf, left to right.
const FULL_SHELF: BookSpec[] = [
  SHANTARAM,
  LOVE_DOES,
  WATER_FOR_ELEPHANTS,
  GILT_EDGED,
  PSYCHOLOGY,
  HARVARD_CLASSICS,
  ISHIHARA,
  ASTONISHING_HYPOTHESIS,
  MODERN_ANALYSIS,
  REFLECTIONS,
  DIVINE_COMEDY,
  THINKING_ON_SHELF,
  OBSCURE_SORROWS,
  POWER_OF_KINDNESS,
  FIVE_PEOPLE,
  HYPERION,
];

// Books 3 and 4's shelf: the same, without the gilt-edged book or Love
// Does.
const SHELF_3 = FULL_SHELF.filter(
  (book) => book !== GILT_EDGED && book !== LOVE_DOES,
);

// The Pragmatic Programmer: From Journeyman to Master (1999), by Andrew
// Hunt and David Thomas: a black paperback with the title in large pale
// khaki serif, a dimly lit photo of an old wooden hand plane in the middle,
// the authors in white and Addison-Wesley's small red triangle.
const PRAGMATIC_PROGRAMMER: BookSpec = {
  title: "The Pragmatic Programmer by Andrew Hunt and David Thomas",
  dark: true,
  material: "paperback",
  w: 10,
  h: 72,
  d: 56,
  spine: (
    <>
      <rect width={10} height={72} className="fill-room-metal" />
      <SpineText
        x={5.3}
        y={5}
        length={40}
        size={2.8}
        className="fill-room-book-khaki"
      >
        The Pragmatic Programmer
      </SpineText>
      <SpineText
        x={5.3}
        y={50}
        length={13}
        size={1.7}
        className="fill-room-book-paper/90"
      >
        Hunt · Thomas
      </SpineText>
      <path d="M5 66.6L6.6 69.4H3.4Z" className="fill-room-book-red" />
    </>
  ),
  cover: (
    <>
      <defs>
        {/* The light falling on the plane from the upper left */}
        <radialGradient id="tpp-light" cx="0.3" cy="0.25" r="0.85">
          <stop
            offset="0"
            stopColor="currentColor"
            stopOpacity={0.75}
            className="text-room-book-khaki"
          />
          <stop
            offset="0.5"
            stopColor="currentColor"
            stopOpacity={0.2}
            className="text-room-book-khaki"
          />
          <stop
            offset="1"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-book-khaki"
          />
        </radialGradient>
      </defs>
      <rect width={56} height={72} className="fill-room-metal" />
      <path d="M52.7 3.4L53.6 5H51.8Z" className="fill-room-book-red" />
      <text
        x={8.9}
        y={9.3}
        fontSize={6.2}
        className="fill-room-book-khaki font-serif"
      >
        The
      </text>
      <text
        x={8.9}
        y={14.8}
        fontSize={6.2}
        textLength={35}
        lengthAdjust="spacingAndGlyphs"
        className="fill-room-book-khaki font-serif"
      >
        Pragmatic
      </text>
      <text
        x={12}
        y={20.4}
        fontSize={6.2}
        textLength={40}
        lengthAdjust="spacingAndGlyphs"
        className="fill-room-book-khaki font-serif"
      >
        Programmer
      </text>
      {/* The photo: an old wooden plane on a bench, lit from the left */}
      <rect
        x={19.8}
        y={25}
        width={16.7}
        height={21.3}
        className="fill-room-metal"
      />
      <rect x={19.8} y={25} width={16.7} height={21.3} fill="url(#tpp-light)" />
      <path
        d="M19.8 42L36.5 37.5V46.3H19.8Z"
        className="fill-room-book-khaki/20"
      />
      <g transform="rotate(-14 28 38)">
        {/* Body */}
        <rect
          x={21.5}
          y={36.2}
          width={14}
          height={4}
          rx={0.6}
          className="fill-room-wood-light"
        />
        <rect
          x={21.5}
          y={36.2}
          width={14}
          height={1}
          className="fill-room-brass/50"
        />
        {/* The tote, the handle at the back */}
        <path
          d="M30.5 36.2V31.5Q31.5 30 33 31L33.6 36.2Z"
          className="fill-room-wood"
        />
        {/* The iron and its wedge, rising through the middle */}
        <path
          d="M26.5 36.2L27.6 31.4H29.1L28.6 36.2Z"
          className="fill-room-wood"
        />
        <rect
          x={27.2}
          y={30.6}
          width={1.6}
          height={1.2}
          className="fill-room-mirror/60"
        />
        {/* The front knob */}
        <ellipse
          cx={23.6}
          cy={35.4}
          rx={1.1}
          ry={1}
          className="fill-room-wood"
        />
      </g>
      <Across
        x={28.2}
        y={48.8}
        size={1.9}
        len={14}
        className="fill-room-book-paper/80"
      >
        from journeyman
      </Across>
      <Across
        x={28.2}
        y={50.9}
        size={1.9}
        len={8}
        className="fill-room-book-paper/80"
      >
        to master
      </Across>
      <Across
        x={28}
        y={58.6}
        size={3.6}
        len={19}
        className="fill-room-book-paper"
      >
        Andrew Hunt
      </Across>
      <Across
        x={28}
        y={63.3}
        size={3.6}
        len={23}
        className="fill-room-book-paper"
      >
        David Thomas
      </Across>
      <Across
        x={28}
        y={68.4}
        size={1.8}
        len={28}
        className="fill-room-book-paper/80"
      >
        Foreword by Ward Cunningham
      </Across>
    </>
  ),
};

// Book 5's shelf: Ishihara's out, Pride and Prejudice in the Harvard
// Classics' place, Water for Elephants and The Dictionary of Obscure
// Sorrows moved to the right end, and The Pragmatic Programmer between
// them.
const SHELF_5: BookSpec[] = [
  SHANTARAM,
  PSYCHOLOGY,
  PRIDE_AND_PREJUDICE,
  ASTONISHING_HYPOTHESIS,
  MODERN_ANALYSIS,
  REFLECTIONS,
  DIVINE_COMEDY,
  THINKING_ON_SHELF,
  POWER_OF_KINDNESS,
  FIVE_PEOPLE,
  HYPERION,
  WATER_FOR_ELEPHANTS,
  PRAGMATIC_PROGRAMMER,
  OBSCURE_SORROWS,
];

// Books side by side on the second board, from just inside the left post.
// Book 2 leaves a sliver between them; book 3's touch, like on a real
// shelf, so the pointer never falls between two books.
function BookRow({
  books,
  sweep = false,
  finish = false,
  read = false,
  dim = false,
}: {
  books: BookSpec[];
  sweep?: boolean;
  finish?: boolean;
  read?: boolean;
  dim?: boolean;
}) {
  const gap = sweep ? 0 : 0.3;
  let x = SHELF.left + SHELF.post + 2;
  return (
    <>
      {books.map((book) => {
        const at = x;
        x += book.w + gap;
        return (
          <TurningBook
            key={book.title}
            x={at}
            book={book}
            sweep={sweep}
            finish={finish}
            read={read}
            dim={dim}
          />
        );
      })}
    </>
  );
}

// Books drawn inside the room's SVG. Version 2 is HTML instead (see
// TurningBook), so it draws nothing here.
function Books({ version }: { version: BooksVersion }) {
  if (version === 1) {
    return (
      <ShelfBook
        x={SHELF.left + SHELF.post + 6}
        w={THINKING.w}
        h={THINKING.h}
        title="Thinking, Fast and Slow by Daniel Kahneman"
      >
        <ThinkingFastAndSlow />
      </ShelfBook>
    );
  }
  return null;
}

/* ---------- Basket ---------- */

// My seagrass basket, drawn from photos of it: a wide round tub of thick
// twisted seagrass coiled round in about nine rows, a thicker rope rim,
// pale stakes woven in and out between the coils, jute twine in the gaps,
// and a loop handle at each end wrapped in seagrass. It stands against the
// right post of the second board, sized from the photo: about 45% of the
// shelf's width, its body about 70% of the gap between boards and its
// handles reaching about 85%. Versions, like the books:
// 1. the first drawing, from the photos
// 2. the shape and handles redrawn to the real proportions
// 3. the same, in lighter shades
// 4. the lighter one, a little bigger
export type BasketVersion = 1 | 2 | 3 | 4;

const BASKET = {
  right: SHELF.right - SHELF.post - 2.5,
  w: 111, // across the rim
  foot: 0.76, // the foot's width, as a share of the rim's
  h: 55, // the body, from the foot to the top of the rim
  floor: BOARDS[1],
  rim: 7.2, // the rim's thickness
  handle: { w: 12, rise: 12 }, // each loop, and how far it rises above the rim
};
const BASKET_TONES = [
  "fill-room-basket-wheat",
  "fill-room-basket-straw",
  "fill-room-basket-wheat",
  "fill-room-basket-pale",
  "fill-room-basket-straw",
  "fill-room-basket-wheat",
  "fill-room-basket-tan",
  "fill-room-basket-straw",
];

// The shades a basket is drawn in: its strands' tones, the dark between
// and under them, and the gradients that round its coils. Basket 3 is
// lighter.
type BasketPalette = {
  tones: string[];
  base: string;
  groove: string;
  streak: string;
  weave: string;
  round: string;
  ends: string;
};
const BASKET_DARK: BasketPalette = {
  tones: BASKET_TONES,
  base: "fill-room-basket-shadow",
  groove: "stroke-room-basket-shadow/70",
  streak: "stroke-room-basket-shadow/50",
  weave: "fill-room-basket-deep",
  round: "basket-coil-round",
  ends: "basket-coil-ends",
};
const BASKET_LIGHT: BasketPalette = {
  tones: [
    "fill-room-basket-wheat",
    "fill-room-basket-pale",
    "fill-room-basket-wheat",
    "fill-room-basket-straw",
    "fill-room-basket-pale",
    "fill-room-basket-wheat",
  ],
  base: "fill-room-basket-tan",
  groove: "stroke-room-basket-brown/50",
  streak: "stroke-room-basket-tan/50",
  weave: "fill-room-basket-brown",
  round: "basket-coil-round-light",
  ends: "basket-coil-ends-light",
};

// The lens-shaped outline of a twisted strand from p, `len` long and `w`
// wide, along the angle a (radians, measured up from the right).
function strandOutline([px, py]: Pt, len: number, w: number, a: number) {
  const u: Pt = [Math.cos(a), -Math.sin(a)];
  const v: Pt = [Math.sin(a), Math.cos(a)];
  const at = (t: number, s: number): string =>
    `${(px + u[0] * len * t + v[0] * w * s).toFixed(2)} ${(py + u[1] * len * t + v[1] * w * s).toFixed(2)}`;
  return `M${at(0, 0)}C${at(0.3, 0.65)} ${at(0.7, 0.65)} ${at(1, 0)}C${at(0.7, -0.65)} ${at(0.3, -0.65)} ${at(0, 0)}Z`;
}

// One coil of twisted seagrass across x0 to x1 at y, h tall, with rounded
// ends. Its strands lean along it, grouped by tone so it's a few paths, with
// streaks down them and a pale edge where the light catches. It's shaded to
// look round, and darker toward the ends.
function Coil({
  id,
  x0,
  x1,
  y,
  h,
  lean,
  seed,
  palette = BASKET_DARK,
}: {
  id: string;
  x0: number;
  x1: number;
  y: number;
  h: number;
  lean: number; // degrees; positive leans the strands up to the right
  seed: number;
  palette?: BasketPalette;
}) {
  const r = (k: number) => jitter(seed * 37 + k * 11) + 0.5;
  const tones: Record<string, string> = {};
  let streaks = "";
  let lights = "";
  let grooves = "";
  const step = h * 0.72;
  const len = h * 2.1;
  const w = h * 0.78;
  const a0 = (lean * Math.PI) / 180;
  for (let x = x0 - len, i = 0; x < x1 + step; x += step, i++) {
    const a = a0 + (r(i) - 0.5) * 0.12;
    const dir = Math.sign(lean) || 1;
    // Start below or above the coil so the strand crosses it diagonally.
    const p: Pt = [
      x,
      y +
        h / 2 +
        (dir * len * Math.sin(Math.abs(a))) / 2 +
        (r(i + 50) - 0.5) * h * 0.25,
    ];
    const tone = palette.tones[Math.floor(r(i + 100) * palette.tones.length)];
    const outline = strandOutline(p, len, w, a);
    tones[tone] = (tones[tone] ?? "") + outline;
    grooves += outline;
    const u: Pt = [Math.cos(a), -Math.sin(a)];
    const v: Pt = [Math.sin(a), Math.cos(a)];
    for (const [off, t0, t1] of [
      [0.18, 0.15, 0.8],
      [-0.12, 0.25, 0.9],
    ]) {
      streaks += `M${(p[0] + u[0] * len * t0 + v[0] * w * off).toFixed(2)} ${(p[1] + u[1] * len * t0 + v[1] * w * off).toFixed(2)}L${(p[0] + u[0] * len * t1 + v[0] * w * off).toFixed(2)} ${(p[1] + u[1] * len * t1 + v[1] * w * off).toFixed(2)}`;
    }
    lights += `M${(p[0] + u[0] * len * 0.2 - v[0] * w * 0.38).toFixed(2)} ${(p[1] + u[1] * len * 0.2 - v[1] * w * 0.38).toFixed(2)}L${(p[0] + u[0] * len * 0.75 - v[0] * w * 0.38).toFixed(2)} ${(p[1] + u[1] * len * 0.75 - v[1] * w * 0.38).toFixed(2)}`;
  }
  const shape = { x: x0, y, width: x1 - x0, height: h, rx: h / 2 };
  return (
    <g>
      <clipPath id={id}>
        <rect {...shape} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <rect {...shape} className={palette.base} />
        {Object.entries(tones).map(([tone, d]) => (
          <path key={tone} d={d} className={tone} />
        ))}
        <path
          d={grooves}
          fill="none"
          strokeWidth={0.32}
          className={palette.groove}
        />
        <path
          d={streaks}
          fill="none"
          strokeWidth={0.2}
          strokeLinecap="round"
          className={palette.streak}
        />
        <path
          d={lights}
          fill="none"
          strokeWidth={0.28}
          strokeLinecap="round"
          className="stroke-room-basket-pale/70"
        />
        <rect {...shape} fill={`url(#${palette.round})`} />
        <rect {...shape} fill={`url(#${palette.ends})`} />
      </g>
    </g>
  );
}

// A handle: a thick loop of seagrass rising from the rim at cx, wrapped
// round in strands.
function BasketHandle({
  cx,
  base,
  seed,
}: {
  cx: number;
  base: number;
  seed: number;
}) {
  const { w, rise } = BASKET.handle;
  const top = base - BASKET.rim / 2 - rise;
  const curve: [Pt, Pt, Pt, Pt] = [
    [cx - w / 2 + 1, base],
    [cx - w * 0.7, top - 2],
    [cx + w * 0.7, top - 2],
    [cx + w / 2 - 1, base],
  ];
  const d = `M${curve[0].join(" ")}C${curve[1].join(" ")} ${curve[2].join(" ")} ${curve[3].join(" ")}`;
  const n = 16;
  const tones: Record<string, string> = {};
  for (let i = 0; i <= n; i++) {
    const { at, angle } = bezierAt(curve, i / n);
    const a = (-(angle + 62) * Math.PI) / 180;
    const p: Pt = [at[0] - Math.cos(a) * 2.6, at[1] + Math.sin(a) * 2.6];
    const tone =
      BASKET_TONES[
        Math.floor((jitter(seed * 19 + i * 7) + 0.5) * BASKET_TONES.length)
      ];
    tones[tone] = (tones[tone] ?? "") + strandOutline(p, 5.2, 1.9, a);
  }
  return (
    <g>
      <path
        d={d}
        fill="none"
        strokeWidth={5.2}
        strokeLinecap="round"
        className="stroke-room-basket-shadow"
      />
      {Object.entries(tones).map(([tone, path]) => (
        <path key={tone} d={path} className={tone} />
      ))}
      <path
        d={d}
        fill="none"
        strokeWidth={1.2}
        transform="translate(0.8 1)"
        className="stroke-room-basket-deep/30"
      />
    </g>
  );
}

// A point and its direction on a cubic Bézier curve, at t from 0 to 1.
function bezierAt(
  [p0, p1, p2, p3]: [Pt, Pt, Pt, Pt],
  t: number,
): { at: Pt; angle: number } {
  const u = 1 - t;
  const at: Pt = [
    u ** 3 * p0[0] +
      3 * u * u * t * p1[0] +
      3 * u * t * t * p2[0] +
      t ** 3 * p3[0],
    u ** 3 * p0[1] +
      3 * u * u * t * p1[1] +
      3 * u * t * t * p2[1] +
      t ** 3 * p3[1],
  ];
  const dx =
    3 * u * u * (p1[0] - p0[0]) +
    6 * u * t * (p2[0] - p1[0]) +
    3 * t * t * (p3[0] - p2[0]);
  const dy =
    3 * u * u * (p1[1] - p0[1]) +
    6 * u * t * (p2[1] - p1[1]) +
    3 * t * t * (p3[1] - p2[1]);
  return { at, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

function Basket({ id }: { id: string }) {
  const { right, w, foot, h, floor, rim } = BASKET;
  const left = right - w;
  const cx = left + w / 2;
  const top = floor - h; // top of the rim
  // Half its width at a height t down from the rim (0) to the foot (1):
  // straight sides that curve in toward the foot.
  const half = (t: number) => (w / 2) * (1 - (1 - foot) * t ** 3);
  const rowH = 5.8;
  const gap = 0.9;
  const rows: { y: number; half: number }[] = [];
  for (let y = top + rim + gap; y + rowH <= floor + 0.5; y += rowH + gap) {
    rows.push({ y, half: half((y + rowH / 2 - top) / h) });
  }
  // The stakes: pale rods woven over every other coil.
  const stakes = Array.from(
    { length: 9 },
    (_, i) => cx - w * 0.36 + (i * w * 0.72) / 8,
  );

  return (
    <g>
      <defs>
        {/* A coil reads round: dark at its top and bottom edges */}
        <linearGradient id="basket-coil-round" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0"
            stopColor="currentColor"
            stopOpacity={0.2}
            className="text-room-basket-deep"
          />
          <stop
            offset="0.25"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-basket-deep"
          />
          <stop
            offset="0.55"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-basket-deep"
          />
          <stop
            offset="1"
            stopColor="currentColor"
            stopOpacity={0.35}
            className="text-room-basket-deep"
          />
        </linearGradient>
        {/* And the basket reads round: darker toward its sides, the right
            more than the left, which faces the light */}
        <linearGradient id="basket-coil-ends">
          <stop
            offset="0"
            stopColor="currentColor"
            stopOpacity={0.15}
            className="text-room-basket-deep"
          />
          <stop
            offset="0.15"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-basket-deep"
          />
          <stop
            offset="0.8"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-basket-deep"
          />
          <stop
            offset="1"
            stopColor="currentColor"
            stopOpacity={0.3}
            className="text-room-basket-deep"
          />
        </linearGradient>
      </defs>

      {/* Its shadow on the board */}
      <ellipse
        cx={cx}
        cy={floor}
        rx={half(1) + 2}
        ry={1.8}
        className="fill-room-metal/30"
      />

      {/* The dark inside of the weave, behind the coils */}
      <path
        d={`M${cx - half(0) + 1} ${top + rim / 2}L${cx + half(0) - 1} ${top + rim / 2}${rows
          .map((row) => `L${cx + row.half - 1} ${row.y + rowH / 2}`)
          .join(
            "",
          )}L${cx + half(1) - 3} ${floor}L${cx - half(1) + 3} ${floor}${[
          ...rows,
        ]
          .reverse()
          .map((row) => `L${cx - row.half + 1} ${row.y + rowH / 2}`)
          .join("")}Z`}
        className="fill-room-basket-deep"
      />

      {/* Jute twine in the gaps between the coils */}
      {rows.map((row, i) => (
        <path
          key={row.y}
          d={`M${cx - row.half + 2} ${row.y - gap / 2}H${cx + row.half - 2}`}
          strokeWidth={0.5}
          strokeDasharray="0.9 0.5"
          className={
            i % 2 ? "stroke-room-basket-tan/80" : "stroke-room-basket-straw/70"
          }
        />
      ))}

      {rows.map((row, i) => (
        <Coil
          key={row.y}
          id={`${id}-coil-${i}`}
          x0={cx - row.half}
          x1={cx + row.half}
          y={row.y}
          h={rowH}
          lean={32}
          seed={i + 1}
        />
      ))}

      {/* The stakes, over every other coil */}
      {stakes.map((x, i) =>
        rows.map((row, j) => {
          const sx = cx + ((x - cx) * row.half) / (w / 2);
          return (i + j) % 2 ? null : (
            <g key={`${i}-${j}`}>
              <rect
                x={sx - 0.6}
                y={row.y - gap}
                width={1.2}
                height={rowH * 0.85}
                rx={0.5}
                className="fill-room-basket-wheat"
              />
              <rect
                x={sx + 0.2}
                y={row.y - gap}
                width={0.4}
                height={rowH * 0.85}
                className="fill-room-basket-tan/70"
              />
            </g>
          );
        }),
      )}

      <BasketHandle cx={left + 6} base={top + rim / 2} seed={1} />
      <BasketHandle cx={right - 6} base={top + rim / 2} seed={2} />

      {/* The rim: a thicker coil, its strands leaning the other way */}
      <Coil
        id={`${id}-rim`}
        x0={left}
        x1={right}
        y={top}
        h={rim}
        lean={-30}
        seed={9}
      />
    </g>
  );
}

// Basket 2: the shape and handles redrawn to the real proportions, measured
// from the photo of the whole shelf. It's about 1.3 times as wide as it is
// tall: a round tub that bulges a little below the rim, then curves in to a
// narrower foot with rounded corners. Its handles are narrow upright ears
// at each end, seen nearly edge on and wrapped in seagrass, rising about a
// quarter of its height above the rim and leaning out a little. The coils'
// twists run shallow down to the right; the rim's are steep.
const TUB = {
  right: SHELF.right - SHELF.post - 2, // its widest point, near the post
  h: 57.6, // from the foot to the top of the rim
  aspect: 1.28, // its rim's width over its height
  floor: BOARDS[1],
  rim: 8,
  ear: { w: 6.2, rise: 14 },
};

// Half its width at a height t down from the top of the rim (0) to the
// foot (1), as a share of the rim's half width: out a little to the belly,
// then in to the foot, fastest at the bottom corners.
const TUB_PROFILE: [number, number][] = [
  [0, 1],
  [0.16, 1.02],
  [0.42, 1.04],
  [0.66, 1.02],
  [0.8, 0.97],
  [0.9, 0.9],
  [0.96, 0.82],
  [1, 0.72],
];
function tubHalf(t: number) {
  for (let i = 1; i < TUB_PROFILE.length; i++) {
    const [t1, v1] = TUB_PROFILE[i];
    const [t0, v0] = TUB_PROFILE[i - 1];
    if (t <= t1) return v0 + ((t - t0) / (t1 - t0)) * (v1 - v0);
  }
  return TUB_PROFILE[TUB_PROFILE.length - 1][1];
}

// A handle: a narrow upright ear of wrapped seagrass, its base behind the
// rim at x, leaning out by `lean` degrees, with the loop's opening a dark
// slit seen edge on.
function TubEar({
  id,
  x,
  base,
  top,
  lean,
  seed,
  palette = BASKET_DARK,
}: {
  id: string;
  x: number;
  base: number;
  top: number;
  lean: number;
  seed: number;
  palette?: BasketPalette;
}) {
  const w = TUB.ear.w;
  const l = x - w / 2;
  const r = x + w / 2;
  const tab = `M${l} ${base}L${l + 0.2} ${top + 3.4}Q${l + 0.6} ${top} ${x} ${top - 0.3}Q${r - 0.6} ${top} ${r - 0.2} ${top + 3.4}L${r} ${base}Z`;
  const tones: Record<string, string> = {};
  let grooves = "";
  for (let y = base + 2, i = 0; y > top - 3; y -= 2.1, i++) {
    const tone =
      palette.tones[
        Math.floor((jitter(seed * 23 + i * 7) + 0.5) * palette.tones.length)
      ];
    const outline = strandOutline(
      [l - 1.5, y],
      w + 3.4,
      2.4,
      (32 * Math.PI) / 180,
    );
    tones[tone] = (tones[tone] ?? "") + outline;
    grooves += outline;
  }
  return (
    <g transform={`rotate(${lean} ${x} ${base})`}>
      <clipPath id={id}>
        <path d={tab} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <path d={tab} className={palette.base} />
        {Object.entries(tones).map(([tone, d]) => (
          <path key={tone} d={d} className={tone} />
        ))}
        <path
          d={grooves}
          fill="none"
          strokeWidth={0.3}
          className={palette.groove}
        />
        {/* The loop's opening, seen edge on */}
        <ellipse
          cx={x + 0.3}
          cy={(top + base) / 2 - 1.5}
          rx={0.7}
          ry={(base - top) * 0.22}
          className="fill-room-basket-deep/60"
        />
        <path d={tab} fill={`url(#${palette.ends})`} />
      </g>
    </g>
  );
}

function BasketTub({
  id,
  light = false,
  size = 1,
}: {
  id: string;
  light?: boolean;
  size?: number; // drawn this much bigger, standing in the same place
}) {
  const palette = light ? BASKET_LIGHT : BASKET_DARK;
  const { right: widest, h, aspect, floor, rim, ear } = TUB;
  const rimHalf = (h * aspect) / 2;
  const cx = widest - rimHalf * 1.04;
  const top = floor - h;
  const halfAt = (y: number) => rimHalf * tubHalf((y - top) / h);
  const rowH = 6;
  const gap = 0.8;
  const rows: { y: number; half: number }[] = [];
  for (let y = top + rim + gap; y + rowH <= floor + 0.6; y += rowH + gap) {
    rows.push({ y, half: halfAt(y + rowH / 2) });
  }
  // Its outline, sampled down each side, for the dark weave behind the coils.
  const sides = Array.from(
    { length: 21 },
    (_, i) => top + rim / 2 + (i / 20) * (h - rim / 2),
  );
  const outline = `M${sides.map((y) => `${(cx - halfAt(y) + 0.6).toFixed(2)} ${y.toFixed(2)}`).join("L")}L${[
    ...sides,
  ]
    .reverse()
    .map((y) => `${(cx + halfAt(y) - 0.6).toFixed(2)} ${y.toFixed(2)}`)
    .join("L")}Z`;
  const stakes = Array.from({ length: 7 }, (_, i) => -0.72 + (i * 1.44) / 6);
  const earTop = top - ear.rise;

  return (
    <g
      transform={`translate(${widest} ${floor}) scale(${size}) translate(${-widest} ${-floor})`}
    >
      <defs>
        <linearGradient id="basket-coil-round" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0"
            stopColor="currentColor"
            stopOpacity={0.2}
            className="text-room-basket-deep"
          />
          <stop
            offset="0.25"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-basket-deep"
          />
          <stop
            offset="0.55"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-basket-deep"
          />
          <stop
            offset="1"
            stopColor="currentColor"
            stopOpacity={0.35}
            className="text-room-basket-deep"
          />
        </linearGradient>
        <linearGradient id="basket-coil-ends">
          <stop
            offset="0"
            stopColor="currentColor"
            stopOpacity={0.15}
            className="text-room-basket-deep"
          />
          <stop
            offset="0.15"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-basket-deep"
          />
          <stop
            offset="0.8"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-basket-deep"
          />
          <stop
            offset="1"
            stopColor="currentColor"
            stopOpacity={0.3}
            className="text-room-basket-deep"
          />
        </linearGradient>
        <linearGradient
          id="basket-coil-round-light"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0"
            stopColor="currentColor"
            stopOpacity={0.12}
            className="text-room-basket-shadow"
          />
          <stop
            offset="0.25"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-basket-shadow"
          />
          <stop
            offset="0.55"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-basket-shadow"
          />
          <stop
            offset="1"
            stopColor="currentColor"
            stopOpacity={0.25}
            className="text-room-basket-shadow"
          />
        </linearGradient>
        <linearGradient id="basket-coil-ends-light">
          <stop
            offset="0"
            stopColor="currentColor"
            stopOpacity={0.1}
            className="text-room-basket-shadow"
          />
          <stop
            offset="0.15"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-basket-shadow"
          />
          <stop
            offset="0.8"
            stopColor="currentColor"
            stopOpacity={0}
            className="text-room-basket-shadow"
          />
          <stop
            offset="1"
            stopColor="currentColor"
            stopOpacity={0.2}
            className="text-room-basket-shadow"
          />
        </linearGradient>
      </defs>

      <ellipse
        cx={cx}
        cy={floor}
        rx={rimHalf * 0.8}
        ry={1.8}
        className="fill-room-metal/30"
      />

      {/* The ears, their bases behind the rim */}
      <TubEar
        id={`${id}-ear-l`}
        x={cx - rimHalf + ear.w / 2 - 0.4}
        base={top + rim}
        top={earTop}
        lean={-9}
        seed={1}
        palette={palette}
      />
      <TubEar
        id={`${id}-ear-r`}
        x={cx + rimHalf - ear.w / 2 + 0.4}
        base={top + rim}
        top={earTop + 0.8}
        lean={9}
        seed={2}
        palette={palette}
      />

      <path d={outline} className={palette.weave} />
      {rows.map((row, i) => (
        <path
          key={`t${row.y}`}
          d={`M${cx - row.half + 2} ${row.y - gap / 2}H${cx + row.half - 2}`}
          strokeWidth={0.5}
          strokeDasharray="0.9 0.5"
          className={
            i % 2 ? "stroke-room-basket-tan/80" : "stroke-room-basket-straw/70"
          }
        />
      ))}
      {rows.map((row, i) => (
        <Coil
          key={row.y}
          id={`${id}-coil-${i}`}
          x0={cx - row.half}
          x1={cx + row.half}
          y={row.y}
          h={rowH}
          lean={-20}
          seed={i + 21}
          palette={palette}
        />
      ))}
      {/* The stakes, over every other coil */}
      {stakes.map((f, i) =>
        rows.map((row, j) =>
          (i + j) % 2 ? null : (
            <g key={`${i}-${j}`}>
              <rect
                x={cx + f * row.half - 0.6}
                y={row.y - gap}
                width={1.2}
                height={rowH * 0.85}
                rx={0.5}
                className="fill-room-basket-wheat"
              />
              <rect
                x={cx + f * row.half + 0.2}
                y={row.y - gap}
                width={0.4}
                height={rowH * 0.85}
                className="fill-room-basket-tan/70"
              />
            </g>
          ),
        ),
      )}
      {/* The rim, its twists steep */}
      <Coil
        id={`${id}-rim`}
        x0={cx - rimHalf}
        x1={cx + rimHalf}
        y={top}
        h={rim}
        lean={64}
        seed={29}
        palette={palette}
      />
    </g>
  );
}

/* ---------- Headphones ---------- */

// My black Beats headphones, standing on the third board with the band up
// and the cups resting on the board, turned a little toward us so the red
// "b" shows on each cup. The cord runs from the bottom of the left cup over
// the front of the board and dangles down to the board below, its plug
// lying there. Versions, like the books:
// 1. the first drawing
// 2. laid down as if set down quickly: cuter, matte black, the cord curled
//    in a loop, rocking and swaying gently
// 3. lying on their side like the real ones, still, with a bigger loop in
//    the swaying cord
// 4. the same, with the band lying on the board
// 5. the same, with a cord you can grab and drag about; let go, it falls
//    and curls back into its loop
export type HeadphonesVersion = 1 | 2 | 3 | 4 | 5;

const PHONES = {
  cx: 62, // the middle of the band
  floor: BOARDS[2], // the board they stand on
  below: BOARDS[3], // the board the cord reaches
  cup: { dx: 15.5, rx: 5.6, ry: 9 }, // each cup: from the middle, its size
};

function Headphones() {
  const { cx, floor, below, cup } = PHONES;
  const cupY = floor - cup.ry;
  const cups = [cx - cup.dx, cx + cup.dx];
  const end = floor - 23; // where the band meets the sliders
  // The band: its top edge out and over, then its underside back.
  const band = `M${cx - 17} ${end}C${cx - 26} ${floor - 37} ${cx - 19} ${floor - 48.5} ${cx} ${floor - 48.5}C${cx + 19} ${floor - 48.5} ${cx + 26} ${floor - 37} ${cx + 17} ${end}L${cx + 13.5} ${end}C${cx + 21.5} ${floor - 35} ${cx + 15.5} ${floor - 44.5} ${cx} ${floor - 44.5}C${cx - 15.5} ${floor - 44.5} ${cx - 21.5} ${floor - 35} ${cx - 13.5} ${end}Z`;
  const underside = `M${cx - 13.5} ${end}C${cx - 21.5} ${floor - 35} ${cx - 15.5} ${floor - 44.5} ${cx} ${floor - 44.5}C${cx + 15.5} ${floor - 44.5} ${cx + 21.5} ${floor - 35} ${cx + 13.5} ${end}`;
  const cord = `M${cx - cup.dx} ${floor - 1}C${cx - 20} ${floor + 0.5} ${cx - 24} ${floor + 1} ${cx - 25} ${floor + 6}C${cx - 26.5} ${floor + 30} ${cx - 18} ${floor + 45} ${cx - 21} ${floor + 64}C${cx - 23.5} ${floor + 80} ${cx - 25} ${below - 6} ${cx - 19} ${below - 1.2}L${cx - 9} ${below - 1.2}`;

  return (
    <g>
      <ellipse
        cx={cx}
        cy={floor}
        rx={23}
        ry={1.4}
        className="fill-room-metal/25"
      />

      {/* The cord, from under the left cup down to the next board */}
      <path
        d={cord}
        fill="none"
        strokeWidth={1.1}
        strokeLinecap="round"
        className="stroke-room-headphones"
      />
      <path
        d={cord}
        fill="none"
        strokeWidth={0.3}
        strokeLinecap="round"
        transform="translate(-0.3 -0.2)"
        className="stroke-room-headphones-slider/70"
      />
      {/* Its plug, lying on the board: the strain relief and the jack */}
      <rect
        x={cx - 9.5}
        y={below - 2.2}
        width={4}
        height={2}
        rx={0.8}
        className="fill-room-headphones"
      />
      <rect
        x={cx - 5.6}
        y={below - 1.75}
        width={3.6}
        height={1.1}
        rx={0.4}
        className="fill-room-mirror"
      />
      <path
        d={`M${cx - 4.4} ${below - 1.75}v1.1M${cx - 3.3} ${below - 1.75}v1.1`}
        strokeWidth={0.25}
        className="stroke-room-headphones-slider"
      />

      {/* The cushions, peeking out on the inside of each cup */}
      {cups.map((x, i) => (
        <ellipse
          key={x}
          cx={x + (i ? -3 : 3)}
          cy={cupY - 0.2}
          rx={cup.rx * 0.85}
          ry={cup.ry * 0.94}
          className="fill-room-headphones-cushion"
        />
      ))}

      {/* The band, with its padded underside and a shine along the top */}
      <path d={band} className="fill-room-headphones" />
      <path
        d={underside}
        pathLength={100}
        fill="none"
        strokeWidth={2.2}
        strokeDasharray="0 24 52 100"
        strokeLinecap="round"
        transform="translate(0 1)"
        className="stroke-room-headphones-cushion"
      />
      <path
        d={`M${cx - 14} ${floor - 45}Q${cx - 6} ${floor - 48.2} ${cx + 2} ${floor - 47.9}`}
        fill="none"
        strokeWidth={0.6}
        strokeLinecap="round"
        className="stroke-room-book-paper/30"
      />

      {/* The sliders, from the band down to each cup */}
      {cups.map((x) => (
        <g key={x}>
          <rect
            x={x - 1.2}
            y={end - 1.5}
            width={2.4}
            height={7}
            rx={0.6}
            className="fill-room-headphones-slider"
          />
          <rect
            x={x - 0.3}
            y={end - 1}
            width={0.5}
            height={6}
            className="fill-room-mirror/70"
          />
        </g>
      ))}

      {/* The cups: glossy black shells with the red "b" */}
      {cups.map((x, i) => (
        <g key={x}>
          <ellipse
            cx={x}
            cy={cupY}
            rx={cup.rx}
            ry={cup.ry}
            className="fill-room-headphones"
          />
          <path
            d={`M${x - cup.rx * 0.7} ${cupY - cup.ry * 0.45}Q${x - cup.rx * 0.45} ${cupY - cup.ry * 0.85} ${x} ${cupY - cup.ry * 0.9}`}
            fill="none"
            strokeWidth={0.5}
            strokeLinecap="round"
            className="stroke-room-book-paper/30"
          />
          <g
            transform={`translate(${x + (i ? -0.4 : 0.4)} ${cupY + 0.4}) scale(0.82 1)`}
          >
            <circle r={3.3} className="fill-room-headphones-red" />
            <rect
              x={-1.25}
              y={-2.35}
              width={0.85}
              height={4.1}
              className="fill-room-book-paper"
            />
            <circle
              cx={0.35}
              cy={0.6}
              r={1.15}
              fill="none"
              strokeWidth={0.8}
              className="stroke-room-book-paper"
            />
          </g>
        </g>
      ))}
    </g>
  );
}

// Headphones 2: cuter (rounder cups, a chunkier band) and matte black, with
// the "b" in a slightly lighter black, as on the real matte pair. They lie
// tipped over on their side as if set down quickly, resting on the lower
// cup and the band, and rock gently back and forth. The cord leaves the
// lower cup, goes over the front of the board, curls into a loop as it
// hangs and sways a little behind them, its plug dangling just above the
// board below. With reduced motion, they keep still.
const TOSS = { angle: 95, x: 30 }; // its tilt, and where the lower cup rests,
// near the left post to leave room for the DJ controller

// The headphones standing, centered on (0, 0) between the cups, which are
// circles of radius 9.5 at x = ±15.
const TOSS_BAND: [Pt, Pt, Pt, Pt][] = [
  [
    [-21, -12],
    [-27, -30],
    [-16, -42],
    [0, -42],
  ],
  [
    [0, -42],
    [16, -42],
    [27, -30],
    [21, -12],
  ],
];
const TOSS_CUP = { dx: 15, r: 9.5 };

// Where the tipped-over shape sits: rotated, then moved so its lowest point
// rests on the board with the lower cup at TOSS.x.
const TOSS_POSE = (() => {
  const a = (TOSS.angle * Math.PI) / 180;
  const rot = ([x, y]: Pt): Pt => [
    x * Math.cos(a) - y * Math.sin(a),
    x * Math.sin(a) + y * Math.cos(a),
  ];
  const cups = [-1, 1].flatMap((side) =>
    Array.from(
      { length: 48 },
      (_, i): Pt => [
        side * TOSS_CUP.dx + TOSS_CUP.r * Math.cos((i / 48) * 2 * Math.PI),
        TOSS_CUP.r * Math.sin((i / 48) * 2 * Math.PI),
      ],
    ).map(rot),
  );
  const band = TOSS_BAND.flatMap((seg) =>
    Array.from({ length: 31 }, (_, i) => rot(bezierAt(seg, i / 30).at)),
  );
  const lowest = Math.max(...[...cups, ...band].map(([, y]) => y));
  const cupLow = cups.reduce((p, q) => (q[1] > p[1] ? q : p));
  const dx = TOSS.x - cupLow[0];
  const dy = PHONES.floor - lowest;
  // The lower cup's center, for where the cord leaves it.
  const lower = [-1, 1]
    .map((side) => rot([side * TOSS_CUP.dx, 0]))
    .reduce((p, q) => (q[1] > p[1] ? q : p));
  return {
    transform: `translate(${dx.toFixed(2)} ${dy.toFixed(2)}) rotate(${TOSS.angle})`,
    pivot: [TOSS.x, PHONES.floor] as Pt,
    lowerCup: [lower[0] + dx, lower[1] + dy] as Pt,
  };
})();

function TossedHeadphones() {
  const { floor } = PHONES;
  const { r } = TOSS_CUP;
  const [cupX, cupY] = TOSS_POSE.lowerCup;
  const start: Pt = [cupX - r * 0.62, cupY + r * 0.72];
  const local = (x: number, y: number) => `${x} ${y}`;

  return (
    <g>
      {/* Its soft shadow on the board */}
      <ellipse
        cx={TOSS.x + 11}
        cy={floor}
        rx={17}
        ry={1.4}
        className="fill-room-metal/20"
      />

      <HangingCord start={start} loop="small" />

      {/* The headphones, rocking on the lower cup */}
      <g
        className="animate-phones-rock [transform-box:view-box] motion-reduce:animate-none"
        style={{
          transformOrigin: `${TOSS_POSE.pivot[0]}px ${TOSS_POSE.pivot[1]}px`,
        }}
      >
        <g transform={TOSS_POSE.transform}>
          {/* Cushions, peeking out between the cups */}
          {[-1, 1].map((side) => (
            <ellipse
              key={side}
              cx={side * 7.6}
              cy={0}
              rx={3.8}
              ry={8.3}
              className="fill-room-headphones-cushion"
            />
          ))}
          {/* The band, chunky, with a padded underside and a soft edge */}
          <path
            d={`M${local(-21, -12)}C${local(-27, -30)} ${local(-16, -42)} ${local(0, -42)}C${local(16, -42)} ${local(27, -30)} ${local(21, -12)}L${local(15.2, -12)}C${local(20, -26)} ${local(12, -35.6)} ${local(0, -35.6)}C${local(-12, -35.6)} ${local(-20, -26)} ${local(-15.2, -12)}Z`}
            className="fill-room-headphones-matte"
          />
          <path
            d={`M${local(-15.2, -12)}C${local(-20, -26)} ${local(-12, -35.6)} ${local(0, -35.6)}C${local(12, -35.6)} ${local(20, -26)} ${local(15.2, -12)}`}
            pathLength={100}
            fill="none"
            strokeWidth={2.6}
            strokeDasharray="0 22 56 100"
            strokeLinecap="round"
            transform="translate(0 1.2)"
            className="stroke-room-headphones-cushion"
          />
          <path
            d={`M${local(-21, -12)}C${local(-27, -30)} ${local(-16, -42)} ${local(0, -42)}C${local(16, -42)} ${local(27, -30)} ${local(21, -12)}`}
            fill="none"
            strokeWidth={0.8}
            className="stroke-room-headphones-rim"
          />
          {/* Sliders */}
          {[-1, 1].map((side) => (
            <rect
              key={side}
              x={side * 18.1 - 1.3}
              y={-13}
              width={2.6}
              height={5.5}
              rx={0.8}
              className="fill-room-headphones-slider"
            />
          ))}
          {/* The cups: matte black with a soft rim and the "b" tone on tone */}
          {[-1, 1].map((side) => (
            <g key={side} transform={`translate(${side * TOSS_CUP.dx} 0)`}>
              <circle r={r} className="fill-room-headphones-matte" />
              <circle
                r={r - 0.6}
                fill="none"
                strokeWidth={0.9}
                className="stroke-room-headphones-rim"
              />
              <circle r={3.3} className="fill-room-headphones-rim" />
              <rect
                x={-1.2}
                y={-2.3}
                width={0.8}
                height={3.9}
                className="fill-room-headphones-logo"
              />
              <circle
                cx={0.35}
                cy={0.6}
                r={1.1}
                fill="none"
                strokeWidth={0.75}
                className="stroke-room-headphones-logo"
              />
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}

// A headphone cord from where it leaves a cup at `start`: along the board
// and over its front edge, then hanging down, curling into a loop and on to
// the plug, which dangles just above the board below. The hanging length
// sways gently from the edge (unless motion is reduced).
const CORD_LOOPS: Record<"small" | "big", [Pt, Pt, Pt][]> = {
  small: [
    [
      [3, 34],
      [10, 36],
      [10, 30],
    ],
    [
      [10, 24],
      [3, 23],
      [1, 30],
    ],
  ],
  big: [
    [
      [4, 37],
      [21, 41],
      [21, 28],
    ],
    [
      [21, 13],
      [5, 12],
      [1, 27],
    ],
  ],
};

function HangingCord({
  start,
  loop,
  draggable = false,
}: {
  start: Pt;
  loop: "small" | "big";
  draggable?: boolean; // only the part over the board; Room adds the rest
}) {
  const { floor } = PHONES;
  const edge: Pt = [start[0] - 8, floor + 5]; // where it goes over the board
  const n = (v: number) => v.toFixed(2);
  const pt = ([x, y]: Pt) => `${n(x)} ${n(y)}`;
  const toBoard = `M${n(start[0])} ${n(start[1])}C${n(start[0] - 4)} ${n(floor + 0.3)} ${n(start[0] - 7)} ${n(floor + 1)} ${pt(edge)}`;
  // Down, the loop round to the right and back over itself, then on down
  // to the plug.
  let from = edge;
  const segs = (
    [
      [
        [0.5, 12],
        [-1, 22],
        [1, 28],
      ],
      ...CORD_LOOPS[loop],
      [
        [-1, 38],
        [2, 48],
        [1, 58],
      ],
      [
        [0, 66],
        [1, 72],
        [1, 80],
      ],
    ] as [Pt, Pt, Pt][]
  ).map((points) => {
    const [a, b, c] = points.map(([x, y]): Pt => [edge[0] + x, edge[1] + y]);
    const seg: [Pt, Pt, Pt, Pt] = [from, a, b, c];
    from = c;
    return seg;
  });
  const hanging = `M${pt(edge)}${segs.map(([, a, b, c]) => `C${pt(a)} ${pt(b)} ${pt(c)}`).join("")}`;
  const plug = [edge[0] + 1, edge[1] + 80];
  return (
    <g>
      <path
        d={toBoard}
        fill="none"
        strokeWidth={1.2}
        strokeLinecap="round"
        className="stroke-room-headphones-matte"
      />
      {draggable ? null : ( // Room (see withOverlays), since it hangs in front of the shelf. // The part to drag is drawn above everything, books included, by
        <g
          className="animate-cord-swing [animation-delay:-1.2s] [transform-box:view-box] motion-reduce:animate-none"
          style={{ transformOrigin: `${edge[0]}px ${edge[1]}px` }}
        >
          <path
            d={hanging}
            fill="none"
            strokeWidth={1.2}
            strokeLinecap="round"
            className="stroke-room-headphones-matte"
          />
          <rect
            x={plug[0] - 1}
            y={plug[1]}
            width={2}
            height={4}
            rx={0.8}
            className="fill-room-headphones-matte"
          />
          <rect
            x={plug[0] - 0.55}
            y={plug[1] + 4}
            width={1.1}
            height={3.6}
            rx={0.4}
            className="fill-room-mirror"
          />
          <path
            d={`M${plug[0] - 0.55} ${plug[1] + 5.2}h1.1M${plug[0] - 0.55} ${plug[1] + 6.3}h1.1`}
            strokeWidth={0.25}
            className="stroke-room-headphones-slider"
          />
        </g>
      )}
    </g>
  );
}

// Headphones 3: lying on their side the way the real ones sit when set
// down: one cup standing on its rim facing us, the band to the left and the
// other cup behind, its cushion showing on the right. They're turned so the
// band runs back, away from us: it's short and narrows as it goes, the near
// cup's face is turned a little (narrower, its padded edge showing more),
// and the far cup comes out further to the right. They keep still; only
// the cord moves, with a bigger loop.
// Where the resting headphones' cord leaves the near cup, and where it goes
// over the front edge of the board.
const restingCord = (cx: number = RESTING.cx) => {
  const { scale } = RESTING;
  const start: Pt = [cx - 3 * scale, PHONES.floor - 0.6 * scale];
  const edge: Pt = [start[0] - 8, PHONES.floor + 5];
  return { start, edge };
};

const RESTING = {
  cx: 66,
  cup: { rx: 9.2, ry: 11.6 },
  scale: 1.25, // drawn this much bigger, grown from where it rests
};

// How the band lies, for headphones 3 and 4: its outline, wide where it
// leaves the near cup and narrower as it runs back with its far end
// rounded; the soft edge along its top; and where the joint to the cup
// starts.
type BandPose = "held" | "flat";
function restingBand(pose: BandPose, cx: number, floor: number) {
  const at = (x: number, y: number) => `${cx + x} ${floor + y}`;
  if (pose === "flat") {
    // Lying on the board, its underside along it.
    return {
      outline: `M${at(-4, -11.2)}C${at(-10, -11.6)} ${at(-15, -11.2)} ${at(-19.5, -9.6)}C${at(-24, -8.4)} ${at(-24, -0.2)} ${at(-19, 0)}L${at(-4, 0)}Z`,
      top: `M${at(-4, -10.9)}C${at(-10, -11.3)} ${at(-15, -10.9)} ${at(-19.3, -9.4)}`,
      joint: floor - 11.8,
    };
  }
  // Held up off the board.
  return {
    outline: `M${at(-4, -14.8)}C${at(-10, -15.3)} ${at(-15, -15.1)} ${at(-19.5, -13.8)}A4 4 0 0 0 ${at(-20.6, -6)}C${at(-15, -5.2)} ${at(-10, -4.4)} ${at(-4, -4.2)}Z`,
    top: `M${at(-4, -14.5)}C${at(-10, -15)} ${at(-15, -14.8)} ${at(-19, -13.6)}`,
    joint: floor - 13,
  };
}

function RestingHeadphones({
  band: pose = "held",
  draggableCord = false,
  cx = RESTING.cx,
}: {
  band?: BandPose;
  draggableCord?: boolean;
  cx?: number; // where the near cup's center rests
}) {
  const { floor } = PHONES;
  const { cup, scale } = RESTING;
  const cy = floor - cup.ry;
  const band = restingBand(pose, cx, floor);
  // The cord leaves the bottom of the near cup.
  const cordStart = restingCord(cx).start;

  return (
    <g>
      <g
        transform={`translate(${cx} ${floor}) scale(${scale}) translate(${-cx} ${-floor})`}
      >
        <ellipse
          cx={cx + 2}
          cy={floor}
          rx={25}
          ry={1.5}
          className="fill-room-metal/20"
        />

        {/* The far cup behind: its shell, and its cushion turned toward us,
          with a seam round it */}
        <ellipse
          cx={cx + 18}
          cy={floor - 10.6}
          rx={7.6}
          ry={10.6}
          className="fill-room-headphones-matte"
        />
        <ellipse
          cx={cx + 13.5}
          cy={floor - 10.9}
          rx={8.6}
          ry={10.9}
          className="fill-room-headphones-cushion"
        />
        <path
          d={`M${cx + 7.5} ${floor - 17.5}Q${cx + 14} ${floor - 11.5} ${cx + 19.5} ${floor - 16.5}`}
          fill="none"
          strokeWidth={0.5}
          className="stroke-room-headphones-rim"
        />

        {/* The band, running back to the left, with a soft top edge */}
        <path d={band.outline} className="fill-room-headphones-matte" />
        <path
          d={band.top}
          fill="none"
          strokeWidth={0.7}
          strokeLinecap="round"
          className="stroke-room-headphones-rim"
        />
        <rect
          x={cx - 10.6}
          y={band.joint}
          width={2.6}
          height={7.6}
          rx={1}
          className="fill-room-headphones-rim"
        />

        {/* The near cup: its padded edge showing on the right, then its face
          with a groove round the plate, the "b" tone on tone and a small
          button */}
        <ellipse
          cx={cx + 5}
          cy={cy + 0.2}
          rx={cup.rx + 0.6}
          ry={cup.ry * 0.98}
          className="fill-room-headphones-cushion"
        />
        <g transform={`rotate(-6 ${cx} ${cy})`}>
          <ellipse
            cx={cx}
            cy={cy}
            rx={cup.rx}
            ry={cup.ry}
            className="fill-room-headphones-matte"
          />
          <ellipse
            cx={cx}
            cy={cy}
            rx={cup.rx - 2}
            ry={cup.ry - 2.3}
            fill="none"
            strokeWidth={0.8}
            className="stroke-room-headphones-rim"
          />
          <g transform={`translate(${cx - 1} ${cy - 0.2}) scale(0.97 1.15)`}>
            <circle r={3.3} className="fill-room-headphones-rim" />
            <rect
              x={-1.2}
              y={-2.3}
              width={0.8}
              height={3.9}
              className="fill-room-headphones-logo"
            />
            <circle
              cx={0.35}
              cy={0.6}
              r={1.1}
              fill="none"
              strokeWidth={0.75}
              className="stroke-room-headphones-logo"
            />
          </g>
          <circle
            cx={cx + cup.rx - 1}
            cy={cy + 1}
            r={0.6}
            className="fill-room-headphones-rim"
          />
        </g>
      </g>

      <HangingCord start={cordStart} loop="big" draggable={draggableCord} />
    </g>
  );
}

/* ---------- DJ controller ---------- */

// My Pioneer DJ Opus Quad on the third board beside the headphones: a low
// matte black wedge with the touchscreen rising in the middle, two jog
// wheels, copper knobs and a wood-and-brass front panel with the headphone
// jacks the headphones plug into to turn it on. Drawn from the maker's
// photos, in each photo's pixels, and shrunk to fit beside the headphones.
// Versions, like the books:
// 1. straight on, from the front photo, off: screens dark, rings unlit
// 2. bigger, and seen from a little above, from the angled photo, so its
//    screen, decks and mixer show
// 3. the same, to plug into: drag the headphone cord's plug to its jack and
//    it turns on and comes out bigger (see PlugInDeck)
// 4. flat and straight on like 1, until it's plugged in: then it tilts up
//    into 3's view as it comes out, twice as big, and turns on (see
//    TiltingDeck)
// 5. the same, to play: plugged in, it only lights up and waits for play;
//    then it plays and stops, its faders slide and its jog wheels scratch
//    (see OpusQuadLive)
export type DjVersion = 1 | 2 | 3 | 4 | 5;

// In the front photo the body runs from x 40 to 860 and the base sits on
// y 386.
const OPUS_FRONT = {
  left: 100, // where its left end sits on the board
  width: 148, // a little smaller than the real one, to fit
  floor: BOARDS[2],
};
const OPUS_FRONT_SCALE = OPUS_FRONT.width / 820;
const OPUS_FRONT_PLACE = `translate(${OPUS_FRONT.left - 40 * OPUS_FRONT_SCALE} ${OPUS_FRONT.floor - 386 * OPUS_FRONT_SCALE}) scale(${OPUS_FRONT_SCALE})`;

// In the angled photo the body runs from x 40 to 862 and the base sits on
// y 478.
const OPUS_ANGLED = {
  left: 74, // where its front left corner sits
  width: 172,
  floor: BOARDS[2],
};
const OPUS_ANGLED_SCALE = OPUS_ANGLED.width / 822;
const OPUS_ANGLED_PLACE = `translate(${OPUS_ANGLED.left - 40 * OPUS_ANGLED_SCALE} ${OPUS_ANGLED.floor - 478 * OPUS_ANGLED_SCALE}) scale(${OPUS_ANGLED_SCALE})`;

// DJ 3's big headphone jack (at 370, 460 in the photo), in the room, and
// where shelf 3's resting headphones move to, left of the deck, with a
// longer cord so its plug reaches the jack.
const OPUS_JACK: Pt = [
  OPUS_ANGLED.left + (370 - 40) * OPUS_ANGLED_SCALE,
  OPUS_ANGLED.floor - (478 - 460) * OPUS_ANGLED_SCALE,
];
const PLUG_IN = { phones: 39, cord: 140 };

// DJ 4: each photo's body ends, base and big headphone jack, in its
// pixels; where the deck lies on the board, as wide as 3; and where it
// comes out to, twice that, in the middle of the bookcase and a little
// lower, in front of the board. DJ 5 comes out bigger still, to play, as
// big as fits the window and the cord's reach, and higher, its base above
// the headphones so they stay in view with the cord running from them up
// to the jack, and room between for a note on how to turn it off.
const OPUS_PHOTOS = {
  flat: { body: [40, 860], base: 386, jack: [373, 350] },
  tilted: { body: [40, 862], base: 478, jack: [370, 460] },
} satisfies Record<string, { body: Pt; base: number; jack: Pt }>;
const OPUS_TILT = {
  rest: { center: OPUS_ANGLED.left + 86, width: 172, floor: BOARDS[2] },
  out: { center: SHELF.right / 2, width: 344, floor: BOARDS[2] + 24 },
  play: { center: SHELF.right / 2, width: 760, floor: BOARDS[2] - 62 },
  playCord: 150,
};

// `place` puts it on the board; null leaves it in the photo's pixels.
function OpusQuadFront({
  place = OPUS_FRONT_PLACE,
}: {
  place?: string | null;
}) {
  const knob = (x: number) => (
    <g key={x}>
      <circle cx={x} cy={350} r={7} className="fill-room-dj-base" />
      <circle cx={x} cy={349} r={4.5} className="fill-room-dj-jog" />
      <rect
        x={x - 0.6}
        y={343}
        width={1.2}
        height={4}
        className="fill-room-mirror"
      />
    </g>
  );
  const copper = (x: number, y: number, w: number, h: number) => (
    <g key={`${x}-${y}`}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={3}
        className="fill-room-dj-copper"
      />
      {Array.from({ length: Math.floor(w / 3) }, (_, i) => (
        <rect
          key={i}
          x={x + 1.5 + i * 3}
          y={y + 2}
          width={1}
          height={h - 4}
          className="fill-room-dj-wood-dark/40"
        />
      ))}
      <rect
        x={x + 2}
        y={y + 1}
        width={w - 4}
        height={2.5}
        rx={1.2}
        className="fill-room-dj-copper-light"
      />
    </g>
  );
  const jog = (cx: number, rx: number) => (
    <g key={cx}>
      <ellipse cx={cx} cy={313} rx={rx} ry={9} className="fill-room-dj-jog" />
      <ellipse
        cx={cx}
        cy={313}
        rx={rx * 0.76}
        ry={6.5}
        fill="none"
        strokeWidth={1.5}
        className="stroke-room-dj-groove"
      />
      <ellipse
        cx={cx}
        cy={313}
        rx={rx * 0.52}
        ry={4.5}
        fill="none"
        strokeWidth={1.5}
        className="stroke-room-dj-groove"
      />
      <ellipse cx={cx} cy={313} rx={7} ry={1.8} className="fill-room-dj-base" />
    </g>
  );

  return (
    <g transform={place ?? undefined}>
      <ellipse
        cx={450}
        cy={386}
        rx={440}
        ry={7}
        className="fill-room-metal/25"
      />

      {/* On top: the touchscreen in its housing, the jog platters, the
          mixer's fader caps and the copper knobs */}
      <path
        d="M318 320L322 270Q323 266 327 266H545Q549 266 550 270L554 320Z"
        className="fill-room-dj-body"
      />
      <rect
        x={352}
        y={270}
        width={194}
        height={30}
        rx={1.5}
        className="fill-room-dj-screen"
      />
      <path
        d="M356 272L400 272L372 298H356Z"
        className="fill-room-book-paper/5"
      />
      {[278, 288].map((y) => (
        <rect
          key={y}
          x={326}
          y={y}
          width={18}
          height={6}
          rx={1}
          className="fill-room-dj-base"
        />
      ))}
      {jog(218, 76)}
      {jog(682, 80)}
      {[362, 397, 432, 467, 502].map((x) => (
        <g key={x}>
          <rect
            x={x}
            y={301}
            width={14}
            height={18}
            rx={1.5}
            className="fill-room-dj-base"
          />
          <rect
            x={x + 2}
            y={302}
            width={10}
            height={3}
            rx={1}
            className="fill-room-dj-jog"
          />
        </g>
      ))}
      {copper(114, 289, 18, 21)}
      {copper(557, 278, 20, 20)}
      {copper(563, 298, 15, 19)}
      <rect
        x={767}
        y={286}
        width={10}
        height={22}
        rx={2}
        className="fill-room-dj-base"
      />

      {/* The base it stands on, set in a little */}
      <rect
        x={90}
        y={366}
        width={720}
        height={20}
        rx={3}
        className="fill-room-dj-base"
      />

      {/* The body's front: the top slab, chamfered at its ends, with the
          seams between its three sections */}
      <path
        d="M40 323L52 316H848L860 323V370H40Z"
        className="fill-room-dj-body"
      />
      <rect
        x={52}
        y={316}
        width={796}
        height={1.5}
        className="fill-room-dj-groove"
      />
      {[345, 560].map((x) => (
        <rect
          key={x}
          x={x - 0.75}
          y={316}
          width={1.5}
          height={17}
          className="fill-room-dj-base"
        />
      ))}

      {/* The wood-and-brass front panel, with its grain */}
      <rect
        x={40}
        y={333}
        width={820}
        height={33}
        className="fill-room-dj-wood"
      />
      <rect
        x={40}
        y={334}
        width={820}
        height={1.5}
        className="fill-room-dj-wood-light"
      />
      <rect
        x={40}
        y={351}
        width={820}
        height={1}
        className="fill-room-dj-wood-light/60"
      />
      <rect
        x={40}
        y={343}
        width={820}
        height={0.8}
        className="fill-room-dj-wood-dark/60"
      />
      <rect
        x={40}
        y={359}
        width={820}
        height={0.8}
        className="fill-room-dj-wood-dark/60"
      />
      <rect
        x={40}
        y={364}
        width={820}
        height={2}
        className="fill-room-dj-wood-dark"
      />

      {/* The mic input, its switch and level knobs on the left */}
      <circle cx={135} cy={350} r={10.5} className="fill-room-dj-base" />
      <circle
        cx={135}
        cy={350}
        r={7}
        fill="none"
        strokeWidth={1.5}
        className="stroke-room-dj-groove"
      />
      <circle cx={135} cy={350} r={3.5} className="fill-room-dj-base" />
      <rect
        x={176}
        y={344}
        width={20}
        height={12}
        rx={1.5}
        className="fill-room-dj-base"
      />
      <rect
        x={179}
        y={346}
        width={7}
        height={8}
        rx={1}
        className="fill-room-dj-jog"
      />
      {[216, 240, 263, 287].map(knob)}

      {/* The headphone jacks, in the middle: a big one and a small one */}
      <circle cx={373} cy={350} r={7} className="fill-room-brass" />
      <circle cx={373} cy={350} r={4} className="fill-room-dj-base" />
      <circle cx={393} cy={350} r={3.6} className="fill-room-brass" />
      <circle cx={393} cy={350} r={2} className="fill-room-dj-base" />
    </g>
  );
}

// `live` leaves out the fader caps, for DJ 5, which draws them to move.
function OpusQuadAngled({
  place = OPUS_ANGLED_PLACE,
  live = false,
}: {
  place?: string | null;
  live?: boolean;
}) {
  const jog = (cx: number) => (
    <g key={cx}>
      <ellipse
        cx={cx}
        cy={353}
        rx={100}
        ry={64}
        className="fill-room-dj-base"
      />
      <ellipse
        cx={cx}
        cy={353}
        rx={96}
        ry={61}
        fill="none"
        strokeWidth={3}
        className="stroke-room-dj-copper/40"
      />
      <ellipse cx={cx} cy={352} rx={88} ry={56} className="fill-room-dj-jog" />
      <ellipse
        cx={cx}
        cy={352}
        rx={74}
        ry={47}
        fill="none"
        strokeWidth={1.5}
        className="stroke-room-dj-groove"
      />
      <ellipse
        cx={cx}
        cy={351}
        rx={57}
        ry={36}
        fill="none"
        strokeWidth={1.5}
        className="stroke-room-dj-groove"
      />
      <ellipse cx={cx} cy={347} rx={22} ry={13} className="fill-room-dj-base" />
      <ellipse
        cx={cx}
        cy={347}
        rx={9}
        ry={5.5}
        fill="none"
        strokeWidth={2}
        className="stroke-room-mirror/60"
      />
    </g>
  );
  const button = (cx: number, cy: number) => (
    <ellipse
      key={`${cx}-${cy}`}
      cx={cx}
      cy={cy}
      rx={16}
      ry={12}
      strokeWidth={2}
      className="fill-room-dj-base stroke-room-book-paper/60"
    />
  );
  const knob = (cx: number, cy: number, r = 6) => (
    <g key={`${cx}-${cy}`}>
      <ellipse
        cx={cx}
        cy={cy}
        rx={r}
        ry={r * 0.85}
        className="fill-room-dj-base"
      />
      <ellipse
        cx={cx}
        cy={cy - 1}
        rx={r * 0.65}
        ry={r * 0.5}
        className="fill-room-dj-jog"
      />
    </g>
  );
  const copper = (cx: number, cy: number) => (
    <g key={`${cx}-${cy}`}>
      <ellipse
        cx={cx}
        cy={cy + 2}
        rx={11}
        ry={9}
        className="fill-room-dj-base"
      />
      <ellipse
        cx={cx}
        cy={cy}
        rx={9}
        ry={7.5}
        className="fill-room-dj-copper"
      />
      <ellipse
        cx={cx}
        cy={cy - 2}
        rx={6}
        ry={4}
        className="fill-room-dj-copper-light"
      />
    </g>
  );
  const fader = (
    cx: number,
    top: number,
    bottom: number,
    cap: number,
    w = 18,
  ) => (
    <g key={`${cx}-${top}`}>
      <rect
        x={cx - 1.5}
        y={top}
        width={3}
        height={bottom - top}
        className="fill-room-dj-base"
      />
      {!live && (
        <>
          <rect
            x={cx - w / 2}
            y={cap}
            width={w}
            height={10}
            rx={1.5}
            className="fill-room-dj-jog"
          />
          <rect
            x={cx - w / 2}
            y={cap + 4.5}
            width={w}
            height={1}
            className="fill-room-book-paper/40"
          />
        </>
      )}
    </g>
  );

  return (
    <g transform={place ?? undefined}>
      <ellipse
        cx={451}
        cy={478}
        rx={430}
        ry={8}
        className="fill-room-metal/25"
      />

      {/* The top, narrower at the back than at the front, its front edge
          curving down a little in the middle */}
      <path
        d="M118 222H805L862 442Q451 449 40 442Z"
        className="fill-room-dj-body"
      />
      <path
        d="M118 222H805"
        strokeWidth={2}
        className="stroke-room-dj-groove"
      />
      <path
        d="M338 262L335 444M550 262L553 444"
        strokeWidth={2.5}
        className="stroke-room-dj-base"
      />

      {/* The touchscreen, standing up from the back of the mixer, with its
          side buttons and browse knob */}
      <rect
        x={316}
        y={175}
        width={247}
        height={87}
        rx={6}
        className="fill-room-dj-body"
      />
      <rect
        x={352}
        y={179}
        width={190}
        height={79}
        rx={2}
        className="fill-room-dj-screen"
      />
      <path d="M356 181H420L372 256H356Z" className="fill-room-book-paper/5" />
      {[188, 204, 220, 236].map((y) => (
        <rect
          key={y}
          x={322}
          y={y}
          width={24}
          height={9}
          rx={1.5}
          className="fill-room-dj-base"
        />
      ))}
      {copper(552, 214)}

      {/* Each deck: its small screen, hot cue pads, jog wheel, cue and play
          buttons, tempo fader and copper knob */}
      {[158, 598].map((x) => (
        <rect
          key={x}
          x={x}
          y={228}
          width={142}
          height={34}
          rx={2}
          className="fill-room-dj-screen"
        />
      ))}
      {[145, 588].map((x0) =>
        Array.from({ length: 8 }, (_, i) => (
          <rect
            key={`${x0}-${i}`}
            x={x0 + i * 21}
            y={274}
            width={16}
            height={8}
            rx={1.5}
            className="fill-room-dj-base"
          />
        )),
      )}
      {jog(211)}
      {jog(683)}
      {[92, 568].flatMap((x) => [button(x, 383), button(x, 413)])}
      {fader(316, 345, 420, 358, 24)}
      {fader(789, 360, 432, 380, 24)}
      {copper(122, 288)}
      {copper(568, 288)}
      {[230, 252].map((y) => knob(178, y, 7))}
      {[230, 252].map((y) => knob(782, y, 7))}

      {/* The mixer: a knob grid, the copper sound-color knobs, the channel
          buttons and faders, the crossfader and the master section */}
      {[398, 432, 465, 500].map((x) => (
        <g key={x}>
          {[276, 292, 310].map((y) => knob(x, y))}
          <ellipse
            cx={x}
            cy={330}
            rx={8}
            ry={6.5}
            strokeWidth={1.8}
            className="fill-room-dj-base stroke-room-dj-copper"
          />
          <rect
            x={x - 10}
            y={352}
            width={20}
            height={6}
            rx={1.5}
            className="fill-room-mirror/40"
          />
          {fader(x, 365, 402, 370)}
        </g>
      ))}
      <rect
        x={420}
        y={416}
        width={62}
        height={3}
        className="fill-room-dj-base"
      />
      {!live && (
        <rect
          x={445}
          y={408}
          width={12}
          height={18}
          rx={1.5}
          className="fill-room-dj-jog"
        />
      )}
      {[300, 330, 360].map((y) => knob(522, y))}
      <ellipse
        cx={522}
        cy={413}
        rx={7}
        ry={6}
        strokeWidth={2}
        className="fill-room-dj-base stroke-room-dj-copper"
      />
      <text
        x={451}
        y={438}
        fontSize={7}
        textAnchor="middle"
        textLength={42}
        lengthAdjust="spacingAndGlyphs"
        className="fill-room-mirror/50 font-mono"
      >
        OPUS-QUAD
      </text>

      {/* The base, then the wood-and-brass front panel with its grain */}
      <path d="M78 468H824L816 478H86Z" className="fill-room-dj-base" />
      <path
        d="M40 442Q451 449 862 442V468Q451 475 40 468Z"
        className="fill-room-dj-wood"
      />
      <path
        d="M40 444Q451 451 862 444"
        fill="none"
        strokeWidth={1.5}
        className="stroke-room-dj-wood-light"
      />
      <path
        d="M40 454Q451 461 862 454"
        fill="none"
        strokeWidth={0.8}
        className="stroke-room-dj-wood-dark/60"
      />
      <path
        d="M40 466Q451 473 862 466"
        fill="none"
        strokeWidth={2}
        className="stroke-room-dj-wood-dark"
      />

      {/* The mic input, its switch and level knobs, and the headphone
          jacks in the middle */}
      <circle cx={136} cy={458} r={8} className="fill-room-dj-base" />
      <circle
        cx={136}
        cy={458}
        r={5}
        fill="none"
        strokeWidth={1.2}
        className="stroke-room-dj-groove"
      />
      <rect
        x={174}
        y={453}
        width={18}
        height={10}
        rx={1.5}
        className="fill-room-dj-base"
      />
      {[217, 240, 262, 286].map((x) => (
        <g key={x}>
          <circle cx={x} cy={459} r={6.5} className="fill-room-dj-base" />
          <circle cx={x} cy={458} r={4} className="fill-room-dj-jog" />
        </g>
      ))}
      <circle cx={370} cy={460} r={6} className="fill-room-brass" />
      <circle cx={370} cy={460} r={3.4} className="fill-room-dj-base" />
      <circle cx={392} cy={460} r={3.2} className="fill-room-brass" />
      <circle cx={392} cy={460} r={1.8} className="fill-room-dj-base" />
    </g>
  );
}

// DJ 3 turned on, drawn over it once it's plugged in: the touchscreen with
// both decks' waveforms scrolling past the playhead, beatmatched, and
// their tracks below; the deck screens lit; hot cues set in color; the jog
// rings glowing amber with their center displays turning; cue and play
// lit; and the first two channels' level meters bouncing. In the angled
// photo's pixels, like the deck. `live` leaves out everything that moves
// or changes, for DJ 5, which draws it as it's played: the waveforms,
// playhead and where each track's at, the jog rings and displays, the
// pads, cue and play, and the meters.
function OpusQuadLights({
  id,
  place = OPUS_ANGLED_PLACE,
  live = false,
}: {
  id: string;
  place?: string | null;
  live?: boolean;
}) {
  const decks = [
    { cy: 199, phase: 0, delay: "0s" },
    { cy: 225, phase: 9, delay: "-0.25s" },
  ];
  const pads: (string | null)[][] = [
    ["pink", "amber", "green", "cyan", null, null, "blue", null],
    ["green", "cyan", null, "amber", "pink", null, null, null],
  ];
  const padColor: Record<string, string> = {
    pink: "fill-room-dj-lit-pink",
    amber: "fill-room-dj-lit-amber",
    green: "fill-room-dj-lit-green",
    cyan: "fill-room-dj-lit-cyan",
    blue: "fill-room-dj-lit-blue",
  };
  const meter = ["green", "green", "green", "green", "amber", "amber"];

  return (
    <g transform={place ?? undefined}>
      <defs>
        <radialGradient
          id={`${id}-screen-glow`}
          className="text-room-dj-lit-blue"
        >
          <stop offset="0" stopColor="currentColor" stopOpacity={0.3} />
          <stop offset="1" stopColor="currentColor" stopOpacity={0} />
        </radialGradient>
        <clipPath id={`${id}-screen`}>
          <rect x={352} y={179} width={190} height={79} rx={2} />
        </clipPath>
      </defs>
      <ellipse
        cx={447}
        cy={218}
        rx={150}
        ry={90}
        fill={`url(#${id}-screen-glow)`}
      />

      {/* The touchscreen: a status line, both waveforms scrolling past the
          playhead, and each track's whole waveform with where it's at */}
      <rect
        x={352}
        y={179}
        width={190}
        height={79}
        rx={2}
        className="fill-room-dj-lit-screen"
      />
      {!live && (
        <>
          <g clipPath={`url(#${id}-screen)`}>
            <g className="animate-dj-scroll motion-reduce:animate-none">
              {decks.map(({ cy, phase }) => {
                const bands = waveBands(cy, phase);
                return (
                  <g key={cy}>
                    <path d={bands.low} className="fill-room-dj-lit-blue" />
                    <path d={bands.mid} className="fill-room-dj-lit-amber" />
                    <path d={bands.high} className="fill-room-frost" />
                  </g>
                );
              })}
            </g>
          </g>
          <path
            d="M447 188V236"
            strokeWidth={1.5}
            className="stroke-room-frost"
          />
        </>
      )}
      <rect
        x={357}
        y={182}
        width={34}
        height={3.5}
        rx={1}
        className="fill-room-frost/70"
      />
      <rect
        x={395}
        y={182}
        width={14}
        height={3.5}
        rx={1}
        className="fill-room-dj-lit-amber"
      />
      <rect
        x={485}
        y={182}
        width={34}
        height={3.5}
        rx={1}
        className="fill-room-frost/70"
      />
      <rect
        x={523}
        y={182}
        width={14}
        height={3.5}
        rx={1}
        className="fill-room-dj-lit-amber"
      />
      {[
        { cy: 244, at: 0.4, seed: 0 },
        { cy: 252, at: 0.65, seed: 40 },
      ].map(({ cy, at, seed }) => (
        <g key={cy}>
          <path
            d={overviewBars(357, 537, cy, seed)}
            className="fill-room-dj-lit-blue/70"
          />
          {!live && (
            <rect
              x={357 + 180 * at}
              y={cy - 4}
              width={1.5}
              height={8}
              className="fill-room-frost"
            />
          )}
        </g>
      ))}
      {!live && (
        <path
          d="M356 181H420L372 256H356Z"
          className="fill-room-book-paper/5"
        />
      )}

      {/* Each deck's screen: its track, tempo and time, and where it's at */}
      {[
        { x: 158, at: 0.4, seed: 7 },
        { x: 598, at: 0.65, seed: 61 },
      ].map(({ x, at, seed }) => (
        <g key={x}>
          <rect
            x={x}
            y={228}
            width={142}
            height={34}
            rx={2}
            className="fill-room-dj-lit-screen"
          />
          <rect
            x={x + 6}
            y={232}
            width={54}
            height={4}
            rx={1}
            className="fill-room-frost/70"
          />
          <rect
            x={x + 68}
            y={232}
            width={22}
            height={4}
            rx={1}
            className="fill-room-dj-lit-amber"
          />
          <rect
            x={x + 100}
            y={232}
            width={36}
            height={4}
            rx={1}
            className="fill-room-frost/70"
          />
          <path
            d={overviewBars(x + 6, x + 136, 250, seed)}
            className="fill-room-dj-lit-blue/70"
          />
          {!live && (
            <rect
              x={x + 6 + 130 * at}
              y={243}
              width={1.5}
              height={14}
              className="fill-room-frost"
            />
          )}
        </g>
      ))}

      {/* Hot cues set on some pads, each in its own color */}
      {!live &&
        [145, 588].map((x0, deck) =>
          pads[deck].map((color, i) =>
            color ? (
              <rect
                key={`${x0}-${i}`}
                x={x0 + i * 21}
                y={274}
                width={16}
                height={8}
                rx={1.5}
                className={padColor[color]}
              />
            ) : null,
          ),
        )}

      {/* The jog wheels: their rings glowing, their center displays turning */}
      {[211, 683].map((cx) => (
        <g key={cx}>
          {!live && (
            <>
              <ellipse
                cx={cx}
                cy={353}
                rx={96}
                ry={61}
                fill="none"
                strokeWidth={10}
                className="stroke-room-dj-lit-amber/20"
              />
              <ellipse
                cx={cx}
                cy={353}
                rx={96}
                ry={61}
                fill="none"
                strokeWidth={3}
                className="stroke-room-dj-lit-amber"
              />
            </>
          )}
          <ellipse
            cx={cx}
            cy={347}
            rx={22}
            ry={13}
            className="fill-room-dj-lit-screen"
          />
          {!live && (
            <g transform={`translate(${cx} 347) scale(1 ${13 / 22})`}>
              <g className="origin-center animate-jog-spin [transform-box:fill-box] motion-reduce:animate-none">
                <circle
                  r={18}
                  fill="none"
                  strokeWidth={2}
                  className="stroke-room-dj-lit-amber/40"
                />
                <path
                  d="M0 -18V-9"
                  strokeWidth={4}
                  strokeLinecap="round"
                  className="stroke-room-frost"
                />
              </g>
            </g>
          )}
        </g>
      ))}

      {/* Cue lit amber and play green */}
      {!live &&
        [92, 568].map((x) => (
          <g key={x}>
            <ellipse
              cx={x}
              cy={383}
              rx={16}
              ry={12}
              strokeWidth={3}
              className="fill-room-dj-base stroke-room-dj-lit-amber"
            />
            <ellipse
              cx={x}
              cy={413}
              rx={16}
              ry={12}
              strokeWidth={3}
              className="fill-room-dj-base stroke-room-dj-lit-green"
            />
          </g>
        ))}

      {/* The level meters beside channels 1 and 2's faders, on the beat */}
      {!live &&
        [411, 445].map((x, i) => (
          <g key={x}>
            <rect
              x={x - 2.5}
              y={365}
              width={5}
              height={37}
              rx={1}
              className="fill-room-dj-base"
            />
            <g
              className="origin-bottom animate-dj-level [transform-box:fill-box] motion-reduce:animate-none"
              style={{ animationDelay: decks[i].delay }}
            >
              {meter.map((color, k) => (
                <rect
                  key={k}
                  x={x - 1.5}
                  y={396 - k * 5.6}
                  width={3}
                  height={4.4}
                  className={
                    color === "green"
                      ? "fill-room-dj-lit-green"
                      : "fill-room-dj-lit-amber"
                  }
                />
              ))}
            </g>
          </g>
        ))}
    </g>
  );
}

/* ---------- Camera ---------- */

// My purple Fujifilm FinePix Z37 on the board below the DJ deck, straight
// on, bigger than life so it can be picked up. It's HTML over the drawing,
// so it can come off the shelf and be used (see Camera.tsx). Versions:
// 1. comes out and turns round to show its back, to take a photo and leave
//    it, or see the ones left, mine first
// 2. bigger, sitting off with its lens cover closed; slides it open to turn
//    on, comes out bigger still and starts up, its shutter pulsing
// 3. lying on its back; stands up as it comes out, then slides its cover
//    open, then turns round. Its shutter keeps each photo; the trash
//    deletes it
// 4. the same, traced closer to the photos, with more colors and shine
// 5. the same, a little smaller, left of the lava lamp
export type CameraVersion = 1 | 2 | 3 | 4 | 5;

// Where each sits on the board: its left end and how wide it is
const CAMERA = {
  1: { left: 163, width: 46 },
  2: { left: 151, width: 70 },
  3: { left: 151, width: 66 },
  4: { left: 151, width: 66 },
  5: { left: 166, width: 46 },
};
const cameraBox = (version: CameraVersion) => {
  const { left, width } = CAMERA[version];
  // Its drawing's shape: standing, or for cameras 3 and 4 lying down
  const height = (width * (version >= 3 ? 52 : 112)) / 184;
  return {
    left: `${((left - VIEW.left) / VIEW.width) * 100}%`,
    top: `${((BOARDS[3] - height - VIEW.top) / VIEW.height) * 100}%`,
    width: `${(width / VIEW.width) * 100}%`,
    height: `${(height / VIEW.height) * 100}%`,
  };
};

/* ---------- Pothos cuttings and the clock ---------- */

// My pothos cuttings rooting in water, beside the lava lamp: three clear
// glass milk bottles in a black wire stand, each about two thirds full,
// a cutting in each, its roots pale in the water and its heart-shaped
// leaves out of the neck: one big leaf on the left, a big one and a small
// one in the middle, and one leaning out on the right. Beside them, my
// black and gold clock, telling the time wherever whoever's looking is
// (see Clock.tsx). Versions:
// 1. straight on, from a photo of my shelf
// 2. the cuttings traced to look real, their wire stand thicker; the
//    clock a little bigger
// 3. the same, the leaves without their gloss
// 4. the cuttings with true pothos leaves; the clock minimal, a single
//    gold dash at each hour in a gold rim
// 5. the same on bookcase 5, the clock first, everything on the board
//    spaced out evenly, and the leaves swaying in time with the headphone
//    cord (Sway.tsx)
// All sit on the lava lamp's board, beside it, in my shelf's order:
// cuttings, clock, lava lamp, camera.
export type CuttingsVersion = 1 | 2 | 3 | 4 | 5;
export type ClockVersion = 1 | 2 | 3 | 4 | 5;

// The stand's left end, and the clock's middle and size, by version
const CUTTINGS = {
  1: { x: 64, floor: BOARDS[3] },
  2: { x: 36, floor: BOARDS[3] },
  3: { x: 36, floor: BOARDS[3] },
  4: { x: 36, floor: BOARDS[3] },
  5: { x: 101, floor: BOARDS[3] },
};
const CLOCK = {
  1: { x: 125, floor: BOARDS[3], r: 13 },
  2: { x: 104, floor: BOARDS[3], r: 15 },
  3: { x: 104, floor: BOARDS[3], r: 15 },
  4: { x: 104, floor: BOARDS[3], r: 15, minimal: true },
  5: { x: 70, floor: BOARDS[3], r: 15, minimal: true },
};
const BOTTLE = { w: 12.5, h: 26, gap: 2, neck: 7.4, water: 16 };

// A pothos leaf, heart shaped, its stalk at 0, 0 and its tip `size` up
const leaf = (size: number) => {
  const p = (x: number, y: number) =>
    `${(x * size).toFixed(2)} ${(y * size).toFixed(2)}`;
  return `M0 0C${p(-0.25, 0.12)} ${p(-0.62, -0.05)} ${p(-0.55, -0.42)}C${p(-0.48, -0.72)} ${p(-0.15, -0.9)} ${p(0, -1)}C${p(0.15, -0.9)} ${p(0.48, -0.72)} ${p(0.55, -0.42)}C${p(0.62, -0.05)} ${p(0.25, 0.12)} 0 0Z`;
};

// Each cutting: the stem's lean out of the neck, and its leaves, each
// where it grows from the stem, how big and which way it points
const CUTTING_LEAVES = [
  { stem: -1.5, leaves: [{ at: [-1.5, -4], size: 12, turn: -14 }] },
  {
    stem: 0.5,
    leaves: [
      { at: [-0.6, -6], size: 12.5, turn: -8 },
      { at: [1.6, -2.5], size: 8, turn: 62 },
    ],
  },
  { stem: 3, leaves: [{ at: [3, -3], size: 11, turn: 58 }] },
];

function Cuttings() {
  const { x, floor } = CUTTINGS[1];
  const { w, h, gap, neck, water } = BOTTLE;
  const width = 3 * w + 2 * gap + 2;
  return (
    <g>
      {CUTTING_LEAVES.map(({ stem, leaves }, i) => {
        const left = x + 1 + i * (w + gap);
        const mid = left + w / 2;
        const top = floor - h;
        const n = neck / 2;
        // The bottle: round shouldered, a short neck and a lip
        const bottle = `M${left + 1.2} ${floor}Q${left} ${floor} ${left} ${floor - 1.2}V${top + 9}C${left} ${top + 6} ${mid - n} ${top + 6.5} ${mid - n} ${top + 4}V${top + 1.6}H${mid - n - 0.5}V${top}H${mid + n + 0.5}V${top + 1.6}H${mid + n}V${top + 4}C${mid + n} ${top + 6.5} ${left + w} ${top + 6} ${left + w} ${top + 9}V${floor - 1.2}Q${left + w} ${floor} ${left + w - 1.2} ${floor}Z`;
        const neckTop = top - 0.5;
        return (
          <g key={i}>
            {/* The water, two thirds up, and its surface */}
            <rect
              x={left + 0.6}
              y={floor - water}
              width={w - 1.2}
              height={water - 0.6}
              rx={1}
              className="fill-room-glass/30"
            />
            <path
              d={`M${left + 0.8} ${floor - water}H${left + w - 0.8}`}
              strokeWidth={0.4}
              className="stroke-room-frost"
            />
            {/* The stem down into the water, and its pale roots */}
            <path
              d={`M${mid + stem} ${neckTop - 1}Q${mid + stem * 0.3} ${top + 4} ${mid} ${floor - 6}`}
              fill="none"
              strokeWidth={0.7}
              className="stroke-room-plant"
            />
            <path
              d={`M${mid} ${floor - 6}q-1.6 1.6 -2.6 4.2M${mid} ${floor - 6}q1.2 2 0.6 4.6M${mid} ${floor - 6.4}q2.6 0.6 3.4 3`}
              fill="none"
              strokeWidth={0.35}
              strokeLinecap="round"
              className="stroke-room-frost"
            />
            {/* The glass, clear, its edge and a highlight down it */}
            <path
              d={bottle}
              strokeWidth={0.5}
              className="fill-room-glass/15 stroke-room-glass"
            />
            <path
              d={`M${left + 1.6} ${floor - 2}V${top + 9.5}`}
              strokeWidth={0.6}
              strokeLinecap="round"
              className="stroke-room-frost/80"
            />
            {/* The leaves out of the neck */}
            {leaves.map(({ at: [lx, ly], size, turn }, k) => (
              <g
                key={k}
                transform={`translate(${mid + lx} ${neckTop + ly}) rotate(${turn})`}
              >
                <path
                  d={`M0 0L${-lx * 0.4} ${-ly - 3}`}
                  strokeWidth={0.6}
                  className="stroke-room-plant"
                  transform={`rotate(${-turn})`}
                />
                <path d={leaf(size)} className="fill-room-plant" />
                <path
                  d={`M0 -0.4L0 ${-size * 0.85}`}
                  strokeWidth={0.4}
                  className="stroke-room-plant-light/60"
                />
              </g>
            ))}
          </g>
        );
      })}

      {/* The black wire stand round them: a band at the middle, a base,
          and posts between the bottles */}
      <path
        d={`M${x} ${floor - 12}H${x + width}M${x} ${floor - 0.6}H${x + width}`}
        strokeWidth={0.9}
        className="stroke-room-metal"
      />
      {[0, 1, 2, 3].map((k) => {
        const px = x + 0.5 + k * (w + gap) - (k > 0 ? gap / 2 - 0.5 : 0);
        return (
          <path
            key={k}
            d={`M${px} ${floor}V${floor - 13.5}`}
            strokeWidth={0.8}
            strokeLinecap="round"
            className="stroke-room-metal"
          />
        );
      })}
    </g>
  );
}

// Cuttings 4's leaf, a true pothos leaf, its stalk at 0, 0 and `L` long:
// an elongated heart, one side a little wider, its long tip drawn out and
// curling over to one side; a lighter half, shade at the lobes, a curved
// midrib, veins sweeping up toward the tip, and golden streaks, as on
// golden pothos.
function PothosLeaf({ L }: { L: number }) {
  const f = (v: number) => v.toFixed(2);
  const q = (u: number, v: number) => `${f(u * L)} ${f(v * L)}`;
  const tip = `C${q(-0.09, -0.92)} ${q(-0.02, -0.97)} ${q(0.07, -1.05)}C${q(0.08, -0.95)} ${q(0.1, -0.91)} ${q(0.18, -0.85)}`;
  const right = `C${q(0.42, -0.69)} ${q(0.56, -0.47)} ${q(0.5, -0.22)}C${q(0.45, 0)} ${q(0.16, 0.08)} 0 0Z`;
  // Veins: where each leaves the midrib, and where it ends on each side
  const veins = [
    [0.18, -0.34, -0.45, 0.4],
    [0.34, -0.5, -0.44, 0.4],
    [0.5, -0.66, -0.34, 0.32],
    [0.64, -0.8, -0.2, 0.2],
  ];
  // A vein as a curve: out from the midrib, then bending up toward the tip
  type Pt = [number, number];
  const vein = (i: number, side: -1 | 1): [Pt, Pt, Pt] => {
    const [t, end, l, r] = veins[i];
    const out = side < 0 ? l : r;
    return [
      [0.03, -t],
      [out * 0.5, -t - (side < 0 ? 0.04 : 0.03)],
      [out, end],
    ];
  };
  // The golden streaks lie along the veins, just above them, out from
  // near the midrib toward the edge: part of a vein's curve, a to b
  const streak = (i: number, side: -1 | 1, a: number, b: number) => {
    const [p0, c, p1] = vein(i, side);
    const at = (u: number): Pt =>
      [0, 1].map(
        (k) =>
          (1 - u) * (1 - u) * p0[k] + 2 * (1 - u) * u * c[k] + u * u * p1[k],
      ) as Pt;
    const mid = [0, 1].map(
      (k) =>
        (1 - a) * (1 - b) * p0[k] +
        (a * (1 - b) + b * (1 - a)) * c[k] +
        a * b * p1[k],
    );
    const [x0, y0] = at(a);
    const [x1, y1] = at(b);
    const lift = -0.03;
    return `M${q(x0, y0 + lift)}Q${q(mid[0], mid[1] + lift)} ${q(x1, y1 + lift)}`;
  };
  return (
    <>
      <path
        d={`M0 0C${q(-0.18, 0.08)} ${q(-0.5, 0.03)} ${q(-0.58, -0.2)}C${q(-0.66, -0.46)} ${q(-0.44, -0.72)} ${q(-0.18, -0.87)}${tip}${right}`}
        className="fill-room-pothos"
      />
      <path
        d={`M0 0Q${q(0.04, -0.55)} ${q(0.07, -1.05)}${tip.slice(tip.indexOf("C", 1))}${right}`}
        className="fill-room-pothos-light/30"
      />
      <ellipse
        cx={-0.04 * L}
        cy={-0.1 * L}
        rx={0.36 * L}
        ry={0.11 * L}
        className="fill-room-pothos-dark/35"
      />
      {(
        [
          [1, -1, 0.15, 0.85, 0.045],
          [0, 1, 0.2, 0.8, 0.035],
          [2, -1, 0.2, 0.75, 0.03],
          [2, 1, 0.3, 0.7, 0.025],
        ] as const
      ).map(([i, side, a, b, w]) => (
        <path
          key={`${i}${side}`}
          d={streak(i, side, a, b)}
          fill="none"
          strokeWidth={w * L}
          strokeLinecap="round"
          className="stroke-room-pothos-streak/70"
        />
      ))}
      <path
        d={`M0 0Q${q(0.04, -0.55)} ${q(0.07, -1)}`}
        fill="none"
        strokeWidth={0.45}
        className="stroke-room-pothos-light/70"
      />
      {veins.map((_, i) => (
        <path
          key={i}
          d={([-1, 1] as const)
            .map((side) => {
              const [p0, c, p1] = vein(i, side);
              return `M${q(...p0)}Q${q(...c)} ${q(...p1)}`;
            })
            .join("")}
          fill="none"
          strokeWidth={0.25}
          className="stroke-room-pothos-light/35"
        />
      ))}
    </>
  );
}

// Cuttings 2 and 3, traced to look real: glass with thick walls, a heavy
// base, a lip and the light down its sides; water with its surface and a
// darker bottom, the stems bending where they go into it; roots branching
// across the bottom; leaves in two greens, darker at the lobes, with a
// curved midrib and side veins (and on cuttings 2, a gloss); and a
// thicker black stand.
function RealCuttings({ version }: { version: 2 | 3 | 4 | 5 }) {
  const pothos = version >= 4;
  const sway = version === 5; // the leaves sway with the headphone cord
  const { x, floor } = CUTTINGS[version];
  const { w, h, gap, neck, water } = BOTTLE;
  const width = 3 * w + 2 * gap + 2;
  const top = floor - h;
  const surface = floor - water;
  const n = neck / 2;
  const f = (v: number) => v.toFixed(2);
  const drawing = (
    <g>
      {CUTTING_LEAVES.map(({ stem, leaves }, i) => {
        const left = x + 1 + i * (w + gap);
        const mid = left + w / 2;
        const neckTop = top - 0.5;
        const node: [number, number] = [mid + stem * 0.6, neckTop - 1];
        const bottle = `M${left + 1.4} ${floor}Q${left} ${floor} ${left} ${floor - 1.4}V${top + 9}C${left} ${top + 6} ${mid - n} ${top + 6.5} ${mid - n} ${top + 4}V${top + 1.6}H${mid - n - 0.5}V${top}H${mid + n + 0.5}V${top + 1.6}H${mid + n}V${top + 4}C${mid + n} ${top + 6.5} ${left + w} ${top + 6} ${left + w} ${top + 9}V${floor - 1.4}Q${left + w} ${floor} ${left + w - 1.4} ${floor}Z`;
        // Where the stem goes into the water, and where it ends
        const enter = mid + stem * 0.25;
        const end: [number, number] = [mid - 0.4 + i * 0.4, floor - 4.5];
        return (
          <g key={i}>
            {/* The water: its body, darker at the bottom, and its surface */}
            <rect
              x={left + 0.8}
              y={surface}
              width={w - 1.6}
              height={water - 1}
              rx={1}
              className="fill-room-glass/35"
            />
            <rect
              x={left + 0.8}
              y={floor - 5}
              width={w - 1.6}
              height={4}
              rx={1}
              className="fill-room-glass/30"
            />
            <path
              d={`M${left + 0.9} ${surface}H${left + w - 0.9}`}
              strokeWidth={0.5}
              className="stroke-room-frost"
            />
            {/* The stem, bending where it meets the water, a node at the
                surface, and its roots branching across the bottom */}
            <path
              d={`M${f(node[0])} ${f(node[1])}Q${f(mid + stem * 0.3)} ${top + 6} ${f(enter)} ${surface}`}
              fill="none"
              strokeWidth={0.8}
              strokeLinecap="round"
              className="stroke-room-plant"
            />
            <path
              d={`M${f(enter + 0.5)} ${surface}Q${f(mid + 0.6)} ${floor - 10} ${f(end[0])} ${f(end[1])}`}
              fill="none"
              strokeWidth={0.8}
              strokeLinecap="round"
              className="stroke-room-plant/70"
            />
            <ellipse
              cx={enter + 0.4}
              cy={surface + 0.3}
              rx={0.7}
              ry={0.5}
              className="fill-room-plant-dark"
            />
            <path
              d={`M${f(end[0])} ${f(end[1])}q-1.8 1.4 -3.4 2.8q-0.6 0.5 -1.4 0.6M${f(end[0] - 1.6)} ${f(end[1] + 1.5)}q-0.2 1.2 -0.9 1.9M${f(end[0])} ${f(end[1])}q1.4 1.8 0.9 3.6M${f(end[0])} ${f(end[1] - 0.4)}q2.4 0.4 3.6 2.6q0.4 0.8 1.2 1M${f(end[0] + 2.4)} ${f(end[1] + 0.6)}q0.6 1 0.2 2`}
              fill="none"
              strokeWidth={0.35}
              strokeLinecap="round"
              className="stroke-room-frost"
            />
            {/* The glass: clear, thick walls, a heavy base, the lip, and
                the light down its sides and on its shoulder */}
            <path
              d={bottle}
              strokeWidth={0.8}
              className="fill-room-glass/15 stroke-room-glass"
            />
            <path
              d={`M${left + 0.9} ${floor - 2}H${left + w - 0.9}`}
              strokeWidth={1.4}
              className="stroke-room-glass/50"
            />
            <rect
              x={mid - n - 0.5}
              y={top}
              width={neck + 1}
              height={1.6}
              rx={0.4}
              className="fill-room-glass/50"
            />
            <path
              d={`M${left + 1.7} ${floor - 2.4}V${top + 9.5}`}
              strokeWidth={0.7}
              strokeLinecap="round"
              className="stroke-room-frost/80"
            />
            <path
              d={`M${left + w - 1.6} ${floor - 3}V${top + 11}`}
              strokeWidth={0.35}
              strokeLinecap="round"
              className="stroke-room-frost/50"
            />
            <path
              d={`M${left + 2.2} ${top + 8}Q${mid - n - 0.6} ${top + 6.4} ${mid - n + 0.4} ${top + 4.6}`}
              fill="none"
              strokeWidth={0.5}
              strokeLinecap="round"
              className="stroke-room-frost/70"
            />
            {/* Each leaf on its stalk from the node: two greens, darker at
                the lobes, a curved midrib, side veins and a gloss */}
            {leaves.map(({ at: [lx, ly], size: L, turn }, k) => {
              const base: [number, number] = [mid + lx, neckTop + ly];
              const q = (u: number, v: number) => `${f(u * L)} ${f(v * L)}`;
              return (
                <g key={k}>
                  <path
                    d={`M${f(node[0])} ${f(node[1])}Q${f((node[0] + base[0]) / 2 + (k ? 1.4 : -0.8))} ${f((node[1] + base[1]) / 2)} ${f(base[0])} ${f(base[1])}`}
                    fill="none"
                    strokeWidth={0.6}
                    strokeLinecap="round"
                    className={
                      pothos ? "stroke-room-pothos" : "stroke-room-plant"
                    }
                  />
                  <g transform={`translate(${f(base[0])} ${f(base[1])})`}>
                    <g data-sway={sway || undefined}>
                      <g transform={`rotate(${turn})`}>
                        {pothos ? (
                          <PothosLeaf L={L * 1.08} />
                        ) : (
                          <>
                            <path
                              d={`M0 0C${q(-0.3, 0.1)} ${q(-0.66, -0.1)} ${q(-0.56, -0.46)}C${q(-0.46, -0.76)} ${q(-0.14, -0.92)} ${q(0.02, -1)}C${q(0.17, -0.9)} ${q(0.5, -0.7)} ${q(0.54, -0.4)}C${q(0.6, -0.08)} ${q(0.27, 0.11)} 0 0Z`}
                              className="fill-room-plant"
                            />
                            <path
                              d={`M0 0L${q(0.02, -1)}C${q(0.17, -0.9)} ${q(0.5, -0.7)} ${q(0.54, -0.4)}C${q(0.6, -0.08)} ${q(0.27, 0.11)} 0 0Z`}
                              className="fill-room-plant-light/20"
                            />
                            <ellipse
                              cx={-0.1 * L}
                              cy={-0.12 * L}
                              rx={0.34 * L}
                              ry={0.14 * L}
                              className="fill-room-plant-dark/40"
                            />
                            <path
                              d={`M0 ${f(-0.02 * L)}Q${q(0.06, -0.5)} ${q(0.02, -0.97)}`}
                              fill="none"
                              strokeWidth={0.45}
                              className="stroke-room-plant-light/55"
                            />
                            {[0.3, 0.5, 0.7].map((t) => (
                              <path
                                key={t}
                                d={`M${q(0.04, -t)}Q${q(-0.2, -t - 0.02)} ${q(-0.36, -t - 0.14)}M${q(0.04, -t)}Q${q(0.24, -t - 0.02)} ${q(0.38, -t - 0.14)}`}
                                fill="none"
                                strokeWidth={0.25}
                                className="stroke-room-plant-light/30"
                              />
                            ))}
                            {version === 2 && (
                              <ellipse
                                cx={-0.24 * L}
                                cy={-0.56 * L}
                                rx={0.07 * L}
                                ry={0.2 * L}
                                transform={`rotate(-18 ${f(-0.24 * L)} ${f(-0.56 * L)})`}
                                className="fill-room-frost/20"
                              />
                            )}
                          </>
                        )}
                      </g>
                    </g>
                  </g>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* The black wire stand, thicker: a band at the middle, a base, the
          posts between the bottles, and little feet */}
      <path
        d={`M${x} ${floor - 12}H${x + width}M${x} ${floor - 0.9}H${x + width}`}
        strokeWidth={1.5}
        className="stroke-room-metal"
      />
      {[0, 1, 2, 3].map((k) => {
        const px = x + 0.5 + k * (w + gap) - (k > 0 ? gap / 2 - 0.5 : 0);
        return (
          <path
            key={k}
            d={`M${px} ${floor}V${floor - 13.8}`}
            strokeWidth={1.3}
            strokeLinecap="round"
            className="stroke-room-metal"
          />
        );
      })}
    </g>
  );
  return sway ? <Sway degrees={4}>{drawing}</Sway> : drawing;
}

/* ---------- Window ---------- */

// A white two-over-two window in the wall right of the bookshelves,
// looking out on wherever whoever's looking is, as it is outside right now
// (see CityWindow.tsx): the city's skyline under the sky for the time of
// day there, the sun or moon, and the weather. It's drawn in the
// bookshelf's units, in a strip of wall WALL wide.
const WALL = 190;
const WINDOW = { left: 15, top: 56, width: 160, height: 236 };

function WindowWall() {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: `calc(var(--room-unit) * ${WALL})`,
        aspectRatio: `${WALL} / ${VIEW.height}`,
      }}
    >
      <CityWindow
        box={{
          left: `${(WINDOW.left / WALL) * 100}%`,
          top: `${((WINDOW.top - VIEW.top) / VIEW.height) * 100}%`,
          width: `${(WINDOW.width / WALL) * 100}%`,
          height: `${(WINDOW.height / VIEW.height) * 100}%`,
        }}
      />
    </div>
  );
}

// The window and my closet, on the wall right of the bookshelves, drawn to
// the bookshelves' scale: --room-unit is one of their units (each is
// w-48 md:w-60, 260 wide), and they share the bookshelves' top and height,
// so they line up.
export function WindowAndCloset() {
  return (
    <div className="flex items-start [--room-unit:calc(12rem/260)] md:[--room-unit:calc(15rem/260)]">
      <WindowWall />
      <Closet top={VIEW.top} height={VIEW.height} />
    </div>
  );
}

/* ---------- Lava lamp ---------- */

// My lava lamp on the board below the DJ deck, beside the camera. It's
// HTML over the drawing, as one of the room's lights it can switch (see
// LavaLamp.tsx). Versions:
// 1. traced from a photo of it off, slim and sharp-edged with clear glass;
//    glows when the lights are on
// 2. wider, and taller, nearly up to the board above; glows brighter
// 3. its glass sitting down in a bigger metal base; its wax settles wavy
//    and, lit, rises and sinks in blobs like a real lava lamp's
// 4. its glass meeting the base exactly, clear; its wax cream, and amber
//    lit; its glow amber, softer and further reaching
// 5. the same, right of the camera, near the board's right end
export type LavaVersion = 1 | 2 | 3 | 4 | 5;

// Its foot's middle on the board, by version
const LAVA_SPOT = { 1: 150, 2: 135, 3: 135, 4: 135, 5: 236 };
const lavaBox = (version: LavaVersion) => {
  const { width, height } = LAVA[version];
  const x = LAVA_SPOT[version];
  return {
    left: `${((x - width / 2 - VIEW.left) / VIEW.width) * 100}%`,
    top: `${((BOARDS[3] + 2 - height - VIEW.top) / VIEW.height) * 100}%`,
    width: `${(width / VIEW.width) * 100}%`,
    height: `${(height / VIEW.height) * 100}%`,
  };
};

/* ---------- Room ---------- */

export type LampVersion = 1 | 2 | 3 | 4 | 5;

// The shelves shown side by side, each with its own version of the
// objects on it, to pick and mix from and to look back on.
export const SHELVES: {
  version: LampVersion;
  lamp: string;
  plant?: { version: PlantVersion; label: string };
  books?: { version: BooksVersion; label: string };
  basket?: { version: BasketVersion; label: string };
  headphones?: { version: HeadphonesVersion; label: string };
  dj?: { version: DjVersion; label: string };
  camera?: { version: CameraVersion; label: string };
  lava?: { version: LavaVersion; label: string };
  cuttings?: { version: CuttingsVersion; label: string };
  clock?: { version: ClockVersion; label: string };
}[] = [
  {
    version: 1,
    lamp: "First lamp",
    plant: { version: 1, label: "Snake plant" },
    books: { version: 1, label: "Thinking, Fast and Slow" },
    basket: { version: 1, label: "Seagrass basket" },
    headphones: { version: 1, label: "Beats headphones" },
    dj: { version: 1, label: "Opus Quad" },
    camera: { version: 1, label: "FinePix camera" },
    lava: { version: 1, label: "Lava lamp" },
    cuttings: { version: 1, label: "Pothos cuttings" },
    clock: { version: 1, label: "Clock" },
  },
  {
    version: 2,
    lamp: "Solid shade",
    plant: { version: 2, label: "Snake plant, real pot" },
    books: { version: 2, label: "A full shelf of books" },
    basket: { version: 2, label: "Seagrass basket, real shape" },
    headphones: { version: 2, label: "Beats headphones, set down" },
    dj: { version: 2, label: "Opus Quad, tilted" },
    camera: { version: 2, label: "FinePix camera, slides on" },
    lava: { version: 2, label: "Lava lamp, bigger" },
    cuttings: { version: 2, label: "Pothos cuttings, realer" },
    clock: { version: 2, label: "Clock, bigger" },
  },
  {
    version: 3,
    lamp: "Clear shade",
    books: { version: 3, label: "A full shelf, opening bigger" },
    basket: { version: 3, label: "Seagrass basket, lighter" },
    camera: { version: 3, label: "FinePix camera, lying down" },
    lava: { version: 3, label: "Lava lamp, real wax" },
    cuttings: { version: 3, label: "Pothos cuttings, no shine" },
    clock: { version: 3, label: "Clock, bigger" },
    headphones: { version: 3, label: "Beats headphones, resting" },
    dj: { version: 3, label: "Opus Quad, plug in to play" },
  },
  {
    version: 4,
    lamp: "Arm lamp",
    books: { version: 4, label: "Books that look read" },
    headphones: { version: 4, label: "Beats headphones, band down" },
    basket: { version: 4, label: "Seagrass basket, bigger" },
    dj: { version: 4, label: "Opus Quad, tilts up to play" },
    camera: { version: 4, label: "FinePix camera, traced" },
    lava: { version: 4, label: "Lava lamp, clear and amber" },
    cuttings: { version: 4, label: "Pothos cuttings, true leaves" },
    clock: { version: 4, label: "Clock, minimal" },
  },
  {
    version: 5,
    lamp: "Lamp switch",
    plant: { version: 2, label: "Snake plant, real pot" },
    books: { version: 5, label: "Books, calmer spines" },
    headphones: { version: 5, label: "Beats headphones, cord to drag" },
    basket: { version: 4, label: "Seagrass basket, bigger" },
    dj: { version: 5, label: "Opus Quad, play and scratch" },
    camera: { version: 5, label: "FinePix camera, smaller" },
    lava: { version: 5, label: "Lava lamp, by the camera" },
    cuttings: { version: 5, label: "Pothos cuttings, swaying" },
    clock: { version: 5, label: "Clock, minimal" },
  },
];

// The lamps and plants rise above the shelf. Every version starts at the
// tallest, so the shelves line up side by side.
const VIEW_TOP = Math.min(SHELF.top, ARM_LAMP_TOP, STEM_SHADE_TOP, PLANT_TOP);
const VIEW = {
  left: SHELF.left,
  top: VIEW_TOP,
  width: SHELF.right - SHELF.left,
  height: SHELF.feet - VIEW_TOP,
};
const VIEW_BOX = `${VIEW.left} ${VIEW.top} ${VIEW.width} ${VIEW.height}`;
const TITLE =
  "My old bookshelf, with my lamp, its disco ball and my snake plant on the top shelf.";

// Lamp 5's clickable area, as percentages of the drawing.
const SWITCH_HIT = {
  left: ((STEM_LAMP.x - STEM_SHADE.w / 2 - VIEW.left) / VIEW.width) * 100,
  top: ((STEM_SHADE_TOP - VIEW.top) / VIEW.height) * 100,
  width: (STEM_SHADE.w / VIEW.width) * 100,
  height: ((STEM_LAMP.floor - STEM_SHADE_TOP) / VIEW.height) * 100,
};

type RoomProps = {
  lamp: LampVersion;
  plant?: PlantVersion;
  books?: BooksVersion;
  basket?: BasketVersion;
  headphones?: HeadphonesVersion;
  dj?: DjVersion;
  camera?: CameraVersion;
  lava?: LavaVersion;
  cuttings?: CuttingsVersion;
  clock?: ClockVersion;
};

export default function Room({
  lamp,
  plant,
  books,
  basket,
  headphones,
  dj,
  camera,
  lava,
  cuttings,
  clock,
}: RoomProps) {
  const id = `room-${lamp}`;

  // Books 2 and up are HTML laid over the drawing (see TurningBook), and
  // headphones 5's cord, which can be dragged in front of anything, is
  // drawn on top of them: longer than the others, hanging in front of the
  // board below and past it, without the loop. DJ 3 and 4 are drawn up
  // there too, with the headphone cord to plug into them, so they come out
  // over the books when they're plugged in (a pulled book still goes over
  // them), and over the next shelf, which DJ 4 and 5 come out past.
  const plugIn = dj !== undefined && dj >= 3;
  const withOverlays = (drawing: React.ReactNode) =>
    (books && books > 1) || headphones === 5 || plugIn || camera || lava ? (
      <div className="relative">
        {drawing}
        {books && books >= 4 && <BookFinishDefs />}
        {lava && <LavaLamp version={lava} box={lavaBox(lava)} />}
        {camera && (
          <CameraOnShelf
            version={camera}
            box={cameraBox(camera)}
            mine={MY_PHOTOS}
          />
        )}
        {books && books > 1 && (
          <BookRow
            books={books === 5 ? SHELF_5 : books >= 3 ? SHELF_3 : FULL_SHELF}
            sweep={books >= 3}
            finish={books >= 4}
            read={books >= 4}
            dim={books === 5}
          />
        )}
        {(headphones === 5 || plugIn) && (
          <svg
            viewBox={VIEW_BOX}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${plugIn ? "z-10" : ""}`}
          >
            {dj === 5 ? (
              <TiltingDeck
                flat={<OpusQuadFront place={null} />}
                tilted={
                  <>
                    <OpusQuadAngled place={null} live />
                    <OpusQuadLive id={`${id}-dj`}>
                      <OpusQuadLights id={`${id}-dj`} place={null} live />
                    </OpusQuadLive>
                  </>
                }
                photos={OPUS_PHOTOS}
                rest={OPUS_TILT.rest}
                out={OPUS_TILT.play}
                fit
                magnet
                note="Unplug the headphones to turn it off"
                anchor={restingCord(PLUG_IN.phones).edge}
                length={OPUS_TILT.playCord}
              />
            ) : dj === 4 ? (
              <TiltingDeck
                flat={<OpusQuadFront place={null} />}
                tilted={<OpusQuadAngled place={null} />}
                lights={<OpusQuadLights id={`${id}-dj`} place={null} />}
                photos={OPUS_PHOTOS}
                rest={OPUS_TILT.rest}
                out={OPUS_TILT.out}
                anchor={restingCord(PLUG_IN.phones).edge}
                length={PLUG_IN.cord}
              />
            ) : plugIn ? (
              <PlugInDeck
                deck={<OpusQuadAngled />}
                lights={<OpusQuadLights id={`${id}-dj`} />}
                jack={OPUS_JACK}
                anchor={restingCord(PLUG_IN.phones).edge}
                length={PLUG_IN.cord}
              />
            ) : (
              <DraggableCord anchor={restingCord().edge} length={125} />
            )}
          </svg>
        )}
      </div>
    ) : (
      drawing
    );

  if (lamp === 5) {
    return withOverlays(
      <LampSwitch
        viewBox={VIEW_BOX}
        title={TITLE}
        titleId={`${id}-title`}
        glow={{ x: STEM_LAMP.x, y: SWITCH_BULB.y + 10, r: 560 }}
        light={<SwitchLampLight />}
        hit={SWITCH_HIT}
      >
        <Bookshelf />
        <SwitchLamp id={`${id}-ball`} />
        {plant && <SnakePlant id={`${id}-leaf`} version={plant} />}
        {headphones === 1 && <Headphones />}
        {dj === 1 && <OpusQuadFront />}
        {dj === 2 && <OpusQuadAngled />}
        {headphones === 2 && <TossedHeadphones />}
        {headphones === 3 &&
          (plugIn ? (
            <RestingHeadphones cx={PLUG_IN.phones} draggableCord />
          ) : (
            <RestingHeadphones />
          ))}
        {headphones === 4 &&
          (plugIn ? (
            <RestingHeadphones band="flat" cx={PLUG_IN.phones} draggableCord />
          ) : (
            <RestingHeadphones band="flat" />
          ))}
        {headphones === 5 && (
          <RestingHeadphones
            band="flat"
            draggableCord
            cx={plugIn ? PLUG_IN.phones : undefined}
          />
        )}
        {basket === 1 && <Basket id={`${id}-basket`} />}
        {basket === 2 && <BasketTub id={`${id}-basket`} />}
        {basket === 3 && <BasketTub id={`${id}-basket`} light />}
        {basket === 4 && <BasketTub id={`${id}-basket`} light size={1.06} />}
        {books && <Books version={books} />}
        {cuttings === 1 && <Cuttings />}
        {cuttings && cuttings !== 1 && <RealCuttings version={cuttings} />}
        {clock && <Clock {...CLOCK[clock]} />}
      </LampSwitch>,
    );
  }

  const drawing = (
    <svg
      viewBox={VIEW_BOX}
      role="img"
      aria-labelledby={`${id}-title`}
      className="block h-auto w-48 md:w-60"
    >
      <title id={`${id}-title`}>{TITLE}</title>
      <Bookshelf />
      {lamp === 4 ? (
        <ArmLamp id={`${id}-ball`} />
      ) : (
        <StemLamp version={lamp} id={`${id}-ball`} />
      )}
      {plant && <SnakePlant id={`${id}-leaf`} version={plant} />}
      {headphones === 1 && <Headphones />}
      {dj === 1 && <OpusQuadFront />}
      {dj === 2 && <OpusQuadAngled />}
      {headphones === 2 && <TossedHeadphones />}
      {headphones === 3 &&
        (plugIn ? (
          <RestingHeadphones cx={PLUG_IN.phones} draggableCord />
        ) : (
          <RestingHeadphones />
        ))}
      {headphones === 4 &&
        (plugIn ? (
          <RestingHeadphones band="flat" cx={PLUG_IN.phones} draggableCord />
        ) : (
          <RestingHeadphones band="flat" />
        ))}
      {headphones === 5 && (
        <RestingHeadphones
          band="flat"
          draggableCord
          cx={plugIn ? PLUG_IN.phones : undefined}
        />
      )}
      {basket === 1 && <Basket id={`${id}-basket`} />}
      {basket === 2 && <BasketTub id={`${id}-basket`} />}
      {basket === 3 && <BasketTub id={`${id}-basket`} light />}
      {basket === 4 && <BasketTub id={`${id}-basket`} light size={1.06} />}
      {books && <Books version={books} />}
      {cuttings === 1 && <Cuttings />}
      {cuttings && cuttings !== 1 && <RealCuttings version={cuttings} />}
      {clock && <Clock {...CLOCK[clock]} />}
    </svg>
  );
  return withOverlays(drawing);
}
