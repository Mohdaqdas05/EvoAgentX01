require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'KGN Restaurant API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mock Routes for Demo
app.get('/api/menu', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        _id: '1',
        name: 'Kung Pao Chicken',
        category: 'mains',
        description: 'Diced chicken stir-fried with peanuts and chili peppers',
        price: 12.99,
        preparationTime: 15
      },
      {
        _id: '2',
        name: 'Mapo Tofu',
        category: 'mains',
        description: 'Spicy tofu in chili oil with ground pork',
        price: 11.99,
        preparationTime: 10
      },
      {
        _id: '3',
        name: 'Spring Rolls',
        category: 'appetizers',
        description: 'Crispy spring rolls filled with vegetables',
        price: 5.99,
        preparationTime: 5
      }
    ]
  });
});

app.get('/api/auth/me', (req, res) => {
  res.status(401).json({ message: 'Not authenticated' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  res.json({
    success: true,
    message: 'Login successful (demo mode)',
    token: 'demo_token_' + Date.now(),
    user: { email, role: 'customer' }
  });
});

app.get('/api/reservations', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

app.get('/api/orders', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
    info: 'Running in DEMO mode without MongoDB'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════╗`);
  console.log(`║  🍜 KGN RESTAURANT API                 ║`);
  console.log(`║  Server running on port ${PORT}           ║`);
  console.log(`║  📍 http://localhost:${PORT}              ║`);
  console.log(`║  🏥 Health: http://localhost:${PORT}/api/health  ║`);
  console.log(`╚════════════════════════════════════════╝\n`);
});

module.exports = app;
