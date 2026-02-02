import { BlogPost } from "@/types/blog";
import fs from "fs";
import path from "path";

/**
 * Reads all blog posts from the blogs directory
 * Each post is stored as a separate JSON file (e.g., my-post.json)
 */
export function getAllBlogPosts(): BlogPost[] {
  // Get the absolute path to the blogs directory
  const blogsDirectory = path.join(process.cwd(), "src/data/blogs");

  try {
    // Read all files in the directory
    const fileNames = fs.readdirSync(blogsDirectory);

    // Filter to only include .json files (exclude index.ts)
    const jsonFiles = fileNames.filter(
      (file) => file.endsWith(".json") && file !== "index.ts"
    );

    // Read and parse each JSON file into a BlogPost object
    const posts = jsonFiles.map((fileName) => {
      const filePath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContents) as BlogPost;
    });

    // Sort posts by date, newest first
    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch {
    // Return empty array if directory doesn't exist or any error occurs
    return [];
  }
}

/**
 * Finds a single blog post by its slug
 * The slug corresponds to the filename (e.g., "my-post" → "my-post.json")
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const blogsDirectory = path.join(process.cwd(), "src/data/blogs");
  const filePath = path.join(blogsDirectory, `${slug}.json`);

  try {
    // Read the JSON file matching the slug
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents) as BlogPost;
  } catch {
    // Return null if the file doesn't exist
    return null;
  }
}
