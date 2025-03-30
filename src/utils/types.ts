/**
 * Types pour le système de recommandation et d'IA
 */

export interface QuizResponse {
  personal?: {
    name?: string;
    email?: string;
    age?: string;
    gender?: string;
  };
  healthConcerns?: {
    stressLevel?: string;
    sleepIssues?: string;
    energyLevel?: string;
    focusIssues?: string;
    digestiveIssues?: string;
    [key: string]: string | undefined;
  };
  goals?: {
    weightLoss?: boolean;
    increaseEnergy?: boolean;
    improveFocus?: boolean;
    improveDigestion?: boolean;
    reduceStress?: boolean;
    [key: string]: boolean | undefined;
  };
  dietaryPreferences?: string[];
  [key: string]: any;
}

export interface Recommendation {
  id: string;
  name: string;
  description: string;
  priority: number;
  matchScore?: number;
  benefits?: string[];
  recommendedDose?: string;
  timeToEffect?: string;
  scientificBasis?: string;
  confidence?: number;
  reason: string;
  [key: string]: any;
}

export interface BehavioralMetrics {
  sessionDuration: number;   // Durée de la session de quiz en secondes
  hesitationCount: number;   // Nombre de fois où l'utilisateur a hésité (changé de réponse)
  changeCount: number;       // Nombre de modifications de réponses
  engagementScore: number;   // Score d'engagement calculé
  [key: string]: number;
}

export interface NeuroProfile {
  decisionStyle: 'intuitive' | 'analytical' | 'mixed';
  riskTolerance: 'conservative' | 'moderate' | 'adventurous';
  informationProcessing: 'visual' | 'textual' | 'interactive';
  motivationFactor: 'health' | 'appearance' | 'performance' | 'longevity';
  [key: string]: string;
}

export interface UserFeedback {
  helpful: boolean;
  relevance: number;         // 1-10
  purchaseIntent: number;    // 1-10
  comments?: string;
  [key: string]: any;
}

export interface LearningData {
  timestamp: number;
  quizData: QuizResponse;
  recommendationId: string;
  userFeedback: UserFeedback;
  [key: string]: any;
}

export interface AIModelState {
  version: string;
  lastUpdated: number;
  featureImportance: {
    age?: number;
    gender?: number;
    stressLevel?: number;
    sleepIssues?: number;
    energyLevel?: number;
    focusIssues?: number;
    dietaryPreferences?: number;
    [key: string]: number | undefined;
  };
  clusterCenters?: any[];
  weights?: any;
  [key: string]: any;
}