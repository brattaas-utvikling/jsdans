import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, CreditCard, Download, ChevronDown, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollToTop from "@/helpers/ScrollToTop";

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

const KLASSER = [
  {
    navn: "Koreografi mix",
    accent: "brand",
    beskrivelse:
      "I disse klassene står instruktøren fritt til å velge stilart, og det vil bli mulighet for å ønske seg stilarter i begynnelsen av kurset. Det blir garantert stiler dere kjenner fra før, og klassen kommer til å likne Hiphop Girly Ungdom. Her er det meningen at vi skal ha det gøy med kule koreografier!",
  },
  {
    navn: "Musikaldans",
    accent: "magenta",
    beskrivelse:
      "Disse klassene bygger på våre Show/Musikal klasser og er for deg som elsker musikaler og showdans! Musikaldans kombinerer elementer fra jazz, moderne, musikal og kommersielle danseformer for å skape spektakulære show-numre. Vi jobber med koreografier som forteller historier og fokuserer på teatralitet, timing og å skape magiske øyeblikk på scenen. Musikaldans 4.-7. trinn tilsvarer Show/Musikal 1, Musikaldans Ungdom tilsvarer Show/Musikal 2+3.",
  },
  {
    navn: "Lyrisk Jazz",
    accent: "brand",
    beskrivelse:
      "Lyrisk jazz er en uttrykksfull dansestil som kombinerer teknikken fra jazzdans med følelsene og flyten fra moderne og lyrisk dans. I lyrisk jazz arbeider man med dynamikk, balanse, koordinasjon og kroppskontroll, samtidig som danserne får utforske kreativitet og personlig uttrykk. Klassen vil inneholde teknikkøvelser som hopp, piruetter og myke, flytende bevegelser i tillegg til koreografi. Lyrisk jazz 4.-7. trinn tilsvarer Moderne 1+2 mens Lyrisk jazz Ungdom tilsvarer Moderne 3.",
  },
  {
    navn: "Kpop",
    accent: "magenta",
    beskrivelse:
      "Kpop som dansestil kommer fra den sørkoreanske popindustrien, og er kjent for energiske, presise og synkroniserte bevegelser. Dansen kombinerer flere dansestiler og koreografien baseres ofte på ikoniske \"point moves\" som gjør den gjenkjennelig og morsom å lære! Timene er satt opp for 4. trinn+, men passer for alle ungdommer som vil ha det gøy med denne nykommeren.",
  },
  {
    navn: "Ballett koreografi",
    accent: "brand",
    beskrivelse:
      "I denne koreografiklassen skal vi jobbe med utdrag fra kjente ballettkoreografier som Nøtteknekkeren og Tornerose. Dette kalles variasjoner, og er ofte mellom 30 sekunder og 2 minutter lange. Vi varmer godt opp og jobber med teknikk og kvalitet i bevegelsene underveis, men mest av alt skal vi ha det gøy med koreografiene og oppleve det beste av klassisk ballett!",
  },
  {
    navn: "Sassy Jazz / Heels",
    accent: "magenta",
    beskrivelse:
      "Sassy Jazz/Heels kombinerer elementer fra jazz, kommersiell dans og feminin performance. Stilen handler om selvtillit, attitude og å ta plass. Det vil være oppvarming fokusert mot heels-teknikk før vi går over til koreografi. Ta med heels hvis du har — vi har noen karaktersko til utlåns, men det går også an å danse uten sko.",
  },
];

