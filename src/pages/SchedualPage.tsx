import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ScrollToTop from "@/helpers/ScrollToTop";
import { Download } from "lucide-react";
import {
  fetchSchedulesWithClasses,
  getThemeFromClass,
  getScheduleDuration,
  getThemeColors,
  STUDIO_ROOMS,
  DAYS_OF_WEEK,
  TIME_SLOTS,
  THEMES,
  type ScheduleWithClass,
} from "../services/scheduleServices";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function SchedualPage() {
  const [selectedDay, setSelectedDay] = useState("Mandag");
  const [themeFilter, setThemeFilter] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>(STUDIO_ROOMS[0]);
  const [isInitialized, setIsInitialized] = useState(false);
  // Ny state for desktop sal-filter
  const [selectedRooms, setSelectedRooms] = useState<string[]>(STUDIO_ROOMS);

  const [schedules, setSchedules] = useState<ScheduleWithClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch schedules from Appwrite
  const fetchSchedules = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchSchedulesWithClasses();
      setSchedules(data);
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setError("Kunne ikke laste timeplan fra databasen.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSchedules();
  }, []);

  // Initialize selected rooms when STUDIO_ROOMS changes
  useEffect(() => {
    // Kun kjør på mount (component initialization)
    if (STUDIO_ROOMS.length > 0 && !isInitialized) {
      setSelectedRooms(STUDIO_ROOMS.slice(0, Math.min(2, STUDIO_ROOMS.length)));
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Filter schedules based on day and theme
  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const dayMatch = schedule.day === selectedDay;
      const themeMatch =
        !themeFilter || getThemeFromClass(schedule.dance_class) === themeFilter;

      return dayMatch && themeMatch;
    });
  }, [schedules, selectedDay, themeFilter]);

  // Create schedule index for efficient lookup - mobile (filtered by day)
  const scheduleIndex = useMemo(() => {
    const map: Record<string, Record<string, ScheduleWithClass>> = {};

    filteredSchedules.forEach((schedule) => {
      if (!map[schedule.room]) map[schedule.room] = {};
      map[schedule.room][schedule.start_time] = schedule;
    });

    return map;
  }, [filteredSchedules]);

  // Create full schedule index for desktop (all days, only theme filtered)
  const fullScheduleIndex = useMemo(() => {
    const allSchedules = schedules.filter((schedule) => {
      const themeMatch =
        !themeFilter || getThemeFromClass(schedule.dance_class) === themeFilter;
      return themeMatch;
    });

    const map: Record<
      string,
      Record<string, Record<string, ScheduleWithClass>>
    > = {};

    allSchedules.forEach((schedule) => {
      if (!map[schedule.day]) map[schedule.day] = {};
      if (!map[schedule.day][schedule.room])
        map[schedule.day][schedule.room] = {};
      map[schedule.day][schedule.room][schedule.start_time] = schedule;
    });

    return map;
  }, [schedules, themeFilter]);

  // Room selector component - Simple buttons like theme filter
  const RoomSelector = () => (
    <div className="hidden lg:flex justify-center mb-6">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => setSelectedRooms(STUDIO_ROOMS)}
          size="sm"
          className={`font-montserrat font-medium rounded-full transition-all duration-200 ${
            selectedRooms.length === STUDIO_ROOMS.length
              ? "bg-brand-500 text-white shadow-brand"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Alle saler
        </Button>
        <Button
          onClick={() => setSelectedRooms([])}
          size="sm"
          className={`font-montserrat font-medium rounded-full transition-all duration-200 ${
            selectedRooms.length === 0
              ? "bg-coral-500 text-white shadow-lg shadow-coral-500/25"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Fjern alle
        </Button>
        {STUDIO_ROOMS.map((room, index) => (
          <motion.div
            key={room}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Button
              onClick={() => {
                const isSelected = selectedRooms.includes(room);
                setSelectedRooms(
                  isSelected
                    ? selectedRooms.filter((r) => r !== room)
                    : [...selectedRooms, room],
                );
              }}
              size="sm"
              className={`font-montserrat font-medium rounded-full transition-all duration-200 ${
                selectedRooms.includes(room)
                  ? "bg-magenta-500 text-white shadow-lg shadow-magenta-500/25"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {room}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Helper function to check if a time slot is occupied by a longer schedule
  const isTimeSlotOccupied = (
    room: string,
    time: string,
    day?: string,
  ): boolean => {
    const timeIndex = TIME_SLOTS.indexOf(time);
    if (timeIndex === 0) return false; // First slot can't be occupied by previous

    // Check previous time slots for schedules that extend into this one
    for (let i = timeIndex - 1; i >= 0; i--) {
      const previousTime = TIME_SLOTS[i];
      let schedule;

      if (day) {
        // Desktop: check fullScheduleIndex
        schedule = fullScheduleIndex[day]?.[room]?.[previousTime];
      } else {
        // Mobile: check scheduleIndex
        schedule = scheduleIndex[room]?.[previousTime];
      }

      if (schedule) {
        const duration = getScheduleDuration(schedule);
        const endSlotIndex = i + duration;
        if (endSlotIndex > timeIndex) {
          return true; // This slot is occupied by the schedule
        }
      }
    }
    return false;
  };

  const renderSchedule = (
    room: string,
    time: string,
    isDesktop: boolean = false,
    day?: string,
  ) => {
    let schedule;

    if (isDesktop && day) {
      // For desktop: bruk fullScheduleIndex med spesifikk dag
      schedule = fullScheduleIndex[day]?.[room]?.[time];
    } else {
      // For mobil: bruk scheduleIndex (filtrert på selectedDay)
      schedule = scheduleIndex[room]?.[time];
    }

    if (!schedule) return null;

    const duration = getScheduleDuration(schedule);
    const theme = getThemeFromClass(schedule.dance_class);
    const themeColors = getThemeColors(theme as keyof typeof THEMES);

    // Bruk substitute_instructor hvis den finnes
    const instructor =
      schedule.substitute_instructor || schedule.dance_class.instructor;

    // Kompakt høyde: desktop 64px, mobil 40px per slot
    const heightInPx = isDesktop
      ? duration * 64 + (duration - 1) * 1 // Desktop: 64px per slot
      : duration * 40 + (duration - 1) * 1; // Mobil: 40px per slot (kompakt)

    return (
      <motion.div
        key={schedule.$id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 ${isDesktop ? "rounded-lg px-2 py-1" : "rounded px-1.5 py-0.5"} font-montserrat
                   ${themeColors.color} ${themeColors.textColor} 
                   shadow-md hover:shadow-lg transition-all duration-200
                   cursor-pointer hover:scale-[1.01] z-10`}
        style={{ height: `${heightInPx}px` }}
        title={`${schedule.dance_class.name} - ${schedule.start_time} til ${schedule.end_time}`}
      >
        {/* Kursnavn - kompakt */}
        <div
          className={`font-bold ${isDesktop ? "text-xs" : "text-xs"} leading-none ${isDesktop ? "mb-1" : "mb-0.5"}`}
        >
          <span className="line-clamp-1 truncate">
            {schedule.dance_class.name}
          </span>
        </div>

        {/* Instruktør - kun på desktop */}
        {isDesktop && instructor && (
          <div className="text-xs opacity-80 mb-1 truncate">
            {instructor}
            {schedule.substitute_instructor && (
              <span className="text-xs opacity-75"> (V)</span>
            )}
          </div>
        )}

        {/* Tid - kompakt format */}
        <div
          className={`${isDesktop ? "text-xs" : "text-xs"} font-medium leading-none`}
        >
          {isDesktop
            ? `${schedule.start_time.substring(0, 5)}-${schedule.end_time.substring(0, 5)}`
            : `${schedule.start_time.substring(0, 5)} - ${schedule.end_time.substring(0, 5)}`}
        </div>

        {/* Kapasitet - kun på desktop hvis plass */}
        {isDesktop &&
          schedule.maxStudents &&
          schedule.maxStudents > 0 &&
          duration > 1 && (
            <div className="text-xs mt-1 font-medium text-gray-900 dark:text-white">
              {schedule.currentStudents || 0}/{schedule.maxStudents}
            </div>
          )}
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">
            Laster timeplan...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h2 className="font-bebas text-bebas-lg text-red-800 dark:text-red-200 mb-2">
              Kunne ikke laste timeplan
            </h2>
            <p className="text-red-600 dark:text-red-300 font-montserrat mb-4">
              {error}
            </p>
            <Button
              onClick={fetchSchedules}
              className="font-semibold bg-red-600 hover:bg-red-700 text-white"
            >
              Prøv igjen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <ScrollToTop />

      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-brand-50/80 to-surface-muted 
                        dark:from-brand-900/10 dark:to-surface-dark-muted 
                        pt-24 pb-16 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-magenta-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1
              className="text-xl font-medium text-brand-600 dark:text-brand-400 
                          uppercase tracking-wider mb-3"
            >
              Timeplan
            </h1>
            <h2 className="font-bebas font-semibold text-bebas-xl md:text-bebas-2xl mb-6 text-gray-900 dark:text-white">
              Våre dansetimer
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat leading-relaxed">
              Se når dine favorittklasser går og finn den perfekte tiden for
              deg.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeplan Section */}
      <section
        className="py-16 bg-gradient-to-br from-brand-50/80 to-surface-muted 
                         dark:from-brand-900/10 dark:to-surface-dark-muted"
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 space-y-6"
          >
            {/* Day selector - skjult på desktop */}
            <div className="lg:hidden flex flex-wrap gap-2 justify-center">
              {DAYS_OF_WEEK.map((day, index) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => setSelectedDay(day)}
                    className={`font-montserrat font-medium rounded-full px-6 py-3 transition-all duration-200 ${
                      selectedDay === day
                        ? "bg-brand-500 hover:bg-brand-600 text-white shadow-brand"
                        : "bg-white dark:bg-surface-dark border-2 border-brand-300 dark:border-brand-700 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30"
                    }`}
                  >
                    {day}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Theme filter og room selector */}
            <div className="flex gap-4 flex-wrap justify-center items-center">
              {/* Theme filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setThemeFilter(null)}
                  size="sm"
                  className={`font-montserrat font-medium rounded-full transition-all duration-200 ${
                    !themeFilter
                      ? "bg-gray-800 dark:bg-white text-white dark:text-gray-900"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  Alle temaer
                </Button>
                {Object.entries(THEMES).map(([theme, colors], index) => (
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Button
                      onClick={() => setThemeFilter(theme)}
                      size="sm"
                      className={`font-montserrat font-medium rounded-full transition-all duration-200 ${
                        themeFilter === theme
                          ? `${colors.color} ${colors.textColor} shadow-brand`
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {theme}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Room selector - kun synlig på mobil */}
              <select
                className="md:hidden bg-white dark:bg-surface-dark border-2 border-brand-300 dark:border-brand-700 
                          text-brand-600 dark:text-brand-400 px-4 py-2 rounded-xl font-montserrat
                          focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
              >
                {STUDIO_ROOMS.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Room Selector for Desktop */}
          <RoomSelector />

          {/* Download Schedule Component */}
          <div className="flex justify-center mb-4">
            <Button
              onClick={() => {
                // Last ned statisk bilde av timeplan
                const link = document.createElement("a");
                link.href = "/Urban-Studios-Timeplan.pdf";
                link.download = "Urban-Studios-Timeplan.pdf";
                link.click();
              }}
              variant="outline"
              size="sm"
              className="font-montserrat font-medium rounded-full 
                        border-brand-300 text-brand-600 
                        hover:bg-brand-50 hover:text-brand-700
                        dark:border-brand-700 dark:text-brand-400 
                        dark:hover:bg-brand-900/30 dark:hover:text-brand-300
                        transition-all duration-200"
            >
              <Download className="mr-2 h-4 w-4" />
              Last ned timeplan
            </Button>
          </div>

          {/* Schedule Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-surface-dark rounded-2xl shadow-brand-lg 
                      border border-brand-100/50 dark:border-brand-700/30 overflow-hidden"
          >
            {/* Mobile View - Under lg (screen only) */}
            <div className="lg:hidden print:hidden">
              <div className="bg-brand-50 dark:bg-brand-900/20 p-3 border-b border-brand-200 dark:border-brand-700">
                <h3 className="font-bebas text-bebas-base font-semibold text-center text-gray-900 dark:text-white">
                  {selectedRoom} - {selectedDay}
                </h3>
              </div>

              <div className="schedule-grid grid grid-cols-[60px_1fr] gap-px bg-gray-200 dark:bg-gray-800">
                <div className="bg-gray-100 dark:bg-gray-700 font-montserrat font-medium text-center py-1.5 text-xs text-gray-700 dark:text-gray-200">
                  Tid
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 font-montserrat font-medium text-center py-1.5 text-xs text-gray-700 dark:text-gray-200">
                  Klasse
                </div>

                {TIME_SLOTS.map((time) => (
                  <React.Fragment key={`mobile-${time}`}>
                    <div className="bg-gray-50 dark:bg-gray-600 text-xs text-center py-2 font-montserrat text-gray-600 dark:text-gray-300">
                      {time.substring(0, 5)}
                    </div>
                    <div className="relative h-10 bg-white dark:bg-gray-900">
                      {!isTimeSlotOccupied(selectedRoom, time) &&
                        renderSchedule(selectedRoom, time)}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Print View - Hele uken for alle skjermstørrelser */}
            <div className="hidden print:block print:p-2">
              <div
                className="schedule-table grid gap-0 bg-gray-200 dark:bg-gray-800 print:text-xs"
                style={{
                  gridTemplateColumns: `50px repeat(${DAYS_OF_WEEK.length}, 1fr)`,
                }}
              >
                {/* Header row - Tom celle + dager */}
                <div className="bg-gray-100 dark:bg-gray-700 font-montserrat font-bold text-center py-1 text-gray-700 dark:text-gray-200 text-xs border border-gray-300">
                  Tid
                </div>
                {DAYS_OF_WEEK.map((day) => (
                  <div
                    key={`print-header-${day}`}
                    className="bg-gray-100 dark:bg-gray-700 font-montserrat font-bold text-center py-1 text-gray-700 dark:text-gray-200 text-xs border border-gray-300"
                  >
                    {day}
                  </div>
                ))}

                {/* Time slots */}
                {TIME_SLOTS.map((time) => (
                  <React.Fragment key={`print-week-row-${time}`}>
                    <div className="bg-gray-50 dark:bg-gray-600 text-xs text-center py-1 font-montserrat text-gray-600 dark:text-gray-300 flex items-center justify-center border border-gray-300">
                      {time.substring(0, 5)}
                    </div>
                    {DAYS_OF_WEEK.map((day) => {
                      return (
                        <div
                          key={`print-cell-${day}-${time}`}
                          className="relative h-8 bg-white dark:bg-gray-900 border border-gray-300"
                        >
                          {!isTimeSlotOccupied(STUDIO_ROOMS[0], time, day) &&
                            (() => {
                              // Bruk første sal eller selectedRoom for mobil
                              const roomToUse =
                                window.innerWidth < 1024
                                  ? selectedRoom
                                  : STUDIO_ROOMS[0];
                              const schedule =
                                fullScheduleIndex[day]?.[roomToUse]?.[time];
                              if (!schedule) return null;

                              // Ekstra kompakt render for print
                              const duration = getScheduleDuration(schedule);
                              const theme = getThemeFromClass(
                                schedule.dance_class,
                              );
                              const themeColors = getThemeColors(
                                theme as keyof typeof THEMES,
                              );
                              const heightInPx =
                                duration * 32 + (duration - 1) * 0;

                              return (
                                <div
                                  key={schedule.$id}
                                  className={`absolute inset-0 px-1 font-montserrat text-xs leading-tight
                                           ${themeColors.color} ${themeColors.textColor} schedule-item
                                           flex flex-col justify-center`}
                                  style={{ height: `${heightInPx}px` }}
                                >
                                  <div className="font-bold course-name truncate text-xs">
                                    {schedule.dance_class.name}
                                  </div>
                                  <div className="font-medium time text-xs">
                                    {schedule.start_time.substring(0, 5)}
                                  </div>
                                </div>
                              );
                            })()}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Desktop View - lg og større (screen only) */}
            <div className="hidden lg:block print:hidden">
              <div className="bg-brand-50 dark:bg-brand-900/20 p-4 border-b border-brand-200 dark:border-brand-700">
                <h3 className="font-bebas text-bebas-base font-semibold text-center text-gray-900 dark:text-white">
                  Timeplan -{" "}
                  {selectedRooms.length > 0
                    ? selectedRooms.join(" og ")
                    : "Ingen saler valgt"}
                </h3>
              </div>

              {selectedRooms.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <p className="font-montserrat">
                    Velg minst en sal for å vise timeplanen
                  </p>
                </div>
              ) : (
                <div
                  className="grid gap-px bg-gray-200 dark:bg-gray-800"
                  style={{
                    gridTemplateColumns: `80px repeat(${DAYS_OF_WEEK.length * selectedRooms.length}, minmax(120px, 1fr))`,
                  }}
                >
                  {/* Header row - Tom celle + dager med rom */}
                  <div className="bg-gray-100 dark:bg-gray-700 font-montserrat font-medium text-center py-3 text-gray-700 dark:text-gray-200 text-xs">
                    Tid
                  </div>
                  {DAYS_OF_WEEK.map((day) =>
                    selectedRooms.map((room: string) => (
                      <div
                        key={`header-${day}-${room}`}
                        className="bg-gray-100 dark:bg-gray-700 font-montserrat font-medium text-center py-3 text-gray-700 dark:text-gray-200 text-xs"
                      >
                        <div className="font-semibold text-xs">{day}</div>
                        <div className="text-xs opacity-75">{room}</div>
                      </div>
                    )),
                  )}

                  {/* Time slots */}
                  {TIME_SLOTS.map((time) => (
                    <React.Fragment key={`desktop-week-row-${time}`}>
                      <div className="bg-gray-50 dark:bg-gray-600 text-xs text-center py-4 font-montserrat text-gray-600 dark:text-gray-300 flex items-center justify-center">
                        {time}
                      </div>
                      {DAYS_OF_WEEK.map((day) =>
                        selectedRooms.map((room: string) => {
                          return (
                            <div
                              key={`cell-${day}-${room}-${time}`}
                              className="relative h-16 bg-white dark:bg-gray-900"
                            >
                              {!isTimeSlotOccupied(room, time, day) &&
                                (() => {
                                  const schedule =
                                    fullScheduleIndex[day]?.[room]?.[time];
                                  if (!schedule) return null;

                                  return renderSchedule(room, time, true, day);
                                })()}
                            </div>
                          );
                        }),
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-surface-dark">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="font-montserrat text-3xl md:text-4xl font-medium mb-6 text-gray-900 dark:text-white">
              Ikke sikker på hvilket kurs som passer deg?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-8 text-lg">
              Kontakt oss på kontakt@urbanstudios.no eller benytt vårt
              kontaktskjema, så hjelper vi deg med å finne det perfekte kurset
              basert på dine behov!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/kontakt" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="font-semibold rounded-full 
                            bg-white/80 border-brand-300 text-brand-700 
                            hover:bg-brand-50 hover:text-brand-800
                            dark:bg-transparent dark:border-brand-700 dark:text-brand-400 
                            dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
                >
                  Kontakt oss
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
