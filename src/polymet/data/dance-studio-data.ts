// Dance studio mock data including classes, testimonials, and pricing information

export const DANCE_CLASSES = [
  {
    id: 1,
    name: "Hip Hop",
    description:
      "Energisk og autentisk. For alle som vil utforske gatens rytmer. Alder: 8+  Nivå: Nybegynner til avansert",
    color:
      "bg-orange-100 border-orange-300 text-orange-600 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400",
    icon: "radio",
    image: "https://plus.unsplash.com/premium_photo-1682089697749-f5cdd624f21e?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    schedule: [
      { day: "Mandag", time: "16:00 - 17:30", level: "Nybegynner" },
      { day: "Onsdag", time: "18:00 - 19:30", level: "Litt erfarne" },
      { day: "Lørdag", time: "10:00 - 11:30", level: "Avansert" },
    ],

    instructor: "Max",
  },
  {
    id: 2,
    name: "Jazz",
    description:
      "Klassiske teknikker møter moderne uttrykk. Perfekt for deg som vil skinne på scenen. Alder: 10+ | Nivå: Nybegynner til avansert",
    color:
      "bg-green-100 border-green-300 text-green-600 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400",
    icon: "music",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    schedule: [
      { day: "Tirsdag", time: "16:00 - 17:30", level: "Nybegynner" },
      { day: "Torsdag", time: "18:00 - 19:30", level: "Litt erfarne" },
      { day: "Lørdag", time: "13:00 - 14:30", level: "Avansert" },
    ],

    instructor: "Sofia",
  },
  {
    id: 3,
    name: "Breakdance",
    description:
      "Kraftfull og akrobatisk danseform som kombinerer styrke, kreativitet og stil. Lær alt fra basic steps til spektakulære freezes og power moves. Perfekt for deg som vil utfordre både kropp og kreativitet. Alder: 10+ | Nivå: Nybegynner til avansert",
    color:
      "bg-purple-100 border-purple-300 text-purple-600 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400",
    icon: "zap",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    schedule: [
      { day: "Mandag", time: "18:00 - 19:30", level: "Nybegynner" },
      { day: "Onsdag", time: "16:00 - 17:30", level: "Litt erfarne" },
      { day: "Fredag", time: "17:00 - 18:30", level: "Avansert" },
    ],

    instructor: "Aleksander",
  },
  {
    id: 4,
    name: "Contemporary",
    description:
      "Uttrykksfulle bevegelser som forteller historier. Denne teknisk krevende danseformen blander elementer fra ballett, jazz og moderne dans. Her utforsker vi følelser og fortellinger gjennom flytende, organiske bevegelser som gir rom for personlig tolkning og kunstnerisk utvikling. Alder: 12+ | Nivå: Alle nivåer",
    color:
      "bg-blue-100 border-blue-300 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400",
    icon: "wind",
    image: "https://images.unsplash.com/photo-1630543901558-868a6b596bd3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGNvbnRlbXB0b3JhcnklMjBkYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    schedule: [
      { day: "Tirsdag", time: "18:00 - 19:30", level: "Nybegynner" },
      { day: "Torsdag", time: "16:00 - 17:30", level: "Litt erfarne" },
      { day: "Søndag", time: "11:00 - 12:30", level: "Avansert" },
    ],

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
    name: "Drop-in",
    price: 280,
    duration: "per time",
    features: [
      "Tilgang til én time",
      "Ingen binding",
      "Alle nivåer velkommen",
      "Profesjonell instruksjon",
      "Gratis første gang"
    ],
    popular: false,
    color: "bg-coral-50 border-coral-200 hover:border-coral-300 dark:bg-coral-900/10 dark:border-coral-900 dark:hover:border-coral-800"
  },
  {
    id: 2,
    name: "Månedlig medlemskap",
    price: 1290,
    duration: "per måned",
    features: [
      "Ubegrenset antall timer",
      "Prioritet ved booking",
      "Tilgang til alle nivåer og stiler",
      "Én gratis privat-time per måned",
      "10% rabatt på workshops",
      "Månedlig fremgangsrapport"
    ],
    popular: true,
    color: "bg-purple-50 border-purple-200 hover:border-purple-300 dark:bg-purple-900/10 dark:border-purple-900 dark:hover:border-purple-800"
  },
  {
    id: 3,
    name: "10-timers kort",
    price: 2200,
    duration: "10 timer",
    features: [
      "10 timer du kan velge fritt",
      "Gyldig i 4 måneder",
      "Alle stiler og nivåer",
      "21% rabatt per time",
      "Fleksibel timeplan",
      "Kan deles med familie"
    ],
    popular: false,
    color: "bg-mint-50 border-mint-200 hover:border-mint-300 dark:bg-mint-900/10 dark:border-mint-900 dark:hover:border-mint-800"
  }
];

export const STUDIO_INFO = {
  name: "JS Dans",
  tagline: "Din nye dansehistorie starter her",
  description:
    "Opplev gleden ved dans i våre lyse, moderne lokaler. Med erfarne instruktører og et varmt fellesskap skaper vi magiske øyeblikk for alle aldre og nivåer.",
  address: {
    street: "Fjellgata 4",
    city: "Kongsvinger",
    zip: "2208",
  },
  contact: {
    phone: "+47 123 45 678",
    email: "kontakt@jsdans.no",
    hours: "Mandag-Fredag: 15.00 - 22.00, Lørdag: 10.00 - 15.00"
  },
  social: {
    instagram: "https://instagram.com/jsdans",
    facebook: "https://facebook.com/jsdans",
    twitter: "https://twitter.com/jsdans",
    youtube: "https://youtube.com/jsdans",
  },
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1247.232038804706!2d12.002997696042817!3d60.18708001934726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sno!2sno!4v1748429024156!5m2!1sno!2sno",
};