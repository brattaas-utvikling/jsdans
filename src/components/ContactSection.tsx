import { motion } from "framer-motion";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import ContactForm from "./ContactForm";
import { STUDIO_INFO } from "../data/dance-studio-data";
import ScrollToTop from "@/helpers/ScrollToTop";
import { FaInstagram, FaFacebookF } from 'react-icons/fa'

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-surface-dark 
                  relative overflow-hidden"
    >
      <ScrollToTop />
      {/* Subtle gradient accent - Standard bakgrunn */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/80 to-surface-muted 
                    dark:from-brand-900/10 dark:to-surface-dark-muted" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header med animasjoner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base font-medium text-brand-600 dark:text-brand-400 
                      uppercase tracking-wider mb-3"
          >
            Kontakt oss
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white"
          >
            Vi er her for deg
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 font-montserrat"
          >
            Har du spørsmål, ønsker du mer informasjon, eller vil du bare si hei?
            Fyll ut kontaktskjemaet nedenfor, så tar vi kontakt med deg så snart som mulig!
          </motion.p>
        </motion.div>

        {/* Contact content med standard farger */}
        <div className="relative">
          {/* Decorative elements - Brand farger */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-magenta-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-400/10 rounded-full blur-3xl" />

          {/* Grid med equal heights og animasjoner */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative z-10"
          >
            
            {/* Left column: Contact info med animasjon */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-full flex flex-col"
            >
              <div className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                            dark:from-brand-900/10 dark:to-surface-dark-muted 
                            rounded-2xl shadow-brand-lg p-6 md:p-8
                            border border-brand-100/50 dark:border-brand-700/30 h-full flex flex-col">
                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="font-bebas text-bebas-base font-semibold mb-6 text-gray-900 dark:text-white"
                >
                  URBAN STUDIOS
                </motion.h3>
                
                {/* Contact details med staggered animasjoner */}
                <div className="space-y-4 flex-grow">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex items-start"
                  >
                    <div className="h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPinIcon className="h-5 w-5 text-brand-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Adresse
                      </h4>
                      <address className="text-gray-600 dark:text-gray-300 font-montserrat not-italic">
                        {STUDIO_INFO.address.street}<br />
                        {STUDIO_INFO.address.zip} {STUDIO_INFO.address.city}
                      </address>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-start"
                  >
                    <div className="h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                      <PhoneIcon className="h-5 w-5 text-brand-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Telefon
                      </h4>
                      <a 
                        href={`tel:${STUDIO_INFO.contact.phone.replace(/\s+/g, '')}`}
                        className="text-gray-600 dark:text-gray-300 font-montserrat 
                                 hover:text-brand-600 dark:hover:text-brand-400 
                                 transition-colors duration-200 
                                 focus:outline-none focus:text-brand-600 dark:focus:text-brand-400
                                 underline decoration-transparent hover:decoration-current
                                 focus:decoration-current transition-all"
                        aria-label={`Ring oss på ${STUDIO_INFO.contact.phone}`}
                      >
                        {STUDIO_INFO.contact.phone}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="flex items-start"
                  >
                    <div className="h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                      <MailIcon className="h-5 w-5 text-brand-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        E-post
                      </h4>
                      <a 
                        href={`mailto:${STUDIO_INFO.contact.email}`}
                        className="text-gray-600 dark:text-gray-300 font-montserrat 
                                 hover:text-brand-600 dark:hover:text-brand-400 
                                 duration-200 
                                 focus:outline-none focus:text-brand-600 dark:focus:text-brand-400
                                 underline decoration-transparent hover:decoration-current
                                 focus:decoration-current transition-all break-all"
                        aria-label={`Send e-post til ${STUDIO_INFO.contact.email}`}
                      >
                        {STUDIO_INFO.contact.email}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="flex items-start"
                  >
                    <div className="h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                      <ClockIcon className="h-5 w-5 text-brand-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Åpningstid
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 font-montserrat">
                        Åpner høsten 2025!
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Social media med animasjon */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="mt-8 pt-6 border-t border-gray-200 dark:border-brand-700/30"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Følg oss på sosiale medier
                  </h4>
                  <div className="flex space-x-4">
                    <motion.a
                      href={STUDIO_INFO.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 via-magenta-500 to-brand-500
                              hover:from-purple-600 hover:via-magenta-600 hover:to-brand-600
                              text-white transition-all duration-300
                                flex items-center justify-center shadow-brand hover:shadow-brand-lg"
                      aria-label="Følg Urban Studios på Instagram"
                    >
                      <FaInstagram className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      href={STUDIO_INFO.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-blue-600 
                                flex items-center justify-center text-white
                              hover:bg-blue-700 transition-all duration-300 
                                shadow-brand"
                      aria-label="Følg Urban Studios på Facebook"
                    >
                      <FaFacebookF className="h-6 w-6" />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right column: Contact form med animasjon */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-full flex flex-col"
            >
              <div className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                            dark:from-brand-900/10 dark:to-surface-dark-muted 
                            rounded-2xl shadow-brand-lg p-6 md:p-8
                            border border-brand-100/50 dark:border-brand-700/30 h-full flex-col">
                <ContactForm />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}