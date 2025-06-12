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
  content: string;
  img: string;
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// Fallback mock data for testing
const mockNewsData: NewsArticle[] = [
  {
    $id: "1",
    $createdAt: "2025-01-15T10:00:00Z",
    $updatedAt: "2025-01-15T10:00:00Z",
    $collectionId: "news",
    $databaseId: "main",
    $permissions: [],
    headlines: "Nye Hip-Hop Klasser Starter i Februar",
    lead: "Vi utvider vårt program med spennende nye hip-hop klasser for alle aldersgrupper. Meld deg på nå!",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    img: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1000",
    author: "Maria Andersen",
    published: true,
    created_at: "2025-01-15T10:00:00Z",
    updated_at: "2025-01-15T10:00:00Z"
  }
];

export default function NewsPage() {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
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

  // Calculate reading time
  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
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

      console.log(`Hentet ${articles.length} artikler fra Appwrite`); // Debug info
      setNewsData(articles); // Behold for logging/debugging
      setFilteredNews(articles);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Kunne ikke laste nyheter. Bruker demo-data.');
      // Fallback til mock data ved feil
      setNewsData(mockNewsData);
      setFilteredNews(mockNewsData);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-studio-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">Laster nyheter...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ScrollToTop />
      
      {/* Error message */}
      {error && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-studio-blue-50 via-white to-studio-pink-50 
                        dark:from-studio-blue-900/20 dark:via-surface-dark dark:to-studio-pink-900/20 
                        pt-24 pb-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-studio-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-studio-blue-400/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-sm font-montserrat-medium text-studio-indigo-600 dark:text-studio-indigo-400 
                          uppercase tracking-wider mb-3">
              Nyheter
            </h2>
            <h1 className="font-bebas text-bebas-4xl md:text-bebas-5xl lg:text-bebas-6xl 
                          text-gray-900 dark:text-white mb-6">
              Hva skjer hos oss?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
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
            <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-studio-xl 
                           hover:shadow-2xl transition-all duration-500 group cursor-pointer">
              
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
                        <span>{calculateReadingTime(featuredArticle.content)} min lesing</span>
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
                      className="relative font-montserrat-semibold rounded-full overflow-hidden
                                bg-white/20 backdrop-blur-sm text-white border border-white/30 
                                hover:border-white/50 transition-all duration-300 px-8 py-3
                                group-hover:border-transparent"
                    >
                      {/* Static background */}
                      <span className="relative z-10 flex items-center">
                        Les hele artikkelen
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                      </span>
                      
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-studio-blue-500 via-studio-purple-500 to-studio-pink-500 
                                     transform -translate-x-full group-hover:translate-x-0 
                                     transition-transform duration-700 ease-out" />
                    </Button>
                    
                    {/* Optional: Share button */}
                    {/* <Button 
                      size="lg"
                      variant="ghost"
                      className="text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                    >
                      <ShareIcon className="h-5 w-5" />
                    </Button> */}
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
{/* Regular Articles Grid - Fully Responsive */}
<section className="py-16 bg-surface-muted dark:bg-surface-dark-muted">
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
        <p className="text-gray-500 dark:text-gray-400 font-montserrat text-lg">
          Ingen nyheter funnet.
        </p>
        <Button 
          onClick={fetchNewsFromAppwrite}
          className="mt-4 font-montserrat-medium"
          variant="outline"
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
              <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-studio hover:shadow-studio-lg 
                             transition-all duration-300 hover:scale-105">
                
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
                        <span>{calculateReadingTime(article.content)} min lesing</span>
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
                      className="relative w-full font-montserrat-medium rounded-full overflow-hidden
                                bg-white/20 backdrop-blur-sm text-white border border-white/30 
                                hover:border-white/50 transition-all duration-200
                                group-hover:border-transparent text-xs sm:text-sm px-4 py-2"
                    >
                      {/* Static text */}
                      <span className="relative z-10 flex items-center justify-center">
                        Les mer
                        <ArrowRightIcon className="ml-1.5 h-3 w-3 flex-shrink-0" />
                      </span>
                      
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-studio-blue-500 via-studio-purple-500 to-studio-pink-500 
                                     transform -translate-x-full group-hover:translate-x-0 
                                     transition-transform duration-700 ease-out" />
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