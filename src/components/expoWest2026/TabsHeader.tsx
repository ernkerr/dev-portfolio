import { SchedulerTab } from "@/types/expoWest2026";

interface TabsHeaderProps {
  activeTab: SchedulerTab;
  onChange: (tab: SchedulerTab) => void;
}

const TABS: { id: SchedulerTab; label: string }[] = [
  { id: "main", label: "Main Schedule" },
  { id: "mine", label: "My Schedule" },
  { id: "about", label: "About Me" },
];

export default function TabsHeader({ activeTab, onChange }: TabsHeaderProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`rounded-xl px-2 py-2 text-xs font-semibold whitespace-nowrap transition-colors md:px-6 md:py-2.5 md:text-base ${
                isActive
                  ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                  : "bg-slate-700 text-slate-100 hover:bg-slate-600"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
