// Menu Categories
export const MENU_CATEGORIES = [
  { id: 'appetizers', label: 'Appetizers' },
  { id: 'soups', label: 'Soups' },
  { id: 'mains', label: 'Main Courses' },
  { id: 'rice', label: 'Rice & Noodles' },
  { id: 'vegetables', label: 'Vegetables' },
  { id: 'seafood', label: 'Seafood' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'beverages', label: 'Beverages' },
];

// API Base URL
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit/Debit Card' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'upi', label: 'UPI' },
];

// Order Status
export const ORDER_STATUS = [
  { id: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  { id: 'preparing', label: 'Preparing', color: 'bg-purple-100 text-purple-800' },
  { id: 'ready', label: 'Ready for Pickup', color: 'bg-green-100 text-green-800' },
  { id: 'delivered', label: 'Delivered', color: 'bg-gray-100 text-gray-800' },
  { id: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
];

// Reservation Status
export const RESERVATION_STATUS = [
  { id: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'confirmed', label: 'Confirmed', color: 'bg-green-100 text-green-800' },
  { id: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  { id: 'completed', label: 'Completed', color: 'bg-gray-100 text-gray-800' },
];

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+\d{1,3})?[\d\s\-\(\)]{10,}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};
