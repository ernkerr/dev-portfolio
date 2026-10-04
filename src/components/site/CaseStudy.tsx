"use client";

import { useState, type ReactNode } from "react";
import SideSwitch from "./SideSwitch";
import SiteShell from "./SiteShell";

// A project's case study, told from either side. On a written-up side the
// switch floats in the corner so readers can flip between the design and
// engineering write-ups from anywhere on the page. A side that isn't written
// yet shows a short note instead, with the switch right under it.
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

  if (!writeUp) {
    return <ComingSoon project={project} engineer={engineer} onFlip={flip} />;
  }

  return (
    <>
      {writeUp}
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
        <SideSwitch
          engineer={engineer}
          onFlip={onFlip}
          className="relative mt-8 block h-14 w-28 md:mt-10 md:h-20 md:w-40"
        />
      </section>
    </SiteShell>
  );
}
