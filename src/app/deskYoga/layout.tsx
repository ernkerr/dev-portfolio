import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desk Yoga",
  description:
    "Feel better while you work, not before or after it. Desk Yoga is a cross-platform mobile app that guides you through short, desk-friendly yoga sessions.",
  alternates: { canonical: "/deskYoga" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
