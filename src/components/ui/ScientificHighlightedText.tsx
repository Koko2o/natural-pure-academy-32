
import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SCIENTIFIC_TERMS_DATABASE } from "@/data/scientificTerms";

interface ScientificHighlightedTextProps {
  text: string;
  className?: string;
}

/**
 * Composant intelligent qui identifie et met en évidence les termes scientifiques
 * avec infobulle explicative au survol
 */
const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ text, className = "" }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState<string | null>(null);

  // Regex pour trouver les patterns [[term-id:displayed-text]]
  const regex = /\[\[([\w-]+):(.*?)\]\]/g;
  
  // Remplacer les patterns par des tooltips
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let plainText = text;
  
  // Extraire tous les matchs d'abord
  const matches: Array<{
    fullMatch: string;
    termId: string;
    displayText: string;
    index: number;
  }> = [];
  
  while ((match = regex.exec(text)) !== null) {
    matches.push({
      fullMatch: match[0],
      termId: match[1],
      displayText: match[2],
      index: match.index
    });
  }
  
  // Convertir en éléments React
  if (matches.length === 0) {
    // Aucun terme scientifique trouvé, retourner le texte tel quel
    parts.push(<span key="plain" className={className}>{text}</span>);
  } else {
    // Des termes scientifiques trouvés, créer des éléments interactifs
    for (let i = 0; i < matches.length; i++) {
      const { fullMatch, termId, displayText, index } = matches[i];
      
      // Ajouter le texte avant le match
      if (index > lastIndex) {
        parts.push(<span key={`text-${i}`} className={className}>{text.substring(lastIndex, index)}</span>);
      }
      
      // Ajouter le terme scientifique avec tooltip
      const termInfo = SCIENTIFIC_TERMS_DATABASE[termId];
      
      if (termInfo) {
        parts.push(
          <TooltipProvider key={`tooltip-${i}`}>
            <Tooltip open={isTooltipOpen === termId}>
              <TooltipTrigger asChild onClick={() => setIsTooltipOpen(isTooltipOpen === termId ? null : termId)}>
                <span 
                  className="bg-blue-50 text-blue-800 px-1 py-0.5 rounded cursor-help border-b border-dashed border-blue-400"
                >
                  {displayText}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-md p-4">
                <div className="text-sm">
                  <h4 className="font-semibold mb-1">{termInfo.term}</h4>
                  <div>{termInfo.definition}</div>
                  {termInfo.source && (
                    <div className="text-xs mt-2 text-gray-500">
                      Source: {termInfo.source}
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else {
        // Si le terme n'est pas trouvé dans la base, afficher simplement le texte
        parts.push(<span key={`unknown-${i}`} className={className}>{displayText}</span>);
      }
      
      lastIndex = index + fullMatch.length;
    }
    
    // Ajouter le reste du texte après le dernier match
    if (lastIndex < text.length) {
      parts.push(<span key="text-end" className={className}>{text.substring(lastIndex)}</span>);
    }
  }
  
  // Le composant ne retourne plus une balise p mais un span
  return <>{parts}</>;
};

export default ScientificHighlightedText;
