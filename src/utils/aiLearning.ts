
import { LearningData, QuizResponse, Recommendation } from './types';

// Base de données d'apprentissage (sera remplacée par une base de données réelle)
let learningDatabase: LearningData[] = [];

/**
 * Collecte les données d'apprentissage à partir des interactions utilisateur
 */
export function collectUserData(
  quizData: QuizResponse,
  selectedRecommendation: string,
  userFeedback: { helpful: boolean; purchaseIntent: number; comments?: string }
): void {
  const learningEntry: LearningData = {
    timestamp: new Date().toISOString(),
    quizData,
    recommendationId: selectedRecommendation,
    userFeedback: {
      helpful: userFeedback.helpful,
      purchaseIntent: userFeedback.purchaseIntent,
      additionalComments: userFeedback.comments
    },
    sessionInfo: {
      browser: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  };

  // Ajouter à la base de données locale (à terme, envoyer à un serveur)
  learningDatabase.push(learningEntry);
  console.log('[AI Learning] Nouvelles données collectées:', learningEntry);
  
  // Stocker dans localStorage pour persistance
  localStorage.setItem('aiLearningData', JSON.stringify(learningDatabase));
}

/**
 * Charge les données d'apprentissage précédemment sauvegardées
 */
export function loadLearningData(): void {
  const savedData = localStorage.getItem('aiLearningData');
  if (savedData) {
    try {
      learningDatabase = JSON.parse(savedData);
      console.log(`[AI Learning] ${learningDatabase.length} entrées chargées`);
    } catch (error) {
      console.error('[AI Learning] Erreur lors du chargement des données:', error);
    }
  }
}

/**
 * Calcule les statistiques de base sur les données d'apprentissage
 */
export function getBasicLearningStats() {
  if (learningDatabase.length === 0) {
    return {
      totalEntries: 0,
      recommendationEffectiveness: 0,
      averagePurchaseIntent: 0,
      mostCommonSymptoms: []
    };
  }

  // Taux de recommandations utiles
  const helpfulCount = learningDatabase.filter(
    entry => entry.userFeedback.helpful
  ).length;
  const recommendationEffectiveness = (helpfulCount / learningDatabase.length) * 100;

  // Intention d'achat moyenne
  const averagePurchaseIntent = learningDatabase.reduce(
    (acc, entry) => acc + entry.userFeedback.purchaseIntent, 
    0
  ) / learningDatabase.length;

  // Analyse des symptômes les plus courants (exemple simplifié)
  const symptomsCount: Record<string, number> = {};
  
  learningDatabase.forEach(entry => {
    const symptoms = entry.quizData.healthConcerns || [];
    symptoms.forEach(symptom => {
      symptomsCount[symptom] = (symptomsCount[symptom] || 0) + 1;
    });
  });

  const mostCommonSymptoms = Object.entries(symptomsCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([symptom, count]) => ({ symptom, count }));

  return {
    totalEntries: learningDatabase.length,
    recommendationEffectiveness,
    averagePurchaseIntent,
    mostCommonSymptoms
  };
}

// Initialiser au chargement du module
loadLearningData();
