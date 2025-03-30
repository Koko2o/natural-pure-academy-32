import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';

interface SocialProofIndicatorProps {
  responseId: string;
  questionId: string;
  minPercentage?: number;
  maxPercentage?: number;
}

/**
 * Composant qui affiche un indicateur social de type "X% des utilisateurs ont répondu comme vous"
 */
const SocialProofIndicator: React.FC<SocialProofIndicatorProps> = ({
  responseId,
  questionId,
  minPercentage = 65,
  maxPercentage = 89
}) => {
  const [percentage, setPercentage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Simuler un pourcentage réaliste basé sur le responseId et questionId
    // Dans une application réelle, ces données viendraient d'une API
    const hash = (responseId + questionId).split('').reduce((a, b) => {
      return a + b.charCodeAt(0);
    }, 0);

    // Générer un pourcentage entre minPercentage et maxPercentage
    const simulatedPercentage = minPercentage + (hash % (maxPercentage - minPercentage));

    // Simuler un nombre de personnes (entre 500 et 2000)
    const simulatedCount = 500 + (hash % 1500);

    // Animation du pourcentage pour un effet plus dynamique
    setTimeout(() => {
      setPercentage(simulatedPercentage);
      setCount(simulatedCount);
    }, 800);
  }, [responseId, questionId, minPercentage, maxPercentage]);

  return (
    <motion.div 
      className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100 text-sm flex items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex-shrink-0 text-blue-500 mr-3">
        <FaUsers size={18} />
      </div>
      <div>
        <div className="font-medium text-blue-800">
          {percentage > 0 ? (
            <>{percentage.toFixed(0)}% des utilisateurs ont répondu comme vous</>
          ) : (
            <>Analyse des réponses en cours...</>
          )}
        </div>
        {count > 0 && (
          <div className="text-blue-600 text-xs mt-1">
            Basé sur {count.toLocaleString('fr-FR')} utilisateurs similaires à votre profil
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SocialProofIndicator;