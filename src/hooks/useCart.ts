// src/hooks/useCart.ts - FIXED with migration support for old cart data
import { useState, useCallback, useEffect } from "react";
import { calculateSmartPackagePrice } from "../utils/smartPricing";
import type {
  CartItem,
  CartItemWithPricing,
  CartItemWithHelpers,
  CartSummary,
  PricingPackage,
  ValidationResult,
  StudentData,
  FamilyDetectionResult,
} from "../types";

interface CartAnalytics {
  totalStudents: number;
  totalClasses: number;
  averageClassesPerStudent: number;
  familyDiscountEligible: number;
  estimatedSavings: number;
  cartValue: number;
}

interface UseCartReturn {
  cartItems: CartItem[];
  addToCart: (studentData: StudentData) => Promise<string>;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (itemId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  getCartSummary: () => CartSummary;
  hasItems: boolean;
  getTotalClassCount: () => number;
  hasPotentialFamilyDiscount: () => boolean;
  validateCart: () => ValidationResult;
  getCartAnalytics: () => CartAnalytics;
  isCartExpired: () => boolean;
  refreshCart: () => void;
  duplicateStudent: (itemId: string) => string;
  canApplyFamilyDiscount: () => boolean;
  updateFamilyDiscountStatus: () => void;
  toggleFamilyDiscount: (itemId: string) => void;
  detectFamily: (firstName: string, lastName: string) => FamilyDetectionResult;
  getCartItemsWithHelpers: () => CartItemWithHelpers[];
}

const CART_STORAGE_KEY = "danceStudio_cart";
const CART_EXPIRY_MINUTES = 30;

// 🔧 MIGRATION HELPER: Convert old cart items to new format
const migrateCartItem = (item: any): CartItem => {
  // If already in new format, return as-is
  if (item.studentFirstName && item.studentLastName) {
    return item as CartItem;
  }

  // OLD FORMAT: Has studentName, need to split
  let firstName = "Ukjent";
  let lastName = "Navn";

  if (item.studentName) {
    const nameParts = item.studentName.trim().split(" ");
    firstName = nameParts[0] || "Ukjent";
    lastName = nameParts.slice(1).join(" ") || "Navn";
  }

  console.log(
    `🔄 Migrating cart item: "${item.studentName}" → "${firstName} ${lastName}"`,
  );

  return {
    id: item.id,
    studentFirstName: firstName,
    studentLastName: lastName,
    studentAge: item.studentAge,
    selectedClasses: item.selectedClasses || [],
    selectedSchedules: item.selectedSchedules || [],
    isSecondDancerInFamily: item.isSecondDancerInFamily || false,
    familyDiscountOverride: item.familyDiscountOverride,
    addedAt: item.addedAt || new Date().toISOString(),
  };
};

export const useCart = (packages: PricingPackage[] = []): UseCartReturn => {
  // Initialize cart from localStorage with migration
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsedItems = JSON.parse(saved);
        const now = Date.now();

        // Filter out expired items AND migrate to new format
        const validMigratedItems = parsedItems
          .filter((item: any) => {
            const itemAge = now - new Date(item.addedAt || 0).getTime();
            return itemAge < CART_EXPIRY_MINUTES * 60 * 1000;
          })
          .map((item: any) => migrateCartItem(item));

        console.log(
          `🔄 Migrated ${validMigratedItems.length} cart items to new format`,
        );

        // Save migrated data back to localStorage
        if (validMigratedItems.length > 0) {
          localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(validMigratedItems),
          );
        }

