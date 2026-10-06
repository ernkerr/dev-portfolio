import RedSunnies from "./RedSunnies";

// My closet, open, to the left of the bookshelf and built like it: black
// posts and walnut boards, with a brass rod across the top. On the rod, on
// wooden hangers: my leather jacket, the tag still on, my cheetah fur
// jacket and my disco dress, then a strap of my sunnies. My Docs stand on
// the bottom board. The red sunnies are a button (RedSunnies.tsx): put
// them on and the whole page goes red.
//
// Drawn in the bookshelf's units, beside it: the same height and boards,
// from x 0 to WIDTH, so `top` and `height` are the bookshelf drawing's.
// Versions:
// 1. the jackets, the dress, my Docs and the sunnies
export type ClosetVersion = 1;

export const CLOSET_WIDTH = 372;
const L = 8; // the left post's outside
const R = 350; // the right post's outside, a gap short of the bookshelf
const POST = 7;
const BOARD = 16;
const ROD = 46; // the rod's middle
const FLOOR = 464; // the bottom board, level with the bookshelf's
const FEET = 560; // the posts' feet, as the bookshelf's

// Where everything hangs: each hanger's middle
const LEATHER = 78;
const CHEETAH = 174;
const DRESS = 258;
const STRAP = 320;
const SUNNIES = [
  { y: 112, kind: "black" },
  { y: 170, kind: "tortoise" },
  { y: 228, kind: "red" },
] as const;

// The same every time, like a seeded random
const jitter = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
};
const f = (n: number) => n.toFixed(1);

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

// My black leather moto jacket: lapels open, its zip off to one side, a
// belt at the hem, and on its cuff the tag I never took off
function LeatherJacket() {
  const x = LEATHER;
  const sleeve = (s: 1 | -1) =>
    `M${x + s * 44} 70C${x + s * 52} 72 ${x + s * 56} 80 ${x + s * 57} 96L${x + s * 61} 238L${x + s * 45} 241L${x + s * 44} 112Z`;
  return (
    <g>
      <Hanger cx={x} reach={40} />
      <path
        d={`M${x - 12} 60L${x - 44} 70L${x - 44} 112L${x - 42} 252H${x + 42}L${x + 44} 112L${x + 44} 70L${x + 12} 60Q${x} 65 ${x - 12} 60Z`}
        className="fill-room-leather"
      />
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={sleeve(s as 1 | -1)}
          strokeWidth={0.8}
          className="fill-room-leather stroke-room-leather-edge"
        />
      ))}

      {/* The light along it */}
      <path
        d={`M${x - 36} 86Q${x - 39} 160 ${x - 35} 232M${x - 54} 104L${x - 56} 228M${x + 28} 118Q${x + 31} 170 ${x + 29} 230`}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        className="stroke-room-leather-sheen/60"
      />

      {/* The collar and lapels, the zip and its pull, and the zip pockets */}
      <path
        d={`M${x - 14} 59Q${x} 54 ${x + 14} 59L${x + 18} 66Q${x} 61 ${x - 18} 66Z`}
        className="fill-room-leather-edge"
      />
      <path
        d={`M${x - 16} 64L${x - 37} 79L${x - 29} 97L${x - 21} 93L${x - 5} 130L${x + 10} 101Z`}
        strokeWidth={0.8}
        strokeLinejoin="round"
        className="fill-room-leather stroke-room-leather-edge"
      />
      <path
        d={`M${x + 16} 64L${x + 35} 77L${x + 25} 96L${x + 13} 101Z`}
        strokeWidth={0.8}
        strokeLinejoin="round"
        className="fill-room-leather stroke-room-leather-edge"
      />
      <path
        d={`M${x + 11} 101C${x + 15} 140 ${x + 15} 200 ${x + 13} 239`}
        fill="none"
        strokeWidth={1.4}
        strokeDasharray="0.8 0.8"
        className="stroke-room-mirror"
      />
      <rect
        x={x + 9.5}
        y={104}
        width={3}
        height={7}
        rx={1}
        className="fill-room-mirror"
      />
      <path
        d={`M${x - 34} 172L${x - 16} 160M${x + 22} 160L${x + 36} 170M${x - 32} 112L${x - 20} 108`}
        strokeWidth={1.1}
        strokeLinecap="round"
        className="stroke-room-mirror/80"
      />

      {/* The belt and its buckle */}
      <rect
        x={x - 42}
        y={238}
        width={84}
        height={14}
        className="fill-room-leather-edge"
      />
      <rect
        x={x - 30}
        y={237}
        width={10}
        height={16}
        rx={1.5}
        fill="none"
        strokeWidth={1.6}
        className="stroke-room-mirror"
      />

      {/* The tag, hanging off the cuff on its string */}
      <g>
        <title>The tag&apos;s still on. I love deal hunting.</title>
        <path
          d={`M${x - 53} 240q-3 7 -1 15`}
          fill="none"
          strokeWidth={0.6}
          className="stroke-room-tag"
        />
        <g transform={`rotate(-6 ${x - 54} 255)`}>
          <path
            d={`M${x - 59} 258l5 -4l5 4v20h-10Z`}
            className="fill-room-tag"
          />
          <circle cx={x - 54} cy={258} r={1} className="fill-room-leather" />
          {/* The old price struck out in red, the new one under it */}
          <path
            d={`M${x - 57} 264h6M${x - 58} 266.5l8 -5M${x - 57} 271h6M${x - 57} 274h4`}
            strokeWidth={1}
            strokeLinecap="round"
            className="stroke-room-tag-ink"
          />
        </g>
      </g>
    </g>
  );
}

