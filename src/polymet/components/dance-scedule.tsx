import { useState, useMemo } from "react";
import {
  STUDIO_ROOMS,
  DAYS_OF_WEEK,
  TIME_SLOTS,
  WEEKLY_SCHEDULE,
  getClassDuration,
  getClassColorScheme,
  AGE_GROUP_COLORS,
  LEVEL_COLORS,
} from "../data/dance-studio-schedule-data";

export default function DanceSchedule() {
  const [selectedDay, setSelectedDay] = useState("Mandag");
  const [ageFilter, setAgeFilter] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>(STUDIO_ROOMS[0]);

  const filteredSchedule = useMemo(() => {
    return WEEKLY_SCHEDULE.filter(
      (c) =>
        c.day === selectedDay &&
        (!ageFilter || c.ageGroup === ageFilter) &&
        (!levelFilter || c.level === levelFilter) &&
        c.room === selectedRoom
    );
  }, [selectedDay, ageFilter, levelFilter, selectedRoom]);

  const classIndex = useMemo(() => {
    const map: Record<string, Record<string, typeof filteredSchedule[0]>> = {};
    filteredSchedule.forEach((c) => {
      if (!map[c.room]) map[c.room] = {};
      map[c.room][c.startTime] = c;
    });
    return map;
  }, [filteredSchedule]);

  const renderClass = (room: string, time: string) => {
    const classItem = classIndex[room]?.[time];
    if (!classItem) return null;

    const duration = getClassDuration(classItem);
    const colors = getClassColorScheme(classItem);

    return (
      <div
        className={`absolute top-0 left-0 w-full h-full rounded-xl border px-2 py-1 text-xs ${colors.bg} ${colors.border} ${colors.text}`}
        style={{ gridRowEnd: `span ${duration}` }}
        key={classItem.id}
      >
        <div className="font-semibold text-sm">{classItem.className}</div>
        <div>{classItem.instructor}</div>
        <div className="text-xs">
          {classItem.startTime} - {classItem.endTime}
        </div>
        <div className="text-xs italic">
          {classItem.level} / {classItem.ageGroup}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Timeplan</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Utforsk våre ukentlige og daglige danseklasser. Finn den perfekte
          timen for deg, enten du er nybegynner eller erfaren danser. Vårt
          studio tilbyr et variert utvalg av klasser for alle aldre og nivåer.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {DAYS_OF_WEEK.map((day) => (
          <button
            key={day}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedDay === day
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "bg-zinc-200 dark:bg-zinc-700"
            }`}
            onClick={() => setSelectedDay(day)}
            aria-label={`Velg ${day}`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          className="bg-zinc-200 dark:bg-zinc-700 p-2 rounded"
          value={ageFilter || ""}
          onChange={(e) => setAgeFilter(e.target.value || null)}
        >
          <option value="">Alle aldre</option>
          {Object.keys(AGE_GROUP_COLORS).map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        <select
          className="bg-zinc-200 dark:bg-zinc-700 p-2 rounded"
          value={levelFilter || ""}
          onChange={(e) => setLevelFilter(e.target.value || null)}
        >
          <option value="">Alle nivåer</option>
          {Object.keys(LEVEL_COLORS).map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <select
          className="bg-zinc-200 dark:bg-zinc-700 p-2 rounded"
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

      <div className="overflow-x-auto">
        <div className="grid grid-cols-[80px_minmax(200px,1fr)] sm:grid-cols-[80px_minmax(250px,1fr)] md:grid-cols-[80px_minmax(300px,1fr)] gap-px bg-zinc-300 dark:bg-zinc-800">
          <div className="bg-zinc-100 dark:bg-zinc-700"></div>
          <div className="bg-zinc-100 dark:bg-zinc-700 text-center font-semibold py-2">
            {selectedRoom}
          </div>
          {TIME_SLOTS.map((time) => (
            <>
              <div
                key={`time-${time}`}
                className="bg-zinc-200 dark:bg-zinc-600 text-sm text-center py-2"
              >
                {time}
              </div>
              <div
                key={`slot-${time}-${selectedRoom}`}
                className="relative h-24 bg-white dark:bg-zinc-900"
              >
                {renderClass(selectedRoom, time)}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
