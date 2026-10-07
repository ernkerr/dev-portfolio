// The ASCII grid every square on the Fun page shares, and the little
// looping scenes that stand in for the minigames until they're playable.
// Each scene is a function of time (ms) that returns 24 lines of 40
// characters, so it can be paused, replayed or drawn as a still.

// Geist Mono's characters are 0.6em wide, so 40 columns by 24 lines of 1em
// fill a square.
export const COLS = 40;
export const ROWS = 24;
// Light to dense.
export const RAMP = " .:-=+<>!?17IA80N@";

type Grid = string[][];

function blank(): Grid {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(" "));
}

// Writes text at a column and row. Spaces in the text are see-through.
function put(grid: Grid, x: number, y: number, text: string) {
  text.split("\n").forEach((line, dy) => {
    const row = grid[Math.round(y) + dy];
    if (!row) return;
    Array.from(line).forEach((ch, dx) => {
      const col = Math.round(x) + dx;
      if (ch !== " " && col >= 0 && col < COLS) row[col] = ch;
    });
  });
}

function render(grid: Grid) {
  return grid.map((row) => row.join("")).join("\n");
}

// A repeatable scatter, so every replay looks the same.
function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const ease = (p: number) => p * p * (3 - 2 * p);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// ---- Type a Book: Alice's first line types itself out on a keyboard. ----

const SENTENCE = "Alice was beginning to get very tired of sitting by her";
const SENTENCE_LINES = ["Alice was beginning to get", "very tired of sitting by her"];
const KEY_ROWS = ["q w e r t y u i o p", "a s d f g h j k l", "z x c v b n m"];

function typing(t: number) {
  const g = blank();
  const perChar = 110;
  const cycle = SENTENCE.length * perChar + 1800;
  const n = Math.min(SENTENCE.length, Math.floor((t % cycle) / perChar));
  const last = n < SENTENCE.length ? SENTENCE[n] : "";

  put(g, 4, 2, `.${"-".repeat(30)}.`);
  put(g, 4, 3, `|${" ".repeat(30)}|`);
  put(g, 4, 4, `|${" ".repeat(30)}|`);
  put(g, 4, 5, `|${" ".repeat(30)}|`);
  put(g, 4, 6, `'${"-".repeat(30)}'`);

  let left = n;
  let cursor = { x: 6, y: 3 };
  SENTENCE_LINES.forEach((line, i) => {
    const shown = line.slice(0, Math.max(0, left));
    put(g, 6, 3 + i * 2, shown);
    if (left >= 0 && left <= line.length) cursor = { x: 6 + left, y: 3 + i * 2 };
    left -= line.length + 1;
  });
  if (Math.floor(t / 420) % 2 === 0) put(g, cursor.x, cursor.y, "_");

  put(g, 3, 10, ` ${"_".repeat(32)}`);
  put(g, 3, 11, `|${" ".repeat(32)}|`);
  KEY_ROWS.forEach((keys, i) => {
    const row = `|${" ".repeat(32)}|`;
    put(g, 3, 12 + i * 2, row);
    put(g, 3, 13 + i * 2, row);
    const shown = keys
      .split(" ")
      .map((k) => (k === last.toLowerCase() ? k.toUpperCase() : k))
      .join("  ");
    put(g, 6 + i * 2, 12 + i * 2, shown);
  });
  put(g, 3, 18, `|${" ".repeat(32)}|`);
  put(g, 11, 18, last === " " ? "[################]" : "[________________]");
  put(g, 3, 19, `|${"_".repeat(32)}|`);
  return render(g);
}

// ---- Catch: things fall from the sky and a basket gets every one. ----

const FALLING = ["*", "o", "+", "@", "$"];
const SPAWN = 520;
const FALL = 85; // ms per row
const LAND_ROW = 20;

function catcher(t: number) {
  const g = blank();
  const colOf = (i: number) => 4 + Math.floor(hash(i) * 32);
  const landAt = (i: number) => i * SPAWN + LAND_ROW * FALL;

  const first = Math.max(0, Math.floor((t - LAND_ROW * FALL) / SPAWN) - 1);
  for (let i = first; i <= Math.floor(t / SPAWN); i++) {
    const row = (t - i * SPAWN) / FALL;
    if (row < 0 || row > LAND_ROW) continue;
    put(g, colOf(i), Math.floor(row), FALLING[i % FALLING.length]);
    if (row >= 1) put(g, colOf(i), Math.floor(row) - 1, "'");
  }

  // The basket glides from one landing spot to the next.
  let k = Math.max(0, Math.floor((t - LAND_ROW * FALL) / SPAWN));
  if (landAt(k) > t) k = Math.max(0, k - 1);
  const p = ease(Math.min(1, Math.max(0, (t - landAt(k)) / SPAWN)));
  const x = lerp(colOf(k), colOf(k + 1), p);
  put(g, x - 2, 21, "\\___/");
  put(g, 0, 22, "_".repeat(COLS));
  return render(g);
}

