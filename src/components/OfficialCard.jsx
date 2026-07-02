import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, Mail, Globe, MapPin, Twitter, Facebook, Youtube } from "lucide-react";
import { getOfficeDescription } from "../data/officeDescriptions";

const levelColors = {
  Federal: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  State: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  County: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Local: "bg-green-500/10 text-green-400 border-green-500/30",
};

function SocialLink({ type, url }) {
  const icons = {
    Twitter: { icon: Twitter, color: "text-sky-500" },
    Facebook: { icon: Facebook, color: "text-blue-600" },
    YouTube: { icon: Youtube, color: "text-red-500" },
    GooglePlus: { icon: Globe, color: "text-gray-500" },
  };
  const config = icons[type] || { icon: Globe, color: "text-gray-500" };
  const Icon = config.icon;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer"
      className={`${config.color} hover:opacity-75 transition-opacity select-none`}
      title={type}>
      <Icon className="w-4 h-4" />
    </a>
  );
}

export default function OfficialCard({ official }) {
  const [expanded, setExpanded] = useState(false);
  const [roleExpanded, setRoleExpanded] = useState(false);

  const description = getOfficeDescription(official.title);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {official.photoUrl ? (
              <img src={official.photoUrl} alt={official.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-border shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-2 border-border">
                <span className="text-primary font-bold text-lg">
                  {official.name?.charAt(0) || "?"}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-foreground text-base leading-tight">{official.name}</h3>
              <p className="text-muted-foreground text-sm mt-0.5">{official.title}</p>
              {official.party && (
                <span className="text-xs text-muted-foreground">({official.party})</span>
              )}
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="shrink-0 p-2.5 min-w-[44px] min-h-[44px] rounded-lg hover:bg-muted transition-colors text-muted-foreground select-none flex items-center justify-center"
            aria-label={expanded ? "Collapse details" : "Expand details"}
            aria-expanded={expanded}
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-3 bg-muted/30">
          {/* Contact Info */}
          <div className="space-y-2 contact-details">
            {official.phones?.length > 0 && (
              <a href={`tel:${official.phones[0]}`}
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                {official.phones[0]}
              </a>
            )}
            {official.emails?.length > 0 && (
              <a href={`mailto:${official.emails[0]}`}
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors break-all">
                <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                {official.emails[0]}
              </a>
            )}
            {official.urls?.length > 0 && (
              <a href={official.urls[0]} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline break-all select-none">
                <Globe className="w-4 h-4 shrink-0" />
                Official Website ↗
              </a>
            )}
            {official.address?.length > 0 && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  {[official.address[0].line1, official.address[0].city, official.address[0].state, official.address[0].zip]
                    .filter(Boolean).join(", ")}
                </span>
              </div>
            )}
          </div>

          {/* Social Links */}
          {official.channels?.length > 0 && (
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-muted-foreground">Social:</span>
              {official.channels.map((channel, i) => (
                <SocialLink key={i} type={channel.type} url={channel.id?.startsWith("http") ? channel.id : `https://twitter.com/${channel.id}`} />
              ))}
            </div>
          )}

          {/* Role Description */}
          {description && (
            <div className="border-t border-border pt-3">
              <button
                onClick={() => setRoleExpanded(!roleExpanded)}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors w-full text-left min-h-[44px]"
                aria-expanded={roleExpanded}
              >
                <span>📋 What do they do?</span>
                {roleExpanded ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
              </button>
              {roleExpanded && (
                <div className="mt-2 text-sm text-muted-foreground space-y-2 description-text">
                  <p>{description.description}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {description.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}