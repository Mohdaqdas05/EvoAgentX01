const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a dish name'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    category: {
      type: String,
      enum: ['appetizers', 'mains', 'vegetables', 'noodles', 'rice', 'desserts', 'beverages'],
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    isChefRecommendation: {
      type: Boolean,
      default: false,
    },
    isDietaryFriendly: {
      type: [String],
      enum: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'spicy'],
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    calories: {
      type: Number,
      default: null,
    },
    preparationTime: {
      type: Number,
      default: 15, // in minutes
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

module.exports = mongoose.model('MenuItem', menuItemSchema);
