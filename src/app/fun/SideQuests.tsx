"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { focusRing } from "@/components/site/links";
import AsciiArt, {
  AsciiScene,
  ScrambleText,
  onceSeen,
  type AsciiSource,
} from "./AsciiArt";
import type { SceneName } from "./scenes";

export type Status =
  | "live"
  | "app-store"
  | "github"
  | "download"
  | "demo"
  | "here"
  | "archive"
  | "soon"
  | "in-progress"
  | "private";

export type Quest = {
  name: string;
  /** Kept in the list, but not shown on the page or told to erinLLM. */
  hidden?: boolean;
  /** One plain line on what it is. */
  what: string;
  year?: string;
  status: Status;
  /** Where it opens. Projects without one show dimmed. */
  href?: string;
  /** Overrides the status label, e.g. a download's size. */
  cta?: string;
  art?: AsciiSource;
  /** Hand-built art to show on hover (see thumbs.tsx). */
  node?: React.ReactNode;
  /** A looping ASCII scene instead of a picture (scenes.ts). */
  scene?: SceneName;
  /** Plays right here instead of linking out. */
  play?: "dog";
};

export type QuestGroup = { title: string; note?: string; quests: Quest[] };

const STATUS: Record<Status, string> = {
  live: "Live",
  "app-store": "App Store",
  github: "GitHub",
  download: "Download",
  demo: "Demo",
  here: "Try it here",
  archive: "Archive",
  soon: "Coming soon",
  "in-progress": "In progress",
  private: "Private",
};

const label = "font-mono text-label uppercase";
const number = (n: number) => String(n).padStart(3, "0");
const statusOf = (q: Quest) => q.cta ?? STATUS[q.status];
const external = (href: string) => /^https?:/.test(href);

function QuestLink({
  quest,
  className,
  children,
  ...hover
}: {
  quest: Quest & { href: string };
  className: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const { href, status } = quest;
  if (status === "download") {
    return (
      <a href={href} download className={className} {...hover}>
        {children}
      </a>
    );
  }
  if (external(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...hover}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...hover}>
      {children}
    </Link>
  );
}

// Hover and keyboard focus both count as looking at something. `runs`
// counts the visits, so text can decode again on each one.
function useActive() {
  const [active, setActive] = useState(false);
  const [runs, setRuns] = useState(0);
  const on = () => {
    setActive(true);
    setRuns((r) => r + 1);
  };
  const off = () => setActive(false);
  return [
    active,
    { onPointerEnter: on, onPointerLeave: off, onFocus: on, onBlur: off },
    runs,
  ] as const;
}

// Number and status, then the name, which decodes like Aino's on hover,
// then a line on what it is, so you know before you open it.
function Caption({
  n,
  quest,
  run,
  note,
}: {
  n: number;
  quest: Quest;
  run: number;
  note?: string;
}) {
  const linked = !!quest.href || !!quest.play;
  return (
    <div className="mt-3">
      <p className={`${label} text-site-muted`}>
        {number(n)} <span aria-hidden="true">·</span> {note ?? statusOf(quest)}
        {quest.href && external(quest.href) && quest.status !== "download" && (
          <span aria-hidden="true"> ↗</span>
        )}
      </p>
      <p
        className={`${label} ${
          linked
            ? "text-site-ink transition-colors group-hover:text-site-blue"
            : "text-site-muted"
        }`}
      >
        <ScrambleText text={quest.name} run={run} />
      </p>
      <p className="mt-1 text-caption text-site-muted">{quest.what}</p>
    </div>
  );
}

// What a square shows: a minigame's scene, or a picture in ASCII.
function Art({ quest, active }: { quest: Quest; active: boolean }) {
  const { href, art = {}, node, scene } = quest;
  if (scene) return <AsciiScene scene={scene} />;
  if (quest.play === "dog") return <AsciiScene scene="dog" />;
  return (
    <AsciiArt
      source={art}
      reveal={!!href && !!(art.src || node)}
      active={active}
      tone={href || quest.status === "soon" ? "ink" : "muted"}
    >
      {node}
    </AsciiArt>
  );
}

