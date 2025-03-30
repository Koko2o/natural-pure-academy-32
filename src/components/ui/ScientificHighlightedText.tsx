
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface ScientificHighlightedTextProps {
  text: string;
}

/**
 * Composant qui analyse un texte pour mettre en évidence les termes scientifiques
 * Format attendu: "Texte normal [[term-id:terme à surligner]] texte normal"
 */
export const ScientificHighlightedText: React.FC<ScientificHighlightedTextProps> = ({ text }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  // Base de données simulée de termes scientifiques
  const scientificTerms = {
    "cortisol": {
      title: "Cortisol",
      definition: "Hormone stéroïde produite par les glandes surrénales en réponse au stress. Régule le métabolisme, la réponse immunitaire et la pression artérielle.",
      source: "Journal of Endocrinology, 2019"
    },
    "micronutriments": {
      title: "Micronutriments",
      definition: "Vitamines et minéraux essentiels requis en petites quantités pour le développement et le fonctionnement normal de l'organisme.",
      source: "American Journal of Clinical Nutrition, 2021"
    },
    "homeostasis": {
      title: "Homéostasie",
      definition: "Processus de régulation par lequel un organisme maintient ses constantes biologiques face aux variations de l'environnement extérieur.",
      source: "Physiological Reviews, 2018"
    },
    "neurotransmitters": {
      title: "Neurotransmetteurs",
      definition: "Molécules chimiques qui transmettent les signaux d'un neurone à l'autre à travers les synapses. Ils jouent un rôle crucial dans la régulation de l'humeur, du sommeil et des fonctions cognitives.",
      source: "Nature Neuroscience, 2020"
    },
    "circadian-rhythm": {
      title: "Rythme Circadien",
      definition: "Cycle biologique d'environ 24 heures qui régule de nombreux processus physiologiques comme le sommeil, la température corporelle et la sécrétion hormonale.",
      source: "Science, 2017"
    }
  };
  
  // Recherche et mise en forme des termes scientifiques
  const parseText = () => {
    // Regex pour trouver les termes au format [[id:terme]]
    const regex = /\[\[([\w-]+):(.*?)\]\]/g;
    
    // Diviser le texte en segments (termes scientifiques et texte normal)
    let lastIndex = 0;
    const segments = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
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
        id: match[1],
        content: match[2]
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Ajouter le reste du texte
    if (lastIndex < text.length) {
      segments.push({
        type: 'text',
        content: text.substring(lastIndex)
      });
    }
    
    return segments;
  };
  
  const segments = parseText();
  
  return (
    <span className="scientific-text">
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <React.Fragment key={index}>{segment.content}</React.Fragment>;
        } else {
          const termId = segment.id as keyof typeof scientificTerms;
          const termInfo = scientificTerms[termId];
          
          return (
            <span key={index} className="relative inline-block">
              <span
                className="cursor-help border-b border-dashed border-natural-400 text-natural-800 font-medium"
                onMouseEnter={() => setActiveTooltip(segment.id)}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === segment.id ? null : segment.id)}
              >
                {segment.content}
              </span>
              
              <AnimatePresence>
                {activeTooltip === segment.id && termInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-natural-200"
                    onMouseEnter={() => setActiveTooltip(segment.id)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-natural-900">{termInfo.title}</h4>
                      <div className="bg-natural-100 rounded-full p-1">
                        <BookOpen className="w-3 h-3 text-natural-700" />
                      </div>
                    </div>
                    <p className="text-sm text-natural-700 mb-2">{termInfo.definition}</p>
                    {termInfo.source && (
                      <p className="text-xs text-natural-500 italic">Source: {termInfo.source}</p>
                    )}
                    
                    {/* Flèche pointant vers le terme */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-natural-200"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          );
        }
      })}
    </span>
  );
};

export default ScientificHighlightedText;
