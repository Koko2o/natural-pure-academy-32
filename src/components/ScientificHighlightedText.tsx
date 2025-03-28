
import React from 'react';
import ScienceTooltip from './ScienceTooltip';
import { getTermById, ScientificTerm } from '@/data/scientificTerms';

interface ScientificHighlightedTextProps {
  text: string;
  className?: string;
}

const ScientificHighlightedText = ({ text, className = "" }: ScientificHighlightedTextProps) => {
  // Cette fonction analyse le texte pour rechercher les termes à mettre en évidence
  // Format: [[term-id:texte à afficher]]
  const renderHighlightedText = () => {
    if (!text) return null;
    
    const regex = /\[\[([\w-]+):(.*?)\]\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, termId, displayText] = match;
      const term = getTermById(termId);
      
      // Ajouter le texte avant le terme
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Ajouter le terme avec tooltip
      if (term) {
        parts.push(
          <ScienceTooltip 
            key={`term-${termId}-${match.index}`} 
            term={{
              title: term.title,
              definition: term.definition,
              source: term.source
            }}
          >
            {displayText}
          </ScienceTooltip>
        );
      } else {
        // Si le terme n'est pas trouvé, ajouter juste le texte
        parts.push(displayText);
      }
      
      lastIndex = match.index + fullMatch.length;
    }
    
    // Ajouter le reste du texte
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts;
  };
  
  return (
    <div className={className}>
      {renderHighlightedText()}
    </div>
  );
};

export default ScientificHighlightedText;
