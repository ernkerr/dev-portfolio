import { ExpoEvent, RemovedDecision } from "@/types/expoWest2026";

interface RefreshConflictModalProps {
  isOpen: boolean;
  addedCount: number;
  changedCount: number;
  removedCount: number;
  changedSelectedCount: number;
  removedSelected: ExpoEvent[];
  decisions: Record<string, RemovedDecision>;
  onDecisionChange: (eventId: string, decision: RemovedDecision) => void;
  onRefresh: () => void;
  onDismiss: () => void;
}

export default function RefreshConflictModal({
  isOpen,
  addedCount,
  changedCount,
  removedCount,
  changedSelectedCount,
  removedSelected,
  decisions,
  onDecisionChange,
  onRefresh,
  onDismiss,
}: RefreshConflictModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl">
        <h2 className="text-lg font-semibold md:text-xl">Official Schedule Updated</h2>
        <p className="mt-2 text-sm text-slate-300">
          Expo West data changed on the official site. Refresh to view the
          updated schedule.
        </p>

        <div className="mt-4 grid gap-2 rounded-xl bg-slate-800 p-4 text-sm text-slate-200 md:grid-cols-2">
          <p>Added events: {addedCount}</p>
          <p>Changed events: {changedCount}</p>
          <p>Removed events: {removedCount}</p>
          <p>Changed selections: {changedSelectedCount}</p>
        </div>

        {removedSelected.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-white md:text-base">
              Removed events in your schedule
            </h3>
            <p className="mt-1 text-xs text-slate-300 md:text-sm">
              Choose what to do for each removed event.
            </p>

            <div className="mt-3 space-y-3">
              {removedSelected.map((event) => {
                const decision = decisions[event.id] ?? "keep";
                return (
                  <div
                    key={event.id}
                    className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3"
                  >
                    <p className="text-sm font-medium text-white">{event.title}</p>
                    <p className="text-xs text-amber-100">{event.timeLabel}</p>
                    <p className="mb-3 text-xs text-amber-100">{event.location}</p>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onDecisionChange(event.id, "keep")}
                        className={`rounded-lg px-3 py-1 text-xs transition-colors ${
                          decision === "keep"
                            ? "bg-blue-500 text-white"
                            : "bg-slate-700 text-slate-200 hover:bg-slate-600"
                        }`}
                      >
                        Keep in My Schedule
                      </button>
                      <button
                        type="button"
                        onClick={() => onDecisionChange(event.id, "remove")}
                        className={`rounded-lg px-3 py-1 text-xs transition-colors ${
                          decision === "remove"
                            ? "bg-red-500 text-white"
                            : "bg-slate-700 text-slate-200 hover:bg-slate-600"
                        }`}
                      >
                        Remove it
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onRefresh}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400"
          >
            Refresh to View Changes
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-lg border border-slate-500 px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-800"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
