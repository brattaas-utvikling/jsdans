import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { STUDIO_INFO } from "@/polymet/data/dance-studio-data";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1646084067464-0aa782d923dc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Dancers in motion"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 dark:from-black/70 dark:to-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-centergap-2 mb-4">
            <Trophy className="h-6 w-6 text-purple-400" />

            <p className="text-white font-medium tracking-wide uppercase text-sm">
              {STUDIO_INFO.name}
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            {STUDIO_INFO.tagline}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Uttrykk deg selv gjennom dans
            </span>
          </h1>

          <p className="text-lg text-white/80 mb-8 max-w-xl">
          Moderne dansesstudio i hjertet av [by/område] hvor alle er velkommen. Fra første steg til store scener – vi hjelper deg å finne din rytme.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
            >
              Book gratis prøvetime
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-purple-500 border-white/30 hover:bg-black/10 hover:text-purple-500"
            >
              Vis timeplan
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/30 dark:from-black to-transparent z-10" />

      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="absolute top-1/4 -left-12 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />
    </section>
  );
}
