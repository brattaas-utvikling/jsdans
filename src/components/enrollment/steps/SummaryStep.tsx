// src/components/enrollment/steps/SummaryStep.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEnrollment } from '../../../contexts/EnrollmentContext';
import { formatSmartPrice } from '../../../utils/enchancedSmartPricing';

import { 
  CreditCard, 
  ArrowRight, 
  ArrowLeft, 
  User,
  Users,
  Calendar,
  Mail,
  Phone,
  Gift,
  AlertTriangle,
  CheckCircle,
  Edit3
} from 'lucide-react';
import { PricingPackage } from '@/types';

interface SummaryStepProps {
  packages: PricingPackage[];
}

export default function SummaryStep({ packages }: SummaryStepProps) {
  const { 
    state, 
    goToNextStep, 
    goToPreviousStep,
    calculatePricing,
    setStep
  } = useEnrollment();

  const [isFormValid, setIsFormValid] = useState(false);

  // Calculate pricing when component mounts or data changes
  useEffect(() => {
    if (state.enrollmentData.selectedCourses.length > 0 && packages.length > 0) {
      console.log('🧮 SummaryStep: Beregner priser automatisk');
      calculatePricing(packages);
    } else {
      console.warn('⚠️ SummaryStep: Kan ikke beregne priser', {
        courses: state.enrollmentData.selectedCourses.length,
        packages: packages.length
      });
    }
  }, [state.enrollmentData.selectedCourses, state.enrollmentData.isSecondDancerInFamily, packages, calculatePricing]);

  // Check if all required data is present
  useEffect(() => {
    const hasStudentInfo = !!state.enrollmentData.student.firstName && 
                          !!state.enrollmentData.student.lastName && 
                          !!state.enrollmentData.student.birthDate;
    const hasGuardianInfo = !!state.enrollmentData.guardian.name && 
                           !!state.enrollmentData.guardian.email && 
                           !!state.enrollmentData.guardian.phone;
    const hasCourses = state.enrollmentData.selectedCourses.length > 0;
    const hasPricing = state.enrollmentData.pricing !== null;

    // Debug logging
    console.log('🔍 Validation check:', {
      hasStudentInfo,
      hasGuardianInfo, 
      hasCourses,
      hasPricing,
      studentData: state.enrollmentData.student,
      guardianData: state.enrollmentData.guardian,
      coursesCount: state.enrollmentData.selectedCourses.length,
      pricing: state.enrollmentData.pricing
    });

    setIsFormValid(hasStudentInfo && hasGuardianInfo && hasCourses && hasPricing);
  }, [state.enrollmentData]);

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
  const pricing = state.enrollmentData.pricing;

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
                    {course.schedule && course.schedule[0] && (
                      <span>{course.schedule[0].day} - {course.schedule[0].time}</span>
                    )}
                  </div>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500 ml-4" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Summary or No Pricing Message */}
        {pricing ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: 0.4,
              ease: "easeOut"
            }}
            style={{ willChange: 'transform, opacity' }}
            className="bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-900/20 dark:to-emerald-900/10 p-6 rounded-xl border border-green-100/50 dark:border-green-700/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
              <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">
                Prissammendrag
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-montserrat text-gray-700 dark:text-gray-300">
                  Pakke: {pricing.packageName}
                </span>
                <span className="font-montserrat text-gray-900 dark:text-white">
                  {pricing.isToddlerPricing && <span className="text-xs text-purple-600 dark:text-purple-400 mr-2">(Småbarn)</span>}
                </span>
              </div>

              {pricing.originalPrice && pricing.originalPrice > pricing.total && (
                <div className="flex items-center justify-between text-sm">
                  <span className="font-montserrat text-gray-500 dark:text-gray-400 line-through">
                    Ordinær pris:
                  </span>
                  <span className="font-montserrat text-gray-500 dark:text-gray-400 line-through">
                    {formatSmartPrice(pricing.originalPrice)}
                  </span>
                </div>
              )}

              {pricing.breakdown.packageDiscount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="font-montserrat text-green-700 dark:text-green-400 flex items-center gap-2">
                    <Gift className="h-3 w-3" />
                    Pakkerabatt:
                  </span>
                  <span className="font-montserrat text-green-700 dark:text-green-400">
                    -{formatSmartPrice(pricing.breakdown.packageDiscount)}
                  </span>
                </div>
              )}

              {state.enrollmentData.isSecondDancerInFamily && pricing.appliedFamilyDiscount && (
                <div className="flex items-center justify-between text-sm">
                  <span className="font-montserrat text-purple-700 dark:text-purple-400 flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    Familierabatt:
                  </span>
                  <span className="font-montserrat text-purple-700 dark:text-purple-400">
                    -{formatSmartPrice(pricing.appliedFamilyDiscount)}
                  </span>
                </div>
              )}

              <div className="border-t border-green-200 dark:border-green-700/50 pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-bebas text-bebas-sm text-gray-900 dark:text-white">
                    Totalt å betale:
                  </span>
                  <span className="font-bebas text-bebas-base text-green-700 dark:text-green-400">
                    {formatSmartPrice(pricing.total)}
                  </span>
                </div>
              </div>
            </div>

            {state.enrollmentData.isSecondDancerInFamily && (
              <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <p className="text-xs text-purple-700 dark:text-purple-300 font-montserrat flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  Familierabatt er aktivert for barn nummer 2+ i familien
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: 0.4,
              ease: "easeOut"
            }}
            style={{ willChange: 'transform, opacity' }}
            className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h3 className="font-bebas text-bebas-base text-amber-800 dark:text-amber-200">
                Prisberegning mangler
              </h3>
            </div>
            <p className="text-amber-700 dark:text-amber-300 font-montserrat text-sm mb-3">
              Vi kunne ikke beregne prisen for dine valgte kurs. Dette kan skje hvis:
            </p>
            <ul className="text-amber-700 dark:text-amber-300 font-montserrat text-sm space-y-1 ml-4">
              <li>• Prispakkene ikke er lastet enda ({packages.length} pakker tilgjengelig)</li>
              <li>• Kurs er ikke valgt ({state.enrollmentData.selectedCourses.length} kurs valgt)</li>
              <li>• Det er en teknisk feil i prisberegningen</li>
            </ul>
            <p className="text-amber-700 dark:text-amber-300 font-montserrat text-sm mt-3">
              <strong>Løsning:</strong> Gå tilbake til kursvalg-steget og velg kursene på nytt.
            </p>
            <Button
              onClick={() => calculatePricing(packages)}
              variant="outline"
              size="sm"
              className="mt-3 text-amber-700 border-amber-300 hover:bg-amber-100"
            >
              Prøv å beregne på nytt
            </Button>
          </motion.div>
        )}

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.5,
            ease: "easeOut"
          }}
          style={{ willChange: 'transform, opacity' }}
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h4 className="font-bebas text-bebas-sm text-amber-800 dark:text-amber-200 mb-1">
                Viktig informasjon
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Vennligst les nøye gjennom all informasjon før du fullfører påmeldingen.
              </p>
            </div>
          </div>
        </motion.div>
        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousStep}
            className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tilbake
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isFormValid}
            className={`font-semibold ${isFormValid ? 'bg-brand-600 hover:bg-brand-700 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
          >
            Fullfør påmelding
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}