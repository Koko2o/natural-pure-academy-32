import { QuizResponse, Recommendation, BehavioralMetrics, NeuroProfile } from './types';

/**
 * Système avancé de recommandation avec apprentissage automatique
 * pour les compléments alimentaires basé sur le profil utilisateur
 */

// Base de connaissances étendue des nutriments et leurs effets
const nutrientKnowledgeBase = {
  magnesium: {
    benefits: ['réduction du stress', 'amélioration du sommeil', 'fonction musculaire'],
    deficiencySymptoms: ['fatigue', 'crampes', 'irritabilité'],
    synergies: ['vitamine B6', 'zinc'],
    contraindications: ['insuffisance rénale sévère'],
    optimalDosage: {
      default: '300-400mg',
      stressHigh: '400-500mg',
      athletic: '400-600mg',
      elderly: '300-350mg'
    },
    timeToEffect: '2-3 semaines',
    forms: [
      { name: 'bisglycinate', bioavailability: 'élevée', gentleOnStomach: true },
      { name: 'citrate', bioavailability: 'moyenne', gentleOnStomach: true },
      { name: 'oxide', bioavailability: 'faible', gentleOnStomach: false }
    ]
  },
  omega3: {
    benefits: ['fonction cognitive', 'santé cardiovasculaire', 'anti-inflammatoire'],
    deficiencySymptoms: ['sécheresse cutanée', 'troubles de la concentration', 'fatigue'],
    synergies: ['vitamine E', 'vitamine D'],
    contraindications: ['troubles de la coagulation', 'allergie aux fruits de mer'],
    optimalDosage: {
      default: '1000-2000mg',
      cognitiveSupport: '2000-3000mg',
      cardiovascular: '2000-4000mg',
      antiInflammatory: '3000-4000mg'
    },
    timeToEffect: '8-12 semaines',
    forms: [
      { name: 'huile de poisson', epaRatio: 'variable', sustainable: false },
      { name: 'algue marine', epaRatio: 'moyenne', sustainable: true },
      { name: 'krill', epaRatio: 'élevée', sustainable: false }
    ]
  },
  vitaminD: {
    benefits: ['immunité', 'santé osseuse', 'humeur'],
    deficiencySymptoms: ['fatigue', 'douleurs osseuses', 'faiblesse musculaire'],
    synergies: ['vitamine K2', 'magnésium', 'calcium'],
    contraindications: ['hypercalcémie'],
    optimalDosage: {
      default: '1000-2000 UI',
      deficiency: '5000 UI',
      maintenance: '2000 UI',
      elderly: '2000-4000 UI'
    },
    timeToEffect: '4-6 semaines',
    forms: [
      { name: 'D3 (cholécalciférol)', bioavailability: 'élevée', animalDerived: true },
      { name: 'D2 (ergocalciférol)', bioavailability: 'moyenne', animalDerived: false }
    ]
  },
  probiotics: {
    benefits: ['santé digestive', 'immunité', 'production de vitamines'],
    deficiencySymptoms: ['troubles digestifs', 'infections récurrentes'],
    synergies: ['prébiotiques', 'enzymes digestives'],
    contraindications: ['immunodéficience sévère'],
    optimalDosage: {
      default: '10-30 milliards UFC',
      acuteConditions: '50-100 milliards UFC',
      maintenance: '5-15 milliards UFC'
    },
    timeToEffect: '2-4 semaines',
    forms: [
      { name: 'multi-souches', coverage: 'large', stability: 'variable' },
      { name: 'spore-forming', coverage: 'modérée', stability: 'excellente' }
    ]
  },
  zinc: {
    benefits: ['immunité', 'santé hormonale', 'cicatrisation'],
    deficiencySymptoms: ['perte de goût', 'cheveux cassants', 'immunité réduite'],
    synergies: ['cuivre', 'vitamine C'],
    contraindications: ['excès de cuivre'],
    optimalDosage: {
      default: '15-30mg',
      immuneSupport: '30-50mg',
      acuteConditions: '50-75mg',
      dailyMaintenance: '15mg'
    },
    timeToEffect: '2-4 semaines',
    forms: [
      { name: 'picolinate', bioavailability: 'élevée', gentleOnStomach: true },
      { name: 'gluconate', bioavailability: 'moyenne', gentleOnStomach: true },
      { name: 'oxide', bioavailability: 'faible', gentleOnStomach: false }
    ]
  }
};

