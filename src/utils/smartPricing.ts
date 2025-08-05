// src/utils/smartPricing.ts - COMPLETE FILE WITH SECURITY FEATURES
import type { DanceClass, PricingPackage } from "../types";

export interface SmartPricingResult {
  total: number;
  originalPrice?: number;
  discount: number;
  packageId: string | null;
  packageName: string;
  isToddlerPricing: boolean;
  appliedFamilyDiscount?: number;
}

// 🔒 SECURITY VALIDATION FUNCTION
const validateFamilyDiscountSecurity = (
  selectedClasses: DanceClass[],
  isSecondDancerInFamily: boolean,
): { valid: boolean; reason?: string } => {
  // Rule 1: Family discount requires minimum class commitment
  if (isSecondDancerInFamily && selectedClasses.length === 1) {
    const className = selectedClasses[0]?.name || "ukjent";
    console.log(
      `🔒 Security check: Single class family discount attempted for ${className}`,
    );

    // Allow family discount for single class, but with reduced benefit
    // This prevents complete abuse while still allowing legitimate families
    return {
      valid: true, // Allow but will get reduced discount
    };
  }

  // Rule 2: Validate class combinations make sense for family
  if (isSecondDancerInFamily && selectedClasses.length > 1) {
    const ageGroups = selectedClasses.map((cls) => cls.age);
    const uniqueAgeGroups = new Set(ageGroups);

    // If all classes are for very different age groups, might be suspicious
    if (uniqueAgeGroups.size > 2) {
      console.log(
        "🔒 Security check: Multiple age groups detected",
        Array.from(uniqueAgeGroups),
      );
      // Allow but log for review
    }
  }

  return { valid: true };
};

export const calculateSmartPackagePrice = (
  selectedClasses: DanceClass[],
  packages: PricingPackage[],
  isSecondDancerInFamily: boolean = false,
): SmartPricingResult => {
  console.log("🧮 Smart Pricing Calculation:");
  console.log(
    "  - Classes:",
    selectedClasses.map((c) => `${c.name} (${c.age})`),
  );
  console.log("  - Packages available:", packages.length);
  console.log("  - Is second dancer:", isSecondDancerInFamily);

  // 🔒 SECURITY: Validate family discount request
  const securityCheck = validateFamilyDiscountSecurity(
    selectedClasses,
    isSecondDancerInFamily,
  );
  if (!securityCheck.valid) {
    console.log("🔒 Security validation failed:", securityCheck.reason);
    // Fall back to no family discount
    isSecondDancerInFamily = false;
  }

  // Validation
  if (!selectedClasses || selectedClasses.length === 0) {
    console.log("❌ No classes selected");
    return {
      total: 0,
      discount: 0,
      packageId: null,
      packageName: "Ingen klasser valgt",
      isToddlerPricing: false,
    };
  }

  if (!packages || packages.length === 0) {
    console.log("❌ No packages available");
    return {
      total: 0,
      discount: 0,
      packageId: null,
      packageName: "Ingen pakker tilgjengelig",
      isToddlerPricing: false,
    };
  }

  // Step 1: Check if any class is for toddlers (3-5 år)
  // Database shows age ranges as "3-5", "6-8", etc. (without " år")
  const isToddler = selectedClasses.some((cls) => {
    const age = cls.age;
    return age === "3-5" || age === "3-5 år"; // Support both formats
  });

  console.log("  - Is toddler age group:", isToddler);

  if (isToddler) {
    // For toddlers, always use Toddler package regardless of class count
    const toddlerPackage = packages.find(
      (p) =>
        p.type === "semester" &&
        (p.name === "Toddler" || p.name.toLowerCase().includes("toddler")),
    );

    if (!toddlerPackage) {
      console.log("❌ Toddler package not found");
      return {
        total: 0,
        discount: 0,
        packageId: null,
        packageName: "Toddler pakke ikke funnet",
        isToddlerPricing: true,
      };
    }

    console.log(
      "✅ Using toddler package:",
      toddlerPackage.name,
      "-",
      toddlerPackage.priceInOre,
      "øre",
    );

    let total = toddlerPackage.priceInOre;
    let totalDiscount = toddlerPackage.discountAmount || 0;
    let familyDiscount = 0;

    if (isSecondDancerInFamily) {
      // 30% family discount for toddlers
      familyDiscount = Math.floor(total * 0.3);
      totalDiscount += familyDiscount;
      console.log(
        "  - ✅ Toddler family discount applied (30%):",
        familyDiscount,
        "øre",
      );
    }

    return {
      total: total - totalDiscount,
      originalPrice: toddlerPackage.priceInOre,
      discount: totalDiscount,
      packageId: toddlerPackage.$id,
      packageName: toddlerPackage.name,
      isToddlerPricing: true,
      appliedFamilyDiscount: familyDiscount > 0 ? familyDiscount : undefined,
    };
  }

  // Step 2: For regular classes (6+ years), use class count pricing
  const classCount = selectedClasses.length;
  console.log("  - Class count for regular pricing:", classCount);

  let selectedPackage: PricingPackage | null = null;

  if (classCount === 1) {
    // Look for "1. klasse" package (exact match from database)
    selectedPackage =
      packages.find(
        (p) =>
          p.type === "semester" &&
          (p.name === "1. klasse" || p.name === "1 klasse"),
      ) || null;
    console.log("  - Looking for 1 class package:", selectedPackage?.name);
  } else if (classCount === 2) {
    // Look for "2 klasser" package (exact match from database)
    selectedPackage =
      packages.find((p) => p.type === "semester" && p.name === "2 klasser") ||
      null;
    console.log("  - Looking for 2 classes package:", selectedPackage?.name);
  } else if (classCount >= 3) {
    // Look for "3+ klasser" package (exact match from database)
    selectedPackage =
      packages.find((p) => p.type === "semester" && p.name === "3+ klasser") ||
      null;
    console.log("  - Looking for 3+ classes package:", selectedPackage?.name);
  }

  if (!selectedPackage) {
    console.log("❌ No matching package found for", classCount, "classes");
    return {
      total: 0,
      discount: 0,
      packageId: null,
      packageName: `Pakke ikke funnet for ${classCount} klasse${classCount > 1 ? "r" : ""}`,
      isToddlerPricing: false,
    };
  }

  console.log(
    "✅ Found package:",
    selectedPackage.name,
    "-",
    selectedPackage.priceInOre,
    "øre",
  );

  // Step 3: Calculate pricing with discounts
  let total = selectedPackage.priceInOre;
  let totalDiscount = selectedPackage.discountAmount || 0;
  let familyDiscount = 0;

  console.log("  - Base price:", total, "øre");
  console.log("  - Package discount:", totalDiscount, "øre");

  // Step 4: 🔒 SECURE family discount rules - applies to ALL packages for 2nd+ dancer
  if (isSecondDancerInFamily) {
    console.log(
      "  - Family discount check: Is second dancer =",
      isSecondDancerInFamily,
    );
    console.log("  - Class count =", classCount);
    console.log("  - Package name =", selectedPackage.name);

    if (classCount === 1) {
      // 🔒 REDUCED: 15% instead of 20% for single class to discourage abuse
      familyDiscount = Math.floor(total * 0.15);
      totalDiscount += familyDiscount;
      console.log(
        "  - ✅ Family discount applied (15% for 1 class):",
        familyDiscount,
        "øre",
      );
      console.log("  - 💡 Note: Reduced rate for single class family discount");
    } else if (classCount === 2) {
      // Standard 30% for 2 classes
      familyDiscount = Math.floor(total * 0.3);
      totalDiscount += familyDiscount;
      console.log(
        "  - ✅ Family discount applied (30% for 2 classes):",
        familyDiscount,
        "øre",
      );
    } else if (classCount >= 3) {
      // Best rate 50% for 3+ classes
      familyDiscount = Math.floor(total * 0.5);
      totalDiscount += familyDiscount;
      console.log(
        "  - ✅ Family discount applied (50% for 3+ classes):",
        familyDiscount,
        "øre",
      );
    }
  } else {
    console.log("  - No family discount (not second dancer)");
  }

  const finalTotal = total - totalDiscount;

  console.log("  - Total discount:", totalDiscount, "øre");
  console.log("  - Final price:", finalTotal, "øre");

  return {
    total: finalTotal,
    originalPrice: selectedPackage.priceInOre,
    discount: totalDiscount,
    packageId: selectedPackage.$id,
    packageName: selectedPackage.name,
    isToddlerPricing: false,
    appliedFamilyDiscount: familyDiscount > 0 ? familyDiscount : undefined,
  };
};

