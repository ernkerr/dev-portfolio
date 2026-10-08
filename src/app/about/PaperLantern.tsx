import LampSwitch, { WhenLit } from "./LampSwitch";
import Swish from "./Swish";

// A round paper lantern right of my closet, like the Japanese ones,
// hanging on a black cord from the ceiling: white paper over thin ribs
// running round it, a little wider than it's tall, with small black wire
// rings where the cord goes in at its top and at the opening at its
// bottom. Seen a little from below, so its ribs bow down. It swings on its
// cord when the pointer brushes it (Swish.tsx). It's one of the room's
// lights, so it shares their switch (LampSwitch.tsx): click it and every
// light comes on and the page goes dark, and whenever they're on the
// paper glows, its ribs and the cord inside showing against the light.
//
// Drawn in the bookshelf's units, in a column LANTERN_WIDTH wide, from
// the top of the drawing (the ceiling).
export const LANTERN_WIDTH = 120;
const X = 60; // its middle
const CEILING = -80;
const Y = 140; // the paper's middle
const RX = 48; // how far it reaches each side of the middle, and up and down
const RY = 44;
const TOP = Y - RY;
const BOTTOM = Y + RY;
const f = (n: number) => n.toFixed(2);

// The ribs, from near its top to near its bottom, closer together toward
// each as they would be round a ball, each bowing down a little and
// running a touch downhill to the right, as they spiral round
const RIBS = Array.from({ length: 15 }, (_, i) => {
  const at = ((i + 1) / 16 - 0.5) * Math.PI; // -90° at the top, 90° at the bottom
  const y = Y + RY * Math.sin(at);
  const reach = RX * Math.cos(at) - 0.8;
  const bow = 3 * Math.cos(at);
  return `M${f(X - reach)} ${f(y)}Q${X} ${f(y + 0.6 + bow * 2)} ${f(X + reach)} ${f(y + 1.2)}`;
});

// The black wire rings: a small one at the top where the cord goes in, a
// wider one round the opening at the bottom
function Rings() {
  return (
    <g>
      <path
        d={`M${X - 8} ${TOP + 1.4}Q${X} ${TOP + 3} ${X + 8} ${TOP + 1.4}`}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        className="stroke-room-metal"
      />
      <path
        d={`M${X - 13} ${BOTTOM - 1.6}Q${X} ${BOTTOM + 1.2} ${X + 13} ${BOTTOM - 1.6}`}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        className="stroke-room-metal"
      />
    </g>
  );
}

const ribs = (className: string) =>
  RIBS.map((d) => (
    <path key={d} d={d} fill="none" strokeWidth={0.9} className={className} />
  ));

function Lantern() {
  return (
    <g>
      {/* The cord from the ceiling, and the little cup it hangs from */}
      <rect
        x={X - 5}
        y={CEILING}
        width={10}
        height={3}
        className="fill-room-metal"
      />
      <path
        d={`M${X} ${CEILING + 3}V${TOP + 2}`}
        strokeWidth={1.2}
        className="stroke-room-metal"
      />

      {/* The paper, off: white, a shade round its lower right, its ribs */}
      <ellipse
        cx={X}
        cy={Y}
        rx={RX}
        ry={RY}
        className="fill-room-paper-shade"
      />
      <ellipse
        cx={X - 5}
        cy={Y - 4}
        rx={RX - 7}
        ry={RY - 6}
        className="fill-room-paper"
      />
      {ribs("stroke-room-paper-rib")}
      <Rings />

      {/* Lit: warm at its edge and hot round the bulb, the cord's shadow
          down to it and the ribs dark against the light */}
      <WhenLit>
        <ellipse cx={X} cy={Y} rx={RX} ry={RY} className="fill-room-glow" />
        <ellipse
          cx={X - 2}
          cy={Y + 2}
          rx={RX - 9}
          ry={RY - 9}
          className="fill-room-paper-lit"
        />
        <path
          d={`M${X} ${TOP + 2}V${Y - 4}`}
          strokeWidth={1.6}
          className="stroke-room-metal/20"
        />
        {ribs("stroke-room-paper-lit-rib")}
        <Rings />
      </WhenLit>
    </g>
  );
}

export default function PaperLantern({
  top,
  height,
}: {
  /** The bookshelf drawing's top and height, to line up with it. */
  top: number;
  height: number;
}) {
  return (
    <div
      className="shrink-0"
      style={{ width: `calc(var(--room-unit) * ${LANTERN_WIDTH})` }}
    >
      <LampSwitch
        viewBox={`0 ${top} ${LANTERN_WIDTH} ${height}`}
        title="A round paper lantern hanging from the ceiling, right of my closet."
        label="Paper lantern (dark mode)"
        width="w-full"
        glow={{ x: X, y: Y, r: 480 }}
        hit={{
          left: ((X - RX - 4) / LANTERN_WIDTH) * 100,
          top: ((TOP - 6 - top) / height) * 100,
          width: (((RX + 4) * 2) / LANTERN_WIDTH) * 100,
          height: ((RY * 2 + 12) / height) * 100,
        }}
      >
        <Swish x={X} y={CEILING + 3} feel="lantern">
          <Lantern />
        </Swish>
      </LampSwitch>
    </div>
  );
}
