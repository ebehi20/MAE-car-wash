# Firebase Integration for MAE Car Wash Application

This document provides information on how to set up and use Firebase with your MAE Car Wash application.

## Setup Instructions

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the setup steps
3. Give your project a name (e.g., "mae-car-wash")
4. Enable Google Analytics if desired
5. Create the project

### 2. Register Your Web App

1. In the Firebase Console, click the web icon (</>) to add a web app
2. Register your app with a nickname (e.g., "mae-car-wash-web")
3. Optionally set up Firebase Hosting
4. Copy the Firebase configuration object

### 3. Update Your Configuration

1. Open `src/firebase/config.ts`
2. Replace the placeholder configuration with your Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Set Up Firestore Database

1. In the Firebase Console, navigate to "Firestore Database"
2. Click "Create Database"
3. Choose "Start in test mode" for development (remember to set up proper security rules later)
4. Select a location for your database
5. Wait for the database to be provisioned

## Database Structure

The application uses the following Firestore collections:

### Customers Collection
Stores customer information, including:
- Personal details (name, email, phone)
- Status (active, inactive, VIP)
- Vehicles owned
- Service history

### Services Collection
Stores service offerings, including:
- Service details (name, description)
- Pricing
- Duration
- Category (wash, detail, maintenance)

### Appointments Collection
Stores appointment bookings, including:
- Customer details
- Vehicle information
- Selected services
- Date and time
- Staff assignment
- Status (scheduled, confirmed, in-progress, completed, cancelled)

## Using Firebase in Components

### Authentication
```typescript
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Sign in a user
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};
```

### Firestore Operations
```typescript
import { customerService, serviceService, appointmentService } from '../firebase';

// Get all customers
const customers = await customerService.getAllCustomers();

// Add a new service
const serviceId = await serviceService.createService({
  name: 'Premium Wash',
  description: 'Complete exterior wash with wax and polish',
  price: 29.99,
  duration: 45,
  category: 'wash',
  isActive: true
});

// Create an appointment
const appointmentId = await appointmentService.createAppointment({
  customerId: 'customer-id',
  customerName: 'John Smith',
  services: [{
    serviceId: 'service-id',
    serviceName: 'Premium Wash',
    price: 29.99
  }],
  date: new Date(),
  time: '10:00 AM',
  duration: 45,
  status: 'scheduled',
  totalPrice: 29.99
});
```

## Testing Firebase Integration

The application includes a helper function to initialize sample data for testing:

1. Navigate to the Customers page in the application
2. Click the "Initialize Firebase Demo Data" button
3. This will create sample services, a customer, and an appointment

## Security Rules

For production, update your Firestore security rules to:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Add proper authentication and validation rules
    match /customers/{customerId} {
      allow read, write: if request.auth != null;
    }
    
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Storage](https://firebase.google.com/docs/storage) 