// ---- Dinosaur game: a long-necked dino hops cacti on a scrolling floor. ----

const DINO = [
  ["           @@ ", "          @@@@", "          @@  ", "         @@   ", "  @@@@@@@@    ", "@@@@@@@@@@    ", "  @@  @@      "],
  ["           @@ ", "          @@@@", "          @@  ", "         @@   ", "  @@@@@@@@    ", "@@@@@@@@@@    ", "   @@  @@     "],
];
const CACTUS = " #\n# #\n###\n #";
const EVERY = 1500;
const STEP = 42; // ms per column
const GROUND = 20;

function dino(t: number) {
  const g = blank();
  put(g, 0, GROUND, "_".repeat(COLS));
  const scroll = Math.floor(t / STEP);
  for (let c = 0; c < COLS; c++) {
    if (hash(c + scroll) > 0.86) put(g, c, GROUND + 1, ".");
    if (hash(c + scroll + 500) > 0.93) put(g, c, GROUND + 2, "`");
  }

  let lift = 0;
  for (let k = Math.max(0, Math.floor(t / EVERY) - 1); k <= t / EVERY; k++) {
    const x = COLS - (t - k * EVERY) / STEP;
    if (x > -4 && x < COLS) put(g, x, GROUND - 4, CACTUS);
    // Jump so the dino is highest as the cactus passes under it.
    const over = k * EVERY + (COLS - 8) * STEP;
    const p = (t - (over - 380)) / 760;
    if (p > 0 && p < 1) lift = Math.max(lift, 6 * 4 * p * (1 - p));
  }

  const legs = lift > 0 ? 0 : Math.floor(t / 140) % 2;
  put(g, 2, GROUND - 7 - Math.round(lift), DINO[legs].join("\n"));
  return render(g);
}

// ---- Claw game: the claw drops, grabs a prize and drops it in the chute. ----

const PILE_TOP = "    o   O  @   o  O   0  ";
const PILE = "  o O @ 0 o O @ o 0 O o @ O";
const TARGETS = [14, 23, 31, 18, 27];
const CHUTE = 5;

function claw(t: number) {
  const g = blank();
  put(g, 1, 0, `+${"-".repeat(36)}+`);
  put(g, 1, 1, `|${"=".repeat(36)}|`);
  for (let y = 2; y < 22; y++) put(g, 1, y, `|${" ".repeat(36)}|`);
  put(g, 1, 22, `+${"-".repeat(36)}+`);
  for (let y = 15; y < 22; y++) put(g, 3, y, "|   |");
  put(g, 3, 14, "_____");

  const cycle = 6000;
  const round = Math.floor(t / cycle);
  const tc = t % cycle;
  const target = TARGETS[round % TARGETS.length];

  const pile = [...PILE];
  const pileTop = [...PILE_TOP];
  const grabbed = tc > 2400 && tc < 5200;
  // The prize under the claw leaves the pile while it's carried.
  const pick = target - 9;
  const prize = pile[pick] !== " " ? pile[pick] : "o";
  if (grabbed && pile[pick]) pile[pick] = " ";
  put(g, 9, 19, pileTop.join(""));
  put(g, 9, 20, pile.join(""));
  put(g, 9, 21, "_".repeat(28));

  let x = CHUTE;
  let y = 3;
  let closed = false;
  if (tc < 1200) x = lerp(CHUTE, target, ease(tc / 1200));
  else if (tc < 2200) [x, y] = [target, lerp(3, 17, ease((tc - 1200) / 1000))];
  else if (tc < 2400) [x, y, closed] = [target, 17, true];
  else if (tc < 3400) [x, y, closed] = [target, lerp(17, 3, ease((tc - 2400) / 1000)), true];
  else if (tc < 4600) [x, y, closed] = [lerp(target, CHUTE, ease((tc - 3400) / 1200)), 3, true];
  else [x, y] = [CHUTE, 3];

  for (let r = 2; r < Math.round(y); r++) put(g, x, r, "|");
  put(g, x - 2, y, " _|_ \n" + (closed ? " ) ( " : "/   \\"));
  if (tc > 2200 && tc < 4600) put(g, x, y + 2, prize);
  if (tc >= 4600 && tc < 5200) put(g, CHUTE, lerp(5, 21, (tc - 4600) / 600), prize);
  return render(g);
}

