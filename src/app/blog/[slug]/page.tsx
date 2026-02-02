import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "@/data/blogs";
import NavBar from "@/components/NavBar";
import BlogPostContent from "./BlogPostContent";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all blog posts at build time
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  // Show 404 if post doesn't exist
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <NavBar />
      <BlogPostContent post={post} />
    </div>
  );
}
