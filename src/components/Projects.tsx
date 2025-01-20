import { useState } from "react";
import Image from "next/image";
import { geistMono } from "../../public/fonts/fonts";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = [
    {
      name: "Carpoolio",
      link: "https://www.carpoolio.co",
      description: "A personal portfolio showcasing my projects and skills.",
      image: "/carpoolio.png",
    },
    {
      name: "Group Sing Along",
      link: "https://groupsingalong.com",
      description:
        "A real-time group karaoke platform for singing together online.",
      image: "/groupsingalong.png",
    },
    {
      name: "Project 3",
      link: "https://groupsingalong.com",
      description:
        "A real-time group karaoke platform for singing together online.",
      // image: "/images/groupsingalong.png",
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
                className={`relative p-4 border-1 border-blue-500 cursor-pointer group ${
                  activeIndex === index ? "" : ""
                } `}
                onClick={() => setActiveIndex(index)} // set index (active project)
              >
                <h3
                  className={`${geistMono.className} text-xs sm:text-sm md:text-lg`}
                >
                  {project?.name}
                </h3>

                {/* Underline */}
                <div
                  className={`absolute ml-2 lg:ml-4 bottom-0 left-0 h-1 bg-blue-500 rounded-sm cursor-pointer transition-all duration-500 ${
                    activeIndex === index
                      ? "w-[90%]"
                      : "w-[90%] group-hover:w-40 "
                  }`}
                ></div>

                {activeIndex === index && (
                  <Image
                    key={index}
                    src={project?.image || "/default-image.png"}
                    alt={project?.name}
                    sizes="100vw"
                    height={200}
                    width={200}
                    style={{
                      // width: "100%",
                      // height: "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    className="object-cover rounded-xl p-2"
                  />
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
