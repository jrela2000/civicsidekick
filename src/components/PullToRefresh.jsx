import { useState, useRef } from "react";
import { RefreshCw } from "lucide-react";

const PULL_THRESHOLD = 70;

export default function PullToRefresh({ onRefresh, children }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (touchStartY.current === null) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) {
      e.preventDefault();
      setPullDistance(Math.min(delta, PULL_THRESHOLD + 20));
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= PULL_THRESHOLD && onRefresh) {
      setPullDistance(0);
      touchStartY.current = null;
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    } else {
      setPullDistance(0);
      touchStartY.current = null;
    }
  };

  const indicatorVisible = pullDistance > 0 || refreshing;
  const triggered = pullDistance >= PULL_THRESHOLD || refreshing;

  return (
    <div
      style={{ position: "relative" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator — absolutely positioned so it doesn't shift content */}
      {indicatorVisible && (
        <div
          className="absolute top-0 left-0 right-0 flex justify-center items-center gap-2 text-muted-foreground text-sm select-none z-10 pointer-events-none"
          style={{
            height: 40,
            transform: `translateY(${Math.min(pullDistance * 0.5, 32)}px)`,
            transition: refreshing ? "none" : undefined,
          }}
        >
          <RefreshCw className={`w-5 h-5 ${triggered ? "text-primary animate-spin" : ""}`} />
          <span>{triggered ? (refreshing ? "Refreshing…" : "Release to refresh") : "Pull to refresh"}</span>
        </div>
      )}
      {children}
    </div>
  );
}