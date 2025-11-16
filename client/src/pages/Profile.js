import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders/myorders');
      setOrders(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-12 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading profile...</p>
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
        <h1 className="text-4xl font-display font-bold mb-12 text-center gradient-text">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="glass-card p-8 rounded-3xl shadow-2xl border border-white/20">
          <h2 className="text-xl font-display font-bold mb-6 gradient-text">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Name</label>
              <p className="text-secondary-800 font-semibold">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Email</label>
              <p className="text-secondary-800 font-semibold">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Role</label>
              <p className="text-secondary-800 font-semibold capitalize">{user.role}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Member Since</label>
              <p className="text-secondary-800 font-semibold">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-display font-bold mb-6 gradient-text">Order History</h2>
          {orders.length === 0 ? (
            <div className="glass-card p-8 rounded-3xl shadow-2xl border border-white/20 text-center">
              <p className="text-secondary-600">No orders found.</p>
              <p className="text-sm text-secondary-500 mt-2">Your order history will appear here once you make a purchase.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="glass-card p-8 rounded-3xl shadow-2xl border border-white/20">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-display font-bold text-secondary-800">Order #{order._id.slice(-8)}</h3>
                      <p className="text-secondary-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-secondary-600">Status: <span className={`capitalize font-semibold ${
                        order.status === 'delivered' ? 'text-green-600' :
                        order.status === 'cancelled' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>{order.status}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-display font-bold text-secondary-800">₹{order.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="border-t border-secondary-200 pt-6">
                    <h4 className="font-display font-bold mb-4 text-secondary-800">Items:</h4>
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm mb-2">
                        <span className="text-secondary-700 font-medium">{item.name} (x{item.quantity})</span>
                        <span className="font-display font-semibold text-secondary-800">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-secondary-200 pt-6 mt-6">
                    <h4 className="font-display font-bold mb-4 text-secondary-800">Shipping Address:</h4>
                    <p className="text-sm text-secondary-600">
                      {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
