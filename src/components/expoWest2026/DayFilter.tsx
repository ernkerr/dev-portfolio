import { EXPO_DAY_LABELS, EXPO_DAY_ORDER, ExpoDayKey } from "@/types/expoWest2026";

interface DayFilterProps {
  selectedDay: ExpoDayKey | null;
  onChange: (day: ExpoDayKey | null) => void;
}

export default function DayFilter({ selectedDay, onChange }: DayFilterProps) {
  return (
    <div className="w-full overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="inline-flex min-w-max items-center gap-2 pr-2 md:gap-3">
        <button
          type="button"
          onClick={() => onChange(null)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors md:px-6 md:text-base ${
            selectedDay === null
              ? "bg-blue-500 text-white"
              : "bg-slate-700 text-slate-100 hover:bg-slate-600"
          }`}
        >
          All Days
        </button>
        {EXPO_DAY_ORDER.map((day) => {
          const isActive = selectedDay === day;
          return (
            <button
              key={day}
              type="button"
              onClick={() => onChange(day)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors md:px-6 md:text-base ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-slate-700 text-slate-100 hover:bg-slate-600"
              }`}
            >
              {EXPO_DAY_LABELS[day]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
