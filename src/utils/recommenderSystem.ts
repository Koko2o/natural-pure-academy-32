
import { 
  QuizResponse, 
  Recommendation, 
  BehavioralMetrics, 
  NeuroProfile,
  UserFeedback,
  LearningData
} from './types';
import { aiModel } from './aiLearning';
import { findSimilarProfiles } from './userSimilarity';
import { secureStorageService as secureStorage } from './secureStorage';

/**
 * Base de connaissance pour les recommandations basées sur les symptômes
 */
const SYMPTOM_RECOMMENDATIONS = {
  // Symptômes de stress
  'stress': [
    { id: 'ashwagandha', priority: 5, doseVegetarian: '500mg x2/jour', doseStandard: '500mg x2/jour' },
    { id: 'rhodiola', priority: 4, doseVegetarian: '400mg/jour', doseStandard: '400mg/jour' },
    { id: 'magnesium-glycinate', priority: 4, doseVegetarian: '300mg/jour', doseStandard: '300mg/jour' },
    { id: 'l-theanine', priority: 3, doseVegetarian: '200mg/jour', doseStandard: '200mg/jour' }
  ],
  
  // Symptômes de fatigue et manque d'énergie
  'fatigue': [
    { id: 'coq10', priority: 5, doseVegetarian: '100mg/jour', doseStandard: '100mg/jour' },
    { id: 'b-complex', priority: 4, doseVegetarian: '1 comprimé/jour', doseStandard: '1 comprimé/jour' },
    { id: 'iron-complex', priority: 4, doseVegetarian: '18mg/jour', doseStandard: '8mg/jour' },
    { id: 'maca-root', priority: 3, doseVegetarian: '1500mg/jour', doseStandard: '1500mg/jour' }
  ],
  
  // Symptômes de troubles du sommeil
  'insomnia': [
    { id: 'melatonin', priority: 5, doseVegetarian: '1-3mg avant le coucher', doseStandard: '1-3mg avant le coucher' },
    { id: 'valerian-root', priority: 4, doseVegetarian: '300-600mg avant le coucher', doseStandard: '300-600mg avant le coucher' },
    { id: 'magnesium-glycinate', priority: 3, doseVegetarian: '300mg avant le coucher', doseStandard: '300mg avant le coucher' }
  ],
  
  // Symptômes de troubles de concentration
  'concentration': [
    { id: 'omega-3-algae', priority: 5, doseVegetarian: '1000mg EPA+DHA/jour', doseStandard: null },
    { id: 'omega-3-fish-oil', priority: 5, doseVegetarian: null, doseStandard: '1000mg EPA+DHA/jour' },
    { id: 'ginkgo-biloba', priority: 4, doseVegetarian: '120mg/jour', doseStandard: '120mg/jour' },
    { id: 'bacopa-monnieri', priority: 4, doseVegetarian: '300mg/jour', doseStandard: '300mg/jour' },
    { id: 'lions-mane', priority: 3, doseVegetarian: '1000mg/jour', doseStandard: '1000mg/jour' }
  ],
  
  // Symptômes digestifs
  'digestion': [
    { id: 'probiotics', priority: 5, doseVegetarian: '10-30 milliards CFU/jour', doseStandard: '10-30 milliards CFU/jour' },
    { id: 'digestive-enzymes', priority: 4, doseVegetarian: '1 capsule avant repas', doseStandard: '1 capsule avant repas' },
    { id: 'ginger-extract', priority: 3, doseVegetarian: '500mg/jour', doseStandard: '500mg/jour' }
  ]
};

/**
 * Base de connaissance pour les recommandations basées sur les objectifs
 */
