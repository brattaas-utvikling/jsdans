import React, { useEffect } from 'react';
import { useDanceClasses } from '../hooks/useDanceClasses';
import { usePricingPackages } from '../hooks/usePricingPackages';
import { useCart } from '../hooks/useCart';
import { CheckoutPage } from './CheckoutPage';
import { PageLoading } from '../components/ui/loading';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ShoppingCart } from 'lucide-react';

const CheckoutPageContainer: React.FC = () => {
  const { schedules, loading: schedulesLoading, error: schedulesError } = useDanceClasses();
  const { packages, loading: packagesLoading } = usePricingPackages();

  const {
    getCartSummary,
    clearCart
  } = useCart(packages);

  const cartSummary = getCartSummary();
  const loading = schedulesLoading || packagesLoading;

  useEffect(() => {
    if (!loading && !cartSummary.hasItems) {
      const timeout = setTimeout(() => {
        window.location.href = '/courses';
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [loading, cartSummary.hasItems]);

  if (loading) {
    return (
      <PageLoading 
        title="Laster checkout..."
        subtitle="Forbereder bestillingen din"
      />
    );
  }

  if (schedulesError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Kunne ikke laste checkout</h2>
          <p className="text-gray-600">{schedulesError}</p>
          <Button onClick={() => window.location.href = '/courses'} className="bg-purple-600 hover:bg-purple-700">
            Tilbake til kurs
          </Button>
        </div>
      </div>
    );
  }

  if (!cartSummary.hasItems) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="text-center py-12">
            <CardContent className="space-y-6">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Handlekurven er tom</h2>
                <p className="text-gray-600 mb-6">
                  Du blir omdirigert til kurs-siden om kort tid...
                </p>
              </div>
              <Button onClick={() => window.location.href = '/courses'} className="bg-purple-600 hover:bg-purple-700">
                Gå til kurs nå
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleClearCart = () => {
    try {
      clearCart();
    } catch (error) {
      console.error('❌ Failed to clear cart:', error);
    }
  };

  return (
    <CheckoutPage
      cartSummary={cartSummary}
      schedules={schedules}
      onClearCart={handleClearCart}
    />
  );
};

export default CheckoutPageContainer;
