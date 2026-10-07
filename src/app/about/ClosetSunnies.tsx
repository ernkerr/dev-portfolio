"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { focusRing } from "@/components/site/links";
import { mottle } from "./closetArt";

// My sunnies, clipped by their bridges to the strap in my closet
// (Closet.tsx), each pair a button that lifts on hover, like the camera.
// Put a pair on and it comes off the strap, and the whole page takes on
// the color of its lenses, as if you're looking through them: my red ones
// red, the gold ovals a little darker, the tortoiseshell rectangles sepia,
// the red-orange tortoiseshell orange, the slim brown ovals a warm brown.
// One pair at a time: putting on another swaps them. Click the empty clip,
// or press Escape, to take them off. With reduced motion nothing lifts or
// fades.
//
// Each is drawn about (0, 0), 44 wide and 22 tall, in the closet's units,
// their arms folded behind and the light glinting off their lenses, which
// shade dark to light.
export type SunniesKind =
  | "red"
  | "gold-oval"
  | "rect-tortoise"
  | "orange"
  | "slim-brown";

const PAIRS: Record<SunniesKind, { name: string; tint: string }> = {
  red: { name: "red sunnies", tint: "bg-room-sunnies-tint/50" },
  "gold-oval": { name: "gold sunnies", tint: "bg-room-sunnies-tint-dark/45" },
  "rect-tortoise": {
    name: "tortoiseshell sunnies",
    tint: "bg-room-sunnies-tint-sepia/60",
  },
  orange: {
    name: "orange tortoiseshell sunnies",
    tint: "bg-room-sunnies-tint-orange/45",
  },
  "slim-brown": {
    name: "brown sunnies",
    tint: "bg-room-sunnies-tint-brown/50",
  },
};

const SLIM =
  "M3 -1.5C3 -4.5 8 -5.8 13 -5.6C17.5 -5.4 20.5 -4.4 20.5 -2C20.5 1.5 16 3.6 11 3.5C6 3.4 3 1.6 3 -1.5Z";
const RECT = { x: 1.6, y: -7, width: 19, height: 12.5, rx: 2.6 };
const RECT_LENS = { x: 4.2, y: -4.6, width: 13.8, height: 7.8, rx: 1.6 };
const BRIDGE = { x: -2.2, y: -5.8, width: 4.4, height: 3.2, rx: 0.8 };
const MOTTLE = mottle(9100, 70, [-22, -10, 44, 18]);
const ORANGE = { x: 1.2, y: -7.6, width: 19.6, height: 14.2, rx: 3.8 };
const ORANGE_LENS = { x: 4.6, y: -4.6, width: 12.8, height: 8.4, rx: 2.2 };
const ORANGE_BRIDGE = { x: -2.4, y: -6.4, width: 4.8, height: 4.8, rx: 1 };
const ORANGE_MOTTLE = mottle(9400, 80, [-22, -9, 44, 16]);

function Glint() {
  return (
    <>
      <path
        d="M7.5 2.5L13.5 -4.6H15.6L9.6 2.9Z"
        className="fill-room-frost/15"
      />
      <path
        d="M8 -3.4L12.4 -4.9"
        strokeWidth={0.9}
        strokeLinecap="round"
        className="stroke-room-frost/70"
      />
    </>
  );
}

// Each side's lens, mirrored for the left, with its glint
const both = (shape: React.ReactNode, glint = true) =>
  [-1, 1].map((s) => (
    <g key={s} transform={`scale(${s} 1)`}>
      {shape}
      {glint && <Glint />}
    </g>
  ));

