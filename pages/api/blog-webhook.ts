import type { NextApiRequest, NextApiResponse } from "next";
import { BlogPost } from "@/types/blog";

/**
 * Webhook endpoint that receives blog posts and commits them to the repo
 *
 * Flow:
 * 1. Validate the secret header (X-AB-SECRET)
 * 2. Parse the incoming blog post data
 * 3. Use GitHub API to create a new file in src/data/blogs/
 * 4. The commit triggers Vercel to rebuild the site
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  // Validate the webhook secret
  const secret = req.headers["x-ab-secret"];

  if (secret !== process.env.AB_WEBHOOK_SECRET) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      debug: {
        receivedSecret: secret ? `${String(secret).slice(0, 4)}...` : "none",
        expectedSecretExists: !!process.env.AB_WEBHOOK_SECRET,
        headerKeys: Object.keys(req.headers),
      },
    });
  }

  try {
    // Extract blog post data from the request body
    const {
      title,
      slug,
      html,
      excerpt,
      metaDescription,
      keywords,
      intent,
      articleType,
      publishedAt,
      image,
    } = req.body;

    // Validate required fields
    if (!title || !slug || !html) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, slug, html",
      });
    }

    // Create the blog post object with a timestamp of when we received it
    const blogPost: BlogPost = {
      title,
      slug,
      html,
      excerpt: excerpt || "",
      metaDescription: metaDescription || "",
      keywords: keywords || [],
      intent: intent || "",
      articleType: articleType || "",
      publishedAt: publishedAt || new Date().toISOString(),
      receivedAt: new Date().toISOString(),
      image: image || undefined,
    };

    // Commit the blog post to GitHub
    await commitBlogPostToGitHub(blogPost);

    return res.status(200).json({
      success: true,
      message: `Blog post "${title}" committed successfully`,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

/**
 * Uses the GitHub API to commit a new blog post file to the repository
 * This triggers Vercel to rebuild and deploy the site with the new post
 */
async function commitBlogPostToGitHub(blogPost: BlogPost): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // e.g., "ernkerr/dev-portfolio"

  if (!token || !repo) {
    throw new Error("Missing GITHUB_TOKEN or GITHUB_REPO environment variables");
  }

  // The file path in the repo where the blog post will be saved
  const filePath = `src/data/blogs/${blogPost.slug}.json`;

  // Convert the blog post to JSON (pretty-printed for readability in the repo)
  const content = JSON.stringify(blogPost, null, 2);

  // GitHub API requires content to be base64 encoded
  const contentBase64 = Buffer.from(content).toString("base64");

  // GitHub API endpoint for creating/updating files
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  // Make the API request to create the file
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Add blog post: ${blogPost.title}`,
      content: contentBase64,
      branch: "main",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`GitHub API error: ${errorData.message || response.statusText}`);
  }
}
