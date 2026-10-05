import LampSwitch from "./LampSwitch";

// My old room. So far: the bookshelf, seen straight on (black metal posts
// that rise past the top board, five walnut boards), and my lamp on the top
// board, in five versions to compare (5 is a switch for dark mode).
// Everything is in viewBox units, so objects added later can be placed with
// the same numbers.

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

/* ---------- Room ---------- */

export type LampVersion = 1 | 2 | 3 | 4 | 5;

// The lamp versions, shown side by side to pick one.
export const LAMPS: { version: LampVersion; label: string }[] = [
  { version: 1, label: "01. First lamp" },
  { version: 2, label: "02. Solid shade" },
  { version: 3, label: "03. Clear shade" },
  { version: 4, label: "04. Arm lamp" },
  { version: 5, label: "05. Lamp switch" },
];

// The lamps rise above the shelf. Every version starts at the tallest, so
// the shelves line up side by side.
const VIEW_TOP = Math.min(SHELF.top, ARM_LAMP_TOP, STEM_SHADE_TOP);
const VIEW = {
  left: SHELF.left,
  top: VIEW_TOP,
  width: SHELF.right - SHELF.left,
  height: SHELF.feet - VIEW_TOP,
};
const VIEW_BOX = `${VIEW.left} ${VIEW.top} ${VIEW.width} ${VIEW.height}`;
const TITLE =
  "My old bookshelf, with my lamp and its disco ball on the top shelf.";

// Lamp 5's clickable area, as percentages of the drawing.
const SWITCH_HIT = {
  left: ((STEM_LAMP.x - STEM_SHADE.w / 2 - VIEW.left) / VIEW.width) * 100,
  top: ((STEM_SHADE_TOP - VIEW.top) / VIEW.height) * 100,
  width: (STEM_SHADE.w / VIEW.width) * 100,
  height: ((STEM_LAMP.floor - STEM_SHADE_TOP) / VIEW.height) * 100,
};

export default function Room({ lamp }: { lamp: LampVersion }) {
  const id = `room-${lamp}`;

  if (lamp === 5) {
    return (
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
      </LampSwitch>
    );
  }

  return (
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
    </svg>
  );
}
