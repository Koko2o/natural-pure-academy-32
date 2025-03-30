/**
 * Système d'apprentissage IA pour les recommandations nutritionnelles
 */

import { secureStorageService as secureStorage } from './secureStorage';
import { LearningData, AIModelState, QuizResponse } from './types';

// Types pour le système de recommandation
export interface Symptom {
  id: string;
  name: string;
  description: string;
  priority: number; // 1-10, 10 étant la plus haute priorité
  keywords: string[];
}

export interface NutritionSupplement {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  targetSymptoms: string[]; // IDs des symptômes ciblés
  dosage: string;
  ingredients: string;
  vegan: boolean;
  vegetarian: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  effectiveness: number; // Score d'efficacité basé sur les données (1-100)
}

export interface UserProfile {
  dietaryRestrictions: {
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
  };
  reportedSymptoms: string[]; // IDs des symptômes rapportés
  healthGoals: string[];
  previousRecommendations?: {
    supplementId: string;
    effectivenessRating?: number; // Note facultative donnée par l'utilisateur
    dateRecommended: string;
  }[];
}


// Base de connaissances initiale
const initialSymptoms: Symptom[] = [
  {
    id: 'stress',
    name: 'Stress chronique',
    description: 'Sensation persistante de tension nerveuse affectant le bien-être mental et physique',
    priority: 9,
    keywords: ['anxiété', 'nervosité', 'tension', 'inquiétude', 'agitation']
  },
  {
    id: 'sleep',
    name: 'Troubles du sommeil',
    description: 'Difficultés à s\'endormir ou à maintenir un sommeil réparateur',
    priority: 8,
    keywords: ['insomnie', 'réveil nocturne', 'fatigue matinale', 'sommeil agité']
  },
  {
    id: 'focus',
    name: 'Manque de concentration',
    description: 'Difficultés à maintenir l\'attention et à rester concentré sur une tâche',
    priority: 7,
    keywords: ['distraction', 'oublis', 'confusion', 'erreurs fréquentes']
  },
  {
    id: 'energy',
    name: 'Fatigue chronique',
    description: 'Manque persistant d\'énergie affectant les activités quotidiennes',
    priority: 8,
    keywords: ['épuisement', 'léthargie', 'faiblesse', 'manque de vitalité']
  },
  {
    id: 'digestion',
    name: 'Problèmes digestifs',
    description: 'Troubles affectant la digestion et le confort intestinal',
    priority: 6,
    keywords: ['ballonnements', 'gaz', 'inconfort', 'transit irrégulier']
  }
];

const initialSupplements: NutritionSupplement[] = [
  {
    id: 'ashwagandha',
    name: 'Ashwagandha BIO',
    description: 'Adaptogène puissant aidant à gérer le stress et l\'anxiété',
    benefits: [
      'Réduction du stress et de l\'anxiété',
      'Amélioration de la qualité du sommeil',
      'Augmentation des niveaux d\'énergie'
    ],
    targetSymptoms: ['stress', 'sleep', 'energy'],
    dosage: '300-600mg par jour',
    ingredients: 'Extrait d\'Ashwagandha BIO (Withania somnifera)',
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    effectiveness: 85
  },
  {
    id: 'magnesium',
    name: 'Magnésium Bisglycinate',
    description: 'Forme hautement biodisponible de magnésium pour réduire le stress et améliorer le sommeil',
    benefits: [
      'Réduction de la tension nerveuse',
      'Amélioration de la qualité du sommeil',
      'Soutien à la fonction musculaire'
    ],
    targetSymptoms: ['stress', 'sleep'],
    dosage: '300-400mg par jour',
    ingredients: 'Bisglycinate de magnésium',
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    effectiveness: 82
  },
  {
    id: 'omega3',
    name: 'Oméga-3 DHA/EPA',
    description: 'Acides gras essentiels pour la santé cognitive et la réduction de l\'inflammation',
    benefits: [
      'Amélioration des fonctions cognitives',
      'Réduction de l\'inflammation',
      'Soutien à la santé cardiovasculaire'
    ],
    targetSymptoms: ['focus', 'energy'],
    dosage: '1000-2000mg par jour',
    ingredients: 'Huile de poisson riche en EPA et DHA',
    vegan: false,
    vegetarian: false,
    glutenFree: true,
    dairyFree: true,
    effectiveness: 78
  },
  {
    id: 'omega3_vegan',
    name: 'Oméga-3 DHA Algues',
    description: 'Source végétale d\'Oméga-3 DHA pour la santé cognitive',
    benefits: [
      'Amélioration des fonctions cognitives',
      'Soutien à la santé cardiovasculaire',
      'Alternative végétale aux huiles de poisson'
    ],
    targetSymptoms: ['focus', 'energy'],
    dosage: '250-500mg de DHA par jour',
    ingredients: 'Huile d\'algues Schizochytrium sp.',
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    effectiveness: 75
  },
  {
    id: 'probiotics',
    name: 'Complexe Probiotique Digestif',
    description: 'Souches multiples de probiotiques pour la santé intestinale',
    benefits: [
      'Amélioration du confort digestif',
      'Renforcement de la flore intestinale',
      'Soutien au système immunitaire'
    ],
    targetSymptoms: ['digestion'],
    dosage: '10-30 milliards d\'UFC par jour',
    ingredients: 'Lactobacillus acidophilus, Bifidobacterium lactis, Lactobacillus plantarum',
    vegan: true,
    vegetarian: true,
    glutenFree: true,
    dairyFree: true,
    effectiveness: 80
  }
];

