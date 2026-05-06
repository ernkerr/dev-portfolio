"use client";

import { pressStart } from "../../../public/fonts/fonts";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function AsciiCam() {
  return (
    <div className="bg-slate-900 text-white">
      <NavBar />

      <div className="flex flex-col p-8 md:p-12 lg:px-48">
        <h1
          className={`${pressStart.className} pb-8 text-2xl sm:text-4xl md:text-5xl`}
        >
          ASCII Cam
        </h1>
        <h3 className="py-8 text-sm md:max-w-[70%] lg:max-w-[80%] lg:py-16 lg:text-[16px]">
          A real-time webcam and image to ASCII art converter with 9+ character
          sets, customizable colors, and export to PNG, MP4, and GIF. Built in
          about 2 hours.
        </h3>

        <div className="flex flex-row gap-4 py-8 md:gap-32">
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold md:text-lg">Type</h3>
            <p>Web App</p>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold md:text-lg">Tech Stack</h3>
            <p>React</p>
            <p>TypeScript</p>
            <p>Vite</p>
            <p>Canvas API</p>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold md:text-lg">Live</h3>
            <Link
              href="https://ascii-cam.com/"
              className="cursor-pointer text-blue-500"
            >
              View Site
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-start lg:py-8">
          <Image
            src="/images/asciiCam/asciiCam-logo.png"
            alt="ASCII Cam"
            width={700}
            height={500}
            className="md:w-2/3 lg:w-4/5"
          />
        </div>

        {/* Purpose */}
        <div className="flex flex-col items-start">
          <h2 className="py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Project Purpose & Goal
          </h2>
          <p className="md:text-md text-xs sm:text-sm md:max-w-[80%] lg:text-[16px]">
            Wanted to see how fast I could ship something. Picked a familiar
            stack to iterate quickly — took about 2 hours from idea to deployed.
          </p>
        </div>

        {/* Stack */}
        <div className="flex flex-col items-start">
          <h2 className="py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Stack & Explanation
          </h2>
          <p className="md:text-md text-xs sm:text-sm lg:text-[16px] md:max-w-[80%]">
            <strong>React 19</strong> and <strong>TypeScript</strong> for the
            UI, <strong>Canvas API</strong> for pixel-level brightness sampling
            and character mapping, <strong>gif.js</strong> for GIF encoding in
            Web Workers, and <strong>Vite 8</strong> for instant dev feedback.
          </p>
          <div className="mt-6 flex flex-row items-center gap-6">
            <Image
              src="/stackLogos/react.png"
              alt="React"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <Image
              src="/stackLogos/typescript.png"
              alt="TypeScript"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <Image
              src="/stackLogos/vite.png"
              alt="Vite"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </div>
        </div>

        {/* Screenshots */}
        <div className="mt-12 flex flex-col items-center gap-8">
          <Image
            src="/images/asciiCam/asciiCam-stars.png"
            alt="ASCII Cam stars charset"
            width={700}
            height={500}
            className="w-full sm:w-2/3 md:w-1/2"
          />
          <Image
            src="/images/asciiCam/asciiCam-dense2.png"
            alt="ASCII Cam dense charset"
            width={700}
            height={500}
            className="w-full sm:w-2/3 md:w-1/2"
          />
        </div>

        {/* Problems */}
        <div className="flex flex-col items-center">
          <h2 className="py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Problems & Thought Process
          </h2>
          <p className="text-xs sm:px-8 sm:text-sm lg:max-w-[80%] lg:text-[16px]">
            <strong>Color scheming.</strong> H.264 chroma subsampling smeared
            neon green on dark backgrounds during video recording. The record
            canvas wasn&apos;t filling its background before each frame capture.
            Fixed by bumping bitrate to 8 Mbps and adding proper canvas
            initialization.
          </p>
        </div>

        {/* Video */}
        <div className="mt-8 flex justify-center">
          <video
            src="/images/asciiCam/ascii-cam.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-[700px] rounded"
          />
        </div>

        {/* Lessons */}
        <h2 className="py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Lessons Learned
        </h2>
        <p className="text-xs sm:max-w-[80%] sm:text-sm lg:max-w-[90%] lg:text-[16px]">
          Not everything needs a deeper purpose or needs to be profitable.
          Sometimes it just needs to be fun.
        </p>
      </div>
    </div>
  );
}
