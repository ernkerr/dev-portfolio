"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import NavBar from "@/components/NavBar";
import { pressStart } from "../../../public/fonts/fonts";
import TabsHeader from "@/components/expoWest2026/TabsHeader";
import DayFilter from "@/components/expoWest2026/DayFilter";
import EventCard from "@/components/expoWest2026/EventCard";
import AboutTab from "@/components/expoWest2026/AboutTab";
import RefreshConflictModal from "@/components/expoWest2026/RefreshConflictModal";
import { EXPO_WEST_2026_SNAPSHOT } from "@/data/expoWest2026/snapshot";
import { computeSnapshotDiff, SnapshotDiff } from "@/lib/expoWest2026/diff";
import {
  createDefaultUserSchedule,
  loadAcceptedSnapshot,
  loadUserSchedule,
  saveAcceptedSnapshot,
  saveUserSchedule,
} from "@/lib/expoWest2026/storage";
import {
  EXPO_DAY_LABELS,
  EXPO_DAY_ORDER,
  ExpoDayKey,
  ExpoEvent,
  LocalUserScheduleV1,
  RemovedDecision,
  ScheduleSnapshot,
  SchedulerTab,
  isExpoDayKey,
} from "@/types/expoWest2026";

function groupByDay(events: ExpoEvent[]) {
  const grouped = new Map<ExpoDayKey, ExpoEvent[]>();

  for (const day of EXPO_DAY_ORDER) {
    grouped.set(day, []);
  }

  for (const event of events) {
    grouped.get(event.dayKey)?.push(event);
  }

  for (const day of EXPO_DAY_ORDER) {
    grouped.get(day)?.sort((a, b) => a.startIso.localeCompare(b.startIso));
  }

  return grouped;
}

function formatSnapshotVersion(version: number) {
  return `v${version}`;
}