function Square({ quest, n }: { quest: Quest; n: number }) {
  const [active, hover, runs] = useActive();
  const { href } = quest;
  const body = (
    <>
      <Art quest={quest} active={active} />
      <Caption n={n} quest={quest} run={runs} />
    </>
  );
  return href ? (
    <QuestLink
      quest={{ ...quest, href }}
      className={`group block ${focusRing}`}
      {...hover}
    >
      {body}
    </QuestLink>
  ) : (
    <div className="group" {...hover}>
      {body}
    </div>
  );
}

// The old dog-fetcher, live: each click asks dog.ceo for a random dog, which
// scrambles in as ASCII and shows as the photo while you're on it, then goes
// back to ASCII when you leave, like every other square.
const DOG_API = "https://dog.ceo/api/breeds/image/random";

function HappinessGenerator({ quest, n }: { quest: Quest; n: number }) {
  const [active, hover, runs] = useActive();
  const [dog, setDog] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  async function fetchDog() {
    try {
      const res = await fetch(DOG_API);
      const data: { message: string; status: string } = await res.json();
      if (data.status !== "success") throw new Error(data.status);
      setDog(data.message);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }

  // ".../breeds/retriever-golden/n02099601_1.jpg" → "golden retriever"
  const breed = dog
    ?.match(/breeds\/([^/]+)\//)?.[1]
    .split("-")
    .reverse()
    .join(" ");

  return (
    <button
      id="happiness-generator"
      type="button"
      onClick={fetchDog}
      className={`group block w-full text-left ${focusRing}`}
      {...hover}
    >
      {dog ? (
        <AsciiArt key={dog} source={{ src: dog }} reveal active={active} />
      ) : (
        <AsciiScene scene="dog" />
      )}
      <Caption
        n={n}
        quest={quest}
        run={runs}
        note={
          failed
            ? "No dog this time, try again"
            : breed
              ? `${breed}, click for another`
              : undefined
        }
      />
    </button>
  );
}

// A list row decodes in, Aino-style, the first time it scrolls into view
// (rows cascade by `index`), and its text decodes again on hover.
function Row({
  quest,
  n,
  index,
  onPlay,
  onPeek,
}: {
  quest: Quest;
  n: number;
  index: number;
  onPlay: () => void;
  onPeek: (quest: Quest) => void;
}) {
  const [, hover, runs] = useActive();
  const [seen, setSeen] = useState(false);
  const row = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = row.current;
    if (el) return onceSeen(el, () => setSeen(true), "0px");
  }, []);

  const run = seen ? runs + 1 : 0;
  const delay = runs ? 0 : index * 40;
  const cells = (
    <>
      <span className="font-mono text-label text-site-muted">
        <ScrambleText text={number(n)} run={run} delay={delay} />
      </span>
      <span
        className={`${label} transition-colors ${
          quest.href || quest.play ? "group-hover:text-site-blue" : ""
        }`}
      >
        <ScrambleText text={quest.name} run={run} delay={delay} />
      </span>
      <span className="hidden text-body-sm text-site-muted md:block">
        {quest.what}
      </span>
      <span className={`${label} text-site-muted`}>
        <ScrambleText text={statusOf(quest)} run={run} delay={delay} />
      </span>
      <span className="hidden text-right font-mono text-label text-site-muted md:block">
        {quest.year && (
          <ScrambleText text={quest.year} run={run} delay={delay} />
        )}
      </span>
    </>
  );
  const grid = `group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 py-1.5 text-left md:grid-cols-[4rem_16rem_1fr_9rem_3rem] ${focusRing}`;
  const handlers = {
    ...hover,
    onPointerEnter: (e: React.PointerEvent) => {
      hover.onPointerEnter();
      if (e.pointerType === "mouse") onPeek(quest);
    },
  };

  let body: React.ReactNode;
  if (quest.play) {
    body = (
      <button type="button" onClick={onPlay} className={grid} {...handlers}>
        {cells}
      </button>
    );
  } else if (!quest.href) {
    body = (
      <div className={`${grid} opacity-50`} {...handlers}>
        {cells}
      </div>
    );
  } else {
    body = (
      <QuestLink
        quest={{ ...quest, href: quest.href }}
        className={grid}
        {...handlers}
      >
        {cells}
      </QuestLink>
    );
  }

  return (
    <li
      ref={row}
      className={`transition-opacity duration-300 motion-reduce:transition-none ${
        seen ? "opacity-100" : "opacity-0"
      }`}
    >
      {body}
    </li>
  );
}

