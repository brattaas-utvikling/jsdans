// src/utils/pricing.ts - Missing utility functions
import type { DanceClass } from "../types";

// Format price from øre to kr
export const formatPrice = (priceInOre: number): string => {
  const kr = priceInOre / 100;
  return `${kr.toFixed(0)} kr`;
};

// Validate student age against selected classes
export const validateStudentAge = (
  age: number,
  selectedClasses: DanceClass[],
): { valid: boolean; message?: string } => {
  if (!selectedClasses || selectedClasses.length === 0) {
    return { valid: true };
  }

  const incompatibleClasses = selectedClasses.filter((cls) => {
    const ageRange = cls.age;

    // Parse age ranges
    if (ageRange === "3-5 år" || ageRange === "3-5") {
      return age < 3 || age > 5;
    } else if (ageRange === "6-8 år" || ageRange === "6-8") {
      return age < 6 || age > 8;
    } else if (ageRange === "8+ år" || ageRange === "8+") {
      return age < 8;
    } else if (ageRange === "9+ år" || ageRange === "9+") {
      return age < 9;
    } else if (ageRange === "10+ år" || ageRange === "10+") {
      return age < 10;
    } else if (ageRange === "12+ år" || ageRange === "12+") {
      return age < 12;
    }

    return false; // Default: compatible
  });

  if (incompatibleClasses.length > 0) {
    const classNames = incompatibleClasses.map((cls) => cls.name).join(", ");
    return {
      valid: false,
      message: `Alderen ${age} år passer ikke for følgende klasser: ${classNames}`,
    };
  }

  return { valid: true };
};

// Calculate age group from birth year
export const calculateAgeFromBirthYear = (birthYear: number): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
};

// Get recommended classes for age
export const getRecommendedClassesForAge = (
  age: number,
  allClasses: DanceClass[],
): DanceClass[] => {
  return allClasses.filter((cls) => {
    const validation = validateStudentAge(age, [cls]);
    return validation.valid;
  });
};

// Calculate total price for multiple items
export const calculateTotalPrice = (pricesInOre: number[]): number => {
  return pricesInOre.reduce((total, price) => total + price, 0);
};

// Format currency without decimals (Norwegian style)
export const formatCurrencyNOK = (amountInOre: number): string => {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountInOre / 100);
};

// Parse price string back to øre
export const parsePriceToOre = (priceString: string): number => {
  const cleanPrice = priceString.replace(/[^\d,.-]/g, "").replace(",", ".");
  const kr = parseFloat(cleanPrice) || 0;
  return Math.round(kr * 100);
};

// Calculate discount percentage
export const calculateDiscountPercentage = (
  originalPrice: number,
  discountedPrice: number,
): number => {
  if (originalPrice === 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

// Format discount percentage
export const formatDiscountPercentage = (
  originalPrice: number,
  discountedPrice: number,
): string => {
  const percentage = calculateDiscountPercentage(
    originalPrice,
    discountedPrice,
  );
  return `${percentage}%`;
};
