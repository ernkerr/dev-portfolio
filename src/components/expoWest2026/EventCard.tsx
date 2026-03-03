import { ExpoEvent } from "@/types/expoWest2026";

interface EventCardProps {
  event: ExpoEvent;
  isSelected: boolean;
  isRemovedPlaceholder?: boolean;
  onToggle: (eventId: string) => void;
  onOpenDetails: (event: ExpoEvent) => void;
}

export default function EventCard({
  event,
  isSelected,
  isRemovedPlaceholder = false,
  onToggle,
  onOpenDetails,
}: EventCardProps) {
  const buttonLabel = isRemovedPlaceholder
    ? "Remove"
    : isSelected
      ? "Remove from My Schedule"
      : "Add to My Schedule";

  const buttonStyles = isSelected
    ? "border border-red-400 bg-transparent text-red-300 hover:bg-red-500/10"
    : "bg-blue-500 text-white hover:bg-blue-400";

  return (
    <article
      className={`rounded-xl border p-4 shadow-md transition-colors ${
        isRemovedPlaceholder
          ? "border-amber-400/40 bg-amber-500/10"
          : "border-slate-700 bg-gradient-to-br from-slate-800 to-slate-800/80"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold leading-relaxed text-white md:text-base">
          {event.title}
        </h3>
        {isRemovedPlaceholder ? (
          <span className="shrink-0 rounded-full bg-amber-300/20 px-2 py-1 text-xs text-amber-200">
            Removed from official site
          </span>
        ) : null}
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <span className="w-fit rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-100 md:text-sm">
          {event.timeLabel}
        </span>
        <span className="w-fit rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-200 md:text-sm">
          {event.location}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onOpenDetails(event)}
          className="rounded-lg border border-slate-500 px-3 py-2 text-xs font-medium text-slate-100 transition-colors hover:bg-slate-700 md:text-sm"
        >
          Details
        </button>
        <button
          type="button"
          onClick={() => onToggle(event.id)}
          className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors md:text-sm ${buttonStyles}`}
        >
          {buttonLabel}
        </button>
      </div>
    </article>
  );
}