// Base de données des produits (simulée - dans un système réel, cette information
// viendrait d'une API ou d'une base de données)
const productDatabase: Recommendation[] = [
  {
    title: "Complexe Magnésium-B6 BioAssimilable Premium",
    description: "Formule avancée de magnésium bisglycinate avec B6 active pour une absorption optimale et une réduction du stress.",
    url: "/products/magnesium-b6-premium",
    confidence: 0.95,
    benefits: ["Réduction du stress", "Amélioration du sommeil", "Fonction musculaire optimale", "Soutien cognitif"],
    timeToEffect: "2-3 semaines",
    popularity: 92,
    scientificBasis: "Études cliniques démontrant l'impact du magnésium bisglycinate sur les niveaux de cortisol et la qualité du sommeil",
    dosage: "400mg de magnésium élémentaire (forme bisglycinate), 25mg de B6 (P5P)",
    optimalUsage: "Prendre le soir pour améliorer le sommeil ou divisé en 2 prises pour le stress chronique",
    additionalIngredients: ["P5P (B6 active)", "Glycine"]
  },
  {
    title: "Oméga-3 Algue Marine Concentré DHA/EPA",
    description: "Source végétale d'oméga-3 à forte concentration en DHA/EPA pour soutien cognitif et cardiovasculaire.",
    url: "/products/omega3-algae-dha",
    confidence: 0.88,
    benefits: ["Fonction cognitive", "Santé cardiovasculaire", "Anti-inflammatoire", "Support hormonal"],
    timeToEffect: "8-12 semaines",
    popularity: 85,
    scientificBasis: "Études montrant l'accumulation des oméga-3 dans les membranes cellulaires et leur effet sur l'inflammation systémique",
    dosage: "1000mg dont 500mg DHA et 250mg EPA",
    optimalUsage: "Prendre avec un repas contenant des graisses pour absorption optimale",
    additionalIngredients: ["Vitamine E (antioxydant)", "Extrait de romarin (préservation)"]
  },
  {
    title: "Vitamine D3+K2 Liposomale",
    description: "Formulation liposomale de D3 et K2-MK7 pour une biodisponibilité et synergie maximales.",
    url: "/products/d3-k2-liposomal",
    confidence: 0.91,
    benefits: ["Immunité renforcée", "Santé osseuse", "Métabolisme du calcium", "Santé cardiovasculaire"],
    timeToEffect: "4-6 semaines",
    popularity: 89,
    scientificBasis: "Recherches sur la synergie D3-K2 et l'amélioration de l'absorption via technologie liposomale",
    dosage: "4000 UI D3, 100mcg K2-MK7",
    optimalUsage: "Prise quotidienne le matin avec un repas contenant des graisses",
    additionalIngredients: ["Phospholipides de tournesol", "Glycérine végétale"]
  },
  {
    title: "Complexe Probiotiques Multi-Souches",
    description: "15 souches probiotiques sélectionnées avec technologie de libération contrôlée pour atteindre l'intestin intact.",
    url: "/products/multi-strain-probiotics",
    confidence: 0.87,
    benefits: ["Santé digestive", "Immunité", "Synthèse de vitamines", "Équilibre du microbiome"],
    timeToEffect: "2-4 semaines",
    popularity: 83,
    scientificBasis: "Études cliniques sur l'impact des souches sélectionnées sur la diversité du microbiome",
    dosage: "50 milliards UFC, 15 souches",
    optimalUsage: "Prendre à jeun le matin ou avant le coucher pour une colonisation optimale",
    additionalIngredients: ["Inuline (prébiotique)", "Fructo-oligosaccharides"]
  },
  {
    title: "Zinc Picolinate Hautement Biodisponible",
    description: "Forme hautement absorbable de zinc avec cuivre pour équilibre optimal des minéraux.",
    url: "/products/zinc-picolinate-premium",
    confidence: 0.89,
    benefits: ["Immunité renforcée", "Équilibre hormonal", "Santé de la peau", "Fonction antioxydante"],
    timeToEffect: "2-4 semaines",
    popularity: 86,
    scientificBasis: "Recherches comparatives sur l'absorption du zinc picolinate vs autres formes",
    dosage: "30mg zinc, 2mg cuivre",
    optimalUsage: "Prendre avec un repas pour minimiser irritation gastrique",
    additionalIngredients: ["Cuivre bisglycinate", "Vitamine C"]
  },
  {
    title: "Complexe Adaptogènes Premium",
    description: "Mélange synergique d'adaptogènes pour aider le corps à s'adapter au stress et améliorer la résilience.",
    url: "/products/premium-adaptogen-complex",
    confidence: 0.85,
    benefits: ["Gestion du stress", "Énergie stable", "Clarté mentale", "Équilibre hormonal"],
    timeToEffect: "3-6 semaines",
    popularity: 79,
    scientificBasis: "Études sur l'effet des adaptogènes sur les axes HPA et leur modulation du cortisol",
    dosage: "Ashwagandha 600mg, Rhodiola 300mg, Ginseng 200mg",
    optimalUsage: "Prendre le matin pour l'énergie ou divisé en 2 prises pour équilibrer le stress",
    additionalIngredients: ["Extrait de poivre noir (biodisponibilité)", "Schisandra"]
  },
  {
    title: "Sommeil Naturel Advanced",
    description: "Formule apaisante à base de mélatonine naturelle, magnésium et plantes relaxantes.",
    url: "/products/advanced-natural-sleep",
    confidence: 0.90,
    benefits: ["Amélioration du sommeil", "Réduction du temps d'endormissement", "Sommeil réparateur", "Régulation circadienne"],
    timeToEffect: "3-5 jours",
    popularity: 95,
    scientificBasis: "Études sur l'interaction entre mélatonine, GABA et magnésium sur l'architecture du sommeil",
    dosage: "Mélatonine 1mg, Magnésium 150mg, L-Théanine 200mg",
    optimalUsage: "Prendre 30-60 minutes avant le coucher dans un environnement calme",
    additionalIngredients: ["L-Théanine", "Passiflore", "GABA"]
  }
];

