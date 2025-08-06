/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPWRITE_ENDPOINT: string;
  readonly VITE_APPWRITE_PROJECT_ID: string;
  // Legg til flere env variabler her senere for Vipps
  readonly VITE_VIPPS_MERCHANT_SERIAL_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
