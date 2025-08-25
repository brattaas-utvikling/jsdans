import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Heart,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function OppstartSection() {
  return (
    <section
      className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted 
                       dark:from-brand-900/10 dark:to-surface-dark-muted 
                       relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center"
          >

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-bebas text-bebas-2xl md:text-bebas-3xl lg:text-bebas-4xl text-gray-900 dark:text-white leading-tight"
            >
              OPPSTART MANDAG 25. AUGUST!
            </motion.h2>

            {/* Main content */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-lg"
              >
                <strong className="text-magenta-600 dark:text-magenta-400">
                  Kom på gratis prøvetime i uke 35 og 36!
                </strong><br />
                Du kan teste så mange klasser du vil, og melde deg på når du har bestemt deg.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed"
              >I disse ukene kan du teste ut dine favorittklasser uten å forplikte deg! 
                Prøv alt fra Hip Hop til Moderne dans, og opplev energien i vårt splitter nye studio.
              </motion.p>
            </div>

            {/* Information details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white/80 dark:bg-transparent backdrop-blur-sm 
                        rounded-xl p-6 border border-magenta-100/50 dark:border-magenta-700/30
                        shadow-brand-sm grid grid-cols-1 md:grid-cols-2 items-center"
            >
              <img src="/public/logo.svg" alt="Urban Studios logo" className="h-60 w-auto mx-auto dark:invert" />

              <div className="space-y-3 mx-auto">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-magenta-500 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">
                    <strong>Mandag 25. august</strong> - Første kursdag
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-magenta-500 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">
                    <strong>Gratis prøvetimer:</strong> Uke 35 og 36
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-magenta-500 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">
                    Urban Studios, Kongsvinger
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-magenta-500 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">
                    Alle aldre og nivåer velkommen
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
              <Link to="/timeplan">
                <Button
                  size="lg"
                  className="bg-magenta-500 hover:bg-magenta-600
                            dark:bg-white dark:hover:bg-magenta-600/80
                            text-white dark:text-magenta-600
                            dark:hover:text-white/90
                            font-semibold rounded-full px-8 py-4 text-lg
                            shadow-brand-lg hover:shadow-brand-xl transition-all duration-300
                            transform active:scale-[0.98]"
                >
                  Meld deg på her
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/timeplan">
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
                  Se timeplanen
                </Button>
              </Link>
            </motion.div>

            {/* Highlight notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="bg-magenta-50 dark:bg-magenta-900/20 border border-magenta-200 dark:border-magenta-700 
                        rounded-xl p-4 flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-magenta-500 mt-2 flex-shrink-0 animate-pulse"></div>
              <p className="text-magenta-700 dark:text-magenta-300 font-montserrat text-sm leading-relaxed">
                Test alle klasser du vil i uke 35 og 36. 
                Ingen forpliktelser - meld deg på først når du har funnet dine favoritter!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}