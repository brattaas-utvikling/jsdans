// src/lib/storageHelpers.ts - Fikset versjon
import { storage, BUCKET_ID } from "@/lib/appwrite"; // Importer BUCKET_ID fra appwrite config

/**
 * Henter download URL for timeplan PDF fra Appwrite Storage
 */
export const getTimeplanDownloadUrl = async (): Promise<string> => {
  try {
    // Sjekk at BUCKET_ID er definert
    if (!BUCKET_ID) {
      throw new Error("BUCKET_ID er ikke konfigurert i environment variabler");
    }
    
    // List alle filer i bucket
    const filesList = await storage.listFiles(BUCKET_ID);
    
    // Finn PDF-filer
    const pdfFiles = filesList.files.filter(file => 
      file.name.toLowerCase().endsWith('.pdf')
    );
    
    if (pdfFiles.length === 0) {
      throw new Error("Ingen PDF-filer funnet i bucket");
    }
    
    // Ta den nyeste PDF-filen
    const targetFile = pdfFiles.sort((a, b) => 
      new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
    )[0];
    
    // Generer download URL
    const downloadUrl = storage.getFileDownload(BUCKET_ID, targetFile.$id);
    return downloadUrl.toString();
    
  } catch (error) {
    console.error("❌ Feil i getTimeplanDownloadUrl:", error);
    throw error;
  }
};

/**
 * Alternativ: Bruk direkte fil-ID hvis du vet den
 */
export const getTimeplanByFileId = (fileId: string): string => {
  try {
    if (!BUCKET_ID) {
      throw new Error("BUCKET_ID er ikke konfigurert");
    }
    
    const downloadUrl = storage.getFileDownload(BUCKET_ID, fileId);
    
    return downloadUrl.toString();
  } catch (error) {
    console.error("❌ Feil med direkte fil-ID:", error);
    throw error;
  }
};

/**
 * Debug-funksjon for å teste bucket-tilkobling
 */
export const testBucketConnection = async (): Promise<boolean> => {
  try {
    
    if (!BUCKET_ID) {
      console.error("❌ BUCKET_ID er undefined");
      return false;
    }
    await storage.listFiles(BUCKET_ID);
    
    return true;
  } catch (error) {
    console.error("❌ Bucket tilkobling feilet:", error);
    return false;
  }
};