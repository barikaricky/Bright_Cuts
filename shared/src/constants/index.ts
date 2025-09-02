// GROOMOSPHERE Brand Colors
export const COLORS = {
  primary: {
    DEFAULT: '#003366',
    50: '#e6f1ff',
    100: '#cce3ff',
    200: '#99c7ff',
    300: '#66abff',
    400: '#338fff',
    500: '#0073ff',
    600: '#005ce6',
    700: '#0044b3',
    800: '#003366',
    900: '#002244',
  },
  secondary: {
    DEFAULT: '#FFD700',
    50: '#fffef0',
    100: '#fffde0',
    200: '#fffcc2',
    300: '#fffa85',
    400: '#fff547',
    500: '#FFD700',
    600: '#e6c200',
    700: '#b39600',
    800: '#806d00',
    900: '#4d4100',
  },
  accent: {
    DEFAULT: '#F2F2F2',
    50: '#ffffff',
    100: '#fafafa',
    200: '#f5f5f5',
    300: '#F2F2F2',
    400: '#e0e0e0',
    500: '#cccccc',
    600: '#999999',
    700: '#666666',
    800: '#333333',
    900: '#000000',
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#999999',
    inverse: '#FFFFFF',
  },
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const;

// Typography
export const FONTS = {
  primary: 'Poppins',
  secondary: 'Roboto',
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

// Border Radius
export const BORDER_RADIUS = {
  sm: 4,
  default: 8,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
  },
  USERS: {
    PROFILE: '/api/users/profile',
    LOCATION: '/api/users/location',
  },
  BARBERS: {
    NEARBY: '/api/barbers/nearby',
    PROFILE: '/api/barbers/profile',
    AVAILABILITY: '/api/barbers/availability',
    DASHBOARD: '/api/barbers/dashboard/stats',
  },
  BOOKINGS: {
    CREATE: '/api/bookings',
    MY_BOOKINGS: '/api/bookings/my-bookings',
    BY_ID: '/api/bookings',
    STATUS: '/api/bookings/:id/status',
    CANCEL: '/api/bookings/:id/cancel',
    RATE: '/api/bookings/:id/rate',
  },
  PAYMENTS: {
    INITIALIZE: '/api/payments/initialize',
    VERIFY: '/api/payments/verify',
    WEBHOOK: '/api/payments/webhook',
  },
  ADMIN: {
    DASHBOARD: '/api/admin/dashboard',
    BARBERS_PENDING: '/api/admin/barbers/pending',
    VERIFY_BARBER: '/api/admin/barbers/:id/verify',
    BOOKINGS: '/api/admin/bookings',
    REVENUE: '/api/admin/revenue',
    TOGGLE_USER: '/api/admin/users/:id/toggle-status',
  },
} as const;

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'GROOMOSPHERE',
  APP_TAGLINE: 'Professional Barber Services, On-Demand',
  DEFAULT_RADIUS: 10, // kilometers
  PLATFORM_COMMISSION: 0.2, // 20%
  BOOKING_DURATION: 60, // minutes
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/, // International phone format
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  REVIEW_MAX_LENGTH: 500,
  NOTES_MAX_LENGTH: 500,
} as const;

// Default Values
export const DEFAULTS = {
  BARBER_PRICING: {
    haircut: 5000, // Naira
    beard: 2000,
    styling: 3000,
    treatment: 4000,
  },
  WORKING_HOURS: {
    start: '09:00',
    end: '18:00',
  },
  SERVICE_RADIUS: 10, // kilometers
  RATING: {
    average: 0,
    count: 0,
  },
  PAGINATION: {
    page: 1,
    limit: 10,
  },
} as const;

// Booking Status Options
export const BOOKING_STATUSES = [
  { value: 'pending', label: 'Pending', color: COLORS.status.warning },
  { value: 'accepted', label: 'Accepted', color: COLORS.status.info },
  { value: 'in_progress', label: 'In Progress', color: COLORS.primary.DEFAULT },
  { value: 'completed', label: 'Completed', color: COLORS.status.success },
  { value: 'cancelled', label: 'Cancelled', color: COLORS.status.error },
] as const;

// Service Types
export const SERVICE_TYPES = [
  { value: 'haircut', label: 'Haircut', icon: '✂️' },
  { value: 'beard', label: 'Beard Trim', icon: '🧔' },
  { value: 'styling', label: 'Hair Styling', icon: '💇' },
  { value: 'treatment', label: 'Hair Treatment', icon: '🧴' },
] as const;

// Days of Week
export const DAYS_OF_WEEK = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
] as const;

// Nigerian States
export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
  'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe', 'Imo', 'Jigawa',
  'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
  'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
] as const;