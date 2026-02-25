import { db } from "../../../config/firebaseConfig";

// Create document
export const createDocument = async (
  collectionName: string,
  data: any
): Promise<string> => {
  const docRef = await db.collection(collectionName).add(data);
  return docRef.id;
};

// Get all documents
export const getDocuments = async (collectionName: string) => {
  return await db.collection(collectionName).get();
};

// Get document by ID
export const getDocumentById = async (
  collectionName: string,
  id: string
) => {
  const doc = await db.collection(collectionName).doc(id).get();
  return doc.exists ? doc : null;
};

// Update document
export const updateDocument = async (
  collectionName: string,
  id: string,
  data: any
) => {
  await db.collection(collectionName).doc(id).update(data);
};

// Delete document
export const deleteDocument = async (
  collectionName: string,
  id: string
) => {
  await db.collection(collectionName).doc(id).delete();
};