
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface ScientificTermInfo {
  id: string;
  title: string;
  description: string;
}

interface TermData {
  id: string;
  title: string;
}

const ScientificHighlightedText: React.FC<{ text: string }> = ({ text }) => {
  const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});

  const scientificTerms: Record<string, ScientificTermInfo> = {
    'circadian-rhythm': {
      id: 'circadian-rhythm',
      title: 'Rythme Circadien',
      description: 'Cycle naturel du corps sur 24 heures qui régule les cycles sommeil-éveil et de nombreuses fonctions biologiques.'
    },
    'cortisol': {
      id: 'cortisol',
      title: 'Cortisol',
      description: 'Hormone du stress qui joue un rôle dans la régulation du métabolisme et la réponse immunitaire.'
    },
    'microbiome': {
      id: 'microbiome',
      title: 'Microbiome',
      description: 'Ensemble des micro-organismes vivant dans l\'intestin humain, essentiels pour la digestion et l\'immunité.'
    },
    'inflammation': {
      id: 'inflammation',
      title: 'Inflammation',
      description: 'Réponse protectrice impliquant des cellules immunitaires, vaisseaux sanguins et médiateurs moléculaires.'
    },
    'probiotics': {
      id: 'probiotics',
      title: 'Probiotiques',
      description: 'Micro-organismes vivants qui, administrés en quantités adéquates, confèrent un bénéfice pour la santé.'
    },
    'vitamin-d': {
      id: 'vitamin-d',
      title: 'Vitamine D',
      description: 'Nutriment essentiel régulant l\'absorption du calcium et la santé osseuse, avec des effets sur l\'immunité.'
    },
    'antioxidant': {
      id: 'antioxidant',
      title: 'Antioxydant',
      description: 'Molécule capable de ralentir ou prévenir l\'oxydation d\'autres molécules, protégeant contre les dommages cellulaires.'
    },
    'adaptogens': {
      id: 'adaptogens',
      title: 'Adaptogènes',
      description: 'Substances naturelles qui aident le corps à s\'adapter au stress et à retrouver l\'équilibre.'
    },
    'bioavailability': {
      id: 'bioavailability',
      title: 'Biodisponibilité',
      description: 'Proportion d\'un nutriment qui est absorbée et utilisée par l\'organisme.'
    },
    'rda': {
      id: 'rda',
      title: 'AJR (Apports Journaliers Recommandés)',
      description: 'Quantité moyenne quotidienne de nutriments suffisante pour répondre aux besoins de 97-98% des individus en bonne santé.'
    },
  };

  // This function parses text containing [[id:title]] markup
  // and returns an array of text and term objects
  const parseText = (text: string): (string | TermData)[] => {
    if (!text) return [''];
    
    const regex = /\[\[([^:]+):([^\]]+)\]\]/g;
    const parts: (string | TermData)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      parts.push({
        id: match[1],
        title: match[2]
      });
      
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  const handleTooltipOpen = (termId: string, open: boolean) => {
    setTooltipOpen(prev => ({
      ...prev,
      [termId]: open
    }));
  };

  const parsedText = parseText(text);

  return (
    <TooltipProvider>
      <p className="text-gray-700 leading-relaxed">
        {parsedText.map((part, index) => {
          if (typeof part === 'string') {
            return <React.Fragment key={index}>{part}</React.Fragment>;
          } else {
            const termInfo = scientificTerms[part.id];
            return (
              <Tooltip
                key={index}
                open={tooltipOpen[part.id]}
                onOpenChange={(open) => handleTooltipOpen(part.id, open)}
              >
                <TooltipTrigger asChild>
                  <span className="bg-blue-50 text-blue-800 px-1 rounded cursor-help border-b border-dashed border-blue-400">
                    {part.title}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-3">
                  <div>
                    <h3 className="font-semibold mb-1">{termInfo?.title || part.title}</h3>
                    <p className="text-sm">{termInfo?.description || "Terme scientifique sans définition disponible."}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          }
        })}
      </p>
    </TooltipProvider>
  );
};

export default ScientificHighlightedText;
