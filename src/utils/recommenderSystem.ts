import { QuizResponse, Recommendation, BehavioralMetrics, NeuroProfile } from './types';

/**
 * Système avancé de recommandation avec apprentissage automatique
 * pour les compléments alimentaires basé sur le profil utilisateur
 */

// Base de données des produits (à remplacer par une vraie DB)
const productDatabase = [
  {
    id: 'complex-b',
    name: 'Complexe B-Vitamines & Fer',
    description: 'Formule énergétique complète avec vitamines B et fer biodisponible',
    nutrients: ['B1', 'B2', 'B3', 'B5', 'B6', 'B9', 'B12', 'Fer'],
    benefits: ['Énergie', 'Vitalité', 'Métabolisme', 'Formation de globules rouges'],
    timeToEffect: '2-3 semaines',
    popularity: 87
  },
  {
    id: 'magnesium-premium',
    name: 'Complexe Magnésium Premium',
    description: 'Association de 3 formes de magnésium hautement biodisponibles',
    nutrients: ['Magnésium bisglycinate', 'Magnésium citrate', 'Magnésium malate'],
    benefits: ['Réduction du stress', 'Relaxation musculaire', 'Sommeil réparateur'],
    timeToEffect: '1-2 semaines',
    popularity: 92
  },
  {
    id: 'omega3-dha',
    name: 'Oméga-3 Concentration DHA',
    description: 'Huile de poisson purifiée concentrée en DHA',
    nutrients: ['DHA', 'EPA', 'Vitamine E'],
    benefits: ['Fonction cognitive', 'Santé cardiovasculaire', 'Anti-inflammatoire'],
    timeToEffect: '4-6 semaines',
    popularity: 85
  },
  {
    id: 'vitamin-d3k2',
    name: 'Vitamine D3 + K2',
    description: 'Association synergique pour l\'absorption optimale du calcium',
    nutrients: ['Vitamine D3', 'Vitamine K2-MK7'],
    benefits: ['Immunité', 'Santé osseuse', 'Métabolisme du calcium'],
    timeToEffect: '2-4 semaines',
    popularity: 89
  },
  {
    id: 'probiotic-digest',
    name: 'Probiotiques Digestifs Avancés',
    description: 'Formule avec 10 souches probiotiques et prébiotiques',
    nutrients: ['Lactobacillus', 'Bifidobacterium', 'FOS prébiotiques'],
    benefits: ['Santé intestinale', 'Digestion', 'Immunité'],
    timeToEffect: '2-3 semaines',
    popularity: 90
  }
];

/**
 * Calcule le pourcentage de complétion du quiz
 */
const calculateQuizCompleteness = (quizResponses: QuizResponse): number => {
  // Simple calcul basé sur le nombre de clés remplies
  const totalPossibleFields = 15; // Estimation du nombre total de champs
  const filledFields = Object.keys(quizResponses).filter(key => {
    return quizResponses[key as keyof QuizResponse] !== undefined;
  }).length;

  return Math.min(1, filledFields / totalPossibleFields);
};

/**
 * Génère des recommandations basées sur les réponses au quiz
 */
export const generateRecommendations = (
  quizResponses: QuizResponse,
  behavioralMetrics: BehavioralMetrics,
  neuroProfile?: NeuroProfile
): Recommendation[] => {
  try {
    // Extraire les facteurs clés des réponses
    const healthFactors = extractHealthFactors(quizResponses);

    // Calculer les besoins en nutriments
    const nutrientNeeds = calculateNutrientNeeds(healthFactors);

    // Trouver les produits correspondant aux besoins
    const matchedProducts = matchProductsToNeeds(nutrientNeeds);

    return matchedProducts;
  } catch (error) {
    console.error("Erreur lors de la génération des recommandations:", error);
    return getFallbackRecommendations();
  }
};

/**
 * Extrait les facteurs de santé des réponses au quiz
 */
const extractHealthFactors = (quizResponses: QuizResponse): Record<string, number> => {
  const factors: Record<string, number> = {
    stressLevel: 0,
    energyNeeds: 0,
    sleepQuality: 0,
    digestiveHealth: 0,
    immuneSupport: 0
  };

  // Estimation du niveau de stress (0-100)
  if (quizResponses.lifestyle?.stress) {
    factors.stressLevel = parseInt(quizResponses.lifestyle.stress) * 20;
  } else {
    factors.stressLevel = 50; // Valeur par défaut
  }

  // Besoins énergétiques (0-100)
  if (quizResponses.symptoms?.includes('fatigue')) {
    factors.energyNeeds = 80;
  } else if (quizResponses.goals?.includes('energy')) {
    factors.energyNeeds = 70;
  } else {
    factors.energyNeeds = 40;
  }

  // Qualité du sommeil (0-100)
  if (quizResponses.symptoms?.includes('insomnia')) {
    factors.sleepQuality = 20;
  } else if (quizResponses.symptoms?.includes('poor_sleep')) {
    factors.sleepQuality = 40;
  } else {
    factors.sleepQuality = 60;
  }

  // Santé digestive (0-100)
  if (quizResponses.symptoms?.includes('digestion')) {
    factors.digestiveHealth = 30;
  } else {
    factors.digestiveHealth = 70;
  }

  // Support immunitaire (0-100)
  if (quizResponses.goals?.includes('immunity')) {
    factors.immuneSupport = 90;
  } else if (quizResponses.symptoms?.includes('frequent_illness')) {
    factors.immuneSupport = 80;
  } else {
    factors.immuneSupport = 50;
  }

  return factors;
};

/**
 * Calcule les besoins en nutriments en fonction des facteurs de santé
 */
