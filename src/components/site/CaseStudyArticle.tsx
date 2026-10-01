"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { focusRing, mono, serif } from "./links";

export type CaseStudySection = {
  /** Anchor for the section, e.g. "overview". */
  id: string;
  title: string;
  content?: ReactNode;
};

// A case study write-up: the title, then its sections, with a list of the
// sections pinned on the left. Each case study passes its own sections. The
// list marks the section being read in ink and the rest in muted gray, and
// clicking one scrolls to it.
export default function CaseStudyArticle({
  title,
  sections,
}: {
  title: string;
  sections: CaseStudySection[];
}) {
  const active = useActiveSection(sections);

  function jump(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    active.pin(id);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    // Keep the hash in the URL and move focus to the section, as a plain
    // anchor link would.
    window.history.replaceState(null, "", `#${id}`);
    target.focus({ preventScroll: true });
  }

  return (
    <div className="grid md:grid-cols-[1fr_minmax(0,48rem)_1fr] md:gap-8 lg:grid-cols-[1fr_minmax(0,56rem)_1fr]">
      {/* The sticky header is 65px tall; the list sits below it. */}
      <aside className="hidden min-w-40 self-start pt-20 md:sticky md:top-[65px] md:block">
        <nav aria-label="Sections">
          <ul className="flex flex-col items-start gap-2 text-[15px]">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active.id === s.id ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    jump(s.id);
                  }}
                  className={`transition-colors hover:text-site-ink ${
                    active.id === s.id ? "text-site-ink" : "text-site-muted"
                  } ${focusRing}`}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <article className="pt-16 md:pt-20">
        <h1
          className={`${serif} text-[40px] leading-[1.08] tracking-[-0.02em] md:text-[56px]`}
        >
          {title}
        </h1>

        <div className="mt-12 flex flex-col gap-12 md:mt-24 md:gap-24">
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              tabIndex={-1}
              aria-labelledby={`${s.id}-heading`}
              className="flex scroll-mt-24 flex-col gap-4 outline-none"
            >
              <h2
                id={`${s.id}-heading`}
                className={`${mono} text-[12px] uppercase tracking-[0.06em] text-site-muted`}
              >
                {s.title}
              </h2>
              {s.content}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}

// The section being read is the last one whose top has passed a line 30% of
// the way down the screen, or the last section once the page bottoms out.
// After a click the clicked section stays marked until the reader scrolls
// themselves, so a short section near the end still lights up when chosen.
function useActiveSection(sections: CaseStudySection[]) {
  const [id, setId] = useState(sections[0]?.id);
  const pinned = useRef<string | null>(null);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      if (pinned.current) return;
      const line = window.innerHeight * 0.3;
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      const atBottom =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1]?.id;
      setId(current);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function unpin() {
      pinned.current = null;
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("wheel", unpin, { passive: true });
    window.addEventListener("touchstart", unpin, { passive: true });
    window.addEventListener("keydown", unpin);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", unpin);
      window.removeEventListener("touchstart", unpin);
      window.removeEventListener("keydown", unpin);
    };
  }, [sections]);

  return {
    id,
    pin(next: string) {
      pinned.current = next;
      setId(next);
    },
  };
}
