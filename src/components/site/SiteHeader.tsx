"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ErinLLM from "./erinllm/ErinLLM";
import { EMAIL, focusRing } from "./links";

// About carries the room illustration (about 200 KB), so instead of
// preloading it on every page, it preloads when someone points at the link.
const NAV = [
  { href: "/", label: "Work" },
  { href: "/fun", label: "Fun" },
  { href: "/about", label: "About", onIntent: true },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

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
            {NAV.map(({ href, label, onIntent }) => {
              const active = pathname === href;
              const preload = onIntent
                ? () => router.prefetch(href)
                : undefined;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    prefetch={onIntent ? false : undefined}
                    onMouseEnter={preload}
                    onFocus={preload}
                    onTouchStart={preload}
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

        <div className="flex items-center gap-6 justify-self-end">
          <ErinLLM />
          <a
            href={`mailto:${EMAIL}`}
            className={`hidden text-site-blue underline-offset-4 hover:underline md:block ${focusRing}`}
          >
            <span aria-hidden="true">✦ </span>Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
