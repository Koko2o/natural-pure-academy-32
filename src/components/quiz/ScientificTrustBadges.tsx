
import { useState, useEffect } from 'react';
import { Award, Users, ScrollText, Microscope, Link } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface TrustBadge {
  icon: 'award' | 'users' | 'study' | 'microscope' | 'link';
  label: string;
  value: number | string;
  suffix?: string;
  color?: string;
}

interface ScientificTrustBadgesProps {
  badges?: TrustBadge[];
  className?: string;
  animated?: boolean;
}

const ScientificTrustBadges = ({
  badges = [
    { icon: 'award', label: 'Taux d\'efficacité', value: 72, suffix: '%', color: 'bg-amber-100 text-amber-800' },
    { icon: 'users', label: 'Participants', value: 243, color: 'bg-blue-100 text-blue-800' },
    { icon: 'study', label: 'Études analysées', value: 87, color: 'bg-green-100 text-green-800' },
    { icon: 'microscope', label: 'Chercheurs', value: 16, color: 'bg-purple-100 text-purple-800' }
  ],
  className = '',
  animated = true
}: ScientificTrustBadgesProps) => {
  const [animatedValues, setAnimatedValues] = useState<(number | string)[]>(
    badges.map(badge => typeof badge.value === 'number' ? 0 : badge.value)
  );
  
  useEffect(() => {
    if (!animated) {
      setAnimatedValues(badges.map(badge => badge.value));
      return;
    }
    
    const finalValues = badges.map(badge => badge.value);
    const duration = 1500; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      
      const newValues = badges.map((badge, index) => {
        if (typeof badge.value === 'number') {
          // Ease out cubic animation
          const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
          return Math.round(progress * (badge.value as number));
        }
        return badge.value;
      });
      
      setAnimatedValues(newValues);
      
      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);
    
    return () => clearInterval(timer);
  }, [badges, animated]);
  
  const getIcon = (iconType: TrustBadge['icon'], className: string = 'h-4 w-4') => {
    switch (iconType) {
      case 'award':
        return <Award className={className} />;
      case 'users':
        return <Users className={className} />;
      case 'study':
        return <ScrollText className={className} />;
      case 'microscope':
        return <Microscope className={className} />;
      case 'link':
        return <Link className={className} />;
    }
  };
  
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {badges.map((badge, index) => (
        <Badge
          key={index}
          variant="secondary"
          className={`flex items-center gap-1 px-3 py-1.5 ${badge.color || 'bg-indigo-100 text-indigo-800'}`}
        >
          {getIcon(badge.icon)}
          <span className="font-medium">
            {animatedValues[index]}
            {badge.suffix || ''}
          </span>
          <span className="text-xs opacity-80 hidden sm:inline-block"> 
            {badge.label}
          </span>
        </Badge>
      ))}
    </div>
  );
};

export default ScientificTrustBadges;
