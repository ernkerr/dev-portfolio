import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/blogger" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
