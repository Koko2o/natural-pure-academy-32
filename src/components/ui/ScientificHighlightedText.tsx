import React from 'react';
import { Link } from 'react-router-dom';

interface ScientificHighlightedTextProps {
  text: string;
  className?: string;
}

export const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ 
  text,
  className = ""
}) => {
  // Process text for scientific highlights with format [[term:displayed text]]
  const processText = (inputText: string) => {
    const pattern = /\[\[(.*?):(.*?)\]\]/g;

    // Split text by the pattern
    const parts = inputText.split(pattern);

    if (parts.length === 1) {
      // No matches found, return original text
      return <>{inputText}</>;
    }

    const elements = [];
    let i = 0;

    // Process alternating parts (text and matches)
    while (i < parts.length) {
      if (parts[i]) {
        elements.push(<React.Fragment key={`part-${i}`}>{parts[i]}</React.Fragment>);
      }

      // If we have term and display text
      if (parts[i + 1] && parts[i + 2]) {
        const term = parts[i + 1];
        const displayText = parts[i + 2];

        elements.push(
          <span 
            key={`term-${i}`}
            className="relative cursor-help border-b border-dashed border-blue-500 text-blue-700 font-medium group"
          >
            {displayText}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-blue-700 text-white text-xs rounded p-1 min-w-max z-10">
              <Link to={`/glossary/${term}`} className="hover:underline">
                En savoir plus sur ce terme
              </Link>
            </span>
          </span>
        );
      }

      i += 3; // Move to next set (text, term, displayText)
    }

    return <>{elements}</>;
  };

  return (
    <span className={className}>
      {processText(text)}
    </span>
  );
};

export default ScientificHighlightedText;