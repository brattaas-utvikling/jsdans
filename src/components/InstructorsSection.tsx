import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

// Instructor data
const instructors = [
  {
    id: 1,
    name: "Iselin Nybak",
    age: 25,
    location: "Lillestrøm",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/6a89508a00374c7f6c25/view?project=6853fb68001e82047908&impersonateuserid=&mode=admin",
    education: "Bachelor i jazzdans ved Kunsthøgskolen i Oslo (KHiO)",
    description: "Iselin Nybak (25) fra Lillestrøm er utdannet jazzdanser med bachelorgrad fra KHiO (Kunsthøgskolen i Oslo), som hun fullførte sommeren 2024. Hun har jobbet som pedagog både under og etter studiene, og har erfaring med undervisning av elever i ulike aldre og nivåer. Etter endt utdanning har Iselin arbeidet som utøvende danser og koreograf i egne prosjekter gjennom kompaniet Chry Production, som har vist verk på blant annet Oslo Jazzdans Festival og Move Dansefestival. Hun har også erfaring fra musikkvideoer, sceniske produksjoner og kommersielle show, og har blant annet jobbet med Show de Vida. ",
    description2: "I undervisningen er Iselin opptatt av formidling og musikalitet, og legger vekt på et trygt og inspirerende læringsmiljø med fokus på grundig og sunt teknisk arbeid, samtidig som personlig uttrykk får plass. Iselin leder Urban Kompani i tillegg til å undervise Ballett 3, Forkurs tåspiss, Jazz 3 og Show/Musikal 3 denne høsten.",
    bgColor: "from-magenta-50 to-brand-50",
    bgColorDark: "dark:from-magenta-900/20 dark:to-brand-900/20"
  },
  {
    id: 2,
    name: "Wiktor Matulewicz",
    age: 23,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/6a8952650011d6740839/view?project=6853fb68001e82047908&impersonateuserid=&mode=admin",
    education: "Bachelor i samtidsdans ved Kunsthøgskolen i Oslo (KHiO)",
    description: "Wiktor Matulewicz er en 23 år gammel frilans dansekunstner med base i Innlandet/Oslo. Han vokste opp i Kongsvinger og danset på både Jump og Victory Dance før han begynte på den landsdekkende ballettlinjen ved Edvard Munch VGS og gikk videre med en bachelorgrad i samtidsdans ved KHiO (2024). Han var også et halvt år i Belgia for utveksling ved P.A.R.T.S. og har gått PS:dansekollektiv sitt program 24/25. I tillegg til å være frilanser og instruktør ved Urban, underviser han ved Lillehammer Dansesenter og Victory Dance.",
    description2: "I sin undervisning verdsetter han mestring og lekenhet. Han er opptatt av å skape et godt læringsmiljø hvor elevene utfordres og støttes, både av hverandre og ham som instruktør. På Urban skal Wiktor undervise i Moderne 3 og Voksenjazz - en åpen klasse i jazz for deg som har fylt 16 år og vil danse for gøy uten krav til tidligere danseerfaring!",
    bgColor: "from-coral-50 to-magenta-50",
    bgColorDark: "dark:from-coral-900/20 dark:to-magenta-900/20"
  },
  {
    id: 3,
    name: "Marthea Oplenskedal Hokaasen",
    age: 20,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/6a894f4300051415f420/view?project=6853fb68001e82047908&impersonateuserid=&mode=admin",
    education: 'Bårdar Akademiet "hiphop/kommersiell"',
    description: "Marthea Oplenskedal Hokaasen er 20 år gammel og kommer fra Kongsvinger. Hun danset hele sin oppvekst på Jump hvor hun var en del av kompaniene fra 2016 til 2022, og hun underviste klasser ved siden av å danse selv fra hun var 14/15 år gammel. Hun bor i dag i Oslo og studerer dans på Bårdar Akademiet med hovedemne hiphop/kommersiell. I tillegg til studiet danser hun på Bårdar Crew ved Bårdar Danseinstitutt – et dansecrew med fokus på hiphop og kommersiell dans. Gjennom Bårdar Crew har hun fått mange spennende muligheter deriblant festivaler sammen med artistduoen Ka2.",
    description2: "Marthea har ved siden av egen dansekarriere flere års erfaring med å undervise barn og ungdom i ulike sjangre, og nå gleder vi oss til hun kommer for å ha Hiphop Commercial Ungdom hos oss på mandager!",
    bgColor: "from-magenta-50 to-brand-50",
    bgColorDark: "dark:from-magenta-900/20 dark:to-brand-900/20"
  },
  {
    id: 4,
    name: "Mathilde Nyeng",
    age: 20,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/6a894fba0008e50bd142/view?project=6853fb68001e82047908&impersonateuserid=&mode=admin",
    education: 'Bårdar Akademiet "kommersiell scenekunst"',
    description: "Mathilde Nyeng (20) fra Kongsvinger startet sin dansekarriere med barneballett på Jump da hun var 2,5 år, og har siden den gang danset de fleste sjangre. Hun var en del av juniorkompaniet, aspirantkompaniet og kompaniet på Jump, og som 15-åring begynte hun å ta timer i hiphop, jazz og ballett på West End Studios i Oslo. Hun har gått den landsdekkende ballettlinja på Edvard Munch vgs i Oslo, og gikk derfra videre til Handelshøyskolen BI. I tillegg til å være danser, er Mathilde skuespiller og har medvirket i en rekke tv-produksjoner, serier og reklamer, samt vært danser i store produksjoner hos Oslo Nye og Folketeateret de siste årene.",
    description2: "Mathilde skal lede aspirantkompaniet igjen denne høsten, samt undervise Ballett 2 og Moderne 2 ved siden av å starte studiet «kommersiell scenekunst» ved Bårdar Akademiet!",
    bgColor: "from-coral-50 to-magenta-50",
    bgColorDark: "dark:from-coral-900/20 dark:to-magenta-900/20"
  },
  {
    id: 5,
    name: "Amalie Haukenæs Neskvern",
    age: 24,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/6a89530b003c5d62ed41/view?project=6853fb68001e82047908&impersonateuserid=&mode=admin",
    description: "Amalie Haukenæs Neskvern (24) fra Kongsvinger går siste året på veterinærstudiet på NMBU, og jobber som veterinær på midlertidig lisens på AniCura Kongsvinger ved siden av studiene. Amalie har danset siden hun var 3 år gammel, og hun var en del av kompaniene på Jump de fire siste årene hun danset. Hun underviste også flere klasser ved siden av egen dansing i perioden 2016-2021.",
    description2: "Amalie skal undervise Barnedans 3-6 år, Showjazz 1.-4. trinn og Ballett 1 (fra 1. trinn). Hun ønsker å fokusere på mestringsfølelse og trygghet i sine klasser. ",
    bgColor: "from-magenta-50 to-brand-50",
    bgColorDark: "dark:from-magenta-900/20 dark:to-brand-900/20"
  },
  {
    id: 6,
    name: "Nora Tosounidi",
    age: 18,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/6a8953e60001d2bcf257/view?project=6853fb68001e82047908&impersonateuserid=&mode=admin",
    education: "Studiespesialierende ved Øvrebyen vgs",
    description: "Nora Tosounidi (18) fra Kongsvinger går i vg3 på Øvrebyen og danser på kompaniet på Urban. Hun har danset siden hun var 3 år, blant annet ballett, jazz, contemporary og commercial, og hun har danset på flere kompanier.",
    description2: "Nora har også jobbet som assistent og trener i flere år ved siden av å danse selv,, og nå gleder hun seg til å undervise Jazz 2, Show/Musikal 2 og Styrke og tøy hos oss denne høsten.",
    bgColor: "from-coral-50 to-magenta-50",
    bgColorDark: "dark:from-coral-900/20 dark:to-magenta-900/20"
  },
  {
    id: 7,
    name: "Nina Helen Berger",
    age: 16,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/6a8953f3001b28e144e9/view?project=6853fb68001e82047908&impersonateuserid=&mode=admin",
    education: "Medier og kommunikasjon ved Sentrum VGS",
    description: "Nina Helen Berger (16) fra Kongsvinger går Medier og kommunikasjon på Sentrum vgs og danser på kompaniet på Urban. Nina har danset siden hun var 7 år gammel og elsker show/jazz og hiphop girly. Nina har undervist hos oss som assistent og instruktør det siste året, og denne høsten møter dere henne som instruktør i Jazz 1 og Moderne 1 i tillegg til Hiphop introkurs for 1.-4. trinn.",
    description2: "",
    badge: "Skuespiller",
    bgColor: "from-magenta-50 to-brand-50",
    bgColorDark: "dark:from-magenta-900/20 dark:to-brand-900/20"
  },
  {
    id: 8,
    name: "Molly Kolgrov Lunder",
    age: 14,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/6a8954000032cad879d0/view?project=6853fb68001e82047908&impersonateuserid=&mode=admin",
    education: "Kongsvinger ungdomsskole",
    description: "Molly Kolgrov Lunder (14) fra Kongsvinger går i 10. klasse på Kusk. Molly har Produksjon for scene som valgfag på skolen, og har gått på Teater på kulturskolen i mange år. Hun har vært med på mange produksjoner både i regi av kulturskolen og utenfor, senest Eventyrfestningen sine Oberst Krebs-forestillinger som sanger, danser og skuespiller! ",
    description2: "Molly har undervist hos oss som assistent dette året, ved siden av å danse i Urban Kompani. Hun skal være instruktør i Show/Musikal 1 denne høsten - en klasse for deg som har begynt i 5. trinn og som vil danse musikaldans.",
    bgColor: "from-coral-50 to-magenta-50",
    bgColorDark: "dark:from-coral-900/20 dark:to-magenta-900/20"
  },
  {
    id: 9,
    name: "Saga Elvine Sandvik",
    age: 14,
    location: "Kongsvinger",
    image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/6a89540c001e9b3e2788/view?project=6853fb68001e82047908&impersonateuserid=&mode=admin",
    education: "Kongsvinger ungdomsskole",
    description: "Saga Elvine Sandvik (14) fra Kongsvinger går i 10. klasse på Kusk med Produksjon for scene som valgfag. Saga har danset siden hun var 3 år gammel, både konkurranse- og scenedans. Hun har også gått på teater i flere år, og deltatt i forestillinger både i og utenfor Kulturskolen; senest som danser i Eventyrfestningen sin forestilling «Oberst Krebs og de skotske spionene».",
    description2: "Saga danser på Urban Kompani og har jobbet som assistent hos oss dette året. Nå skal hun være instruktør i Hiphop Commercial 1. ",
    bgColor: "from-magenta-50 to-brand-50",
    bgColorDark: "dark:from-magenta-900/20 dark:to-brand-900/20"
  }
    // {
  //   id: 1,
  //   name: "Fredrik Petrov",
  //   age: 32,
  //   location: "Kongsvinger",
  //   image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/698c79bc0022e632da65/view?project=6853fb68001e82047908&mode=admin",
  //   education: "Bachelor i samtidsdans ved Kunsthøgskolen i Oslo (KHiO)",
  //   description: "Fredrik Petrov er 32 år og har vokst opp i Kongsvinger. Han danset på Jump frem til han begynte på danselinjen ved Fagerborg vgs i Oslo (skolen er i dag lagt ned og linjen videreføres på Edvard Munch vgs). Han gikk videre med en bachelorgrad i samtidsdans ved KIhO (2016) og har siden jobbet bredt og tverrfaglig i det norske scenekunstfeltet, både som danser, skuespiller og skapende kunstner. Som koreograf og utøver står han bak kritikerroste forestillinger, kjent for et uttrykk som kombinerer fysisk presisjon, rå energi og tydelig form.",
  //   description2: "I undervisningen har Fredrik et sterkt teknisk fokus, samtidig som han legger stor vekt på fellesskap, trygghet og tilhørighet i rommet. Klassene er dynamiske, levende og utforskende – med rom for både hard jobbing, nysgjerrighet og personlig uttrykk. Fredrik skal undervise i Hiphop 3 Girly og Moderne 3, samt lede Kompaniet denne våren.",
  //   bgColor: "from-brand-50 to-coral-50",
  //   bgColorDark: "dark:from-brand-900/20 dark:to-coral-900/20"
  // },
    // {
  //   id: 4,
  //   name: "Olga Etkalo",
  //   age: 37,
  //   location: "Ukraina → Kongsvinger",
  //   image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926c2c000225fd1871/view?project=6853fb68001e82047908&mode=admin",
  //   education: "Utdannet danser, koreograf og pedagog ved Kharkiv State Academy of Culture",
  //   description: "Olga Etkalo er 37 år og utdannet danser, koreograf og pedagog ved Kharkiv State Academy of Culture i Ukraina. Hun har nå etablert seg i Kongsvinger med sine to barn. Hun har stor kapasitet og har mange visjoner for kreativ dans.",
  //   description2: "Olga underviser i Ballett 2 og Forkurs for tåspiss, samt Ballett for 2.-5. trinn.",
  //   bgColor: "from-brand-50 to-coral-50",
  //   bgColorDark: "dark:from-brand-900/20 dark:to-coral-900/20"
  // },
  // {
  //   id: 5,
  //   name: "Emma Vangen",
  //   age: 17,
  //   location: "Kongsvinger",
  //   image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926c45003ba94e5466/view?project=6853fb68001e82047908&mode=admin",
  //   education: "Studiespesialierende ved Øvrebyen vgs",
  //   description: "Emma Vangen er 17 år og går i VG3 ved Øvrebyen vgs. Emma har danset siden hun var 3 år gammel, og i løpet av 14 år har hun danset flere ulike sjangere, alt fra ballett til hiphop til heels. Hun har jobbet som assistent på ulike klasser, og etter at hun sluttet å danse selv har hun undervist Hiphop på Victory Dance.",
  //   description2: "Emma underviser i Hiphop Commercial nivå 2 og Hiphop Girly Ungdom dette semesteret, i tillegg har hun Styrke/tøy på mandagskvelden som er verdt å få med seg om man vil bli en sterk og smidig danser!",
  //   bgColor: "from-coral-50 to-magenta-50",
  //   bgColorDark: "dark:from-coral-900/20 dark:to-magenta-900/20"
  // },
  // {
  //   id: 6,
  //   name: "Alma Sidenia Kamøy Furuseth",
  //   age: 18,
  //   location: "Kongsvinger",
  //   image: "https://fra.cloud.appwrite.io/v1/storage/buckets/6857bb630022ef965c25/files/68926c6e00320f6a91ce/view?project=6853fb68001e82047908&mode=admin",
  //   education: "Studiespesialierende ved Øvrebyen vgs",
  //   description: "Alma Sidenia Kamøy Furuseth er 18 år gammel og går i VG3 ved Øvrebyen vgs. Med to foreldre som begge er utdannede dansere, har dansing vært en stor del av livet siden Alma var liten. Hun har danset mange sjangre, med fokus på basefagene ballett, jazz, moderne og hiphop. Siden høsten 2024 har hun også undervist i Hiphop og Showdans på Victory Dance.",
  //   description2: "Alma underviser denne våren i Show/Musikal 1 og Voksenjazz, sistnevnte er en åpen klasse i jazz for deg som har fylt 16 år og vil danse for gøy- ingen krav til tidligere danseerfaring!",
  //   bgColor: "from-magenta-50 to-brand-50",
  //   bgColorDark: "dark:from-magenta-900/20 dark:to-brand-900/20"
  // },
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