const GOAL_RECOMMENDATIONS = {
  'weight-loss': [
    { id: 'green-tea-extract', priority: 4, doseVegetarian: '400-500mg EGCG/jour', doseStandard: '400-500mg EGCG/jour' },
    { id: 'fiber-supplement', priority: 3, doseVegetarian: '5g x2/jour', doseStandard: '5g x2/jour' }
  ],
  'energy': [
    { id: 'coq10', priority: 4, doseVegetarian: '100mg/jour', doseStandard: '100mg/jour' },
    { id: 'b-complex', priority: 3, doseVegetarian: '1 comprimé/jour', doseStandard: '1 comprimé/jour' }
  ],
  'focus': [
    { id: 'omega-3-algae', priority: 4, doseVegetarian: '1000mg EPA+DHA/jour', doseStandard: null },
    { id: 'omega-3-fish-oil', priority: 4, doseVegetarian: null, doseStandard: '1000mg EPA+DHA/jour' },
    { id: 'nootropic-complex', priority: 3, doseVegetarian: 'Selon produit', doseStandard: 'Selon produit' }
  ]
};

/**
 * Catalogue des compléments avec détails
 */
const SUPPLEMENT_CATALOG = {
  'ashwagandha': {
    name: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    benefits: ['Réduction du stress', 'Équilibre hormonal', 'Amélioration du sommeil'],
    timeToEffect: '2-3 semaines',
    scientificBasis: 'Études cliniques sur la réduction du cortisol',
    vegetarian: true
  },
  'rhodiola': {
    name: 'Rhodiola Rosea',
    scientificName: 'Rhodiola rosea',
    benefits: ['Adaptation au stress', 'Amélioration de l\'énergie', 'Fonction cognitive'],
    timeToEffect: '1-2 semaines',
    scientificBasis: 'Études sur la fatigue mentale et physique',
    vegetarian: true
  },
  'magnesium-glycinate': {
    name: 'Magnésium Glycinate',
    scientificName: 'Magnesium bis-glycinate',
    benefits: ['Relaxation musculaire', 'Qualité du sommeil', 'Fonction nerveuse'],
    timeToEffect: '1-2 semaines',
    scientificBasis: 'Études sur la biodisponibilité et l\'anxiété',
    vegetarian: true
  },
  'l-theanine': {
    name: 'L-Théanine',
    scientificName: 'L-theanine',
    benefits: ['Relaxation sans somnolence', 'Concentration calme', 'Qualité du sommeil'],
    timeToEffect: '30-60 minutes',
    scientificBasis: 'Études sur les ondes alpha cérébrales',
    vegetarian: true
  },
  'coq10': {
    name: 'Coenzyme Q10',
    scientificName: 'Ubiquinone/Ubiquinol',
    benefits: ['Production d\'énergie cellulaire', 'Santé cardiovasculaire', 'Antioxydant'],
    timeToEffect: '2-4 semaines',
    scientificBasis: 'Études sur la production d\'ATP mitochondrial',
    vegetarian: false
  },
  'b-complex': {
    name: 'Complexe Vitamines B',
    scientificName: 'Vitamines B1, B2, B3, B5, B6, B7, B9, B12',
    benefits: ['Métabolisme énergétique', 'Fonction nerveuse', 'Santé cognitive'],
    timeToEffect: '1-2 semaines',
    scientificBasis: 'Rôle essentiel dans le métabolisme cellulaire',
    vegetarian: true
  },
  'iron-complex': {
    name: 'Complexe de Fer',
    scientificName: 'Fer + Vitamine C',
    benefits: ['Transport d\'oxygène', 'Production d\'énergie', 'Fonction cognitive'],
    timeToEffect: '4-8 semaines',
    scientificBasis: 'Études sur l\'anémie et la fatigue',
    vegetarian: true
  },
  'maca-root': {
    name: 'Racine de Maca',
    scientificName: 'Lepidium meyenii',
    benefits: ['Énergie et endurance', 'Équilibre hormonal', 'Vitalité'],
    timeToEffect: '2-3 semaines',
    scientificBasis: 'Études sur les performances physiques',
    vegetarian: true
  },
  'melatonin': {
    name: 'Mélatonine',
    scientificName: 'N-acetyl-5-methoxytryptamine',
    benefits: ['Régulation du sommeil', 'Rythme circadien', 'Qualité du sommeil'],
    timeToEffect: '30-60 minutes',
    scientificBasis: 'Études sur les cycles de sommeil',
    vegetarian: true
  },
  'valerian-root': {
    name: 'Valériane',
    scientificName: 'Valeriana officinalis',
    benefits: ['Relaxation', 'Amélioration du sommeil', 'Réduction de l\'anxiété'],
    timeToEffect: '1-2 heures',
    scientificBasis: 'Études sur les récepteurs GABA',
    vegetarian: true
  },
  'omega-3-algae': {
    name: 'Oméga-3 d\'Algues',
    scientificName: 'EPA et DHA d\'origine algale',
    benefits: ['Fonction cognitive', 'Santé cardiovasculaire', 'Anti-inflammatoire'],
    timeToEffect: '4-6 semaines',
    scientificBasis: 'Études sur le développement neuronal',
    vegetarian: true
  },
  'omega-3-fish-oil': {
    name: 'Huile de Poisson Oméga-3',
    scientificName: 'EPA et DHA',
    benefits: ['Fonction cognitive', 'Santé cardiovasculaire', 'Anti-inflammatoire'],
    timeToEffect: '4-6 semaines',
    scientificBasis: 'Études sur le développement neuronal et l\'inflammation',
    vegetarian: false
  },
  'ginkgo-biloba': {
    name: 'Ginkgo Biloba',
    scientificName: 'Ginkgo biloba',
    benefits: ['Circulation cérébrale', 'Fonction cognitive', 'Mémoire'],
    timeToEffect: '4-6 semaines',
    scientificBasis: 'Études sur le flux sanguin cérébral',
    vegetarian: true
  },
  'bacopa-monnieri': {
    name: 'Bacopa Monnieri',
    scientificName: 'Bacopa monnieri',
    benefits: ['Mémoire', 'Apprentissage', 'Neuroprotection'],
    timeToEffect: '8-12 semaines',
    scientificBasis: 'Études sur les fonctions cognitives',
    vegetarian: true
  },
  'lions-mane': {
    name: 'Crinière de Lion',
    scientificName: 'Hericium erinaceus',
    benefits: ['Neurogénèse', 'Fonction cognitive', 'Neuroprotection'],
    timeToEffect: '2-4 semaines',
    scientificBasis: 'Études sur les facteurs de croissance nerveuse',
    vegetarian: true
  },
  'probiotics': {
    name: 'Probiotiques',
    scientificName: 'Cultures bactériennes diverses',
    benefits: ['Santé intestinale', 'Digestion', 'Immunité'],
    timeToEffect: '2-4 semaines',
    scientificBasis: 'Études sur le microbiome intestinal',
    vegetarian: true
  },
  'digestive-enzymes': {
    name: 'Enzymes Digestives',
    scientificName: 'Protéases, Lipases, Amylases',
    benefits: ['Digestion optimisée', 'Absorption des nutriments', 'Confort digestif'],
    timeToEffect: 'Immédiat (pendant les repas)',
    scientificBasis: 'Études sur la digestion et l\'absorption',
    vegetarian: true
  },
  'ginger-extract': {
    name: 'Extrait de Gingembre',
    scientificName: 'Zingiber officinale',
    benefits: ['Digestion', 'Anti-nausée', 'Anti-inflammatoire'],
    timeToEffect: '30-60 minutes',
    scientificBasis: 'Études sur la motilité gastrique',
    vegetarian: true
  },
  'green-tea-extract': {
    name: 'Extrait de Thé Vert',
    scientificName: 'Camellia sinensis',
    benefits: ['Métabolisme', 'Antioxydant', 'Thermogénèse'],
    timeToEffect: '2-4 semaines',
    scientificBasis: 'Études sur le métabolisme et EGCG',
    vegetarian: true
  },
  'fiber-supplement': {
    name: 'Supplément de Fibres',
    scientificName: 'Psyllium/Inuline/Acacia',
    benefits: ['Satiété', 'Santé intestinale', 'Stabilité glycémique'],
    timeToEffect: '1-2 semaines',
    scientificBasis: 'Études sur le microbiome et le transit',
    vegetarian: true
  },
  'nootropic-complex': {
    name: 'Complexe Nootropique',
    scientificName: 'Combinaison de composés',
    benefits: ['Fonction cognitive', 'Mémoire', 'Concentration'],
    timeToEffect: '2-4 semaines',
    scientificBasis: 'Études sur les fonctions cognitives',
    vegetarian: true
  }
};

