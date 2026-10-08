"use client";

import { useEffect, useRef, useState } from "react";
import { focusRing } from "@/components/site/links";
import { label } from "@/components/site/prose";
import { FISH_MAX, NAME_MAX, tidyName } from "@/lib/aquarium";

// Drawing a fish to drop in the aquarium: a canvas, paints, an eraser,
// undo, and a name. What's sent is just the fish, trimmed to its edges and
// at most FISH_MAX, as a PNG with a clear background.

// The paints. They're what visitors draw with, not site colors.
const PAINTS = [
  "#1E1D1B",
  "#F25C54",
  "#FF9F1C",
  "#FFD23F",
  "#7BD389",
  "#2EC4B6",
  "#3A86FF",
  "#8338EC",
  "#FF70A6",
  "#FFFFFF",
];
const SIZES = [4, 9, 16];
const W = 480; // the canvas, in CSS pixels at full size
const H = 300;

export type Drawing = { name: string; image: string };

export default function DrawFish({
  onDrop,
  onClose,
  busy,
  error,
}: {
  onDrop: (drawing: Drawing) => void;
  onClose: () => void;
  busy: boolean;
  error: string | null;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const nameField = useRef<HTMLInputElement>(null);
  const [paint, setPaint] = useState(PAINTS[1]);
  const [erasing, setErasing] = useState(false);
  const [size, setSize] = useState(SIZES[1]);
  const [name, setName] = useState("");
  const [drawn, setDrawn] = useState(false);
  // Why it can't drop yet, said when someone tries anyway
  const [hint, setHint] = useState<string | null>(null);
  const ready = drawn && !!tidyName(name);
  const undo = useRef<ImageData[]>([]);
  const stroke = useRef<{ x: number; y: number } | null>(null);

  // The canvas is sharp on any screen: its pixels match the device's.
  useEffect(() => {
    const c = canvas.current!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = W * dpr;
    c.height = H * dpr;
    c.getContext("2d")!.scale(dpr, dpr);
  }, []);

  // Escape closes it
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onClose]);

  const ctx = () => canvas.current!.getContext("2d")!;
  const at = (e: React.PointerEvent) => {
    const rect = canvas.current!.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * W,
      y: ((e.clientY - rect.top) / rect.height) * H,
    };
  };

  const line = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const c = ctx();
    c.globalCompositeOperation = erasing ? "destination-out" : "source-over";
    c.strokeStyle = paint;
    c.fillStyle = paint;
    c.lineWidth = size;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.beginPath();
    c.moveTo(from.x, from.y);
    c.lineTo(to.x, to.y);
    c.stroke();
  };

  const down = (e: React.PointerEvent) => {
    e.preventDefault();
    canvas.current!.setPointerCapture(e.pointerId);
    const c = canvas.current!;
    undo.current = [...undo.current, ctx().getImageData(0, 0, c.width, c.height)].slice(-25);
    const p = at(e);
    stroke.current = p;
    line(p, { x: p.x + 0.01, y: p.y });
    if (!erasing) {
      setDrawn(true);
      setHint(null);
    }
  };
  const move = (e: React.PointerEvent) => {
    if (!stroke.current) return;
    const p = at(e);
    line(stroke.current, p);
    stroke.current = p;
  };
  const up = () => {
    stroke.current = null;
  };

  const backOne = () => {
    const last = undo.current.at(-1);
    if (!last) return;
    undo.current = undo.current.slice(0, -1);
    ctx().putImageData(last, 0, 0);
    if (!undo.current.length) setDrawn(false);
  };
  const clear = () => {
    const c = canvas.current!;
    undo.current = [...undo.current, ctx().getImageData(0, 0, c.width, c.height)].slice(-25);
    ctx().clearRect(0, 0, W, H);
    setDrawn(false);
  };

  // Just the fish: trimmed to what's drawn, scaled to fit FISH_MAX.
  const exportFish = () => {
    const c = canvas.current!;
    const { width, height } = c;
    const data = ctx().getImageData(0, 0, width, height).data;
    let x0 = width;
    let y0 = height;
    let x1 = -1;
    let y1 = -1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (data[(y * width + x) * 4 + 3] > 8) {
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
      }
    }
    if (x1 < 0) return null;
    const pad = 2;
    x0 = Math.max(0, x0 - pad);
    y0 = Math.max(0, y0 - pad);
    x1 = Math.min(width - 1, x1 + pad);
    y1 = Math.min(height - 1, y1 + pad);
    const sw = x1 - x0 + 1;
    const sh = y1 - y0 + 1;
    const scale = Math.min(1, FISH_MAX.w / sw, FISH_MAX.h / sh);
    const out = document.createElement("canvas");
    out.width = Math.max(1, Math.round(sw * scale));
    out.height = Math.max(1, Math.round(sh * scale));
    const o = out.getContext("2d")!;
    o.imageSmoothingQuality = "high";
    o.drawImage(c, x0, y0, sw, sh, 0, 0, out.width, out.height);
    return out.toDataURL("image/png").split(",")[1];
  };

  const drop = (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const image = drawn ? exportFish() : null;
    if (!image) return setHint("Draw your fish first!");
    const fishName = tidyName(name);
    if (!fishName) {
      setHint("Add a name first!");
      return nameField.current?.focus();
    }
    setHint(null);
    onDrop({ name: fishName, image });
  };

  const tool = `${label} border px-3 py-2 transition-colors hover:text-site-blue ${focusRing}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="draw-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-site-ink/40 px-gutter py-3"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={drop}
        className="w-full max-w-measure border border-site-line bg-site-paper p-4 shadow-float sm:p-5 ring-1 ring-black/5"
      >
        <div className="flex items-baseline justify-between gap-6">
          <h2 id="draw-title" className="font-serif text-subhead">
            Draw your fish
          </h2>
          <button type="button" onClick={onClose} className={`${label} hover:text-site-blue ${focusRing}`}>
            Close
          </button>
        </div>
        <p className="mt-1 text-body-sm text-site-ink/75">
          Draw it facing right; it turns around on its own.
        </p>

        <canvas
          ref={canvas}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          aria-label="Drawing area"
          className="mx-auto mt-4 block aspect-canvas touch-none border border-site-line bg-tank-surface/40"
          // As wide as the panel, unless the window is too short for that
          style={{ cursor: "crosshair", width: "min(100%, calc((100dvh - 370px) * 1.6))" }}
        />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Paint">
            {PAINTS.map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={!erasing && paint === p}
                aria-label={`Paint ${p}`}
                onClick={() => {
                  setPaint(p);
                  setErasing(false);
                }}
                className={`h-8 w-8 border ${!erasing && paint === p ? "border-site-ink outline outline-2 outline-offset-2 outline-site-blue" : "border-site-line"} ${focusRing}`}
                style={{ background: p }}
              />
            ))}
          </div>
          <div className="flex gap-2" role="radiogroup" aria-label="Brush size">
            {SIZES.map((s, i) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={size === s}
                onClick={() => setSize(s)}
                className={`${tool} ${size === s ? "border-site-ink text-site-ink" : "border-site-line"}`}
              >
                {["Thin", "Medium", "Thick"][i]}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={erasing}
            onClick={() => setErasing((v) => !v)}
            className={`${tool} ${erasing ? "border-site-ink text-site-ink" : "border-site-line"}`}
          >
            Eraser
          </button>
          <button type="button" onClick={backOne} className={`${tool} border-site-line`}>
            Undo
          </button>
          <button type="button" onClick={clear} className={`${tool} border-site-line`}>
            Clear
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-end gap-4">
          <label className="flex min-w-0 flex-1 flex-col gap-2">
            <span className={label}>Name</span>
            <input
              ref={nameField}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setHint(null);
              }}
              maxLength={NAME_MAX}
              placeholder="Bubbles"
              autoComplete="off"
              className={`border border-site-line bg-site-paper px-3 py-2 text-body text-site-ink placeholder:text-site-muted ${focusRing}`}
            />
          </label>
          <button
            type="submit"
            // Not ready still takes a click, to say what's missing
            disabled={busy}
            aria-disabled={!ready}
            className={`border px-5 py-2.5 font-mono text-nav uppercase transition-colors ${ready && !busy ? "border-site-ink bg-site-ink text-site-paper hover:border-site-blue hover:bg-site-blue" : "border-site-line bg-site-line text-site-muted"} ${focusRing}`}
          >
            {busy ? "Dropping it in..." : "Drop it in"}
          </button>
        </div>
        {(hint ?? error) && (
          <p role="alert" className="mt-4 text-body-sm text-site-ink">
            {hint ?? error}
          </p>
        )}
        <p className="mt-2 text-caption text-site-muted">
          It swims for you right away and for everyone once it&apos;s checked.
          Keep it kind: anything rude gets taken out.
        </p>
      </form>
    </div>
  );
}
