import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const Cart = () => {
  const { cart, loading, removeFromCart, updateCartItem } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem(productId, newQuantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-12 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-12 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute top-20 left-10 w-24 h-24 bg-primary-200/30 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-200/30 rounded-full animate-float delay-500"></div>

        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl font-display font-bold mb-4 gradient-text">Your Cart is Empty</h1>
          <p className="text-secondary-600 mb-8">Add some products to get started!</p>
          <Link
            to="/shop"
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 inline-block shadow-xl hover:shadow-2xl hover-lift"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-12 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary-200/30 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-200/30 rounded-full animate-float delay-500"></div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl font-display font-bold mb-12 text-center gradient-text">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cart.items.map((item) => (
            <div key={item.product} className="flex items-center glass-card p-6 rounded-3xl shadow-xl mb-6 border border-white/20 hover-lift">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-2xl mr-6"
              />
              <div className="flex-1">
                <h3 className="text-lg font-display font-semibold text-secondary-800">{item.name}</h3>
                <p className="text-secondary-600">₹{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(item.product, item.quantity - 1)}
                  className="p-2 bg-secondary-100 rounded-xl hover:bg-secondary-200 transition-colors"
                >
                  <FaMinus className="text-sm text-secondary-600" />
                </button>
                <span className="px-4 py-2 bg-white border-2 border-secondary-200 rounded-xl text-secondary-800 font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.product, item.quantity + 1)}
                  className="p-2 bg-secondary-100 rounded-xl hover:bg-secondary-200 transition-colors"
                >
                  <FaPlus className="text-sm text-secondary-600" />
                </button>
              </div>
              <div className="ml-6 text-right">
                <p className="text-lg font-display font-bold text-secondary-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.product)}
                  className="text-red-500 hover:text-red-700 mt-2 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="glass-card p-8 rounded-3xl shadow-2xl h-fit border border-white/20">
          <h2 className="text-xl font-display font-bold mb-6 gradient-text">Cart Summary</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-secondary-700 font-medium">Subtotal:</span>
              <span className="text-secondary-800 font-semibold">₹{cart.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-700 font-medium">Shipping:</span>
              <span className="text-secondary-800 font-semibold">₹10.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-700 font-medium">Tax:</span>
              <span className="text-secondary-800 font-semibold">₹{(cart.totalPrice * 0.08).toFixed(2)}</span>
            </div>
            <hr className="border-secondary-200" />
            <div className="flex justify-between font-display font-bold text-lg">
              <span className="text-secondary-800">Total:</span>
              <span className="gradient-text">₹{(cart.totalPrice + 10 + cart.totalPrice * 0.08).toFixed(2)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 block text-center shadow-xl hover:shadow-2xl hover-lift font-semibold"
          >
            Proceed to Checkout
          </Link>
          <Link
            to="/shop"
            className="w-full bg-white border-2 border-secondary-200 text-secondary-800 py-3 px-6 rounded-2xl hover:bg-secondary-50 transition-all duration-300 block text-center mt-4 font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Cart;
