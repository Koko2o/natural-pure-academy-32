import React from 'react';
import { cn } from '@/lib/utils';

interface ScientificHighlightedTextProps {
  text: string;
  className?: string;
}

const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ text, className }) => {
  // Fonction pour mettre en évidence les chiffres et pourcentages
  const highlightNumbers = (text: string) => {
    return text.split(/(\s*\d+%|\s*\d+(?:\.\d+)?(?:\s*(?:mg|g|mcg|UI|semaines|jours|heures|minutes|mois|ans))|\s*\d+\s*(?:à|vs|et)\s*\d+)/).map((part, index) => {
      if (/\d+%|\d+(?:\.\d+)?(?:\s*(?:mg|g|mcg|UI|semaines|jours|heures|minutes|mois|ans))|\d+\s*(?:à|vs|et)\s*\d+/.test(part)) {
        return <span key={index} className="font-semibold text-indigo-700">{part}</span>;
      }
      return part;
    });
  };

  return (
    <span className={cn("inline", className)}>
      {highlightNumbers(text)}
    </span>
  );
};

export const ScientificBlockHighlight: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={cn("relative py-2", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-natural-600 rounded-full"></div>
      <div className="pl-4">{children}</div>
    </div>
  );
};

export default ScientificHighlightedText;