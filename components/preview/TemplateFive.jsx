"use client";
import { FaExternalLinkAlt, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import { ImGithub } from "react-icons/im";
import { CgWebsite } from "react-icons/cg";
import Image from "next/image";
import DateRange from "../utility/DateRange";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { DndContext, closestCenter } from "@dnd-kit/core";
import Link from "next/link";
import { useSectionTitles } from "../../contexts/SectionTitleContext";
import { SortableItem, SortableSection } from "./Preview";
import { useEffect, useState } from "react";

// Smart Template - Catherine Bale Style with Profile Picture Support
const TemplateFive = ({
  resumeData,
  sectionOrder,
  enabledSections,
  handleDragEnd,
  sensors,
  icons,
  setResumeData,
}) => {
  const { customSectionTitles } = useSectionTitles();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle drag end for items within sections (same as Modern Template)
  const handleItemDragEnd = (event, sectionType) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      // Handle reordering within the same section
      if (sectionType === "projects" && setResumeData) {
        const oldIndex = parseInt(active.id.replace("project-", ""));
        const newIndex = parseInt(over.id.replace("project-", ""));

        if (oldIndex !== -1 && newIndex !== -1) {
          const newProjects = arrayMove(
            resumeData.projects,
            oldIndex,
            newIndex
          );
          setResumeData((prev) => ({ ...prev, projects: newProjects }));
        }
      } else if (sectionType === "experience" && setResumeData) {
        const oldIndex = parseInt(active.id.replace("work-", ""));
        const newIndex = parseInt(over.id.replace("work-", ""));

        if (oldIndex !== -1 && newIndex !== -1) {
          const newExperience = arrayMove(
            resumeData.workExperience,
            oldIndex,
            newIndex
          );
          setResumeData((prev) => ({ ...prev, workExperience: newExperience }));
        }
      }
    }
  };

  // Define sections like Modern Template
  const sections = [
    {
      id: "summary",
      title: "Professional Summary",
      content: resumeData.summary,
    },
    { id: "education", title: "Education", content: resumeData.education },
    {
      id: "experience",
      title: "Experience",
      content: resumeData.workExperience,
    },
    { id: "projects", title: "Projects", content: resumeData.projects },
    { id: "skills", title: "Skills", content: resumeData.skills },
    {
      id: "softSkills",
      title: "Soft Skills",
      content:
        resumeData.skills.find((skill) => skill.title === "Soft Skills")
          ?.skills || [],
    },
    { id: "languages", title: "Languages", content: resumeData.languages },
    {
      id: "certifications",
      title: "Certifications",
      content: resumeData.certifications,
    },
  ];

  const orderedSections = sectionOrder
    .map((id) => sections.find((section) => section.id === id))
    .filter((section) => {
      if (!section || !enabledSections[section.id]) return false;
      // Filter out sections with empty content
      if (Array.isArray(section.content)) {
        return section.content.length > 0;
      }
      return section.content && section.content.trim().length > 0;
    });

  const renderSection = (section) => {
    switch (section.id) {
      case "summary":
        return (
          <div className='mb-4'>
            <h2 className='text-sm font-bold uppercase mb-1 pb-0.5 border-b border-gray-400'>
              {customSectionTitles.summary || "Summary"}
            </h2>
            <p className='text-xs leading-snug font-sans'>
              {resumeData.summary}
            </p>
          </div>
        );

      case "education":
        return resumeData.education.length > 0 ? (
          <div className='mb-4'>
            <h2 className='text-sm font-bold uppercase mb-1 pb-0.5 border-b border-gray-400'>
              {customSectionTitles.education || "Education"}
            </h2>
            {resumeData.education.map((item, index) => (
              <div
                key={index}
                className='mb-2'
              >
                <div className='flex justify-between items-baseline mb-0.5'>
                  <h3 className='text-xs font-bold'>
                    {item.degree}
                  </h3>
                  <DateRange
                    startYear={item.startYear}
                    endYear={item.endYear}
                    id={`education-${index}`}
                    className='text-xs text-gray-600'
                  />
                </div>
                <p className='text-xs font-semibold'>{item.school}</p>
              </div>
            ))}
          </div>
        ) : null;

      case "experience":
        return resumeData.workExperience.length > 0 ? (
          <div className='mb-4'>
            <h2 className='text-sm font-bold uppercase mb-1 pb-0.5 border-b border-gray-400'>
              {customSectionTitles.experience || "Professional Experience"}
            </h2>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleItemDragEnd(event, "experience")}
            >
              <SortableContext
                items={resumeData.workExperience.map((_, idx) => `work-${idx}`)}
                strategy={verticalListSortingStrategy}
              >
                {resumeData.workExperience.map((item, index) => (
                  <SortableItem key={`work-${index}`} id={`work-${index}`}>
                    <div className='mb-2'>
                      <div className='flex justify-between items-baseline mb-0.5'>
                        <h3 className='text-xs font-bold'>
                          {item.position} |{" "}
                          <p className='content !text-gray-800 !font-medium'>
                            {" "}
                            {item.company}
                          </p>
                          {item.position}
                        </h3>
                        <DateRange
                          startYear={item.startYear}
                          endYear={item.endYear}
                          id={`work-experience-${index}`}
                          className='text-xs text-gray-600'
                        />
                      </div>
                      <div className='flex items-center gap-1 mb-0.5'>
                        <p className='text-xs font-semibold'>{item.company}</p>
                        {item.location && <span className='text-xs text-gray-600'>• {item.location}</span>}
                      </div>
                      {item.description && (
                        <p className='text-xs font-sans leading-snug mb-1'>
                          {item.description}
                        </p>
                      )}
                      {typeof item.keyAchievements === "string" &&
                        item.keyAchievements.trim() && (
                          <ul className='list-disc list-inside text-xs font-sans leading-snug space-y-0.5'>
                            {item.keyAchievements
                              .split("\n")
                              .filter((achievement) => achievement.trim())
                              .map((achievement, subIndex) => (
                                <li key={`${item.company}-${index}-${subIndex}`}>
                                  {achievement}
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
          </div>
        ) : null;

      case "projects":
        return resumeData.projects.length > 0 ? (
          <div className='mb-4'>
            <h2 className='text-sm font-bold uppercase mb-1 pb-0.5 border-b border-gray-400'>
              {customSectionTitles.projects || "Projects"}
            </h2>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => handleItemDragEnd(event, "projects")}
            >
              <SortableContext
                items={resumeData.projects.map((_, idx) => `project-${idx}`)}
                strategy={verticalListSortingStrategy}
              >
                {resumeData.projects.map((item, index) => (
                  <SortableItem
                    key={`project-${index}`}
                    id={`project-${index}`}
                  >
                    <div className='mb-2'>
                      <div className='flex justify-between items-baseline mb-0.5'>
                        <div className='flex items-center gap-2'>
                          <h3 className='text-xs font-bold'>
                            {item.name}
                          </h3>
                          {item.link && (
                            <Link
                              href={item.link}
                              className='text-black hover:text-gray-700 transition-colors'
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <FaExternalLinkAlt className='w-3 h-3 text-black' />
                            </Link>
                          )}
                        </div>
                        <DateRange
                          startYear={item.startYear}
                          endYear={item.endYear}
                          id={`projects-${index}`}
                          className='text-xs text-gray-600'
                        />
                      </div>
                      {item.description && (
                        <p className='text-xs font-sans leading-snug mb-1'>
                          {item.description}
                        </p>
                      )}
                      {typeof item.keyAchievements === "string" &&
                        item.keyAchievements.trim() && (
                          <ul className='list-disc list-inside text-xs font-sans leading-snug space-y-0.5'>
                            {item.keyAchievements
                              .split("\n")
                              .filter((achievement) => achievement.trim())
                              .map((achievement, subIndex) => (
                                <li key={`${item.name}-${index}-${subIndex}`}>
                                  {achievement}
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
          </div>
        ) : null;

      case "skills":
        return (
          <div>
            <h2 className='text-sm font-bold uppercase mb-1 pb-0.5 border-b border-gray-400'>
              {customSectionTitles.skills || "Skills"}
            </h2>
            <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
              {resumeData.skills
                .filter((skill) => skill.title !== "Soft Skills")
                .map((skill, index) => (
                  <div key={`SKILLS-${index}`}>
                    <h3 className='text-xs font-bold mb-0.5'>
                      {skill.title}
                    </h3>
                    <ul className='list-disc list-inside text-xs font-sans leading-snug'>
                      {skill.skills.map((skillItem, skillIdx) => (
                        <li key={skillIdx}>{skillItem}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        );

      case "softSkills":
        return (
          <div className='mb-4'>
            <h2 className='text-sm font-bold uppercase mb-1 pb-0.5 border-b border-gray-400'>
              {customSectionTitles.softSkills || "Soft Skills"}
            </h2>
            <p className='text-xs font-sans leading-snug'>
              {section.content.join(", ")}
            </p>
          </div>
        );

      case "languages":
        return resumeData.languages.length > 0 ? (
          <div className='mb-4'>
            <h2 className='text-sm font-bold uppercase mb-1 pb-0.5 border-b border-gray-400'>
              {customSectionTitles.languages || "Languages"}
            </h2>
            <div className='grid grid-cols-2 gap-x-4 gap-y-1'>
              {resumeData.languages.map((lang, index) => (
                <div key={index} className='text-xs'>
                  <span className='font-semibold'>{typeof lang === "string" ? lang : lang.name}</span>
                  {typeof lang === "object" && lang.proficiency && (
                    <span className='text-gray-600'> - {lang.proficiency}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "certifications":
        return resumeData.certifications.length > 0 ? (
          <div className='mb-4'>
            <h2 className='text-sm font-bold uppercase mb-1 pb-0.5 border-b border-gray-400'>
              {customSectionTitles.certifications || "Certifications"}
            </h2>
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className='mb-1.5'>
                <div className='flex justify-between items-baseline'>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-xs font-bold'>
                      {typeof cert === "string" ? cert : cert.name}
                    </h3>
                    {typeof cert === "object" &&
                      cert.link &&
                      cert.link.trim() !== "" && (
                        <Link
                          href={cert.link}
                          className='text-black hover:text-gray-700 transition-colors'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <FaExternalLinkAlt className='w-3 h-3 text-black' />
                        </Link>
                      )}
                  </div>
                  {typeof cert === "object" && cert.date && (
                    <span className='text-xs text-gray-600'>{cert.date}</span>
                  )}
                </div>
                {typeof cert === "object" && cert.issuer && (
                  <p className='text-xs text-gray-600'>{cert.issuer}</p>
                )}
              </div>
            ))}
          </div>
        ) : null;

      default:
        return null;
    }
  };

  // Prevent hydration mismatch
  if (!isClient) {
    return (
      <div className='max-w-[210mm] mx-auto bg-white p-6 print:p-0'>
        <div className='mb-4'>
          <h1 className='text-3xl font-bold'>
            {resumeData.name}
          </h1>
          <p className='text-base italic text-gray-700'>{resumeData.position}</p>
        </div>
        <div className='animate-pulse'>
          <div className='space-y-4'>
            {orderedSections.map((section) => (
              <div key={section.id} className='h-16 bg-gray-200 rounded'></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className='max-w-[210mm] mx-auto bg-white p-6 print:p-0'
      style={{
        fontFamily: "sans-serif",
        fontSize: "11pt",
        lineHeight: "1.4",
        color: "#000000",
      }}
    >
      {/* Header Section with Profile Picture */}
      <div className='flex justify-between items-start mb-4 pb-3 border-b-2 border-gray-400 no-break'>
        <div className='flex-1'>
          <h1 className='text-3xl font-bold mb-1'>{resumeData.name}</h1>
          <p className='text-base italic text-gray-700 mb-2'>{resumeData.position}</p>
          
          {/* Contact Info - Two Column Grid */}
          <div className='grid grid-cols-2 gap-x-6 gap-y-1 text-xs'>
            {/* Left Column */}
            <div className='space-y-1'>
              {resumeData.address && (
                <div className='flex items-center gap-1.5'>
                  <FaMapMarkerAlt className='text-gray-600 flex-shrink-0' />
                  <span>{resumeData.address}</span>
                </div>
              )}
              {resumeData.contactInformation && (
                <div className='flex items-center gap-1.5'>
                  <FaPhone className='text-gray-600 flex-shrink-0' />
                  <span>{resumeData.contactInformation}</span>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className='space-y-1'>
              {resumeData.email && (
                <div className='flex items-center gap-1.5'>
                  <FaEnvelope className='text-gray-600 flex-shrink-0' />
                  <span>{resumeData.email}</span>
                </div>
              )}
              {resumeData.socialMedia && resumeData.socialMedia.length > 0 && (
                <div className='space-y-1'>
                  {resumeData.socialMedia.map((social, index) => (
                    <div key={index} className='flex items-center gap-1.5'>
                      {social.socialMedia && social.socialMedia.toLowerCase() === "linkedin" && <FaLinkedin className='text-gray-600 flex-shrink-0' />}
                      {social.socialMedia && social.socialMedia.toLowerCase() === "github" && <ImGithub className='text-gray-600 flex-shrink-0' />}
                      {social.socialMedia && social.socialMedia.toLowerCase() === "website" && <CgWebsite className='text-gray-600 flex-shrink-0' />}
                      <a 
                        href={`${
                          social.socialMedia && social.socialMedia.toLowerCase() === "website"
                            ? "https://"
                            : social.socialMedia && social.socialMedia.toLowerCase() === "linkedin"
                              ? "https://www."
                              : "https://www."
                        }${social.link}`}
                        target='_blank' 
                        rel='noopener noreferrer' 
                        className='hover:underline flex items-center gap-1'
                      >
                        <span>{social.link}</span>
                        <FaExternalLinkAlt className='w-2.5 h-2.5 text-black' />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Picture - Always visible, uses default if not uploaded */}
        <div className='flex-shrink-0 ml-4'>
          <div className='w-24 h-24 rounded-sm overflow-hidden border-2 border-gray-300 bg-gray-100'>
            <Image
              src={resumeData.profilePicture || "/assets/smart.jpg"}
              alt={resumeData.name || "Profile"}
              width={96}
              height={96}
              className='object-cover w-full h-full'
              style={{ objectPosition: 'center' }}
            />
          </div>
        </div>
      </div>

      {/* Social Media Links - Fallback */}
      {resumeData.socialMedia && resumeData.socialMedia.length > 6 && (
        <div className='text-red-500 mb-2'>
          Social Media links are limited to 6 entries
        </div>
      )}

      {/* Draggable Sections with Same System as Modern Template */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={orderedSections.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          {orderedSections.map((section) => (
            <SortableSection key={section.id} id={section.id}>
              {renderSection(section)}
            </SortableSection>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TemplateFive;
