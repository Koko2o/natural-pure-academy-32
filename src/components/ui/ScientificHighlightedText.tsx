import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface ScientificHighlightedTextProps {
  text: string;
  className?: string;
}

const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ 
  text, 
  className = "" 
}) => {
  // Regex pour détecter [[terme:explication]] dans le texte
  const regex = /\[\[(.*?):(.*?)\]\]/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Ajouter le texte avant le match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Ajouter le terme avec tooltip
    const term = match[1];
    const explanation = match[2];

    // Utiliser une clé unique pour chaque tooltip
    const key = `tooltip-${match.index}`;

    parts.push(
      <Tooltip key={key}>
        <TooltipTrigger asChild>
          <span className="underline decoration-dotted decoration-primary cursor-help font-medium">
            {term}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{explanation}</p>
        </TooltipContent>
      </Tooltip>
    );

    lastIndex = match.index + match[0].length;
  }

  // Ajouter le reste du texte
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <span className={className}>{parts}</span>;
};

export default ScientificHighlightedText;