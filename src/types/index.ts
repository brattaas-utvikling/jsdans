// src/types/index.ts - Updated with enrollment compatibility

// Base Appwrite document interface
export interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId: string;
  $databaseId: string;
  $permissions: string[];
}

// DanceClass interface - Updated to be compatible with enrollment
export interface DanceClass extends AppwriteDocument {
  name: string;
  type: string;
  level: string;
  duration: number;
  age: string;
  instructor: string;
  description: string;
  color: string;
  icon: string;
  image: string;
  availableFromYear: number;
  studio?: string; // Made optional for backward compatibility
  // Support both old and new schedule formats
  schedule?: Array<{
    day: string;
    time: string;
  }>;
  schedules?: Schedule[]; // Optional schedules for this class
}

export interface Schedule {
  $id: string;
  day: string;
  startTime: string;
  endTime: string;
  danceClassId: string;
  semester: string;
  maxStudents: number;
  currentStudents: number;
  room?: string;
  isActive: boolean;
  $createdAt?: string;
  $updatedAt?: string;
}

// TypeScript interface som matcher Appwrite schema
export interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId: string;
  $databaseId: string;
  $permissions: string[];
}

export interface PricingPackage extends AppwriteDocument {
  name: string;
  price?: number; // Pris i øre
  period?: string;
  discount_amount?: number; // Rabatt i øre
  discount_text?: string;
  description?: string;
  order: number;
  is_active: boolean;
  category?: string;
}

export interface SmartPricingResult {
  packageName: string;
  total: number; // Total pris i øre
  originalPrice?: number; // Originalpris før rabatt i øre
  discount: number; // Total rabatt i øre
  appliedFamilyDiscount?: number; // Familierabatt i øre
  isToddlerPricing: boolean;
  breakdown: {
    basePrice: number; // Grunnpris i øre
    packageDiscount: number; // Pakkerabatt i øre
    familyDiscount: number; // Familierabatt i øre
    finalPrice: number; // Endelig pris i øre
  };
}

export interface AppwriteListResponse<T> {
  total: number;
  documents: T[];
}

// Utility types
export type PaymentStatus =
  | "checking"
  | "success"
  | "cancelled"
  | "timeout"
  | "error";
export type NavigationPage = "/" | "/courses" | "/checkout" | "/payment-result";
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";
export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";
