import React, { useState, useMemo } from "react";
import {
  STUDIO_ROOMS,
  DAYS_OF_WEEK,
  TIME_SLOTS,
  WEEKLY_SCHEDULE,
  getClassDuration,
  getClassColorScheme,
  AGE_GROUP_COLORS,
  LEVEL_COLORS,
} from "../../data/dance-studio-schedule-data";

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
        (!levelFilter || c.level === levelFilter),
    );
  }, [selectedDay, ageFilter, levelFilter]);

  const classIndex = useMemo(() => {
    const map: Record<
      string,
      Record<string, (typeof filteredSchedule)[0]>
    > = {};
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
    <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-4">
      <h1 className="text-center text-3xl md:text-4xl font-bold my-8 text-gray-900 dark:text-white">
        Timeplan Dansestudio
      </h1>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {DAYS_OF_WEEK.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedDay === day
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100"
            }`}
            aria-label={`Velg ${day}`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-4 flex-wrap justify-center">
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

        {/* Kun synlig på mobil */}
        <select
          className="bg-zinc-200 dark:bg-zinc-700 p-2 rounded md:hidden"
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
        {/* Mobilvisning: kun valgt rom */}
        <div className="md:hidden">
          <div className="grid grid-cols-[80px_minmax(250px,1fr)] gap-px bg-zinc-300 dark:bg-zinc-800">
            <div className="bg-zinc-100 dark:bg-zinc-700"></div>
            <div className="bg-zinc-100 dark:bg-zinc-700 text-center font-semibold py-2">
              {selectedRoom}
            </div>
            {TIME_SLOTS.map((time) => (
              <React.Fragment key={time}>
                <div className="bg-zinc-200 dark:bg-zinc-600 text-sm text-center py-2">
                  {time}
                </div>
                <div className="relative h-24 bg-white dark:bg-zinc-900">
                  {renderClass(selectedRoom, time)}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Desktopvisning: alle rom */}
        <div className="hidden md:block max-w-7xl mx-auto">
          <div
            className={`grid`}
            style={{
              gridTemplateColumns: `80px repeat(${STUDIO_ROOMS.length}, minmax(200px, 1fr))`,
            }}
          >
            <div className="bg-zinc-100 dark:bg-zinc-700"></div>
            {STUDIO_ROOMS.map((room) => (
              <div
                key={`header-${room}`}
                className="bg-zinc-100 dark:bg-zinc-700 text-center font-semibold py-2"
              >
                {room}
              </div>
            ))}

            {TIME_SLOTS.map((time) => (
              <React.Fragment key={`row-${time}`}>
                <div className="bg-zinc-200 dark:bg-zinc-600 text-sm text-center py-2">
                  {time}
                </div>
                {STUDIO_ROOMS.map((room) => (
                  <div
                    key={`cell-${room}-${time}`}
                    className="relative h-24 bg-white dark:bg-zinc-900"
                  >
                    {renderClass(room, time)}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
