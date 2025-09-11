"use client";

import React, { useState } from 'react';
import { HiCalendar } from 'react-icons/hi2';

const PinkDatePicker = ({ value, onChange, placeholder = "Select date", className = "" }) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleDateChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`relative ${className}`}>
      <div className="other-input w-full flex items-center justify-between relative">
        <input
          type="date"
          value={inputValue}
          onChange={handleDateChange}
          max={new Date().toISOString().split('T')[0]}
          min="1950-01-01"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <span className={inputValue ? 'text-gray-50' : 'text-gray-400'}>
          {inputValue ? formatDisplayDate(inputValue) : placeholder}
        </span>
        <HiCalendar className="w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default PinkDatePicker;
