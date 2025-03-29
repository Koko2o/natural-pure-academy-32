
import React, { useState, useEffect } from 'react';
import ScienceTooltip from './ScienceTooltip';
import { getTermById } from '@/data/scientificTerms';
import { useIsMobile } from '@/hooks/use-mobile';

interface ScientificHighlightedTextProps {
  text: string;
  className?: string;
  personalityType?: 'visual' | 'textual' | 'analytical' | 'intuitive';
  complexity?: 'simple' | 'intermediate' | 'detailed';
}

const ScientificHighlightedText = ({ 
  text, 
  className = "",
  personalityType = 'analytical',
  complexity = 'intermediate'
}: ScientificHighlightedTextProps) => {
  const [readingBehavior, setReadingBehavior] = useState({
    dwellTime: 0,
    scrollSpeed: 0,
    termInteractions: {} as Record<string, number>,
    startTime: Date.now()
  });
  const [renderedContent, setRenderedContent] = useState<React.ReactNode[]>([]);
  const isMobile = useIsMobile();
  
  // Détecter le comportement de lecture
  useEffect(() => {
    let scrollPositions: number[] = [];
    let lastScrollTime = Date.now();
    
    const handleScroll = () => {
      const currentTime = Date.now();
      const scrollY = window.scrollY;
      
      // Mesurer la vitesse de défilement
      if (scrollPositions.length > 5) scrollPositions.shift();
      scrollPositions.push(scrollY);
      
      const timeGap = currentTime - lastScrollTime;
      if (timeGap > 50) { // Éviter les mesures trop rapprochées
        const scrollDistance = Math.abs(scrollPositions[scrollPositions.length - 1] - scrollPositions[0]);
        const scrollSpeed = scrollDistance / timeGap;
        
        setReadingBehavior(prev => ({
          ...prev,
          scrollSpeed,
          dwellTime: currentTime - prev.startTime
        }));
        
        lastScrollTime = currentTime;
      }
    };
    
    // Suivre les interactions avec les termes
    const handleTermInteraction = (termId: string) => {
      setReadingBehavior(prev => {
        const termInteractions = { ...prev.termInteractions };
        termInteractions[termId] = (termInteractions[termId] || 0) + 1;
        return { ...prev, termInteractions };
      });
    };
    
    // Ajouter les écouteurs d'événements
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Nettoyer
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Cette fonction analyse le texte pour rechercher les termes à mettre en évidence
  // Format: [[term-id:texte à afficher]]
  useEffect(() => {
    if (!text) {
      setRenderedContent([]);
      return;
    }
    
    const regex = /\[\[([\w-]+):(.*?)\]\]/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, termId, displayText] = match;
      const term = getTermById(termId);
      
      // Ajouter le texte avant le terme
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Déterminer le variant en fonction du type de personnalité et de la complexité
      const determineVariant = (): 'default' | 'academic' | 'medical' => {
        // Option basée sur le type de personnalité
        if (personalityType === 'analytical') return 'academic';
        if (personalityType === 'intuitive') return 'medical';
        return 'default';
      };
      
      // Adapter l'affichage des termes en fonction de la complexité
      if (term) {
        // Créer une version adaptée de la définition en fonction de la complexité
        let adaptedDefinition = term.definition;
        if (complexity === 'simple' && adaptedDefinition.length > 100) {
          adaptedDefinition = adaptedDefinition.substring(0, 100) + '...';
        } else if (complexity === 'detailed' && term.source) {
          adaptedDefinition = `${adaptedDefinition} ${term.source}`;
        }
        
        // Créer le terme avec tooltip
        parts.push(
          <ScienceTooltip 
            key={`term-${termId}-${match.index}`} 
            term={{
              title: term.title,
              definition: adaptedDefinition,
              source: term.source,
              url: term.url,
              category: term.category
            }}
            variant={determineVariant()}
            showIcon={!isMobile || complexity !== 'simple'}
            className={isMobile ? 'term-mobile' : 'term-desktop'}
          >
            {displayText}
          </ScienceTooltip>
        );
      } else {
        // Si le terme n'est pas trouvé, ajouter juste le texte
        parts.push(displayText);
      }
      
      lastIndex = match.index + fullMatch.length;
    }
    
    // Ajouter le reste du texte
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    setRenderedContent(parts);
  }, [text, personalityType, complexity, isMobile]);
  
  // Ajuster les styles en fonction du comportement de lecture
  const getAdaptiveStyles = () => {
    let additionalClasses = '';
    
    // Ajuster en fonction de la vitesse de défilement
    if (readingBehavior.scrollSpeed > 2) {
      additionalClasses += ' fast-reader';
    } else if (readingBehavior.scrollSpeed < 0.5) {
      additionalClasses += ' careful-reader';
    }
    
    // Adapter à l'appareil mobile
    if (isMobile) {
      additionalClasses += ' mobile-optimized';
    }
    
    return `${className} adaptive-text ${additionalClasses}`;
  };
  
  return (
    <div className={getAdaptiveStyles()}>
      {renderedContent}
      
      {/* Styles adaptatifs basés sur le comportement de lecture */}
      <style jsx>{`
        .adaptive-text {
          transition: font-size 0.5s ease, line-height 0.5s ease;
        }
        
        .fast-reader .term-desktop {
          text-decoration: underline;
        }
        
        .careful-reader .term-desktop, .careful-reader .term-mobile {
          font-weight: 500;
        }
        
        .mobile-optimized {
          font-size: ${complexity === 'simple' ? '1.05rem' : '0.95rem'};
          line-height: 1.6;
        }
        
        @media (max-width: 640px) {
          .mobile-optimized {
            --tooltip-delay: 100ms;
          }
        }
      `}</style>
    </div>
  );
};

export default ScientificHighlightedText;
