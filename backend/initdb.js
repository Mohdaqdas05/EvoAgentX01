const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const MenuItem = require('./models/MenuItem');
const RestaurantSettings = require('./models/RestaurantSettings');
const Testimonial = require('./models/Testimonial');

const initializeDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await MenuItem.deleteMany({});
    await RestaurantSettings.deleteMany({});
    await Testimonial.deleteMany({});

    // Create admin user
    console.log('Creating admin user...');
    const hashedPassword = await bcryptjs.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin',
      email: 'admin@kgn.com',
      password: hashedPassword,
      phone: '+1 (555) 123-4567',
      role: 'admin',
    });
    console.log('✅ Admin user created: admin@kgn.com / admin123');

    // Create test customer
    console.log('Creating test customer...');
    const customerPassword = await bcryptjs.hash('customer123', 10);
    const customerUser = await User.create({
      name: 'John Doe',
      email: 'customer@example.com',
      password: customerPassword,
      phone: '+1 (555) 987-6543',
      role: 'customer',
    });
    console.log('✅ Test customer created: customer@example.com / customer123');

    // Create menu items
    console.log('Creating menu items...');
    const menuItems = [
      {
        name: 'Dragon Chicken',
        description: 'Crispy chicken in spicy dragon sauce with bell peppers',
        category: 'mains',
        price: 12.99,
        image: '🐉',
        spiceLevel: 4,
        isVegetarian: false,
        isChefRecommended: true,
        dietary: ['gluten-free'],
      },
      {
        name: 'Paneer Hakka Noodles',
        description: 'Cottage cheese with Indo-Chinese noodles and mixed vegetables',
        category: 'noodles',
        price: 10.99,
        image: '🍜',
        spiceLevel: 3,
        isVegetarian: true,
        isChefRecommended: true,
        dietary: ['vegetarian'],
      },
      {
        name: 'Schezwan Fried Rice',
        description: 'Spiced fried rice with seasonal vegetables and aromatic spices',
        category: 'rice',
        price: 9.99,
        image: '🍚',
        spiceLevel: 3,
        isVegetarian: true,
        isChefRecommended: false,
        dietary: ['vegan', 'vegetarian'],
      },
      {
        name: 'Chicken 65',
        description: 'Marinated and fried chicken pieces with traditional spices',
        category: 'appetizers',
        price: 8.99,
        image: '🍗',
        spiceLevel: 4,
        isVegetarian: false,
        isChefRecommended: true,
        dietary: ['gluten-free'],
      },
      {
        name: 'Vegetable Manchurian',
        description: 'Crispy vegetable balls in tangy manchurian sauce',
        category: 'appetizers',
        price: 7.99,
        image: '🥟',
        spiceLevel: 2,
        isVegetarian: true,
        isChefRecommended: false,
        dietary: ['vegan', 'vegetarian'],
      },
      {
        name: 'Shrimp Garlic Noodles',
        description: 'Fresh shrimp tossed with garlic and Indo-Chinese noodles',
        category: 'noodles',
        price: 13.99,
        image: '🦐',
        spiceLevel: 2,
        isVegetarian: false,
        isChefRecommended: false,
        dietary: ['seafood'],
      },
      {
        name: 'Gulab Jamun',
        description: 'Traditional sweet Indian dessert soaked in sugar syrup',
        category: 'desserts',
        price: 5.99,
        image: '🍮',
        spiceLevel: 0,
        isVegetarian: true,
        isChefRecommended: false,
        dietary: ['vegetarian'],
      },
      {
        name: 'Mango Lassi',
        description: 'Refreshing yogurt-based mango drink',
        category: 'beverages',
        price: 4.99,
        image: '🥤',
        spiceLevel: 0,
        isVegetarian: true,
        isChefRecommended: false,
        dietary: ['vegetarian'],
      },
    ];

    await MenuItem.insertMany(menuItems);
    console.log('✅ Menu items created (8 items)');

    // Create restaurant settings
    console.log('Creating restaurant settings...');
    const settings = await RestaurantSettings.create({
      restaurantName: 'KGN Chinese Corner',
      description: 'Authentic Indo-Chinese cuisine with premium ingredients and traditional recipes',
      address: '123 Main Street, City, State 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@kgn.com',
      tagline: 'Authentic Indo-Chinese Flavors',
      seoSettings: {
        metaTitle: 'KGN Chinese Corner - Authentic Indo-Chinese Cuisine',
        metaDescription: 'Experience authentic Indo-Chinese flavors at KGN Chinese Corner. Order online, make reservations, and enjoy premium dining.',
        metaKeywords: 'restaurant, Indo-Chinese, food delivery, reservations',
      },
      theme: {
        primaryColor: '#c41e3a',
        secondaryColor: '#ffc72c',
      },
      taxRate: 8.5,
      deliveryFee: 2.99,
      features: {
        enableReservations: true,
        enableOnlineOrdering: true,
        enableDelivery: true,
        enablePickup: true,
        enablePayments: true,
      },
    });
    console.log('✅ Restaurant settings created');

    // Create testimonials
    console.log('Creating testimonials...');
    const testimonials = [
      {
        customerName: 'Raj Kumar',
        rating: 5,
        comment: 'Absolutely amazing food! The flavors are authentic and the service is impeccable.',
      },
      {
        customerName: 'Priya Singh',
        rating: 5,
        comment: 'My favorite place to eat in the city. The ambiance is great and staff is very welcoming.',
      },
      {
        customerName: 'Ahmed Hassan',
        rating: 5,
        comment: 'Best Indo-Chinese food I have ever had. Highly recommended for family dinners.',
      },
      {
        customerName: 'Maria Garcia',
        rating: 4,
        comment: 'Great food and friendly service. Will definitely come back!',
      },
      {
        customerName: 'David Chen',
        rating: 5,
        comment: 'Perfect blend of Chinese and Indian spices. A culinary masterpiece!',
      },
    ];

    await Testimonial.insertMany(testimonials);
    console.log('✅ Testimonials created (5 items)');

    console.log('\n✅ Database initialization complete!');
    console.log('\n📝 Test Credentials:');
    console.log('Admin:');
    console.log('  Email: admin@kgn.com');
    console.log('  Password: admin123');
    console.log('\nCustomer:');
    console.log('  Email: customer@example.com');
    console.log('  Password: customer123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

initializeDatabase();
