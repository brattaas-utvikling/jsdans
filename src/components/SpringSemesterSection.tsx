import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SpringSemesterSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted dark:from-brand-900/10 dark:to-surface-dark-muted relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-bebas text-bebas-2xl md:text-bebas-3xl lg:text-bebas-4xl text-gray-900 dark:text-white leading-tight text-center mb-10 uppercase"
          >
            TIMEPLANEN FOR VÅREN 2026 ER KLAR!
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-2xl border border-brand-200/60 dark:border-brand-700/40 bg-white/75 dark:bg-white/5 backdrop-blur p-6 sm:p-8 shadow-brand-sm"
            >
              <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-base">
                Urban tilbyr kveldsskole for{" "}
                <span className="text-magenta-600 dark:text-magenta-400 font-medium">3–19 år</span>{" "}
                (mandag–fredag) og åpne klasser for voksne{" "}
                <span className="text-brand-600 dark:text-brand-400 font-medium">16+</span>.
              </p>

              <p className="mt-4 text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-base">
                Stiler:{" "}
                <span className="text-magenta-600 dark:text-magenta-400 font-medium">
                  ballett, jazz, hiphop commercial, moderne/contemporary, show/musikal
                </span>{" "}
                + mer.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link to="/timeplan" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto font-semibold rounded-full 
                              border-magenta-300 text-magenta-600 
                              hover:bg-magenta-50 hover:text-magenta-700
                              dark:border-magenta-700 dark:text-magenta-400 
                              dark:hover:bg-magenta-900/30 dark:hover:text-magenta-300
                              px-8 py-6 text-base transition-all duration-300
                              flex items-center justify-center gap-2"
                  >
                    Se timeplanen 
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <a
                  href="mailto:kontakt@urbanstudios.no?subject=Påmelding til gratis prøvetime (Vår 2026)&body=Navn%0AFødselsdato%0ATelefon%0AE-post%0A%0AØnsket klasse(r)%0APreferert tid"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3
                            bg-brand-500 hover:bg-brand-600
                            dark:bg-white dark:hover:bg-brand-600/80
                            text-white dark:text-brand-600
                            dark:hover:text-white/90
                            px-8 py-4 rounded-full font-semibold text-base
                            shadow-brand-lg hover:shadow-brand-xl transition-all duration-200
                            transform active:scale-[0.98]
                            focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-2
                            no-underline"
                  aria-label="Send e-post for påmelding til gratis prøvetime"
                >
                  Gratis prøvetime
                </a>
              </div>
            </motion.div>

            {/* Side card */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="rounded-2xl border border-brand-200/60 dark:border-brand-700/40 bg-white/75 dark:bg-white/5 backdrop-blur p-6 sm:p-7 shadow-brand-sm"
            >
              <h3 className="font-montserrat font-semibold text-gray-900 dark:text-white">
                Spond (viktig!)
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 font-montserrat text-sm leading-relaxed">
                Vi bruker spond for kommunikasjon mellom instruktører og elever.
              </p>

              <div className="mt-4 rounded-2xl border border-magenta-200 dark:border-magenta-700 bg-magenta-50/80 dark:bg-magenta-900/20 p-4">
                <p className="text-magenta-700 dark:text-magenta-300 font-montserrat text-sm">
                  Gruppekode:
                </p>
                <p className="mt-1 font-montserrat text-lg font-semibold text-magenta-600 dark:text-magenta-400 tracking-wide">
                  COGZO
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}