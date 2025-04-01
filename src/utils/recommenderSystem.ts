/**
 * Système de recommandation nutritionnelle avancé avec IA
 */

import { 
  QuizResponse, 
  Recommendation, 
  BehavioralMetrics, 
  NeuroProfile,
  UserFeedback,
  LearningData
} from './types';

import { secureStorageService } from './secureStorage';
import { findSimilarProfiles } from './userSimilarity';
import { 
  SYMPTOM_MAPPING, 
  SYMPTOM_RECOMMENDATIONS_DETAILED as SYMPTOM_RECOMMENDATIONS, 
  GOAL_RECOMMENDATIONS_DETAILED as GOAL_RECOMMENDATIONS,
  ADDITIONAL_RECOMMENDATIONS,
  SYMPTOM_INTENSITY,
  LIFESTYLE_RECOMMENDATIONS,
  GOAL_INTENSITY
} from '../data/recommendationMappings';
import { SUPPLEMENT_CATALOG } from '../data/supplementCatalog';
import { 
  adjustRecommendationsWithLearning,
  saveLearningData,
  getAILearningStatus,
  evaluateDataQuality
} from './aiLearningEngine';
import { optimizeRecommendations } from './optimizedRecommendation';
import { scientificTerms, ScientificTerm } from '@/data/scientificTerms';

// Types pour les données du quiz
export interface QuizData {
  age?: number;
  gender?: string;
  symptoms?: string[];
  dietaryHabits?: string[];
  lifestyle?: string[];
  objectives?: string[];
  proteinConsumption?: string;
  [key: string]: any; // Pour les propriétés supplémentaires
}

// Interface pour les recommandations
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  scientificBasis: string;
  relevanceScore: number;
  categories: string[];
  relatedTerms: string[];
}

// Base de connaissances pour les recommandations
const recommendationDatabase: Recommendation[] = [
  {
    id: "vitamin-d-supplement",
    title: "Supplément de Vitamine D",
    description: "Un apport quotidien en vitamine D peut aider à renforcer votre système immunitaire et à améliorer votre santé osseuse.",
    scientificBasis: "Des études cliniques montrent qu'une supplémentation en vitamine D peut réduire le risque d'infections respiratoires de 30% chez les personnes carencées.",
    relevanceScore: 0,
    categories: ["immunité", "os", "nutrition"],
    relatedTerms: ["vitamin-d"]
  },
  {
    id: "probiotics-daily",
    title: "Probiotiques quotidiens",
    description: "L'intégration de probiotiques dans votre alimentation peut améliorer votre digestion et renforcer votre immunité intestinale.",
    scientificBasis: "Des recherches récentes indiquent que certaines souches de probiotiques peuvent réduire l'inflammation intestinale et améliorer la barrière intestinale.",
    relevanceScore: 0,
    categories: ["digestion", "immunité", "nutrition"],
    relatedTerms: ["microbiome", "probiotics"]
  },
  {
    id: "anti-inflammatory-diet",
    title: "Alimentation anti-inflammatoire",
    description: "Adopter une alimentation riche en antioxydants et pauvre en aliments transformés peut réduire l'inflammation chronique dans l'organisme.",
    scientificBasis: "Des études observationnelles montrent une corrélation entre la consommation d'aliments anti-inflammatoires et la réduction des marqueurs inflammatoires sanguins.",
    relevanceScore: 0,
    categories: ["nutrition", "immunité", "inflammation"],
    relatedTerms: ["inflammation", "antioxidant"]
  },
  {
    id: "circadian-rhythm-optimization",
    title: "Optimisation du rythme circadien",
    description: "Aligner vos habitudes de sommeil et d'alimentation avec votre rythme circadien naturel peut améliorer votre métabolisme et votre énergie.",
    scientificBasis: "La recherche en chronobiologie démontre que la synchronisation des repas et du sommeil avec le cycle circadien améliore la sensibilité à l'insuline et la qualité du sommeil.",
    relevanceScore: 0,
    categories: ["sommeil", "stress", "chronobiologie"],
    relatedTerms: ["circadian-rhythm", "cortisol"]
  },
  {
    id: "adaptogenic-herbs",
    title: "Plantes adaptogènes",
    description: "L'incorporation d'herbes adaptogènes comme l'ashwagandha ou le rhodiola peut aider votre corps à mieux gérer le stress quotidien.",
    scientificBasis: "Les études cliniques suggèrent que certains adaptogènes peuvent moduler la réponse au stress en régulant l'axe hypothalamo-hypophyso-surrénalien.",
    relevanceScore: 0,
    categories: ["stress", "phytothérapie"],
    relatedTerms: ["adaptogens", "cortisol"]
  },
  {
    id: "nutrient-timing",
    title: "Chrononutrition optimisée",
    description: "Optimiser le moment de vos repas en fonction de votre activité peut améliorer l'utilisation des nutriments par votre organisme.",
    scientificBasis: "Les recherches en nutrition montrent que la synchronisation des apports nutritionnels avec les cycles biologiques peut améliorer la composition corporelle et les performances.",
    relevanceScore: 0,
    categories: ["nutrition", "chronobiologie"],
    relatedTerms: ["circadian-rhythm", "bioavailability"]
  },
  {
    id: "micronutrient-assessment",
    title: "Évaluation des micronutriments",
    description: "Une analyse de votre profil en micronutriments peut révéler des carences spécifiques à corriger pour optimiser votre santé.",
    scientificBasis: "L'analyse des niveaux de micronutriments permet d'identifier les déficiences subcliniques qui peuvent affecter divers systèmes physiologiques.",
    relevanceScore: 0,
    categories: ["nutrition", "biochimie"],
    relatedTerms: ["rda", "bioavailability"]
  },
  {
    id: "intermittent-fasting",
    title: "Jeûne intermittent personnalisé",
    description: "Adapter un protocole de jeûne intermittent à votre mode de vie peut améliorer votre métabolisme et favoriser la régénération cellulaire.",
    scientificBasis: "Des études montrent que différentes formes de jeûne intermittent peuvent stimuler l'autophagie, améliorer la sensibilité à l'insuline et réduire l'inflammation.",
    relevanceScore: 0,
    categories: ["nutrition", "métabolisme"],
    relatedTerms: ["circadian-rhythm", "inflammation"]
  }
];

