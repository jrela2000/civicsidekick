import { getAllOfficeDescriptions } from "../data/officeDescriptions";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import MobileSelect from "@/components/MobileSelect";

const levelColors = {
  Federal: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  State: "bg-purple-500/10 text-purple-400 border border-purple-500/30",
  County: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
  Local: "bg-green-500/10 text-green-400 border border-green-500/30",
};

const levelOrder = ["Federal", "State", "County", "Local"];

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const all = getAllOfficeDescriptions();

  const filtered = Object.entries(all).filter(([title, info]) => {
    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      info.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = !levelFilter || info.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const grouped = levelOrder.reduce((acc, level) => {
    const entries = filtered.filter(([, info]) => info.level === level);
    if (entries.length) acc[level] = entries;
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">Offices Glossary</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Plain-language explanations of every elected office — what they do and who they serve.
        </p>
      </div>

      {/* Search + Level filter */}
      <div className="flex gap-3 max-w-md mx-auto mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search offices…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-11 rounded-xl border-2"
          />
        </div>
        <div className="w-36 shrink-0">
          <MobileSelect
            value={levelFilter}
            onChange={setLevelFilter}
            placeholder="All levels"
            label="Filter by level"
            options={[
              { value: "", label: "All levels" },
              { value: "Federal", label: "Federal" },
              { value: "State", label: "State" },
              { value: "County", label: "County" },
              { value: "Local", label: "Local" },
            ]}
          />
        </div>
      </div>

      {/* Grouped Entries */}
      <div className="space-y-8">
        {levelOrder.filter(l => grouped[l]).map(level => (
          <div key={level}>
            <h2 className="font-display font-bold text-xl text-foreground mb-4 flex items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[level]}`}>{level}</span>
              Government Offices
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {grouped[level].map(([title, info]) => (
                <div key={title} className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground text-base leading-tight">{title}</h3>
                    <span className={`text-xs shrink-0 font-medium px-2 py-0.5 rounded-full ${levelColors[info.level]}`}>
                      {info.level}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{info.description}</p>
                  <div>
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Key Responsibilities</p>
                    <ul className="space-y-1">
                      {info.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium">No results for "{search}"</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  );
}