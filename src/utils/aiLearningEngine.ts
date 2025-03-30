
/**
 * Moteur d'apprentissage IA avancé pour les recommandations nutritionnelles personnalisées
 */

import { secureStorageService } from './secureStorage';
import { 
  LearningData, 
  AIModelState, 
  QuizResponse, 
  Recommendation,
  UserProfile,
  UserFeedback
} from './types';

// Configuration du moteur d'apprentissage
const AI_LEARNING_CONFIG = {
  MINIMUM_DATA_POINTS: 5,
  LEARNING_RATE: 0.03,
  TRAINING_ITERATIONS: 100,
  SIMILARITY_THRESHOLD: 0.65,
  FEEDBACK_WEIGHT: 1.2,
  FEATURE_IMPORTANCE: {
    age: 0.8,
    gender: 0.6,
    stressLevel: 0.9,
    sleepIssues: 0.85,
    energyLevel: 0.9,
    digestiveIssues: 0.75,
    goals: 0.95,
  }
};

/**
 * Évalue la qualité des données d'apprentissage et retourne un score
 */
export const evaluateDataQuality = (learningData: LearningData[]): number => {
  if (!learningData || learningData.length === 0) return 0;
  
  // Calculer le score de qualité
  let dataQualityScore = 0;
  const totalEntries = learningData.length;
  
  // Facteurs affectant la qualité des données
  const completeProfiles = learningData.filter(entry => 
    entry.userProfile && 
    entry.userProfile.personal && 
    entry.userProfile.personal.age && 
    entry.userProfile.personal.gender
  ).length;
  
  const entriesWithFeedback = learningData.filter(entry => 
    entry.userFeedback && 
    entry.userFeedback.effectivenessRating
  ).length;
  
  const recentEntries = learningData.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return entryDate >= threeMonthsAgo;
  }).length;
  
  // Calculer score pondéré
  dataQualityScore = (
    (completeProfiles / totalEntries) * 0.4 + 
    (entriesWithFeedback / totalEntries) * 0.4 + 
    (recentEntries / totalEntries) * 0.2
  ) * 100;
  
  return Math.min(dataQualityScore, 100);
};

/**
 * Extrait les caractéristiques importantes d'un profil utilisateur pour l'apprentissage
 */
export const extractProfileFeatures = (profile: QuizResponse): Record<string, number> => {
  const features: Record<string, number> = {};
  
  // Caractéristiques personnelles
  if (profile.personal) {
    if (profile.personal.age) {
      const age = parseInt(profile.personal.age);
      features.age = isNaN(age) ? 30 : age;
    }
    
    if (profile.personal.gender) {
      features.genderFactor = profile.personal.gender === 'female' ? 1 : 
                            profile.personal.gender === 'male' ? 0 : 0.5;
    }
  }
  
  // Problèmes de santé
  if (profile.healthConcerns) {
    const stressLevelMap: Record<string, number> = {
      'low': 0.2,
      'medium': 0.5,
      'high': 0.8,
      'very_high': 1
    };
    
    features.stressLevel = profile.healthConcerns.stressLevel ? 
      stressLevelMap[profile.healthConcerns.stressLevel] || 0.5 : 0.5;
      
    features.sleepIssues = profile.healthConcerns.sleepIssues === 'yes' ? 1 : 
                        profile.healthConcerns.sleepIssues === 'sometimes' ? 0.5 : 0;
                        
    features.energyLevel = profile.healthConcerns.energyLevel === 'low' ? 0.8 : 
                        profile.healthConcerns.energyLevel === 'medium' ? 0.5 : 0.2;
                        
    features.digestiveIssues = profile.healthConcerns.digestiveIssues === 'yes' ? 1 : 
                           profile.healthConcerns.digestiveIssues === 'sometimes' ? 0.5 : 0;
  }
  
  // Objectifs
  if (profile.goals) {
    features.weightLossGoal = profile.goals.weightLoss ? 1 : 0;
    features.energyGoal = profile.goals.increaseEnergy ? 1 : 0;
    features.focusGoal = profile.goals.improveFocus ? 1 : 0;
    features.digestiveGoal = profile.goals.improveDigestion ? 1 : 0;
    features.stressGoal = profile.goals.reduceStress ? 1 : 0;
  }
  
  return features;
};

