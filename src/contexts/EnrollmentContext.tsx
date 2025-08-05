// src/contexts/EnrollmentContext.tsx
import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import type { 
  EnrollmentState, 
  EnrollmentAction, 
  EnrollmentStep, 
  Student, 
  Guardian,
  EnrollmentErrors
} from '../types/enrollment';
import type { DanceClass, PricingPackage } from '../types';
import { calculateSmartPackagePrice } from '../utils/smartPricing';
import { validateStudentAge } from '../utils/pricing';

// Initial state
const initialState: EnrollmentState = {
  currentStep: 'contact',
  enrollmentData: {
    student: {
      firstName: '',
      lastName: '',
      birthDate: '',
    },
    guardian: {
      name: '',
      email: '',
      phone: '',
    },
    selectedCourses: [],
    pricing: null,
    isSecondDancerInFamily: false,
  },
  errors: {},
  isLoading: false,
  isSubmitting: false,
  availableCourses: [],
};

// Reducer function
function enrollmentReducer(state: EnrollmentState, action: EnrollmentAction): EnrollmentState {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
        errors: {}, // Clear errors when changing steps
      };

    case 'SET_STUDENT_DATA':
      return {
        ...state,
        enrollmentData: {
          ...state.enrollmentData,
          student: action.payload,
        },
      };

    case 'SET_GUARDIAN_DATA':
      return {
        ...state,
        enrollmentData: {
          ...state.enrollmentData,
          guardian: action.payload,
        },
      };

    case 'SET_SELECTED_COURSES':
      return {
        ...state,
        enrollmentData: {
          ...state.enrollmentData,
          selectedCourses: action.payload,
        },
      };

    case 'SET_FAMILY_DISCOUNT':
      return {
        ...state,
        enrollmentData: {
          ...state.enrollmentData,
          isSecondDancerInFamily: action.payload,
        },
      };

    case 'SET_PRICING':
      return {
        ...state,
        enrollmentData: {
          ...state.enrollmentData,
          pricing: action.payload,
        },
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case 'SET_AVAILABLE_COURSES':
      return {
        ...state,
        availableCourses: action.payload,
      };

    case 'GO_TO_NEXT_STEP': {
      const stepOrder: EnrollmentStep[] = ['contact', 'courses', 'summary', 'confirmation'];
      const currentIndex = stepOrder.indexOf(state.currentStep);
      const nextStep = currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : state.currentStep;
      
      return {
        ...state,
        currentStep: nextStep,
        errors: {},
      };
    }

    case 'GO_TO_PREVIOUS_STEP': {
      const stepOrderPrev: EnrollmentStep[] = ['contact', 'courses', 'summary', 'confirmation'];
      const currentIndexPrev = stepOrderPrev.indexOf(state.currentStep);
      const prevStep = currentIndexPrev > 0 ? stepOrderPrev[currentIndexPrev - 1] : state.currentStep;
      
      return {
        ...state,
        currentStep: prevStep,
        errors: {},
      };
    }

    case 'RESET_ENROLLMENT':
      return initialState;

    default:
      return state;
  }
}

// Context interface
interface EnrollmentContextType {
  state: EnrollmentState;
  dispatch: React.Dispatch<EnrollmentAction>;
  
  // Convenience methods
  setStep: (step: EnrollmentStep) => void;
  setStudentData: (student: Student) => void;
  setGuardianData: (guardian: Guardian) => void;
  setSelectedCourses: (courses: DanceClass[]) => void;
  setFamilyDiscount: (isFamily: boolean) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  calculatePricing: (packages: PricingPackage[]) => void;
  validateCurrentStep: () => boolean;
  resetEnrollment: () => void;
}

// Create context
const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

// Provider component
interface EnrollmentProviderProps {
  children: ReactNode;
}

