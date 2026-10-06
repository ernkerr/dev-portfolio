import { useId } from "react";

// Drawings of my camera for Camera.tsx: camera 4's front and back, traced
// closer to the maker's photos, with more colors and the light shining off
// it, and cameras 3 and 4 lying on their backs. All in the camera's own
// units: 184 wide and 112 tall standing, straight on, the shutter rising
// above.
export const W = 184;
export const H = 112;
export const COVER = 42; // how far the lens cover slides across the lens
export const LYING = 52; // how tall it looks lying on its back

// The brushed lines across the lens cover: their heights and ends
export const BRUSH = [
  [17, 22, 110],
  [21, 14, 96],
  [26, 30, 116],
  [31, 16, 70],
  [36, 40, 114],
  [42, 14, 60],
  [47, 26, 104],
  [66, 14, 90],
  [71, 34, 112],
  [76, 18, 66],
  [81, 44, 108],
  [86, 24, 96],
];

// The same every time, like a seeded random, for the traced brushing
const jitter = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Ids for a drawing's gradients, its own so several can share a page
function useIds() {
  const id = useId().replace(/[^\w-]/g, "");
  return {
    id: (name: string) => `${id}-${name}`,
    url: (name: string) => `url(#${id}-${name})`,
  };
}

// A gradient stop in one of the room's colors (a text-* class)
function Stop({
  at,
  color,
  opacity = 1,
}: {
  at: number;
  color: string;
  opacity?: number;
}) {
  return (
    <stop
      offset={at}
      stopColor="currentColor"
      stopOpacity={opacity}
      className={color}
    />
  );
}

// The purple body lit from above, its chrome, and the gloss across it
function BodyDefs({ id }: { id: (name: string) => string }) {
  return (
    <>
      <linearGradient id={id("body")} x1="0" y1="0" x2="0" y2="1">
        <Stop at={0} color="text-room-camera-violet" />
        <Stop at={0.3} color="text-room-camera" />
        <Stop at={0.82} color="text-room-camera-dark" />
        <Stop at={1} color="text-room-camera-deep" />
      </linearGradient>
      <linearGradient id={id("chrome")} x1="0" y1="0" x2="0" y2="1">
        <Stop at={0} color="text-room-camera-chrome-light" />
        <Stop at={0.55} color="text-room-camera-chrome" />
        <Stop at={1} color="text-room-camera-chrome-dark" />
      </linearGradient>
      <linearGradient id={id("gloss")} x1="0" y1="0" x2="1" y2="1">
        <Stop at={0} color="text-room-frost" opacity={0.32} />
        <Stop at={0.5} color="text-room-frost" opacity={0.06} />
        <Stop at={1} color="text-room-frost" opacity={0} />
      </linearGradient>
      <clipPath id={id("outline")}>
        <rect width={W} height={H - 4} rx={26} />
      </clipPath>
    </>
  );
}

// The body: its deep rim below, the lit purple, the chrome top plate with
// its bright edge, the light catching the round left end, and the feet
function RealBody({ url }: { url: (name: string) => string }) {
  return (
    <>
      <rect
        x={0}
        y={2}
        width={W}
        height={H - 2}
        rx={26}
        className="fill-room-camera-deep"
      />
      <rect x={0} y={0} width={W} height={H - 4} rx={26} fill={url("body")} />
      <rect x={20} y={0} width={144} height={5} rx={2.5} fill={url("chrome")} />
      <rect
        x={26}
        y={0.8}
        width={132}
        height={0.9}
        rx={0.45}
        className="fill-room-frost"
      />
      <path
        d="M3.5 64C2 34 9 12 28 6"
        fill="none"
        strokeWidth={1.2}
        strokeLinecap="round"
        className="stroke-room-camera-shine/60"
      />
      <ellipse
        cx={34}
        cy={H - 2}
        rx={7}
        ry={2.2}
        className="fill-room-camera-deep"
      />
      <ellipse
        cx={150}
        cy={H - 2}
        rx={7}
        ry={2.2}
        className="fill-room-camera-deep"
      />
    </>
  );
}

