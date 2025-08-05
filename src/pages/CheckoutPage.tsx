import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  User,
  Mail,
  AlertCircle,
  Shield,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "../utils/pricing";
import { databases, DATABASE_ID, COLLECTIONS } from "../lib/appwrite";
import { vipps } from "../lib/mockVipps";
import type { CartSummary, Schedule, CustomerData } from "../types";

interface CheckoutPageProps {
  cartSummary?: CartSummary;
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
  onClearCart,
}) => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [processing, setProcessing] = useState(false);

  if (!cartSummary) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <p className="text-gray-600">Laster handlekurven...</p>
      </div>
    );
  }

  if (!cartSummary.hasItems) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 mb-4">Handlekurven er tom</p>
              <Button onClick={() => (window.location.href = "/courses")}>
                Gå til kurs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!customerData.name.trim()) newErrors.name = "Navn er påkrevd";
    if (!customerData.email.trim()) {
      newErrors.email = "E-post er påkrevd";
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = "Ugyldig e-postadresse";
    }
    if (!customerData.phone.trim()) {
      newErrors.phone = "Telefonnummer er påkrevd";
    } else if (!/^\d{8}$/.test(customerData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Telefonnummer må være 8 siffer";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (): Promise<void> => {
    if (!validateForm()) return;
    setProcessing(true);
    try {
      const orderData = {
        status: "reserved" as const,
        totalAmountInOre: cartSummary.total,
        originalAmountInOre: cartSummary.originalTotal,
        discountAmountInOre: cartSummary.totalDiscount,
        semester: "fall2025",
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        reservedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      };
      const order = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ORDERS,
        "unique()",
        orderData,
      );
      for (const item of cartSummary.items) {
        const orderItem = {
          orderId: order.$id,
          type: "package" as const,
          packageId: item.pricing.packageId || "",
          studentName: `${item.studentFirstName} ${item.studentLastName}`,
          studentAge: item.studentAge,
          priceInOre: item.pricing.total,
          selectedSchedules: item.selectedSchedules,
          discountApplied: item.isSecondDancerInFamily
            ? "family_discount"
            : undefined,
        };
        await databases.createDocument(
          DATABASE_ID,
          COLLECTIONS.ORDER_ITEMS,
          "unique()",
          orderItem,
        );
      }
      const vippsResponse = await vipps.initiatePayment({
        orderId: order.$id,
        amount: cartSummary.total,
        customerInfo: customerData,
      });
      if (vippsResponse.success) {
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.ORDERS,
          order.$id,
          { vippsOrderId: vippsResponse.orderId },
        );
        onClearCart();
        window.location.href = vippsResponse.url;
      } else {
        throw new Error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setErrors({ payment: "Kunne ikke starte betaling. Prøv igjen." });
    } finally {
      setProcessing(false);
    }
  };

  const getScheduleDetails = (scheduleId: string): Schedule | undefined => {
    return schedules.find((s) => s.$id === scheduleId);
  };

  const navigateBack = (): void => {
    window.history.back();
  };

  const familyGroups = cartSummary.items.reduce(
    (groups, item) => {
      const lastName = item.studentLastName || "Unknown";
      if (!groups[lastName]) groups[lastName] = [];
      groups[lastName].push(item);
      return groups;
    },
    {} as Record<string, typeof cartSummary.items>,
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={navigateBack} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kasse</h1>
            <p className="text-gray-600">Fullfør din bestilling</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold">Kontaktinformasjon</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fullt navn *
                  </label>
                  <input
                    type="text"
                    value={customerData.name}
                    onChange={(e) =>
                      setCustomerData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Ditt fulle navn"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-postadresse *
                  </label>
                  <input
                    type="email"
                    value={customerData.email}
                    onChange={(e) =>
                      setCustomerData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="din@email.no"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) =>
                      setCustomerData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="12345678"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Bestillingssammendrag</h2>
              </CardHeader>
              <CardContent>
                {/* Add rendering for order summary here */}
                <p>Totalt: {formatPrice(cartSummary.total)}</p>
              </CardContent>
            </Card>
            <Button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {processing
                ? "Behandler..."
                : `Betal ${formatPrice(cartSummary.total)} med Vipps`}
            </Button>
            {errors.payment && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.payment}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
