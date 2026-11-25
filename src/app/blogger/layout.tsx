import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blogger",
  description:
    "An AI writing companion that turns keyword research into an SEO content plan (pillars + clusters) and publish-ready blog posts.",
  path: "/blogger",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
