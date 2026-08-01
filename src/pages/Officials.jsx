import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import AddressInput from "../components/AddressInput";
import LevelSection from "../components/LevelSection";
import VoterRegistration from "../components/VoterRegistration";
import PullToRefresh from "../components/PullToRefresh";
import { AlertCircle, ArrowLeft, RefreshCw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const CACHE_DURATION = 24 * 60 * 60 * 1000;

function getCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_DURATION) { localStorage.removeItem(key); return null; }
    return data;
  } catch { return null; }
}

function setCache(key, data) {
  try { localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() })); } catch {}
}

const LEVELS_ORDER = ["Federal", "State", "County", "Local"];

export default function Officials() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [officials, setOfficials] = useState(null);
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);   // full-page spinner (no cache)
  const [isRefreshing, setIsRefreshing] = useState(false); // inline refresh indicator
  const [error, setError] = useState("");
  const [fromCache, setFromCache] = useState(false);

  const fetchOfficials = useCallback(async (searchAddress, { forceRefresh = false } = {}) => {
    const cacheKey = `civics:${searchAddress.toLowerCase().trim()}`;

    if (forceRefresh) {
      localStorage.removeItem(cacheKey);
    } else {
      // Optimistic cache-first: render immediately without spinner
      const cached = getCache(cacheKey);
      if (cached) {
        setOfficials(cached.officials);
        setState(cached.state || "");
        setFromCache(true);
        setError("");
        return;
      }
    }

    // No cache — show full-page spinner
    setIsLoading(true);
    setError("");
    setFromCache(false);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Look up elected officials for the US address: "${searchAddress}" as of mid-2026. Search for the most current information available.

Return JSON with:
- state: 2-letter state abbreviation
- officials: array of objects with fields: name, title, party, level (Federal/State/County/Local), phones (array), emails (array), urls (array), candidates (array of objects with: name, party, url (campaign website if known, otherwise null), isIncumbent (boolean))

Include federal (President, VP, US Senators x2, US Rep), state (Governor, Lt Governor, state legislators), county, and local officials (Mayor, City Council, etc.). It is critically important that the local officials (Mayor especially) reflect the most recently elected or appointed person as of mid-2026. Search current news and official government websites to verify. Keep the list to the most important ~15-20 officials.

For the candidates field on each official: list all known candidates running for that seat in the next upcoming election (include the incumbent as a candidate with isIncumbent: true if they are running for re-election). If no election is imminent or no candidates are known, return an empty array.`,
      add_context_from_internet: true,
      model: "gemini_3_flash",
      response_json_schema: {
        type: "object",
        properties: {
          state: { type: "string" },
          officials: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                title: { type: "string" },
                party: { type: "string" },
                level: { type: "string" },
                phones: { type: "array", items: { type: "string" } },
                emails: { type: "array", items: { type: "string" } },
                urls: { type: "array", items: { type: "string" } },
                candidates: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      party: { type: "string" },
                      url: { type: "string" },
                      isIncumbent: { type: "boolean" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!result || !result.officials || result.officials.length === 0) {
      setError("We couldn't find officials for that address. Please check the address and try again, or try entering just your zip code.");
      setIsLoading(false);
      return;
    }

    const data = { officials: result.officials, state: result.state || "" };
    setCache(cacheKey, data);
    setOfficials(result.officials);
    setState(result.state || "");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const addr = params.get("address");
    if (addr) {
      setAddress(addr);
      fetchOfficials(addr);
    }
  }, [fetchOfficials]);

  const handleNewSearch = (newAddress) => {
    setAddress(newAddress);
    navigate(`/officials?address=${encodeURIComponent(newAddress)}`);
    fetchOfficials(newAddress);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchOfficials(address, { forceRefresh: true });
    setIsRefreshing(false);
  };

  const handlePullRefresh = async () => {
    await fetchOfficials(address, { forceRefresh: true });
  };

  const grouped = officials
    ? LEVELS_ORDER.reduce((acc, level) => {
        const group = officials.filter(o => (o.level || "Local") === level);
        if (group.length > 0) acc[level] = group;
        return acc;
      }, {})
    : {};

  return (
    <PullToRefresh onRefresh={address ? handlePullRefresh : null}>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Search bar */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
          <h2 className="font-display font-bold text-xl text-foreground mb-4">Search Another Address</h2>
          <AddressInput onSearch={handleNewSearch} isLoading={isLoading} />
        </div>

        {/* Full-page spinner — only when no cached data */}
        {isLoading && (
          <div className="text-center py-16" aria-live="polite" aria-busy="true">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="font-semibold text-foreground text-lg">Finding your representatives…</p>
            <p className="text-muted-foreground text-sm mt-1">Searching live civic data for: {address}</p>
            <p className="text-muted-foreground/70 text-xs mt-3 max-w-xs mx-auto leading-relaxed">
              This searches multiple live sources in real time, so it may take 10–20 seconds. We're improving speed in future builds — thank you for your patience!
            </p>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6 text-center">
            <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
            <h3 className="font-semibold text-foreground text-lg mb-2">Unable to find officials</h3>
            <p className="text-muted-foreground text-sm mb-4">{error}</p>
            <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Try a Different Address
            </Button>
          </div>
        )}

        {/* Results */}
        {!isLoading && officials && officials.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display font-bold text-2xl text-foreground">Your Representatives</h1>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {officials.length} officials found for <span className="font-medium text-foreground">{address}</span>
                  {fromCache && <span className="ml-2 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">Cached</span>}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Refreshing…" : "Refresh"}
              </Button>
            </div>

            {/* Voter Registration */}
            {state && <VoterRegistration state={state} />}

            {/* Deadlines link */}
            {state && (
              <div className="bg-card border border-border rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Election Deadlines</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">View upcoming deadlines and save them to your calendar</p>
                </div>
                <Link
                  to={`/deadlines?state=${state}&address=${encodeURIComponent(address)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
                >
                  <Calendar className="w-4 h-4" /> View Deadlines
                </Link>
              </div>
            )}

            {/* Officials by level */}
            <div className="space-y-4">
              {LEVELS_ORDER.filter(l => grouped[l]).map(level => (
                <LevelSection key={level} level={level} officials={grouped[level]} />
              ))}
            </div>

            {/* Results quality notice + feedback */}
            <div className="bg-muted/50 border border-border rounded-2xl p-5 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">Results look incomplete or outdated?</span> Hit the <strong>Refresh</strong> button above — sometimes the data doesn't fully load on the first pass.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Found an error or have a suggestion?{" "}
                <a
                  href="https://civicsidekick.app/feedback"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors font-medium"
                >
                  Share your feedback →
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </PullToRefresh>
  );
}