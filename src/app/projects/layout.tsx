import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "A showcase of my work, highlighting my growth as a developer through continuous learning and gaining new skills every day.",
  path: "/projects",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
