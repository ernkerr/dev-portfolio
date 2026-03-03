import { ExpoEvent, ScheduleSnapshot } from "@/types/expoWest2026";

export interface ChangedEvent {
  before: ExpoEvent;
  after: ExpoEvent;
}

export interface SnapshotDiff {
  added: ExpoEvent[];
  removed: ExpoEvent[];
  changed: ChangedEvent[];
  removedSelected: ExpoEvent[];
  changedSelected: ChangedEvent[];
}

function sortByStart(a: ExpoEvent, b: ExpoEvent) {
  return a.startIso.localeCompare(b.startIso);
}

function eventFingerprint(event: ExpoEvent) {
  return [
    event.title,
    event.dayKey,
    event.startIso,
    event.endIso ?? "",
    event.timeLabel,
    event.location,
  ].join("|");
}

function toMap(events: ExpoEvent[]) {
  return new Map(events.map((event) => [event.id, event]));
}

export function computeSnapshotDiff(
  currentSnapshot: ScheduleSnapshot,
  nextSnapshot: ScheduleSnapshot,
  selectedEventIds: Set<string>,
): SnapshotDiff {
  const currentMap = toMap(currentSnapshot.events);
  const nextMap = toMap(nextSnapshot.events);

  const added = nextSnapshot.events
    .filter((event) => !currentMap.has(event.id))
    .sort(sortByStart);

  const removed = currentSnapshot.events
    .filter((event) => !nextMap.has(event.id))
    .sort(sortByStart);

  const changed: ChangedEvent[] = [];
  for (const event of currentSnapshot.events) {
    const nextEvent = nextMap.get(event.id);
    if (!nextEvent) {
      continue;
    }

    if (eventFingerprint(event) !== eventFingerprint(nextEvent)) {
      changed.push({ before: event, after: nextEvent });
    }
  }

  const removedSelected = removed.filter((event) => selectedEventIds.has(event.id));
  const changedSelected = changed.filter(({ before }) =>
    selectedEventIds.has(before.id),
  );

  return {
    added,
    removed,
    changed,
    removedSelected,
    changedSelected,
  };
}
