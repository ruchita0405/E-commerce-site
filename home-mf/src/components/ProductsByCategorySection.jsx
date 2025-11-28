// src/components/ProductsByCategorySection.jsx
// Display products organized by category with carousels

import React, { useState, useEffect } from 'react';
import { useCategories } from '../hooks/useApi';
import api from '../services/api';
import ProductCarousel from './ProductCarousel';

const ProductsByCategorySection = ({ limit = 10 }) => {
  const { categories, loading: categoriesLoading } = useCategories(true);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (!categories || categories.length === 0) return;

      try {
        setLoading(true);
        const productsData = {};

        // Fetch products for each category
        for (const category of categories.slice(0, 5)) { // Limit to first 5 categories
          const response = await api.categories.getProducts(category._id, 1, limit);
          productsData[category._id] = {
            products: response.products || [],
            category: category
          };
        }

        setCategoryProducts(productsData);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categories, limit]);

  if (categoriesLoading || loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="skeleton h-8 w-48 mb-6"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="skeleton h-64"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.values(categoryProducts).map((data) => (
        data.products.length > 0 && (
          <ProductCarousel
            key={data.category._id}
            products={data.products}
            title={data.category.name}
            viewAllLink={`/categories/${data.category._id}`}
          />
        )
      ))}
    </div>
  );
};

export default ProductsByCategorySection;