function Pair({ kind, id }: { kind: SunniesKind; id: string }) {
  switch (kind) {
    // My red ones: small rectangles, the light along the frame's top and
    // its shadow under, and a silver hinge
    case "red":
      return (
        <>
          <path
            d="M-16.5 -4.5L13 -1.5M16.5 -4.5L-13 -1.5"
            strokeWidth={1.1}
            strokeLinecap="round"
            className="stroke-room-sunnies-red"
          />
          {both(
            <>
              <rect
                x={2.4}
                y={-5}
                width={13}
                height={7.4}
                rx={1.6}
                strokeWidth={1.8}
                fill={`url(#${id}-lens-red)`}
                fillOpacity={0.92}
                className="stroke-room-sunnies-red"
              />
              <path
                d="M3.6 -5.6H14.2"
                strokeWidth={0.6}
                strokeLinecap="round"
                className="stroke-room-sunnies-red-light"
              />
              <path
                d="M3.6 3H14.2"
                strokeWidth={0.7}
                strokeLinecap="round"
                className="stroke-room-sunnies-red-dark"
              />
              <rect
                x={15.2}
                y={-4.8}
                width={1.3}
                height={1}
                className="fill-room-mirror"
              />
            </>,
          )}
          <path
            d="M-2.6 -3.2Q0 -5.4 2.6 -3.2"
            fill="none"
            strokeWidth={1.6}
            strokeLinecap="round"
            className="stroke-room-sunnies-red"
          />
        </>
      );

    // Thin gold ovals: the gold block where each arm hinges, a nose pad,
    // and a double bridge
    case "gold-oval":
      return (
        <>
          <path
            d="M-19.5 -5.6L17 -2.2M19.5 -5.6L-17 -2.2"
            strokeWidth={0.8}
            strokeLinecap="round"
            className="stroke-room-gold"
          />
          {both(
            <>
              <ellipse
                cx={11.4}
                cy={-0.5}
                rx={8.6}
                ry={6}
                strokeWidth={0.9}
                fill={`url(#${id}-lens-black)`}
                fillOpacity={0.9}
                className="stroke-room-gold"
              />
              <path
                d="M4.4 -3.6Q11 -7.4 18.4 -3.6"
                fill="none"
                strokeWidth={0.4}
                className="stroke-room-gold-light"
              />
              <rect
                x={19.4}
                y={-3.4}
                width={2}
                height={3}
                rx={0.4}
                className="fill-room-gold"
              />
              <circle
                cx={2.8}
                cy={2.2}
                r={0.7}
                className="fill-room-frost/60"
              />
            </>,
          )}
          <path
            d="M-2.8 -3.6Q0 -5.2 2.8 -3.6M-2.8 -1.6Q0 -2.6 2.8 -1.6"
            fill="none"
            strokeWidth={0.8}
            className="stroke-room-gold"
          />
        </>
      );

    // Wide tortoiseshell rectangles, mottled through their frame's shape
    case "rect-tortoise":
      return (
        <>
          <path
            d="M-19.5 -5.6L17 -2.2M19.5 -5.6L-17 -2.2"
            strokeWidth={1.3}
            strokeLinecap="round"
            className="stroke-room-sunnies-tortoise"
          />
          {both(
            <rect {...RECT} className="fill-room-sunnies-tortoise" />,
            false,
          )}
          <rect {...BRIDGE} className="fill-room-sunnies-tortoise" />
          <g clipPath={`url(#${id}-rect)`}>
            <path d={MOTTLE.dark} className="fill-room-sunnies-tortoise-spot" />
            <path
              d={MOTTLE.light}
              className="fill-room-sunnies-tortoise-light"
            />
          </g>
          {both(
            <rect
              {...RECT_LENS}
              fill={`url(#${id}-lens-tortoise)`}
              fillOpacity={0.92}
            />,
          )}
        </>
      );

    // Chunky red-orange tortoiseshell rectangles with orange lenses
    case "orange":
      return (
        <>
          <path
            d="M-19.5 -5.6L17 -2.2M19.5 -5.6L-17 -2.2"
            strokeWidth={1.3}
            strokeLinecap="round"
            className="stroke-room-sunnies-orange-dark"
          />
          {both(
            <rect {...ORANGE} className="fill-room-sunnies-orange" />,
            false,
          )}
          <rect {...ORANGE_BRIDGE} className="fill-room-sunnies-orange" />
          <g clipPath={`url(#${id}-orange)`}>
            <path
              d={ORANGE_MOTTLE.dark}
              className="fill-room-sunnies-orange-dark/80"
            />
            <path
              d={ORANGE_MOTTLE.light}
              className="fill-room-sunnies-orange-light"
            />
          </g>
          {both(
            <>
              <path
                d="M4 -7H18"
                strokeWidth={0.6}
                strokeLinecap="round"
                className="stroke-room-frost/40"
              />
              <rect
                {...ORANGE_LENS}
                strokeWidth={0.5}
                fill={`url(#${id}-lens-orange)`}
                className="stroke-room-sunnies-orange-dark/60"
              />
            </>,
          )}
        </>
      );

    // Slim brown ovals
    case "slim-brown":
      return (
        <>
          <path
            d="M-19.5 -5.6L17 -2.2M19.5 -5.6L-17 -2.2"
            strokeWidth={1.3}
            strokeLinecap="round"
            className="stroke-room-sunnies-brown"
          />
          {both(
            <path
              d={SLIM}
              strokeWidth={1.6}
              fill={`url(#${id}-lens-brown)`}
              fillOpacity={0.92}
              className="stroke-room-sunnies-brown"
            />,
          )}
          <path
            d="M-3 -2.4Q0 -4.4 3 -2.4"
            fill="none"
            strokeWidth={1.3}
            strokeLinecap="round"
            className="stroke-room-sunnies-brown"
          />
        </>
      );
  }
}

