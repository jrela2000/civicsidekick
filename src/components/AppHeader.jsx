import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRoot = location.pathname === "/";

  const titles = {
    "/officials": "Your Representatives",
    "/glossary": "Office Glossary",
  };
  const title = titles[location.pathname] ?? "Civic Sidekick";

  return (
    <header className="sticky top-0 z-40 bg-primary text-primary-foreground flex items-center gap-3 px-4 h-14 select-none"
      style={{ paddingTop: "env(safe-area-inset-top)" }}>
      {!isRoot && (
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors select-none"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      <span className="font-display font-bold text-lg">{isRoot ? "Civic Sidekick" : title}</span>
    </header>
  );
}