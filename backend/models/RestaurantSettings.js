const mongoose = require('mongoose');

const restaurantSettingsSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      default: 'KGN Chinese Corner',
    },
    logo: {
      type: String,
      default: null,
    },
    heroImage: {
      type: String,
      default: null,
    },
    tagline: {
      type: String,
      default: 'Authentic Chinese Cuisine',
    },
    description: {
      type: String,
      default: 'Welcome to KGN Chinese Corner - Where tradition meets taste.',
    },
    email: {
      type: String,
      default: 'contact@kgnrestaurant.com',
    },
    phone: {
      type: String,
      default: '+1 (555) 123-4567',
    },
    address: {
      type: String,
      default: '123 Main Street, City, State 12345',
    },
    mapUrl: {
      type: String,
      default: '',
    },
    openingHours: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        monday: { open: '11:00', close: '22:00', isClosed: false },
        tuesday: { open: '11:00', close: '22:00', isClosed: false },
        wednesday: { open: '11:00', close: '22:00', isClosed: false },
        thursday: { open: '11:00', close: '22:00', isClosed: false },
        friday: { open: '11:00', close: '23:00', isClosed: false },
        saturday: { open: '11:00', close: '23:00', isClosed: false },
        sunday: { open: '12:00', close: '22:00', isClosed: false },
      },
    },
    socialMedia: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
      },
    },
    theme: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        primaryColor: '#c41e3a',
        secondaryColor: '#ffc72c',
        textColor: '#333333',
        backgroundColor: '#ffffff',
        fontFamily: 'Poppins, sans-serif',
      },
    },
    seoSettings: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        metaTitle: 'KGN Chinese Corner - Authentic Indo Chinese Cuisine',
        metaDescription: 'Experience authentic Indo-Chinese cuisine at KGN Chinese Corner. Book your table online now.',
        metaKeywords: 'chinese restaurant, indo chinese, dine-in, delivery',
        ogImage: null,
      },
    },
    features: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        enableReservations: true,
        enableOnlineOrdering: true,
        enableDelivery: true,
        enablePickup: true,
        enablePayments: true,
      },
    },
    taxRate: {
      type: Number,
      default: 0.05,
    },
    deliveryFee: {
      type: Number,
      default: 2.99,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RestaurantSettings', restaurantSettingsSchema);
