'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const AuthButton = ({ className = "" }) => {
  const { user, isAuthenticated, loading, login, logout } = useAuth();

  if (loading) {
    return (
      <div className={`px-4 py-2 rounded-lg bg-gray-200 text-gray-500 ${className}`}>
        Loading...
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {user.avatar && (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-sm text-white/80">
            Welcome, {user.name || user.username}!
          </span>
        </div>
        <button
          onClick={logout}
          className={`px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors ${className}`}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className={`px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white transition-colors ${className}`}
    >
      Login with GitHub
    </button>
  );
};

export default AuthButton;