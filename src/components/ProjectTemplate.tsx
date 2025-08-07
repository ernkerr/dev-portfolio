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

      <div className="flex flex-col p-8 md:p-12 lg:px-48">
        <h1
          className={`${pressStart.className} pb-8 text-2xl sm:text-4xl md:text-5xl`}
        >
          {title}
        </h1>
        <h3
          className={`py-8 text-sm md:max-w-[70%] lg:max-w-[80%] lg:py-16 lg:text-[16px]`}
        >
          {description}
        </h3>
        <div className="flex flex-row gap-4 py-8 md:gap-32">
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold md:text-lg">Type</h3>
            <p>{type}</p>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold md:text-lg">Tech Stack</h3>
            {stack.map((tech, index) => (
              <p key={index}>{tech}</p>
            ))}
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold md:text-lg">Live</h3>
            <Link href={link} className="cursor-pointer text-blue-500">
              {link.includes("apple") ? "View App" : "View Site"}
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-start lg:py-8">
          <Image
            src={img}
            alt={title}
            width={700}
            height={500}
            className="md:w-2/3 lg:w-4/5"
          />
        </div>

        <div className="flex flex-col items-start">
          <h2 className={`py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl`}>
            Project Purpose & Goal
          </h2>
          <p className="md:text-md text-xs sm:text-sm md:max-w-[80%] lg:text-[16px]">
            {purpose}
          </p>
        </div>

        <div className="flex flex-row justify-end gap-4 sm:gap-6">
          <div className="mt-20 flex flex-col gap-8 sm:mt-32 md:mt-0 md:p-16 lg:mt-4 lg:p-8">
            <Image
              src={stackimg}
              alt={title}
              width={700}
              height={700}
              className="sm:w-4/5 md:w-2/3"
            />
            <Image
              src={stackimg2}
              alt={title}
              width={700}
              height={700}
              className="sm:w-4/5 md:w-2/3"
            />
            <Image
              src={stackimg3}
              alt={title}
              width={700}
              height={400}
              className="sm:w-4/5 md:w-2/3"
            />
          </div>
          <div className="flex flex-col">
            <h2
              className={`py-8 text-xl sm:text-2xl md:text-3xl lg:mt-8 lg:text-4xl`}
            >
              Stack & Explanation
            </h2>
            <p className="md:text-md text-xs sm:text-sm lg:text-[16px]">
              {stackexp}
            </p>
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
        <div className="mt-8 flex flex-row justify-center gap-4 sm:gap-8 md:gap-16">
          <Image
            src={img2}
            alt={title}
            width={150}
            height={150}
            className="w-1/2 sm:w-1/3 md:w-1/5 lg:w-1/6"
          />
          <Image
            src={img3}
            alt={title}
            width={150}
            height={150}
            className="w-1/2 sm:w-1/3 md:w-1/5 lg:w-1/6"
          />
        </div>

        <div className="flex flex-col items-center">
          <h2 className={`py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl`}>
            Problems & Thought Process
          </h2>
          <p className="text-xs sm:px-8 sm:text-sm lg:max-w-[80%] lg:text-[16px]">
            {problems}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Image src={img4} alt={title} width={700} height={700} />
        </div>

        <h2 className={`py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl`}>
          Lessons Learned
        </h2>
        <p className="text-xs sm:max-w-[80%] sm:text-sm lg:max-w-[90%] lg:text-[16px]">
          {lessons}
        </p>
      </div>
    </div>
  );
}