/**
 * Analyse les facteurs de santé à partir des réponses au quiz
 */
export function analyzeHealthFactors(quizResponses: QuizResponse) {
  const factors: any = {
    age: null,
    gender: null,
    weightStatus: null,
    lifestyleActivity: null,
    stressLevel: null,
    sleepQuality: null,
    dietQuality: null,
    healthGoals: []
  };

  // Analyse de l'âge
  if (quizResponses.personal?.age) {
    factors.age = Number(quizResponses.personal.age);
  }

  // Analyse du genre
  if (quizResponses.personal?.gender) {
    factors.gender = quizResponses.personal.gender;
  }

  // Analyse du poids
  if (quizResponses.personal?.weight && quizResponses.personal?.height) {
    const weight = Number(quizResponses.personal.weight);
    const height = Number(quizResponses.personal.height) / 100; // conversion en mètres
    const bmi = weight / (height * height);

    if (bmi < 18.5) factors.weightStatus = 'underweight';
    else if (bmi < 25) factors.weightStatus = 'normal';
    else if (bmi < 30) factors.weightStatus = 'overweight';
    else factors.weightStatus = 'obese';
  }

  // Évaluation du niveau d'activité
  if (quizResponses.lifestyle?.weeklyActivity) {
    const activity = Number(quizResponses.lifestyle.weeklyActivity);
    if (activity < 3) factors.lifestyleActivity = 'sedentary';
    else if (activity >= 7) factors.lifestyleActivity = 'active';
    else factors.lifestyleActivity = 'moderate';
  }

  // Évaluation du niveau de stress
  if (quizResponses.wellbeing?.stressLevel) {
    factors.stressLevel = Number(quizResponses.wellbeing.stressLevel) * 10; // Conversion sur échelle 0-100
  }

  // Évaluation de la qualité du sommeil
  if (quizResponses.wellbeing?.sleepQuality) {
    factors.sleepQuality = Number(quizResponses.wellbeing.sleepQuality) * 10; // Conversion sur échelle 0-100
  }

  // Évaluation de la qualité alimentaire
  if (quizResponses.diet?.qualityRating) {
    factors.dietQuality = Number(quizResponses.diet.qualityRating) * 10; // Conversion sur échelle 0-100
  }

  // Objectifs de santé
  if (quizResponses.goals?.healthGoals && Array.isArray(quizResponses.goals.healthGoals)) {
    factors.healthGoals = quizResponses.goals.healthGoals;
  }

  // Symptômes rapportés
  if (quizResponses.symptoms) {
    factors.symptoms = quizResponses.symptoms;
  }

  return factors;
}

/**
 * Calcule les besoins en nutriments basés sur le profil de santé
 */
