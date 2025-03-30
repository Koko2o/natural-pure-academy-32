
/**
 * Système de recommandation optimisé
 * Ce module améliore les algorithmes d'IA pour fournir des recommandations plus précises
 */

import { QuizResponse, Recommendation, BehavioralMetrics, NeuroProfile } from '../types/aiTypes';
import { findSimilarProfiles } from './userSimilarity';
import { saveLearningData } from './aiLearningEngine';
import { SUPPLEMENT_CATALOG } from '../data/supplementCatalog';
import { secureStorageService } from './secureStorage';

/**
 * Applique des techniques d'optimisation avancées pour améliorer les recommandations
 * @param recommendations Liste initiale de recommandations
 * @param quizResponses Réponses du quiz
 * @param behavioralMetrics Métriques comportementales
 * @param neuroProfile Profil neurologique
 * @returns Liste de recommandations optimisée
 */
export const optimizeRecommendations = (
  recommendations: Recommendation[],
  quizResponses: QuizResponse,
  behavioralMetrics?: BehavioralMetrics,
  neuroProfile?: NeuroProfile
): Recommendation[] => {
  try {
    // Récupérer l'historique des recommandations
    const learningData = secureStorageService.getItem('aiLearningData') || [];
    
    // Copier les recommandations pour ne pas modifier l'original
    const optimizedRecommendations = [...recommendations];
    
    // 1. Amélioration basée sur le feedback historique
    if (learningData.length > 0) {
      // Créer un map de scores moyens pour chaque supplément
      const supplementScores: Record<string, { totalScore: number; count: number }> = {};
      
      // Calculer les scores moyens basés sur le feedback passé
      learningData.forEach(entry => {
        entry.userFeedback?.forEach(feedback => {
          if (!supplementScores[feedback.recommendationId]) {
            supplementScores[feedback.recommendationId] = { totalScore: 0, count: 0 };
          }
          supplementScores[feedback.recommendationId].totalScore += feedback.rating;
          supplementScores[feedback.recommendationId].count += 1;
        });
      });
      
      // Ajuster les scores de confiance en fonction du feedback historique
      optimizedRecommendations.forEach(rec => {
        const scoreData = supplementScores[rec.id];
        if (scoreData && scoreData.count >= 3) {
          const averageScore = scoreData.totalScore / scoreData.count;
          
          // Ajuster le score de confiance (max 20% d'influence)
          const adjustmentFactor = (averageScore / 5) * 0.2;
          rec.matchScore = Math.min(1, rec.matchScore * (1 + adjustmentFactor));
        }
      });
    }
    
    // 2. Prendre en compte le profil neurologique
    if (neuroProfile) {
      optimizedRecommendations.forEach(rec => {
        const supplement = SUPPLEMENT_CATALOG[rec.id];
        
        // Si l'utilisateur a un style analytique, favoriser les suppléments avec des études
        if (neuroProfile.decisionStyle === 'analytical' && supplement?.scientificEvidence) {
          rec.matchScore = Math.min(1, rec.matchScore * 1.15);
        }
        
        // Si l'utilisateur a un faible niveau d'attention, favoriser les suppléments à posologie simple
        if (neuroProfile.attentionLevel < 0.4 && supplement?.easyToUse) {
          rec.matchScore = Math.min(1, rec.matchScore * 1.1);
        }
      });
    }
    
    // 3. Utiliser des facteurs contextuels pour l'optimisation
    if (quizResponses.contextualFactors) {
      const { season, location } = quizResponses.contextualFactors;
      
      // Adaptation saisonnière
      if (season === 'winter') {
        // Favoriser la vitamine D en hiver
        const vitaminDSupplements = optimizedRecommendations.filter(rec => 
          SUPPLEMENT_CATALOG[rec.id]?.categories?.includes('vitamin_d')
        );
        
        vitaminDSupplements.forEach(rec => {
          rec.matchScore = Math.min(1, rec.matchScore * 1.2);
        });
      }
      
      // Adaptation géographique
      if (location && location.climate === 'tropical') {
        // Réduire l'importance des suppléments sensibles à la chaleur
        const heatSensitiveSupplements = optimizedRecommendations.filter(rec => 
          SUPPLEMENT_CATALOG[rec.id]?.heatSensitive
        );
        
        heatSensitiveSupplements.forEach(rec => {
          rec.matchScore *= 0.8;
        });
      }
    }
    
    // 4. Re-trier les recommandations en fonction des scores ajustés
    optimizedRecommendations.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return b.matchScore - a.matchScore;
    });
    
    return optimizedRecommendations;
  } catch (error) {
    console.error("Erreur lors de l'optimisation des recommandations:", error);
    return recommendations; // Retourner les recommandations non optimisées en cas d'erreur
  }
};

/**
 * Version améliorée du générateur de recommandations
 * @param quizResponses Réponses au quiz
 * @param behavioralMetrics Métriques comportementales
 * @param neuroProfile Profil neurologique
 * @returns Liste de recommandations optimisée
 */
export const generateOptimizedRecommendations = (
  quizResponses: QuizResponse,
  behavioralMetrics?: BehavioralMetrics,
  neuroProfile?: NeuroProfile
): Recommendation[] => {
  try {
    // Import dynamique pour éviter les dépendances circulaires
    const { generateRecommendations } = require('./recommenderSystem');
    
    // Obtenir les recommandations de base
    const baseRecommendations = generateRecommendations(quizResponses);
    
    // Appliquer les optimisations
    const optimizedRecommendations = optimizeRecommendations(
      baseRecommendations,
      quizResponses,
      behavioralMetrics,
      neuroProfile
    );
    
    // Enregistrer les données pour l'apprentissage futur
    saveLearningData(quizResponses, optimizedRecommendations, behavioralMetrics, neuroProfile);
    
    return optimizedRecommendations;
  } catch (error) {
    console.error("Erreur lors de la génération des recommandations optimisées:", error);
    
    // Import dynamique pour éviter les dépendances circulaires
    const { generateRecommendations } = require('./recommenderSystem');
    return generateRecommendations(quizResponses);
  }
};

export default {
  optimizeRecommendations,
  generateOptimizedRecommendations
};
