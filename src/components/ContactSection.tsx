import { ClockIcon, FacebookIcon, InstagramIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import ContactForm from "./ContactForm";
import { STUDIO_INFO } from "../data/dance-studio-data";
import ScrollToTop from "@/helpers/ScrollToTop";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 bg-surface-light dark:bg-surface-dark 
                  relative overflow-hidden"
    >
      <ScrollToTop />
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/10 via-transparent to-orange-50/10 
                    dark:from-orange-900/5 dark:via-transparent dark:to-orange-900/5" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-sm font-montserrat-medium text-studio-indigo-600 dark:text-studio-indigo-400 
                        uppercase tracking-wider mb-3">
            Kontakt oss
          </h1>
          <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
            Vi er her for deg
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat">
            Har du spørsmål, ønsker du mer informasjon, eller vil du bare si hei?
            Fyll ut kontaktskjemaet nedenfor, så tar vi kontakt med deg så snart som mulig!
          </p>
        </div>

        {/* Contact content med nye farger */}
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl" />

          {/* Grid med equal heights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative z-10">
            
            {/* Left column: Contact info - h-full for equal height */}
            <div className="h-full flex flex-col">
              <div className="bg-gradient-to-b lg:bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-2xl shadow-studio p-6 md:p-8
                                border border-gray-100 dark:border-orange-700/30 h-full flex flex-col">
                <h3 className="font-bebas text-bebas-base font-semi mb-6 text-gray-900 dark:text-white">
                  URBAN STUDIOS
                </h3>
                
                {/* Contact details - flex-grow for content distribution */}
                <div className="space-y-4 flex-grow">
                  <div className="flex items-start">
                    <div className="h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPinIcon className="h-5 w-5 text-pink-300 dark:text-pink-400" />
                    </div>
                    <div>
                      <h4 className="font-montserrat-semibold text-gray-900 dark:text-white">
                        Adresse
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 font-montserrat">
                        {STUDIO_INFO.address.street}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 font-montserrat">
                        {STUDIO_INFO.address.zip} {STUDIO_INFO.address.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                      <PhoneIcon className="h-5 w-5 text-pink-300 dark:text-pink-400" />
                    </div>
                    <div>
                      <h4 className="font-montserrat-semibold text-gray-900 dark:text-white">
                        Telefon
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 font-montserrat">
                        {STUDIO_INFO.contact.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                      <MailIcon className="h-5 w-5 text-pink-300 dark:text-pink-400" />
                    </div>
                    <div>
                      <h4 className="font-montserrat-semibold text-gray-900 dark:text-white">
                        E-post
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 font-montserrat">
                        {STUDIO_INFO.contact.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                      <ClockIcon className="h-5 w-5 text-pink-300 dark:text-pink-4000" />
                    </div>
                    <div>
                      <h4 className="font-montserrat-semibold text-gray-900 dark:text-white">
                        Åpningstid
                      </h4>
                      {/* <p className="text-gray-600 dark:text-gray-300 font-montserrat">
                        {STUDIO_INFO.contact.hours}
                      </p> */}
                      <p className="text-gray-600 dark:text-gray-300 font-montserrat">
                        Åpner høsten 2025!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social media - pushed to bottom */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-orange-700/30">
                  <h4 className="font-montserrat-semibold text-gray-900 dark:text-white mb-4">
                    Følg oss på sosiale medier
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href={STUDIO_INFO.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 
                              hover:from-purple-600 hover:via-pink-600 hover:to-orange-500
                              text-white transition-all duration-300 hover:scale-110 
                                flex items-center justify-center shadow-studio hover:shadow-studio"
                    >
                      <InstagramIcon className="h-6 w-6" />
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a
                      href={STUDIO_INFO.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-blue-600 
                                flex items-center justify-center text-white
                              hover:bg-blue-700 transition-all duration-300 
                                hover:scale-105 shadow-studio"
                    >
                      <FacebookIcon className="h-6 w-6" />
                      <span className="sr-only">Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Contact form - h-full for equal height */}
            <div className="h-full flex flex-col">
              <div className="bg-gradient-to-b lg:bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 rounded-2xl shadow-studio-lg p-6 md:p-8
                                border border-gray-100 dark:border-orange-700/30 h-full flex flex-col">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}