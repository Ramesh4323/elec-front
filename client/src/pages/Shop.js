import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories] = useState(['Pipes', 'Wires', 'Switches', 'Lights', 'Tools', 'Others']);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/products');
      setProducts(res.data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-12 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary-200/30 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-200/30 rounded-full animate-float delay-500"></div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl font-display font-bold mb-12 text-center gradient-text">Shop Our Products</h1>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-500 text-lg" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 hover:shadow-lg text-secondary-800 placeholder-secondary-400 font-medium"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-500 text-lg" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-12 pr-4 py-4 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-300 hover:border-accent-400 hover:shadow-lg text-secondary-800 font-medium appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Shop;
