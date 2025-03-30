
import { QuizResponse, Recommendation, BehavioralMetrics, NeuroProfile } from './types';

// Base de connaissances des nutriments et leurs effets
interface Nutrient {
  id: string;
  name: string;
  benefits: string[];
  forProblems: string[];
  contraindications: string[];
  researchScore: number; // Score basé sur la solidité des recherches (0-100)
  timeToEffect: string;
  naturalSources: string[];
}

// Liste des nutriments disponibles dans notre base de données
const nutrientsDatabase: Nutrient[] = [
  {
    id: 'magnesium',
    name: 'Magnésium',
    benefits: [
      'Réduction du stress',
      'Amélioration de la qualité du sommeil',
      'Diminution de la fatigue',
      'Soutien de la fonction musculaire'
    ],
    forProblems: ['stress', 'sommeil', 'fatigue', 'crampes'],
    contraindications: ['insuffisance rénale sévère'],
    researchScore: 92,
    timeToEffect: '2-4 semaines',
    naturalSources: ['légumes verts', 'noix', 'graines', 'légumineuses']
  },
  {
    id: 'omega3',
    name: 'Oméga-3',
    benefits: [
      'Soutien de la santé cognitive',
      'Réduction de l\'inflammation',
      'Amélioration de l\'humeur',
      'Soutien cardiovasculaire'
    ],
    forProblems: ['inflammation', 'humeur', 'concentration', 'cardiovasculaire'],
    contraindications: ['troubles de la coagulation'],
    researchScore: 89,
    timeToEffect: '4-12 semaines',
    naturalSources: ['poissons gras', 'graines de lin', 'graines de chia', 'noix']
  },
  {
    id: 'probiotics',
    name: 'Probiotiques',
    benefits: [
      'Amélioration de la santé digestive',
      'Renforcement du système immunitaire',
      'Réduction des ballonnements',
      'Soutien de la santé mentale'
    ],
    forProblems: ['digestion', 'immunité', 'ballonnements', 'anxiété'],
    contraindications: ['immunodéficience sévère'],
    researchScore: 85,
    timeToEffect: '2-8 semaines',
    naturalSources: ['yaourt', 'kéfir', 'choucroute', 'kimchi']
  },
  {
    id: 'vitamin-d',
    name: 'Vitamine D',
    benefits: [
      'Renforcement du système immunitaire',
      'Amélioration de l\'humeur',
      'Soutien de la santé osseuse',
      'Régulation du sommeil'
    ],
    forProblems: ['immunité', 'humeur', 'os', 'sommeil'],
    contraindications: ['hypercalcémie'],
    researchScore: 94,
    timeToEffect: '4-12 semaines',
    naturalSources: ['exposition au soleil', 'poissons gras', 'jaunes d\'œuf']
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    benefits: [
      'Réduction du stress et de l\'anxiété',
      'Amélioration de l\'équilibre hormonal',
      'Renforcement de l\'énergie',
      'Soutien de la fonction cognitive'
    ],
    forProblems: ['stress', 'anxiété', 'fatigue', 'hormones'],
    contraindications: ['maladie auto-immune', 'grossesse'],
    researchScore: 83,
    timeToEffect: '4-12 semaines',
    naturalSources: ['racine d\'ashwagandha']
  },
  {
    id: 'zinc',
    name: 'Zinc',
    benefits: [
      'Renforcement du système immunitaire',
      'Amélioration de la santé cutanée',
      'Soutien des fonctions hormonales',
      'Amélioration de la cicatrisation'
    ],
    forProblems: ['immunité', 'peau', 'hormones', 'cicatrisation'],
    contraindications: ['excès de cuivre'],
    researchScore: 88,
    timeToEffect: '2-8 semaines',
    naturalSources: ['fruits de mer', 'viande', 'légumineuses', 'graines']
  },
  {
    id: 'b-complex',
    name: 'Complexe B',
    benefits: [
      'Soutien du système nerveux',
      'Amélioration de l\'énergie',
      'Réduction du stress',
      'Amélioration de la fonction cognitive'
    ],
    forProblems: ['système nerveux', 'fatigue', 'stress', 'concentration'],
    contraindications: ['certaines interactions médicamenteuses'],
    researchScore: 86,
    timeToEffect: '2-6 semaines',
    naturalSources: ['viandes', 'œufs', 'légumes verts', 'légumineuses']
  },
  {
    id: 'l-theanine',
    name: 'L-Théanine',
    benefits: [
      'Réduction de l\'anxiété',
      'Amélioration de la concentration détendue',
      'Amélioration de la qualité du sommeil',
      'Réduction du stress'
    ],
    forProblems: ['anxiété', 'concentration', 'sommeil', 'stress'],
    contraindications: ['pression artérielle basse'],
    researchScore: 82,
    timeToEffect: '1-4 semaines',
    naturalSources: ['thé vert', 'thé noir']
  }
];

