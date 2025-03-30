
import { useState, useEffect } from 'react';
import { AdvancedRecommenderSystem } from '@/utils/recommenderSystem';
import { BehavioralMetrics, Recommendation, QuizResponse, NeuroProfile } from '@/utils/types';

/**
 * Hook pour générer des recommandations avancées basées sur l'IA
 * Analyse le comportement de l'utilisateur et ses réponses au quiz
 */
export const useAdvancedRecommendations = (
  quizResponses: QuizResponse,
  behavioralMetrics: BehavioralMetrics
) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [neuroProfile, setNeuroProfile] = useState<NeuroProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Créer une instance du système de recommandation
    const recommenderSystem = new AdvancedRecommenderSystem();
    
    // Simuler un temps de traitement pour améliorer l'expérience utilisateur
    // Les utilisateurs ont tendance à faire davantage confiance aux systèmes
    // qui semblent effectuer une analyse approfondie
    const processInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        // Progression plus lente au milieu pour créer une impression de traitement complexe
        let increment = 0;
        if (prev < 30) increment = Math.floor(Math.random() * 5) + 3; // Plus rapide au début
        else if (prev < 70) increment = Math.floor(Math.random() * 3) + 1; // Plus lent au milieu
        else increment = Math.floor(Math.random() * 4) + 2; // Moyenne à la fin
        
        const newProgress = prev + increment;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 180);
    
    // Utiliser un délai pour rendre l'analyse plus crédible
    const processingTimeout = setTimeout(() => {
      try {
        // Générer le profil neurologique
        const profile = recommenderSystem.analyzeUserBehavior(behavioralMetrics);
        setNeuroProfile(profile);
        
        // Générer les recommandations personnalisées
        const personalizedRecommendations = recommenderSystem.getRecommendations(
          behavioralMetrics,
          quizResponses
        );
        
        // Mettre à jour l'état avec les recommandations
        setRecommendations(personalizedRecommendations);
        
        // Arrêter l'intervalle de progression et indiquer que le traitement est terminé
        clearInterval(processInterval);
        setAnalysisProgress(100);
        setIsProcessing(false);
      } catch (err) {
        console.error("Erreur lors de la génération des recommandations:", err);
        setError("Une erreur est survenue lors de l'analyse. Veuillez réessayer.");
        
        // Recommandations par défaut en cas d'échec
        setRecommendations([
          {
            title: "Complexe Multivitamines Scientifique",
            description: "Formulation complète basée sur les dernières découvertes en micronutrition",
            confidence: 0.82,
            benefits: [
              "Support nutritionnel complet",
              "Optimisation des fonctions cellulaires",
              "Vitalité quotidienne"
            ],
            timeToEffect: "2-4 semaines",
            popularity: 87,
            url: "/labo/multivitamines"
          },
          {
            title: "Support Anti-Stress Naturel",
            description: "Complexe adaptogène naturel pour équilibrer les hormones du stress",
            confidence: 0.78,
            benefits: [
              "Réduction des niveaux de cortisol",
              "Amélioration de la résilience au stress",
              "Meilleure qualité de sommeil"
            ],
            timeToEffect: "1-3 semaines",
            popularity: 92,
            url: "/labo/anti-stress"
          }
        ]);
        
        // Terminer le traitement
        clearInterval(processInterval);
        setAnalysisProgress(100);
        setIsProcessing(false);
      }
    }, 3200); // Délai de 3.2 secondes pour l'analyse
    
    // Nettoyage lors du démontage du composant
    return () => {
      clearInterval(processInterval);
      clearTimeout(processingTimeout);
    };
  }, [quizResponses, behavioralMetrics]);

  // Extraire des informations à partir du profil pour la visualisation
  const extractInsights = () => {
    if (!neuroProfile) return {};
    
    return {
      // Classification du niveau de stress
      stressCategory: 
        neuroProfile.stressIndex < 30 ? "Faible" :
        neuroProfile.stressIndex < 60 ? "Modéré" : "Élevé",
      
      // Qualité de la prise de décision
      decisionQuality:
        neuroProfile.decisionConfidence > 80 ? "Excellente" :
        neuroProfile.decisionConfidence > 60 ? "Bonne" : "Variable",
      
      // Niveau d'attention
      attentionLevel:
        neuroProfile.attentionScore > 80 ? "Focalisée" :
        neuroProfile.attentionScore > 60 ? "Adéquate" : "Distraite",
      
      // Cohérence des réponses
      consistencyLevel:
        neuroProfile.consistencyIndex > 80 ? "Très cohérent" :
        neuroProfile.consistencyIndex > 60 ? "Cohérent" : "Variable"
    };
  };

  return {
    recommendations,
    isProcessing,
    analysisProgress,
    neuroProfile,
    insights: neuroProfile ? extractInsights() : null,
    error
  };
};

export default useAdvancedRecommendations;