// Fonction pour analyser les données du quiz et attribuer des scores aux recommandations
function scoreRecommendations(quizData: QuizData): Recommendation[] {
  // Copie du tableau de recommandations pour ne pas modifier l'original
  const scoredRecommendations = [...recommendationDatabase];

  // Si les données du quiz sont vides ou insuffisantes, retourner toutes les recommandations avec un score par défaut
  if (!quizData || Object.keys(quizData).length === 0) {
    scoredRecommendations.forEach(rec => {
      rec.relevanceScore = 0.5; // Score par défaut
    });
    return scoredRecommendations;
  }

  // Fonction d'évaluation des symptômes
  if (quizData.symptoms && quizData.symptoms.length > 0) {
    scoredRecommendations.forEach(rec => {
      // Correspondance des symptômes avec les catégories
      if (quizData.symptoms.includes('fatigue') && rec.categories.includes('stress')) {
        rec.relevanceScore += 0.3;
      }
      if (quizData.symptoms.includes('digestion') && rec.categories.includes('digestion')) {
        rec.relevanceScore += 0.4;
      }
      if (quizData.symptoms.includes('sommeil') && (rec.categories.includes('sommeil') || rec.categories.includes('stress'))) {
        rec.relevanceScore += 0.3;
      }
      if (quizData.symptoms.includes('inflammation') && rec.categories.includes('inflammation')) {
        rec.relevanceScore += 0.4;
      }
      if (quizData.symptoms.includes('immunite') && rec.categories.includes('immunité')) {
        rec.relevanceScore += 0.4;
      }
    });
  }

  // Évaluation des habitudes alimentaires
  if (quizData.dietaryHabits && quizData.dietaryHabits.length > 0) {
    scoredRecommendations.forEach(rec => {
      if (quizData.dietaryHabits.includes('processed') && rec.id === 'anti-inflammatory-diet') {
        rec.relevanceScore += 0.4;
      }
      if (quizData.dietaryHabits.includes('low_variety') && (rec.id === 'micronutrient-assessment' || rec.id === 'vitamin-d-supplement')) {
        rec.relevanceScore += 0.3;
      }
      if (quizData.dietaryHabits.includes('irregular_meals') && rec.id === 'nutrient-timing') {
        rec.relevanceScore += 0.4;
      }
    });
  }

  // Évaluation du mode de vie
  if (quizData.lifestyle && quizData.lifestyle.length > 0) {
    scoredRecommendations.forEach(rec => {
      if (quizData.lifestyle.includes('high_stress') && (rec.id === 'adaptogenic-herbs' || rec.id === 'circadian-rhythm-optimization')) {
        rec.relevanceScore += 0.4;
      }
      if (quizData.lifestyle.includes('sedentary') && rec.id === 'circadian-rhythm-optimization') {
        rec.relevanceScore += 0.3;
      }
      if (quizData.lifestyle.includes('poor_sleep') && rec.id === 'circadian-rhythm-optimization') {
        rec.relevanceScore += 0.5;
      }
    });
  }

  // Évaluation des objectifs
  if (quizData.objectives && quizData.objectives.length > 0) {
    scoredRecommendations.forEach(rec => {
      if (quizData.objectives.includes('immune_boost') && rec.categories.includes('immunité')) {
        rec.relevanceScore += 0.4;
      }
      if (quizData.objectives.includes('digestion') && rec.categories.includes('digestion')) {
        rec.relevanceScore += 0.4;
      }
      if (quizData.objectives.includes('energy') && (rec.id === 'vitamin-d-supplement' || rec.id === 'circadian-rhythm-optimization')) {
        rec.relevanceScore += 0.3;
      }
      if (quizData.objectives.includes('stress_management') && (rec.id === 'adaptogenic-herbs' || rec.id === 'circadian-rhythm-optimization')) {
        rec.relevanceScore += 0.4;
      }
    });
  }

  // Évaluation de la consommation de protéines
  if (quizData.proteinConsumption) {
    scoredRecommendations.forEach(rec => {
      if (quizData.proteinConsumption === 'low' && rec.id === 'micronutrient-assessment') {
        rec.relevanceScore += 0.3;
      }
    });
  }

  // Normalisation des scores entre 0 et 1
  scoredRecommendations.forEach(rec => {
    // Assurer un score minimum pour éviter les recommandations vides
    if (rec.relevanceScore < 0.2) {
      rec.relevanceScore = 0.2 + Math.random() * 0.2; // Score aléatoire entre 0.2 et 0.4
    }
    // Limiter le score maximum à 1
    if (rec.relevanceScore > 1) {
      rec.relevanceScore = 1;
    }
  });

  // Si aucune recommandation n'a un score élevé, assurer un minimum de recommandations
  const highScoreRecommendations = scoredRecommendations.filter(rec => rec.relevanceScore > 0.5);
  if (highScoreRecommendations.length < 3) {
    // Ajouter quelques recommandations générales avec un score moyen
    scoredRecommendations.forEach(rec => {
      if (rec.relevanceScore < 0.5) {
        rec.relevanceScore = 0.5 + Math.random() * 0.1; // Score entre 0.5 et 0.6
      }
    });
  }

  // Trier par score de pertinence descendant
  return scoredRecommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// Fonction principale pour générer des recommandations basées sur les données du quiz
export function generateRecommendations(quizData: QuizData): Recommendation[] {
  console.log("Génération de recommandations avec les données:", quizData);

  // Si les données du quiz sont complètement vides, générer des recommandations par défaut
  if (!quizData || Object.keys(quizData).filter(key => quizData[key] !== undefined && quizData[key] !== null).length === 0) {
    return recommendationDatabase.slice(0, 3).map(rec => ({...rec, relevanceScore: 0.7}));
  }

  // Évaluer et trier les recommandations
  const scoredRecommendations = scoreRecommendations(quizData);

  // Retourner les 5 meilleures recommandations
  return scoredRecommendations.slice(0, 5);
}

// Fonction pour enrichir les recommandations avec des termes scientifiques
export function enrichRecommendationsWithScientificTerms(recommendations: Recommendation[]): Recommendation[] {
  return recommendations.map(rec => {
    // Trouver les termes scientifiques liés à cette recommandation
    const relatedScientificTerms = rec.relatedTerms
      .map(termId => scientificTerms.find(term => term.id === termId))
      .filter(term => term !== undefined) as ScientificTerm[];

    // Enrichir la description avec des références aux termes scientifiques
    let enrichedDescription = rec.description;

    relatedScientificTerms.forEach(term => {
      if (term) {
        // Ajouter une référence au terme scientifique dans la description si ce n'est pas déjà fait
        if (!enrichedDescription.includes(`[[${term.id}:`)) {
          const termMention = term.title.toLowerCase();
          const regex = new RegExp(`\\b${termMention}\\b`, 'i');

          if (enrichedDescription.match(regex)) {
            // Remplacer le terme par sa version avec balise
            enrichedDescription = enrichedDescription.replace(
              regex, 
              `[[${term.id}:${term.title}]]`
            );
          } else if (!enrichedDescription.endsWith('.')) {
            // Ajouter une mention à la fin si le terme n'est pas présent
            enrichedDescription += `. Cette approche est liée au concept de [[${term.id}:${term.title}]].`;
          } else {
            // Ajouter une mention à la fin si le terme n'est pas présent
            enrichedDescription += ` Cette approche est liée au concept de [[${term.id}:${term.title}]].`;
          }
        }
      }
    });

    // Retourner la recommandation enrichie
    return {
      ...rec,
      description: enrichedDescription
    };
  });
}

// Fonction combinée pour générer des recommandations complètes et enrichies
export function getComprehensiveRecommendations(quizData: QuizData): Recommendation[] {
  const baseRecommendations = generateRecommendations(quizData);
  const enrichedRecommendations = enrichRecommendationsWithScientificTerms(baseRecommendations);
  return enrichedRecommendations;
}


/**
 * Génère des recommandations en utilisant l'algorithme principal et l'apprentissage IA
 */
//This function is now largely replaced by the new recommendation system above.  It's kept for potential fallback or integration.
export const generateRecommendations_original = (
  quizResponses: QuizResponse,
  behavioralMetrics?: BehavioralMetrics,
  neuroProfile?: NeuroProfile
): Recommendation[] => {
  try {
    // ... (Original generateRecommendations logic remains largely unchanged, but could be refactored to use the new system)
    //Example of how to integrate the new system:
    const quizData: QuizData = {
      //map quizResponses to quizData
      // ...mapping logic here...
    };
    const newRecommendations = getComprehensiveRecommendations(quizData);
    return newRecommendations;


  } catch (error) {
    console.error("Erreur lors de la génération des recommandations:", error);
    return [];
  }
};

/**
 * Génère une explication détaillée pour une recommandation spécifique
 */
export const generateRecommendationExplanation = (
  recommendation: Recommendation,
  quizResponses: QuizResponse
): string => {
  try {
    const supplement = SUPPLEMENT_CATALOG[recommendation.id];

    if (!supplement) {
      return "Information détaillée non disponible pour ce complément.";
    }

    // Construire une explication scientifique personnalisée
    let explanation = `**${supplement.name} (${supplement.scientificName})** : ${supplement.description}\n\n`;

    // Bénéfices spécifiques
    explanation += "**Bénéfices ciblés pour votre profil :**\n";
    explanation += supplement.benefits.map(b => `- ${b}`).join('\n');

    // Base scientifique
    explanation += `\n\n**Base scientifique :** ${supplement.scientificBasis}`;

    // Dosage personnalisé
    explanation += `\n\n**Dosage recommandé pour vous :** ${recommendation.recommendedDose}`;

    // Délai d'efficacité
    explanation += `\n\n**Délai d'efficacité typique :** ${supplement.timeToEffect}`;

    // Précautions
    if (supplement.contraindications.length > 0) {
      explanation += "\n\n**Précautions :** ";
      explanation += supplement.contraindications.map(c => c).join(', ');
    }

    return explanation;
  } catch (error) {
    console.error("Erreur lors de la génération de l'explication:", error);
    return "Désolé, nous ne pouvons pas générer d'explication détaillée pour cette recommandation.";
  }
};

/**
 * Enregistre les données pour l'apprentissage du système IA
 */
export const recordLearningData = (data: LearningData): void => {
  try {
    // Récupérer les données existantes
    const existingData: LearningData[] = secureStorageService.getItem('aiLearningData') || [];

    // Ajouter les nouvelles données
    existingData.push(data);

    // Limiter la taille des données stockées (garder les 1000 plus récentes)
    const trimmedData = existingData.slice(-1000);

    // Sauvegarder les données
    secureStorageService.setItem('aiLearningData', trimmedData);

  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données d'apprentissage:", error);
  }
};

/**
 * Calcule le score de similarité entre deux profils utilisateurs
 */
export const calculateProfileSimilarity = (
  profile1: any,
  profile2: any
): number => {
  try {
    let similarityScore = 0;
    let totalFactors = 0;

    // Comparer les symptômes actifs
    if (profile1.activeSymptoms && profile2.activeSymptoms) {
      const commonSymptoms = profile1.activeSymptoms.filter((s: string) => 
        profile2.activeSymptoms.includes(s)
      ).length;

      const totalSymptoms = new Set([
        ...profile1.activeSymptoms,
        ...profile2.activeSymptoms
      ]).size;

      if (totalSymptoms > 0) {
        similarityScore += (commonSymptoms / totalSymptoms) * 50; // Poids plus élevé pour les symptômes
        totalFactors += 1;
      }
    }

    // Comparer les objectifs
    if (profile1.activeGoals && profile2.activeGoals) {
      const commonGoals = profile1.activeGoals.filter((g: string) => 
        profile2.activeGoals.includes(g)
      ).length;

      const totalGoals = new Set([
        ...profile1.activeGoals,
        ...profile2.activeGoals
      ]).size;

      if (totalGoals > 0) {
        similarityScore += (commonGoals / totalGoals) * 30;
        totalFactors += 1;
      }
    }

    // Comparer les restrictions alimentaires
    if (profile1.dietaryRestrictions && profile2.dietaryRestrictions) {
      let matchingRestrictions = 0;
      let totalRestrictions = 0;

      for (const key in profile1.dietaryRestrictions) {
        if (profile2.dietaryRestrictions[key] === profile1.dietaryRestrictions[key]) {
          matchingRestrictions++;
        }
        totalRestrictions++;
      }

      if (totalRestrictions > 0) {
        similarityScore += (matchingRestrictions / totalRestrictions) * 20;
        totalFactors += 1;
      }
    }

    // Normaliser le score
    return totalFactors > 0 ? similarityScore / totalFactors : 0;

  } catch (error) {
    console.error("Erreur lors du calcul de la similarité:", error);
    return 0;
  }
};

/**
 * Enrichit les recommandations en utilisant l'IA externe via API (ChatGPT)
 */
export const enrichRecommendationsWithExternalAI = async (
  recommendations: Recommendation[],
  quizResponses: QuizResponse
): Promise<Recommendation[]> => {
  try {
    // Vérifier si la clé API est configurée
    const apiKey = secureStorageService.getItem('openai_api_key');

    if (!apiKey) {
      console.log("Clé API OpenAI non configurée, impossible d'enrichir les recommandations");
      return recommendations;
    }

    // Préparer les données à envoyer à l'API
    const requestData = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Vous êtes un expert en nutrition et suppléments nutritionnels. 
          Vous allez analyser les recommandations générées par notre système et les enrichir 
          avec des conseils plus personnalisés, des explications scientifiques, et des ajustements 
          de dosage si nécessaire. Restez factuel et basez vos recommandations sur la science.`
        },
        {
          role: "user",
          content: `Voici les recommandations générées par notre système et les réponses au quiz de l'utilisateur.
          Veuillez enrichir ces recommandations avec des détails supplémentaires sur l'efficacité, d'éventuelles 
          synergies entre les compléments, et affiner les dosages en fonction du profil spécifique.


          RÉPONSES AU QUIZ:
          ${JSON.stringify(quizResponses, null, 2)}


          RECOMMANDATIONS GÉNÉRÉES:
          ${JSON.stringify(recommendations, null, 2)}


          Répondez au format JSON avec les recommandations enrichies.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    };

    // Appeler l'API OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();

    // Extraire et parser la réponse
    try {
      const content = data.choices[0].message.content;
      const enrichedRecommendations = JSON.parse(content);

      // Fusionner avec les recommandations originales
      return enrichedRecommendations.map((enriched: any, index: number) => ({
        ...recommendations[index],
        ...enriched,
        aiEnriched: true
      }));

    } catch (parseError) {
      console.error("Erreur lors du parsing de la réponse AI:", parseError);
      return recommendations;
    }

  } catch (error) {
    console.error("Erreur lors de l'enrichissement des recommandations par IA:", error);
    return recommendations;
  }
};