function calculateNutrientNeeds(healthFactors: any): Record<string, number> {
  const nutrientNeeds: Record<string, number> = {
    magnesium: 0,
    omega3: 0,
    vitaminD: 0,
    zinc: 0,
    probiotics: 0,
    adaptogenic: 0,
    sleep: 0
  };

  // Calcul des besoins en magnésium
  if (healthFactors.stressLevel > 60) nutrientNeeds.magnesium += 30;
  if (healthFactors.sleepQuality < 40) nutrientNeeds.magnesium += 25;
  if (healthFactors.lifestyleActivity === 'active') nutrientNeeds.magnesium += 20;

  // Calcul des besoins en oméga-3
  if (healthFactors.healthGoals.includes('cognitive_function')) nutrientNeeds.omega3 += 30;
  if (healthFactors.healthGoals.includes('heart_health')) nutrientNeeds.omega3 += 25;
  if (healthFactors.dietQuality < 50) nutrientNeeds.omega3 += 20;

  // Calcul des besoins en vitamine D
  if (healthFactors.healthGoals.includes('bone_health')) nutrientNeeds.vitaminD += 30;
  if (healthFactors.healthGoals.includes('immune_support')) nutrientNeeds.vitaminD += 25;
  if (healthFactors.age > 50) nutrientNeeds.vitaminD += 20;

  // Calcul des besoins en zinc
  if (healthFactors.healthGoals.includes('immune_support')) nutrientNeeds.zinc += 35;
  if (healthFactors.healthGoals.includes('skin_health')) nutrientNeeds.zinc += 25;
  if (healthFactors.healthGoals.includes('hormone_balance')) nutrientNeeds.zinc += 20;

  // Calcul des besoins en probiotiques
  if (healthFactors.symptoms?.includes('digestive_issues')) nutrientNeeds.probiotics += 35;
  if (healthFactors.healthGoals.includes('immune_support')) nutrientNeeds.probiotics += 20;
  if (healthFactors.healthGoals.includes('gut_health')) nutrientNeeds.probiotics += 30;

  // Calcul des besoins en adaptogènes
  if (healthFactors.stressLevel > 70) nutrientNeeds.adaptogenic += 35;
  if (healthFactors.healthGoals.includes('stress_management')) nutrientNeeds.adaptogenic += 30;
  if (healthFactors.healthGoals.includes('energy')) nutrientNeeds.adaptogenic += 25;

  // Calcul des besoins en aide au sommeil
  if (healthFactors.sleepQuality < 30) nutrientNeeds.sleep += 40;
  if (healthFactors.healthGoals.includes('better_sleep')) nutrientNeeds.sleep += 35;
  if (healthFactors.stressLevel > 60) nutrientNeeds.sleep += 20;

  return nutrientNeeds;
}

/**
 * Transforme les besoins en nutriments en recommandations de produits spécifiques
 */
function matchProductsToNeeds(nutrientNeeds: Record<string, number>, allProducts: Recommendation[]): Recommendation[] {
  // Normaliser les scores de besoins pour avoir une somme de 100%
  const totalNeedScore = Object.values(nutrientNeeds).reduce((sum, score) => sum + score, 0);
  const normalizedNeeds: Record<string, number> = {};

  for (const [nutrient, score] of Object.entries(nutrientNeeds)) {
    normalizedNeeds[nutrient] = totalNeedScore > 0 ? (score / totalNeedScore) : 0;
  }

  // Attribuer un score à chaque produit en fonction des besoins
  const scoredProducts = allProducts.map(product => {
    let matchScore = 0;

    // Attribuer des points basés sur les correspondances entre besoins et produits
    if (product.title.toLowerCase().includes('magnésium') && normalizedNeeds.magnesium > 0) {
      matchScore += normalizedNeeds.magnesium * 100;
    }

    if (product.title.toLowerCase().includes('oméga-3') && normalizedNeeds.omega3 > 0) {
      matchScore += normalizedNeeds.omega3 * 100;
    }

    if (product.title.toLowerCase().includes('vitamine d') && normalizedNeeds.vitaminD > 0) {
      matchScore += normalizedNeeds.vitaminD * 100;
    }

    if (product.title.toLowerCase().includes('zinc') && normalizedNeeds.zinc > 0) {
      matchScore += normalizedNeeds.zinc * 100;
    }

    if (product.title.toLowerCase().includes('probiotiques') && normalizedNeeds.probiotics > 0) {
      matchScore += normalizedNeeds.probiotics * 100;
    }

    if (product.title.toLowerCase().includes('adaptogènes') && normalizedNeeds.adaptogenic > 0) {
      matchScore += normalizedNeeds.adaptogenic * 100;
    }

    if (product.title.toLowerCase().includes('sommeil') && normalizedNeeds.sleep > 0) {
      matchScore += normalizedNeeds.sleep * 100;
    }

    // Ajustement de la confiance en fonction du score de correspondance
    const adjustedConfidence = (product.confidence * 0.4) + (matchScore * 0.01 * 0.6);

    return {
      ...product,
      confidence: Math.min(0.99, adjustedConfidence), // Limiter à 0.99 maximum
      matchScore
    };
  });

  // Trier par score de correspondance décroissant
  return scoredProducts
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 3); // Retourner les 3 meilleures recommandations
}

