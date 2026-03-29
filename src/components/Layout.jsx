import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { BookOpen, Home, MapPin } from "lucide-react";

export default function Layout() {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/glossary", label: "Offices", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-accent rounded-lg p-1.5">
              <MapPin className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <span className="font-display font-bold text-lg leading-none block">CivicLens</span>
              <span className="text-primary-foreground/60 text-xs">Know Your Representatives</span>
            </div>
          </Link>
          <nav className="flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === to
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-border mt-8">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-muted-foreground text-sm">
          <p className="font-medium text-foreground mb-1">CivicLens</p>
          <p>Empowering citizens to know and engage with their elected representatives.</p>
          <p className="mt-2 text-xs">Data provided via civic information services. Always verify with official sources.</p>
        </div>
      </footer>
    </div>
  );
}