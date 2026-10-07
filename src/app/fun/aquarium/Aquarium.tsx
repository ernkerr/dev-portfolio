"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { focusRing } from "@/components/site/links";
import { label } from "@/components/site/prose";
import type { Fish } from "@/lib/aquarium";
import DrawFish, { type Drawing } from "./DrawFish";

// The aquarium: everyone's fish swimming in one tank. Draw one, name it and
// drop it in; it swims for you right away, and for everyone once it's
// checked (src/app/api/aquarium). The tank shows a crowd, not every fish
// ever drawn: yours, the newest, and some older ones at random. Find any
// fish by its name.

const OWNER = "aquarium-owner";
const CROWD = { newest: 20, older: 12 };

function ownerToken() {
  try {
    let token = localStorage.getItem(OWNER);
    if (!token) {
      token = crypto.randomUUID();
      localStorage.setItem(OWNER, token);
    }
    return token;
  } catch {
    return "";
  }
}

// Who's in the tank: mine, the newest, then older ones picked at random.
function crowdOf(all: Fish[]) {
  const mine = all.filter((f) => f.mine);
  const others = all.filter((f) => !f.mine);
  const older = others.slice(CROWD.newest);
  for (let i = older.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [older[i], older[j]] = [older[j], older[i]];
  }
  return [...mine, ...others.slice(0, CROWD.newest), ...older.slice(0, CROWD.older)];
}

export default function Aquarium() {
  const [all, setAll] = useState<Fish[] | null>(null);
  const [inTank, setInTank] = useState<Fish[]>([]);
  const [canDrop, setCanDrop] = useState(true);
  const [drawing, setDrawing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [said, setSaid] = useState("");
  const [find, setFind] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [dropped, setDropped] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/aquarium", {
        headers: { "x-fish-owner": ownerToken() },
        cache: "no-store",
      }).catch(() => null);
      const data = await res?.json().catch(() => null);
      if (!res?.ok || !data) {
        setAll([]);
        setSaid("The fish didn't load. Try again in a bit.");
        return;
      }
      setAll(data.fish);
      setInTank(crowdOf(data.fish));
      setCanDrop(data.canDrop);
    })();
  }, []);

  // Finding by name: matching fish join the tank and show their names.
  const query = find.trim().toLowerCase();
  const found = useMemo(
    () => (query && all ? all.filter((f) => f.name.toLowerCase().includes(query)) : []),
    [all, query],
  );
  useEffect(() => {
    if (!found.length) return;
    setInTank((tank) => {
      const ids = new Set(tank.map((f) => f.id));
      const add = found.filter((f) => !ids.has(f.id)).slice(0, 12);
      return add.length ? [...tank, ...add] : tank;
    });
  }, [found]);

  const drop = async (fishDrawing: Drawing) => {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/aquarium", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-fish-owner": ownerToken() },
      body: JSON.stringify(fishDrawing),
    }).catch(() => null);
    const data = await res?.json().catch(() => null);
    setBusy(false);
    if (!res?.ok || !data?.fish) {
      setError(data?.error ?? "That didn't drop in. Try again?");
      return;
    }
    const fish: Fish = data.fish;
    setAll((list) => [fish, ...(list ?? [])]);
    setInTank((tank) => [fish, ...tank]);
    setDropped(fish.id);
    setDrawing(false);
    setSaid(
      fish.waiting
        ? `${fish.name} is swimming! Everyone else will see it once I've had a look.`
        : `${fish.name} is in! Everyone can see it now.`,
    );
  };

  const count = all?.filter((f) => !f.waiting).length ?? 0;
  const button = `border border-site-ink bg-site-ink px-5 py-2.5 font-mono text-nav uppercase text-site-paper transition-colors hover:border-site-blue hover:bg-site-blue disabled:border-site-line disabled:bg-site-line disabled:text-site-muted ${focusRing}`;

  return (
    <div>
      {/* One compact row, so the tank below can fill the rest of the window */}
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 pt-10 md:pt-12">
        <div className="max-w-measure">
          <h1 className="font-serif text-display-sm md:text-display">Aquarium</h1>
          <p className="mt-3 text-body text-site-ink/80">
            Draw a fish, give it a name and drop it in. It swims here with
            everyone else&apos;s.
          </p>
        </div>
        <div className="flex w-full flex-wrap items-end gap-4 sm:w-auto">
          <button
            type="button"
            onClick={() => {
              setError(null);
              setDrawing(true);
            }}
            disabled={!canDrop}
            className={button}
          >
            Draw a fish
          </button>
          <label className="flex min-w-0 flex-1 flex-col gap-2 sm:w-56 sm:flex-none">
            <span className={label}>Find a fish</span>
            <input
              type="search"
              value={find}
              onChange={(e) => setFind(e.target.value)}
              placeholder="By its name"
              className={`border border-site-line bg-site-paper px-3 py-2 text-body-sm text-site-ink placeholder:text-site-muted ${focusRing}`}
            />
          </label>
        </div>
      </div>

      <p aria-live="polite" className="mt-3 min-h-6 text-body-sm text-site-ink/80">
        {said ||
          (!canDrop
            ? "Dropping fish in isn't set up yet."
            : query
              ? found.length
                ? `${found.length} fish called something like "${find.trim()}".`
                : `No fish called "${find.trim()}" yet.`
              : "")}
      </p>

      <Tank
        fish={inTank}
        highlight={query ? new Set(found.map((f) => f.id)) : null}
        picked={picked}
        onPick={(id) => setPicked((p) => (p === id ? null : id))}
        dropped={dropped}
      />

      <p className="mt-3 font-mono text-date text-site-muted">
        {all === null ? "Filling the tank..." : `${count} fish so far${inTank.length < count ? `, ${inTank.length} swimming now` : ""}`}
      </p>

      {drawing && (
        <DrawFish onDrop={drop} onClose={() => setDrawing(false)} busy={busy} error={error} />
      )}
    </div>
  );
}

