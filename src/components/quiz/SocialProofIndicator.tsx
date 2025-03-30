
import React, { useState, useEffect } from 'react';
import { FaUsers, FaClock } from 'react-icons/fa';

interface SocialProofIndicatorProps {
  popularity: number;
  recentUsers?: number;
  isStable?: boolean;
}

/**
 * Composant amélioré d'indicateur de preuve sociale
 * avec stabilité accrue pour une meilleure UX
 */
const SocialProofIndicator: React.FC<SocialProofIndicatorProps> = ({ 
  popularity, 
  recentUsers = 5,
  isStable = true 
}) => {
  const [displayedPopularity, setDisplayedPopularity] = useState(popularity);
  const [displayedTime, setDisplayedTime] = useState<number>(isStable ? 5 : Math.floor(Math.random() * 10) + 2);
  const [displayedUsers, setDisplayedUsers] = useState(recentUsers);

  useEffect(() => {
    // Si le mode stable est activé, utiliser des valeurs cohérentes
    if (isStable) {
      // Créer une variation minimale et stable basée sur l'heure du jour
      const now = new Date();
      const hourSeed = now.getHours();
      const popularityVariation = Math.sin(hourSeed) * 3; // Variation de ±3%
      
      // Valeur stable avec légère variation
      setDisplayedPopularity(Math.floor(popularity + popularityVariation));
      
      // Temps stable avec légère variation 
      setDisplayedTime(Math.max(2, Math.min(15, 5 + Math.floor(Math.sin(hourSeed * 0.5) * 2))));
      
      // Nombre d'utilisateurs stable avec légère variation
      setDisplayedUsers(Math.max(1, recentUsers + Math.floor(Math.sin(hourSeed * 0.7) * 2)));
      
      return;
    }
    
    // Comportement fluctuant (ancien mode) - pour référence uniquement
    const interval = setInterval(() => {
      // Variation aléatoire de la popularité
      setDisplayedPopularity(prevPop => {
        const variation = Math.floor(Math.random() * 5) - 2; // -2 à +2
        return Math.max(50, Math.min(99, prevPop + variation));
      });
      
      // Variation aléatoire du temps
      setDisplayedTime(Math.floor(Math.random() * 15) + 2);
      
      // Variation aléatoire du nombre d'utilisateurs
      setDisplayedUsers(Math.floor(Math.random() * 10) + 2);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [popularity, recentUsers, isStable]);

  // Formatage du temps (minutes ou heures)
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      return `${hours} h`;
    }
  };

  return (
    <div className="flex flex-col items-end space-y-1 mt-1">
      <div className="text-xs text-gray-600 flex items-center">
        <FaUsers className="mr-1 text-gray-400" />
        <span>{displayedPopularity}% des utilisateurs recommandent</span>
      </div>
      <div className="text-xs text-gray-600 flex items-center">
        <FaClock className="mr-1 text-gray-400" />
        <span>Dernière participation il y a {formatTime(displayedTime)}</span>
      </div>
    </div>
  );
};

export default SocialProofIndicator;
