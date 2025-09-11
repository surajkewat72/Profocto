"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const SectionTitleContext = createContext();

export const useSectionTitles = () => {
  const context = useContext(SectionTitleContext);
  if (!context) {
    throw new Error('useSectionTitles must be used within a SectionTitleProvider');
  }
  return context;
};

export const SectionTitleProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  
  const defaultTitles = {
    "summary": "Summary",
    "education": "Education", 
    "experience": "Professional Experience",
    "projects": "Projects",
    "skills": "Technical Skills",
    "programming": "Programming Languages",
    "frameworks": "Frameworks & Technologies", 
    "clouddb": "Cloud & Databases",
    "softskills": "Soft Skills",
    "languages": "Languages",
    "certifications": "Certifications"
  };

  const [customSectionTitles, setCustomSectionTitles] = useState(defaultTitles);
  const [editingSection, setEditingSection] = useState(null);

  useEffect(() => {
    setIsClient(true);
    // Load from localStorage
    const savedTitles = localStorage.getItem('customSectionTitles');
    if (savedTitles) {
      const parsedTitles = JSON.parse(savedTitles);
      setCustomSectionTitles({ ...defaultTitles, ...parsedTitles });
    }
  }, []);

  const updateSectionTitle = (sectionKey, newTitle) => {
    setCustomSectionTitles(prev => {
      const updated = { ...prev, [sectionKey]: newTitle };
      if (isClient) {
        localStorage.setItem('customSectionTitles', JSON.stringify(updated));
      }
      return updated;
    });
    setEditingSection(null);
  };

  const startEditingTitle = (sectionKey) => {
    setEditingSection(sectionKey);
  };

  const cancelEditing = () => {
    setEditingSection(null);
  };

  const value = {
    customSectionTitles,
    editingSection,
    updateSectionTitle,
    startEditingTitle,
    cancelEditing,
    defaultTitles
  };

  return (
    <SectionTitleContext.Provider value={value}>
      {children}
    </SectionTitleContext.Provider>
  );
};
