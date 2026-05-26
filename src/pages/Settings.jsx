import { useState } from "react";
import { Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function getCacheCount() {
  return Object.keys(localStorage).filter(k => k.startsWith("civics:")).length;
}

export default function Settings() {
  const [cleared, setCleared] = useState(false);
  const [count, setCount] = useState(getCacheCount);

  const handleClear = () => {
    Object.keys(localStorage)
      .filter(k => k.startsWith("civics:"))
      .forEach(k => localStorage.removeItem(k));
    setCount(0);
    setCleared(true);
    setTimeout(() => setCleared(false), 3000);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <section className="bg-card border border-border rounded-2xl p-5 space-y-3">
        <h2 className="font-semibold text-foreground text-base">Cached Data</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          To speed things up, official lookups are cached on your device for 24 hours. No data is ever sent to our servers.
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm text-muted-foreground">
            {count === 0 ? "No cached lookups" : `${count} cached address lookup${count !== 1 ? "s" : ""}`}
          </span>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClear}
            disabled={count === 0 || cleared}
            className="gap-2"
          >
            {cleared ? (
              <><CheckCircle2 className="w-4 h-4" /> Cleared</>
            ) : (
              <><Trash2 className="w-4 h-4" /> Clear Cache</>
            )}
          </Button>
        </div>
      </section>

      <section className="bg-card border border-border rounded-2xl p-5 space-y-2">
        <h2 className="font-semibold text-foreground text-base">Privacy</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Civic Sidekick does not require an account, collect personal information, or track your activity. Addresses you search are only used to fetch public civic data and are cached locally on your device.
        </p>
      </section>

      <section className="bg-card border border-border rounded-2xl p-5 space-y-2">
        <h2 className="font-semibold text-foreground text-base">About</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Civic Sidekick is a non-partisan, ad-free tool for finding your elected representatives. Data is sourced from public government records.
        </p>
      </section>
    </div>
  );
}