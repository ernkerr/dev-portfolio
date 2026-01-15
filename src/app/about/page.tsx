"use client";

import NavBar from "@/components/NavBar";
import { pressStart, poiretOne } from "../../../public/fonts/fonts";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import brainArt from "../../../public/images/about/brainArt.png";
import simpsonErin from "../../../public/images/about/simpsonErin.png";
import { ABOUT_ME } from "../../data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <NavBar />

      <motion.div
        className="grid grid-cols-6 gap-3 p-4 md:grid-cols-12 md:gap-4 md:p-8 lg:gap-6 lg:p-12 xl:p-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Title Card */}
        <motion.div
          className="col-span-6 flex flex-col justify-end rounded-2xl bg-blue-600 p-6 shadow-md md:col-span-5 md:row-span-2 md:p-8 lg:p-10"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h1
            className={`${pressStart.className} mb-4 text-lg md:text-xl lg:text-3xl`}
          >
            About Me
          </h1>
          <p
            className={`${poiretOne.className} text-xl text-gray-100 md:text-2xl lg:text-3xl`}
          >
            I&apos;m a creative problem-solver who thrives on building,
            tinkering, and finding better ways to do things.
          </p>
        </motion.div>

        {/* Profile Image Card */}
        <motion.div
          className="relative col-span-6 aspect-[4/3] max-h-[60vh] overflow-hidden rounded-2xl bg-blue-500 shadow-md md:col-span-3 md:row-span-2 md:aspect-auto md:max-h-none"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={simpsonErin}
            alt="Simpson-style portrait of Erin"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </motion.div>

        {/* Empty decorative card - where brain was */}
        <motion.div
          className="col-span-3 row-span-2 hidden rounded-2xl bg-blue-500 shadow-md md:col-span-4 md:block"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />

        {/* Background Story Card - all text combined */}
        <motion.div
          className="col-span-6 rounded-2xl bg-blue-600 p-6 shadow-md md:col-span-9 md:p-8"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <h2
            className={`${pressStart.className} mb-4 text-xs md:text-sm lg:text-base`}
          >
            Background
          </h2>
          <p className="mb-4 text-base leading-loose text-gray-100 md:text-lg lg:text-xl">
            My path into software development wasn&apos;t traditional. I started
            in psychology and neurotech research - brain imaging, MRIs, EEGs,
            neuropsych assessments.
          </p>
          <p className="mb-4 text-base leading-loose text-gray-100 md:text-lg lg:text-xl">
            At a neurotech startup, I started coding to automate processes.
            That&apos;s when it clicked. I realized the true power of software:
            solving inefficiencies, simplifying workflows, and turning complex
            problems into intuitive solutions.
          </p>
          <p className="text-base leading-loose text-gray-100 md:text-lg lg:text-xl">
            Building my own{" "}
            <Link
              href="/projects"
              className="underline decoration-blue-200 underline-offset-4 hover:text-white"
            >
              projects
            </Link>{" "}
            is where I truly fell in love with programming. Ideas becoming
            reality with nothing but time, creativity, and determination.
          </p>
        </motion.div>

        {/* Brain Art Card */}
        <motion.div
          className="relative col-span-3 overflow-hidden rounded-2xl bg-blue-500 shadow-md md:col-span-3"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={brainArt}
            alt="Brain artwork"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </motion.div>

        {/* Empty decorative card - left of Now */}
        <motion.div
          className="col-span-3 hidden rounded-2xl bg-blue-500 shadow-md md:col-span-5 md:block"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />

        {/* What drives me now - right side */}
        <motion.div
          className="col-span-6 rounded-2xl bg-blue-600 p-6 shadow-md md:col-span-7 md:p-8"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h2
            className={`${pressStart.className} mb-4 text-xs md:text-sm lg:text-base`}
          >
            Now
          </h2>
          <p className="text-base leading-loose text-gray-100 md:text-lg lg:text-xl">
            Fully immersed in software development, blending creativity with
            logic. I love making things work better, more beautifully, and more
            efficiently.
          </p>
        </motion.div>

        {/* Bottom row: "When I'm not coding" label */}
        <motion.div
          className="col-span-6 flex items-center md:col-span-12"
          variants={itemVariants}
        >
          <h2
            className={`${pressStart.className} text-xs md:text-sm lg:text-base`}
          >
            When I&apos;m not coding I:
          </h2>
        </motion.div>

        {/* Hobby Cards - all in a row */}
        {ABOUT_ME.slice(0, 4).map((hobby) => (
          <motion.div
            key={hobby.title}
            className="relative col-span-3 aspect-square overflow-hidden rounded-2xl shadow-md md:col-span-3"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={hobby.link || "#"}
              target={hobby.link ? "_blank" : undefined}
            >
              <Image
                src={hobby.image}
                alt={hobby.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-3">
                <span className="text-sm font-semibold md:text-base">
                  {hobby.title}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Get in Touch Card - full width row below hobbies */}
        <motion.div
          className="col-span-6 flex flex-col items-center justify-center rounded-2xl bg-blue-600 p-8 shadow-md md:col-span-12 md:flex-row md:justify-between md:p-10"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6 text-center md:mb-0 md:text-left">
            <h2
              className={`${pressStart.className} mb-3 text-sm md:text-base lg:text-lg`}
            >
              Get in Touch
            </h2>
            <p className="text-base text-gray-200 md:text-lg">
              Let&apos;s build something together
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="rounded-lg bg-blue-500 px-6 py-3 text-center text-sm transition-colors hover:bg-blue-400 md:text-base"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/30 px-6 py-3 text-center text-sm transition-colors hover:bg-white/10 md:text-base"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
