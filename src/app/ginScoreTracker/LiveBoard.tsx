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
  LuChevronLeft,
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
//
// Both versions let you set the knock value (KnockModal). "now" also has the
// gear, added in February 2026, which opens Game Options (game/[id]/options):
// the target and bonus values for this game. As in the app, a target over
// 100 opens the paywall and a changed bonus asks whether to update old rounds.

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
type Rules = { target: number; gin: number; bigGin: number; undercut: number };
type Draft = Record<keyof Rules, string>;

// The app's defaults (mmkvStorage.ts) and free limit (maxFreeTargetScore).
const RULES: Rules = { target: 100, gin: 25, bigGin: 31, undercut: 25 };
const FREE_TARGET = 100;
const KNOCK = 7;

const PAYWALL = {
  blocked: {
    text: "You can only play up to 100 points for free. Pay to unlock unlimited points!",
    buy: "Buy",
  },
  upsell: {
    text: "Free games go up to 100 points. Subscribe to raise the target and keep playing.",
    buy: "Subscribe - $3.99/year",
  },
  target: {
    text: "Free games go up to 100 points. Subscribe to set any target.",
    buy: "Subscribe - $3.99/year",
  },
} as const;

const digits = (v: string) => v.replace(/[^0-9]/g, "").slice(0, 3);

