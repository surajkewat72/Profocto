"use client";

import React, { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import { useSectionTitles } from "../../contexts/SectionTitleContext";

const TemplateThree = () => {
  const { resumeData } = useContext(ResumeContext);
  const { customSectionTitles } = useSectionTitles();

  const getSectionTitle = (key, defaultTitle) => {
    return customSectionTitles[key] || defaultTitle;
  };

  return (
    <div className="flex h-full bg-white text-gray-800 min-h-full">
      {/* Left Sidebar - Blue section */}
      <div className="w-2/5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
        {/* Decorative diagonal element */}
        <div className="absolute top-0 right-0 w-32 h-64 bg-white/10 transform rotate-45 translate-x-16 -translate-y-32"></div>
        
        <div className="relative z-10 p-8 text-white h-full">
          {/* Profile Image */}
          <div className="flex justify-center mb-8 mt-4">
            <div className="w-36 h-36 rounded-full overflow-hidden bg-white shadow-xl border-4 border-white/30">
              {resumeData.profileImage ? (
                <img
                  src={resumeData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Hide broken image and show default fallback
                    // Profile image failed to load
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.profile-fallback');
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div className={`profile-fallback w-full h-full bg-gray-200 flex items-center justify-center ${resumeData.profileImage ? 'hidden' : 'flex'}`}>
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 tracking-wide">{resumeData.name || "Lorna Alvarado"}</h1>
            <p className="text-xl font-light text-blue-100">{resumeData.position || "Marketing Manager"}</p>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-6 h-6 mr-3">📞</span>
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <span className="w-5 h-5 mr-3">📞</span>
                <span>{resumeData.contactInformation || "+123-456-7890"}</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 mr-3">✉️</span>
                <span className="break-all">{resumeData.email || "hello@reallygreatsite.com"}</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 mr-3">📍</span>
                <span>{resumeData.address || "123 Anywhere St., Any City, ST 12345"}</span>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          {resumeData.summary && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-6 h-6 mr-3">👤</span>
                {getSectionTitle('summary', 'About Me')}
              </h3>
              <p className="text-sm leading-relaxed text-blue-50">
                {resumeData.summary}
              </p>
            </div>
          )}

          {/* Skills Section */}
          {resumeData.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-6 h-6 mr-3">⚙️</span>
                {getSectionTitle('skills', 'Skills')}
              </h3>
              <ul className="space-y-2 text-sm">
                {resumeData.skills.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    <span>{skill.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="w-3/5 p-8 bg-gray-50">
        {/* Education Section */}
        {resumeData.education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center border-b-2 border-gray-300 pb-3">
              <span className="w-8 h-8 mr-3 text-gray-600">🎓</span>
              {getSectionTitle('education', 'Education')}
            </h3>
            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="relative pl-8">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                  {/* Timeline line */}
                  {index < resumeData.education.length - 1 && (
                    <div className="absolute left-1.5 top-4 w-0.5 h-16 bg-gray-300"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                        <h4 className="font-semibold text-gray-800 text-base">{edu.degree}</h4>
                      </div>
                      <p className="text-blue-600 font-medium italic ml-6">{edu.school}</p>
                    </div>
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                      {edu.startYear} - {edu.endYear}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-gray-600 leading-relaxed ml-6 mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {resumeData.workExperience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center border-b-2 border-gray-300 pb-3">
              <span className="w-8 h-8 mr-3 text-gray-600">💼</span>
              {getSectionTitle('experience', 'Experience')}
            </h3>
            <div className="space-y-6">
              {resumeData.workExperience.map((exp, index) => (
                <div key={index} className="relative pl-8">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                  {/* Timeline line */}
                  {index < resumeData.workExperience.length - 1 && (
                    <div className="absolute left-1.5 top-4 w-0.5 h-20 bg-gray-300"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                        <h4 className="font-semibold text-gray-800 text-base">{exp.position}</h4>
                      </div>
                      <p className="text-blue-600 font-medium italic ml-6">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                      {exp.startYear} - {exp.endYear}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 leading-relaxed ml-6 mt-2">{exp.description}</p>
                  )}
                  {exp.keyAchievements && (
                    <div className="ml-6 mt-3">
                      <ul className="text-sm text-gray-600 space-y-1">
                        {exp.keyAchievements.split('\n').filter(achievement => achievement.trim()).map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>{achievement.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {resumeData.projects.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center border-b-2 border-gray-300 pb-3">
              <span className="w-8 h-8 mr-3 text-gray-600">🚀</span>
              {getSectionTitle('projects', 'Projects')}
            </h3>
            <div className="space-y-6">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                  {index < resumeData.projects.length - 1 && (
                    <div className="absolute left-1.5 top-4 w-0.5 h-16 bg-gray-300"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                        <h4 className="font-semibold text-gray-800 text-base">{project.title}</h4>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                      {project.startYear} - {project.endYear}
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-sm text-gray-600 leading-relaxed ml-6 mt-2">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {resumeData.languages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center border-b-2 border-gray-300 pb-3">
              <span className="w-8 h-8 mr-3 text-gray-600">🌐</span>
              {getSectionTitle('languages', 'Languages')}
            </h3>
            <div className="flex flex-wrap gap-4">
              {resumeData.languages.map((lang, index) => (
                <span key={index} className="text-gray-700 text-sm font-medium">
                  {lang.language}
                  {index < resumeData.languages.length - 1 && <span className="text-gray-400 ml-2">•</span>}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {resumeData.certifications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center border-b-2 border-gray-300 pb-3">
              <span className="w-8 h-8 mr-3 text-gray-600">🏆</span>
              {getSectionTitle('certifications', 'Certifications')}
            </h3>
            <div className="space-y-4">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    <h4 className="font-semibold text-gray-800 text-base">{cert.title}</h4>
                  </div>
                  <p className="text-blue-600 font-medium italic ml-6">{cert.organization}</p>
                  {cert.description && (
                    <p className="text-sm text-gray-600 ml-6 mt-1">{cert.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateThree;
