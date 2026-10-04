"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EMAIL, focusRing } from "./links";

const NAV = [
  { href: "/", label: "Work" },
  { href: "/fun", label: "Fun" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-site-line bg-site-paper/90 backdrop-blur">
      <div
        className={`mx-auto flex h-header max-w-page items-center justify-between px-gutter font-mono text-nav uppercase md:grid md:grid-cols-[1fr_auto_1fr]`}
      >
        <Link href="/" className={`justify-self-start ${focusRing}`}>
          <span className="text-site-ink">Erin Kerr</span>
          <span className="ml-3 hidden text-site-muted lg:inline">
            Product &amp; UI/UX designer + engineer
          </span>
        </Link>

        <nav aria-label="Main">
          <ul className="flex gap-5 md:gap-8">
            {NAV.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`${focusRing} transition-colors ${
                      active
                        ? "text-site-blue"
                        : "text-site-muted hover:text-site-ink"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={`mailto:${EMAIL}`}
          className={`hidden justify-self-end text-site-blue underline-offset-4 hover:underline md:block ${focusRing}`}
        >
          <span aria-hidden="true">✦ </span>Get in touch
        </a>
      </div>
    </header>
  );
}
