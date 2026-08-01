import { Shield } from "lucide-react";

export default function LoadingScreen({ message = "Loading…" }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background gap-6">
      {/* Logo mark */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 rounded-full bg-primary/10 animate-ping" />
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
          <Shield className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>

      {/* App name */}
      <div className="text-center">
        <p className="font-display font-bold text-xl text-foreground tracking-tight">Civic Sidekick</p>
        <p className="text-muted-foreground text-sm mt-1">{message}</p>
      </div>

      {/* Animated dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
          />
        ))}
      </div>
    </div>
  );
}