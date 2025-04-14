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
  Timestamp,
  DocumentData
} from 'firebase/firestore';

// Appointment Status enum
export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no-show'
}

// Appointment interface
export interface Appointment {
  id?: string;
  customerId: string;
  customerName?: string; // For easier display
  vehicleId?: string;
  vehicleInfo?: string; // For easier display
  services: {
    serviceId: string;
    serviceName: string;
    price: number;
  }[];
  date: Timestamp | Date | string;
  time: string;
  duration: number; // in minutes
  status: AppointmentStatus;
  staffId?: string;
  staffName?: string; // For easier display
  notes?: string;
  totalPrice: number;
  createdAt?: Timestamp | Date | string;
  updatedAt?: Timestamp | Date | string;
  specialRequests?: string;
}

// Collection reference
const appointmentsRef = collection(db, 'appointments');

// Appointment methods
export const appointmentService = {
  // Create a new appointment
  async createAppointment(appointment: Appointment): Promise<string> {
    const newAppointmentRef = doc(appointmentsRef);
    
    // Convert date to Timestamp if it's a Date object
    let appointmentData = { ...appointment };
    if (appointment.date instanceof Date) {
      appointmentData.date = Timestamp.fromDate(appointment.date);
    }
    
    const appointmentWithId = { 
      ...appointmentData, 
      id: newAppointmentRef.id,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      status: appointment.status || AppointmentStatus.SCHEDULED
    };
    
    await setDoc(newAppointmentRef, appointmentWithId);
    return newAppointmentRef.id;
  },

  // Get an appointment by ID
  async getAppointment(id: string): Promise<Appointment | null> {
    const appointmentDoc = await getDoc(doc(appointmentsRef, id));
    
    if (appointmentDoc.exists()) {
      return appointmentDoc.data() as Appointment;
    } else {
      return null;
    }
  },

  // Get all appointments
  async getAllAppointments(): Promise<Appointment[]> {
    const querySnapshot = await getDocs(appointmentsRef);
    return querySnapshot.docs.map((doc) => doc.data() as Appointment);
  },

  // Get appointments for a specific day
  async getAppointmentsByDate(date: Date): Promise<Appointment[]> {
    // Create timestamp for the beginning of the day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const startTimestamp = Timestamp.fromDate(startDate);
    
    // Create timestamp for the end of the day
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    const endTimestamp = Timestamp.fromDate(endDate);
    
    const q = query(
      appointmentsRef, 
      where("date", ">=", startTimestamp),
      where("date", "<=", endTimestamp)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Appointment);
  },

  // Get appointments by status
  async getAppointmentsByStatus(status: AppointmentStatus): Promise<Appointment[]> {
    const q = query(appointmentsRef, where("status", "==", status));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Appointment);
  },

  // Get appointments for a specific customer
  async getAppointmentsByCustomer(customerId: string): Promise<Appointment[]> {
    const q = query(
      appointmentsRef, 
      where("customerId", "==", customerId),
      orderBy("date", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Appointment);
  },

  // Update an appointment
  async updateAppointment(id: string, data: Partial<Appointment>): Promise<void> {
    const updateData = {
      ...data,
      updatedAt: Timestamp.now()
    };
    
    // Convert date to Timestamp if it's a Date object
    if (data.date instanceof Date) {
      updateData.date = Timestamp.fromDate(data.date);
    }
    
    await updateDoc(doc(appointmentsRef, id), updateData);
  },

  // Update appointment status
  async updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<void> {
    await updateDoc(doc(appointmentsRef, id), { 
      status: status,
      updatedAt: Timestamp.now()
    });
  },

  // Delete an appointment
  async deleteAppointment(id: string): Promise<void> {
    await deleteDoc(doc(appointmentsRef, id));
  },

  // Get upcoming appointments
  async getUpcomingAppointments(limit: number = 10): Promise<Appointment[]> {
    const now = Timestamp.now();
    
    const q = query(
      appointmentsRef,
      where("date", ">=", now),
      where("status", "in", [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED]),
      orderBy("date", "asc"),
      limit
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Appointment);
  },

  // Get today's appointments
  async getTodaysAppointments(): Promise<Appointment[]> {
    const today = new Date();
    return this.getAppointmentsByDate(today);
  }
};

export default appointmentService; 