// The 2025 edition's fonts, still used by the older project pages and the
// archive. The 2026 edition loads its own in src/app/layout.tsx.
import {
  Geist,
  Geist_Mono,
  Press_Start_2P,
  Poiret_One,
  Fira_Code,
} from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export const poiretOne = Poiret_One({
  subsets: ["latin"],
  weight: "400",
});

export const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: "400",
});
