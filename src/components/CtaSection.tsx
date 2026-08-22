import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { homepageSchemaModalBased } from "@/utils/homepageSchemaModalBased";
import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section
      className="relative h-[calc(100dvh-48px)] md:h-dvh min-h-[520px] overflow-hidden
                 flex flex-col"
      aria-labelledby="cta-heading"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      {/* ── Bakgrunnsbilde ───────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/6a89699300069217943e/view?project=6853fb68001e82047908&impersonateuserid=&mode=admin"
          alt="Dansestudio ved Urban Studios Kongsvinger – profesjonell danseopplæring for alle nivåer"
          className="w-full h-full object-cover object-bottom"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width="1920"
          height="1080"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      {/* ── MOBIL: tekst sentrert midt på siden ───────────────────────
          ── DESKTOP: skjult — desktop bruker bunnen-blokken under ─── */}
      <div className="relative z-20 flex-1 flex items-center
                      px-4 md:hidden">
        <div className="max-w-sm">
          <motion.h1
            id="cta-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-bebas text-[clamp(2.8rem,10vw,4rem)] uppercase
                       leading-[0.95] tracking-wide text-white mb-3"
            itemProp="name"
          >
            Velkommen til<br />Urban Studios
            <br />
            <span className="text-transparent bg-clip-text bg-hero-gradient
                             text-[clamp(1.6rem,6vw,2.4rem)]">
              Uttrykk deg selv gjennom dans
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="font-montserrat text-sm leading-relaxed text-white/75"
            itemProp="description"
          >
            Ballett, jazz, moderne, show/musikal og hiphop — for alle nivåer
            fra 3 år og oppover.
          </motion.p>
        </div>
      </div>

      {/* ── MOBIL: knapp pinnet til bunnen ───────────────────────────── */}
      <div className="relative z-20 px-4 pb-12 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36 }}
        >
          <Link
            to="/kurs"
            style={{ touchAction: "manipulation" }}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full rounded-full min-h-[48px] px-8",
              "bg-brand-500 hover:bg-brand-600 text-white",
              "font-montserrat font-bold text-sm tracking-wide",
              "shadow-lg transition-all duration-200 active:scale-[0.98]",
              "focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2",
            )}
            aria-label="Se alle dansetimer og kurs hos Urban Studios Kongsvinger"
          >
            Se våre kurs
          </Link>
        </motion.div>
      </div>

      {/* ── DESKTOP: alt samlet nederst til venstre ──────────────────── */}
      <div className="relative z-20 hidden md:block
                      container mx-auto px-6
                      mt-auto pb-[18vh]">
        <div className="max-w-2xl">
          <motion.h1
            aria-hidden="true"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-bebas text-[clamp(3rem,6vw,5.5rem)] uppercase
                       leading-[0.95] tracking-wide text-white mb-3"
          >
            Velkommen til Urban Studios
            <br />
            <span className="text-transparent bg-clip-text bg-hero-gradient
                             text-[clamp(2rem,4vw,3rem)]">
              Uttrykk deg selv gjennom dans
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            viewport={{ once: true }}
            className="font-montserrat text-lg leading-relaxed
                       text-white/80 mb-8 max-w-lg"
            itemProp="description"
          >
            Ballett, jazz, moderne, show/musikal og hiphop — for alle nivåer
            fra 3 år og oppover, i Jernbanegata 16.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            viewport={{ once: true }}
            className="flex gap-3"
          >
            <Link
              to="/kurs"
              style={{ touchAction: "manipulation" }}
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-full min-h-[48px] px-8",
                "bg-brand-500 hover:bg-brand-600 text-white",
                "font-montserrat font-bold text-sm tracking-wide",
                "shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]",
                "focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2",
              )}
              aria-label="Se alle dansetimer og kurs hos Urban Studios Kongsvinger"
            >
              Se våre kurs
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bunn-fade */}
      <div className="absolute bottom-0 left-0 w-full h-32
                      bg-gradient-to-t from-black/70 to-transparent z-10
                      pointer-events-none" />

      {/* Skjult SEO */}
      <div className="sr-only">
        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">Jernbanegata 16</span>
          <span itemProp="addressLocality">Kongsvinger</span>
          <span itemProp="postalCode">2212</span>
          <span itemProp="addressCountry">Norge</span>
        </span>
        <span itemProp="telephone">+47 123 45 678</span>
        <span itemProp="email">post@urbanstudios.no</span>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchemaModalBased) }}
      />
    </section>
  );
}