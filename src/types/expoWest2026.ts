export type ExpoDayKey =
  | "2026-03-03"
  | "2026-03-04"
  | "2026-03-05"
  | "2026-03-06";

export const EXPO_DAY_ORDER: ExpoDayKey[] = [
  "2026-03-03",
  "2026-03-04",
  "2026-03-05",
  "2026-03-06",
];

export const EXPO_DAY_LABELS: Record<ExpoDayKey, string> = {
  "2026-03-03": "Tue 03",
  "2026-03-04": "Wed 04",
  "2026-03-05": "Thu 05",
  "2026-03-06": "Fri 06",
};

export interface ExpoEvent {
  id: string;
  externalId?: string;
  title: string;
  dayKey: ExpoDayKey;
  startIso: string;
  endIso?: string;
  timeLabel: string;
  location: string;
}

export interface ScheduleSnapshot {
  version: number;
  generatedAtIso: string;
  events: ExpoEvent[];
}

export type RemovedDecision = "keep" | "remove";

export interface RemovedEventRecord {
  id: string;
  title: string;
  dayKey: ExpoDayKey;
  startIso: string;
  endIso?: string;
  timeLabel: string;
  location: string;
  removedAtIso: string;
}

export interface LocalUserScheduleV1 {
  version: 1;
  selectedEventIds: string[];
  removedDecisions: Record<string, RemovedDecision>;
  removedEvents: Record<string, RemovedEventRecord>;
  updatedAtIso: string;
}

export type SchedulerTab = "main" | "mine" | "about";

export function isExpoDayKey(value: string): value is ExpoDayKey {
  return EXPO_DAY_ORDER.includes(value as ExpoDayKey);
}