/**
 * Génère des recommandations personnalisées basées sur les réponses au quiz
 * et les métriques comportementales de l'utilisateur
 */
export const generateRecommendations = (
  quizResponse: QuizResponse,
  behavioralMetrics?: BehavioralMetrics,
  neuroProfile?: NeuroProfile
): Recommendation[] => {
  // Obtenir les facteurs de santé
  const healthFactors = analyzeHealthFactors(quizResponse);

  // Calculer les besoins en nutriments
  const nutrientNeeds = calculateNutrientNeeds(healthFactors);

  // Trouver les produits correspondants aux besoins
  const matchedProducts = matchProductsToNeeds(nutrientNeeds, productDatabase);

  // Stabilisation des résultats pour éviter les fluctuations
  const sessionId = getSessionIdWithTimestampRounding();

  // Génération d'un identifiant unique par session pour assurer la cohérence des recommandations
  function getSessionIdWithTimestampRounding() {
    // Arrondir au jour près pour éviter les changements fréquents
    const today = new Date();
    const dayRounded = today.getDate();
    const monthRounded = today.getMonth();
    return `${dayRounded}-${monthRounded}-stable-recommendations`;
  }

  return matchedProducts;
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
  let explanation = ``;

  // Introduction personnalisée
  if (quizResponses.personal?.name) {
    explanation += `<strong>${quizResponses.personal.name}</strong>, `;
  }

  explanation += `d'après votre profil, nous recommandons principalement le complément "${topRecommendation.title}" qui correspond particulièrement à vos besoins. `;

  // Explication des bénéfices spécifiques
  if (topRecommendation.benefits && topRecommendation.benefits.length > 0) {
    explanation += `Ce produit a été sélectionné pour ses bénéfices clés : ${topRecommendation.benefits.slice(0, 3).join(', ')}. `;
  }

  // Inclusion des bases scientifiques
  if (topRecommendation.scientificBasis) {
    explanation += `Cette recommandation est basée sur ${topRecommendation.scientificBasis}. `;
  }

  // Information sur le dosage optimal
  if (topRecommendation.dosage) {
    explanation += `Le dosage optimal pour votre profil est ${topRecommendation.dosage}. `;
  }

  // Conseils d'utilisation
  if (topRecommendation.optimalUsage) {
    explanation += `Pour des résultats optimaux, ${topRecommendation.optimalUsage}. `;
  }

  // Information sur le niveau de confiance
  explanation += `Notre algorithme indique une correspondance de ${Math.round(topRecommendation.confidence * 100)}% avec votre profil. `;

  // Informations sur le temps d'effet
  explanation += `La plupart des utilisateurs constatent des résultats positifs après ${topRecommendation.timeToEffect} d'utilisation régulière.`;

  return explanation;
}

/**
 * Enregistre les données d'apprentissage pour améliorer les recommandations futures
 */
export function recordLearningData(
  quizResponse: QuizResponse,
  recommendation: Recommendation,
  userFeedback: {
    helpful: boolean;
    purchaseIntent: number; // échelle 1-10
    additionalComments?: string;
  }
): void {
  // Dans un système réel, cette fonction enverrait les données à une API d'apprentissage
  console.log('Enregistrement des données d\'apprentissage pour amélioration future');

  // Simulation d'envoi de données à un service d'apprentissage automatique
  const learningPayload = {
    timestamp: new Date().toISOString(),
    quizData: quizResponse,
    recommendationId: recommendation.title,
    userFeedback,
    sessionInfo: {
      browser: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  };

  // Dans une implémentation réelle, envoi à une API
  // fetch('/api/learning-system/record', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(learningPayload)
  // });

  // Pour le moment, stockage local pour démonstration
  try {
    const existingData = localStorage.getItem('recommendation_learning_data');
    const parsedData = existingData ? JSON.parse(existingData) : [];
    parsedData.push(learningPayload);
    localStorage.setItem('recommendation_learning_data', JSON.stringify(parsedData));
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données d\'apprentissage:', error);
  }
}