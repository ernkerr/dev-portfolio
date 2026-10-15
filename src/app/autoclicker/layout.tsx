import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/autoclicker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
