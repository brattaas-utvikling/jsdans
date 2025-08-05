// src/hooks/usePricing.ts
import { useState, useEffect } from 'react';
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from '../lib/appwrite';
import { PricingPackage } from '@/types';

export function usePricing() {
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format price from øre to kr
  const formatPrice = (priceInOre?: number): string => {
    if (!priceInOre) return "";
    return `${(priceInOre / 100).toLocaleString("no-NO")} kr`;
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (pkg: PricingPackage): number => {
    if (!pkg.price || pkg.price === 0) return 0;
    if (!pkg.discount_amount) return pkg.price;
    return pkg.price - pkg.discount_amount;
  };

  // Format full pricing display
  const formatPricingDisplay = (pkg: PricingPackage): string => {
    // Special cases with fallback descriptions - ALLTID vis disse
    const fallbackDescriptions: Record<string, string> = {
      Familierabatt: "50% for danser nr 2 som danser 3 eller flere klasser",
      Kompani: "500 kr ekstra per halvår",
      Klippekort: "1 500 kr for 10 klipp",
      Prøvetime: "Gratis første time for nye deltakere",
    };

    // Check if this package has a fallback description - VIS ALLTID
    if (fallbackDescriptions[pkg.name]) {
      return pkg.description || fallbackDescriptions[pkg.name];
    }

    // If has description and no meaningful price, show description
    if (pkg.description && (!pkg.price || pkg.price === 0)) {
      return pkg.description;
    }

    // If no price and no description
    if ((!pkg.price || pkg.price === 0) && !pkg.description) {
      return "Pris kommer";
    }

    // Calculate final price (with discount if applicable)
    const finalPrice = calculateDiscountedPrice(pkg);

    // Standard price display with period
    if (finalPrice > 0 && pkg.period) {
      return `${formatPrice(finalPrice)} ${pkg.period}`;
    }

    // Price without period
    if (finalPrice > 0) {
      return formatPrice(finalPrice);
    }

    return "Kontakt oss for pris";
  };

  // Fetch pricing packages from Appwrite
  const fetchPricingPackages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await listDocuments(
        DATABASE_ID,
        COLLECTIONS.PRICING_PACKAGES,
        [
          Query.equal("is_active", true), // Vis kun aktive priser
          Query.orderAsc("order"), // Sorter etter order felt
          Query.limit(50), // Begrens til 50 pakker
        ],
      );

      const packages = response.documents as unknown as PricingPackage[];
      setPricingPackages(packages);
    } catch (err) {
      console.error("Error fetching pricing packages:", err);
      setError("Kunne ikke laste priser fra databasen.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data når hook initialiseres
  useEffect(() => {
    fetchPricingPackages();
  }, []);

  return {
    pricingPackages,
    loading,
    error,
    formatPrice,
    calculateDiscountedPrice,
    formatPricingDisplay,
    refetch: fetchPricingPackages,
  };
}