import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { geistMono } from "../../public/fonts/fonts";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = [
    {
      name: "Carpoolio",
      link: "/carpoolio",
      description:
        "A sleek web app that simplifies group travel. Organize rides, manage passengers, and streamline trips with ease.",
      image: "/carpoolio.png",
    },
    {
      name: "Group Sing Along",
      link: "/groupSingAlong",
      description:
        "An interactive platform that allows users to form or join singing groups. Effortlessly search for song lyrics and synchronize them in real-time.",
      image: "/groupSingAlongLogo.png",
    },
    {
      name: "My Tea Cupboard",
      link: "/projects",
      description:
        "A platform for tea enthusiasts to track their tea collections and share their favorite teas with others.",
      image: "/myTeaCupboard.png",
    },
    // A platform for group singing enthusiasts to create and manage sing-along events.
    // Easily search for song lyrics, curate a playlist, and synchronize lyrics display for a seamless group singing experience.
    //   "A real-time group karaoke platform for singing together online.",
    //  is a platform that enables users to create or join virtual singing groups,
    //fostering community and shared musical experiences online
  ];

  return (
    <div>
      <div className="w-full">
        <>
          <ul className="md:space-y-6">
            {projects.map((project, index) => (
              <li
                key={index}
                className={`border-1 group relative cursor-pointer border-blue-500 p-4 ${
                  activeIndex === index ? "" : ""
                } `}
                onClick={() => setActiveIndex(index)} // set index (active project)
              >
                <h3
                  className={`${geistMono.className} text-xs text-blue-100 sm:text-sm md:text-lg`}
                >
                  {project?.name}
                </h3>

                {/* Underline */}
                <div
                  className={`absolute bottom-0 left-0 ml-2 h-1 cursor-pointer rounded-sm bg-blue-500 transition-all duration-500 lg:ml-4 ${
                    activeIndex === index
                      ? "w-[90%]"
                      : "w-[90%] group-hover:w-40"
                  }`}
                ></div>

                {activeIndex === index && (
                  <>
                    <p className="text-xs text-blue-300">
                      {project?.description}
                    </p>
                    <Link href={project?.link}>
                      <Image
                        key={index}
                        src={project?.image || "/default-image.png"}
                        alt={project?.name}
                        height={75}
                        width={100}
                        // width={100}
                        style={{
                          minHeight: "75px",

                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        className="rounded-xl object-cover p-2"
                      />
                    </Link>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      </div>
      {/* <div
        key={activeIndex}
        className="transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-90"
      >
        <a
          href={projects[activeIndex].link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-gray-300 hover:underline"
        >
          {projects[activeIndex].name}
        </a>
        <p className="text-sm text-blue-400">
          {projects[activeIndex].description}
        </p>

        <img
          src={projects[activeIndex].image}
          alt={projects[activeIndex].name}
          className="w-full h-auto object-cover rounded-md"
        />
      </div>

      <ul className="space-y-2">
        {projects.map((project, index) => (
          <li></li>
        ))}
      </ul> */}
    </div>
  );
}
