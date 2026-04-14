import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { geistMono } from "../../public/fonts/fonts";

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const projects = [
    {
      name: "Carpoolio",
      link: "/carpoolio",
      externalLink: "http://cybergoose.org/carpoolio",
      description:
        "A sleek mobile app that simplifies group travel. Organize rides, manage passengers, and streamline trips with ease.",
      image: "/images/carpoolio/carpoolio.png",
    },
    {
      name: "Group Sing Along",
      link: "/groupSingAlong",
      externalLink: "http://cybergoose.org/groupSingAlong",
      description:
        "An interactive platform that allows users to form or join singing groups. Effortlessly search for song lyrics and synchronize them in real-time.",
      image: "/images/groupSingAlong/groupSingAlongLogo.png",
    },
    {
      name: "Gin Score Tracker",
      link: "/ginScoreTracker",
      externalLink: "http://cybergoose.org/ginScoreTracker",
      description: "A simple score-tracking app for Gin Rummy.",
      image: "/images/ginScoreTracker/club.png",
    },
  ];

  return (
    <div>
      <div className="w-full" onMouseLeave={() => setHoveredIndex(null)}>
        <>
          <ul className="space-y-2 md:space-y-6">
            {projects.map((project, index) => (
              <li
                key={index}
                className="group relative border-1 border-blue-500"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <Link href={project.link} className="block cursor-pointer p-2 md:p-4">
                  <h3
                    className={`${geistMono.className} text-sm text-blue-100 md:text-lg`}
                  >
                    {project.name}
                  </h3>

                  {/* Underline */}
                  <div
                    className="absolute bottom-0 left-0 ml-2 h-1 w-[90%] rounded-sm bg-blue-500 transition-all duration-500 lg:ml-4"
                  ></div>

                  {/* Description and image - shown when hovered, Carpoolio shown by default when nothing hovered */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    hoveredIndex === index || (hoveredIndex === null && index === 0)
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}>
                    <p className="pt-2 text-xs text-blue-300">
                      {project.description}
                    </p>
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1 inline-block text-xs text-blue-400 hover:underline"
                    >
                      See more at cybergoose.org
                    </a>
                    <div className="relative mt-2 h-20 w-full overflow-hidden rounded-lg sm:h-24 md:h-28">
                      <Image
                        src={project.image || "/default-image.png"}
                        alt={project.name}
                        fill
                        sizes="200px"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                  </div>
                </Link>
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
