// src/pages/CheckoutPage.tsx
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, User, Mail, Phone, AlertCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '../utils/pricing';
import { databases, DATABASE_ID, COLLECTIONS } from '../lib/appwrite';
import { vipps } from '../lib/mockVipps';
import type { CartSummary, Schedule, CustomerData } from '../types';

interface CheckoutPageProps {
  cartSummary: CartSummary;
  schedules: Schedule[];
  onClearCart: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  payment?: string;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ 
  cartSummary, 
  schedules = [],
  onClearCart 
}) => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [processing, setProcessing] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!customerData.name.trim()) {
      newErrors.name = 'Navn er påkrevd';
    }

    if (!customerData.email.trim()) {
      newErrors.email = 'E-post er påkrevd';
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = 'Ugyldig e-postadresse';
    }

    if (!customerData.phone.trim()) {
      newErrors.phone = 'Telefonnummer er påkrevd';
    } else if (!/^\d{8}$/.test(customerData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Telefonnummer må være 8 siffer';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (): Promise<void> => {
    if (!validateForm()) return;

    setProcessing(true);

    try {
      // Create order in database
      const orderData = {
        status: 'reserved' as const,
        totalAmountInOre: cartSummary.total,
        originalAmountInOre: cartSummary.originalTotal,
        discountAmountInOre: cartSummary.totalDiscount,
        semester: 'fall2025',
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        reservedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes
      };

      console.log('Creating order:', orderData);

      const order = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ORDERS,
        'unique()',
        orderData
      );

      console.log('Order created:', order);

      // Create order items
      for (const item of cartSummary.items) {
        const orderItem = {
          orderId: order.$id,
          type: 'package' as const,
          packageId: item.pricing.packageId || '',
          studentName: item.studentName,
          studentAge: item.studentAge,
          priceInOre: item.pricing.total,
          selectedSchedules: item.selectedSchedules,
          discountApplied: item.isSecondDancerInFamily ? 'family_discount' : undefined
        };

        await databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.ORDER_ITEMS,
          'unique()',
          orderItem
        );
      }

      // Initiate Vipps payment
      const paymentData = {
        orderId: order.$id,
        amount: cartSummary.total,
        customerInfo: customerData
      };

      console.log('Initiating Vipps payment:', paymentData);

      const vippsResponse = await vipps.initiatePayment(paymentData);

      if (vippsResponse.success) {
        // Update order with Vipps order ID
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.ORDERS,
          order.$id,
          {
            vippsOrderId: vippsResponse.orderId
          }
        );

        // Clear cart
        onClearCart();

        // Redirect to Vipps (or mock payment page)
        window.location.href = vippsResponse.url;
      } else {
        throw new Error('Failed to initiate payment');
      }

    } catch (error) {
      console.error('Payment initiation failed:', error);
      setErrors({ payment: 'Kunne ikke starte betaling. Prøv igjen.' });
    } finally {
      setProcessing(false);
    }
  };

  const getScheduleDetails = (scheduleId: string): Schedule | undefined => {
    return schedules.find(s => s.$id === scheduleId);
  };

  const navigateBack = (): void => {
    window.history.back();
  };

  if (!cartSummary.hasItems) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 mb-4">Handlekurven er tom</p>
              <Button onClick={() => window.location.href = '/courses'}>
                Gå til kurs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={navigateBack}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kasse</h1>
            <p className="text-gray-600">Fullfør din bestilling</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold">Kontaktinformasjon</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fullt navn *
                  </label>
                  <input
                    type="text"
                    value={customerData.name}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ditt fulle navn"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-postadresse *
                  </label>
                  <input
                    type="email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="din@email.no"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="12345678"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Vi sender bekreftelse på e-post</p>
                      <p>Du vil motta kursdetaljer og påminnelser på den oppgitte e-postadressen.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold">Betalingsmetode</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-8 bg-purple-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">V</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Vipps</p>
                        <p className="text-sm text-gray-600">Trygg og rask betaling</p>
                      </div>
                    </div>
                    <Badge variant="primary">Anbefalt</Badge>
                  </div>
                </div>

                <div className="mt-4 flex items-start space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 mt-0.5" />
                  <p>
                    Betaling behandles sikkert av Vipps. Vi lagrer ikke betalingsinformasjon.
                  </p>
                </div>

                {errors.payment && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.payment}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Bestillingssammendrag</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Items */}
                {cartSummary.items.map((item) => (
                  <div key={item.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.studentName}</h4>
                        <p className="text-sm text-gray-600">{item.studentAge} år</p>
                        {item.isSecondDancerInFamily && (
                          <Badge variant="info" className="mt-1">
                            Familierabatt
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(item.pricing.total)}</p>
                        {item.pricing.discount > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            {formatPrice(item.pricing.originalPrice || 0)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      {item.selectedClasses.map(cls => {
                        const schedule = item.selectedSchedules
                          .map(scheduleId => getScheduleDetails(scheduleId))
                          .find(s => s?.danceClassId === cls.$id);

                        return (
                          <div key={cls.$id} className="text-sm text-gray-600">
                            <span className="font-medium">{cls.name}</span>
                            {schedule && (
                              <span className="ml-2">
                                • {schedule.day} {schedule.startTime}-{schedule.endTime}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Pakke: {item.pricing.packageName}
                    </p>
                  </div>
                ))}

                {/* Totals */}
                <div className="space-y-2 pt-4 border-t">
                  {cartSummary.totalDiscount > 0 && (
                    <>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal:</span>
                        <span>{formatPrice(cartSummary.originalTotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Rabatt:</span>
                        <span>-{formatPrice(cartSummary.totalDiscount)}</span>
                      </div>
                    </>
                  )}
                  
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                    <span>Totalt:</span>
                    <span>{formatPrice(cartSummary.total)}</span>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  loading={processing}
                  disabled={processing}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {processing ? 'Behandler...' : `Betal ${formatPrice(cartSummary.total)} med Vipps`}
                </Button>

                <div className="text-xs text-gray-500 text-center space-y-1">
                  <p>Ved å fullføre kjøpet godtar du våre vilkår og betingelser</p>
                  <p>Du vil få en bekreftelse på e-post etter vellykket betaling</p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <h3 className="font-medium text-gray-900 mb-3">Viktig informasjon</h3>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Prisene gjelder for hele høstsemesteret 2025</li>
                  <li>Du kan ikke refundere etter påmeldingsfristen</li>
                  <li>Familierabatt gjelder automatisk for danser nr. 2+</li>
                  <li>Du mottar kursdetaljer på e-post etter betaling</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};