import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaStar, FaArrowLeft, FaCheck } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch product details');
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart(product._id);
      toast.success('Product added to cart!');
    } catch (error) {
      toast.error('Failed to add product to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="text-xl text-secondary-600 relative z-10">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="text-xl text-red-600 relative z-10">Product not found</div>
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
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center space-x-3 text-primary-600 hover:text-primary-700 mb-8 transition-colors font-medium"
        >
          <FaArrowLeft />
          <span>Back to Shop</span>
        </button>

        <div className="glass-card rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl overflow-hidden bg-secondary-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-display font-bold text-secondary-800 mb-4">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-2xl text-sm font-semibold">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-sm fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-secondary-500 font-medium">(4.5)</span>
                  </div>
                </div>
                <p className="text-secondary-600 leading-relaxed text-lg">{product.description}</p>
              </div>

              <div className="border-t border-secondary-200 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-3xl font-display font-bold gradient-text">₹{product.price}</span>
                  <span className={`px-4 py-2 rounded-2xl text-sm font-bold ${
                    product.stock > 10 ? 'bg-green-100 text-green-800' :
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingToCart}
                  className={`w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold text-lg hover-lift shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 ${
                    product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {addingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Adding to Cart...</span>
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="text-xl" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Additional Information */}
              <div className="border-t border-secondary-200 pt-6 space-y-4">
                <h3 className="text-lg font-display font-bold text-secondary-800">Product Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-3">
                    <FaCheck className="text-green-500 text-lg" />
                    <span className="text-secondary-700 font-medium">Quality Assured</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheck className="text-green-500 text-lg" />
                    <span className="text-secondary-700 font-medium">Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheck className="text-green-500 text-lg" />
                    <span className="text-secondary-700 font-medium">Easy Returns</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheck className="text-green-500 text-lg" />
                    <span className="text-secondary-700 font-medium">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
