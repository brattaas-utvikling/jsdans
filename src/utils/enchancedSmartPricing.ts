// src/utils/enhancedSmartPricing.ts
import type { DanceClass, PricingPackage, SmartPricingResult } from '../types';




export function formatSmartPrice(priceInOre: number): string {
  return `${(priceInOre / 100).toLocaleString("no-NO")} kr`;
}

export function calculateEnhancedSmartPackagePrice(
  selectedCourses: DanceClass[],
  pricingPackages: PricingPackage[],
  isSecondDancerInFamily: boolean = false
): SmartPricingResult | null {
  
  if (selectedCourses.length === 0 || pricingPackages.length === 0) {
    console.log('🚫 Ingen kurs valgt eller ingen pricing packages tilgjengelig');
    return null;
  }

  console.log('📊 Beregner priser for:', {
    courseCount: selectedCourses.length,
    courses: selectedCourses.map(c => c.name),
    isSecondDancerInFamily,
    availablePackages: pricingPackages.length
  });

  // Sjekk om det er småbarnsprising (3-5 år)
  const isToddlerPricing = selectedCourses.some(course => {
    const ageRange = course.age.trim();
    return ageRange === "3-4 år" || ageRange === "3-5 år" || 
           ageRange === "3-4" || ageRange === "3-5";
  });

  console.log('👶 Småbarnsprising aktiv:', isToddlerPricing);

  // Finn riktig prispaket basert på antall kurs
  let selectedPackage: PricingPackage | null = null;
  
  // Mappelogikk for å finne riktig pakke
  const courseCount = selectedCourses.length;
  
  if (courseCount === 1) {
    // Søk etter "1 kurs" pakke
    selectedPackage = pricingPackages.find(pkg => 
      pkg.name.toLowerCase().includes('1 kurs') || 
      pkg.name.toLowerCase().includes('enkelt')
    ) || null;
  } else if (courseCount === 2) {
    // Søk etter "2 kurs" pakke
    selectedPackage = pricingPackages.find(pkg => 
      pkg.name.toLowerCase().includes('2 kurs')
    ) || null;
  } else if (courseCount >= 3) {
    // Søk etter "3+ kurs" eller "3 kurs" pakke
    selectedPackage = pricingPackages.find(pkg => 
      pkg.name.toLowerCase().includes('3') && pkg.name.toLowerCase().includes('kurs')
    ) || null;
  }

  // Fallback til første aktive pakke hvis ingen matches
  if (!selectedPackage) {
    selectedPackage = pricingPackages.find(pkg => pkg.is_active && pkg.price && pkg.price > 0) || null;
    console.log('⚠️ Ingen spesifikk pakke funnet, bruker fallback:', selectedPackage?.name);
  }

  if (!selectedPackage || !selectedPackage.price) {
    console.log('🚫 Ingen gyldig pakke funnet med pris');
    return null;
  }

  console.log('📦 Valgt pakke:', selectedPackage.name, 'Pris:', selectedPackage.price / 100, 'kr');

  // Beregn grunnpris (pakkeprisen)
  let basePrice = selectedPackage.price; // Pris er allerede i øre fra databasen

  // Småbarnspakke rabatt (hvis applicable)
  if (isToddlerPricing) {
    // Hvis det finnes en spesifikk småbarnspakke, bruk den
    const toddlerPackage = pricingPackages.find(pkg => 
      pkg.name.toLowerCase().includes('småbarn') ||
      pkg.name.toLowerCase().includes('toddler') ||
      pkg.description?.toLowerCase().includes('3-5')
    );
    
    if (toddlerPackage && toddlerPackage.price) {
      basePrice = toddlerPackage.price;
      selectedPackage = toddlerPackage;
      console.log('👶 Byttet til småbarnspakke:', selectedPackage.name);
    }
  }

  // Beregn pakkerabatt (hvis pakken har discount_amount)
  const packageDiscount = selectedPackage.discount_amount || 0;
  
  // Beregn familierabatt
  let familyDiscount = 0;
  if (isSecondDancerInFamily) {
    // Familierabatt basert på antall kurs
    if (courseCount === 1) {
      familyDiscount = Math.round(basePrice * 0.15); // 15%
    } else if (courseCount === 2) {
      familyDiscount = Math.round(basePrice * 0.30); // 30%
    } else if (courseCount >= 3) {
      familyDiscount = Math.round(basePrice * 0.50); // 50%
    }
  }

  // Beregn totaler
  const totalDiscount = packageDiscount + familyDiscount;
  const finalPrice = Math.max(0, basePrice - totalDiscount);
  const originalPrice = packageDiscount > 0 ? basePrice + packageDiscount : basePrice;

  const result: SmartPricingResult = {
    packageName: selectedPackage.name,
    total: finalPrice,
    originalPrice: packageDiscount > 0 ? originalPrice : undefined,
    discount: totalDiscount,
    appliedFamilyDiscount: familyDiscount > 0 ? familyDiscount : undefined,
    isToddlerPricing,
    breakdown: {
      basePrice,
      packageDiscount,
      familyDiscount,
      finalPrice
    }
  };

  console.log('💰 Prisberegning fullført:', {
    pakke: result.packageName,
    grunnpris: basePrice / 100,
    pakkerabatt: packageDiscount / 100,
    familierabatt: familyDiscount / 100,
    totalPris: finalPrice / 100,
    småbarn: isToddlerPricing
  });

  return result;
}