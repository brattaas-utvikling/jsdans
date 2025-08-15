import {
  AlertTriangleIcon,
  CalendarOffIcon,
  UsersIcon,
  ShieldIcon,
  CameraIcon,
  InfoIcon,
  ScaleIcon,
  ZapIcon,
  MessageCircleIcon,
} from "lucide-react";
import ScrollToTop from "@/helpers/ScrollToTop";

interface TermsConditionsProps {
  showTitle?: boolean;
  className?: string;
}

export default function TermsConditions({
  showTitle = true,
  className = "",
}: TermsConditionsProps) {
  const termsData = [
    {
      icon: AlertTriangleIcon,
      title: "Bindende påmelding",
      content:
        "Etter andre kursuke er påmeldingen bindende og man må betale den totale kursavgiften. Kjøpsavtalen er underlagt norsk lov. Ved langvarig sykdom (mer enn 4 uker) kan det søkes om å få en del av semesteravgiften refundert. Man må da fremlegge legeerklæring for sykdom, og søknaden sendes per mail til ingrid@urbanstudios.no.",
    },
    {
      icon: MessageCircleIcon,
      title: "Kommunikasjon",
      content:
        "Urban Studios bruker Spond for kommunikasjon mellom instruktører og elever/foresatte. Det er elever og foresattes plikt å melde inn riktig informasjon, deltakelse på klasser og annet, samt holde seg oppdatert på den informasjonen som sendes ut. ",
    },
    {
      icon: CalendarOffIcon,
      title: "Avlysning av timer",
      content:
        "Det kan forekomme avlysning av timer på grunn av sykdom eller andre årsaker, dette informeres om i Spond. Dette kompenseres ikke med redusert semesteravgift, men om mulig vil disse timene bli tatt igjen ved en senere anledning.",
    },
    {
      icon: UsersIcon,
      title: "Nedlegging av kurs",
      content:
        "Urban Studios forbeholder seg retten til å legge ned timer der det er 5 eller færre betalende påmeldte elever, i løpet av de 4 første ukene av kursperioden. Elevene som er påmeldte til kurs som legges ned vil hvis mulig overføres til annet tilsvarende kurs. Ved nedleggelse av hele kurs vil resterende semesteravgift for det aktuelle kurset bli refundert.",
    },
    {
      icon: ShieldIcon,
      title: "Ansvar",
      content:
        "Aktiviteter som eleven deltar på i undervisning og forestillinger, skjer på eget ansvar. Verdisaker oppbevares på eget ansvar. Urban Studios har ikke forsikringsansvar for skader på person eller eiendom.",
    },
    {
      icon: CameraIcon,
      title: "Bilder/Video",
      content:
        "Vi forbeholder oss retten til å bruke bilder og video fra undervisning og forestillinger i våre kanaler og i annonser, reklame mm., med mindre annet er spesifikt opplyst om ved påmelding.",
    },
    {
      icon: InfoIcon,
      title: "Annet",
      content:
        "Vi tar forbehold om feil og eventuelle endringer. Tyggis, godteri, brus og mat er ikke tillatt i dansesalene. Urban Studios følger skoleruten og holder stengt i ferier, men holder åpent for undervisning på andre røde dager med mindre annet er spesifisert. Billettkostnader ved vårforestilling kommer utenom semesteravgift.",
    },
    {
      icon: ZapIcon,
      title: "Force majeure",
      content:
        "Hvis det oppstår ekstraordinære hendelser utenfor vår kontroll (som brann, streik, lock-down, flom, krig, opprør, naturkatastrofer osv.), som hindrer oss i å gjennomføre planlagt undervisning, er Urban Studios fritatt for alt ansvar. Undervisning kompenseres da ikke med redusert semesteravgift.",
    },
    {
      icon: ScaleIcon,
      title: "Tvister",
      content:
        "Tvister mellom kunden og skolen skal søkes løst i minnelighet. Dersom dette ikke fører frem, kan hver av partene bringe tvisten inn for de ordinære domstoler.",
    },
  ];

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
          <div
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1
              className="text-base font-medium text-brand-600 dark:text-brand-400 
                          uppercase tracking-wider mb-3"
            >
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
        <div
          className="mt-12 text-center"
        >
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