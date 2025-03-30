
import { QuizResponse, Recommendation, BehavioralMetrics, NeuroProfile, UserProfile, LearningData } from './types';

/**
 * Système avancé de recommandation avec apprentissage automatique
 * pour les compléments alimentaires basé sur le profil utilisateur
 */

// Base de données des produits (à remplacer par une vraie base de données)
const productsDatabase: Recommendation[] = [
  {
    title: "Complexe Magnésium + B6",
    description: "Formule avancée de magnésium hautement biodisponible combiné à la vitamine B6 pour optimiser l'absorption.",
    confidence: 0.85,
    benefits: ["Réduit le stress", "Améliore la qualité du sommeil", "Diminue la fatigue musculaire"],
    timeToEffect: "2-3 semaines",
    scientificBasis: "Études cliniques sur l'effet du magnésium sur les neurotransmetteurs impliqués dans la relaxation",
    dosage: "300-400mg par jour",
    optimalUsage: "À prendre le soir, 30 minutes avant le coucher",
    popularity: 87,
    imageUrl: "/products/magnesium-complex.jpg",
    additionalIngredients: ["Glycinate de magnésium", "Pyridoxine HCl"],
    price: "29,90€",
    brand: "NutriScience",
    ingredients: "Bisglycinate de magnésium, citrate de magnésium, vitamine B6 (pyridoxine HCl), capsule végétale (hypromellose)",
    ratingCount: 432,
    rating: 4.8
  },
  {
    title: "Omega-3 Algal DHA/EPA",
    description: "Source végétale pure d'acides gras oméga-3 DHA et EPA, extraits de microalgues cultivées en environnement contrôlé.",
    confidence: 0.92,
    benefits: ["Soutient les fonctions cognitives", "Améliore la concentration", "Réduit l'inflammation"],
    timeToEffect: "4-6 semaines",
    scientificBasis: "Multiples études sur les effets des oméga-3 sur la structure membranaire neuronale et les processus inflammatoires",
    dosage: "500-1000mg par jour",
    optimalUsage: "À prendre au repas pour maximiser l'absorption des graisses",
    popularity: 92,
    imageUrl: "/products/algal-omega3.jpg",
    additionalIngredients: ["Antioxydants naturels (tocophérols)"],
    price: "34,90€",
    brand: "PurAlgae",
    ingredients: "Huile d'algue Schizochytrium sp., capsule végétale (carraghénane, glycérine végétale), tocophérols mixtes",
    ratingCount: 387,
    rating: 4.7
  },
  {
    title: "Complexe B Méthylé",
    description: "Vitamines B sous formes méthylées actives pour une utilisation cellulaire optimale, idéal pour les variations génétiques MTHFR.",
    confidence: 0.79,
    benefits: ["Augmente l'énergie", "Améliore le métabolisme", "Soutient le système nerveux"],
    timeToEffect: "2-4 semaines",
    scientificBasis: "Recherches sur les formes bioactives des vitamines B et leur impact sur les voies métaboliques énergétiques",
    dosage: "1 gélule par jour",
    optimalUsage: "À prendre le matin avec de la nourriture",
    popularity: 76,
    imageUrl: "/products/methyl-b-complex.jpg",
    additionalIngredients: ["Choline", "Inositol"],
    price: "32,90€",
    brand: "BioActive",
    ingredients: "Méthylcobalamine (B12), méthylfolate (B9), P5P (B6 active), riboflavine-5-phosphate (B2 active), capsule végétale",
    ratingCount: 251,
    rating: 4.6
  },
  {
    title: "Ashwagandha KSM-66",
    description: "Extrait breveté de racine d'ashwagandha avec la plus haute concentration de principes actifs (withanolides).",
    confidence: 0.88,
    benefits: ["Réduit le stress et l'anxiété", "Équilibre les hormones", "Améliore la récupération"],
    timeToEffect: "4-8 semaines",
    scientificBasis: "Multiples études cliniques sur l'effet adaptogène et la réduction du cortisol",
    dosage: "300-600mg par jour",
    optimalUsage: "Prise régulière, matin ou soir selon la réponse individuelle",
    popularity: 89,
    imageUrl: "/products/ashwagandha.jpg",
    additionalIngredients: [],
    price: "27,90€",
    brand: "AdaptoGenics",
    ingredients: "Extrait de racine d'Ashwagandha KSM-66 (Withania somnifera), capsule végétale",
    ratingCount: 578,
    rating: 4.9
  },
  {
    title: "L-Théanine + Magnésium",
    description: "Combinaison synergique de L-théanine et magnésium pour favoriser la relaxation sans somnolence.",
    confidence: 0.82,
    benefits: ["Améliore la concentration calme", "Réduit l'anxiété", "Favorise la détente"],
    timeToEffect: "30 minutes - 2 heures (effet aigu), 1-2 semaines (effet cumulatif)",
    scientificBasis: "Études sur l'impact de la L-théanine sur les ondes alpha cérébrales et la relaxation",
    dosage: "200mg L-théanine, 100mg magnésium",
    optimalUsage: "Prendre avant les situations stressantes ou 30 minutes avant le coucher",
    popularity: 83,
    imageUrl: "/products/l-theanine.jpg",
    additionalIngredients: ["Glycine"],
    price: "24,90€",
    brand: "ZenBiotics",
    ingredients: "L-théanine, bisglycinate de magnésium, glycine, capsule végétale",
    ratingCount: 312,
    rating: 4.7
  },
  {
    title: "Rhodiola Rosea Premium",
    description: "Extrait standardisé de racine de rhodiola cultivée en altitude dans les montagnes de Sibérie pour une teneur maximale en principes actifs.",
    confidence: 0.76,
    benefits: ["Augmente l'énergie et l'endurance", "Améliore la résistance au stress", "Soutient la clarté mentale"],
    timeToEffect: "1-3 semaines",
    scientificBasis: "Recherches sur l'activation des voies énergétiques et l'équilibre des neurotransmetteurs",
    dosage: "200-400mg par jour",
    optimalUsage: "À prendre le matin à jeun pour maximiser l'absorption",
    popularity: 78,
    imageUrl: "/products/rhodiola.jpg",
    additionalIngredients: [],
    price: "29,90€",
    brand: "HerbalPeak",
    ingredients: "Extrait de racine de Rhodiola rosea standardisé à 3% de rosavines et 1% de salidroside, capsule végétale",
    ratingCount: 287,
    rating: 4.6
  },
  {
    title: "Complexe Zinc-Cuivre",
    description: "Équilibre optimal de zinc et cuivre pour éviter les déséquilibres minéraux tout en renforçant l'immunité et les fonctions cognitives.",
    confidence: 0.73,
    benefits: ["Renforce le système immunitaire", "Améliore la santé hormonale", "Soutient la synthèse protéique"],
    timeToEffect: "2-4 semaines",
    scientificBasis: "Études sur le rôle du zinc dans plus de 300 enzymes et fonctions immunitaires",
    dosage: "15mg zinc, 1mg cuivre",
    optimalUsage: "À prendre avec de la nourriture pour éviter les nausées",
    popularity: 71,
    imageUrl: "/products/zinc-copper.jpg",
    additionalIngredients: [],
    price: "19,90€",
    brand: "MineralBalance",
    ingredients: "Bisglycinate de zinc, bisglycinate de cuivre, capsule végétale",
    ratingCount: 189,
    rating: 4.5
  }
];

