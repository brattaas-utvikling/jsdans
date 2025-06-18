import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING_PLANS } from "@/data/dance-studio-data";
import PricingCard from "@/polymet/components/pricing-card";
import ScrollToTop from "@/helpers/ScrollToTop";

export default function PricingSection() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <ScrollToTop />

      {/* Hero Section - Samme stil som andre sider */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-pink-50 
                        dark:from-blue-900/20 dark:via-slate-900 dark:to-pink-900/20 
                        pt-24 pb-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-sm font-montserrat-medium text-indigo-600 dark:text-indigo-400 
                          uppercase tracking-wider mb-3">
              Våre priser
            </h1>
            <h2 className="font-bebas text-bebas-4xl md:text-bebas-5xl lg:text-bebas-6xl 
                          text-gray-900 dark:text-white mb-6">
              Fleksible priser for alle behov
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
              Velg en prismodell som passer deg best. Vi har noe for enhver danser, 
              uavhengig av erfaring eller budsjett.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          {/* Decorative elements */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-400/10 rounded-full blur-3xl" />

            {/* Pricing cards grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10"
            >
              {PRICING_PLANS.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <PricingCard
                    name={plan.name}
                    price={plan.price}
                    duration={plan.duration}
                    features={plan.features}
                    popular={plan.popular}
                    color={plan.color}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="font-bebas text-bebas-xl md:text-bebas-2xl text-gray-900 dark:text-white mb-4">
              Trenger du en mer tilpasset prismodell?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-8 text-lg">
              Vi tilbyr egne spesialmodeller for både yngre og eldre dansere. 
              Ta kontakt med oss for et personlig tilpasset tilbud som passer dine behov!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/kontakt" className="w-full sm:w-auto">
                <Button 
                  className="font-montserrat-semibold rounded-full 
                            bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 
                            hover:from-blue-700 hover:via-indigo-700 hover:to-pink-700 
                            text-white border-0 shadow transition-all duration-200 
                            hover:shadow-lg"
                >
                  Kontakt oss
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/kurs" className="w-full sm:w-auto">
                <Button 
                  variant="outline"
                  className="font-montserrat-semibold rounded-full border-blue-300 text-blue-600 
                            hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 
                            dark:hover:bg-blue-900/30"
                >
                  Se våre kurs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}