import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";
import ScrollToTop from "@/helpers/ScrollToTop";
import ClassCard from "@/components/ClassCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// TypeScript interface som matcher Appwrite schema
interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId: string;
  $databaseId: string;
  $permissions: string[];
}

interface DanceClass extends AppwriteDocument {
  name: string;
  description: string;
  color: string;
  image: string;
  schedule: Array<{
    day: string;
    time: string;
    level: string;
  }>;
  instructor: string;
  level: string;
  age: string;
  studio: string;
  // Legg til andre felter du har i Appwrite
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<DanceClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from Appwrite
  const fetchCoursesFromAppwrite = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await listDocuments(
        DATABASE_ID,
        COLLECTIONS.DANCE_CLASSES,
        [
          Query.orderAsc('name'), // Sorter alfabetisk
          Query.limit(20) // Begrens til 20 kurs
        ]
      );
      
      const courseData = response.documents as unknown as DanceClass[];
      console.log(`✅ Hentet ${courseData.length} kurs fra Appwrite`);
      setCourses(courseData);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Kunne ikke laste kurs fra databasen.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data når komponenten laster
  useEffect(() => {
    fetchCoursesFromAppwrite();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">Laster kurs...</p>
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
              onClick={fetchCoursesFromAppwrite}
              className="font-semibold bg-red-600 hover:bg-red-700 text-white"
            >
              Prøv igjen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ScrollToTop />

      {/* Hero Section - Standard styling */}
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
              Våre kurs
            </h1>
            <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
              Finn din stil
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
              Fra energiske grooves til klassisk eleganse – vårt kursprogram er designet for å møte deg der du er og ta deg dit du vil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Section - Standard styling */}
      <section className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted 
                         dark:from-brand-900/10 dark:to-surface-dark-muted">
        <div className="container mx-auto px-4 md:px-6">
          {courses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 font-montserrat text-lg mb-4">
                Ingen kurs funnet.
              </p>
              <Button 
                onClick={fetchCoursesFromAppwrite}
                className="border-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-600
                          dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-400
                          font-semibold rounded-full bg-transparent border-2"
              >
                Last på nytt
              </Button>
            </div>
          ) : (
            <>
              {/* Decorative elements */}
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-magenta-400/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-coral-400/10 rounded-full blur-3xl" />

                {/* Course cards grid - SAMME som du hadde før */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10"
                >
                  {courses.map((course, index) => (
                    <motion.div
                      key={course.$id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <ClassCard
                        name={course.name}
                        description={course.description}
                        level={course.level}
                        age={course.age}
                        color={course.color}
                        image={course.image}
                        schedule={course.schedule || [{ day: "September 2025", time: "Tidspunkt kommer", level: course.level || "Nivå kommer" }]}
                        instructor={course.instructor}
                        studio={course.studio}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action Section - Standard styling */}
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