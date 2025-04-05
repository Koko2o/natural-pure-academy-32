
import React from 'react';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { scientificTerms } from '@/data/scientificTerms';

interface ScientificHighlightedTextProps {
  text: string;
  scientificLevel: number;
}

const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ 
  text, 
  scientificLevel = 1 
}) => {
  // Regex pour trouver les termes formatés spécialement: [[term-id:displayed text]]
  const regex = /\[\[([\w-]+):(.*?)\]\]/g;
  
  // Si le texte ne contient pas de termes scientifiques ou le niveau est défini à 0, retourner le texte brut
  if (!regex.test(text) || scientificLevel === 0) {
    return <span>{text.replace(regex, '$2')}</span>;
  }
  
  // Reset le regex après le test
  regex.lastIndex = 0;
  
  // Diviser le texte en segments (termes scientifiques et texte normal)
  const segments = [];
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Ajouter le texte avant le terme scientifique
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: text.substring(lastIndex, match.index)
      });
    }
    
    // Ajouter le terme scientifique
    segments.push({
      type: 'term',
      id: match[1],
      content: match[2]
    });
    
    lastIndex = regex.lastIndex;
  }
  
  // Ajouter le texte restant après le dernier terme scientifique
  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.substring(lastIndex)
    });
  }
  
  // Rendu des segments
  return (
    <span>
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <span key={index}>{segment.content}</span>;
        } else {
          // Trouver le terme scientifique dans la base de données
          const term = scientificTerms.find(t => t.id === segment.id);
          
          // Si le terme n'est pas trouvé, afficher simplement le texte
          if (!term) {
            return <span key={index}>{segment.content}</span>;
          }
          
          // Déterminer l'apparence en fonction du niveau scientifique
          let className = 'cursor-help ';
          
          switch(scientificLevel) {
            case 3: // Niveau expert
              className += 'font-semibold text-indigo-700 border-b border-dashed border-indigo-300';
              break;
            case 2: // Niveau intermédiaire
              className += 'font-medium text-indigo-600 border-b border-dotted border-indigo-200';
              break;
            case 1: // Niveau basique
            default:
              className += 'text-indigo-600';
              break;
          }
          
          return (
            <HoverCard key={index} openDelay={300} closeDelay={100}>
              <HoverCardTrigger asChild>
                <span className={className}>{segment.content}</span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 text-sm" side="top">
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900">{term.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{term.description}</p>
                  <div className="flex items-center pt-1">
                    <span className="text-xs bg-slate-100 text-slate-600 rounded-full px-2 py-0.5">
                      {term.category}
                    </span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        }
      })}
    </span>
  );
};

export default ScientificHighlightedText;
import React from 'react';
import { cn } from '@/lib/utils';

interface ScientificHighlightedTextProps {
  children: React.ReactNode;
  className?: string;
}

const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn("relative py-2", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-natural-600 rounded-full"></div>
      <div className="pl-4">{children}</div>
    </div>
  );
};

export default ScientificHighlightedText;
