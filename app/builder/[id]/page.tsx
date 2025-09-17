"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { signOut } from "next-auth/react";
import { signOut } from "next-auth/react";

// Import your existing builder components
import Langu                            <div className="flex gap-2">
                              <button
                                onClick={() => signOut()}
                                className="p-2 rounded-lg transition-all duration-200 hover:scale-105 group cursor-pointer relative z-50"
                                style={{ 
                                  backgroundColor: "hsl(240 3.7% 20%)",
                                  border: "1px solid rgba(236, 72, 153, 0.2)",
                                  pointerEvents: "auto"
                                }}
                                title="Logout"
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
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => {
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
                                type="button"onents/form/Language";
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
import Certification from "@/components/form/certification";
import { SectionTitleProvider } from "@/contexts/SectionTitleContext";
import { ResumeContext } from "@/contexts/ResumeContext";
import Squares from "@/components/ui/Squares";
import type { ResumeData } from "../../types/resume";

// server side rendering false
const Print = dynamic(() => import("@/components/utility/WinPrint"), {
  ssr: false,
});

export default function BuilderPage() {

  // Resume data state with localStorage persistence
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('resumeData');
      return savedData ? JSON.parse(savedData) : DefaultResumeData as ResumeData;
    }
    return DefaultResumeData as ResumeData;
  });

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

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



  // Render the main builder interface (unprotected)
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
                                background: "linear-gradient(135deg, hsl(322, 84%, 60%) 0%, hsl(270, 84%, 60%) 100%)"
                              }}
                            >
                              <span className="text-lg font-bold">
                                R
                              </span>
                            </div>
                            <div 
                              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 animate-pulse" 
                              style={{ borderColor: "hsl(240 10% 3.9%)" }}
                            ></div>
                          </div>
                          
                          {/* Name and Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: "hsl(0 0% 98%)" }}>
                              Resume Builder
                            </p>
                            <p className="text-xs truncate" style={{ color: "hsl(240 5% 64.9%)" }}>
                              Create your resume
                            </p>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2 relative z-50">
                            {/* Logout Button */}
                            <button
                              onClick={() => signOut()}
                              className="p-2 rounded-lg transition-all duration-200 hover:scale-105 group cursor-pointer relative z-50"
                              style={{ 
                                backgroundColor: "hsl(240 3.7% 20%)",
                                border: "1px solid rgba(236, 72, 153, 0.2)",
                                pointerEvents: "auto"
                              }}
                              title="Logout"
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
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                            </button>

                            {/* Sidebar Close Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setFormClose(true);
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
                            <button
                              onClick={() => signOut()}
                              className="p-2 rounded-lg transition-all duration-200 hover:scale-105 group cursor-pointer relative z-50"
                              style={{ 
                                backgroundColor: "hsl(240 3.7% 20%)",
                                border: "1px solid rgba(236, 72, 153, 0.2)",
                                pointerEvents: "auto"
                              }}
                              title="Logout"
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
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
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