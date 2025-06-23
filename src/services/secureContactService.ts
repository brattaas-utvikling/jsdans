// services/secureContactService.ts
import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, COLLECTIONS } from '../lib/appwrite';
import { InputSanitizer, SecurityLogger } from '../utils/security';
import { 
  validateContactForm, 
  performSecurityChecks,
  type ContactFormData 
} from '../validation/contactValidation';

export interface ContactDocument extends ContactFormData {
  $id: string;
  status: 'new' | 'read' | 'replied' | 'spam';
  created_at: string;
  ip_hash?: string; // Hashet IP for tracking
  user_agent_hash?: string; // Hashet user agent
  security_score: number; // 0-100, hvor høyere er tryggere
}

export interface SubmissionResult {
  success: boolean;
  documentId?: string;
  error?: string;
  errorCode?: 'RATE_LIMIT' | 'VALIDATION' | 'SECURITY' | 'SERVER' | 'BOT_DETECTED';
}

export class SecureContactService {
  /**
   * Hovedfunksjon for å sende kontaktskjema med full sikkerhet
   */
  static async submitContactForm(
    formData: ContactFormData,
    metadata?: {
      userAgent?: string;
      startTime?: number;
    }
  ): Promise<SubmissionResult> {
    try {
      // 1. Sanitiser input først
      const sanitizedInput = {
        name: InputSanitizer.sanitizeName(formData.name),
        email: InputSanitizer.sanitizeEmail(formData.email),
        phone: formData.phone ? InputSanitizer.sanitizePhone(formData.phone) : undefined,
        message: InputSanitizer.sanitizeText(formData.message),
      };

      // 2. Yup validering
      const validation = await validateContactForm(sanitizedInput);
      if (!validation.isValid) {
        return {
          success: false,
          error: Object.values(validation.errors)[0] || 'Valideringsfeil',
          errorCode: 'VALIDATION'
        };
      }

      const validatedData = validation.sanitizedData!;

      // 3. Sikkerhetskontroller
      const securityCheck = performSecurityChecks(validatedData);
      if (!securityCheck.passed) {
        SecurityLogger.logSuspiciousActivity(
          securityCheck.reason || 'Security check failed',
          validatedData.email
        );
        
        return {
          success: false,
          error: 'Meldingen kunne ikke sendes på grunn av sikkerhetskontroller',
          errorCode: 'SECURITY'
        };
      }

      // 4. Beregn sikkerhetsscore
      const securityScore = this.calculateSecurityScore(validatedData, metadata);

      // 5. Generer anonyme hasher for tracking
      const ipHash = await this.hashString(this.getClientIP());
      const userAgentHash = metadata?.userAgent ? 
        await this.hashString(metadata.userAgent) : undefined;

      // 6. Lagre i database
      const document = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.CONTACTS,
        ID.unique(),
        {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          message: validatedData.message,
          status: securityScore > 70 ? 'new' : 'new', // Kan flagge som 'review' hvis lav score
          created_at: new Date().toISOString(),
          ip_hash: ipHash,
          user_agent_hash: userAgentHash,
          security_score: securityScore,
        }
      );

      // 7. Logg suksess
      SecurityLogger.logSubmission({
        email: validatedData.email,
        ip: this.getClientIP(),
        userAgent: metadata?.userAgent,
        timestamp: new Date().toISOString(),
      });

      // 8. Send e-post notifikasjon (asynkront)
      this.sendEmailNotification(validatedData, securityScore)
        .catch(error => console.error('Email notification failed:', error));

      return {
        success: true,
        documentId: document.$id,
      };

    } catch (error) {
      console.error('Contact form submission error:', error);
      
      return {
        success: false,
        error: 'En teknisk feil oppstod. Prøv igjen senere.',
        errorCode: 'SERVER'
      };
    }
  }

  /**
   * Beregn sikkerhetsscore basert på ulike faktorer
   */
  private static calculateSecurityScore(
    data: ContactFormData, 
    metadata?: { userAgent?: string; startTime?: number }
  ): number {
    let score = 50; // Base score

    // Positive indikatorer
    if (data.phone && data.phone.length > 8) score += 10; // Telefon oppgitt
    if (data.name.includes(' ')) score += 5; // Fullt navn
    if (data.message.length > 100) score += 10; // Detaljert melding
    if (data.message.includes('?')) score += 5; // Spørsmål indikerer ekte interesse
    
    // Norske tegn/ord
    if (/[æøå]/i.test(data.message)) score += 10;
    if (/\b(takk|tusen|hilsen|mvh|hei|hallo)\b/i.test(data.message)) score += 5;

    // Negative indikatorer
    if (data.message.length < 20) score -= 15; // For kort melding
    if (/[A-Z]{10,}/.test(data.message)) score -= 10; // For mange store bokstaver
    if ((data.message.match(/!/g) || []).length > 3) score -= 5; // For mange utropstegn
    
    // E-post kvalitet
    if (data.email.includes('+')) score -= 5; // Plus-adressing kan være midlertidig
    if (/\d{4,}/.test(data.email)) score -= 5; // Mange tall i e-post
    
    const emailDomain = data.email.split('@')[1];
    const trustedDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com'];
    if (trustedDomains.includes(emailDomain)) score += 5;

    // Metadata-baserte sjekker
    if (metadata?.userAgent) {
      if (metadata.userAgent.includes('bot') || metadata.userAgent.includes('crawler')) {
        score -= 30;
      }
      if (metadata.userAgent.includes('Mobile')) score += 5; // Mobile brukere ofte ekte
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Hash streng for anonym tracking
   */
  private static async hashString(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
  }

  /**
   * Hent klient IP (mock i browser)
   */
  private static getClientIP(): string {
    // I en ekte implementasjon ville dette komme fra server-side
    return 'client-browser';
  }

  /**
   * Send e-post notifikasjon
   */
  private static async sendEmailNotification(
    contactData: ContactFormData,
    securityScore: number
  ): Promise<void> {
    try {
      const subject = `${securityScore < 60 ? '⚠️ ' : ''}Ny kontaktmelding fra ${contactData.name}`;
      
      const emailContent = {
        to: 'studio@urbanstudios.no',
        subject,
        body: `
          Ny kontaktmelding mottatt:
          
          Navn: ${contactData.name}
          E-post: ${contactData.email}
          Telefon: ${contactData.phone || 'Ikke oppgitt'}
          Sikkerhetsscore: ${securityScore}/100
          
          Melding:
          ${contactData.message}
          
          ---
          Sendt: ${new Date().toLocaleString('no-NO')}
          ${securityScore < 60 ? '\n⚠️ Lav sikkerhetsscore - vurder ekstra kontroll' : ''}
        `
      };

      // I produksjon: integrer med e-post tjeneste
      console.log('📧 E-post som ville blitt sendt:', emailContent);
      
      // Eksempel integrasjon:
      // await emailService.send(emailContent);
      // eller
      // await functions.createExecution('sendEmail', JSON.stringify(emailContent));
      
    } catch (error) {
      console.error('Failed to send email notification:', error);
      // Ikke kast error - kontaktskjemaet er allerede lagret
    }
  }

  /**
   * Hent alle kontakter (admin-funksjon)
   */
  static async getAllContacts(): Promise<ContactDocument[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.CONTACTS,
        [
          Query.orderDesc('created_at'),
          Query.limit(100)
        ]
      );

      return response.documents.map(doc => ({
        $id: doc.$id,
        name: doc.name as string,
        email: doc.email as string,
        phone: doc.phone as string | undefined,
        message: doc.message as string,
        status: doc.status as 'new' | 'read' | 'replied' | 'spam',
        created_at: doc.created_at as string,
        ip_hash: doc.ip_hash as string | undefined,
        user_agent_hash: doc.user_agent_hash as string | undefined,
        security_score: doc.security_score as number,
      }));
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      throw new Error('Kunne ikke hente kontaktmeldinger.');
    }
  }

  /**
   * Marker kontakt som lest
   */
  static async markAsRead(contactId: string): Promise<void> {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.CONTACTS,
        contactId,
        { status: 'read' }
      );
    } catch (error) {
      console.error('Failed to mark contact as read:', error);
      throw error;
    }
  }

  /**
   * Marker kontakt som spam
   */
  static async markAsSpam(contactId: string): Promise<void> {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.CONTACTS,
        contactId,
        { status: 'spam' }
      );
    } catch (error) {
      console.error('Failed to mark contact as spam:', error);
      throw error;
    }
  }
}