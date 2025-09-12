'use client';

import React, { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaGithub, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
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
    setError('');
  };

  const handleOAuthSignIn = async (provider) => {
    console.log('Starting OAuth sign in with:', provider);
    setLoading(true);
    setError('');
    
    try {
      console.log('Calling signIn...');
      const result = await signIn(provider, { 
        redirect: false, // Keep this false to handle in modal
        callbackUrl: window.location.origin + '/builder', // Ensure proper callback
      });
      
      console.log('SignIn result:', result);
      
      if (result?.error) {
        console.error('Sign in error:', result.error);
        setError('Authentication failed. Please try again.');
        setLoading(false);
      } else if (result?.ok) {
        console.log('Sign in successful, waiting for session...');
        // Wait a bit for session to be established
        setTimeout(async () => {
          const session = await getSession();
          console.log('Session after sign in:', session);
          if (session?.user?.resumeUrl) {
            console.log('Redirecting to:', `/builder/${session.user.resumeUrl}`);
            router.push(`/builder/${session.user.resumeUrl}`);
            onClose();
          } else {
            console.log('No resumeUrl, redirecting to /builder');
            // If no resumeUrl, redirect to generate one
            router.push('/builder');
            onClose();
          }
          setLoading(false);
        }, 1500);
      } else {
        console.log('Unexpected result:', result);
        setError('Authentication failed. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Authentication failed. Please try again.');
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Simple backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Clean modal */}
        <motion.div 
          className="relative w-full max-w-sm mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Simple header */}
            <div className="p-6 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  disabled={loading}
                >
                  <FaTimes size={14} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* OAuth Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleOAuthSignIn('google')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <FaGoogle className="text-red-500" size={16} />
                  <span className="text-gray-700">Continue with Google</span>
                </button>

                <button
                  onClick={() => handleOAuthSignIn('github')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <FaGithub className="text-gray-700" size={16} />
                  <span className="text-gray-700">Continue with GitHub</span>
                </button>
              </div>

              {/* Simple divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-sm text-gray-500">or</span>
                </div>
              </div>

              {/* Clean form */}
              <form onSubmit={handleCredentialsAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Full name"
                      disabled={loading}
                    />
                  </div>
                )}

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Email address"
                    disabled={loading}
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>
                        {authMode === 'signin' ? 'Signing in...' : 'Creating account...'}
                      </span>
                    </div>
                  ) : (
                    authMode === 'signin' ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </form>

              {/* Switch mode */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                    setError('');
                    setFormData({ email: '', password: '', name: '' });
                  }}
                  disabled={loading}
                  className="text-sm text-pink-600 hover:text-pink-700 transition-colors disabled:opacity-50"
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