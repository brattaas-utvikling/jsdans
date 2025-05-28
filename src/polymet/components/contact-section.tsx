import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { STUDIO_INFO } from "@/polymet/data/dance-studio-data";
import ContactForm from "@/polymet/components/contact-form";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-black overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3">
            Kontakt oss
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Kom i kontakt med vårt dansestudio
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Har du spørsmål, ønsker du mer informasjon, eller vil du bare si hei?
            Fyll ut kontaktskjemaet nedenfor, så tar vi kontakt med deg så snart
            som mulig!
          </p>
        </div>

        {/* Contact content */}
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />

          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-coral-400/10 rounded-full blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative z-10">
            {/* Left column: Contact info and map */}
            <div className="space-y-8">
              {/* Contact info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  JS Dans
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                      <MapPinIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Adresse
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {STUDIO_INFO.address.street}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                      {STUDIO_INFO.address.zip}{" "}{STUDIO_INFO.address.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-coral-100 dark:bg-coral-900/30 flex items-center justify-center mr-4">
                      <PhoneIcon className="h-5 w-5 text-coral-600 dark:text-coral-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Telefon
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {STUDIO_INFO.contact.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-mint-100 dark:bg-mint-900/30 flex items-center justify-center mr-4">
                      <MailIcon className="h-5 w-5 text-mint-600 dark:text-mint-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        E-post
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {STUDIO_INFO.contact.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                      <ClockIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Åpningstid
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {STUDIO_INFO.contact.hours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social media */}
                <div className="mt-8">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                    Føl oss på sosiale medier
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href={STUDIO_INFO.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                    >
                      <InstagramIcon className="h-5 w-5" />

                      <span className="sr-only">Instagram</span>
                    </a>
                    <a
                      href={STUDIO_INFO.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                    >
                      <FacebookIcon className="h-5 w-5" />

                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href={STUDIO_INFO.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                    >
                      <TwitterIcon className="h-5 w-5" />

                      <span className="sr-only">Twitter</span>
                    </a>
                    <a
                      href={STUDIO_INFO.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                    >
                      <YoutubeIcon className="h-5 w-5" />

                      <span className="sr-only">YouTube</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Right column: Contact form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