// The list's preview: the hovered row's square, floating by the cursor. It
// scrambles in and, for finished projects, resolves into the picture.
function Peek({
  quest,
  box,
}: {
  quest: Quest | null;
  box: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={box}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-50 hidden w-56 border border-site-line bg-site-paper shadow-float ring-1 ring-black/5 transition-opacity duration-200 motion-reduce:transition-none md:block ${
        quest ? "opacity-100" : "opacity-0"
      }`}
    >
      {quest && <Art key={quest.name} quest={quest} active />}
    </div>
  );
}

export default function SideQuests({ groups }: { groups: QuestGroup[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [peek, setPeek] = useState<Quest | null>(null);
  const peekBox = useRef<HTMLDivElement>(null);
  let n = 0;

  // Keeps the preview beside the cursor, flipping left near the right edge.
  function follow(e: React.PointerEvent) {
    const el = peekBox.current;
    if (!el || e.pointerType !== "mouse") return;
    const size = el.offsetWidth;
    const x =
      e.clientX + 24 + size > window.innerWidth - 16
        ? e.clientX - 24 - size
        : e.clientX + 24;
    const y = Math.min(
      Math.max(e.clientY - size / 2, 16),
      window.innerHeight - size - 16,
    );
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function play() {
    setView("grid");
    requestAnimationFrame(() => {
      const el = document.getElementById("happiness-generator");
      el?.scrollIntoView({ block: "center" });
      el?.focus({ preventScroll: true });
    });
  }

  return (
    <>
      <div role="group" aria-label="View" className={`${label} mb-12 flex gap-4`}>
        {(["grid", "list"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => {
              setView(v);
              setPeek(null);
            }}
            className={`uppercase transition-colors ${
              view === v ? "text-site-ink" : "text-site-muted hover:text-site-blue"
            } ${focusRing}`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-24">
        {groups.map((group, g) => (
          <section key={group.title} aria-labelledby={`group-${g}`}>
            <div className="flex items-baseline justify-between gap-4 border-t border-site-line pt-4">
              <h2
                id={`group-${g}`}
                className="font-serif text-subhead text-site-ink"
              >
                {group.title}
              </h2>
              <span className="font-mono text-label text-site-muted">
                {String(group.quests.length).padStart(2, "0")}
              </span>
            </div>
            {group.note && (
              <p className="mt-1 max-w-measure text-body-sm text-site-muted">
                {group.note}
              </p>
            )}

            {view === "grid" ? (
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {group.quests.map((quest) => {
                  n += 1;
                  return (
                    <li key={quest.name}>
                      {quest.play === "dog" ? (
                        <HappinessGenerator quest={quest} n={n} />
                      ) : (
                        <Square quest={quest} n={n} />
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul
                className="mt-6"
                onPointerMove={follow}
                onPointerLeave={() => setPeek(null)}
              >
                {group.quests.map((quest, i) => {
                  n += 1;
                  return (
                    <Row
                      key={quest.name}
                      quest={quest}
                      n={n}
                      index={i}
                      onPlay={play}
                      onPeek={setPeek}
                    />
                  );
                })}
              </ul>
            )}
          </section>
        ))}
      </div>

      {view === "list" && <Peek quest={peek} box={peekBox} />}
    </>
  );
}