// The screenshots' 6 rounds fill the list exactly, so the sample game splits
// 2 of those hands in two (same totals) to give the list something to scroll.
const START: Round[] = [
  { you: 28, james: 0, bonus: "gin" },
  { you: 0, james: 5, bonus: null },
  { you: 11, james: 0, bonus: null },
  { you: 0, james: 28, bonus: "undercut" },
  { you: 0, james: 7, bonus: null },
  { you: 8, james: 0, bonus: null },
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
  const [paywall, setPaywall] = useState<null | keyof typeof PAYWALL>(null);
  const [knock, setKnock] = useState<number | undefined>(KNOCK);
  const [knockDraft, setKnockDraft] = useState<string | null>(null);
  const [rules, setRules] = useState<Rules>(RULES);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [ask, setAsk] = useState<null | "rounds" | "delete">(null);
  const list = useRef<HTMLOListElement>(null);

  // Like the app's list, the newest round is at the bottom; keep it in view.
  useEffect(() => {
    const el = list.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [rounds.length]);

  const you = rounds.reduce((sum, r) => sum + r.you, 0);
  const james = rounds.reduce((sum, r) => sum + r.james, 0);
  const done = you >= rules.target || james >= rules.target;
  const bonusPoints = bonus ? rules[bonus] : 0;
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
      (you + round.you > FREE_TARGET || james + round.james > FREE_TARGET)
    ) {
      setOpen(false);
      setPaywall("blocked");
      return;
    }
    setRounds((r) => [...r, round]);
    setOpen(false);
  }

  function saveKnock() {
    if (knockDraft === null) return;
    setKnock(knockDraft === "" ? undefined : Number(knockDraft));
    setKnockDraft(null);
  }

  function openOptions() {
    setDraft({
      target: String(rules.target),
      gin: String(rules.gin),
      bigGin: String(rules.bigGin),
      undercut: String(rules.undercut),
    });
  }

  // Like performSave(): empty bonuses count as 0, and a free game's target
  // can't be empty or over 100.
  function nextRules(d: Draft): Rules {
    const target = Number(d.target) || 0;
    return {
      target: target === 0 || target > FREE_TARGET ? FREE_TARGET : target,
      gin: Number(d.gin) || 0,
      bigGin: Number(d.bigGin) || 0,
      undercut: Number(d.undercut) || 0,
    };
  }

  function saveOptions() {
    if (!draft) return;
    if ((Number(draft.target) || 0) > FREE_TARGET) {
      setPaywall("target");
      return;
    }
    const next = nextRules(draft);
    const affected = rounds.some(
      (r) => r.bonus && next[r.bonus] !== rules[r.bonus],
    );
    if (affected) setAsk("rounds");
    else applyOptions(false);
  }

  function applyOptions(updateRounds: boolean) {
    if (!draft) return;
    const next = nextRules(draft);
    if (updateRounds) {
      // Swap the old bonus for the new one in the winner's points.
      setRounds((rs) =>
        rs.map((r) => {
          if (!r.bonus) return r;
          const change = next[r.bonus] - rules[r.bonus];
          return {
            ...r,
            you: r.you > 0 ? r.you + change : 0,
            james: r.james > 0 ? r.james + change : 0,
          };
        }),
      );
    }
    setRules(next);
    setAsk(null);
    setDraft(null);
  }

  // The app goes back to the opponent's games after a delete; here a new,
  // empty game takes its place. Reset brings back the sample game.
  function deleteGame() {
    setRounds([]);
    setKnock(undefined);
    setRules(RULES);
    setAsk(null);
    setDraft(null);
  }

  function reset() {
    setRounds(START);
    setOpen(false);
    setPaywall(null);
    setKnock(KNOCK);
    setKnockDraft(null);
    setRules(RULES);
    setDraft(null);
    setAsk(null);
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
        {draft ? (
          <GameOptions
            draft={draft}
            onChange={(key, value) =>
              setDraft({ ...draft, [key]: digits(value) })
            }
            onBack={() => setDraft(null)}
            onSave={saveOptions}
            onDelete={() => setAsk("delete")}
          />
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 px-4">
              <p className="text-base font-bold">You vs James</p>
              {version === "now" && (
                <button
                  type="button"
                  onClick={openOptions}
                  aria-label="Game options"
                  className={`-mr-1.5 flex h-9 w-9 items-center justify-center ${focusRing}`}
                >
                  <LuSettings aria-hidden="true" className="h-6 w-6" />
                </button>
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
                  Game Complete! {you >= rules.target ? "You" : "James"} won!
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
              <Button
                className="mt-4 h-16 w-full shrink-0 text-xl font-normal"
                onClick={() =>
                  setKnockDraft(knock === undefined ? "" : String(knock))
                }
              >
                {knock === undefined ? (
                  <span style={system}>Add Knock</span>
                ) : (
                  `Knock: ${knock}`
                )}
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
        )}

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

        {knockDraft !== null && (
          <Overlay>
            <div
              role="dialog"
              aria-label="Set Knock Value"
              className="w-[90%] rounded-lg bg-white p-6"
            >
              <p className="mb-4 text-center text-lg font-semibold">
                Set Knock Value
              </p>
              <div className="mb-6 mt-2 flex items-center gap-2">
                <input
                  inputMode="numeric"
                  aria-label="Knock value"
                  placeholder="Enter knock value"
                  value={knockDraft}
                  onChange={(e) => setKnockDraft(digits(e.target.value))}
                  className={`h-12 min-w-0 flex-1 rounded-sm border-2 border-black px-3 text-lg ${focusRing}`}
                  style={hard}
                />
                <Button
                  className="h-12 w-12 shrink-0 text-lg"
                  onClick={() => setKnockDraft("")}
                >
                  <span aria-label="Clear">X</span>
                </Button>
              </div>
              <div className="flex gap-2" style={system}>
                <Button
                  className="h-14 flex-1 text-lg"
                  onClick={() => setKnockDraft(null)}
                >
                  Cancel
                </Button>
                <Button
                  primary
                  className="h-14 flex-1 text-lg"
                  onClick={saveKnock}
                >
                  Save
                </Button>
              </div>
            </div>
          </Overlay>
        )}

        {ask === "rounds" && (
          <Overlay>
            <div
              role="dialog"
              aria-label="Update Existing Rounds?"
              className="w-[90%] rounded-lg bg-white p-6"
            >
              <p className="mt-2 text-center text-xl font-bold">
                Update Existing Rounds?
              </p>
              <p className="mt-3 text-center text-base">
                Would you like to update all rounds with the new bonus value?
              </p>
              <div className="mt-5 flex gap-4" style={system}>
                <Button
                  className="h-11 flex-1"
                  onClick={() => applyOptions(false)}
                >
                  No
                </Button>
                <Button
                  primary
                  className="h-11 flex-1"
                  onClick={() => applyOptions(true)}
                >
                  Yes
                </Button>
              </div>
            </div>
          </Overlay>
        )}

        {ask === "delete" && (
          <Overlay>
            <div
              role="alertdialog"
              aria-label="Delete Game"
              className="w-[270px] overflow-hidden rounded-[14px] bg-[#F2F2F2] text-center"
              style={system}
            >
              <div className="px-4 pb-4 pt-5">
                <p className="text-[17px] font-semibold">Delete Game</p>
                <p className="mt-1 text-[13px] leading-[18px]">
                  Are you sure you want to delete this game? This cannot be
                  undone.
                </p>
              </div>
              <div className="flex border-t border-[#C6C6C8] text-[17px]">
                <button
                  type="button"
                  onClick={() => setAsk(null)}
                  className={`h-11 flex-1 border-r border-[#C6C6C8] font-semibold text-[#007AFF] ${focusRing}`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={deleteGame}
                  className={`h-11 flex-1 text-[#FF3B30] ${focusRing}`}
                >
                  Delete
                </button>
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
              <p className="mt-3 text-sm leading-6">{PAYWALL[paywall].text}</p>
              <div className="mt-5 flex flex-col gap-3" style={system}>
                <Button primary className="h-11 w-full">
                  {PAYWALL[paywall].buy}
                </Button>
                <Button
                  className="h-11 w-full"
                  onClick={() => {
                    // Declining a higher target snaps it back to the free cap.
                    if (paywall === "target" && draft)
                      setDraft({ ...draft, target: String(FREE_TARGET) });
                    setPaywall(null);
                  }}
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

const BONUS_FIELDS = [
  ["gin", "Gin Bonus"],
  ["bigGin", "Big Gin Bonus"],
  ["undercut", "Undercut Bonus"],
] as const;

/** Game Options as a free player sees it. */
function GameOptions({
  draft,
  onChange,
  onBack,
  onSave,
  onDelete,
}: {
  draft: Draft;
  onChange: (key: keyof Rules, value: string) => void;
  onBack: () => void;
  onSave: () => void;
  onDelete: () => void;
}) {
  function field(key: keyof Rules, name: string, className = "mb-4") {
    return (
      <label className={`block text-base font-semibold ${className}`}>
        {name}
        <input
          inputMode="numeric"
          value={draft[key]}
          onChange={(e) => onChange(key, e.target.value)}
          className={`mt-2 block h-10 w-full rounded-sm border-2 border-black px-3 text-base font-normal ${focusRing}`}
          style={hard}
        />
      </label>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 shrink-0 items-center gap-1 border-b border-gray-200 px-2">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to the game"
          className={`flex h-9 w-9 items-center justify-center ${focusRing}`}
        >
          <LuChevronLeft aria-hidden="true" className="h-7 w-7" />
        </button>
        <p className="text-base font-bold">Game Options</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <div className="p-4">
          <p className="mb-4 text-lg font-semibold">Game Rules</p>
          {field("target", "Target Score", "")}
          <p className="mb-4 mt-2 text-sm text-[#6B7280]">
            Free games go up to 100 points. Subscribe to set a higher target.
          </p>
          {BONUS_FIELDS.map(([key, name]) => (
            <div key={key}>{field(key, name)}</div>
          ))}
        </div>
        <button
          type="button"
          onClick={onDelete}
          className={`mt-8 flex h-16 w-full items-center justify-center rounded-md border border-[#DC2626] bg-white text-xl font-semibold text-[#DC2626] ${focusRing}`}
          style={{ boxShadow: "4px 4px 0px #DC2626", ...system }}
        >
          Delete Game
        </button>
        <Button
          primary
          className="mb-12 mt-8 h-16 w-full text-xl"
          onClick={onSave}
        >
          <span style={system}>Save</span>
        </Button>
      </div>
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
