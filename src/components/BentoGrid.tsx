"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import ern from "../../public/erin.jpg";
import disco from "../../public/disco.svg";

import DarkModeToggle from "./DarkModeToggle";
import Disco from "./Disco";

import { pressStart, poiretOne } from "../../public/fonts/fonts";
import Projects from "./Projects";
import DiscoMode from "./DiscoMode";
import CurrentlyListening from "./CurrentlyListening";
// import CurrentlyReading from "./CurrentlyReading";

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
    <div className="relative flex justify-center items-center h-screen bg-slate-100 dark:bg-slate-900 perspective-[2000px]">
      {discoMode ? (
        <div>
          <DiscoMode discoMode={discoMode} toggleDiscoMode={toggleDiscoMode} />
        </div>
      ) : (
        // <DiscoMode discoMode={discoMode} toggleDiscoMode={toggleDiscoMode} />
        <div
          className="grid h-full w-full 
  grid-cols-12 grid-rows-9 
  sm:grid-cols-4 sm:grid-rows-4 
  md:grid-cols-8 md:grid-rows-6 
  lg:grid-cols-12 lg:grid-rows-9 
  gap-2
  md:gap-3 p-4 
  md:p-8 lg:p-16 xl:p-32 
  transition-all duration-500 ease-in-out"
        >
          <div className="col-span-full row-span-1  bg-blue-600 flex items-center rounded-lg shadow-md  transition-all duration-500 ease-in-out">
            <nav className="flex justify-between w-full items-center sm:m-4 md:m-6 lg:m-10">
              <a
                href="/"
                className="pl-3 py-2 text-md sm:text-sm med:text-med lg:text-lg font-medium text-gray-300 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-500 ease-in-out"
              >
                ERIN KERR
              </a>
              <div className="flex align-end">
                <Link
                  href={`/projects/`}
                  className="rounded-md px-3 py-2 text-xs sm:text-sm med:text-med lg:text-lg font-medium text-gray-300 hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out"
                >
                  PROJECTS
                </Link>
                <Link
                  href="/about/"
                  className="rounded-md px-3 py-2 text-xs sm:text-sm med:text-med lg:text-lg font-medium text-gray-300 hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out"
                >
                  {" "}
                  ABOUT
                </Link>
                <Link
                  href="/contact/"
                  className="rounded-md px-3 py-2 text-xs sm:text-sm med:text-med lg:text-lg font-medium text-gray-300 hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out"
                >
                  CONTACT
                </Link>
              </div>
            </nav>
          </div>
          <div className=" col-span-full sm:col-span-4 md:col-span-5 lg:col-span-5 row-span-2 sm:row-span-2 md:row-span-4 lg:row-span-4 bg-blue-600 flex items-end flex-start rounded-lg shadow-md text-white transition-all duration-500 ease-in-out">
            <div className="flex flex-col m-4 sm:m-6">
              <div
                className={`${poiretOne.className} text-2xl sm:text-3xl md:text-4xl lg:text-4xl transition-all duration-500 ease-in-out`}
              >
                Designer &
              </div>
              <div
                className={`${pressStart.className} text-med sm:text-lg lg:text-xl transition-all duration-500 ease-in-out`}
              >
                Front End Developer
              </div>
            </div>
          </div>
          <div className="col-span-5 row-span-3 lg:col-span-3 lg:row-span-4 bg-blue-600 flex items-center justify-center rounded-lg shadow-md transition-all duration-500 ease-in-out">
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
          <div className="col-span-7 row-span-6 lg:col-span-4 lg:row-span-6 bg-blue-600 flex items-center justify-center rounded-lg shadow-md text-white transition-all duration-500 ease-in-out">
            <Projects />
          </div>
          {/* col-span-2 row-start-12 row-span-2 */}
          <div
            className="
col-span-2 row-start-11 row-span-2
  md:col-span-2 md:row-span-1 
  lg:col-span-4 lg:row-span-3 
  bg-blue-600 flex items-center justify-center 
  rounded-lg shadow-md transition-all duration-500 ease-in-out
"
          >
            {/* Pencil Icon on Small Screens */}
            <div className="sm:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-white"
              >
                {/* Pencil Body */}
                <path
                  d="M16.862 3.487a2.109 2.109 0 1 1 2.979 2.979L8.25 18.058l-4.243 1.06 1.06-4.242L16.862 3.487z"
                  fill="currentColor"
                />

                {/* Pencil Tip */}
                <path
                  d="M3.75 19.25l1.06-4.242 3.182 3.182-4.242 1.06z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className="hidden sm:flex text-white">BLOGS</div>

            {/* If small, make it a pencil icon, if not, show some blogs */}
          </div>
          <div className="col-span-5 row-span-2 lg:col-span-4 lg:row-span-4 bg-blue-500  flex justify-start items-end rounded-lg shadow-md transition-all duration-500 ease-in-out">
            <Link href="/contact/">
              <div
                className={`text-white text-xs lg:text-5xl m-1 lg:m-3 transition-all duration-500 ease-in-out`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 lg:size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
                Contact <br /> Me
              </div>
            </Link>
          </div>
          <div className="col-span-full row-start-10 row-span-1 lg:col-span-4 lg:row-span-1 bg-blue-600 rounded-lg shadow-md text-white transition-all duration-500 ease-in-out">
            <CurrentlyListening />
          </div>
          <div className="col-span-2 row-span-2 lg:col-span-4 lg:row-span-1 bg-blue-600 flex items-center justify-center rounded-lg shadow-md transition-all duration-500 ease-in-out">
            {/* <CurrentlyReading /> */}
          </div>
          <div className="col-span-1 row-span-1 lg:col-span-1 lg:row-span-1 bg-blue-600 flex items-center justify-center rounded-lg shadow-md transition-all duration-500 ease-in-out">
            Project 8
          </div>
          {/* disco mode */}
          <div className="col-span-3 row-span-2 lg:col-span-1 lg:row-span-1 bg-blue-500 flex items-center justify-center rounded-lg shadow-md transition-all duration-500 ease-in-out">
            <button onClick={toggleDiscoMode} className=" text-white text-sm">
              <Disco />
            </button>
          </div>
          <div className="col-span-4 row-span-2 lg:col-span-2 lg:row-span-1 bg-blue-600 flex items-center justify-center rounded-lg shadow-md transition-all duration-500 ease-in-out">
            <DarkModeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

export default BentoGrid;

// photo:
// on hover: I'm Erin. A Designer, builder, and problem solver

// About Me
// my friends call me ern
// bento
//

// who is erin kerr:
// docs
// plants
// headphones
// dicsco balls
// bright electric blue

// tips:
// use semantic html
// keep archive