// My cheetah fur jacket: boxy and fluffy-edged, a big shawl collar, black
// spots all over
function CheetahJacket() {
  const x = CHEETAH;
  const body = `M${x - 16} 60L${x - 48} 72L${x - 52} 250Q${x} 257 ${x + 52} 250L${x + 48} 72L${x + 16} 60Q${x} 66 ${x - 16} 60Z`;
  const sleeve = (s: number) =>
    `M${x + s * 48} 72C${x + s * 58} 76 ${x + s * 62} 88 ${x + s * 63} 104L${x + s * 68} 234L${x + s * 50} 238L${x + s * 48} 116Z`;
  const collar = (s: number) =>
    `M${x + s * 18} 58C${x + s * 38} 66 ${x + s * 36} 104 ${x + s * 3} 152L${x} 152C${x + s * 12} 112 ${x + s * 13} 80 ${x + s * 4} 64Z`;
  // Spots in a loose grid over it, kept to the fur by the clip
  const spots = Array.from({ length: 140 }, (_, i) => {
    const col = i % 10;
    const row = Math.floor(i / 10);
    return {
      x: x - 72 + col * 15.5 + (row % 2) * 7 + jitter(i) * 6,
      y: 66 + row * 14 + jitter(i + 300) * 6,
      rx: 2.1 + jitter(i + 600) * 1.4,
      ry: 1.8 + jitter(i + 900) * 1.1,
      turn: Math.round(jitter(i + 1200) * 180),
      halo: jitter(i + 1500) > 0.55,
    };
  });
  const fluff = {
    strokeWidth: 5,
    strokeDasharray: "0 4.2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <g>
      <Hanger cx={x} reach={42} />
      <defs>
        <clipPath id="closet-fur">
          <path d={body} />
          <path d={sleeve(-1)} />
          <path d={sleeve(1)} />
        </clipPath>
      </defs>

      {/* The fur, fluffed out past its outline */}
      {[body, sleeve(-1), sleeve(1)].map((d, i) => (
        <path
          key={i}
          d={d}
          {...fluff}
          className="fill-room-cheetah stroke-room-cheetah"
        />
      ))}
      <g clipPath="url(#closet-fur)">
        {spots.map((s, i) => (
          <g
            key={i}
            transform={`translate(${f(s.x)} ${f(s.y)}) rotate(${s.turn})`}
          >
            {s.halo && (
              <ellipse
                rx={s.rx + 1.3}
                ry={s.ry + 1.1}
                className="fill-room-cheetah-rosette/70"
              />
            )}
            <ellipse rx={s.rx} ry={s.ry} className="fill-room-cheetah-spot" />
          </g>
        ))}
        {/* Where the sleeves meet the body */}
        {[-1, 1].map((s) => (
          <path
            key={s}
            d={`M${x + s * 48} 116L${x + s * 50} 238`}
            strokeWidth={1}
            className="stroke-room-cheetah-rosette/60"
          />
        ))}
      </g>

      {/* The collar, paler, with a few spots of its own */}
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={collar(s)}
          {...fluff}
          strokeWidth={4}
          className="fill-room-cheetah-light stroke-room-cheetah-light"
        />
      ))}
      {[
        [-20, 76],
        [-17, 98],
        [-9, 122],
        [21, 82],
        [16, 104],
        [8, 128],
      ].map(([dx, y], i) => (
        <ellipse
          key={i}
          cx={x + dx}
          cy={y}
          rx={2}
          ry={1.6}
          className="fill-room-cheetah-spot"
        />
      ))}
      <path
        d={`M${x} 152V253`}
        strokeWidth={0.8}
        className="stroke-room-cheetah-rosette"
      />
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
        <clipPath id="closet-dress">
          <path d={outline} />
        </clipPath>
      </defs>
      <path d={outline} className="fill-room-sequin-deep" />
      <g clipPath="url(#closet-dress)">
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

