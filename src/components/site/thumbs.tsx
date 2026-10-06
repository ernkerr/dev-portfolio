import { Space_Mono } from "next/font/google";
import Image from "next/image";
import { LuBuilding2, LuMail, LuMartini } from "react-icons/lu";

// Hand-built thumbnails for projects that have no single image that works.
// Every size is in cqw (percent of the tile's width) so the composition
// scales like an image. Content is real: OrderSync's own tokens, buttons and
// order flow; Carpoolio's own mark and landing-page colors; Gin Score
// Tracker's own buttons and gin icon.

const ORDERSYNC_LOGO = "/images/home/thumbs/ordersync-logo.png";

// From the OrderSync palette (case study swatches + accent gradient).
const TOKENS = [
  { name: "navy-1", hex: "#0E172B", fill: "#0E172B" },
  { name: "navy-2", hex: "#151F34", fill: "#151F34" },
  { name: "navy-3", hex: "#1C274C", fill: "#1C274C" },
  { name: "accent", hex: "#9333EA", fill: "linear-gradient(135deg, #9333EA, #06B6D4)" },
];

const monoFont = "font-[family-name:var(--font-geist-mono)]";

export function OrderSyncTokens() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[64%] rounded-[2.2cqw] bg-white p-[3.6cqw] shadow-[0_2.6cqw_7cqw_rgba(14,23,43,0.16)] ring-1 ring-black/5">
        <div className="flex items-center gap-[1.6cqw]">
          <Image
            src={ORDERSYNC_LOGO}
            alt=""
            width={96}
            height={96}
            className="w-[5.2cqw] rounded-[1.2cqw]"
          />
          <span className="text-[length:2.4cqw] font-semibold tracking-tight text-[#0E172B]">
            OrderSync
          </span>
          <span
            className={`${monoFont} ml-auto text-[length:1.5cqw] uppercase tracking-wider text-[#64748B]`}
          >
            Color tokens
          </span>
        </div>
        <div className="mt-[3cqw] grid grid-cols-4 gap-[1.6cqw]">
          {TOKENS.map((s) => (
            <div key={s.name}>
              <div
                className="aspect-square rounded-[1.2cqw]"
                style={{ background: s.fill }}
              />
              <p
                className={`${monoFont} mt-[1cqw] text-[length:1.5cqw] text-[#0E172B]`}
              >
                {s.name}
              </p>
              <p
                className={`${monoFont} text-[length:1.35cqw] text-[#64748B]`}
              >
                {s.hex}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-[3cqw] flex gap-[1.2cqw] text-[length:1.7cqw] font-medium">
          <span className="rounded-full bg-[#0E172B] px-[2.4cqw] py-[1.1cqw] text-white">
            Book a Call
          </span>
          <span className="rounded-full px-[2.4cqw] py-[1.1cqw] text-[#0E172B] ring-1 ring-[#0E172B]/15">
            Try Free Tools
          </span>
        </div>
      </div>
    </div>
  );
}

function FlowNode({
  children,
  glow = false,
}: {
  children: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 items-center gap-[1.8cqw] rounded-[2cqw] border bg-[#151F34] px-[3cqw] py-[2.4cqw] text-[length:3cqw] font-medium text-white ${
        glow
          ? "border-[#9333EA]/70 shadow-[0_0_5cqw_rgba(147,51,234,0.45)]"
          : "border-white/10"
      }`}
    >
      {children}
    </div>
  );
}

function FlowLine() {
  return (
    <div className="relative h-px flex-1 bg-[#9333EA]/60">
      <span className="absolute left-1/2 top-1/2 h-[1.1cqw] w-[1.1cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A855F7]" />
    </div>
  );
}

export function OrderSyncFlow() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-[#0C1629]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.09) 1px, transparent 0)",
        backgroundSize: "2.4cqw 2.4cqw",
      }}
    >
      <div className="flex w-[90%] items-center">
        <FlowNode>
          <LuMail className="h-[3.4cqw] w-[3.4cqw] text-white/70" />
          Email
        </FlowNode>
        <FlowLine />
        <FlowNode glow>
          <Image
            src={ORDERSYNC_LOGO}
            alt=""
            width={96}
            height={96}
            className="w-[6cqw] rounded-[1.3cqw]"
          />
          OrderSync
        </FlowNode>
        <FlowLine />
        <FlowNode>
          <LuBuilding2 className="h-[3.4cqw] w-[3.4cqw] text-white/70" />
          ERP
        </FlowNode>
      </div>
    </div>
  );
}

export function CarpoolioMark() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#061423]">
      {/* The landing page, blurred down to its aurora colors. */}
      <Image
        src="/images/carpoolio/landing.png"
        alt=""
        fill
        sizes="50vw"
        className="scale-125 object-cover opacity-90 blur-2xl saturate-150"
      />
      <div className="absolute inset-0 flex items-center justify-center gap-[2.4cqw]">
        <Image
          src="/images/home/thumbs/carpoolio-mark.png"
          alt=""
          width={261}
          height={283}
          className="w-[7.5cqw]"
        />
        <span className="text-[length:6.4cqw] font-semibold tracking-tight text-white">
          Carpoolio
        </span>
      </div>
    </div>
  );
}

export function BloggerMark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[2cqw] bg-[#EEF0FF]">
      <Image
        src="/images/blogger/icon.png"
        alt=""
        width={512}
        height={512}
        className="w-[10cqw]"
      />
      <span className="text-[length:8cqw] font-bold tracking-tight text-[#0F172A]">
        blogger
      </span>
    </div>
  );
}

// Field Notes: each field's top word from the live data, on sticky notes in
// the Field Notes site's colors.
const FIELD_NOTES = [
  { field: "Design", word: "craft", bg: "#FDE68E", rot: "-2deg" },
  { field: "Product", word: "roadmap", bg: "#FBD3E3", rot: "1.5deg" },
  { field: "Engineering", word: "code", bg: "#CFE0FB", rot: "1deg" },
  { field: "Marketing", word: "campaigns", bg: "#CBEAD0", rot: "-1.5deg" },
];

export function FieldNotesMark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#EEF2F6]">
      <div className="grid grid-cols-2 gap-[3cqw]">
        {FIELD_NOTES.map((n) => (
          <div
            key={n.field}
            className="flex h-[17cqw] w-[26cqw] flex-col justify-between p-[2.2cqw] shadow-[0.6cqw_2cqw_3.2cqw_-1.6cqw_rgba(20,28,40,0.35)]"
            style={{ background: n.bg, transform: `rotate(${n.rot})` }}
          >
            <span
              className={`${monoFont} text-[length:1.6cqw] uppercase tracking-wider text-[#4F5B6B]`}
            >
              {n.field}
            </span>
            <span className="font-[family-name:var(--font-serif)] text-[length:4.4cqw] leading-none text-[#1F2835]">
              {n.word}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Gin Score Tracker's name on a card in the app's neo-brutalist style (as
// rebuilt in the case study's LiveBoard): 2px black borders, hard black
// shadows, Space Mono, and its #26ABFF. The martini glass stands in for
// "Gin", the same icon the app puts on a round won by gin. The two buttons
// are the app's own; the platform is from the case study's Facts.
const GIN_BLUE = "#26ABFF";
const ginHard = "0.7cqw 0.7cqw 0 #000";

export function GinMark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#D3EEFF]">
      <div
        className={`${spaceMono.className} w-[44%] rounded-[1cqw] border-[0.35cqw] border-black bg-white p-[3.2cqw] text-black`}
        style={{ boxShadow: "1.2cqw 1.2cqw 0 #000" }}
      >
        <p className="flex items-center justify-center gap-[0.8cqw] py-[1.2cqw] text-[length:3.3cqw] font-bold leading-none tracking-tight">
          <LuMartini className="h-[3.8cqw] w-[3.8cqw]" strokeWidth={2.5} />
          Score Tracker
        </p>
        <div
          className="mt-[3cqw] flex h-[6.4cqw] items-center justify-center rounded-[0.8cqw] border-[0.3cqw] border-black text-[length:2.4cqw]"
          style={{ boxShadow: ginHard }}
        >
          Mobile app
        </div>
        <div
          className="mt-[2.4cqw] flex h-[6.4cqw] items-center justify-center rounded-[0.8cqw] border-[0.3cqw] border-black font-sans text-[length:2.4cqw] font-semibold text-white"
          style={{ boxShadow: ginHard, background: GIN_BLUE }}
        >
          iPhone and iPad
        </div>
      </div>
    </div>
  );
}

// The 2025 homepage, whole, on its own background, so the old bento grid
// keeps its margins. Light mode for the designer side, dark for the engineer
// side; both shot from /archive/2025 at 1440 × 900 at the same moment. In
// the light shot the theme toggle is painted white (the site's own is a
// yellow gradient) so it doesn't pull the eye.
const OLD_SITE = {
  light: {
    src: "/images/home/thumbs/old-site-light.webp",
    bg: "bg-[#F1F5F9]",
  },
  dark: {
    src: "/images/home/thumbs/old-site-dark.webp",
    bg: "bg-[#0F172A]",
  },
};

export function PortfolioBefore({ mode }: { mode: "light" | "dark" }) {
  const { src, bg } = OLD_SITE[mode];
  return (
    <div className={`absolute inset-0 ${bg}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-contain"
      />
    </div>
  );
}
