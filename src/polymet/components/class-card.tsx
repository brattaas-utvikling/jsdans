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
  CalendarIcon,
  ClockIcon,
  MusicIcon,
  UserIcon,
  ZapIcon,
  WindIcon,
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
};

export default function ClassCard({
  name,
  description,
  color,
  icon,
  image,
  schedule,
  instructor,
}: ClassCardProps) {
  // Determine which icon to use based on the icon prop
  const IconComponent = () => {
    switch (icon) {
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

  // Extract color classes
  const colorClasses = color.split(" ");
  const bgClass =
    colorClasses.find((c) => c.startsWith("bg-")) || "bg-purple-100";
  const textClass =
    colorClasses.find((c) => c.startsWith("text-")) || "text-purple-600";
  const borderClass =
    colorClasses.find((c) => c.startsWith("border-")) || "border-purple-300";

  return (
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
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="h-4 w-4 text-gray-500" />

            <span className="text-gray-700 dark:text-gray-300">
              Instructor: {instructor}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="h-4 w-4 text-gray-500" />

              <span className="text-gray-700 dark:text-gray-300">
                Next class:
              </span>
            </div>
            <div
              className={`${bgClass} ${borderClass} border rounded-lg p-3 text-sm`}
            >
              <div className="flex justify-between">
                <span className={textClass}>{schedule[0].day}</span>
                <span className={textClass}>{schedule[0].level}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <ClockIcon className="h-3 w-3 text-gray-500" />

                <span className="text-gray-700 dark:text-gray-300">
                  {schedule[0].time}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          className={`w-full rounded-full ${textClass} border-${borderClass} hover:${bgClass}`}
        >
          View Schedule
        </Button>
      </CardFooter>
    </Card>
  );
}
