import { motion } from "framer-motion";
import { Star, GraduationCap } from "lucide-react";

// Instructor data
const instructors = [
  {
    id: 1,
    name: "Katherina Jitlatda Horup Solvang",
    age: 22,
    location: "Nøtterøy",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926bfc003755637d62/view?project=6853fb68001e82047908&mode=admin",
    education: "Bachelor i jazzdans ved Kunsthøgskolen i Oslo (KHiO)",
    description: "Katherina er 22 år og gikk på landsdekkende danselinje ved Edvard Munch vgs før hun i fjor fullførte en bachelor i jazzdans ved Kunsthøgskolen i Oslo (KHiO). Det siste året har hun undervist ved siden av å ha deltatt på flere ulike prosjekter med Montpellier Dance Festival, Centralteateret og artist Kristine Blir Rapper. Hun har vist seg å være en dyktig utøver og inspirerende instruktør som vi er takknemlige for å få lov til å jobbe med når vi åpner danseskolen vår.",
    description2: "Katherina skal undervise Jazz nivå 2 og 3, Moderne nivå 2 og 3, Hiphop commercial nivå 3, Show/musikal nivå 2, en Styrke/tøy klasse, og hun skal lede Kompaniet på Urban denne høsten!",
    bgColor: "from-brand-50 to-coral-50",
    bgColorDark: "dark:from-brand-900/20 dark:to-coral-900/20"
  },
  {
    id: 2,
    name: "Mathilde Nyeng",
    age: null,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926c15002d83b868a1/view?project=6853fb68001e82047908&mode=admin",
    education: "3 år ved ballettlinja på Edvard Munch vgs",
    description: "Mathilde fra Kongsvinger startet sin dansekarriere med barneballett på Jump da hun var 2,5 år, og har siden den gang danset de fleste sjangre. Hun var en del av juniorkompaniet, aspirantkompaniet og kompaniet på Jump, og som 15-åring begynte hun å ta timer i hiphop, jazz og ballett på West End Studios i Oslo. Hun har nettopp avsluttet 3 år ved den landsdekkende ballettlinja på Edvard Munch vgs i Oslo. I tillegg til å være danser, er Mathilde skuespiller og har medvirket i en rekke tv-produksjoner, serier og reklamer, samt vært danser i store produksjoner hos Oslo Nye og Folketeateret de siste årene.",
    description2: "Mathilde gleder seg til å kombinere studier på handelshøyskolen BI i Oslo med å undervise på Urban denne høsten. Hun skal ha en contemporary koreografiklasse med tilhørende tøying, samt lede aspirantkompaniet vårt!",
    bgColor: "from-magenta-50 to-brand-50",
    bgColorDark: "dark:from-magenta-900/20 dark:to-brand-900/20"
  },
  {
    id: 3,
    name: "Olga Etkalo",
    age: 37,
    location: "Ukraina → Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926c2c000225fd1871/view?project=6853fb68001e82047908&mode=admin",
    education: "Utdannet danser, koreograf og pedagog ved Kharkiv State Academy of Culture",
    description: "Olga Etkalo er 37 år og utdannet danser, koreograf og pedagog ved Kharkiv State Academy of Culture i Ukraina. Hun har nå etablert seg i Kongsvinger med sine to barn. Hun har stor kapasitet og har mange visjoner for kreativ dans.",
    description2: "Denne høsten har hun sagt ja til å undervise i Ballett 1 og 2 med mulighet for tåspiss, samt barneballett 4-6 år som er et introduksjonskurs for barn som tidlig viser interesse for ballett. Olga har en uvurdelig kompetanse og vi gleder oss til å lære av henne!",
    bgColor: "from-coral-50 to-magenta-50",
    bgColorDark: "dark:from-coral-900/20 dark:to-magenta-900/20"
  },
  {
    id: 4,
    name: "Emma Vangen",
    age: 17,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926c45003ba94e5466/view?project=6853fb68001e82047908&mode=admin",
    education: "Øvrebyen Videregående skole",
    description: "Emma Vangen er 17 år og begynner i VG3 ved Øvrebyen Videregående skole til høsten. Emma har danset siden hun var 3 år gammel, og i løpet av 14 år har hun danset flere ulike sjangere, alt fra ballett til hiphop til heels. Hun har jobbet som assistent på ulike klasser, og etter at hun sluttet å danse selv har hun undervist Hiphop på Victory Dance.",
    description2: "Emma er helt rå i Hiphop og vi er så glade for at hun vil være med og bygge opp et hiphop-miljø i Kongsvinger. Denne høsten skal hun undervise Hiphop Commercial nivå 1 og 2 og en åpen Hiphop klasse - har du fylt 16 år og har lite eller ingen danseerfaring fra før? Bli med på Hiphop åpen klasse denne høsten 🤸🏼",
    bgColor: "from-brand-50 to-coral-50",
    bgColorDark: "dark:from-brand-900/20 dark:to-coral-900/20"
  },
  {
    id: 5,
    name: "Alma Sidenia Kamøy Furuseth",
    age: 18,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926c6e00320f6a91ce/view?project=6853fb68001e82047908&mode=admin",
    education: "Studiespesialisering ved Øvrebyen vgs",
    description: "Alma Sidenia Kamøy Furuseth er 18 år gammel og skal begynne på siste året på studiespesialisering ved Øvrebyen vgs. Med to foreldre som begge er utdannede dansere, har dansing vært en stor del av livet siden Alma var liten. Hun har danset mange sjangre, med fokus på basefagene ballett, jazz, moderne og hiphop. Siden høsten 2024 har hun også undervist i Hiphop og Showdans på Victory Dance.",
    description2: "Alma er en allsidig danser og en dyktig instruktør, og denne høsten skal hun undervise i Showjazz 2.-4. trinn og Jazz nivå 1 i tillegg til «voksenjazz», som er en åpen klasse i jazz for deg som har fylt 16 år og vil danse for gøy- ingen krav til tidligere danseerfaring!",
    bgColor: "from-magenta-50 to-brand-50",
    bgColorDark: "dark:from-magenta-900/20 dark:to-brand-900/20"
  },
  {
    id: 6,
    name: "Sofie Sandvold Dahl",
    age: 18,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926c8a003de4b9b44e/view?project=6853fb68001e82047908&mode=admin",
    education: "VG3 på Øvrebyen vgs",
    description: "Sofie Sandvold Dahl er 18 år og begynner i VG3 på Øvrebyen vgs. Sofie har danset siden hun var 2 år gammel, og har danset de fleste sjangre i tillegg til å bidra i undervisning av flere klasser. Hun var en del av kompaniene på Jump frem til hun begynte å danse på Jessheim danseskolei 2023. I dag er hun en del av to kompanier der og har vært med på deres danseforestilling Mamma Mia, UKM og flere danseoppdrag gjennom dem. De siste årene har jazz og show/musikal vært hennes favoritter!",
    description2: "Sofie har 16 år med variert danseerfaring og gleder seg til å dele denne med elever ved Urban Studios. Denne høsten skal hun undervise i Show/musikal nivå 1 og Ballett for 2.-4. trinn.",
    badge: "Show Ekspert",
    bgColor: "from-coral-50 to-magenta-50",
    bgColorDark: "dark:from-coral-900/20 dark:to-magenta-900/20"
  },
  {
    id: 7,
    name: "Nora Tosounidi",
    age: 17,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926ca400372e00c0a6/view?project=6853fb68001e82047908&mode=admin",
    education: "2. året på Øvrebyen vgs",
    description: "Nora Tosounidi er 17 år gammel og skal begynne 2. året på Øvrebyen vgs. Hun har danset siden hun var rundt 3 år, blant annet ballett, jazz, contemporary og commercial, og hun har vært en del av kompaniene på Jump. Hun begynte å bidra som assistent for Hiphop 2.-4. trinn på Victory Dance i 2023, og vårsemesteret 2025 har hun også fått prøve seg som trener.",
    description2: "Nora liker å undervise og gleder seg til å ha Moderne nivå 1, samt fortsette å bidra som assistent på Hiphop 2.-4. klasse på Urban denne høsten. Timeplanen blir lagt ut i løpet av kort tid, ikke nøl med å sende oss en melding om du har noen spørsmål!",
    bgColor: "from-brand-50 to-coral-50",
    bgColorDark: "dark:from-brand-900/20 dark:to-coral-900/20"
  },
  {
    id: 8,
    name: "Eskil Johansen",
    age: 20,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926cbe0038afb2a108/view?project=6853fb68001e82047908&mode=admin",
    education: "Medier og kommunikasjon, starter PT-studier hos AFPT",
    description: "Eskil Johansen er 20 år, gikk Medier og kommunikasjon på Sentrum vgs i Kongsvinger og skal starte på PT-studier hos AFPT til høsten. Eskil har danset i totalt 16 år, alt fra freestyle til hiphop og ballet, og han har tidligere undervist i hiphop på Jump. Han har også medvirket som skuespiller i flere lokale produksjoner, kanskje du har sett han i en av Eventyrfestningen  sin forestillinger?",
    description2: "Denne høsten skal han ha Hiphop for 2.-4. trinn på Urban, og han håper at både gutter og jenter vil prøve denne klassen. Det blir kule koreografier og en introduksjon til ulike hiphop-stiler!",
    badge: "Skuespiller",
    bgColor: "from-magenta-50 to-brand-50",
    bgColorDark: "dark:from-magenta-900/20 dark:to-brand-900/20"
  },
  {
    id: 9,
    name: "Frida Elise Hvarstad-Nabben",
    age: 16,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926cd40027a7ba75c9/view?project=6853fb68001e82047908&mode=admin",
    education: "Helse- og oppvekstfag på Sentrum",
    description: "Frida Elise Hvarstad-Nabben er 16 år gammel, hun gikk ut fra Kusk denne våren og skal starte på Helse- og oppvekstfag på sentrum til høsten. Frida begynte å danse på Jump fra 4-årsalderen og mestrer flere stiler som moderne, jazz, ballet, hiphop, contemporary og en liten del disco og freestyle som hun har lært på Victory dance hvor hun har danset de siste 3 årene.",
    description2: "Frida har erfaring som assistent, og er opptatt av at både små og store skal føle at det er trygt å komme inn i dansesalen og at alle skal føle på mestring. Frida skal ha en klasse Barnedans i tillegg til å bidra som assistent på Ballett hos oss denne høsten.",
    bgColor: "from-coral-50 to-magenta-50",
    bgColorDark: "dark:from-coral-900/20 dark:to-magenta-900/20"
  },
  {
    id: 10,
    name: "Anna Matilde Hvarstad-Nabben & Otilie Nordseth",
    age: "18 & 17",
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926ce3002a4acdd3ff/view?project=6853fb68001e82047908&mode=admin",
    education: "VG3 Studiespesialisering ved Øvrebyen vgs",
    description: "Møt Anna Matilde Hvarstad-Nabben (18) og Otilie Nordseth (17). De går studiespesialisering på Øvrebyen vgs, og starter i VG3 nå til høsten. De har begge danset på Jump siden de var små. Otilie sin favorittstilart er moderne, Anna Matilde liker også jazz og hiphop.",
    description2: "De to gleder seg til å undervise en klasse Barnedans på Urban til høsten! Klassen blir variert og en fin aktivitet for de minste",
    bgColor: "from-brand-50 to-coral-50",
    bgColorDark: "dark:from-brand-900/20 dark:to-coral-900/20"
  }
];