// ---- The tank ----

type Swimmer = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number; // where it's heading, 0 top to 1 bottom
  nextTurn: number;
  phase: number;
  scale: number;
  w: number;
  h: number;
  falling: boolean;
};

function Tank({
  fish,
  highlight,
  picked,
  onPick,
  dropped,
}: {
  fish: Fish[];
  highlight: Set<string> | null;
  picked: string | null;
  onPick: (id: string) => void;
  dropped: string | null;
}) {
  const tank = useRef<HTMLDivElement>(null);
  const els = useRef(new Map<string, HTMLButtonElement>());
  const swimmers = useRef(new Map<string, Swimmer>());
  const size = useRef({ w: 800, h: 450 });
  const [ripple, setRipple] = useState<{ x: number; key: number } | null>(null);
  // As tall as fits under the controls, so the whole tank is in view:
  // about 16 by 9 on wide screens, taller than wide on phones.
  const [height, setHeight] = useState<number | null>(null);
  useLayoutEffect(() => {
    const fit = () => {
      const el = tank.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const w = el.clientWidth;
      const ideal = w * (w < 640 ? 1.25 : 0.5625);
      const room = window.innerHeight - top - 40; // the count under it
      setHeight(Math.round(Math.max(280, Math.min(ideal, room))));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  useEffect(() => {
    const el = tank.current!;
    const measure = () => {
      size.current = { w: el.clientWidth, h: el.clientHeight };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Each fish's size: about a ninth of the tank's width, a little each way.
  const fishWidth = useCallback((s: Swimmer) => Math.min(150, Math.max(64, size.current.w * 0.11)) * s.scale, []);

  // New fish get a place to start; a just-dropped one falls in from above.
  useEffect(() => {
    const { w, h } = size.current;
    for (const f of fish) {
      if (swimmers.current.has(f.id)) continue;
      const isNew = f.id === dropped;
      const s: Swimmer = {
        x: Math.random() * w * 0.8 + w * 0.05,
        y: isNew ? -120 : (0.1 + Math.random() * 0.65) * h,
        vx: (Math.random() < 0.5 ? -1 : 1) * (22 + Math.random() * 30),
        vy: 0,
        depth: 0.15 + Math.random() * 0.6,
        nextTurn: 3 + Math.random() * 8,
        phase: Math.random() * 6.28,
        scale: 0.85 + Math.random() * 0.35,
        w: 100,
        h: 60,
        falling: isNew,
      };
      if (isNew) setRipple({ x: s.x + 50, key: Date.now() });
      swimmers.current.set(f.id, s);
    }
  }, [fish, dropped]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const { w, h } = size.current;
      const floor = h * 0.86;
      for (const [id, s] of swimmers.current) {
        const el = els.current.get(id);
        if (!el) continue;
        s.w = fishWidth(s);
        const img = el.firstElementChild as HTMLImageElement | null;
        if (img?.naturalWidth) s.h = (s.w * img.naturalHeight) / img.naturalWidth;
        const speed = reduce ? 0.25 : 1;
        if (s.falling) {
          // Dropped in: it sinks, slowing in the water, then swims off.
          s.vy = s.y < 0 ? s.vy + 600 * dt : s.vy * Math.exp(-3 * dt);
          s.y += s.vy * dt;
          if (s.y >= 0 && s.vy < 30) s.falling = false;
        } else {
          s.nextTurn -= dt;
          if (s.nextTurn <= 0) {
            if (Math.random() < 0.35) s.vx = -s.vx;
            s.depth = 0.1 + Math.random() * 0.65;
            s.nextTurn = 4 + Math.random() * 8;
          }
          s.x += s.vx * dt * speed;
          if (s.x < 4 && s.vx < 0) s.vx = Math.abs(s.vx);
          if (s.x > w - s.w - 4 && s.vx > 0) s.vx = -Math.abs(s.vx);
          const target = s.depth * (floor - s.h);
          s.y += (target - s.y) * Math.min(1, dt * 0.4 * speed);
        }
        const bob = reduce ? 0 : Math.sin(now / 700 + s.phase) * 4;
        const tilt = reduce || s.falling ? 0 : Math.sin(now / 350 + s.phase) * 3;
        const facing = s.vx < 0 ? -1 : 1;
        el.style.width = `${s.w}px`;
        el.style.transform = `translate(${s.x.toFixed(1)}px, ${(Math.min(s.y, floor - s.h) + bob).toFixed(1)}px)`;
        if (img) img.style.transform = `scaleX(${facing}) rotate(${(tilt * facing).toFixed(2)}deg)`;
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [fishWidth]);

  return (
    <div
      ref={tank}
      className={`relative mt-2 w-full overflow-hidden border-4 border-tank-rim bg-gradient-to-b from-tank-surface via-tank-water to-tank-deep ${height ? "" : "aspect-tank-tall md:aspect-tank"}`}
      style={{ containerType: "size", height: height ?? undefined }}
    >
      <Scenery />

      {ripple && (
        <span
          key={ripple.key}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 h-3 w-24 -translate-x-1/2 animate-ping border-b-2 border-tank-bubble motion-reduce:hidden"
          style={{ left: ripple.x }}
          onAnimationIteration={() => setRipple(null)}
        />
      )}

      {fish.map((f) => {
        const shown = f.mine || picked === f.id || highlight?.has(f.id);
        const dim = highlight && !highlight.has(f.id) && !f.mine;
        return (
          <button
            key={f.id}
            ref={(el) => {
              if (el) els.current.set(f.id, el);
              else els.current.delete(f.id);
            }}
            type="button"
            onClick={() => onPick(f.id)}
            aria-label={`${f.name}${f.mine ? ", yours" : ""}`}
            className={`group absolute left-0 top-0 block transition-opacity duration-300 will-change-transform ${dim ? "opacity-40" : "opacity-100"} ${focusRing}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.src} alt="" draggable={false} className="block w-full select-none" />
            <span
              className={`pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap border border-site-line bg-site-paper px-2 py-0.5 font-mono text-label uppercase text-site-ink transition-opacity ${shown ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}
            >
              {f.mine ? `Yours: ${f.name}` : f.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// The tank's insides: light falling through the water, sand, stones, weeds
// swaying, and bubbles rising. Flat, like the About room.
function Scenery() {
  const weeds = [
    { left: "6%", height: "34%", delay: "0s", light: false },
    { left: "11%", height: "22%", delay: "-2s", light: true },
    { left: "38%", height: "18%", delay: "-4s", light: false },
    { left: "71%", height: "30%", delay: "-1s", light: true },
    { left: "77%", height: "40%", delay: "-3s", light: false },
    { left: "92%", height: "24%", delay: "-5s", light: true },
  ];
  const bubbles = [
    { left: "9%", delay: "0s", size: 8 },
    { left: "9.6%", delay: "-2.3s", size: 5 },
    { left: "74%", delay: "-1.2s", size: 7 },
    { left: "74.8%", delay: "-4.6s", size: 4 },
    { left: "52%", delay: "-3.4s", size: 6 },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="18,0 30,0 22,100 4,100" className="fill-tank-ray/30" />
        <polygon points="46,0 52,0 50,100 38,100" className="fill-tank-ray/20" />
        <polygon points="70,0 80,0 86,100 68,100" className="fill-tank-ray/25" />
        <rect x="0" y="0" width="100" height="1.6" className="fill-tank-bubble/60" />
      </svg>

      {weeds.map((w) => (
        <svg
          key={w.left}
          className="absolute origin-bottom animate-tank-sway motion-reduce:animate-none"
          style={{ left: w.left, bottom: "9%", width: "5%", height: w.height, animationDelay: w.delay }}
          viewBox="0 0 20 100"
          preserveAspectRatio="none"
        >
          <path
            d="M10 100 C2 80 18 66 9 48 C2 34 16 20 10 0 C14 22 22 34 14 50 C8 66 20 82 12 100 Z"
            className={w.light ? "fill-tank-weed-light" : "fill-tank-weed"}
          />
        </svg>
      ))}

      {bubbles.map((b) => (
        <span
          key={b.left + b.delay}
          className="absolute animate-tank-bubble motion-reduce:hidden"
          style={{ left: b.left, bottom: "10%", animationDelay: b.delay }}
        >
          <svg width={b.size} height={b.size} viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="4.2" className="fill-tank-bubble/40 stroke-tank-bubble" strokeWidth="1.2" />
          </svg>
        </span>
      ))}

      <svg className="absolute inset-x-0 bottom-0 w-full" style={{ height: "16%" }} viewBox="0 0 100 16" preserveAspectRatio="none">
        <path d="M0 6 C14 3 26 8 40 5 C56 2 70 7 84 4 C92 3 97 5 100 4 V16 H0 Z" className="fill-tank-sand" />
        <path d="M0 11 C20 9 36 13 54 10 C70 8 86 12 100 10 V16 H0 Z" className="fill-tank-sand-shade" />
        <ellipse cx="22" cy="8" rx="5" ry="2.6" className="fill-tank-stone" />
        <ellipse cx="21" cy="7.2" rx="3" ry="1.2" className="fill-tank-stone-light" />
        <ellipse cx="63" cy="7.5" rx="3.4" ry="2" className="fill-tank-stone" />
        <ellipse cx="88" cy="8.5" rx="4" ry="2.2" className="fill-tank-stone" />
        <ellipse cx="87.4" cy="7.7" rx="2.2" ry="0.9" className="fill-tank-stone-light" />
      </svg>
    </div>
  );
}
