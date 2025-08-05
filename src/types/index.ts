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

export interface PricingPackage {
  $id: string;
  name: string;
  type: "semester" | "addon" | "clipcard";
  priceInOre: number;
  classCount?: number;
  discountAmount: number;
  minAge?: number;
  maxAge?: number;
  description: string;
  isActive: boolean;
  validFrom: string;
  validTo?: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface Order {
  $id: string;
  userId?: string;
  status: "cart" | "reserved" | "paid" | "cancelled" | "expired";
  totalAmountInOre: number;
  originalAmountInOre: number;
  discountAmountInOre: number;
  vippsOrderId?: string;
  reservedAt?: string;
  expiresAt?: string;
  paidAt?: string;
  semester: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  familyGroupId?: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface OrderItem {
  $id: string;
  orderId: string;
  type: "package" | "addon" | "clipcard";
  packageId: string;
  studentName: string;
  studentAge?: number;
  priceInOre: number;
  selectedSchedules: string[];
  discountApplied?: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface FamilyGroup {
  $id: string;
  parentEmail: string;
  parentName: string;
  parentPhone?: string;
  students: string[];
  discountEligible: boolean;
  createdAt: string;
  semester: string;
  $createdAt?: string;
  $updatedAt?: string;
}

// Cart interfaces
export interface CartItem {
  id: string;
  studentFirstName: string;
  studentLastName: string;
  studentAge: number;
  selectedClasses: DanceClass[];
  selectedSchedules: string[];
  isSecondDancerInFamily: boolean;
  familyDiscountOverride?: boolean;
  addedAt: string;
}

export interface CartItemWithHelpers extends CartItem {
  fullName: string;
  displayName: string;
}

export interface CartItemWithPricing extends CartItemWithHelpers {
  pricing: PricingCalculation;
}

export interface PricingCalculation {
  total: number;
  originalPrice?: number;
  discount: number;
  packageId: string | null;
  packageName: string;
}

export interface CartSummary {
  itemCount: number;
  total: number;
  totalDiscount: number;
  originalTotal: number;
  items: CartItemWithPricing[];
  hasItems: boolean;
  familyGroups?: FamilyGroup[];
}

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  message?: string;
}

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

// Student form data
export interface StudentFormData {
  studentFirstName: string;
  studentLastName: string;
  studentAge: string;
  selectedClasses: DanceClass[];
  selectedSchedules: string[];
  isSecondDancerInFamily?: boolean;
  familyDiscountOverride?: boolean;
}

// Family detection
export interface FamilyDetectionResult {
  isLikelyFamily: boolean;
  confidence: number;
  reason: string;
  suggestedLastName?: string;
  existingFamilyMembers: CartItemWithHelpers[];
}

export interface StudentData {
  studentFirstName: string;
  studentLastName: string;
  studentAge: number;
  selectedClasses: DanceClass[];
  selectedSchedules?: string[];
  isSecondDancerInFamily?: boolean;
  familyDiscountOverride?: boolean;
}

// Vipps payment interfaces
export interface VippsPaymentData {
  orderId: string;
  amount: number;
  customerInfo: CustomerData;
}

export interface VippsResponse {
  orderId: string;
  url: string;
  success: boolean;
}

export interface VippsStatusResponse {
  orderId: string;
  transactionInfo: {
    status: "RESERVED" | "PENDING" | "CANCELLED" | "FAILED";
    amount: number;
    transactionId: string;
  };
  success: boolean;
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
