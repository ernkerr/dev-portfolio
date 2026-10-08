import { useLayoutEffect } from "react";

// A popover over the room that would run off the side of the screen (on a
// phone, where the room's swiped across, it can open near an edge) slides
// back in, to a gutter (1.5rem) from the edge, each time it opens.
const GUTTER = 24;

export function useKeepOnScreen(
  ref: React.RefObject<HTMLElement | null>,
  open: boolean,
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!open || !el) return;
    el.style.translate = "";
    const { left, right } = el.getBoundingClientRect();
    const over = Math.min(0, window.innerWidth - GUTTER - right);
    const under = Math.max(0, GUTTER - left);
    const shift = under || over;
    if (shift) el.style.translate = `${shift}px 0`;
  }, [ref, open]);
}
