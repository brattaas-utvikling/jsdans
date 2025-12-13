// src/services/enrollmentService.ts - Fikset versjon
import { ID, Functions } from 'appwrite';
import { databases, DATABASE_ID, COLLECTIONS, client } from '../lib/appwrite';
import type { EnrollmentData } from '../types/enrollment';

export interface FlatEnrollmentSubmission {
  // Student fields
  student_firstName: string;
  student_lastName: string;
  student_birthDate: string;
  student_age: number;
  
  // Guardian fields
  guardian_name: string;
  guardian_email: string;
  guardian_phone: string;
  // Adressefelter
  guardian_address: string;
  guardian_postalCode: string;
  guardian_city: string;
  
  // Selected courses (arrays, ikke strings)
  selectedCourses_ids: string[];
  selectedCourses_names: string[];
  selectedCourses_instructors: string[];
  selectedCourses_ages: string[];
  selectedCourses_schedules: string[]; // JSON strings av schedule arrays
  
  // Søsken felter
  hasSiblings: boolean;
  siblings_firstNames: string[];
  siblings_lastNames: string[];
  
  // Pricing fields
  pricing_totalPrice: number;
  pricing_basePrice: number;
  pricing_discount: number;
  pricing_barnedansCount: number;
  pricing_vanligCount: number;
  pricing_kompaniCount: number;
  pricing_barnedansPrice: number;
  pricing_vanligPrice: number;
  pricing_kompaniPrice: number;
  
  // ✅ Terms
  termsAccepted: boolean;
  termsAcceptedAt: string | null;
  
  // Metadata
  submittedAt: string;
  status: 'pending' | 'confirmed' | 'paid' | 'cancelled';
}

export interface EnrollmentRecord {
  $id: string;
  student: {
    firstName: string;
    lastName: string;
    birthDate: string;
    age: number;
  };
  guardian: {
    name: string;
    email: string;
    phone: string;
    // Adressefelter
    address: string;
    postalCode: string;
    city: string;
  };
  selectedCourses: {
    ids: string[];
    names: string[];
    instructors: string[];
    ages: string[];
    schedules: Array<Array<{ day: string; time: string }>>;
  };
  // Søsken felter
  hasSiblings: boolean;
  siblings: Array<{
    firstName: string;
    lastName: string;
  }>;
  pricing: {
    totalPrice: number;
    basePrice: number;
    discount: number;
    breakdown: {
      barnedansCount: number;
      vanligCount: number;
      kompaniCount: number;
      barnedansPrice: number;
      vanligPrice: number;
      kompaniPrice: number;
    };
  };
  submittedAt: string;
  status: 'pending' | 'confirmed' | 'paid' | 'cancelled';
}

export interface SubmissionResult {
  success: boolean;
  documentId?: string;
  error?: string;
}

