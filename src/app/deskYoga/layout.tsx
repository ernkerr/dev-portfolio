import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Desk Yoga",
  description:
    "Feel better while you work, not before or after it. Desk Yoga is a cross-platform mobile app that guides you through short, desk-friendly yoga sessions.",
  path: "/deskYoga",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
