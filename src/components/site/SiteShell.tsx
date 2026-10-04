import SiteHeader from "./SiteHeader";
import { SOCIALS, focusRing } from "./links";

// Page frame for the 2026 edition: sticky header, content, footer.
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-site-paper font-sans text-site-ink">
      <SiteHeader />
      <main className="mx-auto w-full max-w-page flex-1 px-gutter">
        {children}
      </main>
      <footer className="mt-section border-t border-site-line">
        <div
          className={`mx-auto flex max-w-page flex-col gap-4 px-gutter py-6 font-mono text-label uppercase text-site-muted md:flex-row md:items-center md:justify-between`}
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
