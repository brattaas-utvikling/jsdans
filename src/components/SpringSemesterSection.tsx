import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, CalendarDays, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";


export default function SpringSemesterSection() {
  return (
    <section
      className="
        py-16
        bg-gradient-to-br from-brand-50/80 to-surface-muted
        dark:from-brand-900/10 dark:to-surface-dark-muted
        relative overflow-hidden
      "
    >
      {/* Decorative elements (som i wizard) */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              font-bebas text-bebas-2xl md:text-bebas-3xl lg:text-bebas-4xl
              text-gray-900 dark:text-white
              leading-tight text-center mb-8 uppercase
            "
          >
            TIMEPLANEN FOR VÅREN 2026 ER KLAR!
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KORT 1 */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="
                rounded-2xl
                bg-white dark:bg-surface-dark
                shadow-brand-lg
                border border-brand-100/50 dark:border-brand-700/30
                overflow-hidden relative
                p-6 sm:p-7
              "
            >
              {/* Subtle overlay som i wizard */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 to-transparent dark:from-brand-900/10 dark:to-transparent pointer-events-none" />
              <div className="relative z-10">
              <h3 className="text-gray-900 dark:text-white font-montserrat text-sm sm:text-base font-semibold">
                    Forestilling i Rådhusteateret 3. mai 2026
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-montserrat">
  (med forbehold om endring)
</p>
                <p className="mt-4 text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed text-base">
                  Urban tilbyr kveldsskole for{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">3–19 år</span>{" "}
                  (mandag–fredag) og åpne klasser for voksne{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">16+</span>.
                </p>

                <p className="mt-4 text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed text-base">
                  Stiler:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ballett, jazz, hiphop, moderne/contemporary, show/musikal
                  </span>{" "}
                  + mer.
                </p>

                <div className="mt-6 rounded-2xl border border-brand-100/60 dark:border-brand-700/30 bg-brand-50/50 dark:bg-brand-900/15 p-4">
                  <div className="flex items-start gap-3">
                    <div className="hidden sm:inline-flex items-center justify-center rounded-xl border border-brand-100/70 dark:border-brand-700/30 bg-white dark:bg-surface-dark p-2">
                      <Calendar className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-900 dark:text-white font-montserrat font-semibold">
                        Semesterstart: uke 2 (fra 5. januar)
                      </p>
                      <p className="mt-1 text-gray-700 dark:text-gray-300 font-montserrat text-sm leading-relaxed">
                        Vi kjører <span className="font-semibold">2 gratis prøveuker</span> (som i høst).
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed text-base">
                  Nykommeren på timeplanen er en klasse i{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">Hiphop Girly Ungdom</span>{" "}
                  med åpent nivå fra <span className="font-semibold text-gray-900 dark:text-white">12 år</span>, og{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">Hiphop 3 Girly</span>{" "}
                  for de eldste, anbefalt alder fra{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">15 år</span> og flere års
                  danseerfaring, da denne klassen vil ha{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">høy vanskelighetsgrad</span>.
                </p>

                <div className="mt-6 space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed text-base">
                    Vi har også åpne klasser for voksne i{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">jazz og ballett</span>{" "}
                    i tillegg til{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">yoga og styrke/tøy.</span>{" "}
                    Disse klassene er åpne for drop-in for alle{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">16+</span>.
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed text-base">
                    <span className="font-semibold text-gray-900 dark:text-white">Åpne klasser</span> betales enten
                    per gang, ved kjøp av klippekort eller ved påmelding for et helt semester (15 uker). Finn din
                    favorittklasse i Spond og husk å trykke «deltar» før du kommer!
                  </p>
                </div>
              </div>
            </motion.aside>

            {/* KORT 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="
                rounded-2xl
                bg-white dark:bg-surface-dark
                shadow-brand-lg
                border border-brand-100/50 dark:border-brand-700/30
                overflow-hidden relative
                p-6 sm:p-8
                flex flex-col min-w-0
              "
            >
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 to-transparent dark:from-brand-900/10 dark:to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col min-w-0">


                <div className="overflow-hidden rounded-2xl border border-brand-100/60 dark:border-brand-700/30 bg-white dark:bg-surface-dark">
                  <div className="relative aspect-[16/9]">
                    <img
                      src="https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/694a40c5002317f44bf0/view?project=6853fb68001e82047908&mode=admin"
                      alt="Dansere fra forestillingen i Rådhusteateret"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>

                  <div className="px-4 py-3">
                    <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-montserrat">
                      fra forestillingen 14.12.25
                    </p>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-magenta-200/70 dark:border-magenta-700/30 bg-magenta-50/70 dark:bg-magenta-900/15 p-4">
                  <p className="text-gray-700 dark:text-gray-300 font-montserrat text-sm">
                    Spond gruppekode:
                  </p>
                  <p className="mt-1 font-montserrat text-lg font-semibold text-magenta-700 dark:text-magenta-300 tracking-wide">
                    COGZO
                  </p>
                  <p className="mt-2 font-montserrat text-sm font-normal text-gray-700 dark:text-gray-300 ">Eleven legges til i sine klasser etter påmelding og betaling</p>
                </div>

                {/* CTA: alltid 3 på lg */}
                <div className="mt-6 sm:mt-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    <Link to="/timeplan" className="w-full">
                      <Button
                        size="lg"
                        variant="outline"
                        className="
                          w-full rounded-full text-base font-semibold 
                          border-magenta-300 text-gray-900 dark:text-white
                          hover:bg-magenta-50 dark:hover:bg-magenta-900/20
                          min-w-0
                        "
                      >
                        TIMEPLAN{" "}
                        <CalendarDays className="ml-2 h-4 w-4 xl:hidden text-magenta-500 dark:text-magenta-400" />
                      </Button>
                    </Link>

                    <Link to="/registration" className="w-full">
                      <Button
                        size="lg"
                        className="
                          font-semibold rounded-full w-full text-base
                          bg-brand-500 hover:bg-brand-600
                          dark:bg-white dark:hover:bg-gray-50
                          text-white dark:text-brand-600
                          dark:hover:text-brand-700
                          border-brand-300 shadow hover:shadow-md transition-all duration-200
                        "
                      >
                        PÅMELDING <ArrowRight className="ml-2 h-4 w-4 xl:hidden" />
                      </Button>
                    </Link>

                    <a
                      href="mailto:kontakt@urbanstudios.no?subject=Påmelding til gratis prøvetime (Vår 2026)&body=Navn%0AFødselsdato%0ATelefon%0AE-post%0A%0AØnsket klasse(r)%0APreferert tid"
                      className="
                        w-full min-w-0
                        inline-flex items-center justify-center gap-2
                        rounded-full px-4 py-2 text-base font-semibold
                        bg-white dark:bg-surface-dark
                        text-gray-900 dark:text-white
                        border border-brand-100/60 dark:border-brand-700/30
                        hover:bg-brand-600/10 dark:hover:bg-brand-900/20
                        shadow-sm hover:shadow-md
                        transition-all duration-200 transform active:scale-[0.98]
                        focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-2
                        no-underline
                      "
                      aria-label="Send e-post for påmelding til gratis prøvetime"
                    >
                      PRØVETIME <Sparkles className="h-4 w-4 xl:hidden text-brand-500 dark:text-brand-400" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
