import { pressStart } from "../../../public/fonts/fonts";

export default function AboutTab() {
  return (
    <section className="rounded-2xl bg-blue-600 p-6 shadow-md md:p-8">
      <h2 className={`${pressStart.className} mb-6 text-sm md:text-base`}>
        Built by Erin Kerr
      </h2>
      <p className="max-w-3xl text-sm leading-relaxed text-blue-50 md:text-base">
        I build websites, apps, and practical tools that help people get things
        done. If you need a product page, business site, internal tool, or a
        full app build, I can help you design and ship it.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="https://www.erinkerr.me"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        >
          Visit erinkerr.me
        </a>
        <a
          href="mailto:hello@erinkerr.me"
          className="rounded-lg border border-white/40 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
        >
          Email Erin
        </a>
        {/* <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-lg border border-white/20 px-4 py-2 text-sm text-blue-100/70"
        >
          Schedule Demo Call (Coming Soon)
        </button> */}
      </div>
    </section>
  );
}
