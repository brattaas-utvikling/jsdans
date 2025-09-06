// src/services/coursesService.ts - Uten debug logging
import { Query } from 'appwrite';
import { databases, DATABASE_ID, COLLECTIONS } from '../lib/appwrite';
import type { DanceClass } from '../types';

export interface CourseWithSchedule extends DanceClass {
  schedule?: Array<{
    day: string;
    time: string;
    room?: string;
  }>;
}

export class CoursesService {
  /**
   * Sjekk om et kurs er kompani-kurs (skal ikke vises i påmelding)
   */
  private static isCompanyCourse(course: CourseWithSchedule): boolean {
    const courseName = course.name.toLowerCase();
    const courseType = course.type?.toLowerCase() || '';
    
    // Sjekk navn
    const companyNamePatterns = [
      'kompani',
      'aspirantkompani',
      'aspirant kompani',
      'company',
      'dance company'
    ];
    
    // Sjekk type-feltet
    const companyTypePatterns = [
      'kompani',
      'company',
      'aspirant'
    ];
    
    const hasCompanyName = companyNamePatterns.some(pattern => 
      courseName.includes(pattern)
    );
    
    const hasCompanyType = companyTypePatterns.some(pattern => 
      courseType.includes(pattern)
    );
    
    return hasCompanyName || hasCompanyType;
  }

