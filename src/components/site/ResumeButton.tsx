"use client";

import { LuDownload } from "react-icons/lu";
import { focusRing } from "./links";
import { RESUMES } from "./resumes";
import { useEngineerSide } from "./SideContext";

// Downloads the resume for the side the switch is on: the designer one on the
// designer side, the engineer one on the engineer side.
export default function ResumeButton({ className = "" }: { className?: string }) {
  const engineer = useEngineerSide();

  return (
    <a
      href={engineer ? RESUMES.engineer : RESUMES.designer}
      download
      className={`inline-flex items-center gap-2 border border-site-line px-4 py-2 font-mono text-label uppercase text-site-ink transition-colors hover:text-site-blue ${focusRing} ${className}`}
    >
      <LuDownload aria-hidden className="h-3.5 w-3.5" />
      {engineer ? "Engineer resume" : "Designer resume"}
    </a>
  );
}
