// src/hooks/usePricingPackages.ts
import { useState, useEffect } from "react";
import { databases, DATABASE_ID, COLLECTIONS } from "../lib/appwrite";
import type { PricingPackage } from "@/types";

interface UsePricingPackagesReturn {
  packages: PricingPackage[];
  loading: boolean;
  error: string | null;
  getPackageByClassCount: (classCount: number) => PricingPackage | null;
  getToddlerPackage: () => PricingPackage | null;
  getRegularPackages: () => PricingPackage[];
  getAllPackagesByType: () => Record<string, PricingPackage[]>;
  debugPackages: () => void;
  refetch: () => Promise<void>;
}

export const usePricingPackages = (): UsePricingPackagesReturn => {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("💰 Starting pricing packages fetch...");

      // Fetch pricing packages
      try {
        console.log("📦 Fetching pricing packages...");
        console.log("   Database ID:", DATABASE_ID);
        console.log("   Collection ID:", COLLECTIONS.PRICING_PACKAGES);

        const packagesResponse = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.PRICING_PACKAGES,
          [],
        );

        console.log(
          "✅ Pricing Packages SUCCESS:",
          packagesResponse.documents.length,
          "packages",
        );

        // Detailed logging of each package
        if (packagesResponse.documents.length > 0) {
          console.log("📋 All packages found:");
          packagesResponse.documents.forEach((pkg: any, index: number) => {
            console.log(
              `   ${index + 1}. "${pkg.name}" - ${pkg.priceInOre}øre (${pkg.type})`,
            );
            console.log(`      ID: ${pkg.$id}`);
            console.log(`      Discount: ${pkg.discountAmount || 0}øre`);
          });
        } else {
          console.log("⚠️ No packages found in database!");
        }

        setPackages(packagesResponse.documents as PricingPackage[]);
      } catch (packagesError) {
        console.error("❌ Pricing Packages FAILED:", packagesError);
        throw new Error(
          `Failed to fetch pricing packages: ${packagesError.message}`,
        );
      }

      console.log("🎉 Pricing packages fetch completed successfully!");
    } catch (err) {
      console.error("💥 Final pricing packages fetch error:", err);

      let errorMessage = "Kunne ikke hente prispakker";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage = String(err.message);
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log(
        "🏁 Pricing packages fetch operation completed (loading = false)",
      );
    }
  };

  useEffect(() => {
    console.log("🔄 usePricingPackages: Effect triggered, starting fetch...");
    fetchData();
  }, []);

  // Enhanced package matching with fuzzy logic
  const getPackageByClassCount = (
    classCount: number,
  ): PricingPackage | null => {
    console.log(
      `🔍 getPackageByClassCount: Looking for package with ${classCount} classes`,
    );
    console.log(
      `📋 Available packages:`,
      packages.map((p) => `"${p.name}" (${p.type})`),
    );

    if (classCount <= 0) {
      console.log("❌ Invalid class count:", classCount);
      return null;
    }

    // Try exact matches first
    let foundPackage: PricingPackage | null = null;

    if (classCount === 1) {
      // Look for variations of "1 class" - INKLUDERT "1. klasse"
      foundPackage =
        packages.find((pkg) => {
          const name = pkg.name.toLowerCase();
          return (
            pkg.type === "semester" &&
            (name === "1 klasse" ||
              name === "1. klasse" || // ✅ LEGG TIL DENNE
              name === "1-klasse" ||
              name === "en klasse" ||
              name === "1 class" ||
              (name.includes("1") && name.includes("klasse")))
          );
        }) || null;
    } else if (classCount === 2) {
      // Look for variations of "2 classes"
      foundPackage =
        packages.find((pkg) => {
          const name = pkg.name.toLowerCase();
          return (
            pkg.type === "semester" &&
            (name === "2 klasser" ||
              name === "2-klasser" ||
              name === "to klasser" ||
              name === "2 classes" ||
              (name.includes("2") && name.includes("klasser")))
          );
        }) || null;
    } else if (classCount >= 3) {
      // Look for variations of "3+ classes"
      foundPackage =
        packages.find((pkg) => {
          const name = pkg.name.toLowerCase();
          return (
            pkg.type === "semester" &&
            (name === "3+ klasser" ||
              name === "3+-klasser" ||
              name === "3+ classes" ||
              name === "tre eller flere klasser" ||
              name.includes("3+") ||
              (name.includes("3 ") && name.includes("klasser")) ||
              (name.includes("flere") && name.includes("klasser")))
          );
        }) || null;
    }

    if (foundPackage) {
      console.log(
        `✅ Found package: "${foundPackage.name}" - ${foundPackage.priceInOre}øre`,
      );
      console.log(`   Package ID: ${foundPackage.$id}`);
      console.log(`   Discount: ${foundPackage.discountAmount || 0}øre`);
    } else {
      console.log(`❌ No package found for ${classCount} classes`);
      console.log(
        `💡 Available packages:`,
        packages.map((p) => p.name),
      );
    }

    return foundPackage;
  };

  // Get toddler-specific package with enhanced matching
  const getToddlerPackage = (): PricingPackage | null => {
    console.log("🔍 getToddlerPackage: Looking for toddler package");

    const toddlerPackage =
      packages.find((pkg) => {
        const name = pkg.name.toLowerCase();
        return (
          pkg.type === "semester" &&
          (name === "toddler" ||
            name === "toddler-pakke" ||
            name === "småbarn" ||
            name === "3-5 år" ||
            name.includes("toddler") ||
            name.includes("småbarn"))
        );
      }) || null;

    if (toddlerPackage) {
      console.log(
        `✅ Found toddler package: "${toddlerPackage.name}" - ${toddlerPackage.priceInOre}øre`,
      );
    } else {
      console.log("❌ No toddler package found");
      console.log(
        "💡 Available packages:",
        packages.map((p) => p.name),
      );
    }

    return toddlerPackage;
  };

  // Get regular (non-toddler) packages
  const getRegularPackages = (): PricingPackage[] => {
    const regularPackages = packages.filter((pkg) => {
      const name = pkg.name.toLowerCase();
      return (
        pkg.type === "semester" &&
        !name.includes("toddler") &&
        !name.includes("småbarn")
      );
    });

    console.log(
      `🔍 getRegularPackages: Found ${regularPackages.length} regular packages:`,
      regularPackages.map((p) => p.name).join(", "),
    );

    return regularPackages;
  };

  // Group packages by type
  const getAllPackagesByType = (): Record<string, PricingPackage[]> => {
    const grouped: Record<string, PricingPackage[]> = {};

    packages.forEach((pkg) => {
      if (!pkg.type) {
        console.log(`⚠️ Package ${pkg.name} has no type, skipping`);
        return;
      }

      if (!grouped[pkg.type]) {
        grouped[pkg.type] = [];
        console.log(`📂 Created new group for type '${pkg.type}'`);
      }
      grouped[pkg.type].push(pkg);
    });

    console.log(
      "📊 Grouped packages:",
      Object.keys(grouped)
        .map((type) => `${type} (${grouped[type].length})`)
        .join(", "),
    );

    return grouped;
  };

  // Debug function to manually inspect packages
  const debugPackages = (): void => {
    console.log("🐛 DEBUG: Packages inspection");
    console.log("Total packages:", packages.length);

    if (packages.length === 0) {
      console.log("❌ No packages loaded!");
      return;
    }

    packages.forEach((pkg, index) => {
      console.log(`\n📦 Package ${index + 1}:`);
      console.log(`   Name: "${pkg.name}"`);
      console.log(`   Type: "${pkg.type}"`);
      console.log(`   Price: ${pkg.priceInOre}øre`);
      console.log(`   Discount: ${pkg.discountAmount || 0}øre`);
      console.log(`   ID: ${pkg.$id}`);
    });

    // Test matching for different class counts
    console.log("\n🧪 Testing package matching:");
    for (let i = 1; i <= 5; i++) {
      const result = getPackageByClassCount(i);
      console.log(
        `   ${i} classes → ${result ? `"${result.name}"` : "NOT FOUND"}`,
      );
    }
  };

  // Refetch function for manual refresh
  const refetch = async (): Promise<void> => {
    console.log("🔄 Manual pricing packages refetch triggered...");
    await fetchData();
  };

  // Log current state when it changes
  useEffect(() => {
    console.log("📊 Pricing Packages State Update:", {
      packages: packages.length,
      loading,
      error: error || "none",
    });

    if (packages.length > 0 && !loading) {
      console.log(
        "📋 Final packages summary:",
        packages.map((p) => `"${p.name}" (${p.priceInOre}øre)`).join(", "),
      );
    }
  }, [packages.length, loading, error]);

  return {
    packages,
    loading,
    error,
    getPackageByClassCount,
    getToddlerPackage,
    getRegularPackages,
    getAllPackagesByType,
    debugPackages,
    refetch,
  };
};
