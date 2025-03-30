
import { 
  SUPPLEMENT_CATALOG, 
} from '../data/supplementCatalog';
import { 
  SYMPTOM_RECOMMENDATIONS, 
  GOAL_RECOMMENDATIONS, 
  LIFESTYLE_RECOMMENDATIONS,
  AGE_FACTORS,
  GENDER_FACTORS,
  SYMPTOM_PRIORITY_FACTORS
} from '../data/recommendationMappings';
import { Recommendation, UserProfile } from '../types/recommendations';
import { 
  analyzeRecommendationPerformance,
  evaluateDataQuality
} from './recommenderSystem';

// Fonction pour trouver la dose appropriée selon le profil
const findDoseForSupplement = (supplementId: string, profileType: string): string => {
  // Logique de dose par défaut qui pourrait être étendue
  const supplement = SUPPLEMENT_CATALOG[supplementId];
  if (!supplement) return '';
  
  // Doses spécifiques selon le profil
  switch (profileType) {
    case 'vegetarian':
    case 'vegan':
      // Certains suppléments peuvent nécessiter des doses plus élevées pour les végétariens/végans
      if (['vitamin_b12', 'iron', 'zinc'].includes(supplementId)) {
        return "Dose plus élevée recommandée pour régime végétarien/végan";
      }
      break;
    case 'athlete':
      if (['magnesium_glycinate', 'vitamin_d3', 'vitamin_d3_vegan', 'coq10'].includes(supplementId)) {
        return "Dose adaptée pour l'activité physique intensive";
      }
      break;
    case 'senior':
      if (['vitamin_d3', 'vitamin_d3_vegan', 'coq10', 'vitamin_b_complex'].includes(supplementId)) {
        return "Dose adaptée aux besoins des personnes de plus de 60 ans";
      }
      break;
  }
  
  // Dose standard par défaut
  return "Suivre la posologie standard du produit";
};

/**
 * Optimise les recommandations de suppléments en fonction du profil utilisateur
 * @param userProfile Profil de l'utilisateur avec ses symptômes, objectifs, et conditions
 * @returns Recommandations optimisées
 */
