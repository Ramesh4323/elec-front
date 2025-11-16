import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { FaBolt, FaShieldAlt, FaTruck, FaHeadset } from 'react-icons/fa';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();

    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.fade-in-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      // Get first 4 products as featured
      setFeaturedProducts(res.data.data.slice(0, 4));
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-40"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200/30 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent-200/30 rounded-full animate-float delay-500"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary-300/20 rounded-full animate-float delay-1000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 px-4 py-2 rounded-full border border-primary-200/20">
                  <FaBolt className="text-primary-600 animate-pulse" />
                  <span className="text-primary-700 font-semibold text-sm">Premium Electronics Store</span>
                </div>
                <h1 className="text-6xl lg:text-7xl font-display font-bold leading-tight">
                  Welcome to JDE
                  <span className="gradient-text block">Electronics</span>
                </h1>
                <p className="text-xl text-secondary-600 leading-relaxed max-w-lg">
                  Your trusted source for premium electronic components including pipes, wires, switches, lights, fans, and agricultural tools. Quality products for every need.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 py-6">
                <div className="text-center">
                  <div className="text-3xl font-display font-bold gradient-text">10+</div>
                  <div className="text-sm text-secondary-600 font-medium">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-display font-bold gradient-text">1000+</div>
                  <div className="text-sm text-secondary-600 font-medium">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-display font-bold gradient-text">500+</div>
                  <div className="text-sm text-secondary-600 font-medium">Products</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover-lift flex items-center justify-center space-x-3 group"
                >
                  <FaBolt className="group-hover:scale-110 transition-transform" />
                  <span>Shop Now</span>
                </Link>
                <button
                  onClick={() => {
                    const element = document.getElementById('featured-products');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="glass-card text-secondary-700 px-8 py-4 rounded-2xl hover:bg-white/60 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover-lift flex items-center justify-center space-x-3 group border border-white/30"
                >
                  <span>Explore Products</span>
                </button>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="glass-card rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500">
                <div className="relative">
                  <img
                    src="/api/placeholder/500/400"
                    alt="Premium Electronics"
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>

                  {/* Floating badges */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-accent-400 to-accent-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg animate-bounce-gentle">
                    <FaBolt className="inline mr-2" />
                    Premium Quality
                  </div>
                  <div className="absolute bottom-4 right-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg animate-float">
                    <FaBolt className="inline mr-2" />
                    Certified
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-accent-400 rounded-full animate-morph"></div>
              <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-primary-400 rounded-full animate-morph delay-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Why Choose JDE?</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">Experience excellence in every aspect of our service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="glass-card p-8 rounded-3xl shadow-xl hover-lift border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaBolt className="text-3xl text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-secondary-800">Quality Products</h3>
                <p className="text-secondary-600 leading-relaxed">Premium electronic components from trusted manufacturers with rigorous quality control</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="glass-card p-8 rounded-3xl shadow-xl hover-lift border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaShieldAlt className="text-3xl text-white animate-bounce-gentle" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-secondary-800">Warranty</h3>
                <p className="text-secondary-600 leading-relaxed">Comprehensive warranty coverage on all our products for your peace of mind</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="glass-card p-8 rounded-3xl shadow-xl hover-lift border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaTruck className="text-3xl text-white animate-float" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-secondary-800">Fast Delivery</h3>
                <p className="text-secondary-600 leading-relaxed">Quick and reliable shipping to your doorstep with real-time tracking</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="glass-card p-8 rounded-3xl shadow-xl hover-lift border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaHeadset className="text-3xl text-white animate-bounce-gentle" />
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-secondary-800">24/7 Support</h3>
                <p className="text-secondary-600 leading-relaxed">Round the clock customer support with expert technical assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Featured Products</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Discover our most popular electronic components and agricultural tools
            </p>
          </div>
          {loading ? (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-primary bg-primary/10 transition ease-in-out duration-150">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading featured products...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div key={product._id} className="transform hover:scale-105 transition-transform duration-300">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 inline-block shadow-xl hover:shadow-2xl hover-lift"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute top-20 right-10 w-24 h-24 bg-primary-200/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent-200/20 rounded-full animate-float delay-500"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6 gradient-text animate-fade-in">
                About JDE Electronics
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 animate-slide-in-left">
                <p className="text-lg text-secondary-700 leading-relaxed">
                  Founded with a passion for electronics, Jitendra Dhawal Electronics has been serving customers
                  with high-quality electronic components for over a decade. We specialize in providing pipes,
                  wires, switches, lights, fans, and a wide range of other electronic items to meet all your needs.
                </p>
                <p className="text-lg text-secondary-700 leading-relaxed">
                  Our commitment to quality, reliability, and customer satisfaction has made us a trusted name
                  in the electronics industry. Whether you're a professional electrician, a DIY enthusiast, or
                  a business owner, we have the products and expertise to support your projects.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="glass-card px-6 py-3 rounded-2xl shadow-lg border border-primary-200/20">
                    <span className="text-primary-700 font-semibold">10+ Years Experience</span>
                  </div>
                  <div className="glass-card px-6 py-3 rounded-2xl shadow-lg border border-accent-200/20">
                    <span className="text-accent-700 font-semibold">Quality Assured</span>
                  </div>
                  <div className="glass-card px-6 py-3 rounded-2xl shadow-lg border border-primary-200/20">
                    <span className="text-primary-700 font-semibold">Expert Support</span>
                  </div>
                </div>
              </div>
              <div className="animate-slide-in-right">
                <div className="glass-card p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200/20">
                      <div className="text-3xl font-display font-bold gradient-text mb-2">1000+</div>
                      <div className="text-sm text-secondary-600 font-medium">Happy Customers</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl border border-accent-200/20">
                      <div className="text-3xl font-display font-bold gradient-text mb-2">500+</div>
                      <div className="text-sm text-secondary-600 font-medium">Products</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200/20">
                      <div className="text-3xl font-display font-bold gradient-text mb-2">24/7</div>
                      <div className="text-sm text-secondary-600 font-medium">Support</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl border border-accent-200/20">
                      <div className="text-3xl font-display font-bold gradient-text mb-2">99%</div>
                      <div className="text-sm text-secondary-600 font-medium">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
