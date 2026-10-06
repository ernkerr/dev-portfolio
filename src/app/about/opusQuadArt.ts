// Pieces of the Opus Quad's lit screens, shared by Room's drawing of it
// and the one you can play (OpusQuadLive). In the angled photo's pixels.

/** How far a waveform's beats run before they repeat, in pixels. */
export const BEATS = 96;

// One deck's waveform on the touchscreen, as bars a few pixels apart in
// three bands, lows (tallest), mids and highs, centered on cy. The beats
// repeat every BEATS pixels, the stretch the dj-scroll animation slides it
// by, so it scrolls on without a seam. It runs from the screen's left edge
// past its right by that much.
export function waveBands(cy: number, phase: number) {
  const bands = { low: "", mid: "", high: "" };
  for (let i = 0; i * 4 < 190 + BEATS; i++) {
    const j = (i + phase) % 24;
    const beat = j % 6; // a kick every 6 bars
    const low =
      beat === 0 ? 9 : beat === 1 ? 7 : 2.5 + 2 * Math.abs(Math.sin(j * 1.7));
    const mid = 1.5 + 3 * Math.abs(Math.sin(j * 2.3 + 1));
    const high = 0.8 + 1.6 * Math.abs(Math.sin(j * 3.1 + 0.5));
    const bar = (h: number) =>
      `M${352 + i * 4} ${(cy - h).toFixed(1)}h3v${(2 * h).toFixed(1)}h-3Z`;
    bands.low += bar(low);
    bands.mid += bar(mid);
    bands.high += bar(high);
  }
  return bands;
}

// A whole track's waveform, small, from x0 to x1 centered on cy.
export function overviewBars(x0: number, x1: number, cy: number, seed: number) {
  let d = "";
  for (let x = x0, k = seed; x < x1; x += 3, k++) {
    const h = 0.8 + 2.4 * Math.abs(Math.sin(k * 0.37) * Math.cos(k * 0.11));
    d += `M${x} ${(cy - h).toFixed(1)}h2v${(2 * h).toFixed(1)}h-2Z`;
  }
  return d;
}
