"use client";

import { Space_Mono } from "next/font/google";
import { useState, type CSSProperties, type ReactNode } from "react";
import { LuCrown, LuMoon, LuPencil, LuSpade, LuTrash2 } from "react-icons/lu";
import LivePhone from "@/components/site/LivePhone";
import { focusRing } from "@/components/site/links";

// Hearts Score Tracker's scoreboard and round entry, rebuilt from the app's
// code (hearts 4a43da4, MultiPlayerScoreModal.tsx and gameLogic.ts) with its
// own styles: 2px black borders, hard black shadows, #26ABFF buttons, a
// #FFD700 crown on the lowest total and the yellow WINNER card. The rules
// are the app's: the Queen of Spades adds 13, shooting the moon gives the
// shooter 0 and everyone else 26, the game ends when anyone reaches 100,
// and the lowest total wins. The app sets its headings in a playing-card
// display font; this rebuild uses Space Mono, its body font, throughout.

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const BLUE = "#26ABFF";
const shadow = (n: number): CSSProperties => ({
  boxShadow: `${n}px ${n}px 0px #000`,
});
const TARGET = 100;
const QUEEN = 13;
const MOON = 26;

const PLAYERS = [
  { id: "you", name: "You", color: "#41ead4" },
  { id: "maya", name: "Maya", color: "#ffbe0b" },
  { id: "dev", name: "Dev", color: "#ff9100" },
  { id: "jo", name: "Jo", color: "#affc41" },
] as const;
type Id = (typeof PLAYERS)[number]["id"];
type Scores = Record<Id, number>;

// 7 hands so far, each worth 26 (or a moon), so the next moon ends it.
const START: Scores[] = [
  { you: 4, maya: 16, dev: 2, jo: 4 },
  { you: 13, maya: 5, dev: 3, jo: 5 },
  { you: 0, maya: 26, dev: 26, jo: 26 },
  { you: 9, maya: 2, dev: 14, jo: 1 },
  { you: 3, maya: 7, dev: 3, jo: 13 },
  { you: 1, maya: 17, dev: 4, jo: 4 },
  { you: 2, maya: 9, dev: 14, jo: 1 },
];

const empty = (): Record<Id, string> => ({
  you: "",
  maya: "",
  dev: "",
  jo: "",
});

function Avatar({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center rounded-full border-2 border-black font-bold"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.42,
        ...shadow(2),
      }}
    >
      {name[0]}
    </span>
  );
}

