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
  ClockIcon
} from "lucide-react";

import { SecureContactService, type SubmissionResult } from "../services/secureContactService";
import { validateField, type ContactFormData } from "../validation/contactValidation";
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
  const [validationTimeouts, setValidationTimeouts] = useState<Record<string, NodeJS.Timeout>>({});

  const validateFieldWithDelay = (fieldName: keyof ContactFormData, value: string) => {
    // Clear existing timeout
    if (validationTimeouts[fieldName]) {
      clearTimeout(validationTimeouts[fieldName]);
    }

    // Set new timeout for validation
    const timeout = setTimeout(async () => {
      const error = await validateField(fieldName, value);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }, 300); // 300ms debounce

    setValidationTimeouts(prev => ({
      ...prev,
      [fieldName]: timeout
    }));
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(validationTimeouts).forEach(timeout => clearTimeout(timeout));
    };
  }, [validationTimeouts]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear existing errors
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Clear system errors
    if (submitError) setSubmitError(null);
    if (rateLimitError) setRateLimitError(null);

    // Real-time validation med debounce
    validateFieldWithDelay(name as keyof ContactFormData, value);
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Immediate validation on blur
    const error = await validateField(name as keyof ContactFormData, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const identifier = formData.email || 'anonymous';
    const rateLimitCheck = RateLimiter.isAllowed(identifier);
    
    if (!rateLimitCheck.allowed) {
      const waitTime = rateLimitCheck.waitTime ? 
        RateLimiter.formatWaitTime(rateLimitCheck.waitTime) : 'ukjent tid';
      
      setRateLimitError(`${rateLimitCheck.reason} Prøv igjen om ${waitTime}.`);
      return;
    }

    // Bot detection
    if (formRef.current) {
      const formDataForBot = new FormData(formRef.current);
      const botCheck = BotDetection.validateSubmission(formDataForBot, formStartTime);
      
      if (botCheck.isBot) {
        SecurityLogger.logSuspiciousActivity(botCheck.reason || 'Bot detected', identifier);
        setSubmitError('Sikkerhetsvalidering feilet. Prøv igjen senere.');
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setRateLimitError(null);

    try {
      const result: SubmissionResult = await SecureContactService.submitContactForm(
        formData,
        {
          userAgent: navigator.userAgent,
          startTime: formStartTime
        }
      );

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
        
        // Reset success message after 8 seconds
        setTimeout(() => setIsSubmitted(false), 8000);
        
      } else {
        // Handle different error types
        switch (result.errorCode) {
          case 'RATE_LIMIT':
            setRateLimitError(result.error || 'For mange forsøk');
            break;
          case 'VALIDATION':
            setSubmitError(result.error || 'Valideringsfeil');
            break;
          case 'SECURITY':
            setSubmitError('Sikkerhetskontroll feilet. Kontroller innholdet og prøv igjen.');
            break;
          case 'BOT_DETECTED':
            setSubmitError('Automatisk innsending oppdaget. Prøv igjen senere.');
            break;
          default:
            setSubmitError(result.error || 'En uventet feil oppstod');
        }
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('En teknisk feil oppstod. Prøv igjen senere.');
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
      className="bg-transparent rounded-2xl shadow-lg p-6 md:p-8"
    >
      <motion.h3 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white font-montserrat"
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
            className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6"
          >
            <div className="flex items-start">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mr-4 flex-shrink-0"
              >
                <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <ShieldCheckIcon className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                  <p className="font-semibold text-green-800 dark:text-green-400 font-montserrat">
                    Takk for din henvendelse!
                  </p>
                </div>
                <p className="text-sm text-green-700 dark:text-green-500 font-montserrat">
                  Vi har mottatt din melding og vil kontakte deg så snart som mulig. 
                  Meldingen er sikret og validert.
                </p>
              </div>
            </div>
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
            className="space-y-6"
          >
            {/* Bot Detection Honeypot */}
            {(() => {
              const honeypot = BotDetection.getHoneypotProps();
              return (
                <div style={honeypot.style}>
                  <label htmlFor={honeypot.fieldName}>Website (leave blank)</label>
                  <input {...honeypot.inputProps} />
                </div>
              );
            })()}

            {/* Rate Limit Error */}
            <AnimatePresence>
              {rateLimitError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4"
                >
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-orange-800 dark:text-orange-400 font-montserrat">
                        For mange forsøk
                      </p>
                      <p className="text-sm text-orange-700 dark:text-orange-500 font-montserrat">
                        {rateLimitError}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* General Submit Error */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4"
                >
                  <div className="flex items-center">
                    <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
                    <p className="text-red-800 dark:text-red-400 font-montserrat text-sm">
                      {submitError}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <Label htmlFor="name" className="font-montserrat">
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
                  className={`rounded-lg font-montserrat transition-all duration-200 
                    hover:border-studio-blue-300 focus:border-studio-blue-500 
                    ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.div
                      id="name-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-1 text-red-500 text-sm"
                    >
                      <AlertCircleIcon className="h-3 w-3" />
                      <span className="font-montserrat">{errors.name}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <Label htmlFor="email" className="font-montserrat">
                  E-post <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="din.e-post@eksempel.no"
                  required
                  maxLength={254}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`rounded-lg font-montserrat transition-all duration-200 
                    hover:border-studio-blue-300 focus:border-studio-blue-500 
                    ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.div
                      id="email-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-1 text-red-500 text-sm"
                    >
                      <AlertCircleIcon className="h-3 w-3" />
                      <span className="font-montserrat">{errors.email}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Phone Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <Label htmlFor="phone" className="font-montserrat">
                Telefon <span className="text-gray-500 text-sm">(valgfritt)</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                                  value={formData.phone || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+47 123 45 678"
                maxLength={20}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`rounded-lg font-montserrat transition-all duration-200 
                  hover:border-studio-blue-300 focus:border-studio-blue-500
                  ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <AnimatePresence>
                {errors.phone && (
                  <motion.div
                    id="phone-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-1 text-red-500 text-sm"
                  >
                    <AlertCircleIcon className="h-3 w-3" />
                    <span className="font-montserrat">{errors.phone}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <Label htmlFor="message" className="font-montserrat">
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
                className={`min-h-[120px] rounded-lg font-montserrat transition-all duration-200 
                  hover:border-studio-blue-300 focus:border-studio-blue-500 
                  ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <div className="flex justify-between items-center">
                <AnimatePresence>
                  {errors.message && (
                    <motion.div
                      id="message-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-1 text-red-500 text-sm"
                    >
                      <AlertCircleIcon className="h-3 w-3" />
                      <span className="font-montserrat">{errors.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="text-xs text-gray-500 font-montserrat">
                  {formData.message.length}/2000
                </span>
              </div>
            </motion.div>

            {/* Security Notice */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3"
            >
              <div className="flex items-center text-sm text-blue-700 dark:text-blue-300">
                <ShieldCheckIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                <p className="font-montserrat">
                  Dine data er beskyttet med moderne sikkerhet og kryptering.
                </p>
              </div>
            </motion.div> */}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                type="submit"
                disabled={isSubmitting || !!rateLimitError}
                className="w-full rounded-full bg-gradient-to-r from-orange-500 to-studio-pink-500 
                  hover:from-orange-600 hover:to-studio-pink-600 text-white border-0 
                  font-montserrat font-semibold transition-all duration-200 py-3
                  disabled:opacity-50 disabled:cursor-not-allowed
                  disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sender melding...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <ShieldCheckIcon className="h-4 w-4" />
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