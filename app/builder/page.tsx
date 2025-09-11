"use client";

import React, { useState, createContext } from "react";
import Language from "../../components/form/Language";
import FormCP from "../../components/form/FormCP";
import LoadUnload from "../../components/form/LoadUnload";
import Preview from "../../components/preview/Preview";
import DefaultResumeData from "../../components/utility/DefaultResumeData";
import SocialMedia from "../../components/form/SocialMedia";
import WorkExperience from "../../components/form/WorkExperience";
import Skill from "../../components/form/Skill";
import PersonalInformation from "../../components/form/PersonalInformation";
import Summary from "../../components/form/Summary";
import Projects from "../../components/form/Projects";
import Education from "../../components/form/Education";
import dynamic from "next/dynamic";
import Certification from "../../components/form/certification";
import { SectionTitleProvider } from "../../contexts/SectionTitleContext";
import Squares from "../../components/ui/Squares";
import type { ResumeData, ResumeContextType } from "../types/resume";

const ResumeContext = createContext<ResumeContextType>({
  resumeData: DefaultResumeData as ResumeData,
  setResumeData: () => {},
  handleProfilePicture: () => {},
  handleChange: () => {},
});

// server side rendering false
const Print = dynamic(() => import("../../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder() {
  // resume data
  const [resumeData, setResumeData] = useState<ResumeData>(DefaultResumeData as ResumeData);

  // form hide/show
  const [formClose, setFormClose] = useState(false);

  // profile picture
  const handleProfilePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

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
          <div className="flex flex-col lg:flex-row min-h-screen max-w-full">
            {!formClose && (
              <div className="w-full lg:w-[45%] xl:w-[40%] h-screen exclude-print relative" style={{backgroundColor: 'hsl(240 10% 3.9%)'}}>
                {/* Fixed Animated Background Grid */}
                <div className="fixed inset-0 w-full lg:w-[45%] xl:w-[40%] h-screen z-0">
                  <Squares
                    speed={0.3} 
                    squareSize={30}
                    direction='diagonal'
                    borderColor='rgba(236, 72, 153, 0.15)'
                    hoverFillColor='rgba(236, 72, 153, 0.1)'
                  />
                </div>
                <div className="h-full border-r relative z-10 overflow-y-auto" style={{borderColor: 'hsl(240 3.7% 15.9%)'}}>
                  <div className="p-8 relative z-20">
                    {/* Clean Header */}
                    <div className="mb-8">
                      <h1 className="text-3xl font-light mb-2" style={{color: 'hsl(0 0% 98%)'}}>
                        Resume Builder
                      </h1>
                      <p className="text-sm" style={{color: 'hsl(240 5% 64.9%)'}}>Create your professional resume</p>
                    </div>

                    {/* Form Sections */}
                    <div className="space-y-6">
                      <LoadUnload/>
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
                            .filter((skill: any) => skill.title !== "Soft Skills")
                            .map((skill: any, index: number) => (
                              <Skill
                                title={skill.title}
                                key={index}
                              />
                            ))}
                        </div>
                      </div>

                      {/* Soft Skills Section */}
                      {resumeData.skills
                        .filter((skill: any) => skill.title === "Soft Skills")
                        .map((skill: any, index: number) => (
                          <Skill
                            title={skill.title}
                            key={index}
                          />
                        ))}

                      <Language />
                      <Certification />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={`${formClose ? 'w-full' : 'w-full lg:w-[55%] xl:w-[60%]'} transition-all duration-300`}>
              <Preview />
            </div>
          </div>
          <FormCP formClose={formClose} setFormClose={setFormClose} />
          <Print />
        </ResumeContext.Provider>
      </SectionTitleProvider>
    </>
  );
}

export { ResumeContext };
