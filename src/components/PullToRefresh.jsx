import { useState, useRef, useEffect } from "react";
import { RefreshCw } from "lucide-react";

const PULL_THRESHOLD = 70;

export default function PullToRefresh({ onRefresh, children }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(null);
  const pullDistanceRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      if (window.scrollY === 0) touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (touchStartY.current === null) return;
      const delta = e.touches[0].clientY - touchStartY.current;
      if (delta > 0) {
        e.preventDefault(); // works because listener is non-passive
        const clamped = Math.min(delta, PULL_THRESHOLD + 20);
        pullDistanceRef.current = clamped;
        setPullDistance(clamped);
      }
    };

    const onTouchEnd = async () => {
      const dist = pullDistanceRef.current;
      setPullDistance(0);
      pullDistanceRef.current = 0;
      touchStartY.current = null;
      if (dist >= PULL_THRESHOLD && onRefresh) {
        setRefreshing(true);
        await onRefresh();
        setRefreshing(false);
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false }); // non-passive so preventDefault works
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [onRefresh]);

  const indicatorVisible = pullDistance > 0 || refreshing;
  const triggered = pullDistance >= PULL_THRESHOLD || refreshing;

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {indicatorVisible && (
        <div
          className="absolute top-0 left-0 right-0 flex justify-center items-center gap-2 text-muted-foreground text-sm select-none z-10 pointer-events-none"
          style={{
            height: 40,
            transform: `translateY(${Math.min(pullDistance * 0.5, 32)}px)`,
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