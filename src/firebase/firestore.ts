import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './config';

// Generic CRUD operations
export const firestoreService = {
  // Create a new document
  async create(collectionName: string, data: any) {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  // Read a document
  async get(collectionName: string, id: string) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  },

  // Update a document
  async update(collectionName: string, id: string, data: Partial<DocumentData>) {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  },

  // Delete a document
  async delete(collectionName: string, id: string) {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  },

  // Query documents
  async query(collectionName: string, conditions: Array<{ field: string; operator: string; value: any }>, orderByField?: string) {
    const collectionRef = collection(db, collectionName);
    let q = query(collectionRef);

    // Add where clauses
    conditions.forEach(condition => {
      q = query(q, where(condition.field, condition.operator as any, condition.value));
    });

    // Add orderBy if specified
    if (orderByField) {
      q = query(q, orderBy(orderByField));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}; 