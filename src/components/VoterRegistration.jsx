import { ExternalLink, CheckCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getVoterRegistrationLinks } from "../data/voterRegistration";

export default function VoterRegistration({ state }) {
  const links = getVoterRegistrationLinks(state);

  if (!links) return null;

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">🗳️</span>
        <h3 className="font-display font-bold text-lg text-foreground">Voter Registration — {links.name}</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        Use official state resources to register or verify your registration status.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          asChild
          className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-11 rounded-xl"
        >
          <a href={links.register} target="_blank" rel="noopener noreferrer">
            <UserPlus className="w-4 h-4" />
            Register to Vote
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="flex-1 gap-2 border-2 border-primary text-primary hover:bg-primary/5 h-11 rounded-xl"
        >
          <a href={links.check} target="_blank" rel="noopener noreferrer">
            <CheckCircle className="w-4 h-4" />
            Check Registration
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Links open official .gov websites. Registration deadlines vary — check your state's site for details.
      </p>
    </div>
  );
}