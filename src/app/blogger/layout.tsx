import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogger",
  description:
    "An AI writing companion that turns keyword research into an SEO content plan (pillars + clusters) and publish-ready blog posts.",
  alternates: { canonical: "/blogger" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
