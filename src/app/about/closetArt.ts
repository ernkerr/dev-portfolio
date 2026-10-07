// What the closet (Closet.tsx) and my sunnies (ClosetSunnies.tsx) both
// draw with. A plain module, so the server drawing and the client button
// get the same numbers and the page hydrates cleanly.

// The same every time, like a seeded random; rounded, so the server and
// the browser, whose Math.sin can differ in its last digits, agree
export const jitter = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
};
export const f = (n: number) => n.toFixed(1);

// An ellipse as a path, so many can go in one
export const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
  `M${f(cx - rx)} ${f(cy)}a${f(rx)} ${f(ry)} 0 1 0 ${f(2 * rx)} 0a${f(rx)} ${f(ry)} 0 1 0 ${f(-2 * rx)} 0`;

// Tortoiseshell: `n` blobs scattered over a box, as two paths, the light
// ones and the dark ones, for a frame to show through a clip
export function mottle(
  seed: number,
  n: number,
  [x, y, w, h]: [number, number, number, number],
) {
  const light: string[] = [];
  const dark: string[] = [];
  for (let i = 0; i < n; i++) {
    const rx = 0.9 + jitter(seed + i + 200) * 1.6;
    const blob = ellipse(
      x + jitter(seed + i) * w,
      y + jitter(seed + i + 100) * h,
      rx,
      rx * (0.55 + jitter(seed + i + 300) * 0.4),
    );
    (i % 3 === 0 ? light : dark).push(blob);
  }
  return { light: light.join(""), dark: dark.join("") };
}
