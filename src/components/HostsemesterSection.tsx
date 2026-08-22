import { motion, useReducedMotion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

const HERO_IMAGE    = "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/6a1f38ce002a8cf7c428/view?project=6853fb68001e82047908&impersonateuserid=&mode=admin";
const PROVETIME_IMG = "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/695822c8002e43f3b1c7/view?project=6853fb68001e82047908&impersonateuserid=&mode=admin";

const TIMEPLAN_URL   = "/timeplan";
const PAAMELDING_URL = "/registration";
const PROVETIME_URL =
  "mailto:registrer@urbanstudios.no" +
  "?subject=P%C3%A5melding%20pr%C3%B8vetime%20%E2%80%93%20Urban%20Studios" +
  "&body=Navn%3A%20%0AF%C3%B8dselsdato%3A%20%0AKlasse%2Fstil%20jeg%20vil%20pr%C3%B8ve%3A%20%0ATelefon%3A%20%0A%0A---%0AVed%20%C3%A5%20sende%20denne%20e-posten%20bekrefter%20jeg%20at%20jeg%20har%20lest%20og%20aksepterer%20Urban%20Studios%20sine%20betingelser%20for%20kursdeltagelse.%0ABetingelser%3A%20https%3A%2F%2Furbanstudios.no%2Fbetingelser";
const KONTAKT_URL    = "/kontakt";
const BETINGELSER_URL = "/betingelser";

const HALF_CONTAINER = "md:w-[360px] lg:w-[488px] xl:w-[616px] 2xl:w-[744px]";

function useFadeUp(prefersReduced: boolean | null) {
  return (delay = 0) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: prefersReduced ? 0 : 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  });
}

