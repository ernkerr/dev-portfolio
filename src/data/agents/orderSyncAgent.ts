import { AgentMetadata } from "@/types/agent";

export const orderSyncAgentMetadata: AgentMetadata = {
  slug: "orderSyncAgent",
  title: "OrderSync Order Agent",
  shortDescription:
    "An AI agent that reads inbound customer orders — email, EDI, PDF, spreadsheets — and turns them into validated, structured orders.",
  type: "AI Order Agent",
  role: "Autonomous document-processing agent built on Mastra and Claude. It extracts line items, matches them to the product catalog and customer, prices and validates the order, and escalates to a human when it isn't sure.",
  stack: [
    "TypeScript",
    "Mastra",
    "Claude (Anthropic)",
    "Vercel AI SDK",
    "Hono",
    "Zod",
  ],
  link: "/orderSyncAgent",
  highlights: [
    "35 tools across extraction, catalog, pricing & order writing",
    "6 input formats: email, EDI, PDF, CSV, Excel, voice",
    "Confidence-gated human escalation",
  ],
  featured: true,
  order: 1,
};
