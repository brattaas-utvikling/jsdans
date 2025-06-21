import { motion } from "framer-motion";
import { 
  StarIcon,
  SparklesIcon
} from "lucide-react";
import ScrollToTop from "@/helpers/ScrollToTop";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function PricingPage() {
  const pricingOptions = [
    {
      name: "Toddler",
      price: "1 200 kr per halvår"
    },
    {
      name: "1 klasse",
      price: "1 500 kr per halvår"
    },
    {
      name: "2 klasser",
      price: "2 800 kr per halvår",
      note: "(200 kr rabatt)"
    },
    {
      name: "3 eller flere klasser",
      price: "4 000 kr per halvår",
      note: "(500 kr rabatt)"
    },
    {
      name: "Familierabatt",
      price: "50% for danser nr 2 som danser 3 eller flere klasser"
    },
    {
      name: "Kompani",
      price: "500 kr ekstra per halvår"
    },
    {
      name: "Klippekort",
      price: "10 klipp 1 500 kr"
    }
  ];

  return (
    <div className="bg-surface-light dark:bg-surface-dark">
      <ScrollToTop />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-studio-blue-50 via-white to-studio-pink-50 
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

        {/* Floating elements - subtle */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 opacity-20"
        >
          <SparklesIcon className="h-6 w-6 text-studio-pink-500" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 25, 0],
            x: [0, -15, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-1/4 opacity-15"
        >
          <StarIcon className="h-8 w-8 text-studio-blue-500" />
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
              <h1 className="text-sm font-montserrat-medium text-studio-indigo-600 dark:text-studio-indigo-400 
                            uppercase tracking-wider mb-3">
                Priser
              </h1>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-bebas text-bebas-2xl md:text-bebas-4xl
                        text-gray-900 dark:text-white mb-6"
            >
              Våre kurs
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed"
            >
              Våre priser er laget for å være tilgjengelige for alle. Jo mer du danser, jo mer sparer du!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-surface-muted dark:bg-surface-dark-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {pricingOptions.map((option, index) => (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
                                bg-white dark:bg-surface-dark rounded-xl p-6 
                                border border-gray-100 dark:border-studio-blue-700/30
                                transition-colors duration-200 group-hover:border-studio-blue-300 dark:group-hover:border-studio-blue-500">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="font-montserrat-semibold text-lg text-gray-900 dark:text-white 
                                   transition-colors duration-200 group-hover:text-studio-blue-600 dark:group-hover:text-studio-blue-400">
                        {option.name}
                      </h3>
                      {option.note && (
                        <p className="text-sm text-green-600 dark:text-green-400 font-montserrat-medium">
                          {option.note}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-montserrat text-gray-700 dark:text-gray-300 
                                  transition-colors duration-200 group-hover:text-gray-900 dark:group-hover:text-white">
                        {option.price}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
       <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="font-bebas text-bebas-xl md:text-bebas-xl text-gray-900 dark:text-white mb-4">
              Ikke sikker på hvilket kurs som passer deg?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-8 text-lg">
              Kontakt oss på kontakt@urbanstudios.no eller benytt vårt kontaktskjema, Vi er her for å hjelpe deg finne den beste løsningen for dine behov. Kontakt oss for mer informasjon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/kontakt" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                className="font-montserrat-semibold rounded-full border-studio-blue-300 text-studio-blue-600 
                          hover:bg-studio-blue-50 dark:border-studio-blue-700 dark:text-studio-blue-400 
                          dark:hover:bg-studio-blue-900/30"
              >
                Kontakt oss
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// import ScrollToTop from "@/helpers/ScrollToTop";
// import PricingSection from "../polymet/components/pricing-section";
// // import DanceClasses from "@/database/danceclasses";

// export default function PricingPage() {

//   return (
//     <>
//       <ScrollToTop />
//       <PricingSection /> 
//       <DanceClasses />
//     </>
//   );
// }