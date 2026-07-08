import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

// Bytt ut med faktisk bildeimport eller prop når du har auditonsbildet
const AUDITION_IMAGE = "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/6a1f310800220b388d54/view?project=6853fb68001e82047908&mode=admin";

// Forhåndsutfylt mailto-lenke
const MAILTO_LINK =
  "mailto:registrer@urbanstudios.no" +
  "?subject=P%C3%A5melding%20kompaniaudition" +
  "&body=Navn%3A%20%0AF%C3%B8dselsdato%3A%20%0AFores%C3%B8rsattes%20navn%3A%20%0AFores%C3%B8rsattes%20telefon%3A%20%0AFores%C3%B8rsattes%20e-post%3A%20";

// Bytt ut med faktisk lenke til nyhetsartikkelen når den finnes
const LES_MER_LINK = "/nyheter/6a1f312a001f5733acf9";

export function KompaniAuditionh26() {
  const prefersReduced = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: prefersReduced ? 0 : 0.55, delay },
  });

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24
                 bg-gradient-to-br from-brand-50/80 to-surface-muted
                 dark:from-brand-900/10 dark:to-surface-dark-muted"
      aria-labelledby="audition-heading"
    >
      {/* Dekorative blobs */}
      <motion.div
        animate={prefersReduced ? {} : { scale: [1, 1.12, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-16 -right-16 h-72 w-72
                   rounded-full bg-magenta-400/15 blur-3xl"
      />
      <motion.div
        animate={prefersReduced ? {} : { scale: [1, 1.08, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56
                   rounded-full bg-brand-400/15 blur-3xl"
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-2">

          {/* ── Bilde ── */}
          <motion.div {...fadeUp(0)} className="order-last lg:order-first">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-brand-lg">
              <img
                src={AUDITION_IMAGE}
                alt="Dansere under kompanitrening hos Urban Studios"
                loading="lazy"
                width={800}
                height={600}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Urgency-badge */}
              <div
                className="absolute left-4 top-4 flex items-center gap-1.5
                           rounded-full bg-magenta-500 px-3 py-1.5
                           font-montserrat text-xs font-semibold text-white shadow-md"
              >
                Frist søndag 7. juni
              </div>
            </div>
          </motion.div>

          {/* ── Tekst ── */}
          <div className="flex flex-col gap-5">

            {/* Etikett */}
            <motion.div {...fadeUp(0.1)}>
              <span
                className="inline-block rounded-full border border-brand-200
                           bg-brand-50 px-3 py-1
                           font-montserrat text-xs font-semibold uppercase
                           tracking-widest text-brand-600
                           dark:border-brand-700/40 dark:bg-brand-900/20 dark:text-brand-400"
              >
                Nyheter fra Urban Studios
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div {...fadeUp(0.15)}>
              <h2
                id="audition-heading"
                className="font-bebas text-4xl uppercase leading-tight tracking-wide
                           text-gray-900 dark:text-white
                           md:text-5xl lg:text-[3.25rem]"
              >
                Velkommen til{" "}
                <span className="text-transparent bg-clip-text bg-brand-gradient">
                  kompaniaudition
                </span>
                <br />
                <span className="font-montserrat text-xl font-semibold normal-case tracking-normal
                                 text-gray-700 dark:text-gray-300 md:text-2xl">
                  Torsdag 11. juni kl.&nbsp;18
                </span>
              </h2>
            </motion.div>

            {/* Brødtekst */}
            <motion.div {...fadeUp(0.2)} className="space-y-3">
              <p className="font-montserrat text-base leading-relaxed text-gray-700 dark:text-gray-300">
                Urban sine dansekompanier trener sammen 90 minutter i uken, har egne
                forestillinger og får muligheten til å delta på ulike oppvisninger og
                arrangementer gjennom året. Å være en del av et kompani er en fantastisk
                erfaring — og nå vil vi ønske nye medlemmer velkommen!
              </p>
              <p className="font-montserrat text-base font-semibold leading-relaxed
                            text-gray-900 dark:text-white">
                Auditionen er åpen for deg som begynner i 4.&nbsp;klasse i år.
              </p>
              <p className="font-montserrat text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Send navn, fødselsdato og foresattes kontaktinfo til{" "}
                <a
                  href={MAILTO_LINK}
                  className="font-medium text-brand-600 underline underline-offset-2
                             hover:text-brand-700 focus-visible:ring-2
                             focus-visible:ring-brand-500 focus-visible:ring-offset-1
                             dark:text-brand-400 dark:hover:text-brand-300"
                >
                  registrer@urbanstudios.no
                </a>{" "}
                innen{" "}
                <strong className="text-magenta-600 dark:text-magenta-400">
                  søndag 7. juni kl.&nbsp;21
                </strong>
                .
              </p>
            </motion.div>

            {/* Knapper */}
            <motion.div
              {...fadeUp(0.28)}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              {/* Primær — Registrer */}
              <a
                href={MAILTO_LINK}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full
                           bg-brand-500 px-6 font-montserrat text-sm font-semibold text-white
                           shadow transition-all duration-200
                           hover:bg-brand-600 hover:shadow-md
                           active:scale-[0.98]
                           focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                style={{ touchAction: "manipulation" }}
                aria-label="Meld deg på kompaniaudition via e-post"
              >
                <Mail size={16} aria-hidden="true" />
                Registrer deg
              </a>

              {/* Sekundær — Les mer */}
              <a
                href={LES_MER_LINK}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full
                           border border-brand-300 px-6
                           font-montserrat text-sm font-semibold text-brand-600
                           transition-all duration-200
                           hover:bg-brand-50 hover:text-brand-700
                           active:scale-[0.98]
                           focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
                           dark:border-brand-700 dark:text-brand-400
                           dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
                style={{ touchAction: "manipulation" }}
              >
                Les mer
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}