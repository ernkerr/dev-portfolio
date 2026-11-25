import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "My Tea Cupboard",
  description:
    "A platform for tea enthusiasts to track their tea collections and share their favorite teas with others.",
  path: "/teaCupboard",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
