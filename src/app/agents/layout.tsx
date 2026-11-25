import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Agents",
  description:
    "AI agents I've built for real production work: systems that read messy real-world inputs, reason with tools, and take action, with a human in the loop where it counts.",
  path: "/agents",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