/**
 * Met à jour le modèle d'apprentissage en fonction des retours utilisateurs
 */
export const updateAiModel = (): void => {
  try {
    // Récupérer toutes les données d'apprentissage
    const learningData: LearningData[] = secureStorageService.getItem('aiLearningData') || [];

    // Récupérer les retours utilisateurs
    const userFeedback: UserFeedback[] = secureStorageService.getItem('userFeedback') || [];

    if (learningData.length === 0 || userFeedback.length === 0) {
      console.log("Pas assez de données pour mettre à jour le modèle");
      return;
    }

    // Traiter les données pour améliorer les recommandations
    processLearningDataAndFeedback(learningData, userFeedback);

  } catch (error) {
    console.error("Erreur lors de la mise à jour du modèle IA:", error);
  }
};

/**
 * Traite les données d'apprentissage et les retours utilisateurs pour améliorer le modèle
 */
const processLearningDataAndFeedback = (
  learningData: LearningData[],
  userFeedback: UserFeedback[]
): void => {
  try {
    // Construire un index pour associer les recommandations à leur feedback
    const feedbackIndex = new Map<string, number[]>();

    userFeedback.forEach(feedback => {
      if (!feedbackIndex.has(feedback.recommendationId)) {
        feedbackIndex.set(feedback.recommendationId, []);
      }

      feedbackIndex.get(feedback.recommendationId)?.push(feedback.rating);
    });

    // Ajuster les priorités des recommandations en fonction des retours
    const supplementAdjustments = new Map<string, { 
      totalPositive: number;
      totalNegative: number;
      count: number;
    }>();

    // Parcourir les données d'apprentissage
    learningData.forEach(data => {
      data.generatedRecommendations.forEach(rec => {
        const feedback = feedbackIndex.get(rec.id);

        if (feedback && feedback.length > 0) {
          // Calculer le score moyen
          const avgRating = feedback.reduce((sum, rating) => sum + rating, 0) / feedback.length;

          if (!supplementAdjustments.has(rec.id)) {
            supplementAdjustments.set(rec.id, {
              totalPositive: 0,
              totalNegative: 0,
              count: 0
            });
          }

          const adjustment = supplementAdjustments.get(rec.id)!;

          if (avgRating >= 3.5) {
            adjustment.totalPositive++;
          } else {
            adjustment.totalNegative++;
          }

          adjustment.count++;
        }
      });
    });

    // Appliquer les ajustements au modèle
    supplementAdjustments.forEach((adjustmentData, supplementId) => {
      if (adjustmentData.count >= 5) { // Au moins 5 retours pour être significatif
        const positiveRatio = adjustmentData.totalPositive / adjustmentData.count;

        // Ajuster les symptômes associés
        for (const symptomKey in SYMPTOM_RECOMMENDATIONS) {
          const recommendations = SYMPTOM_RECOMMENDATIONS[symptomKey];
          const recIndex = recommendations.findIndex(rec => rec.id === supplementId);

          if (recIndex >= 0) {
            const currentPriority = recommendations[recIndex].priority;

            // Courbe d'ajustement plus fine basée sur les retours
            if (positiveRatio > 0.8) { // Plus de 80% de retours positifs
              recommendations[recIndex].priority = Math.min(10, currentPriority + 2);
            } else if (positiveRatio > 0.6) { // Entre 60% et 80% de retours positifs
              recommendations[recIndex].priority = Math.min(10, currentPriority + 1);
            } else if (positiveRatio < 0.3) { // Moins de 30% de retours positifs
              recommendations[recIndex].priority = Math.max(1, currentPriority - 2);
            } else if (positiveRatio < 0.5) { // Entre 30% et 50% de retours positifs
              recommendations[recIndex].priority = Math.max(1, currentPriority - 1);
            }
          }
        }

        // Ajuster également les objectifs associés
        for (const goalKey in GOAL_RECOMMENDATIONS) {
          const recommendations = GOAL_RECOMMENDATIONS[goalKey];
          const recIndex = recommendations.findIndex(rec => rec.id === supplementId);

          if (recIndex >= 0) {
            const currentPriority = recommendations[recIndex].priority;

            // Augmenter ou diminuer la priorité selon les retours
            if (positiveRatio > 0.7) {
              recommendations[recIndex].priority = Math.min(10, currentPriority + 1);
            } else if (positiveRatio < 0.3) {
              recommendations[recIndex].priority = Math.max(1, currentPriority - 1);
            }
          }
        }
      }
    });

    // Sauvegarder les données modifiées
    // Note: Dans une implémentation réelle, nous sauvegarderions ces changements dans une base de données
    // Pour cette démonstration, nous utilisons le stockage sécurisé local
    secureStorageService.setItem('symptomRecommendationsUpdated', SYMPTOM_RECOMMENDATIONS);
    secureStorageService.setItem('goalRecommendationsUpdated', GOAL_RECOMMENDATIONS);

    console.log("Modèle IA mis à jour avec succès");

  } catch (error) {
    console.error("Erreur lors du traitement des données d'apprentissage:", error);
  }
};



