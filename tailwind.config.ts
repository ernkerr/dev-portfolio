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
        // The phone around live app demos in case studies (LivePhone's
        // device frame): a black titanium body, its edge and side buttons.
        // Fixed, so the phone stays black on the engineer side.
        device: {
          body: "#0B0B0D",
          edge: "#3A3A40",
          button: "#1C1C20",
        },
        // The aquarium on Fun (src/app/fun/aquarium): flat water, light,
        // sand and weeds for everyone's fish. Not part of the site palette.
        tank: {
          surface: "#BFE6F0", // the light at the top of the water
          water: "#7FC4D9",
          deep: "#4E9CBB", // the bottom of the water
          ray: "#E3F5F9", // light falling through it
          sand: "#E8D3A2",
          "sand-shade": "#D4BB84",
          weed: "#5E9E6E",
          "weed-light": "#86BF7E",
          stone: "#8A8F98",
          "stone-light": "#AEB3BB",
          bubble: "#F2FBFD",
          rim: "#1E1D1B", // the tank's black frame
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
          // My Pioneer DJ Opus Quad, from the maker's photo: matte black, the
          // wood-and-brass front panel, copper knobs
          dj: {
            body: "#333335",
            base: "#1C1C1D",
            screen: "#141416",
            jog: "#3A3A3C",
            groove: "#4A4A4D",
            wood: "#4D4133",
            "wood-light": "#6A5640",
            "wood-dark": "#33291F",
            copper: "#B07755",
            "copper-light": "#D9A07A",
            // Turned on, once the headphones are plugged in: the lit
            // screens, the waveforms (lows blue, mids amber, highs white,
            // as Rekordbox draws them), the jog rings and hot cue pads
            "lit-screen": "#0E1830",
            "lit-blue": "#3A7BFF",
            "lit-amber": "#FFA928",
            "lit-green": "#3DDC84",
            "lit-cyan": "#38D3F2",
            "lit-pink": "#FF5FA2",
            // More hot cue colors, for DJ 5's pads, which set the jog rings'
            "lit-red": "#FF4B4B",
            "lit-yellow": "#FFE14D",
            "lit-violet": "#9B6BFF",
          },
          // My purple Fujifilm FinePix Z37, from the maker's photos
          camera: {
            DEFAULT: "#6C22D4", // the body
            dark: "#4B139E", // its rim and feet
            light: "#A463F7", // the brushed front panel's sheen
            panel: "#7A30E2", // the front panel
            chrome: "#D9DEE3", // the top plate, shutter and lens ring
            "chrome-dark": "#9AA2AB",
            lens: "#151A2B",
            glint: "#9FB4FF", // reflections in the lens
            glass: "#141417", // round the screen, and the button panel
            screen: "#2B2B31", // the screen, off
            key: "#2C2C33", // the buttons
            label: "#F1EEF6", // their labels and the front lettering
            accent: "#C8A43C", // the gold arrows on the buttons
            // Camera 4, traced closer to the photos: the light catching the
            // top of the body and the brushed cover, the deepest shadow,
            // the chrome's bright edge, the lens's blue depth and its
            // purple flare, and the screen surround's sheen
            violet: "#8B42F2",
            shine: "#C7A0FF",
            deep: "#360B7D",
            "chrome-light": "#F5F7F9",
            "lens-blue": "#24357F",
            flare: "#B47CFF",
            bezel: "#26262D",
          },
          // My lava lamp, from a photo of it off: the silver cap and foot,
          // the darker collar, the pale liquid and the wax settled under
          // it; then lit, guessed until I have a photo of it on
          lava: {
            chrome: "#C9CED3",
            "chrome-light": "#F0F3F5",
            "chrome-dark": "#878E95",
            collar: "#5A5557",
            "collar-light": "#8F8A8C",
            liquid: "#E2E5C6",
            "liquid-edge": "#C4C8A6",
            wax: "#D5CE9F",
            "lit-liquid": "#EEF4A6",
            "lit-wax": "#FFF3D2",
            // Lava lamp 4: its wax off, a warm cream; lit, amber, and the
            // light through its clear glass
            cream: "#E6D1A2",
            amber: "#FFB144",
            warm: "#FFE0A0",
          },
          // Pothos 4's leaves: a brighter green than the snake plant, its
          // shade and its light, and golden pothos's streaks
          pothos: {
            DEFAULT: "#4E7D33",
            dark: "#355A22",
            light: "#86AC57",
            streak: "#E4D27E",
          },
          // The window: its white frame and the shade in its corners; the
          // sky through it, top and low, at night, dawn, day and dusk, and
          // grey on a cloudy day or night, with its sun, moon, stars and
          // clouds; and the city under it, near and far, by the time of
          // day, its windows lit at night
          window: {
            frame: "#F4F1EB",
            shade: "#D8D2C6",
          },
          // My white desk under the window, and the shade along its edges
          desk: {
            DEFAULT: "#F3F1EC",
            shade: "#D6D1C7",
          },
          sky: {
            "night-top": "#0B1430",
            "night-low": "#22305A",
            "dawn-top": "#4A5A92",
            "dawn-low": "#F4A988",
            "day-top": "#5FA8E6",
            "day-low": "#CFE8F8",
            "dusk-top": "#4B3F7E",
            "dusk-low": "#F49A6C",
            "gray-top": "#8C99A6",
            "gray-low": "#C9D1D8",
            "gray-night-top": "#1A2236",
            "gray-night-low": "#33405A",
            sun: "#FFE08A",
            moon: "#F2EFE2",
            "cloud-dusk": "#F3C6BE",
            "cloud-night": "#3E4866",
            "cloud-gray": "#AEB8C2",
          },
          city: {
            day: "#8393A6",
            "day-far": "#A9B6C5",
            dusk: "#3D3D5C",
            "dusk-far": "#5D5A7E",
            night: "#141A2C",
            "night-far": "#252E48",
            lit: "#FFD98A",
          },
          // My closet: the long leather jacket (black, its edges and
          // buttons, its sheen), the cheetah fur coat in a darker cheetah
          // print (its tan-brown ground, its collar's light and its
          // shadows, the spots), the disco dress's silver sequins (mid,
          // bright, dim, and the dark between them), my oxblood Docs (the
          // leather, its shadow and its light; black laces, eyelets, sole
          // and welt, and the yellow welt stitching), and the sunnies on
          // their strap: black, tortoiseshell, slim brown ovals (their
          // frames and lenses), red-orange tortoiseshell (its deep red and
          // amber, and their orange lenses) and my red ones (the frame,
          // its light and shadow, the lenses); and the color each pair
          // tints the page when it's on: red, a little darker, sepia,
          // orange, warm brown
          leather: {
            DEFAULT: "#1C1B1E",
            edge: "#33323A",
            sheen: "#4A4952",
          },
          cheetah: {
            DEFAULT: "#9A6A3C",
            light: "#C29460",
            dark: "#5E3E22",
            spot: "#22150C",
          },
          sequin: {
            DEFAULT: "#B9C0C8",
            light: "#EEF1F4",
            dark: "#848D97",
            deep: "#4D545C",
          },
          docs: {
            DEFAULT: "#151416",
            sheen: "#3A3A40",
            sole: "#232325",
            stitch: "#E8C21A",
            oxblood: "#5B1A22",
            "oxblood-dark": "#35090F",
            "oxblood-light": "#8A3039",
          },
          sunnies: {
            strap: "#E9E2D3",
            black: "#141416",
            lens: "#3A3D44",
            tortoise: "#6B3E1E",
            "tortoise-spot": "#2E1A0C",
            "tortoise-lens": "#8A5A2B",
            "tortoise-light": "#A86A35",
            red: "#D7263D",
            "red-lens": "#F05A66",
            "red-dark": "#9E1427",
            "red-light": "#F58A94",
            orange: "#D4421F",
            "orange-lens": "#F49A45",
            "orange-dark": "#9C2410",
            "orange-light": "#F4A43A",
            brown: "#5E3B27",
            "brown-lens": "#2E1B12",
            tint: "#FF3B3B",
            "tint-dark": "#5F6670",
            "tint-sepia": "#C9A270",
            "tint-orange": "#FF8A2A",
            "tint-brown": "#8A5A3A",
          },
          // My black and gold clock: its case, face, rim and white numbers
          // (its hands and legs are room-gold)
          clock: {
            DEFAULT: "#1B1B1D",
            face: "#242427",
            rim: "#3C3C41",
            numeral: "#EDE7D8",
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
        chat: "26rem", // ErinLLM's panel from 768px (w-chat)
      },

      aspectRatio: {
        photo: "4 / 3", // photos taken with the About page's camera
        tank: "16 / 9", // the aquarium, on wider screens
        "tank-tall": "4 / 5", // and on phones
        canvas: "8 / 5", // drawing a fish for it
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

      // The About room's headphones: rocking on a cup, the cord swaying.
      // The Opus Quad once they're plugged in: its lights coming on, the
      // waveforms scrolling (one 96px stretch of beats, at 120 BPM), the
      // jog wheels turning at 33 rpm, the level meters bouncing and the
      // play buttons blinking until they're pressed. The camera's flash.
      keyframes: {
        // The aquarium's weeds swaying and bubbles rising
        "tank-sway": {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        "tank-bubble": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "100%": { transform: "translateY(-100cqh)", opacity: "0" },
        },
        "phones-rock": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-3deg)" },
        },
        "cord-swing": {
          "0%, 100%": { transform: "rotate(2.5deg)" },
          "50%": { transform: "rotate(-2.5deg)" },
        },
        "dj-on": {
          from: { opacity: "0" },
        },
        "dj-scroll": {
          to: { transform: "translateX(-96px)" },
        },
        "jog-spin": {
          to: { transform: "rotate(360deg)" },
        },
        "dj-blink": {
          "50%": { opacity: "0.25" },
        },
        "camera-flash": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        // The window's weather: clouds drifting across, rain and snow
        // falling, fog drifting, a storm's lightning, stars twinkling
        "cloud-drift": {
          from: { transform: "translateX(-70px)" },
          to: { transform: "translateX(230px)" },
        },
        "rain-fall": {
          "0%": { transform: "translate(0, -12px)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translate(-12px, 230px)", opacity: "0.8" },
        },
        "snow-fall": {
          "0%": { transform: "translate(0, -8px)" },
          "50%": { transform: "translate(5px, 110px)" },
          "100%": { transform: "translate(-2px, 230px)" },
        },
        "fog-drift": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-24px)" },
        },
        lightning: {
          "0%, 90%, 94%, 100%": { opacity: "0" },
          "91%": { opacity: "0.7" },
          "95%": { opacity: "0.45" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        // The lava lamp's wax, drifting up and back down, stretching as it
        // rises
        "lava-a": {
          "0%, 100%": { transform: "translateY(0) scale(1, 1)" },
          "50%": { transform: "translateY(-17px) scale(0.85, 1.25)" },
        },
        "lava-b": {
          "0%, 100%": { transform: "translateY(-2px) scale(1, 1)" },
          "45%": { transform: "translateY(-20px) scale(1.15, 0.9)" },
        },
        "lava-c": {
          "0%, 100%": { transform: "translateY(0) scale(0.9, 1.1)" },
          "55%": { transform: "translateY(-12px) scale(1.1, 0.95)" },
        },
        "dj-level": {
          "0%, 100%": { transform: "scaleY(1)" },
          "35%": { transform: "scaleY(0.55)" },
          "70%": { transform: "scaleY(0.75)" },
        },
      },
      animation: {
        "tank-sway": "tank-sway 6s ease-in-out infinite",
        "tank-bubble": "tank-bubble 7s linear infinite",
        "phones-rock": "phones-rock 5s ease-in-out infinite",
        "cord-swing": "cord-swing 5s ease-in-out infinite",
        "dj-on": "dj-on 600ms ease-out",
        "dj-scroll": "dj-scroll 2s linear infinite",
        "jog-spin": "jog-spin 1.8s linear infinite",
        "dj-level": "dj-level 500ms ease-out infinite",
        "dj-blink": "dj-blink 1s step-end infinite",
        "camera-flash": "camera-flash 400ms ease-out forwards",
        "cloud-drift": "cloud-drift 120s linear infinite",
        "rain-fall": "rain-fall 1.4s linear infinite",
        "snow-fall": "snow-fall 14s linear infinite",
        "fog-drift": "fog-drift 24s ease-in-out infinite",
        lightning: "lightning 9s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "lava-a": "lava-a 14s ease-in-out infinite",
        "lava-b": "lava-b 19s ease-in-out infinite",
        "lava-c": "lava-c 23s ease-in-out infinite",
      },

      transitionTimingFunction: {
        switch: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
