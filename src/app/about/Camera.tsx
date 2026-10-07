"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { focusRing } from "@/components/site/links";
import {
  BRUSH,
  CameraLying,
  COVER,
  H,
  LYING,
  RealBack,
  RealFront,
  W,
} from "./cameraArt";

// My purple Fujifilm FinePix Z37, for cameras 1 to 4: it sits on the
// board below the DJ deck. Click it and it comes off the shelf, bigger,
// turning round like a pulled book to show its back, and you can use it:
// its screen shows the photos left on it, mine first and then the ones
// visitors left, oldest to newest, and its buttons work like the real
// camera's. Play shows the photos and the arrows go through them; the
// shutter turns your camera on, then takes a photo (or the timer does, in
// 3); MENU/OK leaves it, at the end, and DISP/BACK goes back. The trash
// deletes a photo you left, never mine or anyone else's. W and T zoom.
// Esc, Close or a click outside puts it back. A photo left waits for me to
// approve it (at /about/review): until then only whoever left it sees it,
// marked as waiting.
//
// Camera 2 is bigger, and sits on the shelf off, its lens cover closed.
// Clicked, it slides the cover open to turn on before it comes out, even
// bigger, its screen starting up with the maker's name, and its shutter
// pulses, like the DJ deck's jack, while it's what to press next. Put
// back, it slides the cover closed again.
//
// Camera 3 lies on its back on the shelf (see CameraLying). Clicked, it
// stands up and comes out; then slides its cover open, turning on; then
// turns round to its back. Put back, it does all that the other way round.
// Its shutter keeps each photo it takes: there's nothing to save, and the
// trash deletes it. Camera 4 is camera 3 traced closer to the photos, with
// more colors and shine (cameraArt.tsx).
//
// Drawn from the maker's photos, straight on, in its own units (W by H,
// cameraArt.tsx). The screen and buttons on its back are HTML over the
// drawing, at the same places.
const DURATION = 700; // ms to come out or go back, as duration-700
const MAX_WIDTH = { 1: 560, 2: 720, 3: 640, 4: 640, 5: 640 }; // how wide it comes out, at most, in pixels
const SLIDE = 500; // ms for camera 2's lens cover to slide, as duration-500
const BOOT = 700; // ms its screen shows the maker's name, once it's out
const ABOVE = 40; // pixels above it for Close
const BELOW = 56; // and below it for the note
const KEY = "about-camera-owner"; // where a visitor's browser keeps who they are

const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const at = (x: number, y: number, w: number, h: number) => ({
  left: pct(x, W),
  top: pct(y, H),
  width: pct(w, W),
  height: pct(h, H),
});

// The screen on its back, and its buttons: the W/T rocker's halves, then
// the grid of eight, two across, and the shutter on top
const SCREEN = at(12, 13, 108, 81);
const COLS = [132, 155];
const ROWS = [32, 50, 68, 86];
const key = (col: number, row: number) => at(COLS[col], ROWS[row], 19, 15);

/* ---------- Drawings ---------- */

function Body() {
  return (
    <>
      {/* The body, its rim showing below, the chrome top plate, the feet */}
      <rect
        x={0}
        y={2}
        width={W}
        height={H - 2}
        rx={26}
        className="fill-room-camera-dark"
      />
      <rect
        x={0}
        y={0}
        width={W}
        height={H - 4}
        rx={26}
        className="fill-room-camera"
      />
      <rect
        x={20}
        y={0}
        width={144}
        height={5}
        rx={2.5}
        className="fill-room-camera-chrome"
      />
      <rect
        x={26}
        y={1}
        width={132}
        height={1}
        rx={0.5}
        className="fill-room-frost/80"
      />
      <ellipse
        cx={34}
        cy={H - 2}
        rx={7}
        ry={2.2}
        className="fill-room-camera-dark"
      />
      <ellipse
        cx={150}
        cy={H - 2}
        rx={7}
        ry={2.2}
        className="fill-room-camera-dark"
      />
    </>
  );
}

