"use client";

import Link from "next/link";
import { pressStart } from "../../../public/fonts/fonts";
import NavBar from "@/components/NavBar";

export default function Projects() {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
      <NavBar />
      <div className="flex flex-row justify-around">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-start justify-start gap-8 p-16">
              <h1 className={`${pressStart.className} text-lg font-medium`}>
                Projects
              </h1>
              <p className="max-w-[200px] break-words text-sm">
                I believe in the importance of continuous learning and gaining
                new skills every day. This is a showcase of my work, and
                highlights my growth as a developer.
              </p>
            </div>
            <div className="flex flex-col justify-center p-16">
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
                      className={`${pressStart.className} p-4 text-xl transition-colors duration-200 hover:bg-blue-600/20`}
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
                  <Link href="/groupsingalong">
                    <h2
                      className={`${pressStart.className} p-4 text-xl hover:bg-blue-600/20`}
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
