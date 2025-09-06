// src/components/TermsConditions.tsx - Bruker importert termsData
import { termsData } from "@/data/termsData"; // ✨ Import fra separat fil
import ScrollToTop from "@/helpers/ScrollToTop";

interface TermsConditionsProps {
  showTitle?: boolean;
  className?: string;
}

export default function TermsConditions({
  showTitle = true,
  className = "",
}: TermsConditionsProps) {
  return (
    <section
      className={`py-16 bg-white dark:bg-surface-dark relative overflow-hidden ${className}`}
    >
      <ScrollToTop />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/5 dark:bg-magenta-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/5 dark:bg-brand-400/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-base font-medium text-brand-600 dark:text-brand-400 
                          uppercase tracking-wider mb-3">
              Betingelser
            </h1>
            <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
              Viktige betingelser for kursdeltagelse
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
              Les gjennom våre betingelser før du melder deg på kurs. Dette
              sikrer en god opplevelse for alle deltakere.
            </p>
          </div>
        )}

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {termsData.map((term, index) => {
            const IconComponent = term.icon;

            return (
              <div
                key={index}
                className="bg-gray-50 dark:bg-surface-dark-muted rounded-xl p-6 
                          border border-gray-200 dark:border-gray-700 
                          hover:shadow-md dark:hover:shadow-lg 
                          transition-all duration-300 group"
              >
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 bg-brand-100 dark:bg-brand-900/30 
                                rounded-lg flex items-center justify-center 
                                group-hover:bg-brand-200 dark:group-hover:bg-brand-800/50 
                                transition-colors duration-300"
                  >
                    <IconComponent className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bebas text-bebas-base font-semibold text-gray-900 dark:text-white mb-2">
                      {term.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="text-sm text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
                  {term.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div
            className="bg-gradient-to-r from-brand-50/80 to-magenta-50/50 
                      dark:from-brand-900/20 dark:to-magenta-900/20 
                      rounded-xl p-6 border border-brand-200/50 dark:border-brand-700/30 
                      max-w-6xl mx-auto"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 font-montserrat leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Viktig:</strong>{" "}
              Ved påmelding aksepterer du automatisk disse betingelsene. Har du
              spørsmål om noen av punktene, ikke nøl med å kontakte oss før du
              melder deg på.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}