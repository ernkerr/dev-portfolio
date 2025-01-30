"use client";

import CurrentlyReading from "@/components/CurrentlyReading";
import DarkModeToggle from "@/components/DarkModeToggle";
import { poiretOne } from "../../../public/fonts/fonts";

export default function About() {
  return (
    <div className="bg-slate-100 text-white dark:bg-slate-900">
      <h1
        className={`${poiretOne.className} text-md flex items-center justify-center p-2 font-medium sm:p-3 md:p-6 md:text-lg lg:p-8 lg:text-4xl`}
      >
        About Me
      </h1>
      <p>My friends call me ern</p>

      <p>I am a </p>
      <p>When I&aptos;m not coding I read,</p>
      <div className="relative flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
        <CurrentlyReading />
      </div>
      <p>travel</p>
      <p>cook</p>
      <p></p>
      <DarkModeToggle />
    </div>
  );
}
