import { autoclickerMetadata } from "./autoclicker";
import { bloggerMetadata } from "./blogger";
import { carpoolioMetadata } from "./carpoolio";
import { groupSingAlongMetadata } from "./groupSingAlong";
import { ginScoreTrackerMetadata } from "./ginScoreTracker";
import { heartsScoreTrackerMetadata } from "./heartsScoreTracker";
import { teaCupboardMetadata } from "./teaCupboard";
import { ProjectMetadata } from "@/types/project";

export const allProjects: ProjectMetadata[] = [
  bloggerMetadata,
  autoclickerMetadata,
  heartsScoreTrackerMetadata,
  carpoolioMetadata,
  groupSingAlongMetadata,
  ginScoreTrackerMetadata,
  teaCupboardMetadata,
].sort((a, b) => (a.order || 999) - (b.order || 999));

export {
  autoclickerMetadata,
  bloggerMetadata,
  carpoolioMetadata,
  groupSingAlongMetadata,
  ginScoreTrackerMetadata,
  heartsScoreTrackerMetadata,
  teaCupboardMetadata,
};