// Base de données d'apprentissage (simulée)
let learningDatabase: LearningData[] = [];

// Modèle d'apprentissage initial
let aiModel = {
  version: "1.0.0",
  accuracy: 0.85,
  lastTraining: new Date().toISOString(),
  featureImportance: {
    "age": 0.15,
    "gender": 0.05,
    "dietRestrictions": 0.2,
    "sleepQuality": 0.25,
    "stressLevel": 0.2,
    "energyLevel": 0.15
  },
  feedbackCount: 0,
  improvementRate: 0
};

/**
 * Génère des recommandations personnalisées basées sur les réponses au quiz
 */
export function generateRecommendations(
  quizResponses: QuizResponse,
  behavioralMetrics: BehavioralMetrics,
  neuroProfile: NeuroProfile
): Recommendation[] {
  // Copie de la base de données pour manipulation
  let recommendations = [...productsDatabase];
  
  // Scores de correspondance initiaux (tous à 0)
  recommendations = recommendations.map(rec => ({
    ...rec,
    matchScore: 0
  }));
  
  // Analyse des réponses au quiz pour définir les priorités
  
  // 1. Facteurs de stress et sommeil
  if (quizResponses.wellbeing) {
    // Niveau de stress élevé
    if (quizResponses.wellbeing.stressLevel === 'high') {
      recommendations = recommendations.map(rec => {
        if (rec.benefits && rec.benefits.some(b => 
          b.toLowerCase().includes('stress') || 
          b.toLowerCase().includes('anxiété') || 
          b.toLowerCase().includes('cortisol')
        )) {
          return { ...rec, matchScore: (rec.matchScore || 0) + 30 };
        }
        return rec;
      });
    }
    
    // Problèmes de sommeil
    if (quizResponses.wellbeing.sleepQuality === 'poor') {
      recommendations = recommendations.map(rec => {
        if (rec.benefits && rec.benefits.some(b => 
          b.toLowerCase().includes('sommeil') || 
          b.toLowerCase().includes('dormir') || 
          b.toLowerCase().includes('mélatonine')
        )) {
          return { ...rec, matchScore: (rec.matchScore || 0) + 25 };
        }
        return rec;
      });
    }
    
    // Niveau d'énergie bas
    if (quizResponses.wellbeing.energyLevel === 'low') {
      recommendations = recommendations.map(rec => {
        if (rec.benefits && rec.benefits.some(b => 
          b.toLowerCase().includes('énergie') || 
          b.toLowerCase().includes('fatigue') || 
          b.toLowerCase().includes('vitalité')
        )) {
          return { ...rec, matchScore: (rec.matchScore || 0) + 25 };
        }
        return rec;
      });
    }
  }
  
  // 2. Objectifs de santé
  if (quizResponses.goals && quizResponses.goals.healthGoals) {
    quizResponses.goals.healthGoals.forEach(goal => {
      if (goal.includes('concentration') || goal.includes('mémoire') || goal.includes('cogniti')) {
        recommendations = recommendations.map(rec => {
          if (rec.benefits && rec.benefits.some(b => 
            b.toLowerCase().includes('cognitiv') || 
            b.toLowerCase().includes('concentr') || 
            b.toLowerCase().includes('mémoire') ||
            b.toLowerCase().includes('cerveau')
          )) {
            return { ...rec, matchScore: (rec.matchScore || 0) + 20 };
          }
          return rec;
        });
      }
      
      if (goal.includes('poids') || goal.includes('mincir') || goal.includes('maigrir')) {
        recommendations = recommendations.map(rec => {
          if (rec.benefits && rec.benefits.some(b => 
            b.toLowerCase().includes('poids') || 
            b.toLowerCase().includes('métabol') || 
            b.toLowerCase().includes('graisse')
          )) {
            return { ...rec, matchScore: (rec.matchScore || 0) + 20 };
          }
          return rec;
        });
      }
    });
  }
  
  // 3. Régime alimentaire et restrictions
  if (quizResponses.diet) {
    if (quizResponses.diet.restrictions && quizResponses.diet.restrictions.includes('vegetarian')) {
      // Filtrer uniquement les produits végétariens
      recommendations = recommendations.filter(rec => 
        !rec.ingredients || 
        !(rec.ingredients.toLowerCase().includes('gelatin') || 
          rec.ingredients.toLowerCase().includes('animal'))
      );
    }
    
    if (quizResponses.diet.restrictions && quizResponses.diet.restrictions.includes('vegan')) {
      // Filtrer uniquement les produits végans
      recommendations = recommendations.filter(rec => 
        rec.ingredients && 
        rec.ingredients.toLowerCase().includes('végétal') || 
        rec.ingredients.toLowerCase().includes('plant') || 
        rec.title.toLowerCase().includes('algal')
      );
    }
    
    // Allergies
    if (quizResponses.diet.allergies) {
      quizResponses.diet.allergies.forEach(allergy => {
        recommendations = recommendations.filter(rec => 
          !rec.ingredients || !rec.ingredients.toLowerCase().includes(allergy.toLowerCase())
        );
      });
    }
  }
  
  // 4. Application des connaissances du modèle d'apprentissage
  // Ajustement des scores basé sur les facteurs d'importance du modèle
  if (quizResponses.personal) {
    if (quizResponses.personal.age) {
      const age = parseInt(quizResponses.personal.age);
      if (age > 50) {
        // Pour les personnes plus âgées, prioriser les produits pour la cognition
        recommendations = recommendations.map(rec => {
          if (rec.benefits && rec.benefits.some(b => 
            b.toLowerCase().includes('mémoire') || 
            b.toLowerCase().includes('cognitif')
          )) {
            return { 
              ...rec, 
              matchScore: (rec.matchScore || 0) + (15 * aiModel.featureImportance.age) 
            };
          }
          return rec;
        });
      } else if (age < 30) {
        // Pour les plus jeunes, prioriser l'énergie et la performance
        recommendations = recommendations.map(rec => {
          if (rec.benefits && rec.benefits.some(b => 
            b.toLowerCase().includes('énergie') || 
            b.toLowerCase().includes('performance')
          )) {
            return { 
              ...rec, 
              matchScore: (rec.matchScore || 0) + (15 * aiModel.featureImportance.age) 
            };
          }
          return rec;
        });
      }
    }
  }
  
  // 5. Prise en compte des métriques comportementales pour affiner
  if (behavioralMetrics.sessionDuration < 120) { // Session courte (<2min)
    // Si l'utilisateur a répondu rapidement, favoriser les recommandations à effet rapide
    recommendations = recommendations.map(rec => {
      if (rec.timeToEffect && 
          (rec.timeToEffect.includes('heure') || 
           rec.timeToEffect.includes('minute') || 
           rec.timeToEffect.includes('jour'))) {
        return { ...rec, matchScore: (rec.matchScore || 0) + 10 };
      }
      return rec;
    });
  }
  
  // 6. Prise en compte du profil neuro pour la présentation
  if (neuroProfile.decisionStyle === 'analytical') {
    // Pour les profils analytiques, favoriser les produits à forte base scientifique
    recommendations = recommendations.map(rec => {
      if (rec.scientificBasis) {
        return { ...rec, matchScore: (rec.matchScore || 0) + 15 };
      }
      return rec;
    });
  }
  
  // Ajustement de la confiance basé sur le score de correspondance
  recommendations = recommendations.map(rec => {
    const normalizedScore = (rec.matchScore || 0) / 100;
    // Ajustement de la confiance: moyenne pondérée entre la confiance initiale et le score normalisé
    const adjustedConfidence = (rec.confidence * 0.7) + (normalizedScore * 0.3);
    return {
      ...rec,
      confidence: Math.min(0.98, adjustedConfidence) // Plafonner à 98% pour éviter une confiance trop parfaite
    };
  });
  
  // Trier par score de correspondance puis confiance
  recommendations.sort((a, b) => {
    if (b.matchScore !== a.matchScore) return (b.matchScore || 0) - (a.matchScore || 0);
    return b.confidence - a.confidence;
  });
  
  // Retourner les 3 meilleures recommandations
  return recommendations.slice(0, 3);
}

