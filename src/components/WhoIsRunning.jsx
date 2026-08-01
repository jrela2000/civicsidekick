import { ExternalLink, Search, Users } from "lucide-react";

const partyColors = {
  "Democratic": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Democrat": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Republican": "bg-red-500/10 text-red-400 border-red-500/30",
  "Independent": "bg-gray-500/10 text-gray-400 border-gray-500/30",
  "Green": "bg-green-500/10 text-green-400 border-green-500/30",
  "Libertarian": "bg-amber-500/10 text-amber-400 border-amber-500/30",
};

function partyBadge(party) {
  return partyColors[party] || "bg-muted text-muted-foreground border-border";
}

export default function WhoIsRunning({ candidates, officeName }) {
  if (!candidates || candidates.length === 0) return null;

  return (
    <div className="border-t border-border pt-3 space-y-2">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-primary shrink-0" />
        <span className="text-sm font-semibold text-foreground">Who's Running?</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Candidates for this seat in the next election. Data may change — check back closer to election day.
      </p>
      <div className="space-y-2 mt-1">
        {candidates.map((c, i) => (
          <div key={i} className="flex items-center justify-between gap-2 bg-background rounded-lg px-3 py-2 border border-border">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-medium text-sm text-foreground truncate">{c.name}</span>
              {c.party && (
                <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${partyBadge(c.party)}`}>
                  {c.party}
                </span>
              )}
              {c.isIncumbent && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 shrink-0">
                  Incumbent
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Website</span>
                </a>
              ) : (
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(c.name + " " + officeName + " candidate")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Search</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}