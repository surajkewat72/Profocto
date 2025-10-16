"use client";

import { useState, useEffect } from "react";
import { FaRulerCombined } from "react-icons/fa";

const MarginControl = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [margins, setMargins] = useState({
    top: 12,
    bottom: 12,
    left: 18,
    right: 18,
  });

  // Load margins from localStorage on mount
  useEffect(() => {
    const savedMargins = localStorage.getItem("resumeMargins");
    if (savedMargins) {
      setMargins(JSON.parse(savedMargins));
    }
  }, []);

  // Apply margins to the preview
  useEffect(() => {
    const preview = document.querySelector(".a4-preview");
    if (preview) {
      preview.style.padding = `${margins.top}mm ${margins.right}mm ${margins.bottom}mm ${margins.left}mm`;
    }
    // Save to localStorage
    localStorage.setItem("resumeMargins", JSON.stringify(margins));
  }, [margins]);

  const handleMarginChange = (side, value) => {
    setMargins((prev) => ({
      ...prev,
      [side]: parseInt(value),
    }));
  };

  const resetMargins = () => {
    const defaultMargins = {
      top: 12,
      bottom: 12,
      left: 18,
      right: 18,
    };
    setMargins(defaultMargins);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg text-xs sm:text-sm"
        title="Adjust Margins"
      >
        <FaRulerCombined className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="font-medium hidden sm:inline">Margins</span>
        <span className="font-medium sm:hidden">Mar</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-4 px-5 z-50">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <FaRulerCombined className="text-indigo-600" />
              Adjust Resume Margins
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            >
              ×
            </button>
          </div>

          <p className="text-xs text-gray-600 mb-4">
            Fine-tune the spacing around your resume content (in millimeters)
          </p>

          {/* Top Margin */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Top Margin
              </label>
              <span className="text-sm font-semibold text-indigo-600">
                {margins.top}mm
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={margins.top}
              onChange={(e) => handleMarginChange("top", e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Bottom Margin */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Bottom Margin
              </label>
              <span className="text-sm font-semibold text-indigo-600">
                {margins.bottom}mm
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={margins.bottom}
              onChange={(e) => handleMarginChange("bottom", e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Left Margin */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Left Margin
              </label>
              <span className="text-sm font-semibold text-indigo-600">
                {margins.left}mm
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={margins.left}
              onChange={(e) => handleMarginChange("left", e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Right Margin */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Right Margin
              </label>
              <span className="text-sm font-semibold text-indigo-600">
                {margins.right}mm
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={margins.right}
              onChange={(e) => handleMarginChange("right", e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={resetMargins}
            className="w-full mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            Reset to Default
          </button>

          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              💡 Tip: These margins apply to both preview and PDF export
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarginControl;
