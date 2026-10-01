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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return mountAffinityMap(ref.current, data);
  }, []);

  return (
    <section
      aria-label="Portfolio affinity map"
      className={className}
      // The site header is sticky and 65px tall; the map's toolbar sits below it.
      style={{ "--am-sticky-top": "65px" } as CSSProperties}
    >
      <div ref={ref} />
    </section>
  );
}
