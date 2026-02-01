FROM node:18-alpine

WORKDIR /app

# Copy backend files
COPY backend/package*.json ./backend/
RUN cd backend && npm install --only=production

# Copy server files
COPY backend/server.js ./backend/
COPY backend/controllers ./backend/controllers/
COPY backend/models ./backend/models/
COPY backend/routes ./backend/routes/
COPY backend/middleware ./backend/middleware/
COPY backend/config ./backend/config/
COPY backend/utils ./backend/utils/

WORKDIR /app/backend

EXPOSE 5000

CMD ["node", "server.js"]
