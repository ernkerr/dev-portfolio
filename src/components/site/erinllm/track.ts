"use client";

// Counts in Google Analytics (the gtag in src/app/layout.tsx): how often
// ErinLLM opens, and how each question was asked. No question text.

type Gtag = (command: "event", name: string, params?: object) => void;

export type AskSource =
  | "typed"
  | "suggestion"
  | "followup"
  | "selection"
  | "drop";

export function track(
  event: "erinllm_open" | "erinllm_ask",
  params?: { source: AskSource },
) {
  (window as unknown as { gtag?: Gtag }).gtag?.("event", event, params);
}
