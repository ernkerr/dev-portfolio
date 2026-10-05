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
        // globals.css so the homepage switch can invert them. site-blue is
        // the brand blue (#001AFF, shared with Cyber Goose).
        site: {
          paper: "rgb(var(--site-paper) / <alpha-value>)",
          ink: "rgb(var(--site-ink) / <alpha-value>)",
          muted: "rgb(var(--site-muted) / <alpha-value>)",
          line: "rgb(var(--site-line) / <alpha-value>)",
          blue: "rgb(var(--site-blue) / <alpha-value>)",
        },
        // The room illustration on About (src/app/about/Room.tsx), picked
        // from a photo of my old bedroom. Not part of the site palette.
        room: {
          wood: "#4A3527", // walnut shelf board edges
          "wood-light": "#6B4F3A", // board tops catching the light
          metal: "#1E1D1B", // black shelf frame
          brass: "#C9A25E", // lamp base, pole, arm and cap
          // Lamp 5's gold: the metal, its highlights and its shadows
          gold: {
            DEFAULT: "#D9A932",
            light: "#F7DE8C",
            dark: "#A9781C",
          },
          glass: "#A9B8C0", // the lamp's clear glass shade (edges; tint at low opacity)
          "glass-amber": "#F2A88A", // the first lamp's amber shade, for comparison
          glow: "#FFEAB0", // lit bulb, highlights and the disco ball's glint
          light: "#FFD45C", // the glow around lamp 5 when it's on
          frost: "#EEF2F4", // lamp 5's bubbles and bulb glass, off
          mirror: "#D3DADF", // silver shards on the disco ball
          // The disco ball's colored glass shards
          disco: {
            plum: "#5B3F6B",
            lilac: "#8E7BA3",
            wine: "#7A2C3C",
            bronze: "#9A7146",
            taupe: "#6A5A50",
          },
        },
      },

      // ---- 2026 edition design tokens (see CLAUDE.md) ----

      // The brand faces, loaded with next/font in layout.tsx. code and pre
      // keep the system mono stack (globals.css) so older pages don't change.
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "Menlo", "monospace"],
      },

      // The type scale. Serif: display, section, subhead, column-title,
      // tile-title. Sans: lead, body, body-sm, caption. Mono (uppercase):
      // label, nav; date stays sentence case. -sm sizes are below 768px.
      fontSize: {
        display: ["56px", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-sm": [
          "40px",
          { lineHeight: "1.08", letterSpacing: "-0.02em" },
        ],
        section: ["40px", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "section-sm": [
          "30px",
          { lineHeight: "1.12", letterSpacing: "-0.015em" },
        ],
        subhead: ["26px", { lineHeight: "1.375" }],
        "column-title": ["21px", { lineHeight: "1.375" }],
        "tile-title": ["17px", { lineHeight: "1.375" }],
        lead: ["21px", { lineHeight: "1.6" }],
        "lead-sm": ["19px", { lineHeight: "1.6" }],
        body: ["16px", { lineHeight: "1.7" }],
        "body-sm": ["15px", { lineHeight: "1.65" }],
        caption: ["13px", { lineHeight: "1.625" }],
        label: ["12px", { letterSpacing: "0.06em" }],
        nav: ["13px", { letterSpacing: "0.04em" }],
        date: "13px",
      },

      spacing: {
        gutter: "1.5rem", // page side padding at every width
        header: "4rem", // sticky header height
        "section-sm": "5rem", // between case-study sections below 768px
        section: "8rem", // between sections from 768px up, above the footer
      },

      maxWidth: {
        measure: "40rem", // reading width, about 75 characters
        article: "56rem", // case-study column from 1024px
        page: "1600px", // header, main and footer
      },

      borderRadius: {
        "app-icon": "22%",
      },

      boxShadow: {
        knob: "0 4px 12px rgba(15, 23, 42, 0.25)",
        float: "0 18px 48px rgba(15, 23, 42, 0.22)",
        switch: "0 8px 24px rgba(15, 23, 42, 0.35)",
      },

      transitionTimingFunction: {
        switch: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
