// src/components/enrollment/StepIndicator.tsx
import { motion } from 'framer-motion';
import { Check, User, BookOpen, CreditCard, CheckCircle } from 'lucide-react';
import type { EnrollmentStep } from '../../types/enrollment';

interface StepIndicatorProps {
  currentStep: EnrollmentStep;
}

interface StepInfo {
  key: EnrollmentStep;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: StepInfo[] = [
  {
    key: 'contact',
    title: 'Kontaktinfo',
    description: 'Student og foresatt',
    icon: User,
  },
  {
    key: 'courses',
    title: 'Velg kurs',
    description: 'Finn ditt perfekte kurs',
    icon: BookOpen,
  },
  {
    key: 'summary',
    title: 'Sammendrag',
    description: 'Bekreft og se priser',
    icon: CreditCard,
  },
  {
    key: 'confirmation',
    title: 'Ferdig',
    description: 'Påmelding fullført',
    icon: CheckCircle,
  },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentStepIndex = steps.findIndex(step => step.key === currentStep);

  const getStepStatus = (stepIndex: number): 'completed' | 'current' | 'upcoming' => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Mobile version - Simplified */}
      <div className="md:hidden">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className="text-sm font-montserrat font-medium text-brand-600 dark:text-brand-400">
            Steg {currentStepIndex + 1} av {steps.length}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="relative">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-500 to-magenta-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Current step info */}
        <div className="text-center mt-4">
          <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">
            {steps[currentStepIndex]?.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-montserrat">
            {steps[currentStepIndex]?.description}
          </p>
        </div>
      </div>

      {/* Desktop version - Full stepper */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-500 to-magenta-500"
              initial={{ width: 0 }}
              animate={{ width: currentStepIndex > 0 ? `${(currentStepIndex / (steps.length - 1)) * 100}%` : '0%' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {/* Step circles */}
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex flex-col items-center relative">
                {/* Step circle */}
                <motion.div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center relative z-10
                    transition-all duration-300 border-2
                    ${status === 'completed' 
                      ? 'bg-brand-500 border-brand-500 text-white' 
                      : status === 'current'
                      ? 'bg-white dark:bg-surface-dark border-brand-500 text-brand-500 shadow-brand-lg'
                      : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400'
                    }
                  `}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {status === 'completed' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <Check className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}

                  {/* Current step pulse effect */}
                  {status === 'current' && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-brand-400"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </motion.div>

                {/* Step info */}
                <div className="mt-3 text-center max-w-24">
                  <h4 className={`
                    font-montserrat font-semibold text-sm leading-tight
                    ${status === 'current' 
                      ? 'text-brand-600 dark:text-brand-400' 
                      : status === 'completed'
                      ? 'text-brand-500 dark:text-brand-400'
                      : 'text-gray-500 dark:text-gray-400'
                    }
                  `}>
                    {step.title}
                  </h4>
                  <p className={`
                    text-xs font-montserrat mt-1 leading-tight
                    ${status === 'current' 
                      ? 'text-gray-600 dark:text-gray-300' 
                      : 'text-gray-500 dark:text-gray-400'
                    }
                  `}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}