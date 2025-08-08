import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";
import ScrollToTop from "@/helpers/ScrollToTop";
import ClassCard from "@/components/ClassCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { fetchSchedulesWithClasses, type ScheduleWithClass } from "../services/scheduleServices";

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
  type: string; // Added type field for filtering
  schedule: Array<{
    day: string;
    time: string;
  }>;
  instructor: string;
  age: string;
  studio: string;
}

// Define course types and their colors (similar to THEMES in SchedulePage)
const COURSE_TYPES = {
  hiphop: {
    label: "Hip Hop",
    color: "bg-brand-500",
    textColor: "text-white",
  },
  moderne: {
    label: "Moderne",
    color: "bg-magenta-500",
    textColor: "text-white",
  },
  jazz: {
    label: "Jazz",
    color: "bg-coral-500",
    textColor: "text-white",
  },
  ballett: {
    label: "Ballett",
    color: "bg-brand-400",
    textColor: "text-white",
  },
  toddler: {
    label: "Småbarn",
    color: "bg-amber-400",
    textColor: "text-white",
  },
  kompani: {
    label: "Kompani",
    color: "bg-purple-500",
    textColor: "text-white",
  },
  show: {
    label: "Show",
    color: "bg-pink-500",
    textColor: "text-white",
  },
  styrke: {
    label: "Styrke",
    color: "bg-green-500",
    textColor: "text-white",
  },
} as const;

