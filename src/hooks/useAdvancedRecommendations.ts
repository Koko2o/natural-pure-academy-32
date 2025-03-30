
import { useState, useEffect, useCallback } from 'react';
import { QuizResponse, BehavioralMetrics, Recommendation, NeuroProfile } from '@/utils/types';
import { generateRecommendations, generateRecommendationExplanation } from '@/utils/recommenderSystem';

interface UseAdvancedRecommendationsProps {
  quizResponses: QuizResponse;
  behavioralMetrics: BehavioralMetrics;
  neuroProfile: NeuroProfile;
}

interface UseAdvancedRecommendationsResult {
  recommendations: Recommendation[];
  explanation: string;
  isLoading: boolean;
  isPrioritized: boolean;
  recalculateRecommendations: () => void;
  prioritizeByMetric: (metric: 'scientific' | 'popular' | 'quickEffect') => void;
}

export function useAdvancedRecommendations({
  quizResponses,
  behavioralMetrics,
  neuroProfile
}: UseAdvancedRecommendationsProps): UseAdvancedRecommendationsResult {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPrioritized, setIsPrioritized] = useState<boolean>(false);
  const [priorityMetric, setPriorityMetric] = useState<'scientific' | 'popular' | 'quickEffect' | null>(null);

  // Fonction pour calculer les recommandations
  const calculateRecommendations = useCallback(() => {
    setIsLoading(true);

    // Simuler un délai pour l'effet d'analyse
    setTimeout(() => {
      try {
        // Générer les recommandations de base
        let generatedRecommendations = generateRecommendations(
          quizResponses,
          behavioralMetrics,
          neuroProfile
        );

        // Appliquer la priorisation si nécessaire
        if (priorityMetric) {
          generatedRecommendations = sortRecommendations(generatedRecommendations, priorityMetric);
        }

        // Générer l'explication
        const generatedExplanation = generateRecommendationExplanation(
          generatedRecommendations,
          quizResponses
        );

        setRecommendations(generatedRecommendations);
        setExplanation(generatedExplanation);
        setIsPrioritized(!!priorityMetric);
      } catch (error) {
        console.error('Erreur lors du calcul des recommandations:', error);
        
        // Recommandations par défaut en cas d'erreur
        setRecommendations([
          {
            title: 'Complexe Nutritionnel Standard',
            description: 'Formule équilibrée pour les besoins quotidiens',
            confidence: 0.65,
            benefits: [
              'Soutien nutritionnel général',
              'Équilibre des vitamines et minéraux essentiels'
            ],
            timeToEffect: '3-4 semaines',
            popularity: 60
          }
        ]);
        
        setExplanation("Nous avons préparé une recommandation générale basée sur les informations disponibles. Pour des conseils plus précis, n'hésitez pas à consulter un professionnel de santé.");
      } finally {
        setIsLoading(false);
      }
    }, 1500); // Délai artificiel pour donner l'impression d'analyse approfondie
  }, [quizResponses, behavioralMetrics, neuroProfile, priorityMetric]);

  // Trier les recommandations selon un critère spécifique
  const sortRecommendations = (recs: Recommendation[], metric: 'scientific' | 'popular' | 'quickEffect'): Recommendation[] => {
    switch (metric) {
      case 'scientific':
        return [...recs].sort((a, b) => b.confidence - a.confidence);
      
      case 'popular':
        return [...recs].sort((a, b) => b.popularity - a.popularity);
      
      case 'quickEffect':
        // Convertir les plages de temps en nombres approximatifs de semaines pour le tri
        const getWeeks = (timeToEffect: string): number => {
          const match = timeToEffect.match(/(\d+)-(\d+)\s+(semaines?|jours?|mois)/i);
          if (!match) return 4; // Valeur par défaut
          
          const [_, min, max, unit] = match;
          const avgTime = (parseInt(min) + parseInt(max)) / 2;
          
          if (unit.startsWith('jour')) return avgTime / 7;
          if (unit.startsWith('mois')) return avgTime * 4;
          return avgTime; // semaines
        };
        
        return [...recs].sort((a, b) => getWeeks(a.timeToEffect) - getWeeks(b.timeToEffect));
      
      default:
        return recs;
    }
  };

  // Fonction pour recalculer les recommandations
  const recalculateRecommendations = useCallback(() => {
    calculateRecommendations();
  }, [calculateRecommendations]);

  // Fonction pour prioriser par métrique
  const prioritizeByMetric = useCallback((metric: 'scientific' | 'popular' | 'quickEffect') => {
    setPriorityMetric(metric);
    // Le recalcul sera déclenché par l'effet ci-dessous
  }, []);

  // Calculer les recommandations initiales au montage ou lors des changements de dépendances
  useEffect(() => {
    calculateRecommendations();
  }, [calculateRecommendations]);

  return {
    recommendations,
    explanation,
    isLoading,
    isPrioritized,
    recalculateRecommendations,
    prioritizeByMetric
  };
}
