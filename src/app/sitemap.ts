import { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogs";
import { CASE_STUDIES } from "@/data/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://erinkerr.me";

  const blogPosts = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // The case studies on Work, plus Hearts on Fun.
  const caseStudies = CASE_STUDIES.map(({ slug }) => ({
    url: `${baseUrl}/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const staticPages = [
    { url: baseUrl, changeFrequency: "monthly" as const, priority: 1.0 },
    ...caseStudies,
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fun`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/agents`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/archive`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/archive/2025`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ];

  return [
    ...staticPages.map((page) => ({
      ...page,
      lastModified: new Date(),
    })),
    ...blogPosts,
  ];
}
