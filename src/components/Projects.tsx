import { useState } from "react";
import Image from "next/image";
import { FaMusic, FaCode, FaRocket } from "react-icons/fa"; // Icons

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = [
    {
      name: "Carpoolio",
      link: "https://www.carpoolio.co",
      description: "A personal portfolio showcasing my projects and skills.",
      image: "/carpoolio.png",
      icon: <FaCode />,
    },
    {
      name: "Group Sing Along",
      link: "https://groupsingalong.com",
      description:
        "A real-time group karaoke platform for singing together online.",
      image: "/images/groupsingalong.png",
      icon: <FaMusic />,
    },
  ];

  return (
    <div>
      <div className="w-full">
        {/* <h2 className="text-lg">PROJECTS</h2> */}
        <div className="col-span-1 row-span-1 ">
          <ul>
            {projects.map((project, index) => (
              <li key={index} className="w-full border-b-2 border-white p-4">
                <h3>{projects[activeIndex]?.name}</h3>
                <Image
                  key={index}
                  src={projects[activeIndex]?.image}
                  alt={projects[activeIndex]?.name}
                  height={100}
                  width={100}
                  className="w-full h-auto object-cover rounded-md"
                />
              </li>
            ))}
          </ul>
        </div>
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
