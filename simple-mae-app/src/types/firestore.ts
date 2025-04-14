export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'staff' | 'customer';
  phoneNumber?: string;
  createdAt: Date;
  lastLogin: Date;
  profileImageUrl?: string;
}

export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  vehicleType: string;
  images: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  userId: string;
  vehicleId: string;
  services: string[]; // array of service IDs
  date: Date;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  staffId?: string;
  notes?: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  appointmentId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'refunded';
  paymentMethod: string;
  receiptUrl?: string;
  createdAt: Date;
  refundedAt?: Date;
}

export interface Review {
  id: string;
  userId: string;
  appointmentId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
} 