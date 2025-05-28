import { STUDIO_INFO } from "@/polymet/data/dance-studio-data";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-black overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image column */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556394890-c874aac332b1?q=80&w=3100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Dance studio interior"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-mint-400/30 dark:bg-mint-500/20 blur-xl" />

            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-coral-400/30 dark:bg-coral-500/20 blur-xl" />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-purple-300 dark:border-purple-700 rounded-2xl -z-10 translate-x-4 translate-y-4" />
          </div>

          {/* Content column */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3">
              Om vårt dansestudio
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Helt nytt. Helt oss.
            </h3>

            <div className="prose prose-lg dark:prose-invert">
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {STUDIO_INFO.description}
              </p>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
              Vi er Kongsvingers nyeste dansesstudio, født av kjærlighet til bevegelse og fellesskap. Her møtes erfaring med frisk energi – våre instruktører brenner for å dele kunsten og glede ved dans.
Studioet ligger sentralt og tilgjengelig, med gangavstand fra togstasjon, som inspirerer kreativitet. Vi tror på at dans ikke bare former kroppen, men også sjelen. Derfor har vi skapt et rom hvor alle kan utfolde seg – uansett bakgrunn eller ferdighetsnivå.
</p>
<p className="mt-4 mb-6 text-gray-700 dark:text-gray-300">
    <span className="font-bold">Vår filosofi: </span> 
    Dans er for alle. Kreativitet blomstrer når vi tør å være oss selv.
  </p>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  6+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dansestiler
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-coral-50 dark:bg-coral-900/20">
                <p className="text-3xl font-bold text-coral-600 dark:text-coral-400">
                  5+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Instruktører
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-mint-50 dark:bg-mint-900/20">
                <p className="text-3xl font-bold text-mint-600 dark:text-mint-400">
                  10+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ukentlig Klasser
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  100+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fornøyde dansere
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
