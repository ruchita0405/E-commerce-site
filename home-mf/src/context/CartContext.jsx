// src/context/CartContext.jsx
// Cart context and provider

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await api.get('/cart');
      setCart(response.data.cart || { items: [] });
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      throw new Error('Please login to add items to cart');
    }

    try {
      const response = await api.post('/cart/add', { productId, quantity });
      setCart(response.data.cart);
      return response.data.cart;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!user) return;

    try {
      const response = await api.put(`/cart/update/${itemId}`, { quantity });
      setCart(response.data.cart);
      return response.data.cart;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update quantity');
    }
  };

  const removeItem = async (itemId) => {
    if (!user) return;

    try {
      const response = await api.delete(`/cart/remove/${itemId}`);
      setCart(response.data.cart);
      return response.data.cart;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove item');
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const response = await api.delete('/cart/clear');
      setCart({ items: [] });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to clear cart');
    }
  };

  const value = {
    cart,
    loading,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};