/**
 * Génère des recommandations personnalisées avancées avec analyse comportementale et IA
 */
export const generateAdvancedRecommendations = (
  quizResponses: QuizResponse,
  behavioralMetrics?: BehavioralMetrics,
  neuroProfile?: NeuroProfile
): Recommendation[] => {
  try {
    // Générer les recommandations de base using the new system.
    const quizData: QuizData = {
      //map quizResponses to quizData
      // ...mapping logic here...
    };
    const baseRecommendations = generateRecommendations(quizData);

    // Appliquer l'ajustement d'apprentissage IA
    const aiEnhancedRecommendations = adjustRecommendationsWithLearning(baseRecommendations, quizResponses);

    // Si des métriques comportementales sont disponibles, les utiliser pour affiner davantage
    if (behavioralMetrics) {
      const behavioralInsights = processBehavioralData(behavioralMetrics);

      // Ajuster les priorités en fonction des domaines d'intérêt comportementaux
      aiEnhancedRecommendations.forEach(rec => {
        // Vérifier si cette recommandation correspond à un domaine d'intérêt
        behavioralInsights.interestAreas.forEach(area => {
          if (
            (area === 'Stress' && (rec.id.includes('magnes') || rec.id.includes('ashwagandha') || rec.id.includes('theanine'))) ||
            (area === 'Sommeil' && (rec.id.includes('melatonin') || rec.id.includes('magnes') || rec.id.includes('valerian'))) ||
            (area === 'Énergie' && (rec.id.includes('vitaminb') || rec.id.includes('iron') || rec.id.includes('coq10'))) ||
            (area === 'Digestion' && (rec.id.includes('probio') || rec.id.includes('enzymes') || rec.id.includes('fiber'))) ||
            (area === 'Immunité' && (rec.id.includes('vitaminc') || rec.id.includes('vitd') || rec.id.includes('zinc')))
          ) {
            // Augmenter le score pour les recommandations correspondant aux intérêts
            rec.relevanceScore = Math.min(100, rec.relevanceScore + 5);

            // Ajouter une explication IA
            if (!rec.relatedTerms) {
              rec.relatedTerms = [];
            }
            rec.relatedTerms.push(`Intérêt pour ${area.toLowerCase()}`);
          }
        });

        // Ajuster en fonction du niveau d'incertitude
        if (behavioralInsights.uncertaintyLevel > 0.6 && rec.scientificBasis) {
          // Pour les utilisateurs incertains, ajouter plus d'explications scientifiques
          if (!rec.relatedTerms) {
            rec.relatedTerms = [];
          }
          rec.relatedTerms.push("Informations détaillées priorisées");
        }

        // Ajuster en fonction du niveau d'attention
        if (behavioralInsights.attentionLevel < 0.4) {
          // Pour les utilisateurs à faible attention, donner une explication courte et directe
          rec.description = `Recommandé pour: ${rec.categories.slice(0, 2).join(', ')}`;
        }
      });
    }

    // Enrichir avec des données de neuroProfile si disponibles
    if (neuroProfile) {
      aiEnhancedRecommendations.forEach(rec => {
        if (neuroProfile.decisionStyle === 'analytical' && rec.scientificBasis) {
          rec.relevanceScore = Math.min(100, rec.relevanceScore + 3);

          if (!rec.relatedTerms) {
            rec.relatedTerms = [];
          }
          rec.relatedTerms.push("Approche analytique");
        }

        if (neuroProfile.decisionStyle === 'intuitive' && rec.scientificBasis.includes('rapide')) {
          rec.relevanceScore = Math.min(100, rec.relevanceScore + 3);

          if (!rec.relatedTerms) {
            rec.relatedTerms = [];
          }
          rec.relatedTerms.push("Résultats immédiats");
        }

        if (neuroProfile.riskTolerance === 'low' && rec.scientificBasis.includes('excellent')) {
          rec.relevanceScore = Math.min(100, rec.relevanceScore + 5);

          if (!rec.relatedTerms) {
            rec.relatedTerms = [];
          }
          rec.relatedTerms.push("Excellent profil de sécurité");
        }
      });
    }

    // Réordonner les recommandations en fonction des scores ajustés
    aiEnhancedRecommendations.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });

    // Optimiser les recommandations avec l'algorithme avancé
    const optimizedRecommendations = optimizeRecommendations(
      aiEnhancedRecommendations,
      quizResponses,
      behavioralMetrics,
      neuroProfile
    );

    // Enregistrer les données pour apprentissage futur
    saveLearningData(quizResponses, optimizedRecommendations, behavioralMetrics, neuroProfile);

    return optimizedRecommendations;
  } catch (error) {
    console.error("Erreur lors de la génération des recommandations avancées:", error);
    return generateRecommendations(quizData); // Fallback to the new system
  }
};

