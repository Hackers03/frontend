"use client";

import React from 'react';

interface AskQuestionProps {
  onClick: () => void;
}

const AskQuestion: React.FC<AskQuestionProps> = ({ onClick }) => {
  return (
    <div>
      <button 
        onClick={onClick} 
        className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
      >
        <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
        </svg>
        AskQuestion
      </button>
    </div>
  );
};

export default AskQuestion;
