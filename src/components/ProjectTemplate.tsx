"use client";

import { pressStart } from "../../public/fonts/fonts";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Link from "next/link";

interface ProjectTemplateProps {
  title: string;
  description: string;
  type: string;
  stack: string[];
  link: string;
  img: string;
  purpose: string;
  stackexp: string;
  stackimg: string;
  stackimg2: string;
  stackimg3: string;
  problems: string;
  lessons: string;
}

export default function ProjectTemplate({
  title,
  description,
  type,
  stack,
  link,
  img,
  purpose,
  stackexp,
  stackimg,
  stackimg2,
  stackimg3,
  problems,
  lessons,
}: ProjectTemplateProps) {
  return (
    <div className="bg-slate-900 text-white">
      <NavBar />

      <div className="flex flex-col p-12">
        <h1 className={`${pressStart.className} pb-8 text-2xl`}>{title}</h1>
        <h3 className={`py-8 text-sm lg:py-16`}>{description}</h3>
        <div className="flex flex-row gap-16 py-8">
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold">Type</h3>
            <p>{type}</p>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold">Tech Stack</h3>
            {stack.map((tech, index) => (
              <p key={index}>{tech}</p>
            ))}
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold">Live</h3>
            <Link href={link} className="cursor-pointer text-blue-500">
              View Site
            </Link>
          </div>
        </div>
        <Image src={img} alt={title} width={300} height={200} />

        <div className="flex flex-col items-start">
          <h2 className={`py-8 text-lg`}>Project Purpose & Goal</h2>
          <p>{purpose}</p>
        </div>

        <div className="flex flex-row justify-end gap-4">
          <div className="flex flex-col gap-2 p-16">
            <Image src={stackimg} alt={title} width={100} height={50} />
            <Image src={stackimg2} alt={title} width={100} height={50} />
            <Image src={stackimg3} alt={title} width={100} height={50} />
          </div>
          <div className="flex flex-col">
            <h2 className={`py-8 text-lg`}>Web Stack & Explanation</h2>
            <p>{stackexp}</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className={`py-8 text-lg`}>Problems & Thought Process</h2>
          <p>{problems}</p>
        </div>

        <h2 className={`py-8 text-lg`}>Lessons Learned</h2>
        <p>{lessons}</p>
      </div>
    </div>
  );
}