// ---- The Game Boy game: the sprout hops across a Game Boy's screen. ----

// An opened Game Boy Advance SP, like the one Plant World plays on: the
// lid with its bumpers and screen, the hinge, and the buttons below.
const SP = [
  ".--------------------.",
  "| o        o       o |",
  "|  ________________  |",
  "| |                | |",
  "| |                | |",
  "| |                | |",
  "| |                | |",
  "| |                | |",
  "| |________________| |",
  "| o                o |",
  "'--------------------'",
  "(====================)",
  ".--------------------.",
  "|           .        |",
  "|    _               |",
  "|  _| |_     .----.  |",
  "| |_   _|   ( B  A ) |",
  "|   |_|      '----'  |",
  "|        . . .       |",
  "|         . .        |",
  "|   (o)  (o)         |",
  "'--------------------'",
];
const SPROUT = ["\\|/", " | ", "[_]"];

// Plant World: the sprout runs back and forth on the SP's screen after a
// blinking coin.
function gameboy(t: number) {
  const g = blank();
  const x = 9;
  const y = 1;
  put(g, x, y, SP.join("\n"));
  const span = 12;
  const step = Math.floor(t / 160) % (span * 2);
  const sx = step < span ? step : span * 2 - step;
  const hop = Math.floor(t / 160) % 4 === 1 ? 1 : 0;
  put(g, x + 4 + sx, y + 4 - hop, SPROUT.join("\n"));
  if (Math.floor(t / 600) % 2 === 0) put(g, x + 16 - sx, y + 4, "o");
  return render(g);
}

// ---- Happiness Generator, before you click: a dog that blinks. ----

const DOG = [
  "  __          __  ",
  " /  \\________/  \\ ",
  " \\  /        \\  / ",
  "  \\/  o    o  \\/  ",
  "  |            |  ",
  "  |    ____    |  ",
  "   \\   \\__/   /   ",
  "    \\___  ___/    ",
  "        \\/        ",
];

function dog(t: number) {
  const g = blank();
  const blink = t % 3200 < 160;
  const lines = [...DOG];
  if (blink) lines[3] = "  \\/  -    -  \\/  ";
  if (Math.floor(t / 500) % 2 === 0) lines[8] = "        U         ";
  put(g, 11, 6, lines.join("\n"));
  return render(g);
}

// ---- Steamed Up: a heart is wiped in the fog, drips, then fogs over. ----

const MIRROR = { x: 4, y: 3, w: 32, h: 17 };
const HEART = Array.from({ length: 90 }, (_, i) => {
  const t = (i / 89) * Math.PI * 2;
  return {
    x: MIRROR.w / 2 + 16 * Math.sin(t) ** 3 * 0.72,
    y: MIRROR.h / 2 - 0.5 - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.42,
  };
});

function mirror(t: number) {
  const g = blank();
  const { x: mx, y: my, w, h } = MIRROR;
  put(g, mx - 1, my - 1, `.${"-".repeat(w)}.`);
  for (let y = 0; y < h; y++) {
    put(g, mx - 1, my + y, "|");
    put(g, mx + w, my + y, "|");
  }
  put(g, mx - 1, my + h, `'${"-".repeat(w)}'`);

  const cycle = 7400;
  const round = Math.floor(t / cycle);
  const tc = t % cycle;
  const wiped = Math.min(1, tc / 2600);
  const refog = Math.min(1, Math.max(0, (tc - 5200) / 1800));
  const points = HEART.slice(0, Math.ceil(wiped * HEART.length));

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Characters are about twice as tall as they are wide.
      const clear = points.some((p) => Math.hypot((x - p.x) * 0.55, y - p.y) < 1.05);
      const fogged = !clear || hash(x * 53 + y * 7 + round * 1000) < refog;
      if (fogged) put(g, mx + x, my + y, hash(x * 31 + y * 17) > 0.45 ? ":" : ".");
    }
  }

  // Two drips run down from the heart before it fogs over, stopping at the
  // bottom of the glass.
  if (wiped === 1 && refog < 1) {
    for (const [from, delay] of [[HEART[45], 0], [HEART[62], 1.4]] as const) {
      const x = Math.round(from.x);
      const top = Math.round(from.y) + 1;
      const fall = Math.floor(Math.min(h - 1 - top, (tc - 2600) / 450 - delay));
      for (let k = 0; k <= fall; k++) put(g, mx + x, my + top + k, k === fall ? "o" : " ");
    }
  }
  return render(g);
}

export const SCENES = { typing, catcher, dino, claw, gameboy, dog, mirror };
export type SceneName = keyof typeof SCENES;
