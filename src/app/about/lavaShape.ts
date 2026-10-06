// The lava lamp's size in its own units, its foot's middle on the board at
// 0, 0, for LavaLamp's drawing and for where Room puts it, by version. Kept
// out of LavaLamp.tsx, a client component, so Room (on the server) can read
// it. Lava lamp 1 is 72 tall, slim like the real one: its widest, the globe
// just above the collar, about a fifth of its height. Lava lamps 2 to 4 are
// the same drawn wider (sx) and taller (sy), nearly up to the board above.
const BIG = { width: 22, height: 79, sx: 1.3, sy: 76 / 72 };
export const LAVA = {
  1: { width: 16, height: 74, sx: 1, sy: 1 },
  2: BIG,
  3: BIG,
  4: BIG,
  5: BIG,
};
