import { carpoolioMetadata } from "./carpoolio";
import { groupSingAlongMetadata } from "./groupSingAlong";
import { ginScoreTrackerMetadata } from "./ginScoreTracker";
import { ProjectMetadata } from "@/types/project";

export const allProjects: ProjectMetadata[] = [
  carpoolioMetadata,
  groupSingAlongMetadata,
  ginScoreTrackerMetadata,
].sort((a, b) => (a.order || 999) - (b.order || 999));

export { carpoolioMetadata, groupSingAlongMetadata, ginScoreTrackerMetadata };
