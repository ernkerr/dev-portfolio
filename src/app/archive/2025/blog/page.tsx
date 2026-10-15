import type { Metadata } from "next";
import { getAllBlogPosts } from "@/data/blogs";
import NavBar from "@/app/archive/2025/_components/NavBar";
import BlogList from "./BlogList";

// The 2025 copy of /blog. Search engines index the live one.
export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  // Fetch all blog posts at build time (Server Component)
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <NavBar />
      <BlogList posts={posts} />
    </div>
  );
}
