"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { COLS, ROWS, RAMP, SCENES, type SceneName } from "./scenes";

// Every square on the Fun page is ASCII, the way aino.agency/work loads:
// the picture is sampled into characters and they scramble in. Hover a
// finished project and the real picture shows; move away and the
// characters scramble back. Phones, which can't hover, show the picture
// once it has loaded.

export type AsciiSource = {
  /** Field behind the picture: the project's own brand color. */
  bg?: string;
  /** The picture. It's drawn the same way in ASCII and when it shows. */
  src?: string;
  /** Share of the square's width the picture takes. Omit to fill it. */
  width?: number;
  /** Width / height of the picture when it doesn't fill the square. */
  ratio?: number;
  /** An app icon: rounded corners, and read by darkness in ASCII. */
  icon?: boolean;
  /** A few letters drawn in ASCII when there's no picture. */
  glyph?: string;
};

const SAMPLE = 240;

const charStyle = {
  fontSize: `${100 / (COLS * 0.6)}cqw`,
  lineHeight: `${100 / ROWS}cqw`,
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function load(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Draws the square the way it looks for real, then reads one character per
// cell from how much is there.
function sample(
  source: AsciiSource,
  img: HTMLImageElement | null,
  font: string,
): string | null {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SAMPLE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  if (img) {
    // App icons bring their own background, so they're read on paper.
    if (source.bg && !source.icon) {
      ctx.fillStyle = source.bg;
      ctx.fillRect(0, 0, SAMPLE, SAMPLE);
    }
    if (source.width) {
      const w = SAMPLE * source.width;
      const h = w / (source.ratio ?? img.naturalWidth / img.naturalHeight);
      ctx.drawImage(img, (SAMPLE - w) / 2, (SAMPLE - h) / 2, w, h);
    } else {
      const side = Math.min(img.naturalWidth, img.naturalHeight);
      ctx.drawImage(
        img,
        (img.naturalWidth - side) / 2,
        (img.naturalHeight - side) / 2,
        side,
        side,
        0,
        0,
        SAMPLE,
        SAMPLE,
      );
    }
  } else if (source.glyph) {
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let size = SAMPLE * 0.9;
    ctx.font = `700 ${size}px ${font}`;
    const fit = (SAMPLE * 0.84) / ctx.measureText(source.glyph).width;
    if (fit < 1) {
      size *= fit;
      ctx.font = `700 ${size}px ${font}`;
    }
    ctx.fillText(source.glyph, SAMPLE / 2, SAMPLE / 2);
  } else {
    return null;
  }

  const { data } = ctx.getImageData(0, 0, SAMPLE, SAMPLE);
  const values = new Float32Array(COLS * ROWS);
  const cover = new Float32Array(COLS * ROWS);
  for (let row = 0; row < ROWS; row++) {
    const y0 = Math.floor((row * SAMPLE) / ROWS);
    const y1 = Math.floor(((row + 1) * SAMPLE) / ROWS);
    for (let col = 0; col < COLS; col++) {
      const x0 = Math.floor((col * SAMPLE) / COLS);
      const x1 = Math.floor(((col + 1) * SAMPLE) / COLS);
      let lum = 0;
      let alpha = 0;
      let count = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * SAMPLE + x) * 4;
          const a = data[i + 3] / 255;
          const l =
            (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) /
            255;
          // Transparent pixels count as paper.
          lum += a * l + (1 - a);
          alpha += a;
          count++;
        }
      }
      values[row * COLS + col] = img ? lum / count : alpha / count;
      cover[row * COLS + col] = alpha / count;
    }
  }

  // Letters: ink is density. Pictures: how far each cell is from the
  // background (the corner's color), so the background drops out and the
  // thing on it shows. App icons use their own background, so a crown on
  // black reads as a crown.
  let density: Float32Array;
  if (!img) {
    density = values;
  } else {
    const inset = source.icon && source.width ? (1 - source.width) / 2 : 0;
    const field =
      values[Math.ceil(ROWS * inset) * COLS + Math.ceil(COLS * inset)];
    density = values.map((v, i) =>
      source.icon && cover[i] < 0.5 ? 0 : Math.abs(v - field),
    );
    let hi = 0;
    for (const d of density) hi = Math.max(hi, d);
    const span = Math.max(hi, 0.15);
    density = density.map((d) => d / span);
  }

  let out = "";
  for (const d of density) {
    const level = Math.min(Math.max(d, 0), 1) ** 0.85;
    out += RAMP[Math.round(level * (RAMP.length - 1))];
  }
  return out;
}

function lines(chars: string) {
  let out = "";
  for (let row = 0; row < ROWS; row++) {
    out += chars.slice(row * COLS, (row + 1) * COLS) + "\n";
  }
  return out;
}

// Each character flickers until its own moment, top rows a little sooner,
// then settles on the picture.
function scramble(
  target: string,
  pre: HTMLPreElement,
  onDone: () => void,
  duration = 640,
) {
  const settle = Array.from(
    target,
    (_, i) =>
      duration * (0.15 + Math.random() * 0.7) +
      Math.floor(i / COLS) * (duration / 45),
  );
  const start = performance.now();
  let frame = 0;
  const tick = (now: number) => {
    const t = now - start;
    let done = true;
    let out = "";
    for (let i = 0; i < target.length; i++) {
      if (t >= settle[i]) {
        out += target[i];
      } else {
        done = false;
        out +=
          Math.random() < 0.3
            ? RAMP[1 + Math.floor(Math.random() * (RAMP.length - 1))]
            : " ";
      }
      if (i % COLS === COLS - 1) out += "\n";
    }
    pre.textContent = out;
    if (done) onDone();
    else frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}

// Runs once the element scrolls near (or, with margin "0px", onto) the screen.
export function onceSeen(el: Element, run: () => void, margin = "120px") {
  const seen = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        seen.disconnect();
        run();
      }
    },
    { rootMargin: margin },
  );
  seen.observe(el);
  return () => seen.disconnect();
}