export const optimizeRecommendations = (userProfile: UserProfile): Recommendation[] => {
  // Validation des données d'entrée
  if (!userProfile || !userProfile.activeSymptoms || !userProfile.activeGoals) {
    console.error("Données du profil utilisateur insuffisantes");
    return [];
  }
  
  const {
    activeSymptoms,
    activeGoals,
    dietaryRestrictions = {},
    ageGroup = '31-45',
    gender = 'non_specifie',
    lifestyleFactors = []
  } = userProfile;
  
  // Évaluer la qualité des données disponibles
  const dataQuality = evaluateDataQuality();
  const useAdvancedModel = dataQuality.overallQuality > 0.6;
  
  // 1. Collecte et scoring initial de tous les suppléments potentiels
  const supplementScores: Record<string, number> = {};
  
  // Traiter les symptômes avec leurs facteurs de priorité
  activeSymptoms.forEach(symptomId => {
    const priorityFactor = SYMPTOM_PRIORITY_FACTORS[symptomId] || 1.0;
    const recommendations = SYMPTOM_RECOMMENDATIONS[symptomId] || [];
    
    recommendations.forEach(rec => {
      // Le score de base est la priorité multipliée par le facteur de priorité du symptôme
      const baseScore = rec.priority * priorityFactor * 10; // Échelle de base 0-100
      supplementScores[rec.id] = (supplementScores[rec.id] || 0) + baseScore;
    });
  });
  
  // Traiter les objectifs
  activeGoals.forEach(goalId => {
    const recommendations = GOAL_RECOMMENDATIONS[goalId] || [];
    
    recommendations.forEach(rec => {
      // Les objectifs ont légèrement moins de poids que les symptômes
      const baseScore = rec.priority * 8; // Échelle de base 0-80
      supplementScores[rec.id] = (supplementScores[rec.id] || 0) + baseScore;
    });
  });
  
  // Traiter les facteurs de style de vie
  lifestyleFactors.forEach(factor => {
    const recommendations = LIFESTYLE_RECOMMENDATIONS[factor] || [];
    
    recommendations.forEach(rec => {
      // Les facteurs de style de vie ont moins de poids
      const baseScore = rec.priority * 6; // Échelle de base 0-60
      supplementScores[rec.id] = (supplementScores[rec.id] || 0) + baseScore;
    });
  });
  
  // 2. Ajuster les scores selon l'âge et le sexe
  Object.entries(supplementScores).forEach(([supplementId, score]) => {
    // Ajustement par âge
    const ageFactor = AGE_FACTORS[ageGroup]?.[supplementId] || 1.0;
    
    // Ajustement par sexe
    const genderFactor = GENDER_FACTORS[gender]?.[supplementId] || 1.0;
    
    // Appliquer les ajustements
    supplementScores[supplementId] = score * ageFactor * genderFactor;
  });
  
  // 3. Appliquer les restrictions alimentaires
  const isVegan = dietaryRestrictions.vegan || false;
  const isVegetarian = dietaryRestrictions.vegetarian || false;
  const isGlutenFree = dietaryRestrictions.glutenFree || false;
  const isDairyFree = dietaryRestrictions.dairyFree || false;
  
  // Construire la liste des suppléments à exclure
  const excludedSupplements = new Set<string>();
  
  Object.entries(SUPPLEMENT_CATALOG).forEach(([id, supplement]) => {
    if ((isVegan && !supplement.vegan) ||
        (isVegetarian && !supplement.vegetarian) ||
        (isGlutenFree && !supplement.glutenFree) ||
        (isDairyFree && !supplement.dairyFree)) {
      excludedSupplements.add(id);
    }
  });
  
  // 4. Appliquer les données historiques de performance si disponibles
  if (useAdvancedModel) {
    const recommendationPerformance = analyzeRecommendationPerformance();
    
    Object.entries(recommendationPerformance).forEach(([supplementId, data]) => {
      if (data.totalRatings >= 5) { // Nombre minimum pour considérer les données fiables
        // Ajuster le score selon la satisfaction moyenne (de 1 à 5)
        // Un multiplicateur qui varie de 0.8 (mauvaises évaluations) à 1.2 (excellentes évaluations)
        const performanceMultiplier = 0.8 + (data.averageRating / 5) * 0.4;
        
        if (supplementScores[supplementId]) {
          supplementScores[supplementId] = supplementScores[supplementId] * performanceMultiplier;
        }
      }
    });
  }
  
  // 5. Créer les recommandations finales
  const finalRecommendations: Recommendation[] = [];
  
  // Filtrer, trier et sélectionner les meilleures recommandations
  Object.entries(supplementScores)
    .filter(([id]) => !excludedSupplements.has(id))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5) // Top 5 recommendations
    .forEach(([id, score]) => {
      const supplement = SUPPLEMENT_CATALOG[id];
      
      if (supplement) {
        // Déterminer la dose appropriée selon le profil
        const profileType = isVegan ? 'vegan' : (isVegetarian ? 'vegetarian' : 
                           (ageGroup === '60+' ? 'senior' : 
                           (lifestyleFactors.includes('sport_intensif') ? 'athlete' : 'standard')));
        
        const dose = findDoseForSupplement(id, profileType);
        
        // Construire les raisons de la recommandation
        const reasons: string[] = [];
        
        // Ajouter les symptômes comme raisons
        const symptomReasons = activeSymptoms
          .filter(symptomId => SYMPTOM_RECOMMENDATIONS[symptomId]?.some(r => r.id === id))
          .map(symptomId => symptomId.replace(/_/g, ' '));
        
        if (symptomReasons.length > 0) {
          reasons.push(`symptôme${symptomReasons.length > 1 ? 's' : ''}: ${symptomReasons.join(', ')}`);
        }
        
        // Ajouter les objectifs comme raisons
        const goalReasons = activeGoals
          .filter(goalId => GOAL_RECOMMENDATIONS[goalId]?.some(r => r.id === id))
          .map(goalId => goalId.replace(/_/g, ' '));
        
        if (goalReasons.length > 0) {
          reasons.push(`objectif${goalReasons.length > 1 ? 's' : ''}: ${goalReasons.join(', ')}`);
        }
        
        // Construire le texte de raison
        const reasonText = reasons.length > 0 
          ? `Recommandé pour ${reasons.join(' et ')}` 
          : 'Recommandation basée sur votre profil global';
        
        // Calculer le score de confiance (0-1)
        const confidenceScore = Math.min(1, Math.max(0.5, score / 200));
        
        // Ajouter la recommandation
        finalRecommendations.push({
          id,
          name: supplement.name,
          description: `${supplement.name} (${supplement.scientificName})`,
          // Convertir le score en priorité (1-10)
          priority: Math.min(10, Math.max(1, Math.round(score / 20))),
          matchScore: Math.round(score),
          benefits: supplement.benefits,
          recommendedDose: dose,
          timeToEffect: supplement.timeToEffect,
          scientificBasis: supplement.scientificBasis,
          confidence: confidenceScore,
          reason: reasonText,
          // Informations additionnelles
          category: supplement.category,
          sideEffects: supplement.sideEffects || [],
          interactions: supplement.interactions || []
        });
      }
    });
  
  // Si aucune recommandation n'a été trouvée, suggérer un multivitamine de base
  if (finalRecommendations.length === 0) {
    const defaultSupplement = SUPPLEMENT_CATALOG["vitamin_b_complex"];
    if (defaultSupplement) {
      finalRecommendations.push({
        id: "vitamin_b_complex",
        name: defaultSupplement.name,
        description: `${defaultSupplement.name} (${defaultSupplement.scientificName})`,
        priority: 5,
        matchScore: 50,
        benefits: defaultSupplement.benefits,
        recommendedDose: "Dose standard recommandée sur l'emballage",
        timeToEffect: defaultSupplement.timeToEffect,
        scientificBasis: defaultSupplement.scientificBasis,
        confidence: 0.5,
        reason: "Recommandation par défaut basée sur vos informations limitées",
        category: defaultSupplement.category,
        sideEffects: defaultSupplement.sideEffects || [],
        interactions: defaultSupplement.interactions || []
      });
    }
  }
  
  return finalRecommendations;
};

