"use client";

// import CurrentlyReading from "@/components/CurrentlyReading";
import NavBar from "@/components/NavBar";
import { pressStart } from "../../../public/fonts/fonts";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import brainArt from "../../../public/images/about/brainArt.png";
import simpsonErin from "../../../public/images/about/simpsonErin.png";
import AboutMe from "@/components/AboutMe";
import { ABOUT_ME } from "../../data";

export default function About() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-900 text-white">
      <NavBar />
      <h1
        className={`${pressStart.className} text-md mb-4 flex items-center justify-center p-2 font-medium sm:p-3 md:p-6 md:text-lg lg:p-8 lg:text-4xl`}
      >
        About Me
      </h1>
      {/* <p>My friends call me ern</p> */}

      <section className="px-4 md:px-16">
        <p className="mb-8 text-lg sm:text-xl md:px-12 md:text-2xl lg:px-24 lg:text-3xl">
          I&apos;m a creative problem-solver who thrives on building, tinkering,
          and finding better ways to do things.
        </p>
        <div className="gap-4 text-justify text-sm md:px-12 lg:px-24">
          <h2
            className={`py-2 md:py-4 lg:py-8 ${pressStart.className} md:text-md text-xs sm:text-sm`}
          >
            Background
          </h2>
          <div className="relative flex items-center">
            <p className="flex-1 py-2 text-base sm:text-lg md:py-4 md:text-xl lg:py-8 lg:text-2xl">
              My path into software development wasn&apos;t traditional - I
              started in psychology and neurotech research, working with brain
              imaging, MRIs, EEGs, and neuropsych assessments. From there, I
              moved to a neurotech startup, where I began coding primarily to
              automate processes. That&apos;s when I realized the true power of
              software: solving inefficiencies, simplifying workflows, and
              turning complex problems into intuitive solutions.
            </p>
            <div className="hidden md:block">
              <motion.div
                className="-ml-4 flex-shrink-0"
                initial={{ x: 100, opacity: 0 }} // Start off-screen to the right
                whileInView={{ x: 0, opacity: 1 }} // Slide in and fade in
                transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
                viewport={{ once: false, amount: 0.2 }} // Re-triggers when scrolling up
                whileHover={{ scale: 1.1 }}
              >
                <Image src={brainArt} height={200} width={200} alt="brainArt" />
              </motion.div>
            </div>
          </div>
          <div className="block md:hidden">
            <motion.div
              className="flex justify-center" // Centers content horizontally
              initial={{ x: 100, opacity: 0 }} // Start off-screen (right)
              whileInView={{ x: 0, opacity: 1 }} // Move to center smoothly
              transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
              viewport={{ once: false, amount: 0.2 }} // Re-triggers when scrolling up
              whileHover={{ scale: 1.1 }}
            >
              <Image src={brainArt} height={150} width={150} alt="brainArt" />
            </motion.div>
          </div>
          <div className="relative flex items-center">
            <div className="hidden md:block">
              <motion.div
                className="-mr-4 flex-shrink-0 p-4"
                initial={{ x: -100, opacity: 0 }} // Start off-screen to the left
                whileInView={{ x: 0, opacity: 1 }} // Slide in and fade in
                transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
                viewport={{ once: false, amount: 0.2 }} // Re-triggers when scrolling up
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src={simpsonErin}
                  height={200}
                  width={200}
                  alt="simpsonErin"
                />
              </motion.div>
            </div>

            <p className="mb-4 flex-1 py-2 text-base sm:text-lg md:py-4 md:text-xl lg:py-8 lg:text-2xl">
              However, it was through building my own{" "}
              <Link href="/projects" className="text-blue-300/80">
                projects{" "}
              </Link>
              that I truly fell in love with programming. I saw firsthand how
              code could transform ideas into reality, automate tedious tasks,
              and create intuitive experiences - all with nothing but time,
              creativity, and determination.
            </p>
          </div>

          <div className="block md:hidden">
            <motion.div
              className="flex justify-center" // Centers content horizontally
              initial={{ x: -100, opacity: 0 }} // Start off-screen (right)
              whileInView={{ x: 0, opacity: 1 }} // Move to center smoothly
              transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
              viewport={{ once: false, amount: 0.2 }} // Re-triggers when scrolling up
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src={simpsonErin}
                height={300}
                width={300}
                alt="simpsonErin"
              />
            </motion.div>
          </div>

          <p className="mt-4 py-2 text-base sm:text-lg md:py-4 md:text-xl lg:py-8 lg:text-2xl">
            Now, I&apos;m fully immersed in software development, blending
            creativity with logic to build engaging digital experiences. What
            excites me most is the ability to express creativity - whether
            through website design, custom features, or solving challenges in
            unique ways. I love making things work better, more beautifully, and
            more efficiently.
          </p>

          <p className="py-2 text-base sm:text-lg md:py-4 md:text-xl lg:py-8 lg:text-2xl">
            I believe creativity is at its best when fueled by curiosity and
            diverse experiences. Whether I&apos;m designing software,
            collaborating with clients, or tackling a new challenge, I bring
            that same energy and adaptability to everything I do.
          </p>
        </div>
      </section>

      <section className="p-4 md:px-16">
        <h2
          className={`${pressStart.className} sm:text-md mb-4 flex items-center justify-center p-2 text-sm font-medium sm:p-3 md:p-6 md:text-lg lg:p-8 lg:text-2xl`}
        >
          When I&apos;m not coding I:
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <AboutMe {...ABOUT_ME[0]} />
          <AboutMe {...ABOUT_ME[1]} />
          <AboutMe {...ABOUT_ME[2]} />
          <AboutMe {...ABOUT_ME[3]} />
          {/* <AboutMe {...ABOUT_ME[4]} /> */}
          {/* <AboutMe {...ABOUT_ME[5]} /> */}
          {/* <AboutMe {...ABOUT_ME[6]} /> */}
          {/* <AboutMe {...ABOUT_ME[7]} /> */}
        </div>
        <div className="mt-4 items-center justify-center">
          {/* <CurrentlyReading /> */}
        </div>
      </section>
    </div>
  );
}
