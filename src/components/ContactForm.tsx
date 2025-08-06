import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckIcon,
  AlertCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  MailIcon,
} from "lucide-react";

import {
  SecureContactService,
  type SubmissionResult,
} from "../services/secureContactService";
import {
  validateField,
  type ContactFormData,
} from "../validation/contactValidation";
import { RateLimiter, BotDetection, SecurityLogger } from "../utils/security";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  submit?: string;
}

export default function SecureContactForm() {
  // State management
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formStartTime] = useState(Date.now());
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Refs for bot detection
  const formRef = useRef<HTMLFormElement>(null);

  // Real-time validation med debounce
  const [validationTimeouts, setValidationTimeouts] = useState<
    Record<string, NodeJS.Timeout>
  >({});

  const validateFieldWithDelay = (
    fieldName: keyof ContactFormData,
    value: string,
  ) => {
    // Clear existing timeout
    if (validationTimeouts[fieldName]) {
      clearTimeout(validationTimeouts[fieldName]);
    }

    // Set new timeout for validation
    const timeout = setTimeout(async () => {
      const error = await validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
    }, 300); // 300ms debounce

    setValidationTimeouts((prev) => ({
      ...prev,
      [fieldName]: timeout,
    }));
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(validationTimeouts).forEach((timeout) =>
        clearTimeout(timeout),
      );
    };
  }, [validationTimeouts]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear existing errors
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Clear system errors
    if (submitError) setSubmitError(null);
    if (rateLimitError) setRateLimitError(null);

    // Real-time validation med debounce
    validateFieldWithDelay(name as keyof ContactFormData, value);
  };

  const handleBlur = async (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Immediate validation on blur
    const error = await validateField(name as keyof ContactFormData, value);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting check
    const identifier = formData.email || "anonymous";
    const rateLimitCheck = RateLimiter.isAllowed(identifier);

    if (!rateLimitCheck.allowed) {
      const waitTime = rateLimitCheck.waitTime
        ? RateLimiter.formatWaitTime(rateLimitCheck.waitTime)
        : "ukjent tid";

      setRateLimitError(`${rateLimitCheck.reason} Prøv igjen om ${waitTime}.`);
      return;
    }

    // Bot detection
    if (formRef.current) {
      const formDataForBot = new FormData(formRef.current);
      const botCheck = BotDetection.validateSubmission(
        formDataForBot,
        formStartTime,
      );

      if (botCheck.isBot) {
        SecurityLogger.logSuspiciousActivity(
          botCheck.reason || "Bot detected",
          identifier,
        );
        setSubmitError("Sikkerhetsvalidering feilet. Prøv igjen senere.");
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setRateLimitError(null);

    try {
      const result: SubmissionResult =
        await SecureContactService.submitContactForm(formData, {
          userAgent: navigator.userAgent,
          startTime: formStartTime,
        });

      if (result.success) {
        // Record successful submission for rate limiting
        RateLimiter.recordSubmission(identifier);

        // Show success
        setIsSubmitted(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});

        // Reset success message after 12 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 12000);
      } else {
        console.error("❌ Form submission failed:", result);

        // Handle different error types
        switch (result.errorCode) {
          case "RATE_LIMIT":
            setRateLimitError(result.error || "For mange forsøk");
            break;
          case "VALIDATION":
            setSubmitError(result.error || "Valideringsfeil");
            break;
          case "SECURITY":
            setSubmitError(
              "Sikkerhetskontroll feilet. Kontroller innholdet og prøv igjen.",
            );
            break;
          case "BOT_DETECTED":
            setSubmitError(
              "Automatisk innsending oppdaget. Prøv igjen senere.",
            );
            break;
          default:
            setSubmitError(result.error || "En uventet feil oppstod");
        }
      }
    } catch (error) {
      console.error("❌ Form submission error:", error);
      setSubmitError("En teknisk feil oppstod. Prøv igjen senere.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-transparent rounded-2xl p-6 md:p-8 h-full flex flex-col"
    >
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="font-bebas text-bebas-base font-semibold mb-6 text-gray-900 dark:text-white"
      >
        Kontakt oss
      </motion.h3>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-brand-50 dark:bg-brand-900/20
                      border border-brand-200 dark:border-brand-700/30 
                      rounded-2xl p-6 space-y-6 shadow-brand"
          >
            {/* Hovedsuksess-melding */}
            <div className="flex items-start">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="h-10 w-10 rounded-full bg-brand-100 
                          dark:bg-brand-800/50 
                          flex items-center justify-center mr-4 flex-shrink-0 shadow-brand-sm"
              >
                <CheckIcon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <ShieldCheckIcon className="h-5 w-5 text-brand-600 dark:text-brand-400 mr-2" />
                  <p className="font-montserrat-semibold text-lg text-brand-800 dark:text-brand-300">
                    Takk for din henvendelse!
                  </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed">
                  Vi har mottatt din melding og lagret den trygt i vårt system.
                  Meldingen er sikret og validert gjennom våre
                  sikkerhetskontroller.
                </p>
              </div>
            </div>

            {/* E-post status med brand-farger */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-brand-100/80 
                        dark:bg-brand-800/30 
                        rounded-xl p-5 border border-brand-200/50 dark:border-brand-600/20"
            >
              <div className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="h-8 w-8 rounded-full bg-brand-200 
                            dark:bg-brand-700 
                            flex items-center justify-center mr-4 flex-shrink-0"
                >
                  <MailIcon className="h-4 w-4 text-brand-700 dark:text-brand-300" />
                </motion.div>
                <div>
                  <p className="font-montserrat-medium text-brand-700 dark:text-brand-200 mb-1">
                    E-post varsling sendt
                  </p>
                  <p className="text-sm text-brand-700 dark:text-brand-400 font-montserrat">
                    Vi har automatisk sendt en e-post av din melding til Urban
                    Studios. Vi vil kontakte deg så snart som mulig.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Neste steg informasjon med brand-styling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="border-t border-brand-200 dark:border-brand-700/30 pt-5"
            >
              <h4 className="font-montserrat-semibold text-brand-700 dark:text-brand-200 mb-3">
                Hva skjer videre?
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 font-montserrat space-y-2">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-3 flex-shrink-0"></div>
                  Vi behandler din henvendelse så raskt som mulig
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mr-3 flex-shrink-0"></div>
                  Du vil motta svar på e-posten eller telefonnummeret du oppga
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-3 flex-shrink-0"></div>
                  Ved spørsmål kan du kontakte oss direkt på
                  kontakt@urbanstudios.no
                </li>
              </ul>
            </motion.div>

            {/* Tilbake til skjema knapp */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="pt-2"
            >
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full rounded-full font-montserrat-medium 
                          border-brand-300 dark:border-brand-600 
                          text-brand-700 dark:text-brand-300 
                          hover:bg-brand-50 dark:hover:bg-brand-900/30
                          hover:border-brand-400 dark:hover:border-brand-500
                          transition-all duration-200"
              >
                Send ny melding
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6 flex-grow"
          >
            {/* Bot Detection Honeypot */}
            {(() => {
              const honeypot = BotDetection.getHoneypotProps();
              return (
                <div style={honeypot.style}>
                  <label htmlFor={honeypot.fieldName}>
                    Website (leave blank)
                  </label>
                  <input {...honeypot.inputProps} />
                </div>
              );
            })()}

            {/* Rate Limit Error med brand-farger */}
            <AnimatePresence>
              {rateLimitError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-brand-50 dark:bg-brand-900/20 
                            border border-brand-300 dark:border-brand-600 
                            rounded-xl p-4 shadow-brand-sm"
                >
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-brand-600 dark:text-brand-400 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-montserrat-medium text-brand-700 dark:text-brand-200">
                        For mange forsøk
                      </p>
                      <p className="text-sm text-brand-700 dark:text-brand-300 font-montserrat mt-1">
                        {rateLimitError}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* General Submit Error med oppdatert styling */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 
                            border border-red-300 dark:border-red-600 
                            rounded-xl p-4 shadow-lg"
                >
                  <div className="flex items-center">
                    <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-montserrat-medium text-red-800 dark:text-red-200">
                        Kunne ikke sende melding
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-300 font-montserrat mt-1">
                        {submitError}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field med brand-styling */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <Label
                  htmlFor="name"
                  className="font-montserrat-medium text-gray-900 dark:text-white"
                >
                  Navn <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ditt navn"
                  required
                  maxLength={100}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`rounded-xl font-montserrat transition-all duration-200 
                    border-gray-200 dark:border-gray-600
                    hover:border-brand-300 dark:hover:border-brand-500 
                    focus:border-brand-500 dark:focus:border-brand-400
                    focus:ring-brand-500/20 focus:ring-2
                    ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                    shadow-sm hover:shadow-brand-sm focus:shadow-brand`}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.div
                      id="name-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                    >
                      <AlertCircleIcon className="h-4 w-4" />
                      <span className="font-montserrat">{errors.name}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email Field med brand-styling */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <Label
                  htmlFor="email"
                  className="font-montserrat-medium text-gray-900 dark:text-white"
                >
                  E-post <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e-post@eksempel.no"
                  required
                  maxLength={254}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`rounded-xl font-montserrat transition-all duration-200 
                    border-gray-200 dark:border-gray-600
                    hover:border-brand-300 dark:hover:border-brand-500 
                    focus:border-brand-500 dark:focus:border-brand-400
                    focus:ring-brand-500/20 focus:ring-2
                    ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                    shadow-sm hover:shadow-brand-sm focus:shadow-brand`}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.div
                      id="email-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                    >
                      <AlertCircleIcon className="h-4 w-4" />
                      <span className="font-montserrat">{errors.email}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Phone Field med brand-styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <Label
                htmlFor="phone"
                className="font-montserrat-medium text-gray-900 dark:text-white"
              >
                Telefon{" "}
                <span className="text-gray-500 text-sm font-montserrat">
                  (valgfritt)
                </span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="123 45 678"
                maxLength={8}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`rounded-xl font-montserrat transition-all duration-200 
                  border-gray-200 dark:border-gray-600
                  hover:border-brand-300 dark:hover:border-brand-500 
                  focus:border-brand-500 dark:focus:border-brand-400
                  focus:ring-brand-500/20 focus:ring-2
                  ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                  shadow-sm hover:shadow-brand-sm focus:shadow-brand`}
              />
              <AnimatePresence>
                {errors.phone && (
                  <motion.div
                    id="phone-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                  >
                    <AlertCircleIcon className="h-4 w-4" />
                    <span className="font-montserrat">{errors.phone}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Message Field med brand-styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <Label
                htmlFor="message"
                className="font-montserrat-medium text-gray-900 dark:text-white"
              >
                Melding <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Skriv din melding her..."
                required
                maxLength={2000}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`min-h-[120px] rounded-xl font-montserrat transition-all duration-200 
                  border-gray-200 dark:border-gray-600
                  hover:border-brand-300 dark:hover:border-brand-500 
                  focus:border-brand-500 dark:focus:border-brand-400
                  focus:ring-brand-500/20 focus:ring-2
                  ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
                  shadow-sm hover:shadow-brand-sm focus:shadow-brand resize-none`}
              />
              <div className="flex justify-between items-center">
                <AnimatePresence>
                  {errors.message && (
                    <motion.div
                      id="message-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
                    >
                      <AlertCircleIcon className="h-4 w-4" />
                      <span className="font-montserrat">{errors.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-montserrat">
                  {formData.message.length}/2000
                </span>
              </div>
            </motion.div>

            {/* Submit Button med brand gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <Button
                type="submit"
                disabled={isSubmitting || !!rateLimitError}
                className="w-full rounded-full font-montserrat-semibold text-lg py-3 h-14
                          bg-brand-500 hover:bg-brand-600
                          dark:bg-white dark:hover:bg-brand-500
                          text-white dark:text-brand-600 dark:hover:text-white border-0 
                          shadow-brand hover:shadow-brand-lg 
                          transition-all duration-300
                          disabled:opacity-50 disabled:cursor-not-allowed
                          disabled:hover:scale-100 active:scale-[0.98]
                          focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-2
                          focus:ring-offset-white dark:focus:ring-offset-gray-900"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sender melding...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <ShieldCheckIcon className="h-5 w-5" />
                    <span>Send melding</span>
                  </div>
                )}
              </Button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
