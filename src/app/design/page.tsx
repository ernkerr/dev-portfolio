import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design",
  description:
    "Erin Kerr is a product designer who builds. Case studies: the OrderSync design system, Carpoolio, Group Sing Along, and Gin Score Tracker.",
  alternates: { canonical: "/design" },
};

const BLUE = "#001AFF";

const WORK = [
  {
    href: "/orderSync",
    title: "OrderSync Design System",
    tag: "Case study · Design system",
    blurb:
      "A scattered, effect-heavy marketing site rebuilt on one small token palette, shared page templates, and automatic light and dark modes.",
    img: "/images/orderSync/thumbnail.png",
  },
  {
    href: "/carpoolio",
    title: "Carpoolio",
    tag: "Mobile + web · Acquired 2026",
    blurb:
      "Partiful for road trips. Designed and coded solo, held a 4.9-star App Store rating, and was acquired earlier this year.",
    img: "/images/carpoolio/thumbnail.png",
  },
  {
    href: "/groupSingAlong",
    title: "Group Sing Along",
    tag: "Web app · Real-time",
    blurb:
      "Synchronized lyrics for family sing-alongs, built after watching the paper songbooks fall apart.",
    img: "/images/groupSingAlong/thumbnail.jpg",
  },
  {
    href: "/ginScoreTracker",
    title: "Gin Score Tracker",
    tag: "iOS · App Store",
    blurb: "A score tracker for Gin Rummy that stays out of the way of the game.",
    img: "/images/ginScoreTracker/thumbnail.png",
  },
];

const HOW = [
  {
    t: "Start with the person",
    d: "Psychology degree, three years running human-subjects research. I ask what someone is actually trying to do before I open Figma.",
  },
  {
    t: "Design it, then build it",
    d: "Every product here was designed and coded by me. The handoff problem disappears when the designer ships the code.",
  },
  {
    t: "Ship small, then listen",
    d: "The smallest useful version goes out first. Reviews and real use decide what changes next.",
  },
  {
    t: "Joy is a requirement",
    d: "Technology should be joyful to use, not something to tolerate. If people don't want to show it to a friend, it isn't done.",
  },
];

export default function DesignPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E172B]">
      {/* NAV */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/ek.png" alt="Erin Kerr" width={32} height={32} className="h-8 w-8" unoptimized />
          <span className="text-sm font-medium tracking-tight">Erin Kerr</span>
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/projects" className="hover:text-[#001AFF]">Projects</Link>
          <Link href="/about" className="hover:text-[#001AFF]">About</Link>
          <Link href="/contact" className="hover:text-[#001AFF]">Contact</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BLUE }}>
          Product design
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl">
          A designer who <span style={{ color: BLUE }}>builds</span> what she draws.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#0E172B]/70 md:text-xl">
          The first website I ever designed was for my mom, who loves interior
          design. I have designed every app and site I have shipped since, and
          coded them too. Psychology research taught me to watch what people
          actually do. Building taught me to ship.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#work"
            className="rounded-full px-6 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: BLUE }}
          >
            See the work
          </a>
          <Link
            href="/contact"
            className="rounded-full border px-6 py-3 text-sm font-semibold"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="border-t border-[#0E172B]/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Selected work</h2>
            <span className="text-sm text-[#0E172B]/50">2024 – 2026</span>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {WORK.map((w) => (
              <Link
                key={w.href}
                href={w.href}
                className="group block overflow-hidden rounded-3xl border border-[#0E172B]/10 bg-[#F6F7FB] transition-colors hover:border-[#001AFF]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={w.img}
                    alt={w.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: BLUE }}>
                    {w.tag}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight">{w.title}</h3>
                  <p className="mt-2 text-[#0E172B]/70">{w.blurb}</p>
                  <span className="mt-4 inline-block text-sm font-semibold" style={{ color: BLUE }}>
                    Read the case study →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="border-t border-[#0E172B]/10 bg-[#0E172B] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How I work</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {HOW.map((h) => (
              <div key={h.t} className="rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold" style={{ color: "#8FA0FF" }}>{h.t}</h3>
                <p className="mt-2 text-white/70">{h.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="border-t border-[#0E172B]/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <h2 className="text-2xl font-bold tracking-tight">Tools I reach for</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Figma",
              "Design systems",
              "Wireframing",
              "Prototyping",
              "React & React Native",
              "Next.js",
              "Tailwind",
              "Swift",
              "Supabase",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border px-4 py-1.5 text-sm"
                style={{ borderColor: "rgba(0,26,255,0.35)", color: BLUE }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#0E172B]/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-[#0E172B]/60 md:px-10">
          <span>Erin Kerr · New York, NY</span>
          <div className="flex gap-5">
            <a href="mailto:Erin.kerr17@gmail.com" className="hover:text-[#001AFF]">Email</a>
            <a href="https://linkedin.com/in/erinkerr17" className="hover:text-[#001AFF]">LinkedIn</a>
            <a href="https://cybergoose.org" className="hover:text-[#001AFF]">Cyber Goose</a>
            <a href="https://instagram.com/erin.codes" className="hover:text-[#001AFF]">@erin.codes</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
