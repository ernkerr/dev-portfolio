import ClosetSunnies from "./ClosetSunnies";
import Swish from "./Swish";
import { ellipse, f, jitter } from "./closetArt";

// My closet, open, on the wall right of the bookshelves past the window,
// built like the bookshelf: black posts and walnut boards, with a brass
// rod across the top. On the rod, on wooden hangers: my long leather
// jacket, my cheetah fur coat and my disco dress, then a strap of my
// sunnies. My oxblood Docs stand on the bottom board, facing out. The red
// sunnies are buttons (ClosetSunnies.tsx): put a pair on and the whole
// page takes on the color of its lenses. The clothes swish on their
// hangers when the pointer brushes them (Swish.tsx).
//
// Drawn in the bookshelf's units, to its scale: the same height and
// boards, from x 0 to WIDTH, so `top` and `height` are the bookshelf
// drawing's.
const WIDTH = 400;
const ID = "closet";
const L = 8; // the left post's outside
const R = 392; // the right post's outside
const POST = 7;
const BOARD = 16;
const ROD = 46; // the rod's middle
const FLOOR = 464; // the bottom board, level with the bookshelf's
const FEET = 560; // the posts' feet, as the bookshelf's

// Where everything hangs: each hanger's middle; the strap's middle, and
// how far down it each pair of sunnies hangs; and how big they're drawn
const LEATHER = 78;
const CHEETAH = 174;
const DRESS = 258;
const STRAP = 340;
const PAIRS = [
  { kind: "red", y: 100 },
  { kind: "gold-oval", y: 155 },
  { kind: "rect-tortoise", y: 210 },
  { kind: "orange", y: 265 },
  { kind: "slim-brown", y: 320 },
] as const;
const SIZE = 1.1;

// A wooden hanger on the rod: its hook over the rod, and its arms out to
// `reach` each side
function Hanger({ cx, reach }: { cx: number; reach: number }) {
  return (
    <g>
      <path
        d={`M${cx} 60V${ROD - 1}a4.5 4.5 0 1 1 5.5 -4.4`}
        fill="none"
        strokeWidth={1.3}
        strokeLinecap="round"
        className="stroke-room-metal"
      />
      <path
        d={`M${cx - reach} 74L${cx} 59L${cx + reach} 74`}
        fill="none"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-room-wood-light"
      />
    </g>
  );
}

