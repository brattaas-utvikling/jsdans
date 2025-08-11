import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import ScrollToTop from "@/helpers/ScrollToTop";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";
import { PricingPackage } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Modal komponent med samme funksjonalitet som ClassCard
function PricingModal({ 
  pkg, 
  isOpen, 
  onOpenChange 
}: { 
  pkg: PricingPackage | null; 
  isOpen: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  const formatPrice = (priceInOre?: number): string => {
    if (!priceInOre) return "";
    return `${(priceInOre / 100).toLocaleString("no-NO")} kr`;
  };

  // Handle escape key like ClassCard modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onOpenChange]);

  if (!pkg) return null;

  const finalPrice = pkg.price && pkg.discount_amount 
    ? pkg.price - pkg.discount_amount 
    : pkg.price;

  const savings = pkg.discount_amount ? formatPrice(pkg.discount_amount) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="w-[95vw] max-w-lg max-h-[95vh] overflow-y-auto bg-white dark:bg-surface-dark 
                   mx-auto my-2 sm:my-8 p-4 sm:p-6"
      >
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-xl sm:text-2xl font-bebas text-gray-900 dark:text-white pr-8">
            {pkg.name}
          </DialogTitle>
          {pkg.description && pkg.description.trim() !== '' && (
            <DialogDescription className="text-sm sm:text-base text-start font-montserrat text-gray-600 dark:text-gray-300">
              {pkg.description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-4">
          {/* Varighet Info */}
          <div className="p-3 sm:p-4 bg-gray-50 dark:bg-surface-dark-muted rounded-lg border border-brand-100/50 dark:border-brand-700/30">
            <div className="flex justify-between items-center">
              <span className="font-montserrat font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                Varighet
              </span>
              <span className="text-gray-600 dark:text-gray-300 font-montserrat text-sm sm:text-base">
                {pkg.period || "15 uker"}
              </span>
            </div>
          </div>

          {/* Pris-informasjon */}
          <div className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                           dark:from-brand-900/10 dark:to-surface-dark-muted 
                           p-4 sm:p-6 rounded-xl border border-brand-100/50 dark:border-brand-700/30 relative overflow-hidden">
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-magenta-400/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-brand-400/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h4 className="font-bebas text-base sm:text-lg mb-3 text-gray-900 dark:text-white">
                Prisinformasjon
              </h4>
              
              {pkg.price && pkg.price > 0 ? (
                <div className="space-y-3">
                  {/* Rabatt info */}
                  {pkg.discount_amount && pkg.discount_amount > 0 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400 font-montserrat text-sm">
                          Ordinær pris:
                        </span>
                        <span className="line-through text-gray-500 font-montserrat text-sm">
                          {formatPrice(pkg.price)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 dark:text-green-400 font-montserrat font-medium text-sm">
                          Du sparer:
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-montserrat font-medium text-sm">
                          {savings}
                        </span>
                      </div>
                      <div className="border-t border-brand-200/50 dark:border-brand-700/50 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900 dark:text-white font-montserrat font-semibold">
                            Din pris:
                          </span>
                          <span className="text-gray-900 dark:text-white font-montserrat font-semibold text-lg">
                            {formatPrice(finalPrice || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 dark:text-white font-montserrat font-semibold">
                        Pris:
                      </span>
                      <span className="text-gray-900 dark:text-white font-montserrat font-semibold text-lg">
                        {formatPrice(pkg.price)}
                      </span>
                    </div>
                  )}

                  {/* Rabatt-tekst */}
                  {pkg.discount_text && pkg.discount_text.trim() !== '' && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mt-3">
                      <p className="text-sm text-green-700 dark:text-green-300 font-montserrat font-medium">
                        {pkg.discount_text}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 font-montserrat">
                  Kontakt oss for prisinformasjon
                </p>
              )}
            </div>
          </div>

        </div>

        <DialogFooter className="mt-4 sm:mt-6">
          <Button
            className="w-full font-medium bg-transparent border-2 border-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-600
                      dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-400 text-sm sm:text-base"
            onClick={() => onOpenChange(false)}
          >
            Lukk
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function PricingPage() {
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  // Handle modal open with package selection
  const handleOpenModal = useCallback((pkg: PricingPackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  }, []);

  // Handle modal close
  const handleCloseModal = useCallback((open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setSelectedPackage(null);
    }
  }, []);

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

        {/* Hero Section */}
        <section
          className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                          dark:from-brand-900/10 dark:to-surface-dark-muted 
                          pt-24 pb-16 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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

      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                        dark:from-brand-900/10 dark:to-surface-dark-muted 
                        pt-24 pb-16 relative overflow-hidden"
      >
        {/* Animated background elements */}
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

      {/* Pricing Section - FORBEDRET MODERNE DESIGN */}
      <section
        className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted 
                         dark:from-brand-900/10 dark:to-surface-dark-muted"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Modern card container with subtle shadow and gradient border */}
            <div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl shadow-brand-lg 
                            border border-brand-100/50 dark:border-brand-700/30 overflow-hidden">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-brand-500/5 to-magenta-500/5 
                              dark:from-brand-400/10 dark:to-magenta-400/10 
                              px-6 py-4 border-b border-brand-100/30 dark:border-brand-700/30">
                <h3 className="font-bebas text-bebas-lg text-gray-900 dark:text-white">
                  Kurspriser
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-montserrat mt-1">
                  Klikk på en prispakke for mer detaljer
                </p>
              </div>

              {/* Pricing list */}
              <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {pricingPackages.map((pkg, index) => {
                  const finalPrice = calculateDiscountedPrice(pkg);

                  return (
                    <motion.div
                      key={pkg.$id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group relative overflow-hidden"
                    >
                      {/* Hover background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-50/0 to-brand-50/50 
                                      dark:from-brand-900/0 dark:to-brand-900/20 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <button
                        onClick={() => handleOpenModal(pkg)}
                        className="relative w-full flex items-center justify-between py-4 px-6 
                                   transition-all duration-200 group-hover:translate-x-1
                                   text-left cursor-pointer focus:outline-none 
                                   focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 
                                   focus:ring-offset-white dark:focus:ring-offset-surface-dark
                                   rounded-lg"
                      >
                        
                        {/* Left side - Info button + Name */}
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className="rounded-full border-0 shadow-sm
                                          bg-brand-50 dark:bg-brand-900/30
                                          group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50
                                          text-brand-600 dark:text-brand-400 transition-all duration-200 
                                          group-hover:shadow-brand-glow group-hover:scale-105 flex-shrink-0
                                          flex items-center justify-center border-brand-200/30 dark:border-brand-700/30">
                            <Info className="h-3.5 w-3.5" />
                          </div>
                          
                          <div className="min-w-0 flex-1">
                            <h4 className="font-montserrat font-semibold text-gray-900 dark:text-white 
                                           group-hover:text-brand-600 dark:group-hover:text-brand-400 
                                           transition-colors duration-200 truncate">
                              {pkg.name}
                            </h4>
                          </div>
                        </div>

                        {/* Right side - Price with discount indication */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          
                          <div className="text-right">
                            {pkg.price && pkg.price > 0 ? (
                              <div className={`font-montserrat font-medium text-sm text-gray-900 dark:text-white`}>
                                {formatPrice(finalPrice)}
                              </div>
                            ) : (
                              <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">
                                Kontakt oss for pris
                              </div>
                            )}
                          </div>

                          {/* Subtle arrow indicating clickable */}
                          <ArrowRight className="h-4 w-4 text-gray-300 dark:text-gray-600 
                                                 group-hover:text-brand-500 dark:group-hover:text-brand-400 
                                                 transition-all duration-200 group-hover:translate-x-1 flex-shrink-0" />
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer with additional info */}
              <div className="bg-gray-50/50 dark:bg-gray-800/30 px-6 py-4 
                              border-t border-gray-100/50 dark:border-gray-700/30">
                <p className="text-xs text-gray-600 dark:text-gray-400 font-montserrat text-center">
                  Alle priser er inkludert MVA. Kontakt oss for spørsmål om priser eller rabatter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal - Same functionality as ClassCard */}
      <PricingModal 
        pkg={selectedPackage} 
        isOpen={isModalOpen} 
        onOpenChange={handleCloseModal} 
      />

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