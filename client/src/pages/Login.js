import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary-200/30 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-200/30 rounded-full animate-float delay-500"></div>

      <div className="max-w-md w-full space-y-8 glass-card p-8 rounded-3xl shadow-2xl border border-white/20 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 animate-morph shadow-xl">
            <FaUser className="h-8 w-8 text-white animate-pulse" />
          </div>
          <h2 className="text-3xl font-display font-bold gradient-text mb-2">
            Welcome Back
          </h2>
          <p className="text-secondary-600">
            Sign in to access your JDE Electronics account
          </p>
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-semibold text-secondary-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-500 text-lg" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 hover:shadow-lg text-secondary-800 placeholder-secondary-400 font-medium"
                  placeholder="Enter your email"
                  value={email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-semibold text-secondary-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-500 text-lg" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-secondary-200 rounded-2xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all duration-300 hover:border-accent-400 hover:shadow-lg text-secondary-800 placeholder-secondary-400 font-medium"
                  placeholder="Enter your password"
                  value={password}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-6 border border-transparent text-sm font-semibold rounded-2xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover-lift shadow-xl hover:shadow-2xl"
              aria-label={loading ? 'Signing in...' : 'Sign In'}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-secondary-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
