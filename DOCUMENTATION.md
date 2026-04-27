# Ohana of Yarn - Documentation

Welcome to the documentation for **Ohana of Yarn**, a premium e-commerce platform for handcrafted crochet creations.

## 📖 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Key Features](#key-features)
5. [Configuration & Environment Variables](#configuration--environment-variables)
6. [Getting Started](#getting-started)
7. [API Endpoints](#api-endpoints)
8. [Admin Dashboard](#admin-dashboard)

---

## 🌟 Project Overview
Ohana of Yarn is a full-stack e-commerce application built to showcase and sell handmade crochet items. The brand is centered around the concept of 'Ohana'—family and home—ensuring every piece is crafted with love and care.

---

## 🛠 Technology Stack
### Frontend
- **React (Vite)**: Modern UI library for a fast, responsive user experience.
- **Tailwind CSS**: Utility-first CSS framework for custom, premium styling.
- **React Router**: For seamless client-side navigation.
- **React Icons**: For high-quality iconography.

### Backend
- **Node.js & Express**: Scalable and fast server-side environment.
- **MongoDB & Mongoose**: Flexible NoSQL database for product and order management.
- **JWT (JSON Web Tokens)**: Secure authentication for users and admins.
- **Cloudinary**: Cloud-based image management for product photos.

---

## 📂 Folder Structure
```text
crochet-shop/
├── backend/                # Express server and database logic
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas (User, Product, Order, Review)
│   ├── routes/             # API route definitions
│   ├── middleware/         # Auth and error handling
│   └── server.js           # Entry point
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Home, Products, Admin, etc.)
│   │   ├── services/       # API interaction logic
│   │   ├── assets/         # Static images and logos
│   │   └── App.jsx         # Main application component
└── .env                    # Environment variables (Root & Backend)
```

---

## ✨ Key Features
- **Responsive Design**: Stunning UI that works on mobile, tablet, and desktop.
- **Product Catalog**: Filterable and searchable product grid with categories (Products, Patterns, Accessories, etc.).
- **Shopping Cart**: Fully functional cart with persistent state.
- **Order Management**: Checkout system with WhatsApp integration for direct communication.
- **Review System**: Customers can leave reviews, which admins can approve/reject.
- **Admin Settings**: Dedicated interface for admins to update their profile (Name, Email, Password).
- **Dark Mode**: Support for system-wide dark and light themes.

---

## ⚙️ Configuration & Environment Variables
Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Madhavi-2612/Ohana-of-Yarn.git
```

### 2. Install Dependencies
**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. Run Development Servers
**Backend:**
```bash
npm run dev
```

**Frontend:**
```bash
npm run dev
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and receive JWT
- `PUT /api/auth/profile`: Update admin profile (Protected)

### Products
- `GET /api/products`: Fetch all products (with filters)
- `POST /api/products`: Create a product (Admin)
- `DELETE /api/products/:id`: Delete a product (Admin)

### Reviews
- `GET /api/reviews`: Fetch approved reviews
- `POST /api/reviews`: Submit a new review
- `PUT /api/reviews/:id/approve`: Approve/Reject review (Admin)

---

## 🛡 Admin Dashboard
Admins can access the dashboard by logging in with an admin account. 
- **Manage Products**: Add, edit, or delete items from the store.
- **Manage Orders**: Track and process customer orders.
- **Manage Reviews**: Moderate customer feedback.
- **Admin Settings**: Change the admin's name, email, and password.

---

*Handmade with Love, for your Ohana.*
