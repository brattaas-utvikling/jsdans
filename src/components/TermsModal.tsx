// src/components/enrollment/TermsModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TermsModal({ open, onOpenChange }: TermsModalProps) {
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
        "Urban Studios bruker Spond for kommunikasjon mellom instruktører og elever/foresatte. Det er elever og foresattes plikt å melde inn riktig informasjon, deltakelse på klasser og annet, samt holde seg oppdatert på den informasjonen som sendes ut.",
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[94vw] sm:w-[95vw] max-w-6xl max-h-[95vh] overflow-y-auto 
                                bg-white dark:bg-surface-dark mx-auto p-3 sm:p-6 
                                overflow-x-hidden">
        <DialogHeader className="space-y-2 sm:space-y-4 pb-3 sm:pb-6 
                                border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-bebas-base sm:text-bebas-lg 2xl:text-bebas-xl 
                                 font-bebas text-gray-900 dark:text-white text-center leading-tight">
            Betingelser for kursdeltagelse
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base 2xl:text-lg text-center 
                                        font-montserrat text-gray-600 dark:text-gray-300 
                                        leading-relaxed">
            Les gjennom våre betingelser som gjelder for alle kurs hos Urban Studios
          </DialogDescription>
        </DialogHeader>

        <div className="py-3 sm:py-6 lg:py-8 relative overflow-hidden">
          {/* Decorative elements - using brand colors */}
          <div className="hidden lg:block absolute top-0 right-0 w-32 h-32 
                          bg-magenta-400/5 dark:bg-magenta-400/5 rounded-full blur-3xl" />
          <div className="hidden lg:block absolute bottom-0 left-0 w-24 h-24 
                          bg-brand-400/5 dark:bg-brand-400/5 rounded-full blur-3xl" />

          {/* Terms Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-6 relative z-10 
                          overflow-hidden">
            {termsData.map((term, index) => {
              const IconComponent = term.icon;

              return (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-surface-dark-muted rounded-lg sm:rounded-xl 
                            p-2 sm:p-4 lg:p-6 border border-gray-200 dark:border-gray-700 
                            hover:shadow-brand-lg dark:hover:shadow-brand-lg 
                            transition-all duration-300 group overflow-hidden"
                >
                  {/* Icon and Title */}
                  <div className="flex items-start gap-2 sm:gap-3 lg:gap-4 mb-1 sm:mb-3 lg:mb-4 
                                overflow-hidden">
                    <div
                      className="flex-shrink-0 w-4 h-4 sm:w-8 sm:h-8 lg:w-10 lg:h-10 
                                bg-brand-100 dark:bg-brand-900/30 
                                rounded sm:rounded-lg flex items-center justify-center 
                                group-hover:bg-brand-200 dark:group-hover:bg-brand-800/50 
                                transition-colors duration-300"
                    >
                      <IconComponent className="h-2.5 w-2.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 
                                               text-brand-600 dark:text-brand-400" />
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <h3 className="font-bebas text-sm sm:text-bebas-base 2xl:text-bebas-lg 
                                   font-semibold text-gray-900 dark:text-white 
                                   mb-1 sm:mb-2 lg:mb-3 leading-tight break-words 
                                   overflow-wrap-anywhere">
                        {term.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-xs sm:text-sm 2xl:text-base leading-snug sm:leading-relaxed 
                                text-gray-600 dark:text-gray-300 font-montserrat 
                                pl-6 sm:pl-11 lg:pl-14 break-words overflow-wrap-anywhere 
                                word-break-break-word">
                    {term.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-4 sm:mt-8 lg:mt-10 overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-50/80 to-magenta-50/50 
                        dark:from-brand-900/20 dark:to-magenta-900/20 
                        rounded-lg sm:rounded-xl p-2 sm:p-4 lg:p-6 
                        border border-brand-200/50 dark:border-brand-700/30 
                        relative overflow-hidden"
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-6 sm:w-16 lg:w-20 h-6 sm:h-16 lg:h-20 
                              bg-brand-400/10 rounded-full blur-xl" />
              
              <div className="relative z-10">
                <p className="text-xs sm:text-sm 2xl:text-base text-gray-600 dark:text-gray-400 
                             font-montserrat leading-relaxed text-center break-words 
                             overflow-wrap-anywhere">
                  <strong className="text-gray-900 dark:text-white">Viktig:</strong>{" "}
                  Ved påmelding aksepterer du automatisk disse betingelsene. Har du
                  spørsmål om noen av punktene, ikke nøl med å kontakte oss før du
                  melder deg på.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-3 sm:mt-6 lg:mt-8 pt-2 sm:pt-4 lg:pt-6 
                                border-t border-gray-200 dark:border-gray-700 overflow-hidden">
          <Button
            className="w-full font-medium font-montserrat text-sm sm:text-base lg:text-lg 
                      py-2 sm:py-3 lg:py-4 bg-brand-500 hover:bg-brand-600 text-white 
                      dark:bg-brand-600 dark:hover:bg-brand-700 
                      transition-colors duration-200 rounded-sm md:rounded-full min-w-0"
            onClick={() => onOpenChange(false)}
          >
            <span className="break-words overflow-wrap-anywhere">
              Jeg forstår og aksepterer betingelsene
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}