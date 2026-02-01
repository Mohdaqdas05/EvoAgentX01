# 🚀 KGN Restaurant - Complete Deployment Guide

## Quick Start (Local Development)

```bash
# Install all dependencies
npm install

# Start both servers (frontend on 3000, backend on 5000)
npm run dev
```

**Access URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API: http://localhost:5000/api

---

## Prerequisites for Deployment

### 1. MongoDB Atlas Setup (FREE Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new project
4. Create a FREE M0 cluster
5. Create a database user
6. Get your connection string
7. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kgn-restaurant
   ```

### 2. Required Accounts

- **GitHub**: For version control (already done ✓)
- **Vercel**: For frontend hosting (FREE)
- **Render or Railway**: For backend hosting (FREE tier available)
- **MongoDB Atlas**: For database (FREE tier)

---

## Deployment Options

### Option A: Deploy with Vercel (Recommended - Easiest)

#### Frontend Deployment (Vercel)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy frontend
cd frontend
vercel

# 3. Follow prompts and get your URL
```

#### Backend Deployment (Render.com)

1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +"
4. Select "Web Service"
5. Connect your GitHub repo (EvoAgentX01)
6. Configure:
   - **Name**: kgn-restaurant-api
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm run dev`
7. Add environment variables from `backend/.env`
8. Deploy (FREE tier available)

**Get your Backend URL** from Render dashboard

---

### Option B: Deploy with Railway (Easiest for Both)

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your EvoAgentX01 repo
6. Railway auto-detects and deploys both services

**Get URLs automatically from Railway dashboard**

---

### Option C: Deploy with Heroku (Requires Credit Card)

```bash
# 1. Install Heroku CLI
npm i -g heroku

# 2. Login
heroku login

# 3. Create apps
heroku create kgn-restaurant-api --buildpack heroku/nodejs
heroku create kgn-restaurant-frontend --buildpack heroku/nodejs

# 4. Set environment variables
heroku config:set MONGODB_URI="your_mongodb_connection_string"
heroku config:set JWT_SECRET="your_jwt_secret"

# 5. Deploy
git push heroku main
```

---

## Complete Deployment Checklist

### Phase 1: Prepare MongoDB
- [ ] Create MongoDB Atlas account
- [ ] Set up cluster
- [ ] Create database user
- [ ] Get connection string
- [ ] Update `.env` with connection string
- [ ] Test connection: `cd backend && npm run test-db`

### Phase 2: Prepare Code
- [ ] All errors fixed ✓
- [ ] Dependencies installed ✓
- [ ] Build tested: `npm run build` ✓
- [ ] Code committed to GitHub ✓

### Phase 3: Deploy Backend
- [ ] Choose hosting (Render/Railway/Heroku)
- [ ] Connect GitHub repo
- [ ] Configure environment variables
- [ ] Deploy and get API URL
- [ ] Test API endpoints

### Phase 4: Deploy Frontend
- [ ] Update `frontend/.env`:
   ```
   REACT_APP_API_URL=your_backend_api_url
   ```
- [ ] Commit changes
- [ ] Deploy to Vercel/Railway
- [ ] Test all features

### Phase 5: Post-Deployment
- [ ] Test login functionality
- [ ] Verify menu displays
- [ ] Test orders
- [ ] Test reservations
- [ ] Set up admin account
- [ ] Configure Stripe (if needed)
- [ ] Set up email (if needed)

---

## Environment Variables Needed

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/kgn-restaurant
JWT_SECRET=your_strong_secret_key_min_32_chars
STRIPE_PUBLIC_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
NODE_ENV=production
ADMIN_EMAIL=admin@kgnrestaurant.com
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_STRIPE_KEY=pk_test_your_key
```

---

## Testing Deployed Application

```bash
# Test backend API
curl https://your-backend-url.com/api/health

# Test frontend
Visit: https://your-frontend-url.com

# Check logs
# Vercel: Dashboard > Deployments > Logs
# Render: Dashboard > Logs
# Railway: Dashboard > Logs
```

---

## Troubleshooting

### Backend won't start
- Check MongoDB URI in `.env`
- Verify MongoDB Atlas cluster is running
- Check Node.js version (need 14+)
- View deployment logs

### Frontend can't connect to backend
- Check REACT_APP_API_URL in frontend/.env
- Ensure backend URL is correct
- Check CORS settings in backend
- View network requests in browser DevTools

### Database errors
- Verify MongoDB connection string
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for any IP)
- Verify database user credentials
- Check database name in connection string

---

## Post-Deployment Setup

### 1. Initialize Database
```bash
# SSH into backend or use their console
node initdb.js

# Note the temporary admin password shown
```

### 2. Login as Admin
1. Go to your frontend URL
2. Click "Admin"
3. Login with credentials from previous step
4. Go to Settings → Change password and email
5. Add menu items, manage orders, etc.

### 3. Configure Features
- [ ] Set restaurant contact info
- [ ] Add menu items
- [ ] Configure reservations
- [ ] Set business hours
- [ ] Upload logo/images

---

## Performance Tips

1. **Use CDN for images**: Upload to CloudFlare or similar
2. **Database indexes**: Already configured ✓
3. **Caching**: Use Redis for frequently accessed data
4. **Monitoring**: Set up error tracking (Sentry)
5. **Backups**: Enable MongoDB automatic backups

---

## Support

- **Documentation**: See README.md and other docs
- **API Docs**: http://your-backend-url.com/api/docs
- **GitHub Issues**: Post in repository
- **Logs**: Check deployment platform logs

---

## Quick Deployment Command Summary

```bash
# Option 1: Railway (Easiest - Recommended)
# Just push to GitHub, Railway auto-deploys

# Option 2: Vercel (Frontend) + Render (Backend)
vercel deploy              # Frontend
# Then configure Render separately

# Option 3: Manual with CLI
heroku deploy              # If using Heroku
docker build .             # If using Docker
```

---

**Your app is now ready to go live! 🎉**
