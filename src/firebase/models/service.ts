import { db } from '../config';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit,
  DocumentData
} from 'firebase/firestore';

// Service Category enum
export enum ServiceCategory {
  WASH = 'wash',
  DETAIL = 'detail',
  MAINTENANCE = 'maintenance'
}

// Service interface
export interface Service {
  id?: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: ServiceCategory;
  isActive: boolean;
  imageUrl?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// Collection reference
const servicesRef = collection(db, 'services');

// Service methods
export const serviceService = {
  // Create a new service
  async createService(service: Service): Promise<string> {
    const newServiceRef = doc(servicesRef);
    const serviceWithId = { 
      ...service, 
      id: newServiceRef.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await setDoc(newServiceRef, serviceWithId);
    return newServiceRef.id;
  },

  // Get a service by ID
  async getService(id: string): Promise<Service | null> {
    const serviceDoc = await getDoc(doc(servicesRef, id));
    
    if (serviceDoc.exists()) {
      return serviceDoc.data() as Service;
    } else {
      return null;
    }
  },

  // Get all services
  async getAllServices(): Promise<Service[]> {
    const querySnapshot = await getDocs(servicesRef);
    return querySnapshot.docs.map((doc) => doc.data() as Service);
  },

  // Get services by category
  async getServicesByCategory(category: ServiceCategory): Promise<Service[]> {
    const q = query(servicesRef, where("category", "==", category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Service);
  },

  // Get active services
  async getActiveServices(): Promise<Service[]> {
    const q = query(servicesRef, where("isActive", "==", true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Service);
  },

  // Update a service
  async updateService(id: string, data: Partial<Service>): Promise<void> {
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    await updateDoc(doc(servicesRef, id), updateData);
  },

  // Delete a service
  async deleteService(id: string): Promise<void> {
    await deleteDoc(doc(servicesRef, id));
  },

  // Get services sorted by price
  async getServicesSortedByPrice(ascending: boolean = true): Promise<Service[]> {
    const q = query(
      servicesRef,
      orderBy("price", ascending ? "asc" : "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Service);
  }
};

export default serviceService; 