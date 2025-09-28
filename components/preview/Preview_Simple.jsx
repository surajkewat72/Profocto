"use client";

import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaExternalLinkAlt,
  FaChevronDown,
  FaFileAlt,
  FaTh,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import Skills from "./Skills";
import DateRange from "../utility/DateRange";
import ContactInfo from "./ContactInfo";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState, useEffect, useRef } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import Language from "./Language";
import Certification from "./Certification";
import TemplateTwo from "./TemplateTwo";

const Preview = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [currentTemplate, setCurrentTemplate] = useState("template1");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Available templates
  const templates = [
    {
      id: "template1",
      name: "Classic Template",
      description: "Clean and professional layout",
      icon: FaFileAlt
    },
    {
      id: "template2", 
      name: "Modern Template",
      description: "Dynamic with drag-and-drop sections",
      icon: FaTh
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const defaultSections = [
    "about",
    "projects",
    "experience",
    "skills",
    "softskills",
    "languages",
    "certifications"
  ];

  const [sectionOrder, setSectionOrder] = useState(defaultSections);

  const icons = [

    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <CgWebsite /> },
  ];

  useEffect(() => {
    const savedOrder = localStorage.getItem('sectionOrder');
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      if (!parsedOrder.includes("certifications")) {
        parsedOrder.push("certifications");
      }
      setSectionOrder(parsedOrder);
    } else {
      localStorage.setItem('sectionOrder', JSON.stringify(defaultSections));
    }
  }, []);

  return (
    <div className="md:max-w-[60%] sticky top-0 preview rm-padding-print p-6 md:overflow-y-scroll md:h-screen">
      {/* Template Dropdown */}
      <div className="absolute top-4 right-4 z-50 exclude-print">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors shadow-lg"
          >
            <FaFileAlt className="w-3 h-3" />
            <span className="text-xs font-medium">
              {templates.find(t => t.id === currentTemplate)?.name}
            </span>
            <FaChevronDown className={`w-2 h-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
              {templates.map((template) => {
                const IconComponent = template.icon;
                return (
                  <button
                    key={template.id}
                    onClick={() => {
                      setCurrentTemplate(template.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                      currentTemplate === template.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <IconComponent className={`w-3 h-3 ${currentTemplate === template.id ? 'text-blue-600' : 'text-gray-600'}`} />
                    <div className="text-left">
                      <div className={`font-medium text-xs ${currentTemplate === template.id ? 'text-blue-900' : 'text-gray-900'}`}>
                        {template.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {template.description}
                      </div>
                    </div>
                    {currentTemplate === template.id && (
                      <div className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <A4PageWrapper>
        {currentTemplate === "template1" ? (
          <div className="w-full h-full bg-white p-4">
            <div className="text-center mb-2">
              <h1 className="name">{resumeData.name}</h1>
              <p className="profession">{resumeData.position}</p>
              <ContactInfo
                mainclass="flex flex-row gap-1 contact justify-center"
                linkclass="inline-flex items-center gap-1"
                teldata={resumeData.contactInformation}
                emaildata={resumeData.email}
                addressdata={resumeData.address}
                telicon={<MdPhone />}
                emailicon={<MdEmail />}
                addressicon={<MdLocationOn />}
              />
              <div className="flex justify-center items-center gap-2 mt-1 text-sm">
                {resumeData.socialMedia.map((socialMedia, index) => {
                  const icon = icons.find(icon => icon.name === socialMedia.socialMedia.toLowerCase());
                  return (
                    <Link
                      href={`${socialMedia.socialMedia.toLowerCase() === "website" 
                        ? "https://" 
                        : socialMedia.socialMedia.toLowerCase() === "linkedin" 
                        ? "https://www." 
                        : "https://www."
                      }${socialMedia.link}`}
                      key={index}
                      className="inline-flex items-center gap-1 hover:text-blue-600"
                    >
                      {icon && icon.icon}
                      <span className="hover:underline">
                        {socialMedia.socialMedia}: {socialMedia.link}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {resumeData.profilePicture.length > 0 && (
              <div className="flex justify-center mb-2">
                <Image
                  src={resumeData.profilePicture}
                  alt="profile"
                  width={100}
                  height={100}
                  className="rounded-full border-2 border-gray-300"
                  onError={(e) => {
                    // Hide broken image and log error
                    // Profile image failed to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="mb-2">
              <h2 className="text-lg font-semibold mb-1 border-b border-gray-300 pb-1">
                Summary
              </h2>
              <p className="content text-sm leading-relaxed hyphens-auto">
                {resumeData.summary}
              </p>
            </div>

            {resumeData.education.length > 0 && (
              <div className="mb-2">
                <h2 className="text-lg font-semibold mb-1 border-b border-gray-300 pb-1">
                  Education
                </h2>
                {resumeData.education.map((item, index) => (
                  <div key={index} className="mb-1 flex justify-between items-start">
                    <div className="flex-1">
                      <p className="content font-semibold">{item.school}</p>
                      <p className="content">{item.degree}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <DateRange
                        startYear={item.startYear}
                        endYear={item.endYear}
                        id={`education-start-end-date`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div>
              {resumeData.skills.map((skill, index) => (
                <div key={`SKILLS-${index}`} className="mb-1">
                  <Skills title={skill.title} skills={skill.skills} />
                </div>
              ))}
            </div>

            <Language title="Languages" languages={resumeData.languages} />
            <Certification
              title="Certifications"
              certifications={resumeData.certifications}
            />

            {resumeData.workExperience.length > 0 && (
              <div className="mb-2">
                <h2 className="text-lg font-semibold mb-1 border-b border-gray-300 pb-1">
                  Work Experience
                </h2>
                {resumeData.workExperience.map((item, index) => (
                  <div key={`${item.company}-${index}`} className="mb-2">
                    <p className="content font-semibold">{item.company}</p>
                    <p className="content">{item.position}</p>
                    <DateRange
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`work-experience-start-end-date`}
                    />
                    <p className="content text-sm leading-relaxed hyphens-auto">
                      {item.description}
                    </p>
                    {typeof item.keyAchievements === "string" && (
                      <ul className="list-disc ul-padding content text-sm">
                        {item.keyAchievements
                          .split("\n")
                          .map((achievement, subIndex) => (
                            <li key={`${item.company}-${index}-${subIndex}`}>
                              {achievement}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {resumeData.projects.length > 0 && (
              <div className="mb-2">
                <h2 className="text-lg font-semibold mb-1 border-b border-gray-300 pb-1">
                  Projects
                </h2>
                {resumeData.projects.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="mb-2">
                    <div className="flex justify-between items-start">
                      <p className="content font-semibold">{item.name}</p>
                      {item.link && (
                        <Link
                          href={item.link}
                          className="text-blue-600 hover:underline text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaExternalLinkAlt className="inline w-3 h-3" />
                        </Link>
                      )}
                    </div>
                    <DateRange
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`projects-start-end-date`}
                    />
                    <p className="content text-sm leading-relaxed hyphens-auto">
                      {item.description}
                    </p>
                    {typeof item.keyAchievements === "string" && (
                      <ul className="list-disc ul-padding content text-sm">
                        {item.keyAchievements
                          .split("\n")
                          .map((achievement, subIndex) => (
                            <li key={`${item.name}-${index}-${subIndex}`}>
                              {achievement}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <TemplateTwo
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}
      </A4PageWrapper>
    </div>
  );
};

const A4PageWrapper = ({ children }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const container = contentRef.current.parentElement;
        const containerHeight = container.offsetHeight;
        const contentHeight = contentRef.current.scrollHeight;
        const padding = 20;
        setIsOverflowing(contentHeight > (containerHeight - padding));
      }
    };

    // Initial check
    const timeoutId = setTimeout(checkOverflow, 100);
    
    // Periodic check to ensure detection works
    const intervalId = setInterval(checkOverflow, 1000);
    
    // Check on resize
    window.addEventListener('resize', checkOverflow);
    
    // Check when content changes
    const observer = new MutationObserver(() => {
      setTimeout(checkOverflow, 50);
    });
    
    if (contentRef.current) {
      observer.observe(contentRef.current, { 
        childList: true, 
        subtree: true, 
        characterData: true,
        attributes: true
      });
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      window.removeEventListener('resize', checkOverflow);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full max-w-[210mm] bg-white mx-auto shadow-lg rounded-lg overflow-hidden relative">
      <div 
        ref={contentRef}
        className="w-full min-h-[297mm] p-4 bg-white relative"
      >
        {children}
        {isOverflowing && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-100 to-transparent h-8 pointer-events-none print:hidden">
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-red-600 text-xs font-medium bg-red-100 px-2 py-1 rounded">
              Content will continue on next page
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