// A pair of sunnies clipped to the strap by the bridge, drawn about (0, 0):
// the black ones square, the tortoiseshell ones round. The red ones are
// RedSunnies.tsx's, so they can come off.
function Sunnies({ y, kind }: { y: number; kind: "black" | "tortoise" }) {
  const lens = "M4 -6L19 -7Q20.5 -1 17.5 4Q11 7.5 5 4.5Q2.6 -0.5 4 -6Z";
  return (
    <g transform={`translate(${STRAP} ${y})`}>
      {/* The arms, folded behind */}
      <path
        d="M-18 -4.5H18"
        strokeWidth={1.4}
        className={
          kind === "black"
            ? "stroke-room-sunnies-black"
            : "stroke-room-sunnies-tortoise"
        }
      />
      {kind === "black" ? (
        [-1, 1].map((s) => (
          <g key={s} transform={`scale(${s} 1)`}>
            <path d={lens} className="fill-room-sunnies-black" />
            <path
              d={lens}
              transform="translate(11 -0.6) scale(0.72) translate(-11 0.6)"
              className="fill-room-sunnies-lens"
            />
          </g>
        ))
      ) : (
        <>
          {[-1, 1].map((s) => (
            <circle
              key={s}
              cx={s * 11.5}
              cy={-0.5}
              r={7.2}
              strokeWidth={2.2}
              className="fill-room-sunnies-tortoise-lens stroke-room-sunnies-tortoise"
            />
          ))}
          {/* Tortoiseshell flecks on the rims */}
          {Array.from({ length: 14 }, (_, i) => {
            const a = (i / 7) * Math.PI * 2 + jitter(i + 7000);
            const s = i < 7 ? -1 : 1;
            return (
              <circle
                key={i}
                cx={f(s * 11.5 + Math.cos(a) * 7.2)}
                cy={f(-0.5 + Math.sin(a) * 7.2)}
                r={0.9}
                className="fill-room-sunnies-tortoise-spot"
              />
            );
          })}
        </>
      )}
      {/* The bridge, over the strap */}
      <path
        d="M-5 -2.5Q0 -5.5 5 -2.5"
        fill="none"
        strokeWidth={1.8}
        className={
          kind === "black"
            ? "stroke-room-sunnies-black"
            : "stroke-room-sunnies-tortoise"
        }
      />
    </g>
  );
}

// The strap the sunnies clip to, looped over the rod
function Strap() {
  return (
    <g>
      <path
        d={`M${STRAP - 4} ${ROD + 6}V${ROD - 4}a4 4 0 0 1 8 0V${ROD + 6}`}
        fill="none"
        strokeWidth={2}
        className="stroke-room-sunnies-strap"
      />
      <path
        d={`M${STRAP - 4} ${ROD + 4}H${STRAP + 4}V256L${STRAP} 261L${STRAP - 4} 256Z`}
        className="fill-room-sunnies-strap"
      />
      <path
        d={`M${STRAP - 2.6} ${ROD + 6}V255M${STRAP + 2.6} ${ROD + 6}V255`}
        strokeWidth={0.4}
        strokeDasharray="1.4 1"
        className="stroke-room-sunnies-tortoise/30"
      />
    </g>
  );
}

