import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "ASCII Cam",
  description:
    "A real-time webcam and image to ASCII art converter with 9+ character sets, customizable colors, and export to PNG, MP4, and GIF. Built in about 2 hours.",
  path: "/asciiCam",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
