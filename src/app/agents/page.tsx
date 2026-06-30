"use client";

import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import { pressStart } from "../../../public/fonts/fonts";
import { allAgents } from "@/data/agents";
import AgentCard from "@/components/AgentCard";

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
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function Agents() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <NavBar />

      {/* Hero */}
      <motion.section
        className="px-8 pb-8 pt-8 md:px-16 md:pb-10 md:pt-12 lg:px-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          className={`${pressStart.className} mb-6 text-2xl md:text-4xl lg:text-5xl`}
        >
          Agents
        </h1>
        <p className="max-w-2xl text-base text-gray-300 md:text-lg lg:text-xl">
          AI agents I&apos;ve built for real production work — systems that read
          messy real-world inputs, reason with tools, and take action, with a
          human in the loop where it counts.
        </p>
      </motion.section>

      {/* Grid */}
      <motion.section
        className="px-8 pb-24 pt-8 md:px-16 lg:px-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col gap-8">
          {allAgents.map((agent) => (
            <motion.div key={agent.slug} variants={itemVariants}>
              <AgentCard agent={agent} />
            </motion.div>
          ))}
        </div>
        {allAgents.length === 0 && (
          <p className="text-gray-400">No agents here yet.</p>
        )}
      </motion.section>
    </div>
  );
}
