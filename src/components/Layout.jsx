import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav from "./BottomNav";
import AppHeader from "./AppHeader";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex-1 pb-16 sm:pb-0"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}