// `closed` slides the lens cover across the lens: camera 2 sits on the
// shelf like that, off, and slides it open to turn on. Camera 1's is open.
export function CameraFront({ closed = false }: { closed?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      className="block h-full w-full overflow-visible"
    >
      <rect
        x={34}
        y={-3}
        width={28}
        height={5}
        rx={2.5}
        className="fill-room-camera-chrome"
      />
      <Body />

      {/* The front panel round the lens */}
      <rect
        x={7}
        y={10}
        width={160}
        height={82}
        rx={20}
        className="fill-room-camera-panel"
      />

      {/* The lens in its chrome ring, catching the light, and the AF lamp */}
      <circle cx={146} cy={47} r={17} className="fill-room-camera-chrome" />
      <circle
        cx={146}
        cy={47}
        r={13.6}
        className="fill-room-camera-chrome-dark"
      />
      <circle cx={146} cy={47} r={12} className="fill-room-camera-lens" />
      <rect
        x={139}
        y={40}
        width={14}
        height={14}
        rx={4}
        strokeWidth={0.8}
        className="fill-room-camera-lens stroke-room-camera-glint/40"
      />
      <circle
        cx={150.5}
        cy={42.5}
        r={2.8}
        className="fill-room-camera-glint/80"
      />
      <circle cx={142} cy={51} r={1.3} className="fill-room-camera-glint/50" />
      <circle cx={172} cy={47} r={1.5} className="fill-room-camera-dark" />
      <text
        x={146}
        y={102}
        textAnchor="middle"
        fontSize={6.4}
        fontWeight={700}
        letterSpacing={0.4}
        className="fill-room-camera-chrome font-sans"
      >
        FUJIFILM
      </text>

      {/* The brushed lens cover, with the flash and the lettering on it,
          sliding across the lens and back */}
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
          strokeWidth={0.8}
          className="fill-room-camera-light/20 stroke-room-camera-light/50"
        />
        {BRUSH.map(([y, x0, x1]) => (
          <path
            key={y}
            d={`M${x0} ${y}H${x1}`}
            strokeWidth={0.5}
            className="stroke-room-camera-light/30"
          />
        ))}
        <rect
          x={44}
          y={17}
          width={42}
          height={13}
          rx={3.5}
          strokeWidth={0.6}
          className="fill-room-frost/90 stroke-room-camera-chrome-dark/60"
        />
        {Array.from({ length: 13 }, (_, i) => (
          <path
            key={i}
            d={`M${47 + i * 3} 18.5V28.5`}
            strokeWidth={0.4}
            className="stroke-room-camera-chrome-dark/30"
          />
        ))}
        <ellipse
          cx={21}
          cy={57}
          rx={10}
          ry={1.6}
          className="fill-room-camera-chrome"
        />
        <text
          x={36}
          y={60}
          fontSize={7.4}
          letterSpacing={2.2}
          className="fill-room-camera-label font-sans"
        >
          FINEPIX
          <tspan dx={2.5} fontSize={10.5} fontWeight={600}>
            Z
          </tspan>
        </text>
      </g>
    </svg>
  );
}

function CameraBack() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      className="absolute inset-0 block h-full w-full overflow-visible"
    >
      <Body />
      <rect
        x={180}
        y={36}
        width={4}
        height={14}
        rx={1.5}
        className="fill-room-camera-chrome"
      />

      {/* The screen in its black surround, the name under it */}
      <rect
        x={6}
        y={8}
        width={120}
        height={96}
        rx={9}
        className="fill-room-camera-glass"
      />
      <rect
        x={12}
        y={13}
        width={108}
        height={81}
        rx={1.5}
        className="fill-room-camera-screen"
      />
      <text
        x={66}
        y={101}
        textAnchor="middle"
        fontSize={5}
        fontWeight={700}
        letterSpacing={0.3}
        className="fill-room-camera-chrome font-sans"
      >
        FUJIFILM
      </text>

      {/* The button panel: the zoom rocker, and the movie button, which
          doesn't do anything here */}
      <rect
        x={128}
        y={13}
        width={50}
        height={91}
        rx={10}
        className="fill-room-camera-glass"
      />
      <rect
        x={132}
        y={17}
        width={42}
        height={12}
        rx={6}
        className="fill-room-camera-key"
      />
      <rect
        x={155}
        y={86}
        width={19}
        height={15}
        rx={5}
        className="fill-room-camera-key"
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
    </svg>
  );
}

