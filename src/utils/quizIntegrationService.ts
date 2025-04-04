
/**
 * Service d'intégration du système de recommandation au quiz nutritionnel
 * Ce service connecte l'algorithme de recommandation aux réponses du quiz
 * et génère des recommandations personnalisées
 */

import SUPPLEMENT_CATALOG from '@/data/supplementCatalog';
import { QuizData, Recommendation } from '@/utils/types';
import { SYMPTOM_RECOMMENDATIONS, GOAL_RECOMMENDATIONS } from '@/data/recommendationMappings';

// Convertir les données du quiz en format exploitable
const enrichQuizData = (quizData: QuizData) => {
  // Copier les données de base
  const enrichedData = { ...quizData };
  
  // Ajouter des catégories de santé basées sur les symptômes
  const healthCategories: string[] = [];
  
  if (quizData.symptoms?.includes('Fatigue')) {
    healthCategories.push('energy_issues');
  }
  
  if (quizData.symptoms?.includes('Troubles du sommeil')) {
    healthCategories.push('sleep_issues');
  }
  
  if (quizData.symptoms?.includes('Stress') || quizData.symptoms?.includes('Anxiété')) {
    healthCategories.push('stress_issues');
  }
  
  if (quizData.symptoms?.includes('Problèmes digestifs')) {
    healthCategories.push('digestive_issues');
  }
  
  // Ajouter les catégories au data enrichi
  return {
    ...enrichedData,
    healthCategories
  };
};

// Obtenir des recommandations personnalisées basées sur les réponses au quiz
const getPersonalizedRecommendations = (enrichedQuizData: any): Recommendation[] => {
  console.log("Génération de recommandations complètes avec les données:", enrichedQuizData);
  
  // Tableau pour stocker toutes les recommandations candidates
  const recommendationCandidates: any[] = [];
  
  // Traiter les symptômes
  if (enrichedQuizData.symptoms && enrichedQuizData.symptoms.length > 0) {
    console.log("Analyse des données du quiz pour les recommandations:", enrichedQuizData);
    
    enrichedQuizData.symptoms.forEach((symptom: string) => {
      // Récupérer les recommandations liées aux symptômes depuis les mappings
      const symptomRecs = SYMPTOM_RECOMMENDATIONS[symptom] || [];
      
      symptomRecs.forEach((recId: string) => {
        const supplement = SUPPLEMENT_CATALOG[recId];
        
        if (supplement) {
          recommendationCandidates.push({
            id: recId,
            title: supplement.name,
            description: supplement.description,
            scientificBasis: supplement.scientificBasis,
            relevanceScore: 0.6 + Math.random() * 0.3, // Score de base + facteur aléatoire
            categories: supplement.categories || ['nutrition'],
            relatedTerms: []
          });
        }
      });
    });
  }
  
  // Traiter les objectifs
  if (enrichedQuizData.objectives && enrichedQuizData.objectives.length > 0) {
    enrichedQuizData.objectives.forEach((objective: string) => {
      // Récupérer les recommandations liées aux objectifs depuis les mappings
      const goalRecs = GOAL_RECOMMENDATIONS[objective] || [];
      
      goalRecs.forEach((recId: string) => {
        const supplement = SUPPLEMENT_CATALOG[recId];
        
        if (supplement) {
          recommendationCandidates.push({
            id: recId,
            title: supplement.name,
            description: supplement.description,
            scientificBasis: supplement.scientificBasis,
            relevanceScore: 0.7 + Math.random() * 0.3, // Score légèrement plus élevé pour les objectifs
            categories: supplement.categories || ['nutrition'],
            relatedTerms: []
          });
        }
      });
    });
  }
  
  // Éliminer les doublons en conservant celui avec le score de pertinence le plus élevé
  const uniqueRecommendations = recommendationCandidates.reduce((acc: any[], current: any) => {
    const duplicate = acc.find(item => item.id === current.id);
    
    if (!duplicate) {
      return [...acc, current];
    } else if (duplicate.relevanceScore < current.relevanceScore) {
      return acc.map(item => item.id === current.id ? current : item);
    }
    return acc;
  }, []);
  
  // Enrichir les descriptions avec du texte scientifique
  const enrichedRecommendations = uniqueRecommendations.map((rec: any) => {
    // Ajouter des balises pour le traitement des termes scientifiques
    let enrichedDescription = rec.description;
    
    // Si la description ne contient pas déjà de balises scientifiques
    if (!enrichedDescription.includes('[[')) {
      // Exemples de termes scientifiques à mettre en évidence
      const termPairs = [
        ['vitamine D', 'vitamin-d'],
        ['antioxydants', 'antioxidant'],
        ['inflammation', 'inflammation'],
        ['magnésium', 'magnesium'],
        ['probiotiques', 'probiotics'],
        ['oméga-3', 'omega3']
      ];
      
      // Rechercher et remplacer les termes scientifiques
      termPairs.forEach(([term, tag]) => {
        const regex = new RegExp(`\\b${term}\\b`, 'i');
        if (regex.test(enrichedDescription)) {
          enrichedDescription = enrichedDescription.replace(
            regex, 
            `[[${tag}:${term}]]`
          );
        }
      });
    }
    
    return {
      ...rec,
      description: enrichedDescription
    };
  });
  
  // Trier par score de pertinence et limiter à 5 recommandations
  const finalRecommendations = enrichedRecommendations
    .sort((a: any, b: any) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5);
  
  console.log("Recommandations de base générées:", finalRecommendations.length);
  console.log("Recommandations enrichies générées:", finalRecommendations.length);
  
  return finalRecommendations;
};

// Exporter les fonctions du service
export default {
  enrichQuizData,
  getPersonalizedRecommendations
};
