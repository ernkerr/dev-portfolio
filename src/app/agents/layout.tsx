import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/agents" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
