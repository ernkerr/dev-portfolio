"use client";

import { Space_Mono } from "next/font/google";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  LuCrown,
  LuGlassWater,
  LuMartini,
  LuPencil,
  LuScissors,
  LuSettings,
  LuSparkle,
} from "react-icons/lu";
import LivePhone from "@/components/site/LivePhone";
import { focusRing } from "@/components/site/links";

// Gin Score Tracker's game screen and New Score modal, rebuilt from the app's
// code (gin-score-tracker df39a1d for version 1.0, a7a0f82 for today) with
// its own neo-brutalist styles: #26ABFF, 2px black borders and hard
// 4px 4px 0 #000 shadows, Space Mono for titles and the system font on
// buttons. The game starts where the app's own screenshots do, You 87 and
// James 49, so the next good hand ends it.
//
// "1.0" keeps version 1.0's free-tier rule: a round that takes either total
// past 100 opens the paywall instead of saving, which usually blocked the
// winning hand. "now" has the fix from 1.0.5: scoring is never blocked, and
// the upsell waits until after the win.

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const BLUE = "#26ABFF";
const hard: CSSProperties = { boxShadow: "4px 4px 0px #000" };
const system: CSSProperties = {
  fontFamily:
    'system-ui, -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif',
};

type Bonus = "gin" | "bigGin" | "undercut" | null;
type Round = { you: number; james: number; bonus: Bonus };

const BONUS_POINTS = { gin: 25, bigGin: 31, undercut: 25 } as const;
const TARGET = 100;

const START: Round[] = [
  { you: 28, james: 0, bonus: "gin" },
  { you: 0, james: 12, bonus: null },
  { you: 0, james: 28, bonus: "undercut" },
  { you: 19, james: 0, bonus: null },
  { you: 0, james: 9, bonus: null },
  { you: 40, james: 0, bonus: "bigGin" },
];

function RoundIcon({ bonus }: { bonus: Bonus }) {
  const props = { className: "h-[18px] w-[18px]", color: BLUE };
  if (bonus === "gin") return <LuMartini {...props} aria-label="Gin" />;
  if (bonus === "bigGin") return <LuSparkle {...props} aria-label="Big Gin" />;
  if (bonus === "undercut")
    return <LuScissors {...props} aria-label="Undercut" />;
  return <span className="h-[18px] w-[18px]" />;
}

