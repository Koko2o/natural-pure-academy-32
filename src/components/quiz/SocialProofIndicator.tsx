
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
import React, { useState, useEffect, useRef } from 'react';
import { Clock, Users, Activity } from 'lucide-react';

interface SocialProofIndicatorProps {
  type: 'participants' | 'lastParticipation' | 'remainingSpots' | 'analysisProgress';
  className?: string;
}

const SocialProofIndicator: React.FC<SocialProofIndicatorProps> = ({ type, className = '' }) => {
  // Valeurs statiques initiales pour éviter les fluctuations
  const initialValues = {
    participants: Math.floor(1100 + Math.random() * 200),
    minutesAgo: Math.floor(3 + Math.random() * 7),
    remainingSpots: 6,
    analysisProgress: 98
  };
  
  const [value, setValue] = useState(initialValues);
  const valueRef = useRef(initialValues);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Effet pour gérer les mises à jour contrôlées
  useEffect(() => {
    // Seule l'analyse devrait être mise à jour, mais avec un intervalle plus long
    if (type === 'analysisProgress') {
      intervalRef.current = setInterval(() => {
        // Légère variation mais stable, oscille entre 96 et 99%
        const newProgress = 96 + Math.floor(Math.random() * 4);
        setValue(prev => ({ ...prev, analysisProgress: newProgress }));
      }, 15000); // 15 secondes entre chaque mise à jour
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [type]);

  const renderContent = () => {
    switch (type) {
      case 'participants':
        return (
          <div className={`flex items-center text-sm ${className}`}>
            <Users size={16} className="mr-2 text-indigo-600" />
            <span>Utilisé par <strong>{value.participants}</strong> membres</span>
          </div>
        );
      case 'lastParticipation':
        return (
          <div className={`flex items-center text-sm ${className}`}>
            <Clock size={16} className="mr-2 text-amber-600" />
            <span>Dernière participation il y a <strong>{value.minutesAgo} min</strong></span>
          </div>
        );
      case 'remainingSpots':
        return (
          <div className={`flex items-center text-sm ${className}`}>
            <Users size={16} className="mr-2 text-rose-600" />
            <span><strong>{value.remainingSpots}</strong> places restantes</span>
          </div>
        );
      case 'analysisProgress':
        return (
          <div className={`flex items-center text-sm ${className}`}>
            <Activity size={16} className="mr-2 text-emerald-600" />
            <span>Analyses restantes aujourd'hui: <strong>{value.analysisProgress}/100</strong></span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="social-proof-indicator">
      {renderContent()}
    </div>
  );
};

export default SocialProofIndicator;
