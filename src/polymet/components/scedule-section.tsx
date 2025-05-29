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
  getClassDuration,
  getClassColorScheme,
} from "../data/dance-studio-schedule-data";

export default function ScheduleSection() {
  const [filter, setFilter] = useState("alle");
  const [currentView, setCurrentView] = useState("weekly");
  const [selectedDay, setSelectedDay] = useState(DAYS_OF_WEEK[0]);

  // Filter classes based on selected filter - FIKSET TIL NORSK
  const filteredClasses = WEEKLY_SCHEDULE.filter((classItem) => {
    if (filter === "alle") return true;
    if (filter === "nybegynner") return classItem.level === "Nybegynner";
    if (filter === "erfaren") return classItem.level === "Erfaren";
    if (filter === "avansert") return classItem.level === "Avansert";
    if (filter === "barn") return classItem.ageGroup === "Barn";
    if (filter === "ungdom") return classItem.ageGroup === "Ungdom";
    if (filter === "voksne") return classItem.ageGroup === "Voksne";
    return true;
  });

  // Handle class click
  const handleClassClick = (classId: number) => {
    const selectedClass = WEEKLY_SCHEDULE.find((c) => c.id === classId);
    if (selectedClass) {
      alert(
        `Kurs: ${selectedClass.className}\nInstruktør: ${selectedClass.instructor}\nNivå: ${selectedClass.level}\nTime: ${selectedClass.startTime} - ${selectedClass.endTime}`
      );
      // In a real application, this would navigate to a class details page
    }
  };

  // Render the weekly view content
  const renderWeeklyView = () => (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Days Header */}
      <div className="grid grid-cols-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="p-3 border-r border-gray-200 dark:border-gray-700 font-medium text-center text-sm text-gray-500 dark:text-gray-400">
          Tid
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
              className="grid grid-cols-8 border-t border-gray-200 dark:border-gray-700"
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
          Forrige
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
          Neste
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Studios Header */}
      <div className="grid grid-cols-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="p-3 border-r border-gray-200 dark:border-gray-700 font-medium text-center text-sm text-gray-500 dark:text-gray-400">
          Tid
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
            className="grid grid-cols-4 border-t border-gray-200 dark:border-gray-700"
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
        <h2 className="text-3xl font-bold mb-4">Timeplan</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Utforsk våre ukentlige og daglige danseklasser. Finn den perfekte
          timen for deg, enten du er nybegynner eller erfaren danser. Vårt
          studio tilbyr et variert utvalg av klasser for alle aldre og nivåer.
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
            <TabsTrigger value="weekly">Ukentlig visning</TabsTrigger>
            <TabsTrigger value="daily">Daglig visning</TabsTrigger>
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
              <SelectValue placeholder="Filter klasser" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alle">Alle kurs</SelectItem>
              <SelectItem value="nybegynner">Nybegynner</SelectItem>
              <SelectItem value="erfaren">Erfaren</SelectItem>
              <SelectItem value="avansert">Avansert</SelectItem>
              <SelectItem value="barn">Barn</SelectItem>
              <SelectItem value="ungdom">Ungdom</SelectItem>
              <SelectItem value="voksne">Voksne</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}