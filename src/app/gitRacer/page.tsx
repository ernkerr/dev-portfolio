"use client";

import { pressStart } from "../../../public/fonts/fonts";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function GitRacer() {
  return (
    <div className="bg-slate-900 text-white">
      <NavBar />

      <div className="flex flex-col p-8 md:p-12 lg:px-48">
        <h1
          className={`${pressStart.className} pb-8 text-2xl sm:text-4xl md:text-5xl`}
        >
          Git Racer
        </h1>
        <h3 className="py-8 text-sm md:max-w-[70%] lg:max-w-[80%] lg:py-16 lg:text-[16px]">
          Race your friends, race famous developers, and turn your GitHub
          contributions into a competitive sport.
          <br />
          <br />
          Pick any GitHub username and we pull actual commit counts from
          GitHub. Your real totals, not starting from zero.
          <br />
          <br />
          Features include 1v1 head-to-head duels, goal-based challenges,
          league tiers, streak tracking, contribution graphs, shareable race
          links, and social sharing across Twitter, LinkedIn, Discord, Slack,
          and more.
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
            <p>Hono</p>
            <p>PostgreSQL</p>
            <p>Drizzle</p>
            <p>Three.js</p>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold md:text-lg">Live</h3>
            <Link
              href="https://git-racer.vercel.app"
              className="cursor-pointer text-blue-500"
            >
              View Site
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-start lg:py-8">
          <Image
            src="/images/gitRacer/car-green.png"
            alt="Git Racer"
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
            Wanted to make open-source contributions feel competitive and
            social. No global leaderboard — the focus is on personal, meaningful
            1v1 races against friends, colleagues, or anyone on GitHub.
          </p>
        </div>

        {/* Stack */}
        <div className="flex flex-col items-start">
          <h2 className="py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Stack & Explanation
          </h2>
          <p className="md:text-md text-xs sm:text-sm lg:text-[16px] md:max-w-[80%]">
            Monorepo with <strong>React 19</strong> and{" "}
            <strong>React Router v7</strong> on the frontend,{" "}
            <strong>Hono</strong> as a lightweight REST API on the backend,{" "}
            <strong>Drizzle ORM</strong> with <strong>PostgreSQL</strong> for
            data, <strong>Three.js</strong> for a 3D Hyperspeed landing
            animation, and <strong>Vite</strong> for dev tooling. Deployed on{" "}
            <strong>Vercel</strong> with serverless functions and cron jobs for
            daily GitHub data ingestion.
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
            src="/images/gitRacer/car-gray.png"
            alt="Git Racer opponent car"
            width={700}
            height={500}
            className="w-full sm:w-2/3 md:w-1/2"
          />
          <Image
            src="/images/gitRacer/finish-line.png"
            alt="Git Racer finish line"
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
            <strong>Blending multiple GitHub data sources.</strong> Accurate
            commit counts required pulling from GitHub Archive, GraphQL, and the
            Events API — each with different coverage, latency, and rate limits.
            Also handled cold-start crashes with @vercel/og image generation and
            StrictMode double-mount issues with the Three.js Hyperspeed
            animation.
          </p>
        </div>

        {/* Lessons */}
        <h2 className="py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Lessons Learned
        </h2>
        <p className="text-xs sm:max-w-[80%] sm:text-sm lg:max-w-[90%] lg:text-[16px]">
          Building a social product around real data is harder than building the
          features — the data pipeline (ingestion, deduplication, accuracy)
          ended up being the core challenge, not the UI.
        </p>
      </div>
    </div>
  );
}
