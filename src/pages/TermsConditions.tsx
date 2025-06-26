import { motion } from "framer-motion";
import { 
  AlertTriangleIcon, 
  CalendarOffIcon, 
  UsersIcon, 
  ShieldIcon,
  CameraIcon,
  InfoIcon,
  ScaleIcon,
  ZapIcon
} from "lucide-react";
import ScrollToTop from "@/helpers/ScrollToTop";

interface TermsConditionsProps {
  showTitle?: boolean;
  className?: string;
}

export default function TermsConditions({ 
  showTitle = true, 
  className = "" 
}: TermsConditionsProps) {
  const termsData = [
    {
      icon: AlertTriangleIcon,
      title: "Avmelding",
      content: "Etter første kurs-uke er påmeldingen bindende og man må betale den totale kursavgiften + adm.gebyr. Ved langvarig sykdom (mer enn 3 uker) refunderes semesteravgiften, avregnet fra sykemeldingsdato, mot fremleggelse av sykemelding fra lege. Ved utestående kursavgift må vi i værste fall utelukke eleven fra dansetrening hos oss.",
      delay: 0.1
    },
    {
      icon: CalendarOffIcon,
      title: "Avlysning av timer",
      content: "Det kan forekomme avlysning av timer på grunn av sykdom eller andre årsaker. Dette kompenseres ikke med redusert semesteravgift. Om mulig vil disse timene bli tatt igjen ved en senere anledning. Det informeres om avlysninger og ekstratimer via e-post og/eller sms til elevens \"foresatte\".",
      delay: 0.2
    },
    {
      icon: UsersIcon,
      title: "Nedlegging av timer",
      content: "Urban Studios forbeholder seg retten til å \"legge\" ned timer der det er 8 eller færre betalende påmeldte elever, i løpet av de 4 første ukene av kurset. Resterende semesteravgift for det aktuelle kurset vil da bli refundert til de aktuelle elevene som har betalt.",
      delay: 0.3
    },
    {
      icon: ShieldIcon,
      title: "Ansvar",
      content: "Eleven deltar på eget ansvar. Skolen har ikke forsikringsansvar for skader i forbindelse med trening i våre lokaler eller under våre forestillinger. Verdisaker oppbevares på eget ansvar. Dere kan ta de med inn i dansesalen. Alle verdisaker oppbevares på eget ansvar.",
      delay: 0.4
    },
    {
      icon: CameraIcon,
      title: "Bilder/Video",
      content: "Vi forbeholder oss retten til å bruke bilder og videopptak fra undervisning og forestillinger arrangert av Urban Studios. Disse kan for eksempel brukes til egen reklame, annonser og på vår hjemmeside.",
      delay: 0.5
    },
    {
      icon: InfoIcon,
      title: "Annet",
      content: "Vi tar forbehold om feil og eventuelle endringer. Tyggegummi, snop, brus og mat er ikke tillatt i dansesalene. Urban Studios følger skolerutens ferier og har stengt ved ferie og røde dager. Billettkostnader ved vårforestilling kommer utenom semesteravgift.",
      delay: 0.6
    },
    {
      icon: ScaleIcon,
      title: "Norsk lov",
      content: "Kjøpsavtalen er underlagt norsk lov.",
      delay: 0.7
    },
    {
      icon: ZapIcon,
      title: "Force majeure",
      content: "Hvis det oppstår ekstraordinære hendelser utenfor vår kontroll (som brann, streik, lock-down, flom, krig, opprør, naturkatastrofer osv.), som hindrer oss i å gjennomføre vår danseundervisning, er dette utenfor vår kontroll og Urban Studios er fritatt for alt ansvar. Dette kompenseres ikke med redusert semesteravgift.",
      delay: 0.8
    },
    {
      icon: ScaleIcon,
      title: "Tvister",
      content: "Tvister mellom kunden og skolen skal søkes løst i minnelighet. Dersom dette ikke fører frem, kan hver av partene bringe tvisten inn for de ordinære domstoler.",
      delay: 0.9
    }
  ];

  return (
    <section className={`py-16 bg-white dark:bg-surface-dark relative overflow-hidden ${className}`}>
      <ScrollToTop />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/5 dark:bg-magenta-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/5 dark:bg-brand-400/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-base font-medium text-brand-600 dark:text-brand-400 
                          uppercase tracking-wider mb-3">
              Betingelser
            </h1>
            <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
              Viktige betingelser for kursdeltagelse
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
              Les gjennom våre betingelser før du melder deg på kurs. Dette sikrer en god opplevelse for alle deltakere.
            </p>
          </motion.div>
        )}

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {termsData.map((term, index) => {
            const IconComponent = term.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: term.delay }}
                className="bg-gray-50 dark:bg-surface-dark-muted rounded-xl p-6 
                          border border-gray-200 dark:border-gray-700 
                          hover:shadow-md dark:hover:shadow-lg 
                          transition-all duration-300 group"
              >
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-100 dark:bg-brand-900/30 
                                rounded-lg flex items-center justify-center 
                                group-hover:bg-brand-200 dark:group-hover:bg-brand-800/50 
                                transition-colors duration-300">
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
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-brand-50/80 to-magenta-50/50 
                         dark:from-brand-900/20 dark:to-magenta-900/20 
                         rounded-xl p-6 border border-brand-200/50 dark:border-brand-700/30 
                         max-w-2xl mx-auto">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-montserrat leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Viktig:</strong> Ved påmelding aksepterer du automatisk disse betingelsene. 
              Har du spørsmål om noen av punktene, ikke nøl med å kontakte oss før du melder deg på.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}