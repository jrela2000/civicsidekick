import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect } from "react";
import BottomNav from "./BottomNav";
import AppHeader from "./AppHeader";
import { getDepth } from "../lib/navigationHistory";

// Persist scroll position per tab path
const scrollPositions = {};

export default function Layout() {
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);
  const prevDepth = useRef(getDepth(location.pathname));
  const currentDepth = getDepth(location.pathname);
  const direction = currentDepth >= prevDepth.current ? 1 : -1;
  prevDepth.current = currentDepth;

  // Save scroll before leaving, restore after arriving
  useEffect(() => {
    const prev = prevPathnameRef.current;
    if (prev !== location.pathname) {
      // Save old path's scroll position
      scrollPositions[prev] = window.scrollY;
      prevPathnameRef.current = location.pathname;
    }

    // Restore scroll for new path (defer so the page has rendered)
    const saved = scrollPositions[location.pathname];
    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, saved ?? 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <AppHeader />
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.main
          key={location.pathname}
          custom={direction}
          initial={(d) => ({ x: d * 48, opacity: 0 })}
          animate={{ x: 0, opacity: 1 }}
          exit={(d) => ({ x: d * -48, opacity: 0 })}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          className="flex-1 pb-16 sm:pb-0"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}