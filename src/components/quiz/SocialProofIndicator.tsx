
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, TrendingUp } from 'lucide-react';

interface SocialProofIndicatorProps {
  totalParticipants?: number;
  remainingSlots?: number;
  averageCompletionTime?: number;
}

/**
 * Composant qui affiche des indicateurs de preuve sociale pendant le quiz
 * pour renforcer l'engagement et la confiance
 */
const SocialProofIndicator: React.FC<SocialProofIndicatorProps> = ({
  totalParticipants = 963,
  remainingSlots = 100,
  averageCompletionTime = 4.2
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [usedSlots, setUsedSlots] = useState(0);
  
  // Simuler l'utilisation progressive des places disponibles
  useEffect(() => {
    const timer = setInterval(() => {
      if (usedSlots < remainingSlots - 10) {
        // Augmentation aléatoire entre 1 et 3
        setUsedSlots(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 30000); // Toutes les 30 secondes
    
    return () => clearInterval(timer);
  }, [remainingSlots]);
  
  // Rotation des indicateurs sociaux
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % 3);
    }, 8000); // Changer toutes les 8 secondes
    
    return () => clearInterval(timer);
  }, []);
  
  // Données de preuve sociale
  const socialProofs = [
    {
      icon: <Users className="w-4 h-4 text-natural-600" />,
      text: `${totalParticipants} profils analysés ce mois-ci`
    },
    {
      icon: <Clock className="w-4 h-4 text-natural-600" />,
      text: `Temps moyen de complétion: ${averageCompletionTime} minutes`
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-natural-600" />,
      text: `Analyses restantes aujourd'hui: ${remainingSlots - usedSlots}/${remainingSlots}`
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-6 mb-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-natural-50 rounded-lg p-3 flex items-center justify-center"
        >
          {socialProofs[currentIndex].icon}
          <span className="ml-2 text-sm text-natural-700">
            {socialProofs[currentIndex].text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SocialProofIndicator;