/**
 * Analyse les symptômes spécifiques et retourne la priorité des catégories de symptômes
 * @param symptoms Liste des symptômes actifs
 * @returns Catégories de symptômes prioritaires ordonnées
 */
export const analyzeSymptomPriorities = (symptoms: string[]): string[] => {
  // Mappings des symptômes à leurs catégories
  const symptomCategories: Record<string, string> = {
    // Stress et anxiété
    'stress_constant': 'stress',
    'anxiete': 'stress',
    'irritabilite': 'stress',
    'tension_musculaire': 'stress',
    
    // Fatigue
    'fatigue_generale': 'fatigue',
    'fatigue_matinale': 'fatigue',
    'fatigue_apres_midi': 'fatigue',
    'baisse_motivation': 'fatigue',
    'anemic': 'fatigue',
    
    // Sommeil
    'difficulte_endormissement': 'sommeil',
    'reveils_nocturnes': 'sommeil',
    'sommeil_non_reparateur': 'sommeil',
    'decalage_horaire': 'sommeil',
    
    // Digestion
    'ballonnements': 'digestion',
    'constipation': 'digestion',
    'diarrhee': 'digestion',
    'brulures_estomac': 'digestion',
    'intolerance_alimentaire': 'digestion',
    
    // Cognitif
    'difficulte_concentration': 'cognitif',
    'memoire_declin': 'cognitif',
    'brouillard_mental': 'cognitif',
    'humeur_basse': 'cognitif',
    
    // Inflammation
    'douleurs_articulaires': 'inflammation',
    'douleurs_musculaires': 'inflammation',
    'problemes_peau': 'inflammation',
    'allergies': 'inflammation'
  };
  
  // Comptage des catégories
  const categoryCounts: Record<string, number> = {};
  
  // Compter les occurrences de chaque catégorie et appliquer les facteurs de priorité
  symptoms.forEach(symptom => {
    const category = symptomCategories[symptom];
    if (category) {
      const priorityFactor = SYMPTOM_PRIORITY_FACTORS[symptom] || 1.0;
      categoryCounts[category] = (categoryCounts[category] || 0) + priorityFactor;
    }
  });
  
  // Trier les catégories par nombre d'occurrences pondérées
  return Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);
};

