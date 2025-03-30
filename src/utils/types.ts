
// Types de base pour le quiz et l'analyse comportementale

// Réponses au quiz de l'utilisateur
export interface QuizResponse {
  [key: string]: any;
  age?: string | number;
  gender?: string;
  height?: string | number;
  weight?: string | number;
  activityLevel?: string | number;
  dietType?: string;
  sleepQuality?: string | number;
  waterIntake?: string | number;
  stressLevel?: string | number;
  symptoms?: string[] | string;
}

// Métriques comportementales basiques suivies pendant le quiz
export interface BehavioralMetrics {
  responseTime: number[];       // Temps pour répondre à chaque question en secondes
  hesitationCount: number[];    // Nombre de fois où l'utilisateur a changé de réponses par question
  changeFrequency: number;      // Nombre total de changements de réponses
  focusLost: number;            // Nombre de fois où l'utilisateur a changé d'onglet/app
  scrollBehavior: {
    speed: number;              // Vitesse moyenne de défilement
    directionChanges: number;   // Nombre de changements de direction de défilement
    pauseFrequency: number;     // Fréquence des pauses pendant le défilement
  };
}

// Profil neurologique généré à partir des données comportementales
export interface NeuroProfile {
  stressIndex: number;          // Indicateur de niveau de stress (0-100)
  decisionConfidence: number;   // Confiance dans les décisions (0-100)
  attentionScore: number;       // Score d'attention (0-100)
  consistencyIndex: number;     // Cohérence dans les réponses (0-100)
}

// Structure de recommandation
export interface Recommendation {
  title: string;
  description: string;
  url?: string;
  confidence: number;           // Score de confiance (0-1)
  benefits: string[];
  timeToEffect: string;
  popularity: number;           // Score de popularité (0-100)
  scientificBasis?: string;     // Base scientifique (optionnel)
}

// Article scientifique
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  relatedQuizTopics?: string[]; // Sujets de quiz liés à cet article
}

// Terme scientifique pour les tooltips
export interface ScientificTerm {
  id: string;
  title: string;
  definition: string;
  source?: string;
}

// Profil utilisateur
export interface UserProfile {
  id: string;
  quizResponses?: QuizResponse;
  recommendations?: Recommendation[];
  healthScore?: number;
  readingHistory?: string[];
  neuroProfile?: NeuroProfile;
  lastQuizDate?: string;
}

// Données de conversion de contenu à quiz
export interface ContentToQuizMetrics {
  articleId: string;
  viewToStartRate: number;      // Taux de démarrage du quiz après lecture
  completionRate: number;       // Taux de complétion du quiz
  avgTimeSpent: number;         // Temps moyen passé dans le quiz en secondes
  conversionPoints: string[];   // Points de conversion dans l'article
}

// Analyse d'efficacité des recommandations
export interface RecommendationEffectiveness {
  recommendationId: string;
  clickRate: number;            // Taux de clic sur la recommandation
  engagementScore: number;      // Score d'engagement avec la solution recommandée
  followupRate: number;         // Taux de suivi des recommandations
}

// Paramètres de personnalisation du quiz
export interface PersonalizationFactors {
  urgencyLevel: number;         // Niveau d'urgence perçu (0-100)
  userIntent: 'educational' | 'solution-seeking' | 'browsing';
  contentSource: string;        // Source du contenu qui a amené au quiz
  previousEngagement?: number;  // Niveau d'engagement précédent
}
