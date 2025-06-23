import { STUDIO_INFO } from "@/data/dance-studio-data";
import { useState } from "react";

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
    <footer className="bg-studio-blue-900 dark:bg-studio-blue-950 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-studio-blue-800/50 via-transparent to-studio-pink-900/20" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-studio-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-studio-blue-400/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12">
          
          {/* Studio info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-bebas text-bebas-lg text-white">
                {STUDIO_INFO.name}
              </h3>
            </div>
            
            {/* Tagline med rosa gradient */}
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-studio-pink-300 to-studio-pink-400 mb-4 font-montserrat-medium">
              {STUDIO_INFO.tagline}
            </p> 
            
            <p className="text-studio-blue-200 dark:text-studio-blue-100 mb-4 max-w-xs font-montserrat leading-relaxed">
              Vi tilbyr et bredt spekter av danseklasser for alle aldre og ferdighetsnivåer, fra nybegynnere til avanserte dansere.
            </p>
            
            {/* Quick contact info */}
            <div className="space-y-2 text-sm">
              <p className="text-studio-blue-300 dark:text-studio-blue-200 font-montserrat">
                📍 {STUDIO_INFO.address.street}
              </p>
              <p className="text-studio-blue-300 dark:text-studio-blue-200 font-montserrat">
                📞 {STUDIO_INFO.contact.phone}
              </p>
              <p className="text-studio-blue-300 dark:text-studio-blue-200 font-montserrat">
                ✉️ {STUDIO_INFO.contact.email}
              </p>
            </div>
          </div>

          {/* Google Maps - spans 2 columns */}
          <div className="md:col-span-2">
            <div className="rounded-xl overflow-hidden shadow-studio-lg h-[300px] border border-studio-blue-700/30 relative">
              
              {/* Loading state */}
              {!mapLoaded && !mapError && (
                <div className="absolute inset-0 bg-studio-blue-800 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-studio-pink-400 mx-auto mb-2"></div>
                    <p className="text-studio-blue-200 text-sm font-montserrat">Laster kart...</p>
                  </div>
                </div>
              )}

              {/* Error state */}
              {mapError && (
                <div className="absolute inset-0 bg-studio-blue-800 flex items-center justify-center z-10">
                  <div className="text-center p-6">
                    <p className="text-studio-blue-200 text-sm font-montserrat mb-4">
                      Kunne ikke laste kart
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {retryCount < 3 && (
                        <button
                          onClick={retryMap}
                          className="inline-flex items-center px-4 py-2 rounded-full
                                    bg-studio-blue-500 hover:bg-studio-blue-600
                                    text-white font-montserrat-medium text-sm
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
                                  bg-studio-pink-500 hover:bg-studio-pink-600
                                  text-white font-montserrat-medium text-sm
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

        {/* Bottom bar */}
        <div className="border-t border-studio-blue-700/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-studio-blue-300 dark:text-studio-blue-200 text-sm mb-4 md:mb-0 font-montserrat">
            &copy; {currentYear} {STUDIO_INFO.name}. Alle rettigheter reservert
          </p>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-studio-blue-400 hover:text-studio-pink-400 transition-colors text-sm font-montserrat
                        hover:underline underline-offset-4"
            >
              Personvern
            </a>
            <a
              href="#"
              className="text-studio-blue-400 hover:text-studio-pink-400 transition-colors text-sm font-montserrat
                        hover:underline underline-offset-4"
            >
              Vilkår
            </a>
            <a
              href="#"
              className="text-studio-blue-400 hover:text-studio-pink-400 transition-colors text-sm font-montserrat
                        hover:underline underline-offset-4"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}