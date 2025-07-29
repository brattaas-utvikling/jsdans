import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Star, 
  Calendar, 
  MapPin,
  Trophy,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SelmaWorkshop() {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted 
                       dark:from-brand-900/10 dark:to-surface-dark-muted 
                       relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left column - Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Main image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-brand-xl group">
              {/* Placeholder for Selma's image */}
              <div className="aspect-[4/5] bg-gradient-to-br from-brand-400 to-magenta-500 flex items-center justify-center">
                <img
                  src="https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/687232af002cd7885a16/view?project=6853fb68001e82047908&mode=admin"
                  alt="Selma - profesjonell danser og Jump Crew medlem"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
               
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm 
                          rounded-full px-4 py-2 shadow-brand flex items-center gap-2"
              >
                <Trophy className="h-4 w-4 text-brand-500" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Jump Crew
                </span>
              </motion.div>

              {/* Achievement badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-4 left-4 space-y-2"
              >
                <div className="bg-brand-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
                  Norske Talenter vinner
                </div>
                <div className="bg-magenta-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
                  Britains Got Talent
                </div>
                <div className="bg-coral-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
                  VG-lista danser
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 order-1 lg:order-2"
          >
            {/* Header badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center px-4 py-2 rounded-full 
                        bg-brand-100 dark:bg-brand-900/30 
                        border border-brand-200 dark:border-brand-700"
            >
              <Star className="h-4 w-4 text-brand-600 dark:text-brand-400 mr-2" />
              <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                Spesiell Workshop
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-bebas text-bebas-2xl md:text-bebas-3xl text-gray-900 dark:text-white leading-tight"
            >
              Selma kommer hjem til Kongsvinger!
            </motion.h2>

            {/* Main content - Split into paragraphs for better animation */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed"
              >
                Selma Moen Embretsen danset på Jump frem til hun ble 15 år - da flyttet hun til Oslo for å satse! 
                Hun har fullført tre år på danselinjen på Otto Treider vgs, og jobber idag som 
                proff utøvende danser. Hun er med i Jump Crew, som blant annet har vunnet Norske Talenter, 
                deltatt i Britains Got Talent og danset på VG-lista!
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed"
              >
                Selma kommer for å ha workshop når vi åpner Urban Studios <strong className="text-brand-600 dark:text-brand-400">lørdag 23. august</strong>, 
                da blir det hiphop commercial VG-lista style! Workshopen inneholder danseglede og energi, 
                vi skal jobbe med grunnteknikk i street og lære en superkul koreografi som kan vises frem 
                på åpningen til studioet lørdag kveld.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed"
              >
                Selma gleder seg masse til å jobbe dynamikk, groove og showteknikk med oss på Urban. 
                Påmeldingen er nå åpen, vær rask da dette er en populær workshop som fylles opp raskt!
              </motion.p>
            </div>

            {/* Workshop details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm 
                        rounded-xl p-6 border border-brand-100/50 dark:border-brand-700/30
                        shadow-brand-sm"
            >
              <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white mb-4">
                Workshop Detaljer
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-brand-500 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">
                    <strong>Lørdag 23. august</strong> - Åpningsdag
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-brand-500 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">
                    Urban Studios, Kongsvinger
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-brand-500 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">
                    Hip Hop Commercial VG-lista Style
                  </span>
                </div>
              </div>

              {/* Workshop tider */}
              <div className="mt-6 pt-4 border-t border-brand-200 dark:border-brand-700/30">
                <h4 className="font-bebas text-bebas-sm text-gray-900 dark:text-white mb-3">
                  Klokkeslett & Priser
                </h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 px-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
                    <span className="font-montserrat text-sm text-gray-700 dark:text-gray-300">
                      <strong>Kl. 13:00-14:00</strong> • 1.-4. trinn
                    </span>
                    <span className="font-montserrat font-semibold text-brand-600 dark:text-brand-400">
                      150 kr
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 px-3 bg-magenta-50 dark:bg-magenta-900/20 rounded-lg">
                    <span className="font-montserrat text-sm text-gray-700 dark:text-gray-300">
                      <strong>Kl. 14:00-16:00</strong> • 5.-8. trinn
                    </span>
                    <span className="font-montserrat font-semibold text-magenta-600 dark:text-magenta-400">
                      300 kr
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 px-3 bg-coral-50 dark:bg-coral-900/20 rounded-lg">
                    <span className="font-montserrat text-sm text-gray-700 dark:text-gray-300">
                      <strong>Kl. 16:15-18:15</strong> • 8. trinn og oppover
                    </span>
                    <span className="font-montserrat font-semibold text-coral-600 dark:text-coral-400">
                      300 kr
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg"
                onClick={() => {
                  const subject = "Påmelding - Workshop med Selma 23. august 2025";
                  const body = `Jeg melder meg på workshop med Selma 23. august 2025.

Fullt navn:
Fødselsdato:

Denne påmeldingen er bindende.

Til info:
Du vil få en mail med betalingsinfo som må betales innen fristen, følg med i spam-innboksen.`;
                  
                  const mailtoLink = `mailto:registrer@urbanstudios.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  window.location.href = mailtoLink;
                }}
                className="bg-brand-500 hover:bg-brand-600
                          dark:bg-white dark:hover:bg-brand-600/80
                          text-white dark:text-brand-600
                          dark:hover:text-white/90
                          font-semibold rounded-full px-8 py-4 text-lg
                          shadow-brand-lg hover:shadow-brand-xl transition-all duration-300
                          transform active:scale-[0.98]"
              >
                Meld deg på nå
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Link to="/nyheter/6872899c00367b1047ee">
                <Button 
                  size="lg"
                  variant="outline"
                  className="font-semibold rounded-full 
                            border-brand-300 text-brand-600 
                            hover:bg-brand-50 hover:text-brand-700
                            dark:border-brand-700 dark:text-brand-400 
                            dark:hover:bg-brand-900/30 dark:hover:text-brand-300
                            px-8 py-4 text-lg transition-all duration-300"
                >
                  Les mer om åpningen
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}