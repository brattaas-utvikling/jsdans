import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  StarIcon,
  SparklesIcon,
  ArrowRight
} from "lucide-react";
import ScrollToTop from "@/helpers/ScrollToTop";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";

// TypeScript interface som matcher Appwrite schema
interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId: string;
  $databaseId: string;
  $permissions: string[];
}

interface PricingPackage extends AppwriteDocument {
  name: string;
  price?: number; // Pris i øre
  period?: string;
  discount_amount?: number; // Rabatt i øre
  discount_text?: string;
  description?: string;
  order: number;
  is_active: boolean;
  category?: string;
}

export default function PricingPage() {
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format price from øre to kr
  const formatPrice = (priceInOre?: number): string => {
    if (!priceInOre) return '';
    return `${(priceInOre / 100).toLocaleString('no-NO')} kr`;
  };

  // Format full pricing display
  const formatPricingDisplay = (pkg: PricingPackage): string => {
    // Special cases with fallback descriptions
    const fallbackDescriptions: Record<string, string> = {
      "Familierabatt": "50% for danser nr 2 som danser 3 eller flere klasser",
      "Kompani": "500 kr ekstra per halvår",
      "Klippekort": "1 500 kr for 10 klipp",
      "Prøvetime": "Gratis første time for nye deltakere"
    };

    // Check if this package has a fallback description
    if (fallbackDescriptions[pkg.name]) {
      return pkg.description || fallbackDescriptions[pkg.name];
    }
    
    // If has description and no meaningful price, show description
    if (pkg.description && (!pkg.price || pkg.price === 0)) {
      return pkg.description;
    }
    
    // If no price and no description
    if ((!pkg.price || pkg.price === 0) && !pkg.description) {
      return 'Pris kommer';
    }
    
    // Standard price display
    if (pkg.price && pkg.price > 0 && pkg.period) {
      return `${formatPrice(pkg.price)} ${pkg.period}`;
    }
    
    // Price without period
    if (pkg.price && pkg.price > 0) {
      return formatPrice(pkg.price);
    }
    
    return 'Kontakt oss for pris';
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
          Query.equal('is_active', true), // Vis kun aktive priser
          Query.orderAsc('order'), // Sorter etter order felt
          Query.limit(50) // Begrens til 50 pakker
        ]
      );
      
      const packages = response.documents as unknown as PricingPackage[];
      console.log(`Hentet ${packages.length} prispakker fra Appwrite`);
      setPricingPackages(packages);
    } catch (err) {
      console.error('Error fetching pricing packages:', err);
      setError('Kunne ikke laste priser fra databasen.');
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
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">Laster priser...</p>
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
        <section className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                          dark:from-brand-900/10 dark:to-surface-dark-muted 
                          pt-24 pb-16 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-base font-medium text-brand-600 dark:text-brand-400 
                            uppercase tracking-wider mb-3">
                Priser
              </h1>
              <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
                Ingen priser tilgjengelig ennå
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed mb-8">
                Vi jobber med å legge til våre priser. Kom tilbake snart eller kontakt oss for mer informasjon!
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
      <section className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                        dark:from-brand-900/10 dark:to-surface-dark-muted 
                        pt-24 pb-16 relative overflow-hidden">
        
        {/* Animated background elements - Brand farger */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-magenta-400/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl"
        />

        {/* Floating elements - Brand farger */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 opacity-20"
        >
          <SparklesIcon className="h-6 w-6 text-magenta-500" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 25, 0],
            x: [0, -15, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-1/4 opacity-15"
        >
          <StarIcon className="h-8 w-8 text-brand-500" />
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
              Våre priser er laget for å være tilgjengelige for alle. Jo mer du danser, jo mer sparer du!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section - Standard styling med dynamisk data */}
      <section className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted 
                         dark:from-brand-900/10 dark:to-surface-dark-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {pricingPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.$id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
                                bg-white dark:bg-surface-dark rounded-xl p-6 
                                border border-brand-100/50 dark:border-brand-700/30
                                transition-all duration-200 group-hover:border-brand-300 dark:group-hover:border-brand-500
                                hover:shadow-brand-lg">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white 
                                   transition-colors duration-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                        {pkg.name}
                      </h3>
                      {pkg.discount_text && (
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                          {pkg.discount_text}
                        </p>
                      )}
                      {pkg.description && pkg.price && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {pkg.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-montserrat text-gray-700 dark:text-gray-300 
                                  transition-colors duration-200 group-hover:text-gray-900 dark:group-hover:text-white">
                        {formatPricingDisplay(pkg)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
              Kontakt oss på kontakt@urbanstudios.no eller benytt vårt kontaktskjema, så hjelper vi deg med å finne det perfekte kurset basert på dine behov!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/kontakt" className="w-full sm:w-auto">
                <Button 
                  className="border-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-600
                            dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-400
                            font-semibold rounded-full bg-transparent border-2 px-6 py-3"
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