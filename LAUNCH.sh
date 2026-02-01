#!/bin/bash

# KGN Restaurant - Project Launcher & Deployment Guide
# =====================================================

echo "🚀 KGN Chinese Corner Restaurant Website"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node --version) found${NC}"

# Install dependencies if needed
echo -e "\n${BLUE}Installing dependencies...${NC}"
npm install --silent 2>/dev/null || true
cd backend && npm install --silent 2>/dev/null || true
cd ../frontend && npm install --silent 2>/dev/null || true
cd ..

echo -e "${GREEN}✓ Dependencies installed${NC}"

# Show local server info
echo ""
echo -e "${YELLOW}📋 LOCAL SERVER URLS:${NC}"
echo "Frontend:  ${BLUE}http://localhost:3000${NC}"
echo "Backend:   ${BLUE}http://localhost:5000${NC}"
echo "API Docs:  ${BLUE}http://localhost:5000/api/docs${NC}"
echo ""

# Show MongoDB setup instruction
echo -e "${YELLOW}⚙️  MONGODB SETUP REQUIRED:${NC}"
echo "This project requires MongoDB Atlas (Cloud):"
echo ""
echo "1. Go to: https://www.mongodb.com/cloud/atlas"
echo "2. Create a FREE account"
echo "3. Create a cluster"
echo "4. Get your connection string"
echo "5. Update backend/.env MONGODB_URI with your connection string"
echo ""
echo "Alternative: Use local MongoDB if installed"
echo ""

# Show startup command
echo -e "${YELLOW}🚀 TO START THE PROJECT:${NC}"
echo "  npm run dev"
echo ""
echo "Or manually:"
echo "  Terminal 1: cd backend && npm run dev"
echo "  Terminal 2: cd frontend && npm start"
echo ""
