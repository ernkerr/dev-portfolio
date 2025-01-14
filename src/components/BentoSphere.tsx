"use client";

import { useState, useEffect } from "react";

// project 0: Nav bar (ERIN KERR in left side, PROJECTS< ABOUT & CONTACT ON LEFT)

// project 1:

// project 2:

// project 3: List of projects
// carpoolio: link to page that goes through

// project 4:

// project 5: Contact Me

// project 6: Currently Listening.. (pull spotify API & connect to my account)

// project 7: Local Time (SAN FRANCISCO HH:MM )

// project 8: Github?

// project 9: Disco Mode

// project 10: Light / Dark Toggle

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
      className="relative flex justify-center items-center h-screen bg-slate-900 perspective-[2000px]"
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
            className="absolute top-0 left-0 w-60 h-80 bg-gray-700 flex items-center justify-center rounded-lg shadow-md text-white cursor-pointer"
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
            {/* Project 1 */}
            <div
              className="absolute w-60 h-40 bg-blue-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform: "translate(-50%, -50%) translateZ(400px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 1
            </div>{" "}
            {/* Project 2 */}
            <div
              className="absolute w-60 h-40 bg-green-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(36deg) translateZ(400px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 2
            </div>{" "}
            {/* Project 3 */}
            <div
              className="absolute w-60 h-40 bg-red-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(72deg) translateZ(400px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 3
            </div>
            {/* Project 4 */}
            <div
              className="absolute w-60 h-40 bg-yellow-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(108deg) translateZ(400px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 4
            </div>
            {/* Project 5 */}
            <div
              className="absolute w-60 h-40 bg-purple-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(144deg) translateZ(400px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 5
            </div>
            {/* Project 6 */}
            <div
              className="absolute w-60 h-40 bg-pink-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(180deg) translateZ(400px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 6
            </div>
            {/* Project 7 */}
            <div
              className="absolute w-60 h-40 bg-teal-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(216deg) translateZ(400px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 7
            </div>
            {/* Project 8 */}
            <div
              className="absolute w-60 h-40 bg-indigo-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(252deg) translateZ(400px)",
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
              className="absolute w-60 h-80 bg-gray-700 flex items-center justify-center rounded-lg shadow-md text-white cursor-pointer"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(288deg) translateZ(400px)",
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
              className="absolute w-60 h-40 bg-orange-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateY(324deg) translateZ(400px)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Project 10
            </div>
            {/* Top Row (angled upward) */}
            {/* Top 1 */}
            <div
              className="absolute w-60 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
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
              className="absolute w-60 h-40 bg-gray-600 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateX(45deg) translateY(100px) translateZ(400px) translateX(300px)  rotateY(0deg) ",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Top 2
            </div>
            {/* Bottom Row (angled downward) */}
            {/* Bottom 1 */}
            <div
              className="absolute w-60 h-40 bg-gray-500 flex items-center justify-center rounded-lg shadow-md text-white"
              style={{
                transform:
                  "translate(-50%, -50%) rotateX(-45deg)  translateY(100px) translateZ(400px)rotateY(0deg)",
                left: "50%",
                top: "50%",
                backfaceVisibility: "hidden",
              }}
            >
              Bottom 1
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
          <div className="col-span-5 row-span-4 bg-blue-500 flex items-center justify-center rounded-lg shadow-md">
            Project 1
          </div>
          <div className="col-span-3 row-span-4 bg-green-500 flex items-center justify-center rounded-lg shadow-md">
            Project 2
          </div>
          <div className="col-span-4 row-span-6 bg-red-500 flex items-center justify-center rounded-lg shadow-md">
            Project 3
          </div>
          <div className="col-span-4 row-span-3 bg-yellow-500 flex items-center justify-center rounded-lg shadow-md">
            Project 4
          </div>
          <div className="col-span-4 row-span-4 bg-blue-500 flex items-center justify-center rounded-lg shadow-md">
            Project 5
          </div>
          <div className="col-span-4 row-span-1 bg-green-500 flex items-center justify-center rounded-lg shadow-md">
            Project 6
          </div>
          <div className="col-span-4 row-span-1 bg-red-500 flex items-center justify-center rounded-lg shadow-md">
            Project 7
          </div>
          <div className="col-span-1 row-span-1 bg-yellow-500 flex items-center justify-center rounded-lg shadow-md">
            Project 8
          </div>
          {/* disco mode */}
          <div className="col-span-1 row-span-1 bg-blue-500 flex items-center justify-center rounded-lg shadow-md">
            <button onClick={toggleDiscoMode} className=" text-white text-sm">
              {discoMode ? "Turn Off Disco Mode" : "Disco Mode 🪩"}
            </button>
          </div>
          <div className="col-span-2 row-span-1 bg-green-500 flex items-center justify-center rounded-lg shadow-md">
            Project 10
          </div>
        </div>
      )}
    </div>
  );
};

export default BentoSphere;
