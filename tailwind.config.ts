import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // OrderSync design-system palette (used by the design case study)
        navy: {
          1: "#0E172B",
          2: "#151F34",
          3: "#1C274C",
          4: "#0F172A",
        },
        accent: {
          from: "#9333EA",
          to: "#06B6D4",
        },
        // 2026 edition palette (home, fun, about). Values live in
        // globals.css so the homepage switch can invert them.
        site: {
          paper: "rgb(var(--site-paper) / <alpha-value>)",
          ink: "rgb(var(--site-ink) / <alpha-value>)",
          muted: "rgb(var(--site-muted) / <alpha-value>)",
          line: "rgb(var(--site-line) / <alpha-value>)",
          blue: "rgb(var(--site-blue) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
