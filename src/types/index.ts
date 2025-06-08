// src/types/index.ts - Fixed with consistent first/last name support

export interface DanceClass {
  $id: string;
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
  $createdAt?: string;
  $updatedAt?: string;
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
  type: 'semester' | 'addon' | 'clipcard';
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
  status: 'cart' | 'reserved' | 'paid' | 'cancelled' | 'expired';
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
  type: 'package' | 'addon' | 'clipcard';
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

// FIXED: Consistent CartItem with proper name handling
export interface CartItem {
  id: string;
  studentFirstName: string;
  studentLastName: string;
  studentAge: number;
  selectedClasses: DanceClass[];
  selectedSchedules: string[];
  isSecondDancerInFamily: boolean;
  familyDiscountOverride?: boolean; // Manual override flag
  addedAt: string;
}

// Helper computed properties for CartItem
export interface CartItemWithHelpers extends CartItem {
  fullName: string;  // Computed: firstName + lastName
  displayName: string; // For UI display
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

// NEW: StudentFormData for form input
export interface StudentFormData {
  studentFirstName: string;
  studentLastName: string;
  studentAge: string;
  selectedClasses: DanceClass[];
  selectedSchedules: string[];
  isSecondDancerInFamily?: boolean;
  familyDiscountOverride?: boolean;
}

// NEW: Family detection result
export interface FamilyDetectionResult {
  isLikelyFamily: boolean;
  confidence: number;
  reason: string;
  suggestedLastName?: string;
  existingFamilyMembers: CartItemWithHelpers[];
}

// NEW: StudentData interface for useCart (bridges form to cart)
export interface StudentData {
  studentFirstName: string;
  studentLastName: string;
  studentAge: number;
  selectedClasses: DanceClass[];
  selectedSchedules?: string[];
  isSecondDancerInFamily?: boolean;
  familyDiscountOverride?: boolean;
}

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
    status: 'RESERVED' | 'PENDING' | 'CANCELLED' | 'FAILED';
    amount: number;
    transactionId: string;
  };
  success: boolean;
}

export interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $collectionId: string;
  $databaseId: string;
}

export interface AppwriteListResponse<T> {
  total: number;
  documents: T[];
}

// Utility types
export type PaymentStatus = 'checking' | 'success' | 'cancelled' | 'timeout' | 'error';
export type NavigationPage = '/' | '/courses' | '/checkout' | '/payment-result';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';