/**
 * Types pour le système de quiz et de recommandation
 */

export interface QuizResponse {
  [key: string]: any;
  personal?: {
    name?: string;
    age?: string;
    gender?: string;
    weight?: string;
    height?: string;
    email?: string;
  };
  diet?: {
    qualityRating?: string;
    restrictions?: string[];
    allergies?: string[];
    supplements?: string[];
  };
  lifestyle?: {
    weeklyActivity?: string;
    sleepHours?: string;
    workStyle?: string;
  };
  wellbeing?: {
    stressLevel?: string;
    sleepQuality?: string;
    energyLevel?: string;
    moodStability?: string;
  };
  goals?: {
    healthGoals?: string[];
    timeFrame?: string;
    priorityLevel?: string;
  };
  symptoms?: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  url?: string;
  confidence: number;
  benefits?: string[];
  timeToEffect: string;
  popularity?: number;
  scientificBasis?: string;
  dosage?: string;
  optimalUsage?: string;
  additionalIngredients?: string[];
  matchScore?: number;
  imageUrl?: string;
  price?: string;
  brand?: string;
  ingredients?: string;
  ratingCount?: number;
  rating?: number;
}

export interface BehavioralMetrics {
  avgResponseTime: number;
  questionRevisits: number;
  focusedQuestions: string[];
  changedAnswers: number;
  timeSpentOnPersonalQuestions: number;
  timeSpentOnHealthQuestions: number;
  consistencyScore: number;
  engagementLevel: 'low' | 'medium' | 'high';
  decisionPattern: 'quick' | 'thoughtful' | 'hesitant';
  lastActivity: Date;
}

export interface NeuroProfile {
  decisionSpeed: number;        // 0-100, plus élevé = décisions plus rapides
  consistencyScore: number;     // 0-100, cohérence des réponses
  detailOrientation: number;    // 0-100, attention aux détails
  riskAversion: number;         // 0-100, aversion au risque
  emotionalReactivity?: number; // 0-100, réactivité émotionnelle
  analyticalTendency?: number;  // 0-100, tendance analytique
  cognitiveStyle?: 'visual' | 'verbal' | 'kinesthetic' | 'mixed';
}

export interface NutrientNeed {
  name: string;              // Nom du nutriment
  level: number;             // 0-100, intensité du besoin
  reason: string[];          // Raisons justifiant le besoin
  deficiencyRisk: number;    // 0-100, risque de carence
  optimalDosage?: string;    // Dosage optimal recommandé
  foodSources?: string[];    // Sources alimentaires
  supplementForms?: string[]; // Formes de suppléments recommandées
}

export interface UserProfile {
  id: string;
  quizResponses: QuizResponse;
  recommendations: Recommendation[];
  healthFactors: {
    stressLevel: number;
    sleepQuality: number;
    dietQuality: number;
    activityLevel: number;
    healthGoals: string[];
  };
  nutrientNeeds: NutrientNeed[];
  feedbackHistory: Array<{
    timestamp: string;
    recommendationId: string;
    helpful: boolean;
    purchaseIntent: number;
    comments?: string;
  }>;
  learningProgress: {
    precision: number;
    recommendationImprovement: number;
    lastUpdate: string;
  };
}

export interface LearningData {
  timestamp: string;
  quizData: QuizResponse;
  recommendationId: string;
  userFeedback: {
    helpful: boolean;
    purchaseIntent: number;
    additionalComments?: string;
  };
  sessionInfo: {
    browser: string;
    viewport: {
      width: number;
      height: number;
    };
  };
}

export interface AIRecommendationModel {
  version: string;
  accuracy: number;
  lastTraining: string;
  featureImportance: {
    [key: string]: number;  // Importance de chaque facteur
  };
  feedbackCount: number;
  improvementRate: number;
}