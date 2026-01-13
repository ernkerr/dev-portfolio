import { carpoolioMetadata } from "./carpoolio";
import { groupSingAlongMetadata } from "./groupSingAlong";
import { ginScoreTrackerMetadata } from "./ginScoreTracker";
import { heartsScoreTrackerMetadata } from "./heartsScoreTracker";
import { teaCupboardMetadata } from "./teaCupboard";
import { ProjectMetadata } from "@/types/project";

export const allProjects: ProjectMetadata[] = [
  heartsScoreTrackerMetadata,
  carpoolioMetadata,
  groupSingAlongMetadata,
  ginScoreTrackerMetadata,
  teaCupboardMetadata,
].sort((a, b) => (a.order || 999) - (b.order || 999));

export {
  carpoolioMetadata,
  groupSingAlongMetadata,
  ginScoreTrackerMetadata,
  heartsScoreTrackerMetadata,
  teaCupboardMetadata,
};