// Solutions combinées basées sur des synergies prouvées
interface CombinedSolution {
  id: string;
  title: string;
  description: string;
  nutrients: string[];  // IDs des nutriments
  forProblems: string[];
  researchScore: number;
  timeToEffect: string;
  popularity: number;
  url: string;
  scientificBasis: string;
  benefits: string[];
}

const combinedSolutions: CombinedSolution[] = [
  {
    id: 'neuro-cognitive',
    title: 'Complexe Neuro-Cognitif Avancé',
    description: 'Formulation scientifique pour soutenir les fonctions cognitives et la mémoire',
    nutrients: ['omega3', 'b-complex', 'vitamin-d', 'magnesium'],
    forProblems: ['concentration', 'mémoire', 'fatigue mentale', 'brouillard cérébral'],
    researchScore: 0.91,
    timeToEffect: '3-6 semaines',
    popularity: 76,
    url: '/labo/neuro-cognitif',
    scientificBasis: 'Formulation basée sur 12 études cliniques montrant l\'importance de l\'équilibre entre acides gras et micronutriments pour la santé cognitive',
    benefits: [
      'Amélioration de la concentration',
      'Support de la mémoire à court et long terme',
      'Protection neuronale',
      'Clarté mentale et vivacité d\'esprit'
    ]
  },
  {
    id: 'stress-calm',
    title: 'Solution Anti-Stress Naturelle',
    description: 'Combinaison synergique pour réduire le stress et améliorer la résilience',
    nutrients: ['ashwagandha', 'magnesium', 'l-theanine'],
    forProblems: ['stress', 'anxiété', 'tension', 'irritabilité'],
    researchScore: 0.88,
    timeToEffect: '2-4 semaines',
    popularity: 89,
    url: '/labo/anti-stress',
    scientificBasis: 'Association d\'adaptogènes et minéraux validée par des études pour moduler la réponse au stress et favoriser la production de GABA',
    benefits: [
      'Réduction des hormones de stress',
      'Amélioration de la qualité du sommeil',
      'Augmentation de la résilience au stress quotidien',
      'Équilibre émotionnel renforcé'
    ]
  },
  {
    id: 'immuno-protect',
    title: 'Bouclier Immunitaire Complet',
    description: 'Renforcement scientifique des défenses naturelles du corps',
    nutrients: ['vitamin-d', 'zinc', 'probiotics'],
    forProblems: ['immunité faible', 'infections récurrentes', 'récupération lente'],
    researchScore: 0.93,
    timeToEffect: '2-8 semaines',
    popularity: 82,
    url: '/labo/immunite',
    scientificBasis: 'Formule basée sur les dernières recherches en immunologie nutritionnelle et microbiome intestinal',
    benefits: [
      'Renforcement des défenses immunitaires',
      'Amélioration de la réponse immunitaire',
      'Équilibre du microbiome intestinal',
      'Protection cellulaire contre le stress oxydatif'
    ]
  },
  {
    id: 'digest-harmony',
    title: 'Équilibre Digestif Optimal',
    description: 'Solution complète pour une digestion confortable et efficace',
    nutrients: ['probiotics', 'zinc', 'magnesium'],
    forProblems: ['digestion', 'ballonnements', 'inconfort intestinal', 'transit irrégulier'],
    researchScore: 0.85,
    timeToEffect: '1-4 semaines',
    popularity: 78,
    url: '/labo/digestif',
    scientificBasis: 'Développé à partir d\'études sur l\'axe intestin-cerveau et l\'équilibre du microbiome',
    benefits: [
      'Amélioration du confort digestif',
      'Régulation du transit intestinal',
      'Réduction des ballonnements',
      'Soutien de la flore intestinale bénéfique'
    ]
  },
  {
    id: 'sleep-restore',
    title: 'Restaurateur de Sommeil Naturel',
    description: 'Solution scientifique pour un sommeil profond et réparateur',
    nutrients: ['magnesium', 'l-theanine', 'ashwagandha'],
    forProblems: ['sommeil', 'insomnie', 'réveils nocturnes', 'sommeil non réparateur'],
    researchScore: 0.89,
    timeToEffect: '1-3 semaines',
    popularity: 92,
    url: '/labo/sommeil',
    scientificBasis: 'Basé sur les recherches en chronobiologie et neurosciences du sommeil',
    benefits: [
      'Endormissement plus rapide',
      'Amélioration de la qualité du sommeil profond',
      'Réduction des réveils nocturnes',
      'Sensation de repos au réveil'
    ]
  }
];

