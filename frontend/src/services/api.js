import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api` 
    : '/api',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');
export const updateProfile = (data) => API.put('/auth/profile', data);


// Products
export const getProducts = (params) => API.get('/products', { params });
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Orders
export const createOrder = (data) => API.post('/orders', data);
export const getMyOrders = () => API.get('/orders/my');
export const getAllOrders = () => API.get('/orders');
export const updateOrderStatus = (id, data) => API.put(`/orders/${id}/status`, data);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

// Payment
export const createRazorpayOrder = (data) => API.post('/payment/create-order', data);
export const verifyPayment = (data) => API.post('/payment/verify', data);

// WhatsApp
export const generateWhatsAppURL = (data) => API.post('/whatsapp/generate', data);

// Reviews
export const getReviews = (params) => API.get('/reviews', { params });
export const createReview = (data) => API.post('/reviews', data);
export const updateReviewStatus = (id) => API.put(`/reviews/${id}/approve`);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);

/**
 * Consistently construct product image URLs
 * @param {string} imagePath - The path stored in the database
 * @returns {string} - The full URL to the image
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/uploads/default-product.jpg';
  if (imagePath.startsWith('http')) return imagePath;

  const serverUrl = import.meta.env.VITE_API_URL || 'https://ohana-of-yarn.onrender.com';
  
  // Log once in development/production if env var is missing
  if (!import.meta.env.VITE_API_URL && !window._imageLogWarn) {
    console.warn('VITE_API_URL is missing! Falling back to hardcoded Render URL for images.');
    window._imageLogWarn = true;
  }

  const cleanServerUrl = serverUrl.replace(/\/$/, '');
  const cleanImagePath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  return `${cleanServerUrl}${cleanImagePath}`;
};

export default API;
