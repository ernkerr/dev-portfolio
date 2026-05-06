import { asciiCamMetadata } from "./asciiCam";
import { autoclickerMetadata } from "./autoclicker";
import { bloggerMetadata } from "./blogger";
import { carpoolioMetadata } from "./carpoolio";
import { expoWestSchedulerMetadata } from "./expoWestScheduler";
import { groupSingAlongMetadata } from "./groupSingAlong";
import { ginScoreTrackerMetadata } from "./ginScoreTracker";
import { heartsScoreTrackerMetadata } from "./heartsScoreTracker";
import { teaCupboardMetadata } from "./teaCupboard";
import { ProjectMetadata } from "@/types/project";

export const allProjects: ProjectMetadata[] = [
  expoWestSchedulerMetadata,
  bloggerMetadata,
  asciiCamMetadata,
  autoclickerMetadata,
  heartsScoreTrackerMetadata,
  carpoolioMetadata,
  groupSingAlongMetadata,
  ginScoreTrackerMetadata,
  teaCupboardMetadata,
].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export {
  asciiCamMetadata,
  autoclickerMetadata,
  bloggerMetadata,
  carpoolioMetadata,
  expoWestSchedulerMetadata,
  groupSingAlongMetadata,
  ginScoreTrackerMetadata,
  heartsScoreTrackerMetadata,
  teaCupboardMetadata,
};
