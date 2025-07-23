import { STUDIO_INFO } from "@/data/dance-studio-data";
import { useState } from "react";
import { MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";
// import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // State management for kartet
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleMapLoad = () => {
    setMapLoaded(true);
    setMapError(false);
    setRetryCount(0);
  };

  const handleMapError = () => {
    setMapError(true);
    setMapLoaded(false);
    console.warn('Google Maps failed to load');
  };

  const retryMap = () => {
    if (retryCount < 3) {
      setMapError(false);
      setMapLoaded(false);
      setRetryCount(prev => prev + 1);
      
      // Force reload iframe
      const iframe = document.querySelector('iframe[title*="Kart over"]') as HTMLIFrameElement;
      if (iframe) {
        const currentSrc = iframe.src;
        iframe.src = '';
        setTimeout(() => {
          iframe.src = currentSrc;
        }, 100);
      }
    }
  };

  return (
    <footer className="bg-surface-dark dark:bg-gray-900 text-white pt-16 pb-4 relative overflow-hidden">
      {/* Subtle gradient overlay - endret til blå/cyan-farger */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/30" />
      
      {/* Decorative elements - blå/cyan-farger */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12">
          
          {/* Studio info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="Urban Studios Logo" className="h-8 invert" />

            </div>
            
            {/* Tagline med blå/cyan gradient */}
            <p className="text-transparent bg-clip-text bg-hero-gradient dark:bg-energy-gradient mb-4 font-montserrat font-medium">
              {STUDIO_INFO.tagline}
            </p> 
            
            <p className="text-gray-300 dark:text-gray-200 mb-4 max-w-xs font-montserrat leading-relaxed">
              Vi tilbyr et bredt spekter av danseklasser for alle aldre og ferdighetsnivåer, fra nybegynnere til avanserte dansere.
            </p>
            
            {/* Contact info med ikoner og klikkbare lenker */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-brand-400 flex-shrink-0" />
                <p className="text-gray-400 dark:text-gray-300 font-montserrat">
                  {STUDIO_INFO.address.street}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-brand-400 flex-shrink-0" />
                <a 
                  href={`tel:${STUDIO_INFO.contact.phone.replace(/\s/g, '')}`}
                  className="text-gray-400 dark:text-gray-300 hover:text-brand-400 dark:hover:text-brand-300 
                            font-montserrat transition-colors hover:underline underline-offset-2"
                >
                  {STUDIO_INFO.contact.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 text-brand-400 flex-shrink-0" />
                <a 
                  href={`mailto:${STUDIO_INFO.contact.email}`}
                  className="text-gray-400 dark:text-gray-300 hover:text-brand-400 dark:hover:text-brand-300 
                            font-montserrat transition-colors hover:underline underline-offset-2"
                >
                  {STUDIO_INFO.contact.email}
                </a>
              </div>
     {/* Instagram lenke - fikset */}
<div className="flex items-center gap-2">
  <FaInstagram className="h-4 w-4 text-brand-400 flex-shrink-0" />
  <a 
    href="https://instagram.com/urbanstudios.dans"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 dark:text-gray-300 hover:text-brand-400 dark:hover:text-brand-300 
              font-montserrat transition-colors hover:underline underline-offset-2"
    aria-label="Følg Urban Studios på Instagram (åpnes i ny fane)"
  >
    Følg oss på Instagram
  </a>
</div>

{/* Facebook lenke - fikset */}
<div className="flex items-center gap-2">
  <FaFacebookF className="h-4 w-4 text-brand-400 flex-shrink-0" />
  <a 
    href="https://www.facebook.com/profile.php?id=61578399712863"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 dark:text-gray-300 hover:text-brand-400 dark:hover:text-brand-300 
              font-montserrat transition-colors hover:underline underline-offset-2"
    aria-label="Følg Urban Studios på Facebook (åpnes i ny fane)"
  >
    Følg oss på Facebook
  </a>
</div>
              
            </div>
          </div>

          {/* Google Maps - spans 2 columns */}
          <div className="md:col-span-2">
            <div className="rounded-xl overflow-hidden shadow-brand-lg h-[300px] border border-gray-700/50 dark:border-gray-600/50 relative">
              
              {/* Loading state */}
              {!mapLoaded && !mapError && (
                <div className="absolute inset-0 bg-gray-800 dark:bg-gray-900 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-400 mx-auto mb-2"></div>
                    <p className="text-gray-300 text-sm font-montserrat">Laster kart...</p>
                  </div>
                </div>
              )}

              {/* Error state */}
              {mapError && (
                <div className="absolute inset-0 bg-gray-800 dark:bg-gray-900 flex items-center justify-center z-10">
                  <div className="text-center p-6">
                    <p className="text-gray-300 text-sm font-montserrat mb-4">
                      Kunne ikke laste kart
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {retryCount < 3 && (
                        <button
                          onClick={retryMap}
                          className="inline-flex items-center px-4 py-2 rounded-full
                                    bg-brand-500 hover:bg-brand-600
                                    text-white font-montserrat font-medium text-sm
                                    transition-colors"
                        >
                          Prøv igjen ({3 - retryCount} forsøk igjen)
                        </button>
                      )}
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(
                          STUDIO_INFO.address.street + ', ' + 
                          STUDIO_INFO.address.zip + ' ' + 
                          STUDIO_INFO.address.city
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-full
                                  bg-blue-500 hover:bg-blue-600
                                  text-white font-montserrat font-medium text-sm
                                  transition-colors"
                      >
                        Åpne i Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Google Maps Embed with better error handling */}
              <iframe
                key={`map-${retryCount}`} // Force re-render on retry
                src={STUDIO_INFO.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Kart over ${STUDIO_INFO.name} - ${STUDIO_INFO.address.street}, ${STUDIO_INFO.address.city}`}
                className="w-full h-full"
                onLoad={handleMapLoad}
                onError={handleMapError}
              />
            </div>
          </div>
        </div>

        {/* Bottom bar - eksisterende copyright og lenker */}
        <div className="border-t border-gray-700/50 dark:border-gray-600/50 pt-8 pb-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 dark:text-gray-300 text-sm mb-4 md:mb-0 font-montserrat">
            &copy; {currentYear} {STUDIO_INFO.name}. Alle rettigheter reservert.
          </p>

          <div className="flex space-x-6">
            {/* <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-brand-400 dark:hover:text-brand-300 transition-colors text-sm font-montserrat
                        hover:underline underline-offset-4"
            >
              Personvern
            </a> */}
{/*             <Link 
              to="/betingelser"
              className="text-gray-400 dark:text-gray-300 hover:text-brand-400 dark:hover:text-brand-300 transition-colors text-sm font-montserrat hover:underline underline-offset-4"
            >
              Betingelser
            </Link> */}
            {/* <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-brand-400 dark:hover:text-brand-300 transition-colors text-sm font-montserrat
                        hover:underline underline-offset-4"
            >
              Cookies
            </a> */}
          </div>
        </div>

        {/* Ny linje for Brattås Utvikling */}
        <div className="border-t border-gray-700/30 dark:border-gray-600/30 pt-4 text-center">
          <p className="text-gray-400 dark:text-gray-300 text-xs font-montserrat">
            Levert av{" "}
            <a
              href="https://www.brattaasutvikling.no"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-500 dark:text-brand-400 hover:text-brand-400 dark:hover:text-brand-300 
                        font-medium transition-colors hover:underline underline-offset-2"
            >
              Brattås Utvikling
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}