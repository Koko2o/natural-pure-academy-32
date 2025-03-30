
import { QuizResponse, Recommendation, LearningData } from './types';

/**
 * Simple modèle basé sur des règles
 * C'est le point de départ le plus simple pour un système de recommandation
 */
export function ruleBasedModel(quizData: QuizResponse): { recommendationIds: string[], confidences: number[] } {
  const { age, gender, dietaryPreferences, healthConcerns, goals } = quizData;
  
  // Tableau de scores pour chaque produit
  const productScores: Record<string, number> = {};
  
  // Exemple de règles simples
  if (healthConcerns?.includes('stress')) {
    productScores['stress-relief-complex'] = (productScores['stress-relief-complex'] || 0) + 0.8;
    productScores['magnesium-complex'] = (productScores['magnesium-complex'] || 0) + 0.6;
    productScores['vitamin-b-complex'] = (productScores['vitamin-b-complex'] || 0) + 0.5;
  }
  
  if (healthConcerns?.includes('fatigue')) {
    productScores['iron-complex'] = (productScores['iron-complex'] || 0) + 0.7;
    productScores['vitamin-b-complex'] = (productScores['vitamin-b-complex'] || 0) + 0.7;
    productScores['coq10-supplement'] = (productScores['coq10-supplement'] || 0) + 0.6;
  }
  
  if (healthConcerns?.includes('sleep')) {
    productScores['melatonin-supplement'] = (productScores['melatonin-supplement'] || 0) + 0.9;
    productScores['magnesium-complex'] = (productScores['magnesium-complex'] || 0) + 0.5;
    productScores['herbal-sleep-formula'] = (productScores['herbal-sleep-formula'] || 0) + 0.8;
  }
  
  if (goals?.includes('weight-loss')) {
    productScores['metabolism-support'] = (productScores['metabolism-support'] || 0) + 0.7;
    productScores['fiber-supplement'] = (productScores['fiber-supplement'] || 0) + 0.6;
  }
  
  if (goals?.includes('focus')) {
    productScores['omega-3-complex'] = (productScores['omega-3-complex'] || 0) + 0.7;
    productScores['nootropic-complex'] = (productScores['nootropic-complex'] || 0) + 0.8;
  }
  
  // Ajustements en fonction du régime alimentaire
  if (dietaryPreferences?.includes('vegetarian')) {
    // Réduire le score des produits non-végétariens
    productScores['omega-3-fish-oil'] = (productScores['omega-3-fish-oil'] || 0) - 1.0;
    // Augmenter le score des alternatives végétariennes
    productScores['omega-3-algae'] = (productScores['omega-3-algae'] || 0) + 0.8;
  }
  
  // Transformation en tableaux triés
  const sortedProducts = Object.entries(productScores)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, score]) => score > 0);
  
  const recommendationIds = sortedProducts.map(([id, _]) => id);
  const confidences = sortedProducts.map(([_, score]) => Math.min(score, 1.0));
  
  return { recommendationIds, confidences };
}

/**
 * Modèle collaboratif simple
 * Se base sur les comportements similaires d'autres utilisateurs
 */
export function collaborativeFilteringModel(
  quizData: QuizResponse, 
  learningDatabase: LearningData[]
): { recommendationIds: string[], confidences: number[] } {
  // Si nous n'avons pas assez de données, retour au modèle basé sur des règles
  if (learningDatabase.length < 10) {
    return ruleBasedModel(quizData);
  }
  
  // Trouver des profils similaires
  const similarProfiles = findSimilarProfiles(quizData, learningDatabase);
  
  // Si aucun profil similaire, retour au modèle basé sur des règles
  if (similarProfiles.length === 0) {
    return ruleBasedModel(quizData);
  }
  
  // Collecter les recommandations qui ont bien fonctionné pour des profils similaires
  const recommendationScores: Record<string, { score: number, count: number }> = {};
  
  similarProfiles.forEach(profile => {
    const { recommendationId, userFeedback, similarity } = profile;
    
    // Ignorer les feedbacks négatifs
    if (!userFeedback.helpful) return;
    
    // Pondérer par la similarité et l'intention d'achat
    const weightedScore = similarity * (userFeedback.purchaseIntent / 10);
    
    if (!recommendationScores[recommendationId]) {
      recommendationScores[recommendationId] = { score: 0, count: 0 };
    }
    
    recommendationScores[recommendationId].score += weightedScore;
    recommendationScores[recommendationId].count += 1;
  });
  
  // Calculer les scores moyens
  const avgScores = Object.entries(recommendationScores).map(([id, data]) => {
    return {
      id,
      avgScore: data.count > 0 ? data.score / data.count : 0
    };
  });
  
  // Trier par score
  avgScores.sort((a, b) => b.avgScore - a.avgScore);
  
  const recommendationIds = avgScores.map(item => item.id);
  const confidences = avgScores.map(item => Math.min(item.avgScore, 1.0));
  
  return { recommendationIds, confidences };
}

/**
 * Fonction utilitaire pour trouver des profils similaires
 */
