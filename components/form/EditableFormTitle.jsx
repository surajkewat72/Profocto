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
      <div className="flex items-center gap-2 bg-gray-900/30 rounded-md p-2 border border-pink-500/20">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="bg-gray-800/60 text-gray-50 px-2 py-1 rounded border border-pink-500/40 focus:outline-none focus:border-pink-500 text-base font-medium placeholder-gray-400 transition-all duration-200 min-w-0 flex-1"
          autoFocus
          maxLength={50}
          placeholder="Enter section title..."
        />
        <button
          onClick={handleSave}
          className="bg-gray-600/20 hover:bg-gray-500/30 text-gray-300 hover:text-white p-1.5 rounded transition-all duration-200"
          type="button"
          title="Save changes"
        >
          <FaCheck size={12} />
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-600/20 hover:bg-gray-500/30 text-gray-300 hover:text-white p-1.5 rounded transition-all duration-200"
          type="button"
          title="Cancel editing"
        >
          <FaTimes size={12} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 group">
      <h2 className={className}>{currentTitle}</h2>
      <button
        onClick={handleEdit}
        className="bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 hover:text-pink-300 p-2 rounded-md transition-all duration-200 opacity-70 hover:opacity-100 hover:scale-105 group-hover:opacity-100"
        type="button"
        title="Click to edit section title"
      >
        <BiEdit size={16} />
      </button>
    </div>
  );
};

export default EditableFormTitle;
