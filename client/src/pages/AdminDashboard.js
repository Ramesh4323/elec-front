import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Pipes',
    image: '',
    stock: '',
  });
  const [loading, setLoading] = useState(false);

  const categories = ['Pipes', 'Wires', 'Switches', 'Lights', 'Tools', 'Others'];

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders');
      setOrders(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, formData);
        toast.success('Product updated successfully');
      } else {
        await axios.post('/api/products', formData);
        toast.success('Product added successfully');
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Pipes',
      image: '',
      stock: '',
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-12 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary-200/30 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-200/30 rounded-full animate-float delay-500"></div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl font-display font-bold mb-12 text-center gradient-text">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex mb-8">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 mr-4 rounded-2xl font-semibold transition-all duration-300 ${
            activeTab === 'products' ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl' : 'bg-white border-2 border-secondary-200 text-secondary-700 hover:bg-secondary-50 shadow-lg'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
            activeTab === 'orders' ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl' : 'bg-white border-2 border-secondary-200 text-secondary-700 hover:bg-secondary-50 shadow-lg'
          }`}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-display font-bold gradient-text">Products Management</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center shadow-xl hover:shadow-2xl hover-lift font-semibold"
            >
              <FaPlus className="mr-2" />
              {showAddForm ? 'Cancel' : 'Add Product'}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl shadow-2xl mb-8 border border-white/20">
              <h3 className="text-lg font-display font-bold mb-6 gradient-text">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 text-secondary-800 placeholder-secondary-400 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 text-secondary-800 font-medium"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 text-secondary-800 placeholder-secondary-400 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Stock</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 text-secondary-800 placeholder-secondary-400 font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 text-secondary-800 placeholder-secondary-400 font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 text-secondary-800 placeholder-secondary-400 font-medium resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="mr-4 px-6 py-3 bg-white border-2 border-secondary-200 text-secondary-700 rounded-2xl hover:bg-secondary-50 transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 disabled:opacity-50 shadow-xl hover:shadow-2xl hover-lift font-semibold"
                >
                  {loading ? 'Saving...' : (editingProduct ? 'Update' : 'Add')}
                </button>
              </div>
            </form>
          )}

          <div className="glass-card rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <table className="w-full">
              <thead className="bg-secondary-50/50">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-display font-bold text-secondary-700 uppercase tracking-wider">Product</th>
                  <th className="px-8 py-4 text-left text-xs font-display font-bold text-secondary-700 uppercase tracking-wider">Category</th>
                  <th className="px-8 py-4 text-left text-xs font-display font-bold text-secondary-700 uppercase tracking-wider">Price</th>
                  <th className="px-8 py-4 text-left text-xs font-display font-bold text-secondary-700 uppercase tracking-wider">Stock</th>
                  <th className="px-8 py-4 text-left text-xs font-display font-bold text-secondary-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-secondary-200/50">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-secondary-50/30 transition-colors">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-12 w-12 rounded-2xl mr-4 shadow-lg" src={product.image} alt={product.name} />
                        <div>
                          <div className="text-sm font-display font-semibold text-secondary-800">{product.name}</div>
                          <div className="text-sm text-secondary-600 truncate max-w-xs">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-secondary-800">{product.category}</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-display font-bold text-secondary-800">₹{product.price.toFixed(2)}</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-secondary-800">{product.stock}</td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-primary-600 hover:text-primary-700 mr-4 transition-colors p-2 rounded-xl hover:bg-primary-50"
                      >
                        <FaEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-xl hover:bg-red-50"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <h2 className="text-2xl font-display font-bold mb-8 gradient-text">Orders Management</h2>
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="glass-card p-8 rounded-3xl shadow-2xl border border-white/20">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-display font-bold text-secondary-800">Order #{order._id.slice(-8)}</h3>
                    <p className="text-secondary-600">Customer: {order.user?.name || 'Unknown'}</p>
                    <p className="text-secondary-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-display font-bold text-secondary-800">₹{order.totalPrice.toFixed(2)}</p>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="mt-3 px-4 py-2 bg-white border-2 border-secondary-200 rounded-2xl text-sm font-medium text-secondary-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="border-t border-secondary-200 pt-6">
                  <h4 className="font-display font-bold mb-4 text-secondary-800">Items:</h4>
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm py-2">
                      <span className="text-secondary-700 font-medium">{item.name} (x{item.quantity})</span>
                      <span className="font-display font-semibold text-secondary-800">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminDashboard;
