
import { useState, useEffect } from 'react';
import { AdvancedRecommenderSystem } from '@/utils/recommenderSystem';
import { BehavioralMetrics, Recommendation, QuizResponse } from '@/utils/types';

/**
 * Hook for generating advanced AI-powered recommendations
 */
export const useAdvancedRecommendations = (
  quizResponses: QuizResponse,
  behavioralMetrics: BehavioralMetrics
) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [neuroProfile, setNeuroProfile] = useState<any>(null);

  useEffect(() => {
    // Create recommendation system
    const recommenderSystem = new AdvancedRecommenderSystem();
    
    // Simulate processing time to improve user experience
    const processInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 8) + 2;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 180);
    
    // Use timeout to make the analysis feel more substantive
    const processingTimeout = setTimeout(() => {
      try {
        // Generate neural profile
        const profile = recommenderSystem.analyzeUserBehavior(behavioralMetrics);
        setNeuroProfile(profile);
        
        // Generate recommendations
        const personalizedRecommendations = recommenderSystem.getRecommendations(
          behavioralMetrics,
          quizResponses
        );
        
        setRecommendations(personalizedRecommendations);
      } catch (error) {
        console.error("Error generating recommendations:", error);
        // Fallback to default recommendations if engine fails
        setRecommendations([{
          title: "Complexe Multivitamines Scientifique",
          description: "Formulation complète basée sur les dernières découvertes en micronutrition",
          confidence: 0.82,
          benefits: [
            "Support nutritionnel complet",
            "Optimisation des fonctions cellulaires",
            "Vitalité quotidienne"
          ],
          timeToEffect: "2-4 semaines",
          popularity: 87
        }]);
      } finally {
        clearInterval(processInterval);
        setAnalysisProgress(100);
        setIsProcessing(false);
      }
    }, 2500);
    
    return () => {
      clearInterval(processInterval);
      clearTimeout(processingTimeout);
    };
  }, [quizResponses, behavioralMetrics]);

  return {
    recommendations,
    isProcessing,
    analysisProgress,
    neuroProfile
  };
};
