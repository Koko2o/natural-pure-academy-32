
// Basic behavioral metrics tracked during quiz
export interface BehavioralMetrics {
  responseTime: number[];       // Time to answer each question in seconds
  hesitationCount: number[];    // Number of times user changed answers per question
  changeFrequency: number;      // Total number of answer changes
  focusLost: number;            // Number of times user switched tabs/apps
  scrollBehavior: {
    speed: number;              // Average scroll speed
    directionChanges: number;   // Number of scroll direction changes
    pauseFrequency: number;     // How often user pauses scrolling
  };
}

// Neural profile generated from behavioral data
export interface NeuroProfile {
  stressIndex: number;          // 0-100 stress level indicator
  decisionConfidence: number;   // 0-100 confidence in decisions
  attentionScore: number;       // 0-100 attention span score
  consistencyIndex: number;     // 0-100 consistency in answers
}

// Recommendation structure
export interface Recommendation {
  title: string;
  description: string;
  url?: string;
  confidence: number;           // 0-1 confidence score
  benefits: string[];
  timeToEffect: string;
  popularity: number;           // 0-100 popularity score
}

// Quiz response structure
export interface QuizResponse {
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  activityLevel?: string;
  sleepQuality?: string;
  stressLevel?: string;
  energyLevel?: string;
  fruitVegConsumption?: string;
  waterIntake?: string;
  dietType?: string;
  digestiveComfort?: string;
  seasonalIssues?: boolean;
  immuneSystem?: string;
  objectives?: string[];
  symptoms?: string[];
  supplements?: string[];
  medications?: string[];
  medicalConditions?: string[];
}
