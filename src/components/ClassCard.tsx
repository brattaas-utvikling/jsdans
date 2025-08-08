import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar, Clock, User, MapPin, Users, Heart } from "lucide-react";

type ClassCardProps = {
  name: string;
  description: string;
  color: string;
  image: string;
  schedule: Array<{
    day: string;
    time: string;
    studio?: string; // Added studio to schedule items
  }>;
  instructor?: string;
  age: string;
  studio: string;
};

export default function ClassCard({
  name,
  description,
  color,
  image,
  schedule,
  instructor,
  age,
  studio,
}: ClassCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamisk farge-mapping basert på color prop
  type ColorName =
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone";

  type ColorClasses = {
    bg: string;
    text: string;
    border: string;
    hover: string;
    buttonBg: string;
    buttonText: string;
    buttonHover: string;
  };

  const colorMap: Record<ColorName, ColorClasses> = {
    red: {
      bg: "bg-red-50 dark:bg-red-950/50",
      text: "text-red-800 dark:text-red-200",
      border: "border-red-200 dark:border-red-800",
      hover: "hover:bg-red-100 dark:hover:bg-red-900/50",
      buttonBg: "bg-red-600 hover:bg-red-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-800 dark:hover:text-red-200",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-950/50",
      text: "text-orange-800 dark:text-orange-200",
      border: "border-orange-200 dark:border-orange-800",
      hover: "hover:bg-orange-100 dark:hover:bg-orange-900/50",
      buttonBg: "bg-orange-600 hover:bg-orange-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:text-orange-800 dark:hover:text-orange-200",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/50",
      text: "text-amber-800 dark:text-amber-200",
      border: "border-amber-200 dark:border-amber-800",
      hover: "hover:bg-amber-100 dark:hover:bg-amber-900/50",
      buttonBg: "bg-amber-600 hover:bg-amber-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-800 dark:hover:text-amber-200",
    },
    yellow: {
      bg: "bg-yellow-50 dark:bg-yellow-950/50",
      text: "text-yellow-800 dark:text-yellow-200",
      border: "border-yellow-200 dark:border-yellow-800",
      hover: "hover:bg-yellow-100 dark:hover:bg-yellow-900/50",
      buttonBg: "bg-yellow-600 hover:bg-yellow-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-yellow-50 dark:hover:bg-yellow-900/30 hover:text-yellow-800 dark:hover:text-yellow-200",
    },
    lime: {
      bg: "bg-lime-50 dark:bg-lime-950/50",
      text: "text-lime-800 dark:text-lime-200",
      border: "border-lime-200 dark:border-lime-800",
      hover: "hover:bg-lime-100 dark:hover:bg-lime-900/50",
      buttonBg: "bg-lime-600 hover:bg-lime-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-lime-50 dark:hover:bg-lime-900/30 hover:text-lime-800 dark:hover:text-lime-200",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-950/50",
      text: "text-green-800 dark:text-green-200",
      border: "border-green-200 dark:border-green-800",
      hover: "hover:bg-green-100 dark:hover:bg-green-900/50",
      buttonBg: "bg-green-600 hover:bg-green-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-800 dark:hover:text-green-200",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
      text: "text-emerald-800 dark:text-emerald-200",
      border: "border-emerald-200 dark:border-emerald-800",
      hover: "hover:bg-emerald-100 dark:hover:bg-emerald-900/50",
      buttonBg: "bg-emerald-600 hover:bg-emerald-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-800 dark:hover:text-emerald-200",
    },
    teal: {
      bg: "bg-teal-50 dark:bg-teal-950/50",
      text: "text-teal-800 dark:text-teal-200",
      border: "border-teal-200 dark:border-teal-800",
      hover: "hover:bg-teal-100 dark:hover:bg-teal-900/50",
      buttonBg: "bg-teal-600 hover:bg-teal-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-800 dark:hover:text-teal-200",
    },
    cyan: {
      bg: "bg-cyan-50 dark:bg-cyan-950/50",
      text: "text-cyan-800 dark:text-cyan-200",
      border: "border-cyan-200 dark:border-cyan-800",
      hover: "hover:bg-cyan-100 dark:hover:bg-cyan-900/50",
      buttonBg: "bg-cyan-600 hover:bg-cyan-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-cyan-50 dark:hover:bg-cyan-900/30 hover:text-cyan-800 dark:hover:text-cyan-200",
    },
    sky: {
      bg: "bg-sky-50 dark:bg-sky-950/50",
      text: "text-sky-800 dark:text-sky-200",
      border: "border-sky-200 dark:border-sky-800",
      hover: "hover:bg-sky-100 dark:hover:bg-sky-900/50",
      buttonBg: "bg-sky-600 hover:bg-sky-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:text-sky-800 dark:hover:text-sky-200",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/50",
      text: "text-blue-800 dark:text-blue-200",
      border: "border-blue-200 dark:border-blue-800",
      hover: "hover:bg-blue-100 dark:hover:bg-blue-900/50",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-800 dark:hover:text-blue-200",
    },
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-950/50",
      text: "text-indigo-800 dark:text-indigo-200",
      border: "border-indigo-200 dark:border-indigo-800",
      hover: "hover:bg-indigo-100 dark:hover:bg-indigo-900/50",
      buttonBg: "bg-indigo-600 hover:bg-indigo-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-800 dark:hover:text-indigo-200",
    },
    violet: {
      bg: "bg-violet-50 dark:bg-violet-950/50",
      text: "text-violet-800 dark:text-violet-200",
      border: "border-violet-200 dark:border-violet-800",
      hover: "hover:bg-violet-100 dark:hover:bg-violet-900/50",
      buttonBg: "bg-violet-600 hover:bg-violet-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-800 dark:hover:text-violet-200",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/50",
      text: "text-purple-800 dark:text-purple-200",
      border: "border-purple-200 dark:border-purple-800",
      hover: "hover:bg-purple-100 dark:hover:bg-purple-900/50",
      buttonBg: "bg-purple-600 hover:bg-purple-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-800 dark:hover:text-purple-200",
    },
    fuchsia: {
      bg: "bg-fuchsia-50 dark:bg-fuchsia-950/50",
      text: "text-fuchsia-800 dark:text-fuchsia-200",
      border: "border-fuchsia-200 dark:border-fuchsia-800",
      hover: "hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/50",
      buttonBg: "bg-fuchsia-600 hover:bg-fuchsia-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/30 hover:text-fuchsia-800 dark:hover:text-fuchsia-200",
    },
    pink: {
      bg: "bg-pink-50 dark:bg-pink-950/50",
      text: "text-pink-800 dark:text-pink-200",
      border: "border-pink-200 dark:border-pink-800",
      hover: "hover:bg-pink-100 dark:hover:bg-pink-900/50",
      buttonBg: "bg-pink-600 hover:bg-pink-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:text-pink-800 dark:hover:text-pink-200",
    },
    rose: {
      bg: "bg-rose-50 dark:bg-rose-950/50",
      text: "text-rose-800 dark:text-rose-200",
      border: "border-rose-200 dark:border-rose-800",
      hover: "hover:bg-rose-100 dark:hover:bg-rose-900/50",
      buttonBg: "bg-rose-600 hover:bg-rose-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-800 dark:hover:text-rose-200",
    },
    slate: {
      bg: "bg-slate-50 dark:bg-slate-950/50",
      text: "text-slate-800 dark:text-slate-200",
      border: "border-slate-200 dark:border-slate-800",
      hover: "hover:bg-slate-100 dark:hover:bg-slate-900/50",
      buttonBg: "bg-slate-600 hover:bg-slate-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-slate-50 dark:hover:bg-slate-900/30 hover:text-slate-800 dark:hover:text-slate-200",
    },
    gray: {
      bg: "bg-gray-50 dark:bg-gray-950/50",
      text: "text-gray-800 dark:text-gray-200",
      border: "border-gray-200 dark:border-gray-800",
      hover: "hover:bg-gray-100 dark:hover:bg-gray-900/50",
      buttonBg: "bg-gray-600 hover:bg-gray-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-gray-50 dark:hover:bg-gray-900/30 hover:text-gray-800 dark:hover:text-gray-200",
    },
    zinc: {
      bg: "bg-zinc-50 dark:bg-zinc-950/50",
      text: "text-zinc-800 dark:text-zinc-200",
      border: "border-zinc-200 dark:border-zinc-800",
      hover: "hover:bg-zinc-100 dark:hover:bg-zinc-900/50",
      buttonBg: "bg-zinc-600 hover:bg-zinc-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-zinc-50 dark:hover:bg-zinc-900/30 hover:text-zinc-800 dark:hover:text-zinc-200",
    },
    neutral: {
      bg: "bg-neutral-50 dark:bg-neutral-950/50",
      text: "text-neutral-800 dark:text-neutral-200",
      border: "border-neutral-200 dark:border-neutral-800",
      hover: "hover:bg-neutral-100 dark:hover:bg-neutral-900/50",
      buttonBg: "bg-neutral-600 hover:bg-neutral-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-neutral-50 dark:hover:bg-neutral-900/30 hover:text-neutral-800 dark:hover:text-neutral-200",
    },
    stone: {
      bg: "bg-stone-50 dark:bg-stone-950/50",
      text: "text-stone-800 dark:text-stone-200",
      border: "border-stone-200 dark:border-stone-800",
      hover: "hover:bg-stone-100 dark:hover:bg-stone-900/50",
      buttonBg: "bg-stone-600 hover:bg-stone-700",
      buttonText: "text-white",
      buttonHover:
        "hover:bg-stone-50 dark:hover:bg-stone-900/30 hover:text-stone-800 dark:hover:text-stone-200",
    },
  };

  const getColorClasses = (colorName: string): ColorClasses => {
    const key = colorName.toLowerCase() as ColorName;
    return colorMap[key] || colorMap["purple"];
  };

  const colors = getColorClasses(color);

  return (
    <>
      <Card
        className="overflow-hidden transition-all duration-300 hover:shadow-brand-lg 
                       bg-gradient-to-br from-brand-50/80 to-surface-muted 
                       dark:from-brand-900/10 dark:to-surface-dark-muted 
                       border border-brand-100/50 dark:border-brand-700/30 group"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={`${name} dance class`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bebas text-gray-900 dark:text-white">
            {name}
          </CardTitle>
          <CardDescription className="font-montserrat text-gray-600 dark:text-gray-300 text-start">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="font-montserrat">Instruktør: {instructor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-brand-500" />
              <span className="font-montserrat">Alder: {age}</span>
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-brand-500" />
                <span className="font-montserrat">Tidspunkt:</span>
              </div>
              <div
                className={`${colors.bg} ${colors.border} border rounded-lg p-3 text-sm mt-1`}
              >
                <div className="flex justify-between">
                  <span
                    className={`${colors.text} font-montserrat font-semibold`}
                  >
                    {schedule[0]?.day || "Uke 35 2025"} uke 35
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                  <span className={`font-montserrat ${colors.text}`}>
                    {schedule[0]?.time || "Tidspunkt kommer"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className={`w-full rounded-full bg-transparent border-2 ${colors.border} ${colors.buttonHover} ${colors.text}
                       font-montserrat font-medium transition-all duration-200`}
            onClick={() => setIsModalOpen(true)}
          >
            Mer info
          </Button>
        </CardFooter>
      </Card>

      {/* Modal - FIXED for mobile responsiveness */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent 
          className="w-[95vw] max-w-2xl max-h-[95vh] overflow-y-auto bg-white dark:bg-surface-dark 
                     mx-auto my-2 sm:my-8 p-4 sm:p-6"
        >
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-xl sm:text-2xl font-bebas flex items-center gap-3 text-gray-900 dark:text-white pr-8">
              <span className="break-words">{name}</span>
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-start font-montserrat text-gray-600 dark:text-gray-300">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 mt-4">
            {/* Hero Image */}
            <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden">
              <img
                src={image}
                alt={`${name} dance class`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Quick Info - FIXED for mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 dark:bg-surface-dark-muted rounded-lg border border-brand-100/50 dark:border-brand-700/30">
                <User className="h-4 sm:h-5 w-4 sm:w-5 text-brand-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-montserrat font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    Instruktør
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-montserrat truncate">
                    {instructor}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 dark:bg-surface-dark-muted rounded-lg border border-brand-100/50 dark:border-brand-700/30">
                <Users className="h-4 sm:h-5 w-4 sm:w-5 text-brand-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-montserrat font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    Alder
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-montserrat">
                    {age}
                  </div>
                </div>
              </div>
            </div>

            {/* Extended Description */}
            <div className="prose dark:prose-invert max-w-none">
              <div
                className={`p-3 sm:p-4 ${colors.bg} rounded-lg border ${colors.border}`}
              >
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Heart className={`h-4 w-4 text-brand-500 flex-shrink-0`} />
                  <span
                    className={`font-montserrat font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base`}
                  >
                    Hva du lærer:
                  </span>
                </div>
                <ul
                  className={`text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1 font-montserrat`}
                >
                  <li>• Grunnleggende teknikker og bevegelser</li>
                  <li>• Rytme og musikktolkning</li>
                  <li>• Selvtillit og kroppsbeherskelse</li>
                  <li>• Kreativt uttrykk og improvisasjon</li>
                </ul>
              </div>
            </div>

            {/* Schedule - FIXED responsive layout */}
            <div>
              <h3 className="text-base sm:text-lg font-bebas mb-3 sm:mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-brand-500" />
                Tidspunkt
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {schedule.map((session, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 ${colors.bg} ${colors.border} border rounded-lg`}
                  >
                    {/* Mobile: Stacked layout */}
                    <div className="flex flex-col space-y-2 sm:hidden">
                      <div className={`text-gray-700 dark:text-gray-200 font-montserrat font-semibold text-sm`}>
                        {session.day} uke 35
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                          <Clock className="h-3 w-3 flex-shrink-0" />
                          <span className="font-montserrat text-xs">{session.time}</span>
                        </div>
                        {(session.studio || studio) && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-600 dark:text-gray-300 font-montserrat">
                              {session.studio || studio}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Desktop: Horizontal layout */}
                    <div className="hidden sm:flex sm:justify-between sm:items-center">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className={`text-gray-700 dark:text-gray-200 font-montserrat font-semibold`}>
                          {session.day} uke 35
                        </div>
                        <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                          <Clock className="h-4 w-4" />
                          <span className="font-montserrat">{session.time}</span>
                        </div>
                      </div>
                      {(session.studio || studio) && (
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300 font-montserrat">
                            {session.studio || studio}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Info - FIXED responsive spacing */}
            <div
              className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                           dark:from-brand-900/10 dark:to-surface-dark-muted 
                           p-4 sm:p-6 rounded-xl border border-brand-100/50 dark:border-brand-700/30 relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-magenta-400/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-400/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <h4 className="font-bebas text-base sm:text-lg mb-2 text-gray-900 dark:text-white">
                  Klar for å begynne?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4 font-montserrat text-sm sm:text-base">
                  Bli med på en prøvetime og opplev gleden ved dans. I uke 35 og
                  36 kan du prøve så mange klasser du vil helt gratis. Ingen
                  påmelding nødvendig. Timeplanen kommer snart!
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/registration" className="flex-1">
                    <Button
                      className="w-full font-semibold bg-brand-500 hover:bg-brand-600
                                     dark:bg-white dark:hover:bg-brand-600/80
                                     text-white dark:text-brand-600
                                     dark:hover:text-white/90 transition-all duration-200 text-sm sm:text-base"
                    >
                      Påmelding
                    </Button>
                  </Link>
                  <Link to="/kontakt" className="flex-1">
                    <Button
                      className="w-full font-medium bg-transparent border-2 border-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-600
                                     dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-400 text-sm sm:text-base"
                    >
                      Kontakt oss
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4 sm:mt-6">
            <Button
              className="w-full font-medium bg-transparent border-2 border-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-600
                        dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-400 text-sm sm:text-base"
              onClick={() => setIsModalOpen(false)}
            >
              Lukk
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}