"use client";

import { ReactNode } from "react";
import { pressStart } from "../../public/fonts/fonts";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Link from "next/link";

interface ProjectTemplateProps {
  title: string;
  description: ReactNode;
  type: string;
  stack: string[];
  link: string;
  img: string;
  purpose: ReactNode;
  stackexp: ReactNode;
  stackimg: string;
  stackimg2: string;
  stackimg3: string;
  img2: string;
  img3: string;
  problems: ReactNode;
  img4: string;
  lessons: ReactNode;
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
  img2,
  img3,
  problems,
  img4,
  lessons,
}: ProjectTemplateProps) {
  return (
    <div className="bg-slate-900 text-white">
      <NavBar />

      <div className="flex flex-col p-8 md:p-12">
        <h1 className={`${pressStart.className} pb-8 text-2xl`}>{title}</h1>
        <h3 className={`py-8 text-sm md:max-w-[60%] lg:py-16`}>
          {description}
        </h3>
        <div className="flex flex-row gap-4 py-8 md:gap-16">
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
        <div className="flex justify-center">
          <Image src={img} alt={title} width={700} height={500} />
        </div>

        <div className="flex flex-col items-start">
          <h2 className={`py-8 text-xl`}>Project Purpose & Goal</h2>
          <p className="text-xs">{purpose}</p>
        </div>

        <div className="flex flex-row justify-end gap-4 md:gap-6">
          <div className="mt-20 flex flex-col gap-8 md:mt-8 md:p-16 lg:p-24">
            <Image
              src={stackimg}
              alt={title}
              width={700}
              height={700}
              className="md:w-3/4 lg:w-full"
            />
            <Image
              src={stackimg2}
              alt={title}
              width={700}
              height={700}
              className="md:w-3/4 lg:w-full"
            />
            <Image
              src={stackimg3}
              alt={title}
              width={700}
              height={400}
              className="md:w-3/4 lg:w-full"
            />
          </div>
          <div className="flex flex-col">
            <h2 className={`py-4 text-xl md:py-8`}>Stack & Explanation</h2>
            <p className="text-xs">{stackexp}</p>
          </div>
        </div>

        {/* <div className="flex justify-center">
          <Image src={img} alt={title} width={700} height={500} />
        </div>
        <div className="flex justify-center">
          <Image src={img} alt={title} width={700} height={500} />
        </div>
        <div className="flex justify-center">
          <Image src={img} alt={title} width={700} height={500} />
        </div> */}
        <div className="mt-8 flex flex-row justify-center gap-4">
          <Image
            src={img2}
            alt={title}
            width={150}
            height={150}
            className="w-1/2 md:w-1/2 lg:w-full"
          />
          <Image
            src={img3}
            alt={title}
            width={150}
            height={150}
            className="w-1/2 md:w-1/2 lg:w-full"
          />
        </div>

        <div className="flex flex-col items-center">
          <h2 className={`py-8 text-xl`}>Problems & Thought Process</h2>
          <p className="text-xs">{problems}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <Image
            src={img4}
            alt={title}
            width={700}
            height={700}
            // className="w-full"
          />
        </div>

        <h2 className={`py-8 text-xl`}>Lessons Learned</h2>
        <p className="text-xs">{lessons}</p>
      </div>
    </div>
  );
}
