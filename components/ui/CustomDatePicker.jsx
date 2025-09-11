"use client";

import React, { useState, useRef, useEffect } from 'react';
import { HiCalendar, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const CustomDatePicker = ({ value, onChange, placeholder = "Select date", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const containerRef = useRef(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDate; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onChange(formatDate(date));
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        className="other-input w-full cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedDate ? 'text-gray-50' : 'text-gray-400'}>
          {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
        </span>
        <HiCalendar className="w-4 h-4 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border-2 border-pink-500/30 shadow-xl z-50 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 hover:bg-pink-50 rounded-md transition-colors"
            >
              <HiChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <h3 className="text-lg font-semibold text-gray-900">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 hover:bg-pink-50 rounded-md transition-colors"
            >
              <HiChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => (
              <button
                key={index}
                type="button"
                onClick={() => date && handleDateSelect(date)}
                disabled={!date}
                className={`
                  h-10 text-sm rounded-md transition-all duration-200 
                  ${!date ? 'invisible' : 'hover:bg-pink-50'}
                  ${isSelected(date) 
                    ? 'bg-pink-500 text-white hover:bg-pink-600' 
                    : isToday(date)
                    ? 'bg-pink-100 text-pink-600 font-semibold'
                    : 'text-gray-700 hover:text-pink-600'
                  }
                `}
              >
                {date && date.getDate()}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setSelectedDate(null);
                onChange('');
                setIsOpen(false);
              }}
              className="text-sm text-gray-500 hover:text-pink-600 transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                setSelectedDate(today);
                onChange(formatDate(today));
                setIsOpen(false);
              }}
              className="text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
