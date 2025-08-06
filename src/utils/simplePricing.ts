// src/utils/simplePricing.ts
import type { DanceClass } from '../types';

export interface SimplePricingResult {
  totalPrice: number; // Total pris i kroner
  basePrice: number; // Grunnpris før rabatt
  discount: number; // Rabatt i kroner
  breakdown: {
    barnedansCount: number;
    vanligCount: number;
    kompaniCount: number;
    barnedansPrice: number;
    vanligPrice: number;
    kompaniPrice: number;
  };
  isSecondDancerInFamily: boolean;
}

export interface CourseCategory {
  type: 'barnedans' | 'vanlig' | 'kompani';
  count: number;
}

// Identifiser kurstype basert på alder og navn
export function identifyCourseType(course: DanceClass): 'barnedans' | 'vanlig' | 'kompani' {
  const courseName = course.name.toLowerCase();
  const ageRange = course.age.trim().toLowerCase();
  
  // Sjekk først for kompani (har prioritet)
  if (courseName.includes('kompani') || courseName.includes('aspirantkompani')) {
    return 'kompani';
  }
  
  // Sjekk for barnedans basert på alder
  if (ageRange === '3-4 år' || ageRange === '3-4' || 
      ageRange === '4-6 år' || ageRange === '4-6' ||
      ageRange === '3-5 år' || ageRange === '3-5' ||
      ageRange === '5-6 år' || ageRange === '5-6') {
    return 'barnedans';
  }
  
  // Alt annet er vanlig kurs (6-9 år og oppover)
  return 'vanlig';
}

// Kategoriser alle valgte kurs
export function categorizeSelectedCourses(selectedCourses: DanceClass[]): CourseCategory[] {
  const categories: Record<'barnedans' | 'vanlig' | 'kompani', number> = {
    barnedans: 0,
    vanlig: 0,
    kompani: 0
  };
  
  selectedCourses.forEach(course => {
    const type = identifyCourseType(course);
    categories[type]++;
  });
  
  const result: CourseCategory[] = [];
  
  // Legg til kategorier som har kurs
  if (categories.barnedans > 0) {
    result.push({ type: 'barnedans', count: categories.barnedans });
  }
  if (categories.vanlig > 0) {
    result.push({ type: 'vanlig', count: categories.vanlig });
  }
  if (categories.kompani > 0) {
    result.push({ type: 'kompani', count: categories.kompani });
  }
  
  return result;
}

// Beregn pris for vanlige kurs (6+ år)
export function calculateVanligPrice(count: number): { price: number; discount: number } {
  if (count === 0) return { price: 0, discount: 0 };
  
  switch (count) {
    case 1:
      return { price: 1700, discount: 0 };
    case 2:
      return { price: 3200, discount: 200 }; // 3400 - 200
    default: // 3+
      return { price: 5100, discount: 600 }; // 5100 - 600
  }
}

// Beregn pris for barnedans (3-6 år)
export function calculateBarnedansPrice(count: number): { price: number; discount: number } {
  if (count === 0) return { price: 0, discount: 0 };
  
  // Barnedans er alltid 1300 kr per kurs, ingen volumrabatt
  return { price: count * 1300, discount: 0 };
}

// Beregn pris for kompani
export function calculateKompaniPrice(count: number): { price: number; discount: number } {
  if (count === 0) return { price: 0, discount: 0 };
  
  // Kompani er vanlig pris + 500 kr ekstra per kurs
  return { price: count * 2200, discount: 0 }; // 1700 + 500
}


// Hovedfunksjon for prisberegning
export function calculateSimplePrice(
  selectedCourses: DanceClass[],
  isSecondDancerInFamily: boolean = false
): SimplePricingResult {
  
  if (selectedCourses.length === 0) {
    return {
      totalPrice: 0,
      basePrice: 0,
      discount: 0,
      breakdown: {
        barnedansCount: 0,
        vanligCount: 0,
        kompaniCount: 0,
        barnedansPrice: 0,
        vanligPrice: 0,
        kompaniPrice: 0,
      },
      isSecondDancerInFamily
    };
  }

  // Kategoriser kursene
  const categories = categorizeSelectedCourses(selectedCourses);
  
  let barnedansCount = 0;
  let vanligCount = 0;
  let kompaniCount = 0;
  
  categories.forEach(cat => {
    switch (cat.type) {
      case 'barnedans':
        barnedansCount = cat.count;
        break;
      case 'vanlig':
        vanligCount = cat.count;
        break;
      case 'kompani':
        kompaniCount = cat.count;
        break;
    }
  });

  // Beregn priser for hver kategori
  const barnedansResult = calculateBarnedansPrice(barnedansCount);
  const vanligResult = calculateVanligPrice(vanligCount);
  const kompaniResult = calculateKompaniPrice(kompaniCount);

  // Sum opp alt
  const basePrice = barnedansResult.price + vanligResult.price + kompaniResult.price;
  const volumeDiscount = barnedansResult.discount + vanligResult.discount + kompaniResult.discount;
  
  // Beregn pris etter volumrabatt
  const priceAfterVolumeDiscount = basePrice - volumeDiscount;

  
  // Endelig pris
  const totalPrice = Math.max(0, priceAfterVolumeDiscount);

  console.log('💰 Prisberegning:', {
    barnedansCount,
    vanligCount, 
    kompaniCount,
    basePrice,
    volumeDiscount,
    totalPrice
  });

  return {
    totalPrice,
    basePrice,
    discount: volumeDiscount,
    breakdown: {
      barnedansCount,
      vanligCount,
      kompaniCount,
      barnedansPrice: barnedansResult.price,
      vanligPrice: vanligResult.price,
      kompaniPrice: kompaniResult.price,
    },
    isSecondDancerInFamily
  };
}

// Formattering
export function formatPrice(price: number): string {
  return `${price.toLocaleString('no-NO')} kr`;
}