function findSimilarProfiles(
  quizData: QuizResponse,
  learningDatabase: LearningData[]
): Array<{ recommendationId: string, userFeedback: any, similarity: number }> {
  return learningDatabase.map(entry => {
    const similarity = calculateProfileSimilarity(quizData, entry.quizData);
    
    return {
      recommendationId: entry.recommendationId,
      userFeedback: entry.userFeedback,
      similarity
    };
  })
  // Filtrer uniquement les profils suffisamment similaires
  .filter(profile => profile.similarity > 0.5)
  // Trier par similarité décroissante
  .sort((a, b) => b.similarity - a.similarity);
}

/**
 * Fonction utilitaire pour calculer la similarité entre deux profils
 */
function calculateProfileSimilarity(profile1: QuizResponse, profile2: QuizResponse): number {
  let score = 0;
  let factors = 0;
  
  // Comparaison des préoccupations de santé
  const healthConcerns1 = profile1.healthConcerns || [];
  const healthConcerns2 = profile2.healthConcerns || [];
  
  if (healthConcerns1.length > 0 && healthConcerns2.length > 0) {
    const commonConcerns = healthConcerns1.filter(item => 
      healthConcerns2.includes(item)
    ).length;
    
    const unionLength = new Set([...healthConcerns1, ...healthConcerns2]).size;
    score += unionLength > 0 ? commonConcerns / unionLength : 0;
    factors += 1;
  }
  
  // Comparaison des objectifs
  const goals1 = profile1.goals || [];
  const goals2 = profile2.goals || [];
  
  if (goals1.length > 0 && goals2.length > 0) {
    const commonGoals = goals1.filter(item => 
      goals2.includes(item)
    ).length;
    
    const unionLength = new Set([...goals1, ...goals2]).size;
    score += unionLength > 0 ? commonGoals / unionLength : 0;
    factors += 1;
  }
  
  // Comparaison des préférences alimentaires
  const diet1 = profile1.dietaryPreferences || [];
  const diet2 = profile2.dietaryPreferences || [];
  
  if (diet1.length > 0 && diet2.length > 0) {
    const commonDiet = diet1.filter(item => 
      diet2.includes(item)
    ).length;
    
    const unionLength = new Set([...diet1, ...diet2]).size;
    score += unionLength > 0 ? commonDiet / unionLength : 0;
    factors += 1;
  }
  
  // Similarité d'âge (utilisation d'une fonction gaussienne)
  if (profile1.age && profile2.age) {
    const ageDiff = Math.abs(profile1.age - profile2.age);
    // Plus la différence est petite, plus le score est élevé
    // Une différence de 10 ans donne un score de 0.5
    score += Math.exp(-Math.pow(ageDiff / 10, 2));
    factors += 1;
  }
  
  // Même genre
  if (profile1.gender && profile2.gender && profile1.gender === profile2.gender) {
    score += 1;
    factors += 1;
  }
  
  // Calcul du score final
  return factors > 0 ? score / factors : 0;
}

/**
 * Fonction hybride qui combine plusieurs modèles
 */
export function hybridRecommenderModel(
  quizData: QuizResponse,
  learningDatabase: LearningData[]
): { recommendationIds: string[], confidences: number[] } {
  // Obtenir les recommandations du modèle basé sur des règles
  const ruleBasedResults = ruleBasedModel(quizData);
  
  // Si nous avons suffisamment de données, obtenir également les recommandations du modèle collaboratif
  if (learningDatabase.length >= 10) {
    const collaborativeResults = collaborativeFilteringModel(quizData, learningDatabase);
    
    // Fusionner les résultats avec une pondération
    // Au début, on fait plus confiance au modèle basé sur des règles
    // À mesure que la base d'apprentissage grandit, on fait plus confiance au modèle collaboratif
    const weight = Math.min(0.8, 0.3 + (learningDatabase.length / 100) * 0.5);
    
    // Créer un set de toutes les recommandations uniques
    const allRecommendationIds = [
      ...new Set([...ruleBasedResults.recommendationIds, ...collaborativeResults.recommendationIds])
    ];
    
    // Calculer les scores combinés
    const combinedScores = allRecommendationIds.map(id => {
      const ruleBasedIndex = ruleBasedResults.recommendationIds.indexOf(id);
      const collaborativeIndex = collaborativeResults.recommendationIds.indexOf(id);
      
      const ruleBasedScore = ruleBasedIndex >= 0 ? ruleBasedResults.confidences[ruleBasedIndex] : 0;
      const collaborativeScore = collaborativeIndex >= 0 ? collaborativeResults.confidences[collaborativeIndex] : 0;
      
      // Score pondéré
      const combinedScore = (ruleBasedScore * (1 - weight)) + (collaborativeScore * weight);
      
      return { id, score: combinedScore };
    });
    
    // Trier et retourner les résultats
    combinedScores.sort((a, b) => b.score - a.score);
    
    return {
      recommendationIds: combinedScores.map(item => item.id),
      confidences: combinedScores.map(item => item.score)
    };
  }
  
  // Si pas assez de données, utiliser uniquement le modèle basé sur des règles
  return ruleBasedResults;
}