// My Docs, an 8-eye pair, side on and facing left: the black leather
// upper, its laces, the heel loop, and the yellow stitching round the welt.
// Drawn with its toe's bottom at (0, 0); the one `back` is a shade lighter.
function Doc({ x, back = false }: { x: number; back?: boolean }) {
  return (
    <g transform={`translate(${x} ${FLOOR})`}>
      <path
        d="M2 -9C2 -20 8 -26 20 -29L40 -34C46 -36 48 -42 50 -50L52 -64H78L80 -40C81 -26 84 -18 84 -9Z"
        className={back ? "fill-room-docs-sole" : "fill-room-docs"}
      />
      <rect
        x={51}
        y={-66}
        width={28}
        height={3.5}
        rx={1.5}
        className="fill-room-docs-sheen"
      />
      {/* The heel loop */}
      <path
        d="M75.5 -63Q75.8 -71 79 -71.5Q82 -71 81 -62"
        fill="none"
        strokeWidth={2.2}
        className="stroke-room-docs-stitch"
      />
      {/* Seams, the light on the toe and up the shaft */}
      <path
        d="M14 -9C14 -18 18 -24 25 -27.5M41 -33.5C47 -26 54 -16 56 -9M78 -60L81 -12"
        fill="none"
        strokeWidth={0.7}
        className="stroke-room-docs-sheen"
      />
      <path
        d="M9 -18Q16 -25 30 -29M58 -58L57 -38"
        fill="none"
        strokeWidth={1.8}
        strokeLinecap="round"
        className="stroke-room-docs-sheen/70"
      />
      {/* Eight eyelets and the laces across */}
      {Array.from({ length: 8 }, (_, i) => {
        const ex = 43 + i * 1.25;
        const ey = -36 - i * 3.6;
        return (
          <g key={i}>
            <path
              d={`M${f(ex)} ${f(ey)}h5`}
              strokeWidth={1.1}
              strokeLinecap="round"
              className="stroke-room-docs-sole"
            />
            <circle
              cx={f(ex + 5.5)}
              cy={f(ey)}
              r={0.9}
              className="fill-room-docs-sheen"
            />
          </g>
        );
      })}
      {/* The sole and its yellow stitching */}
      <path
        d="M0 -2Q0 -9 6 -9H84L86 -2Q86 0 84 0H3Q0 0 0 -2Z"
        className="fill-room-docs-sole"
      />
      <path
        d="M5 -6.5H82"
        strokeWidth={0.9}
        strokeDasharray="1.6 1.2"
        className="stroke-room-docs-stitch"
      />
    </g>
  );
}

export default function Closet({
  top,
  height,
}: {
  version: ClosetVersion;
  /** The bookshelf drawing's top and height, to line up with it. */
  top: number;
  height: number;
}) {
  const red = SUNNIES[2];
  const box = {
    left: `${((STRAP - 22) / CLOSET_WIDTH) * 100}%`,
    top: `${((red.y - 13 - top) / height) * 100}%`,
    width: `${(44 / CLOSET_WIDTH) * 100}%`,
    height: `${(26 / height) * 100}%`,
  };
  return (
    <div
      className="relative shrink-0"
      style={{ width: `calc(var(--room-unit) * ${CLOSET_WIDTH})` }}
    >
      <svg
        viewBox={`0 ${top} ${CLOSET_WIDTH} ${height}`}
        role="img"
        aria-labelledby="closet-title"
        className="block h-auto w-full overflow-visible"
      >
        <title id="closet-title">
          My closet: my leather jacket with the tag still on, my cheetah fur
          jacket, my disco dress, my sunnies and my Docs.
        </title>

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

        <LeatherJacket />
        <CheetahJacket />
        <DiscoDress />
        <Strap />
        {SUNNIES.map(
          (s) =>
            s.kind !== "red" && <Sunnies key={s.kind} y={s.y} kind={s.kind} />,
        )}

        <Doc x={100} back />
        <Doc x={26} />
      </svg>
      <RedSunnies box={box} />
    </div>
  );
}
