// src/types/enrollment.ts - Oppdatert med adressefelter
import type { DanceClass } from '.';
import type { SimplePricingResult } from '../utils/simplePricing';

export type EnrollmentStep = 'contact' | 'courses' | 'summary' | 'confirmation';

export interface Student {
  firstName: string;
  lastName: string;
  birthDate: string;
  age?: number; // Automatisk beregnet fra birthDate
}

export interface Guardian {
  name: string;
  email: string;
  phone: string;
  // ✨ NYE: Adressefelter
  address: string;
  postalCode: string;
  city: string;
}

// ✨ Søsken informasjon
export interface Sibling {
  firstName: string;
  lastName: string;
}

// ✨ VIKTIG: Komplett EnrollmentData med alle felter
export interface EnrollmentData {
  student: Student;
  guardian: Guardian;
  selectedCourses: DanceClass[];
  pricing: SimplePricingResult | null;
  isSecondDancerInFamily: boolean;
  // Søsken-relaterte felter
  hasSiblings: boolean;
  siblings: Sibling[];
}

export interface EnrollmentErrors {
  student?: {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    age?: string;
  };
  guardian?: {
    name?: string;
    email?: string;
    phone?: string;
    // ✨ NYE: Adresse valideringsfeil
    address?: string;
    postalCode?: string;
    city?: string;
  };
  courses?: string;
  // Søsken feilmeldinger
  siblings?: {
    [index: number]: {
      firstName?: string;
      lastName?: string;
    };
  };
  general?: string;
}

export interface EnrollmentState {
  currentStep: EnrollmentStep;
  enrollmentData: EnrollmentData;
  errors: EnrollmentErrors;
  isLoading: boolean;
  isSubmitting: boolean;
  availableCourses: DanceClass[];
}

export type EnrollmentAction =
  | { type: 'SET_STEP'; payload: EnrollmentStep }
  | { type: 'SET_STUDENT_DATA'; payload: Student }
  | { type: 'SET_GUARDIAN_DATA'; payload: Guardian }
  | { type: 'SET_SELECTED_COURSES'; payload: DanceClass[] }
  | { type: 'SET_FAMILY_DISCOUNT'; payload: boolean }
  | { type: 'SET_PRICING'; payload: SimplePricingResult | null }
  | { type: 'SET_ERRORS'; payload: EnrollmentErrors }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_AVAILABLE_COURSES'; payload: DanceClass[] }
  // Søsken actions
  | { type: 'SET_HAS_SIBLINGS'; payload: boolean }
  | { type: 'SET_SIBLINGS'; payload: Sibling[] }
  | { type: 'ADD_SIBLING'; payload: Sibling }
  | { type: 'REMOVE_SIBLING'; payload: number } // index
  | { type: 'UPDATE_SIBLING'; payload: { index: number; sibling: Sibling } }
  | { type: 'GO_TO_NEXT_STEP' }
  | { type: 'GO_TO_PREVIOUS_STEP' }
  | { type: 'RESET_ENROLLMENT' };

// Database schema for enrollments collection - oppdatert med adresse
export interface EnrollmentDocument {
  student: {
    firstName: string;
    lastName: string;
    birthDate: string;
    age: number;
  };
  guardian: {
    name: string;
    email: string;
    phone: string;
    // ✨ NYE: Adressefelter i database
    address: string;
    postalCode: string;
    city: string;
  };
  selectedCourses: Array<{
    id: string;
    name: string;
    instructor: string;
    age: string;
    schedule?: Array<{
      day: string;
      time: string;
    }>;
  }>;
  pricing: {
    totalPrice: number;
    basePrice: number;
    discount: number;
    breakdown: {
      barnedansCount: number;
      vanligCount: number;
      kompaniCount: number;
      barnedansPrice: number;
      vanligPrice: number;
      kompaniPrice: number;
    };
  };
  // Søsken felter i database
  hasSiblings: boolean;
  siblings: Array<{
    firstName: string;
    lastName: string;
  }>;
  submittedAt: string;
  status: 'pending' | 'confirmed' | 'paid' | 'cancelled';
}