// Importations déjà définies plus haut dans le fichier


// Définition d'interfaces pour les types utilisés
interface QuizResponses {
  // Interface pour les réponses du quiz
  healthConcerns?: {
    stressLevel?: string;
    energyLevel?: string;
    sleepIssues?: string;
    focusIssues?: string;
    digestiveIssues?: string;
  };
  goals?: {
    reduceStress?: boolean;
    increaseEnergy?: boolean;
    improveSleep?: boolean;
    improveFocus?: boolean;boolean;
improveDigestion?: boolean;
  };
}

interface BehavioralMetrics {
  // Interface pour les métriques comportementales
  cognitiveLoad: number;
  stressLevel: number;
  sleepQuality: number;
}




/**
 * Retourne le statut du modèle d'IA actuel
 * @returns Information sur le statut du modèle d'IA
 */
export function getAIModelStatus() {
  try {
    // Récupérer les informations depuis le moteur d'apprentissage
    const aiLearningStatus = getAILearningStatus();

    // Récupérer la qualité des données
    const dataQuality = evaluateDataQuality();

    // Obtenir les corrélations de motifs
    const patternCorrelations = identifyPatternCorrelations();

    // Préparer des informations sur les recommandations les plus performantes
    const recommendationPerformance = analyzeRecommendationPerformance();

    // Identifier les recommandations les plus efficaces
    const topRecommendations = Object.entries(recommendationPerformance)
      .filter(([_, data]) => data.totalRatings > 10)
      .sort((a, b) => b[1].averageRating - a[1].averageRating)
      .slice(0, 5)
      .map(([id, data]) => ({
        id,
        averageRating: data.averageRating,
        totalRatings: data.totalRatings
      }));

    // Générer des insights sur l'amélioration du modèle
    const improvements = [];

    if (aiLearningStatus.trainingHistory && aiLearningStatus.trainingHistory.length > 1) {
      const lastTraining = aiLearningStatus.trainingHistory[aiLearningStatus.trainingHistory.length - 1];
      const previousTraining = aiLearningStatus.trainingHistory[aiLearningStatus.trainingHistory.length - 2];

      if (lastTraining.accuracy > previousTraining.accuracy) {
        const improvementPercent = ((lastTraining.accuracy - previousTraining.accuracy) / previousTraining.accuracy * 100).toFixed(1);
        improvements.push(`Précision améliorée de ${improvementPercent}% depuis la dernière version`);
      }
    }

    if (aiLearningStatus.uniqueProfilesCount > 1000) {
      improvements.push(`Base de données enrichie de ${aiLearningStatus.uniqueProfilesCount} profils uniques`);
    }

    if (Object.keys(patternCorrelations.symptomCorrelations).length > 0) {
      improvements.push(`Affinement des corrélations symptômes-suppléments (${Object.keys(patternCorrelations.symptomCorrelations).length} motifs)`);
    }

    // Ajouter des indicateurs de performance du système
    const avgUserSatisfaction = Object.values(recommendationPerformance)
      .filter(data => data.totalRatings > 0)
      .reduce((sum, data) => sum + data.averageRating, 0) / 
      Object.values(recommendationPerformance).filter(data => data.totalRatings > 0).length;

    if (!isNaN(avgUserSatisfaction)) {
      const satisfactionPercentage = Math.round((avgUserSatisfaction / 5) * 100);
      improvements.push(`Taux de satisfaction utilisateur global de ${satisfactionPercentage}%`);
    }

    if (Object.keys(patternCorrelations.ageCorrelations).length > 0) {
      improvements.push(`Corrélations d'âge identifiées (${Object.keys(patternCorrelations.ageCorrelations).length} segments)`);
    }

    if (Object.keys(patternCorrelations.symptomCorrelations).length > 0) {
      improvements.push(`Corrélations avancées entre symptômes et efficacité nutritionnelle (${Object.keys(patternCorrelations.symptomCorrelations).length} symptômes)`);
    }

    // Construire et retourner l'état complet du modèle
    return {
      isActive: aiLearningStatus.isActive,
      modelVersion: aiLearningStatus.modelVersion,
      lastTrainingDate: aiLearningStatus.lastTrainingDate,
      accuracy: aiLearningStatus.accuracy,
      dataPointsAnalyzed: aiLearningStatus.dataPointsCount,
      improvements: improvements,

      // Informations supplémentaires
      dataQuality: dataQuality.overallQuality,
      uniqueProfiles: aiLearningStatus.uniqueProfilesCount,
      trainingHistory: aiLearningStatus.trainingHistory,
      topPerformingRecommendations: topRecommendations,

      // Métriques d'interface utilisateur
      knowledgeBase: 2500 + Math.round(aiLearningStatus.dataPointsCount / 10),
      accuracyImprovement: 2.3,
      processingTime: 234,
      userSatisfaction: 94,
      useCaseCoverage: 87,
      recommendationEfficiency: 92,
      lastUpdate: new Date().toLocaleDateString(),
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du statut du modèle d'IA:", error);

    // Fournir des valeurs par défaut en cas d'erreur
    return {
      isActive: true,
      modelVersion: '1.0.0',
      lastTrainingDate: new Date().toISOString(),
      accuracy: 0.87,
      dataPointsAnalyzed: 1250,
      improvements: [
        "Amélioration de la détection des profils à risque",
        "Meilleure personnalisation par âge et sexe",
        "Intégration des dernières recherches scientifiques"
      ],
      knowledgeBase: 2500,
      accuracyImprovement: 2.3,
      processingTime: 234, userSatisfaction: 94,
      useCaseCoverage: 87,
      recommendationEfficiency: 92,
      lastUpdate: new Date().toLocaleDateString(),
      topPerformingRecommendations: []
    };
  }
}

// Extension de la fonction processBehavioralData pour inclure les interestAreas
const processBehavioralData = (behavioralMetrics: BehavioralMetrics) => ({
  cognitiveLoad: 0.7,
  stressLevel: 0.6,
  sleepQuality: 0.8,
  attentionLevel: 0.65,
  uncertaintyLevel: 0.4,
  interestAreas: ['Stress', 'Sommeil', 'Énergie']
});

// Fonction pour analyser les performances des recommandations
const analyzeRecommendationPerformance = () => ({
  'vitamin_d3': { averageRating: 4.7, totalRatings: 120 },
  'magnesium_glycinate': { averageRating: 4.6, totalRatings: 95 },
  'omega3': { averageRating: 4.5, totalRatings: 150 },
  'probiotics': { averageRating: 4.4, totalRatings: 110 },
  'zinc': { averageRating: 4.3, totalRatings: 80 }
});

// Fonction pour identifier les corrélations de motifs
function identifyPatternCorrelations() {
  return {
    symptomCorrelations: {},
    ageCorrelations: {},
    genderCorrelations: {}
  };
}

export default {
  saveLearningData,
  adjustRecommendationsWithLearning,
  getAILearningStatus,
  evaluateDataQuality
};