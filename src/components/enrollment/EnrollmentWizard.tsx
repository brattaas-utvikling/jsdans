// src/components/enrollment/EnrollmentWizard.tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnrollment } from '../../contexts/EnrollmentContext';
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from '../../lib/appwrite';
import ScrollToTop from '../../helpers/ScrollToTop';
import StepIndicator from './StepIndicator';
import ContactInfoStep from './steps/ContactInfoStep';
import CourseSelectionStep from './steps/CourseSelectionStep';
import SummaryStep from './steps/SummaryStep';
import ConfirmationStep from './steps/ConfirmationStep';
import type { DanceClass } from '../../types';

export default function EnrollmentWizard() {
  const { state, dispatch } = useEnrollment();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch courses only - no pricing packages needed
        const coursesResponse = await listDocuments(
          DATABASE_ID,
          COLLECTIONS.DANCE_CLASSES,
          [
            Query.orderAsc('name'),
            Query.limit(50)
          ]
        );

        const courseData = coursesResponse.documents as unknown as DanceClass[];
        dispatch({ type: 'SET_AVAILABLE_COURSES', payload: courseData });

        console.log('✅ Lastet kurs:', courseData.length);

      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Kunne ikke laste kursdata. Prøv å oppdatere siden.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [dispatch]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50/80 to-surface-muted 
                     dark:from-brand-900/10 dark:to-surface-dark-muted 
                     pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">
            Laster påmeldingsskjema...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50/80 to-surface-muted 
                     dark:from-brand-900/10 dark:to-surface-dark-muted 
                     pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h2 className="font-bebas text-bebas-lg text-red-800 dark:text-red-200 mb-2">
              Noe gikk galt
            </h2>
            <p className="text-red-600 dark:text-red-300 font-montserrat mb-4">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="font-semibold bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Prøv igjen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Animation variants for step transitions
  const stepVariants = {
    enter: {
      x: 50,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: -50,
      opacity: 0,
    },
  };

  // Render current step component
  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 'contact':
        return <ContactInfoStep key="contact" />;
      case 'courses':
        return <CourseSelectionStep key="courses" />;
      case 'summary':
        return <SummaryStep key="summary" />;
      case 'confirmation':
        return <ConfirmationStep key="confirmation" />;
      default:
        return <ContactInfoStep key="contact" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50/80 to-surface-muted 
                   dark:from-brand-900/10 dark:to-surface-dark-muted">
      <ScrollToTop />
  
      {/* Hero Section */}
      <section className="pt-24 pb-8 relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-xl font-medium text-brand-600 dark:text-brand-400 
                          uppercase tracking-wider mb-3">
              PÅMELDING
            </h1>
            <h2 className="font-bebas font-semibold text-bebas-2xl md:text-bebas-3xl mb-6 
                          text-transparent bg-clip-text bg-sunset-gradient py-2">
              Åpent for påmelding!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed mb-8">
              Meld deg på våre kurs i bare noen få enkle steg. Vi guider deg gjennom hele prosessen.
            </p>

            {/* Ny linje for "Oppstart uke 35!" med border */}
            <div className="bg-magenta-100 dark:bg-magenta-900/20 text-magenta-600 dark:text-magenta-300 font-bold text-xl py-2 px-4 rounded-md mb-6 border border-magenta-300 dark:border-magenta-700">
              Oppstart 24. august!
            </div>

            {/* Step Indicator */}
            <StepIndicator currentStep={state.currentStep} />
          </motion.div>
        </div>
      </section>


      {/* Main Content - Step Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="bg-white dark:bg-surface-dark rounded-2xl shadow-brand-lg 
                          border border-brand-100/50 dark:border-brand-700/30 
                          overflow-hidden relative"
              >
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 to-transparent 
                               dark:from-brand-900/10 dark:to-transparent pointer-events-none" />
                
                {/* Step content */}
                <div className="relative z-10">
                  {renderCurrentStep()}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-coral-400/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-400/5 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}