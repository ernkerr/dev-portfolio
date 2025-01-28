"use client";

import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import { pressStart } from "../../../public/fonts/fonts";
// import Image from "next/image";

export default function Projects() {
  return (
    <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-900 dark:text-white">
      <nav>
        <Link href="/">Home</Link>
        {/* <Link href="/projects">Projects</Link> */}
        <Link href="/contact">Contact</Link>
      </nav>
      <div className="flex flex-row justify-around">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-start justify-start gap-8 p-16">
            <h1 className={`${pressStart.className} text-sm font-medium`}>
              Projects
            </h1>
            <p className="max-w-[200px] break-words text-xs">
              This is a showcase of my work. I&apos;m still learning and gaining
              skills every day.
            </p>
          </div>
          <div className="flex flex-col justify-center p-16">
            {/* <h2 className={`${pressStart.className} text-md`}>
              Personal Projects{" "}
            </h2> */}
            <div>
              <h2 className={`${pressStart.className} mb-4 text-2xl`}>
                <Link href="/carpoolio">CARPOOLIO</Link>
              </h2>
              {/* <h3 className={`${pressStart.className} mb-4 text-sm`}>
                approx 2 months
              </h3> */}
              <h2 className={`${pressStart.className} mb-4 text-2xl`}>
                Group Sing Along
              </h2>
              {/* <h3 className={`${pressStart.className} mb-4 text-sm`}>
                2 weeks
              </h3> */}
            </div>
          </div>
        </div>
      </div>
      <DarkModeToggle />
    </div>
  );
}
