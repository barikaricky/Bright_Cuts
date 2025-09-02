// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'customer' | 'barber' | 'admin';
  profileImage?: string;
  isVerified: boolean;
  isActive: boolean;
  address?: Address;
  location?: Location;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Location {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

// Barber Types
export interface Barber {
  id: string;
  userId: string;
  user?: User;
  specialties: string[];
  experience: number;
  pricing: BarberPricing;
  portfolio: PortfolioItem[];
  availability: BarberAvailability;
  rating: Rating;
  earnings: BarberEarnings;
  completedBookings: number;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  verificationDocuments: VerificationDocument[];
  bankDetails?: BankDetails;
  serviceRadius: number;
  createdAt: string;
  updatedAt: string;
}

export interface BarberPricing {
  haircut: number;
  beard?: number;
  styling?: number;
  treatment?: number;
}

export interface PortfolioItem {
  imageUrl: string;
  description: string;
  uploadedAt: string;
}

export interface BarberAvailability {
  isAvailable: boolean;
  workingHours: {
    monday?: WorkingHours;
    tuesday?: WorkingHours;
    wednesday?: WorkingHours;
    thursday?: WorkingHours;
    friday?: WorkingHours;
    saturday?: WorkingHours;
    sunday?: WorkingHours;
  };
}

export interface WorkingHours {
  start: string; // HH:MM format
  end: string;   // HH:MM format
}

export interface Rating {
  average: number;
  count: number;
}

export interface BarberEarnings {
  total: number;
  pending: number;
  thisMonth: number;
}

export interface VerificationDocument {
  type: string;
  description: string;
  uploadedAt: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

// Booking Types
export interface Booking {
  id: string;
  customerId: string;
  barberId: string;
  customer?: User;
  barber?: Barber;
  services: BookingService[];
  totalAmount: number;
  platformFee: number;
  barberEarnings: number;
  status: BookingStatus;
  scheduledFor: string;
  customerLocation: CustomerLocation;
  customerNotes?: string;
  barberNotes?: string;
  estimatedDuration: number;
  actualStartTime?: string;
  actualEndTime?: string;
  cancellationReason?: string;
  cancelledBy?: 'customer' | 'barber' | 'admin';
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  rating?: BookingRating;
  createdAt: string;
  updatedAt: string;
}

export interface BookingService {
  name: string;
  price: number;
}

export interface CustomerLocation {
  address: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface BookingRating {
  score: number;
  review?: string;
  ratedAt: string;
}

export type BookingStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role?: 'customer' | 'barber';
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Search and Filter Types
export interface BarberSearchParams {
  latitude: number;
  longitude: number;
  radius?: number;
  specialties?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
}

export interface BookingFilters {
  status?: BookingStatus;
  dateFrom?: string;
  dateTo?: string;
  barberId?: string;
  customerId?: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'verification' | 'general';
  isRead: boolean;
  data?: any;
  createdAt: string;
}

// Payment Types
export interface PaymentRequest {
  amount: number;
  bookingId: string;
  paymentMethod?: 'paystack' | 'flutterwave';
}

export interface PaymentResponse {
  paymentReference: string;
  paymentUrl: string;
  status: string;
}

// Admin Types
export interface AdminStats {
  totalUsers: number;
  totalBarbers: number;
  pendingBarbers: number;
  totalBookings: number;
  completedBookings: number;
  totalRevenue: number;
}

export interface RevenueAnalytics {
  period: string;
  totalRevenue: number;
  totalBookings: number;
  totalAmount: number;
}