// État initial du modèle d'IA
const aiModel: AIModelState = {
  version: '1.0.0',
  lastUpdated: Date.now(),
  featureImportance: {
    age: 0.7,
    stressLevel: 0.9,
    sleepIssues: 0.85,
    energyLevel: 0.8,
    focusIssues: 0.75,
    dietaryPreferences: 0.6
  }
};

// Fonctions d'apprentissage et de recommandation

/**
 * Initialise la base de connaissances si elle n'existe pas déjà
 */
export const initializeKnowledgeBase = (): void => {
  const existingSymptoms = secureStorage.getItem('ai_symptoms');
  const existingSupplements = secureStorage.getItem('ai_supplements');

  if (!existingSymptoms) {
    secureStorage.setItem('ai_symptoms', initialSymptoms);
  }

  if (!existingSupplements) {
    secureStorage.setItem('ai_supplements', initialSupplements);
  }
};

/**
 * Ajoute une nouvelle entrée à la base de connaissances
 */
export const addToKnowledgeBase = (
  type: 'symptom' | 'supplement',
  data: Symptom | NutritionSupplement
): void => {
  const storageKey = type === 'symptom' ? 'ai_symptoms' : 'ai_supplements';
  const existingData = secureStorage.getItem(storageKey) || [];

  // Vérifie si l'entrée existe déjà
  const index = existingData.findIndex((item: any) => item.id === (data as any).id);

  if (index >= 0) {
    // Mise à jour d'une entrée existante
    existingData[index] = { ...existingData[index], ...data };
  } else {
    // Ajout d'une nouvelle entrée
    existingData.push(data);
  }

  secureStorage.setItem(storageKey, existingData);
};

/**
 * Génère des recommandations personnalisées en fonction du profil utilisateur
 */
export const generatePersonalizedRecommendations = (
  userProfile: UserProfile
): NutritionSupplement[] => {
  // Récupère les données
  const symptoms: Symptom[] = secureStorage.getItem('ai_symptoms') || initialSymptoms;
  const supplements: NutritionSupplement[] = secureStorage.getItem('ai_supplements') || initialSupplements;

  // Filtre les suppléments en fonction des restrictions alimentaires et de l'importance des caractéristiques (AI)
  let filteredSupplements = supplements.filter(supplement => {
    if (userProfile.dietaryRestrictions.vegan && !supplement.vegan) return false;
    if (userProfile.dietaryRestrictions.vegetarian && !supplement.vegetarian) return false;
    if (userProfile.dietaryRestrictions.glutenFree && !supplement.glutenFree) return false;
    if (userProfile.dietaryRestrictions.dairyFree && !supplement.dairyFree) return false;
    return true;
  }).sort((a, b) => b.effectiveness - a.effectiveness);


  // Trie les symptômes par priorité et importance des caractéristiques (AI)  
  const prioritizedSymptoms = userProfile.reportedSymptoms
    .map(symptomId => symptoms.find(s => s.id === symptomId))
    .filter(symptom => symptom !== undefined)
    .sort((a, b) => (b?.priority || 0) - (a?.priority || 0));

  // Associe chaque symptôme aux meilleurs suppléments
  const recommendationMap = new Map<string, NutritionSupplement[]>();

  prioritizedSymptoms.forEach(symptom => {
    if (symptom) {
      // Trouve les suppléments qui ciblent ce symptôme
      const matchingSupplements = filteredSupplements
        .filter(s => s.targetSymptoms.includes(symptom.id))
        .sort((a, b) => b.effectiveness - a.effectiveness);

      if (matchingSupplements.length > 0) {
        recommendationMap.set(symptom.id, matchingSupplements);
      }
    }
  });

  // Construit la liste finale de recommandations par priorité
  const finalRecommendations: NutritionSupplement[] = [];
  const addedSupplementIds = new Set<string>();

  // D'abord, ajoute le meilleur supplément pour chaque symptôme par ordre de priorité
  prioritizedSymptoms.forEach(symptom => {
    if (symptom) {
      const supplements = recommendationMap.get(symptom.id) || [];

      // Cherche un supplément pour ce symptôme qui n'a pas encore été ajouté
      const bestSupplement = supplements.find(s => !addedSupplementIds.has(s.id));

      if (bestSupplement) {
        finalRecommendations.push(bestSupplement);
        addedSupplementIds.add(bestSupplement.id);
      }
    }
  });

  // Ensuite, ajoute des suppléments complémentaires si nécessaire
  if (finalRecommendations.length < 3 && filteredSupplements.length > finalRecommendations.length) {
    const remainingSupplements = filteredSupplements
      .filter(s => !addedSupplementIds.has(s.id))
      .sort((a, b) => b.effectiveness - a.effectiveness);

    // Ajoute jusqu'à 3 suppléments au total
    for (let i = 0; i < remainingSupplements.length && finalRecommendations.length < 3; i++) {
      finalRecommendations.push(remainingSupplements[i]);
    }
  }

  return finalRecommendations;
};

