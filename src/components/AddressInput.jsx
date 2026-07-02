import { useState } from "react";
import { Search, MapPin, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddressInput({ onSearch, isLoading }) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = address.trim();
    if (!trimmed) {
      setError("Please enter an address or zip code.");
      return;
    }
    if (trimmed.length < 4) {
      setError("Please enter a more complete address or a 5-digit zip code.");
      return;
    }
    setError("");
    onSearch(trimmed);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <label htmlFor="address-input" className="sr-only">Enter address or zip code</label>
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="address-input"
            type="text"
            value={address}
            onChange={(e) => { setAddress(e.target.value); setError(""); }}
            placeholder="Enter address or zip code (e.g. 90210 or 1600 Pennsylvania Ave NW, Washington DC)"
            className="pl-10 h-12 text-base border-2 focus:border-primary rounded-xl"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 px-6 rounded-xl font-semibold text-base bg-accent hover:bg-accent/90 text-accent-foreground gap-2 shrink-0"
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Looking up…</>
          ) : (
            <><Search className="w-5 h-5" /> Find Officials</>
          )}
        </Button>
      </form>
      {error && (
        <div className="mt-3 flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-4 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}