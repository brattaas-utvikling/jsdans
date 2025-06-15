import { Button } from "@/components/ui/button";
import { STUDIO_INFO } from "@/data/dance-studio-data";

export default function CtaSection() {
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
            <p className="text-sm font-bebas text-pink-600 dark:text-pink-400 
                          uppercase tracking-wider">
              {STUDIO_INFO.name}
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6 tracking-tight">
            {STUDIO_INFO.tagline}
            <span className="font-montserrat block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
              Uttrykk deg selv gjennom dans
            </span>
          </h1>

          <p className="font-montserrat text-lg text-white/80 mb-8 max-w-xl">
            Endelig kan vi dele dette vi har drømt om lenge! Vi åpner dørene for Urban Studios høsten 2025, et sted hvor alle kan utforske og utvikle sin dans. Enten du er nybegynner eller erfaren, har vi noe for deg.
            
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white border-0"
            >
              Book et kurs
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-blue-500 border-white/30 hover:bg-black/10 hover:text-blue-500"
            >
              Timeplan
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-black to-transparent z-10" />

      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="absolute top-1/4 -left-12 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />
    </section>
  );
}