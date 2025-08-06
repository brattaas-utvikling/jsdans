// src/components/enrollment/steps/CourseSelectionStep.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useEnrollment } from '../../../contexts/EnrollmentContext';
import { coursesService } from '../../../services/coursesService';
import { identifyCourseType } from '../../../utils/simplePricing';
import { 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  Info, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Heart,
  User,
  CheckCircle,
  AlertCircle,
  Tag,
  RefreshCw,
  Loader2
} from 'lucide-react';
import type { DanceClass } from '../../../types';

export default function CourseSelectionStep() {
  const { 
    state, 
    setSelectedCourses, 
    goToNextStep, 
    goToPreviousStep,
    validateCurrentStep,
    currentPricing,
    dispatch
  } = useEnrollment();

  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>(
    state.enrollmentData.selectedCourses.map(course => course.$id)
  );
  const [modalCourse, setModalCourse] = useState<DanceClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  // Calculate student age for validation
  const studentAge = state.enrollmentData.student.age || 0;

  // 🔄 Backup: Re-load courses if they're missing
  useEffect(() => {
    const ensureCoursesLoaded = async () => {
      // If no courses available and not already loading, try to reload them
      if (state.availableCourses.length === 0 && !state.isLoading && !isReloading) {
        console.log('🚨 No courses available in CourseSelection, attempting to reload...');
        setIsReloading(true);
        dispatch({ type: 'SET_LOADING', payload: true });
        
        try {
          const courses = await coursesService.getAllCourses();
          console.log(`🔄 Re-loaded courses in CourseSelection: ${courses.length}`);
          dispatch({ type: 'SET_AVAILABLE_COURSES', payload: courses });
          
          // Clear any previous error
          if (state.errors.courses) {
            dispatch({ 
              type: 'SET_ERRORS', 
              payload: { ...state.errors, courses: undefined } 
            });
          }
        } catch (error) {
          console.error('❌ Failed to reload courses in CourseSelection:', error);
          dispatch({ 
            type: 'SET_ERRORS', 
            payload: { 
              ...state.errors,
              courses: 'Kunne ikke laste kurs. Prøv å oppdatere siden eller gå tilbake og frem igjen.' 
            } 
          });
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false });
          setIsReloading(false);
        }
      }
    };

    ensureCoursesLoaded();
  }, [state.availableCourses.length, state.isLoading, isReloading, dispatch, state.errors]);

  // Manual reload function
  const handleReloadCourses = async () => {
    console.log('🔄 Manual course reload triggered...');
    setIsReloading(true);
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const courses = await coursesService.getAllCourses();
      console.log(`✅ Manually reloaded courses: ${courses.length}`);
      dispatch({ type: 'SET_AVAILABLE_COURSES', payload: courses });
      dispatch({ 
        type: 'SET_ERRORS', 
        payload: { ...state.errors, courses: undefined } 
      });
    } catch (error) {
      console.error('❌ Manual course reload failed:', error);
      dispatch({ 
        type: 'SET_ERRORS', 
        payload: { 
          ...state.errors,
          courses: 'Kunne ikke laste kurs. Sjekk internettforbindelsen og prøv igjen.' 
        } 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      setIsReloading(false);
    }
  };

  // Update selected courses when selection changes
  useEffect(() => {
    const selectedCourses = state.availableCourses.filter(course => 
      selectedCourseIds.includes(course.$id)
    );
    
    // Only update if the selection actually changed
    const currentSelectedIds = state.enrollmentData.selectedCourses.map(c => c.$id).sort();
    const newSelectedIds = selectedCourses.map(c => c.$id).sort();
    
    if (JSON.stringify(currentSelectedIds) !== JSON.stringify(newSelectedIds)) {
      setSelectedCourses(selectedCourses);
    }
  }, [selectedCourseIds, state.availableCourses, state.enrollmentData.selectedCourses, setSelectedCourses]);

  // Check if form is valid
  useEffect(() => {
    setIsFormValid(selectedCourseIds.length > 0);
  }, [selectedCourseIds]);

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourseIds(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      goToNextStep();
    }
  };

  const openCourseModal = (course: DanceClass) => {
    setModalCourse(course);
    setIsModalOpen(true);
  };

  const closeCourseModal = () => {
    setIsModalOpen(false);
    setModalCourse(null);
  };

  // Get age validation for a course - only warn if too young
  const getCourseAgeValidation = (course: DanceClass) => {
    if (!studentAge) return { valid: true, warning: false, message: "" };
    
    const ageRange = course.age.trim(); // Remove extra spaces
    let isAgeMatch = false;
    let warning = false;
    let message = "";
    
    // Age matching logic with all your formats
    if (ageRange === "3-4 år" || ageRange === "3-4") {
      isAgeMatch = studentAge >= 3 && studentAge <= 4;
      if (studentAge < 3) {
        warning = true;
        message = `Dette kurset er for barn 3-4 år. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else if (ageRange === "3-5 år" || ageRange === "3-5") {
      isAgeMatch = studentAge >= 3 && studentAge <= 5;
      if (studentAge < 3) {
        warning = true;
        message = `Dette kurset er for barn 3-5 år. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else if (ageRange === "4-6 år" || ageRange === "4-6") {
      isAgeMatch = studentAge >= 4 && studentAge <= 6;
      if (studentAge < 4) {
        warning = true;
        message = `Dette kurset er for barn 4-6 år. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else if (ageRange === "5-6 år" || ageRange === "5-6") {
      isAgeMatch = studentAge >= 5 && studentAge <= 6;
      if (studentAge < 5) {
        warning = true;
        message = `Dette kurset er for barn 5-6 år. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else if (ageRange === "6-8 år" || ageRange === "6-8") {
      isAgeMatch = studentAge >= 6 && studentAge <= 8;
      if (studentAge < 6) {
        warning = true;
        message = `Dette kurset er for barn 6-8 år. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else if (ageRange === "6-9 år" || ageRange === "6-9") {
      isAgeMatch = studentAge >= 6 && studentAge <= 9;
      if (studentAge < 6) {
        warning = true;
        message = `Dette kurset er for barn 6-9 år. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else if (ageRange === "8+ år" || ageRange === "8+") {
      isAgeMatch = studentAge === 8;
      if (studentAge < 8) {
        warning = true;
        message = `Dette kurset er spesielt for 8-åringer. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else if (ageRange === "9+ år" || ageRange === "9+") {
      isAgeMatch = studentAge >= 9 && studentAge <= 11;
      if (studentAge < 9) {
        warning = true;
        message = `Dette kurset er for barn 9-11 år. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else if (ageRange === "10+ år" || ageRange === "10+") {
      isAgeMatch = studentAge >= 10 && studentAge <= 11;
      if (studentAge < 10) {
        warning = true;
        message = `Dette kurset er for barn 10-11 år. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else if (ageRange === "12+ år" || ageRange === "12+") {
      isAgeMatch = studentAge >= 12;
      if (studentAge < 12) {
        warning = true;
        message = `Dette kurset er for barn 12+ år. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else if (ageRange === "13+" || ageRange === "13+ år") {
      isAgeMatch = studentAge >= 13;
      if (studentAge < 13) {
        warning = true;
        message = `Dette kurset er for ungdom 13+ år. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else if (ageRange === "16+ år" || ageRange === "16+") {
      isAgeMatch = studentAge >= 16;
      if (studentAge < 16) {
        warning = true;
        message = `Dette kurset er for ungdom/voksne 16+ år. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else if (ageRange.includes("trinn") || ageRange.includes("Trinn")) {
      // Handle "fra 5. trinn" format - assume it's appropriate for older students
      isAgeMatch = studentAge >= 10; // 5. trinn = ca 10-11 år
      if (studentAge < 10) {
        warning = true;
        message = `Dette kurset er for elever fra 5. trinn. Eleven din er ${studentAge} år og kan være for ung.`;
      }
    } else {
      console.log(`⚠️ Ukjent aldersformat: "${ageRange}" for klasse ${course.name}`);
      // Allow selection for unknown formats, just don't show warning
      isAgeMatch = true; // Don't block unknown formats
    }
    
    return { valid: true, warning, message, isAgeMatch };
  };

  // Get color classes for course card
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      red: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950/50 dark:border-red-800 dark:text-red-200',
      orange: 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950/50 dark:border-orange-800 dark:text-orange-200',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950/50 dark:border-yellow-800 dark:text-yellow-200',
      green: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950/50 dark:border-green-800 dark:text-green-200',
      blue: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-200',
      purple: 'bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950/50 dark:border-purple-800 dark:text-purple-200',
      pink: 'bg-pink-50 border-pink-200 text-pink-800 dark:bg-pink-950/50 dark:border-pink-800 dark:text-pink-200',
      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-200',
    };
    
    return colorMap[color.toLowerCase()] || colorMap.purple;
  };

  // Get course type label and color for display
  const getCourseTypeInfo = (course: DanceClass) => {
    const type = identifyCourseType(course);
    
    switch (type) {
      case 'barnedans':
        return { label: 'Barnedans', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' };
      case 'kompani':
        return { label: 'Kompani', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' };
      case 'vanlig':
        return { label: 'Vanlig kurs', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' };
      default:
        return { label: 'Ukjent', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200' };
    }
  };

  // 🔄 Show loading state when courses are being loaded/reloaded
  if (state.isLoading || isReloading) {
    return (
      <div className="p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-brand-100 dark:bg-brand-900/30 p-4 rounded-full">
              <Loader2 className="h-8 w-8 text-brand-600 dark:text-brand-400 animate-spin" />
            </div>
          </div>
          
          <h2 className="font-bebas text-bebas-xl text-gray-900 dark:text-white mb-4">
            {isReloading ? 'Laster kurs på nytt...' : 'Laster kurs...'}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">
            Henter tilgjengelige dansetimer for deg
          </p>
        </motion.div>
      </div>
    );
  }

  // 🚨 Show error if no courses and not loading
  if (state.availableCourses.length === 0) {
    return (
      <div className="p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md mx-auto">
            <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
            
            <h3 className="font-bebas text-bebas-base text-red-800 dark:text-red-200 mb-2">
              Kunne ikke laste kurs
            </h3>
            
            <p className="text-red-600 dark:text-red-300 font-montserrat mb-4 text-sm">
              {state.errors.courses || 'Noe gikk galt ved innlasting av kurs. Dette kan skyldes nettverksproblemer.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleReloadCourses}
                disabled={isReloading}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-montserrat"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isReloading ? 'animate-spin' : ''}`} />
                Prøv igjen
              </Button>
              
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="px-4 py-2 rounded-lg font-montserrat border-red-300 text-red-600 hover:bg-red-50"
              >
                Oppdater siden
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800">
              <Button
                onClick={goToPreviousStep}
                variant="ghost"
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Gå tilbake til kontaktinfo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4,
          ease: "easeOut"
        }}
        style={{ willChange: 'transform, opacity' }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-full">
            <BookOpen className="h-6 w-6 text-brand-600 dark:text-brand-400" />
          </div>
        </div>
        <h2 className="font-bebas text-bebas-xl text-gray-900 dark:text-white mb-2">
          Velg kurs
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-montserrat">
          Velg de kursene <span className="font-bold text-brand-600 dark:text-brand-400">{state.enrollmentData.student.firstName}</span> ønsker å delta på:
        </p>
        {studentAge > 0 && (
          <p className="text-sm text-brand-600 dark:text-brand-400 font-montserrat mt-1">
            Viser kurs passende for {studentAge} år
          </p>
        )}
      </motion.div>

      {/* Price preview */}
      {currentPricing && selectedCourseIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.1,
            ease: "easeOut"
          }}
          style={{ willChange: 'transform, opacity' }}
          className="mb-6"
        >
          <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/10 p-4 rounded-xl border border-green-100/50 dark:border-green-700/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bebas text-bebas-sm text-gray-900 dark:text-white mb-1">
                  Estimert pris
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-montserrat">
                  {currentPricing.breakdown.barnedansCount > 0 && `${currentPricing.breakdown.barnedansCount} barnedans, `}
                  {currentPricing.breakdown.vanligCount > 0 && `${currentPricing.breakdown.vanligCount} vanlig kurs, `}
                  {currentPricing.breakdown.kompaniCount > 0 && `${currentPricing.breakdown.kompaniCount} kompani`}
                </p>
              </div>
              <div className="text-right">
                <div className="font-bebas text-bebas-base text-green-700 dark:text-green-400">
                  {currentPricing.totalPrice.toLocaleString('no-NO')} kr
                </div>
                {(currentPricing.discount > 0) && (
                    <div className="text-xs text-green-600 dark:text-green-400">
                    Besparelse: {currentPricing.discount.toLocaleString('no-NO')} kr
                    </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Course selection */}
      <div className="space-y-6">
        {/* Available courses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">
              Tilgjengelige kurs ({state.availableCourses.length})
            </h3>
            
            {/* Manual reload button */}
            <Button
              onClick={handleReloadCourses}
              disabled={isReloading}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isReloading ? 'animate-spin' : ''}`} />
              Oppdater
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.availableCourses.map((course, index) => {
              const isSelected = selectedCourseIds.includes(course.$id);
              const ageValidation = getCourseAgeValidation(course);
              const colorClasses = getColorClasses(course.color);
              const typeInfo = getCourseTypeInfo(course);
              
              return (
                <motion.div
                  key={course.$id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.05 * index,
                    ease: "easeOut"
                  }}
                  style={{ willChange: 'transform, opacity' }}
                  className={
                    isSelected 
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 border-2 rounded-xl p-4 transition-all duration-200 cursor-pointer' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-600 border-2 rounded-xl p-4 transition-all duration-200 cursor-pointer'
                  }
                  onClick={() => handleCourseToggle(course.$id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={
                          isSelected 
                            ? 'bg-brand-500 border-brand-500 w-4 h-4 rounded border-2 flex items-center justify-center' 
                            : 'border-gray-300 dark:border-gray-600 w-4 h-4 rounded border-2 flex items-center justify-center'
                        }>
                          {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                        </div>
                        <h4 className="font-bebas text-bebas-sm text-gray-900 dark:text-white">
                          {course.name}
                        </h4>
                        {ageValidation.warning && (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>

                      {/* Course type badge */}
                      <div className="mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                          <Tag className="h-3 w-3" />
                          {typeInfo.label}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 font-montserrat mb-3 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-montserrat">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{course.age}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{course.instructor}</span>
                        </div>
                      </div>

                      {ageValidation.warning && (
                        <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
                          <p className="text-xs text-amber-700 dark:text-amber-300 font-montserrat">
                            <AlertCircle className="h-3 w-3 inline mr-1" />
                            {ageValidation.message}
                          </p>
                        </div>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openCourseModal(course);
                      }}
                      className="ml-3 text-xs"
                    >
                      <Info className="h-3 w-3 mr-1" />
                      Info
                    </Button>
                  </div>

                  {/* Course schedule preview */}
                  {course.schedule && course.schedule.length > 0 && (
                    <div className={`mt-3 p-2 rounded border ${colorClasses}`}>
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className="h-3 w-3" />
                        <span className="font-medium">{course.schedule[0].day}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{course.schedule[0].time}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected courses summary */}
        {selectedCourseIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
            style={{ willChange: 'transform, opacity' }}
            className="bg-gradient-to-br from-brand-50/50 to-coral-50/30 dark:from-brand-900/20 dark:to-coral-900/10 p-4 rounded-xl border border-brand-100/50 dark:border-brand-700/30"
          >
            <h4 className="font-bebas text-bebas-sm text-gray-900 dark:text-white mb-2">
              Valgte kurs ({selectedCourseIds.length})
            </h4>
            <div className="space-y-2">
              {state.enrollmentData.selectedCourses.map(course => (
                <div key={course.$id} className="flex items-center justify-between text-sm">
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">
                    {course.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCourseToggle(course.$id)}
                    className="text-red-600 hover:text-red-700 text-xs p-1 h-auto"
                  >
                    Fjern
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Error display */}
        {state.errors.courses && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-300 font-montserrat text-sm">
              {state.errors.courses}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: 0.2,
          ease: "easeOut"
        }}
        style={{ willChange: 'transform, opacity' }}
        className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200 dark:border-gray-700"
      >
        <Button
          onClick={goToPreviousStep}
          variant="outline"
          className="px-6 py-3 rounded-full font-montserrat font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tilbake
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className={
            isFormValid 
              ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-brand-lg hover:shadow-brand-xl transform hover:scale-[1.02] px-8 py-3 rounded-full font-semibold font-montserrat text-base transition-all duration-200 flex items-center gap-2' 
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed px-8 py-3 rounded-full font-semibold font-montserrat text-base transition-all duration-200 flex items-center gap-2'
          }
        >
          Neste steg
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Course Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {modalCourse && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bebas text-gray-900 dark:text-white">
                  {modalCourse.name}
                </DialogTitle>
                <DialogDescription className="text-base text-start mt-2 font-montserrat text-gray-600 dark:text-gray-300">
                  {modalCourse.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Course Image */}
                {modalCourse.image && (
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <img
                      src={modalCourse.image}
                      alt={modalCourse.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Course Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-surface-dark-muted rounded-lg">
                    <User className="h-5 w-5 text-brand-500" />
                    <div>
                      <div className="font-montserrat font-semibold text-gray-900 dark:text-white">Instruktør</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 font-montserrat">{modalCourse.instructor}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-surface-dark-muted rounded-lg">
                    <Users className="h-5 w-5 text-brand-500" />
                    <div>
                      <div className="font-montserrat font-semibold text-gray-900 dark:text-white">Alder</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 font-montserrat">{modalCourse.age}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-surface-dark-muted rounded-lg">
                    <Tag className="h-5 w-5 text-brand-500" />
                    <div>
                      <div className="font-montserrat font-semibold text-gray-900 dark:text-white">Type</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 font-montserrat">
                        {getCourseTypeInfo(modalCourse).label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* What you learn */}
                <div className="bg-gradient-to-br from-brand-50/50 to-coral-50/30 dark:from-brand-900/20 dark:to-coral-900/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-brand-500" />
                    <span className="font-montserrat font-semibold text-gray-700 dark:text-gray-200">Hva du lærer:</span>
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 font-montserrat">
                    <li>• Grunnleggende teknikker og bevegelser</li>
                    <li>• Rytme og musikktolkning</li>
                    <li>• Selvtillit og kroppsbeherskelse</li>
                    <li>• Kreativt uttrykk og improvisasjon</li>
                  </ul>
                </div>

                {/* Schedule */}
                {modalCourse.schedule && modalCourse.schedule.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bebas mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      <Calendar className="h-5 w-5 text-brand-500" />
                      Timeplan
                    </h3>
                    <div className="space-y-3">
                      {modalCourse.schedule.map((session, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-4 bg-gray-50 dark:bg-surface-dark-muted rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-gray-700 dark:text-gray-200 font-montserrat font-semibold">{session.day}</div>
                            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                              <Clock className="h-4 w-4" />
                              <span className="font-montserrat">{session.time}</span>
                            </div>
                          </div>
                          {modalCourse.studio && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-300 font-montserrat">{modalCourse.studio}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button 
                  onClick={closeCourseModal}
                  variant="outline"
                  className="font-montserrat"
                >
                  Lukk
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}