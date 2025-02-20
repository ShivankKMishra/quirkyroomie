# QuirkyRoomie - Roommate Complaint Management System

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A full-stack web application for managing roommate complaints with a voting system, leaderboards, and user authentication.



---

## Features

- 🔐 **JWT Authentication** (Login/Register)
- 📝 **Create & Manage Complaints** with different types and severity levels
- 👍👎 **Voting System** for complaints
- 🏆 **Karma-Based Leaderboard**
- 📊 **Complaint Status Tracking** (Open/Resolved)
- 🛡️ **Protected Routes** with authorization
- 🌈 **Responsive UI** with Tailwind CSS

---

## Prerequisites

- **Node.js** (v18+)
- **npm** (v9+)
- **MongoDB Atlas** account
- **Render/Vercel** account (for deployment)

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/quirky-roomie.git
cd quirky-roomie
```

### 2. Install Dependencies

#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd ../server
npm install
```

---

## Environment Setup

### Client
Create `.env.development` in `/client`:
```
VITE_API_URL=http://localhost:3000
```

### Server
Create `.env` in `/server`:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## Running Locally

### Start Backend Server
```bash
cd server
npm start
```

### Start Frontend
```bash
cd client
npm run dev
```

The app will be available at **[http://localhost:5173](http://localhost:5173)**

---

## Deployment

### Backend (Render)
1. Create a new **Web Service**
2. Connect your repository
3. Set environment variables:
```
PORT=10000
MONGODB_URI=your_production_db_uri
JWT_SECRET=your_production_jwt_secret
```

### Frontend (Vercel)
1. Import project from Git repository
2. Set environment variables:
```
VITE_API_URL=https://your-render-backend-url.onrender.com
```
3. Build command: `npm run build`
4. Output directory: `dist`

---

## Key Technologies

### Frontend
- ⚡ Vite + React
- 🎨 Tailwind CSS
- 🔄 React Router
- 📡 Axios (for API calls)

### Backend
- 🟢 Node.js + Express
- 💾 MongoDB + Mongoose
- 🔑 JWT Authentication
- 🌐 CORS

