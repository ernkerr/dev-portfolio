"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { pressStart, geistMono } from "../../../../public/fonts/fonts";

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  // Format the date nicely
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      className="px-8 pb-24 pt-8 md:px-16 md:pt-12 lg:px-24"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Back Link */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center text-sm text-gray-400 transition-colors hover:text-blue-400"
      >
        ← Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-8">
        {/* Article Type Badge */}
        <span className="mb-4 inline-block rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-400">
          {post.articleType || "Blog"}
        </span>

        {/* Title */}
        <h1
          className={`${pressStart.className} mb-4 text-xl md:text-3xl lg:text-4xl`}
        >
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          {post.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="rounded bg-slate-700/50 px-2 py-1 text-xs text-gray-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.image && (
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl md:h-96">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div
        className={`${geistMono.className} prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white prose-code:text-blue-300`}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </motion.article>
  );
}
