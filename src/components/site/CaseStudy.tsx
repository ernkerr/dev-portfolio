"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import SideSwitch from "./SideSwitch";
import SiteShell from "./SiteShell";
import { focusRing } from "./links";

// A project's case study, told from either side. The switch floats in the
// corner so readers can flip between the design and engineering write-ups
// from anywhere on the page. A side that isn't written yet shows a short
// "working on it" note instead, with the switch in the same corner and links
// to the written side and back to Work, so it's never a dead end.
export default function CaseStudy({
  project,
  engineerFirst,
  design,
  engineering,
}: {
  project: string;
  engineerFirst: boolean;
  design?: ReactNode;
  engineering?: ReactNode;
}) {
  const [engineer, setEngineer] = useState(engineerFirst);
  const writeUp = engineer ? engineering : design;

  function flip(next: boolean) {
    // The other write-up starts from its top.
    window.scrollTo({ top: 0, behavior: "instant" });
    setEngineer(next);
  }

  return (
    <>
      {writeUp ?? (
        <ComingSoon project={project} engineer={engineer} onFlip={flip} />
      )}
      <SideSwitch
        engineer={engineer}
        onFlip={flip}
        className="fixed bottom-5 right-5 z-50 h-12 w-24 shadow-switch ring-1 ring-white/15 md:bottom-8 md:right-8 md:h-14 md:w-28"
      />
    </>
  );
}

function ComingSoon({
  project,
  engineer,
  onFlip,
}: {
  project: string;
  engineer: boolean;
  onFlip: (engineer: boolean) => void;
}) {
  return (
    <SiteShell>
      <section className="max-w-[640px] pt-16 md:pt-28 lg:pt-40">
        <p className="font-mono text-label uppercase text-site-muted">
          {project} • {engineer ? "Engineering" : "Design"}
        </p>
        <h1 className="mt-4 font-serif text-display-sm md:text-display">
          The {engineer ? "engineering" : "design"} story for {project} is on
          its way.
        </h1>
        <p className="mt-6 text-[17px] text-site-muted">
          Until then, flip the switch to see how it was{" "}
          {engineer ? "designed" : "built"}.
        </p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-nav uppercase">
          <button
            type="button"
            onClick={() => onFlip(!engineer)}
            className={`uppercase text-site-blue underline-offset-4 hover:underline ${focusRing}`}
          >
            Read the {engineer ? "design" : "engineering"} side{" "}
            <span aria-hidden="true">→</span>
          </button>
          <Link
            href="/"
            className={`text-site-muted transition-colors hover:text-site-blue ${focusRing}`}
          >
            Back to Work
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
