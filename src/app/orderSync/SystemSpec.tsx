import { Inter } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import Shine from "@/components/Shine";
import { Caption, label } from "@/components/site/prose";

// OrderSync's design system as it shipped, laid out like a style guide:
// DESIGN-SYSTEM.md, src/styles/globals.css (:root and .dark),
// tailwind.config.ts and src/components/ui/ (Heading, Button, Eyebrow) on
// ordersync-static's origin/main. The type is set in OrderSync's own fonts:
// Satoshi (its variable woff2, from Fontshare) and Inter. Colors are
// OrderSync's, not this site's tokens.

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], display: "swap" });

const NAVIES = [
  { name: "navy-1", hex: "#0E172B", use: "Darkest; replaces black" },
  { name: "navy-2", hex: "#151F34", use: "Dark-mode page" },
  { name: "navy-3", hex: "#1C274C", use: "Headings and links" },
  { name: "navy-4", hex: "#0F172A", use: "Call-to-action band, diagram" },
  { name: "navy-5", hex: "#1C274C4D", use: "navy-3 at 30%, logo strip" },
];

// Each role and its value in light and dark mode; they flip on their own.
const ROLES = [
  { name: "surface", light: "#FFFFFF", dark: "#0E172B", use: "Page" },
  { name: "surface-muted", light: "#F9FAFB", dark: "#151F34", use: "Bands" },
  {
    name: "surface-inverse",
    light: "#0E172B",
    dark: "#FFFFFF",
    use: "Dark sections",
  },
  { name: "content", light: "#0E172B", dark: "#FFFFFF", use: "Text" },
  {
    name: "content-muted",
    light: "#64748B",
    dark: "#D1D5DB",
    use: "Secondary text",
  },
  {
    name: "content-subtle",
    light: "#9CA3AF",
    dark: "#9CA3AF",
    use: "Tertiary text",
  },
  { name: "content-link", light: "#1C274C", dark: "#E5E7EB", use: "Links" },
  {
    name: "content-inverse",
    light: "#FFFFFF",
    dark: "#0E172B",
    use: "Text on dark",
  },
  { name: "line", light: "#E5E7EB", dark: "#374151", use: "Borders" },
];

// The Heading primitive's levels at full width, and body text.
const SCALE = [
  { name: "Display", size: "72 / 78", px: 72, sample: "One System for" },
  { name: "H1", size: "48 / 58", px: 48, sample: "Still Typing Orders" },
  {
    name: "H2",
    size: "35 / 45",
    px: 35,
    sample: "Catch Errors Before They Cost You",
  },
  {
    name: "H3",
    size: "24 / 32",
    px: 24,
    sample: "How long does it take to go live?",
  },
];

