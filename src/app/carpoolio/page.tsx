"use client";

// import DarkModeToggle from "@/components/DarkModeToggle";
// import { pressStart } from "../../../public/fonts/fonts";
// import Image from "next/image";
// import NavBar from "@/components/NavBar";
// import Link from "next/link";
import ProjectTemplate from "@/components/ProjectTemplate";
export default function Carpoolio() {
  return (
    <div>
      <ProjectTemplate
        title="Carpoolio"
        description="Description"
        type="Personal Project"
        stack={["React", "Node.js", "Express", "Vercel Postgres"]}
        link="https://carpoolio.co"
        img="/carpoolio1.png"
        purpose="Purpose"
        stackexp="Tech Stack"
        stackimg="/react.png"
        stackimg2="/next.png"
        stackimg3="/vercel.png"
        problems="Problems"
        lessons="Lessons Learned"
      />

      {/* 


          <Image
            src="/carpoolio1.png"
            alt="Image 1"
            width={300}
            height={200}
            className="w-1/2"
          />
          <Image
            src="/carpoolio3.png"
            alt="Image 3"
            width={300}
            height={200}
            className="w-1/2"
          />
        </div> */}
      {/* </div> */}
    </div>
  );
}
