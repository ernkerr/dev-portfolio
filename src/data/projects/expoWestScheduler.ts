import { ProjectMetadata } from "@/types/project";

export const expoWestSchedulerMetadata: ProjectMetadata = {
  slug: "scheduler",
  title: "Expo West Scheduler",
  shortDescription:
    "A lightweight Expo West 2026 planner with personal schedule saving and safe refresh when official events change.",
  type: "Tool",
  stack: ["Next.js", "React", "TypeScript", "LocalStorage"],
  link: "/scheduler",
  thumbnail: "/expo_west2.png",
  featured: true,
  order: 9999,
};
