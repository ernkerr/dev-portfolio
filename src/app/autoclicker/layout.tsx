import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoClicker",
  description:
    "A simple auto-clicker tool for macOS that lets users set up automatic mouse clicks at customizable intervals.",
  alternates: { canonical: "/autoclicker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
