import Image from "next/image";
import Link from "next/link";
import { geistMono } from "../../public/fonts/fonts";

export default function Projects() {
  const projects = [
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

  return (
    <div>
      <div className="w-full">
        <>
          <ul className="md:space-y-6">
            {projects.map((project, index) => (
              <li
                key={index}
                className="group relative border-1 border-blue-500"
              >
                <Link href={project.link} className="block cursor-pointer p-4">
                  <h3
                    className={`${geistMono.className} text-xs text-blue-100 sm:text-sm md:text-lg`}
                  >
                    {project.name}
                  </h3>

                  {/* Underline */}
                  <div
                    className="absolute bottom-0 left-0 ml-2 h-1 w-0 rounded-sm bg-blue-500 transition-all duration-500 group-hover:w-[90%] lg:ml-4"
                  ></div>

                  {/* Description and image - shown on hover */}
                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
                    <p className="pt-2 text-xs text-blue-300">
                      {project.description}
                    </p>
                    <Image
                      src={project.image || "/default-image.png"}
                      alt={project.name}
                      height={75}
                      width={100}
                      style={{
                        minHeight: "75px",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      className="rounded-xl object-cover p-2"
                    />
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
