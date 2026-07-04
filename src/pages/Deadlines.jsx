import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { CalendarPlus, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddressInput from "../components/AddressInput";
import PullToRefresh from "../components/PullToRefresh";

export default function Deadlines() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const stateCode = searchParams.get("state") || "";
  const [address, setAddress] = useState(searchParams.get("address") || "");
  const [deadlines, setDeadlines] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [addedIds, setAddedIds] = useState(new Set());
  const [resolvedState, setResolvedState] = useState("");

  useEffect(() => {
    if (address && !stateCode && !resolvedState) {
      const resolveState = async () => {
        setIsLoading(true);
        setError("");
        const result = await base44.integrations.Core.InvokeLLM({
          prompt: `What US state is this address in? Return just the 2-letter state abbreviation. Address: "${address}"`,
          response_json_schema: { type: "object", properties: { state: { type: "string" } } }
        });
        if (result?.state && result.state.length === 2) {
          setResolvedState(result.state);
          fetchDeadlines(result.state);
        } else {
          setError("Could not determine your state from that address. Please try again.");
          setIsLoading(false);
          setTimeout(() => setError(""), 5000);
        }
      };
      resolveState();
    }
  }, [address, stateCode]);

  const fetchDeadlines = async (state) => {
    setIsLoading(true);
    setError("");

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `List important upcoming election and voter registration deadlines for ${state} in the United States. Include:
- Voter registration deadlines
- Primary election dates
- General election dates
- Early voting periods
- Mail-in/absentee ballot request deadlines
- Any other key civic deadlines

Return only deadlines that haven't passed yet (dates in the future relative to June 2026). For each deadline, provide:
- title: short descriptive title
- date: the deadline date in YYYY-MM-DD format
- description: one-sentence description including the state name
- category: "registration", "election", "early_voting", or "other"

Return the top 8-10 most important upcoming deadlines.`,
      add_context_from_internet: true,
      model: "gemini_3_flash",
      response_json_schema: {
        type: "object",
        properties: {
          state: { type: "string" },
          deadlines: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                date: { type: "string" },
                description: { type: "string" },
                category: { type: "string" }
              }
            }
          }
        }
      }
    });

    if (!result || !result.deadlines || result.deadlines.length === 0) {
      setError("Couldn't find upcoming deadlines. Try again later.");
      setIsLoading(false);
      setTimeout(() => setError(""), 5000);
      return;
    }

    setDeadlines(result.deadlines);
    setIsLoading(false);
  };

  useEffect(() => {
    if (stateCode) {
      fetchDeadlines(stateCode);
    }
  }, [stateCode]);

  // Build a Google Calendar URL that works natively on all platforms
  const buildGoogleCalendarUrl = (deadline) => {
    const dateStr = deadline.date.replace(/-/g, "");
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: deadline.title,
      dates: `${dateStr}/${dateStr}`,
      details: `${deadline.description}\n\nAdded by Civic Sidekick`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const handleAddToCalendar = (deadline) => {
    const id = deadline.date + deadline.title;
    // Open Google Calendar directly — works on all platforms including Android
    window.open(buildGoogleCalendarUrl(deadline), "_blank", "noopener,noreferrer");
    setAddedIds(prev => new Set([...prev, id]));
  };

  const handleNewSearch = (newAddress) => {
    setAddress(newAddress);
    navigate(`/deadlines?address=${encodeURIComponent(newAddress)}`);
  };

  const handlePullRefresh = async () => {
    const s = stateCode || resolvedState;
    if (s) await fetchDeadlines(s);
  };

  const categories = {
    election: { label: "Election Day", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
    registration: { label: "Registration", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
    early_voting: { label: "Early Voting", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
    other: { label: "Deadline", bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  };

  return (
    <PullToRefresh onRefresh={handlePullRefresh}>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
          <h1 className="font-display font-bold text-2xl text-foreground mb-2">Election Deadlines</h1>
          <p className="text-muted-foreground text-sm mb-4">
            Upcoming election and voter registration deadlines. Add them to your calendar with one tap.
          </p>
          <AddressInput onSearch={handleNewSearch} isLoading={false} />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-16" aria-live="polite" aria-busy="true">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="font-semibold text-foreground text-lg">Finding upcoming deadlines…</p>
            <p className="text-muted-foreground text-sm mt-1">{stateCode || resolvedState ? `Searching for deadlines in ${stateCode || resolvedState}` : "Loading..."}</p>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <p className="text-muted-foreground">{error}</p>
            {address && (
              <Button variant="outline" onClick={() => navigate("/")} className="gap-2 mt-4">
                <ArrowLeft className="w-4 h-4" /> Try a Different Address
              </Button>
            )}
          </div>
        )}

        {/* Deadlines list */}
        {!isLoading && deadlines && deadlines.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground text-lg">
                {deadlines.length} deadlines for {stateCode || resolvedState}
              </h2>
            </div>
            {deadlines.map((d) => {
              const cat = categories[d.category] || categories.other;
              const id = d.date + d.title;
              const isAdded = addedIds.has(id);

              return (
                <div
                  key={id}
                  className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cat.bg} ${cat.text} ${cat.border} border`}>
                        {cat.label}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(d.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground">{d.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{d.description}</p>
                  </div>
                  <Button
                    variant={isAdded ? "secondary" : "default"}
                    size="sm"
                    onClick={() => handleAddToCalendar(d)}
                    className="shrink-0 gap-2"
                  >
                    {isAdded ? <Check className="w-4 h-4" /> : <CalendarPlus className="w-4 h-4" />}
                    {isAdded ? "Opened" : "Add to Calendar"}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PullToRefresh>
  );
}