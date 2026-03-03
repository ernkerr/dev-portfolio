import { ExpoEvent } from "@/types/expoWest2026";

interface EventDetailsModalProps {
  event: ExpoEvent | null;
  onClose: () => void;
}

export default function EventDetailsModal({
  event,
  onClose,
}: EventDetailsModalProps) {
  if (!event) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-base font-semibold leading-relaxed md:text-xl">
            {event.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-500 px-2 py-1 text-xs text-slate-200 transition-colors hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-100 md:text-sm">
            {event.timeLabel}
          </span>
          <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-200 md:text-sm">
            {event.location}
          </span>
          {event.eventType ? (
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-100 md:text-sm">
              {event.eventType}
            </span>
          ) : null}
        </div>

        {event.organizers && event.organizers.length > 0 ? (
          <section className="mb-4 rounded-xl border border-slate-700 bg-slate-800/70 p-4">
            <h3 className="mb-2 text-sm font-semibold text-slate-100 md:text-base">
              Presented By
            </h3>
            <p className="text-sm text-slate-300 md:text-base">
              {event.organizers.join(", ")}
            </p>
          </section>
        ) : null}

        <section className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-100 md:text-base">
            Description
          </h3>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300 md:text-base">
            {event.description?.trim().length
              ? event.description
              : "No additional description provided in the source data."}
          </p>
        </section>
      </div>
    </div>
  );
}
