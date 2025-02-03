// fonts.ts
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
