import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Settings, Calendar } from "lucide-react";
import { getTabLastPath, saveTabPath } from "@/lib/tabHistory";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/glossary", label: "Offices", icon: BookOpen },
  { to: "/deadlines", label: "Deadlines", icon: Calendar },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabPress = (tabRoot) => {
    const isActive = location.pathname === tabRoot ||
      (tabRoot !== "/" && location.pathname.startsWith(tabRoot));

    if (isActive) {
      // Tapping active tab: scroll to top
      saveTabPath(tabRoot, "");
      navigate(tabRoot, { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Restore last visited path within this tab
      const lastPath = getTabLastPath(tabRoot);
      navigate(lastPath);
    }
  };

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground border-t border-primary-foreground/10"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex">
        {navLinks.map(({ to, label, icon: Icon }) => {
          const active =
            location.pathname === to ||
            (to !== "/" && location.pathname.startsWith(to));
          return (
            <button
              key={to}
              onClick={() => handleTabPress(to)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors select-none ${
                active ? "text-primary-foreground" : "text-primary-foreground/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}