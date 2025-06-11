import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  ArrowRightIcon,
  NewspaperIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";

// TypeScript interface (samme som før)
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

interface HomepageNewsProps {
  maxArticles?: number; // Hvor mange artikler som skal vises
  showFeatured?: boolean; // Om featured artikkel skal vises
  compact?: boolean; // Kompakt layout for mindre plass
}

export default function HomepageNews({ 
  maxArticles = 3, 
  showFeatured = true, 
  compact = false 
}: HomepageNewsProps) {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('no-NO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate reading time
  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Fetch latest news from Appwrite
  const fetchLatestNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await listDocuments(
        DATABASE_ID,
        COLLECTIONS.NEWS,
        [
          Query.equal('published', true), // Kun publiserte artikler
          Query.orderDesc('created_at'), // Sorter nyeste først
          Query.limit(maxArticles + (showFeatured ? 1 : 0)) // Hent ekstra hvis featured
        ]
      );
      
      const articles = response.documents as unknown as NewsArticle[];
      setNewsData(articles);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Kunne ikke laste nyheter.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestNews();
  }, [maxArticles, showFeatured]);

  const featuredArticle = showFeatured ? newsData[0] : null;
  const regularArticles = showFeatured 
    ? newsData.slice(1, maxArticles + 1) 
    : newsData.slice(0, maxArticles);

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-studio-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || newsData.length === 0) {
    return (
      <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center py-12">
            <NewspaperIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-montserrat">
              {error || 'Ingen nyheter tilgjengelig for øyeblikket.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-surface-dark">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-bebas text-bebas-2xl md:text-bebas-3xl text-gray-900 dark:text-white mb-4">
            Siste Nyheter
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat max-w-2xl mx-auto">
            Hold deg oppdatert på alt som skjer hos Urban Studios
          </p>
        </motion.div>

        {/* Featured Article (hvis enabled) */}
        {featuredArticle && showFeatured && !compact && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gradient-to-br from-studio-blue-50 to-studio-pink-50 dark:from-studio-blue-900/20 dark:to-studio-pink-900/20 rounded-2xl p-8">
              
              {/* Featured Image */}
              <div className="relative rounded-xl overflow-hidden shadow-studio group">
                <img
                  src={featuredArticle.img}
                  alt={featuredArticle.headlines}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Featured badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-studio-pink-500 text-white text-sm font-montserrat-medium rounded-full">
                    Utvalgt
                  </span>
                </div>
              </div>

              {/* Featured Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-montserrat">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {formatDate(featuredArticle.created_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    {calculateReadingTime(featuredArticle.content)} min
                  </div>
                </div>

                <h3 className="font-bebas text-bebas-lg md:text-bebas-xl text-gray-900 dark:text-white leading-tight">
                  {featuredArticle.headlines}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
                  {featuredArticle.lead}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-montserrat">
                    <UserIcon className="h-4 w-4" />
                    {featuredArticle.author}
                  </div>
                  
                  <Link to={`/nyheter/${featuredArticle.$id}`}>
                    <Button 
                      size="sm"
                      className="rounded-full bg-studio-blue-500 hover:bg-studio-blue-600 font-montserrat-medium"
                    >
                      Les mer
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Articles Grid */}
        {regularArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: showFeatured && !compact ? 0.4 : 0.2 }}
            viewport={{ once: true }}
            className={`grid gap-6 ${
              compact 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {regularArticles.map((article, index) => (
              <motion.article
                key={article.$id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white dark:bg-surface-dark rounded-xl shadow-studio hover:shadow-studio-lg 
                          transition-all duration-300 hover:scale-105 overflow-hidden group"
              >
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.img}
                    alt={article.headlines}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Article Content */}
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

                  <h4 className="font-bebas text-bebas-base text-gray-900 dark:text-white leading-tight line-clamp-2">
                    {article.headlines}
                  </h4>

                  <p className="text-gray-600 dark:text-gray-300 font-montserrat text-sm leading-relaxed line-clamp-2">
                    {article.lead}
                  </p>

                  {/* Author and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
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
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/nyheter">
            <Button 
              variant="outline"
              className="rounded-full border-studio-blue-300 text-studio-blue-600 hover:bg-studio-blue-50 
                        dark:border-studio-blue-700 dark:text-studio-blue-400 dark:hover:bg-studio-blue-900/30
                        font-montserrat-medium"
            >
              Se alle nyheter
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}