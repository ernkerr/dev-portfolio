import type { Metadata } from "next";

// The 2025 copy of /blogger. Search engines index the live one.
export const metadata: Metadata = {
  alternates: { canonical: "/blogger" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
