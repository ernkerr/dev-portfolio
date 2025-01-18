"use client";

import CurrentlyReading from "@/components/CurrentlyReading";
import DarkModeToggle from "@/components/DarkModeToggle";
import { poiretOne } from "../../../public/fonts/fonts";

export default function About() {
  return (
    <div className=" bg-slate-100 dark:bg-slate-900 text-white">
      <h1
        className={`${poiretOne.className} flex justify-start items-center font-medium text-md md:text-lg lg:text-4xl p-2 sm:p-3 md:p-6 lg:p-8`}
      >
        Hello.
      </h1>
      <h2>
        Need a beautiful, well-structures website? Want to collaborate on a
        project together? Get in touch!
      </h2>
      <h3>
        Email: <a href={"/contact"}>erin.kerr17@gmail.com</a>
        <br />
        On the internet: LinkedIn / Twitter / Github
      </h3>

      <DarkModeToggle />
    </div>
  );
}
