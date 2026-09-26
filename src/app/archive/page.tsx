import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EDITIONS } from "@/data/editions";

export const metadata: Metadata = {
  title: "Archive",
  description: "Every past version of erinkerr.me, kept exactly as it was.",
  alternates: { canonical: "/archive" },
};

const linkClass =
  "underline-offset-4 decoration-wavy decoration-1 hover:underline hover:text-[#001AFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001AFF]";

export default function ArchivePage() {
  return (
    <main className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)] text-black">
      <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
        <header className="mb-10">
          <h1 className="text-3xl font-medium tracking-tight">Archive</h1>
        </header>

        <ol className="grid gap-8 md:grid-cols-2">
          {EDITIONS.map((e, i) => (
            <li key={e.year}>
              <Link
                href={e.href}
                className="group mb-2 block overflow-hidden border border-black focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-[#001AFF]"
                aria-label={`${e.year} edition`}
              >
                <Image
                  src={e.thumbnail}
                  alt={e.alt}
                  width={e.width}
                  height={e.height}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority={i === 0}
                  className="block h-auto w-full grayscale transition-[filter] duration-150 ease-in-out group-hover:grayscale-0 group-focus-visible:grayscale-0 motion-reduce:transition-none"
                />
              </Link>
              <div className="flex justify-end text-sm">
                <Link href={e.href} className={linkClass} title={e.label}>
                  {e.year}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
