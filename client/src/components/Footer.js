import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBolt, FaShieldAlt, FaTruck, FaHeadset } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dark opacity-30"></div>

      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary-500/10 rounded-full animate-float"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-accent-500/10 rounded-full animate-float delay-500"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-primary-400/10 rounded-full animate-float delay-1000"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center animate-morph">
                <FaBolt className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold gradient-text">JDE</h3>
                <p className="text-xs text-secondary-300 font-medium">Electronics</p>
              </div>
            </div>
            <p className="text-secondary-300 mb-6 leading-relaxed max-w-md">
              Your trusted source for premium electronic components. From pipes and wires to advanced switches and lighting solutions, we deliver quality that powers your projects.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <FaShieldAlt className="text-primary-400 text-sm" />
                </div>
                <span className="text-sm text-secondary-300">Quality Assured</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center">
                  <FaTruck className="text-accent-400 text-sm" />
                </div>
                <span className="text-sm text-secondary-300">Fast Delivery</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-secondary-700 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group" title="Facebook">
                <FaFacebook className="text-secondary-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-700 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group" title="Twitter">
                <FaTwitter className="text-secondary-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-700 hover:bg-accent-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group" title="Instagram">
                <FaInstagram className="text-secondary-300 group-hover:text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-primary-400 transition-all duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-secondary-300 hover:text-primary-400 transition-all duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-primary-400 transition-all duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-primary-400 transition-all duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white">Categories</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-secondary-300 hover:text-accent-400 transition-all duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Pipes
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-accent-400 transition-all duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Wires
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-accent-400 transition-all duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Switches
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-accent-400 transition-all duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Lights
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-500/30 transition-colors">
                  <FaMapMarkerAlt className="text-primary-400 text-sm" />
                </div>
                <span className="text-secondary-300 group-hover:text-white transition-colors">Tirupur, Tamil Nadu</span>
              </div>
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-accent-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-accent-500/30 transition-colors">
                  <FaPhone className="text-accent-400 text-sm" />
                </div>
                <span className="text-secondary-300 group-hover:text-white transition-colors">+91 63835 23677</span>
              </div>
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-500/30 transition-colors">
                  <FaEnvelope className="text-primary-400 text-sm" />
                </div>
                <span className="text-secondary-300 group-hover:text-white transition-colors">info@jitendradhawal.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="glass-card rounded-2xl p-6 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <FaHeadset className="text-primary-400 text-2xl animate-bounce-gentle" />
              <div>
                <p className="text-white font-semibold">24/7 Customer Support</p>
                <p className="text-secondary-300 text-sm">We're here to help you</p>
              </div>
            </div>
            <p className="text-secondary-300 text-center md:text-right">
              &copy; 2024 Jitendra Dhawal Electronics. All rights reserved.
              <span className="block text-xs mt-1 text-secondary-400">Crafted with ❤️ for quality electronics</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
