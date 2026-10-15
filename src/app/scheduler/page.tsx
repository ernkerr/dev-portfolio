import type { Metadata } from "next";
import SchedulerApp from "@/components/expoWest2026/SchedulerApp";

export const metadata: Metadata = {
  alternates: { canonical: "/scheduler" },
};

export default function SchedulerPage() {
  return <SchedulerApp />;
}
