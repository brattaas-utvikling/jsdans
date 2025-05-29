import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  CalendarIcon,
  ClockIcon,
  MusicIcon,
  UserIcon,
  ZapIcon,
  WindIcon,
  BoomBox,
  MapPinIcon,
  UsersIcon,
  HeartIcon,
} from "lucide-react";

type ClassCardProps = {
  name: string;
  description: string;
  color: string;
  icon: string;
  image: string;
  schedule: Array<{
    day: string;
    time: string;
    level: string;
  }>;
  instructor: string;
  level: string;
  age: string;
};

export default function ClassCard({
  name,
  description,
  color,
  icon,
  image,
  schedule,
  instructor,
  level,
  age,
}: ClassCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const IconComponent = () => {
    switch (icon) {
      case "radio":
        return <BoomBox className="h-5 w-5" />;
      case "music":
        return <MusicIcon className="h-5 w-5" />;
      case "zap":
        return <ZapIcon className="h-5 w-5" />;
      case "wind":
        return <WindIcon className="h-5 w-5" />;
      default:
        return <MusicIcon className="h-5 w-5" />;
    }
  };

  const colorClasses = color.split(" ");
  const bgClass = colorClasses.find((c) => c.startsWith("bg-")) || "bg-purple-100";
  const textClass = colorClasses.find((c) => c.startsWith("text-")) || "text-purple-600";
  const borderClass = colorClasses.find((c) => c.startsWith("border-")) || "border-purple-300";

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={`${name} dance class`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className={`absolute top-4 left-4 ${bgClass} ${textClass} p-2 rounded-full`}
          >
            <IconComponent />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-gray-500" />
              Instruktør: {instructor}
            </div>
            <div className="flex items-center gap-2">
              <ZapIcon className="h-4 w-4 text-gray-500" />
              Nivå: {level}
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              Alder: {age}
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                Neste kurs:
              </div>
              <div className={`${bgClass} ${borderClass} border rounded-lg p-3 text-sm mt-1`}>
                <div className="flex justify-between">
                  <span className={textClass}>{schedule[0].day}</span>
                  <span className={textClass}>{schedule[0].level}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ClockIcon className="h-3 w-3 text-gray-500" />
                  <span>{schedule[0].time}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className={`w-full rounded-full ${textClass} border ${borderClass} hover:${bgClass}`}
            onClick={() => setIsModalOpen(true)}
          >
            Mer info
          </Button>
        </CardFooter>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className={`${bgClass} ${textClass} p-2 rounded-full`}>
                <IconComponent />
              </div>
              {name}
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Hero Image */}
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img
                src={image}
                alt={`${name} dance class`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                <UserIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-semibold">Instruktør</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{instructor}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                <ZapIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-semibold">Nivå</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{level}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                <UsersIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-semibold">Alder</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{age}</div>
                </div>
              </div>
            </div>

            {/* Extended Description */}
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3">Om kurset</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {name} er en fantastisk måte å uttrykke seg selv på gjennom dans. 
                Dette kurset er designet for {age.toLowerCase()} og passer perfekt for {level.toLowerCase()}-nivå. 
                Under ledelse av vår erfarne instruktør {instructor}, vil du lære grunnleggende teknikker, 
                bygge selvtillit og ha det gøy med andre som deler din lidenskap for dans.
              </p>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HeartIcon className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-blue-800 dark:text-blue-300">Hva du lærer:</span>
                </div>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Grunnleggende teknikker og bevegelser</li>
                  <li>• Rytme og musikktolkning</li>
                  <li>• Selvtillit og kroppsbeherskelse</li>
                  <li>• Kreativt uttrykk og improvisasjon</li>
                </ul>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Timeplan
              </h3>
              <div className="space-y-3">
                {schedule.map((session, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-4 ${bgClass} ${borderClass} border rounded-lg`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${textClass} font-semibold`}>{session.day}</div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <ClockIcon className="h-4 w-4" />
                        {session.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Studio A</span>
                      <span className={`px-2 py-1 ${textClass} ${bgClass} rounded-full text-xs font-medium`}>
                        {session.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Info */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl">
              <h4 className="font-semibold text-lg mb-2">Klar for å begynne?</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Bli med på en prøvetime og opplev gleden ved dans. Første time er gratis for nye deltakere!
              </p>
              <div className="flex gap-3">
                <Button className="flex-1">
                  Book prøvetime
                </Button>
                <Button variant="outline" className="flex-1">
                  Kontakt oss
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              className="w-full"
            >
              Lukk
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}