// src/components/StudentForm.tsx - NEW hybrid family discount with first/last name
import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Users,
  AlertCircle,
  Plus,
  Settings,
  Info,
  Lightbulb,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { DanceClassCard } from "./DanceClassCard";
import { validateStudentAge, formatPrice } from "../utils/pricing";
import { calculateSmartPackagePrice } from "../utils/smartPricing";
import type {
  DanceClass,
  Schedule,
  PricingPackage,
  CartItemWithPricing,
  StudentFormData,
  FamilyDetectionResult,
  StudentData,
} from "../types";

interface FormErrors {
  studentFirstName?: string;
  studentLastName?: string;
  studentAge?: string;
  classes?: string;
  schedules?: string;
  ageCompatibility?: string;
}

interface StudentFormProps {
  danceClasses: DanceClass[];
  schedules: Schedule[];
  packages: PricingPackage[];
  onAddToCart: (studentData: StudentData) => void;
  cartItems: CartItemWithPricing[];
  onDetectFamily?: (
    firstName: string,
    lastName: string,
  ) => FamilyDetectionResult;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  danceClasses = [],
  schedules = [],
  packages = [],
  onAddToCart,
  cartItems = [],
  onDetectFamily,
}) => {
  const [formData, setFormData] = useState<StudentFormData>({
    studentFirstName: "",
    studentLastName: "",
    studentAge: "",
    selectedClasses: [],
    selectedSchedules: [],
    isSecondDancerInFamily: undefined, // Undefined = auto-detect
    familyDiscountOverride: undefined,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [familyDetection, setFamilyDetection] =
    useState<FamilyDetectionResult | null>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [showFamilyHelp, setShowFamilyHelp] = useState(false);

  // Real-time family detection when name changes
  useEffect(() => {
    if (
      formData.studentFirstName.trim() &&
      formData.studentLastName.trim() &&
      onDetectFamily
    ) {
      const detection = onDetectFamily(
        formData.studentFirstName,
        formData.studentLastName,
      );
      setFamilyDetection(detection);

      // Auto-show family help if family detected
      if (detection.isLikelyFamily && detection.confidence > 0.7) {
        setShowFamilyHelp(true);
      }
    } else {
      setFamilyDetection(null);
      setShowFamilyHelp(false);
    }
  }, [formData.studentFirstName, formData.studentLastName, onDetectFamily]);

  // Filter classes based on age
  const getAvailableClasses = (): DanceClass[] => {
    console.log("🔍 getAvailableClasses called with age:", formData.studentAge);

    if (!formData.studentAge) {
      console.log("📝 No age set, showing all classes");
      return danceClasses.filter((cls) => cls.availableFromYear <= 2025);
    }

    const age = parseInt(formData.studentAge);

    if (isNaN(age) || age < 3 || age > 100) {
      console.log("❌ Invalid age:", age);
      return [];
    }

    const filteredClasses = danceClasses
      .filter((cls) => {
        const ageRange = cls.age;

        console.log(
          `🎯 Checking class "${cls.name}" (${ageRange}) for age ${age}`,
        );

        let isAgeMatch = false;

        if (ageRange === "3-5 år" || ageRange === "3-5") {
          isAgeMatch = age >= 3 && age <= 5;
        } else if (ageRange === "6-8 år" || ageRange === "6-8") {
          isAgeMatch = age >= 6 && age <= 8;
        } else if (ageRange === "8+ år" || ageRange === "8+") {
          isAgeMatch = age === 8;
        } else if (ageRange === "9+ år" || ageRange === "9+") {
          isAgeMatch = age >= 9 && age <= 11;
        } else if (ageRange === "10+ år" || ageRange === "10+") {
          isAgeMatch = age >= 10 && age <= 11;
        } else if (ageRange === "12+ år" || ageRange === "12+") {
          isAgeMatch = age >= 12;
        } else {
          console.log(
            `⚠️ Unknown age range format: "${ageRange}" for class ${cls.name}`,
          );
          isAgeMatch = false;
        }

        if (isAgeMatch) {
          console.log(
            `✅ AGE MATCH: ${cls.name} (${ageRange}) matches age ${age}`,
          );
        }

        return isAgeMatch;
      })
      .filter((cls) => {
        const isAvailable = cls.availableFromYear <= 2025;
        if (!isAvailable) {
          console.log(
            `⏳ Not available: ${cls.name} (available from ${cls.availableFromYear})`,
          );
        }
        return isAvailable;
      });

    console.log(
      `✅ Found ${filteredClasses.length} available classes for age ${age}:`,
      filteredClasses.map((c) => c.name),
    );

    return filteredClasses;
  };

  // Update available classes when age changes
  useEffect(() => {
    if (formData.studentAge) {
      console.log("👥 Age changed, updating available classes...");

      const availableClasses = getAvailableClasses();
      const currentlySelected = formData.selectedClasses;

      const validSelectedClasses = currentlySelected.filter((selectedClass) =>
        availableClasses.some(
          (availableClass) => availableClass.$id === selectedClass.$id,
        ),
      );

      const validSchedules = formData.selectedSchedules.filter((scheduleId) => {
        const schedule = schedules.find((s) => s.$id === scheduleId);
        if (!schedule) return false;

        return validSelectedClasses.some(
          (cls) => cls.$id === schedule.danceClassId,
        );
      });

      if (
        validSelectedClasses.length !== currentlySelected.length ||
        validSchedules.length !== formData.selectedSchedules.length
      ) {
        console.log(
          `🔄 Removing invalid selections: ${currentlySelected.length - validSelectedClasses.length} classes, ${formData.selectedSchedules.length - validSchedules.length} schedules`,
        );

        setFormData((prev) => ({
          ...prev,
          selectedClasses: validSelectedClasses,
          selectedSchedules: validSchedules,
        }));
      }
    }
  }, [formData.studentAge, danceClasses, schedules]);

  // Calculate pricing preview
  const getPricingPreview = () => {
    if (formData.selectedClasses.length === 0) return null;

    // Determine if this would be a family member
    const wouldBeFamilyMember =
      cartItems.length > 0 || formData.isSecondDancerInFamily === true;

    return calculateSmartPackagePrice(
      formData.selectedClasses,
      packages,
      wouldBeFamilyMember,
    );
  };

  // Handle class selection
  const handleClassToggle = (danceClass: DanceClass): void => {
    console.log("🎯 Class toggle:", danceClass.name);

    const isSelected = formData.selectedClasses.some(
      (cls) => cls.$id === danceClass.$id,
    );

    if (isSelected) {
      console.log("➖ Removing class");
      setFormData((prev) => ({
        ...prev,
        selectedClasses: prev.selectedClasses.filter(
          (cls) => cls.$id !== danceClass.$id,
        ),
      }));
    } else {
      console.log("➕ Adding class");
      setFormData((prev) => ({
        ...prev,
        selectedClasses: [...prev.selectedClasses, danceClass],
      }));
    }
  };

  // Handle suggested last name acceptance
  const handleAcceptSuggestedLastName = (suggestedName: string): void => {
    setFormData((prev) => ({
      ...prev,
      studentLastName: suggestedName,
    }));
    setShowFamilyHelp(false);
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.studentFirstName.trim()) {
      newErrors.studentFirstName = "Fornavn er påkrevd";
    }

    if (!formData.studentLastName.trim()) {
      newErrors.studentLastName = "Etternavn er påkrevd";
    }

    if (!formData.studentAge) {
      newErrors.studentAge = "Alder er påkrevd";
    } else {
      const age = parseInt(formData.studentAge);
      if (isNaN(age) || age < 3 || age > 100) {
        newErrors.studentAge = "Ugyldig alder (3-100 år)";
      }
    }

    if (formData.selectedClasses.length === 0) {
      newErrors.classes = "Velg minst en klasse";
    }

    // Validate age compatibility
    if (formData.studentAge && formData.selectedClasses.length > 0) {
      const ageValidation = validateStudentAge(
        parseInt(formData.studentAge),
        formData.selectedClasses,
      );
      if (!ageValidation.valid) {
        newErrors.ageCompatibility = ageValidation.message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (): void => {
    console.log("📝 Form submission attempted");

    if (validateForm()) {
      console.log("✅ Form valid, submitting...");

      const studentData: StudentData = {
        studentFirstName: formData.studentFirstName.trim(),
        studentLastName: formData.studentLastName.trim(),
        studentAge: parseInt(formData.studentAge),
        selectedClasses: formData.selectedClasses,
        selectedSchedules: formData.selectedSchedules,
        isSecondDancerInFamily: formData.isSecondDancerInFamily,
        familyDiscountOverride: formData.familyDiscountOverride,
      };

      onAddToCart(studentData);

      // Reset form
      setFormData({
        studentFirstName: "",
        studentLastName: "",
        studentAge: "",
        selectedClasses: [],
        selectedSchedules: [],
        isSecondDancerInFamily: undefined,
        familyDiscountOverride: undefined,
      });
      setCurrentStep(1);
      setErrors({});
      setFamilyDetection(null);
      setShowAdvancedSettings(false);
      setShowFamilyHelp(false);

      console.log("🔄 Form reset");
    } else {
      console.log("❌ Form validation failed:", errors);
    }
  };

  // Check if we can proceed to next step
  const canProceedToStep2 =
    formData.studentFirstName.trim() &&
    formData.studentLastName.trim() &&
    formData.studentAge &&
    !errors.studentFirstName &&
    !errors.studentLastName &&
    !errors.studentAge &&
    parseInt(formData.studentAge) >= 3 &&
    parseInt(formData.studentAge) <= 100;

  const canProceedToStep3 = formData.selectedClasses.length > 0;

  const pricingPreview = getPricingPreview();
  const availableClasses = getAvailableClasses();

  console.log("🔍 Current state:", {
    step: currentStep,
    firstName: formData.studentFirstName,
    lastName: formData.studentLastName,
    age: formData.studentAge,
    canProceedToStep2,
    canProceedToStep3,
    availableClasses: availableClasses.length,
    selectedClasses: formData.selectedClasses.length,
    familyDetection: familyDetection?.isLikelyFamily,
  });

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold">Legg til student</h2>
          {cartItems.length > 0 && (
            <Badge variant="info" className="ml-2">
              <Users className="w-3 h-3 mr-1" />
              Familie-rabatt aktiveres automatisk!
            </Badge>
          )}
        </div>

        {/* Step indicator */}
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    currentStep > step ? "bg-purple-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-2 text-sm text-gray-600">
          {currentStep === 1 && "Studentinformasjon"}
          {currentStep === 2 && "Velg klasser og timer"}
          {currentStep === 3 && "Bekreft og legg til"}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step 1: Student Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            {/* Names row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fornavn *
                </label>
                <input
                  type="text"
                  value={formData.studentFirstName}
                  onChange={(e) => {
                    console.log("📝 First name changed:", e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      studentFirstName: e.target.value,
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Fornavn"
                />
                {errors.studentFirstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.studentFirstName}
                  </p>
                )}
              </div>

              {/* Last name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Etternavn *
                </label>
                <input
                  type="text"
                  value={formData.studentLastName}
                  onChange={(e) => {
                    console.log("📝 Last name changed:", e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      studentLastName: e.target.value,
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Etternavn"
                />
                {errors.studentLastName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.studentLastName}
                  </p>
                )}
              </div>
            </div>

            {/* Age */}
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alder *
              </label>
              <input
                type="number"
                min="3"
                max="100"
                value={formData.studentAge}
                onChange={(e) => {
                  console.log("🎂 Age changed:", e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    studentAge: e.target.value,
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Alder"
              />
              {errors.studentAge && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.studentAge}
                </p>
              )}
            </div>

            {/* Family Detection Results */}
            {familyDetection && (
              <div
                className={`p-4 rounded-lg border-l-4 ${
                  familyDetection.isLikelyFamily
                    ? familyDetection.confidence > 0.9
                      ? "bg-green-50 border-green-400"
                      : "bg-yellow-50 border-yellow-400"
                    : "bg-blue-50 border-blue-400"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 mt-0.5 text-blue-600" />
                  <div className="flex-1">
                    {familyDetection.isLikelyFamily ? (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Familie oppdaget! 👨‍👩‍👧‍👦
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          {familyDetection.reason}
                        </p>

                        {familyDetection.suggestedLastName && (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                              Mente du{" "}
                              <strong>
                                {familyDetection.suggestedLastName}
                              </strong>
                              ?
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleAcceptSuggestedLastName(
                                  familyDetection.suggestedLastName!,
                                )
                              }
                              className="text-blue-600 border-blue-300 hover:bg-blue-50"
                            >
                              Bruk "{familyDetection.suggestedLastName}"
                            </Button>
                          </div>
                        )}

                        <div className="mt-3 p-2 bg-green-100 rounded text-sm text-green-800">
                          <strong>Familierabatt aktiveres automatisk!</strong>
                          <br />
                          Sparer 15-50% avhengig av antall klasser.
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {familyDetection.reason.includes("allerede")
                            ? "⚠️ Duplikat oppdaget"
                            : "👤 Ny student"}
                        </h4>
                        <p className="text-sm text-gray-700">
                          {familyDetection.reason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Settings (for power users) */}
            {cartItems.length > 0 && (
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Avanserte innstillinger
                </Button>

                {showAdvancedSettings && (
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <h4 className="font-medium text-gray-900">
                      Familierabatt kontroll
                    </h4>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="familyDiscount"
                          checked={
                            formData.isSecondDancerInFamily === undefined
                          }
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              isSecondDancerInFamily: undefined,
                              familyDiscountOverride: undefined,
                            }))
                          }
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">
                          <strong>Automatisk</strong> (anbefalt) - Aktiveres for
                          danser nr. 2+
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="familyDiscount"
                          checked={formData.isSecondDancerInFamily === true}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              isSecondDancerInFamily: true,
                              familyDiscountOverride: true,
                            }))
                          }
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">
                          <strong>Tvungen på</strong> - Familierabatt selv for
                          første student
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="familyDiscount"
                          checked={formData.isSecondDancerInFamily === false}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              isSecondDancerInFamily: false,
                              familyDiscountOverride: false,
                            }))
                          }
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">
                          <strong>Tvungen av</strong> - Ingen familierabatt
                          (f.eks. venner)
                        </span>
                      </label>
                    </div>

                    <div className="text-xs text-gray-500 bg-white p-2 rounded">
                      <Info className="w-3 h-3 inline mr-1" />
                      Bruk dette kun hvis automatisk deteksjon ikke fungerer for
                      ditt tilfelle.
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  console.log("🔘 Next button clicked!");
                  console.log("canProceedToStep2:", canProceedToStep2);
                  if (canProceedToStep2) {
                    console.log("✅ Proceeding to step 2");
                    setCurrentStep(2);
                  } else {
                    console.log("❌ Cannot proceed to step 2");
                  }
                }}
                disabled={!canProceedToStep2}
                className={
                  !canProceedToStep2 ? "opacity-50 cursor-not-allowed" : ""
                }
              >
                Neste: Velg klasser
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Class Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Student info */}
            {formData.studentFirstName &&
              formData.studentLastName &&
              formData.studentAge && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Viser klasser for {formData.studentFirstName}{" "}
                    {formData.studentLastName} ({formData.studentAge} år)
                  </h4>
                  <p className="text-sm text-blue-600">
                    Kun klasser som passer til alderen vises nedenfor.
                  </p>
                  {cartItems.length > 0 && (
                    <div className="mt-2 text-sm text-green-700 font-medium">
                      ✨ Familierabatt aktiveres automatisk for denne studenten
                    </div>
                  )}
                </div>
              )}

            {/* Selected classes summary */}
            {formData.selectedClasses.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">
                  Valgte klasser:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {formData.selectedClasses.map((cls) => (
                    <Badge key={cls.$id} variant="success">
                      {cls.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Available classes */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                Tilgjengelige klasser
                {formData.studentAge && ` for ${formData.studentAge} år`}
              </h3>

              {availableClasses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>
                    {formData.studentAge
                      ? `Ingen klasser tilgjengelig for ${formData.studentAge} år`
                      : "Fyll inn alder for å se tilgjengelige klasser"}
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {availableClasses.map((cls) => {
                    const isSelected = formData.selectedClasses.some(
                      (selected) => selected.$id === cls.$id,
                    );

                    return (
                      <div key={cls.$id} className="relative">
                        <div
                          onClick={(e) => {
                            if (
                              e.target === e.currentTarget ||
                              !e.target.closest("[data-schedule-item]")
                            ) {
                              handleClassToggle(cls);
                            }
                          }}
                          className={`cursor-pointer transition-all ${
                            isSelected
                              ? "ring-2 ring-purple-500"
                              : "hover:shadow-md"
                          }`}
                        >
                          <DanceClassCard
                            danceClass={cls}
                            schedules={schedules}
                            onSelectSchedule={undefined}
                            selectedSchedules={[]}
                            showSchedules={isSelected}
                          />
                        </div>

                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <Badge variant="success">Valgt</Badge>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {errors.classes && (
              <p className="text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.classes}
              </p>
            )}

            {errors.ageCompatibility && (
              <p className="text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.ageCompatibility}
              </p>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Tilbake
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!canProceedToStep3}
              >
                Neste: Bekreft
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Oppsummering</h3>

              <div className="space-y-3">
                <div>
                  <span className="font-medium">Student:</span>{" "}
                  {formData.studentFirstName} {formData.studentLastName} (
                  {formData.studentAge} år)
                </div>

                {/* Family discount status */}
                {cartItems.length > 0 && (
                  <div className="text-blue-600">
                    <Users className="w-4 h-4 inline mr-1" />
                    {formData.familyDiscountOverride === false
                      ? "Familierabatt deaktivert (manuelt)"
                      : formData.familyDiscountOverride === true
                        ? "Familierabatt aktivert (manuelt)"
                        : "Familierabatt aktivert (automatisk)"}
                  </div>
                )}

                <div>
                  <span className="font-medium">Valgte klasser:</span>
                  <ul className="mt-2 space-y-1">
                    {formData.selectedClasses.map((cls) => {
                      const schedule = schedules.find(
                        (s) => s.danceClassId === cls.$id && s.isActive,
                      );
                      return (
                        <li
                          key={cls.$id}
                          className="flex justify-between items-center text-sm"
                        >
                          <span>{cls.name}</span>
                          {schedule && (
                            <span className="text-gray-600">
                              {schedule.day} {schedule.startTime}-
                              {schedule.endTime}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {pricingPreview && (
                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Pakke:</span>
                      <span>{pricingPreview.packageName}</span>
                    </div>
                    {pricingPreview.discount > 0 && (
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Opprinnelig pris:</span>
                        <span className="line-through">
                          {formatPrice(pricingPreview.originalPrice || 0)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-lg font-semibold text-purple-600">
                      <span>Pris:</span>
                      <span>{formatPrice(pricingPreview.total)}</span>
                    </div>
                    {pricingPreview.discount > 0 && (
                      <div className="text-sm text-green-600">
                        Du sparer {formatPrice(pricingPreview.discount)}!
                        {pricingPreview.appliedFamilyDiscount && (
                          <span className="block">
                            (inkludert{" "}
                            {formatPrice(pricingPreview.appliedFamilyDiscount)}{" "}
                            familierabatt)
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Smart tips */}
            {cartItems.length === 0 &&
              formData.selectedClasses.length === 1 && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Tips!</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Har du flere barn? Familierabatt aktiveres automatisk
                        for barn nr. 2+ (15% for 1 klasse, 30% for 2 klasser,
                        50% for 3+ klasser)
                      </p>
                    </div>
                  </div>
                </div>
              )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Tilbake
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Legg til i handlekurv
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
