"use client";

import { Gruppo } from "next/font/google";
import { useState } from "react";
import { LuClock, LuMapPin, LuPencil, LuSparkle, LuUser } from "react-icons/lu";
import LivePhone from "@/components/site/LivePhone";
import { focusRing } from "@/components/site/links";
import { label } from "@/components/site/prose";

// Carpoolio's trip screen from the iOS app (July 2025, carpoolio-mobile
// 10ab57d), rebuilt around the thing that made it work: the car is the
// sign-up sheet. Tap an open seat to fill it, tap a filled one to free it,
// and the badge counts down to "Full" the way the app's did.
//
// Simplified on purpose: the app's animated backgrounds were GIFs, so this
// uses a gradient in their colors; its car drawings were third-party
// illustrations, so this car is a plain shape drawn for this page; and its
// Neuropol and Britanica fonts give way to Gruppo, Carpoolio's web font.
// The glass recipe, seat grid rule (2 in front, then rows of 3) and badge
// states are the app's own.

const gruppo = Gruppo({ weight: "400", subsets: ["latin"], display: "swap" });

const DRIVER = "Sam";
const RIDERS = ["You", "Alex", "Jordan", "Riley"];
const ROWS = [2, 3];

const glass = "border border-white/15 bg-white/15 backdrop-blur-md text-white";

export default function LiveCar() {
  // Row 1 seat 1 is the driver; null means the seat is open.
  const [seats, setSeats] = useState<(string | null)[]>([
    DRIVER,
    null,
    "Alex",
    null,
    null,
  ]);

  const total = seats.length;
  const open = seats.filter((s) => s === null).length;
  const full = open === 0;

  function tap(i: number) {
    if (i === 0) return;
    setSeats((current) => {
      const next = [...current];
      if (next[i]) {
        next[i] = null;
      } else {
        const name = RIDERS.find((r) => !next.includes(r));
        if (name) next[i] = name;
      }
      return next;
    });
  }

  let index = 0;
  const rows = ROWS.map((count) =>
    Array.from({ length: count }, () => index++),
  );

  return (
    <div className="bg-[#061423] px-6 py-8 md:py-10">
      <p className={`${label} mb-3 text-center text-white/70`}>
        Tap a seat to fill it
      </p>
      <div className="mx-auto max-w-64">
        <LivePhone
          view={{ w: 390, h: 800 }}
          screen="radial-gradient(90% 60% at 15% 5%, #1e40af 0%, transparent 60%), radial-gradient(90% 70% at 95% 55%, #0f766e 0%, transparent 65%), radial-gradient(80% 60% at 10% 100%, #155e75 0%, transparent 60%), #061423"
          className={`${gruppo.className} text-white`}
        >
          <div className="flex h-full flex-col gap-3 px-5 pt-14">
            <div className={`${glass} rounded-md p-3 text-center`}>
              <p className="text-3xl tracking-wide">Annual Lake Trip</p>
              <p className="text-lg text-white/80">
                South Lake Tahoe · Thursday, Jul 3
              </p>
            </div>
            <p className="mt-1 text-2xl">Cars</p>
            <div
              className={`${glass} flex items-center justify-between rounded-md p-4`}
            >
              <div>
                <p className="text-2xl">Car 1</p>
                <p className="flex items-center gap-2 text-lg">
                  <LuClock aria-hidden="true" className="h-3.5 w-3.5" />
                  July 3 at 10:00 AM
                </p>
                <p className="flex items-center gap-2 text-lg">
                  <LuMapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  San Francisco
                </p>
              </div>
              <span
                className={`${glass} flex h-8 w-8 items-center justify-center rounded`}
              >
                <LuPencil aria-hidden="true" className="h-4 w-4" />
              </span>
            </div>
            <p
              aria-live="polite"
              className={`self-start rounded-full border px-4 py-1 text-xl font-bold backdrop-blur-md ${
                full
                  ? "border-red-400 bg-red-600/40 text-[#ff4444]"
                  : "border-white bg-white/20 text-white"
              }`}
            >
              {full ? "Full" : `${open}/${total} seats left`}
            </p>
            <div className="relative mx-auto mt-1 w-60">
              <CarShape />
              <div className="absolute inset-x-0 top-[33%] flex flex-col items-center gap-1.5">
                {rows.map((row, r) => (
                  <div key={r} className="flex gap-1.5">
                    {row.map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => tap(i)}
                        disabled={i === 0}
                        aria-label={
                          i === 0
                            ? `Driver: ${DRIVER}`
                            : seats[i]
                              ? `${seats[i]}'s seat. Tap to free it`
                              : "Open seat. Tap to fill it"
                        }
                        className={`flex h-16 w-[66px] flex-col items-center justify-center gap-0.5 rounded border border-white/30 bg-white/35 text-sm font-semibold backdrop-blur-sm transition-colors enabled:hover:bg-white/50 ${focusRing}`}
                      >
                        {seats[i] ? (
                          <>
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#34bd34] text-xs text-white">
                              {seats[i]?.[0]}
                            </span>
                            {seats[i]}
                          </>
                        ) : (
                          "Available"
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className={`${glass} absolute inset-x-5 bottom-6 flex h-16 items-center justify-center gap-16 rounded-full text-lg`}
          >
            <span className="flex flex-col items-center">
              <LuPencil className="h-5 w-5" />
              Edit
            </span>
            <LuSparkle className="h-5 w-5" />
            <span className="flex flex-col items-center">
              <LuUser className="h-5 w-5" />
              Invite
            </span>
          </div>
        </LivePhone>
      </div>
    </div>
  );
}

/** A plain top-down car, drawn for this page. */
function CarShape() {
  return (
    <svg
      viewBox="0 0 300 470"
      aria-hidden="true"
      className="block h-auto w-full drop-shadow-2xl"
    >
      <defs>
        <linearGradient id="carpoolio-body" x1="0" x2="1">
          <stop offset="0" stopColor="#4b5563" />
          <stop offset="0.5" stopColor="#6b7280" />
          <stop offset="1" stopColor="#4b5563" />
        </linearGradient>
      </defs>
      <rect
        x="40"
        y="6"
        width="220"
        height="458"
        rx="70"
        fill="url(#carpoolio-body)"
      />
      <rect x="22" y="110" width="22" height="46" rx="8" fill="#374151" />
      <rect x="256" y="110" width="22" height="46" rx="8" fill="#374151" />
      <path
        d="M70 120 Q150 92 230 120 L222 158 Q150 142 78 158 Z"
        fill="#1f2937"
      />
      <rect
        x="62"
        y="150"
        width="176"
        height="270"
        rx="26"
        fill="#9ca3af"
        opacity="0.35"
      />
      <path
        d="M82 432 Q150 446 218 432 L212 410 Q150 420 88 410 Z"
        fill="#1f2937"
      />
      <rect
        x="62"
        y="14"
        width="44"
        height="12"
        rx="6"
        fill="#e5e7eb"
        opacity="0.8"
      />
      <rect
        x="194"
        y="14"
        width="44"
        height="12"
        rx="6"
        fill="#e5e7eb"
        opacity="0.8"
      />
      <rect x="62" y="448" width="40" height="10" rx="5" fill="#ef4444" />
      <rect x="198" y="448" width="40" height="10" rx="5" fill="#ef4444" />
    </svg>
  );
}
