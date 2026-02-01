# Quick Start Guide - KGN Chinese Corner Website

## ⚡ 5-Minute Setup

### 1. Install Dependencies

```bash
# From root directory
npm run install-all
```

### 2. Configure Environment

Backend (`.env`):
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and Stripe keys
```

### 3. Start Development Servers

```bash
# From root directory
npm run dev
```

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## 📋 Initial Setup Steps

### Step 1: Create Admin Account
1. Go to http://localhost:3000/login
2. Click "Create Account"
3. Register with admin email
4. Update user role to "admin" (in MongoDB or database)

### Step 2: Add Sample Menu Items

Visit Admin Dashboard → Menu Items and add:
- Mains: Dragon Chicken, Hakka Noodles, Schezwan Fried Rice
- Appetizers: Spring Rolls, Fried Wontons
- Vegetables: Broccoli 65, Paneer Chilli
- Beverages: Mango Lassi, Thai Iced Tea

### Step 3: Configure Restaurant Settings

Admin → Settings:
- [ ] Update restaurant name
- [ ] Set address and phone
- [ ] Configure opening hours
- [ ] Set tax rate (5%)
- [ ] Set delivery fee ($2.99)
- [ ] Customize brand colors
- [ ] Update meta descriptions

### Step 4: Setup Payment (Optional for Testing)

1. Create Stripe test account
2. Add keys to backend `.env`
3. Use test card: 4242 4242 4242 4242

### Step 5: Configure Email (Optional)

1. Gmail: Enable 2FA, create app password
2. Add to `.env`:
   ```
   EMAIL_USER=your@gmail.com
   EMAIL_PASSWORD=app_password_here
   ```

## 🧪 Testing the System

### Test Reservation
1. Go to Home → Book a Table
2. Fill form and submit
3. Check Admin → Reservations (should appear as pending)
4. Update status to "Confirmed"

### Test Order
1. Click "Add to Cart" on menu items
2. Proceed to checkout
3. Enter payment details (test card in dev)
4. Order appears in Admin → Orders

### Test Contact Form
1. Scroll to Contact section
2. Submit form
3. Admin → Contact Messages (view and reply)

## 🔧 Key Configuration Files

| File | Purpose |
|------|---------|
| `backend/.env` | Backend environment variables |
| `frontend/src/api.js` | API endpoint configuration |
| `frontend/src/AuthContext.js` | Authentication setup |
| `backend/models/*.js` | Database schemas |
| `backend/config/database.js` | MongoDB connection |

## 📱 Features to Explore

### Customer Side
- Browse menu by category
- Filter by dietary preferences
- Make table reservations
- Create account
- View order history

### Admin Side
- Dashboard with analytics
- Complete menu management
- Reservation management
- Order tracking
- Customer inquiry responses
- Full settings customization

## 🚀 Deployment Preparation

### Before Going Live
- [ ] Update all branding in Settings
- [ ] Add production images for menu items
- [ ] Configure real Stripe keys
- [ ] Setup production email service
- [ ] Configure MongoDB Atlas
- [ ] Update SEO meta tags
- [ ] Test all payment flows
- [ ] Verify email notifications

### Deploy Backend
```bash
cd backend
# Option 1: Heroku
heroku create your-app-name
git push heroku main

# Option 2: DigitalOcean, AWS, etc
# Follow provider-specific deployment
```

### Deploy Frontend
```bash
cd frontend
npm run build
# Deploy 'build' folder to:
# - Vercel (recommended)
# - Netlify
# - AWS S3 + CloudFront
```

## 🔗 Important URLs

Development:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:3000/admin
- API Docs: http://localhost:5000/api/health

## 💡 Common Tasks

### Add New Menu Item
1. Admin → Menu Items → Add New Item
2. Fill details (name, price, category, image)
3. Mark as Chef Recommendation if needed
4. Click Add Item

### Respond to Customer Inquiry
1. Admin → Contact Messages
2. Click message from customer
3. Type response
4. Click Send Response (auto-emails customer)

### Update Opening Hours
1. Admin → Settings
2. Scroll to Opening Hours
3. Edit times for each day
4. Mark as "Closed" for holidays
5. Save Settings

### Change Brand Colors
1. Admin → Settings
2. Find Theme Settings section
3. Update Primary/Secondary colors
4. Changes apply instantly

## 🐛 Troubleshooting

**Backend won't start:**
- Check MongoDB connection string
- Ensure port 5000 is available
- Check `.env` file for syntax errors

**API calls failing:**
- Verify backend is running
- Check CORS settings
- Ensure JWT token is valid

**Emails not sending:**
- Verify email credentials in `.env`
- Check email service SMTP settings
- Look at server console for errors

**Payment fails:**
- Use test Stripe keys in development
- Test card: 4242 4242 4242 4242
- Check Stripe account settings

## 📚 Next Steps

1. Explore Admin Dashboard features
2. Customize restaurant information
3. Add your menu items
4. Test reservations and orders
5. Setup email notifications
6. Configure payment processing
7. Customize colors and branding
8. Deploy to production

## 📞 Support

For detailed documentation:
- See `SETUP_GUIDE.md` for complete setup
- See `FEATURES.md` for feature list
- Check API endpoints in backend routes

---

**You're ready to serve! 🥡**

Start the development servers and explore the application.