/**
 * Détermine les interactions et contre-indications potentielles entre les suppléments recommandés
 * @param recommendations Liste de recommandations
 * @returns Liste des interactions potentielles
 */
export const detectInteractions = (recommendations: Recommendation[]): string[] => {
  const interactions: string[] = [];
  
  // Vérifier les interactions potentielles entre paires de suppléments
  for (let i = 0; i < recommendations.length; i++) {
    for (let j = i + 1; j < recommendations.length; j++) {
      const suppA = SUPPLEMENT_CATALOG[recommendations[i].id];
      const suppB = SUPPLEMENT_CATALOG[recommendations[j].id];
      
      if (suppA && suppB) {
        // Vérifier si A est dans les interactions de B ou vice versa
        if (suppA.interactions?.includes(suppB.name) || suppB.interactions?.includes(suppA.name)) {
          interactions.push(`Interaction possible entre ${suppA.name} et ${suppB.name}`);
        }
        
        // Règles spécifiques pour certaines combinaisons connues
        if ((suppA.id === 'melatonin' && suppB.id === 'valerian') || 
            (suppA.id === 'valerian' && suppB.id === 'melatonin')) {
          interactions.push(`${suppA.name} et ${suppB.name} ont des effets additifs sur la somnolence`);
        }
      }
    }
  }
  
  return interactions;
};

/**
 * Génère une explication personnalisée des recommandations
 * @param recommendations Liste des recommandations
 * @param userProfile Profil de l'utilisateur
 * @returns Explication textuelle
 */
export const generateExplanation = (recommendations: Recommendation[], userProfile: UserProfile): string => {
  if (!recommendations.length) return "Nous n'avons pas suffisamment d'informations pour formuler des recommandations personnalisées.";
  
  // Analyser les priorités des symptômes
  const symptomPriorities = analyzeSymptomPriorities(userProfile.activeSymptoms || []);
  
  // Construire l'introduction
  let explanation = "D'après votre profil, ";
  
  if (symptomPriorities.length > 0) {
    const priorityCategory = symptomPriorities[0];
    
    switch (priorityCategory) {
      case 'stress':
        explanation += "la gestion du stress semble être votre priorité principale. ";
        break;
      case 'fatigue':
        explanation += "la fatigue et le manque d'énergie semblent être vos préoccupations principales. ";
        break;
      case 'sommeil':
        explanation += "l'amélioration de votre sommeil est une priorité importante. ";
        break;
      case 'digestion':
        explanation += "le soutien à votre système digestif est particulièrement important. ";
        break;
      case 'cognitif':
        explanation += "le soutien à vos fonctions cognitives est une priorité. ";
        break;
      case 'inflammation':
        explanation += "la réduction de l'inflammation est une priorité importante pour vous. ";
        break;
      default:
        explanation += "nous avons identifié plusieurs domaines où un soutien nutritionnel pourrait être bénéfique. ";
    }
  } else {
    explanation += "nous avons identifié des compléments qui pourraient soutenir vos objectifs. ";
  }
  
  // Ajouter une explication sur la top recommandation
  if (recommendations.length > 0) {
    const topRec = recommendations[0];
    explanation += `Notre première recommandation est ${topRec.name}, qui ${topRec.reason.toLowerCase()}. `;
    
    // Mentionner les interactions potentielles
    const interactions = detectInteractions(recommendations);
    if (interactions.length > 0) {
      explanation += "Notez qu'il existe certaines interactions potentielles entre les suppléments recommandés. ";
    }
  }
  
  return explanation;
};

