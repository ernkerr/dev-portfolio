import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/archive/2025/carpoolio" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
