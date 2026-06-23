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
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
