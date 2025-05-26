// Dance studio mock data including classes, testimonials, and pricing information

export const DANCE_CLASSES = [
  {
    id: 1,
    name: "Hip Hop",
    description:
      "Urban dance styles performed to hip-hop music, focusing on freestyle and personal interpretation.",
    color:
      "bg-coral-100 border-coral-300 text-coral-600 dark:bg-coral-900/20 dark:border-coral-800 dark:text-coral-400",
    icon: "music",
    image: "https://picsum.photos/seed/hiphop123/800/600",
    schedule: [
      { day: "Monday", time: "4:00 PM - 5:30 PM", level: "Beginner" },
      { day: "Wednesday", time: "6:00 PM - 7:30 PM", level: "Intermediate" },
      { day: "Saturday", time: "10:00 AM - 11:30 AM", level: "Advanced" },
    ],

    instructor: "Marcus Johnson",
  },
  {
    id: 2,
    name: "Jazz",
    description:
      "Energetic and fun dance style characterized by unique moves, fancy footwork, and big leaps.",
    color:
      "bg-mint-100 border-mint-300 text-mint-600 dark:bg-mint-900/20 dark:border-mint-800 dark:text-mint-400",
    icon: "music",
    image: "https://picsum.photos/seed/jazz456/800/600",
    schedule: [
      { day: "Tuesday", time: "4:00 PM - 5:30 PM", level: "Beginner" },
      { day: "Thursday", time: "6:00 PM - 7:30 PM", level: "Intermediate" },
      { day: "Saturday", time: "1:00 PM - 2:30 PM", level: "Advanced" },
    ],

    instructor: "Sophia Martinez",
  },
  {
    id: 3,
    name: "Breakdance",
    description:
      "Athletic style with acrobatic moves like head spins, windmills, and power moves.",
    color:
      "bg-purple-100 border-purple-300 text-purple-600 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400",
    icon: "zap",
    image: "https://picsum.photos/seed/break789/800/600",
    schedule: [
      { day: "Monday", time: "6:00 PM - 7:30 PM", level: "Beginner" },
      { day: "Wednesday", time: "4:00 PM - 5:30 PM", level: "Intermediate" },
      { day: "Friday", time: "5:00 PM - 6:30 PM", level: "Advanced" },
    ],

    instructor: "Alex Chen",
  },
  {
    id: 4,
    name: "Contemporary",
    description:
      "Expressive dance combining elements of several dance genres including modern, jazz, lyrical, and ballet.",
    color:
      "bg-blue-100 border-blue-300 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400",
    icon: "wind",
    image: "https://picsum.photos/seed/contemp101/800/600",
    schedule: [
      { day: "Tuesday", time: "6:00 PM - 7:30 PM", level: "Beginner" },
      { day: "Thursday", time: "4:00 PM - 5:30 PM", level: "Intermediate" },
      { day: "Sunday", time: "11:00 AM - 12:30 PM", level: "Advanced" },
    ],

    instructor: "Emma Wilson",
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
      "I started taking hip hop classes as a complete beginner at 35, and I've never felt out of place. The community is supportive and the instructors break down complex moves in ways that make them accessible.",
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
    name: "Single Class",
    price: 25,
    duration: "per class",
    features: [
      "Access to one class",
      "No commitment",
      "All levels welcome",
      "Professional instruction",
    ],

    popular: false,
    color:
      "bg-coral-50 border-coral-200 hover:border-coral-300 dark:bg-coral-900/10 dark:border-coral-900 dark:hover:border-coral-800",
  },
  {
    id: 2,
    name: "Monthly Pass",
    price: 120,
    duration: "per month",
    features: [
      "Unlimited classes",
      "Priority booking",
      "Access to all levels",
      "One free private lesson",
      "Monthly progress report",
    ],

    popular: true,
    color:
      "bg-purple-50 border-purple-200 hover:border-purple-300 dark:bg-purple-900/10 dark:border-purple-900 dark:hover:border-purple-800",
  },
  {
    id: 3,
    name: "10-Class Pack",
    price: 200,
    duration: "for 10 classes",
    features: [
      "10 classes of your choice",
      "Valid for 3 months",
      "All levels welcome",
      "Discounted rate per class",
      "Flexible scheduling",
    ],

    popular: false,
    color:
      "bg-mint-50 border-mint-200 hover:border-mint-300 dark:bg-mint-900/10 dark:border-mint-900 dark:hover:border-mint-800",
  },
];

export const STUDIO_INFO = {
  name: "Rhythm & Motion Dance Studio",
  tagline: "Where passion meets movement",
  description:
    "Founded in 2010, Rhythm & Motion Dance Studio has been a home for dancers of all ages and skill levels. Our mission is to inspire creativity, build confidence, and foster a love for dance in a supportive environment.",
  address: {
    street: "123 Dance Avenue",
    city: "New York",
    state: "NY",
    zip: "10001",
  },
  contact: {
    phone: "(555) 123-4567",
    email: "info@rhythmandmotion.com",
    hours: "Monday-Friday: 9am-9pm, Saturday: 9am-5pm, Sunday: 10am-3pm",
  },
  social: {
    instagram: "https://instagram.com/rhythmandmotion",
    facebook: "https://facebook.com/rhythmandmotion",
    twitter: "https://twitter.com/rhythmandmotion",
    youtube: "https://youtube.com/rhythmandmotion",
  },
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941774136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1619826381244!5m2!1sen!2s",
};
