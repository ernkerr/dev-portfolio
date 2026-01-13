"use client";

import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import { pressStart } from "../../../public/fonts/fonts";
import { allProjects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Projects() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <NavBar />

      {/* Hero Section */}
      <motion.section
        className="px-8 pb-12 pt-8 md:px-16 md:pb-16 md:pt-12 lg:px-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          className={`${pressStart.className} mb-6 text-2xl md:text-4xl lg:text-5xl`}
        >
          Projects
        </h1>
        <p className="max-w-2xl text-base text-gray-300 md:text-lg lg:text-xl">
          A showcase of my work, highlighting my growth as a developer through
          continuous learning and gaining new skills every day.
        </p>
      </motion.section>

      {/* Projects Grid */}
      <motion.section
        className="px-8 pb-24 md:px-16 lg:px-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <div className="flex flex-col gap-8">
          {allProjects.map((project) => (
            <motion.div key={project.slug} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