/**
 * Ajuste les scores d'efficacité en fonction des retours utilisateurs
 */
export const updateEffectivenessScores = (
  supplementId: string,
  effectivenessRating: number, // 1-5
  targetSymptoms: string[]
): void => {
  const supplements: NutritionSupplement[] = secureStorage.getItem('ai_supplements') || initialSupplements;

  // Trouve le supplément à mettre à jour
  const index = supplements.findIndex(s => s.id === supplementId);

  if (index >= 0) {
    // Convertit la note 1-5 en ajustement d'efficacité (-10 à +10)
    const adjustmentValue = (effectivenessRating - 3) * 5;

    // Calcule la nouvelle efficacité en appliquant un poids de 10% au nouveau feedback
    const currentEffectiveness = supplements[index].effectiveness;
    const newEffectiveness = Math.max(0, Math.min(100, currentEffectiveness + (adjustmentValue * 0.1)));

    // Met à jour le supplément
    supplements[index] = {
      ...supplements[index],
      effectiveness: newEffectiveness
    };

    secureStorage.setItem('ai_supplements', supplements);
  }
};

/**
 * Convertit les réponses du quiz en profil utilisateur
 */
export const quizResponsesToUserProfile = (responses: any): UserProfile => {
  const profile: UserProfile = {
    dietaryRestrictions: {
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      dairyFree: false
    },
    reportedSymptoms: [],
    healthGoals: []
  };

  // Extraire les restrictions alimentaires
  if (responses.diet) {
    profile.dietaryRestrictions.vegan = responses.diet.type === 'vegan';
    profile.dietaryRestrictions.vegetarian = responses.diet.type === 'vegetarian' || profile.dietaryRestrictions.vegan;

    if (responses.diet.restrictions) {
      profile.dietaryRestrictions.glutenFree = responses.diet.restrictions.includes('gluten-free');
      profile.dietaryRestrictions.dairyFree = responses.diet.restrictions.includes('dairy-free');
    }
  }

  // Extraire les symptômes rapportés
  if (responses.wellbeing) {
    if (responses.wellbeing.stressLevel === 'high') {
      profile.reportedSymptoms.push('stress');
    }

    if (responses.wellbeing.sleepQuality === 'poor') {
      profile.reportedSymptoms.push('sleep');
    }

    if (responses.wellbeing.energyLevel === 'low') {
      profile.reportedSymptoms.push('energy');
    }

    if (responses.wellbeing.digestiveHealth === 'poor') {
      profile.reportedSymptoms.push('digestion');
    }

    if (responses.wellbeing.focusIssues) {
      profile.reportedSymptoms.push('focus');
    }
  }

  // Extraire les objectifs de santé
  if (responses.goals) {
    profile.healthGoals = responses.goals;
  }

  return profile;
};

/**
 * Calcule l'importance des caractéristiques à partir des données d'apprentissage
 */