/**
 * Calcule la similarité entre deux profils d'utilisateurs
 */
export const calculateProfileSimilarity = (profileA: Record<string, number>, profileB: Record<string, number>): number => {
  const commonKeys = Object.keys(profileA).filter(key => profileB.hasOwnProperty(key));
  
  if (commonKeys.length === 0) return 0;
  
  let similarityScore = 0;
  let totalWeight = 0;
  
  commonKeys.forEach(key => {
    const weight = AI_LEARNING_CONFIG.FEATURE_IMPORTANCE[key] || 0.5;
    const diff = Math.abs(profileA[key] - profileB[key]);
    const featureSimilarity = 1 - (diff / 1); // Normaliser à une échelle de 0-1
    
    similarityScore += featureSimilarity * weight;
    totalWeight += weight;
  });
  
  return totalWeight > 0 ? similarityScore / totalWeight : 0;
};

/**
 * Trouve les profils les plus similaires dans les données d'apprentissage
 */
export const findSimilarProfiles = (
  currentProfile: QuizResponse, 
  learningData: LearningData[],
  limit: number = 5
): LearningData[] => {
  if (!learningData || learningData.length === 0) return [];
  
  const currentFeatures = extractProfileFeatures(currentProfile);
  
  const profilesWithSimilarity = learningData.map(data => {
    const profileFeatures = extractProfileFeatures(data.userProfile);
    const similarity = calculateProfileSimilarity(currentFeatures, profileFeatures);
    return { data, similarity };
  });
  
  // Filtrer par seuil de similarité minimale et trier par similarité
  return profilesWithSimilarity
    .filter(item => item.similarity >= AI_LEARNING_CONFIG.SIMILARITY_THRESHOLD)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map(item => item.data);
};

/**
 * Ajuste les recommandations basées sur les données d'apprentissage
 */
export const adjustRecommendationsWithLearning = (
  recommendations: Recommendation[],
  quizResponse: QuizResponse
): Recommendation[] => {
  // Récupérer les données d'apprentissage existantes
  const learningData: LearningData[] = secureStorageService.getItem('ai_learning_data') || [];
  
  // Si pas assez de données, retourner les recommandations d'origine
  if (learningData.length < AI_LEARNING_CONFIG.MINIMUM_DATA_POINTS) {
    console.log("Données d'apprentissage insuffisantes pour ajuster les recommandations");
    return recommendations;
  }
  
  // Trouver les profils similaires
  const similarProfiles = findSimilarProfiles(quizResponse, learningData);
  
  if (similarProfiles.length === 0) {
    console.log("Aucun profil similaire trouvé dans les données d'apprentissage");
    return recommendations;
  }
  
  // Collecter les retours d'utilisateurs sur des recommandations similaires
  const recommendationScores: Record<string, { count: number, score: number }> = {};
  
  similarProfiles.forEach(profile => {
    if (!profile.userFeedback || !profile.recommendations) return;
    
    profile.recommendations.forEach((rec: Recommendation) => {
      if (profile.userFeedback && profile.userFeedback.effectivenessRating) {
        const feedbackRating = profile.userFeedback.effectivenessRating;
        
        if (!recommendationScores[rec.id]) {
          recommendationScores[rec.id] = { count: 0, score: 0 };
        }
        
        recommendationScores[rec.id].count += 1;
        recommendationScores[rec.id].score += feedbackRating;
      }
    });
  });
  
  // Ajuster les scores de correspondance des recommandations
  return recommendations.map(rec => {
    const adjustedRec = { ...rec };
    
    if (recommendationScores[rec.id]) {
      const avgScore = recommendationScores[rec.id].score / recommendationScores[rec.id].count;
      const learningFactor = avgScore * AI_LEARNING_CONFIG.FEEDBACK_WEIGHT;
      
      // Ajuster le score de correspondance
      adjustedRec.matchScore = rec.matchScore 
        ? Math.min(100, rec.matchScore * (1 + (learningFactor - 0.5) * 0.4))
        : 50 + (avgScore * 10);
        
      // Ajouter des métadonnées sur l'ajustement par IA
      adjustedRec.aiAdjusted = true;
      adjustedRec.aiConfidence = Math.min(recommendationScores[rec.id].count / 5, 1) * 100;
      adjustedRec.similarProfilesCount = recommendationScores[rec.id].count;
      
      // Ajuster la raison pour indiquer l'apprentissage IA
      if (adjustedRec.aiConfidence > 50) {
        adjustedRec.reason = `${adjustedRec.reason} (Validé par IA sur ${adjustedRec.similarProfilesCount} profils similaires)`;
      }
    }
    
    return adjustedRec;
  })
  .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
};

