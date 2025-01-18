"use client";

import CurrentlyReading from "@/components/CurrentlyReading";
import DarkModeToggle from "@/components/DarkModeToggle";
import { poiretOne } from "../../../public/fonts/fonts";

export default function About() {
  return (
    <div className=" bg-slate-100 dark:bg-slate-900 text-white">
      <h1
        className={`${poiretOne.className} flex justify-center items-center font-medium text-md md:text-lg lg:text-4xl p-2 sm:p-3 md:p-6 lg:p-8`}
      >
        About Me
      </h1>
      <p>My friends call me ern</p>

      <p>I am a </p>
      <p>When I'm not coding I read,</p>
      <div className="relative flex justify-center items-center h-screen bg-slate-100 dark:bg-slate-900 ">
        <CurrentlyReading />
      </div>
      <p>travel</p>
      <p>cook</p>
      <p></p>
      <DarkModeToggle />
    </div>
  );
}
