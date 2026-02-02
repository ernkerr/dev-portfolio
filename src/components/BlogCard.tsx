"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlogPost } from "@/types/blog";
import { pressStart, geistMono } from "../../public/fonts/fonts";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Format the date nicely (e.g., "January 31, 2025")
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        className="group relative flex h-64 transform-gpu cursor-pointer overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 will-change-transform md:h-72"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container (if post has an image) */}
        {post.image && (
          <div className="relative w-80 shrink-0 overflow-hidden md:w-96 lg:w-[28rem]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="448px"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-800/50" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col justify-center p-6">
          {/* Article Type Badge */}
          <span className="mb-2 inline-block w-fit rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-400">
            {post.articleType || "Blog"}
          </span>

          {/* Title */}
          <h2
            className={`${pressStart.className} mb-2 text-sm transition-colors duration-300 group-hover:text-blue-400 md:text-base`}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p
            className={`${geistMono.className} mb-3 line-clamp-2 text-xs text-gray-400 md:text-sm`}
          >
            {post.excerpt}
          </p>

          {/* Date and Keywords */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500">{formattedDate}</span>
            {post.keywords.slice(0, 3).map((keyword, index) => (
              <span
                key={index}
                className="rounded bg-slate-700/50 px-2 py-1 text-xs text-gray-300"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-blue-500/50" />
      </motion.article>
    </Link>
  );
}
