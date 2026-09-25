import type { Metadata } from "next";
import BentoGrid from "./_components/BentoGrid";

// 2025 edition of erinkerr.me, frozen exactly as it shipped.
// Do not restyle: every component under ./_components is a snapshot.
export const metadata: Metadata = {
  title: "2025 edition",
  description:
    "The 2025 edition of erinkerr.me: the electric-blue bento grid, kept exactly as it was.",
  alternates: { canonical: "/archive/2025" },
};

export default function Archive2025Home() {
  return (
    <div>
      <BentoGrid />
    </div>
  );
}
