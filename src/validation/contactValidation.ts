// validation/contactValidation.ts
import * as yup from "yup";

// Norske feilmeldinger
const messages = {
  required: "Dette feltet er påkrevd",
  email: "Ugyldig e-postadresse",
  min: (min: number) => `Må være minst ${min} tegn`,
  max: (max: number) => `Kan ikke være mer enn ${max} tegn`,
  phone: "Ugyldig telefonnummer format",
  name: "Navn kan kun inneholde bokstaver, mellomrom og bindestrek",
  suspicious: "Innholdet inneholder ikke-tillatte tegn",
};

// Custom validation functions
const isValidNorwegianPhone = (phone: string | null | undefined): boolean => {
  if (!phone) return true; // Optional field
  const cleaned = phone.replace(/\s/g, "");
  // Norske telefonnummer: +47xxxxxxxx eller xxxxxxxx
  return /^(\+47)?[4-9]\d{7}$/.test(cleaned);
};

const containsOnlyValidNameChars = (name: string): boolean => {
  // Tillat norske bokstaver, mellomrom, bindestrek og apostrof
  return /^[a-zA-ZæøåÆØÅ\s'-]+$/.test(name);
};

const isSuspiciousContent = (text: string): boolean => {
  const suspiciousPatterns = [
    /https?:\/\//i, // URLs
    /www\./i, // Web addresses
    /<[^>]*>/, // HTML tags
    /javascript:/i, // JavaScript
    /eval\(/i, // eval() calls
    /script/i, // Script mentions
    /@import/i, // CSS imports
    /expression\(/i, // CSS expressions
  ];

  return suspiciousPatterns.some((pattern) => pattern.test(text));
};

// Hovedvalidering schema
export const contactFormSchema = yup.object().shape({
  name: yup
    .string()
    .required(messages.required)
    .min(2, messages.min(2))
    .max(100, messages.max(100))
    .test("valid-chars", messages.name, containsOnlyValidNameChars)
    .test("not-suspicious", messages.suspicious, (value) =>
      value ? !isSuspiciousContent(value) : true,
    ),

  email: yup
    .string()
    .required(messages.required)
    .email(messages.email)
    .max(254, messages.max(254))
    .lowercase()
    .test("not-suspicious", messages.suspicious, (value) =>
      value ? !isSuspiciousContent(value) : true,
    ),

  phone: yup
    .string()
    .nullable()
    .notRequired()
    .max(20, messages.max(20))
    .test("valid-phone", messages.phone, isValidNorwegianPhone),

  message: yup
    .string()
    .required(messages.required)
    .min(10, messages.min(10))
    .max(2000, messages.max(2000))
    .test("not-suspicious", messages.suspicious, (value) =>
      value ? !isSuspiciousContent(value) : true,
    ),
});

// TypeScript type fra Yup schema med safe typing
export type ContactFormData = {
  name: string;
  email: string;
  phone?: string; // Optional men aldri null
  message: string;
};

// Validering med detaljerte feilmeldinger
export const validateContactForm = async (
  data: Record<string, unknown>,
): Promise<{
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: ContactFormData;
}> => {
  try {
    const validatedData = await contactFormSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    // Konverter til ContactFormData format
    const sanitizedContactData: ContactFormData = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || undefined, // Konverter null til undefined
      message: validatedData.message,
    };

    return {
      isValid: true,
      errors: {},
      sanitizedData: sanitizedContactData,
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};

      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });

      return {
        isValid: false,
        errors,
      };
    }

    return {
      isValid: false,
      errors: { general: "Valideringsfeil oppstod" },
    };
  }
};

// Quick validation for real-time feedback
export const validateField = async (
  fieldName: keyof ContactFormData,
  value: string,
): Promise<string | undefined> => {
  try {
    // Spesiell håndtering for phone field som kan være tom
    const testData = {
      [fieldName]: fieldName === "phone" && !value ? undefined : value,
    };
    await contactFormSchema.validateAt(fieldName, testData);
    return undefined;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return error.message;
    }
    return "Valideringsfeil";
  }
};

// Pre-submit security checks
export const performSecurityChecks = (
  data: ContactFormData,
): {
  passed: boolean;
  reason?: string;
} => {
  // Sjekk for spam-indikatorer
  const spamKeywords = [
    "viagra",
    "casino",
    "lottery",
    "winner",
    "click here",
    "free money",
    "make money",
    "work from home",
    "bitcoin",
    "cryptocurrency",
    "investment",
    "profit",
    "guarantee",
  ];

  const fullText = `${data.name} ${data.email} ${data.message}`.toLowerCase();

  const hasSpamKeywords = spamKeywords.some((keyword) =>
    fullText.includes(keyword),
  );

  if (hasSpamKeywords) {
    return {
      passed: false,
      reason: "Innholdet inneholder spam-indikatorer",
    };
  }

  // Sjekk for repeterende tekst (copy-paste spam)
  const words = data.message.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  const repetitionRatio = uniqueWords.size / words.length;

  if (words.length > 20 && repetitionRatio < 0.3) {
    return {
      passed: false,
      reason: "Meldingen inneholder for mye repeterende tekst",
    };
  }

  // Sjekk for unormalt mange store bokstaver
  const upperCaseRatio =
    (data.message.match(/[A-Z]/g) || []).length / data.message.length;
  if (upperCaseRatio > 0.5 && data.message.length > 50) {
    return {
      passed: false,
      reason: "Meldingen inneholder for mange store bokstaver",
    };
  }

  return { passed: true };
};
