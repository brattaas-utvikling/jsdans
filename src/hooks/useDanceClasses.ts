// src/hooks/useDanceClasses.ts - Oppdatert for Appwrite v18
import { useState, useEffect } from "react";
import { databases, DATABASE_ID, COLLECTIONS } from "../lib/appwrite";
import type { DanceClass, Schedule } from "@/types";

interface UseDanceClassesReturn {
  danceClasses: DanceClass[];
  schedules: Schedule[];
  loading: boolean;
  error: string | null;
  getSchedulesForClass: (classId: string) => Schedule[];
  getAvailableSpots: (schedule: Schedule) => number;
  hasAvailableSpots: (schedule: Schedule) => boolean;
  getClassesByType: () => Record<string, DanceClass[]>;
  getClassesForAge: (age: number) => DanceClass[];
  refetch: () => Promise<void>;
}

export const useDanceClasses = (): UseDanceClassesReturn => {
  const [danceClasses, setDanceClasses] = useState<DanceClass[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🚀 Starting data fetch...");

      // Fetch dance classes
      try {
        console.log("📚 Fetching dance classes...");
        console.log("   Database ID:", DATABASE_ID);
        console.log("   Collection ID:", COLLECTIONS.DANCE_CLASSES);

        const classesResponse = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.DANCE_CLASSES,
          [],
        );

        console.log(
          "✅ Dance Classes SUCCESS:",
          classesResponse.documents.length,
          "documents",
        );
        console.log(
          "   Sample class:",
          classesResponse.documents[0]?.name || "No classes found",
        );

        setDanceClasses(classesResponse.documents as DanceClass[]);
      } catch (classesError) {
        console.error("❌ Dance Classes FAILED:", classesError);
        throw new Error(
          `Failed to fetch dance classes: ${classesError.message}`,
        );
      }

      // Fetch schedules
      try {
        console.log("📅 Fetching schedules...");
        console.log("   Database ID:", DATABASE_ID);
        console.log("   Collection ID:", COLLECTIONS.SCHEDULES);

        const schedulesResponse = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.SCHEDULES,
          [],
        );

        console.log(
          "✅ Schedules SUCCESS:",
          schedulesResponse.documents.length,
          "documents",
        );
        console.log(
          "   Sample schedule:",
          schedulesResponse.documents[0]
            ? `${schedulesResponse.documents[0].day} ${schedulesResponse.documents[0].startTime}`
            : "No schedules found",
        );

        setSchedules(schedulesResponse.documents as Schedule[]);
      } catch (schedulesError) {
        console.error("❌ Schedules FAILED:", schedulesError);
        // Don't throw here - classes can work without schedules
        console.warn("⚠️ Continuing without schedules...");
        setSchedules([]); // Set empty array as fallback
      }

      console.log("🎉 Data fetch completed successfully!");
    } catch (err) {
      console.error("💥 Final fetch error:", err);

      let errorMessage = "Kunne ikke hente data";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage = String(err.message);
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log("🏁 Fetch operation completed (loading = false)");
    }
  };

  useEffect(() => {
    console.log("🔄 useDanceClasses: Effect triggered, starting fetch...");
    fetchData();
  }, []);

  // Get schedules for a specific dance class
  const getSchedulesForClass = (classId: string): Schedule[] => {
    if (!classId || !schedules.length) {
      console.log("🔍 getSchedulesForClass: No classId or schedules available");
      return [];
    }

    const filteredSchedules = schedules.filter(
      (schedule) => schedule.danceClassId === classId,
    );
    console.log(
      `🔍 getSchedulesForClass: Found ${filteredSchedules.length} schedules for class ${classId}`,
    );

    return filteredSchedules;
  };

  // Get available spots for a schedule
  const getAvailableSpots = (schedule: Schedule): number => {
    if (!schedule) {
      console.log("🔍 getAvailableSpots: No schedule provided");
      return 0;
    }

    const availableSpots = Math.max(
      0,
      schedule.maxStudents - schedule.currentStudents,
    );
    console.log(
      `🔍 getAvailableSpots: ${availableSpots} spots available (${schedule.maxStudents} max - ${schedule.currentStudents} current)`,
    );

    return availableSpots;
  };

  // Check if a schedule has available spots
  const hasAvailableSpots = (schedule: Schedule): boolean => {
    const hasSpots = getAvailableSpots(schedule) > 0;
    console.log(
      `🔍 hasAvailableSpots: ${hasSpots ? "Yes" : "No"} available spots`,
    );
    return hasSpots;
  };

  // Group classes by type
  const getClassesByType = (): Record<string, DanceClass[]> => {
    const grouped: Record<string, DanceClass[]> = {};

    danceClasses.forEach((cls) => {
      if (!cls.type) {
        console.log(
          `⚠️ getClassesByType: Class ${cls.name} has no type, skipping`,
        );
        return;
      }

      if (!grouped[cls.type]) {
        grouped[cls.type] = [];
        console.log(
          `📂 getClassesByType: Created new group for type '${cls.type}'`,
        );
      }
      grouped[cls.type].push(cls);
    });

    console.log(
      "📊 getClassesByType: Grouped classes:",
      Object.keys(grouped)
        .map((type) => `${type} (${grouped[type].length})`)
        .join(", "),
    );

    return grouped;
  };

  // Filter classes by age group
  const getClassesForAge = (age: number): DanceClass[] => {
    if (!age || age < 3 || age > 100) {
      console.log(
        `🔍 getClassesForAge: Invalid age ${age}, returning empty array`,
      );
      return [];
    }

    const filteredClasses = danceClasses
      .filter((cls) => {
        if (!cls.age) {
          console.log(
            `⚠️ getClassesForAge: Class ${cls.name} has no age requirement, excluding`,
          );
          return false;
        }

        const ageRange = cls.age;
        let matches = false;

        // Parse age ranges and check compatibility
        if (ageRange === "3-5 år") matches = age >= 3 && age <= 5;
        else if (ageRange === "6-8 år") matches = age >= 6 && age <= 8;
        else if (ageRange === "9+ år") matches = age >= 9;
        else if (ageRange === "10+ år") matches = age >= 10;
        else if (ageRange === "12+ år") matches = age >= 12;
        else if (ageRange === "8+ år") matches = age >= 8;
        else matches = true; // Default: include if no specific age requirement

        if (matches) {
          console.log(
            `✅ getClassesForAge: ${cls.name} (${ageRange}) matches age ${age}`,
          );
        }

        return matches;
      })
      .filter((cls) => {
        // Only show classes that are available (not future releases)
        const currentYear = new Date().getFullYear();
        const isAvailable =
          !cls.availableFromYear || cls.availableFromYear <= currentYear;

        if (!isAvailable) {
          console.log(
            `⏳ getClassesForAge: ${cls.name} not available until ${cls.availableFromYear}`,
          );
        }

        return isAvailable;
      });

    console.log(
      `🎯 getClassesForAge: Found ${filteredClasses.length} classes for age ${age}:`,
      filteredClasses.map((cls) => cls.name).join(", "),
    );

    return filteredClasses;
  };

  // Refetch function for manual refresh
  const refetch = async (): Promise<void> => {
    console.log("🔄 Manual refetch triggered...");
    await fetchData();
  };

  // Log current state when it changes
  useEffect(() => {
    console.log("📊 State Update:", {
      danceClasses: danceClasses.length,
      schedules: schedules.length,
      loading,
      error: error || "none",
    });
  }, [danceClasses.length, schedules.length, loading, error]);

  return {
    danceClasses,
    schedules,
    loading,
    error,
    getSchedulesForClass,
    getAvailableSpots,
    hasAvailableSpots,
    getClassesByType,
    getClassesForAge,
    refetch,
  };
};
