import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  ArrowRightIcon,
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

interface NewsArticle extends AppwriteDocument {
  headlines: string;
  lead: string;
  img: string;
  'paragraph-1': string;
  'paragraph-2': string;
  'paragraph-3': string;
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function NewsPage() {
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('no-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate reading time based on all paragraphs
  const calculateReadingTime = (article: NewsArticle): number => {
    const wordsPerMinute = 200;
    const allText = `${article.lead} ${article['paragraph-1']} ${article['paragraph-2']} ${article['paragraph-3']}`;
    const words = allText.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Fetch news from Appwrite
  const fetchNewsFromAppwrite = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await listDocuments(
        DATABASE_ID,
        COLLECTIONS.NEWS,
        [
          Query.orderDesc('created_at'), // Sorter nyeste første
          Query.limit(50) // Begrens til 50 artikler
        ]
      );
      
      const articles = response.documents as unknown as NewsArticle[];

      console.log(`Hentet ${articles.length} artikler fra Appwrite`);
      setFilteredNews(articles);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Kunne ikke laste nyheter fra databasen.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data når komponenten laster
  useEffect(() => {
    fetchNewsFromAppwrite();
  }, []);

  // Finn featured artikkel (første publiserte artikkel)
  const featuredArticle = filteredNews.find(article => article.published) || filteredNews[0];
  const regularArticles = filteredNews.filter(article => article.$id !== featuredArticle?.$id);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">Laster nyheter...</p>
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
              Kunne ikke laste nyheter
            </h2>
            <p className="text-red-600 dark:text-red-300 font-montserrat mb-4">
              {error}
            </p>
            <Button 
              onClick={fetchNewsFromAppwrite}
              className="font-semibold bg-red-600 hover:bg-red-700 text-white"
            >
              Prøv igjen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (filteredNews.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark">
        <ScrollToTop />
        
        {/* Hero Section */}
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
              <h1 className="text-xl font-medium text-brand-600 dark:text-brand-400 
                            uppercase tracking-wider mb-3">
                Nyheter
              </h1>
              <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
                Ingen nyheter ennå
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed mb-8">
                Vi jobber med å legge til spennende nyheter og oppdateringer. Kom tilbake snart!
              </p>
              <Button 
                onClick={fetchNewsFromAppwrite}
                className="font-semibold bg-brand-500 hover:bg-brand-600
                          dark:bg-white dark:hover:bg-brand-600/80
                          text-white dark:text-brand-600
                          dark:hover:text-white/90"
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
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ScrollToTop />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                        dark:from-brand-900/10 dark:to-surface-dark-muted 
                        pt-24 pb-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-base font-medium text-brand-600 dark:text-brand-400 
                          uppercase tracking-wider mb-3">
              Nyheter
            </h1>
            <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
              Hva skjer hos oss?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
              Hold deg oppdatert på alt som skjer hos Urban Studios! Fra nye kurs til 
              spennende events og inspirerende danse-historier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 bg-white dark:bg-surface-dark">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="max-w-6xl mx-auto">
                <Link to={`/nyheter/${featuredArticle.$id}`}>
                  <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-brand-xl 
                                  hover:shadow-2xl transition-all duration-500 group cursor-pointer
                                  border border-brand-100/50 dark:border-brand-700/30">
                    
                    {/* Background Image */}
                    <img
                      src={featuredArticle.img}
                      alt={featuredArticle.headlines}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-10" />
                    
                    {/* Content Container */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-10">
                      
                      {/* Top Section - Meta Info */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          {/* Meta info */}
                          <div className="flex items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2 text-sm font-montserrat">
                              <CalendarIcon className="h-4 w-4 text-white/80" />
                              <span>{formatDate(featuredArticle.created_at)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-montserrat">
                              <ClockIcon className="h-4 w-4 text-white/80" />
                              <span>{calculateReadingTime(featuredArticle)} min lesing</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-montserrat">
                              <UserIcon className="h-4 w-4 text-white/80" />
                              <span>{featuredArticle.author}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section - Headlines, Lead & CTA */}
                      <div className="space-y-6 max-w-4xl">
                        <div className="space-y-4">
                          <h3 className="font-bebas text-bebas-2xl md:text-bebas-3xl lg:text-bebas-4xl 
                                        text-white leading-tight">
                            {featuredArticle.headlines}
                          </h3>

                          <p className="text-white/95 font-montserrat text-lg md:text-xl leading-relaxed max-w-3xl">
                            {featuredArticle.lead}
                          </p>
                        </div>

                        {/* CTA Button */}
                        <div className="flex items-center gap-4">
                          <Button 
                            size="lg"
                            className="relative font-montserrat font-semibold rounded-full overflow-hidden
                                bg-white/20 backdrop-blur-sm text-white border border-white/30 
                                hover:border-white/50 transition-all duration-300 px-8 py-3
                                group-hover:border-transparent"
                          >
                            <span className="relative z-10 flex items-center">
                              Les hele artikkelen
                              <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Articles Grid */}
      <section className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted 
                         dark:from-brand-900/10 dark:to-surface-dark-muted">
        {/* Container for title only */}
        <div className="container mx-auto px-4 md:px-6 mb-12">
          <h2 className="font-bebas text-bebas-2xl md:text-bebas-3xl text-gray-900 dark:text-white text-center">
            Andre Nyheter ({regularArticles.length})
          </h2>
        </div>

        {/* Responsive container */}
        <div className="container mx-auto px-4 md:px-6">
          {regularArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 font-montserrat text-lg mb-4">
                Ingen andre nyheter funnet.
              </p>
              <Button 
                onClick={fetchNewsFromAppwrite}
                variant="outline"
                className="font-semibold rounded-full 
                          border-brand-300 text-brand-600 
                          hover:bg-brand-50 hover:text-brand-700
                          dark:border-brand-700 dark:text-brand-400 
                          dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
              >
                Last på nytt
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid gap-6 
                         grid-cols-1 
                         sm:grid-cols-2 
                         lg:grid-cols-3 
                         xl:grid-cols-4 
                         2xl:grid-cols-5
                         place-items-center
                         max-w-7xl mx-auto"
            >
              {regularArticles.map((article, index) => (
                <motion.article
                  key={article.$id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group cursor-pointer w-full max-w-sm"
                >
                  <Link to={`/nyheter/${article.$id}`}>
                    <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-lg 
                                   transition-all duration-300 group-hover:shadow-brand-xl
                                   border border-brand-100/50 dark:border-brand-700/30">
                      
                      {/* Background Image */}
                      <img
                        src={article.img}
                        alt={article.headlines}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 z-0"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 z-10" />
                      
                      {/* Content Container */}
                      <div className="absolute inset-0 z-20 h-full flex flex-col justify-between p-4 sm:p-6">
                        
                        {/* Top Section - Meta Info */}
                        <div className="flex flex-col items-start space-y-2 sm:space-y-3">
                          {/* Meta info */}
                          <div className="space-y-1 sm:space-y-1.5 text-white/90">
                            <div className="flex items-center gap-1.5 text-xs font-montserrat">
                              <CalendarIcon className="h-3 w-3 text-white/80 flex-shrink-0" />
                              <span className="truncate">{formatDate(article.created_at)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-montserrat">
                              <ClockIcon className="h-3 w-3 text-white/80 flex-shrink-0" />
                              <span>{calculateReadingTime(article)} min lesing</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-montserrat">
                              <UserIcon className="h-3 w-3 text-white/80 flex-shrink-0" />
                              <span className="truncate">{article.author}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Section - Headlines, Lead & CTA */}
                        <div className="space-y-3 sm:space-y-4">
                          <div className="space-y-2 sm:space-y-3">
                            <h3 className="font-bebas text-bebas-base sm:text-bebas-lg text-white leading-tight line-clamp-2">
                              {article.headlines}
                            </h3>

                            <p className="text-white/90 font-montserrat text-xs sm:text-sm leading-relaxed line-clamp-3">
                              {article.lead}
                            </p>
                          </div>

                          {/* CTA Button */}
                          <Button 
                            size="sm"
                            className="relative font-semibold rounded-full overflow-hidden
                                      bg-brand-500 hover:bg-brand-600
                                      dark:bg-white dark:hover:bg-brand-600/80
                                      text-white dark:text-brand-600
                                      dark:hover:text-white/90
                                      border-0 shadow hover:shadow-md 
                                      transition-all duration-200 text-xs sm:text-sm px-4 py-2"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              Les mer
                              <ArrowRightIcon className="ml-1.5 h-3 w-3 flex-shrink-0" />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}