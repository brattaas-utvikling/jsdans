// src/components/enrollment/steps/ContactInfoStep.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import {
  User,
  UserCheck,
  Calendar,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useEnrollment } from "@/contexts/EnrollmentContext";

export default function ContactInfoStep() {
  const {
    state,
    setStudentData,
    setGuardianData,
    goToNextStep,
    validateCurrentStep,
  } = useEnrollment();

  // Local form state
  const [studentForm, setStudentForm] = useState({
    firstName: state.enrollmentData.student.firstName || "",
    lastName: state.enrollmentData.student.lastName || "",
    birthDate: state.enrollmentData.student.birthDate || "",
  });

  const [guardianForm, setGuardianForm] = useState({
    name: state.enrollmentData.guardian.name || "",
    email: state.enrollmentData.guardian.email || "",
    phone: state.enrollmentData.guardian.phone || "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Update context when form changes
  useEffect(() => {
    setStudentData(studentForm);
  }, [studentForm, setStudentData]);

  useEffect(() => {
    setGuardianData(guardianForm);
  }, [guardianForm, setGuardianData]);

  // Check form validity
  useEffect(() => {
    const isValid =
      studentForm.firstName.trim() !== "" &&
      studentForm.lastName.trim() !== "" &&
      studentForm.birthDate !== "" &&
      guardianForm.name.trim() !== "" &&
      guardianForm.email.trim() !== "" &&
      guardianForm.phone.trim() !== "" &&
      /\S+@\S+\.\S+/.test(guardianForm.email);

    setIsFormValid(isValid);
  }, [studentForm, guardianForm]);

  const handleNext = () => {
    if (validateCurrentStep()) {
      goToNextStep();
    }
  };

  const handleStudentChange = (field: string, value: string) => {
    setStudentForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuardianChange = (field: string, value: string) => {
    setGuardianForm((prev) => ({ ...prev, [field]: value }));
  };

  // Calculate age for display
  const calculateAge = (birthDate: string): number | null => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const studentAge = calculateAge(studentForm.birthDate);

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-full">
            <User className="h-6 w-6 text-brand-600 dark:text-brand-400" />
          </div>
        </div>
        <h2 className="font-bebas text-bebas-xl text-gray-900 dark:text-white mb-2">
          Kontaktinformasjon
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-montserrat">
          Vi trenger litt informasjon om eleven og foresatt
        </p>
      </motion.div>

      <form className="space-y-8">
        {/* Student Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-brand-50/50 to-coral-50/30 
                     dark:from-brand-900/20 dark:to-coral-900/10 
                     p-6 rounded-xl border border-brand-100/50 dark:border-brand-700/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">
              Eleven
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fornavn *
              </label>
              <input
                type="text"
                value={studentForm.firstName}
                onChange={(e) =>
                  handleStudentChange("firstName", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                          bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                          font-montserrat transition-colors"
                placeholder="Skriv elevens fornavn"
              />
              {state.errors.student?.firstName && (
                <p className="text-red-500 text-sm font-montserrat mt-1">
                  {state.errors.student.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                Etternavn *
              </label>
              <input
                type="text"
                value={studentForm.lastName}
                onChange={(e) =>
                  handleStudentChange("lastName", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                          bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                          font-montserrat transition-colors"
                placeholder="Skriv elevens etternavn"
              />
              {state.errors.student?.lastName && (
                <p className="text-red-500 text-sm font-montserrat mt-1">
                  {state.errors.student.lastName}
                </p>
              )}
            </div>

            {/* Birth Date */}
            <div className="md:col-span-2">
              <label className="block text-sm font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fødselsdato *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={studentForm.birthDate}
                  onChange={(e) =>
                    handleStudentChange("birthDate", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 
                            rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                            bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                            font-montserrat transition-colors"
                />
              </div>
              {studentAge !== null && (
                <p className="text-brand-600 dark:text-brand-400 text-sm font-montserrat mt-1">
                  Alder: {studentAge} år
                </p>
              )}
              {state.errors.student?.birthDate && (
                <p className="text-red-500 text-sm font-montserrat mt-1">
                  {state.errors.student.birthDate}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Guardian Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-magenta-50/50 to-coral-50/30 
                     dark:from-magenta-900/20 dark:to-coral-900/10 
                     p-6 rounded-xl border border-magenta-100/50 dark:border-magenta-700/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="h-5 w-5 text-magenta-600 dark:text-magenta-400" />
            <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">
              Foresatt/Kontaktperson
            </h3>
          </div>

          <div className="space-y-4">
            {/* Guardian Name */}
            <div>
              <label className="block text-sm font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                Navn *
              </label>
              <input
                type="text"
                value={guardianForm.name}
                onChange={(e) => handleGuardianChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                          rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                          bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                          font-montserrat transition-colors"
                placeholder="Navn på foresatt/kontaktperson"
              />
              {state.errors.guardian?.name && (
                <p className="text-red-500 text-sm font-montserrat mt-1">
                  {state.errors.guardian.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                  E-postadresse *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={guardianForm.email}
                    onChange={(e) =>
                      handleGuardianChange("email", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 
                              rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                              bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                              font-montserrat transition-colors"
                    placeholder="example@email.com"
                  />
                </div>
                {state.errors.guardian?.email && (
                  <p className="text-red-500 text-sm font-montserrat mt-1">
                    {state.errors.guardian.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telefonnummer *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={guardianForm.phone}
                    onChange={(e) =>
                      handleGuardianChange("phone", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 
                              rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                              bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                              font-montserrat transition-colors"
                    placeholder="+47 123 45 678"
                  />
                </div>
                {state.errors.guardian?.phone && (
                  <p className="text-red-500 text-sm font-montserrat mt-1">
                    {state.errors.guardian.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-end pt-4"
        >
          <Button
            onClick={handleNext}
            disabled={!isFormValid}
            className={`
              px-8 py-3 rounded-full font-semibold font-montserrat text-base
              transition-all duration-200 flex items-center gap-2
              ${
                isFormValid
                  ? "bg-brand-500 hover:bg-brand-600 text-white shadow-brand-lg hover:shadow-brand-xl transform hover:scale-[1.02]"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Neste steg
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