function KlasseKort({ klasse, index }: { klasse: (typeof KLASSER)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const isOrange = klasse.accent === "brand";
  const accentText = isOrange
    ? "text-brand-600 dark:text-brand-400"
    : "text-magenta-600 dark:text-magenta-400";

  const beskrivelse = (
    <p className="px-5 pb-5 text-sm text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed">
      {klasse.beskrivelse}
    </p>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="rounded-2xl bg-white dark:bg-surface-dark shadow-brand-lg border border-brand-100/50 dark:border-brand-700/30 overflow-hidden relative"
    >
      <div className={`h-1 w-full ${isOrange ? "bg-brand-gradient" : "bg-gradient-to-r from-magenta-400 to-brand-400"}`} />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/20 to-transparent dark:from-brand-900/10 dark:to-transparent pointer-events-none" />

      {/* Mobil: accordion */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="lg:hidden relative z-10 w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-inset"
        aria-expanded={open}
      >
        <h3 className={`font-bebas text-bebas-base uppercase leading-tight ${accentText}`}>
          {klasse.navn}
        </h3>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex-shrink-0 ml-3 ${isOrange ? "text-brand-400" : "text-magenta-400"}`}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>
      <div className="lg:hidden">
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {beskrivelse}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: alltid synlig */}
      <div className="hidden lg:block relative z-10">
        <div className="px-5 pt-4">
          <h3 className={`font-bebas text-bebas-base md:text-bebas-lg uppercase leading-tight ${accentText}`}>
            {klasse.navn}
          </h3>
        </div>
        {beskrivelse}
      </div>
    </motion.div>
  );
}

export default function SommerkursPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark w-full overflow-x-hidden">
      <ScrollToTop />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-50/80 to-surface-muted dark:from-brand-900/10 dark:to-surface-dark-muted pt-24 pb-16 relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-magenta-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl"
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base font-montserrat font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3"
            >
              Uke 20–24
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-bebas text-bebas-2xl md:text-bebas-3xl lg:text-bebas-4xl text-gray-900 dark:text-white leading-tight uppercase"
            >
              5-UKERS
              <span className="block text-transparent bg-clip-text bg-hero-gradient py-1">
                SOMMERKURS 2026
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 text-lg text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed max-w-2xl mx-auto"
            >
              I uke 20–24 kjører vi 5-ukers sommerkurs på Urban, og vi har noen
              nye innslag på timeplanen!
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── PÅMELDING + BETALING — editorial, ingen kort ─────── */}
      <section className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted dark:from-brand-900/10 dark:to-surface-dark-muted relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">

            {/* To kolonner med vertikal divider på desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x md:divide-brand-200/50 dark:md:divide-brand-700/30">

              {/* ─ Påmelding ─ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="pb-10 md:pb-0 md:pr-10"
              >
                {/* Ikonhode */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="inline-flex items-center justify-center rounded-xl bg-brand-500 p-2.5">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="font-bebas text-bebas-lg md:text-bebas-xl text-gray-900 dark:text-white uppercase tracking-wide">
                    Påmelding
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed text-base mb-5">
                  Send mail til{" "}
                  <a
                    href="mailto:registrer@urbanstudios.no?subject=Påmelding sommerkurs 2026&body=Navn:%0AFødselsdato:%0AKlasser:%0A%0AEvt. familiemedlemmer som meldes på:%0A%0ANye dansere må også registreres med kontaktinformasjon til foresatte!%0A%0AForesattes navn:%0AAdresse:%0ATelefonnummer:"
                    className="font-semibold text-brand-600 dark:text-brand-400 underline underline-offset-2 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                  >
                    registrer@urbanstudios.no
                  </a>{" "}
                  med følgende informasjon:
                </p>

                {/* Bullet-liste */}
                <ul className="space-y-2.5 mb-6">
                  {[
                    "Navn",
                    "Fødselsdato",
                    "Hvilke klasser",
                    "Evt. familiemedlemmer som meldes på",
                  ].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                      className="flex items-start gap-3 font-montserrat text-gray-700 dark:text-gray-300 text-sm"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>

                {/* Venstre-border aksent istedenfor kort */}
                <div className="border-l-2 border-brand-400 dark:border-brand-600 pl-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed">
                    <span className="font-semibold text-gray-900 dark:text-white">Nye dansere</span>{" "}
                    må også registreres med foresattes navn, adresse og telefonnummer.
                  </p>
                </div>
              </motion.div>

              {/* Horisontal divider på mobil */}
              <div className="md:hidden h-px bg-gradient-to-r from-transparent via-brand-200/60 dark:via-brand-700/30 to-transparent my-10" />

              {/* ─ Betaling ─ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="md:pl-10"
              >
                {/* Ikonhode */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="inline-flex items-center justify-center rounded-xl bg-magenta-500 p-2.5">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="font-bebas text-bebas-lg md:text-bebas-xl text-gray-900 dark:text-white uppercase tracking-wide">
                    Betaling
                  </h2>
                </div>

                {/* Faktura-info med Calendar-ikon */}
                <div className="flex items-start gap-3 mb-5">
                  <Calendar className="h-4 w-4 text-brand-500 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                  <p className="font-montserrat font-semibold text-gray-900 dark:text-white text-base">
                    Faktura sendes ut i uke 20–21
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-300 font-montserrat leading-relaxed text-base mb-6">
                  Betingelsene er de samme som før — disse finner du også på
                  nettsiden. Ta kontakt ved spørsmål!
                </p>

                {/* Venstre-border aksent for prislenken */}
                <div className="border-l-2 border-magenta-400 dark:border-magenta-600 pl-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-montserrat mb-1.5">
                    Sommerkursprisene finner du på prissiden:
                  </p>
                  <Link
                    to="/priser"
                    className="inline-flex items-center gap-1.5 font-montserrat text-sm font-semibold text-magenta-600 dark:text-magenta-400 hover:text-magenta-700 dark:hover:text-magenta-300 transition-colors duration-200"
                  >
                    Se alle priser her
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMEPLAN ─────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-surface-dark relative overflow-hidden">
        <div className="absolute top-4 right-4 w-32 h-32 bg-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-4 left-4 w-32 h-32 bg-magenta-400/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-bebas text-bebas-xl md:text-bebas-2xl lg:text-bebas-3xl text-gray-900 dark:text-white leading-tight text-center mb-8 uppercase"
            >
              TIMEPLAN
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-2xl bg-white dark:bg-surface-dark shadow-brand-lg border border-brand-100/50 dark:border-brand-700/30 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 to-transparent dark:from-brand-900/10 dark:to-transparent pointer-events-none" />
              <div className="relative aspect-[16/9] sm:aspect-[2/1]">
                <img
                  src="https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/timeplan-sommerkurs-2026/view?project=6853fb68001e82047908&mode=admin"
                  alt="Timeplan for 5-ukers sommerkurs ved Urban Studios 2026"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  width={1200}
                  height={600}
                />
              </div>
              <div className="relative z-10 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-montserrat">
                  Last ned timeplanen for å skrive ut eller dele
                </p>
                <button
                  onClick={() =>
                    downloadPdf(
                      "https://fra.cloud.appwrite.io/v1/storage/buckets/68c1ddbf000312c6515e/files/timeplan-sommerkurs-2026/view?project=6853fb68001e82047908&mode=admin",
                      "sommerkurs-timeplan-2026.pdf"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold min-h-[44px] border border-brand-200 dark:border-brand-700/50 text-gray-900 dark:text-white cursor-pointer hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-200 active:scale-[0.98] focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-2"
                >
                  TIMEPLAN
                  <Download className="h-3.5 w-3.5 text-brand-500" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NYE KLASSER ──────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted dark:from-brand-900/10 dark:to-surface-dark-muted relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.07, 0.13, 0.07] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.07, 0.13, 0.07] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-magenta-400/10 rounded-full blur-3xl pointer-events-none"
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="font-bebas text-bebas-xl md:text-bebas-2xl lg:text-bebas-3xl text-gray-900 dark:text-white leading-tight uppercase">
                NYE KLASSER PÅ
                <span className="block text-transparent bg-clip-text bg-hero-gradient">
                  TIMEPLANEN
                </span>
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 font-montserrat text-base max-w-xl mx-auto leading-relaxed">
                Trykk på en klasse for å lese mer om hva som venter deg i sommer.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {KLASSER.map((klasse, i) => (
                <KlasseKort key={klasse.navn} klasse={klasse} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}