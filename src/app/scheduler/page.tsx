import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import SchedulerApp from "@/components/expoWest2026/SchedulerApp";

export const metadata: Metadata = pageMetadata({
  title: "Natural Products Expo West 2026 Scheduler",
  description:
    "Save your personal conference plan and keep it synced with official schedule changes.",
  path: "/scheduler",
});

export default function SchedulerPage() {
  return <SchedulerApp />;
}
