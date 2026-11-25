import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Git Racer",
  description:
    "Race your friends, race famous developers, and turn your GitHub contributions into a competitive sport.",
  path: "/gitRacer",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
