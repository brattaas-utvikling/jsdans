// src/components/CoursesPage.tsx - Updated with family detection support
import React from 'react';
import type { 
  DanceClass, 
  PricingPackage, 
  Schedule, 
  CartSummary, 
  StudentData,
  FamilyDetectionResult
} from '@/types';
import { Cart } from './Cart';
import { StudentForm } from './StudentForm';

interface CoursesPageProps {
  danceClasses: DanceClass[];
  schedules: Schedule[];
  packages: PricingPackage[];
  onAddToCart: (studentData: StudentData) => void;
  cartSummary: CartSummary;
  onRemoveFromCart: (itemId: string) => void;
  onCheckout: () => void;
  onDuplicateStudent?: (itemId: string) => void;
  onToggleFamilyDiscount?: (itemId: string) => void;
  onDetectFamily?: (firstName: string, lastName: string) => FamilyDetectionResult;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ 
  danceClasses, 
  schedules, 
  packages, 
  onAddToCart, 
  cartSummary,
  onRemoveFromCart,
  onCheckout,
  onDuplicateStudent,
  onToggleFamilyDiscount,
  onDetectFamily
}) => {
  // Ensure cartSummary has default values if undefined
  const safeCartSummary = cartSummary || {
    itemCount: 0,
    total: 0,
    totalDiscount: 0,
    originalTotal: 0,
    items: [],
    hasItems: false
  };

  // Log props for debugging
  console.log('📊 CoursesPage props:', {
    danceClasses: danceClasses.length,
    schedules: schedules.length,
    packages: packages.length,
    cartItems: safeCartSummary.itemCount,
    hasDetectFamily: !!onDetectFamily
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Våre Dansekurs
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Velg dine favorittklasser og bygg din egen danseopplevelse. 
            Vi tilbyr flexible pakker med automatisk familierabatt.
          </p>
          
          {/* Highlight hybrid family discount feature */}
          {safeCartSummary.itemCount === 0 && (
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm">
              <span className="mr-2">🎉</span>
              <span className="font-medium">Nytt:</span>
              <span className="ml-1">Automatisk familierabatt når du legger til flere barn!</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Student Form */}
          <div className="lg:col-span-2">
            <StudentForm
              danceClasses={danceClasses}
              schedules={schedules}
              packages={packages}
              onAddToCart={onAddToCart}
              cartItems={safeCartSummary.items || []}
              onDetectFamily={onDetectFamily}
            />
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Cart
                cartSummary={safeCartSummary}
                schedules={schedules}
                onRemoveItem={onRemoveFromCart}
                onCheckout={onCheckout}
                onDuplicateItem={onDuplicateStudent}
                onToggleFamilyDiscount={onToggleFamilyDiscount}
              />
            </div>
          </div>
        </div>

        {/* Information section about hybrid family discount */}
        {safeCartSummary.itemCount === 0 && (
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Slik fungerer vår intelligente familierabatt
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Student 1</h3>
                  <p className="text-sm text-gray-600">
                    Legg til første student med full pris. Ingen familierabatt ennå.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Student 2+</h3>
                  <p className="text-sm text-gray-600">
                    Familierabatt aktiveres automatisk! 15-50% rabatt basert på antall klasser.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart deteksjon</h3>
                  <p className="text-sm text-gray-600">
                    Systemet foreslår etternavn og grupperer automatisk familiemedlemmer.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Rabattsatser:</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">15%</div>
                    <div className="text-gray-600">1 klasse</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">30%</div>
                    <div className="text-gray-600">2 klasser</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">50%</div>
                    <div className="text-gray-600">3+ klasser</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Family discount showcase for existing cart */}
        {safeCartSummary.itemCount > 0 && safeCartSummary.items.some(item => item.isSecondDancerInFamily) && (
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  🎉 Familierabatt aktivert!
                </h3>
                <p className="text-gray-600 mb-4">
                  Du sparer totalt <span className="font-bold text-green-600">{(safeCartSummary.totalDiscount / 100).toFixed(0)} kr</span> med familierabatten
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-gray-900">Opprinnelig pris</div>
                    <div className="text-gray-600 line-through">{(safeCartSummary.originalTotal / 100).toFixed(0)} kr</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-semibold text-gray-900">Med familierabatt</div>
                    <div className="text-green-600 font-bold">{(safeCartSummary.total / 100).toFixed(0)} kr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;