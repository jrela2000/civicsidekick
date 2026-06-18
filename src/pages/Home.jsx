import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressInput from "../components/AddressInput";
import { Shield, Users, BookOpen, Vote } from "lucide-react";

const features = [
  { icon: Users, title: "Find Every Official You Elect", desc: "Enter your address and instantly see your Governor, U.S. Senators, U.S. Representatives, and local officials all in one place." },
  { icon: BookOpen, title: "Understand Each Role", desc: "Plain-language explanations of what each office does and who they serve — no jargon." },
  { icon: Vote, title: "Register to Vote", desc: "Direct links to official state voter registration and status verification pages." },
  { icon: Shield, title: "No Ads. No Tracking. No Nonsense.", desc: "A privacy-first tool. Your address only touches public APIs. Zero data stored anywhere." },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (address) => {
    setIsLoading(true);
    navigate(`/officials?address=${encodeURIComponent(address)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0b1628] via-[#0f1d35] to-[#132344] text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            Non-partisan · Ad-free · Privacy-first
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Your officials. Their votes. One tap.
          </h1>
          <p className="text-primary-foreground/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Enter your address and meet every person representing you — from your Governor to your City Council. No signup, no tracking, no nonsense.
          </p>
          <div className="bg-card/10 backdrop-blur-sm border border-card/20 rounded-2xl p-4 sm:p-6">
            <AddressInput onSearch={handleSearch} isLoading={isLoading} />
          </div>
          <p className="mt-4 text-primary-foreground/50 text-sm">
            Try: <button onClick={() => handleSearch("90210")} className="underline hover:text-primary-foreground transition-colors">90210</button>,{" "}
            <button onClick={() => handleSearch("1600 Pennsylvania Ave NW, Washington DC")} className="underline hover:text-primary-foreground transition-colors">1600 Pennsylvania Ave NW</button>, or your own address
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-center text-foreground mb-10">
          Everything you need. Nothing you don't.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-5 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <h2 className="font-display font-bold text-2xl text-foreground mb-4">Ready to meet your representatives?</h2>
          <p className="text-muted-foreground mb-6">Trusted public data. Zero data collection. Enter your address above — it takes less than 10 seconds.</p>
        </div>
      </section>
    </div>
  );
}