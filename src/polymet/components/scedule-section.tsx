import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduleCard from "./schedule-card";
import {
  DAYS_OF_WEEK,
  TIME_SLOTS,
  STUDIO_ROOMS,
  WEEKLY_SCHEDULE,
  // getClassesForTimeSlot,
  getClassDuration,
  getClassColorScheme,
} from "../data/dance-studio-schedule-data";

export default function ScheduleSection() {
  const [filter, setFilter] = useState("all");
  const [currentView, setCurrentView] = useState("weekly");
  const [selectedDay, setSelectedDay] = useState(DAYS_OF_WEEK[0]);

  // Filter classes based on selected filter
  const filteredClasses = WEEKLY_SCHEDULE.filter((classItem) => {
    if (filter === "all") return true;
    if (filter === "beginner") return classItem.level === "Beginner";
    if (filter === "intermediate") return classItem.level === "Intermediate";
    if (filter === "advanced") return classItem.level === "Advanced";
    if (filter === "kids") return classItem.ageGroup === "Kids";
    if (filter === "teens") return classItem.ageGroup === "Teens";
    if (filter === "adults") return classItem.ageGroup === "Adults";
    return true;
  });

  // Handle class click
  const handleClassClick = (classId: number) => {
    const selectedClass = WEEKLY_SCHEDULE.find((c) => c.id === classId);
    if (selectedClass) {
      alert(
        `Class: ${selectedClass.className}\nInstructor: ${selectedClass.instructor}\nLevel: ${selectedClass.level}\nTime: ${selectedClass.startTime} - ${selectedClass.endTime}`
      );
      // In a real application, this would navigate to a class details page
    }
  };

  // Render the weekly view content
  const renderWeeklyView = () => (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Days Header */}
      <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-800/50">
        <div className="p-3 border-r border-gray-200 dark:border-gray-700 font-medium text-center text-sm text-gray-500 dark:text-gray-400">
          Time
        </div>
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="p-3 border-r last:border-r-0 border-gray-200 dark:border-gray-700 font-medium text-center text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Schedule Grid */}
      <ScrollArea className="h-[600px]">
        <div className="min-w-[800px]">
          {TIME_SLOTS.map((timeSlot) => (
            <div
              key={timeSlot}
              className="grid grid-cols-7 border-t border-gray-200 dark:border-gray-700"
            >
              {/* Time Column */}
              <div className="p-2 border-r border-gray-200 dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-400">
                {timeSlot}
              </div>

              {/* Days Columns */}
              {DAYS_OF_WEEK.map((day) => {
                const classesInSlot = filteredClasses.filter(
                  (c) => c.day === day && c.startTime === timeSlot
                );

                return (
                  <div
                    key={`${day}-${timeSlot}`}
                    className="p-1 border-r last:border-r-0 border-gray-200 dark:border-gray-700 min-h-[80px] relative"
                  >
                    {classesInSlot.map((classItem) => {
                      const duration = getClassDuration(classItem);
                      const colorScheme = getClassColorScheme(classItem);

                      return (
                        <ScheduleCard
                          key={classItem.id}
                          className={classItem.className}
                          startTime={classItem.startTime}
                          endTime={classItem.endTime}
                          level={classItem.level}
                          ageGroup={classItem.ageGroup}
                          instructor={classItem.instructor}
                          room={classItem.room}
                          colorScheme={colorScheme}
                          rowSpan={duration}
                          currentEnrollment={classItem.currentEnrollment}
                          maxCapacity={classItem.maxCapacity}
                          onClick={() => handleClassClick(classItem.id)}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );

  // Render the daily view content
  const renderDailyView = () => (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Day Selection */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const currentIndex = DAYS_OF_WEEK.indexOf(selectedDay);
            const prevIndex =
              (currentIndex - 1 + DAYS_OF_WEEK.length) % DAYS_OF_WEEK.length;
            setSelectedDay(DAYS_OF_WEEK[prevIndex]);
          }}
        >
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <h3 className="font-medium">{selectedDay}</h3>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const currentIndex = DAYS_OF_WEEK.indexOf(selectedDay);
            const nextIndex = (currentIndex + 1) % DAYS_OF_WEEK.length;
            setSelectedDay(DAYS_OF_WEEK[nextIndex]);
          }}
        >
          Next
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Studios Header */}
      <div className="grid grid-cols-3 bg-gray-50 dark:bg-gray-800/50">
        <div className="p-3 border-r border-gray-200 dark:border-gray-700 font-medium text-center text-sm text-gray-500 dark:text-gray-400">
          Time
        </div>
        {STUDIO_ROOMS.map((room) => (
          <div
            key={room}
            className="p-3 border-r last:border-r-0 border-gray-200 dark:border-gray-700 font-medium text-center text-sm"
          >
            {room}
          </div>
        ))}
      </div>

      {/* Daily Schedule Grid */}
      <div className="h-[600px] overflow-y-auto">
        {TIME_SLOTS.map((timeSlot) => (
          <div
            key={timeSlot}
            className="grid grid-cols-3 border-t border-gray-200 dark:border-gray-700"
          >
            {/* Time Column */}
            <div className="p-2 border-r border-gray-200 dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-400">
              {timeSlot}
            </div>

            {/* Studio Columns */}
            {STUDIO_ROOMS.map((room) => {
              const classesInSlot = filteredClasses.filter(
                (c) =>
                  c.day === selectedDay &&
                  c.startTime === timeSlot &&
                  c.room === room
              );

              return (
                <div
                  key={`${room}-${timeSlot}`}
                  className="p-1 border-r last:border-r-0 border-gray-200 dark:border-gray-700 min-h-[80px]"
                >
                  {classesInSlot.map((classItem) => {
                    const colorScheme = getClassColorScheme(classItem);

                    return (
                      <ScheduleCard
                        key={classItem.id}
                        className={classItem.className}
                        startTime={classItem.startTime}
                        endTime={classItem.endTime}
                        level={classItem.level}
                        ageGroup={classItem.ageGroup}
                        instructor={classItem.instructor}
                        room={classItem.room}
                        colorScheme={colorScheme}
                        currentEnrollment={classItem.currentEnrollment}
                        maxCapacity={classItem.maxCapacity}
                        onClick={() => handleClassClick(classItem.id)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Weekly Class Schedule</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Find the perfect class for your schedule. Our weekly timetable shows
          all available classes across our studios. Click on any class for more
          details or to sign up.
        </p>
      </div>

      {/* Filter and View Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Tabs
          defaultValue="weekly"
          value={currentView}
          onValueChange={setCurrentView}
          className="w-full md:w-auto"
        >
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
            <TabsTrigger value="daily">Daily View</TabsTrigger>
          </TabsList>

          {/* Content moved inside Tabs component */}
          <div className="mt-6">
            <TabsContent value="weekly">{renderWeeklyView()}</TabsContent>
            <TabsContent value="daily">{renderDailyView()}</TabsContent>
          </div>
        </Tabs>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FilterIcon className="h-4 w-4 text-gray-500" />

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="beginner">Beginner Level</SelectItem>
              <SelectItem value="intermediate">Intermediate Level</SelectItem>
              <SelectItem value="advanced">Advanced Level</SelectItem>
              <SelectItem value="kids">Kids Classes</SelectItem>
              <SelectItem value="teens">Teen Classes</SelectItem>
              <SelectItem value="adults">Adult Classes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
