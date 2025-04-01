
import React, { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Info, HelpCircle, BookOpen, ExternalLink, Terminal } from "lucide-react";
import { scientificTerms, SCIENTIFIC_TERMS_DATABASE, ScientificTerm } from "@/data/scientificTerms";

interface ScientificHighlightedTextProps {
  text: string;
  level?: number; // 1: Basic, 2: Intermediate, 3: Expert
}

const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ 
  text, 
  level = 1
}) => {
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);

  if (!text) return null;

  // Regular expression to match scientific terms in format [[term-id:Displayed Text]]
  const termRegex = /\[\[([^:]+):([^\]]+)\]\]/g;
  
  // Split text by scientific terms
  const parts = [];
  let lastIndex = 0;
  let match;
  
  // Create a working copy of the text
  let processedText = text;
  
  const renderDefinition = (termId: string) => {
    const term = SCIENTIFIC_TERMS_DATABASE[termId];
    
    if (!term) {
      return <span className="italic text-gray-600">Définition non disponible</span>;
    }
    
    return (
      <div className="text-sm">
        <h4 className="font-medium text-blue-700 mb-1 flex items-center">
          {term.title}
          {level >= 3 && term.source && (
            <Badge variant="outline" className="ml-2 text-xs bg-blue-50">
              Ref: {term.source.split(',')[0]}
            </Badge>
          )}
        </h4>
        <p className="text-gray-700">{term.definition}</p>
        
        {level >= 2 && term.relatedTerms && term.relatedTerms.length > 0 && (
          <div className="mt-2">
            <div className="text-xs text-gray-500 mb-1 flex items-center">
              <Terminal className="h-3 w-3 mr-1" />
              Termes associés:
            </div>
            <div className="flex flex-wrap gap-1">
              {term.relatedTerms.map((relatedId) => {
                const relatedTerm = scientificTerms.find(t => t.id === relatedId);
                return relatedTerm ? (
                  <Badge 
                    key={relatedId} 
                    variant="outline"
                    className="text-xs bg-gray-50"
                  >
                    {relatedTerm.title}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
        
        {level >= 3 && term.source && (
          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500 flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            Source: {term.source}
          </div>
        )}
      </div>
    );
  };
  
  while ((match = termRegex.exec(processedText)) !== null) {
    // Add text before the match
    parts.push(processedText.substring(lastIndex, match.index));
    
    // Extract term ID and display text
    const [fullMatch, termId, displayText] = match;
    
    // Add the highlighted term
    parts.push(
      <HoverCard key={`term-${match.index}`} openDelay={300} closeDelay={200}>
        <HoverCardTrigger asChild>
          <span 
            className="text-blue-600 border-b border-dotted border-blue-300 cursor-help"
            onMouseEnter={() => setHoveredTerm(termId)}
            onMouseLeave={() => setHoveredTerm(null)}
          >
            {displayText}
          </span>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-3">
          {renderDefinition(termId)}
        </HoverCardContent>
      </HoverCard>
    );
    
    // Update lastIndex
    lastIndex = match.index + fullMatch.length;
  }
  
  // Add remaining text
  parts.push(processedText.substring(lastIndex));
  
  // For basic level (level=1), use simplified display with fewer tooltips
  if (level === 1) {
    // Simplified display - replace tooltips with just the term
    return (
      <div className="scientific-text">
        {processedText.replace(termRegex, (_, __, displayText) => displayText)}
      </div>
    );
  }
  
  return <div className="scientific-text">{parts}</div>;
};

export default ScientificHighlightedText;
