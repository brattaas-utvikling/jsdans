// src/lib/appwrite.ts - Oppdatert for Appwrite v18
import { Client, Databases, Account, Query } from 'appwrite';

// Initialize Appwrite client
const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT as string || 'https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID as string);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);

// Database and Collection IDs
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID || 'main';

export const COLLECTIONS = {
  DANCE_CLASSES: import.meta.env.VITE_DANCE_CLASSES_COLLECTION_ID || 'dance_classes',
  SCHEDULES: import.meta.env.VITE_SCHEDULES_COLLECTION_ID || 'schedules',
  PRICING_PACKAGES: import.meta.env.VITE_PRICING_PACKAGES_COLLECTION_ID || 'pricing_packages',
  ORDERS: import.meta.env.VITE_ORDERS_COLLECTION_ID || 'orders',
  ORDER_ITEMS: import.meta.env.VITE_ORDER_ITEMS_COLLECTION_ID || 'order_items',
  FAMILY_GROUPS: import.meta.env.VITE_FAMILY_GROUPS_COLLECTION_ID || 'family_groups',
  NEWS: import.meta.env.VITE_NEWS_COLLECTION_ID || 'news',
} as const;

// Export Query for filtering (Appwrite v18)
export { Query };

// Helper function for creating documents with proper error handling
export const createDocument = async (
  databaseId: string,
  collectionId: string,
  documentId: string,
  data: Record<string, any>
) => {
  try {
    return await databases.createDocument(databaseId, collectionId, documentId, data);
  } catch (error) {
    console.error('Failed to create document:', error);
    throw error;
  }
};

// Helper function for updating documents
export const updateDocument = async (
  databaseId: string,
  collectionId: string,
  documentId: string,
  data: Record<string, any>
) => {
  try {
    return await databases.updateDocument(databaseId, collectionId, documentId, data);
  } catch (error) {
    console.error('Failed to update document:', error);
    throw error;
  }
};

// Helper function for listing documents with optional queries
export const listDocuments = async (
  databaseId: string,
  collectionId: string,
  queries: string[] = []
) => {
  try {
    return await databases.listDocuments(databaseId, collectionId, queries);
  } catch (error) {
    console.error('Failed to list documents:', error);
    throw error;
  }
};

// Helper function for getting a single document
export const getDocument = async (
  databaseId: string,
  collectionId: string,
  documentId: string
) => {
  try {
    return await databases.getDocument(databaseId, collectionId, documentId);
  } catch (error) {
    console.error('Failed to get document:', error);
    throw error;
  }
};

export { client };