function Picture({ source }: { source: AsciiSource }) {
  if (!source.src) return null;
  const remote = source.src.startsWith("http");
  if (!source.width) {
    return (
      <Image
        src={source.src}
        alt=""
        fill
        unoptimized={remote}
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover"
      />
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`relative overflow-hidden ${
          source.icon ? "rounded-app-icon shadow-float ring-1 ring-black/5" : ""
        }`}
        style={{
          width: `${source.width * 100}%`,
          aspectRatio: source.ratio ?? 1,
        }}
      >
        <Image
          src={source.src}
          alt=""
          fill
          unoptimized={remote}
          sizes="(min-width: 1024px) 16vw, 40vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

const chars = (tone: "ink" | "muted") =>
  `absolute inset-0 m-0 select-none overflow-hidden whitespace-pre font-mono transition-[opacity,color] duration-300 motion-reduce:transition-none ${
    tone === "ink"
      ? "text-site-ink/70 group-hover:text-site-ink"
      : "text-site-muted group-hover:text-site-ink"
  }`;

export default function AsciiArt({
  source,
  reveal,
  active = false,
  tone = "ink",
  children,
}: {
  source: AsciiSource;
  /** There's a real picture to show. */
  reveal: boolean;
  /** The square is hovered or focused. */
  active?: boolean;
  tone?: "ink" | "muted";
  /** Hand-built art to show instead of `source.src`. */
  children?: React.ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);
  const pre = useRef<HTMLPreElement>(null);
  const target = useRef<string | null>(null);
  const stop = useRef(() => {});
  const wasActive = useRef(false);
  const [ready, setReady] = useState(false);
  const [settled, setSettled] = useState(false);
  const { bg, src, width, ratio, icon, glyph } = source;

  useEffect(() => {
    const el = box.current;
    const out = pre.current;
    if (!el || !out) return;
    setReady(false);
    setSettled(false);
    target.current = null;
    out.textContent = "";

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      if (cancelled) return;
      setReady(true);
      if (!window.matchMedia("(hover: hover)").matches) {
        timer = setTimeout(() => setSettled(true), 200);
      }
    };

    const run = async () => {
      const img = src ? await load(src).catch(() => null) : null;
      if (!img) await document.fonts.ready;
      if (cancelled) return;
      try {
        target.current = sample(
          { bg, src, width, ratio, icon, glyph },
          img,
          getComputedStyle(el).fontFamily,
        );
      } catch {
        // A picture from a host that doesn't allow reading it back.
      }
      if (!target.current) return finish();
      if (prefersReducedMotion()) {
        out.textContent = lines(target.current);
        return finish();
      }
      stop.current = scramble(target.current, out, finish);
    };

    const unobserve = onceSeen(el, run);
    return () => {
      cancelled = true;
      unobserve();
      stop.current();
      clearTimeout(timer);
    };
  }, [bg, src, width, ratio, icon, glyph]);

  // Leaving a square scrambles its characters back in.
  useEffect(() => {
    if (active) {
      wasActive.current = true;
      return;
    }
    if (!wasActive.current || !target.current || !pre.current) return;
    wasActive.current = false;
    if (prefersReducedMotion()) return;
    stop.current();
    stop.current = scramble(target.current, pre.current, () => {}, 380);
  }, [active]);

  const shown = reveal && ready && (settled || active);

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="relative aspect-square overflow-hidden [container-type:inline-size]"
    >
      {reveal && (
        <div
          className={`absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${
            shown ? "opacity-100" : "opacity-0"
          }`}
          style={bg ? { background: bg } : undefined}
        >
          {children ?? <Picture source={source} />}
        </div>
      )}
      <pre
        ref={pre}
        className={`${chars(tone)} ${shown ? "opacity-0" : "opacity-100"}`}
        style={charStyle}
      />
    </div>
  );
}

// A looping ASCII scene (scenes.ts), played while it's on screen.
export function AsciiScene({ scene }: { scene: SceneName }) {
  const box = useRef<HTMLDivElement>(null);
  const pre = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = box.current;
    const out = pre.current;
    if (!el || !out) return;
    const draw = SCENES[scene];
    if (prefersReducedMotion()) {
      out.textContent = draw(2600);
      return;
    }

    let frame = 0;
    let last = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      // About 16 frames a second, which reads as ASCII animation.
      if (now - last > 60) {
        out.textContent = draw(now - start);
        last = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const seen = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
    });
    out.textContent = draw(0);
    seen.observe(el);
    return () => {
      seen.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [scene]);

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="relative aspect-square overflow-hidden [container-type:inline-size]"
    >
      <pre ref={pre} className={chars("ink")} style={charStyle} />
    </div>
  );
}

const NOISE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>?";

// Text that decodes from random characters, left to right, each time `run`
// goes up (after `delay` ms). For mono labels, so the width never jumps.
export function ScrambleText({
  text,
  run,
  delay = 0,
}: {
  text: string;
  run: number;
  delay?: number;
}) {
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (!run || prefersReducedMotion()) {
      setShown(text);
      return;
    }
    const start = performance.now() + delay;
    let frame = 0;
    const tick = (now: number) => {
      const done = Math.floor((now - start) / 22);
      setShown(
        Array.from(text, (ch, i) =>
          ch === " " || i < done
            ? ch
            : NOISE[Math.floor(Math.random() * NOISE.length)],
        ).join(""),
      );
      if (done < text.length) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, text, delay]);

  return (
    <>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{text}</span>
    </>
  );
}
