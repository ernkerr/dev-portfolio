"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

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

  // Inject date after the first h1 tag
  const dateHtml = `<p class="text-sm text-gray-400 !mt-2 !mb-8">${formattedDate}</p>`;
  const htmlWithDate = post.html.replace(
    /(<\/h1>)/i,
    `$1${dateHtml}`
  );

  return (
    <motion.article
      className="mx-auto max-w-4xl px-6 pb-24 pt-8 md:px-8 md:pt-12 lg:px-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Back Link */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center text-sm text-gray-400 transition-colors hover:text-blue-400"
      >
        ← Back to Blogs
      </Link>

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
        className="prose prose-lg prose-invert max-w-none
          prose-headings:font-bold prose-headings:text-white
          prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-4 prose-h2:pt-8 prose-h2:border-t prose-h2:border-slate-700
          prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-3
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-strong:font-semibold
          prose-code:text-blue-300 prose-code:bg-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700
          prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
          prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
          prose-li:text-gray-300 prose-li:my-2
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400"
        dangerouslySetInnerHTML={{ __html: htmlWithDate }}
      />
    </motion.article>
  );
}