export default function LiveTable() {
  const [rounds, setRounds] = useState<Scores[]>(START);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Id>("you");
  const [typed, setTyped] = useState(empty);
  const [queen, setQueen] = useState<Id | null>(null);
  const [moon, setMoon] = useState<Id | null>(null);

  const totals = Object.fromEntries(
    PLAYERS.map((p) => [p.id, rounds.reduce((s, r) => s + r[p.id], 0)]),
  ) as Scores;
  const lowest = Math.min(...PLAYERS.map((p) => totals[p.id]));
  const done = PLAYERS.some((p) => totals[p.id] >= TARGET);
  // Like the app, the first player in order with the lowest total wins.
  const winner = PLAYERS.find((p) => totals[p.id] === lowest)!;

  // What each player scores this hand, the way the modal shows it.
  function handScore(id: Id) {
    if (moon) return id === moon ? 0 : MOON;
    return (Number(typed[id]) || 0) + (queen === id ? QUEEN : 0);
  }

  function startRound() {
    setSelected("you");
    setTyped(empty());
    setQueen(null);
    setMoon(null);
    setOpen(true);
  }

  function save() {
    const round = Object.fromEntries(
      PLAYERS.map((p) => [p.id, handScore(p.id)]),
    ) as Scores;
    setRounds((r) => [...r, round]);
    setOpen(false);
  }

  const toggle = `flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black ${focusRing}`;

  return (
    <div className="bg-[#F4C6B8] px-6 py-8 md:py-10">
      <p className="mb-3 text-center font-mono text-label uppercase text-site-ink/75">
        Tap Add Round, then ☾ to shoot the moon
      </p>
      <div className="mx-auto max-w-64">
        <LivePhone
          view={{ w: 390, h: 844 }}
          screen="#F3F4F6"
          device
          className={`${spaceMono.className} text-black`}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-300 bg-white px-4">
              <p className="text-lg font-bold uppercase">Scoreboard</p>
              <LuTrash2
                aria-hidden="true"
                className="h-5 w-5"
                color="#dc2626"
              />
            </div>

            <div className="grid shrink-0 grid-cols-[30px_repeat(4,1fr)_30px] px-2 pt-4">
              <span />
              {PLAYERS.map((p) => (
                <div key={p.id} className="flex flex-col items-center">
                  <span className="flex h-6 items-center">
                    {totals[p.id] === lowest && (
                      <LuCrown
                        aria-label="Lowest score"
                        className="h-6 w-6"
                        color="#FFD700"
                      />
                    )}
                  </span>
                  <Avatar name={p.name} color={p.color} size={56} />
                  <p className="mt-1 text-base">{p.name}</p>
                  <p className="text-xl font-bold" aria-live="polite">
                    {totals[p.id]}
                  </p>
                </div>
              ))}
              <span />
            </div>

            {done && (
              <div
                className="mx-6 mt-4 shrink-0 border-4 border-black bg-[#FDE047] p-5 text-center"
                style={shadow(8)}
              >
                <p
                  className="border-4 border-black bg-black py-2 text-3xl font-bold text-[#fef08a]"
                  style={{ boxShadow: "4px 4px 0px #fff" }}
                >
                  WINNER
                </p>
                <p className="mt-3 text-2xl font-bold uppercase">
                  {winner.name}
                </p>
              </div>
            )}

            <p className="mt-4 px-4 text-lg font-bold">Round</p>
            <ol className="mt-1 min-h-0 flex-1 overflow-y-auto px-2 text-sm">
              {rounds.map((r, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[30px_repeat(4,1fr)_30px] items-center py-2.5 text-center text-[#4B5563]"
                >
                  <span className="text-[#6B7280]">{i + 1}</span>
                  {PLAYERS.map((p) => (
                    <span key={p.id}>{r[p.id]}</span>
                  ))}
                  <LuPencil
                    aria-hidden="true"
                    className="h-4 w-4 justify-self-center text-[#9CA3AF]"
                  />
                </li>
              ))}
            </ol>

            {!done && (
              <div className="shrink-0 px-6 pb-8 pt-3">
                <button
                  type="button"
                  onClick={startRound}
                  className={`h-16 w-full rounded-xl border-2 border-black text-lg font-bold uppercase text-white ${focusRing}`}
                  style={{ ...shadow(4), background: BLUE }}
                >
                  Add Round
                </button>
              </div>
            )}
          </div>

          {open && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
              <div
                role="dialog"
                aria-label="New Round"
                className="w-[90%] rounded-lg bg-white p-5"
              >
                <p className="text-2xl font-bold uppercase">New Round</p>
                <div
                  className="mt-3 rounded-2xl border-2 border-black bg-white p-4"
                  style={shadow(4)}
                >
                  <p className="mb-3 text-lg font-bold uppercase">
                    Enter Scores
                  </p>
                  {PLAYERS.map((p) => {
                    const isSel = selected === p.id;
                    return (
                      <div
                        key={p.id}
                        className={`mb-3 flex items-center gap-2 rounded-xl border-2 border-black p-3 ${
                          isSel ? "bg-[#dbeafe]" : "bg-white"
                        }`}
                        style={isSel ? shadow(3) : undefined}
                      >
                        <button
                          type="button"
                          onClick={() => setSelected(p.id)}
                          aria-label={`Enter ${p.name}’s score`}
                          className={`flex min-w-0 flex-1 items-center gap-2 text-left ${focusRing}`}
                        >
                          <Avatar
                            name={p.name}
                            color={isSel ? p.color : "#ffffff"}
                            size={36}
                          />
                          <span className="truncate text-base">
                            {isSel ? p.name[0] : p.name}
                          </span>
                          {!isSel && (
                            <span className="ml-auto flex items-center gap-1">
                              {queen === p.id && (
                                <span className="flex h-6 w-6 items-center justify-center rounded bg-[#e5e7eb]">
                                  <LuSpade className="h-4 w-4" fill="#484848" />
                                </span>
                              )}
                              {moon === p.id && (
                                <span className="flex h-6 w-6 items-center justify-center rounded bg-[#fef3c7]">
                                  <LuMoon className="h-4 w-4" fill="#fbbf24" />
                                </span>
                              )}
                              <span className="min-w-10 text-right text-lg text-[#666]">
                                {handScore(p.id)}
                              </span>
                            </span>
                          )}
                        </button>
                        {isSel && (
                          <>
                            <input
                              inputMode="numeric"
                              aria-label={`${p.name}’s points`}
                              // Like the app, the box shows the hand's points
                              // with the Queen's 13 already added.
                              value={
                                moon || queen === p.id
                                  ? String(handScore(p.id))
                                  : typed[p.id]
                              }
                              placeholder="0"
                              disabled={!!moon}
                              onChange={(e) => {
                                const n = e.target.value
                                  .replace(/[^0-9]/g, "")
                                  .slice(0, 2);
                                const base =
                                  queen === p.id && n !== ""
                                    ? String(Math.max(Number(n) - QUEEN, 0))
                                    : n;
                                setTyped((t) => ({ ...t, [p.id]: base }));
                              }}
                              className={`h-10 w-16 rounded-xl border-2 border-black bg-gray-50 text-center text-lg ${focusRing}`}
                              style={shadow(2)}
                            />
                            <button
                              type="button"
                              aria-label="Queen of Spades"
                              aria-pressed={queen === p.id}
                              onClick={() =>
                                setQueen(queen === p.id ? null : p.id)
                              }
                              className={`${toggle} ${
                                queen === p.id ? "bg-[#e5e7eb]" : "bg-white"
                              }`}
                              style={shadow(2)}
                            >
                              <LuSpade
                                className="h-5 w-5"
                                fill={queen === p.id ? "#484848" : "none"}
                              />
                            </button>
                            <button
                              type="button"
                              aria-label="Shoot the moon"
                              aria-pressed={moon === p.id}
                              onClick={() =>
                                setMoon(moon === p.id ? null : p.id)
                              }
                              className={`${toggle} ${
                                moon === p.id ? "bg-[#fef3c7]" : "bg-white"
                              }`}
                              style={shadow(2)}
                            >
                              <LuMoon
                                className="h-5 w-5"
                                fill={moon === p.id ? "#fbbf24" : "none"}
                              />
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 flex gap-3">
                  <ModalButton onClick={() => setOpen(false)}>
                    Cancel
                  </ModalButton>
                  <ModalButton primary onClick={save}>
                    Save
                  </ModalButton>
                </div>
              </div>
            </div>
          )}
        </LivePhone>
        <p className="mt-3 text-center">
          <button
            type="button"
            onClick={() => {
              setRounds(START);
              setOpen(false);
            }}
            className={`font-mono text-label uppercase text-site-ink/75 transition-colors hover:text-site-blue ${focusRing}`}
          >
            Reset the game
          </button>
        </p>
      </div>
    </div>
  );
}

function ModalButton({
  primary = false,
  onClick,
  children,
}: {
  primary?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 flex-1 rounded-md border-2 border-black text-lg font-bold uppercase ${
        primary ? "text-white" : "bg-white text-black"
      } ${focusRing}`}
      style={{ ...shadow(4), ...(primary ? { background: BLUE } : {}) }}
    >
      {children}
    </button>
  );
}
