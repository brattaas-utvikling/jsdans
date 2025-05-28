// Dance studio schedule data with detailed information for the weekly timetable

export const STUDIO_ROOMS = ["Studio A", "Studio B", "Studio C"];

export const DAYS_OF_WEEK = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
];

export const TIME_SLOTS = [
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export const LEVEL_COLORS: { [key: string]: { bg: string; border: string; text: string } } = {
  Nybegynner: {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-600 dark:text-blue-400",
  },
  littErfaren: {
    bg: "bg-purple-100 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-600 dark:text-purple-400",
  },
  Avansert: {
    bg: "bg-coral-100 dark:bg-coral-900/20",
    border: "border-coral-200 dark:border-coral-800",
    text: "text-coral-600 dark:text-coral-400",
  },
  "All nivåer": {
    bg: "bg-mint-100 dark:bg-mint-900/20",
    border: "border-mint-200 dark:border-mint-800",
    text: "text-mint-600 dark:text-mint-400",
  },
};

export const AGE_GROUP_COLORS = {
  Barn: {
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    text: "text-yellow-600 dark:text-yellow-400",
  },
  Ungdom: {
    bg: "bg-pink-100 dark:bg-pink-900/20",
    border: "border-pink-200 dark:border-pink-800",
    text: "text-pink-600 dark:text-pink-400",
  },
  Voksne: {
    bg: "bg-teal-100 dark:bg-teal-900/20",
    border: "border-teal-200 dark:border-teal-800",
    text: "text-teal-600 dark:text-teal-400",
  },
  Senior: {
    bg: "bg-orange-100 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-orange-600 dark:text-orange-400",
  },
};

export const WEEKLY_SCHEDULE = [
  {
    id: 1,
    className: "Hip Hop", // Fikset fra "classe"
    day: "Mandag",
    startTime: "16:00", // Konsistent 24-timers format
    endTime: "17:30",
    level: "Nybegynner", // Konsistent engelsk
    ageGroup: "Ungdom", // Konsistent engelsk
    instructor: "Markus",
    room: "Studio A",
    maxCapacity: 20,
    currentEnrollment: 15,
  },
  {
    id: 2,
    className: "Contemporary",
    day: "Mandag", // Fikset fra "Monday"
    startTime: "18:00", // Fikset fra "6:00 PM"
    endTime: "19:30", // Fikset fra "7:30 PM"
    level: "littErfaren",
    ageGroup: "Voksne",
    instructor: "Emma Wilson",
    room: "Studio A",
    maxCapacity: 18,
    currentEnrollment: 12,
  },
  {
    id: 3,
    className: "Ballet Fundamentals",
    day: "Mandag", // Fikset fra "Monday"
    startTime: "16:00", // Fikset fra "4:00 PM"
    endTime: "17:00", // Fikset fra "5:00 PM"
    level: "Nybegynner",
    ageGroup: "Barn",
    instructor: "Sophia Martinez",
    room: "Studio B",
    maxCapacity: 15,
    currentEnrollment: 10,
  },
  {
    id: 4,
    className: "Breakdance",
    day: "Mandag", // Fikset fra "Monday"
    startTime: "18:00", // Fikset fra "6:00 PM"
    endTime: "19:30", // Fikset fra "7:30 PM"
    level: "Nybegynner",
    ageGroup: "Ungdom",
    instructor: "Alex Chen",
    room: "Studio B",
    maxCapacity: 15,
    currentEnrollment: 8,
  },
  {
    id: 5,
    className: "Jazz",
    day: "Tirsdag", // Fikset fra "Tuesday"
    startTime: "16:00", // Fikset fra "4:00 PM"
    endTime: "17:30", // Fikset fra "5:30 PM"
    level: "Nybegynner",
    ageGroup: "Ungdom",
    instructor: "Sophia Martinez",
    room: "Studio A",
    maxCapacity: 20,
    currentEnrollment: 16,
  },
  {
    id: 6,
    className: "Contemporary",
    day: "Tirsdag", // Fikset fra "Tuesday"
    startTime: "18:00", // Fikset fra "6:00 PM"
    endTime: "19:30", // Fikset fra "7:30 PM"
    level: "Nybegynner",
    ageGroup: "Voksne",
    instructor: "Emma Wilson",
    room: "Studio A",
    maxCapacity: 18,
    currentEnrollment: 14,
  },
  {
    id: 7,
    className: "Hip Hop",
    day: "Tirsdag", // Fikset fra "Tuesday"
    startTime: "17:00", // Fikset fra "5:00 PM"
    endTime: "18:30", // Fikset fra "6:30 PM"
    level: "littErfaren",
    ageGroup: "Ungdom",
    instructor: "Marcus Johnson",
    room: "Studio B",
    maxCapacity: 18,
    currentEnrollment: 15,
  },
  {
    id: 8,
    className: "Tap Dance",
    day: "Tirsdag", // Fikset fra "Tuesday"
    startTime: "19:00", // Fikset fra "7:00 PM"
    endTime: "20:30", // Fikset fra "8:30 PM"
    level: "Nybegynner",
    ageGroup: "Voksne",
    instructor: "James Wilson",
    room: "Studio B",
    maxCapacity: 15,
    currentEnrollment: 8,
  },
  {
    id: 9,
    className: "Hip Hop",
    day: "Onsdag", // Fikset fra "Wednesday"
    startTime: "18:00", // Fikset fra "6:00 PM"
    endTime: "19:30", // Fikset fra "7:30 PM"
    level: "littErfaren",
    ageGroup: "Voksne",
    instructor: "Marcus Johnson",
    room: "Studio A",
    maxCapacity: 20,
    currentEnrollment: 18,
  },
  {
    id: 10,
    className: "Ballet",
    day: "Onsdag", // Fikset fra "Wednesday"
    startTime: "16:00", // Fikset fra "4:00 PM"
    endTime: "17:30", // Fikset fra "5:30 PM"
    level: "littErfaren",
    ageGroup: "Ungdom",
    instructor: "Sophia Martinez",
    room: "Studio A",
    maxCapacity: 15,
    currentEnrollment: 12,
  },
  {
    id: 11,
    className: "Breakdance",
    day: "Onsdag", // Fikset fra "Wednesday"
    startTime: "16:00", // Fikset fra "4:00 PM"
    endTime: "17:30", // Fikset fra "5:30 PM"
    level: "littErfaren",
    ageGroup: "Ungdom",
    instructor: "Alex Chen",
    room: "Studio B",
    maxCapacity: 15,
    currentEnrollment: 10,
  },
  {
    id: 12,
    className: "Contemporary",
    day: "Onsdag", // Fikset fra "Wednesday"
    startTime: "18:00", // Fikset fra "6:00 PM"
    endTime: "19:30", // Fikset fra "7:30 PM"
    level: "Avansert",
    ageGroup: "Voksne",
    instructor: "Emma Wilson",
    room: "Studio B",
    maxCapacity: 15,
    currentEnrollment: 12,
  },
  {
    id: 13,
    className: "Jazz",
    day: "Torsdag", // Fikset fra "Thursday"
    startTime: "18:00", // Fikset fra "6:00 PM"
    endTime: "19:30", // Fikset fra "7:30 PM"
    level: "littErfaren",
    ageGroup: "Voksne",
    instructor: "Sophia Martinez",
    room: "Studio A",
    maxCapacity: 18,
    currentEnrollment: 15,
  },
  {
    id: 14,
    className: "Contemporary",
    day: "Torsdag", // Fikset fra "Thursday"
    startTime: "16:00", // Fikset fra "4:00 PM"
    endTime: "17:30", // Fikset fra "5:30 PM"
    level: "littErfaren",
    ageGroup: "Ungdom",
    instructor: "Emma Wilson",
    room: "Studio A",
    maxCapacity: 18,
    currentEnrollment: 14,
  },
  {
    id: 15,
    className: "Breakdance",
    day: "Torsdag", // Fikset fra "Thursday"
    startTime: "17:00", // Fikset fra "5:00 PM"
    endTime: "18:30", // Fikset fra "6:30 PM"
    level: "Avansert",
    ageGroup: "Ungdom",
    instructor: "Alex Chen",
    room: "Studio B",
    maxCapacity: 12,
    currentEnrollment: 10,
  },
  {
    id: 16,
    className: "Hip Hop",
    day: "Torsdag", // Fikset fra "Thursday"
    startTime: "19:00", // Fikset fra "7:00 PM"
    endTime: "20:30", // Fikset fra "8:30 PM"
    level: "Avansert",
    ageGroup: "Voksne",
    instructor: "Marcus Johnson",
    room: "Studio B",
    maxCapacity: 15,
    currentEnrollment: 12,
  },
  {
    id: 17,
    className: "Breakdance",
    day: "Fredag", // Fikset fra "Friday"
    startTime: "17:00", // Fikset fra "5:00 PM"
    endTime: "18:30", // Fikset fra "6:30 PM"
    level: "Avansert",
    ageGroup: "Voksne",
    instructor: "Alex Chen",
    room: "Studio A",
    maxCapacity: 15,
    currentEnrollment: 12,
  },
  {
    id: 18,
    className: "Hip Hop",
    day: "Fredag", // Fikset fra "Friday"
    startTime: "16:00", // Fikset fra "4:00 PM"
    endTime: "17:00", // Fikset fra "5:00 PM"
    level: "Nybegynner",
    ageGroup: "Barn",
    instructor: "Marcus Johnson",
    room: "Studio B",
    maxCapacity: 15,
    currentEnrollment: 10,
  },
  {
    id: 19,
    className: "Jazz",
    day: "Fredag", // Fikset fra "Friday"
    startTime: "18:00", // Fikset fra "6:00 PM"
    endTime: "19:30", // Fikset fra "7:30 PM"
    level: "Avansert",
    ageGroup: "Voksne",
    instructor: "Sophia Martinez",
    room: "Studio B",
    maxCapacity: 15,
    currentEnrollment: 12,
  },
  {
    id: 20,
    className: "Hip Hop",
    day: "Lørdag", // Fikset fra "Saturday"
    startTime: "10:00", // Fikset fra "10:00 AM"
    endTime: "11:30", // Fikset fra "11:30 AM"
    level: "Avansert",
    ageGroup: "Voksne",
    instructor: "Marcus Johnson",
    room: "Studio A",
    maxCapacity: 20,
    currentEnrollment: 18,
  },
  {
    id: 21,
    className: "Jazz",
    day: "Lørdag", // Fikset fra "Saturday"
    startTime: "13:00", // Fikset fra "1:00 PM"
    endTime: "14:30", // Fikset fra "2:30 PM"
    level: "Avansert",
    ageGroup: "Ungdom",
    instructor: "Sophia Martinez",
    room: "Studio A",
    maxCapacity: 18,
    currentEnrollment: 15,
  },
  {
    id: 22,
    className: "Contemporary",
    day: "Lørdag", // Fikset fra "Saturday"
    startTime: "11:00", // Fikset fra "11:00 AM"
    endTime: "12:30", // Fikset fra "12:30 PM"
    level: "Avansert",
    ageGroup: "Ungdom",
    instructor: "Emma Wilson",
    room: "Studio B",
    maxCapacity: 15,
    currentEnrollment: 12,
  },
  {
    id: 23,
    className: "Breakdance",
    day: "Lørdag", // Fikset fra "Saturday"
    startTime: "13:00", // Fikset fra "1:00 PM"
    endTime: "14:30", // Fikset fra "2:30 PM"
    level: "Nybegynner",
    ageGroup: "Barn",
    instructor: "Alex Chen",
    room: "Studio B",
    maxCapacity: 12,
    currentEnrollment: 8,
  },
  {
    id: 24,
    className: "Dance Fitness",
    day: "Lørdag", // Fikset fra "Saturday"
    startTime: "09:00", // Fikset fra "9:00 AM"
    endTime: "10:00", // Fikset fra "10:00 AM"
    level: "All Levels",
    ageGroup: "Voksne",
    instructor: "James Wilson",
    room: "Studio C",
    maxCapacity: 25,
    currentEnrollment: 20,
  },
  {
    id: 25,
    className: "Parent & Child Dance",
    day: "Lørdag", // Fikset fra "Saturday"
    startTime: "11:00", // Fikset fra "11:00 AM"
    endTime: "12:00", // Fikset fra "12:00 PM"
    level: "All Levels",
    ageGroup: "Barn",
    instructor: "Sophia Martinez",
    room: "Studio C",
    maxCapacity: 15,
    currentEnrollment: 10,
  },
];

// Helper function to get classes for a specific day and time slot
export function getClassesForTimeSlot(day: string, timeSlot: string) {
  return WEEKLY_SCHEDULE.filter(
    (classItem) =>
      classItem.day === day &&
      ((timeSlot >= classItem.startTime && timeSlot < classItem.endTime) ||
        timeSlot === classItem.startTime)
  );
}

// Helper function to check if a class spans multiple time slots
export function getClassDuration(classItem: { startTime: string; endTime: string }) {
  const startIndex = TIME_SLOTS.indexOf(classItem.startTime);
  const endIndex = TIME_SLOTS.indexOf(classItem.endTime);

  // If endTime is not exactly a time slot, find the next time slot after it
  if (endIndex === -1) {
    // Find the next time slot after endTime
    for (let i = 0; i < TIME_SLOTS.length; i++) {
      if (TIME_SLOTS[i] > classItem.endTime) {
        return i - startIndex;
      }
    }
    return TIME_SLOTS.length - startIndex;
  }

  return endIndex - startIndex;
}

// Helper function to get color scheme based on level and age group
export function getClassColorScheme(classItem: { level: string; }) {
  // Prioritize level colors, but could be modified to use age group colors instead
  return LEVEL_COLORS[classItem.level] || LEVEL_COLORS["Nybegynner"];
}
