'use client';

import React, { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaGithub, FaUser, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const AuthModal = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(''); // Clear error when user types
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await signIn(provider, { 
        redirect: false,
        callbackUrl: '/builder'
      });
      
      if (result?.error) {
        setError('Authentication failed. Please try again.');
      } else {
        // Wait for session to be established
        setTimeout(async () => {
          const session = await getSession();
          if (session?.user?.resumeUrl) {
            router.push(`/builder/${session.user.resumeUrl}`);
            onClose();
          } else {
            router.push('/builder');
            onClose();
          }
        }, 1000);
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCredentialsAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (authMode === 'signup' && !formData.name) {
      setError('Please enter your name.');
      setLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        redirect: false,
        callbackUrl: '/builder'
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
      } else {
        // Wait for session to be established
        setTimeout(async () => {
          const session = await getSession();
          if (session?.user?.resumeUrl) {
            router.push(`/builder/${session.user.resumeUrl}`);
            onClose();
          } else {
            router.push('/builder');
            onClose();
          }
        }, 1000);
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div 
          className="relative w-full max-w-md mx-auto"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                disabled={loading}
              >
                <FaTimes size={16} />
              </button>
              
              <h2 className="text-2xl font-bold mb-2">
                {authMode === 'signin' ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-pink-100">
                {authMode === 'signin' 
                  ? 'Sign in to continue building your resume' 
                  : 'Join us and start building your perfect resume'
                }
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Error Message */}
              {error && (
                <motion.div 
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              {/* OAuth Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleOAuthSignIn('google')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaGoogle className="text-red-500" size={18} />
                  <span className="font-medium text-gray-700">Continue with Google</span>
                </button>

                <button
                  onClick={() => handleOAuthSignIn('github')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaGithub className="text-gray-800" size={18} />
                  <span className="font-medium text-gray-700">Continue with GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleCredentialsAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter your full name"
                        disabled={loading}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>
                        {authMode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                      </span>
                    </div>
                  ) : (
                    authMode === 'signin' ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </form>

              {/* Switch Mode */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                    setError('');
                    setFormData({ email: '', password: '', name: '' });
                  }}
                  disabled={loading}
                  className="text-pink-600 hover:text-pink-700 font-medium transition-colors disabled:opacity-50"
                >
                  {authMode === 'signin' 
                    ? "Don't have an account? Sign up" 
                    : 'Already have an account? Sign in'
                  }
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;