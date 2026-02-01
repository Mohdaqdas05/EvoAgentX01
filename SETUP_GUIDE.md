# KGN Chinese Corner - Restaurant Website

A modern, high-converting restaurant website for KGN Chinese Corner featuring an advanced admin dashboard, payment integration, and comprehensive reservation management system.

## Features

### Frontend
- **Hero Section** with signature imagery and CTAs
- **Responsive Menu System** with categorization and filtering
- **Chef Recommendations** highlighting special dishes
- **Online Reservations** system with instant confirmation
- **Customer Login/Registration** for personalized experience
- **Testimonials & Reviews** section
- **Contact Form** with email notifications
- **FAQ Section** covering dietary options, parking, and bookings
- **Mobile-First Design** with full responsiveness
- **SEO Optimized** for search engines

### Backend API
- **Authentication** system with JWT
- **Menu Management** with categories and dietary filters
- **Reservation System** with email notifications
- **Order Management** with payment integration
- **Contact Form** submissions and responses
- **Restaurant Settings** editor
- **Testimonial Management**

### Admin Dashboard
- **Dashboard** with analytics and recent orders
- **Menu Manager** - Add, edit, delete dishes
- **Reservation Manager** - Manage bookings with status updates
- **Order Manager** - Track orders from pending to completion
- **Contact Manager** - Respond to customer inquiries
- **Settings Manager** - Complete restaurant customization
- **SEO Settings** - Optimize page metadata
- **Theme Customization** - Colors, fonts, and layout
- **Opening Hours Editor** - Manage availability
- **Payment Configuration** - Stripe integration

### Technical Stack
- **Frontend**: React 18, React Router, Axios, Lucide Icons, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Stripe integration
- **Email**: Nodemailer for notifications
- **Hosting Ready**: Docker compatible

## Installation

### Prerequisites
- Node.js v14+ and npm
- MongoDB (local or Atlas cloud)
- Stripe account (for payment processing)
- SMTP email service (Gmail, SendGrid, etc.)

### Backend Setup

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your configuration:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kgn_restaurant
JWT_SECRET=your_secret_key_here
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLIC_KEY=pk_test_your_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=admin@kgnrestaurant.com
```

Install dependencies and start:

```bash
npm install
npm start
```

The API will be available at `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The application will open at `http://localhost:3000`

### Running Together

From the root directory:

```bash
npm run install-all
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update` - Update profile

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single item
- `GET /api/menu/recommendations` - Get chef recommendations
- `POST /api/menu` - Create item (admin)
- `PUT /api/menu/:id` - Update item (admin)
- `DELETE /api/menu/:id` - Delete item (admin)

### Reservations
- `GET /api/reservations` - Get all (admin)
- `POST /api/reservations` - Create reservation
- `PUT /api/reservations/:id` - Update (admin)
- `PUT /api/reservations/:id/cancel` - Cancel booking
- `DELETE /api/reservations/:id` - Delete (admin)

### Orders
- `GET /api/orders` - Get all (admin)
- `POST /api/orders` - Create order
- `POST /api/orders/:id/payment` - Process payment
- `PUT /api/orders/:id` - Update status (admin)

### Settings
- `GET /api/restaurant` - Get restaurant info
- `PUT /api/restaurant` - Update settings (admin)
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get submissions (admin)
- `PUT /api/contact/:id` - Respond to submission (admin)

## Database Models

### User
- Name, Email, Phone
- Password (hashed)
- Role (customer/admin)
- Profile image
- Timestamps

### MenuItem
- Name, Description, Price
- Category (appetizers, mains, etc.)
- Image URL
- Chef recommendation flag
- Dietary tags
- Calories, preparation time
- Availability status

### Reservation
- Customer details (name, email, phone)
- Date, Time, Number of guests
- Special requests
- Status (pending, confirmed, cancelled, completed)
- Confirmation tokens

### Order
- Customer info
- Order items with quantities
- Subtotal, tax, delivery fee
- Total amount
- Status and payment status
- Stripe payment ID
- Order type (dine-in, delivery, pickup)

### RestaurantSettings
- Business information (name, address, phone, email)
- Opening hours per day
- Theme colors and fonts
- SEO metadata
- Feature flags
- Tax rate and delivery fee

## Admin Login

1. Create an admin account via `/login` page
2. Access admin dashboard at `/admin` 
3. Manage all restaurant operations

**Default Admin Credentials** (set up during first registration):
- Email: admin@kgnrestaurant.com
- Role: admin

## Payment Integration

### Stripe Setup

1. Create Stripe account at stripe.com
2. Get API keys from dashboard
3. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLIC_KEY=pk_test_...
   ```

4. Frontend payment processing with Stripe Elements

## Email Configuration

### Gmail Setup (Recommended)
1. Enable 2FA on your Gmail
2. Create app password
3. Use app password in `.env`:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

## Customization

### Change Brand Colors
1. Go to Admin > Settings
2. Update Theme Colors section
3. Primary and secondary colors change site appearance
4. Changes apply instantly

### Update Restaurant Info
1. Admin > Settings
2. Edit restaurant name, address, phone
3. Update opening hours
4. Configure tax rate and delivery fee

### Manage Menu
1. Admin > Menu Items
2. Add/edit/delete dishes
3. Set prices and dietary tags
4. Mark chef recommendations
5. Bulk upload or individual entry

### Handle Reservations
1. Admin > Reservations
2. View pending/confirmed bookings
3. Update status and send notifications
4. Cancel or complete reservations

## Deployment

### Heroku Deployment

Backend:
```bash
cd backend
heroku login
heroku create your-app-name
git push heroku main
```

Frontend:
```bash
cd frontend
npm run build
# Deploy build folder to Netlify or Vercel
```

### Docker Deployment

Create `Dockerfile` in backend:
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t kgn-restaurant .
docker run -p 5000:5000 kgn-restaurant
```

## Security Features

- Password hashing with bcryptjs
- JWT authentication
- Role-based access control
- CORS protection
- Input validation
- Email verification ready
- Secure payment processing

## Performance

- Lazy loading for images
- Optimized database queries
- Caching strategies
- Responsive design for all devices
- Fast API response times

## Support & Maintenance

- Regular security updates
- Database backups recommended
- Monitor email delivery
- Track payment transactions
- Regular admin dashboard reviews

## License

© 2024 KGN Chinese Corner. All rights reserved.

## Contact

For support and inquiries:
- Email: support@kgnrestaurant.com
- Phone: +1 (555) 123-4567
- Address: 123 Main Street, City, State 12345

---

**Version**: 1.0.0  
**Last Updated**: February 2024  
**Maintained By**: Development Team
