# 🚀 Complete Setup Instructions

## ✅ What's Been Done

Your project is ready for final configuration. Here's what to do next:

---

## 1️⃣ MongoDB Setup (Choose One)

### Option A: MongoDB Atlas (Cloud) - RECOMMENDED ✅

1. **Sign up for MongoDB Atlas**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Click "Create an account"
   - Sign up with email

2. **Create a Free Cluster**
   - Click "Create" button
   - Select "Free" tier (M0 Sandbox)
   - Choose your region
   - Click "Create Cluster"
   - Wait 2-3 minutes for cluster to be created

3. **Get Your Connection String**
   - Go to "Database" → "Collections"
   - Click "Connect"
   - Select "Drivers"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster.mongodb.net/kgn-restaurant?retryWrites=true&w=majority`

4. **Update Your `.env` File**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kgn-restaurant?retryWrites=true&w=majority
   ```

### Option B: Local MongoDB (If you have Docker)

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

Then update `.env`:
```
MONGODB_URI=mongodb://localhost:27017/kgn-restaurant
```

---

## 2️⃣ Configure Environment Variables

Edit `/backend/.env`:

```env
PORT=5000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_secret_key>

# Optional: For Email Notifications
EMAIL_SERVICE=gmail
EMAIL_USER=<your_email@gmail.com>
EMAIL_PASSWORD=<your_app_password>

# Optional: For Stripe Payments
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

---

## 3️⃣ Initialize Database (After MongoDB is Set Up)

Once MongoDB is running and `.env` is configured:

```bash
cd backend
node initdb.js
```

This will:
- ✅ Create admin user (admin@kgn.com / admin123)
- ✅ Create test customer (customer@example.com / customer123)
- ✅ Add 8 sample menu items
- ✅ Create restaurant settings
- ✅ Add 5 sample testimonials

---

## 4️⃣ Test Admin Login

1. Go to http://localhost:3000/login
2. Login with:
   - **Email**: admin@kgn.com
   - **Password**: admin123
3. Click on "Admin" button in navbar
4. You'll see the admin dashboard with:
   - Analytics
   - Menu Manager
   - Reservation Manager
   - Order Manager
   - Contact Manager
   - Settings

---

## 5️⃣ Email Setup (Optional)

### For Gmail:
1. Go to https://myaccount.google.com/apppasswords
2. Generate an App Password
3. Add to `.env`:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=<generated_app_password>
   ```

### For Other Services:
Use your email service's SMTP details

---

## 6️⃣ Stripe Setup (Optional)

1. Go to https://stripe.com
2. Create account and get test keys
3. Add to `.env`:
   ```
   STRIPE_PUBLIC_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

Test card: `4242 4242 4242 4242`

---

## 📋 Checklist

- [ ] MongoDB configured (Atlas or local)
- [ ] `.env` file updated with MongoDB URI
- [ ] Database initialized (`node initdb.js`)
- [ ] Can login as admin@kgn.com / admin123
- [ ] Frontend running on http://localhost:3000
- [ ] Backend running on http://localhost:5000
- [ ] Email (optional) configured
- [ ] Stripe (optional) configured

---

## 🎯 Quick Test

After setup:

```bash
# 1. Verify servers are running
curl http://localhost:5000/api/menu  # Should return menu items
curl http://localhost:3000           # Should return HTML

# 2. Test login
# Visit http://localhost:3000/login
# Use: admin@kgn.com / admin123

# 3. Visit admin dashboard
# Click "Admin" button after login
```

---

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- ✅ Check `.env` MONGODB_URI is correct
- ✅ For Atlas: whitelist your IP
- ✅ For local: ensure MongoDB is running

### "Database initialization failed"
- ✅ Verify MongoDB is running
- ✅ Check connection string format
- ✅ Ensure database has read/write access

### "Login not working"
- ✅ Run `node initdb.js` to create test users
- ✅ Use: admin@kgn.com / admin123
- ✅ Check backend server is running

### "API calls failing"
- ✅ Verify backend is running on port 5000
- ✅ Check CORS is enabled
- ✅ Check browser console for errors

---

## 🚀 Next Steps

1. Complete the MongoDB setup above
2. Initialize the database
3. Test admin login
4. Customize restaurant info in admin dashboard
5. Add your own menu items
6. Deploy to production

---

## 📞 Support

All API endpoints are documented in:
- `/SETUP_GUIDE.md` - Complete API reference
- `/PROJECT_STRUCTURE.md` - Architecture overview
- `/START_HERE.md` - Quick navigation guide

---

**Everything is ready. Just complete the MongoDB and .env setup!** 🎉
