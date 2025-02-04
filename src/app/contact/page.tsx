"use client";

// import CurrentlyReading from "@/components/CurrentlyReading";
import NavBar from "@/components/NavBar";

import { pressStart } from "../../../public/fonts/fonts";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <NavBar />
      <h1
        className={`${pressStart.className} text-md flex items-center justify-start p-8 pt-16 font-medium sm:p-16`}
      >
        Let&apos;s build something together.
      </h1>
      <h2 className="text-md p-2 pl-8 font-medium sm:pl-16 sm:pt-3 md:pt-6 lg:pt-8">
        Reach out if you&apos;re looking for a <br /> developer, have a
        question, or just want to connect
      </h2>
      <h3 className="text-md mb-8 pl-8 pt-2 sm:pl-16 sm:pt-3 md:pt-6 lg:pt-8">
        <a
          href="mailto:hello@erinkerr.me"
          className="mb-4 underline underline-offset-8"
        >
          hello@erinkerr.me
        </a>
      </h3>
    </div>
  );
}
