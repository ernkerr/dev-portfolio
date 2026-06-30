export interface AgentMetadata {
  slug: string;
  title: string;
  /** One-line summary shown on the agent card. */
  shortDescription: string;
  /** Human-facing label shown on the card badge (e.g. "AI Order Agent"). */
  type: string;
  /** What the agent actually does, in a sentence or two, for the listing page. */
  role: string;
  stack: string[];
  /** Route to the case study (e.g. "/orderSyncAgent"). */
  link: string;
  /** Optional supporting blurb lines surfaced on the card. */
  highlights?: string[];
  featured?: boolean;
  order?: number;
}
