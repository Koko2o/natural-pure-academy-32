
import React from 'react';
import { cn } from '@/lib/utils';

interface ScientificHighlightedTextProps {
  text: string;
  className?: string;
}

/**
 * Composant qui met en évidence des termes scientifiques dans un texte
 * Format attendu pour les termes à mettre en évidence: [[terme:définition]]
 */
const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ 
  text,
  className
}) => {
  // Regex pour capturer les termes scientifiques avec leur définition
  const scientificTermPattern = /\[\[([^:]+):([^\]]+)\]\]/g;
  
  // Si aucun terme scientifique, retourner le texte tel quel
  if (!scientificTermPattern.test(text)) {
    return <span className={className}>{text}</span>;
  }
  
  // Réinitialiser le regex pour l'utiliser dans le map
  scientificTermPattern.lastIndex = 0;
  
  // Diviser le texte en segments (texte normal et termes scientifiques)
  const segments = [];
  let lastIndex = 0;
  let match;
  
  while ((match = scientificTermPattern.exec(text)) !== null) {
    // Ajouter le texte avant le terme
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: text.substring(lastIndex, match.index)
      });
    }
    
    // Ajouter le terme scientifique
    segments.push({
      type: 'term',
      term: match[1],
      definition: match[2]
    });
    
    lastIndex = match.index + match[0].length;
  }
  
  // Ajouter le reste du texte après le dernier terme
  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.substring(lastIndex)
    });
  }
  
  // Rendu des segments
  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <React.Fragment key={index}>{segment.content}</React.Fragment>;
        } else {
          return (
            <span 
              key={index}
              className="relative group cursor-help border-b border-dotted border-primary/70"
              title={segment.definition}
            >
              {segment.term}
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 invisible group-hover:visible 
                              bg-primary/90 text-white text-xs rounded py-1 px-2 w-60 z-10">
                {segment.definition}
              </span>
            </span>
          );
        }
      })}
    </span>
  );
};

export default ScientificHighlightedText;
