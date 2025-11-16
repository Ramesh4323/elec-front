import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaEye, FaStar, FaBolt } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    addToCart(product._id);
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden hover-lift border border-white/20 shadow-xl group backdrop-blur-sm">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Animated overlay elements */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-gradient-to-r from-accent-400 to-accent-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-float">
            <FaBolt className="inline mr-1" />
            Premium
          </div>
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-2 group-hover:translate-y-0">
          <div className="glass-card p-2 rounded-xl shadow-lg">
            <FaEye className="text-neutral-700 text-lg" />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 transform translate-y-4 group-hover:translate-y-0">
          <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg animate-glow">
            {product.category}
          </span>
          <span className={`px-3 py-2 rounded-xl text-xs font-bold shadow-lg ${
            product.stock > 10 ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
            product.stock > 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
            'bg-gradient-to-r from-red-400 to-red-600 text-white'
          }`}>
            {product.stock > 10 ? '✓ In Stock' : product.stock > 0 ? `⚠ ${product.stock} left` : '✗ Out of Stock'}
          </span>
        </div>
      </div>
      <div className="p-6 bg-white/50 backdrop-blur-sm">
        <h3 className="text-xl font-display font-bold mb-3 text-neutral-800 group-hover:text-primary-600 transition-all duration-300 text-shadow">
          {product.name}
        </h3>
        <p className="text-neutral-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="text-2xl font-display font-bold gradient-text animate-float">
              ₹{product.price.toFixed(2)}
            </span>
            <span className="text-xs text-neutral-500 font-medium">Inclusive of all taxes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-sm fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <span className="text-sm text-neutral-500 font-semibold">(4.5)</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl hover-lift flex items-center justify-center space-x-2 group/btn"
          >
            <FaEye className="text-sm group-hover/btn:scale-110 transition-transform" />
            <span>View Details</span>
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`bg-gradient-to-r from-accent-500 to-accent-600 text-white p-3 rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl hover-lift group/btn ${
              product.stock === 0 ? 'opacity-50 cursor-not-allowed grayscale' : 'animate-bounce-gentle'
            }`}
            title="Add to Cart"
          >
            <FaShoppingCart className={`text-lg group-hover/btn:scale-110 transition-transform ${product.stock === 0 ? '' : 'animate-pulse'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
