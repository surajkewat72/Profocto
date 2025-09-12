'use client';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Import your existing builder components
import Preview from "@/components/preview/Preview";
import PersonalInformation from "@/components/form/PersonalInformation";
import Education from "@/components/form/Education";
import WorkExperience from "@/components/form/WorkExperience";
import Projects from "@/components/form/Projects";
import Skill from "@/components/form/Skill";
import Summary from "@/components/form/Summary";
import Language from "@/components/form/Language";
import certification from "@/components/form/certification";
import SocialMedia from "@/components/form/SocialMedia";
import LoadUnload from "@/components/form/LoadUnload";
import { SectionTitleProvider } from "@/contexts/SectionTitleContext";

export default function BuilderPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load

    if (!session) {
      // Not authenticated, redirect to home
      router.push('/');
      return;
    }

    // Check if the resumeId matches the user's resumeUrl
    const userResumeUrl = session.user?.resumeUrl;
    const currentResumeId = params.resumeId;

    if (userResumeUrl === currentResumeId) {
      setIsAuthorized(true);
    } else {
      // Wrong resume URL, redirect to correct one or home
      if (userResumeUrl) {
        router.push(`/builder/${userResumeUrl}`);
      } else {
        router.push('/');
      }
      return;
    }

    setIsValidating(false);
  }, [session, status, params.resumeId, router]);

  // Show loading state while validating
  if (status === 'loading' || isValidating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Validating Access</h2>
          <p className="text-gray-500">Please wait while we verify your session...</p>
        </motion.div>
      </div>
    );
  }

  // Show unauthorized message if not authorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md mx-auto p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this resume builder session.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Go Home
          </button>
        </motion.div>
      </div>
    );
  }

  // Render the main builder interface
  return (
    <SectionTitleProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header with user info and resume ID */}
        <div className="bg-white border-b border-gray-200 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
              <p className="text-sm text-gray-500">
                Session: {params.resumeId}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Welcome, {session.user?.name || session.user?.email}
              </div>
              <button
                onClick={() => {
                  // You can add sign out functionality here
                  router.push('/');
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>

        {/* Main builder content */}
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <PersonalInformation />
              <Summary />
              <Education />
              <WorkExperience />
              <Projects />
              <Skill />
              <Language />
              <certification />
              <SocialMedia />
              <LoadUnload />
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-6">
              <Preview />
            </div>
          </div>
        </div>
      </div>
    </SectionTitleProvider>
  );
}