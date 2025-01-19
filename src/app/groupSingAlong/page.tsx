"use client";

import DarkModeToggle from "@/components/DarkModeToggle";
import { poiretOne } from "../../../public/fonts/fonts";

export default function GroupSingAlong() {
  return (
    <div className=" bg-slate-100 dark:bg-slate-900 text-white">
      <h1
        className={`${poiretOne.className} flex justify-center items-center font-medium text-md md:text-lg lg:text-4xl p-2 sm:p-3 md:p-6 lg:p-8`}
      >
        Group Sing Along
      </h1>
      <h2>Subtitle </h2>
      {/* <p>I created this app for my stepdad </p> */}

      <DarkModeToggle />
    </div>
  );
}
