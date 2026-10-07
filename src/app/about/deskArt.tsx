// What's on my desk, drawn for both the room (Room.tsx, through
// DeskComputer.tsx) and its zoomed-in view: my curved monitor on its
// silver stand, my Keychron keyboard with its orange Esc, my MX Master 3S
// mouse, and my white Ember mug, its little light on. A
// plain module, no hooks, so the server and the client draw the same.
//
// In the room's units, on the desk's top at y 328, in the wall's strip
// (Room.tsx's WALL); AREA is the patch of it they take up, with a little
// room around, SCREEN the part of the monitor's screen that's always
// inside its curve, and MUG the mug, for its button (EmberMug.tsx).
export const AREA = { x: 186, y: 200, w: 166, h: 132 };
export const SCREEN = { x: 199, y: 212, w: 134, h: 55 };
export const MUG = { x: 326, y: 300, w: 24, h: 30 };
const MOUSE = { x: 289 };
const TOP = 328; // the desk's top

// The case studies' tiles, small, as the screen shows them in the room
const TILES = [
  "fill-room-computer-tile-a",
  "fill-room-computer-tile-b",
  "fill-room-computer-tile-c",
  "fill-room-computer-tile-d",
  "fill-room-computer-tile-e",
  "fill-room-computer-tile-f",
];

// A curved screen, straight on: its ends come toward you, so they look
// taller than its middle, its top curving down to the middle and its
// bottom up. Grown by `by` all round, for the bezel round it.
const curved = (by = 0) => {
  const l = 196 - by;
  const r = 336 + by;
  return `M${l} ${208 - by}Q266 ${214 - by} ${r} ${208 - by}V${270 + by}Q266 ${264 + by} ${l} ${270 + by}Z`;
};

