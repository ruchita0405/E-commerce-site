import React from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProduct";
import ServiceStrips from "../components/ServiceStrips";
import Footer from "../components/Footer";
import { useCategories, useFeaturedProducts, useCart, useAuth, useSearch } from "../hooks/useApi";

/**
 * Homepage component with backend integration
 * This version uses custom hooks that connect to the backend API
 * To enable backend integration, simply ensure your API service is configured
 */
const HomepageWithBackend = () => {
  // Fetch data using custom hooks
  const { data: categories, loading: categoriesLoading } = useCategories();
  const { data: featuredProducts, loading: productsLoading } = useFeaturedProducts();
  const { cartItems, addToCart } = useCart();
  const { user, logout } = useAuth();
  const { results: searchResults, search } = useSearch();

  // Handler functions
  const handleSearch = (query) => {
    search(query);
    // Optionally navigate to search results page
    // navigate(`/search?q=${query}`);
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id, 1);
      // Show success notification
      console.log('Product added to cart successfully');
    } catch (error) {
      // Show error notification
      console.error('Failed to add product to cart:', error);
    }
  };

  const handleCategoryClick = (category) => {
    // Navigate to category page
    // navigate(`/category/${category.slug}`);
    console.log('Navigate to category:', category.slug);
  };

  const handleProductClick = (product) => {
    // Navigate to product detail page
    // navigate(`/product/${product.id}`);
    console.log('Navigate to product:', product.id);
  };

  const handleCartClick = () => {
    // Navigate to cart page
    // navigate('/cart');
    console.log('Navigate to cart');
  };

  const handleProfileAction = async (action) => {
    switch(action) {
      case 'logout':
        await logout();
        // Navigate to home or login page
        // navigate('/');
        break;
      case 'profile':
        // navigate('/profile');
        break;
      case 'settings':
        // navigate('/settings');
        break;
      case 'orders':
        // navigate('/orders');
        break;
      case 'viewCart':
        handleCartClick();
        break;
      default:
        break;
    }
  };

  const handleHeroButtonClick = () => {
    // Navigate to shop page
    // navigate('/shop');
    console.log('Navigate to shop');
  };

  const handleFooterLinkClick = (link) => {
    // Navigate to respective page
    // navigate(link.href);
    console.log('Navigate to:', link.href);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        brandName="EcoMart"
        cartItems={cartItems}
        userProfile={user}
        onSearch={handleSearch}
        onCartClick={handleCartClick}
        onProfileAction={handleProfileAction}
      />
      
      <main className="flex-grow">
        <HeroBanner 
          title="30% OFF Eco Essentials"
          description="Sustainable products for a greener future – detergents, bamboo, steel, reusable and biodegradable products."
          buttonText="Shop Now"
          onButtonClick={handleHeroButtonClick}
        />
        
        <CategorySection 
          categories={categories}
          onCategoryClick={handleCategoryClick}
          isLoading={categoriesLoading}
        />
        
        <FeaturedProducts 
          products={featuredProducts}
          onAddToCart={handleAddToCart}
          onProductClick={handleProductClick}
          isLoading={productsLoading}
        />
        
        <ServiceStrips />
      </main>
      
      <Footer 
        brandName="EcoMart"
        onLinkClick={handleFooterLinkClick}
      />
    </div>
  );
};

export default HomepageWithBackend;