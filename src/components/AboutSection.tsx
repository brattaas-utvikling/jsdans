import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  SparklesIcon,
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-studio-blue-500 mx-auto mb-4"></div>
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
              className="font-montserrat-medium bg-red-600 hover:bg-red-700 text-white"
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
            className="font-montserrat-medium"
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
        <section className="bg-gradient-to-br from-studio-blue-50 via-white to-studio-pink-50 
                           dark:from-studio-blue-900/20 dark:via-surface-dark dark:to-studio-pink-900/20 
                           pt-24 pb-20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-studio-pink-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-studio-blue-400/10 rounded-full blur-3xl" />
          
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
                  <h1 className="text-center text-sm font-montserrat-medium text-studio-indigo-600 dark:text-studio-indigo-400 
                        uppercase tracking-wider mb-3">
                    {heroSection.headlines}
                  </h1>

                  <p className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
                    {heroSection.lead}
                  </p>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed">
                      {heroSection.content}
                    </p>
                  </div>
                </div>

                {/* Put in a component with stats for the dance studio */}
              
              </motion.div>

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-studio-xl">
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
        <section className="py-20 bg-surface-muted dark:bg-surface-dark-muted">
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
                      <div>
                        <h2 className="font-bebas text-bebas-2xl md:text-bebas-3xl 
                                      text-gray-900 dark:text-white mb-4 leading-tight">
                          {section.headlines}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat 
                                    leading-relaxed mb-6">
                          {section.lead}
                        </p>
                        <div className="prose dark:prose-invert max-w-none">
                          <p className="text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed">
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
                      <div className="relative rounded-2xl overflow-hidden shadow-studio-lg group">
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

    </div>
  );
}