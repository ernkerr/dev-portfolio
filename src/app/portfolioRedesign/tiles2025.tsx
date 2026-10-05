"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Disco from "@/app/archive/2025/_components/Disco";
import { a } from "@/app/archive/2025/_lib/base";
import { Caption } from "@/components/site/prose";
import { geistMono, poiretOne, pressStart } from "../../../public/fonts/fonts";

// The three 2025 homepage tiles that findings 1–3 point at, rendered from the
// 2025 code instead of cropped from a screenshot. Disco is the archived
// component itself. The rest are copies, so the frozen archive stays as it
// shipped: the headline tile was inline markup in the 2025 BentoGrid; the
// projects list nests its cybergoose.org link inside each card's link, which
// breaks hydration here, so that link is plain text in the copy; and the
// dark-mode toggle switches the whole page to dark mode when it mounts, which
// would restyle this site.

// The 2025 page's navy background, so the tiles sit where they used to.
function Stage({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure>
      <div className="flex justify-center bg-slate-900 p-5 sm:p-8">
        {children}
      </div>
      <Caption>{caption}</Caption>
    </figure>
  );
}

export function HeadlineTile2025() {
  return (
    <Stage caption="The 2025 headline tile, rebuilt from its code.">
      <div className="flex aspect-[489/282] w-full max-w-[489px] items-end rounded-lg bg-blue-600 text-white shadow-md">
        <div className="m-2 flex flex-col sm:m-2 lg:m-6">
          <div
            className={`${poiretOne.className} text-xl sm:text-2xl md:text-4xl lg:text-4xl`}
          >
            Designer &amp;
          </div>
          <div className={`${pressStart.className} sm:text-lg lg:text-xl`}>
            Full Stack Developer
          </div>
        </div>
      </div>
    </Stage>
  );
}

export function ProjectsTile2025() {
  return (
    <Stage caption="The 2025 projects tile, rebuilt from its code. Hover a project to open it.">
      <div className="h-[427px] w-full max-w-[389px] overflow-auto rounded-lg bg-blue-600 text-white shadow-md">
        <ProjectList />
      </div>
    </Stage>
  );
}

export function ToggleTiles2025() {
  return (
    <Stage caption="The 2025 disco-ball and dark-mode tiles, rebuilt from their code.">
      <div className="grid h-16 w-full max-w-[389px] grid-cols-2 gap-2">
        <div className="flex items-center justify-center overflow-hidden rounded-lg bg-blue-500 shadow-md">
          <Disco />
        </div>
        <div className="flex items-center justify-center rounded-lg bg-blue-600 shadow-md">
          <DarkModeSwitch />
        </div>
      </div>
    </Stage>
  );
}

// The 2025 toggle's markup, flipping only itself.
function DarkModeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        aria-label="2025 dark-mode toggle"
        checked={!isDarkMode}
        onChange={() => setIsDarkMode(!isDarkMode)}
        className="peer sr-only"
      />
      <div className="group peer h-7 w-14 rounded-full bg-gradient-to-tr from-blue-800 via-gray-800 to-slate-900 shadow-md outline-none ring-0 duration-300 after:absolute after:left-1 after:top-1 after:flex after:h-5 after:w-5 after:-rotate-180 after:items-center after:justify-center after:rounded-full after:bg-gray-50 after:text-sm after:text-indigo-900 after:outline-none after:duration-300 after:content-['☽'] peer-checked:bg-gradient-to-tr peer-checked:from-yellow-100 peer-checked:via-yellow-400 peer-checked:to-yellow-500 peer-checked:after:translate-x-7 peer-checked:after:rotate-0 peer-checked:after:text-sm peer-checked:after:text-amber-500 peer-checked:after:content-['☼'] peer-hover:after:scale-95 peer-focus:outline-none sm:h-8 sm:w-16 sm:after:h-6 sm:after:w-6 sm:after:text-base sm:peer-checked:after:translate-x-8 sm:peer-checked:after:text-base lg:h-12 lg:w-24 lg:after:h-10 lg:after:w-10 lg:after:text-xl lg:peer-checked:after:translate-x-12 lg:peer-checked:after:text-xl"></div>
    </label>
  );
}

// The 2025 Projects component, minus the nested link (see the top).
const PROJECTS = [
  {
    name: "Carpoolio",
    link: "/carpoolio",
    description:
      "A sleek mobile app that simplifies group travel. Organize rides, manage passengers, and streamline trips with ease.",
    image: "/images/carpoolio/carpoolio.png",
  },
  {
    name: "Group Sing Along",
    link: "/groupSingAlong",
    description:
      "An interactive platform that allows users to form or join singing groups. Effortlessly search for song lyrics and synchronize them in real-time.",
    image: "/images/groupSingAlong/groupSingAlongLogo.png",
  },
  {
    name: "Gin Score Tracker",
    link: "/ginScoreTracker",
    description: "A simple score-tracking app for Gin Rummy.",
    image: "/images/ginScoreTracker/club.png",
  },
];

function ProjectList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="w-full" onMouseLeave={() => setHoveredIndex(null)}>
      <ul className="space-y-2 md:space-y-6">
        {PROJECTS.map((project, index) => (
          <li
            key={project.name}
            className="border-1 group relative border-blue-500"
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <Link
              href={a(project.link)}
              className="block cursor-pointer p-2 md:p-4"
            >
              <h3
                className={`${geistMono.className} text-sm text-blue-100 md:text-lg`}
              >
                {project.name}
              </h3>
              <div className="absolute bottom-0 left-0 ml-2 h-1 w-[90%] rounded-sm bg-blue-500 transition-all duration-500 lg:ml-4"></div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  hoveredIndex === index ||
                  (hoveredIndex === null && index === 0)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="pt-2 text-xs text-blue-300">
                  {project.description}
                </p>
                <span className="mt-1 inline-block text-xs text-blue-400">
                  See more at cybergoose.org
                </span>
                <div className="mt-2 w-full overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={400}
                    height={225}
                    className="h-auto max-h-16 w-auto max-w-full rounded-lg object-cover sm:max-h-24 md:max-h-28"
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
