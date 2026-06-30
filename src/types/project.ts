export type ProjectCategory = "App" | "Agent" | "Website" | "Tool" | "Design";
export type ProjectPlatform = "Web" | "Mobile" | "Cross-platform";

export interface ProjectMetadata {
  slug: string;
  title: string;
  shortDescription: string;
  /** Precise, human-facing label shown on the card (e.g. "Web App", "Mobile App"). */
  type: string;
  /** Canonical bucket used by the filter chips. */
  category: ProjectCategory;
  /** Only meaningful for category "App"; drives the Apps sub-filter. */
  platform?: ProjectPlatform;
  stack: string[];
  link: string;
  thumbnail: string;
  video?: string;
  featured?: boolean;
  order?: number;
}
