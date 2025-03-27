
import { useState, useEffect } from "react";
import { Users, Clock, MapPin } from "lucide-react";

interface DynamicSocialProofProps {
  baseText?: string;
  dynamicData?: number;
  location?: string;
  variant?: "standard" | "minimal" | "detailed";
  className?: string;
}

const DynamicSocialProof = ({
  baseText = "de participants ont constaté une amélioration",
  dynamicData,
  location,
  variant = "standard",
  className = ""
}: DynamicSocialProofProps) => {
  const [participantCount, setParticipantCount] = useState(dynamicData || 0);
  const [localPercentage, setLocalPercentage] = useState(0);
  
  useEffect(() => {
    // Calcul dynamique du nombre de participants (simulé)
    if (!dynamicData) {
      const baseCount = Math.floor(Math.random() * 20) + 100;
      setParticipantCount(baseCount);
      
      // Mise à jour périodique pour simuler les nouveaux participants
      const interval = setInterval(() => {
        setParticipantCount(prev => {
          const increment = Math.random() > 0.7 ? 1 : 0;
          return prev + increment;
        });
      }, 30000); // Toutes les 30 secondes
      
      return () => clearInterval(interval);
    }
    
    // Calcul du pourcentage local
    const percentage = Math.floor(Math.random() * 15) + 70; // 70-85%
    setLocalPercentage(percentage);
  }, [dynamicData]);
  
  // Obtenir la ville actuelle (simulé)
  const userCity = location || "votre région";
  
  // Obtenir le temps depuis la dernière participation (simulé)
  const getTimeAgo = () => {
    const minutes = Math.floor(Math.random() * 5) + 1;
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  };
  
  if (variant === "minimal") {
    return (
      <div className={`inline-flex items-center gap-1 text-xs text-indigo-600 ${className}`}>
        <Users className="h-3 w-3" />
        <span>{participantCount} participants</span>
      </div>
    );
  }
  
  if (variant === "detailed") {
    return (
      <div className={`bg-indigo-50 border border-indigo-100 rounded-lg p-3 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="bg-indigo-100 p-1.5 rounded-full mt-0.5">
            <Users className="h-4 w-4 text-indigo-700" />
          </div>
          <div>
            <p className="text-sm text-indigo-800 font-medium">
              {participantCount} personnes ont participé à notre étude
            </p>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="flex items-center text-xs text-indigo-600">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{localPercentage}% dans {userCity}</span>
              </div>
              <div className="flex items-center text-xs text-indigo-600">
                <Clock className="h-3 w-3 mr-1" />
                <span>Dernière: il y a {getTimeAgo()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Standard variant (default)
  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <Users className="h-4 w-4 text-indigo-600" />
      <span>
        <span className="font-medium">{Math.floor(Math.random() * 15) + 70}%</span> {baseText}
      </span>
    </div>
  );
};

export default DynamicSocialProof;
