"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import ern from "../../public/erin.jpg";
import disco from "../../public/disco.svg";

import DarkModeToggle from "./DarkModeToggle";
import Disco from "./Disco";

import { pressStart, poiretOne } from "../../public/fonts/fonts";
import Projects from "./Projects";
import DiscoMode from "./DiscoMode";
import CurrentlyListening from "./CurrentlyListening";

// project 3: List of projects
// carpoolio: link to page that goes through

// project 6: Currently Listening.. (pull spotify API & connect to my account)

// project 7: Local Time (SAN FRANCISCO HH:MM )

// project 8: Github?

// project 9: Disco Mode

const BentoGrid = () => {
  const [discoMode, setDiscoMode] = useState(false); // state to manage disco mode
  // const [rotationX, setRotationX] = useState(0);
  // const [rotationY, setRotationY] = useState(0);

  const toggleDiscoMode = () => {
    console.log("entering disco mode: 🪩");
    setDiscoMode((prevMode) => !prevMode);
  };

  return (
    <div
      className="relative flex justify-center items-center h-screen bg-slate-100 dark:bg-slate-900 perspective-[2000px]"
      // disco mode
    >
      {discoMode ? (
        <div>
          <DiscoMode discoMode={discoMode} toggleDiscoMode={toggleDiscoMode} />
        </div>
      ) : (
        // <DiscoMode discoMode={discoMode} toggleDiscoMode={toggleDiscoMode} />
        <div className="grid h-full w-full grid-cols-12 grid-rows-9 gap-3 p-20 xl:m-32 lg:m-16 md:m-8">
          <div className="col-span-12 row-span-1 bg-blue-600 flex items-center rounded-lg shadow-md">
            <nav className="flex justify-between w-full items-center m-10">
              <a
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:bg-blue-500 hover:text-white rounded-lg"
              >
                ERIN KERR
              </a>
              <div className="flex align-end">
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-blue-500 hover:text-white"
                >
                  PROJECTS
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-blue-500 hover:text-white"
                >
                  ABOUT
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-blue-500 hover:text-white"
                >
                  CONTACT
                </a>
              </div>
            </nav>
          </div>
          <div className="col-span-5 row-span-4 bg-blue-600 flex items-end flex-start rounded-lg shadow-md text-white text-xl">
            <div className="flex flex-col m-6">
              <div className={`${poiretOne.className} text-4xl`}>
                Designer &
              </div>
              <div className={pressStart.className}>Front End Developer</div>
            </div>
          </div>
          <div className="col-span-3 row-span-4 bg-blue-600 flex items-center justify-center rounded-lg shadow-md">
            <Image
              src={ern}
              alt="A photo of the author Erin Kerr"
              width={600}
              height={600}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                minHeight: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="rounded-lg"
              priority
            />
          </div>
          <div className="col-span-4 row-span-6 bg-blue-600 flex items-center justify-center rounded-lg shadow-md text-white">
            <Projects />
          </div>
          <div className="col-span-4 row-span-3 bg-blue-600 flex items-center justify-center rounded-lg shadow-md">
            Project 4
          </div>
          <div className="col-span-4 row-span-4 bg-blue-500  flex justify-start items-end rounded-lg shadow-md">
            <div className={`text-white text-5xl m-3`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
              Contact <br /> Me
            </div>
          </div>
          <div className="col-span-4 row-span-1 bg-blue-600 flex items-center justify-center rounded-lg shadow-md text-white">
            <CurrentlyListening />
          </div>
          <div className="col-span-4 row-span-1 bg-blue-600 flex items-center justify-center rounded-lg shadow-md">
            Project 7
          </div>
          <div className="col-span-1 row-span-1 bg-blue-600 flex items-center justify-center rounded-lg shadow-md">
            Project 8
          </div>
          {/* disco mode */}
          <div className="col-span-1 row-span-1 bg-blue-500 flex items-center justify-center rounded-lg shadow-md">
            <button onClick={toggleDiscoMode} className=" text-white text-sm">
              <Disco />
            </button>
          </div>
          <div className="col-span-2 row-span-1 bg-blue-600 flex items-center justify-center rounded-lg shadow-md">
            <DarkModeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

export default BentoGrid;
