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
          Query.orderDesc('created_at'), // Sorter nyeste først
          Query.limit(50) // Begrens til 50 artikler
        ]
      );
      
      const articles = response.documents as unknown as NewsArticle[];
      setNewsData(articles);
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
            <h1 className="font-bebas text-bebas-4xl md:text-bebas-5xl lg:text-bebas-6xl 
                          text-gray-900 dark:text-white mb-6">
              Nyheter & Blogg
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
              <h2 className="font-bebas text-bebas-2xl md:text-bebas-3xl text-gray-900 dark:text-white mb-8 text-center">
                Utvalgt artikkel
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-studio-lg group">
                  <img
                    src={featuredArticle.img}
                    alt={featuredArticle.headlines}
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Published status badge */}
                  {/* <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-white text-sm font-montserrat-medium rounded-full ${
                      featuredArticle.published ? 'bg-green-500' : 'bg-yellow-500'
                    }`}>
                      {featuredArticle.published ? 'Publisert' : 'Utkast'}
                    </span>
                  </div> */}
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-montserrat">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {formatDate(featuredArticle.created_at)}
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      {calculateReadingTime(featuredArticle.content)} min lesing
                    </div>
                    <div className="flex items-center gap-1">
                      <UserIcon className="h-4 w-4" />
                      {featuredArticle.author}
                    </div>
                  </div>

                  <h3 className="font-bebas text-bebas-xl md:text-bebas-2xl text-gray-900 dark:text-white leading-tight">
                    {featuredArticle.headlines}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-lg">
                    {featuredArticle.lead}
                  </p>

                  <Link to={`/nyheter/${featuredArticle.$id}`}>
                    <Button className="font-montserrat-semibold rounded-full bg-gradient-to-r from-studio-blue-500 to-studio-pink-500 
                                    hover:from-studio-blue-600 hover:to-studio-pink-600 text-white shadow-studio
                                      transition-all duration-200 hover:shadow-studio-lg">
                      Les hele artikkelen
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Articles Grid */}
      <section className="py-16 bg-surface-muted dark:bg-surface-dark-muted">
        <div className="container mx-auto px-4 md:px-6">
          {regularArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 font-montserrat text-lg">
                Ingen artikler funnet.
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
            <>
              <h2 className="font-bebas text-bebas-2xl md:text-bebas-3xl text-gray-900 dark:text-white mb-12 text-center">
                Alle Artikler ({newsData.length})
              </h2>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {regularArticles.map((article, index) => (
                  <motion.article
                    key={article.$id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-white dark:bg-surface-dark rounded-2xl shadow-studio hover:shadow-studio-lg 
                              transition-all duration-300 hover:scale-105 overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.img}
                        alt={article.headlines}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Published status badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 text-white text-xs font-montserrat-medium rounded-full ${
                          article.published ? 'bg-green-500' : 'bg-yellow-500'
                        }`}>
                          {article.published ? 'Publisert' : 'Utkast'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Meta info */}
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-montserrat">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {formatDate(article.created_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          {calculateReadingTime(article.content)} min
                        </div>
                      </div>

                      <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white leading-tight line-clamp-2">
                        {article.headlines}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 font-montserrat text-sm leading-relaxed line-clamp-3">
                        {article.lead}
                      </p>

                      {/* Author and CTA */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-studio-blue-700/30">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-montserrat">
                          <UserIcon className="h-3 w-3" />
                          {article.author}
                        </div>
                        <Link
                          to={`/nyheter/${article.$id}`}
                          className="text-studio-blue-600 dark:text-studio-blue-400 hover:text-studio-pink-600 
                                    dark:hover:text-studio-pink-400 font-montserrat-medium text-sm
                                    flex items-center transition-colors"
                        >
                          Les mer
                          <ArrowRightIcon className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Refresh button */}
      <section className="py-12 bg-white dark:bg-surface-dark">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Button 
            onClick={fetchNewsFromAppwrite}
            className="font-montserrat-semibold rounded-full bg-gradient-to-r from-studio-blue-500 to-studio-pink-500 
                      hover:from-studio-blue-600 hover:to-studio-pink-600 text-white shadow-studio
                      transition-all duration-200 hover:shadow-studio-lg hover:scale-105"
            disabled={loading}
          >
            {loading ? "Laster..." : "Last flere artikler"}
          </Button>
        </div>
      </section>
    </div>
  );
}