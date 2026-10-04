"use client";

import { useSide } from "@/components/site/SideContext";
import SideSwitch from "@/components/site/SideSwitch";
import { label } from "@/components/site/prose";

// The real designer/engineer switch, so every swatch and specimen on the
// design system page can be checked on both sides.
export default function SideDemo() {
  const { engineer, setEngineer } = useSide();

  return (
    <div className="flex items-center gap-4">
      <SideSwitch
        engineer={engineer}
        onFlip={setEngineer}
        className="relative block h-12 w-24"
      />
      <p className={label}>{engineer ? "Engineer side" : "Designer side"}</p>
    </div>
  );
}
