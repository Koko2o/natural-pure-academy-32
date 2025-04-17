
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import ScientificHighlightedText from '../ScientificHighlightedText';
import { useLanguage } from '../../contexts/LanguageContext';

interface Problem {
  title: string;
  description: string;
  color: string;
}

interface ProblemRotatorProps {
  problems?: Problem[];
  interval?: number;
  className?: string;
}

const ProblemRotator = ({
  problems,
  interval = 4000,
  className = ""
}: ProblemRotatorProps) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const defaultProblems = [
    {
      title: t('problem_stress_title', 'Stress Chronique'),
      description: t('problem_stress_desc', 'Identifiez les [[cortisol:micronutriments]] qui vous manquent réellement'),
      color: "from-red-500 to-orange-500"
    },
    {
      title: t('problem_sleep_title', 'Troubles du Sommeil'),
      description: t('problem_sleep_desc', 'Découvrez les [[circadian-rhythm:solutions naturelles]] validées scientifiquement'),
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: t('problem_fatigue_title', 'Fatigue Persistante'),
      description: t('problem_fatigue_desc', 'Révélez les causes profondes validées par notre [[adaptogens:laboratoire]]'),
      color: "from-amber-500 to-orange-600"
    },
    {
      title: t('problem_digestive_title', 'Problèmes Digestifs'),
      description: t('problem_digestive_desc', 'Révélez les causes des [[microbiome:troubles digestifs]] validées par notre laboratoire'),
      color: "from-green-500 to-teal-600"
    }
  ];
  
  const displayProblems = problems || defaultProblems;
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % displayProblems.length);
        setIsTransitioning(false);
      }, 500); // Transition time
    }, interval);
    
    return () => clearInterval(timer);
  }, [interval, displayProblems.length]);
  
  const currentProblem = displayProblems[currentIndex];
  
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        aria-live="polite"
      >
        <div className="space-y-3">
          <div className="inline-flex items-center bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-white mr-2" aria-hidden="true" />
            <span className="text-white text-sm font-medium">{t('health_problem_label', 'Problème de santé fréquent')}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            <span className="inline-block bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              {currentProblem.title}
            </span>
          </h2>
          
          <p className="text-white/90 text-lg max-w-xl">
            <ScientificHighlightedText text={currentProblem.description} />
          </p>
        </div>
      </div>
      
      <div className="flex mt-4 space-x-2" aria-hidden="true">
        {displayProblems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
            aria-label={`${t('view_problem', 'Voir problème')} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProblemRotator;
