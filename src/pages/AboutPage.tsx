import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SparklesIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";
import ScrollToTop from "@/helpers/ScrollToTop";
import InstructorsSection from "@/components/InstructorsSection";

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
  img: string;
  pullQuote: string;
  paragraph1: string;
  paragraph2?: string; // Valgfritt
  paragraph3?: string; // Valgfritt
  paragraph4?: string; // Valgfritt
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string;
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
      const response = await listDocuments(DATABASE_ID, COLLECTIONS.ABOUT_US, [
        Query.orderDesc("$createdAt"), // Sorter nyeste først
        Query.limit(1), // Begrens til 1 seksjon
      ]);

      const sections = response.documents as unknown as AboutSection[];
      setAboutSections(sections);
    } catch (err) {
      console.error("Error fetching about sections:", err);
      setError("Kunne ikke laste om oss-innhold.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data når komponenten laster
  useEffect(() => {
    fetchAboutFromAppwrite();
  }, []);

  // Finn hovedseksjon (første seksjon)
  const heroSection = aboutSections[0];

  // Get non-empty paragraphs in order
  const getParagraphs = (section: AboutSection): string[] => {
    const paragraphs = [
      section.paragraph1,
      section.paragraph2,
      section.paragraph3,
      section.paragraph4,
    ].filter(
      (paragraph): paragraph is string =>
        paragraph != null && paragraph.trim() !== "",
    );

    return paragraphs;
  };

  // Render content with pullquote positioned correctly
  const renderContentWithPullquote = (
    section: AboutSection,
    paragraphs: string[],
  ) => {
    const content = [];

    // Første paragraph
    if (paragraphs[0]) {
      content.push(
        <motion.div
          key="paragraph-1"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed text-lg">
              {paragraphs[0]}
            </p>
          </div>
        </motion.div>,
      );
    }

    // Hvis det er færre enn 4 paragraphs: pullquote etter første paragraph
    // Hvis det er 4 paragraphs: pullquote mellom paragraph 2 og 3
    const pullquoteAfterParagraph = paragraphs.length === 4 ? 2 : 1;

    // Andre paragraph hvis den eksisterer
    if (paragraphs[1]) {
      content.push(
        <motion.div
          key="paragraph-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed text-lg">
              {paragraphs[1]}
            </p>
          </div>
        </motion.div>,
      );
    }

    // Pullquote posisjonering
    if (
      pullquoteAfterParagraph === 1 ||
      (pullquoteAfterParagraph === 2 && paragraphs.length >= 2)
    ) {
      content.push(
        <motion.div
          key="pullquote"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center py-8"
        >
          <blockquote className="text-transparent bg-clip-text bg-hero-gradient font-bebas text-bebas-xl md:text-bebas-2xl leading-tight">
            {section.pullQuote}
          </blockquote>
        </motion.div>,
      );
    }

    // Tredje paragraph hvis den eksisterer
    if (paragraphs[2]) {
      content.push(
        <motion.div
          key="paragraph-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed text-lg">
              {paragraphs[2]}
            </p>
          </div>
        </motion.div>,
      );
    }

    // Fjerde paragraph hvis den eksisterer
    if (paragraphs[3]) {
      content.push(
        <motion.div
          key="paragraph-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed text-lg">
              {paragraphs[3]}
            </p>
          </div>
        </motion.div>,
      );
    }

    return content;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">
            Laster om oss...
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

  const paragraphs = getParagraphs(heroSection);

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark w-full overflow-x-hidden">
      <ScrollToTop />

 {/* Hero Section - Bildet går bak navbar */}
 {heroSection && (
        <section className="relative h-screen overflow-hidden -mt-16 lg:-mt-20">
          {/* Background Image med glow effekt - går helt til toppen */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroSection.img}
              alt={heroSection.headlines}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Glow effekt - subtil brand-farget glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-500/20 via-transparent to-magenta-500/10" />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-[1]" />

          {/* Content Container - med plass til navbar */}
          <div className="absolute inset-0 z-[5] flex items-end pt-20 md:pt-24 pb-16 md:pb-20">
            <div className="w-full p-6 md:p-10">
              <div className="container mx-auto max-w-7xl">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-3xl"
                >
                  <h1 className="text-xl font-medium text-brand-400 uppercase tracking-wider mb-3">
                    {heroSection.headlines}
                  </h1>

                  <h2 className="font-bebas font-semibold text-bebas-2xl md:text-bebas-3xl lg:text-bebas-4xl text-white leading-tight">
                    {heroSection.lead}
                  </h2>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content Section med samme bakgrunn som andre sider */}
      {heroSection && (
        <section className="relative py-20 bg-gradient-to-br from-brand-50/80 to-surface-muted dark:from-brand-900/10 dark:to-surface-dark-muted overflow-hidden">
          {/* Decorative elements som andre sider */}
          <div className="absolute top-4 right-4 w-32 h-32 bg-magenta-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-32 h-32 bg-brand-400/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
            <div className="max-w-4xl mx-auto space-y-12">
              {renderContentWithPullquote(heroSection, paragraphs)}
            </div>
          </div>
        </section>
      )}

      {/* FIKSET: InstructorsSection med proper overflow håndtering */}
      <div className="w-full overflow-hidden">
        <InstructorsSection />
      </div>

      {/* Call to Action Section - standard hvit bakgrunn */}
      <section className="py-16 bg-white dark:bg-surface-dark overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
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
                    bg-white/80 border-brand-300 text-brand-600 
                    hover:bg-brand-50 hover:text-brand-700
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