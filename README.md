# Crochet Shop E-Commerce Application

A complete, production-ready MERN stack e-commerce web application designed for a crochet business.

## Features Included

- **Frontend:** React (Vite), Tailwind CSS (Pastel Crochet Theme), React Router v6, Context API.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT Authentication, Multer Image Uploads.
- **Payments & Checkout:** Razorpay integration and WhatsApp checkout redirect.
- **User Roles:** Normal users (shopping, cart, orders) and Admin (products CRUD, orders management).

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB connection string (local or Atlas)
- Razorpay API keys (optional, but needed for card payments to work)

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and update the values.
   ```bash
   cp .env.example .env
   ```
   *Make sure `MONGO_URI` is correctly pointing to your MongoDB instance.*

4. Start the backend server:
   ```bash
   npm run dev
   ```
   *(Server will start on http://localhost:5000)*

### 2. Frontend Setup

1. Open a **new** terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env`.
   ```bash
   cp .env.example .env
   ```
   *You can add your `VITE_RAZORPAY_KEY_ID` here.*

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *(Frontend will start on http://localhost:5173)*

---

## Making an Admin Account
The first user registered is just a normal user. To make them an admin:
1. Register a user in the frontend.
2. Open your MongoDB GUI (like MongoDB Compass).
3. Find your user in the `users` collection.
4. Change the `isAdmin` field to `true`.
5. Login again to access the `/admin` portal.
