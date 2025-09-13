"use client";

import { useSession, signOut } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Import your existing builder components
import Language from "@/components/form/Language";
import LoadUnload from "@/components/form/LoadUnload";
import Preview from "@/components/preview/Preview";
import DefaultResumeData from "@/components/utility/DefaultResumeData";
import SocialMedia from "@/components/form/SocialMedia";
import WorkExperience from "@/components/form/WorkExperience";
import Skill from "@/components/form/Skill";
import PersonalInformation from "@/components/form/PersonalInformation";
import Summary from "@/components/form/Summary";
import Projects from "@/components/form/Projects";
import Education from "@/components/form/Education";
import dynamic from "next/dynamic";
import Certification from "@/components/form/certification";
import { SectionTitleProvider } from "@/contexts/SectionTitleContext";
import { ResumeContext } from "@/contexts/ResumeContext";
import Squares from "@/components/ui/Squares";
import type { ResumeData } from "../../types/resume";

// server side rendering false
const Print = dynamic(() => import("@/components/utility/WinPrint"), {
  ssr: false,
});

interface BuilderPageParams {
  resumeId: string;
  [key: string]: string | string[] | undefined;
}

export default function BuilderPage() {
  const { data: session, status } = useSession();
  const params = useParams<BuilderPageParams>();
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Resume data state
  const [resumeData, setResumeData] = useState<ResumeData>(
    DefaultResumeData as ResumeData
  );

  // Form hide/show
  const [formClose, setFormClose] = useState(false);

  // Profile picture handler
  const handleProfilePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({
          ...resumeData,
          profilePicture: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  // Change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    if (!session) {
      // Not authenticated, redirect to home
      router.push("/");
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
        router.push("/");
      }
      return;
    }

    setIsValidating(false);
  }, [session, status, params.resumeId, router]);

  // Keyboard shortcut for sidebar toggle (Ctrl+B or Cmd+B)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+B (Windows/Linux) or Cmd+B (Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        console.log('=== KEYBOARD SHORTCUT TRIGGERED ===');
        console.log('Current formClose state:', formClose);
        setFormClose(prev => {
          console.log('Toggling sidebar from', prev, 'to', !prev);
          return !prev;
        });
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [formClose]); // Include formClose in dependency array for current state

  // Show loading state while validating
  if (status === "loading" || isValidating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Validating Access
          </h2>
          <p className="text-gray-500">
            Please wait while we verify your session...
          </p>
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
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this resume builder session.
          </p>
          <button
            onClick={() => router.push("/")}
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
    <>
      <SectionTitleProvider>
        <ResumeContext.Provider
          value={{
            resumeData,
            setResumeData,
            handleProfilePicture,
            handleChange,
          }}
        >
          <div className="flex flex-col lg:flex-row min-h-screen max-w-full overflow-hidden">
            {!formClose && (
              <div
                className="w-full lg:w-[45%] xl:w-[40%] h-screen lg:h-screen md:h-auto exclude-print relative"
                style={{ backgroundColor: "hsl(240 10% 3.9%)" }}
              >
                {/* Fixed Animated Background Grid */}
                <div className="fixed inset-0 w-full lg:w-[45%] xl:w-[40%] h-screen z-0 hidden lg:block">
                  <Squares
                    speed={0.3}
                    squareSize={30}
                    direction="diagonal"
                    borderColor="rgba(236, 72, 153, 0.15)"
                    hoverFillColor="rgba(236, 72, 153, 0.1)"
                  />
                </div>
                <div
                  className="h-full border-r relative z-10 overflow-y-auto"
                  style={{ borderColor: "hsl(240 3.7% 15.9%)" }}
                >
                  <div className="p-4 sm:p-6 lg:p-8 relative z-20">
                    {/* Clean Header */}
                    <div className="mb-6 lg:mb-8">
                      <h1
                        className="text-2xl sm:text-3xl font-light mb-2"
                        style={{ color: "hsl(0 0% 98%)" }}
                      >
                        Resume Builder
                      </h1>
                      <p
                        className="text-xs sm:text-sm"
                        style={{ color: "hsl(240 5% 64.9%)" }}
                      >
                        Create your professional resume
                      </p>
                      {/* Debug info */}
                      <div className="mt-2 p-2 bg-yellow-200 text-black text-xs rounded">
                        <strong>Debug:</strong> formClose = {formClose ? 'true' : 'false'}
                      </div>
                    </div>

                    {/* Form Sections */}
                    <div className="space-y-4 lg:space-y-6">
                      <LoadUnload />
                      <PersonalInformation />
                      <SocialMedia />
                      <Summary />
                      <Education />
                      <WorkExperience />
                      <Projects />

                      {/* Technical Skills Section */}
                      <div className="form-section">
                        <h2 className="input-title">Technical Skills</h2>
                        <div className="space-y-4">
                          {resumeData.skills
                            .filter(
                              (skill: any) => skill.title !== "Soft Skills"
                            )
                            .map((skill: any, index: number) => (
                              <Skill title={skill.title} key={index} />
                            ))}
                        </div>
                      </div>

                      {/* Soft Skills Section */}
                      {resumeData.skills
                        .filter((skill: any) => skill.title === "Soft Skills")
                        .map((skill: any, index: number) => (
                          <Skill title={skill.title} key={index} />
                        ))}

                      <Language />
                      <Certification />
                    </div>

                    {/* Floating Profile Pocket - Sticky at bottom */}
                    <div className="sticky bottom-0 left-0 right-0 p-4 z-30 mt-6">
                      <div 
                        className="relative p-4 rounded-xl border backdrop-blur-sm"
                        style={{ 
                          backgroundColor: "hsla(240, 10%, 3.9%, 0.95)",
                          borderColor: "hsl(240 3.7% 25%)",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)"
                        }}
                      >
                        {/* Enhanced decorative elements for floating pocket effect */}
                        <div 
                          className="absolute -top-1 left-4 right-4 h-2 rounded-b-lg opacity-60"
                          style={{ backgroundColor: "hsl(240 3.7% 20%)" }}
                        ></div>
                        <div 
                          className="absolute -top-0.5 left-6 right-6 h-1 rounded-b-lg opacity-40"
                          style={{ backgroundColor: "hsl(240 3.7% 25%)" }}
                        ></div>
                        <div 
                          className="absolute inset-0 rounded-xl border border-pink-500/20 animate-pulse"
                        ></div>

                        <div className="flex items-center space-x-3">
                          {/* Profile Image */}
                          <div className="relative">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg ring-2 ring-pink-500/30 overflow-hidden"
                              style={{ 
                                background: session?.user?.image 
                                  ? "transparent" 
                                  : "linear-gradient(135deg, hsl(322, 84%, 60%) 0%, hsl(270, 84%, 60%) 100%)"
                              }}
                            >
                              {session?.user?.image ? (
                                <img 
                                  src={session.user.image} 
                                  alt="Profile" 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    // Fallback if image fails to load
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.style.background = 
                                      "linear-gradient(135deg, hsl(322, 84%, 60%) 0%, hsl(270, 84%, 60%) 100%)";
                                    e.currentTarget.parentElement!.innerHTML = 
                                      session?.user?.name?.charAt(0)?.toUpperCase() || session?.user?.email?.charAt(0)?.toUpperCase() || 'U';
                                  }}
                                />
                              ) : (
                                // Default avatar with user's initial or 'U'
                                <span className="text-lg font-bold">
                                  {session?.user?.name?.charAt(0)?.toUpperCase() || 
                                   session?.user?.email?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                              )}
                            </div>
                            <div 
                              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 animate-pulse" 
                              style={{ borderColor: "hsl(240 10% 3.9%)" }}
                            ></div>
                          </div>
                          
                          {/* Name and Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: "hsl(0 0% 98%)" }}>
                              {session?.user?.name || 'User'}
                            </p>
                            <p className="text-xs truncate" style={{ color: "hsl(240 5% 64.9%)" }}>
                              {session?.user?.email}
                            </p>
                          </div>
                          
                          {/* Action Buttons - Logout first, then Close */}
                          <div className="flex items-center space-x-2 relative z-50">
                            {/* Logout Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('=== LOGOUT BUTTON CLICKED ===');
                                console.log('Calling signOut...');
                                signOut({ callbackUrl: '/' });
                              }}
                              className="p-2 rounded-lg transition-all duration-200 hover:scale-105 group cursor-pointer relative z-50"
                              style={{ 
                                backgroundColor: "hsl(240 3.7% 20%)",
                                border: "1px solid rgba(239, 68, 68, 0.2)",
                                pointerEvents: "auto"
                              }}
                              title="Logout"
                              type="button"
                            >
                              <svg 
                                className="w-4 h-4 transition-colors group-hover:text-red-400 pointer-events-none" 
                                style={{ color: "hsl(240 5% 64.9%)" }}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                                />
                              </svg>
                            </button>

                            {/* Sidebar Close Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('=== SIDEBAR CLOSE BUTTON CLICKED ===');
                                console.log('Current formClose state:', formClose);
                                setFormClose(true);
                                console.log('Called setFormClose(true)');
                              }}
                              className="p-2 rounded-lg transition-all duration-200 hover:scale-105 group cursor-pointer relative z-50"
                              style={{ 
                                backgroundColor: "hsl(240 3.7% 20%)",
                                border: "1px solid rgba(236, 72, 153, 0.2)",
                                pointerEvents: "auto"
                              }}
                              title="Hide Sidebar"
                              type="button"
                            >
                              <svg 
                                className="w-4 h-4 transition-colors group-hover:text-pink-400 pointer-events-none" 
                                style={{ color: "hsl(240 5% 64.9%)" }}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7" 
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Show Sidebar Button - appears when sidebar is closed */}
            {formClose && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('=== SHOW SIDEBAR BUTTON CLICKED ===');
                  console.log('Current formClose state:', formClose);
                  setFormClose(false);
                  console.log('Called setFormClose(false)');
                }}
                className="fixed top-4 left-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white cursor-pointer shadow-lg transition-all duration-200 hover:scale-105"
                title="Show Sidebar"
                style={{ zIndex: 9999, pointerEvents: "auto" }}
                type="button"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white pointer-events-none"
                >
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 17l5-5-5-5M6 17l5-5-5-5" 
                  />
                </svg>
              </button>
            )}
            
            <div
              className={`${
                formClose ? "w-full" : "w-full lg:w-[55%] xl:w-[60%]"
              } transition-all duration-300 min-h-screen lg:min-h-0`}
            >
              <Preview />
            </div>
          </div>
          <Print />
        </ResumeContext.Provider>
      </SectionTitleProvider>
    </>
  );
}
