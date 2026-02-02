"use client";

import { motion } from "framer-motion";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/BlogCard";
import { pressStart } from "../../../public/fonts/fonts";

// Animation variants for staggered card reveal
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

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <>
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
          Blog
        </h1>
        <p className="max-w-2xl text-base text-gray-300 md:text-lg lg:text-xl">
          Thoughts, tutorials, and insights on web development and software
          engineering.
        </p>
      </motion.section>

      {/* Blog Posts Grid */}
      <motion.section
        className="px-8 pb-24 md:px-16 lg:px-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {posts.length === 0 ? (
          <p className="text-gray-400">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="flex flex-col gap-8">
            {posts.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </>
  );
}
