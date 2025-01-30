"use client";

// import CurrentlyReading from "@/components/CurrentlyReading";
import DarkModeToggle from "@/components/DarkModeToggle";
import { poiretOne } from "../../../public/fonts/fonts";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-100 text-white dark:bg-slate-900">
      <h1
        className={`${poiretOne.className} text-md flex items-center justify-start p-2 font-medium sm:p-3 md:p-6 md:text-lg lg:p-8 lg:text-4xl`}
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
