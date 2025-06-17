import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";
import ScrollToTop from "@/helpers/ScrollToTop";
import ClassCard from "@/components/ClassCard";

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
        COLLECTIONS.SCHEDULES        [
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-studio-blue-500 mx-auto mb-4"></div>
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
              className="font-montserrat-medium bg-red-600 hover:bg-red-700 text-white"
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

      {/* Hero Section - Samme stil som nyheter */}
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
            <h1 className="text-sm font-montserrat-medium text-studio-indigo-600 dark:text-studio-indigo-400 
                          uppercase tracking-wider mb-3">
              Våre kurs
            </h1>
            <h2 className="font-bebas text-bebas-4xl md:text-bebas-5xl lg:text-bebas-6xl 
                          text-gray-900 dark:text-white mb-6">
              Finn din stil
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
              Fra urban grooves til klassisk eleganse – vårt kursprogram er designet for å møte deg der du er og ta deg dit du vil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Section - Samme container-stil som nyheter */}
      <section className="py-16 bg-surface-muted dark:bg-surface-dark-muted">
        <div className="container mx-auto px-4 md:px-6">
          {courses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 font-montserrat text-lg">
                Ingen kurs funnet.
              </p>
              <Button 
                onClick={fetchCoursesFromAppwrite}
                className="mt-4 font-montserrat-medium"
                variant="outline"
              >
                Last på nytt
              </Button>
            </div>
          ) : (
            <>
              

              {/* Decorative elements */}
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-studio-purple-400/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-studio-pink-400/10 rounded-full blur-3xl" />

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
                        schedule={course.schedule || [{ day: "TBA", time: "TBA", level: course.level || "TBA" }]}
                        instructor={course.instructor}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Optional: Call to Action Section */}
      <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="font-bebas text-bebas-2xl md:text-bebas-3xl text-gray-900 dark:text-white mb-4">
              Ikke sikker på hvilket kurs som passer deg?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-8 text-lg">
              Book en gratis konsultasjon, så hjelper vi deg med å finne det perfekte kurset basert på dine mål og erfaring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="font-montserrat-semibold rounded-full bg-gradient-to-r from-studio-blue-500 to-studio-pink-500 
                               hover:from-studio-blue-600 hover:to-studio-pink-600 text-white shadow-studio
                               transition-all duration-200 hover:shadow-studio-lg hover:scale-105">
                Book gratis konsultasjon
              </Button>
              <Button 
                variant="outline"
                className="font-montserrat-semibold rounded-full border-studio-blue-300 text-studio-blue-600 
                          hover:bg-studio-blue-50 dark:border-studio-blue-700 dark:text-studio-blue-400 
                          dark:hover:bg-studio-blue-900/30"
              >
                Kontakt oss
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}