/**
 * Prédit les besoins futurs potentiels basés sur le profil actuel
 * @param userProfile Profil de l'utilisateur
 * @param currentRecommendations Recommandations actuelles
 * @returns Suppléments qui pourraient être nécessaires à l'avenir
 */
export const predictFutureNeeds = (
  userProfile: UserProfile,
  currentRecommendations: Recommendation[]
): Recommendation[] => {
  // Extraire les IDs des recommandations actuelles
  const currentIds = new Set(currentRecommendations.map(rec => rec.id));
  
  // Identifier les catégories manquantes importantes
  const symptomPriorities = analyzeSymptomPriorities(userProfile.activeSymptoms || []);
  
  // Vérifier si des catégories importantes n'ont pas de suppléments recommandés
  const potentialCategories = new Set<string>();
  
  symptomPriorities.forEach(category => {
    let hasCategoryRecommendation = false;
    
    currentRecommendations.forEach(rec => {
      const supplement = SUPPLEMENT_CATALOG[rec.id];
      if (supplement && supplement.category === category) {
        hasCategoryRecommendation = true;
      }
    });
    
    if (!hasCategoryRecommendation) {
      potentialCategories.add(category);
    }
  });
  
  // Ajouter des catégories complémentaires selon les symptômes/objectifs
  if (userProfile.activeSymptoms?.includes('fatigue_generale') && 
      !currentRecommendations.some(rec => rec.id === 'vitamin_d3' || rec.id === 'vitamin_d3_vegan')) {
    potentialCategories.add('energy');
  }
  
  if ((userProfile.activeSymptoms?.includes('difficulte_concentration') || 
       userProfile.activeGoals?.includes('ameliorer_concentration')) && 
      !currentRecommendations.some(rec => SUPPLEMENT_CATALOG[rec.id]?.category === 'cognitive')) {
    potentialCategories.add('cognitive');
  }
  
  // Identifier des suppléments potentiels pour l'avenir
  const futureRecommendations: Recommendation[] = [];
  
  // Pour chaque catégorie manquante, suggérer un supplément approprié
  potentialCategories.forEach(category => {
    // Trouver un supplément de cette catégorie
    const supplementOption = Object.entries(SUPPLEMENT_CATALOG)
      .filter(([id, supp]) => supp.category === category && !currentIds.has(id))
      .sort((a, b) => (b[1].adaptabilityScore || 0) - (a[1].adaptabilityScore || 0))
      .map(([id, supp]) => ({ id, supp }))[0];
    
    if (supplementOption) {
      const { id, supp } = supplementOption;
      
      futureRecommendations.push({
        id,
        name: supp.name,
        description: `${supp.name} (${supp.scientificName})`,
        priority: 5, // Priorité moyenne pour les besoins futurs
        matchScore: 50,
        benefits: supp.benefits,
        recommendedDose: "À déterminer selon l'évolution de vos besoins",
        timeToEffect: supp.timeToEffect,
        scientificBasis: supp.scientificBasis,
        confidence: 0.6,
        reason: `Pourrait être bénéfique à l'avenir pour compléter votre programme`,
        category: supp.category,
        isPredictive: true, // Marquer comme prédictif
        predictiveInsights: [`Recommandation future basée sur votre profil ${category}`]
      });
    }
  });
  
  // Limiter à 3 recommandations futures maximum
  return futureRecommendations.slice(0, 3);
};


// Export default pour compatibilité avec require()
export default {
  optimizeRecommendations,
  predictFutureNeeds,
  generateExplanation,
  analyzeSymptomPriorities,
  detectInteractions
};
