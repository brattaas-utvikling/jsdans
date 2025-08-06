// src/components/DanceClassCard.tsx
import React from "react";
import { Clock, Users, Star, Calendar } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import type { DanceClass, Schedule } from "../types";

interface DanceClassCardProps {
  danceClass: DanceClass;
  schedules?: Schedule[];
  onSelectSchedule?: (schedule: Schedule) => void;
  selectedSchedules?: string[];
  showSchedules?: boolean;
}

export const DanceClassCard: React.FC<DanceClassCardProps> = ({
  danceClass,
  schedules = [],
  onSelectSchedule,
  selectedSchedules = [],
  showSchedules = true,
}) => {
  const availableSchedules = schedules.filter(
    (schedule) => schedule.danceClassId === danceClass.$id && schedule.isActive,
  );

  const getAvailableSpots = (schedule: Schedule): number => {
    return schedule.maxStudents - schedule.currentStudents;
  };

  const isScheduleSelected = (scheduleId: string): boolean => {
    return selectedSchedules.includes(scheduleId);
  };

  const handleScheduleClick = (schedule: Schedule): void => {
    if (getAvailableSpots(schedule) > 0) {
      onSelectSchedule?.(schedule);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header with image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={danceClass.image}
          alt={danceClass.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="primary" className={`${danceClass.color} border-0`}>
            {danceClass.level}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="default" className="bg-white/90 text-gray-800">
            {danceClass.age}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Title and duration */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {danceClass.name}
          </h3>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {danceClass.duration} min
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center mb-3 text-gray-600">
          <Star className="w-4 h-4 mr-2" />
          <span className="text-sm">Instruktør: {danceClass.instructor}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {danceClass.description}
        </p>

        {/* Schedules */}
        {showSchedules && availableSchedules.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center text-gray-700 text-sm font-medium mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Tilgjengelige timer:
            </div>

            {availableSchedules.map((schedule) => {
              const availableSpots = getAvailableSpots(schedule);
              const isSelected = isScheduleSelected(schedule.$id);
              const isFull = availableSpots === 0;

              return (
                <div
                  key={schedule.$id}
                  onClick={() => handleScheduleClick(schedule)}
                  className={`
                    p-3 rounded-lg border-2 transition-all cursor-pointer
                    ${
                      isSelected
                        ? "border-purple-500 bg-purple-50"
                        : isFull
                          ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                          : "border-gray-200 hover:border-purple-300 hover:bg-purple-25"
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">
                        {schedule.day} {schedule.startTime} - {schedule.endTime}
                      </div>
                      {schedule.room && (
                        <div className="text-sm text-gray-500">
                          {schedule.room}
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        <span
                          className={
                            availableSpots <= 3
                              ? "text-primary-600 font-medium"
                              : ""
                          }
                        >
                          {availableSpots} ledige
                        </span>
                      </div>
                      {availableSpots <= 3 && availableSpots > 0 && (
                        <Badge variant="warning" className="mt-1">
                          Få plasser!
                        </Badge>
                      )}
                      {isFull && (
                        <Badge variant="danger" className="mt-1">
                          Fullt
                        </Badge>
                      )}
                      {isSelected && (
                        <Badge variant="success" className="mt-1">
                          Valgt
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No schedules available */}
        {showSchedules && availableSchedules.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              {danceClass.availableFromYear > 2025
                ? `Starter i ${danceClass.availableFromYear}`
                : "Ingen timer tilgjengelig for øyeblikket"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
