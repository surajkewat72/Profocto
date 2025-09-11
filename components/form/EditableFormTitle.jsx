"use client";

import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { useSectionTitles } from '../../contexts/SectionTitleContext';

const EditableFormTitle = ({ sectionKey, defaultTitle, className = "input-title" }) => {
  const { 
    customSectionTitles, 
    editingSection, 
    updateSectionTitle, 
    startEditingTitle, 
    cancelEditing 
  } = useSectionTitles();
  
  const [editValue, setEditValue] = useState('');
  const isEditing = editingSection === sectionKey;
  const currentTitle = customSectionTitles[sectionKey] || defaultTitle;

  useEffect(() => {
    if (isEditing) {
      setEditValue(currentTitle);
    }
  }, [isEditing, currentTitle]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleSave = () => {
    if (editValue.trim()) {
      updateSectionTitle(sectionKey, editValue.trim());
    } else {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setEditValue(currentTitle);
    cancelEditing();
  };

  const handleEdit = () => {
    startEditingTitle(sectionKey);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="bg-white text-black px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-lg font-bold"
          autoFocus
          maxLength={50}
        />
        <button
          onClick={handleSave}
          className="text-green-500 hover:text-green-700 p-1"
          type="button"
        >
          <FaCheck size={14} />
        </button>
        <button
          onClick={handleCancel}
          className="text-red-500 hover:text-red-700 p-1"
          type="button"
        >
          <FaTimes size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <h2 className={className}>{currentTitle}</h2>
      <button
        onClick={handleEdit}
        className="text-gray-500 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
        type="button"
        title="Click to edit section title"
      >
        <BiEdit size={16} />
      </button>
    </div>
  );
};

export default EditableFormTitle;
