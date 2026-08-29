import { ExternalLink, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PollWorkerCta() {
  return (
    <div className="bg-gradient-to-br from-emerald-500/5 to-primary/5 border-2 border-emerald-500/20 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">🙋</span>
        <h3 className="font-display font-bold text-lg text-foreground">Be a Poll Worker</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        Help your community run a smooth election. Sign up through Power the Polls to serve near you.
      </p>
      <Button
        asChild
        className="w-full sm:w-auto gap-2 bg-emerald-600 hover:bg-emerald-700 text-white h-11 rounded-xl border-0"
      >
        <a href="https://www.powerthepolls.org/aisha" target="_blank" rel="noopener noreferrer">
          <Users className="w-4 h-4" />
          Register to Be a Poll Worker
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </Button>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Opens Power the Polls, a nonpartisan initiative recruiting poll workers nationwide.
      </p>
    </div>
  );
}