export function HostsemesterSection() {
  const prefersReduced = useReducedMotion();
  const fadeUp = useFadeUp(prefersReduced);

  return (
    <div className="overflow-hidden">

      {/* ══════════════════════════════════════════════════════════
          SEKSJON 1 — NYTT ÅR
      ══════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="hostsemester-heading"
        className="bg-[#0A0604]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]">

          {/* Bilde — øverst på mobil */}
          <motion.div
            {...fadeUp(0)}
            className="relative order-first md:order-last
                       aspect-[4/3] md:aspect-auto md:min-h-[480px] overflow-hidden"
          >
            <img
              src={HERO_IMAGE}
              alt="Dansere på Urban Studios"
              loading="eager"
              fetchPriority="high"
              width={800}
              height={700}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0
                         bg-gradient-to-b from-black/30 to-black/10
                         md:bg-gradient-to-r md:from-[#0A0604] md:via-[#0A0604]/20 md:to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div className={cn("relative h-full w-full md:mr-auto", HALF_CONTAINER)}>
                <div
                  className="absolute bottom-6 right-6 md:right-0
                             bg-brand-500 px-4 py-3 text-center
                             font-bebas text-sm tracking-widest text-white uppercase leading-tight
                             shadow-xl rotate-[4deg]"
                >
                  Høst
                  <br />
                  2026
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tekst */}
          <div
            className="order-last md:order-first
                       flex flex-col justify-center
                       px-6 py-12 md:px-0 md:py-16"
          >
            <div
              className={cn(
                "flex flex-col gap-5 w-full md:ml-auto md:pr-8 lg:pr-12",
                HALF_CONTAINER,
              )}
            >
              <motion.p
                {...fadeUp(0.1)}
                className="font-montserrat text-[10px] font-bold uppercase
                           tracking-[4px] text-brand-500"
              >
                Høstsemester 2026
              </motion.p>

              <motion.h2
                {...fadeUp(0.16)}
                id="hostsemester-heading"
                className="font-bebas text-[clamp(3rem,9vw,5rem)] uppercase
                           leading-[0.95] text-white"
              >
                Et nytt
                <br />
                år på
                <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1.5px #FF8C00" }}
                >
                  Urban
                </span>
              </motion.h2>

              <motion.div {...fadeUp(0.22)}>
                <span
                  className="inline-flex items-center gap-2
                             rounded bg-magenta-500 px-4 py-2
                             font-montserrat text-xs font-bold text-white"
                >
                  Oppstart mandag 24. august
                </span>
              </motion.div>

              <motion.p
                {...fadeUp(0.27)}
                className="font-montserrat text-sm leading-relaxed text-white/60
                           border-l-2 border-brand-500 pl-4 max-w-sm"
              >
                Kveldsskolen på Urban tilbyr undervisning innen jazzdans, klassisk ballet,
                moderne/samtidsdans, hiphop/kommersiell og musikaldans. Vi har to dansesaler
                med høye speil og høyttalere, og vi gleder oss til å ta imot flere dansere
                dette året.
              </motion.p>

              <motion.div {...fadeUp(0.32)} className="flex flex-wrap gap-3">
                <a
                  href={TIMEPLAN_URL}
                  style={{ touchAction: "manipulation" }}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "rounded-full min-h-[44px] px-6",
                    "bg-brand-500 hover:bg-brand-600 text-white",
                    "font-montserrat text-xs font-bold tracking-widest uppercase",
                    "shadow hover:shadow-md transition-all duration-200 active:scale-[0.98]",
                    "focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0604]",
                  )}
                >
                  Timeplan
                </a>
                <a
                  href={PAAMELDING_URL}
                  style={{ touchAction: "manipulation" }}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-full min-h-[44px] px-6",
                    "border-white/25 text-white bg-transparent",
                    "font-montserrat text-xs font-bold tracking-widest uppercase",
                    "hover:bg-white/10 hover:text-white",
                    "transition-all duration-200 active:scale-[0.98]",
                    "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0604]",
                  )}
                >
                  Påmelding
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SEKSJON 2 — GRATIS PRØVETIMER
      ══════════════════════════════════════════════════════════ */}
      <section aria-labelledby="provetime-heading" className="bg-white dark:bg-surface-dark">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Bilde */}
          <motion.div
            {...fadeUp(0.05)}
            className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden"
          >
            <img
              src={PROVETIME_IMG}
              alt="Elever i prøvetime hos Urban Studios"
              loading="lazy"
              width={700}
              height={600}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </motion.div>

          {/* Tekst */}
          <div
            className="flex flex-col justify-center
                       px-6 py-12 md:px-0 md:py-16
                       md:border-l-4 md:border-gray-900 dark:md:border-white"
          >
            <div
              className={cn(
                "flex flex-col gap-4 w-full md:mr-auto md:pl-8 lg:pl-12",
                HALF_CONTAINER,
              )}
            >
              <motion.p
                {...fadeUp(0.1)}
                className="font-montserrat text-[10px] font-bold uppercase
                           tracking-[3px] text-gray-400 dark:text-gray-500"
              >
                Uke 35 og 36
              </motion.p>

              <motion.h2
                {...fadeUp(0.16)}
                id="provetime-heading"
                className="font-bebas text-[clamp(2.4rem,6vw,3.2rem)] uppercase
                           leading-tight tracking-wide
                           text-gray-900 dark:text-white"
              >
                Gratis
                <br />
                <span className="text-brand-500">prøvetimer</span>
              </motion.h2>

              <motion.p
                {...fadeUp(0.22)}
                className="font-montserrat text-sm leading-relaxed
                           text-gray-500 dark:text-gray-400 max-w-sm"
              >
                Er du ikke sikker på hvilke klasser som passer deg? I uke 35 og 36
                kan du prøve forskjellige klasser før du bestemmer deg, helt uten
                forpliktelser. Registrer deg for prøvetime, eller send oss en
                melding hvis du ønsker veiledning.
              </motion.p>

              <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-3">
                <a
                  href={PROVETIME_URL}
                  style={{ touchAction: "manipulation" }}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "rounded-full min-h-[44px] px-6",
                    "bg-gray-900 hover:bg-gray-800 text-white",
                    "dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100",
                    "font-montserrat text-xs font-bold tracking-widest uppercase",
                    "transition-all duration-200 active:scale-[0.98]",
                    "focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2",
                  )}
                >
                  Prøvetime
                </a>
                <a
                  href={KONTAKT_URL}
                  style={{ touchAction: "manipulation" }}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-full min-h-[44px] px-6",
                    "border-2 border-gray-900 text-gray-900",
                    "dark:border-white dark:text-white",
                    "font-montserrat text-xs font-bold tracking-widest uppercase",
                    "hover:bg-gray-50 dark:hover:bg-white/10",
                    "transition-all duration-200 active:scale-[0.98]",
                    "focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2",
                  )}
                >
                  Kontakt oss
                </a>
              </motion.div>

              {/* ── Betingelser-merknad ── */}
              <motion.p
                {...fadeUp(0.34)}
                className="font-montserrat text-xs leading-relaxed
                           text-gray-400 dark:text-gray-500"
              >
                * Ved oppmøte til prøvetime aksepterer du våre{" "}
                <a
                  href={BETINGELSER_URL}
                  className="underline underline-offset-2
                             text-gray-500 dark:text-gray-400
                             hover:text-gray-900 dark:hover:text-white
                             transition-colors duration-150"
                >
                  betingelser for kursdeltagelse
                </a>
                .
              </motion.p>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SEKSJON 3 — ELEVFORESTILLING
      ══════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="forestilling-heading"
        className="relative overflow-hidden bg-brand-500 py-16 md:py-20"
      >
        <p
          aria-hidden="true"
          className="pointer-events-none select-none
                     absolute -bottom-4 -right-4
                     font-bebas text-[clamp(5rem,18vw,10rem)] uppercase
                     leading-none text-white/10 whitespace-nowrap"
        >
          12. DES
        </p>

        <div className="container mx-auto px-4 md:px-6">
          <div className="relative z-10 flex flex-col gap-5 max-w-2xl">
            <motion.p
              {...fadeUp(0.05)}
              className="font-montserrat text-[10px] font-bold uppercase
                         tracking-[3px] text-white/60"
            >
              Semesteravslutning
            </motion.p>

            <motion.h2
              {...fadeUp(0.12)}
              id="forestilling-heading"
              className="font-bebas text-[clamp(2.4rem,7vw,4rem)] uppercase
                         leading-tight tracking-wide text-white"
            >
              Elevforestilling i Rådhusteateret
            </motion.h2>

            <motion.p
              {...fadeUp(0.18)}
              className="font-montserrat text-sm leading-relaxed text-white/80 max-w-lg"
            >
              Her viser vi frem det vi har jobbet med gjennom semesteret, et
              høydepunkt for store og små!
            </motion.p>

            <motion.div {...fadeUp(0.24)}>
              <span
                className="inline-flex items-center gap-3
                           rounded bg-black/20 px-5 py-3
                           font-montserrat text-sm font-bold text-white"
              >
                <Calendar size={16} aria-hidden="true" />
                Lørdag 12. desember kl.&nbsp;16
              </span>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}