import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, TrendingUp, Activity } from 'lucide-react';

// Removing the duplicate SocialProofIndicator component.  The second one was almost identical to the first and likely caused the confusion.

interface SocialProofIndicatorProps {
  type: 'participants' | 'lastParticipation' | 'remainingSpots' | 'analysisProgress';
  className?: string;
}

const SocialProofIndicator: React.FC<SocialProofIndicatorProps> = ({ type, className = '' }) => {
  // Using fixed values to prevent fluctuations as per the provided changes
  const initialValues = {
    participants: 1167,
    minutesAgo: 5,
    remainingSpots: 6,
    analysisProgress: 98
  };

  const [value, setValue] = useState(initialValues);
  const valueRef = useRef(initialValues);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (type === 'analysisProgress') {
      intervalRef.current = setInterval(() => {
        const newProgress = 96 + Math.floor(Math.random() * 4);
        setValue(prev => ({ ...prev, analysisProgress: newProgress }));
      }, 15000);
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