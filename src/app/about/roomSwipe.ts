// The room swiped sideways (on a phone, FinalRoom scrolls across): every
// sideways scroll of anything on the page, as how far it went, in screen
// pixels, rightward positive, so what hangs or sways in the room can swing
// as it's carried along (Swish.tsx, DraggableCord.tsx). One scroll listener
// for all of them, while any is listening.
type Swipe = (scroller: Element, dx: number, t: number) => void;
const swipes = new Set<Swipe>();
const lefts = new WeakMap<Element, number>();

const onScroll = (e: Event) => {
  const el = e.target;
  if (!(el instanceof Element)) return;
  const left = el.scrollLeft;
  const was = lefts.get(el);
  lefts.set(el, left);
  if (was === undefined || left === was) return;
  swipes.forEach((swipe) => swipe(el, left - was, e.timeStamp));
};

export function onSwipe(swipe: Swipe) {
  if (!swipes.size)
    document.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });
  swipes.add(swipe);
  return () => {
    swipes.delete(swipe);
    if (!swipes.size)
      document.removeEventListener("scroll", onScroll, { capture: true });
  };
}
