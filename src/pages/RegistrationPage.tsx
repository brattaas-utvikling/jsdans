import { motion } from "framer-motion";
import { 
  StarIcon,
  HeartIcon,
  SparklesIcon
} from "lucide-react";
import ScrollToTop from "@/helpers/ScrollToTop";

export default function RegistrationPage() {

  return (
    <div className="bg-surface-light dark:bg-surface-dark">
      <ScrollToTop />

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-studio-blue-50 via-white to-studio-pink-50 
                        dark:from-studio-blue-900/20 dark:via-surface-dark dark:to-studio-pink-900/20 
                        pt-24 pb-16 relative overflow-hidden">
        
        {/* Animated background elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-studio-pink-400/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-studio-blue-400/10 rounded-full blur-3xl"
        />

        {/* Floating Sparkles */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 opacity-30"
        >
          <SparklesIcon className="h-8 w-8 text-studio-pink-500" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 25, 0],
            x: [0, -20, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-1/4 opacity-25"
        >
          <SparklesIcon className="h-6 w-6 text-studio-blue-500" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 90, 180]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute bottom-1/3 left-1/3 opacity-20"
        >
          <SparklesIcon className="h-10 w-10 text-studio-purple-500" />
        </motion.div>

        {/* Floating Stars */}
        <motion.div
          animate={{ 
            y: [0, -40, 0],
            x: [0, 25, 0],
            rotate: [0, 360, 720]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-1/2 left-1/5 opacity-25"
        >
          <StarIcon className="h-7 w-7 text-studio-yellow-500" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 35, 0],
            x: [0, -15, 0],
            rotate: [0, -360, -720]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-2/3 right-1/3 opacity-30"
        >
          <StarIcon className="h-5 w-5 text-studio-pink-500" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -25, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4.5 }}
          className="absolute bottom-1/4 right-1/5 opacity-20"
        >
          <StarIcon className="h-9 w-9 text-studio-blue-500" />
        </motion.div>

        {/* Floating Hearts */}
        <motion.div
          animate={{ 
            y: [0, -35, 0],
            x: [0, -25, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-1/3 left-1/6 opacity-25"
        >
          <HeartIcon className="h-6 w-6 text-studio-red-500" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 30, 0],
            x: [0, 15, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-3/4 left-2/3 opacity-30"
        >
          <HeartIcon className="h-8 w-8 text-studio-pink-500" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
          className="absolute bottom-1/2 right-1/6 opacity-20"
        >
          <HeartIcon className="h-7 w-7 text-studio-purple-500" />
        </motion.div>

        {/* Additional smaller floating elements */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 360]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-1/5 right-1/5 opacity-15"
        >
          <SparklesIcon className="h-4 w-4 text-studio-indigo-500" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 20, 0],
            x: [0, -5, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute top-1/4 right-1/6 opacity-20"
        >
          <StarIcon className="h-4 w-4 text-studio-teal-500" />
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
              <h1 className="text-sm font-montserrat-medium text-indigo-600 dark:text-indigo-400 
                            uppercase tracking-wider mb-3">
                Påmelding
              </h1>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-bebas text-bebas-4xl md:text-bebas-5xl lg:text-bebas-6xl 
                        text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 mb-6 py-2"
            >
              Åpner høsten 2025
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed"
            >
              Vi forbereder en helt ny danseopplevelse for deg. Registrer deg for å få beskjed når påmeldingen åpner!
            </motion.p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}