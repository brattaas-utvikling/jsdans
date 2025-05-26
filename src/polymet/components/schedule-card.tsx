import { Clock, User, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ScheduleCardProps = {
  className: string;
  startTime: string;
  endTime: string;
  level: string;
  ageGroup: string;
  instructor: string;
  room: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
  };
  rowSpan?: number;
  currentEnrollment?: number;
  maxCapacity?: number;
  onClick?: () => void;
};

export default function ScheduleCard({
  className,
  startTime,
  endTime,
  level,
  // ageGroup,
  instructor,
  room,
  colorScheme,
  rowSpan = 1,
  currentEnrollment,
  maxCapacity,
  onClick,
}: ScheduleCardProps) {
  const gridRowSpan = rowSpan > 1 ? `row-span-${rowSpan}` : "";
  const availableSpots =
    maxCapacity && currentEnrollment ? maxCapacity - currentEnrollment : null;
  const isAlmostFull = availableSpots !== null && availableSpots <= 3;

  return (
    <div
      className={cn(
        "flex flex-col p-3 rounded-lg border transition-all duration-200 h-full",
        colorScheme.bg,
        colorScheme.border,
        gridRowSpan,
        "hover:shadow-md hover:scale-[1.02] cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className={cn("font-medium text-sm", colorScheme.text)}>
          {className}
        </h4>
        <Badge
          variant="outline"
          className={cn("text-xs font-normal", colorScheme.text)}
        >
          {level}
        </Badge>
      </div>

      <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 mb-1">
        <Clock className="h-3 w-3 mr-1" />
        {startTime} - {endTime}
      </div>

      <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 mb-1">
        <User className="h-3 w-3 mr-1" />

        {instructor}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">{room}</span>

        {availableSpots !== null && (
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />

            <span
              className={cn(
                "text-xs",
                isAlmostFull
                  ? "text-coral-600 dark:text-coral-400"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              {isAlmostFull
                ? `${availableSpots} spots left`
                : `${currentEnrollment}/${maxCapacity}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