// My long black leather jacket, plain: down past the hips, an even collar
// and lapels, buttoned down the front, two flap pockets
const LEATHER_HEM = 336;
function LeatherJacket() {
  const x = LEATHER;
  const sleeve = (s: number) =>
    `M${x + s * 44} 70C${x + s * 52} 72 ${x + s * 56} 80 ${x + s * 57} 96L${x + s * 61} 250L${x + s * 45} 253L${x + s * 44} 112Z`;
  const lapel = (s: number) =>
    `M${x + s * 15} 63L${x + s * 34} 78L${x + s * 27} 95L${x + s * 21} 92L${x} 134L${x + s * 6} 74Z`;
  return (
    <g>
      <Hanger cx={x} reach={40} />
      <path
        d={`M${x - 12} 60L${x - 44} 70L${x - 44} 112L${x - 49} ${LEATHER_HEM}Q${x} ${LEATHER_HEM + 4} ${x + 49} ${LEATHER_HEM}L${x + 44} 112L${x + 44} 70L${x + 12} 60Q${x} 65 ${x - 12} 60Z`}
        className="fill-room-leather"
      />
      {[-1, 1].map((s) => (
        <g key={s}>
          <path
            d={sleeve(s)}
            strokeWidth={0.8}
            className="fill-room-leather stroke-room-leather-edge"
          />
          {/* The cuff */}
          <path
            d={`M${x + s * 59.4} 240L${x + s * 44.6} 242`}
            strokeWidth={0.8}
            className="stroke-room-leather-edge"
          />
        </g>
      ))}

      {/* The light along it */}
      <path
        d={`M${x - 36} 90Q${x - 38} 200 ${x - 41} 322M${x - 54} 104L${x - 57} 238M${x + 30} 140Q${x + 32} 230 ${x + 35} 322`}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        className="stroke-room-leather-sheen/50"
      />

      {/* Inside, behind the collar, then the collar and the lapels, the
          same both sides */}
      <path
        d={`M${x - 12} 61L${x} 134L${x + 12} 61Z`}
        className="fill-room-leather-edge"
      />
      <path
        d={`M${x - 14} 59Q${x} 54 ${x + 14} 59L${x + 18} 66Q${x} 61 ${x - 18} 66Z`}
        className="fill-room-leather-edge"
      />
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={lapel(s)}
          strokeWidth={0.8}
          strokeLinejoin="round"
          className="fill-room-leather stroke-room-leather-edge"
        />
      ))}

      {/* Where it closes, its buttons, the flap pockets and the hem */}
      <path
        d={`M${x - 2} 134V${LEATHER_HEM + 2}`}
        strokeWidth={0.9}
        className="stroke-room-leather-edge"
      />
      {[148, 186, 224, 262, 300].map((y) => (
        <g key={y}>
          <circle
            cx={x + 2}
            cy={y}
            r={3}
            strokeWidth={0.6}
            className="fill-room-leather-edge stroke-room-leather-sheen"
          />
          <circle
            cx={x + 1.2}
            cy={y - 0.9}
            r={0.8}
            className="fill-room-leather-sheen"
          />
        </g>
      ))}
      {[-1, 1].map((s) => (
        <rect
          key={s}
          x={s < 0 ? x - 38 : x + 14}
          y={252}
          width={24}
          height={7}
          strokeWidth={0.8}
          className="fill-room-leather stroke-room-leather-edge"
        />
      ))}
      <path
        d={`M${x - 49} ${LEATHER_HEM - 3}Q${x} ${LEATHER_HEM + 1} ${x + 49} ${LEATHER_HEM - 3}`}
        fill="none"
        strokeWidth={0.8}
        className="stroke-room-leather-edge"
      />
    </g>
  );
}

// My cheetah fur coat: oversized, zipped up the front to a pointed
// collar, in a darker cheetah print: a warm tan-brown ground covered in
// small, solid, near-black spots, round or a little oval, spaced evenly as
// a cheetah's are. The spots are one tile that repeats, wrapping round its
// edges so no spot is cut; a filter roughens the edges so it's fuzzy.
const COAT_HEM = 282;
const SPOT_TILE = { w: 90, h: 78 };
const CHEETAH_SPOTS = (() => {
  const { w, h } = SPOT_TILE;
  const d: string[] = [];
  for (let row = 0, i = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++, i++) {
      const x = col * 9 + (row % 2) * 4.5 + 2.2 + (jitter(i + 9600) - 0.5) * 4;
      const y = row * 7.8 + 3.9 + (jitter(i + 9800) - 0.5) * 3.6;
      const rx = 1.5 + jitter(i + 10000) * 0.9;
      const ry = rx * (0.78 + jitter(i + 10200) * 0.22);
      // Drawn again across any edge it crosses, so the tile wraps
      for (const dx of [0, -w, w])
        for (const dy of [0, -h, h]) {
          const cx = x + dx;
          const cy = y + dy;
          if (cx + rx < 0 || cx - rx > w || cy + ry < 0 || cy - ry > h)
            continue;
          d.push(ellipse(cx, cy, rx, ry));
        }
    }
  }
  return d.join("");
})();