// Cameras 3 and 4 standing or lying down, in a box the standing front's
// shape, the bottom on the board. Lying, it's the slab of it on its back
// (CameraLying); standing up, the front grows up out of it as the slab
// fades away.
function Posed({
  standing,
  closed,
  real,
}: {
  standing: boolean;
  closed: boolean;
  real: boolean;
}) {
  const fade = "transition-opacity duration-300 motion-reduce:transition-none";
  return (
    <>
      <div
        className="h-full w-full origin-bottom transition-transform duration-700 ease-switch motion-reduce:transition-none"
        style={{ transform: standing ? undefined : `scaleY(${LYING / H})` }}
      >
        <div
          className={`h-full w-full ${fade} ${standing ? "opacity-100" : "opacity-0"}`}
        >
          {real ? (
            <RealFront closed={closed} />
          ) : (
            <CameraFront closed={closed} />
          )}
        </div>
      </div>
      <div
        className={`absolute inset-x-0 bottom-0 ${fade} ${standing ? "opacity-0" : "opacity-100"}`}
        style={{ height: pct(LYING, H) }}
      >
        <CameraLying real={real} />
      </div>
    </>
  );
}

// The icons on the grid's buttons, in a button's own 19 by 15
const ICONS = {
  trash: (
    <>
      <path
        d="M6.5 4.6l3-2.4 3 2.4"
        fill="none"
        strokeWidth={0.9}
        className="stroke-room-camera-accent"
      />
      <path
        d="M6.8 6.6h5.4M7.4 6.6l.5 5.6h3.2l.5-5.6M8.6 5.6h1.8"
        fill="none"
        strokeWidth={0.8}
        className="stroke-room-camera-label"
      />
    </>
  ),
  play: (
    <>
      <rect
        x={4.5}
        y={3.5}
        width={10}
        height={8}
        rx={1}
        fill="none"
        strokeWidth={0.8}
        className="stroke-room-camera-label"
      />
      <path d="M8.2 5.6l3.6 1.9-3.6 1.9z" className="fill-room-camera-label" />
    </>
  ),
  prev: (
    <>
      <path
        d="M4.6 4.5l-2 3 2 3"
        fill="none"
        strokeWidth={0.9}
        className="stroke-room-camera-accent"
      />
      <circle cx={10.5} cy={6.2} r={2.3} className="fill-room-camera-label" />
      <path
        d="M10.5 8.4v3.6M10.5 11c-1.4-.2-2.2-.9-2.6-1.9M10.5 11c1.4-.2 2.2-.9 2.6-1.9"
        fill="none"
        strokeWidth={0.7}
        className="stroke-room-camera-label"
      />
    </>
  ),
  next: (
    <>
      <path
        d="M9.6 2.6l-3 5.2h2.6l-1.8 4.6 4.6-6h-2.7l2-3.8z"
        className="fill-room-camera-label"
      />
      <path
        d="M14.4 4.5l2 3-2 3"
        fill="none"
        strokeWidth={0.9}
        className="stroke-room-camera-accent"
      />
    </>
  ),
  timer: (
    <>
      <circle
        cx={9.5}
        cy={6.4}
        r={3.3}
        fill="none"
        strokeWidth={0.8}
        className="stroke-room-camera-label"
      />
      <path
        d="M9.5 4.4v2.1l1.4 1"
        fill="none"
        strokeWidth={0.7}
        className="stroke-room-camera-label"
      />
      <path
        d="M6.5 11.2l3 2.2 3-2.2"
        fill="none"
        strokeWidth={0.9}
        className="stroke-room-camera-accent"
      />
    </>
  ),
  ok: (
    <text
      x={9.5}
      y={6.8}
      textAnchor="middle"
      fontSize={4.2}
      fontWeight={700}
      className="fill-room-camera-label font-sans"
    >
      MENU
      <tspan x={9.5} dy={4.6}>
        /OK
      </tspan>
    </text>
  ),
  back: (
    <text
      x={9.5}
      y={6.8}
      textAnchor="middle"
      fontSize={4.2}
      fontWeight={700}
      className="fill-room-camera-label font-sans"
    >
      DISP/
      <tspan x={9.5} dy={4.6}>
        BACK
      </tspan>
    </text>
  ),
};

/* ---------- The camera ---------- */

type Box = { left: number; top: number; width: number; height: number };
type Photo = {
  src: string;
  alt: string;
  id?: string; // a visitor's photo's name, to delete it by
  at?: number; // when a visitor left it
  mine: boolean; // one of mine, which stays
  yours: boolean; // left by whoever's looking
  waiting: boolean; // not approved yet, so only they see it
};
type Mode = "photos" | "live" | "taken" | "saving";

// Who this visitor is, kept in their browser so they can delete what they
// left, and its hash, as the server names their photos by
let sessionOwner: string | null = null;
function owner() {
  try {
    let token = localStorage.getItem(KEY);
    if (!token) {
      token = crypto.randomUUID();
      localStorage.setItem(KEY, token);
    }
    return token;
  } catch {
    sessionOwner ??= crypto.randomUUID();
    return sessionOwner;
  }
}
async function ownerHash() {
  try {
    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(owner()),
    );
    return [...new Uint8Array(digest)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 16);
  } catch {
    return null;
  }
}

