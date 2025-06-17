import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STUDIO_INFO } from "@/data/dance-studio-data";

export default function CtaSection() {
  return (
    <section
      className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1646084067464-0aa782d923dc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Unge dansere i bevegelse på Urban Studios, som viser energien og kreativiteten i våre danskurs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 dark:from-black/70 dark:to-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          
          {/* Studio name with animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <p className="text-sm font-montserrat text-white/60 uppercase tracking-wider">
              {STUDIO_INFO.name}
            </p>
          </motion.div>

          {/* Main heading with staggered animation */}
          <motion.h1
            id="cta-heading"
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
              className="font-montserrat block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 py-1"
            >
              Uttrykk deg selv gjennom dans
            </motion.span>
          </motion.h1>

          {/* Description with animation */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="font-montserrat text-lg text-white/80 mb-8 max-w-xl"
          >
            Endelig kan vi dele dette vi har drømt om lenge! Vi åpner dørene for Urban Studios høsten 2025, et sted hvor alle kan utforske og utvikle sin dans. Enten du er nybegynner eller erfaren, har vi noe for deg.
          </motion.p>

          {/* CTA Buttons with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white border-0 font-montserrat-medium"
              aria-describedby="cta-description"
            >
              Se våre kurs
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 text-white hover:bg-white/10 hover:text-white font-montserrat-medium"
            >
              Timeplan
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            
            <span id="cta-description" className="sr-only">
              Ingen forpliktelser - prøv våre danskurs kostnadsfritt
            </span>
          </motion.div>
        </div>
      </div>

      {/* Animated decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-black to-transparent z-10"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, delay: 1 }}
        viewport={{ once: true }}
        className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 1.2 }}
        viewport={{ once: true }}
        className="absolute top-1/4 -left-12 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl"
      />
    </section>
  );
}