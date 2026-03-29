import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Loader2, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import LevelSection from "../components/LevelSection";
import VoterRegistration from "../components/VoterRegistration";
import { getOfficeDescription } from "../data/officeDescriptions";

function classifyLevel(office) {
  const desc = getOfficeDescription(office.name);
  if (desc) return desc.level;

  const name = office.name.toLowerCase();
  const levels = office.levels || [];
  const divisionId = office.divisionId || "";

  if (levels.includes("country") || divisionId === "ocd-division/country:us" || name.includes("u.s.") || name.includes("united states")) return "Federal";
  if (levels.includes("administrativeArea1") || divisionId.includes("/state:") && !divisionId.includes("/county:") && !divisionId.includes("/place:")) return "State";
  if (levels.includes("administrativeArea2") || divisionId.includes("/county:")) return "County";
  if (levels.includes("locality") || levels.includes("subLocality1") || levels.includes("subLocality2") || divisionId.includes("/place:")) return "Local";

  return "Other";
}

export default function Officials() {
  const navigate = useNavigate();
  const [officials, setOfficials] = useState([]);
  const [groupedOfficials, setGroupedOfficials] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const address = sessionStorage.getItem("civicAddress");
  const stateCode = sessionStorage.getItem("civicState");

  useEffect(() => {
    if (!address) {
      navigate("/");
      return;
    }
    fetchOfficials();
  }, []);

  const fetchOfficials = async () => {
    setIsLoading(true);
    setError("");

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Look up ALL elected officials who represent this US address: "${address}"

Use your knowledge of current US government officials. Include ALL levels:
- Federal: President, Vice President, US Senators, US Representative
- State: Governor, Lieutenant Governor, State Senators, State Representatives/Assembly members, Attorney General, Secretary of State
- County: County executives, commissioners, sheriff, district attorney, clerks
- Local: Mayor, city council members, school board members

For each official, provide as much information as you can find:
- Full name
- Office/title (use standard titles like "U.S. Senator", "Governor", etc.)
- Political party (full name like "Democratic Party" or "Republican Party")
- Phone number(s) if known
- Email if known
- Official website URL if known
- Office address if known
- Social media channels (type and ID) if known
- Photo URL if known

Be thorough - include every official you can identify for this specific address. It's important to be accurate.`,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          officials: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                office: { type: "string" },
                party: { type: "string" },
                phones: { type: "array", items: { type: "string" } },
                emails: { type: "array", items: { type: "string" } },
                urls: { type: "array", items: { type: "string" } },
                address: { type: "string" },
                photoUrl: { type: "string" },
                channels: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string" },
                      id: { type: "string" }
                    }
                  }
                },
                level: { type: "string" }
              }
            }
          },
          error_message: { type: "string" }
        }
      },
      model: "gemini_3_flash"
    });

    if (!result.success || !result.officials?.length) {
      setError(result.error_message || "Could not find officials for this address. Please try again.");
      setIsLoading(false);
      return;
    }

    // Group by level
    const levelOrder = ["Federal", "State", "County", "Local", "Other"];
    const grouped = {};

    result.officials.forEach((official) => {
      let level = official.level || "Other";
      if (!levelOrder.includes(level)) {
        level = classifyLevel({ name: official.office, levels: [], divisionId: "" });
      }
      if (!grouped[level]) grouped[level] = [];
      grouped[level].push(official);
    });

    setOfficials(result.officials);
    setGroupedOfficials(grouped);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Loader2 className="w-7 h-7 text-primary animate-spin" />
        </div>
        <div className="text-center space-y-1.5">
          <p className="font-semibold text-foreground">Finding your representatives...</p>
          <p className="text-sm text-muted-foreground">Searching all government levels</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-destructive" />
        </div>
        <div className="text-center space-y-2 max-w-md">
          <p className="font-semibold text-foreground">Something went wrong</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Search
          </Button>
          <Button onClick={fetchOfficials}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const levelOrder = ["Federal", "State", "County", "Local", "Other"];
  let runningIndex = 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            New search
          </Link>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Your Representatives
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 border border-primary/10"
        >
          <span className="text-2xl font-bold text-primary">{officials.length}</span>
          <span className="text-sm text-muted-foreground">officials found</span>
        </motion.div>
      </div>

      {/* Officials by level */}
      <div className="space-y-10">
        {levelOrder.map((level) => {
          const levelOfficials = groupedOfficials[level];
          if (!levelOfficials?.length) return null;
          const section = (
            <LevelSection
              key={level}
              level={level}
              officials={levelOfficials}
              startIndex={runningIndex}
            />
          );
          runningIndex += levelOfficials.length;
          return section;
        })}
      </div>

      {/* Voter Registration */}
      {stateCode && (
        <div className="pt-4">
          <VoterRegistration stateCode={stateCode} />
        </div>
      )}
    </div>
  );
}