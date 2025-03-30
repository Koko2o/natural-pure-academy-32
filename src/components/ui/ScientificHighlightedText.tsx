import React, { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { scientificTerms } from '@/data/scientificTerms';

interface ScientificHighlightedTextProps {
  text: string;
  className?: string;
}

export const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ 
  text, 
  className = '' 
}) => {
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);

  // Regex pour détecter les termes scientifiques dans le format [[id:texte affiché]]
  const regex = /\[\[([\w-]+):(.*?)\]\]/g;

  // Remplacer les correspondances par des éléments JSX
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  // Clone le texte pour éviter les problèmes de référence
  const textToProcess = text || '';

  while ((match = regex.exec(textToProcess)) !== null) {
    // Ajouter le texte avant la correspondance
    if (match.index > lastIndex) {
      parts.push(textToProcess.substring(lastIndex, match.index));
    }

    // Extraire l'id et le texte
    const termId = match[1];
    const displayText = match[2];

    // Rechercher le terme dans la liste des termes scientifiques
    const term = scientificTerms.find(t => t.id === termId);

    // Ajouter le terme avec un tooltip
    parts.push(
      <TooltipProvider key={`${termId}-${match.index}`}>
        <Tooltip open={openTooltip === termId} onOpenChange={(open) => open ? setOpenTooltip(termId) : setOpenTooltip(null)}>
          <TooltipTrigger asChild>
            <span 
              className="text-indigo-700 border-b border-dashed border-indigo-300 cursor-help" 
              onClick={(e) => e.preventDefault()}
            >
              {displayText}
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm">
            {term ? (
              <div>
                <p className="font-medium mb-1">{term.title}</p>
                <p className="text-sm text-gray-600">{term.definition}</p>
                {term.source && (
                  <p className="text-xs text-gray-500 mt-2 italic">Source: {term.source}</p>
                )}
              </div>
            ) : (
              <p>Définition non disponible</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    lastIndex = match.index + match[0].length;
  }

  // Ajouter le reste du texte
  if (lastIndex < textToProcess.length) {
    parts.push(textToProcess.substring(lastIndex));
  }

  return (
    <span className={className}>
      {parts}
    </span>
  );
};