        return validMigratedItems;
      }
      return [];
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
      // Clear corrupted cart data
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to storage:", error);
    }
  }, [cartItems]);

  // Auto-refresh expired items every minute
  useEffect(() => {
    const interval = setInterval(() => {
      refreshCart();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Helper: Convert CartItem to CartItemWithHelpers
  const getCartItemsWithHelpers = useCallback((): CartItemWithHelpers[] => {
    return cartItems.map((item) => ({
      ...item,
      fullName: `${item.studentFirstName} ${item.studentLastName}`.trim(),
      displayName: `${item.studentFirstName} ${item.studentLastName}`.trim(),
    }));
  }, [cartItems]);

  // Generate unique ID for cart items
  const generateItemId = (): string => {
    return `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // INTELLIGENT FAMILY DETECTION 🧠
  const detectFamily = useCallback(
    (firstName: string, lastName: string): FamilyDetectionResult => {
      const itemsWithHelpers = getCartItemsWithHelpers();
      const trimmedLastName = lastName.trim().toLowerCase();
      const trimmedFirstName = firstName.trim().toLowerCase();

      console.log("🔍 Family Detection for:", firstName, lastName);
      console.log(
        "🔍 Existing cart items:",
        itemsWithHelpers.map((i) => i.fullName),
      );

      // Check if exact same person already exists
      const exactMatch = itemsWithHelpers.find(
        (item) =>
          item.studentFirstName.toLowerCase().trim() === trimmedFirstName &&
          item.studentLastName.toLowerCase().trim() === trimmedLastName,
      );

      if (exactMatch) {
        return {
          isLikelyFamily: false,
          confidence: 0,
          reason: `${firstName} ${lastName} er allerede i handlekurven`,
          existingFamilyMembers: [],
        };
      }

      // Find family members with same last name
      const sameLastName = itemsWithHelpers.filter(
        (item) => item.studentLastName.toLowerCase().trim() === trimmedLastName,
      );

      // Find similar last names (fuzzy matching)
      const similarLastNames = itemsWithHelpers.filter((item) => {
        const existingLastName = item.studentLastName.toLowerCase().trim();

        // Exact match already handled above
        if (existingLastName === trimmedLastName) return false;

        // Check for common misspellings or variations
        const similarity = calculateNameSimilarity(
          existingLastName,
          trimmedLastName,
        );
        return similarity > 0.8; // 80% similarity threshold
      });

      if (sameLastName.length > 0) {
        console.log(
          "✅ Same last name found:",
          sameLastName.map((i) => i.fullName),
        );
        return {
          isLikelyFamily: true,
          confidence: 0.95,
          reason: `Samme etternavn som ${sameLastName[0].studentFirstName}`,
          existingFamilyMembers: sameLastName,
        };
      }

      if (similarLastNames.length > 0) {
        console.log(
          "🤔 Similar last name found:",
          similarLastNames[0].studentLastName,
        );
        return {
          isLikelyFamily: true,
          confidence: 0.7,
          reason: `Ligner på ${similarLastNames[0].studentLastName}`,
          suggestedLastName: similarLastNames[0].studentLastName,
          existingFamilyMembers: similarLastNames,
        };
      }

      // No family connection found
      return {
        isLikelyFamily: false,
        confidence: 0,
        reason: "Ingen familie-tilkobling funnet",
        existingFamilyMembers: [],
      };
    },
    [getCartItemsWithHelpers],
  );

  // Helper: Calculate name similarity (simple Levenshtein-based)
  const calculateNameSimilarity = (name1: string, name2: string): number => {
    if (name1 === name2) return 1;

    const longer = name1.length > name2.length ? name1 : name2;
    const shorter = name1.length > name2.length ? name2 : name1;

    if (longer.length === 0) return 1;

    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  // Helper: Levenshtein distance for fuzzy matching
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1,
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  };

  // HYBRID FAMILY DISCOUNT LOGIC 🎯
  const determineHybridFamilyDiscount = (
    studentData: StudentData,
    currentCartSize: number,
  ): boolean => {
    console.log("🎯 Hybrid Family Discount Logic:");
    console.log("  - Current cart size:", currentCartSize);
    console.log("  - Explicit setting:", studentData.isSecondDancerInFamily);
    console.log("  - Override flag:", studentData.familyDiscountOverride);

    // MANUAL OVERRIDE: If user explicitly set familyDiscountOverride
    if (studentData.familyDiscountOverride !== undefined) {
      console.log(
        "  - Manual override detected:",
        studentData.familyDiscountOverride,
      );
      return studentData.familyDiscountOverride;
    }

    // EXPLICIT SETTING: If user explicitly set family discount
    if (studentData.isSecondDancerInFamily !== undefined) {
      console.log(
        "  - Explicit family setting:",
        studentData.isSecondDancerInFamily,
      );
      return studentData.isSecondDancerInFamily;
    }

    // AUTOMATIC: Default hybrid behavior
    const autoDetected = currentCartSize > 0;
    console.log("  - Auto-detected family discount:", autoDetected);
    return autoDetected;
  };

  // Check for duplicate names
  const isDuplicateStudent = (
    firstName: string,
    lastName: string,
    excludeId?: string,
  ): boolean => {
    return cartItems.some(
      (item) =>
        item.id !== excludeId &&
        item.studentFirstName.toLowerCase().trim() ===
          firstName.toLowerCase().trim() &&
        item.studentLastName.toLowerCase().trim() ===
          lastName.toLowerCase().trim(),
    );
  };

  // Add student to cart with HYBRID family discount logic
  const addToCart = useCallback(
    async (studentData: StudentData): Promise<string> => {
      try {
        console.log(
          "🛒 Adding student to cart:",
          studentData.studentFirstName,
          studentData.studentLastName,
        );
        console.log("🔍 Student data received:", {
          firstName: studentData.studentFirstName,
          lastName: studentData.studentLastName,
          age: studentData.studentAge,
          classes: studentData.selectedClasses?.length || 0,
          isSecondDancer: studentData.isSecondDancerInFamily,
          override: studentData.familyDiscountOverride,
        });

        // Basic validation
        if (!studentData.studentFirstName?.trim()) {
          throw new Error("Fornavn er påkrevd");
        }

        if (!studentData.studentLastName?.trim()) {
          throw new Error("Etternavn er påkrevd");
        }

        if (
          !studentData.studentAge ||
          studentData.studentAge < 3 ||
          studentData.studentAge > 100
        ) {
          throw new Error("Ugyldig alder (må være mellom 3-100 år)");
        }

        if (!studentData.selectedClasses?.length) {
          throw new Error("Minst én klasse må velges");
        }

        // Check for duplicate names
        if (
          isDuplicateStudent(
            studentData.studentFirstName,
            studentData.studentLastName,
          )
        ) {
          throw new Error(
            `En student med navn "${studentData.studentFirstName} ${studentData.studentLastName}" finnes allerede i handlekurven`,
          );
        }

        // HYBRID FAMILY DISCOUNT DETERMINATION 🎯
        const finalIsSecondDancer = determineHybridFamilyDiscount(
          studentData,
          cartItems.length,
        );

        console.log("👥 Final family discount decision:", finalIsSecondDancer);

        const newItem: CartItem = {
          id: generateItemId(),
          studentFirstName: studentData.studentFirstName.trim(),
          studentLastName: studentData.studentLastName.trim(),
          studentAge: studentData.studentAge,
          selectedClasses: studentData.selectedClasses,
          selectedSchedules: studentData.selectedSchedules || [],
          isSecondDancerInFamily: finalIsSecondDancer,
          familyDiscountOverride: studentData.familyDiscountOverride,
          addedAt: new Date().toISOString(),
        };

        // Add new item
        setCartItems((prev) => [...prev, newItem]);

        console.log(
          `✅ Added ${newItem.studentFirstName} ${newItem.studentLastName} to cart`,
        );
        return newItem.id;
      } catch (error) {
        console.error("❌ Failed to add to cart:", error);
        throw error;
      }
    },
    [cartItems, isDuplicateStudent],
  );

  // Remove student from cart
  const removeFromCart = useCallback((itemId: string): void => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // Update cart item
  const updateCartItem = useCallback(
    (itemId: string, updates: Partial<CartItem>): void => {
      setCartItems((prev) =>
        prev.map((item) => {
          if (item.id === itemId) {
            // Validate name changes for duplicates
            if (
              (updates.studentFirstName || updates.studentLastName) &&
              (updates.studentFirstName !== item.studentFirstName ||
                updates.studentLastName !== item.studentLastName)
            ) {
              const newFirstName =
                updates.studentFirstName || item.studentFirstName;
              const newLastName =
                updates.studentLastName || item.studentLastName;

              if (isDuplicateStudent(newFirstName, newLastName, itemId)) {
                throw new Error(
                  `En student med navn "${newFirstName} ${newLastName}" finnes allerede`,
                );
              }
            }

            return {
              ...item,
              ...updates,
              studentFirstName:
                updates.studentFirstName?.trim() || item.studentFirstName,
              studentLastName:
                updates.studentLastName?.trim() || item.studentLastName,
            };
          }
          return item;
        }),
      );
    },
    [cartItems, isDuplicateStudent],
  );

  // Toggle family discount for specific student
  const toggleFamilyDiscount = useCallback((itemId: string): void => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newValue = !item.isSecondDancerInFamily;
          console.log(
            `🔄 Toggling family discount for ${item.studentFirstName}: ${item.isSecondDancerInFamily} → ${newValue}`,
          );
          return {
            ...item,
            isSecondDancerInFamily: newValue,
            familyDiscountOverride: newValue, // Set override flag when manually toggled
          };
        }
        return item;
      }),
    );
  }, []);

  // Duplicate an existing student
  const duplicateStudent = useCallback(
    (itemId: string): string => {
      const originalItem = cartItems.find((item) => item.id === itemId);
      if (!originalItem) {
        throw new Error("Student ikke funnet");
      }

      const duplicatedItem: CartItem = {
        ...originalItem,
        id: generateItemId(),
        studentFirstName: originalItem.studentFirstName,
        studentLastName: `${originalItem.studentLastName} (kopi)`,
        isSecondDancerInFamily: true,
        addedAt: new Date().toISOString(),
      };

      setCartItems((prev) => [...prev, duplicatedItem]);
      return duplicatedItem.id;
    },
    [cartItems],
  );

  // Clear entire cart
  const clearCart = useCallback((): void => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    console.log("🗑️ Cart cleared");
  }, []);

  // Remove expired items
  const refreshCart = useCallback((): void => {
    const now = Date.now();
    const expiryTime = CART_EXPIRY_MINUTES * 60 * 1000;

    setCartItems((prev) => {
      const validItems = prev.filter((item) => {
        const itemAge = now - new Date(item.addedAt).getTime();
        return itemAge < expiryTime;
      });

      if (validItems.length !== prev.length) {
        console.log(
          `🕒 Removed ${prev.length - validItems.length} expired items from cart`,
        );
      }

      return validItems;
    });
  }, []);

  // Check if cart is expired
  const isCartExpired = useCallback((): boolean => {
    if (cartItems.length === 0) return false;

    const now = Date.now();
    const expiryTime = CART_EXPIRY_MINUTES * 60 * 1000;

    return cartItems.some((item) => {
      const itemAge = now - new Date(item.addedAt).getTime();
      return itemAge >= expiryTime;
    });
  }, [cartItems]);

  // Get cart summary with pricing
  const getCartSummary = useCallback((): CartSummary => {
    if (cartItems.length === 0) {
      return {
        itemCount: 0,
        total: 0,
        totalDiscount: 0,
        originalTotal: 0,
        items: [],
        hasItems: false,
      };
    }

    const itemsWithHelpers = getCartItemsWithHelpers();
    const itemsWithPricing: CartItemWithPricing[] = itemsWithHelpers.map(
      (item) => {
        // Use smart pricing function
        const smartPricing = calculateSmartPackagePrice(
          item.selectedClasses,
          packages,
          item.isSecondDancerInFamily,
        );

        const pricing = {
          total: smartPricing.total,
          originalPrice: smartPricing.originalPrice,
          discount: smartPricing.discount,
          packageId: smartPricing.packageId,
          packageName: smartPricing.packageName,
        };

        return {
          ...item,
          pricing,
        };
      },
    );

    // Calculate totals
    let totalPrice = 0;
    let totalDiscount = 0;
    let originalTotal = 0;

    itemsWithPricing.forEach((item) => {
      totalPrice += item.pricing.total;
      totalDiscount += item.pricing.discount;
      originalTotal +=
        item.pricing.originalPrice ||
        item.pricing.total + item.pricing.discount;
    });

    return {
      itemCount: cartItems.length,
      total: totalPrice,
      totalDiscount: totalDiscount,
      originalTotal: originalTotal,
      items: itemsWithPricing,
      hasItems: true,
    };
  }, [cartItems, packages, getCartItemsWithHelpers]);

  // Get total number of classes across all students
  const getTotalClassCount = useCallback((): number => {
    return cartItems.reduce(
      (total, item) => total + item.selectedClasses.length,
      0,
    );
  }, [cartItems]);

  // Check if family discount applies
  const hasPotentialFamilyDiscount = useCallback((): boolean => {
    return (
      cartItems.length > 1 &&
      cartItems.some((item) => item.isSecondDancerInFamily)
    );
  }, [cartItems]);

  // Check if family discount can be applied
  const canApplyFamilyDiscount = useCallback((): boolean => {
    return cartItems.length > 1;
  }, [cartItems]);

  // Update family discount status for all items (legacy function)
  const updateFamilyDiscountStatus = useCallback((): void => {
    setCartItems((prev) => {
      return prev.map((item, index) => ({
        ...item,
        isSecondDancerInFamily: index > 0,
      }));
    });
  }, []);

  // Get cart analytics
  const getCartAnalytics = useCallback((): CartAnalytics => {
    const summary = getCartSummary();
    const totalClasses = getTotalClassCount();

    return {
      totalStudents: cartItems.length,
      totalClasses,
      averageClassesPerStudent:
        cartItems.length > 0 ? totalClasses / cartItems.length : 0,
      familyDiscountEligible: cartItems.filter(
        (item) => item.isSecondDancerInFamily,
      ).length,
      estimatedSavings: summary.totalDiscount,
      cartValue: summary.total,
    };
  }, [cartItems, getCartSummary, getTotalClassCount]);

  // Validate cart before checkout
  const validateCart = useCallback((): ValidationResult => {
    const errors: string[] = [];

    if (cartItems.length === 0) {
      return {
        valid: false,
        message: "Handlekurven er tom",
        errors: ["Legg til minst én student for å fortsette"],
      };
    }

    cartItems.forEach((item, index) => {
      const studentLabel = `Student ${index + 1} (${item.studentFirstName} ${item.studentLastName})`;

      if (!item.studentFirstName?.trim()) {
        errors.push(`${studentLabel}: Fornavn er påkrevd`);
      }

      if (!item.studentLastName?.trim()) {
        errors.push(`${studentLabel}: Etternavn er påkrevd`);
      }

      if (!item.studentAge || item.studentAge < 3 || item.studentAge > 100) {
        errors.push(`${studentLabel}: Ugyldig alder`);
      }

      if (!item.selectedClasses || item.selectedClasses.length === 0) {
        errors.push(`${studentLabel}: Ingen klasser valgt`);
      }
    });

    // Check for duplicate names
    const names = cartItems.map((item) =>
      `${item.studentFirstName} ${item.studentLastName}`.toLowerCase().trim(),
    );
    const duplicateNames = names.filter(
      (name, index) => names.indexOf(name) !== index,
    );
    if (duplicateNames.length > 0) {
      errors.push("Duplikate studentnavn er ikke tillatt");
    }

    return {
      valid: errors.length === 0,
      message:
        errors.length > 0 ? "Feil i handlekurven" : "Handlekurven er gyldig",
      errors,
    };
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    getCartSummary,
    hasItems: cartItems.length > 0,
    getTotalClassCount,
    hasPotentialFamilyDiscount,
    validateCart,
    getCartAnalytics,
    isCartExpired,
    refreshCart,
    duplicateStudent,
    canApplyFamilyDiscount,
    updateFamilyDiscountStatus,
    toggleFamilyDiscount,
    detectFamily,
    getCartItemsWithHelpers,
  };
};