// Lettering with a soft shadow under it, pressed into the body
function Lettering({
  x,
  y,
  size,
  anchor,
  spacing,
  fill,
  className,
  children,
}: {
  x: number;
  y: number;
  size: number;
  anchor?: "middle";
  spacing: number;
  fill?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const text = {
    fontSize: size,
    textAnchor: anchor,
    letterSpacing: spacing,
  };
  return (
    <>
      <text
        x={x + 0.35}
        y={y + 0.45}
        {...text}
        className="fill-room-camera-deep/60 font-sans"
      >
        {children}
      </text>
      <text
        x={x}
        y={y}
        {...text}
        fill={fill}
        className={`font-sans ${className ?? ""}`}
      >
        {children}
      </text>
    </>
  );
}

// Camera 4's front: the body lit from above, the brushed cover traced in
// light, shadow and shine, the chrome and the lens's glass catching the
// light, and a gloss across it all. `closed` slides the cover over the
// lens, as for the others.
export function RealFront({ closed = false }: { closed?: boolean }) {
  const { id, url } = useIds();
  const brush = Array.from({ length: 66 }, (_, i) => {
    const x0 = 13 + jitter(i + 100) * 46;
    return {
      y: 15.5 + (i * 72) / 66 + jitter(i) * 0.7,
      x0,
      x1: Math.min(120, x0 + 26 + jitter(i + 200) * 74),
      tone: [
        "stroke-room-camera-shine/30",
        "stroke-room-camera-deep/25",
        "stroke-room-frost/15",
      ][i % 3],
    };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      className="block h-full w-full overflow-visible"
    >
      <defs>
        <BodyDefs id={id} />
        <linearGradient id={id("cover")} x1="0" y1="0" x2="1" y2="1">
          <Stop at={0} color="text-room-camera-violet" />
          <Stop at={0.55} color="text-room-camera-panel" />
          <Stop at={1} color="text-room-camera" />
        </linearGradient>
        <radialGradient id={id("ring")} cx="0.35" cy="0.3" r="0.8">
          <Stop at={0} color="text-room-camera-chrome-light" />
          <Stop at={0.6} color="text-room-camera-chrome" />
          <Stop at={1} color="text-room-camera-chrome-dark" />
        </radialGradient>
        <radialGradient id={id("glass")} cx="0.42" cy="0.36" r="0.75">
          <Stop at={0} color="text-room-camera-lens-blue" />
          <Stop at={0.55} color="text-room-camera-lens" />
          <Stop at={1} color="text-room-camera-glass" />
        </radialGradient>
        <clipPath id={id("brushed")}>
          <rect x={9} y={12} width={114} height={78} rx={18} />
        </clipPath>
      </defs>

      <rect x={34} y={-3} width={28} height={5} rx={2.5} fill={url("chrome")} />
      <rect
        x={37}
        y={-2.3}
        width={22}
        height={0.8}
        rx={0.4}
        className="fill-room-frost"
      />
      <RealBody url={url} />

      {/* The panel round the lens, a bright edge along its top */}
      <rect
        x={7}
        y={10}
        width={160}
        height={82}
        rx={20}
        className="fill-room-camera-panel"
      />
      <rect
        x={7.5}
        y={10.5}
        width={159}
        height={81}
        rx={19.5}
        fill="none"
        strokeWidth={0.8}
        className="stroke-room-camera-shine/40"
      />

      {/* The lens: its chrome ring, the dark barrel, the blue glass with
          the light glinting off it, a purple flare, and the AF lamp */}
      <circle
        cx={146}
        cy={47.6}
        r={17.6}
        className="fill-room-camera-deep/50"
      />
      <circle cx={146} cy={47} r={17} fill={url("ring")} />
      <circle
        cx={146}
        cy={47}
        r={13.6}
        className="fill-room-camera-chrome-dark"
      />
      <circle cx={146} cy={47} r={12.4} className="fill-room-camera-glass" />
      <circle cx={146} cy={47} r={11} fill={url("glass")} />
      <rect
        x={139.5}
        y={40.5}
        width={13}
        height={13}
        rx={3.6}
        fill="none"
        strokeWidth={0.7}
        className="stroke-room-camera-glint/40"
      />
      <path
        d="M137.6 44A9.5 9.5 0 0 1 143 38"
        fill="none"
        strokeWidth={0.8}
        strokeLinecap="round"
        className="stroke-room-frost/40"
      />
      <ellipse
        cx={150}
        cy={42.6}
        rx={3.4}
        ry={2.4}
        transform="rotate(-25 150 42.6)"
        className="fill-room-camera-glint/70"
      />
      <circle cx={151.3} cy={41.9} r={1.1} className="fill-room-frost" />
      <ellipse
        cx={141.6}
        cy={51.6}
        rx={2.3}
        ry={1.2}
        className="fill-room-camera-flare/70"
      />
      <circle cx={172} cy={47} r={1.7} className="fill-room-camera-deep" />
      <circle cx={171.5} cy={46.5} r={0.6} className="fill-room-frost/60" />
      <Lettering
        x={146}
        y={102}
        size={6.4}
        anchor="middle"
        spacing={0.4}
        fill={url("chrome")}
      >
        FUJIFILM
      </Lettering>

      {/* The brushed lens cover, traced in light, shadow and shine, with
          the flash and the lettering on it */}
      <g
        className="transition-transform duration-500 ease-switch motion-reduce:transition-none"
        style={{ transform: closed ? `translateX(${COVER}px)` : undefined }}
      >
        <rect
          x={9}
          y={12}
          width={114}
          height={78}
          rx={18}
          className="fill-room-camera-panel"
        />
        <rect
          x={9}
          y={12}
          width={114}
          height={78}
          rx={18}
          fill={url("cover")}
        />
        <g clipPath={url("brushed")}>
          {brush.map(({ y, x0, x1, tone }, i) => (
            <path
              key={i}
              d={`M${x0.toFixed(1)} ${y.toFixed(1)}H${x1.toFixed(1)}`}
              strokeWidth={0.45}
              className={tone}
            />
          ))}
        </g>
        <rect
          x={9.4}
          y={12.4}
          width={113.2}
          height={77.2}
          rx={17.6}
          fill="none"
          strokeWidth={0.8}
          className="stroke-room-camera-shine/60"
        />
        <rect
          x={43}
          y={16}
          width={44}
          height={15}
          rx={4}
          fill={url("chrome")}
        />
        <rect
          x={44.5}
          y={17.5}
          width={41}
          height={12}
          rx={3}
          className="fill-room-frost/90"
        />
        {Array.from({ length: 13 }, (_, i) => (
          <path
            key={i}
            d={`M${47 + i * 3} 18.5V28.5`}
            strokeWidth={0.5}
            className={
              i % 2 ? "stroke-room-camera-chrome-dark/40" : "stroke-room-frost"
            }
          />
        ))}
        <rect
          x={45}
          y={18}
          width={40}
          height={4.5}
          rx={2}
          className="fill-room-frost/50"
        />
        <ellipse cx={21} cy={57} rx={10} ry={1.7} fill={url("chrome")} />
        <ellipse
          cx={19}
          cy={56.5}
          rx={5}
          ry={0.5}
          className="fill-room-frost"
        />
        <Lettering
          x={36}
          y={60}
          size={7.4}
          spacing={2.2}
          className="fill-room-camera-label"
        >
          FINEPIX
          <tspan dx={2.5} fontSize={10.5} fontWeight={600}>
            Z
          </tspan>
        </Lettering>
      </g>

      {/* The gloss across the front, from the top left */}
      <g clipPath={url("outline")} className="pointer-events-none">
        <path d="M0 0H100L46 108H0Z" fill={url("gloss")} />
      </g>
    </svg>
  );
}

// Camera 4's back: the lit body, the glossy black round the screen and
// the buttons, the gold strap lug, and a gloss across it. The screen and
// buttons themselves are HTML over it (Camera.tsx).
export function RealBack() {
  const { id, url } = useIds();
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      className="absolute inset-0 block h-full w-full overflow-visible"
    >
      <defs>
        <BodyDefs id={id} />
        <linearGradient id={id("black")} x1="0" y1="0" x2="0" y2="1">
          <Stop at={0} color="text-room-camera-bezel" />
          <Stop at={1} color="text-room-camera-glass" />
        </linearGradient>
      </defs>
      <RealBody url={url} />
      <rect
        x={179.5}
        y={34}
        width={4.5}
        height={18}
        rx={1.5}
        className="fill-room-camera-accent"
      />
      <rect
        x={180.5}
        y={36}
        width={2.5}
        height={14}
        rx={1}
        fill={url("chrome")}
      />

      {/* The screen's glossy black surround, its edge catching the light,
          the name under it */}
      <rect x={6} y={8} width={120} height={96} rx={9} fill={url("black")} />
      <rect
        x={6.5}
        y={8.5}
        width={119}
        height={95}
        rx={8.5}
        fill="none"
        strokeWidth={0.7}
        className="stroke-room-frost/15"
      />
      <rect
        x={12}
        y={13}
        width={108}
        height={81}
        rx={1.5}
        className="fill-room-camera-screen"
      />
      <Lettering
        x={66}
        y={101}
        size={5}
        anchor="middle"
        spacing={0.3}
        fill={url("chrome")}
      >
        FUJIFILM
      </Lettering>

      {/* The button panel, the zoom rocker, and the movie button */}
      <rect x={128} y={13} width={50} height={91} rx={10} fill={url("black")} />
      <rect
        x={128.5}
        y={13.5}
        width={49}
        height={90}
        rx={9.5}
        fill="none"
        strokeWidth={0.7}
        className="stroke-room-frost/15"
      />
      <rect
        x={132}
        y={17}
        width={42}
        height={12}
        rx={6}
        className="fill-room-camera-key"
      />
      <path
        d="M136 18.4H170"
        strokeWidth={0.6}
        strokeLinecap="round"
        className="stroke-room-frost/25"
      />
      <rect
        x={155}
        y={86}
        width={19}
        height={15}
        rx={5}
        className="fill-room-camera-key"
      />
      <path
        d="M158 87.4H171"
        strokeWidth={0.6}
        strokeLinecap="round"
        className="stroke-room-frost/25"
      />
      <rect
        x={160}
        y={92}
        width={6.5}
        height={4.6}
        rx={1}
        className="fill-room-camera-label"
      />
      <path d="M166.5 94.3l3-1.8v3.6z" className="fill-room-camera-label" />
      <circle cx={161.6} cy={90.6} r={1.3} className="fill-room-camera-label" />
      <circle cx={164.8} cy={90.6} r={1.3} className="fill-room-camera-label" />

      <g clipPath={url("outline")} className="pointer-events-none">
        <path d="M0 0H100L46 108H0Z" fill={url("gloss")} />
      </g>
    </svg>
  );
}

// Cameras 3 and 4 lying on their backs, off, seen from the front: one
// rounded slab, its front on top seen from above (the chrome top plate's
// edge far off, the cover closed over the lens), its near edge catching
// the light, and its underside facing us with the feet, the tripod socket
// and the battery door. `real` traces it like camera 4.
export function CameraLying({ real = false }: { real?: boolean }) {
  const { id, url } = useIds();
  const fill = (name: string, flat: string) =>
    real ? { fill: url(name) } : { className: flat };
  return (
    <svg
      viewBox={`0 0 ${W} ${LYING}`}
      aria-hidden="true"
      className="block h-full w-full"
    >
      <defs>
        <clipPath id={id("slab")}>
          <rect width={W} height={LYING} rx={20} ry={16} />
        </clipPath>
        {real && (
          <>
            <linearGradient id={id("side")} x1="0" y1="0" x2="0" y2="1">
              <Stop at={0} color="text-room-camera" />
              <Stop at={0.7} color="text-room-camera-dark" />
              <Stop at={1} color="text-room-camera-deep" />
            </linearGradient>
            <linearGradient id={id("top")} x1="0" y1="0" x2="0" y2="1">
              <Stop at={0} color="text-room-camera-panel" />
              <Stop at={1} color="text-room-camera-violet" />
            </linearGradient>
          </>
        )}
      </defs>
      <g clipPath={url("slab")}>
        <rect width={W} height={LYING} {...fill("side", "fill-room-camera")} />
        <rect width={12} height={LYING} className="fill-room-camera-dark/30" />
        <rect
          x={W - 12}
          width={12}
          height={LYING}
          className="fill-room-camera-dark/30"
        />
        <rect
          y={LYING - 7}
          width={W}
          height={7}
          className="fill-room-camera-dark/50"
        />

        <rect
          width={W}
          height={14}
          {...fill("top", "fill-room-camera-panel")}
        />
        <rect
          x={20}
          width={144}
          height={1.8}
          className="fill-room-camera-chrome"
        />
        <rect
          x={51}
          y={3}
          width={114}
          height={9}
          rx={8}
          ry={2.4}
          className="fill-room-camera-light/30"
        />
        {[5.5, 8, 10].map((y, i) => (
          <path
            key={y}
            d={`M${60 + i * 9} ${y}H${140 - i * 6}`}
            strokeWidth={0.4}
            className="stroke-room-camera-shine/40"
          />
        ))}
        <rect
          x={86}
          y={3.8}
          width={42}
          height={2.2}
          rx={1}
          className="fill-room-frost/80"
        />
        <path
          d={`M6 14H${W - 6}`}
          strokeWidth={1.2}
          className="stroke-room-camera-light/70"
        />

        <rect
          x={92}
          y={22}
          width={54}
          height={18}
          rx={5}
          fill="none"
          strokeWidth={0.8}
          className="stroke-room-camera-dark/70"
        />
        <circle
          cx={70}
          cy={31}
          r={4}
          className="fill-room-camera-chrome-dark"
        />
        <circle cx={70} cy={31} r={2} className="fill-room-camera-lens" />
        <ellipse
          cx={26}
          cy={31}
          rx={6}
          ry={5}
          className="fill-room-camera-dark"
        />
        <ellipse
          cx={160}
          cy={31}
          rx={6}
          ry={5}
          className="fill-room-camera-dark"
        />
        {real && (
          <>
            <rect
              x={14}
              y={15.5}
              width={W - 28}
              height={3}
              rx={1.5}
              className="fill-room-frost/10"
            />
            <ellipse
              cx={20}
              cy={20}
              rx={5}
              ry={2}
              className="fill-room-frost/20"
            />
          </>
        )}
      </g>
    </svg>
  );
}