function Button({
  primary = false,
  className = "",
  onClick,
  children,
}: {
  primary?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center rounded-md border-2 border-black font-semibold ${
        primary ? "text-white" : "bg-white text-black"
      } ${focusRing} ${className}`}
      style={{ ...hard, ...(primary ? { background: BLUE } : {}) }}
    >
      {children}
    </button>
  );
}

export default function LiveBoard({
  version,
  label,
}: {
  version: "1.0" | "now";
  /** Shown above the phone. */
  label: string;
}) {
  const [rounds, setRounds] = useState<Round[]>(START);
  const [open, setOpen] = useState(false);
  const [winner, setWinner] = useState<"you" | "james" | null>(null);
  const [score, setScore] = useState("9");
  const [bonus, setBonus] = useState<Bonus>(null);
  const [error, setError] = useState("");
  const [paywall, setPaywall] = useState<null | "blocked" | "upsell">(null);
  const list = useRef<HTMLOListElement>(null);

  // Like the app's list, the newest round is at the bottom; keep it in view.
  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [rounds.length]);

  const you = rounds.reduce((sum, r) => sum + r.you, 0);
  const james = rounds.reduce((sum, r) => sum + r.james, 0);
  const done = you >= TARGET || james >= TARGET;
  const bonusPoints = bonus ? BONUS_POINTS[bonus] : 0;
  const total = (Number(score) || 0) + bonusPoints;

  function startScore() {
    setWinner(null);
    setScore("9");
    setBonus(null);
    setError("");
    setOpen(true);
  }

  function save() {
    if (!winner) {
      setError("Please select a winner before saving.");
      return;
    }
    const round: Round = {
      you: winner === "you" ? total : 0,
      james: winner === "james" ? total : 0,
      bonus,
    };
    // Version 1.0's canAddScore(): free users couldn't save a round that
    // took either total past 100.
    if (
      version === "1.0" &&
      (you + round.you > TARGET || james + round.james > TARGET)
    ) {
      setOpen(false);
      setPaywall("blocked");
      return;
    }
    setRounds((r) => [...r, round]);
    setOpen(false);
  }

  function reset() {
    setRounds(START);
    setOpen(false);
    setPaywall(null);
  }

  const leader = you === james ? null : you > james ? "you" : "james";

  return (
    <div>
      <p className="mb-3 text-center font-mono text-label uppercase text-site-muted">
        {label}
      </p>
      <LivePhone
        view={{ w: 390, h: 844 }}
        className={`${spaceMono.className} text-black`}
        device
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 px-4">
            <p className="text-base font-bold">You vs James</p>
            {version === "now" && (
              <LuSettings aria-hidden="true" className="h-6 w-6" />
            )}
          </div>

          <div className="flex flex-1 flex-col overflow-hidden px-4 pt-6">
            <div className="flex justify-center gap-20">
              {(
                [
                  ["you", "You", you],
                  ["james", "James", james],
                ] as const
              ).map(([key, name, points]) => (
                <div key={key} className="flex flex-col items-center">
                  <span className="flex h-6 items-center">
                    {leader === key && (
                      <LuCrown aria-label="Leading" className="h-6 w-6" />
                    )}
                  </span>
                  <p className="text-lg">{name}</p>
                  <p className="text-3xl font-bold" aria-live="polite">
                    {points}
                  </p>
                </div>
              ))}
            </div>

            {done && (
              <p
                className="mt-4 rounded-lg bg-[#DCFCE7] p-4 text-center text-lg font-semibold"
                style={system}
              >
                Game Complete! {you >= TARGET ? "You" : "James"} won!
              </p>
            )}
            {done && version === "now" && (
              <Button
                className="mt-4 h-16 w-full px-4 text-left text-lg font-normal"
                onClick={() => setPaywall("upsell")}
              >
                Keep playing past 100? (Premium)
              </Button>
            )}
            <Button className="mt-4 h-16 w-full shrink-0 text-xl font-normal">
              Knock: 7
            </Button>

            <p className="mb-2 mt-6 text-lg" style={system}>
              Rounds
            </p>
            <ol
              ref={list}
              className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pb-2 text-sm"
            >
              {rounds
                .map((r, i) => ({ r, n: i + 1 }))
                .map(({ r, n }) => (
                  <li
                    key={n}
                    className="grid shrink-0 grid-cols-[1fr_2fr_1fr_2fr_1fr] items-center rounded-lg bg-[#F3F4F6] p-4 text-center"
                  >
                    <span className="text-[#6B7280]">{n}</span>
                    <span className="text-[#4B5563]">{r.you}</span>
                    <span className="flex justify-center">
                      <RoundIcon bonus={r.bonus} />
                    </span>
                    <span className="text-[#4B5563]">{r.james}</span>
                    <span className="flex justify-center text-[#6B7280]">
                      <LuPencil
                        aria-hidden="true"
                        className="h-[18px] w-[18px]"
                      />
                    </span>
                  </li>
                ))}
            </ol>
          </div>

          {!done && (
            <div className="shrink-0 bg-white px-4 pb-8 pt-3">
              <Button
                primary
                className="h-16 w-full text-xl"
                onClick={startScore}
              >
                <span style={system}>Add Score</span>
              </Button>
            </div>
          )}
        </div>

        {open && (
          <Overlay>
            <div
              role="dialog"
              aria-label="New Score"
              className="w-[95%] rounded-lg bg-white p-4"
            >
              <p className="text-center text-xl font-bold">New Score</p>
              <p className="mt-3">Winner</p>
              <div className="mt-1 flex gap-2">
                {(
                  [
                    ["you", "You"],
                    ["james", "James"],
                  ] as const
                ).map(([key, name]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={winner === key}
                    onClick={() => setWinner(key)}
                    className={`h-11 flex-1 rounded-md border-2 border-black text-sm ${focusRing} ${
                      winner === key ? "text-white" : "bg-white"
                    }`}
                    style={winner === key ? { ...hard, background: BLUE } : {}}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <label className="mt-3 block">
                Score
                <input
                  inputMode="numeric"
                  value={score}
                  onChange={(e) =>
                    setScore(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))
                  }
                  className={`mt-1 block h-12 w-full rounded-sm border-2 border-black px-3 text-lg ${focusRing}`}
                />
              </label>
              <p className="mt-3">Bonus</p>
              <div className="mt-1 flex gap-2">
                {(
                  [
                    ["gin", "Gin", LuMartini],
                    ["bigGin", "Big Gin", LuGlassWater],
                    ["undercut", "Undercut", LuScissors],
                  ] as const
                ).map(([key, name, Icon]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={bonus === key}
                    onClick={() => setBonus(bonus === key ? null : key)}
                    className={`flex h-11 flex-1 items-center justify-center gap-1 rounded-md border-2 bg-white text-sm ${focusRing} ${
                      bonus === key ? "" : "border-black"
                    }`}
                    style={bonus === key ? { ...hard, borderColor: BLUE } : {}}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5"
                      color={bonus === key ? BLUE : "#000"}
                    />
                    {name}
                  </button>
                ))}
              </div>
              {bonus && (
                <>
                  <p className="mt-3" style={{ color: BLUE }}>
                    Bonus: +{bonusPoints}
                  </p>
                  <p className="mt-2">Total Score</p>
                  <p className="mt-1 h-10 rounded-sm border-2 border-black px-3 text-lg leading-9">
                    {total}
                  </p>
                </>
              )}
              {error && (
                <p className="mt-3 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
              <div className="mt-5 flex gap-3" style={system}>
                <Button
                  className="h-12 flex-1 text-lg"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button primary className="h-12 flex-1 text-lg" onClick={save}>
                  Save
                </Button>
              </div>
            </div>
          </Overlay>
        )}

        {paywall && (
          <Overlay>
            <div
              role="dialog"
              aria-label="Upgrade Required"
              className={`rounded-lg bg-white p-6 ${
                paywall === "blocked" ? "w-[80%]" : "w-[85%]"
              }`}
            >
              <p className="text-center text-xl font-bold">Upgrade Required</p>
              <p className="mt-3 text-sm leading-6">
                {paywall === "blocked"
                  ? "You can only play up to 100 points for free. Pay to unlock unlimited points!"
                  : "Free games go up to 100 points. Subscribe to raise the target and keep playing."}
              </p>
              <div className="mt-5 flex flex-col gap-3" style={system}>
                <Button primary className="h-11 w-full">
                  {paywall === "blocked" ? "Buy" : "Subscribe - $3.99/year"}
                </Button>
                <Button
                  className="h-11 w-full"
                  onClick={() => setPaywall(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Overlay>
        )}
      </LivePhone>
      <p className="mt-3 text-center">
        <button
          type="button"
          onClick={reset}
          className={`font-mono text-label uppercase text-site-muted transition-colors hover:text-site-blue ${focusRing}`}
        >
          Reset the game
        </button>
      </p>
    </div>
  );
}

function Overlay({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
      {children}
    </div>
  );
}
