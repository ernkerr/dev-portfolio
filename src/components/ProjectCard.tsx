"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectMetadata } from "@/types/project";
import { pressStart, geistMono } from "../../public/fonts/fonts";

interface ProjectCardProps {
  project: ProjectMetadata;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window);
  }, []);

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovering(true);
    if (videoRef.current && project.video) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked
      });
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleTap = () => {
    if (!isTouchDevice || !project.video) return;
    setIsHovering((prev) => {
      const newState = !prev;
      if (newState) {
        videoRef.current?.play().catch(() => {});
      } else {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
      return newState;
    });
  };

  return (
    <Link href={`/${project.slug}`}>
      <motion.article
        className="group relative flex h-64 transform-gpu cursor-pointer overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 will-change-transform md:h-72"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={isTouchDevice ? handleTap : undefined}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Media Container */}
        <div className="relative w-80 shrink-0 overflow-hidden md:w-96 lg:w-[28rem]">
          {/* Thumbnail Image */}
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className={`object-cover transition-opacity duration-500 ${
              isHovering && project.video ? "opacity-0" : "opacity-100"
            }`}
            sizes="448px"
          />

          {/* Video */}
          {project.video && (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-800/50" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-center p-6">
          {/* Project Type Badge */}
          <span className="mb-2 inline-block w-fit rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-400">
            {project.type}
          </span>

          {/* Title */}
          <h2
            className={`${pressStart.className} mb-2 text-sm transition-colors duration-300 group-hover:text-blue-400 md:text-base`}
          >
            {project.title}
          </h2>

          {/* Description */}
          <p
            className={`${geistMono.className} mb-3 line-clamp-2 text-xs text-gray-400 md:text-sm`}
          >
            {project.shortDescription}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="rounded bg-slate-700/50 px-2 py-1 text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="rounded bg-slate-700/50 px-2 py-1 text-xs text-gray-400">
                +{project.stack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-blue-500/50" />
      </motion.article>
    </Link>
  );
}