/**
 * Mappage des symptômes du quiz aux catégories de recommandations
 */
const SYMPTOM_MAPPING = {
  'stressLevel': { category: 'stress', threshold: 3 },
  'sleepIssues': { category: 'insomnia', threshold: 3 },
  'energyLevel': { category: 'fatigue', threshold: 3, inverse: true },
  'focusIssues': { category: 'concentration', threshold: 3 },
  'digestiveIssues': { category: 'digestion', threshold: 3 }
};

/**
 * Mappage des objectifs du quiz
 */
const GOAL_MAPPING = {
  'weightLoss': 'weight-loss',
  'increaseEnergy': 'energy',
  'improveFocus': 'focus'
};

/**
 * Génère des recommandations personnalisées basées sur les réponses au quiz
 */
export function generateRecommendations(
  quizResponses: QuizResponse,
  behavioralMetrics: BehavioralMetrics,
  neuroProfile: NeuroProfile
): Recommendation[] {
  // Initialiser les recommendations
  let recommendations: Recommendation[] = [];
  
  // 1. Analyser les symptômes et déterminer les priorités
  const activeSymptoms: {category: string, priority: number}[] = [];
  
  if (quizResponses.healthConcerns) {
    Object.entries(quizResponses.healthConcerns).forEach(([symptomKey, value]) => {
      const mapping = SYMPTOM_MAPPING[symptomKey as keyof typeof SYMPTOM_MAPPING];
      if (mapping) {
        let symptomValue = parseInt(value as string);
        
        // Inverser la valeur pour les échelles inversées (comme le niveau d'énergie)
        if (mapping.inverse) {
          symptomValue = 6 - symptomValue; // Sur une échelle de 1-5, transformer 1->5, 2->4, etc.
        }
        
        if (symptomValue >= mapping.threshold) {
          // Calculer la priorité en fonction de l'intensité du symptôme
          const priority = Math.min(5, Math.round(symptomValue * 1.2));
          activeSymptoms.push({
            category: mapping.category,
            priority: priority
          });
        }
      }
    });
  }
  
  // Trier les symptômes par priorité (du plus prioritaire au moins prioritaire)
  activeSymptoms.sort((a, b) => b.priority - a.priority);
  
  // 2. Analyser les objectifs
  const activeGoals: string[] = [];
  
  if (quizResponses.goals) {
    Object.entries(quizResponses.goals).forEach(([goalKey, isActive]) => {
      if (isActive === true) {
        const goalCategory = GOAL_MAPPING[goalKey as keyof typeof GOAL_MAPPING];
        if (goalCategory) {
          activeGoals.push(goalCategory);
        }
      }
    });
  }
  
  // 3. Déterminer si l'utilisateur est végétarien
  const isVegetarian = quizResponses.dietaryPreferences?.includes('vegetarian') || false;
  
  // 4. Construire les recommandations basées sur les symptômes prioritaires
  const recommendationMap = new Map<string, Recommendation>();
  
  // D'abord, ajouter les recommandations basées sur les symptômes
  activeSymptoms.forEach(symptom => {
    const symptomRecs = SYMPTOM_RECOMMENDATIONS[symptom.category as keyof typeof SYMPTOM_RECOMMENDATIONS] || [];
    
    symptomRecs.forEach(rec => {
      // Vérifier si le complément est compatible avec les préférences alimentaires
      const supplementInfo = SUPPLEMENT_CATALOG[rec.id as keyof typeof SUPPLEMENT_CATALOG];
      
      // Ignorer les suppléments non végétariens pour les utilisateurs végétariens
      if (isVegetarian && !supplementInfo.vegetarian) {
        return;
      }
      
      // Déterminer la dose appropriée
      const dose = isVegetarian ? rec.doseVegetarian : rec.doseStandard;
      
      // Si la dose est null, cela signifie que ce supplément n'est pas adapté à ce régime
      if (dose === null) {
        return;
      }
      
      // Si ce supplément n'est pas déjà dans la liste ou si sa priorité est plus élevée
      if (!recommendationMap.has(rec.id) || 
          (recommendationMap.get(rec.id)!.priority < rec.priority + symptom.priority)) {
        
        const scoreBase = rec.priority * 10 + symptom.priority * 5;
        
        recommendationMap.set(rec.id, {
          id: rec.id,
          name: supplementInfo.name,
          description: `${supplementInfo.name} (${supplementInfo.scientificName})`,
          priority: rec.priority + symptom.priority,
          matchScore: scoreBase,
          benefits: supplementInfo.benefits,
          recommendedDose: dose,
          timeToEffect: supplementInfo.timeToEffect,
          scientificBasis: supplementInfo.scientificBasis,
          confidence: 0.7 + (rec.priority * 0.05),
          reason: `Recommandé principalement pour ${symptom.category}`
        });
      }
    });
  });
  
  // Ensuite, ajouter les recommandations basées sur les objectifs
  activeGoals.forEach(goal => {
    const goalRecs = GOAL_RECOMMENDATIONS[goal as keyof typeof GOAL_RECOMMENDATIONS] || [];
    
    goalRecs.forEach(rec => {
      // Vérifier si le complément est compatible avec les préférences alimentaires
      const supplementInfo = SUPPLEMENT_CATALOG[rec.id as keyof typeof SUPPLEMENT_CATALOG];
      
      // Ignorer les suppléments non végétariens pour les utilisateurs végétariens
      if (isVegetarian && !supplementInfo.vegetarian) {
        return;
      }
      
      // Déterminer la dose appropriée
      const dose = isVegetarian ? rec.doseVegetarian : rec.doseStandard;
      
      // Si la dose est null, cela signifie que ce supplément n'est pas adapté à ce régime
      if (dose === null) {
        return;
      }
      
      // Si ce supplément n'est pas déjà dans la liste, l'ajouter
      if (!recommendationMap.has(rec.id)) {
        const scoreBase = rec.priority * 8; // Score légèrement inférieur aux symptômes
        
        recommendationMap.set(rec.id, {
          id: rec.id,
          name: supplementInfo.name,
          description: `${supplementInfo.name} (${supplementInfo.scientificName})`,
          priority: rec.priority,
          matchScore: scoreBase,
          benefits: supplementInfo.benefits,
          recommendedDose: dose,
          timeToEffect: supplementInfo.timeToEffect,
          scientificBasis: supplementInfo.scientificBasis,
          confidence: 0.65 + (rec.priority * 0.05),
          reason: `Recommandé pour votre objectif: ${goal}`
        });
      } 
      // Si déjà présent mais avec une raison différente, mettre à jour la raison et augmenter le score
      else {
        const existing = recommendationMap.get(rec.id)!;
        existing.reason += ` et votre objectif: ${goal}`;
        existing.matchScore = (existing.matchScore || 0) + 5;
        existing.confidence = Math.min(0.95, (existing.confidence || 0) + 0.05);
      }
    });
  });
  
  // Convertir la Map en tableau
  recommendations = Array.from(recommendationMap.values());
  
  // 5. Appliquer des ajustements basés sur l'apprentissage de l'IA
  if (aiModel && aiModel.featureImportance) {
    // Ajustement selon l'âge si disponible
    if (quizResponses.personal && quizResponses.personal.age) {
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
              matchScore: (rec.matchScore || 0) + (15 * (aiModel.featureImportance.age || 1)) 
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
              matchScore: (rec.matchScore || 0) + (15 * (aiModel.featureImportance.age || 1)) 
            };
          }
          return rec;
        });
      }
    }
  }
  
  // 6. Trier par score de correspondance puis confiance
  recommendations.sort((a, b) => {
    const scoreA = a.matchScore || 0;
    const scoreB = b.matchScore || 0;
    
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    
    // En cas d'égalité de score, utiliser la confiance
    return (b.confidence || 0) - (a.confidence || 0);
  });
  
  // Limiter à un nombre raisonnable de recommandations
  return recommendations.slice(0, 5);
}

