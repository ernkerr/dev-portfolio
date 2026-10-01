import type { Metadata } from "next";
import Image from "next/image";
import SiteShell from "@/components/site/SiteShell";
import { EMAIL, focusRing, mono, serif } from "@/components/site/links";

export const metadata: Metadata = {
  title: "About",
  description:
    "Erin Kerr is a product designer who engineers. Before design: 500+ research interviews at SRI International and brain-computer interface tools at Wispr AI.",
  alternates: { canonical: "/about" },
};

type Photo = { src: string; alt: string; width: number; height: number };

const SECTIONS: { label: string; photos: Photo[] }[] = [
  {
    label: "DJ",
    photos: [
      { src: "/images/about/dj2.jpeg", alt: "DJing on a Pioneer controller in a leopard-print coat.", width: 3024, height: 4032 },
      { src: "/images/about/dj.jpeg", alt: "DJing at an outdoor party under a shade sail.", width: 1170, height: 767 },
    ],
  },
  {
    label: "Snowboarder",
    photos: [
      { src: "/images/about/snowboard3.jpg", alt: "Two snowboarders in goggles pulling faces on a chairlift.", width: 4032, height: 3024 },
      { src: "/images/about/snowboard.JPG", alt: "A snowboarder on a slope below a rocky summit.", width: 1204, height: 1600 },
      { src: "/images/about/snowboard2.jpg", alt: "A snow angel between two snowed-in cars.", width: 1107, height: 1479 },
    ],
  },
  {
    label: "Outside",
    photos: [
      { src: "/images/about/hike.jpeg", alt: "Standing in front of blooming yellow gorse on a hike.", width: 2965, height: 2869 },
      { src: "/images/about/travel.jpg", alt: "Walking down a long white staircase between flags.", width: 2864, height: 3819 },
    ],
  },
  {
    label: "Cook",
    photos: [
      { src: "/images/about/cook.jpg", alt: "A steak searing in a cast-iron pan with butter.", width: 4284, height: 5712 },
      { src: "/images/about/bake.jpg", alt: "A crusty loaf of homemade bread on a cutting board.", width: 4284, height: 5712 },
    ],
  },
];

const inlineLink = `text-site-ink underline decoration-site-line underline-offset-4 transition-colors hover:text-site-blue hover:decoration-site-blue ${focusRing}`;

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="grid gap-12 pb-12 pt-16 md:pt-20 lg:grid-cols-2 lg:gap-6">
        <div className="max-w-xl">
          <h1
            className={`${serif} text-[40px] leading-[1.08] tracking-[-0.02em] md:text-[56px]`}
          >
            I&apos;m a designer, builder, &amp; DJ who started out studying
            brains.
          </h1>

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-site-muted">
            <p>
              My path into design wasn&apos;t traditional. I studied psychology,
              then spent over two years at SRI International running 500+
              interview sessions with teens and parents for two NIH-funded
              studies of adolescent brain development.
            </p>
            <p>
              At Wispr AI, a neurotech startup, I started building tools for
              brain-computer interface research, and that&apos;s when it
              clicked. Now I use the same interviewing skills to learn what
              people need before I design for them, then I write the code that
              ships it. Technology should be joyful to use, not something to
              tolerate.
            </p>
            <p>Outside of design and engineering, I&apos;m:</p>
            <ul className="list-disc space-y-1 pl-6 marker:text-site-line">
              <li>DJing</li>
              <li>snowboarding</li>
              <li>hiking &amp; traveling</li>
              <li>cooking &amp; baking bread</li>
              <li>
                teaching 17K followers to code as{" "}
                <a
                  href="https://instagram.com/erin.codes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={inlineLink}
                >
                  @erin.codes
                </a>
              </li>
            </ul>
            <p>
              To hire me or just say hi, reach out on{" "}
              <a
                href="https://linkedin.com/in/erinkerr17"
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                LinkedIn
              </a>{" "}
              or by{" "}
              <a href={`mailto:${EMAIL}`} className={inlineLink}>
                email
              </a>
              .
            </p>
          </div>
        </div>

        <div className="relative hidden aspect-[1408/768] self-start overflow-hidden border border-site-line lg:block">
          <Image
            src="/images/about/simpsonErin.png"
            alt="Simpsons-style illustration of Erin coding at her desk, the Golden Gate Bridge out the window."
            fill
            sizes="50vw"
            priority
            className="object-cover"
          />
        </div>
      </section>

      <section
        aria-label="Photos"
        className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2"
      >
        {SECTIONS.map((s, i) => (
          <div key={s.label}>
            <h2
              className={`${mono} mb-3 text-[12px] uppercase tracking-[0.06em] text-site-muted`}
            >
              {String(i + 1).padStart(2, "0")}. {s.label}
            </h2>
            <div className="grid grid-cols-3 items-start gap-3">
              {s.photos.map((p) => (
                <Image
                  key={p.src}
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 768px) 16vw, 33vw"
                  className="h-auto w-full border border-site-line"
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
