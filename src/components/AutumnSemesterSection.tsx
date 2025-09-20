import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar
} from "lucide-react";

export default function AutumnSemesterSection() {
  return (
    <section
      className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted 
                       dark:from-brand-900/10 dark:to-surface-dark-muted 
                       relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 ">
        <div className="max-w-6xl mx-auto ">
          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-bebas text-bebas-2xl md:text-bebas-3xl lg:text-bebas-4xl text-gray-900 dark:text-white leading-tight text-center mb-12"
          >
            HØSTSEMESTERET ER I GANG!
          </motion.h2>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white/80 dark:bg-transparent backdrop-blur-sm 
                            rounded-xl py-8 px-4 border border-magenta-100/50 dark:border-magenta-700/30
                            shadow-brand-sm h-full">
            {/* Column One */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="flex-grow mb-6">
                <div className="space-y-4 min-h-[390px] flex flex-col">
                  <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-base">
                    Enten du liker de klassiske og elegante stilene som <span className="text-magenta-600 dark:text-magenta-400 font-medium">ballett og jazz</span>, den litt mer utforskende <span className="text-magenta-600 dark:text-magenta-400 font-medium">moderne/contemporary</span>, energisk <span className="text-magenta-600 dark:text-magenta-400 font-medium">show/musikal</span> eller den tøffe stilen i <span className="text-magenta-600 dark:text-magenta-400 font-medium">hiphop commercial</span> - du finner ditt miljø på Urban!
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-base">
                    Våre dyktige instruktører underviser barn og unge i alderen <span className="text-magenta-600 dark:text-magenta-400 font-medium">3-19 år</span> på kveldsskolen vår mandag til fredag hver uke.
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-base">
                  Vi bruker spond for kommunikasjon mellom instruktører og elever. Gruppekode: <span className="text-magenta-600 dark:text-magenta-400 font-medium">COGZO.</span>
                  </p>
                  
                  <div className="flex-grow"></div>
                  
                  <div className="bg-magenta-50 dark:bg-magenta-900/20 border border-magenta-200 dark:border-magenta-700 
                                rounded-xl p-4 h-[120px] flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-magenta-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-magenta-700 dark:text-magenta-300 font-montserrat text-sm leading-relaxed">
                        Semesteret avsluttes med en stor danseforestilling i <strong>Rådhusteateret</strong> der elevene får vise frem det de har jobbet med.
                      </p>
                      <p className="text-magenta-700 dark:text-magenta-300 font-montserrat text-sm font-semibold mt-2">
                        14. desember - hold av datoen!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button for column one */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="pt-4"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full font-semibold rounded-full 
                            border-magenta-300 text-magenta-600 
                            hover:bg-magenta-50 hover:text-magenta-700
                            dark:border-magenta-700 dark:text-magenta-400 
                            dark:hover:bg-magenta-900/30 dark:hover:text-magenta-300
                            px-8 py-6 text-base transition-all duration-300
                            flex items-center justify-center gap-2"
                >
                  Se timeplanen
                </Button>
              </motion.div>
            </motion.div>

            {/* Column Two */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col"
            >
              <div className="flex-grow mb-6">
                <div className="space-y-4 min-h-[390px] flex flex-col">
                  <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-base">
                    Vi har også åpne klasser for voksne i <span className="text-brand-600 dark:text-brand-400 font-medium">jazz, hiphop og ballett</span> i tillegg til{" "}
                    <span className="text-brand-600 dark:text-brand-400 font-medium">yoga og styrke/tøy.</span>
                    Disse danseklassene er åpne for drop-in for alle<span className="text-brand-600 dark:text-brand-400 font-medium">16+</span>,
                    {" "}og er perfekt for deg som har lyst til å danse for gøy, som ikke har så lang erfaring, som begynte «for sent», deg som aldri har danset før eller deg som vil friske opp gammel kunnskap. Det er ny koreografi annenhver uke.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-base">
                  <span className="text-brand-600 dark:text-brand-400 font-medium">Åpne klasser</span> betales enten per gang, ved kjøp av klippekort eller ved påmelding for et helt semester av gangen (15 uker). Finn din favorittklasse i spond og husk å trykke «deltar» før du kommer!
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-base"><span className="text-brand-600 dark:text-brand-400 font-medium">Gruppekode: COGZO.</span>{" "}Meld deg på til en gratis prøvetime ved å trykke på lenken under (eller send en e-post til kontakt@urbanstudios.no med navn, fødselsdato, telefonnummer). Du kan også registrere deg når du kommer.</p>
                </div>
              </div>

              {/* Button for column two */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="pt-4"
              >
                <a 
                  href="mailto:kontakt@urbanstudios.no?subject=Påmelding til gratis prøvetime&body=Navn%0AFødselsdato%0ATelefon%0AE-post%0A%0AØnsket klasse(r)%0APreferert tid"
                  className="w-full inline-flex items-center justify-center gap-3
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
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}