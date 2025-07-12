// Dance studio mock data including classes, testimonials, and pricing information

export const DANCE_CLASSES = [
  {
    id: 1,
    name: "Hip Hop",
    description:
      "Hiphop er en tøff, energisk dansestil som har sin opprinnelse fra gatene i USA. Dansestilen er populær blant barn og unge, og lar dem utforske en verden full av kul musikk og rå moves. Hiphop I timene jobbes det med rytme, trinnkombinasjoner og koreografi, for ikke å snakke om attitude. Semesteret legges opp… hvor stilene varierer ut fra pedagog, og kan være alt fra old school til new school, popping, locking, wacking til moderne eller lyrisk hip hop.",
    color:
      "bg-primary-100 border-primary-300 text-primary-600 dark:bg-primary-900/20 dark:border-primary-800 dark:text-primary-400",
    icon: "radio",
    image: "https://plus.unsplash.com/premium_photo-1682089697749-f5cdd624f21e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    schedule: [
      { day: "Mandag", time: "16:00 - 17:30", level: "Nybegynner" },
      { day: "Onsdag", time: "18:00 - 19:30", level: "Erfaren" },
      { day: "Lørdag", time: "10:00 - 11:30", level: "Avansert" },
    ],
    level: "Alle nivåer",
    age: "8+",
    instructor: "Max",
  },
  {
    id: 2,
    name: "Jazz",
    description: "Jazzdansen kommer fra USA og oppstod som stilart på 1900-tallet. Det er en blanding av klassisk ballett og rytmer fra black culture. I dag har jazzen et mer moderne uttrykk og strekker seg fra klassisk jazz til energisk showdans. En klasse kan være svært variert, og inneholder alt fra sprudlende koreograferer til tekniske piruetter, hopp og spark.",
    color:
      "bg-green-100 border-green-300 text-green-600 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400",
    icon: "music",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    schedule: [
      { day: "Tirsdag", time: "16:00 - 17:30", level: "Nybegynner" },
      { day: "Torsdag", time: "18:00 - 19:30", level: "Erfaren" },
      { day: "Lørdag", time: "13:00 - 14:30", level: "Avansert" },
    ],
    level: "Alle nivåer",
    age: "6 - 10 år",
    instructor: "Sofia",
  },
  {
    id: 3,
    name: "Ballett",
    description: "I klassisk ballett undervises små som ønsker å bli prima ballerina, og ungdom/eldre som vil utvikle seg danseteknisk og få flott holdning. Kursene i klassisk ballett er basert på tradisjonell balletteknikk. I timene starter man med grunnleggende øvelser ved barre, og deretter lengre sekvenser i senter og over gulv. Klassisk ballett er en grunnleggende teknisk dansestil som er morsom, krevende og et nyttig supplement for å bli bedre i andre dansestiler.",
    color:
      "bg-purple-100 border-purple-300 text-purple-600 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400",
    icon: "zap",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    schedule: [
      { day: "Mandag", time: "18:00 - 19:30", level: "Nybegynner" },
      { day: "Onsdag", time: "16:00 - 17:30", level: "Erfaren" },
      { day: "Fredag", time: "17:00 - 18:30", level: "Avansert" },
    ],
    level: "Nybegynner til avansert",
    age: "10+",
    instructor: "Aleksander",
  },
  {
    id: 4,
    name: "Moderne",
    description: "Moderne dans tar utgangspunkt i kreativitet, skaperglede og kroppsbeherskelse. I timene er det fokus på å formidle følelser innen dans, musikalitet og på å utforske ulike bevegelsesmønstre. Disse klassene gir elevene mulighet til å sette sitt eget preg på dansen, og utvikle seg selv som en skapende danser. En moderneklasse inneholder gulvarbeid, tekniske øvelser, improvisasjon og formidling av koreografi. Prinsipp som senter, pust, tyngdekraft og dynamikk står sterkt i disse timene. ",
    color:
      "bg-blue-100 border-blue-300 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400",
    icon: "wind",
    image: "https://images.unsplash.com/photo-1630543901558-868a6b596bd3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGNvbnRlbXB0b3JhcnklMjBkYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    schedule: [
      { day: "Tirsdag", time: "18:00 - 19:30", level: "Nybegynner" },
      { day: "Torsdag", time: "16:00 - 17:30", level: "Erfaren" },
      { day: "Søndag", time: "11:00 - 12:30", level: "Avansert" },
    ],
    level: "Alle nivåer",
    age: "12+",
    instructor: "Emma",
  },
];