export class EnrollmentService {
  /**
   * Hovedfunksjon for å sende påmelding
   */
  static async submitEnrollment(enrollmentData: EnrollmentData): Promise<SubmissionResult> {
    try {
      // 1. Basic validering (inkluder adressefelt)
      if (!enrollmentData.student.firstName || 
          !enrollmentData.guardian.email || 
          !enrollmentData.guardian.address ||
          !enrollmentData.guardian.postalCode ||
          !enrollmentData.guardian.city ||
          !enrollmentData.selectedCourses.length ||
          !enrollmentData.pricing) {
        return {
          success: false,
          error: 'Manglende påkrevd informasjon',
        };
      }

      // Valider søsken hvis aktivert
      if (enrollmentData.hasSiblings) {
        const invalidSiblings = enrollmentData.siblings.some(sibling => 
          !sibling.firstName.trim() || !sibling.lastName.trim()
        );
        
        if (invalidSiblings) {
          return {
            success: false,
            error: 'Informasjon om familiemedlem er ikke fullstendig',
          };
        }
      }

      if (!enrollmentData.termsAccepted) {
        return {
          success: false,
          error: "Du må bekrefte betingelser og vilkår før du kan sende inn påmeldingen.",
        };
      }
      

      // 2. Forbered data for Appwrite (med adressefelt)
      const flatEnrollmentDoc: FlatEnrollmentSubmission = {
        // Student fields
        student_firstName: enrollmentData.student.firstName.trim(),
        student_lastName: enrollmentData.student.lastName.trim(),
        student_birthDate: enrollmentData.student.birthDate,
        student_age: enrollmentData.student.age || 0,
        
        // Guardian fields (med adresse)
        guardian_name: enrollmentData.guardian.name.trim(),
        guardian_email: enrollmentData.guardian.email.trim().toLowerCase(),
        guardian_phone: enrollmentData.guardian.phone.trim(),
        guardian_address: enrollmentData.guardian.address.trim(),
        guardian_postalCode: enrollmentData.guardian.postalCode.trim(),
        guardian_city: enrollmentData.guardian.city.trim(),
        
        // Selected courses as actual arrays (not JSON strings)
        selectedCourses_ids: enrollmentData.selectedCourses.map(c => c.$id),
        selectedCourses_names: enrollmentData.selectedCourses.map(c => c.name),
        selectedCourses_instructors: enrollmentData.selectedCourses.map(c => c.instructor),
        selectedCourses_ages: enrollmentData.selectedCourses.map(c => c.age),
        selectedCourses_schedules: enrollmentData.selectedCourses.map(c => 
          JSON.stringify(c.schedule || [])
        ),
        
        // Søsken felter
        hasSiblings: enrollmentData.hasSiblings,
        siblings_firstNames: enrollmentData.siblings.map(s => s.firstName.trim()),
        siblings_lastNames: enrollmentData.siblings.map(s => s.lastName.trim()),
        
        // Pricing fields
        pricing_totalPrice: enrollmentData.pricing.totalPrice,
        pricing_basePrice: enrollmentData.pricing.basePrice,
        pricing_discount: enrollmentData.pricing.discount,
        pricing_barnedansCount: enrollmentData.pricing.breakdown.barnedansCount,
        pricing_vanligCount: enrollmentData.pricing.breakdown.vanligCount,
        pricing_kompaniCount: enrollmentData.pricing.breakdown.kompaniCount,
        pricing_barnedansPrice: enrollmentData.pricing.breakdown.barnedansPrice,
        pricing_vanligPrice: enrollmentData.pricing.breakdown.vanligPrice,
        pricing_kompaniPrice: enrollmentData.pricing.breakdown.kompaniPrice,
        
        termsAccepted: enrollmentData.termsAccepted,
        termsAcceptedAt: enrollmentData.termsAcceptedAt,

        // Metadata
        submittedAt: new Date().toISOString(),
        status: 'pending',
      };

      // 3. Lagre i database
      // console.log('💾 Saving enrollment to database with address and siblings:', {
      //   hasSiblings: flatEnrollmentDoc.hasSiblings,
      //   siblingsCount: flatEnrollmentDoc.siblings_firstNames.length,
      //   studentName: `${flatEnrollmentDoc.student_firstName} ${flatEnrollmentDoc.student_lastName}`,
      //   address: `${flatEnrollmentDoc.guardian_address}, ${flatEnrollmentDoc.guardian_postalCode} ${flatEnrollmentDoc.guardian_city}`
      // });

      const document = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ENROLLMENTS,
        ID.unique(),
        flatEnrollmentDoc
      );

      // console.log('✅ Påmelding lagret i database:', document.$id);

      // 4. Send e-post notifikasjon (fire and forget)
      this.sendEnrollmentEmailNotification(
        enrollmentData,
        document.$id
      ).catch((error) => console.error('Email notification failed:', error));

      return {
        success: true,
        documentId: document.$id,
      };

    } catch (error) {
      console.error('❌ Enrollment submission error:', error);
      return {
        success: false,
        error: 'En teknisk feil oppstod. Prøv igjen senere.',
      };
    }
  }

  /**
   * Send e-post notifikasjon via Appwrite Function
   */
  private static async sendEnrollmentEmailNotification(
    enrollmentData: EnrollmentData,
    documentId: string
  ): Promise<void> {
    try {
      const functions = new Functions(client);

      // Clean payload - inkluder adresse og søsken informasjon
      const payload = {
        enrollmentData: {
          student: {
            firstName: enrollmentData.student.firstName,
            lastName: enrollmentData.student.lastName,
            birthDate: enrollmentData.student.birthDate,
            age: enrollmentData.student.age || 0,
          },
          guardian: {
            name: enrollmentData.guardian.name,
            email: enrollmentData.guardian.email,
            phone: enrollmentData.guardian.phone,
            // Adressefelter i e-post payload
            address: enrollmentData.guardian.address,
            postalCode: enrollmentData.guardian.postalCode,
            city: enrollmentData.guardian.city,
          },
          selectedCourses: enrollmentData.selectedCourses.map(course => ({
            name: course.name,
            instructor: course.instructor,
            age: course.age,
            schedule: course.schedule,
          })),
          // Inkluder søsken i e-post payload
          hasSiblings: enrollmentData.hasSiblings,
          siblings: enrollmentData.siblings,
          pricing: enrollmentData.pricing,
          termsAccepted: enrollmentData.termsAccepted,
          termsAcceptedAt: enrollmentData.termsAcceptedAt,
        },
        documentId: String(documentId),
        timestamp: new Date().toISOString(),
      };

      // Serialize payload
      const payloadString = JSON.stringify(payload);

      // console.log('📧 Sending email with payload (including address and siblings):', {
      //   studentName: `${enrollmentData.student.firstName} ${enrollmentData.student.lastName}`,
      //   guardianEmail: enrollmentData.guardian.email,
      //   address: `${enrollmentData.guardian.address}, ${enrollmentData.guardian.postalCode} ${enrollmentData.guardian.city}`,
      //   coursesCount: enrollmentData.selectedCourses.length,
      //   hasSiblings: enrollmentData.hasSiblings,
      //   siblingsCount: enrollmentData.siblings.length,
      //   documentId: documentId,
      //   payloadSize: payloadString.length
      // });

      // Execute function
      await functions.createExecution('send-enrollment-email', payloadString);

      // console.log('📧 E-post notifikasjon sendt via Appwrite Function');
      
    } catch (error: unknown) {
      // Silently fail - don't break enrollment submission
      console.error(
        'Email notification failed:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  /**
   * Test function execution
   */
  static async testEnrollmentEmailFunction(): Promise<void> {
    try {
      const functions = new Functions(client);

      const testPayload = {
        debug: true,
        enrollmentData: {
          student: {
            firstName: 'Test',
            lastName: 'Student',
            birthDate: '2015-01-01',
            age: 9,
          },
          guardian: {
            name: 'Test Guardian',
            email: 'debug@test.com',
            phone: '12345678',
            // Test adressefelter
            address: 'Testveien 123',
            postalCode: '0123',
            city: 'Oslo',
          },
          selectedCourses: [
            {
              name: 'Test Kurs',
              instructor: 'Test Instruktør',
              age: '8-10 år',
            },
          ],
          // Test søsken
          hasSiblings: true,
          siblings: [
            { firstName: 'Test', lastName: 'Familiemedlem1' },
            { firstName: 'Test', lastName: 'Familiemedlem2' }
          ],
          pricing: {
            totalPrice: 1700,
            basePrice: 1700,
            discount: 0,
            breakdown: {
              barnedansCount: 0,
              vanligCount: 1,
              kompaniCount: 0,
              barnedansPrice: 0,
              vanligPrice: 1700,
              kompaniPrice: 0,
            },
          },
        },
        documentId: 'debug-test-123',
      };

      const payloadString = JSON.stringify(testPayload);
      await functions.createExecution('send-enrollment-email', payloadString);
      
    } catch (error: unknown) {
      console.error(
        'Test failed:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      throw error;
    }
  }

  /**
   * Hent påmeldinger fra database (for admin) - oppdatert med adresse og søsken
   */
  static async getEnrollments(): Promise<EnrollmentRecord[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ENROLLMENTS,
        []
      );

      // Convert arrays back to structured data
      return response.documents.map(doc => ({
        $id: doc.$id as string,
        student: {
          firstName: doc.student_firstName as string,
          lastName: doc.student_lastName as string,
          birthDate: doc.student_birthDate as string,
          age: doc.student_age as number,
        },
        guardian: {
          name: doc.guardian_name as string,
          email: doc.guardian_email as string,
          phone: doc.guardian_phone as string,
          // Rekonstruer adressefelter
          address: doc.guardian_address as string,
          postalCode: doc.guardian_postalCode as string,
          city: doc.guardian_city as string,
        },
        selectedCourses: {
          ids: doc.selectedCourses_ids as string[],
          names: doc.selectedCourses_names as string[],
          instructors: doc.selectedCourses_instructors as string[],
          ages: doc.selectedCourses_ages as string[],
          schedules: (doc.selectedCourses_schedules as string[]).map(scheduleStr => 
            JSON.parse(scheduleStr)
          ),
        },
        // Rekonstruer søsken fra arrays
        hasSiblings: doc.hasSiblings as boolean,
        siblings: (doc.siblings_firstNames as string[] || []).map((firstName, index) => ({
          firstName,
          lastName: (doc.siblings_lastNames as string[])[index] || ''
        })),
        pricing: {
          totalPrice: doc.pricing_totalPrice as number,
          basePrice: doc.pricing_basePrice as number,
          discount: doc.pricing_discount as number,
          breakdown: {
            barnedansCount: doc.pricing_barnedansCount as number,
            vanligCount: doc.pricing_vanligCount as number,
            kompaniCount: doc.pricing_kompaniCount as number,
            barnedansPrice: doc.pricing_barnedansPrice as number,
            vanligPrice: doc.pricing_vanligPrice as number,
            kompaniPrice: doc.pricing_kompaniPrice as number,
          },
        },
        submittedAt: doc.submittedAt as string,
        status: doc.status as 'pending' | 'confirmed' | 'paid' | 'cancelled',
      }));
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
      throw error;
    }
  }
}

// Export av hovedfunksjon for bakoverkompatibilitet
export async function submitEnrollment(enrollmentData: EnrollmentData): Promise<string> {
  const result = await EnrollmentService.submitEnrollment(enrollmentData);
  
  if (!result.success) {
    throw new Error(result.error || 'Ukjent feil oppstod');
  }
  
  return result.documentId!;
}