/**
 * Génère une explication détaillée pour une recommandation
 */
export function generateRecommendationExplanation(recommendation: Recommendation): string {
  let explanation = '';
  
  // Introduction basée sur le nom du produit
  explanation = `<strong>${recommendation.name}</strong> est recommandé pour vous aider avec ${recommendation.reason.toLowerCase()}.`;
  
  // Ajouter des détails sur les bénéfices
  if (recommendation.benefits && recommendation.benefits.length > 0) {
    explanation += ` Les recherches scientifiques montrent que ce complément peut ${recommendation.benefits.map(b => `<strong>${b.toLowerCase()}</strong>`).join(', ')}.`;
  }
  
  // Ajouter des informations sur le délai d'efficacité
  if (recommendation.timeToEffect) {
    explanation += ` Vous pourriez observer des résultats positifs après ${recommendation.timeToEffect} d'utilisation régulière.`;
  }
  
  // Ajouter des informations sur la dose recommandée
  if (recommendation.recommendedDose) {
    explanation += ` La dose recommandée est de ${recommendation.recommendedDose}.`;
  }
  
  // Ajouter une base scientifique si disponible
  if (recommendation.scientificBasis) {
    explanation += ` <em>${recommendation.scientificBasis}</em>.`;
  }
  
  return explanation;
}

