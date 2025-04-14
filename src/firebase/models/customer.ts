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
  limit
} from 'firebase/firestore';

// Customer interface
export interface Customer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  joinDate: Date | string;
  status: 'active' | 'inactive' | 'vip';
  notes?: string;
  vehicles: Vehicle[];
  recentServices?: ServiceRecord[];
}

// Vehicle interface
export interface Vehicle {
  id?: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color?: string;
  vinNumber?: string;
}

// Service record interface
export interface ServiceRecord {
  id?: string;
  date: Date | string;
  serviceType: string;
  price: number;
  notes?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

// Collection reference
const customersRef = collection(db, 'customers');

// Customer service methods
export const customerService = {
  // Create a new customer
  async createCustomer(customer: Customer): Promise<string> {
    const newCustomerRef = doc(customersRef);
    const customerWithId = { ...customer, id: newCustomerRef.id };
    
    await setDoc(newCustomerRef, customerWithId);
    return newCustomerRef.id;
  },

  // Get a customer by ID
  async getCustomer(id: string): Promise<Customer | null> {
    const customerDoc = await getDoc(doc(customersRef, id));
    
    if (customerDoc.exists()) {
      return customerDoc.data() as Customer;
    } else {
      return null;
    }
  },

  // Get all customers
  async getAllCustomers(): Promise<Customer[]> {
    const querySnapshot = await getDocs(customersRef);
    return querySnapshot.docs.map(doc => doc.data() as Customer);
  },

  // Get customers by status
  async getCustomersByStatus(status: string): Promise<Customer[]> {
    const q = query(customersRef, where("status", "==", status));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Customer);
  },

  // Update a customer
  async updateCustomer(id: string, data: Partial<Customer>): Promise<void> {
    await updateDoc(doc(customersRef, id), data);
  },

  // Delete a customer
  async deleteCustomer(id: string): Promise<void> {
    await deleteDoc(doc(customersRef, id));
  },

  // Search customers
  async searchCustomers(searchTerm: string): Promise<Customer[]> {
    // Note: Firestore doesn't support native text search
    // For a production app, consider using Algolia or ElasticSearch
    // This is a simple implementation that gets all customers and filters client-side
    const querySnapshot = await getDocs(customersRef);
    const customers = querySnapshot.docs.map(doc => doc.data() as Customer);
    
    return customers.filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.vehicles.some(vehicle => 
        vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  },

  // Get recent customers
  async getRecentCustomers(count: number = 10): Promise<Customer[]> {
    const q = query(
      customersRef,
      orderBy("joinDate", "desc"),
      limit(count)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Customer);
  }
};

export default customerService; 