// src/components/enrollment/steps/ContactInfoStep.tsx - Oppdatert med TermsModal
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
  AlertCircle,
  Users,
  Plus,
  Trash2,
  MapPin,
  Home,
  FileText,
} from "lucide-react";
import { useEnrollment } from "@/contexts/EnrollmentContext";
import ScrollToTop from "@/helpers/ScrollToTop";
import TermsModal from "../../TermsModal"; // ✨ NY: Import TermsModal
import type { Sibling } from "@/types/enrollment";

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  guardianName?: string;
  email?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  siblings?: {
    [index: number]: {
      firstName?: string;
      lastName?: string;
    };
  };
}

export default function ContactInfoStep() {
  const {
    state,
    setStudentData,
    setGuardianData,
    goToNextStep,
    validateCurrentStep,
    dispatch,
  } = useEnrollment();

  // ✨ NY: State for TermsModal
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

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
    address: state.enrollmentData.guardian.address || "",
    postalCode: state.enrollmentData.guardian.postalCode || "",
    city: state.enrollmentData.guardian.city || "",
  });

  const [hasSiblings, setHasSiblings] = useState(state.enrollmentData.hasSiblings || false);
  const [siblings, setSiblings] = useState<Sibling[]>(
    state.enrollmentData.siblings.length > 0 
      ? state.enrollmentData.siblings 
      : [{ firstName: "", lastName: "" }]
  );

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // ✨ NY: Funksjon for å åpne betingelser modal
  const handleOpenTerms = () => {
    setIsTermsModalOpen(true);
  };

  // Validation functions
  const validateFirstName = (value: string): string | undefined => {
    if (!value.trim()) return "Fornavn er påkrevd";
    if (value.trim().length < 2) return "Fornavn må være minst 2 tegn";
    if (value.trim().length > 50) return "Fornavn kan ikke være lengre enn 50 tegn";
    if (!/^[a-zA-ZæøåÆØÅ\s'-]+$/.test(value.trim())) {
      return "Fornavn kan kun inneholde bokstaver, mellomrom, bindestrek og apostrof";
    }
    return undefined;
  };

  const validateLastName = (value: string): string | undefined => {
    if (!value.trim()) return "Etternavn er påkrevd";
    if (value.trim().length < 2) return "Etternavn må være minst 2 tegn";
    if (value.trim().length > 50) return "Etternavn kan ikke være lengre enn 50 tegn";
    if (!/^[a-zA-ZæøåÆØÅ\s'-]+$/.test(value.trim())) {
      return "Etternavn kan kun inneholde bokstaver, mellomrom, bindestrek og apostrof";
    }
    return undefined;
  };

  const validateBirthDate = (value: string): string | undefined => {
    if (!value) return "Fødselsdato er påkrevd";

    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    let actualAge = age;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      actualAge--;
    }

    if (birthDate > today) return "Fødselsdato kan ikke være i fremtiden";
    if (actualAge < 3) return "Eleven må være minst 3 år gammel";

    return undefined;
  };

  const validateGuardianName = (value: string): string | undefined => {
    if (!value.trim()) return "Fullt navn på foresatt er påkrevd";
    if (value.trim().length < 3) return "Navn må være minst 3 tegn";
    if (value.trim().length > 100) return "Navn kan ikke være lengre enn 100 tegn";
    if (!/^[a-zA-ZæøåÆØÅ\s'-]+$/.test(value.trim())) {
      return "Navn kan kun inneholde bokstaver, mellomrom, bindestrek og apostrof";
    }
    return undefined;
  };

  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) return "E-postadresse er påkrevd";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim())) {
      return "Ugyldig e-postadresse";
    }
    
    if (value.trim().length > 254) {
      return "E-postadresse er for lang";
    }
    
    return undefined;
  };

  const validatePhone = (value: string): string | undefined => {
    if (!value.trim()) return "Telefonnummer er påkrevd";
    
    const cleanPhone = value.replace(/[\s\-+()]/g, "");
    
    if (!/^[2-9]\d{7}$/.test(cleanPhone)) {
      return "Ugyldig telefonnummer (må være 8 siffer som starter med 2, 4, 6, 7, 8 eller 9)";
    }
    
    return undefined;
  };

  const validateAddress = (value: string): string | undefined => {
    if (!value.trim()) return "Adresse er påkrevd";
    if (value.trim().length < 5) return "Adresse må være minst 5 tegn";
    if (value.trim().length > 100) return "Adresse kan ikke være lengre enn 100 tegn";
    return undefined;
  };

  const validatePostalCode = (value: string): string | undefined => {
    if (!value.trim()) return "Postnummer er påkrevd";
    
    if (!/^\d{4}$/.test(value.trim())) {
      return "Postnummer må være 4 siffer";
    }
    
    return undefined;
  };

  const validateCity = (value: string): string | undefined => {
    if (!value.trim()) return "Poststed er påkrevd";
    if (value.trim().length < 2) return "Poststed må være minst 2 tegn";
    if (value.trim().length > 50) return "Poststed kan ikke være lengre enn 50 tegn";
    if (!/^[a-zA-ZæøåÆØÅ\s'-]+$/.test(value.trim())) {
      return "Poststed kan kun inneholde bokstaver, mellomrom, bindestrek og apostrof";
    }
    return undefined;
  };

  const validateSiblings = (): { [index: number]: { firstName?: string; lastName?: string } } => {
    if (!hasSiblings) return {};
    
    const errors: { [index: number]: { firstName?: string; lastName?: string } } = {};
    
    siblings.forEach((sibling, index) => {
      const siblingErrors: { firstName?: string; lastName?: string } = {};
      
      const firstNameError = validateFirstName(sibling.firstName);
      if (firstNameError) siblingErrors.firstName = firstNameError;
      
      const lastNameError = validateLastName(sibling.lastName);
      if (lastNameError) siblingErrors.lastName = lastNameError;
      
      if (Object.keys(siblingErrors).length > 0) {
        errors[index] = siblingErrors;
      }
    });
    
    return errors;
  };

  const validateAllFields = (): ValidationErrors => {
    const errors: ValidationErrors = {
      firstName: validateFirstName(studentForm.firstName),
      lastName: validateLastName(studentForm.lastName),
      birthDate: validateBirthDate(studentForm.birthDate),
      guardianName: validateGuardianName(guardianForm.name),
      email: validateEmail(guardianForm.email),
      phone: validatePhone(guardianForm.phone),
      address: validateAddress(guardianForm.address),
      postalCode: validatePostalCode(guardianForm.postalCode),
      city: validateCity(guardianForm.city),
      siblings: validateSiblings(),
    };
    
    Object.keys(errors).forEach(key => {
      if (errors[key as keyof ValidationErrors] === undefined) {
        delete errors[key as keyof ValidationErrors];
      }
    });
    
    return errors;
  };

  // Update context when form changes
  useEffect(() => {
    setStudentData(studentForm);
  }, [studentForm, setStudentData]);

  useEffect(() => {
    setGuardianData(guardianForm);
  }, [guardianForm, setGuardianData]);

  useEffect(() => {
    dispatch({ type: 'SET_HAS_SIBLINGS', payload: hasSiblings });
    if (hasSiblings) {
      dispatch({ type: 'SET_SIBLINGS', payload: siblings });
    } else {
      dispatch({ type: 'SET_SIBLINGS', payload: [] });
    }
  }, [hasSiblings, siblings, dispatch]);

  // Validate on form changes
  useEffect(() => {
    if (hasAttemptedSubmit) {
      const errors = validateAllFields();
      setValidationErrors(errors);
      
      const hasErrors = Object.values(errors).some(error => {
        if (typeof error === 'object' && error !== null) {
          return Object.values(error).some(nestedError => nestedError !== undefined);
        }
        return error !== undefined;
      });
      
      setIsFormValid(!hasErrors);
    } else {
      const isComplete = 
        studentForm.firstName.trim() !== "" &&
        studentForm.lastName.trim() !== "" &&
        studentForm.birthDate !== "" &&
        guardianForm.name.trim() !== "" &&
        guardianForm.email.trim() !== "" &&
        guardianForm.phone.trim() !== "" &&
        guardianForm.address.trim() !== "" &&
        guardianForm.postalCode.trim() !== "" &&
        guardianForm.city.trim() !== "" &&
        (!hasSiblings || siblings.every(s => s.firstName.trim() !== "" && s.lastName.trim() !== ""));
      
      setIsFormValid(isComplete);
    }
  }, [studentForm, guardianForm, hasSiblings, siblings, hasAttemptedSubmit]);

  const handleNext = () => {
    setHasAttemptedSubmit(true);
    
    const errors = validateAllFields();
    setValidationErrors(errors);
    
    const hasErrors = Object.values(errors).some(error => {
      if (typeof error === 'object' && error !== null) {
        return Object.values(error).some(nestedError => nestedError !== undefined);
      }
      return error !== undefined;
    });
    
    if (!hasErrors && validateCurrentStep()) {
      goToNextStep();
    }
  };

  const handleStudentChange = (field: string, value: string) => {
    setStudentForm((prev) => ({ ...prev, [field]: value }));
    
    if (hasAttemptedSubmit && validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleGuardianChange = (field: string, value: string) => {
    setGuardianForm((prev) => ({ ...prev, [field]: value }));
    
    const errorKey = field === 'name' ? 'guardianName' : field;
    if (hasAttemptedSubmit && validationErrors[errorKey as keyof ValidationErrors]) {
      setValidationErrors(prev => ({ ...prev, [errorKey]: undefined }));
    }
  };

  const handleSiblingsToggle = (checked: boolean) => {
    setHasSiblings(checked);
    if (checked && siblings.length === 0) {
      setSiblings([{ firstName: "", lastName: "" }]);
    }
    
    if (hasAttemptedSubmit) {
      setValidationErrors(prev => ({ ...prev, siblings: {} }));
    }
  };

  const handleSiblingChange = (index: number, field: 'firstName' | 'lastName', value: string) => {
    const updatedSiblings = [...siblings];
    updatedSiblings[index] = { ...updatedSiblings[index], [field]: value };
    setSiblings(updatedSiblings);
    
    if (hasAttemptedSubmit && validationErrors.siblings?.[index]?.[field]) {
      setValidationErrors(prev => ({
        ...prev,
        siblings: {
          ...prev.siblings,
          [index]: {
            ...prev.siblings?.[index],
            [field]: undefined
          }
        }
      }));
    }
  };

  const addSibling = () => {
    setSiblings([...siblings, { firstName: "", lastName: "" }]);
  };

  const removeSibling = (index: number) => {
    if (siblings.length > 1) {
      const updatedSiblings = siblings.filter((_, i) => i !== index);
      setSiblings(updatedSiblings);
      
      if (hasAttemptedSubmit && validationErrors.siblings?.[index]) {
        const remainingErrors = Object.fromEntries(
        Object.entries(validationErrors.siblings).filter(([key]) => key !== index.toString())
      );
        setValidationErrors(prev => ({ ...prev, siblings: remainingErrors }));
      }
    }
  };

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
    <div className="px-2 py-4 md:p-12">
      <ScrollToTop />

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
        <h2 className="font-bebas text-bebas-base md:text-bebas-lg lg:text-bebas-xl text-gray-900 dark:text-white mb-2 break-words max-w-prose">
          Kontaktinformasjon
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-4">
          Vi trenger informasjon om eleven og foresatt for å kunne fullføre påmeldingen.
        </p>
        
        {/* ✨ OPPDATERT: Betingelser med modal i stedet for Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-brand-50/50 dark:bg-brand-900/20 rounded-lg p-4 border border-brand-200/50 dark:border-brand-700/30"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300 font-montserrat mb-2">
            Ved å melde deg på aksepterer du våre betingelser for kursdeltagelse.
          </p>
          {/* ✨ ENDRET: Button i stedet for Link */}
          <button
            onClick={handleOpenTerms}
            className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 
                       hover:text-brand-700 dark:hover:text-brand-300 
                       transition-colors font-montserrat font-medium text-sm cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            Les betingelser og vilkår
          </button>
        </motion.div>
      </motion.div>

      <div className="space-y-8">
        {/* Student Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-brand-50/50 to-coral-50/30 
                     dark:from-brand-900/20 dark:to-coral-900/10 
                     px-3 py-6 rounded-xl border border-brand-100/50 dark:border-brand-700/30"
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                          bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                          font-montserrat transition-colors ${
                            validationErrors.firstName
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                placeholder="Skriv elevens fornavn"
              />
              {validationErrors.firstName && (
                <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-montserrat">{validationErrors.firstName}</span>
                </div>
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                          bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                          font-montserrat transition-colors ${
                            validationErrors.lastName
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                placeholder="Skriv elevens etternavn"
              />
              {validationErrors.lastName && (
                <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-montserrat">{validationErrors.lastName}</span>
                </div>
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
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                            bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                            font-montserrat transition-colors ${
                              validationErrors.birthDate
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                />
              </div>
              {studentAge !== null && !validationErrors.birthDate && (
                <p className="text-brand-600 dark:text-brand-400 text-sm font-montserrat mt-1">
                  Alder: {studentAge} år
                </p>
              )}
              {validationErrors.birthDate && (
                <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-montserrat">{validationErrors.birthDate}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Søsken Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-gradient-to-br from-purple-50/50 to-pink-50/30 
                     dark:from-purple-900/20 dark:to-pink-900/10 
                     px-3 py-6 rounded-xl border border-purple-100/50 dark:border-purple-700/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">
              Familiemedlem som danser på Urban
            </h3>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              id="hasSiblings"
              checked={hasSiblings}
              onChange={(e) => handleSiblingsToggle(e.target.checked)}
              className="w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500 focus:ring-2"
            />
            <label 
              htmlFor="hasSiblings" 
              className="text-sm font-montserrat font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              Eleven har familiemedlem som også skal meldes på (familierabatt)
            </label>
          </div>

          {hasSiblings && (
            <div className="space-y-4">
              <p className="text-sm text-purple-600 dark:text-purple-300 font-montserrat mb-4">
                Skriv inn navn på familiemedlem som også skal meldes på kurs. Rabatten aktiveres ved fakturering.
              </p>
              <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <div className="text-sm">
                  <p className="font-semibold text-purple-700 dark:text-purple-300 mb-1 text-left">Rabatter tilgjengelig:</p>
                  <ul className="list-disc list-inside space-y-1 text-purple-600 dark:text-purple-400 text-left">
                    <li>Familierabatt 200kr avslag for kurs 60 min</li>
                    <li>Familierabatt 20% for dansepakke nr. 2</li>
                    <li>Familierabatt 50% for dansepakke nr. 3+</li>
                  </ul>
                </div>
              </div>

              {siblings.map((sibling, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white dark:bg-transparent rounded-lg border border-purple-200/50 dark:border-purple-700/30"
                >
                  <div>
                    <label className="block text-sm font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fornavn *
                    </label>
                    <input
                      type="text"
                      value={sibling.firstName}
                      onChange={(e) => handleSiblingChange(index, 'firstName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                                font-montserrat transition-colors ${
                                  validationErrors.siblings?.[index]?.firstName
                                    ? "border-red-500 dark:border-red-500"
                                    : "border-gray-300 dark:border-gray-600"
                                }`}
                      placeholder="Familiemedlem fornavn"
                    />
                    {validationErrors.siblings?.[index]?.firstName && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span className="font-montserrat">{validationErrors.siblings[index].firstName}</span>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Etternavn *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={sibling.lastName}
                        onChange={(e) => handleSiblingChange(index, 'lastName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                  bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                                  font-montserrat transition-colors ${
                                    validationErrors.siblings?.[index]?.lastName
                                      ? "border-red-500 dark:border-red-500"
                                      : "border-gray-300 dark:border-gray-600"
                                  }`}
                        placeholder="Familiemedlem etternavn"
                      />
                    </div>
                    {validationErrors.siblings?.[index]?.lastName && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span className="font-montserrat">{validationErrors.siblings[index].lastName}</span>
                      </div>
                    )}
                    {siblings.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeSibling(index)}
                          variant="ghost"
                          size="icon"
                          className="mt-2 px-3 py-3 text-red-600 hover:text-red-700 float-right"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                  </div>
                </motion.div>
              ))}

              <Button
                type="button"
                onClick={addSibling}
                variant="outline"
                className="w-full py-3 border-purple-300 text-purple-600 hover:bg-purple-50 font-montserrat"
              >
                <Plus className="h-4 w-4 mr-2" />
                Legg til familiemedlem
              </Button>
            </div>
          )}
        </motion.div>

        {/* Guardian Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-magenta-50/50 to-coral-50/30 
                     dark:from-magenta-900/20 dark:to-coral-900/10 
                     px-3 py-6 rounded-xl border border-magenta-100/50 dark:border-magenta-700/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="h-5 w-5 text-magenta-600 dark:text-magenta-400" />
            <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">
              Kontaktperson
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                          bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                          font-montserrat transition-colors ${
                            validationErrors.guardianName
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                placeholder="Fullt navn på foresatt"
              />
              {validationErrors.guardianName && (
                <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-montserrat">{validationErrors.guardianName}</span>
                </div>
              )}
            </div>

            {/* Adressefelter */}
            <div>
              <label className="block text-sm font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                Adresse *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={guardianForm.address}
                  onChange={(e) => handleGuardianChange("address", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                            bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                            font-montserrat transition-colors ${
                              validationErrors.address
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                  placeholder="Gateadresse"
                />
              </div>
              {validationErrors.address && (
                <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-montserrat">{validationErrors.address}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Postal Code */}
              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Postnummer *
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={guardianForm.postalCode}
                    onChange={(e) => handleGuardianChange("postalCode", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                              bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                              font-montserrat transition-colors ${
                                validationErrors.postalCode
                                  ? "border-red-500 dark:border-red-500"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                    placeholder="0000"
                    maxLength={4}
                  />
                </div>
                {validationErrors.postalCode && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-montserrat">{validationErrors.postalCode}</span>
                  </div>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Poststed *
                </label>
                <input
                  type="text"
                  value={guardianForm.city}
                  onChange={(e) => handleGuardianChange("city", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                            bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                            font-montserrat transition-colors ${
                              validationErrors.city
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                  placeholder="Poststed"
                />
                {validationErrors.city && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-montserrat">{validationErrors.city}</span>
                  </div>
                )}
              </div>
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
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                              bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                              font-montserrat transition-colors ${
                                validationErrors.email
                                  ? "border-red-500 dark:border-red-500"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                    placeholder="example@email.com"
                  />
                </div>
                {validationErrors.email && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-montserrat">{validationErrors.email}</span>
                  </div>
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
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent
                              bg-white dark:bg-surface-dark text-gray-900 dark:text-white
                              font-montserrat transition-colors ${
                                validationErrors.phone
                                  ? "border-red-500 dark:border-red-500"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                    placeholder="98765432"
                  />
                </div>
                {validationErrors.phone && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-montserrat">{validationErrors.phone}</span>
                  </div>
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
      </div>

      {/* TermsModal */}
      <TermsModal 
        open={isTermsModalOpen}
        onOpenChange={setIsTermsModalOpen}
      />
    </div>
  );
}