export function EnrollmentProvider({ children }: EnrollmentProviderProps) {
  const [state, dispatch] = useReducer(enrollmentReducer, initialState);

  // Convenience methods
  const setStep = useCallback((step: EnrollmentStep) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const setStudentData = useCallback((student: Student) => {
    // Auto-calculate age from birth date
    if (student.birthDate) {
      const birthYear = new Date(student.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      student.age = currentYear - birthYear;
    }
    dispatch({ type: 'SET_STUDENT_DATA', payload: student });
  }, []);

  const setGuardianData = useCallback((guardian: Guardian) => {
    dispatch({ type: 'SET_GUARDIAN_DATA', payload: guardian });
  }, []);

  const setSelectedCourses = useCallback((courses: DanceClass[]) => {
    dispatch({ type: 'SET_SELECTED_COURSES', payload: courses });
  }, []);

  const setFamilyDiscount = useCallback((isFamily: boolean) => {
    dispatch({ type: 'SET_FAMILY_DISCOUNT', payload: isFamily });
  }, []);

  const goToNextStep = useCallback(() => {
    dispatch({ type: 'GO_TO_NEXT_STEP' });
  }, []);

  const goToPreviousStep = useCallback(() => {
    dispatch({ type: 'GO_TO_PREVIOUS_STEP' });
  }, []);

  const calculatePricing = useCallback((packages: PricingPackage[]) => {
    const { selectedCourses, isSecondDancerInFamily } = state.enrollmentData;
    
    if (selectedCourses.length > 0 && packages.length > 0) {
      const pricing = calculateSmartPackagePrice(
        selectedCourses,
        packages,
        isSecondDancerInFamily
      );
      dispatch({ type: 'SET_PRICING', payload: pricing });
    }
  }, [state.enrollmentData]);

  // Validation for current step
  const validateCurrentStep = useCallback((): boolean => {
    const errors: EnrollmentErrors = {};
    let isValid = true;

    switch (state.currentStep) {
      case 'contact':
        // Validate student data
        if (!state.enrollmentData.student.firstName.trim()) {
          errors.student = { ...errors.student, firstName: 'Fornavn er påkrevd' };
          isValid = false;
        }
        if (!state.enrollmentData.student.lastName.trim()) {
          errors.student = { ...errors.student, lastName: 'Etternavn er påkrevd' };
          isValid = false;
        }
        if (!state.enrollmentData.student.birthDate) {
          errors.student = { ...errors.student, birthDate: 'Fødselsdato er påkrevd' };
          isValid = false;
        }

        // Validate guardian data
        if (!state.enrollmentData.guardian.name.trim()) {
          errors.guardian = { ...errors.guardian, name: 'Foresattes navn er påkrevd' };
          isValid = false;
        }
        if (!state.enrollmentData.guardian.email.trim()) {
          errors.guardian = { ...errors.guardian, email: 'E-post er påkrevd' };
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(state.enrollmentData.guardian.email)) {
          errors.guardian = { ...errors.guardian, email: 'Ugyldig e-postadresse' };
          isValid = false;
        }
        if (!state.enrollmentData.guardian.phone.trim()) {
          errors.guardian = { ...errors.guardian, phone: 'Telefonnummer er påkrevd' };
          isValid = false;
        }
        break;

      case 'courses':
        if (state.enrollmentData.selectedCourses.length === 0) {
          errors.courses = 'Du må velge minst ett kurs';
          isValid = false;
        }

        // Validate age against selected courses
        if (state.enrollmentData.student.age && state.enrollmentData.selectedCourses.length > 0) {
          const ageValidation = validateStudentAge(
            state.enrollmentData.student.age,
            state.enrollmentData.selectedCourses
          );
          if (!ageValidation.valid) {
            errors.courses = ageValidation.message;
            isValid = false;
          }
        }
        break;

      case 'summary':
        // All previous validations should pass
        if (!state.enrollmentData.pricing) {
          errors.general = 'Prisberegning mangler';
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
    } else {
      dispatch({ type: 'SET_ERRORS', payload: {} });
    }

    return isValid;
  }, [state.currentStep, state.enrollmentData]);

  const resetEnrollment = useCallback(() => {
    dispatch({ type: 'RESET_ENROLLMENT' });
  }, []);

  const contextValue: EnrollmentContextType = {
    state,
    dispatch,
    setStep,
    setStudentData,
    setGuardianData,
    setSelectedCourses,
    setFamilyDiscount,
    goToNextStep,
    goToPreviousStep,
    calculatePricing,
    validateCurrentStep,
    resetEnrollment,
  };

  return (
    <EnrollmentContext.Provider value={contextValue}>
      {children}
    </EnrollmentContext.Provider>
  );
}

// Custom hook for using enrollment context
export function useEnrollment() {
  const context = useContext(EnrollmentContext);
  if (context === undefined) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
}