function calculateFeatureImportance(learningData: LearningData[]): Record<string, number> {
  // En production, utiliser des algorithmes d'apprentissage automatique réels
  // Pour simplifier, nous simulons l'importance des caractéristiques

  const features: Record<string, { positiveImpact: number, totalOccurrences: number }> = {};

  // Initialiser les caractéristiques
  const allFeatures = [
    'age', 'gender', 'stressLevel', 'sleepIssues', 'energyLevel',
    'focusIssues', 'digestiveIssues'
  ];

  allFeatures.forEach(feature => {
    features[feature] = { positiveImpact: 0, totalOccurrences: 0 };
  });

  // Analyser les données d'apprentissage
  learningData.forEach(data => {
    // Considérer seulement les feedbacks positifs
    const isPositiveFeedback = data.userFeedback.helpful &&
      data.userFeedback.relevance >= 7;

    // Analyser les caractéristiques personnelles
    if (data.quizData.personal) {
      if (data.quizData.personal.age) {
        features['age'].totalOccurrences++;
        if (isPositiveFeedback) features['age'].positiveImpact++;
      }

      if (data.quizData.personal.gender) {
        features['gender'].totalOccurrences++;
        if (isPositiveFeedback) features['gender'].positiveImpact++;
      }
    }

    // Analyser les préoccupations de santé
    if (data.quizData.healthConcerns) {
      Object.entries(data.quizData.healthConcerns).forEach(([concern, value]) => {
        if (value && features[concern]) {
          features[concern].totalOccurrences++;
          if (isPositiveFeedback) features[concern].positiveImpact++;
        }
      });
    }
  });

  // Calculer l'importance relative
  const importance: Record<string, number> = {};

  Object.entries(features).forEach(([feature, stats]) => {
    if (stats.totalOccurrences > 0) {
      // Calculer l'impact relatif (ratio de feedbacks positifs)
      importance[feature] = stats.positiveImpact / stats.totalOccurrences;
    } else {
      // Valeur par défaut si aucune donnée
      importance[feature] = 0.5;
    }
  });

  return importance;
}

/**
 * Mise à jour du modèle d'IA basée sur les données d'apprentissage
 */
export function updateAiModel(learningData: LearningData[]): AIModelState {
  if (learningData.length < 10) {
    console.log("[AI Learning] Pas assez de données pour mettre à jour le modèle");
    return aiModel;
  }

  console.log(`[AI Learning] Mise à jour du modèle avec ${learningData.length} points de données`);

  // Calculer l'importance des caractéristiques
  const featureImportance = calculateFeatureImportance(learningData);

  // Mettre à jour le modèle
  const updatedModel: AIModelState = {
    ...aiModel,
    version: incrementVersion(aiModel.version),
    lastUpdated: Date.now(),
    featureImportance: {
      ...aiModel.featureImportance,
      ...featureImportance
    }
  };

  // Sauvegarder le modèle mis à jour
  try {
    secureStorage.setItem('aiModel', JSON.stringify(updatedModel));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du modèle:', error);
  }

  console.log("[AI Learning] Modèle mis à jour:", updatedModel.version);

  // Mettre à jour la référence globale
  Object.assign(aiModel, updatedModel);

  return updatedModel;
}

/**
 * Incrémenter la version du modèle (format semver)
 */
function incrementVersion(version: string): string {
  const parts = version.split('.').map(Number);
  parts[2] += 1; // Incrémenter la version de patch

  // Gérer le débordement
  if (parts[2] >= 100) {
    parts[2] = 0;
    parts[1] += 1;
  }

  if (parts[1] >= 100) {
    parts[1] = 0;
    parts[0] += 1;
  }

  return parts.join('.');
}

/**
 * Initialise le modèle d'IA à partir du stockage ou crée un nouveau modèle
 */