export default function CameraOnShelf({
  version = 1,
  box,
  mine,
}: {
  version?: 1 | 2 | 3 | 4 | 5;
  /** Where it sits in the room, as percentages of the drawing. */
  box: { left: string; top: string; width: string; height: string };
  /** My photos, first. */
  mine: { src: string; alt: string }[];
}) {
  const shelfRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timers = useRef<{ note?: number; count?: number; slide?: number }>({});
  const isOpen = useRef(false);
  const slides = version >= 2; // it starts up and the shutter pulses
  const slidesOnShelf = version === 2; // it turns on before it comes out
  const lies = version >= 3; // it lies down, and stands up as it comes out
  const keeps = version >= 3; // the shutter keeps each photo, the trash deletes it
  const real = version >= 4; // traced closer to the photos

  const [open, setOpen] = useState(false); // drawn off the shelf
  // How far it's got: 0 on its spot on the shelf; 1 out, big, standing up;
  // 2 its cover slid open; 3 turned round to its back. Cameras 1 and 2 go
  // from 0 to 3 in one move.
  const [stage, setStage] = useState(0);
  const out = stage >= 1;
  const turned = stage >= 3;
  const standing = !lies || stage >= 1;
  const frontOpen = !lies || stage >= 2;
  const [rest, setRest] = useState<Box | null>(null);
  const [target, setTarget] = useState<Box | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [canLeave, setCanLeave] = useState(true);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("photos");
  const [streaming, setStreaming] = useState(false);
  const [shot, setShot] = useState<{ blob: Blob; url: string } | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [flash, setFlash] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [coverOpen, setCoverOpen] = useState(!slidesOnShelf); // on the shelf
  const [booting, setBooting] = useState(false);

  const say = (text: string) => {
    setNote(text);
    window.clearTimeout(timers.current.note);
    timers.current.note = window.setTimeout(() => setNote(null), 3500);
  };

  // Steps one after another, each after its wait in ms (none with reduced
  // motion). Starting new ones cancels any still to come.
  const queue = useRef<number[]>([]);
  const play = (steps: [number, () => void][]) => {
    queue.current.splice(0).forEach((id) => window.clearTimeout(id));
    let at = 0;
    for (const [wait, act] of steps) {
      at += reduced() ? 0 : wait;
      queue.current.push(window.setTimeout(act, at));
    }
  };

  // Its spot on the shelf, on screen, and where it comes out to: as big as
  // fits, up to MAX_WIDTH, in the middle of the window
  const measure = () => {
    const r = shelfRef.current?.getBoundingClientRect();
    if (!r) return null;
    const across = document.documentElement.clientWidth;
    const tall = ((window.innerHeight - ABOVE - BELOW - 32) * W) / H;
    const width = Math.min(MAX_WIDTH[version], across - 32, tall);
    const height = (width * H) / W;
    const top =
      Math.max(16, (window.innerHeight - ABOVE - height - BELOW) / 2) + ABOVE;
    return {
      rest: { left: r.left, top: r.top, width: r.width, height: r.height },
      target: { left: (across - width) / 2, top, width, height },
    };
  };

  const load = async () => {
    setLoading(true);
    const first = mine.map((p) => ({
      ...p,
      mine: true,
      yours: false,
      waiting: false,
    }));
    try {
      // Saying who's asking brings back their own photos still waiting
      const [res, hash] = await Promise.all([
        fetch("/api/camera", {
          cache: "no-store",
          headers: { "x-camera-owner": owner() },
        }),
        ownerHash(),
      ]);
      const data: {
        photos: {
          id: string;
          src: string;
          at: number;
          owner: string;
          waiting: boolean;
        }[];
        canLeave: boolean;
      } = await res.json();
      setCanLeave(data.canLeave);
      setPhotos([
        ...first,
        ...data.photos.map((p) => ({
          src: p.src,
          alt: `A photo someone left on ${new Date(p.at).toLocaleDateString()}`,
          id: p.id,
          at: p.at,
          mine: false,
          yours: p.owner === hash,
          waiting: p.waiting,
        })),
      ]);
    } catch {
      setPhotos(first);
      say("The photos people left didn't load.");
    }
    setLoading(false);
  };

  const stopLive = () => {
    window.clearTimeout(timers.current.count);
    setCount(null);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStreaming(false);
  };

  const openCamera = () => {
    const spots = measure();
    if (!spots) return;
    isOpen.current = true;
    setRest(spots.rest);
    setTarget(spots.target);
    setMode("photos");
    setIndex(0);
    setZoom(false);
    setStage(0);
    setOpen(true);
    load();
  };

  // Picked up: camera 2 slides its cover open first, turning on
  const pickUp = () => {
    if (!slidesOnShelf) return openCamera();
    if (coverOpen) return;
    setCoverOpen(true);
    timers.current.slide = window.setTimeout(openCamera, reduced() ? 0 : SLIDE);
  };

  const closeCamera = () => {
    isOpen.current = false;
    stopLive();
    if (shot) URL.revokeObjectURL(shot.url);
    setShot(null);
    const spots = measure();
    if (spots) setRest(spots.rest);
    setBooting(false);
    const steps: [number, () => void][] = [];
    let wait = 0;
    // Camera 3 turns back round, slides its cover closed, then lies down
    // again on its way back; the others just go back
    if (lies && stage >= 3) {
      steps.push([0, () => setStage(2)]);
      wait = DURATION;
    }
    if (lies && stage >= 2) {
      steps.push([wait, () => setStage(1)]);
      wait = SLIDE;
    }
    steps.push([wait, () => setStage(0)]);
    steps.push([
      DURATION,
      () => {
        setOpen(false);
        shelfRef.current?.focus();
      },
    ]);
    // Back on the shelf, camera 2 slides its cover closed
    if (slidesOnShelf) steps.push([60, () => setCoverOpen(false)]);
    play(steps);
  };

  // Drawn on its spot on the shelf first, then it comes out and turns:
  // cameras 1 and 2 in one move, camera 3 a step at a time
  useEffect(() => {
    if (!open || !isOpen.current) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        cardRef.current?.focus();
        if (!lies) {
          setStage(3);
          if (slides)
            play([
              [0, () => setBooting(true)],
              [DURATION + BOOT, () => setBooting(false)],
            ]);
          return;
        }
        play([
          [0, () => setStage(1)],
          [DURATION, () => setStage(2)],
          [
            SLIDE + 100,
            () => {
              setStage(3);
              setBooting(true);
            },
          ],
          [DURATION + BOOT, () => setBooting(false)],
        ]);
      });
    });
    return () => cancelAnimationFrame(frame);
    // play, lies and slides don't change while it's open
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Keys while it's out: Esc puts it back, the arrows go through photos
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCamera();
      if (mode !== "photos") return;
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Stop the camera if the page goes away with it on
  useEffect(() => {
    const t = timers.current;
    const q = queue.current;
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      window.clearTimeout(t.note);
      window.clearTimeout(t.count);
      window.clearTimeout(t.slide);
      q.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const showPhotos = () => {
    stopLive();
    setMode("photos");
  };

  const step = (by: number) => {
    if (mode !== "photos") showPhotos();
    if (!photos.length) return;
    setIndex((i) => (i + by + photos.length) % photos.length);
    setZoom(false);
    setConfirm(null);
  };

  const startLive = async () => {
    if (!canLeave) {
      say("Leaving photos isn't set up yet.");
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      say("This browser can't use a camera here.");
      return;
    }
    if (shot) URL.revokeObjectURL(shot.url);
    setShot(null);
    setMode("live");
    if (streamRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });
      // Put away while it was asking
      if (!isOpen.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStreaming(true);
    } catch (e) {
      setMode("photos");
      const name = e instanceof DOMException ? e.name : "";
      say(
        name === "NotAllowedError"
          ? "Your camera's blocked. Allow it in your browser to take a photo."
          : name === "NotFoundError" || name === "OverconstrainedError"
            ? "No camera found."
            : "The camera didn't turn on. Try again.",
      );
    }
  };

  // The picture, as the screen shows it: 4 by 3 from the middle, mirrored
  // like a selfie, up to 800 wide
  const capture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const { videoWidth: vw, videoHeight: vh } = video;
    const sw = Math.min(vw, (vh * 4) / 3);
    const sh = (sw * 3) / 4;
    const width = Math.min(800, Math.round(sw));
    const height = Math.round((width * 3) / 4);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(
      video,
      (vw - sw) / 2,
      (vh - sh) / 2,
      sw,
      sh,
      0,
      0,
      width,
      height,
    );
    setFlash((n) => n + 1);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const taken = { blob, url: URL.createObjectURL(blob) };
        stopLive();
        // Cameras 3 and 4 keep it straight away; the others ask first
        if (keeps) leave(taken);
        else {
          setShot(taken);
          setMode("taken");
        }
      },
      "image/jpeg",
      0.82,
    );
  };

  const selfTimer = () => {
    if (mode !== "live" || !streaming) {
      say("Press the shutter to turn the camera on first.");
      return;
    }
    if (count !== null) return;
    let n = 3;
    setCount(n);
    const tick = () => {
      n -= 1;
      if (n === 0) {
        setCount(null);
        capture();
      } else {
        setCount(n);
        timers.current.count = window.setTimeout(tick, 1000);
      }
    };
    timers.current.count = window.setTimeout(tick, 1000);
  };

  const leave = async (taken = shot) => {
    if (!taken) return;
    setShot(taken);
    setMode("saving");
    try {
      const res = await fetch("/api/camera", {
        method: "POST",
        headers: { "Content-Type": "image/jpeg", "x-camera-owner": owner() },
        body: taken.blob,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      URL.revokeObjectURL(taken.url);
      setShot(null);
      const next = [
        ...photos,
        {
          src: data.photo.src,
          alt: "The photo you left",
          id: data.photo.id,
          at: data.photo.at,
          mine: false,
          yours: true,
          waiting: true,
        },
      ];
      setPhotos(next);
      setIndex(next.length - 1);
      setMode("photos");
      say(
        keeps
          ? "Saved! Only you can see it until Erin approves it. The trash deletes it."
          : "Thanks! Only you can see it until Erin approves it.",
      );
    } catch (e) {
      setMode("taken");
      say(
        e instanceof Error && e.message
          ? e.message
          : "That didn't save. Try again.",
      );
    }
  };

  const remove = async () => {
    const photo = mode === "photos" ? photos[index] : undefined;
    if (!photo) return;
    if (photo.mine) return say("This one's Erin's. It stays.");
    if (!photo.yours || !photo.id)
      return say("Only whoever left a photo can delete it.");
    // Cameras 3 and 4 delete it at once; the others ask first
    if (!keeps && confirm !== photo.id) {
      setConfirm(photo.id);
      return say("Delete your photo? Press the trash again.");
    }
    const res = await fetch(`/api/camera?id=${encodeURIComponent(photo.id)}`, {
      method: "DELETE",
      headers: { "x-camera-owner": owner() },
    }).catch(() => null);
    if (!res?.ok) return say("It didn't delete. Try again.");
    const next = photos.filter((p) => p !== photo);
    setPhotos(next);
    setIndex((i) => Math.max(0, Math.min(i, next.length - 1)));
    setConfirm(null);
    say("Deleted.");
  };

  // What each button does, depending on what the screen's showing
  const shutter = () =>
    mode === "live" ? capture() : mode === "saving" ? undefined : startLive();
  const ok = () =>
    mode === "taken" ? leave() : mode === "live" ? capture() : startLive();
  const back = () =>
    mode === "taken"
      ? startLive()
      : mode === "live"
        ? showPhotos()
        : mode === "photos"
          ? closeCamera()
          : undefined;

  const photo = photos[index];
  const date = (ms: number) =>
    new Date(ms).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  const hints: [string, string] =
    mode === "live"
      ? ["Back: Photos", streaming ? "Shutter: Take it" : "Turning on"]
      : mode === "taken"
        ? ["Back: Retake", "OK: Leave it"]
        : mode === "saving"
          ? ["", "Saving"]
          : photos.length
            ? [
                keeps && photo?.yours ? "Trash: Delete" : "‹ › Browse",
                "Shutter: Take one",
              ]
            : ["", "Shutter: Take the first one"];

  const button = `absolute ${focusRing}`;
  const press =
    "transition-transform duration-100 active:scale-95 motion-reduce:transition-none";

  const t = target;
  const r = rest;
  const card =
    open && t && r
      ? createPortal(
          <>
            {/* Behind it: the page, faded, which puts it back when clicked */}
            <div
              aria-hidden="true"
              onClick={closeCamera}
              className={`fixed inset-0 z-50 bg-site-paper/80 transition-opacity duration-700 motion-reduce:transition-none ${out ? "opacity-100" : "opacity-0"}`}
            />
            <button
              type="button"
              onClick={closeCamera}
              className={`fixed z-50 font-mono text-label uppercase text-site-muted transition-opacity duration-700 hover:text-site-blue motion-reduce:transition-none ${focusRing} ${out ? "opacity-100" : "opacity-0"}`}
              style={{
                top: t.top - ABOVE + 8,
                right: document.documentElement.clientWidth - t.left - t.width,
              }}
            >
              Close
            </button>
            <div
              ref={cardRef}
              role="dialog"
              aria-modal="true"
              aria-label="My camera"
              tabIndex={-1}
              className="fixed z-50 origin-top-left outline-none transition-transform duration-700 ease-switch motion-reduce:transition-none"
              style={{
                left: t.left,
                top: t.top,
                width: t.width,
                height: t.height,
                perspective: `${t.width * 3}px`,
                transform: out
                  ? "none"
                  : `translate(${r.left - t.left}px, ${r.top + r.height - t.top - (t.height * r.width) / t.width}px) scale(${r.width / t.width})`,
              }}
            >
              <div
                className={`relative h-full w-full transition-transform duration-700 ease-switch [transform-style:preserve-3d] motion-reduce:transition-none ${turned ? "[transform:rotateY(-180deg)]" : ""}`}
              >
                <div
                  className={`absolute inset-0 [backface-visibility:hidden] ${turned ? "pointer-events-none" : ""}`}
                >
                  {lies ? (
                    <Posed
                      standing={standing}
                      closed={!frontOpen}
                      real={real}
                    />
                  ) : (
                    <CameraFront />
                  )}
                </div>

                <div
                  className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] ${turned ? "" : "pointer-events-none"}`}
                >
                  {real ? <RealBack /> : <CameraBack />}

                  {/* The screen */}
                  <div
                    className="absolute overflow-hidden bg-room-camera-glass font-mono text-label uppercase text-room-camera-label"
                    style={SCREEN}
                  >
                    {mode === "live" && (
                      <video
                        ref={(v) => {
                          videoRef.current = v;
                          if (
                            v &&
                            streamRef.current &&
                            v.srcObject !== streamRef.current
                          )
                            v.srcObject = streamRef.current;
                        }}
                        autoPlay
                        playsInline
                        muted
                        className="h-full w-full -scale-x-100 object-cover"
                      />
                    )}
                    {(mode === "taken" || mode === "saving") && shot && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={shot.url}
                        alt="The photo you just took"
                        className="h-full w-full object-cover"
                      />
                    )}
                    {mode === "photos" && photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={photo.src}
                        src={photo.src}
                        alt={photo.alt}
                        className={`h-full w-full object-contain transition-transform duration-300 motion-reduce:transition-none ${zoom ? "scale-150" : ""}`}
                      />
                    )}
                    {mode === "photos" && !photo && (
                      <p className="flex h-full items-center justify-center px-4 text-center">
                        {loading ? "Loading photos" : "No photos yet"}
                      </p>
                    )}

                    {/* What's on the screen, over it */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between bg-room-camera-glass/50 px-2 py-1">
                      <span>
                        {mode === "photos" && photos.length
                          ? `${index + 1}/${photos.length}`
                          : mode === "live"
                            ? "Camera"
                            : mode === "photos"
                              ? "Photos"
                              : "Taken"}
                      </span>
                      <span>
                        {mode === "photos" && photo
                          ? photo.mine
                            ? "Erin's"
                            : photo.yours
                              ? photo.waiting
                                ? "Waiting for Erin"
                                : "Yours"
                              : photo.at
                                ? date(photo.at)
                                : ""
                          : ""}
                      </span>
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between gap-2 bg-room-camera-glass/50 px-2 py-1">
                      <span className="hidden sm:inline">{hints[0]}</span>
                      <span className="ml-auto">{hints[1]}</span>
                    </div>
                    {count !== null && (
                      <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-section">
                        {count}
                      </p>
                    )}
                    {note && (
                      <p className="pointer-events-none absolute inset-x-3 top-1/2 -translate-y-1/2 bg-room-camera-glass/80 px-2 py-1 text-center normal-case">
                        {note}
                      </p>
                    )}
                    {real && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-room-frost/10 via-transparent to-transparent"
                      />
                    )}
                    {booting && (
                      <p className="absolute inset-0 flex items-center justify-center bg-room-camera-glass font-sans text-lead font-bold normal-case tracking-wide">
                        FUJIFILM
                      </p>
                    )}
                    {flash > 0 && (
                      <div
                        key={flash}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 animate-camera-flash bg-room-frost opacity-0 motion-reduce:animate-none"
                      />
                    )}
                  </div>

                  {/* The buttons */}
                  <button
                    type="button"
                    aria-label={
                      mode === "live" ? "Take the photo" : "Turn the camera on"
                    }
                    onClick={shutter}
                    className={`${button} ${press}`}
                    style={at(118, -7, 36, 12)}
                  >
                    <svg
                      viewBox="0 0 36 12"
                      aria-hidden="true"
                      className="block h-full w-full overflow-visible"
                    >
                      <rect
                        x={4}
                        y={4}
                        width={28}
                        height={5}
                        rx={2.5}
                        className="fill-room-camera-chrome"
                      />
                      <rect
                        x={7}
                        y={4.6}
                        width={22}
                        height={1}
                        rx={0.5}
                        className="fill-room-frost"
                      />
                      {/* Cameras 2 and 3's shutter pulses while it's what to
                          press, like the DJ deck's jack */}
                      {slides &&
                        turned &&
                        !booting &&
                        (mode === "photos" || mode === "live") && (
                          <ellipse
                            cx={18}
                            cy={6.5}
                            rx={16}
                            ry={4.5}
                            fill="none"
                            strokeWidth={1}
                            className="origin-center animate-ping stroke-room-dj-lit-amber [transform-box:fill-box] motion-reduce:animate-none"
                          />
                        )}
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Zoom out"
                    onClick={() => setZoom(false)}
                    className={`${button} font-sans text-room-camera-label`}
                    style={at(132, 17, 21, 12)}
                  >
                    <svg
                      viewBox="0 0 21 12"
                      aria-hidden="true"
                      className="block h-full w-full"
                    >
                      <text
                        x={10}
                        y={8.6}
                        textAnchor="middle"
                        fontSize={6.4}
                        fontWeight={700}
                        className="fill-room-camera-label"
                      >
                        W
                      </text>
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Zoom in"
                    onClick={() => mode === "photos" && photo && setZoom(true)}
                    className={button}
                    style={at(153, 17, 21, 12)}
                  >
                    <svg
                      viewBox="0 0 21 12"
                      aria-hidden="true"
                      className="block h-full w-full"
                    >
                      <text
                        x={11}
                        y={8.6}
                        textAnchor="middle"
                        fontSize={6.4}
                        fontWeight={700}
                        className="fill-room-camera-label"
                      >
                        T
                      </text>
                    </svg>
                  </button>
                  {(
                    [
                      [0, 0, "Delete your photo", ICONS.trash, remove],
                      [1, 0, "Photos", ICONS.play, showPhotos],
                      [0, 1, "Previous photo", ICONS.prev, () => step(-1)],
                      [1, 1, "Next photo", ICONS.next, () => step(1)],
                      [0, 2, "Self-timer", ICONS.timer, selfTimer],
                      [
                        1,
                        2,
                        mode === "taken" ? "Leave this photo" : "OK",
                        ICONS.ok,
                        ok,
                      ],
                      [0, 3, "Back", ICONS.back, back],
                    ] as const
                  ).map(([col, row, label, icon, onPress]) => (
                    <button
                      key={`${col}-${row}`}
                      type="button"
                      aria-label={label}
                      onClick={onPress}
                      className={`${button} ${press}`}
                      style={key(col, row)}
                    >
                      <svg
                        viewBox="0 0 19 15"
                        aria-hidden="true"
                        className="block h-full w-full"
                      >
                        <rect
                          width={19}
                          height={15}
                          rx={5}
                          className="fill-room-camera-key"
                        />
                        {real && (
                          <path
                            d="M4 1.3H15"
                            strokeWidth={0.6}
                            strokeLinecap="round"
                            className="stroke-room-frost/25"
                          />
                        )}
                        {icon}
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p
              className={`fixed z-50 text-caption text-site-muted transition-opacity duration-700 motion-reduce:transition-none ${out ? "opacity-100" : "opacity-0"}`}
              style={{
                top: t.top + t.height + 16,
                left: t.left,
                width: t.width,
              }}
            >
              Leave a photo for the next visitor or view some of my favorite
              shots and places
            </p>
          </>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={shelfRef}
        type="button"
        aria-haspopup="dialog"
        aria-label="My camera. Open it to take a photo or see the ones people left."
        onClick={pickUp}
        className={`absolute transition-transform duration-300 ease-switch hover:-translate-y-0.5 motion-reduce:transition-none ${focusRing} ${open ? "invisible" : ""}`}
        style={box}
      >
        {lies ? (
          <CameraLying real={real} />
        ) : (
          <CameraFront closed={!coverOpen} />
        )}
      </button>
      {card}
    </>
  );
}
