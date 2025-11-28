// src/pages/ProductDetail.jsx
// Product details page with add to cart functionality

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useProduct } from '../hooks/useApi';
import { useCart } from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(slug);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/products/${slug}` } });
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart(product._id, quantity);
      // Show success message or toast
      alert('Added to cart successfully!');
    } catch (err) {
      alert('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-96">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-base-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="alert alert-error">
            <span>Product not found</span>
          </div>
          <button onClick={() => navigate('/products')} className="btn btn-primary mt-4">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const currentImage = images[selectedImage] || product.image;

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs mb-4">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href={`/category/${product.category?.slug}`}>{product.categoryName}</a></li>
            <li>{product.name}</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="card bg-base-200 shadow-xl mb-4">
              <figure className="px-4 pt-4">
                <img 
                  src={currentImage} 
                  alt={product.name}
                  className="rounded-xl object-cover w-full h-96"
                />
              </figure>
            </div>
            
            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 ${selectedImage === idx ? 'ring-2 ring-primary' : ''}`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${idx + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="rating rating-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    className="mask mask-star-2 bg-orange-400"
                    checked={star === Math.round(product.rating)}
                    readOnly
                  />
                ))}
              </div>
              <span className="text-sm">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {product.featured && (
                <div className="badge badge-secondary">Featured</div>
              )}
              {product.discount > 0 && (
                <div className="badge badge-error">-{product.discount}%</div>
              )}
              {!product.inStock && (
                <div className="badge badge-ghost">Out of Stock</div>
              )}
              {product.tags?.map((tag, idx) => (
                <div key={idx} className="badge badge-outline">{tag}</div>
              ))}
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  ₹{product.price}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xl line-through opacity-50">
                    ₹{product.compareAtPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-success">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>In Stock ({product.stockQuantity} available)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Out of Stock</span>
                </div>
              )}
              {product.inStock && product.stockQuantity < 20 && (
                <div className="text-warning text-sm mt-1">
                  Only {product.stockQuantity} left!
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="label">
                <span className="label-text font-semibold">Quantity</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn btn-sm btn-circle"
                  disabled={!product.inStock}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stockQuantity, parseInt(e.target.value) || 1)))}
                  className="input input-bordered w-20 text-center"
                  disabled={!product.inStock}
                  min="1"
                  max={product.stockQuantity}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  className="btn btn-sm btn-circle"
                  disabled={!product.inStock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || addingToCart}
                className="btn btn-primary flex-1"
              >
                {addingToCart ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="btn btn-outline"
              >
                View Cart
              </button>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="text-base-content/70">{product.description}</p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="card bg-base-200 p-4">
                <h2 className="text-xl font-bold mb-2">Specifications</h2>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-semibold capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-base-content/70">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}