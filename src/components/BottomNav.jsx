import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Settings, Calendar } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/glossary", label: "Offices", icon: BookOpen },
  { to: "/deadlines", label: "Deadlines", icon: Calendar },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabPress = (to) => {
    const isActive = location.pathname === to;
    if (isActive) {
      navigate(to, { replace: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(to);
    }
  };

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground border-t border-primary-foreground/10"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="flex">
        {navLinks.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
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