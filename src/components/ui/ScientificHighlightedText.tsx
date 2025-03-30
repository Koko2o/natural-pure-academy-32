import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { scientificTerms } from "@/data/scientificTerms";

interface ScientificHighlightedTextProps {
  text: string;
  className?: string;
}

const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ text, className }) => {
  // Look for patterns like [[term-id:displayed text]]
  const parts = text.split(/(\[\[[\w-]+:[^\]]+\]\])/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.match(/^\[\[([\w-]+):([^\]]+)\]\]$/)) {
          const matches = part.match(/^\[\[([\w-]+):([^\]]+)\]\]$/);
          if (!matches) return part;

          const [, termId, displayText] = matches;
          const term = scientificTerms?.find(t => t.id === termId);

          if (!term) return displayText;

          return (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <span className="cursor-help border-b border-dotted border-amber-500 text-amber-700">
                    {displayText}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <div>
                    <h4 className="font-bold">{term.title}</h4>
                    <p className="text-sm">{term.definition}</p>
                    {term.source && (
                      <p className="text-xs text-muted-foreground mt-1">Source: {term.source}</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        }
        return part;
      })}
    </span>
  );
};

export default ScientificHighlightedText;