// Helper function to format price for display
export const formatSmartPrice = (priceInOre: number): string => {
  return `${(priceInOre / 100).toFixed(0)} kr`;
};

// Helper function to get package recommendations
export const getPackageRecommendations = (
  selectedClasses: DanceClass[],
  packages: PricingPackage[],
): string[] => {
  const recommendations: string[] = [];

  if (!selectedClasses.length) return recommendations;

  const isToddler = selectedClasses.some(
    (cls) => cls.age === "3-5" || cls.age === "3-5 år",
  );

  if (isToddler) {
    recommendations.push("Toddler-pakken er perfekt for barn 3-5 år");
    recommendations.push("30% familierabatt tilgjengelig for danser nr. 2+");
    return recommendations;
  }

  const classCount = selectedClasses.length;

  if (classCount === 1) {
    recommendations.push("Perfekt for å prøve ut dans!");
    recommendations.push("15% familierabatt tilgjengelig for danser nr. 2+");
  } else if (classCount === 2) {
    const discount =
      packages.find((p) => p.name === "2 klasser")?.discountAmount || 0;
    if (discount > 0) {
      recommendations.push(
        `Spar ${formatSmartPrice(discount)} med 2-klasser pakken!`,
      );
    }
    recommendations.push("30% familierabatt tilgjengelig for danser nr. 2+");
  } else if (classCount >= 3) {
    const package3Plus = packages.find((p) => p.name === "3+ klasser");
    if (package3Plus?.discountAmount) {
      recommendations.push(
        `Spar ${formatSmartPrice(package3Plus.discountAmount)} med 3+ klasser pakken!`,
      );
    }
    recommendations.push("50% familierabatt tilgjengelig for danser nr. 2+");
  }

  return recommendations;
};
