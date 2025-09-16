'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaGithub, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const AuthModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleMethodSelect = (method) => {
    router.push('/builder');
    onClose();
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
                  Sign In to Continue
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

              {/* Welcome Text */}
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm">
                  Choose your preferred method to sign in and start building your professional resume.
                </p>
              </div>

              {/* OAuth Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleOAuthSignIn('google')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                  ) : (
                    <FaGoogle className="text-red-500" size={16} />
                  )}
                  <span className="text-gray-700">Continue with Google</span>
                </button>

                <button
                  onClick={() => handleOAuthSignIn('github')}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
                  ) : (
                    <FaGithub className="text-gray-700" size={16} />
                  )}
                  <span className="text-gray-700">Continue with GitHub</span>
                </button>
              </div>

              {/* Sign-in options */}
              <div className="space-y-4 p-6">
                <button
                  onClick={() => handleMethodSelect('google')}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaGoogle className="text-[#4285F4]" />
                  <span className="text-gray-700">Continue with Google</span>
                </button>

                <button
                  onClick={() => handleMethodSelect('github')}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaGithub className="text-[#333]" />
                  <span className="text-gray-700">Continue with GitHub</span>
                </button>
              </div>

              {/* Security Notice */}
              <div className="p-6 pt-0 text-center">
                <p className="text-xs text-gray-500">
                  Click to continue to the resume builder
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;