export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Parent",
    image: "https://github.com/yusufhilmi.png",
    quote:
      "My daughter has been taking classes here for two years and her confidence has grown tremendously. The instructors are patient, skilled, and truly care about each student's progress.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Adult Student",
    image: "https://github.com/furkanksl.png",
    quote:
      "I started taking hip hop classes as a complete Nybegynner at 35, and I've never felt out of place. The community is supportive and the instructors break down complex moves in ways that make them accessible.",
    rating: 5,
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Teen Student",
    image: "https://github.com/kdrnp.png",
    quote:
      "The contemporary classes have helped me express myself in ways I never thought possible. I've made amazing friends and improved my technique significantly.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Parent",
    image: "https://github.com/yahyabedirhan.png",
    quote:
      "The instructors have a gift for connecting with kids. My son was shy at first, but now he can't wait for his breakdance class each week. Worth every penny!",
    rating: 5,
  },
  {
    id: 5,
    name: "Emma Thompson",
    role: "Adult Student",
    image: "https://github.com/denizbuyuktas.png",
    quote:
      "I've taken classes at several studios, and this one stands out for its professional yet welcoming atmosphere. The facilities are top-notch and the class variety keeps things interesting.",
    rating: 4,
  },
];

export const PRICING_PLANS = [
  {
    id: 1,
    name: "Tddler",
    price: 1200,
    duration: "per halvår",
    features: [
      "Tilgang til alle Tddler-klasser",
      "Alle nivåer velkommen",
      "Profesjonell instruksjon",
      "Gratis første gang",
      "Tilgang til studioets fellesområder"
    ],
    popular: false,
    color: "bg-indigo-50 border-indigo-200 hover:border-indigo-300 dark:bg-indigo-900/10 dark:border-indigo-900 dark:hover:border-indigo-800"
  },
  {
    id: 2,
    name: "1 klasse",
    price: 1500,
    duration: "per halvår",
    features: [
      "Tilgang til én klasse",
      "Alle nivåer velkommen",
      "Profesjonell instruksjon",
      "Gratis første gang"
    ],
    popular: true,
    color: "bg-blue-50 border-blue-200 hover:border-blue-300 dark:bg-blue-900/10 dark:border-blue-900 dark:hover:border-blue-800"
  },
  {
    id: 3,
    name: "2 klasser",
    price: 3000,
    duration: "per halvår",
    features: [
      "Tilgang til to klasser",
      "Alle nivåer velkommen",
      "Profesjonell instruksjon",
      "Gratis første gang",
      "Tilgang til studioets fellesområder",
      "200kr rabatt"
    ],
    popular: false,
    color: "bg-indigo-50 border-indigo-200 hover:border-indigo-300 dark:bg-indigo-900/10 dark:border-indigo-900 dark:hover:border-indigo-800"
  },
  {
    id: 4,
    name: "3+ klasser",
    price: 4500,
    duration: "per halvår",
    features: [
      "Tilgang til tre klasser",
      "Alle nivåer velkommen",
      "Profesjonell instruksjon",
      "Gratis første gang",
      "Tilgang til studioets fellesområder",
      "500kr rabatt"
    ],
    popular: false,
    color: "bg-indigo-50 border-indigo-200 hover:border-indigo-300 dark:bg-indigo-900/10 dark:border-indigo-900 dark:hover:border-indigo-800"
  },
  {
    id: 5,
    name: "Kompani",
    price: 5000,
    duration: "per halvår",
    features: [
      "Tilgang til to klasser",
      "Alle nivåer velkommen",
      "Profesjonell instruksjon",
      "Tilgang til studioets fellesområder",
    ],
    popular: false,
    color: "bg-indigo-50 border-indigo-200 hover:border-indigo-300 dark:bg-indigo-900/10 dark:border-indigo-900 dark:hover:border-indigo-800"
  }
];

export const STUDIO_INFO = {
  name: "URBAN STUDIOS",
  logo: "./assets/logo.svg",
  tagline: "Kreativitet blomstrer når vi tør å være oss selv.",
  description:
    "Vi var alle i sjokk og vanntro da Jump! forsvant for snart 3 år siden. Etter 20 år med dans for dansens skyld mistet nå mange en del av sin identitet. Vi er evig takknemlige for at dansekunsten fikk leve videre gjennom Victory dance disse årene, og vi håper at disse to dansestudioene kan leve side om side i skjønn forening i mange år fremover. Vi åpner vårt nye studio til ære for alt det Jump! var, med nye visjoner og i en struktur hvor alle får gjøre det de er best på. Det blir både kjente og ukjente fjes å se i administrasjonen og blant pedagogene som gleder seg til å møte gamle og nye unge dansere til høsten.",
  address: {
    street: "Jernbanegata 16",
    city: "Kongsvinger",
    zip: "2208",
  },
  contact: {
    phone: "+47 979 53 671",
    email: "kontakt@urbanstudio.no",
    hours: "Åpner høsten 2025"
  },
  social: {
    instagram: "https://instagram.com/urbanstudios.dans",
    facebook: "https://www.facebook.com/profile.php?id=61578399712863",
  },
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.6455432634814!2d12.000216412904194!3d60.18659904200348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464248f90618ef5d%3A0xe2f98650ab70101a!2sJernbanegata%2016%2C%202211%20Kongsvinger!5e0!3m2!1sno!2sno!4v1749630260279!5m2!1sno!2sno",
};