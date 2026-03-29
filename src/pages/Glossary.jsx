import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllOfficeDescriptions } from "../data/officeDescriptions";

const levelOrder = ["Federal", "State", "County", "Local"];

function GlossaryEntry({ title, info, isOpen, onToggle }) {
  return (
    <div className="border border-border/60 rounded-xl overflow-hidden bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div>
          <h3 className="font-semibold text-foreground text-sm sm:text-base">{title}</h3>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
            info.level === "Federal" ? "bg-primary/10 text-primary" :
            info.level === "State" ? "bg-blue-50 text-blue-700" :
            info.level === "County" ? "bg-amber-50 text-amber-700" :
            "bg-emerald-50 text-emerald-700"
          }`}>
            {info.level}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-border/40">
              <p className="text-sm text-foreground/80 leading-relaxed mt-3">
                {info.description}
              </p>
              {info.responsibilities && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Key Responsibilities
                  </p>
                  <ul className="space-y-1.5">
                    {info.responsibilities.map((r, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 mt-1.5 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [openEntry, setOpenEntry] = useState(null);

  const allDescriptions = getAllOfficeDescriptions();

  const filteredEntries = Object.entries(allDescriptions).filter(([title, info]) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return title.toLowerCase().includes(s) || info.description.toLowerCase().includes(s) || info.level.toLowerCase().includes(s);
  });

  const groupedByLevel = {};
  filteredEntries.forEach(([title, info]) => {
    if (!groupedByLevel[info.level]) groupedByLevel[info.level] = [];
    groupedByLevel[info.level].push({ title, info });
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Office Glossary
            </h1>
            <p className="text-sm text-muted-foreground">
              Understand what each political office does
            </p>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search offices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 bg-card border-border/60 rounded-xl"
          />
        </div>
      </motion.div>

      {/* Entries by level */}
      <div className="space-y-8">
        {levelOrder.map((level) => {
          const entries = groupedByLevel[level];
          if (!entries?.length) return null;

          return (
            <motion.section
              key={level}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                {level} Level
              </h2>
              <div className="grid gap-2">
                {entries.map(({ title, info }) => (
                  <GlossaryEntry
                    key={title}
                    title={title}
                    info={info}
                    isOpen={openEntry === title}
                    onToggle={() => setOpenEntry(openEntry === title ? null : title)}
                  />
                ))}
              </div>
            </motion.section>
          );
        })}

        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No offices found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}