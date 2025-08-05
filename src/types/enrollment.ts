// src/types/enrollment.ts - Cleaned up and compatible with existing types
import type { SmartPricingResult } from "@/types/index";
import type { DanceClass, AppwriteDocument } from "./index";

// Student information for enrollment
export interface Student {
  firstName: string;
  lastName: string;
  birthDate: string; // ISO date string (YYYY-MM-DD)
  age?: number; // Auto-calculated from birthDate
}

// Guardian/parent information
export interface Guardian {
  name: string;
  email: string;
  phone: string;
}

// Complete enrollment data
export interface EnrollmentData {
  student: Student;
  guardian: Guardian;
  selectedCourses: DanceClass[];
  pricing: SmartPricingResult | null;
  isSecondDancerInFamily: boolean;
}

// Enrollment form validation errors
export interface EnrollmentErrors {
  student?: {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
  };
  guardian?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  courses?: string;
  general?: string;
}

// Enrollment steps
export type EnrollmentStep = "contact" | "courses" | "summary" | "confirmation";

// Enrollment state for context
export interface EnrollmentState {
  currentStep: EnrollmentStep;
  enrollmentData: EnrollmentData;
  errors: EnrollmentErrors;
  isLoading: boolean;
  isSubmitting: boolean;
  availableCourses: DanceClass[];
}

// Enrollment actions
export type EnrollmentAction =
  | { type: "SET_STEP"; payload: EnrollmentStep }
  | { type: "SET_STUDENT_DATA"; payload: Student }
  | { type: "SET_GUARDIAN_DATA"; payload: Guardian }
  | { type: "SET_SELECTED_COURSES"; payload: DanceClass[] }
  | { type: "SET_FAMILY_DISCOUNT"; payload: boolean }
  | { type: "SET_PRICING"; payload: SmartPricingResult }
  | { type: "SET_ERRORS"; payload: EnrollmentErrors }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_AVAILABLE_COURSES"; payload: DanceClass[] }
  | { type: "RESET_ENROLLMENT" }
  | { type: "GO_TO_NEXT_STEP" }
  | { type: "GO_TO_PREVIOUS_STEP" };

// Database enrollment record (for Appwrite)
export interface EnrollmentRecord extends AppwriteDocument {
  studentFirstName: string;
  studentLastName: string;
  studentBirthDate: string;
  studentAge: number;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  selectedCourseIds: string[];
  selectedCourseNames: string[];
  totalPrice: number;
  originalPrice?: number;
  discount: number;
  packageId: string | null;
  packageName: string;
  isSecondDancerInFamily: boolean;
  appliedFamilyDiscount?: number;
  status: "pending" | "confirmed" | "cancelled";
  emailSent: boolean;
  notes?: string;
}

// Email template data
export interface EnrollmentEmailData {
  student: Student;
  guardian: Guardian;
  courses: DanceClass[];
  pricing: SmartPricingResult;
  enrollmentId: string;
  submissionDate: string;
}

// Form validation utilities
export interface EnrollmentValidationResult {
  isValid: boolean;
  errors: EnrollmentErrors;
}

// Course selection with additional UI state
export interface CourseSelection extends DanceClass {
  isSelected: boolean;
  isEligible: boolean;
  ageValidation?: {
    valid: boolean;
    message?: string;
  };
}

// Extended DanceClass interface for enrollment compatibility
export interface EnrollmentDanceClass extends DanceClass {
  // Ensure schedule is always available (fallback to empty array)
  schedule: Array<{
    day: string;
    time: string;
  }>;
  // Add missing field if needed
  studio?: string;
}
