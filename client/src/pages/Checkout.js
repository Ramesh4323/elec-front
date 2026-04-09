import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'card',
  });
  const [loading, setLoading] = useState(false);

  const { address, city, postalCode, country, paymentMethod } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        orderItems: cart.items.map(item => ({
          product: item.product,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod,
        taxPrice: (cart.totalPrice * 0.08).toFixed(2),
        shippingPrice: 10.00,
        totalPrice: (cart.totalPrice + 10 + cart.totalPrice * 0.08).toFixed(2),
      };

      await axios.post('/api/orders', orderData);
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const subtotal = cart.totalPrice;
  const shipping = 10.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-12 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary-200/30 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-200/30 rounded-full animate-float delay-500"></div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl font-display font-bold mb-12 text-center gradient-text">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-display font-bold mb-6 gradient-text">Order Summary</h2>
          <div className="glass-card p-8 rounded-3xl shadow-2xl border border-white/20">
            {cart.items.map((item) => (
              <div key={item.product} className="flex items-center mb-6 pb-6 border-b border-secondary-200 last:border-b-0 last:mb-0 last:pb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-2xl mr-6"
                />
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-secondary-800">{item.name}</h3>
                  <p className="text-secondary-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-display font-bold text-secondary-800">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="mt-6 pt-6 border-t border-secondary-200">
              <div className="flex justify-between mb-4">
                <span className="text-secondary-700 font-medium">Subtotal:</span>
                <span className="text-secondary-800 font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-secondary-700 font-medium">Shipping:</span>
                <span className="text-secondary-800 font-semibold">₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-secondary-700 font-medium">Tax:</span>
                <span className="text-secondary-800 font-semibold">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-display font-bold text-lg">
                <span className="text-secondary-800">Total:</span>
                <span className="gradient-text">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div>
          <h2 className="text-xl font-display font-bold mb-6 gradient-text">Shipping & Payment</h2>
          <form onSubmit={onSubmit} className="glass-card p-8 rounded-3xl shadow-2xl border border-white/20">
            <h3 className="text-lg font-display font-bold mb-6 gradient-text">Shipping Address</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-secondary-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={address}
                  onChange={onChange}
                  className="w-full px-4 py-3 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 text-secondary-800 placeholder-secondary-400 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-secondary-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={city}
                    onChange={onChange}
                    className="w-full px-4 py-3 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 text-secondary-800 placeholder-secondary-400 font-medium"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-secondary-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={postalCode}
                    onChange={onChange}
                    className="w-full px-4 py-3 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 text-secondary-800 placeholder-secondary-400 font-medium"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-secondary-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  value={country}
                  onChange={onChange}
                  className="w-full px-4 py-3 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 text-secondary-800 placeholder-secondary-400 font-medium"
                />
              </div>
            </div>

            <h3 className="text-lg font-display font-bold mb-6 mt-8 gradient-text">Payment Method</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={onChange}
                  className="mr-3 w-4 h-4 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="card" className="text-sm font-medium text-secondary-700">
                  Credit/Debit Card (Dummy Payment)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={onChange}
                  className="mr-3 w-4 h-4 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="paypal" className="text-sm font-medium text-secondary-700">
                  PayPal (Dummy Payment)
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover-lift font-semibold"
            >
              {loading ? 'Processing...' : `Place Order - ₹${total.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Checkout;