/**
 * Enregistre les données d'apprentissage pour améliorer les recommandations futures
 */
export function recordLearningData(
  quizResponses: QuizResponse,
  recommendations: Recommendation[],
  userFeedback: UserFeedback
): void {
  try {
    // 1. Récupérer les données d'apprentissage existantes
    const storedData = secureStorage.getItem('learningData');
    const learningDatabase: LearningData[] = storedData ? JSON.parse(storedData) : [];
    
    // 2. Préparer les nouvelles données d'apprentissage
    const newData: LearningData = {
      timestamp: Date.now(),
      quizData: quizResponses,
      recommendationId: recommendations[0]?.id || '',
      userFeedback: userFeedback
    };
    
    // 3. Ajouter les nouvelles données à la base
    learningDatabase.push(newData);
    
    // 4. Limiter la taille de la base de données (garder les 1000 entrées les plus récentes)
    if (learningDatabase.length > 1000) {
      learningDatabase.sort((a, b) => b.timestamp - a.timestamp);
      learningDatabase.splice(1000);
    }
    
    // 5. Enregistrer les données mises à jour
    secureStorage.setItem('learningData', JSON.stringify(learningDatabase));
    
    // 6. Déclencher une mise à jour du modèle d'apprentissage si suffisamment de données
    if (learningDatabase.length % 50 === 0) {
      console.log(`[AI Learning] Mise à jour du modèle avec ${learningDatabase.length} points de données`);
      // Cette fonction serait implémentée dans aiLearning.ts
      // updateAiModel(learningDatabase);
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données d\'apprentissage:', error);
  }
}
