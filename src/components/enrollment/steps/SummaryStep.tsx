// src/components/enrollment/steps/SummaryStep.tsx
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEnrollment } from '../../../contexts/EnrollmentContext';
import { 
  CreditCard, 
  ArrowRight, 
  ArrowLeft, 
  User,
  Users,
  Calendar,
  Mail,
  Phone,
  CheckCircle,
  Edit3,
} from 'lucide-react';
import ScrollToTop from '@/helpers/ScrollToTop';

export default function SummaryStep() {
  const { 
    state, 
    goToNextStep, 
    goToPreviousStep,
    setStep,
    currentPricing,
    isFormValid
  } = useEnrollment();

  const handleNext = () => {
    goToNextStep();
  };

  const handleEditSection = (step: 'contact' | 'courses') => {
    setStep(step);
  };

  // Calculate age for display
  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const studentAge = calculateAge(state.enrollmentData.student.birthDate);

  return (
    <div className="p-8 md:p-12">
      <ScrollToTop />
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
            <CreditCard className="h-6 w-6 text-brand-600 dark:text-brand-400" />
          </div>
        </div>
        <h2 className="font-bebas text-bebas-xl text-gray-900 dark:text-white mb-2">
          Sammendrag
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-montserrat">
          Se over informasjonen før du fullfører påmeldingen
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Student Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.1,
            ease: "easeOut"
          }}
          style={{ willChange: 'transform, opacity' }}
          className="bg-gradient-to-br from-brand-50/50 to-coral-50/30 dark:from-brand-900/20 dark:to-coral-900/10 p-6 rounded-xl border border-brand-100/50 dark:border-brand-700/30"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">
                Eleven
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditSection('contact')}
              className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 text-xs"
            >
              <Edit3 className="h-3 w-3 mr-1" />
              Endre
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Navn
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white">
                {state.enrollmentData.student.firstName} {state.enrollmentData.student.lastName}
              </p>
            </div>
            <div>
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Fødselsdato
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white">
                {new Date(state.enrollmentData.student.birthDate).toLocaleDateString('no-NO')}
              </p>
            </div>
            <div>
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Alder
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white">
                {studentAge} år
              </p>
            </div>
          </div>
        </motion.div>

        {/* Guardian Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.2,
            ease: "easeOut"
          }}
          style={{ willChange: 'transform, opacity' }}
          className="bg-gradient-to-br from-magenta-50/50 to-coral-50/30 dark:from-magenta-900/20 dark:to-coral-900/10 p-6 rounded-xl border border-magenta-100/50 dark:border-magenta-700/30"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-magenta-600 dark:text-magenta-400" />
              <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">
                Kontaktperson
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditSection('contact')}
              className="text-magenta-600 hover:text-magenta-700 dark:text-magenta-400 dark:hover:text-magenta-300 text-xs"
            >
              <Edit3 className="h-3 w-3 mr-1" />
              Endre
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Navn
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white">
                {state.enrollmentData.guardian.name}
              </p>
            </div>
            <div>
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                E-post
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white flex items-center gap-2">
                <Mail className="h-3 w-3 text-gray-500" />
                {state.enrollmentData.guardian.email}
              </p>
            </div>
            <div>
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Telefon
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white flex items-center gap-2">
                <Phone className="h-3 w-3 text-gray-500" />
                {state.enrollmentData.guardian.phone}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Selected Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.3,
            ease: "easeOut"
          }}
          style={{ willChange: 'transform, opacity' }}
          className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">
                Valgte kurs ({state.enrollmentData.selectedCourses.length})
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditSection('courses')}
              className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 text-xs"
            >
              <Edit3 className="h-3 w-3 mr-1" />
              Endre
            </Button>
          </div>

          <div className="space-y-3">
            {state.enrollmentData.selectedCourses.map((course) => (
              <div
                key={course.$id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-dark-muted rounded-lg border border-gray-100 dark:border-gray-600"
              >
                <div className="flex-1">
                  <h4 className="font-bebas text-bebas-sm text-gray-900 dark:text-white">
                    {course.name}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-montserrat mt-1">
                    <span>Alder: {course.age}</span>
                    <span>Instruktør: {course.instructor}</span>
                  </div>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500 ml-4" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Error display */}
        {!isFormValid && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-montserrat font-semibold text-red-800 dark:text-red-200 mb-2">
              Noe mangler i påmeldingen:
            </h4>
            <ul className="text-red-600 dark:text-red-300 font-montserrat text-sm space-y-1">
              {(!state.enrollmentData.student.firstName || !state.enrollmentData.student.lastName || !state.enrollmentData.student.birthDate) && (
                <li>• Elevens informasjon er ikke fullstendig</li>
              )}
              {(!state.enrollmentData.guardian.name || !state.enrollmentData.guardian.email || !state.enrollmentData.guardian.phone) && (
                <li>• Kontaktpersonens informasjon er ikke fullstendig</li>
              )}
              {state.enrollmentData.selectedCourses.length === 0 && (
                <li>• Ingen kurs er valgt</li>
              )}
              {!currentPricing && (
                <li>• Prisberegning mangler</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: 0.6,
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
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] px-8 py-3 rounded-full font-semibold font-montserrat text-base transition-all duration-200 flex items-center gap-2' 
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed px-8 py-3 rounded-full font-semibold font-montserrat text-base transition-all duration-200 flex items-center gap-2'
          }
        >
          Fullfør påmelding
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}