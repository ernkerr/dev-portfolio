export interface BlogPost {
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  metaDescription: string;
  keywords: string[];
  intent: string;
  articleType: string;
  publishedAt: string;
  receivedAt: string;
  image?: string;
}
