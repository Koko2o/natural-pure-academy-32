
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProblemRotatorProps {
  problems: string[];
  interval?: number;
  highlightColor?: string;
  showIndicators?: boolean;
}

const ProblemRotator: React.FC<ProblemRotatorProps> = ({
  problems,
  interval = 5000,
  highlightColor = 'rgba(108, 99, 255, 0.2)',
  showIndicators = true
}) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);
  
  // Fonction de changement de problème
  const rotateProblem = () => {
    setIsVisible(false);
    
    // Attendre que l'animation de fadeout soit terminée
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % problems.length);
      
      // Réafficher le nouveau problème
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }, 500);
  };
  
  // Configuration du timer pour la rotation
  useEffect(() => {
    const setupNextRotation = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        rotateProblem();
        setupNextRotation();
      }, interval);
    };
    
    // Ne pas animer au premier rendu
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setIsVisible(true);
    } else {
      setupNextRotation();
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, interval]);
  
  // Changement manuel de problème
  const handleIndicatorClick = (index: number) => {
    if (index === currentIndex) return;
    
    setIsVisible(false);
    
    setTimeout(() => {
      setCurrentIndex(index);
      
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
      
      // Réinitialiser le timer
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(rotateProblem, interval);
      }
    }, 500);
  };
  
  // Traduction du problème actuel
  const translatedProblem = t(`health_problem_${problems[currentIndex].toLowerCase().replace(/\s+/g, '_')}`, problems[currentIndex]);
  
  return (
    <div className="relative">
      <div className="min-h-[4.5rem] flex items-center justify-center px-4 rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: isVisible ? 0 : 20,
            backgroundColor: highlightColor 
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative px-4 py-2 rounded-md text-center font-medium"
        >
          <span className="text-xl md:text-2xl">{translatedProblem}</span>
        </motion.div>
      </div>
      
      {showIndicators && (
        <div className="flex justify-center mt-3 space-x-2">
          {problems.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-4' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Problème ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemRotator;
