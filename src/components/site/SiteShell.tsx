import SiteHeader from "./SiteHeader";
import { SOCIALS, focusRing, mono } from "./links";

// Page frame for the 2026 edition: sticky header, content, footer.
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-site-paper font-[family-name:var(--font-geist-sans)] text-site-ink">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6">
        {children}
      </main>
      <footer className="mt-32 border-t border-site-line">
        <div
          className={`${mono} mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-6 text-[12px] uppercase tracking-[0.06em] text-site-muted md:flex-row md:items-center md:justify-between`}
        >
          <p>Designed + coded by Erin</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {SOCIALS.map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`transition-colors hover:text-site-blue ${focusRing}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
