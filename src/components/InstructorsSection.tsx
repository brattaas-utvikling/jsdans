import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

// Instructor data
const instructors = [
  {
    id: 1,
    name: "Fredrik Petrov",
    age: 32,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/698c79bc0022e632da65/view?project=6853fb68001e82047908&mode=admin",
    education: "Bachelor i samtidsdans ved Kunsthøgskolen i Oslo (KHiO)",
    description: "Fredrik Petrov er 32 år og har vokst opp i Kongsvinger. Han danset på Jump frem til han begynte på danselinjen ved Fagerborg vgs i Oslo (skolen er i dag lagt ned og linjen videreføres på Edvard Munch vgs). Han gikk videre med en bachelorgrad i samtidsdans ved KIhO (2016) og har siden jobbet bredt og tverrfaglig i det norske scenekunstfeltet, både som danser, skuespiller og skapende kunstner. Som koreograf og utøver står han bak kritikerroste forestillinger, kjent for et uttrykk som kombinerer fysisk presisjon, rå energi og tydelig form.",
    description2: "I undervisningen har Fredrik et sterkt teknisk fokus, samtidig som han legger stor vekt på fellesskap, trygghet og tilhørighet i rommet. Klassene er dynamiske, levende og utforskende – med rom for både hard jobbing, nysgjerrighet og personlig uttrykk. Fredrik skal undervise i Hiphop 3 Girly og Moderne 3, samt lede Kompaniet denne våren.",
    bgColor: "from-brand-50 to-coral-50",
    bgColorDark: "dark:from-brand-900/20 dark:to-coral-900/20"
  },
  {
    id: 2,
    name: "Iselin Nybak",
    age: 24,
    location: "",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/698c79da0000f5d428d9/view?project=6853fb68001e82047908&mode=admin",
    education: "Bachelor i jazzdans ved Kunsthøgskolen i Oslo (KHiO)",
    description: "Iselin Nybak er 24 år og utdannet jazzdanser med bachelorgrad fra KHiO (Kunsthøgskolen i Oslo), fullført sommeren 2024. Hun har jobbet som pedagog både under og etter studiene, og har erfaring med undervisning av elever i ulike aldre og nivåer. Etter endt utdanning har Iselin arbeidet som utøvende danser og koreograf i egne prosjekter gjennom kompaniet Chry Production, som har vist verk på blant annet Oslo Jazzdans Festival og Move Dansefestival. Hun har også erfaring fra musikkvideoer, sceniske produksjoner og kommersielle show, og har blant annet jobbet med Show de Vida.",
    description2: "I undervisningen er Iselin opptatt av formidling og musikalitet, og legger vekt på et trygt og inspirerende læringsmiljø med fokus på grundig og sunt teknisk arbeid, samtidig som personlig uttrykk får plass. Iselin underviser i Jazz 2+3, Ballett 1, Show/Musikal 3 og skal lede Aspirantkompaniet våren 2026.",
    bgColor: "from-magenta-50 to-brand-50",
    bgColorDark: "dark:from-magenta-900/20 dark:to-brand-900/20"
  },
  {
    id: 3,
    name: "Wiktor Matulewicz",
    age: 23,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/698c79cf000f193b6ecb/view?project=6853fb68001e82047908&mode=admin",
    education: "Bachelor i samtidsdans ved Kunsthøgskolen i Oslo (KHiO)",
    description: "Wiktor Matulewicz er en 23 år gammel frilans dansekunstner med base i Innlandet/Oslo. Han vokste opp i Kongsvinger og danset på både Jump og Victory Dance før han begynte på den landsdekkende ballettlinjen ved Edvard Munch VGS og gikk videre med en bachelorgrad i samtidsdans ved KHiO (2024). Han var også et halvt år i Belgia for utveksling ved P.A.R.T.S. og har gått PS:dansekollektiv sitt program 24/25. ",
    description2: "I sin undervisning verdsetter han mestring og lekenhet. Han er opptatt av å skape et godt læringsmiljø hvor elevene utfordres og støttes, både av hverandre og ham som instruktør. I tillegg til å være frilanser og instruktør ved Urban, underviser han ved Lillehammer Dansesenter og Victory Dance. Her på Urban skal Wictor undervise i Moderne 2 dette semesteret!",
    bgColor: "from-coral-50 to-magenta-50",
    bgColorDark: "dark:from-coral-900/20 dark:to-magenta-900/20"
  },
  {
    id: 4,
    name: "Olga Etkalo",
    age: 37,
    location: "Ukraina → Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926c2c000225fd1871/view?project=6853fb68001e82047908&mode=admin",
    education: "Utdannet danser, koreograf og pedagog ved Kharkiv State Academy of Culture",
    description: "Olga Etkalo er 37 år og utdannet danser, koreograf og pedagog ved Kharkiv State Academy of Culture i Ukraina. Hun har nå etablert seg i Kongsvinger med sine to barn. Hun har stor kapasitet og har mange visjoner for kreativ dans.",
    description2: "Olga underviser i Ballett 2 og Forkurs for tåspiss, samt Ballett for 2.-5. trinn.",
    bgColor: "from-brand-50 to-coral-50",
    bgColorDark: "dark:from-brand-900/20 dark:to-coral-900/20"
  },
  {
    id: 5,
    name: "Emma Vangen",
    age: 17,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926c45003ba94e5466/view?project=6853fb68001e82047908&mode=admin",
    education: "Studiespesialierende ved Øvrebyen vgs",
    description: "Emma Vangen er 17 år og går i VG3 ved Øvrebyen vgs. Emma har danset siden hun var 3 år gammel, og i løpet av 14 år har hun danset flere ulike sjangere, alt fra ballett til hiphop til heels. Hun har jobbet som assistent på ulike klasser, og etter at hun sluttet å danse selv har hun undervist Hiphop på Victory Dance.",
    description2: "Emma underviser i Hiphop Commercial nivå 2 og Hiphop Girly Ungdom dette semesteret, i tillegg har hun Styrke/tøy på mandagskvelden som er verdt å få med seg om man vil bli en sterk og smidig danser!",
    bgColor: "from-coral-50 to-magenta-50",
    bgColorDark: "dark:from-coral-900/20 dark:to-magenta-900/20"
  },
  {
    id: 6,
    name: "Alma Sidenia Kamøy Furuseth",
    age: 18,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926c6e00320f6a91ce/view?project=6853fb68001e82047908&mode=admin",
    education: "Studiespesialierende ved Øvrebyen vgs",
    description: "Alma Sidenia Kamøy Furuseth er 18 år gammel og går i VG3 ved Øvrebyen vgs. Med to foreldre som begge er utdannede dansere, har dansing vært en stor del av livet siden Alma var liten. Hun har danset mange sjangre, med fokus på basefagene ballett, jazz, moderne og hiphop. Siden høsten 2024 har hun også undervist i Hiphop og Showdans på Victory Dance.",
    description2: "Alma underviser denne våren i Show/Musikal 1 og Voksenjazz, sistnevnte er en åpen klasse i jazz for deg som har fylt 16 år og vil danse for gøy- ingen krav til tidligere danseerfaring!",
    bgColor: "from-magenta-50 to-brand-50",
    bgColorDark: "dark:from-magenta-900/20 dark:to-brand-900/20"
  },
  {
    id: 7,
    name: "Nora Tosounidi",
    age: 17,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926ca400372e00c0a6/view?project=6853fb68001e82047908&mode=admin",
    education: "Studiespesialierende ved Øvrebyen vgs",
    description: "Nora Tosounidi er 17 år gammel og går i VG2 ved Øvrebyen vgs. Hun har danset siden hun var rundt 3 år, blant annet ballett, jazz, contemporary og commercial, og hun har vært en del av kompaniene på Jump. Hun jobbet som assistent og trener på Victory Dance før hun begynte hos oss høsten 2025.",
    description2: "Nora liker å undervise og har dette semesteret Show/Musikal 2 og Hiphop 1 commercial.",
    bgColor: "from-brand-50 to-coral-50",
    bgColorDark: "dark:from-brand-900/20 dark:to-coral-900/20"
  },
  {
    id: 8,
    name: "Nina Helen Berger",
    age: 15,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/698c79a400040fcf4e80/view?project=6853fb68001e82047908&mode=admin",
    education: "10. klasse Kongsvinger ungdomsskole",
    description: "Nina Helen Berger er 15 år og går i 10. klasse på Kusk. Hun har danset i mange år og er en del av Urban Kompani. Nina var assistent i fjor og har tatt utfordringen som instruktør dette semesteret! Hun gleder seg til å lære bort det hun kan til årets Hiphop 2.-5. trinnselevene. ",
    description2: "",
    badge: "Skuespiller",
    bgColor: "from-magenta-50 to-brand-50",
    bgColorDark: "dark:from-magenta-900/20 dark:to-brand-900/20"
  },
  {
    id: 9,
    name: "Frida Elise Hvarstad-Nabben",
    age: 16,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/698c79b1003c3cac798f/view?project=6853fb68001e82047908&mode=admin",
    education: "Helse- og oppvekstfag på Sentrum vgs",
    description: "Frida Elise Hvarstad-Nabben er 16 år gammel og går Helse- og oppvekstfag på Sentrum vgs. Frida begynte å danse på Jump fra 4-årsalderen og mestrer flere stiler som moderne, jazz, ballet, hiphop, contemporary og en liten del disco og freestyle som hun har lært på Victory Dance hvor hun har danset de siste 3 årene før hun begynte i Urban Kompani.",
    description2: "Som instruktør er Frida opptatt av at små og store skal føle at det er trygt å komme inn i dansesalen og at alle skal føle på mestring. Frida skal ha Jazz/moderne for 2.-5. trinn og Barnedans for 3-4 år dette semesteret, i tillegg til å bidra som assistent på ballett for de yngste. ",
    bgColor: "from-coral-50 to-magenta-50",
    bgColorDark: "dark:from-coral-900/20 dark:to-magenta-900/20"
  },
  {
    id: 10,
    name: "Anna Matilde Hvarstad-Nabben & Otilie Nordseth",
    age: "18 & 17",
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926ce3002a4acdd3ff/view?project=6853fb68001e82047908&mode=admin",
    education: "Studiespesialierende ved Øvrebyen vgs",
    description: "Møt Anna Matilde Hvarstad-Nabben (18) og Otilie Nordseth (17). De går studiespesialisering på Øvrebyen vgs, og starter i VG3 nå til høsten. De har begge danset på Jump siden de var små. Otilie sin favorittstilart er moderne, Anna Matilde liker også jazz og hiphop.",
    description2: "De to gleder seg til å undervise en klasse Barnedans på Urban til høsten! Klassen blir variert og en fin aktivitet for de minste.",
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