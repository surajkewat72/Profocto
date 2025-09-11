"use client";

import React, { useState, useRef, useEffect } from 'react';
import { HiCalendar, HiChevronLeft, HiChevronRight, HiChevronDown } from 'react-icons/hi2';

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HiCalendar, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const CustomDatePicker = ({ value, onChange, placeholder = "Select date", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const containerRef = useRef(null);
  const calendarRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const shortMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const fullMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Calculate position when opening
  const calculatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      setPosition({
        top: rect.bottom + scrollTop + 4,
        left: rect.left + scrollLeft,
        width: rect.width
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target) &&
          containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowYearSelector(false);
        setShowMonthSelector(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        calculatePosition();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        calculatePosition();
      }
    };

    if (isOpen) {
      calculatePosition();
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

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
    setShowYearSelector(false);
    setShowMonthSelector(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleYearChange = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearSelector(false);
  };

  const handleMonthChange = (monthIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setShowMonthSelector(false);
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

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 50; year <= currentYear + 10; year++) {
      years.push(year);
    }
    return years;
  };

  const openCalendar = () => {
    setIsOpen(true);
    calculatePosition();
  };

  const days = getDaysInMonth(currentDate);

  const calendarContent = (
    <div 
      ref={calendarRef}
      className="custom-calendar-portal"
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${Math.max(position.width, 320)}px`,
        zIndex: 9999
      }}
    >
      <div className="bg-white rounded-lg border-2 border-pink-500/30 shadow-2xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1 hover:bg-pink-50 rounded-md transition-colors"
          >
            <HiChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowMonthSelector(!showMonthSelector)}
              className="text-lg font-semibold text-gray-900 hover:text-pink-600 transition-colors px-2 py-1 rounded"
            >
              {shortMonths[currentDate.getMonth()]}
            </button>
            <button
              type="button"
              onClick={() => setShowYearSelector(!showYearSelector)}
              className="text-lg font-semibold text-gray-900 hover:text-pink-600 transition-colors px-2 py-1 rounded"
            >
              {currentDate.getFullYear()}
            </button>
          </div>
          
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1 hover:bg-pink-50 rounded-md transition-colors"
          >
            <HiChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Year Selector */}
        {showYearSelector && (
          <div className="mb-4 max-h-40 overflow-y-auto border border-gray-200 rounded-md">
            {generateYears().map(year => (
              <button
                key={year}
                type="button"
                onClick={() => handleYearChange(year)}
                className={`w-full px-3 py-2 text-left hover:bg-pink-50 transition-colors ${
                  year === currentDate.getFullYear() ? 'bg-pink-100 text-pink-600 font-semibold' : 'text-gray-700'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        {/* Month Selector */}
        {showMonthSelector && (
          <div className="mb-4 grid grid-cols-3 gap-1 border border-gray-200 rounded-md p-2">
            {fullMonths.map((month, index) => (
              <button
                key={month}
                type="button"
                onClick={() => handleMonthChange(index)}
                className={`px-2 py-1 text-sm rounded hover:bg-pink-50 transition-colors ${
                  index === currentDate.getMonth() ? 'bg-pink-100 text-pink-600 font-semibold' : 'text-gray-700'
                }`}
              >
                {shortMonths[index]}
              </button>
            ))}
          </div>
        )}

        {/* Days of week */}
        {!showYearSelector && !showMonthSelector && (
          <>
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
          </>
        )}

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
    </div>
  );

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        className="other-input w-full cursor-pointer flex items-center justify-between"
        onClick={openCalendar}
      >
        <span className={selectedDate ? 'text-gray-50' : 'text-gray-400'}>
          {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
        </span>
        <HiCalendar className="w-4 h-4 text-gray-400" />
      </div>

      {isOpen && typeof window !== 'undefined' && createPortal(calendarContent, document.body)}
    </div>
  );
};

export default CustomDatePicker;
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const containerRef = useRef(null);
  const yearDropdownRef = useRef(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Generate years (current year ± 50 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowYearDropdown(false);
        setShowMonthDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value && value !== formatDate(selectedDate)) {
      setSelectedDate(value ? new Date(value) : null);
    }
  }, [value]);

  // Auto scroll to current year when year dropdown opens
  useEffect(() => {
    if (showYearDropdown && yearDropdownRef.current) {
      const currentYearIndex = years.findIndex(year => year === currentDate.getFullYear());
      if (currentYearIndex !== -1) {
        const scrollTop = Math.max(0, (currentYearIndex - 3) * 40); // 40px per item, show 3 items before current
        yearDropdownRef.current.scrollTop = scrollTop;
      }
    }
  }, [showYearDropdown, currentDate, years]);

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
    setShowYearDropdown(false);
    setShowMonthDropdown(false);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setShowYearDropdown(false);
    setShowMonthDropdown(false);
  };

  const handleYearSelect = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearDropdown(false);
  };

  const handleMonthSelect = (monthIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setShowMonthDropdown(false);
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
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => {
              setIsOpen(false);
              setShowYearDropdown(false);
              setShowMonthDropdown(false);
            }}
          />
          
          {/* Calendar Popup */}
          <div className="custom-datepicker-dropdown absolute top-full left-0 mt-1 bg-white rounded-lg border-2 border-pink-500/30 shadow-2xl z-[9999] p-4 min-w-[320px] max-w-[400px]">
          {/* Header with Month/Year dropdowns */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 hover:bg-pink-50 rounded-md transition-colors flex-shrink-0"
            >
              <HiChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex items-center gap-2 flex-1 justify-center">
              {/* Month Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowMonthDropdown(!showMonthDropdown);
                    setShowYearDropdown(false);
                  }}
                  className="flex items-center gap-1 px-3 py-1 text-lg font-semibold text-gray-900 hover:bg-pink-50 rounded-md transition-colors"
                >
                  {months[currentDate.getMonth()]}
                  <HiChevronDown className="w-4 h-4" />
                </button>
                
                {showMonthDropdown && (
                  <div className="custom-datepicker-month-dropdown absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-[10000] max-h-48 overflow-y-auto">
                    {months.map((month, index) => (
                      <button
                        key={month}
                        type="button"
                        onClick={() => handleMonthSelect(index)}
                        className={`w-full text-left px-3 py-2 hover:bg-pink-50 transition-colors whitespace-nowrap ${
                          index === currentDate.getMonth() ? 'bg-pink-100 text-pink-600 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Year Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowYearDropdown(!showYearDropdown);
                    setShowMonthDropdown(false);
                  }}
                  className="flex items-center gap-1 px-3 py-1 text-lg font-semibold text-gray-900 hover:bg-pink-50 rounded-md transition-colors"
                >
                  {currentDate.getFullYear()}
                  <HiChevronDown className="w-4 h-4" />
                </button>
                
                {showYearDropdown && (
                  <div 
                    ref={yearDropdownRef}
                    className="custom-datepicker-year-dropdown absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-[10000] max-h-48 overflow-y-auto"
                  >
                    {years.map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => handleYearSelect(year)}
                        className={`w-full text-left px-3 py-2 hover:bg-pink-50 transition-colors whitespace-nowrap ${
                          year === currentDate.getFullYear() ? 'bg-pink-100 text-pink-600 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 hover:bg-pink-50 rounded-md transition-colors flex-shrink-0"
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
                  h-10 text-sm rounded-md transition-all duration-200 font-medium
                  ${!date ? 'invisible' : 'hover:bg-pink-50 hover:scale-105'}
                  ${isSelected(date) 
                    ? 'bg-pink-500 text-white hover:bg-pink-600 scale-105' 
                    : isToday(date)
                    ? 'bg-pink-100 text-pink-600 font-bold ring-2 ring-pink-300'
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
              className="text-sm text-gray-500 hover:text-pink-600 transition-colors px-2 py-1 rounded hover:bg-pink-50"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                setSelectedDate(today);
                setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
                onChange(formatDate(today));
                setIsOpen(false);
              }}
              className="text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors px-2 py-1 rounded hover:bg-pink-50"
            >
              Today
            </button>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomDatePicker;
