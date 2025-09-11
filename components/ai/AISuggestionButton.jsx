"use client";

import React, { useState } from 'react';
import { FaLightbulb, FaSpinner } from 'react-icons/fa';
import { getSuggestions } from '../../utils/gemini';

const AISuggestionButton = ({ section, content }) => {
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section,
          content
        }),
      });
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Suggestions error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="flex-col-gap-2 mb-4">
      <div className="flex justify-end">
        <button
          onClick={handleGetSuggestions}
          className="clean-button p-2"
          disabled={loading}
          title="Get AI Suggestions"
        >
          {loading ? <FaSpinner className="animate-spin text-sm" /> : <FaLightbulb className="text-sm" />}
        </button>
      </div>
      
      {suggestions && (
        <div className="ai-response-card">
          <div className="ai-response-header">
            <h3 className="ai-response-title">AI Suggestions</h3>
            <button
              onClick={() => setSuggestions('')}
              className="ai-close-button"
            >
              ×
            </button>
          </div>
          <div className="ai-response-content">{suggestions}</div>
        </div>
      )}
    </div>
  );
};

export default AISuggestionButton; 