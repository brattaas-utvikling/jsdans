import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  SparklesIcon,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";
import ScrollToTop from "@/helpers/ScrollToTop";

// TypeScript interface som matcher Appwrite schema
interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId: string;
  $databaseId: string;
  $permissions: string[];
}

interface AboutSection extends AppwriteDocument {
  headlines: string;
  lead: string;
  content: string;
  img: string;
}

export default function AboutPage() {
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch about sections from Appwrite
  const fetchAboutFromAppwrite = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await listDocuments(
        DATABASE_ID,
        COLLECTIONS.ABOUT_US, // Anta at du har en ABOUT collection
        [
          Query.orderDesc('$createdAt'), // Sorter nyeste først
          Query.limit(1) // Begrens til 1 seksjon
        ]
      );
      
      const sections = response.documents as unknown as AboutSection[];
      setAboutSections(sections);
    } catch (err) {
      console.error('Error fetching about sections:', err);
      setError('Kunne ikke laste om oss-innhold.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data når komponenten laster
  useEffect(() => {
    fetchAboutFromAppwrite();
  }, []);

  // Finn hovedseksjon (første seksjon) og andre seksjoner
  const heroSection = aboutSections[0];
  const contentSections = aboutSections.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">Laster om oss...</p>
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
              Noe gikk galt
            </h2>
            <p className="text-red-600 dark:text-red-300 font-montserrat mb-4">
              {error}
            </p>
            <Button 
              onClick={fetchAboutFromAppwrite}
              className="font-semibold bg-red-600 hover:bg-red-700 text-white"
            >
              Prøv igjen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (aboutSections.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <SparklesIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="font-bebas text-bebas-lg text-gray-900 dark:text-white mb-2">
            Ingen innhold funnet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-4">
            Vi jobber med å legge til innhold på om oss-siden.
          </p>
          <Button 
            onClick={fetchAboutFromAppwrite}
            className="font-semibold"
            variant="outline"
          >
            Last på nytt
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ScrollToTop />

      {/* Hero Section med første seksjon fra Appwrite */}
      {heroSection && (
        <section className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                           dark:from-brand-900/10 dark:to-surface-dark-muted 
                           pt-24 pb-20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-sm font-medium text-brand-600 dark:text-brand-400 
                        uppercase tracking-wider mb-3">
                    {heroSection.headlines}
                  </h1>

                  <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
                    {heroSection.lead}
                  </h2>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
                      {heroSection.content}
                    </p>
                  </div>
                </div>

                {/* Stats Component Placeholder */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="grid grid-cols-2 gap-6 pt-8"
                >
                  <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-surface-dark-muted/50 backdrop-blur-sm">
                    <div className="text-2xl font-bebas text-brand-600 dark:text-brand-400">500+</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Fornøyde kunder</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-surface-dark-muted/50 backdrop-blur-sm">
                    <div className="text-2xl font-bebas text-brand-600 dark:text-brand-400">15+</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Kurs tilgjengelig</div>
                  </div>
                </motion.div> */}
              </motion.div>

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-brand-xl border border-brand-100/50 dark:border-brand-700/30">
                  <img
                    src={heroSection.img}
                    alt={heroSection.headlines}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      {contentSections.length > 0 && (
        <section className="py-20 bg-white dark:bg-surface-dark">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-20"
            >
              {contentSections.map((section, index) => (
                <div key={section.$id} className="max-w-6xl mx-auto">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-row-dense' : ''
                  }`}>
                    
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                    >
                      <div className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                                     dark:from-brand-900/10 dark:to-surface-dark-muted 
                                     rounded-2xl p-8 border border-brand-100/50 dark:border-brand-700/30">
                        <h3 className="font-bebas text-bebas-lg md:text-bebas-xl 
                                      text-gray-900 dark:text-white mb-4 leading-tight">
                          {section.headlines}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat 
                                    leading-relaxed mb-6">
                          {section.lead}
                        </p>
                        <div className="prose dark:prose-invert max-w-none">
                          <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                    >
                      <div className="relative rounded-2xl overflow-hidden shadow-brand-lg group border border-brand-100/50 dark:border-brand-700/30">
                        <img
                          src={section.img}
                          alt={section.headlines}
                          className="w-full h-[400px] object-cover transition-transform duration-500 
                                    group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-16 bg-surface-light dark:bg-surface-dark">
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
                  variant="outline"
                  className="font-semibold rounded-full 
                            border-brand-300 text-brand-600 
                            hover:bg-brand-50 hover:text-brand-700
                            dark:border-brand-700 dark:text-brand-400 
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