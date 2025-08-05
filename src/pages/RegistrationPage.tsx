import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  StarIcon,
  HeartIcon,
  SparklesIcon,
  SunIcon,
  ArrowRight,
} from "lucide-react";
import { FaInstagram } from 'react-icons/fa'
import ScrollToTop from "@/helpers/ScrollToTop";

export default function RegistrationPage() {
  // Animation variants for better performance
  const floatingVariants = {
    animate: {
      y: [0, -30, 0],
      x: [0, 15, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  const backgroundVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.2, 0.1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
    className="min-h-screen bg-gradient-to-br from-brand-50 to-coral-50 
    dark:from-brand-900/20 dark:to-coral-900/20  
    pt-24 pb-16 relative overflow-hidden"
    aria-label="Påmelding hero seksjon"
    >
    <ScrollToTop />
      {/* Optimized animated background elements - Sunset theme */}
      <motion.div 
        variants={backgroundVariants}
        animate="animate"
        style={{ willChange: 'transform' }}
        className="absolute top-0 right-0 w-96 h-96 bg-coral-400/10 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: 'transform' }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl"
      />

      {/* Additional sunset glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ willChange: 'transform' }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-300/10 rounded-full blur-3xl"
      />

      {/* Sunset-themed floating elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ willChange: 'transform' }}
        className="absolute top-1/4 left-1/4 opacity-30 hidden md:block"
      >
        <SparklesIcon className="h-8 w-8 text-brand-500" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 25, 0],
          x: [0, -20, 0],
          rotate: [0, -180, -360]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ willChange: 'transform' }}
        className="absolute top-1/3 right-1/4 opacity-25 hidden lg:block"
      >
        <SunIcon className="h-6 w-6 text-amber-500" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -40, 0],
          x: [0, 25, 0],
          rotate: [0, 360, 720]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{ willChange: 'transform' }}
        className="absolute top-1/2 left-1/5 opacity-25 hidden md:block"
      >
        <StarIcon className="h-7 w-7 text-coral-500" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 35, 0],
          x: [0, -15, 0],
          rotate: [0, -360, -720]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{ willChange: 'transform' }}
        className="absolute top-2/3 right-1/3 opacity-30 hidden lg:block"
      >
        <StarIcon className="h-5 w-5 text-brand-600" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -35, 0],
          x: [0, -25, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{ willChange: 'transform' }}
        className="absolute top-1/3 left-1/6 opacity-25 hidden md:block"
      >
        <HeartIcon className="h-6 w-6 text-amber-600" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 30, 0],
          x: [0, 15, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ willChange: 'transform' }}
        className="absolute top-3/4 left-2/3 opacity-30 hidden lg:block"
      >
        <HeartIcon className="h-8 w-8 text-coral-500" />
      </motion.div>

      {/* Additional warm floating elements */}
      <motion.div
        animate={{ 
          y: [0, -25, 0],
          x: [0, 20, 0],
          rotate: [0, 90, 180]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{ willChange: 'transform' }}
        className="absolute top-1/5 right-1/5 opacity-20 hidden lg:block"
      >
        <SparklesIcon className="h-5 w-5 text-amber-500" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        style={{ willChange: 'transform' }}
        className="absolute bottom-1/4 right-1/6 opacity-25 hidden md:block"
      >
        <SunIcon className="h-7 w-7 text-brand-500" />
      </motion.div>

      {/* Subtle magenta accent - only 10% usage */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        style={{ willChange: 'transform' }}
        className="absolute top-3/5 left-1/3 opacity-15 hidden lg:block"
      >
        <StarIcon className="h-4 w-4 text-magenta-500" />
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-xl font-medium text-brand-600 dark:text-brand-400 
                          uppercase tracking-wider mb-3">
              Påmelding
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-bebas font-semibold text-bebas-3xl md:text-bebas-4xl lg:text-bebas-5xl mb-6
                      text-transparent bg-clip-text bg-sunset-gradient py-2"
          >
            Åpner snart!
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed max-w-2xl mx-auto mb-6"
          >
            Bli en del av Urban Studios-familien allerede nå! Følg reisen vår på Instagram og gjennom våre nyheter – vi deler alt fra byggeprosessen til de første kursene.
          </motion.p>

          {/* Betingelser Link - Properly styled and animated */}
{/*           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-8"
          >
            <Link 
              to="/betingelser"
              className="inline-flex items-center underline text-brand-600 dark:text-brand-400 
                        hover:text-brand-700 dark:hover:text-brand-300 
                        transition-all duration-200 font-montserrat font-medium
                        underline-offset-4 decoration-2
                        focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              Les våre betingelser for kursdeltagelse
            </Link>
          </motion.div> */}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Email Registration Button - Primary action */}
            {/* <a 
              href="mailto:registrer@urbanstudios.no?subject=Påmelding til Urban Studios&body=Hei!%0AJeg ønsker å melde meg på dansetimer ved Urban Studios.%0A%0ANavn:%0AFødselsdato:%0ATelefon: (til foresatte hvis elev er under 16 år)%0AE-post: (til foresatte hvis elev er under 16 år)%0A%0AJeg melder meg på dette/disse kursene: (Skriv navnene slik det står i timeplanen, meld deg på det nivået du mener du tilhører)%0A%0AMvh%0A[foresattes/elevens navn]%0A%0AViktig info%0ADette er en bindene påmelding. Det gjøres oppmerksom på at instruktøren har mulighet til å flytte eleven til et annet nivå hvis det ses som nødvendig. Klassene holdes med forbehold om nok påmeldte. Ved avlysning av hele kurs, refunderes det resterende av kursavgiften regnet fra siste time."
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3
                        bg-brand-500 hover:bg-brand-600
                        dark:bg-white dark:hover:bg-brand-700
                        text-white dark:text-brand-700
                        dark:hover:text-white/90
                        px-8 py-4 rounded-full font-semibold text-base
                        shadow-brand-lg hover:shadow-brand-xl transition-all duration-200
                        transform active:scale-[0.98]
                        focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-2
                        no-underline"
              aria-label="Send e-post for påmelding til Urban Studios"
            >
              <MailIcon className="h-5 w-5" />
              Meld deg på her!
            </a> */}

            {/* Instagram Follow Button - Secondary action */}
            <a 
              href="https://instagram.com/urbanstudios.dans" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              aria-label="Følg Urban Studios på Instagram"
            >
              <Button 
                className="w-full border-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-600
                          dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-400
                          font-semibold rounded-full bg-transparent border-2 px-6 py-3
                          transition-all duration-200 shadow-sm hover:shadow-brand-sm"
              >
                <FaInstagram className="mr-2 h-4 w-4" />
                Følg oss på Instagram
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>

          {/* Additional info text */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-6"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 font-montserrat">
              E-posten åpnes automatisk med påmeldingsskjema
            </p>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}