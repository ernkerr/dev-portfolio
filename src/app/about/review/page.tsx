import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import Review from "./Review";

// Where I approve the photos people leave on the About page's camera.
// It's not linked anywhere and search engines skip it; it takes the key
// in CAMERA_REVIEW_KEY (locally, none).
export const metadata: Metadata = {
  title: "Review photos",
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <SiteShell>
      <section className="max-w-measure pb-12 pt-16 md:pt-20">
        <h1 className="font-serif text-display-sm md:text-display">
          Photos left on my camera
        </h1>
        <p className="mt-6 text-body text-site-ink/80">
          A photo someone leaves waits here, seen only by them, until I approve
          it. Then everyone sees it on the camera on my About page.
        </p>
      </section>
      <Review />
    </SiteShell>
  );
}
