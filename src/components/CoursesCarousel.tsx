import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { DanceClass } from "@/types";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface CoursesCarouselProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  className?: string;
}

export default function CoursesCarousel({
  title = "Våre kurs",
  subtitle = "Utforsk vårt utvalg av danser og finn ditt perfekte kurs",
  limit = 10,
  className = "",
}: CoursesCarouselProps) {
  const [courses, setCourses] = useState<DanceClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalCourse, setModalCourse] = useState<DanceClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Color mapping with WCAG compliant colors
  const getColorClasses = (colorName: string) => {
    const colorMap: Record<string, {
      gradient: string;
      bg: string;
      text: string;
      button: string;
      buttonHover: string;
    }> = {
      red: {
        gradient: 'from-red-500/80 to-red-600/80',
        bg: 'bg-red-600',
        text: 'text-white',
        button: 'bg-red-600 hover:bg-red-700 text-white',
        buttonHover: 'hover:bg-red-50 dark:hover:bg-red-900/30'
      },
      orange: {
        gradient: 'from-orange-500/80 to-orange-600/80',
        bg: 'bg-orange-600',
        text: 'text-white',
        button: 'bg-orange-600 hover:bg-orange-700 text-white',
        buttonHover: 'hover:bg-orange-50 dark:hover:bg-orange-900/30'
      },
      purple: {
        gradient: 'from-purple-500/80 to-purple-600/80',
        bg: 'bg-purple-600',
        text: 'text-white',
        button: 'bg-purple-600 hover:bg-purple-700 text-white',
        buttonHover: 'hover:bg-purple-50 dark:hover:bg-purple-900/30'
      },
      blue: {
        gradient: 'from-blue-500/80 to-blue-600/80',
        bg: 'bg-blue-600',
        text: 'text-white',
        button: 'bg-blue-600 hover:bg-blue-700 text-white',
        buttonHover: 'hover:bg-blue-50 dark:hover:bg-blue-900/30'
      },
      green: {
        gradient: 'from-green-500/80 to-green-600/80',
        bg: 'bg-green-600',
        text: 'text-white',
        button: 'bg-green-600 hover:bg-green-700 text-white',
        buttonHover: 'hover:bg-green-50 dark:hover:bg-green-900/30'
      },
    };
    
    const key = colorName.toLowerCase();
    return colorMap[key] || colorMap['purple'];
  };

  // Get actual hex color for gradients
  const getCourseColor = (colorName: string) => {
    const colorMap: Record<string, string> = {
      red: '#dc2626',
      orange: '#ea580c', 
      amber: '#d97706',
      yellow: '#ca8a04',
      lime: '#65a30d',
      green: '#16a34a',
      emerald: '#059669',
      teal: '#0d9488',
      cyan: '#0891b2',
      sky: '#0284c7',
      blue: '#2563eb',
      indigo: '#4f46e5',
      violet: '#7c3aed',
      purple: '#9333ea',
      fuchsia: '#c026d3',
      pink: '#db2777',
      rose: '#e11d48',
    };
    
    const key = colorName.toLowerCase();
    return colorMap[key] || '#9333ea';
  };

  const openModal = (course: DanceClass) => {
    setModalCourse(course);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalCourse(null);
    document.body.style.overflow = 'unset';
  };

  // Fetch courses from Appwrite - memoized with useCallback
  const fetchCoursesFromAppwrite = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await listDocuments(
        DATABASE_ID,
        COLLECTIONS.DANCE_CLASSES_CAROUSEL,
        [
          Query.orderAsc("sorting"),
          Query.limit(limit),
        ],
      );

      const courseData = response.documents as unknown as DanceClass[];
      setCourses(courseData);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Kunne ikke laste kurs fra databasen.");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchCoursesFromAppwrite();
  }, [fetchCoursesFromAppwrite]);

  // Preload images - optimized to run only once per course set
  useEffect(() => {
    if (courses.length > 0) {
      const preloadedImages = new Set<string>();
      
      courses.forEach((course) => {
        if (!preloadedImages.has(course.image)) {
          const img = new Image();
          img.src = course.image;
          preloadedImages.add(course.image);
        }
      });
    }
  }, [courses.length]);

  if (loading) {
    return (
      <div className={`py-16 ${className}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 font-montserrat">
                Laster kurs...
              </p>
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
                className="bg-red-600 hover:bg-red-700 text-white font-montserrat px-4 py-2 rounded-lg transition-colors"
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
            <h2 className="font-bebas text-bebas-2xl text-gray-900 dark:text-white mb-4">
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
          className="text-center mb-16"
        >
          <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Expo Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.5}
            spaceBetween={30}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={false}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            initialSlide={Math.min(1, courses.length - 1)}
            navigation={{
              nextEl: '.expo-swiper-button-next',
              prevEl: '.expo-swiper-button-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.8,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 50,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="expo-slider"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.$id}>
                <div className="group relative">
                  <div className="relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700">
                    {/* Image with sepia effect */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-all duration-300 sepia"
                      style={{ backgroundImage: `url(${course.image})` }}
                    />
                    
                    {/* Glass morphism section at bottom - only visible on active slide */}
                    <div className="absolute inset-x-0 bottom-0 h-40 active-slide-content opacity-0">
                      {/* Colored gradient background that goes to edges */}
                      <div 
                        className="absolute inset-0 rounded-b-2xl"
                        style={{
                          background: `linear-gradient(to top, ${getCourseColor(course.color)}90, ${getCourseColor(course.color)}70, ${getCourseColor(course.color)}40, ${getCourseColor(course.color)}20, transparent)`
                        }}
                      />
                      
                      {/* Glass morphism overlay that covers full width */}
                      <div 
                        className="absolute inset-0 bg-black/5 backdrop-blur-md rounded-b-2xl"
                        style={{
                          maskImage: 'linear-gradient(to top, black 60%, transparent 100%)',
                          WebkitMaskImage: 'linear-gradient(to top, black 60%, transparent 100%)'
                        }}
                      />
                      
                      {/* Content container with padding */}
                      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                        <div className="p-4 md:p-5">
                          <h3 className="font-bebas text-2xl md:text-3xl mb-3 leading-tight text-white drop-shadow-lg">
                            {course.name}
                          </h3>
                          
                          <div className="flex gap-3">
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('Button clicked for course:', course.name);
                                openModal(course);
                              }}
                              onTouchStart={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                              }}
                              className="bg-white/90 hover:bg-white text-gray-900 font-montserrat font-medium cursor-pointer relative z-50 touch-none"
                              style={{ pointerEvents: 'auto' }}
                            >
                              Mer info
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons - desktop only */}
          <div className="hidden lg:block">
            <div className="expo-swiper-button-prev absolute top-1/2 -left-16 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 opacity-70 hover:opacity-100">
              <svg className="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="expo-swiper-button-next absolute top-1/2 -right-16 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 opacity-70 hover:opacity-100">
              <svg className="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={closeModal} modal={false}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white dark:bg-gray-900">
            {modalCourse && (
              <>
                {/* Image header */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={modalCourse.image}
                    alt={modalCourse.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <DialogTitle asChild>
                      <h2 className="font-bebas text-3xl md:text-4xl text-white mb-2 drop-shadow-lg">
                        {modalCourse.name}
                      </h2>
                    </DialogTitle>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="font-bebas text-xl text-gray-900 dark:text-white mb-3">
                          Om kurset
                        </h3>
                        <p className="font-montserrat text-gray-600 dark:text-gray-300 leading-relaxed">
                          {modalCourse.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-bebas text-xl text-gray-900 dark:text-white">
                          Hva du lærer
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            'Grunnleggende teknikker og bevegelser',
                            'Rytme og musikktolkning', 
                            'Selvtillit og kroppsbeherskelse',
                            'Kreativt uttrykk og improvisasjon'
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className={`w-2 h-2 ${getColorClasses(modalCourse.color).bg} rounded-full mt-2 flex-shrink-0`} />
                              <span className="font-montserrat text-sm text-gray-600 dark:text-gray-300">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      <div className={`p-6 rounded-xl ${getColorClasses(modalCourse.color).bg} ${getColorClasses(modalCourse.color).text}`}>
                        <h3 className="font-bebas text-lg mb-4">Kursdetaljer</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="font-montserrat font-medium text-sm opacity-80">Instruktør</div>
                            <div className="font-montserrat">{modalCourse.instructor}</div>
                          </div>
                          <div>
                            <div className="font-montserrat font-medium text-sm opacity-80">Alder</div>
                            <div className="font-montserrat">{modalCourse.age}</div>
                          </div>
                          {modalCourse.studio && (
                            <div>
                              <div className="font-montserrat font-medium text-sm opacity-80">Studio</div>
                              <div className="font-montserrat">{modalCourse.studio}</div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                        <h4 className="font-bebas text-lg text-gray-900 dark:text-white mb-3">
                          Klar for å begynne?
                        </h4>
                        <p className="font-montserrat text-sm text-gray-600 dark:text-gray-300 mb-4">
                          Meld deg på og opplev gleden ved dans. Prøvetimer tilgjengelig!
                        </p>
                        <div className="space-y-3">
                          <Link to="/registration" className="block" onClick={closeModal}>
                            <Button className={`w-full ${getColorClasses(modalCourse.color).button}`}>
                              Meld deg på
                            </Button>
                          </Link>
                          <Link to="/kontakt" className="block" onClick={closeModal}>
                            <Button variant="outline" className="w-full">
                              Kontakt oss
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to="/kurs">
            <Button className="border-brand-300 text-brand-600 hover:bg-brand-50 dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 font-semibold rounded-full bg-transparent border-2 px-8 py-3">
              Se alle kurs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}