// src/containers/CoursesPageContainer.tsx - Updated with hybrid family discount system
import React from 'react';
import { useDanceClasses } from '../hooks/useDanceClasses';
import { usePricingPackages } from '../hooks/usePricingPackages';
import { useCart } from '../hooks/useCart';
import CoursesPage from '../components/CoursesPage';
import { PageLoading } from '../components/ui/loading';
import type { StudentData } from '../types';

const CoursesPageContainer: React.FC = () => {
  // Fetch data hooks
  const { 
    danceClasses, 
    schedules, 
    loading: classesLoading, 
    error: classesError 
  } = useDanceClasses();
  
  const { 
    packages, 
    loading: packagesLoading, 
    error: packagesError 
  } = usePricingPackages();

  // Cart functionality with NEW hybrid family discount functions
  const {
    addToCart,
    removeFromCart,
    getCartSummary,
    duplicateStudent,
    toggleFamilyDiscount,
    detectFamily,
    getCartItemsWithHelpers
  } = useCart(packages);

  // Combined loading and error states
  const loading = classesLoading || packagesLoading;
  const error = classesError || packagesError;

  // Handle loading state
  if (loading) {
    return (
      <PageLoading 
        title="Laster dansekurs..."
        subtitle="Henter kurs og priser for deg"
      />
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Ops! Noe gikk galt</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Prøv igjen
          </button>
        </div>
      </div>
    );
  }

  // Handle add to cart with hybrid family discount system
  const handleAddToCart = async (studentData: StudentData) => {
    try {
      console.log('🛒 CoursesPageContainer: Adding student to cart');
      console.log('   - Student:', studentData.studentFirstName, studentData.studentLastName);
      console.log('   - Age:', studentData.studentAge);
      console.log('   - Classes:', studentData.selectedClasses?.length || 0);
      console.log('   - Family discount setting:', studentData.isSecondDancerInFamily);
      console.log('   - Override flag:', studentData.familyDiscountOverride);
      
      const itemId = await addToCart(studentData);
      console.log('✅ Student successfully added to cart:', itemId);
      
      // Get updated cart summary for logging
      const cartSummary = getCartSummary();
      console.log('📊 Updated cart summary:', {
        itemCount: cartSummary.itemCount,
        total: cartSummary.total,
        familyDiscountApplied: cartSummary.items.some(item => item.isSecondDancerInFamily)
      });
      
      // Optional: Show success message (you can uncomment if you want toast notifications)
      // toast.success(`${studentData.studentFirstName} ${studentData.studentLastName} lagt til i handlekurven!`);
      
    } catch (error) {
      console.error('❌ Failed to add student:', error);
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Ukjent feil';
      alert(`Kunne ikke legge til student: ${errorMessage}`);
    }
  };

  // Handle duplicate student with enhanced error handling
  const handleDuplicateStudent = (itemId: string) => {
    try {
      console.log('👥 CoursesPageContainer: Duplicating student:', itemId);
      
      // Get original item for logging
      const cartItems = getCartItemsWithHelpers();
      const originalItem = cartItems.find(item => item.id === itemId);
      
      if (originalItem) {
        console.log('   - Original student:', originalItem.fullName);
      }
      
      const newItemId = duplicateStudent(itemId);
      console.log('✅ Student successfully duplicated:', newItemId);
      
      // Optional: Show success message
      // if (originalItem) {
      //   toast.success(`${originalItem.studentFirstName} duplicert som ${originalItem.studentFirstName} (kopi)`);
      // }
      
    } catch (error) {
      console.error('❌ Failed to duplicate student:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Ukjent feil';
      alert(`Kunne ikke duplisere student: ${errorMessage}`);
    }
  };

  // Handle family discount toggle with enhanced logging
  const handleToggleFamilyDiscount = (itemId: string) => {
    try {
      console.log('🔄 CoursesPageContainer: Toggling family discount for item:', itemId);
      
      // Get item info for logging
      const cartItems = getCartItemsWithHelpers();
      const item = cartItems.find(cartItem => cartItem.id === itemId);
      
      if (item) {
        console.log('   - Student:', item.fullName);
        console.log('   - Current family discount status:', item.isSecondDancerInFamily);
      }
      
      toggleFamilyDiscount(itemId);
      
      console.log('✅ Family discount status toggled successfully');
      
      // Optional: Show feedback message
      // const newStatus = !item?.isSecondDancerInFamily;
      // toast.info(`Familierabatt ${newStatus ? 'aktivert' : 'deaktivert'} for ${item?.studentFirstName}`);
      
    } catch (error) {
      console.error('❌ Failed to toggle family discount:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Ukjent feil';
      alert(`Kunne ikke endre familierabatt: ${errorMessage}`);
    }
  };

  // Handle family detection for StudentForm
  const handleDetectFamily = (firstName: string, lastName: string) => {
    try {
      console.log('🔍 CoursesPageContainer: Detecting family for:', firstName, lastName);
      
      const detection = detectFamily(firstName, lastName);
      
      console.log('   - Detection result:', {
        isFamily: detection.isLikelyFamily,
        confidence: detection.confidence,
        reason: detection.reason,
        suggestedName: detection.suggestedLastName
      });
      
      return detection;
      
    } catch (error) {
      console.error('❌ Failed to detect family:', error);
      
      // Return safe fallback result
      return {
        isLikelyFamily: false,
        confidence: 0,
        reason: 'Kunne ikke utføre familie-deteksjon',
        existingFamilyMembers: []
      };
    }
  };

  // Handle checkout with validation
  const handleCheckout = () => {
    try {
      console.log('🛒 CoursesPageContainer: Proceeding to checkout');
      
      // Check if cart has items
      const cartSummary = getCartSummary();
      
      if (!cartSummary.hasItems) {
        console.log('❌ Cart is empty');
        alert('Handlekurven er tom. Legg til studenter før du går til kassen.');
        return;
      }

      // Log checkout info for debugging
      console.log('📊 Checkout summary:', {
        itemCount: cartSummary.itemCount,
        total: cartSummary.total,
        totalDiscount: cartSummary.totalDiscount,
        familyDiscountApplied: cartSummary.items.some(item => item.isSecondDancerInFamily)
      });
      
      // Log family groups for debugging
      const cartItems = getCartItemsWithHelpers();
      const familyGroups = cartItems.reduce((groups, item) => {
        const lastName = item.studentLastName;
        if (!groups[lastName]) groups[lastName] = [];
        groups[lastName].push(item.studentFirstName);
        return groups;
      }, {} as Record<string, string[]>);
      
      console.log('👨‍👩‍👧‍👦 Family groups going to checkout:', familyGroups);

      // Navigate to checkout page
      console.log('🚀 Redirecting to checkout...');
      window.location.href = '/checkout';
      
    } catch (error) {
      console.error('❌ Checkout failed:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Ukjent feil';
      alert(`Kunne ikke gå til kassen: ${errorMessage}`);
    }
  };

  // Log data availability for debugging
  console.log('📊 CoursesPageContainer data status:', {
    danceClasses: danceClasses.length,
    schedules: schedules.length,
    packages: packages.length,
    loading,
    error: error || 'none'
  });

  // Ensure packages are not empty
  if (!packages || packages.length === 0) {
    console.warn('⚠️ No pricing packages found. Ensure your database is populated.');
  }
  
  // Ensure danceClasses and schedules are not empty
  if (!danceClasses || danceClasses.length === 0) {
    console.warn('⚠️ No dance classes found. Ensure your database is populated.');
  }
  
  if (!schedules || schedules.length === 0) {
    console.warn('⚠️ No schedules found. Ensure your database is populated.');
  }

  return (
    <CoursesPage
      danceClasses={danceClasses}
      schedules={schedules}
      packages={packages}
      onAddToCart={handleAddToCart}
      cartSummary={getCartSummary()}
      onRemoveFromCart={removeFromCart}
      onCheckout={handleCheckout}
      onDuplicateStudent={handleDuplicateStudent}
      onToggleFamilyDiscount={handleToggleFamilyDiscount}
      onDetectFamily={handleDetectFamily}
    />
  );
};

export default CoursesPageContainer;