// src/services/scheduleService.ts

import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "@/lib/appwrite";

export interface DanceClass {
  studio: string;
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
  start_time: string;
  end_time: string;
  room: string;
  semester: string;
  maxStudents: number;
  currentStudents: number;
  isActive: boolean;
  special_notes?: string;
  substitute_instructor?: string;
}

export interface ScheduleWithClass extends Schedule {
  dance_class: DanceClass;
}

// OPPDATERT: Tema mapping basert på kurs type/navn med riktige Tailwind farger
export const getThemeFromClass = (danceClass: DanceClass): string => {
  const name = danceClass.name.toLowerCase();

  // Ballett (pink)
  if (name.includes("ballett") || name.includes("ballet")) {
    return "Ballett";
  }

  // Barneballett (cyan)
  if (
    name.includes("barneballett") ||
    name.includes("barnedans") ||
    danceClass.age.includes("2-4") ||
    danceClass.age.includes("5-6")
  ) {
    return "Toddler";
  }

  // Contemporary kids (emerald)
  if (name.includes("contemporary kids") || name.includes("contemporary") && name.includes("kids")) {
    return "Moderne";
  }

  // Forkurs tåsiss (pink)
  if (name.includes("forkurs") && (name.includes("tåspiss") || name.includes("taaspiss"))) {
    return "Tåspiss"; // Bruker Tåspiss tema som også er pink
  }

  // Hip hop (orange)
  if (
    name.includes("hiphop") ||
    name.includes("hip hop") ||
    name.includes("commercial")
  ) {
    return "Hiphop";
  }

  // Jazz (purple)
  if (name.includes("jazz") && !name.includes("show")) {
    return "Jazz";
  }

  // Moderne (emerald)
  if (name.includes("moderne")) {
    return "Moderne";
  }

  // Show/Musikal (red)
  if (
    name.includes("show") ||
    name.includes("musikal")
  ) {
    return "Show";
  }

  // Streetstyle boys (orange) - samme som hip hop
  if (name.includes("streetstyle") || name.includes("street style")) {
    return "Hiphop"; // Bruker Hiphop tema som også er orange
  }

  // Styrke og tøy (yellow)
  if (name.includes("styrke") || name.includes("tøy")) {
    return "Styrke";
  }

  // Urban aspirant (gray)
  if (name.includes("urban aspirant") || name.includes("aspirant")) {
    return "UrbanAspirant";
  }

  // Urban kompani (gray)
  if (name.includes("kompani")) {
    return "UrbanKompani";
  }

  // Yoga (yellow)
  if (name.includes("yoga")) {
    return "Yoga";
  }

  // Tåspiss (pink)
  if (name.includes("tåspiss") || name.includes("taaspiss")) {
    return "Tåspiss";
  }

  // Fallback basert på farge hvis navn ikke matcher
  switch (danceClass.color?.toLowerCase()) {
    case "pink":
      return "Ballett";
    case "cyan":
      return "Toddler";
    case "emerald":
      return "Moderne";
    case "orange":
      return "Hiphop";
    case "purple":
      return "Jazz";
    case "red":
      return "Show";
    case "yellow":
      return "Styrke";
    case "gray":
      return "UrbanAspirant";
    default:
      return "Hiphop";
  }
};

// Hent alle aktive schedules med kurs-info
export const fetchSchedulesWithClasses = async (): Promise<
  ScheduleWithClass[]
> => {
  try {
    const schedulesResponse = await listDocuments(
      DATABASE_ID,
      COLLECTIONS.SCHEDULES,
      [
        Query.equal("isActive", true),
        Query.orderAsc("day"),
        Query.orderAsc("start_time"),
        Query.limit(100),
      ],
    );

    const schedules = schedulesResponse.documents as unknown as Schedule[];
    const danceClassIds = [...new Set(schedules.map((s) => s.dance_class_id))];

    const danceClassesResponse = await listDocuments(
      DATABASE_ID,
      COLLECTIONS.DANCE_CLASSES,
      [Query.equal("$id", danceClassIds), Query.limit(100)],
    );

    const danceClasses =
      danceClassesResponse.documents as unknown as DanceClass[];

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

// Helper: Get schedule duration in time slots (15 min slots)
export const getScheduleDuration = (schedule: Schedule): number => {
  const startMinutes = timeToMinutes(schedule.start_time);
  const endMinutes = timeToMinutes(schedule.end_time);
  const durationMinutes = endMinutes - startMinutes;

  // Each time slot is now 15 minutes, so divide by 15
  const slots = durationMinutes / 15;

  return Math.max(1, slots); // Minimum 1 slot
};

// Helper: Convert time string to minutes
const timeToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

// Constants for timeplan view
export const STUDIO_ROOMS = ["Sal 1", "Sal 2"];
export const DAYS_OF_WEEK = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];

// TIME_SLOTS med 15-minutters intervaller
export const TIME_SLOTS = [
  "15:30",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:15",
  "21:30",
];


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
    color: "bg-pink-50 dark:bg-pink-700",
    textColor: "text-pink-800 dark:text-pink-200",
    borderColor: "border-pink-200 dark:border-pink-800",
  },
  Tåspiss: {
    color: "bg-pink-50 dark:bg-pink-700",
    textColor: "text-pink-800 dark:text-pink-200",
    borderColor: "border-pink-200 dark:border-pink-800",
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
    color: "bg-yellow-50 dark:bg-yellow-700",
    textColor: "text-yellow-800 dark:text-yellow-200",
    borderColor: "border-yellow-200 dark:border-yellow-800",
  },
  Yoga: {
    color: "bg-yellow-50 dark:bg-yellow-700",
    textColor: "text-yellow-800 dark:text-yellow-200",
    borderColor: "border-yellow-200 dark:border-yellow-800",
  },
  Toddler: {
    color: "bg-cyan-50 dark:bg-cyan-700",
    textColor: "text-cyan-800 dark:text-cyan-200",
    borderColor: "border-cyan-200 dark:border-cyan-800",
  },
  UrbanAspirant: {
    color: "bg-gray-50 dark:bg-gray-700",
    textColor: "text-gray-800 dark:text-gray-200",
    borderColor: "border-gray-200 dark:border-gray-800",
  },
  UrbanKompani: {
    color: "bg-gray-50 dark:bg-gray-700",
    textColor: "text-gray-800 dark:text-gray-200",
    borderColor: "border-gray-200 dark:border-gray-800",
  },
};

export const getThemeColors = (theme: keyof typeof THEMES) => {
  return THEMES[theme] || THEMES.Hiphop;
};