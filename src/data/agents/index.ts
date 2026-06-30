import { orderSyncAgentMetadata } from "./orderSyncAgent";
import { AgentMetadata } from "@/types/agent";

export const allAgents: AgentMetadata[] = [orderSyncAgentMetadata].sort(
  (a, b) => (a.order ?? 999) - (b.order ?? 999),
);

export { orderSyncAgentMetadata };