// A lens gradient, dark at the top to lighter at the bottom
function Lens({
  id,
  top,
  bottom,
}: {
  id: string;
  top: string;
  bottom: string;
}) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="currentColor" className={top} />
      <stop offset="1" stopColor="currentColor" className={bottom} />
    </linearGradient>
  );
}

export default function ClosetSunnies({
  pairs,
}: {
  /** Each pair and where it hangs, as percentages of the closet. */
  pairs: {
    kind: SunniesKind;
    box: { left: string; top: string; width: string; height: string };
  }[];
}) {
  const [worn, setWorn] = useState<SunniesKind | null>(null);
  const [page, setPage] = useState<HTMLElement | null>(null);
  const id = `sunnies${useId().replace(/[^\w-]/g, "")}`;

  useEffect(() => setPage(document.body), []);
  useEffect(() => {
    if (!worn) return;
    const off = (e: KeyboardEvent) => e.key === "Escape" && setWorn(null);
    window.addEventListener("keydown", off);
    return () => window.removeEventListener("keydown", off);
  }, [worn]);

  return (
    <>
      {/* What every pair's drawn with: lens gradients, and the
          tortoiseshell frames' shapes to mottle through */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <Lens
            id={`${id}-lens-red`}
            top="text-room-sunnies-red-dark"
            bottom="text-room-sunnies-red-lens"
          />
          <Lens
            id={`${id}-lens-black`}
            top="text-room-sunnies-black"
            bottom="text-room-sunnies-lens"
          />
          <Lens
            id={`${id}-lens-tortoise`}
            top="text-room-sunnies-tortoise-spot"
            bottom="text-room-sunnies-tortoise-lens"
          />
          <Lens
            id={`${id}-lens-orange`}
            top="text-room-sunnies-orange"
            bottom="text-room-sunnies-orange-lens"
          />
          <Lens
            id={`${id}-lens-brown`}
            top="text-room-sunnies-brown-lens"
            bottom="text-room-sunnies-brown"
          />
          <clipPath id={`${id}-rect`}>
            <rect {...RECT} />
            <rect {...RECT} transform="scale(-1 1)" />
            <rect {...BRIDGE} />
          </clipPath>
          <clipPath id={`${id}-orange`}>
            <rect {...ORANGE} />
            <rect {...ORANGE} transform="scale(-1 1)" />
            <rect {...ORANGE_BRIDGE} />
          </clipPath>
        </defs>
      </svg>

      {pairs.map(({ kind, box }) => {
        const on = worn === kind;
        const { name } = PAIRS[kind];
        return (
          <button
            key={kind}
            type="button"
            aria-pressed={on}
            aria-label={`Wear my ${name}`}
            onClick={() => setWorn(on ? null : kind)}
            className={`absolute transition-transform duration-300 ease-switch hover:-translate-y-0.5 motion-reduce:transition-none ${focusRing}`}
            style={box}
          >
            <svg
              viewBox="-22 -11 44 22"
              aria-hidden="true"
              className="block h-full w-full overflow-visible"
            >
              {/* The clip on the strap, left behind when they're on */}
              <rect
                x={-2.6}
                y={-5.2}
                width={5.2}
                height={2.6}
                rx={0.8}
                className="fill-room-sunnies-tortoise/40"
              />
              <g
                className={`transition-opacity duration-300 motion-reduce:transition-none ${on ? "opacity-0" : ""}`}
              >
                <Pair kind={kind} id={id} />
              </g>
            </svg>
          </button>
        );
      })}

      {/* The page through each pair's lenses, faded in while it's on */}
      {page &&
        createPortal(
          pairs.map(({ kind }) => (
            <div
              key={kind}
              aria-hidden="true"
              className={`pointer-events-none fixed inset-0 z-50 mix-blend-multiply transition-opacity duration-500 motion-reduce:transition-none ${PAIRS[kind].tint} ${
                worn === kind ? "opacity-100" : "opacity-0"
              }`}
            />
          )),
          page,
        )}
    </>
  );
}
