// API Configuration
export const API_BASE_URL = 'http://localhost:3001/api';
export const AUTH_API_URL = 'http://localhost:8080/api';
export const CHECKOUT_API_URL = 'http://localhost:8082/api';

// Product Endpoints
export const PRODUCT_ENDPOINTS = {
  getAll: '/products',
  getById: '/products/:id',
  getFeatured: '/products/featured',
  getByCategory: '/products/category/:categoryId'
};

// Cart Endpoints
export const CART_ENDPOINTS = {
  getCart: '/cart/:userId',
  addItem: '/cart/:userId/items',
  updateItem: '/cart/:userId/items/:itemId',
  removeItem: '/cart/:userId/items/:itemId',
  clearCart: '/cart/:userId'
};

// Order Endpoints
export const ORDER_ENDPOINTS = {
  create: '/orders',
  getUserOrders: '/orders/user/:userId'
};

// Email Endpoints
export const EMAIL_ENDPOINTS = {
  sendOrderEmail: '/email/send-order-email'
};