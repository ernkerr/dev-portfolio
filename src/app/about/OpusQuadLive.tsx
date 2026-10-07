"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { BEATS, DECK_BUTTONS, waveBands } from "./opusQuadArt";
import { DeckOn } from "./TiltingDeck";

type Pt = [number, number];
type Press = React.PointerEvent<SVGElement>;

// DJ 5, to play: drawn on the tilted deck in the angled photo's pixels,
// over Room's drawing of the rest. Plugged in, it only lights up: both
// tracks loaded and waiting at their cue points, and the play buttons
// blinking, ringed until one's pressed. PLAY then starts and stops each
// deck, and CUE takes it back to its cue point, stopped. A playing deck's
// waveform scrolls past the playhead and its jog wheel turns, as fast as
// its tempo fader sets. Grab a jog wheel to scratch: the track follows
// your hand back and forth, and plays on when you let go. The channel
// faders and the crossfader set how loud each deck is, which its level
// meter shows. Its pads are color swatches: tap one and that deck's jog
// ring lights up in its color. While a deck plays, a soft glow runs along
// its swatches in order, one a beat, each in its own color, and its ring's
// glow breathes with the beat. Unplugged, it stops, goes back to its cue
// points and goes dark; the faders and colors stay as they were left.
const SPEED = BEATS / 2; // waveform pixels a second: a run of beats every 2s, 120 BPM
const TURN = SPEED * 1.8; // waveform pixels in one turn of a jog wheel, at 33 rpm
const TRACK = BEATS * 90; // a whole track, 3 minutes, for where it's at
const RANGE = 0.25; // how much faster or slower the tempo faders go, each way
const KICK = 24; // waveform pixels from one kick drum to the next
const SEGMENTS = ["green", "green", "green", "green", "amber", "amber"];

// The pads' colors, Pioneer's hot cue colors in order, and each one's
// classes for a pad and a jog ring.
const LIGHTS = {
  pink: {
    pad: "fill-room-dj-lit-pink",
    ring: "stroke-room-dj-lit-pink",
    glow: "stroke-room-dj-lit-pink/20",
    dim: "stroke-room-dj-lit-pink/40",
  },
  red: {
    pad: "fill-room-dj-lit-red",
    ring: "stroke-room-dj-lit-red",
    glow: "stroke-room-dj-lit-red/20",
    dim: "stroke-room-dj-lit-red/40",
  },
  amber: {
    pad: "fill-room-dj-lit-amber",
    ring: "stroke-room-dj-lit-amber",
    glow: "stroke-room-dj-lit-amber/20",
    dim: "stroke-room-dj-lit-amber/40",
  },
  yellow: {
    pad: "fill-room-dj-lit-yellow",
    ring: "stroke-room-dj-lit-yellow",
    glow: "stroke-room-dj-lit-yellow/20",
    dim: "stroke-room-dj-lit-yellow/40",
  },
  green: {
    pad: "fill-room-dj-lit-green",
    ring: "stroke-room-dj-lit-green",
    glow: "stroke-room-dj-lit-green/20",
    dim: "stroke-room-dj-lit-green/40",
  },
  cyan: {
    pad: "fill-room-dj-lit-cyan",
    ring: "stroke-room-dj-lit-cyan",
    glow: "stroke-room-dj-lit-cyan/20",
    dim: "stroke-room-dj-lit-cyan/40",
  },
  blue: {
    pad: "fill-room-dj-lit-blue",
    ring: "stroke-room-dj-lit-blue",
    glow: "stroke-room-dj-lit-blue/20",
    dim: "stroke-room-dj-lit-blue/40",
  },
  violet: {
    pad: "fill-room-dj-lit-violet",
    ring: "stroke-room-dj-lit-violet",
    glow: "stroke-room-dj-lit-violet/20",
    dim: "stroke-room-dj-lit-violet/40",
  },
};
type Light = keyof typeof LIGHTS;
const SWATCHES = Object.keys(LIGHTS) as Light[];

