"use client";

import DarkModeToggle from "@/components/DarkModeToggle";
import { poiretOne } from "../../../public/fonts/fonts";

export default function Projects() {
  return (
    <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-900 dark:text-white">
      <h1
        className={`${poiretOne.className} text-md flex items-center justify-center p-2 font-medium sm:p-3 md:p-6 md:text-lg lg:p-8 lg:text-4xl`}
      >
        Projects
      </h1>
      <h2>Subtitle </h2>

      <DarkModeToggle />
    </div>
  );
}
