import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Redesign (2026 edition)",
  description:
    "The 2026 edition of erinkerr.me: a designer-first home page with an archive of every past version of the site.",
  robots: { index: false, follow: false },
};

const BLUE = "#001AFF";

// Every past edition of the site stays reachable, Lynn-Fisher style.
// When this becomes the root, the current bento site moves to /2024.
const EDITIONS = [
  { year: "2026", label: "Designer first", href: "/redesign", current: true },
  { year: "2024", label: "The bento grid", href: "/", current: false },
];

const FEATURED = [
  {
    href: "/orderSync",
    title: "OrderSync",
    sub: "Design system",
    img: "/images/orderSync/thumbnail.png",
    span: "md:col-span-7",
  },
  {
    href: "/carpoolio",
    title: "Carpoolio",
    sub: "Acquired 2026",
    img: "/images/carpoolio/thumbnail.png",
    span: "md:col-span-5",
  },
  {
    href: "/groupSingAlong",
    title: "Group Sing Along",
    sub: "Real-time web app",
    img: "/images/groupSingAlong/thumbnail.jpg",
    span: "md:col-span-5",
  },
  {
    href: "/ginScoreTracker",
    title: "Gin Score Tracker",
    sub: "iOS",
    img: "/images/ginScoreTracker/thumbnail.png",
    span: "md:col-span-7",
  },
];

export default function RedesignPage() {
  return (
    <main className="min-h-screen bg-white text-[#0E172B]">
      {/* EDITION BAR */}
      <div className="border-b border-[#0E172B]/10 bg-[#F6F7FB]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-2 text-xs md:px-10">
          <span className="text-[#0E172B]/60">
            This site gets a new design every year. You are looking at the{" "}
            <strong className="text-[#0E172B]">2026 edition</strong>.
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[#0E172B]/50">Archive</span>
            {EDITIONS.map((e) => (
              <Link
                key={e.year}
                href={e.href}
                className="rounded-full border px-3 py-1 font-medium"
                style={
                  e.current
                    ? { backgroundColor: BLUE, borderColor: BLUE, color: "white" }
                    : { borderColor: "rgba(14,23,43,0.2)", color: "#0E172B" }
                }
                title={e.label}
              >
                {e.year}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/redesign" className="flex items-center gap-3">
          <Image src="/ek.png" alt="Erin Kerr" width={32} height={32} className="h-8 w-8" unoptimized />
          <span className="text-sm font-medium tracking-tight">Erin Kerr</span>
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/design" className="hover:text-[#001AFF]">Design</Link>
          <Link href="/projects" className="hover:text-[#001AFF]">Projects</Link>
          <Link href="/blog" className="hover:text-[#001AFF]">Blog</Link>
          <Link href="/about" className="hover:text-[#001AFF]">About</Link>
          <Link href="/contact" className="hover:text-[#001AFF]">Contact</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-8 md:px-10 md:pb-20 md:pt-16">
        <h1 className="max-w-5xl text-[15vw] font-bold leading-[0.9] tracking-tighter md:text-[9rem]">
          Erin
          <br />
          <span style={{ color: BLUE }}>Kerr</span>
        </h1>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12">
          <p className="text-xl leading-relaxed text-[#0E172B]/80 md:col-span-7 md:text-2xl">
            Product designer who builds. I design apps and websites and then
            code them myself, from first sketches to the App Store. Psychology
            and neuroscience research before that, so I care what people
            actually do.
          </p>
          <div className="text-sm text-[#0E172B]/60 md:col-span-5 md:pl-8">
            <p>New York, NY</p>
            <p className="mt-1">Founder, Cyber Goose</p>
            <p className="mt-1">17K on @erin.codes</p>
            <div className="mt-5 flex gap-3">
              <Link
                href="/design"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: BLUE }}
              >
                Design work
              </Link>
              <Link
                href="/contact"
                className="rounded-full border px-5 py-2.5 text-sm font-semibold"
                style={{ borderColor: BLUE, color: BLUE }}
              >
                Say hi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED GRID */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {FEATURED.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`group relative block overflow-hidden rounded-3xl bg-[#F6F7FB] ${f.span}`}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-[#0E172B]/80 to-transparent p-6 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/70">{f.sub}</p>
                  <h3 className="text-2xl font-bold tracking-tight">{f.title}</h3>
                </div>
                <span className="text-sm font-semibold">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MARQUEE-ISH STRIP */}
      <section className="border-y border-[#0E172B]/10 bg-[#0E172B] text-white">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
          <p className="text-2xl font-semibold tracking-tight md:text-4xl">
            Technology should be joyful to use,{" "}
            <span style={{ color: "#8FA0FF" }}>not something to tolerate.</span>
          </p>
        </div>
      </section>

      {/* NOW */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BLUE }}>Now</p>
            <p className="mt-3 text-[#0E172B]/80">
              Looking for a product design apprenticeship or an early design role in New York.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BLUE }}>Building</p>
            <p className="mt-3 text-[#0E172B]/80">
              Client work through Cyber Goose and the OrderSync marketing site.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BLUE }}>Teaching</p>
            <p className="mt-3 text-[#0E172B]/80">
              Coding tutorials and build-in-public posts for 17K early-career developers on Instagram.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#0E172B]/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-[#0E172B]/60 md:px-10">
          <span>© 2026 Erin Kerr · 2026 edition</span>
          <div className="flex gap-5">
            <a href="mailto:Erin.kerr17@gmail.com" className="hover:text-[#001AFF]">Email</a>
            <a href="https://linkedin.com/in/erinkerr17" className="hover:text-[#001AFF]">LinkedIn</a>
            <a href="https://github.com/ernkerr" className="hover:text-[#001AFF]">GitHub</a>
            <a href="https://instagram.com/erin.codes" className="hover:text-[#001AFF]">@erin.codes</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