function getTodayExpoDayOrDefault(): ExpoDayKey | null {
  const now = new Date();
  const localDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}`;

  return isExpoDayKey(localDate) ? localDate : null;
}

export default function SchedulerApp() {
  const [activeTab, setActiveTab] = useState<SchedulerTab>("main");
  const [selectedDay, setSelectedDay] = useState<ExpoDayKey | null>(
    getTodayExpoDayOrDefault(),
  );
  const [acceptedSnapshot, setAcceptedSnapshot] = useState<ScheduleSnapshot>(
    EXPO_WEST_2026_SNAPSHOT,
  );
  const [userSchedule, setUserSchedule] = useState<LocalUserScheduleV1>(
    createDefaultUserSchedule(),
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [pendingDiff, setPendingDiff] = useState<SnapshotDiff | null>(null);
  const [refreshDecisions, setRefreshDecisions] = useState<
    Record<string, RemovedDecision>
  >({});
  const contentAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadedSchedule = loadUserSchedule();
    const storedAcceptedSnapshot = loadAcceptedSnapshot();

    const snapshotToRender = storedAcceptedSnapshot ?? EXPO_WEST_2026_SNAPSHOT;

    if (!storedAcceptedSnapshot) {
      saveAcceptedSnapshot(EXPO_WEST_2026_SNAPSHOT);
    }

    setUserSchedule(loadedSchedule);
    setAcceptedSnapshot(snapshotToRender);

    if (snapshotToRender.version !== EXPO_WEST_2026_SNAPSHOT.version) {
      const selectedEventIds = new Set(loadedSchedule.selectedEventIds);
      const diff = computeSnapshotDiff(
        snapshotToRender,
        EXPO_WEST_2026_SNAPSHOT,
        selectedEventIds,
      );
      const defaultDecisions = Object.fromEntries(
        diff.removedSelected.map((event) => [event.id, "keep"]),
      ) as Record<string, RemovedDecision>;

      setPendingDiff(diff);
      setRefreshDecisions(defaultDecisions);
      setShowRefreshModal(true);
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    saveUserSchedule(userSchedule);
  }, [isHydrated, userSchedule]);

  useEffect(() => {
    if (!isHydrated || !contentAnchorRef.current) {
      return;
    }

    // Keep day switches and tab switches anchored at the top of schedule content.
    contentAnchorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeTab, isHydrated, selectedDay]);

  const selectedEventIds = useMemo(
    () => new Set(userSchedule.selectedEventIds),
    [userSchedule.selectedEventIds],
  );

  const acceptedEventMap = useMemo(
    () => new Map(acceptedSnapshot.events.map((event) => [event.id, event])),
    [acceptedSnapshot.events],
  );

  const groupedMainSchedule = useMemo(
    () => groupByDay(acceptedSnapshot.events),
    [acceptedSnapshot.events],
  );

  const groupedMySchedule = useMemo(() => {
    const events = acceptedSnapshot.events.filter((event) =>
      selectedEventIds.has(event.id),
    );

    const keptRemovedEvents = Object.values(userSchedule.removedEvents).filter(
      (event) =>
        selectedEventIds.has(event.id) &&
        userSchedule.removedDecisions[event.id] === "keep" &&
        !acceptedEventMap.has(event.id),
    );

    const merged = [...events, ...keptRemovedEvents];
    return groupByDay(merged);
  }, [acceptedEventMap, acceptedSnapshot.events, selectedEventIds, userSchedule]);

  const hasPendingRefresh =
    pendingDiff !== null &&
    acceptedSnapshot.version !== EXPO_WEST_2026_SNAPSHOT.version;

  const visibleDays = selectedDay ? [selectedDay] : EXPO_DAY_ORDER;

  const toggleSelection = (eventId: string) => {
    setUserSchedule((prev) => {
      const selected = new Set(prev.selectedEventIds);
      const nextRemovedDecisions = { ...prev.removedDecisions };
      const nextRemovedEvents = { ...prev.removedEvents };

      if (selected.has(eventId)) {
        selected.delete(eventId);
        delete nextRemovedDecisions[eventId];
        delete nextRemovedEvents[eventId];
      } else {
        selected.add(eventId);
      }

      return {
        ...prev,
        selectedEventIds: Array.from(selected),
        removedDecisions: nextRemovedDecisions,
        removedEvents: nextRemovedEvents,
        updatedAtIso: new Date().toISOString(),
      };
    });
  };

  const setRemovedDecision = (eventId: string, decision: RemovedDecision) => {
    setRefreshDecisions((prev) => ({
      ...prev,
      [eventId]: decision,
    }));
  };

  const applyRefresh = () => {
    if (!pendingDiff) {
      return;
    }

    setUserSchedule((prev) => {
      const selected = new Set(prev.selectedEventIds);
      const nextRemovedDecisions = { ...prev.removedDecisions };
      const nextRemovedEvents = { ...prev.removedEvents };
      const nextSnapshotEventIds = new Set(
        EXPO_WEST_2026_SNAPSHOT.events.map((event) => event.id),
      );

      for (const [eventId] of Object.entries(nextRemovedDecisions)) {
        if (nextSnapshotEventIds.has(eventId)) {
          delete nextRemovedDecisions[eventId];
          delete nextRemovedEvents[eventId];
        }
      }

      for (const removedEvent of pendingDiff.removedSelected) {
        const decision = refreshDecisions[removedEvent.id] ?? "keep";

        if (decision === "remove") {
          selected.delete(removedEvent.id);
          delete nextRemovedDecisions[removedEvent.id];
          delete nextRemovedEvents[removedEvent.id];
          continue;
        }

        nextRemovedDecisions[removedEvent.id] = "keep";
        nextRemovedEvents[removedEvent.id] = {
          id: removedEvent.id,
          title: removedEvent.title,
          dayKey: removedEvent.dayKey,
          startIso: removedEvent.startIso,
          ...(removedEvent.endIso ? { endIso: removedEvent.endIso } : {}),
          timeLabel: removedEvent.timeLabel,
          location: removedEvent.location,
          removedAtIso: new Date().toISOString(),
        };
      }

      return {
        ...prev,
        selectedEventIds: Array.from(selected),
        removedDecisions: nextRemovedDecisions,
        removedEvents: nextRemovedEvents,
        updatedAtIso: new Date().toISOString(),
      };
    });

    setAcceptedSnapshot(EXPO_WEST_2026_SNAPSHOT);
    saveAcceptedSnapshot(EXPO_WEST_2026_SNAPSHOT);
    setPendingDiff(null);
    setShowRefreshModal(false);
  };

  const renderEmpty = (message: string) => (
    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/50 p-6 text-sm text-slate-300">
      {message}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <NavBar />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-8">
        <section className="mb-6 rounded-2xl bg-blue-600 p-6 shadow-md md:p-8">
          <h1 className={`${pressStart.className} text-sm leading-relaxed md:text-lg`}>
            Natural Products Expo West 2026 Scheduler
          </h1>
          <p className="mt-3 text-sm text-blue-50 md:text-base">
            Save your personal conference plan and keep it synced with official
            schedule changes.
          </p>
        </section>

        <section className="mb-6 rounded-2xl border border-slate-600 bg-slate-800/80 p-4 shadow-lg md:p-5">
          <TabsHeader activeTab={activeTab} onChange={setActiveTab} />
          <div className="mt-3">
            <DayFilter selectedDay={selectedDay} onChange={setSelectedDay} />
          </div>
        </section>
        <div ref={contentAnchorRef} />

        {hasPendingRefresh && !showRefreshModal ? (
          <section className="mb-6 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-100">
            <p>
              Official schedule updates are available. You are still viewing
              {" "}
              {formatSnapshotVersion(acceptedSnapshot.version)}.
            </p>
            <button
              type="button"
              onClick={() => setShowRefreshModal(true)}
              className="mt-2 rounded-lg bg-amber-300/20 px-3 py-1 text-xs text-amber-50 transition-colors hover:bg-amber-300/30"
            >
              Review Changes
            </button>
          </section>
        ) : null}

        {!isHydrated ? (
          renderEmpty("Loading your saved schedule...")
        ) : null}

        {isHydrated && activeTab === "main" ? (
          <section className="space-y-6">
            {visibleDays.map((day) => {
              const dayEvents = groupedMainSchedule.get(day) ?? [];
              return (
                <div key={day}>
                  <h2 className="mb-3 text-lg font-semibold text-slate-100">
                    {EXPO_DAY_LABELS[day]}
                  </h2>
                  <div className="grid gap-3">
                    {dayEvents.length === 0
                      ? renderEmpty("No events loaded for this day yet.")
                      : dayEvents.map((event) => (
                          <EventCard
                            key={event.id}
                            event={event}
                            isSelected={selectedEventIds.has(event.id)}
                            onToggle={toggleSelection}
                          />
                        ))}
                  </div>
                </div>
              );
            })}
          </section>
        ) : null}

        {isHydrated && activeTab === "mine" ? (
          <section className="space-y-6">
            {visibleDays.map((day) => {
              const dayEvents = groupedMySchedule.get(day) ?? [];
              return (
                <div key={day}>
                  <h2 className="mb-3 text-lg font-semibold text-slate-100">
                    {EXPO_DAY_LABELS[day]}
                  </h2>
                  <div className="grid gap-3">
                    {dayEvents.length === 0
                      ? renderEmpty("No events saved for this day.")
                      : dayEvents.map((event) => (
                          <EventCard
                            key={event.id}
                            event={event}
                            isSelected={selectedEventIds.has(event.id)}
                            isRemovedPlaceholder={!acceptedEventMap.has(event.id)}
                            onToggle={toggleSelection}
                          />
                        ))}
                  </div>
                </div>
              );
            })}
          </section>
        ) : null}

        {isHydrated && activeTab === "about" ? <AboutTab /> : null}
      </main>

      <RefreshConflictModal
        isOpen={showRefreshModal && pendingDiff !== null}
        addedCount={pendingDiff?.added.length ?? 0}
        changedCount={pendingDiff?.changed.length ?? 0}
        removedCount={pendingDiff?.removed.length ?? 0}
        changedSelectedCount={pendingDiff?.changedSelected.length ?? 0}
        removedSelected={pendingDiff?.removedSelected ?? []}
        decisions={refreshDecisions}
        onDecisionChange={setRemovedDecision}
        onRefresh={applyRefresh}
        onDismiss={() => setShowRefreshModal(false)}
      />
    </div>
  );
}