// Facteurs de personnalisation pour pondérer les recommandations
interface PersonalizationFactors {
  gender: 'male' | 'female' | 'other';
  ageGroup: 'young' | 'adult' | 'senior';
  lifestyleActivity: 'sedentary' | 'moderate' | 'active';
  stressLevel: number; // 0-100
  sleepQuality: number; // 0-100
  dietQuality: number; // 0-100
  healthGoals: string[];
}

// Profil neural déduit du comportement utilisateur
interface NeuralProfile {
  decisionSpeed: number; // 0-100 (lent à rapide)
  consistencyScore: number; // 0-100 (inconsistant à très consistant)
  detailOrientation: number; // 0-100 (global à détaillé)
  riskAversion: number; // 0-100 (preneur de risque à averse au risque)
  informationNeed: number; // 0-100 (minimal à exhaustif)
}

/**
 * Extrait les facteurs de personnalisation à partir des réponses au quiz
 */
export function extractPersonalizationFactors(quizResponses: QuizResponse): PersonalizationFactors {
  // Valeurs par défaut
  const factors: PersonalizationFactors = {
    gender: 'other',
    ageGroup: 'adult',
    lifestyleActivity: 'moderate',
    stressLevel: 50,
    sleepQuality: 50,
    dietQuality: 50,
    healthGoals: []
  };

  // Extraction du genre
  if (quizResponses.basicInfo?.gender) {
    factors.gender = quizResponses.basicInfo.gender as 'male' | 'female' | 'other';
  }

  // Détermination du groupe d'âge
  if (quizResponses.basicInfo?.age) {
    const age = Number(quizResponses.basicInfo.age);
    if (age < 30) factors.ageGroup = 'young';
    else if (age >= 65) factors.ageGroup = 'senior';
    else factors.ageGroup = 'adult';
  }

  // Évaluation du niveau d'activité
  if (quizResponses.lifestyle?.activityLevel) {
    const activity = Number(quizResponses.lifestyle.activityLevel);
    if (activity <= 3) factors.lifestyleActivity = 'sedentary';
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

  return factors;
}

/**
 * Extraire le profil neural à partir des métriques comportementales
 */
export function extractNeuralProfile(metrics: BehavioralMetrics): NeuralProfile {
  return {
    decisionSpeed: 100 - Math.min(100, metrics.avgResponseTime * 10), // Plus le temps est court, plus la valeur est élevée
    consistencyScore: metrics.consistencyScore * 100,
    detailOrientation: metrics.focusedQuestions.length * 10, // Plus de questions détaillées = plus orienté détail
    riskAversion: metrics.changedAnswers.length * 20, // Plus de changements = plus d'aversion au risque
    informationNeed: metrics.longPauseQuestions.length * 15 // Plus de pauses = plus besoin d'information
  };
}

/**
 * Identifie les problèmes principaux de l'utilisateur à partir des réponses au quiz
 */
function identifyUserProblems(quizResponses: QuizResponse): string[] {
  const problems: string[] = [];

  // Détection des problèmes de stress
  if (quizResponses.wellbeing?.stressLevel && Number(quizResponses.wellbeing.stressLevel) >= 7) {
    problems.push('stress');
  }

  // Détection des problèmes de sommeil
  if (quizResponses.wellbeing?.sleepQuality && Number(quizResponses.wellbeing.sleepQuality) <= 5) {
    problems.push('sommeil');
  }

  // Détection des problèmes digestifs
  if (quizResponses.health?.digestiveIssues === 'true' || 
      (quizResponses.symptoms && quizResponses.symptoms.some(s => 
        ['ballonnements', 'constipation', 'diarrhée', 'digestion'].some(term => 
          s.toLowerCase().includes(term))))) {
    problems.push('digestion');
  }

  // Détection des problèmes d'énergie/fatigue
  if (quizResponses.wellbeing?.energyLevel && Number(quizResponses.wellbeing.energyLevel) <= 4) {
    problems.push('fatigue');
  }

  // Détection des problèmes d'humeur
  if (quizResponses.wellbeing?.moodRating && Number(quizResponses.wellbeing.moodRating) <= 5) {
    problems.push('humeur');
  }

  // Détection des problèmes de concentration
  if (quizResponses.wellbeing?.concentrationLevel && Number(quizResponses.wellbeing.concentrationLevel) <= 5) {
    problems.push('concentration');
  }

  // Ajout des problèmes explicitement mentionnés
  if (quizResponses.health?.healthConcerns) {
    const concernsLower = quizResponses.health.healthConcerns.toLowerCase();
    
    if (concernsLower.includes('immun')) problems.push('immunité');
    if (concernsLower.includes('peau') || concernsLower.includes('cutané')) problems.push('peau');
    if (concernsLower.includes('cardio') || concernsLower.includes('cœur')) problems.push('cardiovasculaire');
    if (concernsLower.includes('join') || concernsLower.includes('articul')) problems.push('articulations');
    if (concernsLower.includes('mémoire') || concernsLower.includes('cogniti')) problems.push('mémoire');
  }

  return problems;
}

/**
 * Calcule un score de correspondance entre une solution et le profil utilisateur
 */
function calculateMatchScore(
  solution: CombinedSolution, 
  userProblems: string[], 
  factors: PersonalizationFactors,
  neuralProfile: NeuralProfile
): number {
  let score = 0;
  
  // Correspondance avec les problèmes de l'utilisateur (facteur le plus important)
  const problemMatch = solution.forProblems.filter(problem => 
    userProblems.some(p => problem.includes(p) || p.includes(problem))
  ).length;
  
  score += (problemMatch / Math.max(1, solution.forProblems.length)) * 50; // Jusqu'à 50 points
  
  // Bonus pour la solidité scientifique (pour les profils détaillés)
  score += solution.researchScore * 15 * (neuralProfile.detailOrientation / 100); // Jusqu'à 15 points
  
  // Bonus pour la popularité (pour les profils à faible besoin d'information)
  score += (solution.popularity / 100) * 10 * ((100 - neuralProfile.informationNeed) / 100); // Jusqu'à 10 points
  
  // Adaptation selon le groupe d'âge
  if (factors.ageGroup === 'senior' && 
      (solution.forProblems.includes('mémoire') || solution.forProblems.includes('articulations'))) {
    score += 5;
  }
  
  if (factors.ageGroup === 'young' && 
      (solution.forProblems.includes('énergie') || solution.forProblems.includes('stress'))) {
    score += 5;
  }
  
  // Adaptation selon le niveau de stress
  if (factors.stressLevel > 70 && solution.forProblems.includes('stress')) {
    score += 10;
  }
  
  // Adaptation selon la qualité du sommeil
  if (factors.sleepQuality < 40 && solution.forProblems.includes('sommeil')) {
    score += 10;
  }
  
  // Considération des objectifs de santé spécifiques
  const goalMatch = factors.healthGoals.filter(goal => 
    solution.benefits.some(benefit => benefit.toLowerCase().includes(goal.toLowerCase()))
  ).length;
  
  score += (goalMatch / Math.max(1, factors.healthGoals.length)) * 10; // Jusqu'à 10 points
  
  return Math.min(100, score);
}

/**
 * Génère les recommandations personnalisées basées sur les réponses au quiz et le comportement
 */
export function generateRecommendations(
  quizResponses: QuizResponse, 
  behavioralMetrics: BehavioralMetrics,
  neuroProfile: NeuroProfile
): Recommendation[] {
  // Extraction des facteurs de personnalisation
  const personalizationFactors = extractPersonalizationFactors(quizResponses);
  
  // Extraction du profil neural basé sur le comportement
  const neuralProfile = extractNeuralProfile(behavioralMetrics);
  
  // Identification des problèmes principaux de l'utilisateur
  const userProblems = identifyUserProblems(quizResponses);
  
  // Calcul des scores de correspondance pour chaque solution
  const scoredSolutions = combinedSolutions.map(solution => {
    const matchScore = calculateMatchScore(
      solution, 
      userProblems, 
      personalizationFactors,
      neuralProfile
    );
    
    return {
      ...solution,
      matchScore
    };
  });
  
  // Tri des solutions par score de correspondance
  const sortedSolutions = scoredSolutions.sort((a, b) => b.matchScore - a.matchScore);
  
  // Conversion en format Recommendation
  return sortedSolutions.slice(0, 3).map(solution => ({
    title: solution.title,
    description: solution.description,
    confidence: solution.researchScore,
    benefits: solution.benefits,
    timeToEffect: solution.timeToEffect,
    popularity: solution.popularity,
    url: solution.url,
    scientificBasis: solution.scientificBasis
  }));
}

/**
 * Génère une explication textuelle des recommandations pour l'utilisateur
 */
export function generateRecommendationExplanation(
  recommendations: Recommendation[],
  quizResponses: QuizResponse
): string {
  if (recommendations.length === 0) {
    return "Nous n'avons pas pu générer de recommandations spécifiques. Veuillez consulter un professionnel de santé.";
  }
  
  const topRecommendation = recommendations[0];
  const factors = extractPersonalizationFactors(quizResponses);
  
  let explanation = `D'après votre profil nutritionnel, notre algorithme a identifié que ${topRecommendation.title} pourrait être particulièrement bénéfique pour vous. `;
  
  // Personnalisation selon l'âge
  if (factors.ageGroup === 'senior') {
    explanation += `À votre âge, il est important de privilégier des nutriments qui soutiennent la santé cognitive et articulaire. `;
  } else if (factors.ageGroup === 'young') {
    explanation += `Pour votre tranche d'âge, nous recommandons des solutions qui optimisent votre énergie et votre concentration. `;
  }
  
  // Personnalisation selon le niveau de stress
  if (factors.stressLevel > 70) {
    explanation += `Votre niveau de stress élevé suggère un besoin en nutriments qui soutiennent le système nerveux et la production de neurotransmetteurs équilibrants. `;
  }
  
  // Mention des preuves scientifiques
  explanation += `Cette recommandation est basée sur des recherches scientifiques solides, avec un indice de confiance de ${Math.round(topRecommendation.confidence * 100)}%. `;
  
  // Informations sur le temps d'effet
  explanation += `La plupart des utilisateurs constatent des résultats positifs après ${topRecommendation.timeToEffect} d'utilisation régulière.`;
  
  return explanation;
}
