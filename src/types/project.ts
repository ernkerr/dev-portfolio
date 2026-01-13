export interface ProjectMetadata {
  slug: string;
  title: string;
  shortDescription: string;
  type: string;
  stack: string[];
  link: string;
  thumbnail: string;
  video?: string;
  featured?: boolean;
  order?: number;
}
