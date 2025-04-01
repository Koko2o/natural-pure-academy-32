import React, { useState } from 'react';
import { getTermById } from '@/data/scientificTerms';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface ScientificHighlightedTextProps {
  text: string;
  className?: string;
}

/**
 * Composant intelligent qui identifie et met en évidence les termes scientifiques
 * avec infobulle explicative au survol
 */
const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ text, className = "" }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState<number | null>(null);

  // Regex pour trouver les patterns [[term-id:displayed-text]]
  const regex = /\[\[([\w-]+):(.*?)\]\]/g;

  // Remplacer les patterns par des tooltips
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

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
      const termInfo = getTermById(termId);

      if (termInfo) {
        parts.push(
          <TooltipProvider key={`tooltip-${i}`}>
            <Tooltip open={isTooltipOpen === i} onOpenChange={(open) => setIsTooltipOpen(open ? i : null)}>
              <TooltipTrigger asChild>
                <span 
                  className="cursor-help font-medium text-primary-600 underline decoration-dotted underline-offset-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsTooltipOpen(isTooltipOpen === i ? null : i);
                  }}
                >
                  {displayText}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-md p-4 bg-white shadow-xl border rounded-lg">
                <div>
                  <h4 className="font-bold text-base mb-1">{termInfo.title}</h4>
                  <div className="text-sm">{termInfo.definition}</div>
                  {termInfo.source && (
                    <div className="text-xs mt-2 italic text-gray-600">Source: {termInfo.source}</div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else {
        // Si le terme n'est pas trouvé, afficher simplement le texte
        parts.push(<span key={`unknown-${i}`}>{displayText}</span>);
      }

      lastIndex = index + fullMatch.length;
    }

    // Ajouter le reste du texte après le dernier match
    if (lastIndex < text.length) {
      parts.push(<span key="rest" className={className}>{text.substring(lastIndex)}</span>);
    }
  }

  return <span className={className}>{parts}</span>;
};

export default ScientificHighlightedText;