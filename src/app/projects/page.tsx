"use client";

import Link from "next/link";
import { pressStart } from "../../../public/fonts/fonts";
import NavBar from "@/components/NavBar";

export default function Projects() {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
      <NavBar />
      <div className="flex flex-row justify-around">
        <div className="flex min-h-screen md:items-center md:justify-center">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-start justify-start gap-8 p-4 pl-12 md:pl-16">
              <h1 className={`${pressStart.className} text-lg font-medium`}>
                Projects
              </h1>
              <p className="text-sm md:max-w-[200px] md:break-words">
                I believe in the importance of continuous learning and gaining
                new skills every day. This is a showcase of my work, and
                highlights my growth as a developer.
              </p>
            </div>
            <div className="flex flex-col justify-center p-10 md:pl-16">
              {/* <h2 className={`${pressStart.className} text-md`}>
                Personal Projects{" "}
              </h2> */}
              <div className="mb-8">
                <div className="rounded-lg border-2 border-white pt-4">
                  {/* Browser bar styling */}
                  <div className="border-b-2 border-white px-2 pb-2">
                    <div className="mb-2 flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  {/* Content */}
                  <Link href="/carpoolio">
                    <h2
                      className={`${pressStart.className} text-md p-4 transition-colors duration-200 hover:bg-blue-600/20 md:text-xl`}
                    >
                      Carpoolio
                    </h2>
                  </Link>
                </div>
              </div>

              <div className="mb-8">
                <div className="rounded-lg border-2 border-white pt-4">
                  {/* Browser bar styling */}
                  <div className="border-b-2 border-white px-2 pb-2">
                    <div className="mb-2 flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  {/* Content */}
                  <Link href="/groupSingAlong">
                    <h2
                      className={`${pressStart.className} text-md p-4 hover:bg-blue-600/20 md:text-xl`}
                    >
                      Group Sing Along
                    </h2>
                  </Link>
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
    </div>
  );
}
