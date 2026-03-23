"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { pressStart, poiretOne, geistMono } from "../../public/fonts/fonts";
import ern from "../../public/erin.jpg";
import DarkModeToggle from "./DarkModeToggle";
import Disco from "./Disco";
import Projects from "./Projects";
import DiscoMode from "./DiscoMode";
import CurrentlyListening from "./CurrentlyListening";
import LocationTime from "./LocationTime";
import Blogs from "./Blogs";
import CommitGraph from "./CommitGraph";
import Snowfall from "react-snowfall";

const BentoGrid = () => {
  const [discoMode, setDiscoMode] = useState(false); // state to manage disco mode
  const [showSnow, setShowSnow] = useState(false);

  useEffect(() => {
    setShowSnow(isSnowing());
  }, []);

  const isSnowing = () => {
    const today = new Date();
    if (today.getMonth() === 11) {
      return true;
    } else {
      return false;
    }
  };

  const toggleDiscoMode = () => {
    console.log("entering disco mode: 🪩");
    setDiscoMode((prevMode) => !prevMode);
  };

  return (
    <div className="perspective-[2000px] relative flex h-screen items-center justify-center overflow-y-auto bg-slate-100 text-white dark:bg-slate-900">
      {discoMode ? (
        <div>
          <DiscoMode discoMode={discoMode} toggleDiscoMode={toggleDiscoMode} />
        </div>
      ) : (
        <div className="grid h-full min-h-[650px] w-full min-w-[375px] transform-gpu grid-cols-12 grid-rows-9 gap-2 overflow-auto p-6 transition-all duration-700 ease-in-out will-change-transform sm:grid-cols-6 sm:grid-rows-6 sm:gap-2 sm:p-8 md:grid-cols-10 md:grid-rows-10 md:p-16 lg:grid-cols-12 lg:grid-rows-9 lg:p-20 xl:p-32">
          {showSnow && <Snowfall color="white" />}

          <div className="col-span-full row-span-1 flex transform-gpu items-center rounded-lg bg-blue-600 shadow-md transition-all duration-700 ease-in-out will-change-transform">
            <nav className="flex w-full items-center justify-between p-1">
              <Link
                href="/"
                className="text-md transform-gpu rounded-lg p-2 font-medium text-gray-300 transition-all duration-700 ease-in-out will-change-transform hover:bg-blue-500 hover:text-white sm:text-sm lg:text-lg"
              >
                <Image src="/ek.png" alt="Erin Kerr" width={225} height={225} className="h-[30px] w-[30px]" unoptimized />
              </Link>
              <div className="align-end flex">
                <Link
                  href={`/projects/`}
                  className="med:text-med transform-gpu rounded-md px-3 py-2 text-xs font-medium text-gray-300 transition-all duration-700 ease-in-out will-change-transform hover:bg-blue-500 hover:text-white sm:text-sm xl:text-lg"
                >
                  PROJECTS
                </Link>
                <Link
                  href="/about/"
                  className="med:text-med transform-gpu rounded-md px-3 py-2 text-xs font-medium text-gray-300 transition-all duration-700 ease-in-out will-change-transform hover:bg-blue-500 hover:text-white sm:text-sm xl:text-lg"
                >
                  {" "}
                  ABOUT
                </Link>
                <Link
                  href="/contact/"
                  className="med:text-med transform-gpu rounded-md px-3 py-2 text-xs font-medium text-gray-300 transition-all duration-700 ease-in-out will-change-transform hover:bg-blue-500 hover:text-white sm:text-sm xl:text-lg"
                >
                  CONTACT
                </Link>
              </div>
            </nav>
          </div>
          <div className="flex-start col-span-full row-span-2 flex transform-gpu items-end rounded-lg bg-blue-600 text-white shadow-md transition-all duration-700 ease-in-out will-change-transform sm:row-span-1 md:row-span-2 lg:col-span-5 lg:row-span-4">
            <div className="m-2 flex flex-col sm:m-2 lg:m-6">
              <div
                className={`${poiretOne.className} transform-gpu text-xl transition-all duration-700 ease-in-out will-change-transform sm:text-2xl md:text-4xl lg:text-4xl`}
              >
                Designer &
              </div>
              <div
                className={`${pressStart.className} text-med transform-gpu transition-all duration-700 ease-in-out will-change-transform sm:text-lg lg:text-xl`}
              >
                Full Stack Developer
              </div>
            </div>
          </div>
          <div className="col-span-5 row-span-3 flex transform-gpu items-center justify-center rounded-lg bg-blue-600 shadow-md transition-all duration-700 ease-in-out will-change-transform sm:col-span-2 sm:row-span-2 md:col-span-4 md:row-span-3 lg:col-span-3 lg:row-span-4">
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
              className="transform-gpu rounded-lg transition-all duration-700 ease-in-out will-change-transform"
              priority
            />
            {/* overlay with text */}
            <Link href="/about/">
              <div className="absolute inset-0 flex items-end rounded-lg bg-blue-500 opacity-0 transition-opacity duration-300 hover:cursor-pointer hover:opacity-75">
                <p className={`${geistMono.className} p-2 text-sm lg:text-xl`}>
                  I&apos;m Erin, <br /> a developer crafting experiences from
                  frontend to backend
                  {/* &apos; is a Next.js/React requirement for handling apostrophes in JSX to
                ensure proper HTML escaping. */}
                </p>
              </div>
            </Link>
          </div>
          <div className="col-span-7 row-span-6 transform-gpu overflow-auto rounded-lg bg-blue-600 text-white shadow-md transition-all duration-700 ease-in-out will-change-transform sm:col-span-2 sm:col-start-5 sm:row-span-6 sm:row-start-3 md:col-span-6 md:col-start-5 md:row-span-5 md:row-start-auto lg:col-span-4 lg:row-span-6">
            <Projects />
          </div>

          <div className="col-span-full row-span-2 row-start-10 flex transform-gpu items-center justify-center overflow-hidden rounded-lg bg-blue-600 shadow-md transition-all duration-700 ease-in-out will-change-transform sm:col-span-4 sm:row-span-3 md:col-span-5 md:col-start-6 md:row-span-2 md:row-start-9 lg:relative lg:col-span-4 lg:row-span-3 lg:row-start-auto">
            {/* select-none: applies the user-select property to the ascii art, preventing the user from selecting the text 
            leading-[0.85rem]: sets the line height (the vertical spacing between lines of text) to 0.85rem */}
            <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-end font-mono text-[0.85rem] leading-[0.85rem] text-white/40 opacity-70">
              {`⠀⠀⠀⠀⠀⠀⠀⢀⣤⠖⠂⠉⠉⠉⠀⠒⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⠀⣶⡟⢀⣴⣶⣿⣾⣶⣶⣄⡀⠈⠑⢤⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⡴⣫⣼⡿⣴⡟⠛⠉⠉⠛⠛⠿⣿⣿⣷⣦⡀⠙⢄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣼⢁⣟⡟⣷⠁⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣷⣆⠈⢣⡀⠀⠀⠀⠀⠀
⠀⢰⣿⢼⣿⣷⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⡆⠀⢱⠀⠀⠀⠀⠀
⠀⢸⡵⣾⣇⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣧⠀⠀⢧⠀⠀⠀⠀
⠀⠘⣴⣿⢯⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡿⠛⠉⠹⡆⠀⠀⠀
⢀⣼⣿⣧⠟⠁⢀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢯⣴⣶⣴⡇⠀⠀⠀
⢸⣿⣼⣿⣋⣉⠀⠀⠀⠈⠙⠦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣷⣷⡀⠀⠀
⢸⠁⠊⣿⠛⢛⢟⣦⡀⠀⠀⠀⠈⢆⠀⠀⠀⠀⢀⠔⣨⣶⡜⠂⠈⠽⣧⡀⠀
⠸⣶⣾⡯⠤⢄⡀⠵⢿⣦⡀⠀⠀⠀⡷⡄⠀⡰⢁⣾⣿⣿⣿⠀⠀⠀⣿⡹⡄
⠀⣿⣡⠦⢄⡀⠈⠳⣬⣹⣿⣆⠀⠀⢉⠻⣴⠇⣾⣿⡟⢻⠁⠀⠀⠀⣿⠁⡇
⠀⣿⡭⡀⠀⠈⠲⣦⣸⣿⣿⣿⣧⣀⠈⡔⣜⣴⣿⡟⢀⡎⡈⠀⠀⢰⡿⢠⣷
⠀⢸⣿⣄⣒⡀⡀⣿⣷⡿⣿⢿⣿⣷⡰⡸⣯⣏⣿⡷⢋⣼⣁⡢⢠⠟⠀⣼⣿
⠀⠀⠻⣷⣈⣁⣮⢻⢸⡇⢨⣿⣿⣿⣷⢶⣿⣏⣩⣶⣿⣿⣿⣿⡯⣤⣴⣿⠃
⠀⠀⠀⠘⠿⣿⣿⣽⣽⣷⣿⣿⣿⣿⣿⡶⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀
⠀⠀⠀⠀⠀⠀⠉⠙⠿⢿⣿⣿⣿⣿⠟⠁⠀⠘⠿⣿⣿⣿⠿⠟⠉⠀⠀⠀⠀`}
            </div>
            <div className="relative z-10 w-full">
              <CurrentlyListening />
            </div>
          </div>
          <div className="col-span-5 row-span-2 flex transform-gpu items-end justify-start rounded-lg bg-blue-500 shadow-md transition-all duration-700 ease-in-out will-change-transform sm:col-span-2 sm:col-start-3 sm:row-span-2 sm:row-start-3 md:col-span-4 md:col-start-auto md:row-span-2 md:row-start-auto lg:col-span-4 lg:row-span-4">
            <Link href="/contact/">
              <div
                className={`m-1 transform-gpu text-xl text-white transition-all duration-700 ease-in-out will-change-transform sm:m-2 sm:text-3xl md:m-1 md:text-2xl lg:text-5xl`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 transform-gpu transition-all duration-700 ease-in-out will-change-transform sm:size-6 md:size-4 lg:size-6"
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
          <Link
            href="/blog"
            className="col-span-2 row-span-1 flex transform-gpu items-center justify-center rounded-lg bg-blue-600 shadow-md transition-all duration-700 ease-in-out will-change-transform hover:scale-105 sm:col-span-1 sm:row-span-1 sm:row-start-5 md:col-span-5 md:row-span-2 lg:col-span-1 lg:row-span-1"
          >
            <Blogs />
          </Link>
          <div className="col-span-5 row-span-2 flex transform-gpu items-center justify-center rounded-lg bg-blue-600 shadow-md transition-all duration-700 ease-in-out will-change-transform sm:col-span-3 sm:row-span-2 md:col-span-4 md:row-span-3 md:row-start-11 lg:col-span-4 lg:col-start-auto lg:row-span-1 lg:row-start-auto">
            {/* <CurrentlyReading /> */}
            <LocationTime />
          </div>
          <div className="col-span-3 row-span-1 row-start-9 flex transform-gpu items-center justify-center rounded-lg bg-blue-600 text-xs shadow-md transition-all duration-700 ease-in-out will-change-transform sm:col-span-3 sm:col-start-1 sm:row-span-1 sm:row-start-5 md:col-span-2 md:row-span-3 md:row-start-11 lg:col-span-3 lg:col-start-9 lg:row-span-1 lg:row-start-8">
            <CommitGraph />
          </div>
          {/* disco mode */}
          <div className="col-span-3 row-span-2 flex transform-gpu items-center justify-center overflow-hidden rounded-lg bg-blue-500 shadow-md transition-all duration-700 ease-in-out will-change-transform sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-3 md:row-start-11 lg:col-span-2 lg:row-span-1 lg:row-start-auto">
            <button
              onClick={toggleDiscoMode}
              className="flex h-full w-full items-center justify-center text-sm text-white"
              disabled
            >
              <Disco />
            </button>
          </div>
          <div className="col-span-4 row-span-2 flex transform-gpu items-center justify-center rounded-lg bg-blue-600 shadow-md transition-all duration-700 ease-in-out will-change-transform sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-3 md:row-start-11 lg:col-span-2 lg:col-start-auto lg:row-span-1 lg:row-start-auto">
            <DarkModeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

export default BentoGrid;

// I&apos;m Erin. <br /> Blending design thinking with technical solutions
// I&apos;m Erin. <br /> A Developer passionate about clean code and continuous learning
// I&apos;m Erin. <br /> A Designer, builder, and problem solver
//A Developer creating seamless experiences across the stack
//  A Developer bridging design and development
// A Developer building digital experiences end to end
//
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
