import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info, X } from "lucide-react";
import ScrollToTop from "@/helpers/ScrollToTop";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";
import { PricingPackage } from "@/types";

// Modal komponent for beskrivelse
function PricingModal({ 
  pkg, 
  isOpen, 
  onClose 
}: { 
  pkg: PricingPackage | null; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const formatPrice = (priceInOre?: number): string => {
    if (!priceInOre) return "";
    return `${(priceInOre / 100).toLocaleString("no-NO")} kr`;
  };

  // Null-sjekk først
  if (!isOpen || !pkg) return null;

  const finalPrice = pkg.price && pkg.discount_amount 
    ? pkg.price - pkg.discount_amount 
    : pkg.price;

  const savings = pkg.discount_amount ? formatPrice(pkg.discount_amount) : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-surface-dark rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-700"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          {/* Modal content */}
          <div className="space-y-4">
            {/* Navn */}
            <h3 className="font-bebas text-bebas-xl text-gray-900 dark:text-white pr-8">
              {pkg.name}
            </h3>

            {/* Beskrivelse */}
            {pkg.description && pkg.description.trim() !== '' && (
              <div>
                <h4 className="font-montserrat font-semibold text-gray-900 dark:text-white mb-2">
                  Beskrivelse
                </h4>
                <p className="text-gray-600 dark:text-gray-400 font-montserrat leading-relaxed">
                  {pkg.description}
                </p>
              </div>
            )}

            {/* Varighet */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center gap-2">
              <span className="font-montserrat font-semibold text-gray-900 dark:text-white">
                Varighet:
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-r">
                {pkg.period || "15 uker"}
              </span>
            </div>
            {/* Pris-informasjon */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h4 className="font-montserrat font-semibold text-gray-900 dark:text-white mb-3">
                Prisinformasjon
              </h4>
              
              {pkg.price && pkg.price > 0 ? (
                <div className="space-y-2">
                  {/* Rabatt info */}
                  {pkg.discount_amount && pkg.discount_amount > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Ordinær pris:</span>
                        <span className="line-through text-gray-500">
                          {formatPrice(pkg.price)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600 dark:text-green-400 font-medium">Du sparer:</span>
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {savings}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t border-gray-200 dark:border-gray-700 pt-2">
                        <span className="text-gray-900 dark:text-white">Din pris:</span>
                        <span className="text-gray-900 dark:text-white">
                          {formatPrice(finalPrice || 0)}
                        </span>
                      </div>
                    </>
                  )}
                  
                  {/* Hvis ingen rabatt, vis bare ordinær pris */}
                  {(!pkg.discount_amount || pkg.discount_amount === 0) && (
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-gray-900 dark:text-white">Pris:</span>
                      <span className="text-gray-900 dark:text-white">
                        {formatPrice(pkg.price)}
                      </span>
                    </div>
                  )}

                  {/* Rabatt-tekst */}
                  {pkg.discount_text && pkg.discount_text.trim() !== '' && (
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-2">
                      {pkg.discount_text}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  Kontakt oss for prisinformasjon
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function PricingPage() {
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);

  // Format price from øre to kr
  const formatPrice = (priceInOre?: number): string => {
    if (!priceInOre) return "";
    return `${(priceInOre / 100).toLocaleString("no-NO")} kr`;
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (pkg: PricingPackage): number => {
    if (!pkg.price || pkg.price === 0) return 0;
    if (!pkg.discount_amount) return pkg.price;

    return pkg.price - pkg.discount_amount;
  };

  // Fetch pricing packages from Appwrite
  const fetchPricingFromAppwrite = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await listDocuments(
        DATABASE_ID,
        COLLECTIONS.PRICING_PACKAGES,
        [
          Query.equal("is_active", true), // Vis kun aktive priser
          Query.orderAsc("order"), // Sorter etter order felt
          Query.limit(50), // Begrens til 50 pakker
        ],
      );

      const packages = response.documents as unknown as PricingPackage[];
      setPricingPackages(packages);
    } catch (err) {
      console.error("Error fetching pricing packages:", err);
      setError("Kunne ikke laste priser fra databasen.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data når komponenten laster
  useEffect(() => {
    fetchPricingFromAppwrite();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">
            Laster priser...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h2 className="font-bebas text-bebas-lg text-red-800 dark:text-red-200 mb-2">
              Kunne ikke laste priser
            </h2>
            <p className="text-red-600 dark:text-red-300 font-montserrat mb-4">
              {error}
            </p>
            <Button
              onClick={fetchPricingFromAppwrite}
              className="font-semibold bg-red-600 hover:bg-red-700 text-white"
            >
              Prøv igjen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (pricingPackages.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark">
        <ScrollToTop />

        {/* Hero Section - samme som før */}
        <section
          className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                          dark:from-brand-900/10 dark:to-surface-dark-muted 
                          pt-24 pb-16 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1
                className="text-base font-medium text-brand-600 dark:text-brand-400 
                            uppercase tracking-wider mb-3"
              >
                Priser
              </h1>
              <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
                Ingen priser tilgjengelig ennå
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed mb-8">
                Vi jobber med å legge til våre priser. Kom tilbake snart eller
                kontakt oss for mer informasjon!
              </p>
              <Button
                onClick={fetchPricingFromAppwrite}
                className="font-semibold"
                variant="outline"
              >
                Last på nytt
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-surface-dark">
      <ScrollToTop />

      {/* Hero Section - Standard styling */}
      <section
        className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                        dark:from-brand-900/10 dark:to-surface-dark-muted 
                        pt-24 pb-16 relative overflow-hidden"
      >
        {/* Animated background elements - Brand farger */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-magenta-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl"
        />

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
              <h1
                className="text-xl font-medium text-brand-600 dark:text-brand-400 
                            uppercase tracking-wider mb-3"
              >
                Priser
              </h1>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white"
            >
              Våre kurs
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed"
            >
              Våre priser er laget for å være tilgjengelige for alle. Jo mer du
              danser, jo mer sparer du!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section - FIKSET: Beskrivelse alltid synlig */}
      <section
        className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted 
                         dark:from-brand-900/10 dark:to-surface-dark-muted"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {pricingPackages.map((pkg) => {
                const finalPrice = calculateDiscountedPrice(pkg);
                const hasDiscount =
                  pkg.discount_amount && pkg.discount_amount > 0;

                return (
                  <motion.div
                    key={pkg.$id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Enkelt design med modal-knapp */}
                    <div className="py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                        
                        {/* Venstresiden - Navn og beskrivelse-knapp */}
                        <div className="flex-1 flex items-center gap-3">
                          {/* Pakkenavn */}
                          <h3 className="font-bebas text-bebas-lg text-gray-900 dark:text-white">
                            {pkg.name}
                          </h3>
                          
                       
                        </div>
   {/* Beskrivelse-knapp (kun hvis beskrivelse finnes) */}
   {pkg.description && pkg.description.trim() !== '' && (
                            <button
                              onClick={() => setSelectedPackage(pkg)}
                              className="w-fit flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              title="Vis beskrivelse"
                            >
                              <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                Info
                              </span>
                            </button>
                          )}
                        {/* Høyresiden - Kun pris */}
                        <div className="text-left sm:text-right">
                          {hasDiscount && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              {formatPrice(pkg.price)}
                            </p>
                          )}

                          {pkg.price && pkg.price > 0 ? (
                            <p className="font-montserrat text-xl font-semibold text-gray-900 dark:text-white">
                              {formatPrice(finalPrice)}
                            </p>
                          ) : (
                            <p className="font-montserrat text-xl font-semibold text-gray-900 dark:text-white">
                              Kontakt oss for pris
                            </p>
                          )}
                        </div>

                        </div>
                      </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for beskrivelse */}
      <PricingModal 
        pkg={selectedPackage} 
        isOpen={selectedPackage !== null} 
        onClose={() => setSelectedPackage(null)} 
      />

      {/* CTA Section - Standard styling */}
      <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="font-montserrat text-3xl md:text-4xl font-medium mb-6 text-gray-900 dark:text-white">
              Ikke sikker på hvilket kurs som passer deg?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-8 text-lg">
              Kontakt oss på kontakt@urbanstudios.no eller benytt vårt
              kontaktskjema, så hjelper vi deg med å finne det perfekte kurset
              basert på dine behov!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/kontakt" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="font-semibold rounded-full 
                            bg-white/80 border-brand-300 text-brand-700 
                            hover:bg-brand-50 hover:text-brand-800
                            dark:bg-transparent dark:border-brand-700 dark:text-brand-400 
                            dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
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