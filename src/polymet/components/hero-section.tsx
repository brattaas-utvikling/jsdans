import { Button } from "@/components/ui/button";
import { STUDIO_INFO } from "../../polymet/data/dance-studio-data";

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
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

            <p className="text-white font-medium tracking-wide uppercase text-sm">
              {STUDIO_INFO.name}
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            {STUDIO_INFO.tagline}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-violet-200">
              Uttrykk deg selv gjennom dans
            </span>
          </h1>

          <p className="text-lg text-white/80 mb-8 max-w-xl">
          Endelig kan vi dele dette vi har drømt om så lenge: vi åpner danseskole for unge dansekunstnere igjen! Velkommen til klasser allerede høsten 2025. 
          </p>
          {/* Moderne dansesstudio i hjertet av <span className="font-bold text-white/90">Kongsvinger</span> hvor alle er velkommen. Fra første steg til store scener – vi hjelper deg å finne din rytme. */}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 text-white border-0"
            >
              Book gratis prøvetime
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-blue-100 border-blue-300/30 hover:bg-blue-500/10 hover:text-white hover:border-blue-500"
            >
              Vis timeplan
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/30 dark:from-black to-transparent z-10" />

      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="absolute top-1/4 -left-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
    </section>
  );
}