const DECKS = [
  {
    jog: 211,
    button: DECK_BUTTONS[0],
    wave: 199,
    phase: 0,
    screen: 158,
    overview: 244,
    at: 0.4, // where its cue point is in the track
    tempo: { x: 316, top: 345, bottom: 420 },
    pads: 145, // the first of its 8 pads, 21 apart
  },
  {
    jog: 683,
    button: DECK_BUTTONS[1],
    wave: 225,
    phase: 9,
    screen: 598,
    overview: 252,
    at: 0.65,
    tempo: { x: 789, top: 360, bottom: 432 },
    pads: 588,
  },
];
const WAVES = DECKS.map(({ wave, phase }) => waveBands(wave, phase));
// The channel faders, decks 1 and 2 on channels 1 and 2, their caps 10
// tall; the meters beside them; the crossfader's rail, its cap 12 wide.
const CHANNELS = [398, 432, 465, 500];
const CHANNEL = { top: 365, travel: 27 };
const METERS = [411, 445];
const CROSSFADER = { center: 445, travel: 25 };
// A tempo cap's top, centered, and how far it slides each way.
const tempoTrack = ({ top, bottom }: { top: number; bottom: number }) => ({
  center: (top + bottom - 10) / 2,
  half: (bottom - 10 - top) / 2,
});

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