export default function InstructorsSection() {
  return (
    <div className="w-full overflow-hidden">
      {/* Section Header */}
      <section className="py-16 bg-white dark:bg-surface-dark relative overflow-hidden">
        {/* Decorative background elements - constrained within viewport */}
        <div className="absolute top-4 right-4 w-32 h-32 bg-brand-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-magenta-400/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full 
                          bg-brand-100 dark:bg-brand-900/30 
                          border border-brand-200 dark:border-brand-700 mb-6">
              <Star className="h-4 w-4 text-brand-600 dark:text-brand-400 mr-2 flex-shrink-0" />
              <span className="text-sm font-medium text-brand-700 dark:text-brand-300 whitespace-nowrap">
                Vårt Team
              </span>
            </div>
            
            <h2 className="font-bebas text-bebas-2xl md:text-bebas-3xl text-gray-900 dark:text-white leading-tight mb-4">
              Møt våre instruktører
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
              Vi har samlet et fantastisk team av dyktige og inspirerende instruktører 
              som brenner for dans og for å dele sin kunnskap med deg.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Instructors */}
      {instructors.map((instructor, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <section
            key={instructor.id}
            className={`py-16 bg-gradient-to-br ${instructor.bgColor} ${instructor.bgColorDark} relative overflow-hidden`}
          >
            {/* Decorative elements - constrained within viewport */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 dark:bg-black/10 rounded-full blur-2xl" />
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 dark:bg-black/10 rounded-full blur-2xl" />

            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                isEven ? '' : 'lg:grid-flow-col-dense'
              }`}>
                
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`relative w-full ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-brand-xl group max-w-md mx-auto w-full">
                    <div className="aspect-[3/4] w-full">
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`space-y-6 w-full min-w-0 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  {/* Header */}
                  <div className="min-w-0">
                    <h3 className="font-bebas text-bebas-xl md:text-bebas-2xl text-gray-900 dark:text-white leading-tight mb-2 break-words">
                      {instructor.name}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-400 font-montserrat mb-4">
                      {instructor.age && <span className="whitespace-nowrap">{instructor.age} år</span>}
                      {instructor.age && <span>•</span>}
                      <span className="break-words">{instructor.location}</span>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="flex items-start gap-3 min-w-0">
                    <GraduationCap className="h-5 w-5 text-brand-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 dark:text-gray-300 font-montserrat min-w-0 break-words">
                      {instructor.education}
                    </p>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-4 min-w-0">
                    <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-lg break-words">
                      {instructor.description}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed text-lg break-words">
                      {instructor.description2}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}