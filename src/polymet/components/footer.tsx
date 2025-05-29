import { STUDIO_INFO } from "@/polymet/data/dance-studio-data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12">
          {/* Studio info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-bold">{STUDIO_INFO.name}</h3>
            </div>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400 mb-4">{STUDIO_INFO.tagline}</p> 
            <p className="text-gray-400 mb-4 max-w-xs">
              Vi tilbyr et bredt spekter av danseklasser for alle aldre og ferdighetsnivåer, fra nybegynnere til avanserte dansere.
            </p>
          </div>

          {/* Classes */}
          {/* <div>
            <h3 className="text-lg font-bold mb-4">Classes</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Hip Hop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Jazz
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Breakdance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contemporary
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Classes
                </a>
              </li>
            </ul>
          </div> */}

          {/* Contact */}
          {/* <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>{STUDIO_INFO.address.street}</p>
              <p>
                {STUDIO_INFO.address.city}, {STUDIO_INFO.address.state}{" "}
                {STUDIO_INFO.address.zip}
              </p>
              <p className="mt-4">{STUDIO_INFO.contact.phone}</p>
              <p>{STUDIO_INFO.contact.email}</p>
            </address>
          </div> */}

 {/* Map - spans 2 columns */}
          <div className="md:col-span-2">
            <div className="rounded-md overflow-hidden shadow-lg h-[300px]">
              <iframe
                src={STUDIO_INFO.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} {STUDIO_INFO.name}. Alle rettigheter reservert
          </p>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