export default function OpusQuadLive({
  id,
  children,
}: {
  /** The ids Room's lit drawing uses, for its screen's clip. */
  id: string;
  /** Room's drawing of everything lit that keeps still. */
  children: React.ReactNode;
}) {
  const on = useContext(DeckOn);
  const [playing, setPlaying] = useState([false, false]);
  const [started, setStarted] = useState(false);
  const [lights, setLights] = useState<Light[]>(["amber", "amber"]);
  // Turned off, it stops and forgets it was played.
  const [wasOn, setWasOn] = useState(on);
  if (on !== wasOn) {
    setWasOn(on);
    if (!on) {
      setPlaying([false, false]);
      setStarted(false);
    }
  }

  const rootRef = useRef<SVGGElement>(null);
  const parts = useRef<Record<string, SVGElement | null>>({});
  const part = (key: string) => (el: SVGElement | null) => {
    parts.current[key] = el;
  };
  // Everything that moves, changed as it plays and as it's played with,
  // and drawn each frame.
  const live = useRef({
    decks: DECKS.map(() => ({
      playing: false,
      pos: 0, // waveform pixels from its cue point
      tempo: 0,
      held: null as number | null, // the jog's angle under the hand
      heldAt: 0,
      spin: 0, // how fast it's being scratched, pixels a second
    })),
    faders: CHANNELS.map(() => 0.8),
    crossfader: 0,
    meters: [0, 0],
    lights: ["amber", "amber"] as Light[],
  });
  useEffect(() => {
    live.current.lights = lights;
  }, [lights]);

  const set = (key: string, attr: string, value: number | string) =>
    parts.current[key]?.setAttribute(attr, String(value));

  const paint = () => {
    const { decks, faders, crossfader, meters } = live.current;
    decks.forEach((d, i) => {
      const { at, screen, tempo } = DECKS[i];
      const scroll = ((d.pos % BEATS) + BEATS) % BEATS;
      set(`wave${i}`, "transform", `translate(${-scroll} 0)`);
      const turn = (d.pos / TURN) * 360;
      set(`jog${i}`, "transform", `rotate(${turn})`);
      set(`platter${i}`, "transform", `rotate(${turn})`);
      const where = clamp(at + d.pos / TRACK, 0, 1);
      set(`overview${i}`, "x", 357 + 180 * where);
      set(`screen${i}`, "x", screen + 6 + 130 * where);
      const { half } = tempoTrack(tempo);
      set(`tempo${i}`, "transform", `translate(0 ${(d.tempo / RANGE) * half})`);
      const lit = Math.round(meters[i] * SEGMENTS.length);
      SEGMENTS.forEach((_, k) =>
        set(`meter${i}-${k}`, "opacity", k < lit ? 1 : 0.15),
      );
      // As it plays, a glow runs along its swatches in order, one a beat,
      // each glowing softly in its own color, and its ring's glow breathes
      // with the beat; stopped, they all keep still
      const playing = d.playing && d.held === null;
      const chase =
        (((d.pos / KICK) % SWATCHES.length) + SWATCHES.length) %
        SWATCHES.length;
      set(`glow${i}`, "opacity", playing ? 0.55 + 0.45 * beat(i) : 1);
      SWATCHES.forEach((color, k) => {
        const apart = Math.abs(chase - k);
        const near = Math.min(apart, SWATCHES.length - apart);
        const lit = playing ? Math.max(0, 1 - near) : 0;
        set(`pad${i}-${color}`, "opacity", playing ? 0.7 + 0.3 * lit : 1);
        set(`halo${i}-${color}`, "opacity", 0.8 * lit);
      });
    });
    faders.forEach((v, k) =>
      set(
        `channel${k}`,
        "transform",
        `translate(0 ${(1 - v) * CHANNEL.travel})`,
      ),
    );
    set(
      "crossfader",
      "transform",
      `translate(${crossfader * CROSSFADER.travel} 0)`,
    );
  };

  // A deck's beat: 1 as a kick drum passes the playhead (x 447), dying
  // away until the next
  const beat = (i: number) => {
    const d = live.current.decks[i];
    const since = (((95 + d.pos + 4 * DECKS[i].phase) % KICK) + KICK) % KICK;
    return Math.exp(-since / 6);
  };

  // How loud a deck is now: its kick drums as they pass the playhead, or
  // how fast it's being scratched, through its fader and the crossfader.
  const level = (i: number) => {
    const { decks, faders, crossfader } = live.current;
    const d = decks[i];
    const side = i === 0 ? 1 - crossfader : 1 + crossfader;
    const gain = faders[i] * Math.min(1, side);
    if (d.held !== null) return gain * Math.min(1, Math.abs(d.spin) / 150);
    if (!d.playing) return 0;
    return gain * (0.45 + 0.55 * beat(i));
  };

  useEffect(() => {
    const { decks } = live.current;
    if (!on) {
      decks.forEach((d) => {
        d.playing = false;
        d.pos = 0;
        d.held = null;
        d.spin = 0;
      });
      live.current.meters = [0, 0];
      paint();
      return;
    }
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const t = now / 1000;
      const dt = last ? Math.min(0.05, t - last) : 0;
      last = t;
      decks.forEach((d) => {
        if (d.playing && d.held === null) d.pos += dt * SPEED * (1 + d.tempo);
        d.spin *= Math.exp(-dt * 10);
      });
      // Meters jump up and fall back slower, like real ones
      live.current.meters = live.current.meters.map((m, i) =>
        Math.max(level(i), m - dt * 2.5),
      );
      paint();
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // paint and level only read refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on]);

  // From the pointer to the photo's pixels.
  const toPhoto = (e: Press): Pt | null => {
    const m = rootRef.current?.getScreenCTM();
    if (!m) return null;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return [p.x, p.y];
  };

  // A fader: grab it anywhere along its track and slide it.
  const slide = (move: (p: Pt) => void) => ({
    onPointerDown: (e: Press) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const p = toPhoto(e);
      if (p) move(p);
    },
    onPointerMove: (e: Press) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
      const p = toPhoto(e);
      if (p) move(p);
    },
  });

  // A jog wheel: the track turns with the hand around its middle.
  const angle = (i: number, [x, y]: Pt) =>
    Math.atan2((y - 352) * (88 / 56), x - DECKS[i].jog);
  const scratch = (i: number) => {
    const d = live.current.decks[i];
    const letGo = () => {
      d.held = null;
    };
    return {
      onPointerDown: (e: Press) => {
        const p = toPhoto(e);
        if (!p) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        d.held = angle(i, p);
        d.heldAt = e.timeStamp;
      },
      onPointerMove: (e: Press) => {
        const p = d.held === null ? null : toPhoto(e);
        if (!p || d.held === null) return;
        const a = angle(i, p);
        let turned = a - d.held;
        if (turned > Math.PI) turned -= 2 * Math.PI;
        if (turned < -Math.PI) turned += 2 * Math.PI;
        const moved = (turned / (2 * Math.PI)) * TURN;
        const dt = Math.max(0.008, (e.timeStamp - d.heldAt) / 1000);
        d.held = a;
        d.heldAt = e.timeStamp;
        d.pos += moved;
        d.spin = d.spin * 0.5 + (moved / dt) * 0.5;
      },
      onPointerUp: letGo,
      onPointerCancel: letGo,
    };
  };

  const play = (i: number) => {
    const d = live.current.decks[i];
    d.playing = !d.playing;
    setPlaying(live.current.decks.map((deck) => deck.playing));
    setStarted(true);
  };
  const cue = (i: number) => {
    const d = live.current.decks[i];
    d.playing = false;
    d.pos = 0;
    setPlaying(live.current.decks.map((deck) => deck.playing));
  };

  const cap = (x: number, y: number, w: number, h = 10) => (
    <>
      <rect
        x={x - w / 2}
        y={y}
        width={w}
        height={h}
        rx={1.5}
        className="fill-room-dj-jog"
      />
      <rect
        x={x - w / 2}
        y={y + h / 2 - 0.5}
        width={w}
        height={1}
        className="fill-room-book-paper/40"
      />
    </>
  );

  return (
    <g ref={rootRef}>
      {on && (
        <g className="animate-dj-on motion-reduce:animate-none">
          {children}

          {/* The waveforms, the playhead and where each track's at */}
          <g clipPath={`url(#${id}-screen)`}>
            {WAVES.map((bands, i) => (
              <g key={i} ref={part(`wave${i}`)}>
                <path d={bands.low} className="fill-room-dj-lit-blue" />
                <path d={bands.mid} className="fill-room-dj-lit-amber" />
                <path d={bands.high} className="fill-room-frost" />
              </g>
            ))}
          </g>
          <path
            d="M447 188V236"
            strokeWidth={1.5}
            className="stroke-room-frost"
          />
          {DECKS.map(({ overview, screen, at }, i) => (
            <g key={i}>
              <rect
                ref={part(`overview${i}`)}
                x={357 + 180 * at}
                y={overview - 4}
                width={1.5}
                height={8}
                className="fill-room-frost"
              />
              <rect
                ref={part(`screen${i}`)}
                x={screen + 6 + 130 * at}
                y={243}
                width={1.5}
                height={14}
                className="fill-room-frost"
              />
            </g>
          ))}
          <path
            d="M356 181H420L372 256H356Z"
            className="fill-room-book-paper/5"
          />

          <defs>
            <filter
              id={`${id}-pad-glow`}
              x="-100%"
              y="-150%"
              width="300%"
              height="400%"
            >
              <feGaussianBlur stdDeviation={3} />
            </filter>
          </defs>
          {/* The pads, in their colors, the one each jog ring's lit in
              outlined, each with a soft glow round it for when it's its
              turn; then the rings, glowing in their color */}
          {DECKS.map(({ pads }, i) =>
            SWATCHES.map((color, k) => (
              <rect
                key={`halo-${i}-${color}`}
                ref={part(`halo${i}-${color}`)}
                x={pads + k * 21 - 1}
                y={273}
                width={18}
                height={10}
                rx={2}
                opacity={0}
                filter={`url(#${id}-pad-glow)`}
                className={LIGHTS[color].pad}
              />
            )),
          )}
          {DECKS.map(({ pads }, i) =>
            SWATCHES.map((color, k) => (
              <rect
                key={`${i}-${color}`}
                ref={part(`pad${i}-${color}`)}
                x={pads + k * 21}
                y={274}
                width={16}
                height={8}
                rx={1.5}
                strokeWidth={lights[i] === color ? 2 : 0}
                className={`${LIGHTS[color].pad} stroke-room-frost`}
              />
            )),
          )}
          {DECKS.map(({ jog }, i) => (
            <g key={i}>
              <ellipse
                cx={jog}
                cy={353}
                rx={96}
                ry={61}
                fill="none"
                strokeWidth={10}
                ref={part(`glow${i}`)}
                className={LIGHTS[lights[i]].glow}
              />
              <ellipse
                cx={jog}
                cy={353}
                rx={96}
                ry={61}
                fill="none"
                strokeWidth={3}
                className={LIGHTS[lights[i]].ring}
              />
            </g>
          ))}

          {/* Each jog wheel's mark on its platter and on its display, turning
              as it plays or is scratched */}
          {DECKS.map(({ jog }, i) => (
            <g key={i}>
              <g transform={`translate(${jog} 352) scale(1 ${56 / 88})`}>
                <g ref={part(`platter${i}`)}>
                  <circle cy={-81} r={4} className="fill-room-frost/70" />
                </g>
              </g>
              <g transform={`translate(${jog} 347) scale(1 ${13 / 22})`}>
                <g ref={part(`jog${i}`)}>
                  <circle
                    r={18}
                    fill="none"
                    strokeWidth={2}
                    className={LIGHTS[lights[i]].dim}
                  />
                  <path
                    d="M0 -18V-9"
                    strokeWidth={4}
                    strokeLinecap="round"
                    className="stroke-room-frost"
                  />
                </g>
              </g>
            </g>
          ))}

          {/* Cue lit while it waits; play blinking until it plays */}
          {DECKS.map(({ button }, i) => (
            <g key={i}>
              <ellipse
                cx={button}
                cy={383}
                rx={16}
                ry={12}
                strokeWidth={3}
                className={`fill-room-dj-base ${playing[i] ? "stroke-room-dj-lit-amber/30" : "stroke-room-dj-lit-amber"}`}
              />
              <ellipse
                cx={button}
                cy={413}
                rx={16}
                ry={12}
                strokeWidth={3}
                className={`fill-room-dj-base stroke-room-dj-lit-green ${playing[i] ? "" : "animate-dj-blink motion-reduce:animate-none"}`}
              />
              {!started && (
                <ellipse
                  cx={button}
                  cy={413}
                  rx={18}
                  ry={14}
                  fill="none"
                  strokeWidth={2}
                  className="origin-center animate-ping stroke-room-dj-lit-green [transform-box:fill-box] motion-reduce:animate-none"
                />
              )}
            </g>
          ))}

          {/* The level meters beside channels 1 and 2 */}
          {METERS.map((x, i) => (
            <g key={x}>
              <rect
                x={x - 2.5}
                y={365}
                width={5}
                height={37}
                rx={1}
                className="fill-room-dj-base"
              />
              {SEGMENTS.map((color, k) => (
                <rect
                  key={k}
                  ref={part(`meter${i}-${k}`)}
                  x={x - 1.5}
                  y={396 - k * 5.6}
                  width={3}
                  height={4.4}
                  opacity={0.15}
                  className={
                    color === "green"
                      ? "fill-room-dj-lit-green"
                      : "fill-room-dj-lit-amber"
                  }
                />
              ))}
            </g>
          ))}
        </g>
      )}

      {/* The fader caps, on or off: tempo, the channels, the crossfader */}
      {DECKS.map(({ tempo }, i) => (
        <g key={i} ref={part(`tempo${i}`)}>
          {cap(tempo.x, tempoTrack(tempo).center, 24)}
        </g>
      ))}
      {CHANNELS.map((x, k) => (
        <g
          key={x}
          ref={part(`channel${k}`)}
          transform={`translate(0 ${0.2 * CHANNEL.travel})`}
        >
          {cap(x, CHANNEL.top, 18)}
        </g>
      ))}
      <g ref={part("crossfader")}>{cap(451, 408, 12, 18)}</g>

      {/* Where to press, grab and slide, a little bigger than each part */}
      {on && (
        <g fill="transparent">
          {/* The whole deck, so what's under it doesn't take the pointer */}
          <path
            d="M316 175H563V222H805L862 442V468L824 478H78L40 468V442L118 222H316Z"
            pointerEvents="all"
          />
          {DECKS.map(({ jog }, i) => (
            <ellipse
              key={i}
              cx={jog}
              cy={352}
              rx={92}
              ry={60}
              pointerEvents="all"
              className="cursor-grab touch-none active:cursor-grabbing"
              {...scratch(i)}
            />
          ))}
          {DECKS.map(({ tempo }, i) => {
            const { center, half } = tempoTrack(tempo);
            return (
              <rect
                key={i}
                x={tempo.x - 16}
                y={tempo.top - 5}
                width={32}
                height={tempo.bottom - tempo.top + 10}
                pointerEvents="all"
                className="cursor-ns-resize touch-none"
                {...slide(([, y]) => {
                  live.current.decks[i].tempo =
                    clamp((y - 5 - center) / half, -1, 1) * RANGE;
                })}
              />
            );
          })}
          {CHANNELS.map((x, k) => (
            <rect
              key={x}
              x={x - 14}
              y={360}
              width={28}
              height={44}
              pointerEvents="all"
              className="cursor-ns-resize touch-none"
              {...slide(([, y]) => {
                live.current.faders[k] = clamp(
                  1 - (y - 5 - CHANNEL.top) / CHANNEL.travel,
                  0,
                  1,
                );
              })}
            />
          ))}
          <rect
            x={414}
            y={404}
            width={74}
            height={26}
            pointerEvents="all"
            className="cursor-ew-resize touch-none"
            {...slide(([x]) => {
              live.current.crossfader = clamp(
                (x - 6 - CROSSFADER.center) / CROSSFADER.travel,
                -1,
                1,
              );
            })}
          />
          {DECKS.map(({ pads }, i) =>
            SWATCHES.map((color, k) => (
              <rect
                key={`${i}-${color}`}
                x={pads + k * 21 - 2.5}
                y={269}
                width={21}
                height={18}
                pointerEvents="all"
                className="cursor-pointer"
                onClick={() =>
                  setLights((now) =>
                    now.map((light, deck) => (deck === i ? color : light)),
                  )
                }
              />
            )),
          )}
          {DECKS.map(({ button }, i) => (
            <g key={i} pointerEvents="all" className="cursor-pointer">
              <ellipse
                cx={button}
                cy={383}
                rx={20}
                ry={14}
                onClick={() => cue(i)}
              />
              <ellipse
                cx={button}
                cy={413}
                rx={20}
                ry={15}
                onClick={() => play(i)}
              />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}
