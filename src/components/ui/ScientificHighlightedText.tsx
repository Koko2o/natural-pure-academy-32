import React from 'react';

interface ScientificHighlightedTextProps {
  children: React.ReactNode;
  className?: string;
}

export const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <span className={`bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent font-semibold ${className}`}>
      {children}
    </span>
  );
};

export default ScientificHighlightedText;