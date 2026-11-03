import type { Metadata } from "next";
import SchedulerApp from "@/components/expoWest2026/SchedulerApp";

export const metadata: Metadata = {
  title: "Natural Products Expo West 2026 Scheduler",
  description:
    "Save your personal conference plan and keep it synced with official schedule changes.",
  alternates: { canonical: "/scheduler" },
};

export default function SchedulerPage() {
  return <SchedulerApp />;
}
