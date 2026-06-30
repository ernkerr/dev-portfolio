"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import { pressStart } from "../../../public/fonts/fonts";
import { allProjects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import type { ProjectCategory, ProjectPlatform } from "@/types/project";

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

// Canonical order + plural display labels for the top-level filter chips.
const CATEGORY_ORDER: ProjectCategory[] = ["App", "Website", "Tool", "Design"];
const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  App: "Apps",
  Website: "Websites",
  Tool: "Tools",
  Design: "Design",
};
const PLATFORM_ORDER: ProjectPlatform[] = ["Web", "Mobile", "Cross-platform"];

type CategoryFilter = ProjectCategory | "All";
type PlatformFilter = ProjectPlatform | "All";

export default function Projects() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [platform, setPlatform] = useState<PlatformFilter>("All");

  // Only show chips for categories that actually have projects.
  const categories = useMemo(
    () =>
      CATEGORY_ORDER.filter((c) => allProjects.some((p) => p.category === c)),
    [],
  );

  // Platforms available among the App projects (drives the Apps sub-filter).
  const platforms = useMemo(
    () =>
      PLATFORM_ORDER.filter((pl) =>
        allProjects.some((p) => p.category === "App" && p.platform === pl),
      ),
    [],
  );

  const filtered = useMemo(
    () =>
      allProjects.filter((p) => {
        if (category !== "All" && p.category !== category) return false;
        if (category === "App" && platform !== "All" && p.platform !== platform)
          return false;
        return true;
      }),
    [category, platform],
  );

  const handleCategory = (c: CategoryFilter) => {
    setCategory(c);
    setPlatform("All"); // reset the sub-filter whenever the top level changes
  };

  const chipBase =
    "cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200";
  const chipActive = "bg-blue-600 text-white";
  const chipIdle =
    "border border-slate-700/50 bg-slate-800/50 text-gray-300 hover:border-blue-500/50 hover:text-white";

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <NavBar />

      {/* Hero Section */}
      <motion.section
        className="px-8 pb-8 pt-8 md:px-16 md:pb-10 md:pt-12 lg:px-24"
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

      {/* Filters */}
      <section className="px-8 md:px-16 lg:px-24">
        <div className="flex flex-wrap gap-3">
          {(["All", ...categories] as CategoryFilter[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleCategory(c)}
              aria-pressed={category === c}
              className={`${chipBase} ${category === c ? chipActive : chipIdle}`}
            >
              {c === "All" ? "All" : CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>

        {/* Apps sub-filter: Web / Mobile / Cross-platform */}
        {category === "App" && platforms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 flex flex-wrap items-center gap-2"
          >
            {(["All", ...platforms] as PlatformFilter[]).map((pl) => (
              <button
                key={pl}
                type="button"
                onClick={() => setPlatform(pl)}
                aria-pressed={platform === pl}
                className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                  platform === pl
                    ? "bg-blue-500 text-white"
                    : "bg-slate-800/50 text-gray-400 hover:text-white"
                }`}
              >
                {pl}
              </button>
            ))}
          </motion.div>
        )}
      </section>

      {/* Projects Grid */}
      <motion.section
        key={`${category}-${platform}`}
        className="px-8 pb-24 pt-8 md:px-16 lg:px-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col gap-8">
          {filtered.map((project) => (
            <motion.div key={project.slug} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-gray-400">No projects in this category yet.</p>
        )}
      </motion.section>
    </div>
  );
}
