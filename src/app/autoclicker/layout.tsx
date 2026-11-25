import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "AutoClicker",
  description:
    "A simple auto-clicker tool for macOS that lets users set up automatic mouse clicks at customizable intervals.",
  path: "/autoclicker",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
