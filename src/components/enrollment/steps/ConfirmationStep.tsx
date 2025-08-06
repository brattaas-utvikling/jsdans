// src/components/enrollment/steps/ConfirmationStep.tsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEnrollment } from '../../../contexts/EnrollmentContext';
import { submitEnrollment } from '../../../services/enrollmentService';
import { 
  CheckCircle, 
  AlertTriangle, 
  Loader2,
  Mail,
  Database,
  ArrowRight,
  Home,
  RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/helpers/ScrollToTop';

type SubmissionState = 'submitting' | 'success' | 'error' | 'idle';

export default function ConfirmationStep() {
  const { state, resetEnrollment, dispatch } = useEnrollment();
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [enrollmentId, setEnrollmentId] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  // Prevent double submissions with ref
  const submissionAttempted = useRef(false);
  const abortController = useRef<AbortController | null>(null);

  // Auto-submit when component mounts (only once)
  useEffect(() => {
    if (!submissionAttempted.current && submissionState === 'idle') {
      console.log('🚀 Auto-submitting enrollment...');
      submissionAttempted.current = true;
      handleSubmission();
    }

    // Cleanup on unmount
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []); // Empty dependency array - only run once on mount

  const handleSubmission = async () => {
    // Prevent multiple concurrent submissions
    if (submissionState === 'submitting') {
      console.log('⚠️ Submission already in progress, ignoring...');
      return;
    }
    
    setSubmissionState('submitting');
    
    // Create abort controller for this submission
    abortController.current = new AbortController();
    
    try {
      console.log('📝 Starting enrollment submission...');
      dispatch({ type: 'SET_SUBMITTING', payload: true });
      
      // Submit enrollment
      const id = await submitEnrollment(state.enrollmentData);
      
      // ✅ VIKTIG: Hvis database lagring lykkes, vis success uansett om component unmountes
      console.log('✅ Enrollment submitted successfully:', id);
      setEnrollmentId(id);
      setSubmissionState('success');
      
      // E-post sending skjer i bakgrunnen og påvirker ikke success state
      
    } catch (err) {
      // Check if component was unmounted BARE for errors
      if (abortController.current?.signal.aborted) {
        console.log('🛑 Submission cancelled (component unmounted)');
        return;
      }
      
      console.error('❌ Submission error:', err);
      setError(err instanceof Error ? err.message : 'Ukjent feil oppstod');
      setSubmissionState('error');
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  const handleRetry = () => {
    console.log('🔄 Retrying submission...');
    setError('');
    setSubmissionState('idle');
    submissionAttempted.current = false; // Reset for retry
  };

  const handleNewEnrollment = () => {
    console.log('🆕 Starting new enrollment...');
    submissionAttempted.current = false; // Reset for new enrollment
    resetEnrollment();
  };

  // Submitting state
  if (submissionState === 'submitting') {
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
            Sender påmelding...
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-8">
            Vi behandler påmeldingen din. Dette tar bare noen sekunder.
          </p>

          <div className="max-w-md mx-auto space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            >
              <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-montserrat text-blue-800 dark:text-blue-200">
                Lagrer i database...
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
            >
              <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-montserrat text-green-800 dark:text-green-200">
                Sender e-post...
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Success state
  if (submissionState === 'success') {
    return (
      <div className="p-8 md:p-12">
        <ScrollToTop />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-bebas text-bebas-2xl text-gray-900 dark:text-white mb-4"
          >
            Påmelding fullført!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 font-montserrat mb-6"
          >
            Takk for at du meldte deg på våre kurs, {state.enrollmentData.student.firstName}!
          </motion.p>

          {/* Success details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/10 p-6 rounded-xl border border-green-100/50 dark:border-green-700/30">
              <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white mb-4">
                Hva skjer nå?
              </h3>
              
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <p className="font-montserrat font-medium text-gray-900 dark:text-white">
                      Påmeldingen er lagret
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-montserrat">
                      Referanse: {enrollmentId.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="font-montserrat font-medium text-gray-900 dark:text-white">
                      E-post sendt til studio
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-montserrat">
                      Vi har mottatt påmeldingen din og tar kontakt snart
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <p className="font-montserrat font-medium text-gray-900 dark:text-white">
                      Bekreftelse kommer
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-montserrat">
                      Du vil få en e-post med betalingsinformasjon og kursdetaljer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h4 className="font-bebas text-bebas-sm text-gray-900 dark:text-white mb-2">
                Påmeldt til
              </h4>
              <div className="space-y-1">
                {state.enrollmentData.selectedCourses.map(course => (
                  <p key={course.$id} className="text-sm font-montserrat text-gray-600 dark:text-gray-300">
                    • {course.name}
                  </p>
                ))}
              </div>
              {state.enrollmentData.pricing && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-montserrat text-gray-900 dark:text-white">
                    <strong>Total: {state.enrollmentData.pricing.totalPrice.toLocaleString('no-NO')} kr</strong>
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full px-6 py-3 rounded-full font-montserrat font-medium"
              >
                <Home className="h-4 w-4 mr-2" />
                Tilbake til forsiden
              </Button>
            </Link>
            
            <Button
              onClick={handleNewEnrollment}
              className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-full font-montserrat font-medium"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Ny påmelding
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (submissionState === 'error') {
    return (
      <div className="p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          
          <h2 className="font-bebas text-bebas-xl text-gray-900 dark:text-white mb-4">
            Noe gikk galt
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-6">
            Vi klarte ikke å sende inn påmeldingen din. Prøv igjen eller kontakt oss direkte.
          </p>

          {/* Error details */}
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <p className="text-sm text-red-700 dark:text-red-300 font-montserrat">
                <strong>Feilmelding:</strong> {error}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleRetry}
              className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-full font-montserrat font-medium"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Prøv igjen
            </Button>
            
            <Link to="/kontakt" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full px-6 py-3 rounded-full font-montserrat font-medium"
              >
                <Mail className="h-4 w-4 mr-2" />
                Kontakt oss
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // This should not be reached, but just in case
  return null;
} 