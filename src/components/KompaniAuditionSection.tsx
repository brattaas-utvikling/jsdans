import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Star, 
  Calendar, 
  MapPin,
  Trophy,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

export default function KompaniAuditionSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted 
                       dark:from-brand-900/10 dark:to-surface-dark-muted 
                       relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 order-1"
          >
            {/* Header badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 rounded-full 
                        bg-magenta-100 dark:bg-magenta-900/30 
                        border border-magenta-200 dark:border-magenta-700"
            >
              <Trophy className="h-4 w-4 text-magenta-600 dark:text-magenta-400 mr-2" />
              <span className="text-sm font-medium text-magenta-700 dark:text-magenta-300">
                Kompani Audition
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bebas text-bebas-2xl md:text-bebas-3xl text-gray-900 dark:text-white leading-tight"
            >
              Påmeldingen til kompaniaudition er åpen!
            </motion.h2>

            {/* Main content */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-lg"
            >
              <strong className="text-magenta-600 dark:text-magenta-400">Søndag 24. august</strong> holder vi vår første kompaniaudition. 
              Påmeldingsfrist <strong className="text-brand-600 dark:text-brand-400">20. august</strong>.
            </motion.p>

            {/* Additional information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm 
                        rounded-xl p-6 border border-magenta-100/50 dark:border-magenta-700/30
                        shadow-brand-sm"
            >
              <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white mb-4">
                Audition Detaljer
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-magenta-500 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">
                    <strong>Søndag 24. august</strong> - Første kompaniaudition
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-magenta-500 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">
                    <strong>Påmeldingsfrist:</strong> 20. august
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-magenta-500 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">
                    Urban Studios, Kongsvinger
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg"
                onClick={() => {
                  const subject = "Påmelding - Kompaniaudition 24. august 2025";
                  const body = `Jeg melder meg på audition til … (skriv hvilket kompani) 24. august 2025. 

Aspirantkompani kl.16:30
Kompani kl.17:15

Oppmøte 15 minutter før. 

Navn:
Fødselsdato:
Telefon:

Denne påmeldingen er bindende.`;
                  
                  const mailtoLink = `mailto:registrer@urbanstudios.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  window.location.href = mailtoLink;
                }}
                className="bg-magenta-500 hover:bg-magenta-600
                          dark:bg-white dark:hover:bg-magenta-600/80
                          text-white dark:text-magenta-600
                          dark:hover:text-white/90
                          font-semibold rounded-full px-8 py-4 text-lg
                          shadow-brand-lg hover:shadow-brand-xl transition-all duration-300
                          transform active:scale-[0.98]"
              >
                Meld deg på audition
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/nyheter/68735f06003e7a595607">
                <Button 
                  size="lg"
                  variant="outline"
                  className="font-semibold rounded-full 
                            border-magenta-300 text-magenta-600 
                            hover:bg-magenta-50 hover:text-magenta-700
                            dark:border-magenta-700 dark:text-magenta-400 
                            dark:hover:bg-magenta-900/30 dark:hover:text-magenta-300
                            px-8 py-4 text-lg transition-all duration-300"
                >
                  Les mer om kompaniet
                </Button>
              </Link>
            </motion.div>

            {/* Warning notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-700 
                        rounded-xl p-4 flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 flex-shrink-0 animate-pulse"></div>
              <p className="text-brand-700 dark:text-brand-300 font-montserrat text-sm leading-relaxed">
                <strong>Påmeldingsfrist:</strong> 20. august kl. 23:59. 
                Meld deg på i tide for å sikre din plass til auditionen!
              </p>
            </motion.div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative order-2"
          >
            {/* Main image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-brand-xl group">
              {/* Placeholder for Kompani image */}
              <div className="aspect-square bg-gradient-to-br from-magenta-400 to-brand-500 flex items-center justify-center">
                <img
                  src="https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/687a728d0028496582eb/view?project=6853fb68001e82047908&mode=admin"
                  alt="Urban Studios kompani - dansere i aksjon"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
               
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm 
                          rounded-full px-4 py-2 shadow-brand flex items-center gap-2"
              >
                <Star className="h-4 w-4 text-magenta-500" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Kompani 2025
                </span>
              </motion.div>

              {/* Achievement badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute bottom-4 right-4 space-y-2"
              >
                <div className="bg-magenta-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
                  Første audition
                </div>
                <div className="bg-brand-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
                  24. august
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}