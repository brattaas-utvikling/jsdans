import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  ArrowLeftIcon,
  ShareIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDocument, DATABASE_ID, COLLECTIONS } from "@/lib/appwrite";
import ScrollToTop from "@/helpers/ScrollToTop";

// TypeScript interface (same as before)
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

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('no-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate reading time
  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Fetch single article from Appwrite
  const fetchArticle = async () => {
    if (!id) {
      setError('Ingen artikkel ID funnet');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await getDocument(
        DATABASE_ID,
        COLLECTIONS.NEWS,
        id
      );
      
      const articleData = response as unknown as NewsArticle;
      
      // Sjekk om artikkel er publisert (optional: fjern hvis du vil vise upubliserte også)
      if (!articleData.published) {
        setError('Denne artikkelen er ikke publisert ennå.');
        setLoading(false);
        return;
      }
      
      setArticle(articleData);
    } catch (err) {
      console.error('Error fetching article:', err);
      setError('Kunne ikke laste artikkelen. Den finnes kanskje ikke.');
    } finally {
      setLoading(false);
    }
  };

  // Format content with line breaks
  const formatContent = (content: string): string[] => {
    return content.split('\n').filter(paragraph => paragraph.trim() !== '');
  };

  // Share functionality
  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.headlines,
          text: article.lead,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-studio-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">Laster artikkel...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bebas text-gray-900 dark:text-white mb-4">
            Artikkel ikke funnet
          </h1>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-6">
            {error || 'Vi kunne ikke finne artikkelen du leter etter.'}
          </p>
          <Button 
            onClick={() => navigate('/nyheter')}
            className="font-montserrat-medium rounded-full bg-studio-blue-500 hover:bg-studio-blue-600"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Tilbake til nyheter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ScrollToTop />
      {/* Hero Section with Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={article.img}
          alt={article.headlines}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        
        {/* Back button */}
        <div className="absolute top-8 left-8 z-10">
          <Button
            onClick={() => navigate('/nyheter')}
            variant="outline"
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-900 border-white/20 backdrop-blur-sm"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Tilbake
          </Button>
        </div>

        {/* Article title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              {/* <span className={`inline-block px-3 py-1 rounded-full text-sm font-montserrat-medium mb-4 ${
                article.published ? 'bg-green-500' : 'bg-yellow-500'
              } text-white`}>
                {article.published ? 'Publisert' : 'Utkast'}
              </span> */}
              
              <h1 className="font-bebas text-bebas-3xl md:text-bebas-4xl lg:text-bebas-5xl text-white mb-4 leading-tight">
                {article.headlines}
              </h1>
              
              <p className="text-xl text-gray-200 font-montserrat leading-relaxed max-w-2xl">
                {article.lead}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Article Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 font-montserrat mb-8 pb-8 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                <span>Av {article.author}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <span>{formatDate(article.created_at)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                <span>{calculateReadingTime(article.content)} min lesing</span>
              </div>

              {/* Action buttons */}
              <div className="ml-auto flex gap-2">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  <ShareIcon className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div className="space-y-6 text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed">
                {formatContent(article.content).map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Article Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-montserrat">
                    Sist oppdatert: {formatDate(article.updated_at)}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={handleShare}
                    className="rounded-full bg-studio-blue-700 hover:bg-studio-blue-600 font-montserrat-medium"
                  >
                    <ShareIcon className="mr-2 h-4 w-4" />
                    Del artikkel
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/nyheter')}
                    variant="outline"
                    className="rounded-full font-montserrat-medium"
                  >
                    Se flere artikler
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}