/**
 * Génère une explication personnalisée pour la recommandation principale
 */
export function generateRecommendationExplanation(
  quizResponses: QuizResponse,
  topRecommendation: Recommendation
): string {
  let explanation = `<strong>D'après votre profil</strong>, nous avons identifié que ${topRecommendation.title} pourrait vous apporter des bénéfices significatifs. `;
  
  // Personnaliser l'explication selon les réponses au quiz
  if (quizResponses.wellbeing) {
    if (quizResponses.wellbeing.stressLevel === 'high') {
      explanation += `Votre niveau de stress élevé indique un besoin de soutien pour équilibrer vos neurotransmetteurs et réduire le cortisol. `;
    }
    
    if (quizResponses.wellbeing.sleepQuality === 'poor') {
      explanation += `Améliorer votre qualité de sommeil est une priorité pour restaurer vos cycles énergétiques naturels. `;
    }
    
    if (quizResponses.wellbeing.energyLevel === 'low') {
      explanation += `Votre niveau d'énergie pourrait être significativement amélioré avec les bons nutriments. `;
    }
  }
  
  // Ajouter les principaux bénéfices
  if (topRecommendation.benefits && topRecommendation.benefits.length > 0) {
    explanation += `Les recherches montrent que ce complément peut ${topRecommendation.benefits.map(b => `<strong>${b.toLowerCase()}</strong>`).join(', ')}.`;
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
  feedback: { helpful: boolean; purchaseIntent: number; additionalComments?: string }
): void {
  // Dans une vraie implémentation, ces données seraient envoyées à un serveur
  // pour entraîner un modèle d'apprentissage automatique
  
  const learningData: LearningData = {
    timestamp: new Date().toISOString(),
    quizData: quizResponses,
    recommendationId: selectedRecommendationId,
    userFeedback: feedback,
    sessionInfo: {
      browser: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  };
  
  // Ajouter à notre base de données d'apprentissage locale
  learningDatabase.push(learningData);
  
  // Mise à jour du compteur de feedback
  aiModel.feedbackCount += 1;
  
  // Dans un système réel, on déclencherait un réentraînement du modèle
  // après avoir accumulé suffisamment de nouvelles données
  if (aiModel.feedbackCount % 10 === 0) {
    updateModelWithNewData();
  }
  
  console.log('Données d\'apprentissage enregistrées:', learningData);
}

/**
 * Met à jour le modèle avec les nouvelles données (simulation)
 */
function updateModelWithNewData(): void {
  // Simulation d'une amélioration du modèle
  aiModel.accuracy = Math.min(0.98, aiModel.accuracy + 0.005);
  aiModel.lastTraining = new Date().toISOString();
  
  // Ajuster les importances de caractéristiques basées sur les feedbacks
  const positiveResponses = learningDatabase.filter(data => data.userFeedback.helpful);
  
  if (positiveResponses.length > 0) {
    // Calculer la nouvelle importance des facteurs
    const ageFactors = positiveResponses.filter(data => 
      data.quizData.personal && data.quizData.personal.age
    ).length / positiveResponses.length;
    
    const sleepFactors = positiveResponses.filter(data => 
      data.quizData.wellbeing && data.quizData.wellbeing.sleepQuality === 'poor'
    ).length / positiveResponses.length;
    
    const stressFactors = positiveResponses.filter(data => 
      data.quizData.wellbeing && data.quizData.wellbeing.stressLevel === 'high'
    ).length / positiveResponses.length;
    
    // Ajuster graduellement les importances
    aiModel.featureImportance.age = (aiModel.featureImportance.age * 0.8) + (ageFactors * 0.2);
    aiModel.featureImportance.sleepQuality = (aiModel.featureImportance.sleepQuality * 0.8) + (sleepFactors * 0.2);
    aiModel.featureImportance.stressLevel = (aiModel.featureImportance.stressLevel * 0.8) + (stressFactors * 0.2);
  }
  
  // Calculer le taux d'amélioration
  const previousFeedbacks = learningDatabase.slice(0, Math.max(0, learningDatabase.length - 10));
  const recentFeedbacks = learningDatabase.slice(Math.max(0, learningDatabase.length - 10));
  
  if (previousFeedbacks.length > 0 && recentFeedbacks.length > 0) {
    const previousHelpfulRate = previousFeedbacks.filter(data => data.userFeedback.helpful).length / previousFeedbacks.length;
    const recentHelpfulRate = recentFeedbacks.filter(data => data.userFeedback.helpful).length / recentFeedbacks.length;
    
    aiModel.improvementRate = (recentHelpfulRate - previousHelpfulRate) * 100;
  }
  
  console.log('Modèle mis à jour:', aiModel);
}

/**
 * Permet de récupérer l'état actuel du modèle d'apprentissage (pour l'UI/stats)
 */
export function getAIModelStatus() {
  return {
    accuracy: aiModel.accuracy,
    feedbackCount: aiModel.feedbackCount,
    lastTraining: aiModel.lastTraining,
    topFeatures: Object.entries(aiModel.featureImportance)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key, value]) => ({ name: key, importance: value })),
    version: aiModel.version,
    improvementRate: aiModel.improvementRate
  };
}
