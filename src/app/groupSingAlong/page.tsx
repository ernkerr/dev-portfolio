"use client";

import DarkModeToggle from "@/components/DarkModeToggle";
import { poiretOne } from "../../../public/fonts/fonts";

export default function GroupSingAlong() {
  return (
    <div className="min-h-screen bg-slate-100 text-white dark:bg-slate-900">
      <h1
        className={`${poiretOne.className} text-md flex items-center justify-center p-2 font-medium sm:p-3 md:p-6 md:text-lg lg:p-8 lg:text-4xl`}
      >
        Group Sing Along
      </h1>
      <h2>Subtitle </h2>
      {/* <p>I created this app for my stepdad </p> */}

      <DarkModeToggle />
    </div>
  );
}