export default function CoursesPage() {
  const [courses, setCourses] = useState<DanceClass[]>([]);
  const [schedules, setSchedules] = useState<ScheduleWithClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  // Enhanced normalization function to handle all variations
  const normalizeType = (type: string): string => {
    return type
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '') // Remove all whitespace
      .replace(/[^a-zA-Z0-9]/g, ''); // Remove special characters
  };

  // Create a mapping from normalized to display name
  const createTypeMapping = (courses: DanceClass[]) => {
    const typeMap = new Map<string, string>();
    
    courses.forEach(course => {
      if (course.type) {
        const normalized = normalizeType(course.type);
        if (!typeMap.has(normalized)) {
          // Use the first occurrence as the display name, but prefer capitalized versions
          const existing = typeMap.get(normalized);
          if (!existing || (course.type[0] === course.type[0].toUpperCase() && existing[0] !== existing[0].toUpperCase())) {
            typeMap.set(normalized, course.type);
          }
        }
      }
    });
    
    return typeMap;
  };

  // Function to get schedules for a specific course
  const getSchedulesForCourse = (courseName: string) => {
    return schedules.filter(schedule => 
      schedule.dance_class && 
      schedule.dance_class.name.toLowerCase() === courseName.toLowerCase()
    );
  };

  // Function to format schedule data for ClassCard
  const formatScheduleForCard = (courseSchedules: ScheduleWithClass[]) => {
    if (!courseSchedules || courseSchedules.length === 0) {
      return [{ day: "September 2025", time: "Tidspunkt kommer" }];
    }

    return courseSchedules.map(schedule => ({
      day: schedule.day,
      time: `${schedule.start_time.substring(0, 5)}-${schedule.end_time.substring(0, 5)}`,
      studio: schedule.room || schedule.dance_class?.studio || "Sal kommer"
    }));
  };

  // Get course type colors (with fallback)
  const getCourseTypeColors = (displayType: string) => {
    const normalizedType = normalizeType(displayType);
    const typeKey = normalizedType as keyof typeof COURSE_TYPES;
    return COURSE_TYPES[typeKey] || {
      label: displayType,
      color: "bg-gray-500",
      textColor: "text-white",
    };
  };

  // Filter courses based on selected type
  const filteredCourses = useMemo(() => {
    if (!typeFilter) return courses;
    const normalizedFilter = normalizeType(typeFilter);
    return courses.filter(course => 
      normalizeType(course.type) === normalizedFilter
    );
  }, [courses, typeFilter]);

  // Get unique course types from the fetched courses (properly deduplicated)
  const availableTypes = useMemo(() => {
    const typeMapping = createTypeMapping(courses);
    const uniqueTypes = Array.from(typeMapping.values())
      .filter(Boolean)
      .sort((a, b) => {
        // Custom sort: prioritize known types, then alphabetical
        const aKey = normalizeType(a) as keyof typeof COURSE_TYPES;
        const bKey = normalizeType(b) as keyof typeof COURSE_TYPES;
        const aIsKnown = aKey in COURSE_TYPES;
        const bIsKnown = bKey in COURSE_TYPES;
        
        if (aIsKnown && !bIsKnown) return -1;
        if (!aIsKnown && bIsKnown) return 1;
        return a.localeCompare(b);
      });
    
    return uniqueTypes;
  }, [courses]);

  // Fetch courses from Appwrite
  const fetchCoursesFromAppwrite = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch both courses and schedules in parallel
      const [coursesResponse, schedulesData] = await Promise.all([
        listDocuments(DATABASE_ID, COLLECTIONS.DANCE_CLASSES, [
          Query.orderAsc("name"), // Sorter alfabetisk
          Query.limit(40), // Begrens til 40 kurs
        ]),
        fetchSchedulesWithClasses()
      ]);

      const courseData = coursesResponse.documents as unknown as DanceClass[];
      setCourses(courseData);
      setSchedules(schedulesData);
    } catch (err) {
      console.error("Error fetching courses and schedules:", err);
      setError("Kunne ikke laste kurs og timeplan fra databasen.");
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
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">
            Laster kurs...
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
      <section
        className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                        dark:from-brand-900/10 dark:to-surface-dark-muted 
                        pt-24 pb-16 relative overflow-hidden"
      >
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
            <h1
              className="text-xl font-medium text-brand-600 dark:text-brand-400 
                          uppercase tracking-wider mb-3"
            >
              Våre kurs
            </h1>
            <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
              Finn din stil
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
              Fra energiske grooves til klassisk eleganse – vårt kursprogram er
              designet for å møte deg der du er og ta deg dit du vil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Section - Standard styling with filtering */}
      <section
        className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted 
                         dark:from-brand-900/10 dark:to-surface-dark-muted
                         overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-full">
          
          {/* Type Filter Controls - FIXED with proper grid system */}
          {availableTypes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 overflow-hidden"
            >
              {/* Grid container for consistent button sizes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 justify-center max-w-4xl mx-auto px-2 sm:px-0">
                {/* "Alle typer" button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="col-span-2 sm:col-span-1"
                >
                  <Button
                    onClick={() => setTypeFilter(null)}
                    className={`w-full h-10 sm:h-12 font-montserrat font-medium rounded-full transition-all duration-200 text-xs sm:text-sm px-3 py-2 flex items-center justify-center ${
                      !typeFilter
                        ? "bg-gray-800 dark:bg-white text-white dark:text-gray-900 shadow-brand"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    <span className="truncate">Alle typer ({courses.length})</span>
                  </Button>
                </motion.div>
                
                {/* Individual type filter buttons */}
                {availableTypes.map((displayType, index) => {
                  const typeColors = getCourseTypeColors(displayType);
                  const normalizedType = normalizeType(displayType);
                  
                  // Count courses with this normalized type
                  const typeCount = courses.filter(course => 
                    normalizeType(course.type) === normalizedType
                  ).length;

                  // Check if this type is currently selected
                  const isSelected = typeFilter && normalizeType(typeFilter) === normalizedType;

                  return (
                    <motion.div
                      key={normalizedType} // Use normalized type as key to avoid duplicates
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="flex"
                    >
                      <Button
                        onClick={() => setTypeFilter(displayType)}
                        className={`w-full h-10 sm:h-12 font-montserrat font-medium rounded-full transition-all duration-200 text-xs sm:text-sm px-3 py-2 flex items-center justify-center min-w-0 ${
                          isSelected
                            ? `${typeColors.color} ${typeColors.textColor} shadow-brand`
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        <span className="truncate">{typeColors.label} ({typeCount})</span>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Show active filter info */}
              {typeFilter && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-center mt-4 px-4"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-montserrat">
                    Viser <span className="font-semibold text-brand-600 dark:text-brand-400">
                      {filteredCourses.length}
                    </span> kurs av typen "{getCourseTypeColors(typeFilter).label}"
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              {typeFilter ? (
                <div>
                  <p className="text-gray-500 dark:text-gray-400 font-montserrat text-lg mb-4">
                    Ingen kurs funnet for typen "{getCourseTypeColors(typeFilter).label}".
                  </p>
                  <Button
                    onClick={() => setTypeFilter(null)}
                    className="border-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-600
                              dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-400
                              font-semibold rounded-full bg-transparent border-2"
                  >
                    Vis alle kurs
                  </Button>
                </div>
              ) : (
                <div>
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
              )}
            </div>
          ) : (
            <>
              {/* Decorative elements */}
              <div className="relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-magenta-400/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-coral-400/10 rounded-full blur-3xl" />

                {/* Course cards grid - FIXED for mobile responsiveness */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 relative z-10 w-full"
                >
                  {filteredCourses.map((course, index) => {
                    // Get real schedule data for this course
                    const courseSchedules = getSchedulesForCourse(course.name);
                    const formattedSchedule = formatScheduleForCard(courseSchedules);

                    return (
                      <motion.div
                        key={`${course.$id}-${typeFilter}`} // Include typeFilter in key for smooth transitions
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        layout // Add layout animation for smooth filtering
                        className="w-full min-w-0" // Ensure cards can shrink and don't overflow
                      >
                        <ClassCard
                          name={course.name}
                          description={course.description}
                          age={course.age}
                          color={course.color}
                          image={course.image}
                          schedule={formattedSchedule}
                          instructor={course.instructor}
                          studio={course.studio}
                        />
                      </motion.div>
                    );
                  })}
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