
// Define shared types for the quiz components
export interface UserInfo {
  name: string;
  email: string;
}

export interface QuizResponse {
  name: string;
  email: string;
  objectives: string[];
  dietaryHabits: string;
  meatConsumption: string;
  fishConsumption: string;
  fruitVegConsumption: string;
  exerciseFrequency: string;
  sleepQuality: string;
  stressLevel: string;
  symptoms: string[];
}

export interface QuizStep {
  id: string;
  title: string;
  description: string;
}

export interface QuizStepProps {
  responses: QuizResponse;
  updateResponse: (field: string, value: any) => void;
}
