// src/hooks/useApi.js
// Custom hooks for API calls - PROPERLY FIXED SEARCH

import { useState, useEffect } from 'react';
import api from '../services/api';

// Hook for fetching products with FIXED SEARCH
export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // If search query exists, use the search endpoint
        if (filters.search && filters.search.trim()) {
          console.log('🔍 Searching for:', filters.search);
          const response = await api.get(`/products/search?q=${encodeURIComponent(filters.search)}`);
          console.log('✅ Search results:', response.data.results?.length || 0, 'products');
          setProducts(response.data.results || []);
          setError(null);
          return; // STOP HERE - don't continue to regular endpoint
        }

        // Otherwise use regular products endpoint with filters
        console.log('📦 Fetching all products with filters:', filters);
        const params = new URLSearchParams();
        
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.featured) params.append('featured', 'true');
        
        // Handle sorting
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'price-asc':
              params.append('sort', 'price');
              params.append('order', 'asc');
              break;
            case 'price-desc':
              params.append('sort', 'price');
              params.append('order', 'desc');
              break;
            case 'rating':
              params.append('sort', 'rating');
              params.append('order', 'desc');
              break;
            case 'newest':
              params.append('sort', 'createdAt');
              params.append('order', 'desc');
              break;
            default:
              // featured - default sorting
              break;
          }
        }

        const response = await api.get(`/products?${params.toString()}`);
        console.log('✅ Regular products:', response.data.products?.length || 0, 'products');
        setProducts(response.data.products || []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(filters)]);

  return { products, loading, error };
};

// Hook for fetching single product by slug
export const useProduct = (slug) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/slug/${slug}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
};

// Hook for fetching featured products
export const useFeaturedProducts = (limit = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/featured?limit=${limit}`);
        setProducts(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, [limit]);

  return { products, loading, error };
};

// Hook for fetching categories
export const useCategories = (featured = false) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const url = featured ? '/categories?featured=true' : '/categories';
        const response = await api.get(url);
        setCategories(response.data.categories || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [featured]);

  return { categories, loading, error };
};

// Hook for fetching products by category slug
export const useProductsByCategory = (categorySlug, limit) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categorySlug) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = `/products?category=${categorySlug}${limit ? `&limit=${limit}` : ''}`;
        const response = await api.get(url);
        setProducts(response.data.products || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products by category:', err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, limit]);

  return { products, loading, error };
};

// Hook for cart operations
export const useCart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart');
      setCart(response.data.cart || { items: [] });
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await api.post('/cart/add', { productId, quantity });
      setCart(response.data.cart);
      return response.data.cart;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await api.put(`/cart/update/${itemId}`, { quantity });
      setCart(response.data.cart);
      return response.data.cart;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update quantity');
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await api.delete(`/cart/remove/${itemId}`);
      setCart(response.data.cart);
      return response.data.cart;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart/clear');
      setCart({ items: [] });
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to clear cart');
    }
  };

  return { cart, loading, fetchCart, addToCart, updateQuantity, removeItem, clearCart };
};