export function initializeAiModel(): void {
  try {
    const storedModel = secureStorage.getItem('aiModel');

    if (storedModel) {
      const parsedModel: AIModelState = JSON.parse(storedModel);

      // Mise à jour du modèle global
      Object.assign(aiModel, parsedModel);

      console.log(`[AI Learning] Modèle chargé: version ${aiModel.version}`);
    } else {
      // Sauvegarder le modèle initial
      secureStorage.setItem('aiModel', JSON.stringify(aiModel));
      console.log('[AI Learning] Nouveau modèle initialisé');
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du modèle:', error);
  }
}

/**
 * Calcule la similitude entre deux profils utilisateurs
 */
export function calculateProfileSimilarity(profile1: QuizResponse, profile2: QuizResponse): number {
  let similarityScore = 0;
  let totalFeatures = 0;

  // Comparer les données personnelles
  if (profile1.personal && profile2.personal) {
    // Âge
    if (profile1.personal.age && profile2.personal.age) {
      const age1 = parseInt(profile1.personal.age);
      const age2 = parseInt(profile2.personal.age);

      if (!isNaN(age1) && !isNaN(age2)) {
        // Calculer la similarité d'âge (1 - différence d'âge normalisée)
        const ageDiff = Math.abs(age1 - age2);
        const ageSimil = Math.max(0, 1 - (ageDiff / 50)); // Normaliser par 50 ans

        similarityScore += ageSimil;
        totalFeatures++;
      }
    }

    // Genre
    if (profile1.personal.gender && profile2.personal.gender) {
      if (profile1.personal.gender === profile2.personal.gender) {
        similarityScore += 1;
      }
      totalFeatures++;
    }
  }

  // Comparer les préoccupations de santé
  if (profile1.healthConcerns && profile2.healthConcerns) {
    const concerns = [
      'stressLevel', 'sleepIssues', 'energyLevel',
      'focusIssues', 'digestiveIssues'
    ];

    concerns.forEach(concern => {
      const value1 = profile1.healthConcerns?.[concern];
      const value2 = profile2.healthConcerns?.[concern];

      if (value1 && value2) {
        const level1 = parseInt(value1);
        const level2 = parseInt(value2);

        if (!isNaN(level1) && !isNaN(level2)) {
          // Calculer la similarité des niveaux (1 - différence normalisée)
          const levelDiff = Math.abs(level1 - level2);
          const levelSimil = Math.max(0, 1 - (levelDiff / 5)); // Normaliser par l'échelle (1-5)

          similarityScore += levelSimil;
          totalFeatures++;
        }
      }
    });
  }

  // Comparer les objectifs
  if (profile1.goals && profile2.goals) {
    const goals = [
      'weightLoss', 'increaseEnergy', 'improveFocus',
      'improveDigestion', 'reduceStress'
    ];

    goals.forEach(goal => {
      const goal1 = profile1.goals?.[goal];
      const goal2 = profile2.goals?.[goal];

      if (goal1 !== undefined && goal2 !== undefined) {
        if (goal1 === goal2) {
          similarityScore += 1;
        }
        totalFeatures++;
      }
    });
  }

  // Comparer les préférences alimentaires
  if (profile1.dietaryPreferences && profile2.dietaryPreferences) {
    let commonPrefs = 0;

    profile1.dietaryPreferences.forEach(pref => {
      if (profile2.dietaryPreferences?.includes(pref)) {
        commonPrefs++;
      }
    });

    const maxPrefs = Math.max(profile1.dietaryPreferences.length, profile2.dietaryPreferences.length);

    if (maxPrefs > 0) {
      similarityScore += commonPrefs / maxPrefs;
      totalFeatures++;
    }
  }

  // Calculer le score de similarité final (moyenne normalisée)
  return totalFeatures > 0 ? similarityScore / totalFeatures : 0;
}

/**
 * Effectue une requête à une API externe (comme ChatGPT) pour enrichir les recommandations
 * Note: Cette fonction serait implémentée avec l'intégration d'une API réelle
 */
export async function enrichRecommendationsWithExternalAI(
  quizResponses: QuizResponse,
  recommendations: string[]
): Promise<Record<string, string>> {
  // Simulation d'une requête API
  console.log('[AI Enrichment] Requête externe simulée pour enrichir les recommandations');

  // Dans une implémentation réelle, nous appellerions une API comme OpenAI
  // Simulation de délai et de réponse
  await new Promise(resolve => setTimeout(resolve, 500));

  // Simuler des explications enrichies
  const enrichedExplanations: Record<string, string> = {};

  recommendations.forEach(recId => {
    enrichedExplanations[recId] =
      `Les dernières recherches scientifiques montrent que ce complément est particulièrement efficace pour votre profil. ` +
      `Il agit sur les voies métaboliques impliquées dans vos symptômes principaux et peut aider à résoudre les problèmes que vous avez identifiés.`;
  });

  return enrichedExplanations;
}

// Initialise la base de connaissances au chargement du module
initializeKnowledgeBase();
initializeAiModel();

export default {
  initializeKnowledgeBase,
  addToKnowledgeBase,
  generatePersonalizedRecommendations,
  updateEffectivenessScores,
  quizResponsesToUserProfile,
  updateAiModel,
  calculateProfileSimilarity,
  enrichRecommendationsWithExternalAI,
  initializeAiModel
};