/**
 * Enregistre les données d'apprentissage pour amélioration future
 */
export const saveLearningData = (
  userProfile: QuizResponse,
  recommendations: Recommendation[],
  userFeedback?: UserFeedback
): void => {
  try {
    // Récupérer les données existantes
    const existingData: LearningData[] = secureStorageService.getItem('ai_learning_data') || [];
    
    // Créer une nouvelle entrée
    const newEntry: LearningData = {
      id: `learn_${Date.now()}`,
      timestamp: new Date().toISOString(),
      userProfile,
      recommendations,
      userFeedback,
      modelVersion: secureStorageService.getItem('ai_model_version') || '1.0.0'
    };
    
    // Ajouter aux données existantes
    const updatedData = [...existingData, newEntry];
    
    // Limiter la taille des données (garder les 1000 entrées les plus récentes)
    const trimmedData = updatedData.slice(-1000);
    
    // Sauvegarder
    secureStorageService.setItem('ai_learning_data', trimmedData);
    
    // Enregistrer l'historique d'entraînement
    const trainingHistory = secureStorageService.getItem('ai_training_history') || [];
    trainingHistory.push({
      date: new Date().toISOString(),
      dataPoints: trimmedData.length,
      modelVersion: newEntry.modelVersion
    });
    secureStorageService.setItem('ai_training_history', trainingHistory);
    
    console.log("Données d'apprentissage IA enregistrées avec succès");
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données d'apprentissage:", error);
  }
};

/**
 * Retourne le statut actuel du moteur d'apprentissage IA
 */
export const getAILearningStatus = (): {
  isActive: boolean;
  dataQuality: number;
  dataPoints: number;
  lastTrainingDate: string | null;
  modelVersion: string;
  topPerformingRecommendations: string[];
} => {
  // Récupérer les données
  const learningData: LearningData[] = secureStorageService.getItem('ai_learning_data') || [];
  const trainingHistory = secureStorageService.getItem('ai_training_history') || [];
  
  // Évaluer la qualité des données
  const dataQuality = evaluateDataQuality(learningData);
  
  // Trouver les recommandations les plus performantes
  const recommendationPerformance: Record<string, { count: number, totalRating: number }> = {};
  
  learningData.forEach(entry => {
    if (!entry.recommendations || !entry.userFeedback || !entry.userFeedback.effectivenessRating) return;
    
    entry.recommendations.forEach(rec => {
      if (!recommendationPerformance[rec.name]) {
        recommendationPerformance[rec.name] = { count: 0, totalRating: 0 };
      }
      
      recommendationPerformance[rec.name].count += 1;
      recommendationPerformance[rec.name].totalRating += entry.userFeedback?.effectivenessRating || 0;
    });
  });
  
  // Trier par performance moyenne et prendre les 5 meilleures
  const topRecommendations = Object.entries(recommendationPerformance)
    .map(([name, data]) => ({ name, avgRating: data.totalRating / data.count }))
    .filter(item => !isNaN(item.avgRating))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 5)
    .map(item => item.name);
  
  return {
    isActive: learningData.length >= AI_LEARNING_CONFIG.MINIMUM_DATA_POINTS,
    dataQuality,
    dataPoints: learningData.length,
    lastTrainingDate: trainingHistory.length > 0 ? trainingHistory[trainingHistory.length - 1].date : null,
    modelVersion: secureStorageService.getItem('ai_model_version') || '1.0.0',
    topPerformingRecommendations: topRecommendations
  };
};
