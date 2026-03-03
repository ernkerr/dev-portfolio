import {
  ExpoEvent,
  LocalUserScheduleV1,
  ScheduleSnapshot,
  RemovedDecision,
  RemovedEventRecord,
  isExpoDayKey,
} from "@/types/expoWest2026";

const USER_SCHEDULE_KEY = "expoWest2026:userSchedule:v1";
const ACCEPTED_SNAPSHOT_KEY = "expoWest2026:acceptedSnapshot";

function canUseStorage() {
  return typeof window !== "undefined";
}

function safeParseJson<T>(value: string | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function uniq(values: string[]) {
  return Array.from(new Set(values));
}

export function createDefaultUserSchedule(): LocalUserScheduleV1 {
  return {
    version: 1,
    selectedEventIds: [],
    removedDecisions: {},
    removedEvents: {},
    updatedAtIso: new Date().toISOString(),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function sanitizeRemovedDecisions(
  value: unknown,
): Record<string, RemovedDecision> {
  if (!isRecord(value)) {
    return {};
  }

  const sanitized: Record<string, RemovedDecision> = {};
  for (const [eventId, decision] of Object.entries(value)) {
    if (decision === "keep" || decision === "remove") {
      sanitized[eventId] = decision;
    }
  }

  return sanitized;
}

function sanitizeRemovedEvents(value: unknown): Record<string, RemovedEventRecord> {
  if (!isRecord(value)) {
    return {};
  }

  const sanitized: Record<string, RemovedEventRecord> = {};
  for (const [eventId, item] of Object.entries(value)) {
    if (!isRecord(item)) {
      continue;
    }

    const { title, dayKey, startIso, endIso, timeLabel, location, removedAtIso } =
      item;
    if (
      typeof title === "string" &&
      typeof dayKey === "string" &&
      isExpoDayKey(dayKey) &&
      typeof startIso === "string" &&
      typeof timeLabel === "string" &&
      typeof location === "string" &&
      typeof removedAtIso === "string"
    ) {
      sanitized[eventId] = {
        id: eventId,
        title,
        dayKey,
        startIso,
        ...(typeof endIso === "string" ? { endIso } : {}),
        timeLabel,
        location,
        removedAtIso,
      };
    }
  }

  return sanitized;
}

export function loadUserSchedule(): LocalUserScheduleV1 {
  if (!canUseStorage()) {
    return createDefaultUserSchedule();
  }

  const parsed = safeParseJson<LocalUserScheduleV1>(
    window.localStorage.getItem(USER_SCHEDULE_KEY),
  );

  if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.selectedEventIds)) {
    return createDefaultUserSchedule();
  }

  return {
    version: 1,
    selectedEventIds: uniq(
      parsed.selectedEventIds.filter((eventId) => typeof eventId === "string"),
    ),
    removedDecisions: sanitizeRemovedDecisions(parsed.removedDecisions),
    removedEvents: sanitizeRemovedEvents(parsed.removedEvents),
    updatedAtIso:
      typeof parsed.updatedAtIso === "string"
        ? parsed.updatedAtIso
        : new Date().toISOString(),
  };
}

export function saveUserSchedule(schedule: LocalUserScheduleV1) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(USER_SCHEDULE_KEY, JSON.stringify(schedule));
}

function isValidEvent(event: unknown): event is ExpoEvent {
  if (!isRecord(event)) {
    return false;
  }

  return (
    typeof event.id === "string" &&
    typeof event.title === "string" &&
    typeof event.dayKey === "string" &&
    typeof event.startIso === "string" &&
    typeof event.timeLabel === "string" &&
    typeof event.location === "string"
  );
}

export function loadAcceptedSnapshot(): ScheduleSnapshot | null {
  if (!canUseStorage()) {
    return null;
  }

  const parsed = safeParseJson<ScheduleSnapshot>(
    window.localStorage.getItem(ACCEPTED_SNAPSHOT_KEY),
  );

  if (
    !parsed ||
    typeof parsed.version !== "number" ||
    typeof parsed.generatedAtIso !== "string" ||
    !Array.isArray(parsed.events)
  ) {
    return null;
  }

  const validEvents = parsed.events.filter(isValidEvent);
  if (validEvents.length !== parsed.events.length) {
    return null;
  }

  return {
    version: parsed.version,
    generatedAtIso: parsed.generatedAtIso,
    events: validEvents,
  };
}

export function saveAcceptedSnapshot(snapshot: ScheduleSnapshot) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(ACCEPTED_SNAPSHOT_KEY, JSON.stringify(snapshot));
}
