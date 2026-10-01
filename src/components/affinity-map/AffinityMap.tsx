"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import data from "./affinity.json";
import { mountAffinityMap } from "./affinity-map.js";
import "./affinity-map.css";

// Interactive affinity map of what designer job posts ask a portfolio to
// show. The map itself is framework-free (affinity-map.js) and this only
// mounts it. The data is a dated snapshot that ships with the site, so it
// keeps working after the postings close. Regenerate affinity.json with
// career-ops/data/portfolio-affinity/build.mjs.
export default function AffinityMap({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  // The case study introduces the map, so it skips its own lede and stats.
  useEffect(() => {
    if (!ref.current) return;
    return mountAffinityMap(ref.current, data, { intro: false });
  }, []);

  // The wall of notes runs past the text column to the right edge of the
  // page, so it measures the gap and hands it to the map's CSS.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function measure() {
      const gap =
        document.documentElement.clientWidth -
        section!.getBoundingClientRect().right;
      section!.style.setProperty("--am-bleed-right", `${Math.max(0, gap)}px`);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Portfolio affinity map"
      className={className}
      // The site header is sticky and 65px tall; the map's toolbar sits below it.
      style={{ "--am-sticky-top": "65px" } as CSSProperties}
    >
      <div ref={ref} />
    </section>
  );
}
