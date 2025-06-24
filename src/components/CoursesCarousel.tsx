import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";
import ClassCard from "./ClassCard";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";



interface CoursesCarouselProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  className?: string;
}

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
}

export default function CoursesCarousel({ 
  title = "Våre kurs",
  subtitle = "Utforsk vårt utvalg av danser og finn ditt perfekte kurs",
  limit = 10,
  className = ""
}: CoursesCarouselProps) {
  const [courses, setCourses] = useState<DanceClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Responsive slides per view
  const [slidesPerView, setSlidesPerView] = useState(1);

  // Update slides per view based on screen size
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1280) {
        setSlidesPerView(4); // xl
      } else if (window.innerWidth >= 1024) {
        setSlidesPerView(3); // lg
      } else if (window.innerWidth >= 640) {
        setSlidesPerView(2); // sm
      } else {
        setSlidesPerView(1); // mobile
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  // Navigation functions - ett kort av gangen
  const scrollPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Gå til siste mulige posisjon
      setCurrentIndex(Math.max(0, courses.length - slidesPerView));
    }
  }, [currentIndex, courses.length, slidesPerView]);
  
  const scrollNext = useCallback(() => {
    if (currentIndex < courses.length - slidesPerView) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex, courses.length, slidesPerView]);

   // Fetch courses from Appwrite
   const fetchCoursesFromAppwrite = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await listDocuments(
        DATABASE_ID,
        COLLECTIONS.DANCE_CLASSES_CAROUSEL,
        [
          Query.orderAsc('name'), // Sorter alfabetisk
          Query.limit(10) // Begrens til 10 kurs
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

  // Preload images for better performance
  useEffect(() => {
    if (courses.length > 0) {
      courses.forEach(course => {
        const img = new Image();
        img.src = course.image;
      });
    }
  }, [courses]);

  // Fetch data når komponenten laster
  useEffect(() => {
    fetchCoursesFromAppwrite();
  }, [limit]);

  if (loading) {
    return (
      <div className={`py-16 ${className}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-bebas-2xl md:text-bebas-3xl text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-montserrat">
              {subtitle}
            </p>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 font-montserrat">Laster kurs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`py-16 ${className}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md mx-auto">
              <h3 className="font-bebas text-bebas-lg text-red-800 dark:text-red-200 mb-2">
                Kunne ikke laste kurs
              </h3>
              <p className="text-red-600 dark:text-red-300 font-montserrat mb-4">
                {error}
              </p>
              <button 
                onClick={fetchCoursesFromAppwrite}
                className="bg-red-600 hover:bg-red-700 text-white font-montserrat-medium px-4 py-2 rounded-lg transition-colors"
              >
                Prøv igjen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className={`py-16 ${className}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="font-bebas text-bebas-2xl md:text-bebas-3xl text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-montserrat">
              Ingen kurs funnet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-16 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        
{/* Carousel - Oppdatert layout for arrows utenfor */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="relative px-4 lg:px-16" // Padding for arrow space
>
  {/* Navigation Buttons - Posisjonert helt utenfor */}
  {courses.length > 1 && (
    <>
      <button
        className="absolute -left-2 lg:-left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 
                  hover:bg-white dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 
                  p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10
                  backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
        onClick={scrollPrev}
        aria-label="Forrige slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        className="absolute -right-2 lg:-right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 
                  hover:bg-white dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 
                  p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10
                  backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
        onClick={scrollNext}
        aria-label="Neste slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </>
  )}

  {/* Carousel Container - Overflow hidden for å skjule neste kort */}
  <div className="overflow-hidden">
    <div 
      className="flex transition-transform duration-500 ease-in-out"
      style={{ 
        transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
      }}
    >
      {courses.map((course) => (
        <div 
          key={course.$id} 
          className="px-3 flex-shrink-0"
          style={{ 
            width: `${100 / slidesPerView}%`
          }}
        >
          <div className="h-full">
            <ClassCard
              name={course.name}
              description={course.description}
              level={course.level}
              age={course.age}
              color={course.color}
              image={course.image}
              schedule={course.schedule || [{ day: "September 2025", time: "Tidspunkt kommer" }]}
              instructor={course.instructor}
              studio={course.studio}
            />
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Dots Indicator */}
  {courses.length > slidesPerView && (
    <div className="flex justify-center mt-8 space-x-2">
      {Array.from({ length: Math.max(1, courses.length - slidesPerView + 1) }).map((_, index) => (
        <button
          key={`carousel-dot-${index}`} 
          className={`w-3 h-3 rounded-full transition-all duration-200 ${
            index === currentIndex 
              ? 'bg-brand-600 dark:bg-brand-400' 
              : 'bg-gray-300 dark:bg-gray-600 hover:bg-brand-400 dark:hover:bg-brand-500'
          }`}
          onClick={() => setCurrentIndex(index)}
          aria-label={`Gå til posisjon ${index + 1}`}
        />
      ))}
    </div>
  )}
</motion.div>

        {/* "Se alle kurs" knapp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
         <Link to="/kurs" className="w-full sm:w-auto">
                <Button 
                  className="border-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-600
                            dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-400
                            font-semibold rounded-full bg-transparent border-2 px-6 py-3"
                >
                  Se alle kurs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}