  /**
   * Hent alle aktive kurs (filtrert for påmelding)
   */
  static async getAllCourses(includeCompanyCourses: boolean = false): Promise<CourseWithSchedule[]> {
    try {
      // Hent alle dance classes
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.DANCE_CLASSES,
        [
          Query.limit(100),
          Query.orderAsc('name')
        ]
      );

      // Konverter til riktig format - inkluder alle Appwrite metadata felter
      const courses: CourseWithSchedule[] = response.documents.map(doc => {
        const course: CourseWithSchedule = {
          $id: doc.$id,
          $createdAt: doc.$createdAt,
          $updatedAt: doc.$updatedAt,
          $collectionId: doc.$collectionId,
          $databaseId: doc.$databaseId,
          $permissions: doc.$permissions,
          name: doc.name as string,
          description: doc.description as string,
          color: doc.color as string,
          icon: doc.icon as string,
          image: doc.image as string || '',
          level: doc.level as string,
          age: doc.age as string,
          instructor: doc.instructor as string,
          duration: doc.duration as number,
          availableFromYear: doc.availableFromYear as number,
          type: doc.type as string,
          studio: doc.studio as string || undefined,
        };

        return course;
      });

      // FILTRER BORT KOMPANI-KURS HVIS IKKE ØNSKET
      let filteredCourses = courses;
      
      if (!includeCompanyCourses) {
        filteredCourses = courses.filter(course => !this.isCompanyCourse(course));
      }

      // Hent schedule info for hver kurs (optional enhancement)
      const coursesWithSchedule = await this.enrichWithSchedules(filteredCourses);

      return coursesWithSchedule;

    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new Error('Kunne ikke laste kurs fra database');
    }
  }

  /**
   * Hent alle kurs inkludert kompani-kurs (for admin eller andre formål)
   */
  static async getAllCoursesIncludingCompany(): Promise<CourseWithSchedule[]> {
    return this.getAllCourses(true);
  }

  /**
   * Hent kun kompani-kurs
   */
  static async getCompanyCourses(): Promise<CourseWithSchedule[]> {
    try {
      const allCourses = await this.getAllCourses(true);
      return allCourses.filter(course => this.isCompanyCourse(course));
    } catch (error) {
      console.error('Error fetching company courses:', error);
      throw new Error('Kunne ikke laste kompani-kurs fra database');
    }
  }

  /**
   * Hent et spesifikt kurs
   */
  static async getCourseById(courseId: string): Promise<CourseWithSchedule | null> {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.DANCE_CLASSES,
        courseId
      );

      const course: CourseWithSchedule = {
        $id: response.$id,
        $createdAt: response.$createdAt,
        $updatedAt: response.$updatedAt,
        $collectionId: response.$collectionId,
        $databaseId: response.$databaseId,
        $permissions: response.$permissions,
        name: response.name as string,
        description: response.description as string,
        color: response.color as string,
        icon: response.icon as string,
        image: response.image as string || '',
        level: response.level as string,
        age: response.age as string,
        instructor: response.instructor as string,
        duration: response.duration as number,
        availableFromYear: response.availableFromYear as number,
        type: response.type as string,
        studio: response.studio as string || undefined,
      };

      // Få schedule info
      const courseWithSchedule = await this.enrichWithSchedules([course]);
      
      return courseWithSchedule[0] || null;

    } catch (error) {
      console.error('Error fetching course by ID:', error);
      return null;
    }
  }

  /**
   * Berik kurs med schedule informasjon
   */
  private static async enrichWithSchedules(courses: CourseWithSchedule[]): Promise<CourseWithSchedule[]> {
    try {
      // Hvis du har en SCHEDULES collection, hent schedule data
      if (COLLECTIONS.SCHEDULES) {
        const courseIds = courses.map(c => c.$id);
        
        const schedulesResponse = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.SCHEDULES,
          [
            Query.equal('dance_class_id', courseIds),
            Query.equal('isActive', true),
            Query.limit(200)
          ]
        );

        // Map schedules til courses
        const enrichedCourses = courses.map(course => {
          const courseSchedules = schedulesResponse.documents
            .filter(schedule => schedule.dance_class_id === course.$id)
            .map(schedule => ({
              day: this.mapDayToNorwegian(schedule.day as string),
              time: this.formatTimeRange(schedule.start_time as string, schedule.end_time as string),
              room: schedule.room as string || undefined
            }));

          return {
            ...course,
            schedule: courseSchedules.length > 0 ? courseSchedules : undefined
          };
        });

        return enrichedCourses;
      }

      // Fallback: return courses without schedule
      return courses;

    } catch (error) {
      // Beholder warning for schedule-problemer da dette kan påvirke brukeropplevelse
      console.warn('Could not enrich with schedules, returning courses without schedule:', error);
      return courses;
    }
  }

  /**
   * Map engelsk dag til norsk
   */
  private static mapDayToNorwegian(day: string): string {
    const dayMap: Record<string, string> = {
      'Monday': 'Mandag',
      'Tuesday': 'Tirsdag', 
      'Wednesday': 'Onsdag',
      'Thursday': 'Torsdag',
      'Friday': 'Fredag',
      'Saturday': 'Lørdag',
      'Sunday': 'Søndag',
      // Allerede norske dager
      'Mandag': 'Mandag',
      'Tirsdag': 'Tirsdag',
      'Onsdag': 'Onsdag',
      'Torsdag': 'Torsdag',
      'Fredag': 'Fredag',
      'Lørdag': 'Lørdag',
      'Søndag': 'Søndag'
    };

    return dayMap[day] || day;
  }

  /**
   * Format tidsintervall
   */
  private static formatTimeRange(startTime: string, endTime: string): string {
    // Forenkle tidsformat (fjern sekunder hvis de finnes)
    const cleanStart = startTime.substring(0, 5); // "HH:MM"
    const cleanEnd = endTime.substring(0, 5);     // "HH:MM"
    
    return `${cleanStart}-${cleanEnd}`;
  }

  /**
   * Filtrer kurs basert på alder
   */
  static filterCoursesByAge(courses: CourseWithSchedule[], studentAge: number): CourseWithSchedule[] {
    return courses.filter(course => {
      return this.isCourseAppropriateForAge(course, studentAge);
    });
  }

  /**
   * Sjekk om kurs passer for gitt alder
   */
  private static isCourseAppropriateForAge(course: CourseWithSchedule, studentAge: number): boolean {
    const ageRange = course.age.trim().toLowerCase();
    
    // Parse different age formats
    if (ageRange.includes('-')) {
      const match = ageRange.match(/(\d+)-(\d+)/);
      if (match) {
        const minAge = parseInt(match[1]);
        const maxAge = parseInt(match[2]);
        return studentAge >= minAge && studentAge <= maxAge;
      }
    }
    
    if (ageRange.includes('+')) {
      const match = ageRange.match(/(\d+)\+/);
      if (match) {
        const minAge = parseInt(match[1]);
        return studentAge >= minAge;
      }
    }

    // For specific ages or unknown formats, be permissive
    return true;
  }

  /**
   * Søk i kurs (ekskluderer kompani som standard)
   */
  static async searchCourses(searchTerm: string, includeCompanyCourses: boolean = false): Promise<CourseWithSchedule[]> {
    try {
      const allCourses = await this.getAllCourses(includeCompanyCourses);
      
      const searchLower = searchTerm.toLowerCase();
      
      return allCourses.filter(course => 
        course.name.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower) ||
        course.age.toLowerCase().includes(searchLower)
      );

    } catch (error) {
      console.error('Error searching courses:', error);
      throw new Error('Kunne ikke søke i kurs');
    }
  }
}

// Export convenience functions for backward compatibility
export const coursesService = CoursesService;