export function DeskArt({ tiles = true }: { tiles?: boolean }) {
  const { x, y, w } = SCREEN;
  const keys = Array.from({ length: 15 }, (_, i) => 198.5 + i * 5.6);
  return (
    <g>
      {/* The monitor: its stand's neck behind it and flat foot, then its
          thin bezel, a little thicker along the bottom, and the screen */}
      <rect
        x={262}
        y={262}
        width={8}
        height={TOP - 4 - 262}
        className="fill-room-computer-stand"
      />
      <path
        d={`M262 ${TOP - 30}H270`}
        strokeWidth={1}
        className="stroke-room-computer-stand-shade"
      />
      <path
        d={`M244 ${TOP}L247 ${TOP - 4}H285L288 ${TOP}Z`}
        className="fill-room-computer-stand"
      />
      <path
        d={`M247 ${TOP - 4}H285`}
        strokeWidth={0.8}
        className="stroke-room-computer-stand-shade"
      />
      <path d={curved(1.8)} className="fill-room-computer-bezel" />
      <path
        d="M194.2 271.8Q266 266 337.8 271.8V273.4Q266 267.6 194.2 273.4Z"
        className="fill-room-computer-bezel"
      />
      <path d={curved()} className="fill-room-computer-screen" />
      {tiles && (
        <g>
          {/* A header line, then the case studies in two rows of three */}
          <rect
            x={x + 6}
            y={y + 4}
            width={22}
            height={2.4}
            className="fill-room-computer-tile-d/70"
          />
          <rect
            x={x + w - 26}
            y={y + 4}
            width={20}
            height={2.4}
            className="fill-room-computer-tile-d/30"
          />
          {TILES.map((tile, i) => (
            <rect
              key={tile}
              x={x + 6 + (i % 3) * 41.5}
              y={y + 12 + Math.floor(i / 3) * 20}
              width={38.5}
              height={17}
              className={tile}
            />
          ))}
        </g>
      )}

      {/* The keyboard: its body, its keys along the top, the orange Esc */}
      <rect
        x={196}
        y={TOP - 10}
        width={90}
        height={10}
        rx={1.6}
        className="fill-room-computer-keys"
      />
      {keys.map((kx, i) => (
        <rect
          key={kx}
          x={kx}
          y={TOP - 12.5}
          width={4.6}
          height={4}
          rx={0.8}
          className={
            i === 0 ? "fill-room-computer-esc" : "fill-room-computer-key-top"
          }
        />
      ))}

      {/* The mouse, from its thumb side, its nose to the left, as in
          Logitech's photos: a long low nose rising to a high rounded back,
          the lip of the thumb rest along the bottom, the silver thumb
          wheel with its two buttons under it, its green light, and the
          lines across its back */}
      <g transform={`translate(${MOUSE.x} ${TOP}) scale(0.85)`}>
        <path
          d="M3 0C1.2 0 0-2.2 0.4-4.2C0.8-5.6 2.5-6.4 5-7.4C9-9 12-10.8 15-12.4C19-14.6 23-16 27-16C32-16 37.5-13.5 39.4-8.5C40.4-5.6 40-2.2 38.4 0Z"
          className="fill-room-computer-mouse"
        />
        <path
          d="M5.5-7.6C10-9.6 14-11.6 17-13.2C21-15.2 24.6-15.8 28-15.6"
          fill="none"
          strokeWidth={0.6}
          strokeLinecap="round"
          className="stroke-room-computer-mouse-light"
        />
        <path
          d="M28.5-13.6L33-5.2M31.6-14.2L36-6.4M34.6-13.4L38-7.6"
          strokeWidth={0.45}
          strokeLinecap="round"
          className="stroke-room-computer-mouse-light/50"
        />
        <path
          d="M4.4 0C6-2.2 12-3 20-3C28-3 34.4-2.4 38.8-1L38.4 0Z"
          className="fill-room-computer-mouse-light"
        />
        <rect
          x={15.6}
          y={-12.4}
          width={5.6}
          height={2.6}
          rx={1.1}
          className="fill-room-computer-mouse-metal"
        />
        <path
          d="M16.8-12.2V-10M18-12.3V-9.9M19.2-12.3V-9.9M20.4-12.2V-10"
          strokeWidth={0.3}
          className="stroke-room-computer-mouse/60"
        />
        {[15.4, 20.4].map((bx) => (
          <rect
            key={bx}
            x={bx}
            y={-8.6}
            width={4.4}
            height={1.6}
            rx={0.8}
            strokeWidth={0.35}
            className="fill-room-computer-mouse stroke-room-computer-mouse-light"
          />
        ))}
        <circle
          cx={23.4}
          cy={-12.6}
          r={0.45}
          className="fill-room-computer-mouse-led"
        />
      </g>

      {/* The mug, as on Ember's site: a white cylinder rounding in at its
          foot, its thin squared handle, the little gray logo, and its light
          glowing at the bottom of its front */}
      <g transform={`translate(${MUG.x + 2} ${TOP})`}>
        <path
          d="M15 -18.6H19Q20.6 -18.6 20.6 -17V-10.4Q20.6 -8.8 19 -8.8H15"
          fill="none"
          strokeWidth={2.6}
          strokeLinejoin="round"
          className="stroke-room-computer-mug-shade"
        />
        <path
          d="M15 -18.6H19Q20.6 -18.6 20.6 -17V-10.4Q20.6 -8.8 19 -8.8H15"
          fill="none"
          strokeWidth={1.4}
          strokeLinejoin="round"
          className="stroke-room-computer-mug"
        />
        <path
          d="M0 -21H15V-4.6Q15 0 10.6 0H4.4Q0 0 0 -4.6Z"
          strokeWidth={0.6}
          className="fill-room-computer-mug stroke-room-computer-mug-shade"
        />
        <path
          d="M12.6 -20.4V-4.8Q12.6 -1.4 10 -0.8"
          fill="none"
          strokeWidth={1.6}
          className="stroke-room-computer-mug-shade/40"
        />
        <path
          d="M0.4 -20.6H14.6"
          strokeWidth={0.8}
          className="stroke-room-computer-mug-shade"
        />
        <text
          x={7.5}
          y={-7}
          fontSize={2.3}
          textAnchor="middle"
          letterSpacing={0.1}
          className="fill-room-computer-mug-shade font-sans font-medium"
        >
          ember
        </text>
        <ellipse
          cx={7.5}
          cy={-1.7}
          rx={3.4}
          ry={1.3}
          className="fill-room-computer-light/40"
        />
        <ellipse
          cx={7.5}
          cy={-1.7}
          rx={1.4}
          ry={0.45}
          className="fill-room-computer-screen"
        />
      </g>
    </g>
  );
}
