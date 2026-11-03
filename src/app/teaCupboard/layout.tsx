import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Tea Cupboard",
  description:
    "A platform for tea enthusiasts to track their tea collections and share their favorite teas with others.",
  alternates: { canonical: "/teaCupboard" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
