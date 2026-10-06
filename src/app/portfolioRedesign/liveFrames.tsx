"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";

// Pages of erinkerr.me running live inside the case study: the 2026 homepage
// as the banner above the title, and the 2025 homepage in Problem. Each is a
// frame showing a browser window of a set size, cropped and scaled to the
// column. A frame keeps a page's motion, hovers, switches and dark mode to
// itself, so none of it can restyle the case study.

type Box = { w: number; h: number };

// Where a click on a link inside the frame goes. Links that leave the site
// always open in a new tab, since most outside sites refuse to load in a frame.
type LinkPolicy = "frame" | "page";

// The frame is same-origin, so it can catch clicks before the framed site's
// own link handling runs (a capture listener on its document comes first).
function setUpFrame(
  event: SyntheticEvent<HTMLIFrameElement>,
  inFrame: (url: URL) => boolean,
) {
  const doc = event.currentTarget.contentDocument;
  if (!doc) return;
  // On the local dev server Next.js puts its badge in the frame's corner (for
  // the 2025 page, flagging the archive's known nested-link bug). It never
  // ships.
  const style = doc.createElement("style");
  style.textContent = "nextjs-portal { display: none !important; }";
  doc.head.append(style);
  doc.addEventListener(
    "click",
    (click) => {
      const link = (click.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof doc.defaultView!.HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (inFrame(url)) return;
      click.preventDefault();
      click.stopPropagation();
      if (url.origin === window.location.origin) window.location.assign(url);
      else window.open(url, "_blank", "noopener");
    },
    true,
  );
}

function LiveFrame({
  src,
  title,
  view,
  crop,
  links,
  lazy = false,
  defer = false,
  className = "",
}: {
  src: string;
  title: string;
  /** The browser window size the page is laid out at. */
  view: Box;
  /** How much of that window shows, from the top left. */
  crop: Box;
  /** "frame" keeps links under src inside the frame; "page" opens them here. */
  links: LinkPolicy;
  lazy?: boolean;
  /** Wait until the case study has loaded and the browser is idle. */
  defer?: boolean;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [ready, setReady] = useState(!defer);
  const [shown, setShown] = useState(false);

  // A framed page is a whole second site, so a deferred frame starts loading
  // only once the case study's own text and images are in.
  useEffect(() => {
    if (!defer) return;
    let cancel = () => {};
    const start = () => {
      // Safari has no requestIdleCallback; a short timeout stands in.
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(() => setReady(true), {
          timeout: 2000,
        });
        cancel = () => window.cancelIdleCallback(id);
      } else {
        const id = setTimeout(() => setReady(true), 200);
        cancel = () => clearTimeout(id);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      cancel();
    };
  }, [defer]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / crop.w),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [crop.w]);

  const inFrame = (url: URL) =>
    links === "frame" &&
    url.origin === window.location.origin &&
    url.pathname.startsWith(src);

  return (
    <div
      ref={box}
      className={`relative overflow-hidden border border-site-line ${className}`}
      style={{ aspectRatio: `${crop.w} / ${crop.h}` }}
    >
      {/* Only once there's a width to scale to: a hidden frame (the other
          breakpoint's) never measures, so it never loads. */}
      {scale > 0 && ready && (
        <iframe
          src={src}
          title={title}
          loading={lazy ? "lazy" : "eager"}
          onLoad={(event) => {
            setUpFrame(event, inFrame);
            setShown(true);
          }}
          width={view.w}
          height={view.h}
          className={`absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-300 motion-reduce:transition-none ${
            shown ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}

// The 2026 homepage above the case study's title. A 2.4:1 banner keeps the
// title high on the first screen of a laptop. Its links open the real page, since a page
// cut to a banner would show cut off. Phones get the phone layout, which stays
// readable where the desktop one would shrink to a quarter size.
export function LiveHome2026() {
  return (
    <>
      <LiveFrame
        src="/"
        title="The 2026 homepage, live"
        view={{ w: 1440, h: 900 }}
        crop={{ w: 1440, h: 600 }}
        links="page"
        defer
        className="hidden bg-site-paper md:block"
      />
      <LiveFrame
        src="/"
        title="The 2026 homepage, live"
        view={{ w: 390, h: 844 }}
        crop={{ w: 390, h: 520 }}
        links="page"
        defer
        className="bg-site-paper md:hidden"
      />
    </>
  );
}

// The 2025 homepage in Problem, as a whole 1440 × 900 window. Links within the
// archive open right in the frame, like a small browser, and the 2025 logo
// leads back home.
export function Live2025Home() {
  return (
    <LiveFrame
      src="/archive/2025"
      title="The 2025 homepage, live from the archive"
      view={{ w: 1440, h: 900 }}
      crop={{ w: 1440, h: 900 }}
      links="frame"
      lazy
      className="bg-slate-900"
    />
  );
}
