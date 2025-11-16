import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaCog, FaChevronDown, FaBolt } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="glass-card sticky top-0 z-50 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center animate-morph shadow-lg group-hover:shadow-xl transition-all duration-300">
                <FaBolt className="text-white text-xl animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
                JDE
              </h1>
              <p className="text-xs text-neutral-600 font-medium">Electronics</p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="relative text-neutral-700 hover:text-primary-600 transition-all duration-300 font-medium group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/shop" className="relative text-neutral-700 hover:text-primary-600 transition-all duration-300 font-medium group">
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {user && (
              <Link to="/cart" className="relative text-neutral-700 hover:text-primary-600 transition-all duration-300 font-medium group">
                Cart
                {cart.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-accent-400 to-accent-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-bounce-gentle border-2 border-white">
                    {cart.items.length}
                  </span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="relative text-neutral-700 hover:text-primary-600 transition-all duration-300 font-medium group">
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  <span className="text-neutral-700 font-medium">Welcome,</span>
                  <span className="text-primary-600 font-semibold ml-1">{user.name}</span>
                </div>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 glass-card px-4 py-2 rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl group"
                    aria-label="Account menu"
                    title="Account menu"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-400 rounded-lg flex items-center justify-center">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <span className="hidden lg:inline font-medium text-neutral-700 group-hover:text-primary-600 transition-colors">Account</span>
                    <FaChevronDown className={`text-sm text-neutral-500 transition-all duration-300 ${isDropdownOpen ? 'rotate-180 text-primary-600' : ''}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 glass-card rounded-2xl shadow-2xl py-3 z-50 border border-white/20 backdrop-blur-xl">
                      <Link
                        to="/profile"
                        onClick={closeDropdown}
                        className="flex items-center px-4 py-3 text-sm text-neutral-700 hover:text-primary-600 hover:bg-white/20 transition-all duration-300 rounded-lg mx-2"
                      >
                        <FaUser className="mr-3 text-primary-500" />
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={closeDropdown}
                        className="flex items-center px-4 py-3 text-sm text-neutral-700 hover:text-primary-600 hover:bg-white/20 transition-all duration-300 rounded-lg mx-2"
                      >
                        <FaCog className="mr-3 text-accent-500" />
                        My Orders
                      </Link>
                      <hr className="my-2 border-white/20" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50/20 transition-all duration-300 rounded-lg mx-2"
                      >
                        <FaSignOutAlt className="mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link to="/login" className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2.5 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover-lift focus-ring">
                  Login
                </Link>
                <Link to="/signup" className="glass-card text-neutral-700 px-6 py-2.5 rounded-xl hover:bg-white/40 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover-lift focus-ring border border-white/30">
                  Sign Up
                </Link>
              </div>
            )}

            {user && (
              <Link to="/cart" className="relative p-3 glass-card rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl group">
                <FaShoppingCart className="text-xl text-neutral-700 group-hover:text-primary-600 transition-colors" />
                {cart.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent-400 to-accent-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-bounce-gentle border-2 border-white">
                    {cart.items.length}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
