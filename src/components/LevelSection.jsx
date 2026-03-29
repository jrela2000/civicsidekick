import OfficialCard from "./OfficialCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const levelConfig = {
  Federal: {
    emoji: "🏛️",
    color: "border-blue-400 bg-blue-50",
    headerColor: "bg-blue-600 text-white",
    description: "National government representatives"
  },
  State: {
    emoji: "🏢",
    color: "border-purple-400 bg-purple-50",
    headerColor: "bg-purple-600 text-white",
    description: "State government representatives"
  },
  County: {
    emoji: "🏘️",
    color: "border-amber-400 bg-amber-50",
    headerColor: "bg-amber-600 text-white",
    description: "County government representatives"
  },
  Local: {
    emoji: "🏙️",
    color: "border-green-400 bg-green-50",
    headerColor: "bg-green-600 text-white",
    description: "City & local government representatives"
  },
};

export default function LevelSection({ level, officials }) {
  const [collapsed, setCollapsed] = useState(false);
  const config = levelConfig[level] || levelConfig.Local;

  return (
    <div className={`rounded-2xl border-2 overflow-hidden ${config.color}`}>
      <button
        className={`w-full flex items-center justify-between px-5 py-3 ${config.headerColor} font-semibold text-left`}
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{config.emoji}</span>
          <div>
            <span className="text-lg">{level} Level</span>
            <span className="ml-2 text-sm opacity-80">({officials.length} official{officials.length !== 1 ? "s" : ""})</span>
          </div>
        </div>
        {collapsed ? <ChevronDown className="w-5 h-5 opacity-80" /> : <ChevronUp className="w-5 h-5 opacity-80" />}
      </button>
      {!collapsed && (
        <div className="p-4 grid gap-3 sm:grid-cols-2">
          {officials.map((official, i) => (
            <OfficialCard key={i} official={official} />
          ))}
        </div>
      )}
    </div>
  );
}