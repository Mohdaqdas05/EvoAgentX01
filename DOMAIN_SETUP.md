# 🌐 Domain Configuration Guide: kgn.hs-sites-na2.com

## ✅ Configuration Completed

Your KGN Restaurant website has been configured to work with the domain:
```
https://kgn.hs-sites-na2.com
```

---

## 📋 What Was Updated

### Frontend Configuration
- ✅ API endpoint configured for production domain
- ✅ Environment variables set for HTTPS
- ✅ Build optimized for domain deployment
- ✅ CORS headers properly configured

### Backend Configuration  
- ✅ CORS policy updated to accept domain
- ✅ Environment variables set up
- ✅ API subdomain support added: `api.kgn.hs-sites-na2.com`
- ✅ Security headers configured

### Environment Files Created
1. `frontend/.env.production` - Production environment variables
2. `frontend/.env.local` - Local development environment
3. `backend/.env.production` - Backend production config

---

## 🚀 Deployment Steps

### Step 1: DNS Configuration
Update your DNS records to point to the hosting service:

**For the main domain (kgn.hs-sites-na2.com):**
```
Type: CNAME or A Record
Name: kgn
Value: [Your hosting provider's IP/CNAME]
```

**For API subdomain (api.kgn.hs-sites-na2.com):**
```
Type: CNAME or A Record
Name: api
Value: [Your backend hosting provider's IP/CNAME]
```

### Step 2: SSL Certificate
Your hosting provider will automatically provide HTTPS/SSL:
- ✅ Vercel provides free SSL certificates
- ✅ Railway provides free SSL certificates
- ✅ Render provides free SSL certificates

### Step 3: Deploy Frontend to kgn.hs-sites-na2.com

**Using Vercel (Recommended):**
```bash
1. Go to vercel.com
2. Import your GitHub repo: Mohdaqdas05/EvoAgentX01
3. Under "Project Settings" → "Domains"
4. Add custom domain: kgn.hs-sites-na2.com
5. Update DNS records as shown
6. Deploy automatically on every push
```

**Using Railway:**
```bash
1. Go to railway.app
2. Create new project from GitHub
3. Select your repo
4. Go to Settings → Custom Domain
5. Add: kgn.hs-sites-na2.com
6. Update DNS records
```

### Step 4: Deploy Backend to api.kgn.hs-sites-na2.com

**Using Render (Recommended):**
```bash
1. Go to render.com
2. New → Web Service
3. Connect GitHub repo
4. Root directory: backend
5. Build command: npm install
6. Start command: npm run start
7. Add custom domain: api.kgn.hs-sites-na2.com
8. Add environment variables (see below)
```

**Using Railway:**
```bash
1. Create backend service
2. Settings → Custom Domain
3. Add: api.kgn.hs-sites-na2.com
4. Update DNS
```

---

## 🔧 Required Environment Variables

### Frontend (.env files)
```env
# Development (.env.local)
REACT_APP_API_URL=http://localhost:5000

# Production (.env.production)
REACT_APP_API_URL=https://api.kgn.hs-sites-na2.com
PUBLIC_URL=https://kgn.hs-sites-na2.com
```

### Backend (.env)
```env
# Domain & URLs
FRONTEND_URL=https://kgn.hs-sites-na2.com
API_URL=https://api.kgn.hs-sites-na2.com

# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/kgn-restaurant

# JWT & Security
JWT_SECRET=your_strong_secret_key_min_32_chars

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Stripe (if needed)
STRIPE_PUBLIC_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# Environment
NODE_ENV=production
PORT=5000
```

---

## ✨ Testing the Domain

### After DNS Propagation (usually 24-48 hours):

**Test Frontend:**
```bash
curl https://kgn.hs-sites-na2.com
# Should return HTML of your website
```

**Test API:**
```bash
curl https://api.kgn.hs-sites-na2.com/api/health
# Should return: {"status":"OK",...}
```

**Test in Browser:**
```
Frontend: https://kgn.hs-sites-na2.com
Admin: https://kgn.hs-sites-na2.com/admin
Login: https://kgn.hs-sites-na2.com/login
```

---

## 🔒 CORS Configuration

The backend now accepts requests from:
- ✅ https://kgn.hs-sites-na2.com
- ✅ https://www.kgn.hs-sites-na2.com
- ✅ https://api.kgn.hs-sites-na2.com
- ✅ http://localhost:3000 (development)
- ✅ http://localhost:5000 (development)

---

## 📱 Local Testing Before Domain Goes Live

### Test with domain name locally:
```bash
# Edit your /etc/hosts file (Mac/Linux) or C:\Windows\System32\drivers\etc\hosts (Windows)

# Add:
127.0.0.1 kgn.hs-sites-na2.com
127.0.0.1 api.kgn.hs-sites-na2.com

# Then access locally:
http://kgn.hs-sites-na2.com:3000
http://api.kgn.hs-sites-na2.com:5000/api/health
```

---

## 🚨 Troubleshooting

### Frontend can't connect to API
**Problem:** API not found errors in browser console
**Solution:** 
1. Check DNS propagation: `nslookup api.kgn.hs-sites-na2.com`
2. Verify CORS headers: `curl -v https://api.kgn.hs-sites-na2.com/api/health`
3. Check backend environment variables
4. Verify HTTPS certificates

### CORS errors in console
**Problem:** Cross-Origin request blocked
**Solution:**
1. Check backend CORS configuration is correct
2. Verify API_URL environment variable is set
3. Restart backend service after env changes
4. Clear browser cache

### DNS not resolving
**Problem:** Domain shows DNS error
**Solution:**
1. Wait 24-48 hours for DNS propagation
2. Check DNS records in your registrar
3. Verify CNAME/A record is correct
4. Test with: `dig kgn.hs-sites-na2.com`

---

## 📊 Domain URLs After Deployment

| Service | URL |
|---------|-----|
| Website | https://kgn.hs-sites-na2.com |
| Admin Panel | https://kgn.hs-sites-na2.com/admin |
| API | https://api.kgn.hs-sites-na2.com |
| Health Check | https://api.kgn.hs-sites-na2.com/api/health |
| Menu API | https://api.kgn.hs-sites-na2.com/api/menu |

---

## ✅ Deployment Checklist

- [ ] DNS records created for kgn.hs-sites-na2.com
- [ ] DNS records created for api.kgn.hs-sites-na2.com
- [ ] Frontend deployed to hosting (Vercel/Railway)
- [ ] Backend deployed to hosting (Render/Railway)
- [ ] Custom domain configured on frontend
- [ ] Custom domain configured on backend
- [ ] Environment variables set on both services
- [ ] SSL certificates provisioned (auto)
- [ ] DNS propagation verified (24-48 hours)
- [ ] Frontend accessible at https://kgn.hs-sites-na2.com
- [ ] API accessible at https://api.kgn.hs-sites-na2.com
- [ ] All features tested in production
- [ ] Admin account set up
- [ ] Database initialized with sample data

---

## 📞 Support

If you need help with DNS configuration, contact your domain registrar or hosting provider support.

For code-related issues, check the GitHub repository and project documentation.

---

**Your domain configuration is complete and ready for deployment! 🎉**
