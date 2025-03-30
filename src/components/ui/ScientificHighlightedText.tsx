
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ScientificTermTooltip {
  id: string;
  title: string;
  definition: string;
  source?: string;
}

// Sample scientific terms database (in a real app, this would come from an API or central data store)
const scientificTerms: ScientificTermTooltip[] = [
  {
    id: "cortisol",
    title: "Cortisol",
    definition: "Hormone du stress produite par les glandes surrénales qui régule le métabolisme et la réponse immunitaire.",
    source: "Journal of Endocrinology, 2020"
  },
  {
    id: "circadian-rhythm",
    title: "Rythme Circadien",
    definition: "Cycle biologique de 24 heures qui régule de nombreuses fonctions physiologiques, dont le sommeil et le métabolisme.",
    source: "Nature Reviews Neuroscience, 2019"
  },
  {
    id: "microbiome",
    title: "Microbiome",
    definition: "Ensemble des micro-organismes (bactéries, virus, champignons) vivant dans notre système digestif.",
    source: "Cell Host & Microbe, 2021"
  },
  {
    id: "antioxidants",
    title: "Antioxydants",
    definition: "Molécules qui neutralisent les radicaux libres nocifs et réduisent le stress oxydatif cellulaire.",
    source: "Biochemical Journal, 2021"
  },
  {
    id: "research-methodology",
    title: "Méthodologie de Recherche",
    definition: "Approche scientifique développée par notre laboratoire combinant analyse comportementale, biomarqueurs et données nutritionnelles.",
    source: "Journal of Nutritional Science, 2022"
  }
];

interface ScientificHighlightedTextProps {
  text: string;
}

const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ text }) => {
  // Parse the text to find scientific terms marked with [[ ]] 
  // Format: [[term-id:displayed text]]
  const parseText = () => {
    if (!text) return [text];
    
    const regex = /\[\[([\w-]+):(.*?)\]\]/g;
    let lastIndex = 0;
    const parts = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      const [, termId, displayText] = match;
      const term = scientificTerms.find(t => t.id === termId);
      
      if (term) {
        // Add scientific term with tooltip
        parts.push(
          <Popover key={`term-${termId}-${match.index}`}>
            <PopoverTrigger asChild>
              <span className="scientific-term cursor-help border-b border-dotted border-blue-400 text-blue-700 font-medium">
                {displayText}
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">{term.title}</h4>
                <p className="text-sm text-gray-700">{term.definition}</p>
                {term.source && (
                  <p className="text-xs text-gray-500 italic mt-2">Source: {term.source}</p>
                )}
              </div>
            </PopoverContent>
          </Popover>
        );
      } else {
        // Term not found, just display the text
        parts.push(displayText);
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts;
  };

  return <>{parseText()}</>;
};

export default ScientificHighlightedText;
