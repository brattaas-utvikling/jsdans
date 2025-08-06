// src/services/scheduleService.ts

import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";

export interface DanceClass {
  $id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  image: string;
  level: string;
  age: string;
  instructor: string;
  duration: number;
  availableFromYear: number;
  type: string;
}

export interface Schedule {
  $id: string;
  dance_class_id: string;
  day: string;
  start_time: string; // Tilpasset dine feltnavn
  end_time: string; // Tilpasset dine feltnavn
  room: string;
  semester: string; // Nytt felt du la til
  maxStudents: number; // Tilpasset dine feltnavn
  currentStudents: number; // Tilpasset dine feltnavn
  isActive: boolean; // Tilpasset dine feltnavn
  special_notes?: string;
  substitute_instructor?: string;
}

export interface ScheduleWithClass extends Schedule {
  dance_class: DanceClass;
}

// Tema mapping basert på kurs type/navn
export const getThemeFromClass = (danceClass: DanceClass): string => {
  const name = danceClass.name.toLowerCase();

  if (
    name.includes("hiphop") ||
    name.includes("hip hop") ||
    name.includes("commercial")
  ) {
    return "Hiphop";
  }
  if (name.includes("jazz") && !name.includes("show")) {
    return "Jazz";
  }
  if (name.includes("ballett") || name.includes("ballet")) {
    return "Ballett";
  }
  if (name.includes("tåspiss") || name.includes("taaspiss")) {
    return "Tåspiss";
  }
  if (name.includes("moderne") || name.includes("contemporary")) {
    return "Moderne";
  }
  if (
    name.includes("show") ||
    name.includes("musikal") ||
    name.includes("kompani")
  ) {
    return "Show";
  }
  if (name.includes("styrke") || name.includes("tøy")) {
    return "Styrke";
  }
  if (
    name.includes("barnedans") ||
    name.includes("barneballett") ||
    danceClass.age.includes("2-4") ||
    danceClass.age.includes("5-6")
  ) {
    return "Toddler";
  }

  // Fallback basert på farge
  switch (danceClass.color?.toLowerCase()) {
    case "orange":
      return "Hiphop";
    case "purple":
      return "Jazz";
    case "rose":
      return "Ballett";
    case "emerald":
      return "Moderne";
    case "red":
      return "Show";
    case "slate":
      return "Styrke";
    case "cyan":
      return "Toddler";
    case "fuchsia":
      return "Tåspiss";
    default:
      return "Hiphop";
  }
};

// Hent alle aktive schedules med kurs-info
export const fetchSchedulesWithClasses = async (): Promise<
  ScheduleWithClass[]
> => {
  try {
    // Hent alle aktive schedules
    const schedulesResponse = await listDocuments(
      DATABASE_ID,
      COLLECTIONS.SCHEDULES,
      [
        Query.equal("isActive", true), // Oppdatert feltnavn
        Query.orderAsc("day"),
        Query.orderAsc("start_time"),
        Query.limit(100),
      ],
    );

    const schedules = schedulesResponse.documents as unknown as Schedule[];

    // Hent alle unike dance_class_ids
    const danceClassIds = [...new Set(schedules.map((s) => s.dance_class_id))];

    // Hent alle relevante dance classes
    const danceClassesResponse = await listDocuments(
      DATABASE_ID,
      COLLECTIONS.DANCE_CLASSES,
      [Query.equal("$id", danceClassIds), Query.limit(100)],
    );

    const danceClasses =
      danceClassesResponse.documents as unknown as DanceClass[];

    // Kombiner data
    const schedulesWithClasses: ScheduleWithClass[] = schedules
      .map((schedule) => {
        const danceClass = danceClasses.find(
          (dc) => dc.$id === schedule.dance_class_id,
        );

        if (!danceClass) {
          console.warn(`Dance class not found for schedule ${schedule.$id}`);
          return null;
        }

        return {
          ...schedule,
          dance_class: danceClass,
        };
      })
      .filter(Boolean) as ScheduleWithClass[];

    return schedulesWithClasses;
  } catch (error) {
    console.error("Error fetching schedules with classes:", error);
    throw error;
  }
};

// Hent schedules for en bestemt dag
export const fetchSchedulesByDay = async (
  day: string,
): Promise<ScheduleWithClass[]> => {
  const allSchedules = await fetchSchedulesWithClasses();
  return allSchedules.filter((schedule) => schedule.day === day);
};

// Hent schedules for et bestemt tema
export const fetchSchedulesByTheme = async (
  theme: string,
): Promise<ScheduleWithClass[]> => {
  const allSchedules = await fetchSchedulesWithClasses();
  return allSchedules.filter(
    (schedule) => getThemeFromClass(schedule.dance_class) === theme,
  );
};

// Helper: Get schedule duration in time slots (30 min slots)
export const getScheduleDuration = (schedule: Schedule): number => {
  const startMinutes = timeToMinutes(schedule.start_time);
  const endMinutes = timeToMinutes(schedule.end_time);
  const durationMinutes = endMinutes - startMinutes;

  // Each time slot is 30 minutes, so divide by 30
  const slots = durationMinutes / 30;

  return Math.max(1, slots); // Minimum 1 slot
};

// Helper: Convert time string to minutes
const timeToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

// Constants for timeplan view
export const STUDIO_ROOMS = ["Sal 1", "Sal 2"];
export const DAYS_OF_WEEK = ["Mandag", "Tirsdag", "Onsdag", "Torsdag"];
export const TIME_SLOTS = [
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

// Tema-farger - Oppdatert til å matche ClassCard
export const THEMES = {
  Hiphop: {
    color: "bg-orange-50 dark:bg-orange-700",
    textColor: "text-orange-800 dark:text-orange-200",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  Jazz: {
    color: "bg-purple-50 dark:bg-purple-700",
    textColor: "text-purple-800 dark:text-purple-200",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  Ballett: {
    color: "bg-rose-50 dark:bg-rose-700",
    textColor: "text-rose-800 dark:text-rose-200",
    borderColor: "border-rose-200 dark:border-rose-800",
  },
  Moderne: {
    color: "bg-emerald-50 dark:bg-emerald-700",
    textColor: "text-emerald-800 dark:text-emerald-200",
    borderColor: "border-emerald-200 dark:border-emerald-800",
  },
  Show: {
    color: "bg-red-50 dark:bg-red-700",
    textColor: "text-red-800 dark:text-red-200",
    borderColor: "border-red-200 dark:border-red-800",
  },
  Styrke: {
    color: "bg-slate-50 dark:bg-slate-700",
    textColor: "text-slate-800 dark:text-slate-200",
    borderColor: "border-slate-200 dark:border-slate-800",
  },
  Toddler: {
    color: "bg-cyan-50 dark:bg-cyan-700",
    textColor: "text-cyan-800 dark:text-cyan-200",
    borderColor: "border-cyan-200 dark:border-cyan-800",
  },
  Tåspiss: {
    color: "bg-fuchsia-50 dark:bg-fuchsia-700",
    textColor: "text-fuchsia-800 dark:text-fuchsia-200",
    borderColor: "border-fuchsia-200 dark:border-fuchsia-800",
  },
};

export const getThemeColors = (theme: keyof typeof THEMES) => {
  return THEMES[theme] || THEMES.Hiphop;
};
