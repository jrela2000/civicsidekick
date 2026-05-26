import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import BottomNav from "./BottomNav";
import AppHeader from "./AppHeader";
import { getDepth } from "../lib/navigationHistory";

export default function Layout() {
  const location = useLocation();
  const prevDepth = useRef(getDepth(location.pathname));
  const currentDepth = getDepth(location.pathname);
  const direction = currentDepth >= prevDepth.current ? 1 : -1;
  prevDepth.current = currentDepth;

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