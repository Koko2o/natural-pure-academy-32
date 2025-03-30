import { 
  SUPPLEMENT_CATALOG, 
} from '../data/supplementCatalog';
import { 
  SYMPTOM_RECOMMENDATIONS, 
  GOAL_RECOMMENDATIONS, 
  LIFESTYLE_RECOMMENDATIONS,
  AGE_FACTORS,
  GENDER_FACTORS,
  SYMPTOM_PRIORITY_FACTORS
} from '../data/recommendationMappings';
import { Recommendation, UserProfile, RecommendationItem, QuizResponse, BehavioralMetrics, NeuroProfile } from '../types/recommendations';
import { 
  analyzeRecommendationPerformance,
  evaluateDataQuality
} from './recommenderSystem';

import { QuizResponse as QuizResponse2, BehavioralMetrics as BehavioralMetrics2, NeuroProfile as NeuroProfile2 } from '../types/quiz';


/**
 * Optimise les recommandations en tenant compte des multiples facteurs
 */
export const optimizeRecommendations = (
  recommendations: RecommendationItem[],
  quizResponses: QuizResponse[],
  behavioralMetrics?: BehavioralMetrics,
  neuroProfile?: NeuroProfile
): RecommendationItem[] => {
  // Si aucune recommandation, retourner un tableau vide
  if (!recommendations || recommendations.length === 0) {
    return [];
  }

  // Copie des recommandations pour ne pas modifier l'original
  const optimizedRecommendations = [...recommendations];

  // Appliquer des ajustements basés sur les facteurs comportementaux
  if (behavioralMetrics && neuroProfile) {
    // Augmenter la priorité des recommandations correspondant au profil neurologique
    optimizedRecommendations.forEach(rec => {
      // Favoriser les recommandations scientifiques pour les profils analytiques
      if (neuroProfile.decisionStyle === 'analytical' && rec.scientificBasis) {
        rec.matchScore = Math.min(100, rec.matchScore + 5);
      }

      // Favoriser les recommandations à effet rapide pour les profils à faible attention
      if (neuroProfile.attentionSpan === 'low' && rec.timeToEffect.includes('rapid')) {
        rec.matchScore = Math.min(100, rec.matchScore + 5);
      }
    });
  }

  // Trier les recommandations optimisées par priorité puis par score de correspondance
  return optimizedRecommendations.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority; // Priorité plus basse (chiffre plus petit) passe en premier
    }
    return b.matchScore - a.matchScore; // Score plus élevé passe en premier
  });
};

/**
 * Génère des explications personnalisées pour chaque recommandation
 */
export const generateExplanation = (
  recommendations: RecommendationItem[],
  quizResponses: QuizResponse[]
): string => {
  if (!recommendations || recommendations.length === 0) {
    return "Aucune recommandation n'a pu être générée avec les informations disponibles.";
  }

  // Extraire les symptômes principaux des réponses au quiz
  const symptomsResponses = quizResponses.find(q => q.category === 'symptoms');
  const symptomsList = symptomsResponses ? Object.entries(symptomsResponses.responses)
    .filter(([_, value]) => value > 3)
    .map(([key]) => key) : [];

  // Générer l'explication principale
  let explanation = "Nos recommandations sont basées sur votre profil de santé unique et vos objectifs. ";

  if (symptomsList.length > 0) {
    explanation += `Nous avons particulièrement pris en compte vos préoccupations concernant: ${symptomsList.join(', ')}. `;
  }

  // Ajouter des détails sur les recommandations principales
  const topRecommendation = recommendations[0];
  if (topRecommendation) {
    explanation += `Notre principale recommandation, ${topRecommendation.name}, a été sélectionnée car elle cible directement vos besoins prioritaires avec un niveau de confiance de ${Math.round(topRecommendation.matchScore)}%. `;
  }

  // Ajouter des informations sur la base scientifique
  const scientificRecommendations = recommendations.filter(r => r.scientificBasis);
  if (scientificRecommendations.length > 0) {
    explanation += `${scientificRecommendations.length} de nos recommandations sont soutenues par des études scientifiques. `;
  }

  return explanation;
};

/**
 * Prédit les futurs besoins potentiels de l'utilisateur
 */
export const predictFutureNeeds = (
  currentRecommendations: RecommendationItem[],
  quizResponses: QuizResponse[]
): RecommendationItem[] => {
  // Extraire les catégories d'intérêt
  const categories = quizResponses.map(q => q.category);
  const futureRecommendations: RecommendationItem[] = [];

  // Chercher des compléments complémentaires qui ne sont pas déjà recommandés
  const currentIds = currentRecommendations.map(r => r.id);

  // Pour chaque catégorie, trouver un complément pertinent
  categories.forEach(category => {
    // Chercher un supplément pour cette catégorie qui n'est pas déjà recommandé
    const potentialSupplements = Object.values(SUPPLEMENT_CATALOG)
      .filter(s => s.categories.includes(category) && !currentIds.includes(s.id))
      .sort((a, b) => b.userRating - a.userRating);

    if (potentialSupplements.length > 0) {
      const supplement = potentialSupplements[0];
      futureRecommendations.push({
        id: supplement.id,
        name: supplement.name,
        description: supplement.description,
        priority: 10, // Priorité basse car c'est une recommandation future
        matchScore: 70,
        benefits: supplement.benefits,
        timeToEffect: supplement.timeToEffect,
        recommendedDose: "Dose standard recommandée",
        confidence: 0.7,
        reason: `Complément supplémentaire qui pourrait être bénéfique à l'avenir`,
        aiExplanations: [`Recommandation future basée sur votre profil ${category}`]
      });
    }
  });

  // Limiter à 3 recommandations futures maximum
  return futureRecommendations.slice(0, 3);
};

// Export des fonctions pour utilisation par d'autres modules
export default {
  optimizeRecommendations,
  generateExplanation,
  predictFutureNeeds
};