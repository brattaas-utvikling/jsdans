import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  UserIcon,
  ArrowLeftIcon,
  Share2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDocument, DATABASE_ID, COLLECTIONS } from "@/lib/appwrite";
import ScrollToTop from "@/helpers/ScrollToTop";

// TypeScript interface som matcher den nye databasestrukturen
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
  "paragraph-1": string;
  "paragraph-2": string;
  "paragraph-3": string;
  pullquote?: string; // Optional pullquote field
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
  const [shareMessage, setShareMessage] = useState<string>("");

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("no-NO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fetch single article from Appwrite
  const fetchArticle = async () => {
    if (!id) {
      setError("Ingen artikkel ID funnet");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getDocument(DATABASE_ID, COLLECTIONS.NEWS, id);

      const articleData = response as unknown as NewsArticle;

      // Sjekk om artikkel er publisert (optional: fjern hvis du vil vise upubliserte også)
      if (!articleData.published) {
        setError("Denne artikkelen er ikke publisert ennå.");
        setLoading(false);
        return;
      }

      setArticle(articleData);
    } catch (err) {
      console.error("Error fetching article:", err);
      setError("Kunne ikke laste artikkelen. Den finnes kanskje ikke.");
    } finally {
      setLoading(false);
    }
  };

  // Get non-empty paragraphs
  const getArticleParagraphs = (article: NewsArticle): string[] => {
    const paragraphs = [
      article["paragraph-1"],
      article["paragraph-2"],
      article["paragraph-3"],
    ];

    return paragraphs.filter(
      (paragraph) => paragraph && paragraph.trim() !== "",
    );
  };

  // Render content with pullquote positioned correctly
  const renderArticleContent = (article: NewsArticle, paragraphs: string[]) => {
    if (paragraphs.length === 0) {
      return null;
    }

    const content = [];

    // Første paragraph (alltid vis)
    content.push(
      <p key="paragraph-1" className="text-lg leading-relaxed">
        {paragraphs[0]}
      </p>,
    );

    // Pullquote vises ALLTID etter første paragraph hvis den eksisterer
    // (uavhengig av hvor mange paragraphs det er)
    if (article.pullquote && article.pullquote.trim() !== "") {
      content.push(
        <blockquote
          key="pullquote"
          className="my-8 p-6 bg-gradient-to-r from-brand-50/50 to-magenta-50/30 dark:from-brand-900/10 dark:to-magenta-900/10 rounded-xl border-l-4 border-brand-500 relative"
        >
          <div className="absolute top-4 left-4 text-brand-300 dark:text-brand-600 text-4xl font-serif">
            "
          </div>
          <p className="text-xl font-medium text-brand-700 dark:text-brand-300 font-montserrat leading-relaxed italic text-center px-8">
            {article.pullquote}
          </p>
          <div className="absolute bottom-4 right-4 text-brand-300 dark:text-brand-600 text-4xl font-serif rotate-180">
            "
          </div>
        </blockquote>,
      );
    }

    // Resten av paragraphene (paragraph-2 og paragraph-3 hvis de eksisterer)
    paragraphs.slice(1).forEach((paragraph, index) => {
      content.push(
        <p key={`paragraph-${index + 2}`} className="text-lg leading-relaxed">
          {paragraph}
        </p>,
      );
    });

    return content;
  };

  // Forbedret share functionality
  const handleShare = async () => {
    if (!article) return;

    const shareData = {
      title: article.headlines,
      text: article.lead || "Sjekk ut denne artikkelen fra Urban Studios",
      url: window.location.href,
    };

    try {
      // Sjekk om Web Share API er tilgjengelig (mobil/moderne browsere)
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage("Takk for at du deler!");
      } else {
        // Fallback for desktop - kopier URL til clipboard
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Link kopiert til utklippstavlen!");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        // Brukeren avbrøt delinga - ikke vis feilmelding
        return;
      }

      console.error("Kunne ikke dele:", error);

      // Fallback: Kopier URL som backup
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Link kopiert til utklippstavlen!");
      } catch (clipboardError) {
        console.error("Kunne ikke kopiere link:", clipboardError);
        setShareMessage("Kunne ikke dele artikkelen");
      }
    }

    // Fjern melding etter 3 sekunder
    if (shareMessage) {
      setTimeout(() => setShareMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  // Fjern share message etter 3 sekunder
  useEffect(() => {
    if (shareMessage) {
      const timer = setTimeout(() => setShareMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [shareMessage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">
            Laster artikkel...
          </p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h1 className="font-bebas text-bebas-lg text-red-800 dark:text-red-200 mb-2">
              Artikkel ikke funnet
            </h1>
            <p className="text-red-600 dark:text-red-300 font-montserrat mb-4">
              {error || "Vi kunne ikke finne artikkelen du leter etter."}
            </p>
            <Button
              onClick={() => navigate("/nyheter")}
              className="font-semibold bg-red-600 hover:bg-red-700 text-white"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Tilbake til nyheter
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const paragraphs = getArticleParagraphs(article);

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ScrollToTop />

      {/* Share message notification */}
      {shareMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg font-montserrat"
        >
          {shareMessage}
        </motion.div>
      )}

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
            onClick={() => navigate("/nyheter")}
            size="sm"
            className="font-montserrat font-semibold rounded-md overflow-hidden
                      bg-white/20 backdrop-blur-sm text-white border border-white/30 
                      hover:border-white/50 transition-all duration-300 px-4 py-2"
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
              <h1 className="font-bebas text-bebas-2xl md:text-bebas-3xl lg:text-bebas-4xl text-white mb-4 leading-tight">
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

              {/* Action buttons */}
              <div className="ml-auto flex gap-2">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-brand-300 text-brand-700 hover:bg-brand-50 hover:text-brand-800
                            dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
                  aria-label={`Del artikkel: ${article.headlines}`}
                  title="Del denne artikkelen"
                >
                  <Share2Icon className="h-4 w-4" />
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
                {renderArticleContent(article, paragraphs)}
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
                    onClick={() => navigate("/nyheter")}
                    variant="outline"
                    className="font-semibold rounded-full 
                            bg-white/80 border-brand-300 text-brand-700 
                            hover:bg-brand-50 hover:text-brand-800
                            dark:bg-transparent dark:border-brand-700 dark:text-brand-400 
                            dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
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