function CheetahJacket() {
  const x = CHEETAH;
  const body = `M${x - 16} 60L${x - 50} 74L${x - 54} ${COAT_HEM}Q${x} ${COAT_HEM + 6} ${x + 54} ${COAT_HEM}L${x + 50} 74L${x + 16} 60Q${x} 66 ${x - 16} 60Z`;
  const sleeve = (s: number) =>
    `M${x + s * 50} 74C${x + s * 60} 78 ${x + s * 64} 92 ${x + s * 65} 108L${x + s * 70} 252L${x + s * 50} 256L${x + s * 50} 118Z`;
  const shapes = [body, sleeve(-1), sleeve(1)];
  const box = { x: x - 74, y: 54, width: 148, height: COAT_HEM - 46 };
  return (
    <g>
      <Hanger cx={x} reach={44} />
      <defs>
        <clipPath id={`${ID}-fur`}>
          {shapes.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </clipPath>
        <filter id={`${ID}-fuzz`} x="-10%" y="-5%" width="120%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves={2}
            seed={7}
          />
          <feDisplacementMap
            in="SourceGraphic"
            scale={2.6}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <pattern
          id={`${ID}-spots`}
          width={SPOT_TILE.w}
          height={SPOT_TILE.h}
          patternUnits="userSpaceOnUse"
          x={x - 74}
          y={54}
        >
          <path d={CHEETAH_SPOTS} className="fill-room-cheetah-spot" />
        </pattern>
        {/* Darker toward its sides, so it looks round */}
        <linearGradient
          id={`${ID}-fur-round`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          className="text-room-cheetah-dark"
        >
          <stop offset="0" stopColor="currentColor" stopOpacity={0.45} />
          <stop offset="0.22" stopColor="currentColor" stopOpacity={0} />
          <stop offset="0.78" stopColor="currentColor" stopOpacity={0} />
          <stop offset="1" stopColor="currentColor" stopOpacity={0.45} />
        </linearGradient>
      </defs>

      <g filter={`url(#${ID}-fuzz)`}>
        {shapes.map((d, i) => (
          <path
            key={i}
            d={d}
            strokeWidth={2}
            strokeLinejoin="round"
            className="fill-room-cheetah stroke-room-cheetah"
          />
        ))}
        <g clipPath={`url(#${ID}-fur)`}>
          {/* Shadow where the sleeves hang against it */}
          {[-1, 1].map((s) => (
            <path
              key={s}
              d={`M${x + s * 49} 118L${x + s * 51} 256`}
              strokeWidth={3}
              className="stroke-room-cheetah-dark/60"
            />
          ))}

          {/* The pointed collar, folded over: lighter, catching the
              light on its fold, its shadow on the coat */}
          {[-1, 1].map((s) => (
            <g key={s}>
              <path
                d={`M${x + s * 2} 70C${x + s * 10} 62 ${x + s * 20} 60 ${x + s * 27} 64L${x + s * 30} 72L${x + s * 18} 100L${x + s * 3} 77Z`}
                className="fill-room-cheetah-light/30"
              />
              <path
                d={`M${x + s * 30} 72L${x + s * 18} 100L${x + s * 3} 77`}
                fill="none"
                strokeWidth={2.4}
                strokeLinejoin="round"
                className="stroke-room-cheetah-dark/80"
              />
            </g>
          ))}

          {/* The spots, then the shading over them */}
          <rect {...box} fill={`url(#${ID}-spots)`} />
          <rect {...box} fill={`url(#${ID}-fur-round)`} />

          {/* The zip down the front, and its silver pull at the top */}
          <path
            d={`M${x} 76V${COAT_HEM + 4}`}
            strokeWidth={1.2}
            className="stroke-room-cheetah-dark"
          />
          <path
            d={`M${x - 3} 70L${x} 79L${x + 3} 70Z`}
            className="fill-room-cheetah-spot"
          />
          <rect
            x={x - 1.3}
            y={78}
            width={2.6}
            height={7}
            rx={1}
            className="fill-room-mirror"
          />
        </g>
      </g>
    </g>
  );
}

// My disco dress: silver sequins all over, on spaghetti straps, fitted to
// the waist and flared to the hem; a few of them catch the light
const DRESS_TOP = 106;
const WAIST = 152;
const HEM = 300;
const halfWidth = (y: number) =>
  y <= WAIST
    ? 20 - ((y - DRESS_TOP) / (WAIST - DRESS_TOP)) * 5
    : 15 + 21 * Math.pow((y - WAIST) / (HEM - WAIST), 0.85);
const TONES = [
  "fill-room-sequin",
  "fill-room-sequin-dark",
  "fill-room-sequin-light",
  "fill-room-sequin-deep",
] as const;
const SEQUIN = 1.8;
const SEQUINS = (() => {
  const tones: string[][] = TONES.map(() => []);
  const glints: { x: number; y: number; i: number }[] = [];
  let i = 0;
  for (let row = 0, y = DRESS_TOP + 2; y <= HEM; row++, y += 3.6) {
    const w = halfWidth(y) - 1;
    for (let dx = -w + (row % 2) * 2.1; dx <= w; dx += 4.2, i++) {
      const r = jitter(i + 2000);
      // Brighter in a band across, where the light falls
      const band = Math.abs(dx * 0.6 + (y - 190) * 0.35) < 9;
      const tone = band
        ? r < 0.55
          ? 2
          : 0
        : r < 0.4
          ? 0
          : r < 0.68
            ? 1
            : r < 0.84
              ? 2
              : 3;
      const cx = DRESS + dx;
      tones[tone].push(
        `M${f(cx - SEQUIN)} ${f(y)}a${SEQUIN} ${SEQUIN} 0 1 0 ${2 * SEQUIN} 0a${SEQUIN} ${SEQUIN} 0 1 0 ${-2 * SEQUIN} 0`,
      );
      if (tone === 2 && jitter(i + 4000) > 0.9) glints.push({ x: cx, y, i });
    }
  }
  return { paths: tones.map((t) => t.join("")), glints: glints.slice(0, 12) };
})();

function DiscoDress() {
  const x = DRESS;
  const ys = Array.from(
    { length: 11 },
    (_, k) => DRESS_TOP + ((HEM - DRESS_TOP) * k) / 10,
  );
  const right = ys.map((y) => `L${f(x + halfWidth(y))} ${f(y)}`).join("");
  const left = [...ys]
    .reverse()
    .map((y) => `L${f(x - halfWidth(y))} ${f(y)}`)
    .join("");
  const outline = `M${x - 20} ${DRESS_TOP}Q${x - 10} ${DRESS_TOP + 7} ${x} ${DRESS_TOP + 3}Q${x + 10} ${DRESS_TOP + 7} ${x + 20} ${DRESS_TOP}${right}Q${x} ${HEM + 6} ${f(x - halfWidth(HEM))} ${HEM}${left}Z`;
  return (
    <g>
      <Hanger cx={x} reach={30} />
      {/* The straps, from the hanger's notches */}
      <path
        d={`M${x - 23} 67L${x - 17} ${DRESS_TOP + 1}M${x + 23} 67L${x + 17} ${DRESS_TOP + 1}`}
        strokeWidth={1}
        className="stroke-room-sequin-dark"
      />
      <defs>
        <clipPath id={`${ID}-dress`}>
          <path d={outline} />
        </clipPath>
      </defs>
      <path d={outline} className="fill-room-sequin-deep" />
      <g clipPath={`url(#${ID}-dress)`}>
        {SEQUINS.paths.map((d, k) => (
          <path key={k} d={d} className={TONES[k]} />
        ))}
      </g>
      {/* Glints, twinkling */}
      {SEQUINS.glints.map(({ x: gx, y, i }) => (
        <path
          key={i}
          d={`M${f(gx)} ${f(y - 3.5)}L${f(gx + 0.8)} ${f(y - 0.8)}L${f(gx + 3.5)} ${f(y)}L${f(gx + 0.8)} ${f(y + 0.8)}L${f(gx)} ${f(y + 3.5)}L${f(gx - 0.8)} ${f(y + 0.8)}L${f(gx - 3.5)} ${f(y)}L${f(gx - 0.8)} ${f(y - 0.8)}Z`}
          className="animate-twinkle fill-room-glow motion-reduce:animate-none"
          style={{ animationDelay: `${-jitter(i + 5000) * 3}s` }}
        />
      ))}
    </g>
  );
}

// A strap the sunnies clip to, looped over the rod, down past its last pair
function Strap({ x, end }: { x: number; end: number }) {
  const w = 4 * SIZE;
  return (
    <g>
      <path
        d={`M${x - w} ${ROD + 6}V${ROD - 4}a${w} ${w} 0 0 1 ${2 * w} 0V${ROD + 6}`}
        fill="none"
        strokeWidth={2}
        className="stroke-room-sunnies-strap"
      />
      <path
        d={`M${x - w} ${ROD + 4}H${x + w}V${end}L${x} ${end + w + 1}L${x - w} ${end}Z`}
        className="fill-room-sunnies-strap"
      />
      <path
        d={`M${x - w + 1.4} ${ROD + 6}V${end - 1}M${x + w - 1.4} ${ROD + 6}V${end - 1}`}
        strokeWidth={0.4}
        strokeDasharray="1.4 1"
        className="stroke-room-sunnies-tortoise/30"
      />
    </g>
  );
}

// My Docs, oxblood Jadons, an 8-eye pair standing facing out: the toe
// rounded under the shaft, darker round the sides, the laces crossing up
// the tongue to a bow, the heel loop just showing over the top, and the
// sole, its welt stitched in yellow. Matte, not shiny. Drawn about the
// middle of its sole's bottom, (0, 0).
const DOC =
  "M-14.5 -9C-16 -14 -15.5 -19.5 -12 -23C-11 -24 -10.5 -25 -10.5 -27V-55Q-10.5 -58 -9 -58.5H9Q10.5 -58 10.5 -55V-27C10.5 -25 11 -24 12 -23C15.5 -19.5 16 -14 14.5 -9Z";
const EYELETS = Array.from({ length: 8 }, (_, i) => -29 - i * 3.85);

function Doc({ x, flip = false }: { x: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${FLOOR})${flip ? " scale(-1 1)" : ""}`}>
      {/* The heel loop, behind, over the top */}
      <path
        d="M-2.4 -59Q-2.6 -66 0 -66.3Q2.6 -66 2.4 -59"
        fill="none"
        strokeWidth={1.8}
        className="stroke-room-docs"
      />
      <path
        d="M-2.4 -59Q-2.6 -66 0 -66.3Q2.6 -66 2.4 -59"
        fill="none"
        strokeWidth={0.5}
        strokeDasharray="0.7 0.6"
        className="stroke-room-docs-stitch"
      />

      {/* The leather, darker round the sides, and the light on the toe */}
      <path d={DOC} className="fill-room-docs-oxblood" />
      <path d={DOC} fill={`url(#${ID}-doc-round)`} />
      <ellipse
        cx={-3}
        cy={-16.5}
        rx={7}
        ry={3.4}
        className="fill-room-docs-oxblood-light/40"
      />
      {/* The seam across the top of the toe, and its stitching */}
      <path
        d="M-12 -23Q0 -27.5 12 -23"
        fill="none"
        strokeWidth={0.6}
        className="stroke-room-docs-oxblood-dark"
      />
      <path
        d="M-11.6 -21.6Q0 -26 11.6 -21.6"
        fill="none"
        strokeWidth={0.45}
        strokeDasharray="0.9 0.7"
        className="stroke-room-docs-oxblood-dark"
      />

      {/* The tongue, the quarters' edges either side of it, the collar */}
      <path
        d="M-3.6 -27V-60Q0 -63.5 3.6 -60V-27Z"
        strokeWidth={0.5}
        className="fill-room-docs-oxblood stroke-room-docs-oxblood-dark"
      />
      <path
        d="M-3.9 -27V-57.6M3.9 -27V-57.6"
        strokeWidth={0.8}
        className="stroke-room-docs-oxblood-dark"
      />
      <path
        d="M-10.2 -57.4H-4.2M4.2 -57.4H10.2"
        strokeWidth={2}
        strokeLinecap="round"
        className="stroke-room-docs-oxblood-dark"
      />

      {/* Eight eyelets a side, the laces crossing between them, the bow */}
      <path
        d={EYELETS.slice(0, -1)
          .map(
            (y, i) =>
              `M-5.6 ${f(y)}L5.6 ${f(EYELETS[i + 1])}M5.6 ${f(y)}L-5.6 ${f(EYELETS[i + 1])}`,
          )
          .join("")}
        strokeWidth={0.9}
        strokeLinecap="round"
        className="stroke-room-docs"
      />
      {EYELETS.map((y) =>
        [-1, 1].map((s) => (
          <circle
            key={`${y}${s}`}
            cx={s * 5.6}
            cy={f(y)}
            r={0.9}
            strokeWidth={0.35}
            className="fill-room-docs stroke-room-docs-sheen"
          />
        )),
      )}
      <path
        d="M0 -57.5C-4 -61 -7 -59 -5.5 -57C-4 -55.5 -1.5 -56.5 0 -57.5ZM0 -57.5C3 -60.5 5.4 -59.4 4.6 -57.6C3.8 -56.2 1.6 -56.6 0 -57.5ZM-0.5 -57C-2 -53 -2.5 -50 -2 -47M0.5 -57C1.5 -54 2 -51 2.6 -49"
        fill="none"
        strokeWidth={0.8}
        strokeLinecap="round"
        className="stroke-room-docs"
      />

      {/* The sole: the welt and its yellow stitching, a groove, the tread */}
      <rect
        x={-15.5}
        y={-8}
        width={31}
        height={8}
        rx={2.5}
        className="fill-room-docs-sole"
      />
      <rect
        x={-16}
        y={-9.5}
        width={32}
        height={3}
        rx={1.5}
        className="fill-room-docs"
      />
      <path
        d="M-14.5 -8H14.5"
        strokeWidth={0.6}
        strokeDasharray="1 0.8"
        className="stroke-room-docs-stitch"
      />
      <path
        d="M-15.3 -3.6H15.3"
        strokeWidth={0.8}
        className="stroke-room-docs"
      />
    </g>
  );
}

// The gradient the Docs are shaded with
function Defs() {
  return (
    <defs>
      {/* Darker toward each side, so the boot looks round */}
      <linearGradient
        id={`${ID}-doc-round`}
        x1="0"
        y1="0"
        x2="1"
        y2="0"
        className="text-room-docs-oxblood-dark"
      >
        <stop offset="0" stopColor="currentColor" stopOpacity={0.6} />
        <stop offset="0.3" stopColor="currentColor" stopOpacity={0} />
        <stop offset="0.7" stopColor="currentColor" stopOpacity={0} />
        <stop offset="1" stopColor="currentColor" stopOpacity={0.6} />
      </linearGradient>
    </defs>
  );
}

export default function Closet({
  top,
  height,
}: {
  /** The bookshelf drawing's top and height, to line up with it. */
  top: number;
  height: number;
}) {
  // Each pair of sunnies' button, 44 by 22 about where it hangs, as
  // percentages of the drawing
  const pairs = PAIRS.map(({ kind, y }) => ({
    kind,
    box: {
      left: `${((STRAP - 22 * SIZE) / WIDTH) * 100}%`,
      top: `${((y - 11 * SIZE - top) / height) * 100}%`,
      width: `${((44 * SIZE) / WIDTH) * 100}%`,
      height: `${((22 * SIZE) / height) * 100}%`,
    },
  }));
  return (
    <div
      className="relative shrink-0"
      style={{ width: `calc(var(--room-unit) * ${WIDTH})` }}
    >
      <svg
        viewBox={`0 ${top} ${WIDTH} ${height}`}
        role="img"
        aria-labelledby={`${ID}-title`}
        className="block h-auto w-full overflow-visible"
      >
        <title id={`${ID}-title`}>
          My closet: my long leather jacket, my cheetah fur coat, my disco
          dress, my sunnies and my oxblood Docs.
        </title>
        <Defs />

        {/* The frame: top and bottom boards, posts, and the rod */}
        <rect
          x={L}
          y={0}
          width={R - L}
          height={BOARD}
          className="fill-room-wood"
        />
        <rect
          x={L}
          y={FLOOR}
          width={R - L}
          height={BOARD}
          className="fill-room-wood"
        />
        <rect
          x={L}
          y={0}
          width={POST}
          height={FEET}
          className="fill-room-metal"
        />
        <rect
          x={R - POST}
          y={0}
          width={POST}
          height={FEET}
          className="fill-room-metal"
        />
        <rect
          x={L + POST}
          y={ROD - 1.75}
          width={R - L - 2 * POST}
          height={3.5}
          rx={1.75}
          className="fill-room-brass"
        />

        <Swish>
          <LeatherJacket />
        </Swish>
        <Swish>
          <CheetahJacket />
        </Swish>
        <Swish>
          <DiscoDress />
        </Swish>
        <Strap x={STRAP} end={PAIRS[PAIRS.length - 1].y + 22} />

        <Doc x={54} />
        <Doc x={90} flip />
      </svg>
      <ClosetSunnies pairs={pairs} />
    </div>
  );
}
