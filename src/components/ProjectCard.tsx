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
        className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 transform-gpu will-change-transform"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={isTouchDevice ? handleTap : undefined}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Media Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Thumbnail Image */}
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className={`object-cover transition-opacity duration-500 ${
              isHovering && project.video ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

          {/* Play indicator */}
          {project.video && !isHovering && (
            <div className="absolute right-4 top-4 rounded-full bg-blue-600/80 p-2">
              <svg
                className="h-4 w-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Project Type Badge */}
          <span className="mb-3 inline-block rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-400">
            {project.type}
          </span>

          {/* Title */}
          <h2
            className={`${pressStart.className} mb-3 text-sm transition-colors duration-300 group-hover:text-blue-400 md:text-base lg:text-lg`}
          >
            {project.title}
          </h2>

          {/* Description */}
          <p
            className={`${geistMono.className} mb-4 line-clamp-2 text-xs text-gray-400 md:text-sm`}
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
