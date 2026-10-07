import type { UIMessage } from "ai";

// What the ErinLLM panel (src/components/site/erinllm) and its API route
// (src/app/api/erinllm) send each other.

export type Side = "designer" | "engineer";

// The page the visitor is looking at when they ask
export type PageContext = {
  path: string;
  title: string;
  side: Side;
  /** The page's visible text, cut to MAX.pageText */
  text: string;
  /** Case-study sections, so answers can link to one (#research) */
  sections: { id: string; title: string }[];
};

// Something the visitor highlighted or dragged in to ask about
export type Attached = {
  kind: "quote" | "page" | "image" | "link";
  /** A short name for it, e.g. "Carpoolio" or "Image: Gin's score sheet" */
  label: string;
  /** The highlighted or dropped text */
  text?: string;
  href?: string;
};

export type AskMetadata = { attached?: Attached };
export type ErinMessage = UIMessage<AskMetadata>;

export const MAX = {
  question: 500,
  quote: 1_500,
  pageText: 15_000,
  /** Messages of history sent with each question */
  history: 12,
};

// Errors the route sends, as the response body or the stream's error text
export type ErrorCode = "rate_limited" | "busy" | "not_set_up" | "error";

// A question someone asked and the answer they got, kept for the review
// page (/erinllm/review)
export type Kept = {
  id: string;
  at: number;
  path: string;
  side: Side;
  attached?: Attached;
  question: string;
  answer: string;
};
