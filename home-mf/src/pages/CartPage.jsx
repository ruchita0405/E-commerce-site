// src/pages/CartPage.jsx
// Shopping cart with add/remove/update functionality

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, loading, updateQuantity, removeItem, clearCart } = useCart();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { state: { from: '/cart' } });
    }
  }, [user, loading, navigate]);

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

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal + shipping;

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (err) {
      alert('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('Remove this item from cart?')) {
      try {
        await removeItem(itemId);
      } catch (err) {
        alert('Failed to remove item');
      }
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Clear all items from cart?')) {
      try {
        await clearCart();
      } catch (err) {
        alert('Failed to clear cart');
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body items-center text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-base-content/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-base-content/70 mb-6">Add some eco-friendly products to get started!</p>
              <button onClick={() => navigate('/products')} className="btn btn-primary">
                Browse Products
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Clear Cart Button */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-base-content/70">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in cart
                </span>
                <button onClick={handleClearCart} className="btn btn-sm btn-ghost btn-error">
                  Clear Cart
                </button>
              </div>

              {items.map((item) => (
                <div key={item._id} className="card bg-base-200 shadow-lg">
                  <div className="card-body p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <figure className="w-24 h-24 flex-shrink-0">
                        <img 
                          src={item.product?.image || item.image} 
                          alt={item.product?.name || item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </figure>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-bold text-lg">
                              <a 
                                href={`/products/${item.product?.slug}`}
                                className="hover:text-primary"
                              >
                                {item.product?.name || item.name}
                              </a>
                            </h3>
                            <p className="text-sm text-base-content/70">
                              {item.product?.categoryName}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="btn btn-sm btn-ghost btn-circle"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                              className="btn btn-xs btn-circle"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                              className="btn btn-xs btn-circle"
                              disabled={item.quantity >= (item.product?.stockQuantity || 999)}
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-xs text-base-content/70">
                              ₹{item.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card bg-base-200 shadow-xl sticky top-4">
                <div className="card-body">
                  <h2 className="card-title">Order Summary</h2>
                  
                  <div className="divider my-2"></div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-semibold">
                        {shipping === 0 ? (
                          <span className="text-success">FREE</span>
                        ) : (
                          `₹${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <div className="text-xs text-base-content/70">
                        Free shipping on orders over ₹50
                      </div>
                    )}
                  </div>
                  
                  <div className="divider my-2"></div>
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(2)}</span>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="btn btn-primary btn-block mt-4"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <button 
                    onClick={() => navigate('/products')}
                    className="btn btn-outline btn-block"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}