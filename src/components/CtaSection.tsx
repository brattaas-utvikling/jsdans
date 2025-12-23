import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { STUDIO_INFO } from "@/data/dance-studio-data";
import { homepageSchemaModalBased } from "@/utils/homepageSchemaModalBased";
import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section
      className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden"
      aria-labelledby="cta-heading"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      {/* Background image med SEO-optimalisert alt-tekst */}
      <div className="absolute inset-0 z-0">
  <img
    src="/images/studio.jpeg"
    alt="Dansestudio ved Urban Studios Kongsvinger – profesjonell danseopplæring for alle nivåer"
    className="w-full h-full object-cover"
    loading="eager"
    fetchPriority="high"
    decoding="async"
    width="1920"
    height="1080"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 dark:from-black/70 dark:to-black/40" />
</div>


      {/* Content - økt z-index for hele innholdsområdet */}
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-3xl">
          {/* H1 - Urban Studios med SEO-optimalisering */}
          <motion.h1
            id="cta-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
            itemProp="name"
          >
            <span
              className="text-base font-bebas text-white/60 uppercase tracking-wider sr-only"
              aria-label="Urban Studios - Dansestudio Kongsvinger"
            >
              URBAN STUDIOS - Dansestudio Kongsvinger
            </span>
          </motion.h1>

          {/* H2 - Hovedbudskap (din opprinnelige tagline) */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6 tracking-tight"
          >
            {STUDIO_INFO.tagline}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="font-montserrat block mt-2 text-transparent bg-clip-text bg-hero-gradient py-2"
            >
              Uttrykk deg selv gjennom dans
            </motion.span>
          </motion.h2>

          {/* P - Din opprinnelige beskrivelse med SEO-søkeord tillagt */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="font-montserrat text-lg text-white/90 mb-8 max-w-xl"
            itemProp="description"
          >
            Velkommen til Urban - Kongsvingers nyetablerte dansestudio i
            Jernbanegata 16. Vi gir små og store dansere muligheten til å
            utvikle ferdighetene sine i de klassiske dansestilene. Her tilbys
            ukentlige klasser i ballett, jazz, moderne, show/musikal og hiphop
            tilpasset elevens ferdigheter og nivåer.
          </motion.p>

          {/* CTA Buttons - forbedret z-index og touch-target */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 relative z-30"
          >
            <Link
              to="/kurs"
              className="relative z-40 touch-manipulation"
              style={{ touchAction: "manipulation" }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full bg-brand-500 hover:bg-brand-600 text-white border-0 font-montserrat-medium 
                          relative z-50 touch-manipulation min-h-[48px] px-8 py-4
                          shadow-lg hover:shadow-xl transition-all duration-200
                          active:scale-95 focus:ring-2 focus:ring-brand-400/50 focus:ring-offset-2"
                aria-label="Se alle dansetimer og kurs hos Urban Studios Kongsvinger"
                title="Utforsk vårt utvalg av hip-hop, moderne dans og breakdance kurs"
                style={{ touchAction: "manipulation" }}
              >
                Se våre kurs
              </Button>
            </Link>

            {/* Din kommenterte ut knapp - kan aktiveres igjen */}
            {/* <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 text-white hover:bg-white/10 hover:text-white font-montserrat-medium"
              aria-label="Se timeplan for dansetimer i Kongsvinger"
              title="Oversikt over tidspunkt for alle våre dansetimer"
            >
              Timeplan
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button> */}

            <span id="cta-description" className="sr-only">
              Urban Studios - Dansestudio i Kongsvinger med hip-hop, moderne
              dans og breakdance for alle nivåer
            </span>
          </motion.div>

          {/* Skjult SEO-informasjon for søkemotorer */}
          <div className="sr-only">
            <span
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp="streetAddress">Storgata 42</span>
              <span itemProp="addressLocality">Kongsvinger</span>
              <span itemProp="postalCode">2212</span>
              <span itemProp="addressCountry">Norge</span>
            </span>
            <span itemProp="telephone">+47 123 45 678</span>
            <span itemProp="email">post@urbanstudios.no</span>
            <span itemProp="priceRange">400-800 NOK</span>
          </div>
        </div>
      </div>

      {/* JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchemaModalBased),
        }}
      />

      {/* Dine opprinnelige animerte dekorative elementer - redusert z-index */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/90 dark:from-black to-transparent z-5"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, delay: 1 }}
        viewport={{ once: true }}
        className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl z-1"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
        viewport={{ once: true }}
        className="absolute top-1/4 -left-12 w-48 h-48 bg-magenta-500/10 rounded-full blur-3xl z-1"
      />
    </section>
  );
}
