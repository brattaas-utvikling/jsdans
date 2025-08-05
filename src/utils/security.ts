// utils/security.ts
export class SecurityLogger {
  static logSubmission(data: {
    email: string;
    ip?: string;
    userAgent?: string;
    timestamp: string;
  }) {
    // I produksjon: send til logging service (Sentry, LogRocket etc.)
    // Submission logged successfully (silent)
    void data; // Mark as used to avoid eslint warning
  }

  static logSuspiciousActivity(reason: string, identifier: string) {
    // I produksjon: Send alert til admin
    // await notifyAdmin({ reason, identifier, timestamp: new Date() });

    // Store for potential analysis (silent)
    void reason; // Mark as used
    void identifier; // Mark as used

    // Could be sent to monitoring service in production
  }

  static logRateLimitHit(identifier: string, attempts: number) {
    this.logSuspiciousActivity(
      `Rate limit exceeded: ${attempts} attempts`,
      identifier,
    );
  }
}

export class InputSanitizer {
  // Fjern potensielt farlige tegn og HTML
  static sanitizeText(input: string): string {
    if (!input) return "";

    return (
      input
        .trim()
        // Fjern HTML tags
        .replace(/<[^>]*>/g, "")
        // Fjern script-farlige tegn
        .replace(/[<>'"&]/g, (match) => {
          const entityMap: Record<string, string> = {
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "&": "&amp;",
          };
          return entityMap[match] || match;
        })
        // Fjern excessive whitespace
        .replace(/\s+/g, " ")
        .trim()
        // Hard limit
        .substring(0, 2000)
    );
  }

  static sanitizeEmail(email: string): string {
    if (!email) return "";

    return (
      email
        .trim()
        .toLowerCase()
        // Kun gyldige e-post tegn
        .replace(/[^a-zA-Z0-9@._-]/g, "")
        .substring(0, 254)
    ); // RFC 5321 limit
  }

  static sanitizePhone(phone: string): string {
    if (!phone) return "";

    return (
      phone
        .trim()
        // Kun gyldige telefon-tegn
        .replace(/[^0-9+\s()-]/g, "")
        .substring(0, 20)
    );
  }

  static sanitizeName(name: string): string {
    if (!name) return "";

    return (
      name
        .trim()
        // Tillat bokstaver, mellomrom, bindestrek og apostrof
        .replace(/[^a-zA-ZæøåÆØÅ\s'-]/g, "")
        .replace(/\s+/g, " ")
        .substring(0, 100)
    );
  }
}

// Rate Limiter med localStorage backup
export class RateLimiter {
  private static readonly STORAGE_KEY = "contact_submissions";
  private static readonly MAX_REQUESTS = 3;
  private static readonly WINDOW_MS = 60000; // 1 minutt
  private static readonly DAILY_LIMIT = 10;
  private static readonly DAILY_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 timer

  private static getStoredSubmissions(): Array<{
    timestamp: number;
    identifier: string;
  }> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private static setStoredSubmissions(
    submissions: Array<{ timestamp: number; identifier: string }>,
  ): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(submissions));
    } catch {
      // Ignore storage errors
    }
  }

  static isAllowed(identifier: string): {
    allowed: boolean;
    reason?: string;
    waitTime?: number;
  } {
    const now = Date.now();
    const submissions = this.getStoredSubmissions();

    // Rens gamle submissions
    const validSubmissions = submissions.filter(
      (sub) => now - sub.timestamp < this.DAILY_WINDOW_MS,
    );

    // Sjekk daglig limit
    const todaySubmissions = validSubmissions.filter(
      (sub) => sub.identifier === identifier,
    );

    if (todaySubmissions.length >= this.DAILY_LIMIT) {
      SecurityLogger.logRateLimitHit(identifier, todaySubmissions.length);
      return {
        allowed: false,
        reason: "Daglig grense overskredet",
        waitTime: this.DAILY_WINDOW_MS - (now - todaySubmissions[0].timestamp),
      };
    }

    // Sjekk minutt-limit
    const recentSubmissions = todaySubmissions.filter(
      (sub) => now - sub.timestamp < this.WINDOW_MS,
    );

    if (recentSubmissions.length >= this.MAX_REQUESTS) {
      SecurityLogger.logRateLimitHit(identifier, recentSubmissions.length);
      return {
        allowed: false,
        reason: "For mange forsøk. Prøv igjen om litt.",
        waitTime: this.WINDOW_MS - (now - recentSubmissions[0].timestamp),
      };
    }

    return { allowed: true };
  }

  static recordSubmission(identifier: string): void {
    const submissions = this.getStoredSubmissions();
    submissions.push({
      timestamp: Date.now(),
      identifier,
    });

    // Behold kun submissions fra siste 24 timer
    const filtered = submissions.filter(
      (sub) => Date.now() - sub.timestamp < this.DAILY_WINDOW_MS,
    );

    this.setStoredSubmissions(filtered);
  }

  static formatWaitTime(ms: number): string {
    const minutes = Math.ceil(ms / 60000);
    const hours = Math.ceil(ms / 3600000);

    if (ms < 60000) return "mindre enn et minutt";
    if (ms < 3600000) return `${minutes} minutt${minutes > 1 ? "er" : ""}`;
    return `${hours} time${hours > 1 ? "r" : ""}`;
  }
}

// Honeypot field for bot detection
export class BotDetection {
  private static readonly HONEYPOT_FIELD = "website_url"; // Felt som bots fyller ut
  private static readonly MIN_FILL_TIME = 3000; // Minimum tid for å fylle ut skjema

  // Returnerer props for honeypot field istedenfor JSX
  static getHoneypotProps() {
    return {
      fieldName: this.HONEYPOT_FIELD,
      style: {
        position: "absolute" as const,
        left: "-9999px",
        opacity: 0,
        pointerEvents: "none" as const,
      },
      inputProps: {
        type: "text" as const,
        name: this.HONEYPOT_FIELD,
        id: this.HONEYPOT_FIELD,
        tabIndex: -1,
        autoComplete: "off" as const,
      },
    };
  }

  static validateSubmission(
    formData: FormData,
    startTime: number,
  ): { isBot: boolean; reason?: string } {
    const honeypotValue = formData.get(this.HONEYPOT_FIELD);
    const fillTime = Date.now() - startTime;

    // Sjekk honeypot
    if (honeypotValue && String(honeypotValue).trim() !== "") {
      SecurityLogger.logSuspiciousActivity(
        "Honeypot field filled",
        "bot-detection",
      );
      return { isBot: true, reason: "Bot detected: honeypot field filled" };
    }

    // Sjekk om skjemaet ble fylt ut for raskt
    if (fillTime < this.MIN_FILL_TIME) {
      SecurityLogger.logSuspiciousActivity(
        `Form filled too quickly: ${fillTime}ms`,
        "bot-detection",
      );
      return { isBot: true, reason: "Bot detected: form filled too quickly" };
    }

    return { isBot: false };
  }
}
