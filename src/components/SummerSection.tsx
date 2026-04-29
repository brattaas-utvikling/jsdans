import { motion } from "framer-motion";
import { ArrowRight, Download, ExternalLink, Mail } from "lucide-react";
import { Link } from "react-router-dom";
async function downloadPdf(url: string, filename: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Nedlasting feilet:", err);
  }
}

export default function SummerSection() {
  return (
    <section
      className="
        py-16
        bg-gradient-to-br from-brand-50/80 to-surface-muted
        dark:from-brand-900/10 dark:to-surface-dark-muted
        relative overflow-hidden min-h-screen
      "
    >
      {/* Decorative blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Seksjonstittel */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              font-bebas text-bebas-2xl md:text-bebas-3xl lg:text-bebas-4xl
              text-gray-900 dark:text-white
              leading-tight text-center mb-8 uppercase
            "
          >
            FORESTILLING OG SOMMERKURS 2026
          </motion.h2>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* KOLONNE 1 – Forestilling */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="
                rounded-2xl
                bg-white dark:bg-surface-dark
                shadow-brand-lg
                border border-brand-100/50 dark:border-brand-700/30
                overflow-hidden relative
                p-6 sm:p-7
                flex flex-col
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 to-transparent dark:from-brand-900/10 dark:to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="text-gray-900 dark:text-white font-montserrat text-sm sm:text-base font-semibold">
                  Forestilling i Rådhusteateret 3. mai
                </h3>

                {/* Bilde */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-brand-100/60 dark:border-brand-700/30 bg-white dark:bg-surface-dark">
                  <div className="relative aspect-[5/4]">
                    <img
                      src="https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/699633c800314d466731/view?project=6853fb68001e82047908&mode=admin"
                      alt="Dansere fra forestillingen i Rådhusteateret"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-montserrat">
                      fra forestillingen 14.12.25
                    </p>
                  </div>
                </div>

                {/* Billettlenke */}
                <div className="mt-6">
                  <a
                    href="https://www.radhusteatret.no/kulturprogram/KUL20260343"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center justify-center gap-2
                      rounded-full px-6 py-3 text-base font-semibold w-full
                      bg-brand-500 hover:bg-brand-600
                      text-white
                      shadow hover:shadow-md
                      transition-all duration-200 active:scale-[0.98]
                      focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-2
                      no-underline min-h-[44px]
                    "
                    aria-label="Kjøp billetter til forestillingen i Rådhusteateret 3. mai 2026"
                  >
                    Kjøp billetter her
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* KOLONNE 2 – Sommerkurs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="
                rounded-2xl
                bg-white dark:bg-surface-dark
                shadow-brand-lg
                border border-brand-100/50 dark:border-brand-700/30
                overflow-hidden relative
                p-6 sm:p-8
                flex flex-col min-w-0
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 to-transparent dark:from-brand-900/10 dark:to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col flex-1 min-w-0">
                <h3 className="text-gray-900 dark:text-white font-montserrat text-sm sm:text-base font-semibold">
                … men vi tar ikke sommerferie helt ennå
                </h3>

                {/* Bilde av timeplan */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-brand-100/60 dark:border-brand-700/30 bg-white dark:bg-surface-dark">
                  <div className="relative aspect-[5/4]">
                    <img
                      src="/images/sommerkurs2026.webp"
                      alt="Timeplan for 5-ukers sommerkurs ved Urban Studios"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* To like store knapper + les mer-lenke under */}
                <div className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Last ned PDF */}
                  <button
                    onClick={() => downloadPdf(
                      "https://fra.cloud.appwrite.io/v1/storage/buckets/68c1ddbf000312c6515e/files/timeplan-sommerkurs-2026/view?project=6853fb68001e82047908&mode=admin",
                      "sommerkurs-timeplan-2026.pdf"
                    )}
                    className="
                      inline-flex items-center justify-center gap-2
                      rounded-full px-6 py-3 text-sm font-semibold min-h-[44px]
                      border border-brand-200 dark:border-brand-700/50
                      text-gray-900 dark:text-white cursor-pointer
                      hover:bg-brand-50 dark:hover:bg-brand-900/20
                      transition-all duration-200 active:scale-[0.98]
                      focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-2
                    "
                  >
                    TIMEPLAN
                    <Download className="h-3.5 w-3.5 text-brand-500" />
                  </button>
                                      {/* Påmelding */}
                    <a
                    href="mailto:registrer@urbanstudios.no?subject=Påmelding sommerkurs 2026&body=Navn:%0AFødselsdato:%0AKlasser:%0A%0AEvt. familiemedlemmer som meldes på:%0A%0ANye dansere må også registreres med kontaktinformasjon til foresatte!%0A%0AForesattes navn:%0AAdresse:%0ATelefonnummer:"
                    className="
                      inline-flex items-center justify-center gap-2
                      rounded-full px-6 py-3 text-base font-semibold w-full min-h-[44px]
                      bg-brand-500 hover:bg-brand-600 text-white
                      shadow hover:shadow-md transition-all duration-200 active:scale-[0.98]
                      focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-2
                      no-underline
                    "
                    >
                    PÅMELDING <Mail className="ml-2 h-4 w-4" />
                    </a>
                  </div>

                  {/* Les mer – tekstlenke under */}
                  <div className="text-center pt-3 md:pt-9">
                    <Link
                      to="/sommerkurs"
                      className="
                        inline-flex items-center gap-1.5
                        font-montserrat text-sm font-medium
                        text-brand-600 dark:text-brand-400
                        hover:text-brand-700 dark:hover:text-brand-300
                        underline underline-offset-4 decoration-brand-300/60
                        hover:decoration-brand-500
                        transition-colors duration-200
                      "
                    >
                      Les mer om sommerkurs her
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}