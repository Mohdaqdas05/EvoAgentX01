# KGN Chinese Corner - Project Structure

```
kgn-restaurant-website/
├── backend/
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── MenuItem.js              # Menu items
│   │   ├── Reservation.js           # Reservations
│   │   ├── Order.js                 # Orders
│   │   ├── ContactSubmission.js     # Contact form
│   │   ├── RestaurantSettings.js    # Settings
│   │   └── Testimonial.js           # Reviews
│   ├── middleware/
│   │   └── auth.js                  # JWT & role authorization
│   ├── controllers/
│   │   ├── authController.js        # User auth logic
│   │   ├── menuController.js        # Menu management
│   │   ├── reservationController.js # Reservations
│   │   ├── orderController.js       # Orders
│   │   └── settingsController.js    # Settings & contact
│   ├── routes/
│   │   ├── auth.js                  # Auth endpoints
│   │   ├── menu.js                  # Menu endpoints
│   │   ├── reservations.js          # Reservation endpoints
│   │   ├── orders.js                # Order endpoints
│   │   └── settings.js              # Settings endpoints
│   ├── .env.example                 # Environment template
│   ├── package.json                 # Dependencies
│   └── server.js                    # Express server entry

├── frontend/
│   ├── public/
│   │   └── index.html               # HTML template
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.js          # Landing page
│   │   │   └── LoginPage.js         # Auth page
│   │   ├── components/
│   │   │   ├── Navbar.js            # Navigation
│   │   │   ├── Footer.js            # Footer
│   │   │   ├── MenuSection.js       # Menu display
│   │   │   └── ReservationSection.js # Booking form
│   │   ├── admin/
│   │   │   ├── AdminDashboard.js    # Admin layout
│   │   │   ├── Dashboard.js         # Analytics
│   │   │   ├── MenuManager.js       # Menu CRUD
│   │   │   ├── ReservationManager.js # Reservation CRUD
│   │   │   ├── OrderManager.js      # Order tracking
│   │   │   ├── ContactManager.js    # Contact responses
│   │   │   └── SettingsManager.js   # Settings editor
│   │   ├── App.js                   # Main app component
│   │   ├── AuthContext.js           # Auth state management
│   │   ├── api.js                   # API client
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Global styles
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── package.json                 # Dependencies

├── SETUP_GUIDE.md                   # Complete setup instructions
├── FEATURES.md                      # Feature documentation
├── QUICK_START.md                   # Quick start guide
├── PROJECT_STRUCTURE.md             # This file
├── README.md                        # Overview
└── package.json                     # Root package configuration
```

## 🔄 Data Flow Architecture

### Frontend → Backend Communication

```
React Component
    ↓
  API Client (api.js)
    ↓
  Express Route Handler
    ↓
  Controller Logic
    ↓
  Mongoose Model
    ↓
  MongoDB Database
```

### Authentication Flow

```
User Registration/Login
    ↓
Auth Controller validates
    ↓
JWT token generated
    ↓
Token stored in localStorage
    ↓
Token sent with all requests (Header)
    ↓
Auth middleware validates
    ↓
Access granted/denied
```

### Admin Role Protection

```
User logs in
    ↓
User object includes role
    ↓
ProtectedAdminRoute checks role
    ↓
If role === 'admin' → Allow access
    ↓
Else → Redirect to /login
```

## 📦 Key Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **stripe**: Payment processing
- **nodemailer**: Email sending
- **cors**: Cross-origin requests

### Frontend
- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **lucide-react**: Icons
- **tailwindcss**: Styling

## 🔐 Security Architecture

```
Request → CORS Check
    ↓
Route Handler
    ↓
Auth Middleware (if protected)
    ↓
Role Authorization (if admin)
    ↓
Controller Logic
    ↓
Database Operation
    ↓
Response with error handling
```

## 📊 Database Schema Relationships

```
User
├── Profile data
├── Authentication
└── Role (admin/customer)

MenuItem
├── Category
├── Pricing
├── Dietary info
└── Chef recommendations

Order
├── OrderItems → MenuItem
├── User (optional)
├── Payment info
└── Delivery details

Reservation
├── User (optional)
├── Date/Time
├── Guests
└── Status tracking

RestaurantSettings
├── Business info
├── Hours of operation
├── Theme customization
└── Feature toggles

ContactSubmission
├── Customer details
├── Message content
├── Admin response
└── Status tracking
```

## 🎯 Component Hierarchy

```
App
├── Router
├── AuthProvider
│   ├── HomePage
│   │   ├── Navbar
│   │   ├── Hero Section
│   │   ├── About Section
│   │   ├── MenuSection
│   │   ├── Chef Specials
│   │   ├── Testimonials
│   │   ├── ReservationSection
│   │   ├── FAQ
│   │   ├── Contact
│   │   └── Footer
│   ├── LoginPage
│   └── AdminDashboard
│       ├── Sidebar Navigation
│       ├── Dashboard (default)
│       ├── MenuManager
│       ├── ReservationManager
│       ├── OrderManager
│       ├── ContactManager
│       └── SettingsManager
```

## 🔄 API Endpoint Organization

```
/api/auth
├── POST /register
├── POST /login
├── GET /me
├── PUT /update
├── GET /users (admin)
└── DELETE /users/:id (admin)

/api/menu
├── GET /
├── GET /:id
├── GET /recommendations
├── POST / (admin)
├── PUT /:id (admin)
└── DELETE /:id (admin)

/api/reservations
├── GET / (admin)
├── POST /
├── GET /:id
├── PUT /:id (admin)
├── PUT /:id/cancel
└── DELETE /:id (admin)

/api/orders
├── GET / (admin)
├── GET /user/my
├── POST /
├── POST /:id/payment
├── PUT /:id (admin)
└── DELETE /:id (admin)

/api (settings & contact)
├── GET /restaurant
├── PUT /restaurant (admin)
├── POST /contact
├── GET /contact (admin)
└── PUT /contact/:id (admin)
```

## 🚀 Deployment Structure

### Production Environment

```
Frontend (Vercel/Netlify)
    ↓
API Gateway
    ↓
Backend (Node.js Server)
    ↓
MongoDB Atlas (Cloud DB)
    ↓
Stripe (Payment)
    ↓
Email Service (SMTP)
```

---

This modular structure ensures:
- Easy maintenance and updates
- Clear separation of concerns
- Scalable architecture
- Secure role-based access
- Efficient API design
