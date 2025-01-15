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

// project 3: List of projects
// carpoolio: link to page that goes through

// project 6: Currently Listening.. (pull spotify API & connect to my account)

// project 7: Local Time (SAN FRANCISCO HH:MM )

// project 8: Github?

// project 9: Disco Mode

const BentoSphere = () => {
  const [discoMode, setDiscoMode] = useState(false); // state to manage disco mode
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  const toggleDiscoMode = () => {
    setDiscoMode((prevMode) => !prevMode);
  };

  // Handle mouse movement for smooth rotation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (discoMode) {
        const rotateY = (e.clientX / window.innerWidth - 0.5) * 720;
        const rotateX = -(e.clientY / window.innerHeight - 0.5) * 720;
        setRotationY(rotateY);
        setRotationX(rotateX);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [discoMode]);

  return (
    <div
      className="relative flex justify-center items-center h-screen bg-slate-100 dark:bg-slate-900 perspective-[2000px]"
      // disco mode
      // onMouseMove={(e) => {
      //   if (discoMode) {
      //     const rotateAmount = (e.clientX / window.innerHeight - 0.5) * 360;
      //     setRotationY(rotateAmount);
      //   }
      // }}
      // transformation animation across the z axis
      // use z to put outward towords the screen
      // can we use the z transform property animation (translate z to push all of the elements out
    >
      {discoMode ? (
        <>
          {/* Disco Mode Toggle */}
          <div
            className="absolute top-0 left-0 w-40 h-80 bg-gray-700 flex items-center justify-center rounded-lg shadow-md text-white cursor-pointer"
            onClick={toggleDiscoMode}
          >
            {discoMode ? "Turn Off Disco Mode 🪩" : "Disco Mode "}
          </div>{" "}
          <div
            className="relative w-[800px] h-[800px] "
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {/* Center cap - top */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-full shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateX(90deg) translateZ(380px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Top Cap
            </div>
            {/* Row 1 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(18deg) rotateX(58.5deg) translateZ(380px) translateY(0px) ",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Row 1 - 1
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%)  rotateY(90deg)  translateY(0px) rotateX(58.5deg)translateZ(380px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Row 1 - 2
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%)  rotateY(162deg)  translateY(0px) rotateX(58.5deg)translateZ(380px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Row 1 - 3
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%)  rotateY(234deg)  translateY(0px) rotateX(58.5deg)translateZ(380px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Row 1 - 4
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%)  rotateY(306deg)  translateY(0px) rotateX(58.5deg)translateZ(380px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Row 1 - 5
            </div>
            {/* Project 1 */}
            <div
              className="absolute w-40 h-40 bg-blue-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform: "translate(-50%, -50%) translateZ(425px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 1
            </div>{" "}
            {/* Project 2 */}
            <div
              className="absolute w-40 h-40 bg-green-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(36deg) translateZ(425px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 2
            </div>{" "}
            {/* Project 3 */}
            <div
              className="absolute w-40 h-40 bg-red-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(72deg) translateZ(425px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 3
            </div>
            {/* Project 4 */}
            <div
              className="absolute w-40 h-40 bg-yellow-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(108deg) translateZ(425px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 4
            </div>
            {/* Project 5 */}
            <div
              className="absolute w-40 h-40 bg-purple-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(144deg) translateZ(425px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 5
            </div>
            {/* Project 6 */}
            <div
              className="absolute w-40 h-40 bg-pink-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(180deg) translateZ(425px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 6
            </div>
            {/* Project 7 */}
            <div
              className="absolute w-40 h-40 bg-teal-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(216deg) translateZ(425px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 7
            </div>
            {/* Project 8 */}
            <div
              className="absolute w-40 h-40 bg-indigo-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(252deg) translateZ(425px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 8
            </div>
            {/* disco mode */}
            {/* Disco Mode Toggle */}
            <div
              className="absolute w-40 h-40 bg-gray-700 flex items-center justify-center rounded-lg shadow-md text-white cursor-pointer"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(288deg) translateZ(425px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
              onClick={toggleDiscoMode}
            >
              {discoMode ? "Turn Off Disco" : "Disco Mode 🪩"}
            </div>
            {/* Project 10 */}
            <div
              className="absolute w-40 h-40 bg-orange-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(324deg) translateZ(425px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 10
            </div>
            {/* Second Row (angled upward) */}
            {/* Top 1 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateX(45deg) translateZ(400px) translateY(100px) rotateY(0deg)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Top 1
            </div>
            {/* Top 2 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(36deg) rotateX(45deg) translateZ(400px)  translateY(100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Top 2
            </div>
            {/* Top 3 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(72deg) rotateX(45deg) translateZ(400px) translateY(100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Top 3
            </div>
            {/* Top 4 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(108deg) rotateX(45deg) translateZ(400px) translateY(100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Top 4
            </div>
            {/* Top 5 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(144deg) rotateX(45deg) translateZ(400px) translateY(100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Top 5
            </div>
            {/* Top 6 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(180deg) rotateX(45deg) translateZ(400px) translateY(100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Top 6
            </div>
            {/* Top 7 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(216deg) rotateX(45deg) translateZ(400px) translateY(100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Top 7
            </div>
            {/* Top 8 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(252deg) rotateX(45deg) translateZ(400px) translateY(100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Top 8
            </div>
            {/* Top 9 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(288deg) rotateX(45deg) translateZ(400px) translateY(100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Top 9
            </div>
            {/* Top 10 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(324deg) rotateX(45deg) translateZ(400px) translateY(100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Top 10
            </div>
            {/* Bottom Row (angled downward) */}
            {/* Bottom 1 */}
            {/* <div
              className="absolute w-40 h-60 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateX(-45deg)  translateY(100px) translateZ(400px)rotateY(0deg)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom 1
            </div> */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateX(-45deg) translateZ(400px) translateY(-100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom 1
            </div>
            {/* Bottom 2 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(36deg) rotateX(-45deg) translateZ(400px) translateY(-100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom 2
            </div>
            {/* Bottom 3 */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(72deg) rotateX(-45deg) translateZ(400px) translateY(-100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom 3
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(108deg) rotateX(-45deg) translateZ(400px) translateY(-100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom 4
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(144deg) rotateX(-45deg) translateZ(400px) translateY(-100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom 5
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(180deg) rotateX(-45deg) translateZ(400px) translateY(-100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom 6
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(216deg) rotateX(-45deg) translateZ(400px) translateY(-100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom 7
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(252deg) rotateX(-45deg) translateZ(400px) translateY(-100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom 8
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(288deg) rotateX(-45deg) translateZ(400px) translateY(-100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom 9
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(324deg) rotateX(-45deg) translateZ(400px) translateY(-100px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom 10
            </div>
            {/* very bottom row  */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(18deg) rotateX(-58.5deg) translateZ(380px) translateY(0px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Row 5 - 1
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(90deg) rotateX(-58.5deg) translateZ(380px) translateY(0px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Row 5 - 2
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(162deg) rotateX(-58.5deg) translateZ(380px) translateY(0px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Row 5 - 3
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(234deg) rotateX(-58.5deg) translateZ(380px) translateY(0px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Row 5 - 4
            </div>
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(306deg) rotateX(-58.5deg) translateZ(380px) translateY(0px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Row 5 - 4
            </div>
            {/* Center cap - bottom */}
            <div
              className="absolute w-40 h-40 bg-gray-500 flex items-center justify-center rounded-full shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateX(-90deg) translateZ(380px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom Cap
            </div>
          </div>
        </>
      ) : (
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
          <div className="col-span-4 row-span-1 bg-blue-600 flex items-center justify-center rounded-lg shadow-md">
            Project 6
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

export default BentoSphere;
