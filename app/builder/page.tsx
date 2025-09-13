'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BuilderRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load

    if (!session) {
      // Not authenticated, redirect to home
      router.push('/');
      return;
    }

    // If user has a resumeUrl, redirect to their unique builder page
    if (session.user?.resumeUrl) {
      router.push(`/builder/${session.user.resumeUrl}`);
    } else {
      // Fallback: redirect to home if no resumeUrl
      router.push('/');
    }
  }, [session, status, router]);

  // Show loading state
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Redirecting to your Resume Builder</h2>
        <p className="text-gray-500">Please wait while we set up your workspace...</p>
      </motion.div>
    </div>
  );
}