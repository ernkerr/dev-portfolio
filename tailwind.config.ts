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
          // The snake plant: leaves, their pale bands, back leaves, yellow-green
          // leaves; its pot
          plant: {
            DEFAULT: "#3E5A34",
            light: "#A9B86E",
            dark: "#2C4128",
            yellow: "#8A9450",
          },
          pot: {
            DEFAULT: "#F2E4D8", // blush cream glaze
            band: "#E7B6A2", // the pink stripe near the bottom
            foot: "#C9D4D4", // the pale blue-grey foot
            soil: "#4A3A2C",
            white: "#F3F0EA", // plant 1's plain white pot
            "white-shade": "#D6CFC4", // its rim and foot lines
          },
          // The books: paperback spines, Thinking, Fast and Slow's pencil
          book: {
            paper: "#F4F0E6",
            pencil: "#F2C230",
            eraser: "#E8A3A0",
            // Spine and cover colors, from photos of the books
            teal: "#1F8C95", // Shantaram's jacket
            red: "#C23A35", // Shantaram's palace, Water for Elephants, Five People's title
            rust: "#B4532F", // Psychology's worn leather
            maroon: "#5E1F27", // the Harvard Classics, Five People's spine
            slate: "#2E3238", // Ishihara, Modern Analysis
            taupe: "#4F4741", // The Astonishing Hypothesis, Reflections
            khaki: "#C4BC98", // The Pragmatic Programmer's title
            olive: "#A39A45", // The Divine Comedy
            sky: "#2C9AC4", // Love Does
            leaf: "#5BA346", // The Power of Kindness's sprout
            cream: "#EFE6D2", // Five People's cover, Water for Elephants' curtain
            amber: "#F0A24A", // Ishihara's dots
            // Hyperion's spine, sampled from a photo of the jacket
            hyperion: {
              lavender: "#C3C2E0", // top of the spine
              cream: "#FBF1DC",
              pink: "#E8B2B4",
              gold: "#E2B35E",
              ochre: "#C98A3E",
              umber: "#6B4330", // foot of the spine
            },
          },
          // The seagrass basket, dark to light, from a photo of it
          basket: {
            deep: "#1C0D06",
            shadow: "#4A2D1A",
            brown: "#6F492D",
            tan: "#90633F",
            straw: "#AD7E53",
            wheat: "#C89C6A",
            pale: "#E0BF8B",
          },
          // My black Beats headphones
          headphones: {
            DEFAULT: "#19191B", // glossy black shell, band and cord
            cushion: "#2E2E33",
            slider: "#5C5E63",
            red: "#D9232B", // the "b" logo
            // Headphones 2: matte black, a soft rim, and the "b" tone on tone
            matte: "#26262A",
            rim: "#38383E",
            logo: "#4A4A52",
          },
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
        "column-title": ["19px", { lineHeight: "1.375" }],
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
        "section-sm": "14rem", // between case-study sections below 768px
        section: "24rem", // between sections from 768px up, above the footer
      },

      maxWidth: {
        measure: "40rem", // reading width, about 75 characters
        article: "56rem", // case-study column from 1024px
        page: "1600px", // header, main and footer
      },

      borderRadius: {
        "app-icon": "22%",
        // An iPhone screen's corners on a 390 × 844 screenshot (about 55pt),
        // as a share of its width and height so it scales with the image
        "phone-screen": "14% / 6.5%",
      },

      boxShadow: {
        knob: "0 4px 12px rgba(15, 23, 42, 0.25)",
        float: "0 18px 48px rgba(15, 23, 42, 0.22)",
        switch: "0 8px 24px rgba(15, 23, 42, 0.35)",
      },

      // The About room's headphones: rocking on a cup, the cord swaying
      keyframes: {
        "phones-rock": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-3deg)" },
        },
        "cord-swing": {
          "0%, 100%": { transform: "rotate(2.5deg)" },
          "50%": { transform: "rotate(-2.5deg)" },
        },
      },
      animation: {
        "phones-rock": "phones-rock 5s ease-in-out infinite",
        "cord-swing": "cord-swing 5s ease-in-out infinite",
      },

      transitionTimingFunction: {
        switch: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
