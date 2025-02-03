"use client";

import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import { pressStart } from "../../../public/fonts/fonts";
// import Image from "next/image";
import NavBar from "@/components/NavBar";

export default function Projects() {
  return (
    <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-900 dark:text-white">
      <NavBar />
      <div className="flex flex-row justify-around">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-start justify-start gap-8 p-16">
              <h1 className={`${pressStart.className} text-sm font-medium`}>
                Projects
              </h1>
              <p className="max-w-[200px] break-words text-xs">
                I believe in the importance of continuous learning and gaining
                new skills every day. This portfolio showcases a selection of my
                projects, highlighting my growth as a developer. Explore my work
                to see what I&apos;ve built.
              </p>
            </div>
            <div className="flex flex-col justify-center p-16">
              {/* <h2 className={`${pressStart.className} text-md`}>
                Personal Projects{" "}
              </h2> */}
              <div className="mb-8">
                <div className="rounded-lg border-2 border-black pt-4 dark:border-white">
                  {/* Browser bar styling */}
                  <div className="border-b-2 border-black px-2 pb-2 dark:border-white">
                    <div className="mb-2 flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  {/* Content */}
                  <h2
                    className={`${pressStart.className} p-4 text-xl transition-colors duration-200 hover:bg-blue-600/20`}
                  >
                    <Link href="/carpoolio">Carpoolio</Link>
                  </h2>
                </div>
              </div>

              <div className="mb-8">
                <div className="rounded-lg border-2 border-black pt-4 dark:border-white">
                  {/* Browser bar styling */}
                  <div className="border-b-2 border-black px-2 pb-2 dark:border-white">
                    <div className="mb-2 flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  {/* Content */}
                  <h2
                    className={`${pressStart.className} p-4 text-xl hover:bg-blue-600/20`}
                  >
                    <Link href="/groupsingalong">Group Sing Along</Link>
                  </h2>
                  {/* <Image
                    src="/groupsingalong2.png"
                    alt="Group Sing Along"
                    width={200}
                    height={200}
                    className="flex items-center justify-center rounded-lg"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DarkModeToggle />
    </div>
  );
}