function Swatch({ hex }: { hex: string }) {
  return (
    <span
      aria-hidden="true"
      className="block h-10 w-full border border-site-line"
      style={{ background: hex }}
    />
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid gap-x-8 gap-y-4 border-t border-site-line pt-5 md:grid-cols-[9rem_minmax(0,1fr)]">
      <p className="font-serif text-column-title text-site-ink">{title}</p>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

/** OrderSync's color, type and components on one sheet. */
export default function SystemSpec() {
  return (
    <figure className="flex flex-col gap-10">
      <Group title="Color">
        <div>
          <p className={`${label} mb-3`}>Brand navy</p>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {NAVIES.map((n) => (
              <li key={n.name}>
                <Swatch hex={n.hex} />
                <p className="mt-2 font-mono text-caption text-site-ink">
                  {n.name}
                </p>
                <p className="text-caption text-site-muted">
                  {n.hex.slice(0, 7)} • {n.use}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={`${label} mb-3`}>9 color roles, light and dark</p>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-3">
            {ROLES.map((r) => (
              <li key={r.name} className="flex items-center gap-3">
                <span className="flex shrink-0">
                  <span
                    aria-hidden="true"
                    className="block h-8 w-8 border border-site-line"
                    style={{ background: r.light }}
                  />
                  <span
                    aria-hidden="true"
                    className="block h-8 w-8 border border-l-0 border-site-line"
                    style={{ background: r.dark }}
                  />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-caption text-site-ink">
                    {r.name}
                  </span>
                  <span className="block text-caption text-site-muted">
                    {r.use}: {r.light} / {r.dark}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Group>

      <Group title="Type">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="border border-site-line bg-white p-5 text-[#0E172B]">
            <p
              className={`${satoshi.className} text-[56px] font-bold leading-none`}
            >
              Aa
            </p>
            <p className={`${satoshi.className} mt-3 text-[18px] font-bold`}>
              Satoshi
            </p>
            <p className="text-caption text-[#64748B]">Headings and buttons</p>
          </div>
          <div className="border border-site-line bg-white p-5 text-[#0E172B]">
            <p className={`${inter.className} text-[56px] leading-none`}>Aa</p>
            <p className={`${inter.className} mt-3 text-[18px] font-medium`}>
              Inter
            </p>
            <p className="text-caption text-[#64748B]">Body text</p>
          </div>
        </div>
        <ol className="flex flex-col border border-site-line bg-white text-[#0E172B]">
          {SCALE.map((t) => (
            <li
              key={t.name}
              className="grid items-baseline gap-x-6 border-b border-site-line px-5 py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)]"
            >
              <span className="font-mono text-caption text-[#64748B]">
                {t.name} • {t.size}
              </span>
              <span
                className={`${satoshi.className} truncate font-bold leading-tight`}
                style={{
                  fontSize: `clamp(20px, ${t.px / 14}vw, ${t.px}px)`,
                  letterSpacing:
                    t.px >= 48 ? "-1.6px" : t.px >= 35 ? "-1px" : "-0.5px",
                }}
              >
                {t.sample}
              </span>
            </li>
          ))}
          <li className="grid items-baseline gap-x-6 px-5 py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
            <span className="font-mono text-caption text-[#64748B]">
              Body • 16
            </span>
            <span className={`${inter.className} text-[16px] text-[#64748B]`}>
              Our AI agent reads, validates, and syncs orders from any source to
              your ERP.
            </span>
          </li>
        </ol>
      </Group>

      <Group title="Components">
        <div>
          <p className={`${label} mb-3`}>Button</p>
          <div
            aria-hidden="true"
            className={`${satoshi.className} grid gap-px border border-site-line bg-site-line sm:grid-cols-2`}
          >
            <div className="flex flex-wrap items-center gap-3 bg-white p-5">
              <span className="inline-flex items-center rounded-full bg-[#0E172B] px-8 py-3.5 font-medium tracking-[-0.2px] text-white">
                Primary
              </span>
              <span className="inline-flex items-center rounded-full border border-[#E5E7EB] px-8 py-3.5 font-medium tracking-[-0.2px] text-[#0E172B]">
                Secondary
              </span>
              <span className="inline-flex items-center rounded-full px-8 py-3.5 font-medium tracking-[-0.2px] text-[#0E172B]">
                Ghost
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 bg-[#0E172B] p-5">
              <span className="inline-flex items-center rounded-full bg-white px-8 py-3.5 font-medium tracking-[-0.2px] text-[#0E172B]">
                Inverse
              </span>
              <span className="text-caption text-white/70">
                For dark sections
              </span>
            </div>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className={`${label} mb-3`}>Eyebrow</p>
            <div
              aria-hidden="true"
              className="border border-site-line bg-white p-5"
            >
              <span
                className={`${satoshi.className} inline-flex items-center rounded-full border border-[#E5E7EB] px-4 py-1.5 text-[14px] font-medium text-[#64748B]`}
              >
                Why OrderSync
              </span>
            </div>
          </div>
          <div>
            <p className={`${label} mb-3`}>Section surfaces</p>
            <div
              aria-hidden="true"
              className="grid grid-cols-3 border border-site-line"
            >
              {[
                { name: "Default", bg: "#FFFFFF", fg: "#0E172B" },
                { name: "Muted", bg: "#F9FAFB", fg: "#0E172B" },
                { name: "Inverse", bg: "#0E172B", fg: "#FFFFFF" },
              ].map((x) => (
                <span
                  key={x.name}
                  className={`${satoshi.className} flex h-16 items-center justify-center text-[14px] font-medium`}
                  style={{ background: x.bg, color: x.fg }}
                >
                  {x.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Group>
      <Group title="Chrome accent">
        <p className="max-w-measure text-body-sm text-site-ink/75">
          Chrome shows up twice: on the Book a Call pill in the header, and as a
          silver glint that sweeps once across each headline’s key words. Hover
          the gray words to replay it.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className={`${label} mb-3`}>Pill</p>
            <div
              aria-hidden="true"
              className="flex h-full min-h-40 items-center justify-center border border-site-line bg-white p-5"
            >
              <span
                className={`${satoshi.className} inline-flex h-10 items-center rounded-full border border-gray-300 bg-gradient-to-b from-white to-gray-100 px-5 text-[14px] font-semibold text-[#0E172B] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_3px_rgba(0,0,0,0.08)]`}
              >
                Book a Call
              </span>
            </div>
          </div>
          <div>
            <p className={`${label} mb-3`}>Glint</p>
            <div className="flex min-h-40 items-center border border-site-line bg-white p-5 text-[#0E172B]">
              <p
                className={`${satoshi.className} text-[36px] font-bold leading-[1.08] tracking-[-1px]`}
              >
                One System for
                <br />
                <Shine className="font-bold">All Your Orders</Shine>
              </p>
            </div>
          </div>
        </div>
      </Group>
      <Caption>
        OrderSync’s design system as it shipped, set in its own fonts, Satoshi
        and Inter.
      </Caption>
    </figure>
  );
}
