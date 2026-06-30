"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AgentMetadata } from "@/types/agent";
import { pressStart, geistMono } from "../../public/fonts/fonts";

interface AgentCardProps {
  agent: AgentMetadata;
}

/** Self-contained "inbox → agent → order" visual so the card never depends on an image asset. */
function FlowVisual() {
  return (
    <svg
      viewBox="0 0 320 220"
      className="h-full w-full"
      role="img"
      aria-label="An inbound email flowing through an AI agent into a structured order"
    >
      <defs>
        <linearGradient id="agentbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0E172B" />
          <stop offset="100%" stopColor="#1C274C" />
        </linearGradient>
        <linearGradient id="agentglow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      <rect width="320" height="220" fill="url(#agentbg)" />

      {/* connecting flow line */}
      <line x1="78" y1="110" x2="242" y2="110" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="2" />
      <line x1="78" y1="110" x2="242" y2="110" stroke="url(#agentglow)" strokeWidth="2">
        <animate attributeName="x1" values="78;200" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="x2" values="120;242" dur="2.4s" repeatCount="indefinite" />
      </line>

      {/* inbound email */}
      <g transform="translate(28,82)">
        <rect width="56" height="40" rx="6" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.25" />
        <path d="M4 8 L28 26 L52 8" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinejoin="round" />
      </g>

      {/* agent node */}
      <g transform="translate(130,70)">
        <rect width="60" height="80" rx="12" fill="#1C274C" stroke="#60a5fa" strokeOpacity="0.5" />
        <circle cx="30" cy="40" r="16" fill="none" stroke="#60a5fa" strokeWidth="2" />
        <circle cx="30" cy="40" r="4" fill="#93c5fd" />
        <line x1="30" y1="40" x2="30" y2="20" stroke="#60a5fa" strokeWidth="2" />
        <line x1="30" y1="40" x2="47" y2="50" stroke="#60a5fa" strokeWidth="2" />
        <line x1="30" y1="40" x2="14" y2="52" stroke="#60a5fa" strokeWidth="2" />
        <circle cx="30" cy="20" r="3" fill="#93c5fd" />
        <circle cx="47" cy="50" r="3" fill="#93c5fd" />
        <circle cx="14" cy="52" r="3" fill="#93c5fd" />
      </g>

      {/* structured order */}
      <g transform="translate(236,76)">
        <rect width="52" height="68" rx="6" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.25" />
        <line x1="10" y1="16" x2="42" y2="16" stroke="#93c5fd" strokeWidth="2" />
        <line x1="10" y1="28" x2="42" y2="28" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
        <line x1="10" y1="40" x2="42" y2="40" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M12 54 l6 6 l12 -14" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link href={agent.link}>
      <motion.article
        className="group relative flex h-auto transform-gpu cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 will-change-transform md:h-72 md:flex-row"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Visual */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-56 md:h-auto md:w-96 lg:w-[28rem]">
          <FlowVisual />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-800/50 md:bg-gradient-to-r" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-center p-6">
          <span className="mb-2 inline-block w-fit rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-400">
            {agent.type}
          </span>

          <h2
            className={`${pressStart.className} mb-2 text-sm transition-colors duration-300 group-hover:text-blue-400 md:text-base`}
          >
            {agent.title}
          </h2>

          <p
            className={`${geistMono.className} mb-3 line-clamp-2 text-xs text-gray-400 md:text-sm`}
          >
            {agent.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2">
            {agent.stack.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="rounded bg-slate-700/50 px-2 py-1 text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
            {agent.stack.length > 4 && (
              <span className="rounded bg-slate-700/50 px-2 py-1 text-xs text-gray-400">
                +{agent.stack.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-blue-500/50" />
      </motion.article>
    </Link>
  );
}
