import { motion, useReducedMotion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Instagram, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";

const INSTAGRAM_URL = "https://instagram.com/urbanstudios.dans";
const FACEBOOK_URL  = "https://www.facebook.com/profile.php?id=61578399712863";

// Bytt til faktisk dato for høstoppstart
// const AAPNER_IGJEN = "18. august";

export function SommerferieSection() {
  const prefersReduced = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: prefersReduced ? 0 : 0.55, delay },
  });

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28
                 bg-gradient-to-br from-brand-50/80 to-surface-muted
                 dark:from-brand-900/10 dark:to-surface-dark-muted"
      aria-labelledby="sommerferie-heading"
    >
      {/* Dekorative blobs */}
      <motion.div
        animate={prefersReduced ? {} : { scale: [1, 1.12, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96
                   rounded-full bg-brand-400/15 blur-3xl"
      />
      <motion.div
        animate={prefersReduced ? {} : { scale: [1, 1.08, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72
                   rounded-full bg-magenta-400/15 blur-3xl"
      />

      {/* Ghost-tekst */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center
                   justify-center overflow-hidden select-none"
      >
        <span
          className="font-bebas uppercase leading-none text-brand-100/60
                     dark:text-brand-900/40 whitespace-nowrap
                     text-[clamp(4rem,15vw,12rem)]"
        >
          SOMMERFERIE
        </span>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6 text-center">

        {/* Heading */}
        <motion.h2
          {...fadeUp(0.14)}
          id="sommerferie-heading"
          className="font-bebas text-5xl md:text-7xl lg:text-8xl
                     uppercase tracking-wide leading-tight
                     text-gray-900 dark:text-white"
        >
          Vi har tatt{" "}
          <span className="text-transparent bg-clip-text bg-brand-gradient">
            sommerferie!
          </span>
        </motion.h2>

        {/* Ingress */}
        {/* <motion.p
          {...fadeUp(0.2)}
          className="mt-5 font-montserrat text-lg md:text-xl
                     text-gray-700 dark:text-gray-300
                     leading-relaxed max-w-xl mx-auto"
        >
          Studioet er stengt og danserne lader batteriene. Vi ses igjen{" "}
          <strong className="text-brand-600 dark:text-brand-400 font-semibold">
            {AAPNER_IGJEN}
          </strong>{" "}
          — med ny energi og enda bedre vibes.
        </motion.p> */}

        {/* Sosiale medier */}
        {/* <motion.p
          {...fadeUp(0.26)}
          className="mt-3 font-montserrat text-base
                     text-gray-500 dark:text-gray-400"
        >
          Følg oss i sommer!
        </motion.p> */}

        {/* Knapper — plain <a> med buttonVariants for å unngå Slot/asChild-feil */}
        <motion.div
          {...fadeUp(0.33)}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Følg Urban Studios på Instagram (åpner i ny fane)"
            style={{ touchAction: "manipulation" }}
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full min-h-[44px] px-6 gap-2",
              "bg-brand-500 hover:bg-brand-600 text-white",
              "font-montserrat text-sm font-semibold",
              "shadow hover:shadow-md",
              "transition-all duration-200 active:scale-[0.98]",
              "focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
            )}
          >
            <Instagram size={16} aria-hidden="true" />
            Instagram
          </a>

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Følg Urban Studios på Facebook (åpner i ny fane)"
            style={{ touchAction: "manipulation" }}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full min-h-[44px] px-6 gap-2",
              "border-brand-300 text-brand-600",
              "font-montserrat text-sm font-semibold",
              "hover:bg-brand-50 hover:text-brand-700",
              "transition-all duration-200 active:scale-[0.98]",
              "focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
              "dark:border-brand-700 dark:text-brand-400",
              "dark:hover:bg-brand-900/30 dark:hover:text-brand-300",
            )}
          >
            <Facebook size={16} aria-hidden="true" />
            Facebook
          </a>
        </motion.div>

      </div>
    </section>
  );
}