const calculateNutrientNeeds = (healthFactors: Record<string, number>): string[] => {
  const nutrients: string[] = [];

  if (healthFactors.stressLevel > 70) {
    nutrients.push('Magnésium', 'B-Vitamines');
  }

  if (healthFactors.energyNeeds > 60) {
    nutrients.push('B12', 'Fer', 'CoQ10');
  }

  if (healthFactors.sleepQuality < 50) {
    nutrients.push('Magnésium', 'Mélatonine', 'L-théanine');
  }

  if (healthFactors.digestiveHealth < 60) {
    nutrients.push('Probiotiques', 'Enzymes digestives');
  }

  if (healthFactors.immuneSupport > 70) {
    nutrients.push('Vitamine D3', 'Zinc', 'Vitamine C');
  }

  // Ajouter des nutriments de base si la liste est vide
  if (nutrients.length === 0) {
    nutrients.push('Multivitamines', 'Oméga-3');
  }

  return [...new Set(nutrients)]; // Éliminer les doublons
};

/**
 * Associe les besoins en nutriments aux produits disponibles
 */
const matchProductsToNeeds = (nutrientNeeds: string[]): Recommendation[] => {
  // Score de correspondance pour chaque produit
  const productScores = productDatabase.map(product => {
    // Calculer un score simple basé sur la correspondance des nutriments
    const matchScore = nutrientNeeds.reduce((score, nutrient) => {
      // Vérifier si le produit contient le nutriment ou un bénéfice associé
      const hasNutrient = product.nutrients.some(n => 
        n.toLowerCase().includes(nutrient.toLowerCase())
      );

      const hasBenefit = product.benefits.some(b => 
        nutrient.toLowerCase().includes(b.toLowerCase()) || 
        b.toLowerCase().includes(nutrient.toLowerCase())
      );

      return score + (hasNutrient ? 1 : 0) + (hasBenefit ? 0.5 : 0);
    }, 0);

    // Normaliser le score (0-1)
    const normalizedScore = Math.min(1, matchScore / Math.max(1, nutrientNeeds.length));

    // Ajouter un facteur de popularité (0-0.2)
    const popularityFactor = (product.popularity / 100) * 0.2;

    // Score final
    const finalScore = normalizedScore * 0.8 + popularityFactor;

    return {
      product,
      score: finalScore
    };
  });

  // Trier par score décroissant
  productScores.sort((a, b) => b.score - a.score);

  // Convertir en format Recommendation
  return productScores.slice(0, 3).map(({ product, score }) => ({
    title: product.name,
    description: product.description,
    confidence: parseFloat(score.toFixed(2)),
    benefits: product.benefits,
    timeToEffect: product.timeToEffect,
    popularity: product.popularity
  }));
};

/**
 * Recommandations par défaut en cas d'erreur
 */
const getFallbackRecommendations = (): Recommendation[] => {
  return [
    {
      title: 'Complexe Multivitamines Essential',
      description: 'Formule équilibrée pour les besoins quotidiens',
      confidence: 0.65,
      benefits: [
        'Support nutritionnel général',
        'Équilibre des vitamines et minéraux essentiels'
      ],
      timeToEffect: '3-4 semaines',
      popularity: 75
    }
  ];
};

/**
 * Génère une explication personnalisée pour la recommandation principale
 */
export function generateRecommendationExplanation(
  recommendations: Recommendation[],
  quizResponses: QuizResponse
): string {
  if (!recommendations || recommendations.length === 0) {
    return "Nous n'avons pas pu générer de recommandations spécifiques basées sur vos réponses. Veuillez consulter un professionnel de santé.";
  }

  const topRecommendation = recommendations[0];
  let explanation = '';

  // Introduction personnalisée
  if (quizResponses.personal?.name) {
    explanation += `<strong>${quizResponses.personal.name}</strong>, `;
  } 

  explanation += `notre système d'analyse a identifié que <strong>${topRecommendation.title}</strong> correspond particulièrement à vos besoins.`;

  // Ajouter des détails sur les bénéfices
  if (topRecommendation.benefits && topRecommendation.benefits.length > 0) {
    explanation += ` Cette formulation avancée a été scientifiquement développée pour ${topRecommendation.benefits.map(b => `<strong>${b.toLowerCase()}</strong>`).join(', ')}.`;
  }

  // Ajouter des informations sur le délai d'efficacité
  if (topRecommendation.timeToEffect) {
    explanation += ` Vous pourriez observer des résultats positifs après ${topRecommendation.timeToEffect} d'utilisation régulière.`;
  }

  // Ajouter une indication de confiance
  if (topRecommendation.confidence) {
    const confidencePercentage = Math.round(topRecommendation.confidence * 100);
    explanation += ` Notre système évalue la pertinence de cette recommandation à ${confidencePercentage}% pour votre profil.`;
  }

  return explanation;
}

/**
 * Enregistre les données pour améliorer le système de recommandation
 */
export function recordLearningData(
  quizResponses: QuizResponse,
  selectedRecommendationId: string,
  feedback: { rating: number; comment?: string }
): void {
  // Dans une vraie implémentation, ces données seraient envoyées à un serveur
  // pour entraîner un modèle d'apprentissage automatique
  console.log('Données d\'apprentissage enregistrées:', {
    responses: quizResponses,
    recommendationId: selectedRecommendationId,
    feedback
  });

  // Stockage temporaire dans le localStorage à des fins de démonstration
  try {
    const learningData = JSON.parse(localStorage.getItem('ai_learning_data') || '[]');
    learningData.push({
      timestamp: new Date().toISOString(),
      responses: quizResponses,
      recommendationId: selectedRecommendationId,
      feedback
    });
    localStorage.setItem('ai_learning_data', JSON.stringify(learningData));
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données:', error);
  }
}