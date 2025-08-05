import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  ArrowLeft,
  Search,
  Music,
  StarIcon,
  HeartIcon,
  SparklesIcon,
} from "lucide-react";
import ScrollToTop from "@/helpers/ScrollToTop";

export default function NotFoundPage() {
  // Animation variants for floating elements
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const backgroundVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.2, 0.1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className="min-h-screen bg-gradient-to-br from-brand-50 to-coral-50 
                dark:from-brand-900/20 dark:to-coral-900/20  
                pt-24 pb-16 relative overflow-hidden flex items-center"
      aria-label="404 - Side ikke funnet"
    >
      <ScrollToTop />

      {/* Animated background elements - Brand themed */}
      <motion.div
        variants={backgroundVariants}
        animate="animate"
        style={{ willChange: "transform" }}
        className="absolute top-0 right-0 w-96 h-96 bg-coral-400/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl"
      />

      {/* Additional warm glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{ willChange: "transform" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-300/10 rounded-full blur-3xl"
      />

      {/* Floating dance-themed elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ willChange: "transform" }}
        className="absolute top-1/4 left-1/4 opacity-20 hidden md:block"
      >
        <Music className="h-8 w-8 text-brand-500" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{ willChange: "transform" }}
        className="absolute top-1/3 right-1/4 opacity-25 hidden lg:block"
      >
        <SparklesIcon className="h-6 w-6 text-coral-500" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 25, 0],
          rotate: [0, 360, 720],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        style={{ willChange: "transform" }}
        className="absolute top-1/2 left-1/5 opacity-25 hidden md:block"
      >
        <StarIcon className="h-7 w-7 text-brand-600" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 35, 0],
          x: [0, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        style={{ willChange: "transform" }}
        className="absolute top-2/3 right-1/3 opacity-30 hidden lg:block"
      >
        <HeartIcon className="h-6 w-6 text-coral-500" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        style={{ willChange: "transform" }}
        className="absolute top-1/5 right-1/5 opacity-20 hidden lg:block"
      >
        <Music className="h-5 w-5 text-amber-500" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        style={{ willChange: "transform" }}
        className="absolute bottom-1/4 right-1/6 opacity-25 hidden md:block"
      >
        <StarIcon className="h-7 w-7 text-brand-500" />
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* 404 Number - Large and prominent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1
              className="font-bebas text-[120px] md:text-[180px] lg:text-[220px] leading-none
                          text-transparent bg-clip-text bg-brand-gradient py-4
                          select-none pointer-events-none"
            >
              404
            </h1>
          </motion.div>

          {/* Error message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="font-bebas text-bebas-xl md:text-bebas-2xl mb-4 text-gray-900 dark:text-white">
              Oops! Siden ble ikke funnet
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-montserrat 
                      leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Det ser ut som dansegulvet du leter etter ikke eksisterer. Ingen
            fare – la oss hjelpe deg tilbake til rytmen!
          </motion.p>

          {/* Helpful suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm 
                      border border-brand-200/50 dark:border-brand-700/30 
                      rounded-2xl p-6 md:p-8 mb-8"
          >
            <h3 className="font-bebas text-bebas-base mb-4 text-gray-900 dark:text-white">
              Prøv dette i stedet:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-full 
                              flex items-center justify-center flex-shrink-0 mt-1"
                >
                  <Home className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h4 className="font-montserrat-semibold text-gray-900 dark:text-white mb-1">
                    Gå til forsiden
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-montserrat">
                    Utforsk våre kurs og tjenester
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-full 
                              flex items-center justify-center flex-shrink-0 mt-1"
                >
                  <Music className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h4 className="font-montserrat-semibold text-gray-900 dark:text-white mb-1">
                    Se våre kurs
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-montserrat">
                    Finn det perfekte kurset for deg
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-full 
                              flex items-center justify-center flex-shrink-0 mt-1"
                >
                  <Search className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h4 className="font-montserrat-semibold text-gray-900 dark:text-white mb-1">
                    Kontakt oss
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-montserrat">
                    Vi hjelper deg gjerne videre
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary action - Home */}
            <Link to="/" className="w-full sm:w-auto">
              <Button
                className="w-full bg-brand-600 hover:bg-brand-700
                          dark:bg-white dark:hover:bg-brand-600/80
                          text-white dark:text-brand-600
                          dark:hover:text-white/90
                          font-montserrat-semibold rounded-full px-8 py-4 text-base
                          shadow-brand-lg hover:shadow-brand-xl transition-all duration-200
                          transform active:scale-[0.98]"
              >
                <Home className="mr-2 h-5 w-5" />
                Tilbake til forsiden
              </Button>
            </Link>

            {/* Secondary actions */}
            <Link to="/kurs" className="w-full sm:w-auto">
              <Button
                className="w-full border-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-600
                          dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-400
                          font-montserrat-medium rounded-full bg-transparent border-2 px-6 py-3
                          transition-all duration-200"
              >
                Se kurs
              </Button>
            </Link>

            <Link to="/kontakt" className="w-full sm:w-auto">
              <Button
                className="w-full border-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-600
                          dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-400
                          font-montserrat-medium rounded-full bg-transparent border-2 px-6 py-3
                          transition-all duration-200"
              >
                Kontakt oss
              </Button>
            </Link>
          </motion.div>

          {/* Go back button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8"
          >
            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300
                        font-montserrat-medium transition-all duration-200
                        hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-full px-6 py-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Gå tilbake
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
